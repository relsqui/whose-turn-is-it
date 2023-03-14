terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.58.0"
    }
  }
}

provider "aws" {}

variable "bucket_name" {
  type        = string
  description = "Name of the S3 bucket to create or update."
}

resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.id
  index_document {
    suffix = "index.html"
  }
}

locals {
  dist_dir = "${path.root}/../dist/"
  files = {
    "index.html" : "text/html",
    "bundle.js" : "text/javascript",
    "bundle.js.LICENSE.txt" : "text/plain"
  }
}

resource "aws_s3_object" "this" {
  for_each     = local.files
  bucket       = aws_s3_bucket.this.id
  key          = each.key
  content_type = each.value
  acl          = "public-read"
  source       = "${local.dist_dir}${each.key}"
}

output "url" {
  value = "http://${aws_s3_bucket_website_configuration.this.website_endpoint}"
}
