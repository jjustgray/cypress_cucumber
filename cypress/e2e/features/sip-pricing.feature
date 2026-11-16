Feature: SIP Trunking rates

  @desktop @TC-08
  Scenario: Review SIP Trunking rates
    Given I am viewing SIP Trunking pricing
    Then outbound calls start at $0.005 per minute
    And inbound calls start at $0.0032 per minute
    And inbound channels cost $12 per month
