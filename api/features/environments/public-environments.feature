Feature: Public environments list
  In order to view the public environments
  As a public user
  I want to see the public environments

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with integer 4
    And should have a field "list" with length 4
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "1"                                        |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build"                                    |
      | title         | "Environment A"                            |
      | latestRelease | {}                                         |
      | releases      | 0                                          |
      | latestPing    | {}                                         |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | createdAt     | "2018-01-27T09:14:10.932Z"                                   |
      | updatedAt     | "2018-01-27T09:14:10.932Z"                                   |

  Scenario: Public environments list when logged in
    Given I am logged in
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with integer 4
    And should have a field "list" with length 4
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "1"                                        |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build"                                    |
      | title         | "Environment A"                            |
      | latestRelease | {}                                         |
      | releases      | 0                                          |
      | latestPing    | {}                                         |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | createdAt     | "2018-01-27T09:14:10.932Z"                                   |
      | updatedAt     | "2018-01-27T09:14:10.932Z"                                   |
