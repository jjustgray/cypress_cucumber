const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  catalog: "/products",
  voiceApi: "/products/voice-api",
  contactSales: "/contact-us",
  signup: "/sign-up",
};

class ProductsPage extends BasePage {
  visitCatalog() {
    super.visit(routes.catalog);
  }

  visitVoiceApi() {
    super.visit(routes.voiceApi);
  }

  browseCategories() {
    this.followAnchor("#primitives");
  }

  chooseVoiceApi() {
    this.followLink(routes.voiceApi);
  }

  assertVoiceApiOverview() {
    this.assertHeading(expected.products.voiceApiHeading);
    this.assertVisibleTextIn("main", expected.products.voiceApiMetrics[0]);
  }

  assertIntroductionFitsViewport() {
    this.assertHeadingFitsViewport();
  }

  assertScaleMetrics() {
    expected.products.voiceApiMetrics.forEach((metric) => {
      this.assertVisibleTextIn("main", metric);
    });
  }

  assertOnboardingOptions() {
    this.assertLink(routes.contactSales);
    this.assertLink(routes.signup);
  }
}

module.exports = new ProductsPage();
