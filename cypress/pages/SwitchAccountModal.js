import BasePage from './BasePage';

class SwitchAccountModal extends BasePage {

  // Locators

  get modal() {
    return cy.get('[role="dialog"]');
  }

  get heading() {
    return this.modal.contains('Switch Account');
  }

  get personalAccountSection() {
    return this.modal.contains('div', /^Personal Account$/);
  }

  get personalAccountName() {
    return this.personalAccountSection
      .parent()
      .find('span')
      .first();
  }

  // Verification

  verifyVisible() {
    cy.log('Verifying Switch Account modal');

    this.modal
      .should('be.visible');

    this.heading
      .should('be.visible');

    this.personalAccountSection
      .should('be.visible');

    cy.log('Switch Account modal is visible');

    return this;
  }

  // Automatically select Personal Account

  clickIndividualAccount() {
    cy.log('Getting Personal Account name');

    this.personalAccountName
      .should('be.visible')
      .invoke('text')
      .then((accountName) => {

        const name = accountName.trim();

        cy.log(`Personal Account found: "${name}"`);
        cy.log(`Selecting Personal Account: "${name}"`);

        this.personalAccountName
          .click({ force: true });

        cy.log(`Personal Account "${name}" selected successfully`);
      });

    return this;
  }
}

export default new SwitchAccountModal();