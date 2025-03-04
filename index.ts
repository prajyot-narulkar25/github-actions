import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("my-demo-bucket", {
    acl: "private",
    tags: {
        Name: "my-demo-bucket",
    },
    lifecycleRules: [{
        enabled: true,
        expiration: {
            days: 365,
        },
    }],
});

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("my-bucket-public-access-block", {
    bucket: bucket.id,
    blockPublicAcls: true,
    ignorePublicAcls: true,
    blockPublicPolicy: true,
    restrictPublicBuckets: true,
});


export const bucketName = bucket.bucket;
export const bucketArn = bucket.arn;
