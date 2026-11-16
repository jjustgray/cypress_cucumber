Feature: Telnyx resources and release notes

  @desktop @TC-10
  Scenario: Open a current release note from the resources hub
    Given I am viewing the resources hub
    When I open release notes from the resources hub
    Then I see release note filters
    When I open a recent release note
    Then I see a release note article
