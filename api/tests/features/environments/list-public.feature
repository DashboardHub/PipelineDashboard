Feature: Public environments list
  In order to view the public environments
  As a public user
  I want to see the public environments

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 no field "tokens"
    And should have an "array" field "list" and in row 1 no field "monitors"
    And should have an "array" field "list" and in row 1 no field "views"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build-deploy"                             |
      | title         | "CreateEnvironment A"                      |
      | latestRelease | "OBJECT"                                   |
      | releases      | 0                                          |
      | latestPing    | "OBJECT"                                   |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | progress      | { "current": 0, "next": 0 }                |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |

  Scenario: Public environments list when logged in
    Given I am logged in
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 no field "tokens"
    And should have an "array" field "list" and in row 1 no field "monitors"
    And should have an "array" field "list" and in row 1 no field "views"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build-deploy"                             |
      | title         | "CreateEnvironment A"                      |
      | latestRelease | "OBJECT"                                   |
      | releases      | 0                                          |
      | latestPing    | "OBJECT"                                   |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | progress      | { "current": 0, "next": 0 }                |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |
