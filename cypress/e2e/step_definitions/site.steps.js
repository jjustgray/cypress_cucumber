const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("I visit the {string} page", (path) => {
  cy.intercept(
    {
      hostname: "cdn.cookielaw.org",
      pathname: "**/*.js",
    },
    {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "void 0;",
    },
  );
  cy.visit(path);
});

When("I follow a visible link to {string}", (path) => {
  cy.get("a[href]")
    .filter((_, link) => new URL(link.href).pathname === path)
    .filter(":visible")
    .first()
    .scrollIntoView()
    .click();
});

When("I select the SIP Trunking pricing card", () => {
  cy.get('a[href="/pricing/elastic-sip"]')
    .filter((_, link) => link.innerText.includes("Per minute rates"))
    .filter(":visible")
    .scrollIntoView()
    .click();
});

When("I follow the in-page link to {string}", (hash) => {
  cy.get(`a[href="${hash}"]`).filter(":visible").first().click();
});

When("I scroll to the heading {string}", (text) => {
  cy.contains("h1, h2, h3", text).first().scrollIntoView();
});

When("I scroll to the site footer", () => {
  cy.get("footer").last().scrollIntoView().should("be.visible");
});

When("I open the first release note", () => {
  cy.get('a[href^="/release-notes/"]')
    .filter(":visible")
    .first()
    .scrollIntoView()
    .click();
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

When("I change the input named {string} to {string}", (name, value) => {
  cy.get(`input[name="${name}"]`).clear().type(value).blur();
});

When("I record the displayed inference estimate", () => {
  cy.get("body")
    .invoke("text")
    .then((text) => {
      const estimate = text.match(/ESTIMATED COST\s*\$([\d,.]+)/i);
      expect(estimate, "displayed monthly estimate").to.not.be.null;
      cy.wrap(Number(estimate[1].replace(/,/g, ""))).as("initialEstimate");
    });
});

When("I choose the service tier {string}", (tier) => {
  cy.contains('[role="tab"]', tier).click();
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

Then("the footer should have a link containing {string}", (part) => {
  cy.get(`footer a[href*="${part}"]`).filter(":visible").should("exist");
});

Then("the current path should be {string}", (path) => {
  cy.location("pathname", { timeout: 15000 }).should("eq", path);
});

Then("the current path should contain {string}", (part) => {
  cy.location("pathname").should("include", part);
});

Then("the current URL hash should be {string}", (hash) => {
  cy.location("hash").should("eq", hash);
});

Then("the heading {string} should be visible", (text) => {
  cy.contains("h1, h2, h3", text).should("be.visible");
});

Then("the page should contain the text {string}", (text) => {
  cy.contains("body", text).should("exist");
});

Then("the displayed estimate should be higher than before", () => {
  cy.get("@initialEstimate").then((initialEstimate) => {
    cy.get("body")
      .invoke("text")
      .should((text) => {
        const estimate = text.match(/ESTIMATED COST\s*\$([\d,.]+)/i);
        expect(estimate, "updated monthly estimate").to.not.be.null;
        expect(Number(estimate[1].replace(/,/g, ""))).to.be.greaterThan(
          initialEstimate,
        );
      });
  });
});

Then("the selected service tier should be {string}", (tier) => {
  cy.contains('[role="tab"]', tier).should("have.attr", "aria-selected", "true");
});

Then("the page should have at least {int} telephone links", (count) => {
  cy.get('a[href^="tel:"]').should("have.length.at.least", count);
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
