Feature: List projects

  Scenario: Add project should appear in the list
    Given I am logged in
      And I have a public project with uid list-example-test-project-1 owned by TestUser
    When I go /project
    Then I see element uid_list-example-test-project-1
