Feature:  Open the website landing page

  Scenario: Ensure the page has loaded correctly
    Given the "/" page is open
    Then the title on the page says "PipelineDashboard"
