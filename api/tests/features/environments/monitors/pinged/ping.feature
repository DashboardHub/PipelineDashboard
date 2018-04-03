@All @Monitors @Pings @PingPing
Feature: Create a Ping
  In order to create a Ping
  As a logged in user
  I want to post ping data

  @Seed
  Scenario: Run in seed data

  Scenario: Can not create a ping when not logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001/ping"
    Then the status code should be 403

  Scenario: Can not create a ping when non existing environment
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-999999999999/monitors/e0000004-0000-0000-0000-m00000000001/ping"
    Then the status code should be 404

  Scenario: Can not create a ping when non existing monitor
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-999999999999/ping"
    Then the status code should be 404

  Scenario: Create Environment successfully
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001/ping"
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "environmentId" with "e0000004-0000-0000-0000-000000000000"
    And should have a field "monitorId" with "e0000004-0000-0000-0000-m00000000001"
    And should have a field "url" with "https://dashboardhub.io/"
    And should have a field "statusCode" with 200
    And should have a field "codeMatched" with true
    And should have a field "textMatched" with true
    And should have a field "duration" with "NUMBER"
    And should have a field "isValid" with true
