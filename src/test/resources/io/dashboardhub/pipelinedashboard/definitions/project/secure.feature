Feature: Secure Project page

  Scenario: Authorised user accessing Project page
    Given I am logged in
    When I try to access the project page
    Then I get the project page

  # ToDo: can not edit someone elses project
