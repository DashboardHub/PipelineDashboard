Feature:  Display public projects on the homepage

Scenario: List public project on the homepage
    Given there is a document "test-public-project" with the json "test/data/public-project.json" in collection "projects"
    And there is a document "00000000-0000-0000-0000-000000000001" with the json "test/data/user-test.json" in collection "users"
    And there is a document "00000000-0000-0000-0000-000000000001" with the json "test/data/user-test.json" in collection "userStats"
    When the "/" page is open
    Then the text "Demo public project" is in the element ".project__list__title"
    And the text "Demo public project description added" is in the element ".mat-column-description"
    And the text "https://www.pipelinedashboard.io" is in the element ".project__list__url"
    And the text "2" is in the element ".mat-column-repository"
    And the text "1" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    And the text "testuser" is in the element ".mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

Scenario: Check private projects are not displayed on the homepage
    Given there is a document "test-private-project" with the json "test/data/private-project.json" in collection "projects"
    When the "/" page is open
    Then the text "Demo private project" is not in the element ".project__list__title"

Scenario: Ensure the public project with minium requirements
    Given there is a document "guest-test-public-project" with the json "test/data/guest-public-project.json" in collection "projects"
    And the "/" page is open
    And the text "Demo guest public project" is in the element ".project__list__title"
    And the text "2" is in the element ".mat-column-repository"
    And the "/projects/guest-test-public-project" page is open
    And the text "You do not have any monitors. Please create monitor" is in the element ".helper"
    And the text "You do not have any repositories. Please connect repository" is in the element ".helper"

Scenario: Ensure the public project with no data saved
    Given there is a document "public-project-no-data" with the json "test/data/public-project-no-data.json" in collection "projects"
    And the "/" page is open
    And the text "Demo public project with no data" is in the element ".project__list__title"
    And the "/projects/public-project-no-data" page is open
    Then the text "No releases are available" is in the element ".info"
    And the text "No milestones are available" is in the element ".info__body"
    And the text "eddiejaoude" is in the element ".info__body"
    And the text "No PR are available" is in the element ".info__body"
    And the text "No pull requests are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No issues are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No events are available" is in the element ".repository-detail-card__content.mat-card-content"

Scenario: Ensure the public project with 2 repositories
    Given there is a document "test-public-project" with the json "test/data/public-project.json" in collection "projects"
    And the "/projects/test-public-project" page is open
