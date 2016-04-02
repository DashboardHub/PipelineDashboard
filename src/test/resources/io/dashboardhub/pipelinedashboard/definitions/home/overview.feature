# project list in order (recent desc)
# display owner name if exists otherwise display username

Feature: List recent public projects

  Scenario: Public projects only
    Given I am not logged in
      And I have a public project with uid overview-example-test-project-1 owned by TestUser
      And I have a private project with uid overview-example-test-project-2 owned by AnotherUser
    When I go /
    Then I see element uid_overview-example-test-project-1
      And I can not see element uid_overview-example-test-project-2
