import BasePage from './BasePage';

class SharingPage extends BasePage {

  // Locators

  get sharingCenterButton() {
    return cy.contains('Sharing Center');
  }

  get linksTab() {
    return cy.contains('Links');
  }

  get accessLog() {
    return cy.contains('Access Logs');
  }

  get recentlyViewed() {
    return cy.contains('Recently Viewed');
  }

  // Sharing Center

  clickSharingCenterButton() {
    cy.log('Clicking Sharing Center');

    this.sharingCenterButton
      .should('be.visible')
      .click();

    cy.log('Sharing Center opened successfully');

    return this;
  }

  // Links Tab

  clickLinksTab() {
    cy.log('Clicking Links tab');

    this.linksTab
      .should('be.visible')
      .click();

    cy.log('Links tab opened successfully');

    return this;
  }

  verifyLinksTab() {
    cy.log('Verifying Links tab');

    this.linksTab
      .should('be.visible');

    cy.log('Links tab verified successfully');

    return this;
  }

  // Access Logs

  clickAccessLog() {
    cy.log('Clicking Access Logs');

    this.accessLog
      .should('be.visible')
      .click();

    cy.log('Access Logs opened successfully');

    return this;
  }

  verifyAccessLog() {
    cy.log('Verifying Access Logs');

    this.accessLog
      .should('be.visible');

    cy.log('Access Logs verified successfully');

    return this;
  }

  // Recently Viewed

  clickRecentlyViewed() {
    cy.log('Clicking Recently Viewed');

    this.recentlyViewed
      .should('be.visible')
      .click();

    cy.log('Recently Viewed opened successfully');

    return this;
  }

  verifyRecentlyViewed() {
    cy.log('Verifying Recently Viewed');

    this.recentlyViewed
      .should('be.visible');

    cy.log('Recently Viewed verified successfully');

    return this;
  }
}

export default new SharingPage();