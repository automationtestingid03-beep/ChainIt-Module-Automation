import BasePage from './BasePage';

class ConfigurationPage extends BasePage {

  // Locators

  get configurationButton() {
    return cy.contains('Configuration');
  }

  get pactveraButton() {
    return cy.contains('Pactvera Template');
  }

  get documentButton() {
    return cy.contains('Document Templates');
  }

  get formButton() {
    return cy.contains('Form Templates');
  }

  // Configuration

  clickConfigurationButton() {
    cy.log('Clicking Configuration button');

    this.configurationButton
      .should('be.visible')
      .click();

    cy.log('Configuration button clicked successfully');

    return this;
  }

  // Pactvera Templates

  clickPactveraButton() {
    cy.log('Clicking Pactvera Template button');

    this.pactveraButton
      .should('be.visible')
      .click();

    cy.log('Pactvera Template button clicked successfully');

    return this;
  }

  verifyPactveraPage() {
    cy.log('Verifying Pactvera Template page');

    this.pactveraButton
      .should('be.visible');

    cy.log('Pactvera Template page verified successfully');

    return this;
  }

  // Document Templates

  clickDocumentButton() {
    cy.log('Clicking Document Templates button');

    this.documentButton
      .should('be.visible')
      .click();

    cy.log('Document Templates button clicked successfully');

    return this;
  }

  verifyDocumentPage() {
    cy.log('Verifying Document Templates page');

    this.documentButton
      .should('be.visible');

    cy.log('Document Templates page verified successfully');

    return this;
  }

  // Form Templates

  clickFormButton() {
    cy.log('Clicking Form Templates button');

    this.formButton
      .should('be.visible')
      .click();

    cy.log('Form Templates button clicked successfully');

    return this;
  }

  verifyFormPage() {
    cy.log('Verifying Form Templates page');

    this.formButton
      .should('be.visible');

    cy.log('Form Templates page verified successfully');

    return this;
  }
}

export default new ConfigurationPage();