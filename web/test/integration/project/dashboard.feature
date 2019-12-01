Feature:  Project dashboard page

  Scenario: Project dashboard does not display admin/owner information
    Given there is a document "test-public-project-minimum" with the js "projects/project-public-minimum" in collection "projects"
    When the "/projects/test-public-project-minimum" page is open
    Then the text "You do not have any monitors. Please create monitor" is not in the element ".helper"
    And the text "You do not have any repositories. Please connect repository" is not in the element ".helper"
    And the text "No monitors added to this project yet" is in the element ".helper"
    And the text "No repositories added to this project yet" is in the element ".helper"

  Scenario: Project dashboard with no detailed information to display
    Given there is a document "test-public-project-repostory" with the js "projects/project-public-repository" in collection "projects"
    And there is a document "test-repository-minimum" with the js "repositories/repository-minimum" in collection "repositories"
    When the "/projects/test-public-project-repostory" page is open
    Then the text "You do not have any monitors. Please create monitor" is not in the element ".helper"
    And the text "No monitors added to this project yet." is in the element ".helper"
    And the text "No releases are available" is in the element ".info__body"
    And the text "No milestones are available" is in the element ".info__body"
    And the text "No contributors are available" is in the element ".info__body"
    And the text "No PR are available" is in the element ".info__body"
    And the text "No pull requests are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No issues are available" is in the element ".repository-detail-card__content.mat-card-content"
    And the text "No events are available" is in the element ".repository-detail-card__content.mat-card-content"

Scenario: Project dashboard with detailed information to display
    Given there is a document "test-public-project-repostory-full" with the js "projects/project-public-repository-full" in collection "projects"
    And there is a document "test-repository-full" with the js "repositories/repository-full" in collection "repositories"
    When the "/projects/test-public-project-repostory-full" page is open
    Then the text "Test public project with repository data" is in the element ".project-body__header__content__name.project-body__header__content__name__long"
    And total count of element ".repository__container" is 2 
    And the text "test-release" is in the element ".info__body__description"
    And the text "test-milestone" is in the element ".info__body__description"
    And the text "test-user-minimum" is in the element ".info__body__description"
    And the text "test-PR" is in the element ".info__body__line"   
    And the text "test-issue" is in the element ".repository-detail-card__content__title"
    And the text "test-user-minimum" is in the element ".repository-detail-card__content__request-user"
    And the text "test-event" is in the element ".repository-detail-card__content__title"
