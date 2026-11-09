Feature: Telnyx website desktop customer journeys

  Scenario: Explore inference from the homepage to its pricing page
    When I visit the "/" page
    Then the main heading should include "Infrastructure for real-time agents"
    When I scroll to the heading "Inference infrastructure that scales with you"
    Then the heading "Inference infrastructure that scales with you" should be visible
    And the page should have a link to "/pricing/inference-api"
    When I follow a visible link to "/pricing/inference-api"
    Then the current path should be "/pricing/inference-api"
    And the main heading should include "Inference Pricing"

  Scenario: Follow the homepage sign-up call to action
    When I visit the "/" page
    Then the main heading should include "Infrastructure for real-time agents"
    And the page should have a link to "/sign-up"
    When I follow a visible link to "/sign-up"
    Then the current path should be "/sign-up"

  Scenario: Find social profiles from the site footer
    When I visit the "/" page
    Then the main heading should include "Infrastructure for real-time agents"
    When I scroll to the site footer
    Then the footer should have a link containing "linkedin.com/company/telnyx"
    And the footer should have a link containing "x.com/telnyx"

  Scenario: Browse the product catalog to the Voice API detail page
    When I visit the "/products" page
    Then the main heading should include "Everything you need"
    When I follow the in-page link to "#primitives"
    Then the current URL hash should be "#primitives"
    And the page should have a link to "/products/voice-api"
    When I follow a visible link to "/products/voice-api"
    Then the current path should be "/products/voice-api"
    And the main heading should include "Voice API"
    And the page should contain the text "140+"

  Scenario: Inspect Voice API scale and onboarding options
    When I visit the "/products/voice-api" page
    Then the main heading should include "Voice API"
    And the page should have a link to "/contact-us"
    And the page should have a link to "/sign-up"
    And the page should contain the text "140+"
    And the page should contain the text "25M+"
    And the page should contain the text "10M+"
    When I scroll to the site footer
    Then the footer should have a link containing "linkedin.com/company/telnyx"

  Scenario: Compare pricing plans and continue to enterprise sales
    When I visit the "/pricing" page
    Then the main heading should include "Pay for what you use"
    When I follow the in-page link to "#plans"
    Then the current URL hash should be "#plans"
    And the page should contain the text "Every rate above, three ways to pay"
    And the page should contain the text "$2,000"
    And the page should contain the text "$5,000"
    When I follow a visible link to "/contact-us"
    Then the current path should be "/contact-us"
    And the main heading should include "Contact enterprise sales"

  Scenario: Navigate from the pricing catalog to SIP Trunking rates
    When I visit the "/pricing" page
    Then the main heading should include "Pay for what you use"
    And the page should have a link to "/pricing/elastic-sip"
    When I select the SIP Trunking pricing card
    Then the current path should be "/pricing/elastic-sip"
    And the main heading should include "SIP Trunking Pricing"
    And the page should contain the text "$0.0032"
    And the page should contain the text "$0.005"
    When I follow the in-page link to "#pay-as-you-go"
    Then the current URL hash should be "#pay-as-you-go"
    And the page should contain the text "Pay as you go for United States"

  Scenario: Review inbound, outbound, and channel SIP rates
    When I visit the "/pricing/elastic-sip" page
    Then the main heading should include "SIP Trunking Pricing"
    When I scroll to the heading "Make outbound calls"
    Then the heading "Make outbound calls" should be visible
    And the page should contain the text "Starting at $0.005 per minute"
    When I scroll to the heading "Receive inbound calls"
    Then the heading "Receive inbound calls" should be visible
    And the page should contain the text "Starting at $0.0032 per minute"
    When I scroll to the heading "Inbound channel pricing"
    Then the heading "Inbound channel pricing" should be visible
    And the page should contain the text "$12 per month"

  Scenario: Verify sales contact options and international phone routing
    When I visit the "/contact-us" page
    Then the main heading should include "Contact enterprise sales"
    And the page should contain the text "within one business day"
    And the page should have a link containing "tel:+15127377750"
    And the page should have a link containing "tel:+18889809750"
    And the page should have at least 10 telephone links

  Scenario: Open a current release note from the resources hub
    When I visit the "/resources" page
    Then the main heading should include "Read it, clone it, or ask the machine"
    And the page should have a link to "/release-notes"
    When I follow a visible link to "/release-notes"
    Then the current path should be "/release-notes"
    And the page should contain the text "Filter by product"
    When I open the first release note
    Then the current path should contain "/release-notes/"
    And the main heading should be visible
