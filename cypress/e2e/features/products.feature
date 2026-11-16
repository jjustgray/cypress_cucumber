Feature: Telnyx product discovery

  @products
  Scenario Outline: Browse the product catalog on <device>
    Given I am browsing the product catalog
    When I browse the product categories
    And I choose Voice API
    Then I see the Voice API overview
    And the Voice API introduction fits on the screen

    @desktop @TC-04
    Examples: Desktop
      | device  |
      | desktop |

    @mobile @TC-13
    Examples: Mobile
      | device |
      | mobile |

  @desktop @TC-05
  Scenario: Review Voice API scale and onboarding options
    Given I am viewing Voice API details
    Then the Voice API page highlights its scale
    And I see visible Voice API contact and sign-up links
    When I go to the page footer
    Then the footer has a visible LinkedIn link to Telnyx
