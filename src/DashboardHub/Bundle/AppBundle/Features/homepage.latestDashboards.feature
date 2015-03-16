Feature: Homepage shows latest Dashboard

  Scenario outline: Latest Dashboard
    Given I am on "/"
    Then I should see "Home"
    And I should see "Login"
    And I should see "Latest Open Source Dashboards"
