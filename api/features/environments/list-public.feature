Feature: Public environments list
  In order to view the public environments
  As a public user
  I want to see the public environments

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with integer 5
    And should have a field "list" with length 5
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "STRING"                                   |
      | title         | "STRING"                                   |
      | latestRelease | {}                                         |
      | releases      | 0                                          |
      | tokens        | []                                         |
      | monitors      | []                                         |
      | latestPing    | {}                                         |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | isPrivate     | false                                      |
      | views         | 0                                          |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |

  Scenario: Public environments list when logged in
    Given I am logged in
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with integer 5
    And should have a field "list" with length 5
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "STRING"                                   |
      | title         | "STRING"                                   |
      | latestRelease | {}                                         |
      | releases      | 0                                          |
      | tokens        | []                                         |
      | monitors      | []                                         |
      | latestPing    | {}                                         |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | isPrivate     | false                                      |
      | views         | 0                                          |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |
