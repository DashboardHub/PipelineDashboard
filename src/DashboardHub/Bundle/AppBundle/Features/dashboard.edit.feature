Feature: Dashboard Edit

  Scenario: Edit Dashboard
    Given I am logged in
    And I am on "/dashboard"
    Then I should see "Edit"
    And I follow "Edit"
    And I should see "Edit Dashboard"
    And I fill in "dashboard_name" with "behat-test-github2"
    And I press "Save"
    And I should see "Your Dashboards"
    And I should see "Dashboard updated"
    And I should see "MockUser"
    And I should see "behat-test-github2"
