import BasePage from './BasePage';
import PactveraTemplatePage from './configuration/PactveraTemplatePage';
import DocumentTemplatePage from './configuration/DocumentTemplatePage';
import FormTemplatePage from './configuration/FormTemplatePage';
import TCATemplatePage from './configuration/TCATemplatePage';

class ConfigurationPage extends BasePage {

  // Locators

  get configurationButton() {
    return cy.contains('button, a, div', /configuration/i).filter(':visible').first();
  }

  get pactveraButton() {
    return cy.contains('button, a, div', /pactvera/i).filter(':visible').first();
  }

  get documentButton() {
    return cy.contains('button, a, div', /document/i).filter(':visible').first();
  }

  get formButton() {
    return cy.contains('button, a, div', /form/i).filter(':visible').first();
  }

  get tcaButton() {
    return cy.contains('button, a, div', /tca/i).filter(':visible').first();
  }

  get configurationButton() {
  return cy.contains('button, a, div', 'Configuration').filter(':visible').first();
  }

  get tcaTemplatesButton() {
  return cy.contains('a, button, div', 'TCA Templates') .filter(':visible').first();
 }

  // Configuration

  clickConfigurationButton() {
    cy.log('Clicking Configuration button');

    this.configurationButton
      .should('be.visible')
      .click({ force: true });

    cy.log('Configuration button clicked successfully');

    return this;
  }

  clickConfigurationsButton() {
  cy.log('Action: Opening Configuration menu');
  this.configurationButton.should('be.visible').click({ force: true });
  cy.log('Configuration button clicked');
  cy.wait(500);
  cy.log('Configuration menu expanded successfully');

  return this;
}

  // Pactvera Templates

  clickPactveraButton() {
    cy.log('Clicking Pactvera Template button');

    this.pactveraButton
      .should('be.visible')
      .click({ force: true });

    cy.log('Pactvera Template button clicked successfully');

    return PactveraTemplatePage.verifyPageLoaded();
  }

  verifyPactveraPage() {
    cy.log('Verifying Pactvera Template page');

    this.pactveraButton
      .should('be.visible');

    cy.log('Pactvera Template page verified successfully');

    return PactveraTemplatePage.verifyPageLoaded();
  }

  // Document Templates

  clickDocumentButton() {
    cy.log('Clicking Document Templates button');

    this.documentButton
      .should('be.visible')
      .click({ force: true });

    cy.log('Document Templates button clicked successfully');

    return DocumentTemplatePage.verifyPageLoaded();
  }

  verifyDocumentPage() {
    cy.log('Verifying Document Templates page');

    this.documentButton
      .should('be.visible');

    cy.log('Document Templates page verified successfully');

    return DocumentTemplatePage.verifyPageLoaded();
  }

  // Form Templates

  clickFormButton() {
    cy.log('Clicking Form Templates button');

    this.formButton
      .should('be.visible')
      .click({ force: true });

    cy.log('Form Templates button clicked successfully');

    return FormTemplatePage.verifyPageLoaded();
  }

  verifyFormPage() {
    cy.log('Verifying Form Templates page');

    this.formButton
      .should('be.visible');

    cy.log('Form Templates page verified successfully');

    return FormTemplatePage.verifyPageLoaded();
  }

  clickTCAButton() {
    cy.log('Clicking TCA Templates button');
    this.tcaTemplatesButton.should('be.visible').click({ force: true });
    cy.log('TCA Templates button clicked successfully');

    return TCATemplatePage.verifyPageLoaded();
  }

  verifyFormPage() {
    cy.log('Verifying TCA Templates page');
    this.tcaButton.should('be.visible');
    cy.log('TCA Templates page verified successfully');
    return TCATemplatePage.verifyPageLoaded();
  }
}

export default new ConfigurationPage();