Feature: Update my environment
  In order to update my environment
  As a logged in user
  I want to update my environment

  Scenario: Can not update an environment when not logged in
    When I make a "PATCH" request to "/environments/e0000001-0000-0000-0000-000000000000"
    Then the status code should be 403

  Scenario: Can not update an environment when not logged in and non-existent
    When I make a "PATCH" request to "/environments/e0000001-0000-0000-0000-99999999999"
    Then the status code should be 403

  Scenario: Can not update an environment if not mine
    Given I am logged in
    When I make a "PATCH" request to "/environments/e0000002-0000-0000-0000-000000000000"
    Then the status code should be 404

  Scenario: Update my environment
    Given I am logged in
    When I make a "PATCH" request to "/environments/e0000001-0000-0000-0000-000000000000" with:
      | field | value                 |
      | title | "UpdateEnvironment A" |
    Then the status code should be 200
    And should have a field "id" with "e0000001-0000-0000-0000-000000000000"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "title" with "UpdateEnvironment A"
