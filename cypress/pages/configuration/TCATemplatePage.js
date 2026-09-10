import BasePage from '../BasePage';

class TCATemplatePage extends BasePage {

    get tcaHeading() {
    return cy.contains(/TCA Templates?/i).filter(':visible').first();
   }

   get pactveratransactionTable() {
    return cy.get('table').filter(':visible').first();
  }

  get pactveratransactionTableHeaders() {
    return this.pactveratransactionTable.find('thead th');
  }

  get createWorkflowButton() {
    return cy.contains('button', 'Create WorkFlow').filter(':visible').first();
  }

   get workflowTemplateNameInput() {
    return cy.get('input').filter('[placeholder*="Manufacturing Purchase Order TCA"]');
  }

  get descriptionInput() {
    return cy.get('textarea').filter(':visible').first();
  }

  get addPartiesButton() {
    return cy.contains('button', 'Add Parties').filter(':visible').first();
  }

  get cancelButton() {
    return cy.contains('button', 'Cancel').filter(':visible').first();
  }

  get continueWorkflowBuilderButton() {
    return cy.contains('button', 'Continue To WorkFlow Builder').filter(':visible').first();
  }

  getPartyConfigurationSection() {
  return cy.contains('h3', 'Select 2 -Party Configuration').closest('section');
  }

  getRoleNameInput(index = 0) {
  return this.getPartyConfigurationSection().find('label').contains(`Role ${index + 1} Name`).parent()
    .find('input').should('exist');
  }

  getRoleDescriptionInput(index = 0) {
  return this.getPartyConfigurationSection().find('label').contains(`Role ${index + 1} Name`)
    .closest('div.grid').find('input').eq(1);
  }

    verifyPageLoaded() {
    cy.log('Action: Verify TCA Templates page is displayed');
    this.tcaHeading.should('be.visible');
    cy.log('VERIFIED: TCA Templates page displayed');
    return this;
   }


   verifyPactveratransactionColumns() {
    cy.log('Action: Verify Pactvera transaction workflows columns');
    const columns = ['Name','Status','Actions'];
    columns.forEach((columnName) => {
    this.pactveratransactionTableHeaders.contains(columnName).should('exist');
    cy.log(`Verified column: ${columnName}`);
    });
    cy.log('VERIFIED: All Pactvera transaction workflows columns');
    return this;
  }

  clickCreateWorkflow() {
    cy.log('Action: Click Create Workflow');
    this.createWorkflowButton.should('exist').and('be.visible').click({ force: true });
    cy.log('Create Workflow button clicked');
    return this;
  }

  verifyTCALoaded() {
    cy.log('Action: Verify Create Pactvera Transaction Workflow page is loaded');
    cy.contains('Create Pactvera Transaction Workflow').filter(':visible').should('be.visible');
    cy.contains('Select 1 -Template Information').filter(':visible').should('be.visible');
    cy.contains('Select 2 -Party Configuration').filter(':visible').should('be.visible');
    cy.log('VERIFIED: Create Pactvera Transaction Workflow page is loaded');

    return this;
  }

  verifyCancelButtonDisplayed() {
    cy.log('Action: Verify Cancel button is displayed');
    this.cancelButton.should('be.visible').and('contain.text', 'Cancel');
    cy.log('VERIFIED: Cancel button is displayed');

    return this;
  }

  verifyContinueButtonDisplayedAndDisabled() {
    cy.log('Action: Verify Continue To Workflow Builder button is displayed and disabled');
    this.continueWorkflowBuilderButton.should('be.visible').and('be.disabled');
    cy.log('VERIFIED: Continue To Workflow Builder button is displayed and disabled when mandatory data is missing');

    return this;
  }

   enterWorkflowTemplateName(workflowName) {
    cy.log(`Action: Enter Workflow Template Name: ${workflowName}`);
    this.workflowTemplateNameInput.should('be.visible').clear().type(workflowName);
    cy.log('Workflow Template Name entered successfully');

    return this;
  }

  enterDescription(description) {
    cy.log('Action: Enter workflow description');
    this.descriptionInput.should('be.visible').clear().type(description);
    cy.log('Workflow description entered successfully');

    return this;
  }

   enterRole(roleName, roleDescription, index = 0) {
    cy.log(`Action: Enter party role: ${roleName}`);
    this.getRoleNameInput(index).should('be.visible').clear().type(roleName);
    this.getRoleDescriptionInput(index).should('be.visible').clear().type(roleDescription);
    cy.log(`Role entered successfully: ${roleName}`);
    return this;
  }

