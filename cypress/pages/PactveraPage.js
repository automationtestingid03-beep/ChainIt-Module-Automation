import BasePage from './BasePage';

class PactveraPage extends BasePage {

  // Locators

  get createNewButton() {
    return cy.contains('button', 'Create New');
  }

  get titleInput() {
    return cy.get('[data-test="title-input"]');
  }

  get createButton() {
    return cy.get('[data-test="button-Create"]');
  }

  get descriptionInput() {
    return cy.get('textarea[placeholder="Enter a Description"]');
  }

  get saveButton() {
    return cy.contains('button', 'Save');
  }

  get cancelButton() {
    return cy.get('[data-test="button-Cancel"]');
  }

  get pactveraText() {
    return cy.contains('Pactvera Template');
  }

  get threeDotMenu() {
    return cy.get('[data-test="actions-pactvera-template"]').first();
  }

  get deleteButton() {
    return cy.get('[data-test="button-delete"]');
  }

  get deleteButtonPopup() {
    return cy.contains('button', 'Delete');
  }

  get documentButton() {
    return cy.contains('button', 'Document');
  }

  get uploadNewButton() {
    return cy.contains('button', 'Upload New');
  }

  get uploadButton() {
    return cy.contains('button', 'Upload');
  }

  get continueButton() {
    return cy.contains('button', 'Continue');
  }

  // Create New Template

  clickCreateNewButton() {
    cy.log('Clicking Create New button');

    this.createNewButton
      .should('be.visible')
      .click();

    this.titleInput
      .should('be.visible', { timeout: 20000 });

    cy.log('Create New template form opened successfully');

    return this;
  }

  enterTitleText(title) {
    cy.log(`Entering template title: "${title}"`);

    this.titleInput
      .should('be.visible')
      .clear()
      .type(title);

    cy.log(`Template title entered successfully: "${title}"`);

    return this;
  }

  clickCreateButton() {
    cy.log('Clicking Create button');

    this.createButton
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.log('Create button clicked successfully');

    return this;
  }

  enterDescriptionText(description) {
    cy.log(`Entering template description: "${description}"`);

    this.descriptionInput
      .should('be.visible')
      .clear()
      .type(description);

    cy.log('Template description entered successfully');

    return this;
  }

  clickSaveButton() {
    cy.log('Clicking Save button');

    this.saveButton
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.log('Save button clicked successfully');

    return this;
  }

  // Cancel Template Creation

  clickCancelButton() {
    cy.log('Clicking Cancel button');

    this.cancelButton
      .should('be.visible')
      .click();

    cy.log('Cancel button clicked successfully');

    return this;
  }

  // Pactvera Page Verification

  verifyPactveraText() {
    cy.log('Verifying Pactvera Template page');

    this.pactveraText
      .should('be.visible');

    cy.log('Pactvera Template page verified successfully');

    return this;
  }

  // Validation

  verifyErrorMessage() {
    cy.log('Verifying required title error message');

    cy.contains('Title is required')
      .should('be.visible');

    cy.log('Title required error message verified successfully');

    return this;
  }

  // Delete Template

  clickThreeDotMenu() {
    cy.log('Opening Pactvera template actions menu');

    this.threeDotMenu
      .should('be.visible')
      .click();

    cy.log('Pactvera template actions menu opened successfully');

    return this;
  }

  clickDeleteButton() {
    cy.log('Clicking Delete button');

    this.deleteButton
      .should('be.visible')
      .click();

    cy.log('Delete button clicked successfully');

    return this;
  }

  clickDeleteButtonPopup() {
    cy.log('Confirming template deletion');

    this.deleteButtonPopup
      .should('be.visible')
      .click();

    cy.log('Template deletion confirmed successfully');

    return this;
  }

  verifyDeleteMessage() {
    cy.log('Verifying template deletion message');

    cy.contains('Request deleted successfully')
      .should('be.visible');

    cy.log('Template deletion message verified successfully');

    return this;
  }

  // Document Upload

  clickDocumentButton() {
    cy.log('Opening Document section');

    this.documentButton
      .should('be.visible')
      .click();

    cy.log('Document section opened successfully');

    return this;
  }

  clickUploadNewButton() {
    cy.log('Clicking Upload New button');

    this.uploadNewButton
      .should('be.visible')
      .click();

    cy.log('Upload New button clicked successfully');

    return this;
  }

  addFile(filePath = 'cypress/fixtures/gaurav.pdf') {
    cy.log(`Uploading file: "${filePath}"`);

    cy.get('input[type="file"]')
      .should('exist')
      .selectFile(filePath, { force: true });

    cy.log(`File "${filePath}" selected successfully`);

    return this;
  }

  clickUploadButton() {
    cy.log('Clicking Upload button');

    this.uploadButton
      .should('be.visible')
      .click();

    cy.log('Upload button clicked successfully');

    return this;
  }
}

export default new PactveraPage();