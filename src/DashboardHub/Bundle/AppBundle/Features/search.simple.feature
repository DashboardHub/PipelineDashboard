Feature: Dashboard Search

  Scenario: Visiting the Search Dashboard page
    Given I am on "/search"
    Then I should see "Search Dashboards"
    And I should not see "Example Dashboard"

  Scenario: Invalid Search
    Given I am on "/search"
    And I press "Go"
    Then I should see "This value should not be blank"

  Scenario: Search with Results
    Given I am on "/search"
    And I fill in "search_query" with "behat-test"
    And I press "Go"
    Then I should see "Search Dashboards"
    And I should see "MockUser"
    And I should see "behat-test"
