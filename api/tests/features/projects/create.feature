@All @Projects @ProjectCreate
Feature: Create Project
  In order to create a Project
  As a logged in user
  I want to post project data

  @Seed
  Scenario: Run in seed data

  Scenario: Can not create a project when not logged in
    When I make a "POST" request to "/projects"
    Then the status code should be 403

  Scenario: Can not create Project without required fields
    Given I am logged in
    When I make a "POST" request to "/projects" with:
      | field       | value                         |
      | description | "CreateProject A Description" |
    Then the status code should be 400

  Scenario: Create Project successfully
    Given I am logged in
    When I make a "POST" request to "/projects" with:
      | field       | value                         |
      | title       | "CreateProject A"             |
      | description | "CreateProject A Description" |
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "title" with "CreateProject A"
    And should have a field "description" with "CreateProject A Description"

