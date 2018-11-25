Feature: List all public environments

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/"
    Then the status code should be 200
    And should have a field "list" with length 2

  Scenario: Public environments list as member with no private environment
    Given I am logged in with "test2@test.com" and "Password$1"
    When I make a "GET" request to "/"
    Then the status code should be 200
    And should have a field "list" with length 2

  Scenario: Public environments list as member with private environment
    Given I am logged in with "test1@test.com" and "Password$1"
    When I make a "GET" request to "/"
    Then the status code should be 200
    And should have a field "list" with length 2
