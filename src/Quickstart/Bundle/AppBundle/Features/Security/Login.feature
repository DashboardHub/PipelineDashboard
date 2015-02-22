Feature: As a user, I want to be able to login, in order to manage my account and process applications

  Background:
    Given following users for each persona exist on system:
      | admin@test.com |

  @CSR-5
  Scenario Outline: Login (Valid details)
    Given I am on the homepage
    And I follow "Login"
    And I fill in "username" with "<email-input>"
    And I fill in "password" with "<password>"
    And I press "Login"
    Then I should see "<message>"

  Examples:
    | email-input       | password  | message    |
    | admin@test.com    | password | My Account |

  @CSR-5
  Scenario Outline: Login (Invalid password)
    Given I am on the homepage
    And I follow "Login"
    And I fill in "username" with "<email-input>"
    And I fill in "password" with "<password>"
    And I press "Login"
    Then I should see "<message>"

  Examples:
    | email-input       | password  | message             |
    | admin@test.com    | P@ssword  | Invalid credentials |
    | persona3@test.com | p@ssword1 | Invalid credentials |

  @CSR-5
  Scenario Outline: Login (Invalid username)
    Given I am on the homepage
    And I follow "Login"
    And I fill in "username" with "<email-input>"
    And I fill in "password" with "<password>"
    And I press "Login"
    Then I should see "<message>"

  Examples:
    | email-input          | password  | message             |
    | nonexistent@test.com | P@ssword1 | Invalid credentials |

  @CSR-5
  Scenario: Redirect to Login (permission denied)
    Given I am on the homepage
    And I go to "/en/account"
    Then I should see "Email address"
    And I should see "Password"
