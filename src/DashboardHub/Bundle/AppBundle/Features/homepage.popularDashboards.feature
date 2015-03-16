Feature: Homepage shows latest Dashboard

  Scenario outline: Latest Dashboard
    Given I am on "/"
    Then I should see "Home"
    And I should see "Login"
    And I should see "Most Popular Open Source Dashboards"
    And I should not see "Private Dashboard"
