Feature:  Display projects on the homepage 

Scenario: List public project on the homepage
    Given there is a document "test-public-project" with the json "test/data/public-project.json" in collection "projects"
    And the "/" page is open
    And the text "Demo public project" is in the element ".project__list__title"
    And the text "Demo public project description added" is in the element ".mat-column-description"
    And the text "https://www.pipelinedashboard.io" is in the element ".project__list__url__content"
    And the text "2" is in the element ".mat-column-repository"
    And the text "1" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    And the text "webkhushboo" is in the element ".mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

Scenario: Ensure the create private project
    Given there is a document "test-private-project" with the json "test/data/private-project.json" in collection "projects"
    And the "/" page is open
    And the text "Demo private project" is not in the element ".project__list__title"
