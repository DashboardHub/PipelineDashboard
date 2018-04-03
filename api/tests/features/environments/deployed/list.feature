@All @Deployed @DeployedList
Feature: Deployed
  In order to view the deploys
  As a logged in user
  I want to see the deploys of my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Deployed list
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/deployed"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 with:
      | id            | "e0000004-0000-0000-0000-r00000000019" |
      | environmentId | "e0000004-0000-0000-0000-000000000000" |
      | release       | "v2.0.0"                               |
      | state         | "finishDeploy"                         |
      | createdAt     | 1517044796932                          |
      | updatedAt     | 1517044796932                          |
#    And should have a field "token" with "object":
#      | field | value                           |
#      | name  | "Continuous Integration Server" |
