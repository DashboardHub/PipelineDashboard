Feature: Dashboard list

  Scenario: List dashboards
    Given I am logged in
    Then I should see "Dashboard"
    And I am on "/dashboard"
    Then I should see "DashboardHub"
    And I should see "DashboardHub/PipelineDashboard"
