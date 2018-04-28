@All @Environments @EnvironmentList @EnvironmentListPublic
Feature: Public environments list
  In order to view the public environments
  As a public user
  I want to see the public environments

  @Seed
  Scenario: Run in seed data

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 no field "tokens"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                                      |
      | id            | "UUID"                                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"                 |
      | title         | "Environment D"                                            |
      | type          | "build-deploy"                                             |
      | link          | "https://dashboardhub.io"                                  |
      | logo          | "https://cdn.dashboardhub.io/icon-only-orange-120x120.png" |
      | monitors      | "ARRAY[1]"                                                 |
      | latestRelease | "OBJECT"                                                   |
      | releases      | 800                                                        |
      | views         | 10324                                                      |
      | latestPing    | "OBJECT"                                                   |
      | pings         | { "valid": 123, "invalid": 32 }                            |
      | progress      | { "current": 100, "next": 100 }                            |
      | createdAt     | "DATETIME"                                                 |
      | updatedAt     | "DATETIME"                                                 |

  Scenario: Public environments list when logged in
    Given I am logged in
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 no field "tokens"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                                      |
      | id            | "UUID"                                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"                 |
      | type          | "build-deploy"                                             |
      | title         | "Environment D"                                            |
      | link          | "https://dashboardhub.io"                                  |
      | logo          | "https://cdn.dashboardhub.io/icon-only-orange-120x120.png" |
      | monitors      | "ARRAY[1]"                                                 |
      | latestRelease | "OBJECT"                                                   |
      | releases      | 800                                                        |
      | views         | 10324                                                      |
      | latestPing    | "OBJECT"                                                   |
      | pings         | { "valid": 123, "invalid": 32 }                            |
      | progress      | { "current": 100, "next": 100 }                            |
      | createdAt     | "DATETIME"                                                 |
      | updatedAt     | "DATETIME"                                                 |
