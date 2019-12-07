Feature:  Display public projects on the homepage

  Scenario: Generate data
    Given there is the following document in the collection "users":
      | field    | value                              |
      | uid      | "test-project-public-user-minimum" |
      | username | "test-project-public-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                              |
      | uid      | "test-project-public-user-minimum" |
      | username | "test-project-public-user-minimum" |
    And there is the following document in the collection "projects":
      | field  | value                                               |
      | uid    | "test-project-public-minimum"                       |
      | type   | "public"                                            |
      | title  | "Test public project with minimum data title"       |
      | access | { "admin": [ "test-project-public-user-minimum" ] } |
    Given there is the following document in the collection "users":
      | field    | value                            |
      | uid      | "test-project-full-user-minimum" |
      | username | "test-project-full-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                            |
      | uid      | "test-project-full-user-minimum" |
      | username | "test-project-full-user-minimum" |
    And there is the following document in the collection "repositories":
      | field        | value                                                                     |
      | uid          | "test-repository-minimum"                                                 |
      | projects     | ["test-project-public-repository", "test-project-public-repository-full"] |
      | url          | "https://api.github.com/repos/webkhushboo/HelloWorld"                     |
      | fullName     | "webkhushboo/HelloWorld"                                                  |
      | private      | false                                                                     |
      | issues       | []                                                                        |
      | releases     | []                                                                        |
      | milestones   | []                                                                        |
      | contributors | []                                                                        |
      | releases     | []                                                                        |
    And there is the following document in the collection "projects":
      | field        | value                                                                                                                                                                 |
      | uid          | "test-project-public-full"                                                                                                                                            |
      | type         | "public"                                                                                                                                                              |
      | title        | "Test public project with full data title"                                                                                                                            |
      | description  | "Test public project with full data description"                                                                                                                      |
      | url          | "https://www.pipelinedashboard.io"                                                                                                                                    |
      | repositories | [ "test-repository-minimum" ]                                                                                                                                         |
      | access       | { "admin": [ "test-project-full-user-minimum" ] }                                                                                                                     |
      | monitors     | [{ "uid": "test-monitor", "name": "test monitor", "method": "GET", "path": "/","expectedCode": 200,"expectedText": "", "successfulPings": 0,"unsuccessfulPings": 0 }] |
      | pings        | []                                                                                                                                                                    |
      | tokens       | []                                                                                                                                                                    |
      | views        | 1                                                                                                                                                                     |
    Given there is the following document in the collection "users":
      | field    | value                               |
      | uid      | "test-project-private-user-minimum" |
      | username | "test-project-private-user-minimum" |
    And there is the following document in the collection "userStats":
      | field    | value                               |
      | uid      | "test-project-private-user-minimum" |
      | username | "test-project-private-user-minimum" |
    And there is the following document in the collection "projects":
      | field  | value                                                |
      | uid    | "test-project-private-minimum"                       |
      | type   | "private"                                            |
      | title  | "Test private project with minimum data title"       |
      | access | { "admin": [ "test-project-private-user-minimum" ] } |
    And wait for data

  Scenario: List public project on the homepage with minimum information
    When the "/" page is open
    Then the text "Test public project with minimum data title" is in the element "a.project__list__title"
    And the text "0" is in the element ".mat-column-repository"
    And the text "0" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    #And the text "test-project-public-user-minimum" is in the element "td.mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

  Scenario: List public project on the homepage with repository and monitor
    When the "/" page is open
    Then the text "Test public project with full data title" is in the element "a.project__list__title"
    And the text "Test public project with full data description" is in the element ".mat-column-description"
    And the text "https://www.pipelinedashboard.io" is in the element ".project__list__url"
    And the text "1" is in the element ".mat-column-repository"
    And the text "1" is in the element ".mat-column-monitors"
    And the text "0" is in the element ".mat-column-pings"
    #And the text "test-project-full-user-minimum" is in the element "td.mat-column-user"
    And the text "1 second ago" is in the element ".mat-column-lastDate"

  Scenario: Check private projects are not displayed on the homepage
    When the "/" page is open
    Then the text "Test private project" is not in the element ".project__list__title"
