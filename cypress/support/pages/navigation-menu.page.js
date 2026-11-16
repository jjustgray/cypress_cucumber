const BasePage = require("./base.page");

const selectors = {
  menu: "#main-menu",
  openButton: 'button[aria-label="Open menu"]',
  closeButton: 'button[aria-label="Close menu"]',
};

const routes = {
  enterpriseSales: "/contact-us",
};

class NavigationMenuPage extends BasePage {
  open() {
    cy.get(selectors.openButton).click();
  }

  close() {
    cy.get(selectors.closeButton).click();
  }

  assertExpanded() {
    cy.get(selectors.closeButton).should("have.attr", "aria-expanded", "true");
  }

  assertCollapsed() {
    cy.get(selectors.openButton).should("have.attr", "aria-expanded", "false");
  }

  assertOffersContactSales() {
    this.assertLinkIn(selectors.menu, routes.enterpriseSales);
  }

  chooseContactSales() {
    this.followLinkIn(selectors.menu, routes.enterpriseSales);
  }
}

module.exports = new NavigationMenuPage();
