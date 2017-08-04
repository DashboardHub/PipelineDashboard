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

### Debugging

`serverless logs -f environmentList -t`

## Restful API

### List

`GET /environments`

```json
{
    "total": 2,
    "list": [
        {
            "isPrivate": false,
            "updatedAt": "2017-07-30T10:22:00.297Z",
            "createdAt": "2017-07-30T10:22:00.297Z",
            "description": "This is a test server",
            "id": "ec546590-7510-11e7-91bc-8353beebb88a",
            "tags": [
                "dev"
            ],
            "title": "Test server"
        },
        {
            "isPrivate": false,
            "updatedAt": {},
            "createdAt": "2017-07-30T10:21:43.477Z",
            "description": "test description 2",
            "id": "e24e0560-7510-11e7-91bc-8353beebb88a",
            "tags": [
                "prod",
                "live"
            ],
            "title": "test server 2"
        }
    ]
}
```

### Create

```
POST /environments

{
	"title":"Test server",
	"description":"This is a test server",
	"tags": ["dev"]
}

```

```json
{
    "id": "ec546590-7510-11e7-91bc-8353beebb88a",
    "title": "Test server",
    "description": "This is a test server",
    "tags": [
        "dev"
    ],
    "isPrivate": false,
    "createdAt": "2017-07-30T10:22:00.297Z",
    "updatedAt": "2017-07-30T10:22:00.297Z"
}
```

### Details

`GET /environments/ec546590-7510-11e7-91bc-8353beebb88a`

```json
{
    "id": "ec546590-7510-11e7-91bc-8353beebb88a",
    "title": "Test server",
    "description": "This is a test server",
    "tags": [
        "dev"
    ],
    "isPrivate": false,
    "createdAt": "2017-07-30T10:22:00.297Z",
    "updatedAt": "2017-07-30T10:22:00.297Z"
}
```

### Update

```
PATCH /environments/ec546590-7510-11e7-91bc-8353beebb88a

[
	{
		"op": "replace",
		"path": "/title",
		"value": "test server 2a"
	},
	{
		"op": "replace",
		"path": "/description",
		"value": "test description 2a"
	}
]
```

```json
{
    "id": "ec546590-7510-11e7-91bc-8353beebb88a",
    "title": "test server 2a",
    "description": "test description 2a",
    "tags": [
        "dev"
    ],
    "isPrivate": false,
    "createdAt": "2017-07-30T10:22:00.297Z",
    "updatedAt": "2017-07-30T10:22:00.297Z"
}
```
