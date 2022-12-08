# nuxt-v2-motorsafety

## Build Setup

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Deploy from EC2 (Recommended)

Launch and connect to EC2 Instance `i-049506734f2a669c4` in the `us-west-2` region via SSH (You'll need the `AdaptiaDesignEC2KeyPair` EC2 Keypair which you can get from Sergio/James)

```bash
# Navigate to the directory where the repository is cloned
cd dev/v2.motorsafety.org

# Checkout the branch you wish to deploy
git fetch --all && git checkout {INSERT-BRANCH-NAME-HERE}

# Pull Changes from origin
git pull

# Deploy
yarn deploy && sudo shutdown -t now
```

### Deploy locally
```bash
# install the AWS Amplify CLI
npm install -g @aws-amplify/cli

# Init project
amplify init

# Publish
amplify publish
```

---
## Import dealers
####1. Empty data on Dynamodb table `V2_Motorsafety_Dealers`

####2. Empty Elasticsearch

Goto `https://search-appsync-domain-5e3agacwt4cs5kdyqyzngnkaiu.us-west-2.es.amazonaws.com/_plugin/kibana/`

Login with credentials `dev@adaptiadesign.com/123456789`

Goto `https://search-appsync-domain-5e3agacwt4cs5kdyqyzngnkaiu.us-west-2.es.amazonaws.com/_plugin/kibana/app/kibana#/dev_tools/console`
Enter `DELETE dealers` to delete all data on dealers

####3. Update `dealers-xlsx.js`
- Update `AWS_CREDENTIALS_PROFILE` to your credential  
- Update `FILENAME` to dealer filename

####4. Run file `dealers-xlsx.js` to import data into DynamoDB

####5. . Update `create-es-index.js`
- Update `AWS_CREDENTIALS_PROFILE` to your credential 

####6. . Run file `create-es-index.js` to import data into Elaticsearch


