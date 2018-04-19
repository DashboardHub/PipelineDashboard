@All @Projects @ProjectDelete
Feature: Delete Project
  In order to delete a Project
  As a logged in user
  I want to send the delete request

  @Seed
  Scenario: Run in seed data

    Scenario: Can not delete if not logged in
      When I make a "DELETE" request to "/projects/10000001-0000-0000-0000-000000000000"
      Then the status code should be 403

    Scenario: Can not delete if does not exist
      Given I am logged in
      When I make a "DELETE" request to "/projects/10000001-0000-0000-0000-999999999999"
      Then the status code should be 404

    Scenario: Can not delete if not the owner
      Given I am logged in
      When I make a "DELETE" request to "/projects/10000003-0000-0000-0000-000000000000"
      Then the status code should be 404

    Scenario: Can delete project
      Given I am logged in
      When I make a "DELETE" request to "/projects/10000001-0000-0000-0000-000000000000"
      Then the status code should be 200
