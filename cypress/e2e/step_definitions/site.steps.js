const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const site = require("../../support/site-helpers");

When("I visit the {string} page", (path) => {
  site.visit(path);
});

When("I follow a visible link to {string}", (path) => {
  site.followLink(path);
});

When("I select the SIP Trunking pricing card", () => {
  site
    .findLink("/pricing/elastic-sip")
    .filter((_, link) => link.innerText.includes("Per minute rates"))
    .scrollIntoView()
    .click();
});

When("I follow the in-page link to {string}", (hash) => {
  site.followAnchor(hash);
});

When("I scroll to the heading {string}", (text) => {
  site.scrollToHeading(text);
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
  site.estimate().then((value) => cy.wrap(value).as("initialEstimate"));
});

When("I choose the service tier {string}", (tier) => {
  cy.contains('[role="tab"]', tier).click();
});

Then("the main heading should include {string}", (text) => {
  site.assertHeading(text);
});

Then("the main heading should be visible", () => {
  site.assertHeadingVisible();
});

Then("the page should have a link to {string}", (path) => {
  site.assertLink(path);
});

Then("the page should include a link to {string}", (path) => {
  site.assertLink(path, false);
});

Then("the page should have a link containing {string}", (part) => {
  site.assertLinkContaining(part);
});

Then("the footer should have a link containing {string}", (part) => {
  site.assertLinkContaining(part, "footer");
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
  site.assertText(text);
});

Then("the displayed estimate should be higher than before", () => {
  cy.get("@initialEstimate").then((initialEstimate) => {
    site.estimate().should("be.greaterThan", initialEstimate);
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
  site.assertHeadingFitsViewport();
});
