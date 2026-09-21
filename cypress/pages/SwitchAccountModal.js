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

  get organizationsSection() {
    return this.modal.contains('div', /^Organizations$/);
  }

  get organizationsSearchInput() {
    return this.modal.find('input[placeholder="Search"]');
  }

  get organizationButtons() {
    return this.organizationsSection
      .parent()
      .find('button');
  }

  get accountSwitcherTrigger() {
    return cy.contains('span', 'Organization').closest('div.cursor-pointer');
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

  // Get all Organization names and return them
  getAllOrganizations() {
    cy.log('Getting all Organization names from the list');
    const organizations = [];
    return this.organizationButtons.find('span.text-left').each(($span) => {
        const name = $span.text().trim();
        if (name) {
          organizations.push(name);
          cy.log(`Found organization: "${name}"`);
        }
      })
      .then(() => {
        cy.log(`Total organizations found: ${organizations.length}`);
        cy.log(`Organizations list: [${organizations.join(', ')}]`);
        cy.wrap(organizations).as('allOrganizations');

        return cy.wrap(organizations);
      });
  }

  // Switch to a specific Organization by name
  clickOrganizationAccount(orgName) {
    cy.log(`Getting Organization account: "${orgName}"`);
    this.organizationButtons.contains('span.text-left', orgName).should('be.visible').then(($span) => {
        const name = $span.text().trim();
        cy.log(`Organization found: "${name}"`);
        cy.log(`Selecting Organization: "${name}"`);
        cy.wrap($span).closest('button').click({ force: true });
        cy.log(`Organization "${name}" selected successfully`);
      });

    return this;
  }

  // Search for an Organization in the search box
  searchOrganization(orgName) {
    cy.log(`Searching for organization: "${orgName}"`);
    this.organizationsSearchInput.should('be.visible').clear().type(orgName);
    cy.log(`Search performed for "${orgName}"`);

    return this;
  }

  // Select Organization by Position (index-based)
  selectOrganizationByIndex(index) {
    cy.log(`Getting Organization at position: ${index + 1}`);
    this.organizationButtons.eq(index).should('be.visible').find('span.text-left')
      .invoke('text')
      .then((accountName) => {
        const name = accountName.trim();
        cy.log(`Organization at position ${index + 1}: "${name}"`);
        cy.log(`Selecting Organization: "${name}"`);
        this.organizationButtons.eq(index).click({ force: true });
        cy.log(`Organization "${name}" (position ${index + 1}) selected successfully`);
      });
    return this;
  }

  selectFirstOrganization() {
    cy.log('Selecting the first Organization in the list');
    this.selectOrganizationByIndex(0);
    return this;
  }

  selectSecondOrganization() {
    cy.log('Selecting the second Organization in the list');
    this.selectOrganizationByIndex(1);
    return this;
  }

  selectThirdOrganization() {
    cy.log('Selecting the third Organization in the list');
    this.selectOrganizationByIndex(2);
    return this;
  }

  selectPersonalOrganization() {
    cy.log('Action: Click account switcher to open Switch Account modal');
    this.accountSwitcherTrigger.click();
    cy.log('Action: Wait for Switch Account modal to open');
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