Feature:  Main Navigation

  Scenario: Click links in the main navigation
    Given the "/" page is open
    When click on list item ".sidenav .menu__item" at position 0
    Then the text "Homepage" is in the element ".home__title"
    When click on list item ".sidenav .menu__item" at position 1
    Then the text "Features" is in the element ".feature__title"
    When click on list item ".sidenav .menu__item" at position 2
    Then the text "Help" is in the element ".help__title"
