@All @Projects @ProjectList @ProjectListPrivate
Feature: Listing projects
  In order to list my projects
  As a logged in user
  I want to view my project

  @Seed
  Scenario: Run in seed data

  Scenario: Can not view my projects if not logged in
    When I make a "GET" request to "/projects/list"
    Then the status code should be 403

  Scenario: Can view my projects if logged in
    Given I am logged in
    When I make a "GET" request to "/projects/list"
    Then the status code should be 200
    And should have a field "total" with 2
    And should have an "array" field "list" and in row 1 with:
      | field       | value                                      |
      | id          | "10000002-0000-0000-0000-000000000000"     |
      | owner       | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | title       | "Project 2"                                |
      | description | "Description 2"                            |
      | isPrivate   | true                                       |
    And should have an "array" field "list" and in row 2 with:
      | field       | value                                      |
      | id          | "10000001-0000-0000-0000-000000000000"     |
      | owner       | "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients" |
      | title       | "Project 1"                                |
      | description | "Description 1"                            |
      | isPrivate   | false                                      |
