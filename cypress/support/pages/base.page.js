function exactText(text) {
  const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^\\s*${escapedText}\\s*$`);
}

class BasePage {
  visit(path) {
    cy.visit(path);
  }

  findLink(path, visible = true) {
    const links = cy.get("a[href]").filter((_, link) => {
      const url = new URL(link.href);
      return (
        url.origin === window.location.origin && url.pathname === path
      );
    });

    return visible ? links.filter(":visible") : links;
  }

  followLink(path) {
    this.findLink(path).first().scrollIntoView().click();
  }

  followLinkIn(selector, path) {
    cy.get(selector).within(() => {
      this.findLink(path).first().scrollIntoView().click();
    });
  }

  followLinkInSection(heading, path) {
    cy.contains("h1, h2, h3", heading)
      .closest("section")
      .scrollIntoView()
      .find("a[href]")
      .filter((_, link) => {
        const url = new URL(link.href);
        return (
          url.origin === window.location.origin && url.pathname === path
        );
      })
      .filter(":visible")
      .first()
      .scrollIntoView()
      .click();
  }

  followLinkWithTextInSection(heading, text) {
    cy.contains("h1, h2, h3", heading)
      .closest("section")
      .scrollIntoView()
      .within(() => {
        cy.contains("a", text)
          .filter(":visible")
          .should("be.visible")
          .scrollIntoView()
          .click();
      });
  }

  followAnchor(anchor) {
    cy.get(`a[href="${anchor}"]`).filter(":visible").first().click();
  }

  scrollToHeading(text) {
    cy.contains("h1, h2, h3", text).first().scrollIntoView();
  }

  pageHeading() {
    return cy.get("h1").filter(":visible").first();
  }

  assertPath(path) {
    cy.location("pathname").should("eq", path);
  }

  assertHeading(text) {
    cy.contains("h1", text)
      .should("be.visible")
      .and("contain.text", text);
  }

  assertHeadingVisible() {
    this.pageHeading().should("be.visible");
  }

  assertHeadingFitsViewport(text) {
    const heading = text
      ? cy.contains("h1", text)
      : this.pageHeading();

    heading.should(($heading) => {
      const element = $heading[0];
      const bounds = element.getBoundingClientRect();
      const styles = element.ownerDocument.defaultView.getComputedStyle(element);
      const viewport = element.ownerDocument.documentElement;

      expect(element.textContent.trim()).to.not.be.empty;
      expect(styles.display).to.not.equal("none");
      expect(styles.visibility).to.not.equal("hidden");
      expect(Number(styles.opacity)).to.be.greaterThan(0);
      expect(bounds.width).to.be.greaterThan(0);
      expect(bounds.height).to.be.greaterThan(0);
      expect(bounds.left).to.be.at.least(0);
      expect(bounds.right).to.be.at.most(viewport.clientWidth);
      expect(bounds.top).to.be.at.least(0);
      expect(bounds.bottom).to.be.at.most(viewport.clientHeight);
    });
  }

  assertLink(path, visible = true) {
    this.findLink(path, visible).should("exist");
  }

  assertLinkIn(selector, path) {
    cy.get(selector).within(() => {
      this.findLink(path).should("exist");
    });
  }

  assertLinkContaining(part, scopeSelector = "body") {
    cy.get(`${scopeSelector} a[href*="${part}"]`)
      .filter(":visible")
      .should("exist");
  }

  assertVisibleTextIn(selector, text) {
    cy.get(selector).contains(exactText(text)).should("be.visible");
  }

  assertVisibleTextInSection(heading, text) {
    cy.contains("h1, h2, h3", heading)
      .closest("section")
      .should("be.visible")
      .within(() => {
        cy.contains(exactText(text)).should("be.visible");
      });
  }

  assertPlanMinimum(planName, amount) {
    cy.contains("#plans h3", planName)
      .should("be.visible")
      .closest("li")
      .should("be.visible")
      .within(() => {
        cy.contains(exactText(amount)).should("be.visible");
        cy.contains(exactText("per month minimum")).should("be.visible");
      });
  }

  assertNoHorizontalOverflow() {
    cy.document().should((document) => {
      const documentWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      );
      expect(documentWidth).to.be.at.most(
        document.documentElement.clientWidth,
      );
    });
  }
}

module.exports = BasePage;
