Feature: Private environments list
  In order to view the my environments
  As a logged in user
  I want to see the my environments

  Scenario: Private environments list
    Given I am logged in
    When I make a "GET" request to "/environments/list"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build-deploy"                             |
      | title         | "CreateEnvironment A"                      |
      | latestRelease | "OBJECT"                                   |
      | releases      | 0                                          |
      | tokens        | "ARRAY[1]"                                 |
      | monitors      | "ARRAY[0]"                                 |
      | latestPing    | "OBJECT"                                   |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | isPrivate     | false                                      |
      | views         | 0                                          |
      | progress      | { "current": 0, "next": 0 }                |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |
