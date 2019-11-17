Feature:  Display quickstart on helppage 

Scenario: List quickstart on helppage
    Given the "/help" page is open
    And the text "Quickstart" is in the element ".help__card__content__title"
    And enter text "Glossary" in the element ".help__card__header__search.mat-input-element"
    And the ".help__card__content__title" link at position 0 is clicked
    Then the text "Get up and running in minutes" is in the element "#get-up-and-running-in-minutes-in-3-simple-steps-and-without-installing-anything"

Scenario: Ensure search in quickstart on helppage
    Given the "/help" page is open
    And enter text "Glossary" in the element ".help__card__header__search.mat-input-element"
    And the text "Glossary" is in the element ".help__card__content__title"
    And clear text in the element ".help__card__header__search.mat-input-element"
    And enter text "Project Not visible" in the element ".help__card__header__search.mat-input-element"
    And the text "Project Not visible" is not in the element ".help__card__content__title"
