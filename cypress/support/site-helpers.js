function findLink(path, visible = true) {
  const links = cy
    .get("a[href]")
    .filter((_, link) => new URL(link.href).pathname === path);

  return visible ? links.filter(":visible") : links;
}

function visit(path) {
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
}

function followLink(path) {
  findLink(path)
    .first()
    .scrollIntoView()
    .click();
}

function followAnchor(hash) {
  cy.get(`a[href="${hash}"]`).filter(":visible").first().click();
}

function scrollToHeading(text) {
  cy.contains("h1, h2, h3", text).first().scrollIntoView();
}

function pageHeading() {
  return cy.get("h1").first();
}

function assertHeading(text) {
  pageHeading().should("exist").and("contain.text", text);
}

function assertHeadingVisible() {
  pageHeading().should("be.visible");
}

function assertHeadingFitsViewport() {
  pageHeading()
    .should("be.visible")
    .then(($heading) => {
      const bounds = $heading[0].getBoundingClientRect();
      expect(bounds.left).to.be.at.least(0);
      expect(bounds.right).to.be.at.most(
        $heading[0].ownerDocument.documentElement.clientWidth,
      );
    });
}

function assertLink(path, visible = true) {
  findLink(path, visible).should("exist");
}

function assertLinkContaining(part, scope = "body") {
  cy.get(`${scope} a[href*="${part}"]`).filter(":visible").should("exist");
}

function assertText(text) {
  cy.contains("body", text).should("exist");
}

function estimate() {
  return cy
    .get("body")
    .invoke("text")
    .then((text) => {
      const result = text.match(/ESTIMATED COST\s*\$([\d,.]+)/i);
      expect(result, "displayed monthly estimate").to.not.be.null;
      return Number(result[1].replace(/,/g, ""));
    });
}

module.exports = {
  assertHeading,
  assertHeadingFitsViewport,
  assertHeadingVisible,
  assertLink,
  assertLinkContaining,
  assertText,
  estimate,
  findLink,
  followAnchor,
  followLink,
  pageHeading,
  scrollToHeading,
  visit,
};
