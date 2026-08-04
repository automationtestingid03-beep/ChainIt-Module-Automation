class BasePage {
  visit(path = '/', options = {}) {
    cy.visit(path, options);
    return this;
  }

  waitForPageLoad() {
    cy.location('href', { timeout: 10000 }).should('include', 'chainit');
    return this;
  }

  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
    return this;
  }

  verifyTitle(expectedText) {
    cy.title().should('eq', expectedText);
    return this;
  }

  verifyUrlContains(fragment) {
    cy.location('href').should('include', fragment);
    return this;
  }
}

export default new BasePage();
