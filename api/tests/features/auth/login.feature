Feature: Login


  Scenario: Private environments list as guest user fails
    When I make a "GET" request to "/environments"
    Then the status code should be 401

  Scenario: Login fail with no credentials
    When I make a "POST" request to "/auth/login"
    Then the status code should be 400

  Scenario: Login successful with invalid email
    When I make a "POST" request to "/auth/login" with:
      | field    | value              |
      | email    | "invalid@test.com" |
      | password | "test1test"        |
    Then the status code should be 400

  Scenario: Login successful with invalid password
    When I make a "POST" request to "/auth/login" with:
      | field    | value            |
      | email    | "test1@test.com" |
      | password | "invalid"        |
    Then the status code should be 400

  Scenario: Login successful with valid credentials
    When I make a "POST" request to "/auth/login" with:
      | field    | value            |
      | email    | "test1@test.com" |
      | password | "test1test"      |
    Then the status code should be 200
