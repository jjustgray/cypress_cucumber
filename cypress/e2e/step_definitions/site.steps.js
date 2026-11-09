const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("I visit the {string} page", (path) => {
  cy.intercept(
    {
      hostname: "cdn.cookielaw.org",
      pathname: "**/otBannerSdk.js",
    },
    {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "void 0;",
    },
  );
  cy.visit(path);
});

When("I open the mobile menu", () => {
  cy.get('button[aria-label="Open menu"]').click();
});

When("I close the mobile menu", () => {
  cy.get('button[aria-label="Close menu"]').click();
});

When("I choose {string} from the mobile menu", (label) => {
  cy.contains("a", label).click();
});

Then("the main heading should include {string}", (text) => {
  cy.get("h1").first().should("exist").and("contain.text", text);
});

Then("the main heading should be visible", () => {
  cy.get("h1").first().should("be.visible");
});

Then("the page should have a link to {string}", (path) => {
  cy.get("a")
    .filter((_, link) => new URL(link.href).pathname === path)
    .filter(":visible")
    .should("exist");
});

Then("the page should include a link to {string}", (path) => {
  cy.get("a")
    .filter((_, link) => new URL(link.href).pathname === path)
    .should("exist");
});

Then("the page should have a link containing {string}", (part) => {
  cy.get(`a[href*="${part}"]`).filter(":visible").should("exist");
});

Then("the page should contain {string}", (text) => {
  cy.contains(text).should("be.visible");
});

Then("the mobile menu should be expanded", () => {
  cy.get('button[aria-label="Close menu"]').should(
    "have.attr",
    "aria-expanded",
    "true",
  );
});

Then("the mobile menu should be collapsed", () => {
  cy.get('button[aria-label="Open menu"]').should(
    "have.attr",
    "aria-expanded",
    "false",
  );
});

Then("the main heading should fit within the mobile viewport", () => {
  cy.get("h1")
    .first()
    .should("be.visible")
    .then(($heading) => {
      const bounds = $heading[0].getBoundingClientRect();
      expect(bounds.left).to.be.at.least(0);
      expect(bounds.right).to.be.at.most(
        $heading[0].ownerDocument.documentElement.clientWidth,
      );
    });
});