  clickAddParties() {
    cy.log('Action: Click Add Parties button');
    this.addPartiesButton.should('be.visible').click({ force: true });
    cy.log('Add Parties button clicked successfully');

    return this;
  }

  verifySecondRoleDisplayed() {
    cy.log('Action: Verify second party role fields are displayed');
    this.getRoleNameInput(1).should('be.visible');
    this.getRoleDescriptionInput(1).should('be.visible');
    cy.log('VERIFIED: Second party role fields are displayed');

    return this;
  }

   verifyContinueButtonEnabled() {
    cy.log('Action: Verify Continue To Workflow Builder button is enabled');
    this.continueWorkflowBuilderButton.should('be.visible').and('not.be.disabled');
    cy.log('VERIFIED: Continue To Workflow Builder button is enabled');

    return this;
  }

  clickContinueToWorkflowBuilder() {
    cy.log('Action: Click Continue To Workflow Builder');
    this.continueWorkflowBuilderButton.should('be.visible').and('not.be.disabled').click({ force: true });
    cy.log('Continue To Workflow Builder clicked successfully');

    return this;
  }

   addBuyerAndSellerRoles() {
    const timestamp = Date.now();
    const buyerRole = `Buyer ${timestamp}`;
    const buyerDescription = `Buy description ${timestamp}`;
    const sellerRole = `Selles description ${timestamp}`;
    const sellerDescription = `Seller role ${timestamp}`;

    cy.log('Action: Add unique Buyer and Seller roles');
    this.enterRole(buyerRole,buyerDescription,0);
    this.clickAddParties();
    this.verifySecondRoleDisplayed();
    this.enterRole(sellerRole,sellerDescription,1);
    cy.wrap({buyerRole,buyerDescription,sellerRole,sellerDescription
    }).as('workflowPartyData');
    cy.log('VERIFIED: Unique Buyer and Seller roles added successfully');

    return this;
  }

  createUniqueWorkflowTemplate() {
    const timestamp = Date.now();
    const workflowName = `Automation Workflow ${timestamp}`;
    const description = `Automation workflow description ${timestamp}`;
    cy.log('Action: Enter unique workflow template information');
    this.enterWorkflowTemplateName(workflowName);
    this.enterDescription(description);
    cy.wrap({ workflowName,description}).as('workflowTemplateData');
    cy.log('VERIFIED: Unique workflow template information entered');

    return this;
  }

  clickImportJson() {
  cy.log('Action: Click Import JSON');
  cy.contains('button', 'Import JSON').should('be.visible').click({ force: true });
  cy.log('Import JSON file selector opened');

  return this;
}

uploadWorkflowJson(filePath = 'tca_workflow_test.json') {
 const normalizedPath = filePath.startsWith('cypress/fixtures/')
    ? filePath
    : `cypress/fixtures/${filePath}`;
  cy.log(`Action: Upload workflow JSON file: ${normalizedPath}`);
  cy.get('input[type="file"]').should('exist').selectFile(normalizedPath, { force: true });
  cy.log('Workflow JSON file uploaded successfully');

  return this;
}

clickContinue() {
  cy.log('Action: Click Continue on Workflow Builder');
  cy.contains('button', 'Continue').filter(':visible').should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Workflow Builder Continue button clicked');

  return this;
}

clickPublishWorkFlow() {
  cy.log('Action: Click on Publish WorkFlow');
  cy.contains('button', 'Publish WorkFlow').filter(':visible').should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Publish WorkFlow button clicked');

  return this;
}

verifyPublishSuccessMessage() {
  cy.contains('Success').should('be.visible');
  cy.contains('TCA template published successfully.').should('be.visible');
}

verifyWorkflowTemplateNameRequiredError() {
  cy.log('Action: Verify Workflow Template Name validation');
  cy.contains('Workflow template name is required.').filter(':visible').should('be.visible');
  cy.log('VERIFIED: Workflow template name required validation displayed');

  return this;
}

verifyRoleNameRequiredError() {
  cy.log('Action: Verify Role Name validation');
  cy.contains('Role name is required.').filter(':visible').should('be.visible');
  cy.log('VERIFIED: Role name required validation displayed');

  return this;
}

verifyRole1NameRequiredError() {
  cy.log('Action: Verify Role 1 Name validation');
  cy.get('input[placeholder="e.g Buyer"]').should('be.visible').parents('.flex.flex-col').first()
    .contains('Role name is required.').should('be.visible');

  return this;
}

}
export default new TCATemplatePage();