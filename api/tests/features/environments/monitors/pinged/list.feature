@All @Monitors @Pings @PingList
Feature: Get my Pings
  In order to view the my pings
  As a logged in user
  I want to see the my pings

  @Seed
  Scenario: Run in seed data

  Scenario: Can not get pings when not logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001/pings"
    Then the status code should be 403

  Scenario: Get non existent environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-999999999999/monitors/e0000004-0000-0000-0000-m00000000001/pings"
    Then the status code should be 404

  Scenario: Get non existent monitor
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-999999999999/pings"
    Then the status code should be 404

  Scenario: Can not get pings from another environment
    Given I am logged in
    When I make a "GET" request to "/environments/e0000002-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001/pings"
    Then the status code should be 404

  Scenario: Get my monitor pings
    Given I am logged in
    When I make a "GET" request to "/environments/e0000004-0000-0000-0000-000000000000/monitors/e0000004-0000-0000-0000-m00000000001/pings"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 with:
      | id            | "e0000004-0000-0000-0000-p00000000002" |
      | environmentId | "e0000004-0000-0000-0000-000000000000" |
      | monitorId     | "e0000004-0000-0000-0000-m00000000001" |
      | url           | "http://example.com/"                  |
      | statusCode    | 500                                    |
      | codeMatched   | false                                  |
      | textMatched   | false                                  |
      | duration      | 10                                     |
      | isValid       | false                                  |
      | ttl           | 1518599151                             |
      | createdAt     | 1517044451942                          |
      | updatedAt     | 1517044451942                          |
