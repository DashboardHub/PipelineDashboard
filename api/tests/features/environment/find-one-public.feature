Feature: Find one public environments

    Scenario: Get public environment as guest user
        When I make a "GET" request to "/549e8b5e-35dd-473a-b33b-42ce9b15f15a"
        Then the status code should be 200

    Scenario: Get public environment as member
        Given I am logged in with "test2@test.com" and "Password$1"
        When I make a "GET" request to "/549e8b5e-35dd-473a-b33b-42ce9b15f15a"
        Then the status code should be 200
