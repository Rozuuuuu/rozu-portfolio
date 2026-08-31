terraform {
  required_version = ">= 1.6"
  required_providers {
    aws     = { source = "hashicorp/aws", version = "~> 5.0" }
    archive = { source = "hashicorp/archive", version = "~> 2.4" }
  }
}

provider "aws" {
  region = var.region
}

# CloudFront only reads ACM certificates from us-east-1, no matter where the
# rest of the stack lives. This aliased provider exists solely for the cert.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

locals {
  name = "lloyd-portfolio-aws"
  tags = {
    Project   = "portfolio-aws"
    ManagedBy = "terraform"
  }
}

# Referencing AWS-managed policies by name is safer than hardcoding their UUIDs.
data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "disabled" {
  name = "Managed-CachingDisabled"
}

# Honours the s-maxage the contributions Lambda already returns, so CloudFront
# serves one shared copy per day instead of hammering GitHub's rate limit.
data "aws_cloudfront_cache_policy" "use_origin_headers" {
  name = "Managed-UseOriginCacheControlHeaders"
}

# Forwards everything EXCEPT Host — API Gateway rejects a forwarded viewer Host.
data "aws_cloudfront_origin_request_policy" "all_viewer_except_host" {
  name = "Managed-AllViewerExceptHostHeader"
}
