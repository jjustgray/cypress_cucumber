Feature: Telnyx website mobile experience

  Scenario: Homepage hero heading is visible on mobile
    When I visit the "/" page
    Then the main heading should be visible

  Scenario: Mobile navigation menu opens
    When I visit the "/" page
    And I open the mobile menu
    Then the mobile menu should be expanded

  Scenario: Mobile navigation menu closes
    When I visit the "/" page
    And I open the mobile menu
    And I close the mobile menu
    Then the mobile menu should be collapsed

  Scenario: Mobile navigation reaches enterprise sales
    When I visit the "/" page
    And I open the mobile menu
    And I choose "Contact sales" from the mobile menu
    Then the main heading should include "Contact enterprise sales"

  Scenario: Pricing page key content is accessible on mobile
    When I visit the "/pricing" page
    Then the main heading should fit within the mobile viewport
    And the page should have a link to "/sign-up"
