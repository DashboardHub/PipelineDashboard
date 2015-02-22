Feature: Localisation

  Scenario: Switching localisation
    Given I am on "/en/login"
    Then I should see "Email Address"
    When I follow "fr"
    Then I should see "Adresse e-mail"
