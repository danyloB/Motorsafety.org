export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "usersGroupRole": "string"
        },
        "motorsafetybdb75347bdb75347": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "motorsafety": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "nhtsaModelSync": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "CloudWatchEventRule": "string"
        },
        "motorSafetyPreSignup": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}