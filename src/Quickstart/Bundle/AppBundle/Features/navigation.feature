Feature: Navigation

  Scenario: Viewing the main navigation
    Given I am on "/"
    Then I should see "Home"
    Then I should see "Login"

  Scenario: Viewing the main navigation
    Given I am on "/en"
    Then I should see "Home"
    Then I should see "Login"

  Scenario: Viewing the language navigation
    Given I am on "/"
    Then I should see "en"
    Then I should see "fr"

  Scenario: Viewing the language navigation
    Given I am on "/en"
    Then I should see "en"
    Then I should see "fr"
