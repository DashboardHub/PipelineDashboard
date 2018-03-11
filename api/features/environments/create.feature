Feature: Create Environment
  In order to create an Environment
  As a logged in user
  I want to post environment data

  Scenario: Create Environment successfully
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "CreateEnvironment A" |
      | type  | "build-deploy"        |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "id" with string "UUID"
    And should have a field "owner" with string "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "type" with string "build-deploy"
    And should have a field "title" with string "CreateEnvironment A"
    And should have a field "releases" with integer 0
    And should have a field "views" with integer 0
    And should have a field "isPrivate" with boolean "false"
    And should have an "array" field "tokens" and in row 1 with:
      | field | value  |
      | id    | "UUID" |
    And should have a field "latestRelease" with an empty "object"
    And should have a field "createdAt" with string "DATETIME"
    And should have a field "updatedAt" with string "DATETIME"

  Scenario: Fields validation length
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "A"                   |
      | type  | "build-deploy"        |
    Then the status code should be 400

  Scenario: Field TYPE validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value |
      | title | "A"   |
    Then the status code should be 400

  Scenario: Field NAME validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value          |
      | type  | "build-deploy" |
    Then the status code should be 400
