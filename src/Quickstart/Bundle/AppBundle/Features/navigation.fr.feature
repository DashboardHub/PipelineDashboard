Feature: Navigation in French

  Scenario: Viewing the main navigation
    Given I am on "/fr"
    Then I should see "Accueil"
    Then I should see "S'identifier"

  Scenario: Viewing the language navigation
    Given I am on "/fr"
    Then I should see "en"
    Then I should see "fr"
