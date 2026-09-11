import BasePage from '../BasePage';

class PactveraMainPage extends BasePage {

  get mainBreadcrumb() {
    return cy.get('nav[aria-label="breadcrumb"]').contains('a', 'Main').filter(':visible').first();
  }

  get mainHeading() {
    return cy.contains('h1', 'Get Started with Pactvera');
  }

  get sendPactveraCard() {
    return cy.contains('h3', 'Send a Pactvera').closest('div.bg-white');
  }

  get receivedPactveraCard() {
    return cy.contains('h3', 'View Received Pactveras').closest('div.bg-white');
  }

  get sentPactveraCard() {
    return cy.contains('h3', 'View Sent Pactveras').closest('div.bg-white');
  }

  get manageTemplatesCard() {
    return cy.contains('h3', 'Manage Templates').closest('div.bg-white');
  }

  get manageConnectionsCard() {
    return cy.contains('h3', 'Manage Connections').closest('div.bg-white');
  }

  get sentFoldersCard() {
    return cy.contains('h3', 'View & Manage Sent Folders').closest('div.bg-white');
  }


  verifyMainPageDisplayed() {
    cy.log('Action: Verify Pactvera Main page is displayed');
    this.mainHeading.should('be.visible').and('contain.text', 'Get Started with Pactvera');
    cy.log('VERIFIED: Pactvera Main page is displayed');

    return this;
  }


  verifySendPactveraCard() {
    this.sendPactveraCard.should('be.visible');
    this.sendPactveraCard.find('h3').should('contain.text', 'Send a Pactvera');
    this.sendPactveraCard.find('button').should('be.visible').and('contain.text', 'Create & Send');

    return this;
  }

  verifyReceivedPactveraCard() {
    this.receivedPactveraCard.should('be.visible');
    this.receivedPactveraCard.find('h3').should('contain.text', 'View Received Pactveras');
    this.receivedPactveraCard.find('button').should('be.visible').and('contain.text', 'Open Received');

    return this;
  }

  verifySentPactveraCard() {
    this.sentPactveraCard.should('be.visible');
    this.sentPactveraCard.find('h3').should('contain.text', 'View Sent Pactveras');
    this.sentPactveraCard.find('button').should('be.visible').and('contain.text', 'View Sent');

    return this;
  }

  verifyManageTemplatesCard() {
    this.manageTemplatesCard.should('be.visible');
    this.manageTemplatesCard.find('h3').should('contain.text', 'Manage Templates');
    this.manageTemplatesCard.find('button').should('be.visible').and('contain.text', 'Open Templates');

    return this;
  }

  verifyManageConnectionsCard() {
    this.manageConnectionsCard.should('be.visible');
    this.manageConnectionsCard.find('h3').should('contain.text', 'Manage Connections');
    this.manageConnectionsCard.find('button').should('be.visible').and('contain.text', 'Go to Connections');

    return this;
  }

  verifySentFoldersCard() {
    this.sentFoldersCard.should('be.visible');
    this.sentFoldersCard.find('h3').should('contain.text', 'View & Manage Sent Folders');
    this.sentFoldersCard.find('button').should('be.visible').and('contain.text', 'View Folders');

    return this;
  }


  clickCreateAndSend() {
  cy.log('Action: Click Create & Send');

  cy.contains('button', /^Create & Send$/)
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  cy.log('Create a Pactvera popup displayed successfully');

  return this;
  }

  clickOpenReceived() {
    cy.log('Action: Click Open Received');
    this.receivedPactveraCard.find('button').should('be.visible').click({ force: true });

    return this;
  }

  clickViewSent() {
    cy.log('Action: Click View Sent');
    this.sentPactveraCard.find('button').should('be.visible').click({ force: true });

    return this;
  }

  clickOpenTemplates() {
    cy.log('Action: Click Open Templates');
    this.manageTemplatesCard.find('button').should('be.visible').click({ force: true });

    return this;
  }

  clickGoToConnections() {
    cy.log('Action: Click Go to Connections');
    this.manageConnectionsCard.find('button').should('be.visible').click({ force: true });

    return this;
  }

  clickViewFolders() {
    cy.log('Action: Click View Folders');
    this.sentFoldersCard.find('button').should('be.visible').click({ force: true });

    return this;
  }

  clickMainBreadcrumb() {
    cy.log('Action: Navigate back to Pactvera Main');
    this.mainBreadcrumb.should('be.visible').click({ force: true });
    cy.url().should('include', '/pactvera/main');
    this.mainHeading.should('be.visible');
    cy.log('VERIFIED: Pactvera Main page displayed successfully');
    return this;
  }

  closeCreatePactveraPopup() {
  cy.log('Action: Close Create a Pactvera popup');
  cy.get('[role="dialog"]:visible').find('button').first()
    .should('be.visible').click({ force: true });
  cy.get('[role="dialog"]:visible').should('not.exist');
  cy.log('Create a Pactvera popup closed successfully');

  return this;
}
}

export default new PactveraMainPage();