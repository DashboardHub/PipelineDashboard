Feature: Dashboard view

  Scenario: View dashboard
    Given I am logged in
    Then I should see "Dashboard"
    And I am on "/dashboard"
    Then I should see "DashboardHub"
    And I should see "DashboardHub/PipelineDashboard"
    Then I follow "View"
    And I should see "DashboardHub/PipelineDashboard"
    And I should see "Github Events"
