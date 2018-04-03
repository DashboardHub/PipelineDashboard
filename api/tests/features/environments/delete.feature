@All @Environments @EnvironmentDelete
Feature: Delete my environment
  In order to delete my environment
  As a logged in user
  I want to delete my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Can not delete a environment when not logged in
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-000000000000"
    Then the status code should be 403

  Scenario: Can not delete a non existing environment
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000004-0000-0000-0000-99999999999"
    Then the status code should be 404

  Scenario: Delete my environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/view"
    Then the status code should be 200
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-000000000000"
#    Then the status code should be 204 # @TODO: Do not return 200
    Then the status code should be 200
#    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/view"
#    Then the status code should be 404 # @TODO: check async