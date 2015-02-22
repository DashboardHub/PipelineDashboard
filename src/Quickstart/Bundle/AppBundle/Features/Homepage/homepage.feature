Feature: As an applicant, after logging in, I want to see my homepage

Scenario:
  Given I am logged in as "admin@test.com" with password "password"
  Then I should see "My Account"
  And I should see "admin@test.com"
  And I should see "Logout"
  And I should not see "Login"
