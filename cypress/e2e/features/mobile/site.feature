Feature: Telnyx website mobile customer journeys

  Scenario: Explore the responsive homepage and return the menu to its closed state
    When I visit the "/" page
    Then the main heading should be visible
    And the main heading should fit within the mobile viewport
    When I open the mobile menu
    Then the mobile menu should be expanded
    And the page should have a link to "/contact-us"
    When I close the mobile menu
    Then the mobile menu should be collapsed

  Scenario: Navigate from the mobile menu to enterprise sales
    When I visit the "/" page
    Then the main heading should be visible
    When I open the mobile menu
    Then the mobile menu should be expanded
    When I choose "Contact sales" from the mobile menu
    Then the current path should be "/contact-us"
    And the main heading should include "Contact enterprise sales"
    And the page should have a link containing "tel:+15127377750"

  Scenario: Browse from the mobile product catalog to Voice API
    When I visit the "/products" page
    Then the main heading should include "Everything you need"
    When I follow the in-page link to "#primitives"
    Then the current URL hash should be "#primitives"
    And the page should have a link to "/products/voice-api"
    When I follow a visible link to "/products/voice-api"
    Then the current path should be "/products/voice-api"
    And the main heading should include "Voice API"
    And the main heading should fit within the mobile viewport

  Scenario: Compare pricing plans on a narrow viewport
    When I visit the "/pricing" page
    Then the main heading should include "Pay for what you use"
    And the main heading should fit within the mobile viewport
    When I follow the in-page link to "#plans"
    Then the current URL hash should be "#plans"
    And the page should contain the text "Every rate above, three ways to pay"
    And the page should contain the text "$2,000"
    And the page should contain the text "$5,000"
    And the page should have a link to "/sign-up"

  Scenario: Adjust the mobile inference estimate and switch service tier
    When I visit the "/pricing/inference-api" page
    Then the main heading should include "Inference Pricing"
    And the main heading should fit within the mobile viewport
    When I record the displayed inference estimate
    And I change the input named "inference-input-tokens" to "2000000000"
    Then the displayed estimate should be higher than before
    When I choose the service tier "Priority"
    Then the selected service tier should be "Priority"
