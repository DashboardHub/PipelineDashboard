Feature: Delete project

  Scenario: Delete project successfully
    Given I am logged in
      And I have a project with uid update-example-test-project-1 owned by TestUser
    When I go /project/delete/update-example-test-project-1
    Then I get redirected to the /project page
      And I see element alert-successful

  Scenario: Delete project unsuccessfully
    Given I am logged in
      And I have a project with uid update-example-test-project-2 owned by AnotherUser
    When I go /project/delete/update-example-test-project-2
    Then I get redirected to the /project page
      And I see element alert-error
