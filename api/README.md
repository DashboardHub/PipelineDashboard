# PipelineDashboard API

Using Serverless framework on AWS Lambda

## Restful API documentation

### Environments

#### List

Public list `GET /environments`
Private list `GET /environments/list`

```json
{
    "total": 2,
    "list": [
        {
            "latestRelease": null,
            "isPrivate": false,
            "releases": 0,
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
            "latestRelease": "v0.0.3",
            "isPrivate": false,
            "releases": 2,
            "updatedAt": "2017-08-04T08:44:56.748Z",
            "createdAt": "2017-08-04T08:27:14.578Z",
            "link": null,
            "description": "This is a test server 2 aaaa",
            "id": "b82fcf20-78ee-11e7-9196-efded3e8d95c",
            "tags": [
                "test"
            ],
            "title": "Test server 2"
        }
    ]
}
```

#### Create

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

#### Details

`GET /environments/{id}

```json
{
    "latestRelease": "v0.0.3",
    "isPrivate": false,
    "releases": 2,
    "updatedAt": "2017-08-04T08:44:56.748Z",
    "createdAt": "2017-08-04T08:27:14.578Z",
    "link": null,
    "description": "This is a test server 2 aaaa",
    "id": "b82fcf20-78ee-11e7-9196-efded3e8d95c",
    "tags": [
        "test"
    ],
    "title": "Test server 2"
}
```

#### Update

```
PATCH /environments/{id}

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

#### Delete

`DELETE /environments/{id}

```json
{}
```

### Deployed version

#### Create

`state` options: `startBuild`, `finishBuild`, `startDeploy`, `finishDeploy`

> e.g. POST /environments/{id}/deployed/{token}/finishDeploy 

```
POST /environments/{id}/deployed/{token}/{state}

{
	"release": "v0.0.3"
}
```

```json
{
    "id": "b82fcf20-78ee-11e7-9196-efded3e8d95c",
    "enviromentId": "b82fcf20-78ee-11e7-9196-efded3e8d95c",
    "release": "v0.0.3",
    "state": "startDeploy",
    "updatedAt": "2017-08-04T08:28:05.848Z",
    "createdAt": "2017-08-04T08:27:14.578Z",
    "token": {}
}
```

#### List

```
GET /environments/{id}/deployed
```

```json
{
  "total": 1,
  "list": [
    {
      "createdAt": "2017-12-13T07:26:26.754Z",
      "environmentId": "b4d0b870-c9e9-11e7-aeea-eb4cced29ed2",
      "id": "ee074a20-dfd6-11e7-bee3-55f883682be0",
      "release": "0.7.767",
      "state": "startDeploy",
      "token": {
        "name": "TravisCI"
      }
    }
  ]
}
```

### Tokens

#### List

```
GET /environments/{id}/tokens
```

```json
{
  "total": 1,
  "list": [
    {
      "name": "CI server",
      "createdAt": "2017-11-06T06:38:27.024Z",
      "id": "184a9d00-c2bd-11e7-829d-851258883d74",
      "environmentId": "14c9dab0-c2bd-11e7-829d-851258883d74"
    }
  ]
}
```

#### Create

```
POST /environments/{id}/tokens

{
  "name": "aaaaa"
}
```

```json
{
  "id": "8e081a80-c2be-11e7-8d8e-939a2e2af2d8",
  "environmentId": "8e081a80-c2be-11e7-8d8e-939a2e2af2d8",
  "name": "aaaaa"
}
```

#### Delete

```
DELETE /environments/{id}/tokens/{tokenId}
```

```json
{
  "total": 1,
  "list": [
    {
      "name": "Another token",
      "createdAt": "2017-11-06T06:38:27.024Z",
      "id": "184a9d00-c2bd-11e7-829d-851258883d74",
      "environmentId": "14c9dab0-c2bd-11e7-829d-851258883d74"
    }
  ]
}
```

### Releases

#### List

```
GET /environments/{id}/releases
```

```json
{
  "total": 1,
  "list": [
    {
      "version": "0.7.736",
      "token": {
        "name": "TravisCI"
      },
      "failDeploy": null,
      "finishDeploy": "2017-12-10T16:30:35.042Z",
      "startDeploy": "2017-12-10T16:22:46.464Z",
      "failBuild": null,
      "finishBuild": "2017-12-10T16:22:45.379Z",
      "startBuild": "2017-12-10T16:22:14.141Z",
      "latest": {
        "createdAt": "2017-12-10T16:30:35.042Z",
        "state": "finishDeploy"
      }
    }
  ]
}
```

### Monitors

#### Create

```
POST /environments/{id}/monitors

{
  "path": "/",
  "method": "GET",
  "expectedCode": 200,
  "expectedText": ""
}
```

```json
{
  "id": "8e081a80-c2be-11e7-8d8e-939a2e2af2d8",
  "path": "/",
  "method": "GET",
  "expectedCode": 200,
  "expectedText": ""
}
```

#### Delete

```
DELETE /environments/{id}/monitors/{monitorId}
```

```json

```

#### List

```
GET /environments/{id}/monitors
```

```json
{
  "total": 1,
  "list": [
    {
      "id": "481aca30-ee02-11e7-9016-9b9d57f7d18f",
      "path": "/",
      "method": "GET",
      "expectedCode": "200"
    }
  ]
}
```

### Pings

#### List

```
GET /environments/{id}/pings
```

```json
{
  "total": 1,
  "list": [
    {
      "duration": 128,
      "createdAt": "2017-12-31T08:43:08.160Z",
      "environmentId": "ccaee6e0-edfe-11e7-9016-9b9d57f7d18f",
      "monitorId": "481aca30-ee02-11e7-9016-9b9d57f7d18f",
      "codeMatched": false,
      "textMatched": true,
      "id": "a01da000-ee06-11e7-9016-9b9d57f7d18f",
      "url": "http://pipeline.dashboardhub.io/",
      "statusCode": 301,
      "updatedAt": "2017-12-31T08:43:08.160Z"
    }
  ]
}
```

### Ping

```
POST /environments/{id}/monitors/{monitorId}/ping

{
  "environment": {
    "id": "ccaee6e0-edfe-11e7-9016-9b9d57f7d18f"
  },
  "monitor": {
    "id": "481aca30-ee02-11e7-9016-9b9d57f7d18f",
  }
}
```

```json
{
  "id": "f230b6b0-ee07-11e7-9016-9b9d57f7d18f",
  "environmentId": "ccaee6e0-edfe-11e7-9016-9b9d57f7d18f",
  "monitorId": "481aca30-ee02-11e7-9016-9b9d57f7d18f",
  "url": "http://pipeline.dashboardhub.io/",
  "statusCode": 301,
  "codeMatched": false,
  "textMatched": true,
  "duration": 303
}
```
