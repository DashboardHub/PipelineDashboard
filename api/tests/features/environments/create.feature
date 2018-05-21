@All @Environments @EnvironmentCreate
Feature: Create Environment
  In order to create an Environment
  As a logged in user
  I want to post environment data

  @Seed
  Scenario: Run in seed data

  Scenario: Can not create an environment when not logged in
    When I make a "POST" request to "/environments"
    Then the status code should be 403

  Scenario: Create Environment successfully
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field       | value                 |
      | title       | "CreateEnvironment A" |
      | type        | "build-deploy"        |
      | description | "Automated test"      |
      | link        | "http://example.com"  |
      | logo        | "https://example.com" |
      | isPrivate   | true                  |
      | tags        | ["tag1","tag2"]       |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "id" with "UUID"
    And should have a field "owner" with "RwbFXSyjZ6F3HJ3Qc5CGUNMdSX8f3m79@clients"
    And should have a field "type" with "build-deploy"
    And should have a field "title" with "CreateEnvironment A"
    And should have a field "description" with "Automated test"
    And should have a field "link" with "http://example.com"
    And should have a field "logo" with "https://example.com"
    And should have a field "releases" with 0
    And should have a field "views" with 0
    And should have a field "isPrivate" with true
    And should have a field "tags" with length 2
#    And should have a field "tags" with "['tag1','tag2']" # @TODO: check array values
    And should have an "array" field "tokens" and in row 1 with:
      | field | value                         |
      | id    | UUID                          |
      | name  | Continuous Integration Server |
    And should have a field "latestRelease" with an empty "object"
    And should have a field "createdAt" with "DATETIME"
    And should have a field "updatedAt" with "DATETIME"

  Scenario: Create Environment successfully without tokens
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field  | value                              |
      | title  | "CreateEnvironment B"              |
      | type   | "build"                            |
      | tokens | [{'name':'test'},{'name':'test2'}] |
    Then the status code should be 200
    And should have a field "title" with "CreateEnvironment B"
    And should have a field "tokens" with length 1
    And should have an "array" field "tokens" and in row 1 with:
      | field | value                         |
      | id    | UUID                          |
      | name  | Continuous Integration Server |

  Scenario: Checking URL format conforms when creating an environment
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                 |
      | title | "CreateEnvironment C" |
      | type  | "build-deploy"        |
      | link  | "http://example.com/" |
    Then the status code should be 200
    And should have a field "link" with "http://example.com"

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

  Scenario: Field TITLE validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value          |
      | type  | "build-deploy" |
    Then the status code should be 400

  Scenario: Field LOGO validation required
    Given I am logged in
    When I make a "POST" request to "/environments" with:
      | field | value                               |
      | title | "Do NOT CreateEnvironment in Error" |
      | type  | "build-deploy"                      |
      | logo  | "http://example.com"                |
    Then the status code should be 400
