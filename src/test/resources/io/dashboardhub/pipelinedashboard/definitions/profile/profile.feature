Feature: User can update their profile

  Scenario: Updating user profile successfully
    Given I am logged in
    When I go /profile
      And I fill in the field name with testname
      And I fill in the field email with test@email.com
      And Submit the form form-profile
    Then I see element alert-successful
      And I can not see element alert-error
      And I can not see element name-error
      And I can not see element email-error
      And the field name contains testname
      And the field email contains test@email.com

  Scenario: Updating user profile unsuccessfully
    Given I am logged in
    When I go /profile
      And I fill in the field name with N
      And I fill in the field email with E
      And Submit the form form-profile
    Then I see element alert-error
      And I can not see element alert-successful
      And I see element name-error
      And I see element email-error
      And the field name contains N
      And the field email contains E
