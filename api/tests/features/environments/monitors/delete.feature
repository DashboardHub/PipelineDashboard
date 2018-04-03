@All @Monitors @MonitorDelete
Feature: Delete monitor from my environment
  In order to delete a monitor from my environment
  As a logged in user
  I want to delete a monitor from my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Can not delete a monitor from my environment when not logged in
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001"
    Then the status code should be 403

  Scenario: Can not delete a non existing monitor from a non existing environment
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-999999999999/monitors/e0000004-0000-0000-0000-999999999999"
    Then the status code should be 404

  Scenario: Can not delete a non existing monitor from my environment
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000001-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-999999999999"
    Then the status code should be 404

  Scenario: Can delete my monitor
    Given I am logged in
    When I make a "DELETE" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001"
    Then the status code should be 200
