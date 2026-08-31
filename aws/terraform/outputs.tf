output "bucket_name" {
  description = "Sync the built site here: aws s3 sync dist/ s3://<this>"
  value       = aws_s3_bucket.site.id
}

output "distribution_id" {
  description = "Use as CLOUDFRONT_DISTRIBUTION_ID in the GitHub Actions secrets."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  description = "Point your CNAME here, and use this to test before DNS exists."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "api_endpoint" {
  description = "Direct API Gateway URL — handy for testing the Lambdas past CloudFront."
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "site_url" {
  value = var.domain_name == "" ? "https://${aws_cloudfront_distribution.site.domain_name}" : "https://${var.domain_name}"
}

# Add these CNAMEs in Vercel's DNS to validate the certificate. Terraform waits
# at aws_acm_certificate_validation until they resolve.
output "acm_validation" {
  description = "DNS records to create for certificate validation."
  value = var.domain_name == "" ? [] : [
    for o in aws_acm_certificate.site[0].domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ]
}
