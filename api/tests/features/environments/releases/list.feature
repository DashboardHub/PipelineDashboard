@All @Releases @ReleaseList
Feature: Releases
  In order to view the releases
  As a logged in user
  I want to see the releases

  @Seed
  Scenario: Run in seed data

  Scenario: Releases list
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/releases"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 with:
      | field        | value                      |
      | version      | "v2.0.1312-ALPHA"          |
      | failDeploy   | null                       |
      | finishDeploy | "2018-01-27T09:19:56.932Z" |
      | startDeploy  | "2018-01-27T09:18:14.932Z" |
      | failBuild    | null                       |
      | finishBuild  | "2018-01-27T09:16:22.932Z" |
      | startBuild   | "2018-01-27T09:14:30.932Z" |
    And should have an "array" field "list" and in row 1 on "object" field "token" has:
      | field | value                           |
      | name  | "Continuous Integration Server" |
    And should have an "array" field "list" and in row 1 on "object" field "latest" has:
      | field     | value                      |
      | createdAt | "2018-01-27T09:19:56.932Z" |
      | state     | "finishDeploy"             |
