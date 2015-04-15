Feature: Badge

  Scenario: Display Badge Failure
    Given I am on "/badge/abc"
    Then I should wait "2" secs
    And I should be on "/"
    And I should see "Invalid Dashboard"
    And I should see "Free Sign in with Github"

  Scenario: Display Badge
    Given I am on "/badge/123"
    Then the response should not contain "Invalid Dashboard"
    And the response should not contain "Free Sign in with Github"
    And the response should contain "DashboardHub"
    And the response should contain "GithubTravis"
