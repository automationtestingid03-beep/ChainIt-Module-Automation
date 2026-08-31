import BasePage from '../BasePage';

class FormTemplatePage extends BasePage {
  get createNewButton() {
    return cy.contains('button', 'Create New');
  }

  get titleInput() {
    return cy.get('[data-test="title-input"]');
  }

  get saveButton() {
    return cy.contains('button', 'Save');
  }

  get cancelButton() {
    return cy.get('[data-test="button-Cancel"]');
  }

  get formHeading() {
    return cy.contains('Form Templates');
  }

  clickCreateNewButton() {
    cy.log('Clicking Create New in Form template page');

    this.createNewButton
      .should('be.visible')
      .then(($button) => {
        cy.wrap($button).click();
      });

    return this;
  }

  enterTitle(title) {
    cy.log(`Entering form template title: ${title}`);

    this.titleInput
      .should('be.visible')
      .clear()
      .type(title);

    return this;
  }

  clickSave() {
    cy.log('Clicking Save button');

    this.saveButton
      .should('be.visible')
      .should('not.be.disabled')
      .then(($button) => {
        cy.wrap($button).click();
      });

    return this;
  }

  clickCancel() {
    cy.log('Clicking Cancel button');

    this.cancelButton
      .should('be.visible')
      .click();

    return this;
  }

  verifyPageLoaded() {
    cy.log('Verifying Form template page');

    this.formHeading
      .should('be.visible');

    return this;
  }
}

export default new FormTemplatePage();
