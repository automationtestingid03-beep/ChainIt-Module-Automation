import BasePage from './BasePage';

class DocumentPage {

  // Locators

  get newFolderButton() {
    return cy.contains('button', 'New Folder');
  }

  get enterFolderNameInput() {
    return cy.get('[data-test="name-input"]');
  }

  get createButton() {
    return cy.get('[data-test="add-folder"]');
  }

  // Actions

  clickNewFolderButton() {
    cy.log('Clicking New Folder button');

    this.newFolderButton
      .should('be.visible')
      .click();

    cy.log('New Folder button clicked successfully');

    return this;
  }

  enterFolderName(text) {
    cy.log(`Entering folder name: "${text}"`);

    this.enterFolderNameInput
      .should('be.visible')
      .clear()
      .type(text);

    cy.log(`Folder name "${text}" entered successfully`);

    return this;
  }

  clickCreateFolderButton() {
    cy.log('Clicking Create Folder button');

    this.createButton
      .should('be.visible')
      .scrollIntoView()
      .click();

    cy.log('Create Folder button clicked successfully');

    return this;
  }
}

export default new DocumentPage();