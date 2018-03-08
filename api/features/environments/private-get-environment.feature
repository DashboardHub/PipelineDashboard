Feature: Get my environment
  In order to view the my environment
  As a logged in user
  I want to see the my environment

  Scenario: Get my environment
    Given I am logged in
    When I make a "GET" request to "/environments/4"
    Then the status code should be 200
    And should have a field "id" with value "4"
    And should have a field "owner" with value "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "type" with value "build-deploy"
    And should have a field "title" with value "Environment D"
    And should have a field "releases" with value 800
    And should have a field "views" with value 10324
#    And should have a field "isPrivate" with value false
    And should have a field "tokens" with object:
      | field | value                                |
      | id    | c4703951-0331-11e8-94a3-8b807373e11e |
    And should have a field "latestRelease" with object:
      | field         | value                                       |
      | id            | "721fe0a0-0332-11e8-94a3-8b807373e11e"      |
      | environmentId | "2"                                         |
      | release       | "v1.0.1"                                    |
      | state         | "finishDeploy"                              |
      | token         | { "name": "Continuous Integration Server" } |
      | createdAt     | "2018-01-27T07:19:43.274Z"                  |
      | updatedAt     | "2018-01-27T07:19:43.274Z"                  |
    And should have a field "latestPing" with object:
      | field         | value                      |
      | id            | "1"                        |
      | environmentId | "4"                        |
      | monitorId     | "4"                        |
      | duration      | 1                          |
      | codeMatched   | true                       |
      | textMatched   | true                       |
      | url           | "http://example.com/"      |
      | createdAt     | "2018-01-27T09:14:10.932Z" |
      | updatedAt     | "2018-01-27T09:14:10.932Z" |
    And should have a field "createdAt" with value "2018-01-27T09:14:10.932Z"
    And should have a field "updatedAt" with value "2018-01-27T09:14:10.932Z"
