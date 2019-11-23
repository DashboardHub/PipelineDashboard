Feature:  Help section

  Scenario: Quickstart is listed on the help page
    Given the "/help" page is open
    Then the text "Quickstart" is in the element ".help__card__content__title"

  Scenario: Search for quickstart on help page
    Given the "/help" page is open
    When enter text "Quick" in the element ".help__card__header__search.mat-input-element"
    Then the text "Quickstart" is in the element ".help__card__content__title"
    And the ".help__card__content__title" link at position 0 is clicked
    Then the text "Get up and running in minutes" is in the element "#get-up-and-running-in-minutes-in-3-simple-steps-and-without-installing-anything"

  Scenario: Reset search on help page
    Given the "/help" page is open
    When enter text "Quickstart" in the element ".help__card__header__search.mat-input-element"
    Then the text "Glossary" is not in the element ".help__card__content__title"
    When clear text in the element ".help__card__header__search.mat-input-element"
    And wait for 500 milliseconds
    Then the text "Glossary" is in the element ".help__card__content__title"
