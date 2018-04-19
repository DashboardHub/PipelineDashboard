@All @Environments @EnvironmentList @EnvironmentListPrivate
Feature: Private environments list
  In order to view the my environments
  As a logged in user
  I want to see the my environments

  @Seed
  Scenario: Run in seed data

  Scenario: Can not view my environments if not logged in
    When I make a "GET" request to "/environments/list"
    Then the status code should be 403

  Scenario: Private environments list
    Given I am logged in
    When I make a "GET" request to "/environments/list"
    Then the status code should be 200
    And should have a field "total" with "NUMBER"
    And should have an "array" field "list" and in row 1 with:
      | field         | value                                      |
      | id            | "UUID"                                     |
      | owner         | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | title         | "Environment D"                            |
      | type          | "build-deploy"                             |
      | latestRelease | "OBJECT"                                   |
      | releases      | 800                                        |
      | tokens        | "ARRAY[2]"                                 |
      | monitors      | "ARRAY[1]"                                 |
      | latestPing    | "OBJECT"                                   |
      | pings         | { "valid": 123, "invalid": 32 }            |
      | isPrivate     | false                                      |
      | views         | 10324                                      |
      | progress      | { "current": 100, "next": 100 }            |
      | createdAt     | "DATETIME"                                 |
      | updatedAt     | "DATETIME"                                 |
