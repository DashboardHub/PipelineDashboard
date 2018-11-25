Feature: Private

  Scenario: Private environments list as guest user fails
    When I make a "GET" request to "/environments"
    Then the status code should be 401

  Scenario: Private environments list as member
    Given I am logged in with "test1@test.com" and "Password$1"
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "list" with length 2
