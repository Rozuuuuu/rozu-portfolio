variable "region" {
  description = "Region for S3, Lambda and API Gateway (the ACM cert is always us-east-1)."
  type        = string
  default     = "ap-southeast-1"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the built site."
  type        = string
}

variable "domain_name" {
  description = "Subdomain served by CloudFront. Leave empty to use the default *.cloudfront.net domain and skip ACM entirely."
  type        = string
  default     = ""
}

variable "gemini_api_key" {
  description = "Gemini API key for the chat Lambda."
  type        = string
  sensitive   = true
}

variable "github_token" {
  description = "GitHub PAT with read:user, for the contributions Lambda."
  type        = string
  sensitive   = true
}

variable "github_username" {
  description = "GitHub login whose contribution calendar is read."
  type        = string
}
