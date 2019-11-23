Feature:  Project dashboard page

  Scenario: Project dashboard does not display admin/owner information
    Given there is a document "test-public-project-minimum" with the json "test/data/projects/project-public-minimum.json" in collection "projects"
    When the "/projects/test-public-project-minimum" page is open
    Then the text "You do not have any monitors. Please create monitor" is not in the element ".helper"
    And the text "You do not have any repositories. Please connect repository" is not in the element ".helper"
    And the text "No monitors added to this project yet" is not in the element ".helper"
    And the text "No repositories added to this project yet" is in the element ".helper"

  Scenario: Project dashboard with no detailed information to display
    Given there is a document "test-public-project-minimum" with the json "test/data/projects/project-public-minimum.json" in collection "projects"
    And there is a document "test-repository-minimum" with the json "test/data/repositories/repository-minimum.json" in collection "repositories"
    When the "/projects/test-public-project-minimum" page is open
    Then the text "You do not have any monitors. Please create monitor" is not in the element ".helper"
    And the text "You do not have any repositories. Please connect repository" is not in the element ".helper"
    And the text "No monitors added to this project yet." is in the element ".helper"
    And the text "No repositories added to this project yet." is in the element ".helper"
    And the text "No releases are available" is in the element ".info__body"
    And the text "No milestones are available" is in the element ".info__body"
    And the text "eddiejaoude" is in the element ".info__body"
    And the text "No PR are available" is in the element ".info__body"
    And the text "No pull requests are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No issues are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No events are available" is in the element ".repository-detail-card__content.mat-card-content"
