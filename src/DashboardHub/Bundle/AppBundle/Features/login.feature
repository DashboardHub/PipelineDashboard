Feature: As an user, I want to be able to login via Github

  Scenario: Login via Github
    Given I am on "/development/mock/login"
    And I should see "Username"
    And I should see "Password"
    And I press "login"
    Then I should see "Logout"
    And I should see "Dashboard"
