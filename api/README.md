# PipelineDashboard API

Using Serverless framework on AWS Lambda

## QuickStart

Install [Serverless](https://serverless.com) with `npm install -g serverless`.

### Deploy

`serverless deploy -v`

### Delete Deployment

`serverless remove`

## Development

1. `npm install`
2. `serverless dynamodb install`
3. `serverless offline start` (need `java` installed)
4. `serverless dynamodb migrate` (this imports schema)
