# ── IAM ────────────────────────────────────────────────────────────────────
data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${local.name}-lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
  tags               = local.tags
}

# CloudWatch Logs only — neither function touches any other AWS service.
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ── Packaging ──────────────────────────────────────────────────────────────
# Run `node aws/build.mjs` (and `npm install` inside aws/build/chat) before
# `terraform apply` — these zip whatever is in aws/build/.
data "archive_file" "chat" {
  type        = "zip"
  source_dir  = "${path.module}/../build/chat"
  output_path = "${path.module}/../build/chat.zip"
}

data "archive_file" "contributions" {
  type        = "zip"
  source_dir  = "${path.module}/../build/contributions"
  output_path = "${path.module}/../build/contributions.zip"
}

# ── Functions ──────────────────────────────────────────────────────────────
resource "aws_lambda_function" "chat" {
  function_name    = "lloyd-chat"
  role             = aws_iam_role.lambda.arn
  runtime          = "nodejs22.x"
  architectures    = ["arm64"]
  handler          = "index.handler"
  filename         = data.archive_file.chat.output_path
  source_code_hash = data.archive_file.chat.output_base64sha256

  # Gemini regularly takes several seconds; the 3s default would time out.
  timeout     = 30
  memory_size = 512

  environment {
    variables = {
      GEMINI_API_KEY = var.gemini_api_key
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "contributions" {
  function_name    = "lloyd-contributions"
  role             = aws_iam_role.lambda.arn
  runtime          = "nodejs22.x"
  architectures    = ["arm64"]
  handler          = "index.handler"
  filename         = data.archive_file.contributions.output_path
  source_code_hash = data.archive_file.contributions.output_base64sha256

  timeout     = 10
  memory_size = 256

  environment {
    variables = {
      GITHUB_TOKEN    = var.github_token
      GITHUB_USERNAME = var.github_username
    }
  }

  tags = local.tags
}

resource "aws_cloudwatch_log_group" "chat" {
  name              = "/aws/lambda/${aws_lambda_function.chat.function_name}"
  retention_in_days = 14
  tags              = local.tags
}

resource "aws_cloudwatch_log_group" "contributions" {
  name              = "/aws/lambda/${aws_lambda_function.contributions.function_name}"
  retention_in_days = 14
  tags              = local.tags
}

# ── API Gateway (HTTP API) ─────────────────────────────────────────────────
# No CORS block: /api/* is served through the same CloudFront distribution as
# the site, so the browser never makes a cross-origin request.
resource "aws_apigatewayv2_api" "api" {
  name          = "${local.name}-api"
  protocol_type = "HTTP"
  tags          = local.tags
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
  tags        = local.tags
}

resource "aws_apigatewayv2_integration" "chat" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.chat.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_integration" "contributions" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contributions.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "chat" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /api/chat"
  target    = "integrations/${aws_apigatewayv2_integration.chat.id}"
}

resource "aws_apigatewayv2_route" "contributions" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /api/contributions"
  target    = "integrations/${aws_apigatewayv2_integration.contributions.id}"
}

resource "aws_lambda_permission" "chat" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.chat.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "contributions" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contributions.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}
