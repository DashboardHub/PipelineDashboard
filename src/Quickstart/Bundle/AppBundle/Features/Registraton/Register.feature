Feature: As an user, I want to be able to register a new account

  Scenario Outline: Create Account with valid details
    Given I am on the homepage
    And I follow "Register"
    Then I should see "Register Your Details"
    When I fill form with:
    # Your details
      | fos_user_registration_form_firstname                  | <first-name>                            |
      | fos_user_registration_form_lastname                   | <last-name>                             |
        # Contact details
      | fos_user_registration_form_email                      | <email-input>                           |
        # Signin Details
      | fos_user_registration_form_plainPassword_first        | <password>                              |
      | fos_user_registration_form_plainPassword_second       | <password>                              |
    And I press "fos_user_registration_form_registerButton"
    Then I should see "My Account"
    And I should see "<email-input>"
  # And I should get an email on "<email-input>" with:
  #  """
  #  Confirmation email content detail here
  #  """

  Examples:
    | first-name | last-name | email-input    | password |
    | One        | Persona   | test@test.com | password1! |

  Scenario: Create account with invalid details (field formats)
    Given I am on the homepage
    And I follow "Register"
    Then I should see "Register Your Details"
    # Your details
    And I fill in "fos_user_registration_form_firstname" with "Bil2"
    And I fill in "fos_user_registration_form_lastname" with "Ca2rr"
        # Contact details
    And I fill in "fos_user_registration_form_email" with "bill.carr@test"
        # Signin Details
    And I fill in "fos_user_registration_form_plainPassword_first" with "P@ssword1"
    And I fill in "fos_user_registration_form[plainPassword][second]" with "P@ssword11"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value should be of type alpha"
    Then I should see "This value should be of type alpha"
    Then I should see "The entered passwords don't match"
    Then I should see "This value is not a valid email address"

  Scenario Outline: Create account with invalid details (password check)
    Given I am on the homepage
    And I follow "Register"
    Then I should see "Register Your Details"
    And I fill in "fos_user_registration_form_firstname" with "Bill"
    And I fill in "fos_user_registration_form_lastname" with "Carr"
    And I fill in "fos_user_registration_form_plainPassword_first" with "<password>"
    And I fill in "fos_user_registration_form[plainPassword][second]" with "<password>"
    And I fill in "fos_user_registration_form_email" with "bill.carr@test.com"
    And I press "fos_user_registration_form_registerButton"
  Examples:
    | password  |
    | 1234567   |
    | 12345678  |
    | abcdefgh  |
    | abcdefgh1 |
    | abcdefgh@ |

  Scenario Outline: Create account with invalid details (password)
    Given I am on the homepage
    And I follow "Register"
    Then I should see "Register Your Details"
    And I fill in "fos_user_registration_form_firstname" with "Bill"
    And I fill in "fos_user_registration_form_lastname" with "Carr"
    And I fill in "fos_user_registration_form_plainPassword_first" with "<password>"
    And I fill in "fos_user_registration_form[plainPassword][second]" with "<password>"
    And I fill in "fos_user_registration_form_email" with "bill.carr@test.com"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "<Message>"
  Examples:
    | password | Message                                                      |
    | 1234567  | This value is too short. It should have 8 characters or more |
    | 12345678 | Must contain at least 1 letter                               |
    | abcdefgh | Must contain at least 1 number                               |
    | 1bcdefgh | Must contain at least 1 symbol (eg. !@#$%^*_-)               |

  Scenario: Create account using blank form text fields (mandatory field check)
    Given I am on the homepage
    And I follow "Register"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value should not be blank"
    And I fill in "fos_user_registration_form_firstname" with "Four"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value should not be blank"
    And I fill in "fos_user_registration_form_lastname" with "Persona"
    And I fill in "fos_user_registration_form_email" with "email@test"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value is not a valid email address"
    And I fill in "fos_user_registration_form_email" with "persona4@test.com"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value should not be blank"
    And I fill in "fos_user_registration_form_plainPassword_first" with "P@ssword1"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "The entered passwords don't match"
    And I fill in "fos_user_registration_form_plainPassword_first" with "P@ssword1"
    And I fill in "fos_user_registration_form_plainPassword_second" with "P@ssword1"
    And I press "fos_user_registration_form_registerButton"
    And I should see "My Account"

  Scenario Outline: Create account using email that has already been used
    Given I am on the homepage
    And I follow "Register"
    And I fill in "fos_user_registration_form_email" with "<email>"
    And I fill in "fos_user_registration_form_firstname" with "<first-name>"
    And I fill in "fos_user_registration_form_lastname" with "<last-name>"
    And I fill in "fos_user_registration_form_plainPassword_first" with "<password>"
    And I fill in "fos_user_registration_form[plainPassword][second]" with "<password>"
    And I press "fos_user_registration_form_registerButton"
    Then I should see "This value is already used"
  Examples:
    | email             |
    | admin@test.com |
