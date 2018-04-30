@All @Environments @EnvironmentGet @EnvironmentGetPublic
Feature: Get public environment
  In order to view the an environment
  As a logged in user
  I want to see the my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Get a non existing environment
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-999999999999/view"
    Then the status code should be 404

  Scenario: Get my environment
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/view"
    Then the status code should be 200
    And should have a field "id" with "e0000004-0000-0000-0000-000000000000"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "type" with "build-deploy"
    And should have a field "title" with "Environment D"
    And should have a field "releases" with 800
    And should have a field "views" with "NUMBER"
    And should not have a field "isPrivate"
    And should not have a field "tokens"
    And should have a field "latestRelease" with "object":
      | field         | value                                       |
      | id            | "e0000004-0000-0000-0000-r00000000001"      |
      | environmentId | "e0000004-0000-0000-0000-000000000000"      |
      | release       | "v2.0.1312-ALPHA"                           |
      | state         | "finishDeploy"                              |
      | token         | { "name": "Continuous Integration Server" } |
      | createdAt     | "2018-01-27T07:19:43.274Z"                  |
      | updatedAt     | "2018-01-27T07:19:43.274Z"                  |
    And should have a field "latestPing" with "object":
      | field         | value                                  |
      | id            | "e0000004-0000-0000-0000-p00000000001" |
      | environmentId | "e0000004-0000-0000-0000-000000000000" |
      | monitorId     | "e0000004-0000-0000-0000-m00000000001" |
      | duration      | 1                                      |
      | codeMatched   | true                                   |
      | textMatched   | true                                   |
      | url           | "http://example.com/"                  |
      | createdAt     | "2018-01-27T09:14:10.932Z"             |
      | updatedAt     | "2018-01-27T09:14:10.932Z"             |
    And should have a field "progress" with "object":
      | field   | value |
      | current | 100   |
      | next    | 100   |
    And should have an "array" field "monitors" and in row 1 with:
      | field        | value                                  |
      | id           | "e0000004-0000-0000-0000-m00000000001" |
      | path         | "/"                                    |
      | method       | "GET"                                  |
      | expectedCode | 200                                    |
      | expectedText | "DashboardHub"                         |
    And should have a field "createdAt" with "2018-01-27T09:14:10.962Z"
    And should have a field "updatedAt" with "2018-01-27T09:14:10.962Z"
