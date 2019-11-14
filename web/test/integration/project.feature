Feature:  Save the project json in db 

Scenario: Ensure the create public project
    Given there is a document "test-public-project" with the json "test/data/public-project.json" in collection "projects"
    And the "/" page is open
    And the text "Demo public project" is in the element ".project__list__title"

Scenario: Ensure the create private project
    Given there is a document "test-private-project" with the json "test/data/private-project.json" in collection "projects"
    And the "/" page is open
    And the text "Demo private project" is not in the element ".project__list__title"
