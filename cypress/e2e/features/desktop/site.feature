Feature: Telnyx website desktop experience

  Scenario: Homepage presents the current primary message
    When I visit the "/" page
    Then the main heading should include "Infrastructure for real-time agents"

  Scenario: Homepage start-building CTA leads to sign up
    When I visit the "/" page
    Then the page should have a link to "/sign-up"

  Scenario: Homepage footer includes the Telnyx LinkedIn profile
    When I visit the "/" page
    Then the page should have a link containing "linkedin.com/company/telnyx"

  Scenario: Products overview is available
    When I visit the "/products" page
    Then the main heading should include "Everything you need"

  Scenario: Pricing overview is available
    When I visit the "/pricing" page
    Then the main heading should include "Pay for what you use"

  Scenario: Pricing overview links to SIP Trunking rates
    When I visit the "/pricing" page
    Then the page should have a link to "/pricing/elastic-sip"

  Scenario: SIP Trunking pricing shows its published inbound rate
    When I visit the "/pricing/elastic-sip" page
    Then the main heading should include "SIP Trunking Pricing"
    And the page should contain "$0.0032"

  Scenario: Enterprise sales contact page is available
    When I visit the "/contact-us" page
    Then the main heading should include "Contact enterprise sales"

  Scenario: Enterprise sales page exposes its telephone link
    When I visit the "/contact-us" page
    Then the page should have a link containing "tel:+15127377750"

  Scenario: Resources page is available
    When I visit the "/resources" page
    Then the main heading should include "Read it, clone it, or ask the machine"
