const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  home: "/",
  inferencePricing: "/pricing/inference-api",
  signup: "/sign-up",
};

class HomepagePage extends BasePage {
  visit() {
    super.visit(routes.home);
  }

  assertHeroVisible() {
    this.assertHeading(expected.homepage.heroHeading);
  }

  chooseInferencePricing() {
    this.followLinkWithTextInSection(
      expected.homepage.inferenceSectionHeading,
      expected.homepage.inferencePricingLink,
    );
  }

  chooseHeroSignup() {
    this.followLinkInSection(expected.homepage.heroHeading, routes.signup);
  }

  assertInferencePricingPage() {
    this.assertPath(routes.inferencePricing);
    this.assertHeading(expected.homepage.inferencePricingHeading);
  }

  assertSignupPage() {
    this.assertPath(routes.signup);
  }

  goToFooter() {
    cy.get("footer").last().scrollIntoView();
  }

  assertFooterVisible() {
    cy.get("footer").last().should("be.visible");
  }

  assertLinkedInFooterLink() {
    this.assertLinkContaining("linkedin.com/company/telnyx", "footer");
  }

  assertXFooterLink() {
    this.assertLinkContaining("x.com/telnyx", "footer");
  }

  assertHeroFitsViewport() {
    this.assertHeadingFitsViewport(expected.homepage.heroHeading);
  }
}

module.exports = new HomepagePage();
