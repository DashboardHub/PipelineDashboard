Feature:  Display public projects on the homepage

  Scenario: List public project on the homepage with minimum information
    Given there is a document "test-public-project" with the js "projects/project-public-minimum" in collection "projects"
    And there is a document "test-user-minimum" with the js "users/user-minimum" in collection "users"
    And there is a document "test-user-minimum" with the js "user-stats/user-minimum" in collection "userStats"
    When the "/" page is open
    Then the text "Test public project with minimum data title" is in the element ".project__list__title"
    And the text "0" is in the element ".mat-column-repository"
    And the text "0" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    And the text "test-user-minimum" is in the element ".mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

  Scenario: List public project on the homepage with repository and monitor
    Given there is a document "test-public-project" with the js "projects/project-public-full" in collection "projects"
    Given there is a document "test-repository-minimum" with the js "repositories/repository-minimum" in collection "repositories"
    And there is a document "test-user-minimum" with the js "users/user-minimum" in collection "users"
    And there is a document "test-user-minimum" with the js "user-stats/user-minimum" in collection "userStats"
    When the "/" page is open
    Then the text "Test public project with full data title" is in the element ".project__list__title"
    And the text "Test public project with full data description" is in the element ".mat-column-description"
    And the text "https://www.pipelinedashboard.io" is in the element ".project__list__url"
    And the text "1" is in the element ".mat-column-repository"
    And the text "1" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    And the text "test-user-minimum" is in the element ".mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

  Scenario: Check private projects are not displayed on the homepage
    Given there is a document "test-project-private-minimum" with the js "projects/project-private-minimum" in collection "projects"
    When the "/" page is open
    Then the text "Test private project" is not in the element ".project__list__title"
