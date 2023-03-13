terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.58.0"
    }
  }
}

provider "aws" {}

variable "bucket_name" {
    type = string
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
    files = ["index.html", "bundle.js", "bundle.js.LICENSE.txt"]
}

resource "aws_s3_object" "this" {
    for_each = toset(local.files)
    bucket = aws_s3_bucket.this.id
    key = each.value
    source = "${local.dist_dir}${each.value}"
}

output "url" {
  value = "http://${aws_s3_bucket_website_configuration.this.website_endpoint}"
}
