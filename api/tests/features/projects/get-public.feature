@All @Projects @ProjectGet @ProjectGetPublic
Feature: Retrieve public project
  In order to view public project
  As a logged in user
  I want to view a public project

  @Seed
  Scenario: Run in seed data

  Scenario: Can retrieve a public project when not logged
    When I make a "GET" request to "/projects/10000003-0000-0000-0000-000000000000/view"
    Then the status code should be 200
    And should have a field "id" with "10000003-0000-0000-0000-000000000000"
    And should have a field "owner" with "github|12345678"
    And should have a field "title" with "Project 3"
    And should have a field "description" with "Description 3"
    And should not have a field "isPrivate"
    And should have a field "createdAt" with "2018-01-27T09:14:10.952Z"
    And should have a field "updatedAt" with "2018-01-27T09:14:10.952Z"

  Scenario: Can retrieve a public project when logged
    When I make a "GET" request to "/projects/10000003-0000-0000-0000-000000000000/view"
    Then the status code should be 200
    And should have a field "id" with "10000003-0000-0000-0000-000000000000"
    And should have a field "owner" with "github|12345678"
    And should have a field "title" with "Project 3"
    And should have a field "description" with "Description 3"
    And should not have a field "isPrivate"
    And should have a field "createdAt" with "2018-01-27T09:14:10.952Z"
    And should have a field "updatedAt" with "2018-01-27T09:14:10.952Z"
