@All @Tokens @TokenCreate
Feature: Create Token
  In order to create a Token
  As a logged in user
  I want to post token data

  @Seed
  Scenario: Run in seed data

  Scenario: Create Token successfully
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/tokens" with:
      | field | value        |
      | name  | "Test Token" |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "name" with "Test Token"
    And should not have a field "lastUsed"

  Scenario: Environment ID required
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-99999999999/tokens" with:
      | field | value     |
      | name  | "Invalid" |
    Then the status code should be 404
