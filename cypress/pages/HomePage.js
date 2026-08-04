import BasePage from './BasePage';

class HomePage {
  get header() {
    return cy.get('header');
  }

  get primaryNavigation() {
    return cy.get('nav');
  }

  get heroHeading() {
    return cy.contains('h1', 'Validated Authority');
  }

  get requestArchitectureButton() {
    return cy.contains('a, button', 'Request Technical Architecture Review');
  }

  get exploreDocsButton() {
    return cy.contains('a, button', 'Explore Developer Docs');
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

  clickLoginLink() {
    this.loginLink.click();
    return this;
  }

  visitHomePage() {
    BasePage.visit('/');
    return this;
  }

  verifyHeroSectionIsVisible() {
    this.heroHeading.should('be.visible');
    return this;
  }

  verifyPageTitle(expectedTitle) {
    BasePage.verifyTitle(expectedTitle);
    return this;
  }

  verifyNavigationIsVisible() {
    this.primaryNavigation.should('be.visible');
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

  handlePopupIfVisible() {
    cy.wait(10000);

    cy.get('body').then(($body) => {
      const overlay = $body.find('#qr-popup-overlay');
      const popup = $body.find('#qr-popup');

      if (overlay.length > 0 || popup.length > 0) {
        const closeButton = $body.find('#qr-popup .qr-close');

        if (closeButton.length > 0) {
          cy.wrap(closeButton.first()).click({ force: true });
        } else {
          cy.log('QR popup detected but close button selector did not match');
        }
      }
    });

    return this;
  }

  verifyPrimaryCtaLinksAreVisible() {
    this.requestArchitectureButton.should('be.visible');
    this.exploreDocsButton.should('be.visible');
    return this;
  }
}

export default new HomePage();
