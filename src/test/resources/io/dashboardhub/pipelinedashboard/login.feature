Feature: Application Security

  Scenario: Non Authorised user trying to access secure pages
    Given I am not logged in
#      And I see "please login"
    When I try to access a secure page
    Then I get redirected to the login page
