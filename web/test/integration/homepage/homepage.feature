Feature:  Open the website landing page

  Scenario: Ensure the page has loaded correctly
    Given the "/" page is open
    Then the title on the page says "PipelineDashboard"
    And the text "Homepage" is in the element ".home__title"
    And the text "Welcome Guest" is in the element ".app-toolbar"
    And the text "Application statistics" is in the element ".stats__card__title"
    And the text "Active Users" is in the element ".home__users-card__title"
    And the text "Popular projects" is in the element ".home__users-card__title"
    And the text "Public Projects" is in the element ".project-card__title"

  Scenario: Ensure the application statistics for users
    Given there is a document "stats" with the field "users" set to 100 in collection "platform"
    And the "/" page is open
    Then the count "100" is in the element ".stats__card__content__item__red"

  Scenario: Ensure the application statistics for project
    Given there is a document "stats" with the field "projects" set to 1195 in collection "platform"
    And the "/" page is open
    Then the count "1.2k" is in the element ".stats__card__content__item__blue"

  Scenario: Ensure the application statistics for pings
    Given there is a document "stats" with the field "pings" set to 16123 in collection "platform"
    And the "/" page is open
    Then the count "16.1k" is in the element ".stats__card__content__item__purple"

  Scenario: Ensure the application statistics for events
    Given there is a document "stats" with the field "events" set to 101000 in collection "platform"
    And the "/" page is open
    Then the count "101k" is in the element ".stats__card__content__item__dark-blue"
