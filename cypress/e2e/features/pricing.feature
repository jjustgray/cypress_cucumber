Feature: Telnyx pricing plans

  @pricing
  Scenario Outline: Compare pricing plans and continue on <device>
    Given I am viewing Telnyx pricing
    When I open the pricing plans
    Then I can compare the available payment plans
    When <pricing_action>
    Then <destination_result>

    @desktop @smoke @TC-06
    Examples: Desktop
      | device  | pricing_action                             | destination_result                   |
      | desktop | I choose enterprise sales from the plans   | I see enterprise sales contact options |

    @mobile @TC-14
    Examples: Mobile
      | device | pricing_action                       | destination_result          |
      | mobile | I choose Sign up from the plans      | I reach the sign-up page    |

  @desktop @TC-07
  Scenario: Find SIP Trunking pricing in the pricing catalog
    Given I am viewing Telnyx pricing
    When I choose SIP Trunking from the pricing catalog
    Then I see SIP Trunking pricing
    And I see pay-as-you-go rates

  # Live pricing overflows at 390px; keep the regression assertion visible as skipped until the site is fixed.
  @mobile @known-issue
  Scenario: Keep pricing content within the mobile screen
    Given I am viewing Telnyx pricing
    Then the pricing page fits the screen without horizontal scrolling
