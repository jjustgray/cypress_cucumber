const BasePage = require("./base.page");
const expected = require("../../fixtures/site-content.json");

const routes = {
  hub: "/resources",
};

const selectors = {
  releaseNotesLink: "a",
  links: "a[href]",
};

const releaseArticlePath = /^\/release-notes\/[^/]+\/?$/;

class ResourcesPage extends BasePage {
  visit() {
    super.visit(routes.hub);
  }

  openReleaseNotes() {
    cy.contains(selectors.releaseNotesLink, /^RELEASE NOTES$/)
      .filter(":visible")
      .click();
  }

  openRecentReleaseNote() {
    cy.get(selectors.links)
      .filter((_, link) => {
        const url = new URL(link.href);
        return (
          url.origin === window.location.origin &&
          releaseArticlePath.test(url.pathname)
        );
      })
      .filter(":visible")
      .first()
      .scrollIntoView()
      .click();
  }

  assertReleaseNoteFilters() {
    this.assertVisibleTextIn("main", expected.resources.releaseNotesFilter);
  }

  assertReleaseNoteArticle() {
    cy.location("pathname").should("match", releaseArticlePath);
    this.assertHeadingVisible();
  }

}

module.exports = new ResourcesPage();
