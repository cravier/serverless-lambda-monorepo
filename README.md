# Serverless Framework Node HTTP API on AWS

Serverless credentials and profile per stage documentation : [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#using-aws-access-keys)

## Monorepo

This repo is built as a mono repo:
- All the services are located under the `services` workspace.
- The code shared between the services is hosted under the `packages` workspace.

📦serverless-lambda-monorepo
  📂packages
  📂services
  ┣ 📂ses
  ┃ ┣ 📜index.js
  ┃ ┣ 📜package.json
  ┃ ┗ 📜serverless.yml
  ┗ 📂sns
  ┃ ┣ 📜index.js
  ┃ ┣ 📜package.json
  ┃ ┗ 📜serverless.yml

Every serverless service has at least 3 files:
- `index.js` : entry point of the lambda function
- `serverless.yml` IaC/serverless framework config file
- `package.json` dependencies and scripts for this service

### Turborepo

Generak documentation: https://turbo.build/repo/docs

Why turbo is one of the best option for monorepo: https://turbo.build/repo/docs/core-concepts/monorepos

### pnpm

There is something that turborepo do not manage, it is the packages management (installation/update). pnpm is currently one of the fastest package manager.

https://pnpm.io/pnpm-vs-npm

## Usage

### Setup AWS credentials

Create an access key in the serverless platform:
````
https://app.serverless.com/[username]/settings/accessKeys
````

Then
```
$ vi ~/.aws/credentials

[serverless-lambda-monorepo]
aws_access_key_id=***************
aws_secret_access_key=***************
```

You can add ass many profile as you want

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```
serverless info
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function api
```

Which should result in response similar to the following:

```
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
