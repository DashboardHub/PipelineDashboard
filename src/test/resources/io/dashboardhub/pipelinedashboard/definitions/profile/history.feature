Feature: User profile is audited

  Scenario: Updating user entity should be audited
    Given I am logged in
    When I go /profile
      And I fill in the field name with testname
      And I fill in the field email with test@email.com
      And Submit the form form-profile
    Then I go /profile
      And I fill in the field name with updatedtestname
      And I fill in the field email with updatedtest@email.com
      And Submit the form form-profile
    Then I go /profile/history
      And I see a minimum of 3 revision elements
