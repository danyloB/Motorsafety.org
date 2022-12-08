#!/bin/bash

export LOG_FILE=logs/deploy-`date +%Y.%m.%d.%H.%M`.log
echo Deloyment Begins @ `date +%Y.%m.%d.%H.%M.%S` 2>&1 | tee -a ${LOG_FILE}

deployment_start_time=$(date +%s)

#export AWS_ACCESS_KEY_ID="AKIAWYBOEYTZXSFUT3SO"
#export AWS_SECRET_ACCESS_KEY="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"

# iam user: motorsafety_amplify
export AWS_ACCESS_KEY_ID="AKIAWYBOEYTZWD3GHNXH"
export AWS_SECRET_ACCESS_KEY="vGb/6tDh8ZBq/AmTScifrTE/Uog1ThCAB21IWjBt"

if [ ! -f .env ]; then
  cp .env.example .env
fi

# Set environment variables from .env file
set -o allexport
source .env
set +o allexport

# # Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
# [ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use

echo Installing packages... 2>&1 | tee -a ${LOG_FILE}
yarn
amplify api gql-compile && amplify codegen

echo Generating static files... 2>&1 | tee -a ${LOG_FILE}
generate_start_time=$(date +%s)

yarn generate 2>&1 | tee -a ${LOG_FILE}

current_time=$(date +%s)
seconds_elapsed=$(( current_time - generate_start_time ))
echo Static files generation completed in ${seconds_elapsed} seconds @ `date +%Y.%m.%d.%H.%M.%S` 2>&1 | tee -a ${LOG_FILE}

echo Updating version file... 2>&1 | tee -a ${LOG_FILE}
echo "{\"version\":\"`date +%Y.%m.%d.%H.%M.%S`\"}" > dist/version.json

# No longer using this because of "BatchTooLarge" Error Invalidation batch specified is too large. HTTP Status Code: 413
# echo "Deploying with gulp..."
# yarn gulp:deploy

echo Syncing static files to S3... 2>&1 | tee -a ${LOG_FILE}
s3_sync_start_time=$(date +%s)

aws --no-cli-pager s3 sync dist s3://${AWS_BUCKET_NAME} --delete # remove --delete after generate command works as intended

current_time=$(date +%s)
seconds_elapsed=$(( current_time - s3_sync_start_time ))
echo S3 sync completed in ${seconds_elapsed} seconds @ `date +%Y.%m.%d.%H.%M.%S` 2>&1 | tee -a ${LOG_FILE}

echo Creating CloudFront invalidation... 2>&1 | tee -a ${LOG_FILE}
cloudfront_invalidation_start_time=$(date +%s)

aws --no-cli-pager cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"

current_time=$(date +%s)
seconds_elapsed=$(( current_time - cloudfront_invalidation_start_time ))
echo CloudFront invalidation completed in ${seconds_elapsed} seconds @ `date +%Y.%m.%d.%H.%M.%S` 2>&1 | tee -a ${LOG_FILE}

# ----------------------------

current_time=$(date +%s)
seconds_elapsed=$(( current_time - deployment_start_time ))
echo Deployment completed in ${seconds_elapsed} seconds @ `date +%Y.%m.%d.%H.%M.%S` 2>&1 | tee -a ${LOG_FILE}
