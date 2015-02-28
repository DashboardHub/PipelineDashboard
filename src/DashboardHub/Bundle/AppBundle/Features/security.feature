Feature: As an user, I should not be able to access protected pages

  Scenario: Deny access to protected pages
    Given I am on the homepage
    And I go to "/dashboard"
#    Then I should see "/login/oauth/authorize"
