Feature: Find one private environments

    Scenario: Get private environment as guest user should fail
        When I make a "GET" request to "/environments/00258853-feff-45c8-a078-88416a2edb18"
        Then the status code should be 401

    Scenario: Get private environment as wrong member
        Given I am logged in with "test2@test.com" and "Password$1"
        When I make a "GET" request to "/environments/00258853-feff-45c8-a078-88416a2edb18"
        Then the status code should be 404

    Scenario: Get private environment as member
        Given I am logged in with "test1@test.com" and "Password$1"
        When I make a "GET" request to "/environments/00258853-feff-45c8-a078-88416a2edb18"
        Then the status code should be 200
