import BasePage from './BasePage';

class DownloadPage extends BasePage {

  // Locators

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

  // URL Verification

  verifyUrl(expectedUrl) {
    cy.log(`Verifying URL: "${expectedUrl}"`);

    cy.url()
      .should('eq', expectedUrl);

    cy.log(`URL verified successfully: "${expectedUrl}"`);

    return this;
  }

  // Hero Section Verification

  verifyHeroText() {
    cy.log('Verifying hero text');

    this.heroText
      .should('be.visible');

    cy.log('Hero text is visible');

    return this;
  }

  // Logo Verification

  verifyLogoIsVisible() {
    cy.log('Verifying ChainIT logo');

    this.chainitLogo
      .should('be.visible');

    cy.log('ChainIT logo is visible');

    return this;
  }

  // Header Links Verification

  verifyHeaderLinksAreVisible() {
    cy.log('Verifying header navigation links');

    this.platformLink
      .should('be.visible');

    this.executionLink
      .should('be.visible');

    this.solutionsLink
      .should('be.visible');

    this.developersLink
      .should('be.visible');

    this.resourcesLink
      .should('be.visible');

    this.demoLink
      .should('be.visible');

    this.loginLink
      .should('be.visible');

    cy.log('All header navigation links are visible');

    return this;
  }
}

export default new DownloadPage();