# ── Certificate (us-east-1 only — CloudFront ignores every other region) ───
# Optional: leave var.domain_name empty on the first apply to get the stack
# working on the default *.cloudfront.net domain, then set it and re-apply.
resource "aws_acm_certificate" "site" {
  count             = var.domain_name == "" ? 0 : 1
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"
  tags              = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

# Waits for you to add the CNAME shown in `terraform output acm_validation`
# to Vercel's DNS. Terraform will sit here until the certificate is issued.
resource "aws_acm_certificate_validation" "site" {
  count                   = var.domain_name == "" ? 0 : 1
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for o in aws_acm_certificate.site[0].domain_validation_options : o.resource_record_name]

  timeouts {
    create = "60m"
  }
}

# ── Distribution ───────────────────────────────────────────────────────────
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = local.name
  default_root_object = "index.html"
  price_class         = "PriceClass_200" # includes Asia-Pacific edges
  aliases             = var.domain_name == "" ? [] : [var.domain_name]
  tags                = local.tags

  origin {
    origin_id                = "s3-site"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  origin {
    origin_id = "api-gateway"
    # CloudFront wants a bare hostname, not a URL.
    domain_name = replace(aws_apigatewayv2_api.api.api_endpoint, "https://", "")

    custom_origin_config {
      origin_protocol_policy = "https-only"
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # The site itself.
  default_cache_behavior {
    target_origin_id       = "s3-site"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
  }

  # Chat: POST must be allowed explicitly. Leaving the default GET/HEAD-only
  # methods here is the single most common reason the chatbot 403s.
  ordered_cache_behavior {
    path_pattern             = "/api/chat"
    target_origin_id         = "api-gateway"
    viewer_protocol_policy   = "https-only"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    compress                 = true
    cache_policy_id          = data.aws_cloudfront_cache_policy.disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer_except_host.id
  }

  # Contributions: cacheable, and the Lambda already returns s-maxage=86400.
  ordered_cache_behavior {
    path_pattern             = "/api/contributions"
    target_origin_id         = "api-gateway"
    viewer_protocol_policy   = "https-only"
    allowed_methods          = ["GET", "HEAD", "OPTIONS"]
    cached_methods           = ["GET", "HEAD"]
    compress                 = true
    cache_policy_id          = data.aws_cloudfront_cache_policy.use_origin_headers.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer_except_host.id
  }

  # SPA routing. S3 returns 403 (not 404) for a key that does not exist, so both
  # must be mapped. Returning 200 — not the original error — is what lets React
  # Router take over and stops crawlers seeing every deep link as an error.
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.domain_name == "" ? true : null
    acm_certificate_arn            = var.domain_name == "" ? null : aws_acm_certificate_validation.site[0].certificate_arn
    ssl_support_method             = var.domain_name == "" ? null : "sni-only"
    minimum_protocol_version       = var.domain_name == "" ? null : "TLSv1.2_2021"
  }
}
