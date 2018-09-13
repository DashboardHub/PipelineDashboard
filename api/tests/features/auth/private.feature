Feature: Private

  Scenario: Private environments list as guest user fails
    Given I am logged in
    When I make a "GET" request to "/environments"
    Then the status code should be 200
    And should have a field "data" with length 2
