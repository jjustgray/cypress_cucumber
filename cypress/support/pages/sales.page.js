const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  enterpriseSales: "/contact-us",
};

const selectors = {
  phoneLinks: 'a[href^="tel:"]',
};

class SalesPage extends BasePage {
  visit() {
    super.visit(routes.enterpriseSales);
  }

  assertEnterpriseSalesHeading() {
    this.assertHeading(expected.sales.heading);
  }

  assertResponseTime() {
    this.assertVisibleTextIn("main", expected.sales.responseTime);
  }

  assertUsSalesPhone() {
    this.assertLinkContaining("tel:+15127377750");
  }

  assertInternationalSalesPhone() {
    this.assertLinkContaining("tel:+18889809750");
  }

  assertAtLeastTenPhoneOptions() {
    cy.get(selectors.phoneLinks).should("have.length.at.least", 10);
  }
}

module.exports = new SalesPage();
