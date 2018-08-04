Feature: Registration

  Scenario: Registration fail with no credentials
    When I make a "POST" request to "/auth/registration"
    Then the status code should be 400

  Scenario: Registration fail with invalid email
    When I make a "POST" request to "/auth/registration" with:
      | field    | value        |
      | email    | "invalid"    |
      | password | "Password$1" |
    Then the status code should be 400

  Scenario: Registration fail with invalid password
    When I make a "POST" request to "/auth/registration" with:
      | field    | value            |
      | email    | "test0@test.com" |
      | password | "invalid"        |
    Then the status code should be 400

  Scenario: Registration successful with valid credentials
    When I make a "POST" request to "/auth/registration" with:
      | field    | value            |
      | email    | "test0@test.com" |
      | password | "Password$1"     |
    Then the status code should be 200
    When I make a "POST" request to "/auth/login" with:
      | field    | value            |
      | email    | "test0@test.com" |
      | password | "Password$1"     |
    Then the status code should be 200

  Scenario: Registration fail with existing credentials
    When I make a "POST" request to "/auth/registration" with:
      | field    | value            |
      | email    | "test0@test.com" |
      | password | "Password$1"     |
    Then the status code should be 400
