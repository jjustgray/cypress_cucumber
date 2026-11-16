Feature: Inference pricing calculator

  @mobile @TC-15
  Scenario: Validate calculator inputs and compare service-tier prices
    Given I am viewing inference pricing
    When I note the current estimate
    And I set input tokens to 2 billion
    Then the estimate is higher than before
    When I set input tokens to zero
    Then the input-token cost is zero and the estimate is valid
    When I set input tokens to a negative amount
    Then the calculator normalizes the input to one
    When I enter letters as input tokens
    Then the calculator normalizes the input to zero
    When I note the Default tier prices
    When I choose the Priority service tier
    Then the Priority tier is selected and its prices differ from Default
