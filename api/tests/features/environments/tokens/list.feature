@All @Tokens @TokenList
Feature: Tokens
  In order to view the tokens
  As a logged in user
  I want to see the tokens of my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Tokens list
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/tokens"
    Then the status code should be 200
    And should have a field "total" with 2
    And should have a field "list" with length 2
    And should have an "array" field "list" and in row 1 with:
      | field    | value                                  |
      | id       | "e0000004-0000-0000-0000-t00000000001" |
      | name     | "Continuous Integration Server"        |
      | lastUsed | "2018-01-27T07:19:43.278Z"             |
