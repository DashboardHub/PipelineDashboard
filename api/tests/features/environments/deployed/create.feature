@All @Deployed @DeployedCreate
Feature: Create Deploy
  In order to create a Deployment
  As a logged in user
  I want to post deployment data

  @Seed
  Scenario: Run in seed data

  Scenario: Startbuild state deploy is successful
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/deployed/e0000004-0000-0000-0000-t00000000002/startBuild" with:
      | field   | value        |
      | release | "v10.0.test" |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "release" with "v10.0.test"
    And should have a field "state" with "startBuild"

  Scenario: Finishbuild state deploy is successful
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/deployed/e0000004-0000-0000-0000-t00000000002/finishDeploy" with:
      | field   | value        |
      | release | "v10.0.test" |
#    Then the status code should be 201 # @TODO: Do not return 200
    Then the status code should be 200
    And should have a field "release" with "v10.0.test"
    And should have a field "state" with "finishDeploy"

  Scenario: Valid Environment ID required
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-99999999999/deployed/e0000004-0000-0000-0000-t00000000002/startBuild" with:
      | field   | value         |
      | release | "v10.0.error" |
    Then the status code should be 404

  Scenario: Valid Token ID required
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/deployed/e0000004-0000-0000-0000-t9999999999/startBuild" with:
      | field   | value         |
      | release | "v10.0.error" |
    Then the status code should be 404

  Scenario: Invalid state required
    Given I am logged in
    When I make a "POST" request to "/environments/e0000004-0000-0000-0000-000000000000/deployed/e0000004-0000-0000-0000-t00000000002/unknown" with:
      | field   | value         |
      | release | "v10.0.error" |
    Then the status code should be 400
