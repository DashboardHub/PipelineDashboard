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
