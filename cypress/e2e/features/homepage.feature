Feature: Telnyx homepage

  Background:
    Given I am on the Telnyx homepage

  @desktop @smoke @TC-01
  Scenario: Open inference pricing from the homepage
    Then the homepage hero is visible
    When I open inference pricing from the homepage
    Then I see the inference pricing page

  @desktop @smoke @TC-02
  Scenario: Use the homepage sign-up call to action
    When I choose Sign up in the homepage hero
    Then I reach the sign-up page

  @desktop @TC-03
  Scenario: Find Telnyx social profiles in the footer
    When I go to the page footer
    Then the page footer is visible
    And the footer has a visible LinkedIn link to Telnyx
    And the footer has a visible X link to Telnyx

  @mobile @smoke @TC-11
  Scenario: Check the homepage and mobile navigation
    Then the homepage title fits on the screen
    When I open the navigation menu
    Then the navigation menu is expanded
    And the navigation menu has a visible contact sales link
    When I close the navigation menu
    Then the navigation menu is collapsed
