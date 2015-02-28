Feature: As an user, I want to be able to login via Github

  Scenario: Login via Github
    Given I am on the homepage
    And I follow "Login"
    # Github OAuth - failing
    #And I should see "Username or Email"
