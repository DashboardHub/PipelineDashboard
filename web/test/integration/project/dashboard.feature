Feature:  Project dashboard page

  Scenario: Project dashboard does not display admin/owner information
    Given there is the following document in the collection "projects":
      | field    | value                            |
      | uid      | "test-dashboard-public-minimum" |
      | type | "public" |
      | title | "Test dashboard project with minimum data title" |
      | type | "public" |
      | access | { "admin": [ "test-dashboard-public-user-minimum" ] } |
    And there is the following document in the collection "users":
      | field    | value                              |
      | uid      | "test-dashboard-public-user-minimum" |
      | username | "test-dashboard-public-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                              |
      | uid      | "test-dashboard-public-user-minimum" |
      | username | "test-dashboard-public-user-minimum" |
    Given the "/projects/test-dashboard-public-minimum" page is open
    Then the text "You do not have any monitors. Please create monitor" is not in the element ".helper"
    And the text "You do not have any repositories. Please connect repository" is not in the element ".helper"
    And the text "No monitors added to this project yet" is in the element ".helper"
    And the text "No repositories added to this project yet" is in the element ".helper"

  Scenario: Project dashboard with no detailed information to display
    Given there is the following document in the collection "projects":
      | field    | value                            |
      | uid      | "test-public-project-repostory" |
      | title | "Test public project with no repository data" |
      | type | "public" |
      | access | { "admin": [ "test-project-public-repository-user-minimum" ] } |
      | repositories | ["test-repository-minimum"] |
    And there is the following document in the collection "repositories":
      | field    | value                            |
      | uid      | "test-repository-minimum" |
      | projects | ["test-project-public-repository", "test-project-public-repository-full"] |
      | url | "https://api.github.com/repos/webkhushboo/HelloWorld"|
      | fullName | "webkhushboo/HelloWorld" |
      | private | false |
      | issues | [] |
      | releases | [] |
      | milestones | [] |
      | contributors | [] |
      | pullRequests | [] |
    And there is the following document in the collection "users":
      | field    | value                              |
      | uid      | "test-project-public-repository-user-minimum" |
      | username | "test-project-public-repository-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                              |
      | uid      | "test-project-public-repository-user-minimum" |
      | username | "test-project-public-repository-user-minimum" |
    Given  the "/projects/test-public-project-repostory" page is open
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
    Given there is the following document in the collection "projects":
      | field    | value                            |
      | uid      | "test-public-project-repostory-full" |
      | type | "public" |
      | title | "Test public project with repository data" |
      | access | { "admin": [ "test-user-minimum" ] } |
      | repositories | ["test-repository-minimum", "test-repository-full"] |
      | url | "https://www.pipelinedashboard.io" |
    Given there is the following document in the collection "repositories":
      | field    | value                            |
      | uid      | "test-repository-full" |
      | projects | ["test-project-public-repository-full"] |
      | url | "https://api.github.com/repos/DashboardHub/PipelineDashboard"|
      | fullName | "DashboardHub/PipelineDashboard" |
      | private | false |
      | issues | [{ "title": "test-issue", "createdOn": "DATETIME[NOW]", "updatedOn": "DATETIME[NOW]", "owner": { "avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum" }}] |
      | releases | [{"title": "test-release","isPrerelease": false,"owner": {"avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum"},"createdOn": "DATETIME[NOW]"}] |
      | milestones | [{"title": "test-milestone","state": "open","creator": {"avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum"},"updatedAt": "DATETIME[NOW]"}] |
      | contributors | [{"owner": {"avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum"},"total": 2}] |
      | pullRequests | [{"title": "test-PR","owner": {"avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum" },"createdOn": "DATETIME[NOW]", "updatedOn": "DATETIME[NOW]"}] |
      | events |[{"payload": {"title": "test-event","action": "created" },"createdOn": "DATETIME[NOW]", "public": true,"type": "IssueCommentEvent", "actor": {"avatarUrl": "https://cdn.dashboardhub.io/logo/icon-only-orange-120x120.png","username": "test-user-minimum"}}] |
      | createdOn | "DATETIME[NOW]" |
    And there is the following document in the collection "users":
      | field    | value                              |
      | uid      | "test-user-minimum" |
      | username | "test-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                              |
      | uid      | "test-user-minimum" |
      | username | "test-user-minimum" |  
    Given the "/projects/test-public-project-repostory-full" page is open
    Then the text "Test public project with repository data" is in the element ".project-body__header"
    And total count of element ".repository__container" is 2
    And the text "test-release" is in the element ".info__body__description"
    And the text "test-milestone" is in the element ".info__body__description"
    And the text "test-user-minimum" is in the element ".info__body__description"
    And the text "test-PR" is in the element ".info__body__line"
    And the text "test-issue" is in the element ".repository-detail-card__content__title"
    And the text "test-user-minimum" is in the element ".repository-detail-card__content__request-user"
    And the text "test-event" is in the element ".repository-detail-card__content__title"
