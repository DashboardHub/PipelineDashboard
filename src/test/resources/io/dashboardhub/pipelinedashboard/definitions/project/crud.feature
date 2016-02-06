#Feature: CRUD project
#
#  Scenario: Create project successfully
#    Given I am logged in
#    When I go /project/add
#    And I fill in the field name with testname
#    And I fill in the field description with testdescription
#    And Submit the form form-project
#    Then I see element alert-successful
#    And I get redirected to the /project page
#
#  Scenario: Create project unsuccessfully
#    Given I am logged in
#    When I go /project/add
#    And I fill in the field name with N
#    And I fill in the field description with D
#    And Submit the form form-project
#    Then I see element alert-successful
#    And I see element alert-error
#    And I see element name-error
#    And I see element description-error
#    And the field name contains N
#    And the field description contains D
