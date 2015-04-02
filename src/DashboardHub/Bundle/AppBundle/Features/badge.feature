Feature: Badge

  Scenario: Display Badge Failure
    Given I am on "/badge/abc"
    Then I should wait "2" secs
    And I should be on "/"
    And I should see "Invalid Dashboard"
    And I should see "Free Sign in with Github"

  Scenario: Display Badge Failure
    Given I am on "/b/abc"
    Then I should wait "2" secs
    And I should be on "/"
    And I should see "Invalid Dashboard"
    And I should see "Free Sign in with Github"

  Scenario: Display Badge
    Given I am on "/badge/123"
    Then I should not see "Invalid Dashboard"
    And I should not see "Free Sign in with Github"
    And I should see "DashboardHub"
    And I should see "GithubTravis"

  Scenario: Display Badge
    Given I am on "/b/123"
    Then I should not see "Invalid Dashboard"
    And I should not see "Free Sign in with Github"
    And I should see "DashboardHub"
    And I should see "GithubTravis"
