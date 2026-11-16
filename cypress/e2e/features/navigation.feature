Feature: Contact Telnyx from mobile navigation

  @mobile @smoke @TC-12
  Scenario: Reach enterprise sales from mobile navigation
    Given I am on the Telnyx homepage
    When I open the navigation menu
    And I choose Contact sales from navigation
    Then I see enterprise sales contact options
    And I see a visible US sales phone link
