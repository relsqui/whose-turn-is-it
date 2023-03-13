# Terraform Deployment

## AWS Setup

If you already have local AWS credentials which give you at least as much access as the policy below, you can skip this section.

1. Install the AWS CLI.
1. In AWS IAM, create a user.
   * Under permissions, add the inline policy below.
   * Under security credentials, create an access key and note the key ID and secret.
   * If you're wondering "why not use a role" or "why not use Identity Center," you're correct and should do those things instead.
1. Back in a terminal, run `aws configure` and follow the prompts.

### AWS Policy

Replace YOUR-BUCKET-NAME with the actual bucket name you want to use. Bucket names are globally unique and will be part of the public URL.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:CreateBucket",
                "s3:ListBucket",
                "s3:PutObject",
                "s3:PutBucketWebsite",
                "s3:DeleteObject",
                "s3:DeleteBucket",
                "s3:DeleteBucketWebsite"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME/*",
                "arn:aws:s3:::YOUR-BUCKET-NAME"
            ]
        }
    ]
}
```

## Terraform Setup

1. Install Terraform
1. Rename `example.tfvars` to `terraform.tfvars` and update it with your bucket name.

### The State File

Terraform creates a `terraform.tfstate` file in the infrastructure directory which keeps track of the last known state of the real infrastructure.

Don't delete the state file, or Terraform will try to create the same bucket again and fail, and you'll have to delete or re-import the resources manually.

If you're using this for more than prototyping, add a `backend` block to `main.tf` to store the state somewhere safer, like another s3 bucket. (Don't use the app bucket.)
