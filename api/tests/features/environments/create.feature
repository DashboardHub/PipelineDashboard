Feature: Create Environment
  In order to create an Environment
  As a logged in user
  I want to post environment data

  Scenario: Can not create an environment when not logged in
    When I make a "POST" request to "/environments"
    Then the status code should be 403

  Scenario: Create Environment successfully
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "CreateEnvironment A" |
      | type  | "build-deploy"        |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "type" with "build-deploy"
    And should have a field "title" with "CreateEnvironment A"
    And should have a field "releases" with 0
    And should have a field "views" with 0
    And should have a field "isPrivate" with false
    And should have an "array" field "tokens" and in row 1 with:
      | field | value |
      | id    | UUID  |
    And should have a field "latestRelease" with an empty "object"
    And should have a field "createdAt" with "DATETIME"
    And should have a field "updatedAt" with "DATETIME"

  Scenario: Field TITLE validation length
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value          |
      | title | "A"            |
      | type  | "build-deploy" |
    Then the status code should be 400

  Scenario: Field TYPE validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "CreateEnvironment B" |
    Then the status code should be 400

  Scenario: Field TYPE validation valid option
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "CreateEnvironment B" |
      | type  | "invalid"             |
    Then the status code should be 400

  Scenario: Field TILE validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value          |
      | type  | "build-deploy" |
    Then the status code should be 400
