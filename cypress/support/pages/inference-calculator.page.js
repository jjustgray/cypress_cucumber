const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  pricing: "/pricing/inference-api",
};

const selectors = {
  inputTokens: 'input[name="inference-input-tokens"]',
  serviceTierTab: '[role="tab"]',
  serviceTierPanel: '[role="tabpanel"]:visible',
  estimateLabel: "span",
};

const estimateLabel = new RegExp(
  `^${expected.inferenceCalculator.estimateLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
);

function parseEstimate(text) {
  const result = text.match(
    new RegExp(
      `${expected.inferenceCalculator.estimateLabel}\\s*\\$([\\d,.]+)`,
      "i",
    ),
  );
  expect(result, "displayed monthly estimate").to.not.be.null;
  return Number(result[1].replace(/,/g, ""));
}

class InferenceCalculatorPage extends BasePage {
  visit() {
    super.visit(routes.pricing);
  }

  estimateCard() {
    return cy.contains(selectors.estimateLabel, estimateLabel).parent();
  }

  rememberCurrentEstimate() {
    this.estimateCard()
      .invoke("text")
      .then(parseEstimate)
      .as("initialEstimate");
  }

  setInputTokensToTwoBillion() {
    this.setInputTokens("2000000000");
  }

  setInputTokens(value) {
    cy.get(selectors.inputTokens).clear().type(value).blur();
  }

  assertInputTokensValue(value) {
    cy.get(selectors.inputTokens).should("have.value", value);
  }

  assertZeroInputTokenCost() {
    this.estimateCard()
      .contains(/^Input tokens$/)
      .parent()
      .parent()
      .should("contain.text", "$0.00");
  }

  assertEstimateIsNonNegative() {
    this.estimateCard().should(($card) => {
      expect(parseEstimate($card.text())).to.be.at.least(0);
    });
  }

  assertEstimateHigherThanBefore() {
    cy.get("@initialEstimate").then((initialEstimate) => {
      this.estimateCard().should(($card) => {
        expect(parseEstimate($card.text())).to.be.greaterThan(initialEstimate);
      });
    });
  }

  choosePriorityTier() {
    cy.contains(selectors.serviceTierTab, "Priority").click();
  }

  rememberDefaultTierPrices() {
    cy.contains(selectors.serviceTierTab, "Default").click();
    cy.get(selectors.serviceTierPanel)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        cy.wrap(text.trim()).as("defaultTierPrices");
      });
  }

  assertPriorityTierSelected() {
    cy.contains(selectors.serviceTierTab, "Priority").should(
      "have.attr",
      "aria-selected",
      "true",
    );
  }

  assertPriorityTierPricesDifferFromDefault() {
    cy.get("@defaultTierPrices").then((defaultTierPrices) => {
      cy.get(selectors.serviceTierPanel).should(($panel) => {
        expect($panel.text().trim()).to.not.equal(defaultTierPrices);
      });
    });
  }
}

module.exports = new InferenceCalculatorPage();
