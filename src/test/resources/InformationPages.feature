Feature: Information pages
  To allow a visitor to view insecure information

  Scenario: Homepage as a visitor
    Given I am a visitor
    When I view the "/" page
    Then I should see "Pipeline Dashboard:: Home" in the title
    And I close my browser

  Scenario: Protected pages redirect to GitHub login
    Given I am a visitor
    When I view the "/projects" page
    Then I should see "https://github.com/login" in the url
    And I close my browser
