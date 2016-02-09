Feature: Successful logins are recorded

  Scenario: After a successful login a record is made
    Given I am logged in
    When I go /profile
    Then I see element lastLoggedIn
