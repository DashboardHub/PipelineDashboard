Feature: Hello world

  Scenario: Public environments list as guest user
    When I make a "GET" request to "/"
    Then the status code should be 200
    And should have a field "data" with length 2
