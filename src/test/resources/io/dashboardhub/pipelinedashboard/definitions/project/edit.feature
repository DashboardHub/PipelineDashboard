Feature: Edit project

  Scenario: Edit project successfully
    Given I am logged in
      And I have a project with uid create-example-test-project-1 owned by TestUser
    When I go /project/edit/create-example-test-project-1
      And I fill in the field name with testname-update
      And I fill in the field description with testdescription-update
      And Submit the form form-project
    Then I get redirected to the /project page
      And I see element alert-successful
      And I go /project/edit/create-example-test-project-1
      And the field name contains testname-update

  Scenario: Edit project unsuccessfully
    Given I am logged in
      And I have a project with uid create-example-test-project-2 owned by TestUser
    When I go /project/edit/create-example-test-project-1
      And I fill in the field name with N
      And Submit the form form-project
    Then I see element alert-error
      And I see element name-error
      And the field name contains N

  Scenario: Edit someone elses project unsuccessfully
    Given I am logged in
      And I have a project with uid create-example-test-project-3 owned by AnotherUser
    When I go /project/edit/create-example-test-project-3
      And I fill in the field name with testname-update-testuser
      And Submit the form form-project
    Then I get redirected to the /project page
      And I see element alert-error
      And I go /project/edit/create-example-test-project-3
      And the field name contains example-test-project-name create-example-test-project-3
