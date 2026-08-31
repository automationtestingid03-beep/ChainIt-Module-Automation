import BasePage from '../BasePage';

class DocumentTemplatePage extends BasePage {
  get newFolderButton() {
    return cy.contains('button', 'New Folder');
  }

  get folderNameInput() {
    return cy.get('[data-test="name-input"]');
  }

  get createFolderButton() {
    return cy.get('[data-test="add-folder"]');
  }

  get documentHeading() {
    return cy.contains('Document Templates');
  }

  clickNewFolder() {
    cy.log('Clicking New Folder button');

    this.newFolderButton
      .should('be.visible')
      .then(($button) => {
        cy.wrap($button).click();
      });

    return this;
  }

  enterFolderName(folderName) {
    cy.log(`Entering document folder name: ${folderName}`);

    this.folderNameInput
      .should('be.visible')
      .clear()
      .type(folderName);

    return this;
  }

  clickCreateFolder() {
    cy.log('Clicking Create Folder');

    this.createFolderButton
      .should('be.visible')
      .scrollIntoView()
      .then(($button) => {
        cy.wrap($button).click();
      });

    return this;
  }

  verifyPageLoaded() {
    cy.log('Verifying Document template page');

    this.documentHeading
      .should('be.visible');

    return this;
  }
}

export default new DocumentTemplatePage();
