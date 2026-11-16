const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  pricing: "/pricing",
  sipPricing: "/pricing/elastic-sip",
  contactSales: "/contact-us",
  signup: "/sign-up",
};

class PricingPage extends BasePage {
  visit() {
    super.visit(routes.pricing);
  }

  visitSipPricing() {
    super.visit(routes.sipPricing);
  }

  openPlans() {
    this.followAnchor("#plans");
  }

  chooseEnterpriseSalesFromPlans() {
    this.followLinkIn("#plans", routes.contactSales);
  }

  chooseSignupFromPlans() {
    this.followLinkIn("#plans", routes.signup);
  }

  chooseSipTrunkingFromCatalog() {
    this.findLink(routes.sipPricing)
      .filter((_, link) => link.innerText.includes("Per minute rates"))
      .first()
      .scrollIntoView()
      .click();
  }

  assertAvailablePlans() {
    expected.pricing.plans.forEach(({ name, minimum }) => {
      this.assertPlanMinimum(name, minimum);
    });
  }

  assertSipPricingPage() {
    this.assertHeading(expected.pricing.sipHeading);
  }

  assertPayAsYouGoRates() {
    this.assertVisibleTextInSection(
      expected.pricing.payAsYouGoHeading,
      expected.pricing.payAsYouGoHeading,
    );
    this.assertVisibleTextInSection(
      expected.pricing.payAsYouGoHeading,
      expected.pricing.outboundRate,
    );
    this.assertVisibleTextInSection(
      expected.pricing.payAsYouGoHeading,
      expected.pricing.inboundRate,
    );
  }

  assertOutboundRates() {
    this.scrollToHeading(expected.pricing.outboundHeading);
    this.assertVisibleTextInSection(
      expected.pricing.outboundHeading,
      expected.pricing.outboundRate,
    );
  }

  assertInboundRates() {
    this.scrollToHeading(expected.pricing.inboundHeading);
    this.assertVisibleTextInSection(
      expected.pricing.inboundHeading,
      expected.pricing.inboundRate,
    );
  }

  assertInboundChannelPricing() {
    this.scrollToHeading(expected.pricing.channelHeading);
    this.assertVisibleTextInSection(
      expected.pricing.channelHeading,
      expected.pricing.channelRate,
    );
  }

  assertNoMobileHorizontalOverflow() {
    this.assertNoHorizontalOverflow();
  }
}

module.exports = new PricingPage();
