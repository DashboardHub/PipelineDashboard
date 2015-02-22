Feature: Homepage in French

  Scenario: Homepage
    Given I am on "/fr"
    Then I should see "Accueil"
      And I should see "Overview"
