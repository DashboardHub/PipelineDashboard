@All @Monitors @MonitorList
Feature: List monitors from my environment
  In order to list monitors from my environment
  As a logged in user
  I want to list monitors from my environment

  @Seed
  Scenario: Run in seed data

  Scenario: Can not list monitors when not logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors"
    Then the status code should be 403

  Scenario: Can not list monitors not from my environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000002-0000-0000-0000-000000000000/monitors"
    Then the status code should be 404

  Scenario: Can not list monitors from non existing environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000002-0000-0000-0000-999999999999/monitors"
    Then the status code should be 404

  Scenario: List my monitors for my environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors"
    Then the status code should be 200
    And should have a field "list" with length 1
    And should have an "array" field "list" and in row 1 with:
      | field        | value                                  |
      | id           | "e0000004-0000-0000-0000-m00000000001" |
      | path         | "/"                                    |
      | method       | "GET"                                  |
      | expectedCode | 200                                    |
      | expectedText | "DashboardHub"                         |
