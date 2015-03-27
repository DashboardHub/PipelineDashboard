Feature: Dashboard view

  Scenario: View dashboard
    Given I am logged in
    Then I should see "Dashboard"
    And I am on "/dashboard"
    Then I should see "behat-test-github"
    And I should see "DashboardHub/PipelineDashboard"
    Then I follow "View"
    And I should see "DashboardHub/PipelineDashboard"
    And I should see "Github"
    And I should see "Github Events"
    And I should see "Top Contributors"

  Scenario: View dashboard in different Theme
    Given I am logged in
    Then I should see "Dashboard"
    And I am on "/dashboard"
    Then I should see "behat-test-github"
    And I should see "DashboardHub/PipelineDashboard"
    Then I should see "Edit"
    And I follow "Edit"
    And I should see "Edit Dashboard"
    And I should see "behat-test-github"
    And I should see "Github"
    And I fill in "dashboard_theme" with "DashboardHubAppBundle:Template:GithubTravis.html.twig"
    And I press "Save"
    And I should see "Your Dashboards"
    And I should see "Dashboard updated"
    And I should see "MockUser"
    And I should see "behat-test"
    Then I follow "View"
    And I should see "DashboardHub/PipelineDashboard"
    And I should see "GithubTravis"
    And I should see "Github Events"
    And I should not see "Top Contributors"
