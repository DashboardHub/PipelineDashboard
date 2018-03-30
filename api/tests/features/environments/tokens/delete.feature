Feature: Delete token from my environment
  In order to delete a token from my environment
  As a logged in user
  I want to delete a token from my environment

  Scenario: Can not delete a token from my environment when not logged in
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-000000000000/tokens/e0000002-0000-0000-0000-t00000000001"
    Then the status code should be 403

  Scenario: Can not delete a non existing token from a non existing environment
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000004-0000-0000-0000-99999999999/tokens/e0000004-0000-0000-0000-99999999999"
    Then the status code should be 404

  Scenario: Can not delete a non existing token from my environment
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000004-0000-0000-0000-000000000000/tokens/e0000004-0000-0000-0000-99999999999"
    Then the status code should be 404

  Scenario: Delete a token from my environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000"
    Then the status code should be 200
    And should have a field "tokens" with length 2
    When I make a "DELETE" request to "/environments/e0000004-0000-0000-0000-000000000000/tokens/e0000004-0000-0000-0000-t00000000001"
#    Then the status code should be 204 # @TODO: Do not return 200
    Then the status code should be 200
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000"
    Then the status code should be 200
    And should have a field "tokens" with length 1
