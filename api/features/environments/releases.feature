Feature: Releases
  In order to view the releases
  As a logged in user
  I want to see the releases

  Scenario: Releases list
    Given I am logged in
    When I make a "GET" request to "/environments/4/releases"
    Then the status code should be 200
    And should have a field "total" with integer 4
    And should have a field "list" with length 4
    And should have an "array" field "list" and in row 1 with:
      | field        | value                      |
#      | id           | "1"                        |
      | version      | "v1.0.2"                   |
      | failDeploy   | null                       |
      | finishDeploy | "2018-01-27T09:14:23.932Z" |
      | startDeploy  | "2018-01-27T09:14:22.932Z" |
      | failBuild    | null                       |
      | finishBuild  | "2018-01-27T09:14:21.932Z" |
      | startBuild   | "2018-01-27T09:14:20.932Z" |
    And should have an "array" field "list" and in row 1 on "object" field "token" has:
      | field | value                           |
      | name  | "Continuous Integration Server" |
    And should have an "array" field "list" and in row 1 on "object" field "latest" has:
      | field     | value                      |
      | createdAt | "2018-01-27T09:14:23.932Z" |
      | state     | "finishDeploy"             |
