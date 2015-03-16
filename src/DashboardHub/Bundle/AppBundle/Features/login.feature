Feature: As an user, I want to be able to login

  Scenario: Login
    Given I am on "/development/mock/login"
    And I should see "Username"
    And I should see "Password"
    And I press "Login"
    Then I should see "Logout"
    And I should see "Dashboard"
    And I should see "Your Dashboards"
