Feature: Successful logins are recorded

  Scenario: After a successful login a record is made
    Given I am logged in
    When I go /profile
    Then I see 1 element in audit-list

  Scenario: After another successful login a record is made
    Given I am logged in
    When I go /profile
    Then I see 2 element in audit-list
