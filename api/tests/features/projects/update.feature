@All @Projects @ProjectUpdate
Feature: Update Project
  In order to update a Project
  As a logged in user
  I want to send the patch request

  @Seed
  Scenario: Run in seed data

  Scenario: Can not update if not logged in
    When I make a "PATCH" request to "/projects/10000001-0000-0000-0000-000000000000"
    Then the status code should be 403

  Scenario: Can not update if non existent project
    Given I am logged in
    When I make a "PATCH" request to "/projects/10000001-0000-0000-0000-999999999999"
    Then the status code should be 404

  Scenario: Can not update if not the owner of a project
    Given I am logged in
    When I make a "PATCH" request to "/projects/10000003-0000-0000-0000-000000000000"
    Then the status code should be 404

  Scenario: Can update project
    Given I am logged in
    When I make a "PATCH" request to "/projects/10000001-0000-0000-0000-000000000000" with:
      | field        | value                                    |
      | title        | "UpdateProject A"                        |
      | description  | "UpdateProject A Description"            |
      | environments | ["e0000001-0000-0000-0000-000000000000"] |
    Then the status code should be 200
    And should have a field "id" with "10000001-0000-0000-0000-000000000000"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "title" with "UpdateProject A"
    And should have a field "description" with "UpdateProject A Description"
    And should have a field "environments" with length 1
