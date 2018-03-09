Feature: Private environments list
  In order to view the my environments
  As a logged in user
  I want to see the my environments

  Scenario: Private environments list
    Given I am logged in
    When I make a "GET" request to "/environments/list"
    Then the status code should be 200
    And should have a field "total" with integer 3
    And should have a field "list" with length 3
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "1"                                        |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | type          | "build"                                    |
      | title         | "Environment A"                            |
      | latestRelease | {}                                         |
      | releases      | 0                                          |
      | tokens        | []                                         |
      | monitors      | []                                         |
      | latestPing    | {}                                         |
      | pings         | { "valid": 0, "invalid": 0 }               |
      | isPrivate     | false                                      |
      | views         | 0                                          |
      | createdAt     | 2018-01-27T09:14:10.932Z                   |
      | updatedAt     | 2018-01-27T09:14:10.932Z                   |
