@All @Projects @ProjectList @ProjectListPublic
Feature: Listing projects
  In order to list public projects
  As a logged in user
  I want to view public projects

  @Seed
  Scenario: Run in seed data

  Scenario: Can view public projects if not logged in
    When I make a "GET" request to "/projects"
    Then the status code should be 200
    And should have a field "total" with 2
    And should have an "array" field "list" and in row 1 with:
      | field       | value                                  |
      | id          | "10000003-0000-0000-0000-000000000000" |
      | owner       | "github\|12345678"                     |
      | title       | "Project 3"                            |
      | description | "Description 3"                        |
    And should have an "array" field "list" and in row 2 with:
      | field       | value                                      |
      | id          | "10000001-0000-0000-0000-000000000000"     |
      | owner       | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | title       | "Project 1"                                |
      | description | "Description 1"                            |

  Scenario: Can view public projects if logged in
    Given I am logged in
    When I make a "GET" request to "/projects"
    Then the status code should be 200
    And should have a field "total" with 2
    And should have an "array" field "list" and in row 1 with:
      | field       | value                                  |
      | id          | "10000003-0000-0000-0000-000000000000" |
      | owner       | "github\|12345678"                     |
      | title       | "Project 3"                            |
      | description | "Description 3"                        |
    And should have an "array" field "list" and in row 2 with:
      | field       | value                                      |
      | id          | "10000001-0000-0000-0000-000000000000"     |
      | owner       | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | title       | "Project 1"                                |
      | description | "Description 1"                            |
