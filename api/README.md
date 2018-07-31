# DashboardHub API

## Dependencies

- NodeJS v8+
- MySQL v5.6

## Quickstart

### Run API

- `npm start` run full stack with serverless wrapping express

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

## Migrations & Seed

This will happen as part of running the application or tests.

- `npm run db:migrate`
- `npm run db:seed`

## Debugging

Prepend command with `DEBUG=*`

For example `DEBUG=* npm start`, then with a validation error example output...

```bash
sequelize:pool connection acquired +9ms
sequelize:sql:mysql executing(default) : INSERT INTO `environments` (`name`) VALUES ('Environment 1'),('Environment 2'); +9ms
sequelize:sql:mysql executed(default) : INSERT INTO `environments` (`name`) VALUES ('Environment 1'),('Environment 2'); +4ms
sequelize:pool connection released +5ms
retry-as-promised:error SequelizeUniqueConstraintError: Validation error +0ms

ERROR: Validation error
```
