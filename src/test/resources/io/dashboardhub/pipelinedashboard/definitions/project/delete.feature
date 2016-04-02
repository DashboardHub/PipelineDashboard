Feature: Delete project

  Scenario: Delete project successfully
    Given I am logged in
      And I have a public project with uid update-example-test-project-1 owned by TestUser
    When I go /project/delete/update-example-test-project-1
    Then I get redirected to the /project page
      And I see element alert-successful
      And I can not see element uid_update-example-test-project-1

  Scenario: Delete project unsuccessfully
    Given I am logged in
      And I have a public project with uid update-example-test-project-2 owned by AnotherUser
    When I go /project/delete/update-example-test-project-2
    Then I get redirected to the /project page
      And I see element alert-error
      # @ToDo: when search in implemented, extra test can be achieved
#      And I go /search
#      And I see element uid_update-example-test-project-2
