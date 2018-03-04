Feature: Private environments list
  In order to view the my environments
  As a logged in user
  I want to see the my environments

  Scenario: Private environments list
    When I make a "GET" request to "/environments/list"
    Then the status code should be 200
    And should have a field "total" with value 3
    And should have a field "list" with length 3
    And should have a field "list" and in row 1 with:
      | field | value                                    |
      | id    | 1                                        |
      | owner | RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients |
      | type  | build                                    |
      | title | Environment A                            |
    #| latestRelease   | {}                  |
    #| releases        | 0                   |
    #| tokens          | []                  |
    #| monitors        | []                  |
    #| latestPing      | {}                  |
    #| pings           | {valid:0,invalid:0} |
    #| isPrivate       | false               |
    #| views           | 0                   |
    #| createdAt       | DATETIME            |
    #| updatedAt       | DATETIME            |
