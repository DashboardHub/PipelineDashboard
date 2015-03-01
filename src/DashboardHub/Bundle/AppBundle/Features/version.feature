Feature: Version display check

  Scenario: Version on the homepage
    Given I am on "/"
    Then I should see "Home"
    And I should see "-- UNKNOWN --" in the "#version" element
