Feature: Enterprise sales contact options

  @desktop @TC-09
  Scenario: Review sales response and phone options
    Given I am on the enterprise sales page
    Then the sales team responds within one business day
    And I see a visible US sales phone link
    And I see a visible international sales phone link
    And the sales page offers at least 10 phone options
