import BasePage from './BasePage';

class NavigationPage extends BasePage {

  // Locators

  get platformLink() {
    return cy.contains('a', 'Platform');
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
    return cy.contains('a', 'Login');
  }

  // Navigation Actions

  clickPlatformLink() {
    cy.log('Clicking Platform link');

    this.platformLink
      .should('be.visible')
      .click();

    cy.log('Platform link clicked successfully');

    return this;
  }

  clickDevelopersLink() {
    cy.log('Clicking Developers link');

    this.developersLink
      .should('be.visible')
      .click();

    cy.log('Developers link clicked successfully');

    return this;
  }

  // Navigation Verification

  verifyNavigationLinksVisible() {
    cy.log('Verifying navigation links');

    this.platformLink
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

    cy.log('All navigation links are visible');

    return this;
  }
}

export default new NavigationPage();