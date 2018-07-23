# DashboardHub API

## Dependencies

- NodeJS v8+
- ElasticSearch (Elastic)

## Quickstart

### Run API

- `npm start`

### Run tests

Automated tests are done using CucumberJS and a code coverage report is generated with NYC.

- `npm test`

Example output:

```
api git:(develop) ✗ npm test

> pipeline-api@0.10.0 test /Users/eaj/Downloads/PipelineDashboard.express/api
> tslint src/**/*.ts && tsc && nyc cucumber-js ./tests/features --require ./tests --format ./node_modules/cucumber-pretty --exit

Feature: Hello world

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/"
server is listening on 3000
    Then the status code should be 200
    And should have a field "message" with "Hello World!"

1 scenario (1 passed)
3 steps (3 passed)
0m00.064s

=============================== Coverage summary ===============================
Statements   : 93.33% ( 14/15 )
Branches     : 75% ( 3/4 )
Functions    : 100% ( 4/4 )
Lines        : 93.33% ( 14/15 )
================================================================================
```

## Hello world

phase 1
- auto reload api
- serverless
- lint strict
- tsconfig

phase 2
- authentication
- environments
