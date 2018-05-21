@All @Monitors @MonitorCreate
Feature: Create Monitor
  In order to create a Monitor
  As a logged in user
  I want to post monitor data

  @Seed
  Scenario: Run in seed data

  Scenario: Can not create an environment when not logged in
    When I make a "POST" request to "/environments/e0000001-0000-0000-0000-000000000000/monitors"
    Then the status code should be 403

  Scenario: Checking URL format conforms when creating an environment
    Given I am logged in
    When I make a "POST" request to "/environments" with:
        | field   | value                |
        | link    | "http://example.com" |
    Then the status code should be 200
    And should have a field "link" with "http://example.com"

    Then(/^should have a field "([^"]*)" with "([^"]*)"$/, function(field, value) {
      return this.validate(this.response.body[field], value);
    });
    And should have a field "id" with "UUID"


  Scenario: Create Monitor successfully
    Given I am logged in
    When I make a "POST" request to "/environments/e0000001-0000-0000-0000-000000000000/monitors" with:
      | field        | value              |
      | path         | "/"                |
      | method       | "GET"              |
      | expectedCode | 200                |
      | expectedText | "expect this text" |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "path" with "/"
    And should have a field "method" with "GET"
    And should have a field "expectedCode" with 200
    And should have a field "expectedText" with "expect this text"

  Scenario: Environment ID required
    Given I am logged in
    When I make a "POST" request to "/environments/e0000001-0000-0000-0000-99999999999/monitors" with:
      | field | value     |
      | path  | "Invalid" |
    Then the status code should be 404
