@All @Projects @ProjectGet @ProjectGetPrivate
Feature: Retrieve my project
  In order to view my private project
  As a logged in user
  I want to view my private project

  @Seed
  Scenario: Run in seed data

  Scenario: Can not retrieve a private project if not logged in
    When I make a "GET" request to "/projects/10000002-0000-0000-0000-000000000000"
    Then the status code should be 403

  Scenario: Can not retrieve a private project if not owner
    Given I am logged in
    When I make a "GET" request to "/projects/10000003-0000-0000-0000-000000000000"
    Then the status code should be 404

  Scenario: Can retrieve my project
    Given I am logged in
    When I make a "GET" request to "/projects/10000002-0000-0000-0000-000000000000"
    Then the status code should be 200
    And should have a field "id" with "10000002-0000-0000-0000-000000000000"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "title" with "Project 2"
    And should have a field "description" with "Description 2"
    And should have a field "isPrivate" with true
    And should have a field "createdAt" with "2018-01-27T09:14:10.942Z"
    And should have a field "updatedAt" with "2018-01-27T09:14:10.942Z"
