Feature: Public environments list
  In order to view the public environments
  As a public user
  I want to see the public environments

  Scenario: Public environments list
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "total" with value 4
    And should have a field "list" with length 4
    And should have a field "list" and in row 1 with:
      | field | value            |
      | id    | 1                |
      | owner | github\|11989248 |
      | type  | build            |
      | title | Environment A    |
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
