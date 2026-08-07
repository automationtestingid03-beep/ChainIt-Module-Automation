class DownloadPage {
  get heroText() {
    return cy.contains('The app that verifies everything');
  }

  get chainitLogo() {
    return cy.get('img[alt="ChainIT"]').first();
  }

  get platformLink() {
    return cy.contains('a', 'Platform');
  }

  get executionLink() {
    return cy.contains('a', 'Execution');
  }

  get solutionsLink() {
    return cy.contains('a', 'Solutions');
  }

  get developersLink() {
    return cy.contains('a', 'Developers');
  }

  get resourcesLink() {
    return cy.contains('a', 'Resources');
  }

  get demoLink() {
    return cy.contains('a', 'Demo');
  }

  get loginLink() {
    return cy.contains('a', /Login/i);
  }

  verifyUrl(expectedUrl) {
    cy.url().should('eq', expectedUrl);
    return this;
  }

  verifyHeroText() {
    this.heroText.should('be.visible');
    return this;
  }

  verifyLogoIsVisible() {
    this.chainitLogo.should('be.visible');
    return this;
  }

  verifyHeaderLinksAreVisible() {
    this.platformLink.should('be.visible');
    this.executionLink.should('be.visible');
    this.solutionsLink.should('be.visible');
    this.developersLink.should('be.visible');
    this.resourcesLink.should('be.visible');
    this.demoLink.should('be.visible');
    this.loginLink.should('be.visible');
    return this;
  }
}

export default new DownloadPage();
