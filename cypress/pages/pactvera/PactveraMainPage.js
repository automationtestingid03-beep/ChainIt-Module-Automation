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

   get continueButton() {
    return cy.contains('button', 'Continue').filter(':visible').first();
  }

   get cancelButton() {
    return cy.contains('button', 'Cancel').filter(':visible').first();
  }

  get stepper() {
    return cy.get('[data-test="pactvera-wizard-horizontal-stepper"]');
  }

  get step1() {
    return cy.get('[data-test="pactvera-wizard-step-1"]');
  }

  get step2() {
    return cy.get('[data-test="pactvera-wizard-step-2"]');
  }

  get step3() {
    return cy.get('[data-test="pactvera-wizard-step-3"]');
  }

  get step4() {
    return cy.get('[data-test="pactvera-wizard-step-4"]');
  }

  get step5() {
    return cy.get('[data-test="pactvera-wizard-step-5"]');
  }

  get step6() {
    return cy.get('[data-test="pactvera-wizard-step-6"]');
  }

  get transactionNameInput() {
    return cy.get('[data-test="title-input"]');
  } 

   get pactveraDetailsHeading() {
    return cy.contains('h2', 'Pactvera Details');
  }

  get folderDropdown() {
  return cy.get('input[role="combobox"][id="Folder"]');
  }

  get cancelButton() {
    return cy.get('[data-test="button-pactvera-wizard-cancel"]');
  }

  get saveAsDraftButton() {
    return cy.get('[data-test="button-pactvera-wizard-save-draft"]');
  }

  get continueButtondisabled() {
    return cy.get('[data-test="button-pactvera-wizard-next"]');
  }

  get addNewFolderButton() {
    return cy.get('[data-test="pactvera-wizard-add-folder"]');
  }

   get transactionTypeSearchInput() {
    return cy.get('[data-test="transaction-type-search"]');
  }

  get transactionTypeOptions() {
    return cy.get('[data-test^="transaction-type-option-"]');
  }

  get transactionTypeDetailPanel() {
    return cy.get('[data-test="transaction-type-detail-panel"]');
  }

  get transactionTypeDetailHeading() {
    return this.transactionTypeDetailPanel.find('h3');
  }

  get rolesSection() {
    return this.transactionTypeDetailPanel.find('section').filter((index, element) =>
    Cypress.$(element).find('span').first().text().trim() === 'Roles');
  }

  get includesSection() {
    return this.transactionTypeDetailPanel.find('section').filter((index, element) =>
    Cypress.$(element).find('span').first().text().trim() === 'Includes');
  }

  get roleOptions() {
  return cy.get('[data-test^="tca-role-option-"]');
  }

  get addPartiesStep() {
  return cy.get('[data-test="tca-add-parties-step"]');
  }

  get organizationSection() {
    return this.addPartiesStep.contains('div', 'Your organization').closest('.rounded-xl');
  }

  get addBuyerSection() {
    return this.addPartiesStep.contains('div', 'Add buyer').closest('.rounded-xl');
  }

  get addSalerSection() {
    return this.addPartiesStep.contains('div', 'Add saler').closest('.rounded-xl');
  }

  get addCcRecipientsSection() {
    return this.addPartiesStep.contains('div', 'Add CC recipients').closest('.rounded-xl');
  }

  get organizationAdministratorName() {
  return cy.get('button[aria-haspopup="menu"]').find('span.block.font-semibold').first();
  }

  getOrganizationAdministratorName() {
  cy.log('Action: Get Organization Administrator name');
    this.organizationAdministratorName.invoke('text').then((name) => {
        const administratorName = name.replace(/\s+/g, ' ').trim();
        expect(administratorName).not.to.be.empty;
    cy.wrap(administratorName).as('organizationAdministratorName');
    cy.log(`VERIFIED: Organization Administrator name is "${administratorName}"`);
      });

    return this;
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
  cy.contains('button', /^Create & Send$/).should('be.visible').should('not.be.disabled').click();
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


 verifyContinueButtonDisplayedAndDisabled() {
    cy.log('Action: Verify Continue button is displayed and disabled');
    this.continueButton.should('be.visible').and('be.disabled');
    cy.log('VERIFIED: Continue button is displayed and disabled when mandatory data is missing');

    return this;
  }

  verifyCancelButtonDisplayed() {
    cy.log('Action: Verify Cancel button is displayed');
    this.cancelButton.should('be.visible').and('contain.text', 'Cancel');
    cy.log('VERIFIED: Cancel button is displayed');

    return this;
  }

  clickContinueButton() {
  cy.log('Action: Click Continue button');
  this.continueButton.should('be.visible').should('not.be.disabled').click({ force: true });
  cy.log('Continue button clicked successfully');

  return this;
}

  clickPactveraTransaction() {
  cy.log('Action: Select Pactvera Transaction');
  cy.get('[data-test="pactvera-entry-option-pactvera-transaction"]').should('be.visible').click({ force: true });
  cy.log('Pactvera Transaction selected successfully');
  return this;
  }

 clickPactveraAgreement() {
  cy.log('Action: Select Pactvera Agreement');
  cy.get('[data-test="pactvera-entry-option-pactvera-agreement"]').should('be.visible').click({ force: true });
  cy.log('Pactvera Agreement selected successfully');
  return this;
}

verifyAllSixStepsDisplayed() {
    cy.log('Action: Verify all 6 Pactvera workflow steps are displayed');
    this.step1.should('be.visible').and('contain.text', 'Pactvera Details');
    this.step2.should('be.visible').and('contain.text', 'Transaction type');
    this.step3.should('be.visible').and('contain.text', 'Parties');
    this.step4.should('be.visible').and('contain.text', 'Documents & Forms');
    this.step5.should('be.visible').and('contain.text', 'Value transfer');
    this.step6.should('be.visible').and('contain.text', 'Review');
    cy.log('VERIFIED: All 6 workflow steps are displayed');

    return this;
  }

  verifyStep1Active() {
    cy.log('Action: Verify Step 1 is active');
    this.step1.should('be.visible').find('div').first().should('have.class', 'bg-primary')
      .and('have.class', 'text-white');

    this.step1.find('span').should('contain.text', 'Pactvera Details')
      .and('have.class', 'text-primaryBlack-900');
    cy.log('VERIFIED: Step 1 - Pactvera Details is active');

    return this;
  }

  enterUniqueTransactionName() {
    const transactionName = `Automation PT-${Math.random().toString(36).substring(2, 5)}`;
    cy.log(`Action: Enter transaction name: ${transactionName}`);
    this.transactionNameInput.should('be.visible').clear().type(transactionName);
    cy.wrap(transactionName).as('transactionName');
    cy.log('VERIFIED: Unique transaction name entered');

    return this;
  }

  verifyStep2Displayed() {
    cy.log('Action: Verify Step 2 - Transaction type is displayed');
    this.step2.should('be.visible').and('contain.text', 'Transaction type');
    cy.contains('Transaction type').should('be.visible');
    cy.log('VERIFIED: Step 2 - Transaction type is displayed');

    return this;
  }

   verifyStep1Completed() {
    cy.log('Action: Verify Step 1 is completed');
    this.step1.find('div').first().should('have.class', 'bg-primary').and('have.class', 'text-white');
    cy.log('VERIFIED: Step 1 is completed and displayed in green');

    return this;
  }

  verifyTransactionTypeStep() {
  cy.log('Action: Verify Pactvera Details page is displayed');
  this.pactveraDetailsHeading.should('be.visible');
  cy.contains("You're creating a Pactvera Transaction").should('be.visible');
  cy.contains('Name your transaction').should('be.visible');

  cy.log('VERIFIED: Pactvera Details page is displayed');

  return this;
}

verifyActionButtonsDisabled() {
  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  this.cancelButton.scrollIntoView().should('be.visible').and('be.disabled');
  this.saveAsDraftButton.scrollIntoView().should('be.visible').and('be.disabled');
  this.continueButtondisabled.scrollIntoView().should('be.visible').and('be.disabled');
  cy.log('VERIFIED: Cancel, Save as Draft, and Continue buttons are disabled');

  return this;
}

selectFolderByIndex(index = 0) {
  cy.log(`Action: Select folder at index ${index}`);
  this.folderDropdown.should('be.visible').click({ force: true });
  cy.get('[role="option"]').filter(':visible').eq(index).should('be.visible').invoke('text').then((folderName) => {
      const selectedFolder = folderName.replace(/\s+/g, ' ').trim();
      expect(selectedFolder, 'Selected folder name').to.not.be.empty;
      cy.log(`Selected folder: ${selectedFolder}`);
      cy.get('[role="option"]').filter(':visible').eq(index).click({ force: true });
      cy.wrap(selectedFolder).as('selectedFolderName');
    });

  return this;
}

verifyActionButtonsEnabled() {
  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are enabled');
  this.cancelButton.should('be.visible').and('not.be.disabled');
  this.saveAsDraftButton.should('be.visible').and('not.be.disabled');
  this.continueButton.should('be.visible').and('not.be.disabled');
  cy.log('VERIFIED: Cancel, Save as Draft, and Continue buttons are enabled');

  return this;
}

selectFirstFolder() {
  cy.log('Action: Open Folder dropdown');
  this.folderDropdown.should('be.visible').click({ force: true });
  cy.log('Action: Select first available folder');
  cy.get('[role="option"]').filter(':visible').first().should('be.visible').click({ force: true });

  cy.log('VERIFIED: First folder selected successfully');

  return this;
}

verifyStep3Displayed() {
  cy.log('Action: Verify Step 3 - Parties is displayed');
  this.step3.should('be.visible').and('contain.text', 'Parties');
  cy.log('VERIFIED: Step 3 - Parties is displayed');

  return this;
}


searchAndSelectTransactionType(transactionType) {
    cy.log(`Action: Search and select transaction type: ${transactionType}`);
    this.transactionTypeSearchInput.should('be.visible').clear().type(transactionType);
    cy.log(`Action: Select transaction type: ${transactionType}`);
    this.transactionTypeOptions.filter(':visible').contains(transactionType).should('be.visible').click({ force: true });
    cy.log(`VERIFIED: Transaction type "${transactionType}" selected`);

    return this;
  }

   verifySelectedTransactionType(transactionType) {
    cy.log(`Action: Verify selected transaction type: ${transactionType}`);
    this.transactionTypeDetailPanel.should('be.visible');
    this.transactionTypeDetailHeading.should('be.visible').and('have.text', transactionType);
    cy.log(`VERIFIED: Transaction type "${transactionType}" is displayed`);

    return this;
  }


   verifyRolesSectionDisplayed() {
    cy.log('Action: Verify Roles section is displayed');
    this.rolesSection.should('be.visible').within(() => {
    cy.contains('span', 'Roles').should('be.visible');});
    cy.log('VERIFIED: Roles section is displayed');

    return this;
  }

   verifyIncludesSectionDisplayed() {
    cy.log('Action: Verify Includes section is displayed');
    this.includesSection.should('be.visible').within(() => {
    cy.contains('span', 'Includes').should('be.visible');});
    cy.log('VERIFIED: Includes section is displayed');

    return this;
  }

  verifyRoles(...roles) {
    cy.log(`Action: Verify transaction roles: ${roles.join(', ')}`);
    roles.forEach((role) => {this.rolesSection.should('contain.text', role);
    });
    cy.log('VERIFIED: All expected roles are displayed');

    return this;
  }

  verifyIncludedFeatures(...features) {
    cy.log(`Action: Verify included features: ${features.join(', ')}`);
    features.forEach((feature) => {this.includesSection.should('contain.text', feature);
    });
    cy.log('VERIFIED: All expected included features are displayed');

    return this;
  }

  verifyStep2Completed() {
  cy.log('Verification: Verify Step 2 - Transaction type is completed');
  cy.get('[data-test="pactvera-wizard-step-2"]').should('be.visible').find('svg').should('exist');
  cy.log('VERIFIED: Step 2 - Transaction type is completed');

  return this;
  }

  verifyStep3Completed() {
  cy.log('Verification: Verify Step 3 - Parties is completed');
  cy.get('[data-test="pactvera-wizard-step-3"]').should('be.visible').find('svg').should('exist');
  cy.log('VERIFIED: Step 3 - Parties is completed');

  return this;
}

  chooseRole(role) {
  cy.log(`Action: Choose role - ${role}`);
  cy.get('[data-test^="tca-role-option-"]').filter(':visible').contains('.text-sm.font-semibold', new RegExp(`^${role}$`, 'i'))
    .should('be.visible').click({ force: true });
  cy.log(`VERIFIED: Role "${role}" selected`);

  return this;
  }

  verifyOrganizationDetailsAutopopulate() {
  cy.log('Verification: Verify Your organization details are auto-populated');
  this.organizationSection.within(() => {
  cy.contains('div', 'Email address').parent().find('div.rounded-md').should('not.be.empty');
  cy.contains('div', 'Org Name').parent().find('div.rounded-md').should('not.be.empty');
  cy.contains('div', 'Phone').parent().find('div.rounded-md').should('not.be.empty');
  cy.contains('div', 'Role').parent().find('div.rounded-md').should('not.be.empty');
  });

  cy.log('VERIFIED: Email, Org Name, Phone and Role are auto-populated');

  return this;
}

  verifyAddBuyerSection() {
  cy.log('Verification: Verify Add buyer section');
  this.addBuyerSection.should('be.visible');
  this.addBuyerSection.should('contain.text', 'Add buyer');
  this.addBuyerSection.should('contain.text', 'Who is buyer in this transaction?');
  this.addBuyerSection.contains('button', 'Select from Directory').should('be.visible');
  this.addBuyerSection.contains('button', 'Invite').should('be.visible');
  cy.log('VERIFIED: Add buyer section and both buttons are displayed');

  return this;
  }
 
  verifyAddSalerSection() {
  cy.log('Verification: Verify Add saler section');
  this.addSalerSection.should('be.visible');
  this.addSalerSection.should('contain.text', 'Add saler');
  this.addSalerSection.should('contain.text', 'Who is saler in this transaction?');
  this.addSalerSection.contains('button', 'Select from Directory').should('be.visible');
  this.addSalerSection.contains('button', 'Invite').should('be.visible');
  cy.log('VERIFIED: Add seller section and both buttons are displayed');

  return this;
}


  verifyAddCcRecipientsSection() {
  cy.log('Verification: Verify Add CC recipients section');
  this.addCcRecipientsSection.should('be.visible');
  this.addCcRecipientsSection.should('contain.text', 'Add CC recipients');
  this.addCcRecipientsSection.should('contain.text', 'Should anyone else be kept in the loop?');
  this.addCcRecipientsSection.contains('button', 'Select from Directory').should('be.visible');
  this.addCcRecipientsSection.contains('button', 'Invite').should('be.visible');
  cy.log('VERIFIED: Add CC recipients section and both buttons are displayed');

  return this;
  }

  clickBuyerSelectFromDirectory() {
  cy.log('Action: Click Select from Directory inside Add buyer');
  this.addBuyerSection.contains('button', 'Select from Directory').should('be.visible').click({ force: true });
  cy.log('Action completed: Buyer Select from Directory clicked');

  return this;
  }

  verifyPartySectionBasedOnRole() {
  cy.log('Verification: Verify party section based on organization role');
  this.organizationSection.contains('div', 'Role').parent().invoke('text').then((roleText) => {
  const role = roleText.trim().toLowerCase();
      if (role.includes('saler')) {
        cy.log('Role is Saler - verifying Add buyer section');
        this.verifyAddBuyerSection();
      } else if (role.includes('buyer')) {
        cy.log('Role is Buyer - verifying Add seller section');
        this.verifyAddSalerSection();
      } else {
        throw new Error(`Unexpected organization role: ${role}`);
      }
    });

  return this;
  }

  clickSelectFromDirectoryBasedOnRole() {
  cy.log('Action: Check organization role and select party from directory');
  this.organizationSection.contains('div', /^Role$/).parent().find('div.rounded-md').invoke('text').then((roleText) => {
      const role = roleText.trim().toLowerCase();
      cy.log(`Organization Role: ${role}`);
       if (role === 'saler')  {
        cy.log('Role is Saler - clicking Select from Directory for Buyer');
        cy.contains('[data-test="tca-add-parties-step"] div', /^Add buyer$/)
          .filter(':visible').first().closest('.rounded-xl').contains('button', 'Select from Directory')
          .should('be.visible').click({ force: true });
        cy.log('Action completed: Buyer Select from Directory clicked');
      } else if (role === 'buyer') {
        cy.log('Role is Buyer - clicking Select from Directory for Seller');
        cy.contains('[data-test="tca-add-parties-step"] div', /^Add saler$/)
          .filter(':visible').first().closest('.rounded-xl').contains('button', 'Select from Directory')
          .should('be.visible').click({ force: true });
        cy.log('Action completed: Seller Select from Directory clicked');
      } else {
        throw new Error(`Unexpected organization role: ${role}`);
      }
    });

  return this;
  }


  verifySelectFromConnectionsPopup() {
  cy.log('Verification: Verify Select from Connections popup');
  cy.get('[role="dialog"]:visible').should('be.visible')
    .within(() => {
      cy.contains('h3', 'Select from Connections').should('be.visible');
      cy.get('button').first().find('svg').should('be.visible');
      cy.get('[data-test="individuals"]').should('be.visible').and('contain.text', 'Individuals');
      cy.get('[data-test="organizations"]').should('be.visible').and('contain.text', 'Organizations');
      cy.get('[data-test="connections"]').should('be.visible').and('contain.text', 'Connections');
      cy.get('[data-test="employees"]').should('be.visible').and('contain.text', 'Employees');
      cy.get('[data-test="search-input"]').should('be.visible');
      cy.contains('button', 'Cancel').should('be.visible');
      cy.contains('button', 'Continue').should('be.visible').and('be.disabled');
    });
  cy.log('VERIFIED: Select from Connections popup, Close, Cancel and Continue buttons are displayed');
  return this;
  }

  closeSelectFromConnectionsPopup() {
  cy.log('Action: Close Select from Connections popup');
  cy.get('[role="dialog"]:visible').find('button').first().should('be.visible').click({ force: true });
  cy.get('[role="dialog"]:visible').should('not.exist');
  cy.log('VERIFIED: Select from Connections popup closed');

  return this;
}

selectIndivualConnection() {
  cy.log('Action: Get all connections and select the first connection');
  cy.get('[role="dialog"]:visible').should('be.visible').within(() => {
  cy.get('[data-test="connections"]').should('be.visible').click({ force: true });
  cy.get('[data-test="search-input"]').should('be.visible').clear();
  cy.get('.overflow-y-auto > div.flex.items-center.justify-between').filter(':visible')
        .should('have.length.at.least', 1).first().then(($connection) => {
          const connectionName = $connection.find('.font-medium').first().text().trim();
          expect(connectionName).not.to.be.empty;
  cy.wrap(connectionName).as('selectedIndividualConnectionName');
  cy.log(`First connection found: ${connectionName}`);
  cy.wrap($connection).click({ force: true });
  cy.wrap($connection).find('[role="checkbox"]').should('have.attr', 'aria-checked', 'true');
  cy.log(`VERIFIED: Connection "${connectionName}" selected`);
        });
    });
  cy.get('[role="dialog"]:visible').contains('button', 'Continue').should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Action completed: Continue clicked for Individual Connection');

  return this;
}

selectIndivualemployee() {
  cy.log('Action: Get all employees and select the first employee');
  cy.get('[role="dialog"]:visible').should('be.visible').within(() => {
  cy.get('[data-test="employees"]').should('be.visible').click({ force: true });
  cy.get('.overflow-y-auto > div.flex.items-center.justify-between').filter(':visible')
        .should('have.length.at.least', 1).first().then(($employee) => {
      const employeeName = $employee.find('.font-medium').first().text().trim();
      expect(employeeName).not.to.be.empty;
  cy.log(`First employee found: ${employeeName}`);
  cy.wrap($employee).click({ force: true });
  cy.wrap($employee).find('[role="checkbox"]').should('have.attr', 'aria-checked', 'true');
  cy.log(`VERIFIED: Employee "${employeeName}" selected`);
        });
    });

  cy.get('[role="dialog"]:visible').contains('button', 'Continue').should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Action completed: Continue clicked for Individual Employee');

  return this;
}

verifyParticipatingPartiesSection() {
  cy.log('Verification: Verify Participating Parties section');
  cy.get('[data-test="tca-parties-review-step"]').contains('div', 'Participating Parties').should('be.visible');
  cy.log('VERIFIED: Participating Parties section is displayed');

  return this;
}

verifyParticipatingPartiesColumns() {
  cy.log('Verification: Verify Participating Parties columns');
  cy.get('[data-test="tca-parties-review-step"]').contains('div', 'Participating Parties').closest('section')
    .find('table').within(() => {
  cy.contains('th', 'Party Type').should('be.visible');
  cy.contains('th', 'Name').should('be.visible');
  cy.contains('th', 'Email').should('be.visible');
  cy.contains('th', 'Role').should('be.visible');
    });

  cy.log('VERIFIED: Participating Parties columns are displayed');

  return this;
}

verifyParticipatingPartiesEditDeleteIcons() {
  cy.log('Verification: Verify Participating Parties Edit and Delete icons');
  cy.get('[data-test="tca-parties-review-step"]').find('button[aria-label="Edit participating parties"]').should('be.visible');
  cy.get('[data-test="tca-parties-review-step"]').find('button[aria-label="Delete participating parties"]').should('be.visible');
  cy.log('VERIFIED: Participating Parties Edit and Delete icons are displayed');

  return this;
}

verifyCCRecipientsSection() {
  cy.log('Verification: Verify CC recipients section');
  cy.get('[data-test="tca-parties-review-step"]').contains('div', 'CC recipients').should('be.visible');
  cy.log('VERIFIED: CC recipients section is displayed');

  return this;
}

verifyCCRecipientsColumns() {
  cy.log('Verification: Verify CC recipients columns');
  cy.get('[data-test="tca-parties-review-step"]')
    .contains('div', 'CC recipients').closest('section').find('table')
    .within(() => {
  cy.contains('th', 'Party Type').should('be.visible');
  cy.contains('th', 'Name').should('be.visible');
  cy.contains('th', 'Role (will always be CC only)').should('be.visible');
    });
  cy.log('VERIFIED: CC recipients columns are displayed');

  return this;
}

verifyCCRecipientsEditDeleteIcons() {
  cy.log('Verification: Verify CC recipients Edit and Delete icons');
  cy.get('[data-test="tca-parties-review-step"]').find('button[aria-label="Edit CC recipients"]').should('be.visible');
  cy.get('[data-test="tca-parties-review-step"]').find('button[aria-label="Delete CC recipients"]').should('be.visible');
  cy.log('VERIFIED: CC recipients Edit and Delete icons are displayed');

  return this;
}

verifySelectedConnectionInParticipatingParties() {
  cy.log('Verification: Verify selected connection is displayed in Participating Parties');
  cy.get('@selectedIndividualConnectionName').then((connectionName) => {
  cy.get('[data-test="tca-parties-review-step"]').contains('div', 'Participating Parties').closest('section')
      .find('tbody tr').filter(':visible').should('have.length.at.least', 1).then(($rows) => {
        const nameColumnIndex = 1;
        const names = [...$rows].map((row) =>Cypress.$(row).find('td').eq(nameColumnIndex).text().trim());
        expect(names).to.include(connectionName);
        cy.log( `VERIFIED: Selected connection "${connectionName}" is displayed in Name column`);
      });
  });

  return this;
}



verifyDocumentsSection() {
  cy.log('Verification: Verify Documents section is displayed');
  cy.contains('h3', 'Documents').should('be.visible');
  cy.log('VERIFIED: Documents section is displayed');

  return this;
}

verifyDocumentItems() {
  cy.log('Verification: Verify Document 1 and Document 2 are displayed');
  cy.get('[data-test="document-slot-document_1"]').should('be.visible').contains('Document 1').should('be.visible');
  cy.get('[data-test="document-slot-document_2"]').should('be.visible').contains('Document 2').should('be.visible');
  cy.log('VERIFIED: Document 1 and Document 2 are displayed');

  return this;
}

verifyDocumentButtons() {
  cy.log('Verification: Verify Document buttons');
  cy.get('[data-test="document-slot-document_1"]').should('be.visible').within(() => {
  cy.contains('button', 'Upload New').should('be.visible');
  cy.contains('button', 'Select from Template').should('be.visible');});
  cy.get('[data-test="document-slot-document_2"]').should('be.visible').within(() => {
  cy.contains('button', 'Upload New').should('be.visible');
  cy.contains('button', 'Select from Template').should('be.visible');});
  cy.log('VERIFIED: Upload New and Select from Template buttons are displayed for both documents');

  return this;
}

verifyFormSection() {
  cy.log('Verification: Verify Form section is displayed');
  cy.contains('h3', 'Form').should('be.visible');
  cy.log('VERIFIED: Form section is displayed');

  return this;
}

verifyQCForm() {
  cy.log('Verification: Verify QC Form is displayed');
  cy.get('[data-test="form-slot-qc_form"]').should('be.visible').contains('QC Form').should('be.visible');
  cy.log('VERIFIED: QC Form is displayed');

  return this;
}

verifyFormButtons() {
  cy.log('Verification: Verify QC Form buttons');
  cy.get('[data-test="form-slot-qc_form"]').should('be.visible').within(() => {
  cy.contains('button', 'Create Form').should('be.visible');
  cy.contains('button', 'Select from Template').should('be.visible');
  });
  cy.log('VERIFIED: Create Form and Select from Template buttons are displayed');

  return this;
}

clickUploadNew(documentNumber) {
  cy.log(`Action: Click Upload New for Document ${documentNumber}`);
  cy.get(`[data-test="document-slot-document_${documentNumber}"]`).should('be.visible').within(() => {
  cy.contains('button', 'Upload New').should('be.visible').click({ force: true });
    });

  cy.log(`Action completed: Upload New clicked for Document ${documentNumber}`);

  return this;
}

clickAddToRequest() {
  cy.log('Action: Locate Add to Request button');
  cy.contains('button', 'Add to Request').scrollIntoView().should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Action completed: Add to Request button clicked');

  return this;
}

selectPreviousIndividualParty() {
  cy.log('Action: Select previously selected individual party');
  cy.contains('span', 'Participant 1').closest('[draggable="true"]').within(() => {
  cy.get('input[role="combobox"]').first().should('be.visible').click({ force: true });
    });

  cy.get('@selectedIndividualConnectionName').then((connectionName) => {
  cy.log(`Action: Select individual party: ${connectionName}`);
  cy.get('[role="option"]').filter(':visible').contains(connectionName).should('be.visible').click({ force: true });
  cy.log(`VERIFIED: Previously selected individual "${connectionName}" selected as party`);
  });

  return this;
}

verifyConfiguredDocumentActions(documentNumber = 1) {
  cy.log(`Verification: Verify Document ${documentNumber} is configured`);
  cy.get(`[data-test="document-slot-document_${documentNumber}"]`).should('be.visible').within(() => {
  cy.contains('p', `Document ${documentNumber}`).should('be.visible');
  cy.contains('span', 'Configured').should('be.visible');
  cy.contains('button', 'Edit Details').should('be.visible');
  cy.contains('button', 'Remove').should('be.visible');
  cy.contains('button', 'Save as Template').should('be.visible');
    });

  cy.log('`VERIFIED: Document ${documentNumber} is Configured with Edit Details, Remove and Save as Template buttons`');

  return this;
}

verifyConfiguredFormActions() {
  cy.log('Verification: Verify QC Form is configured');
  cy.get('[data-test="form-slot-qc_form"]').should('be.visible')
    .within(() => {
  cy.contains('p', 'QC Form').should('be.visible');
  cy.contains('span', 'Configured').should('be.visible');
  cy.contains('button', 'Edit Details').should('be.visible');
  cy.contains('button', 'Remove').should('be.visible');
  cy.contains('button', 'Save as Template').should('be.visible');
    });

  cy.log('VERIFIED: QC Form is Configured with Edit Details, Remove and Save as Template buttons');

  return this;
}

selectYourOrganization() {
  cy.log('Action: Select Your Organization');
  cy.get('input[role="combobox"]').filter(':visible').first().should('be.visible').click({ force: true });
  cy.get('[role="option"]').filter(':visible').contains('Your Organization').should('be.visible').click({ force: true });
  cy.log('VERIFIED: Your Organization selected');

  return this;
}

verifyAuthorizedSignerButton() {
  cy.log('Verification: Verify Select an Authorized Signer button is displayed');
  cy.contains('button', 'Select an Authorized Signer').should('be.visible');
  cy.log('VERIFIED: Select an Authorized Signer button is displayed');

  return this;
}

clickAuthorizedSignerButton() {
  cy.log('Action: Click Select an Authorized Signer');
  cy.contains('button', 'Select an Authorized Signer').should('be.visible').click({ force: true });
  cy.log('Action completed: Select an Authorized Signer clicked');

  return this;
}

verifySelectSignerPopup() {
  cy.log('Verification: Verify Select Signer popup');
  cy.get('[role="dialog"]:visible').should('be.visible').within(() => {
  cy.contains('h3', 'Select Signer').should('be.visible');
  cy.get('input[placeholder="Search"]').should('be.visible');
  cy.contains('button', 'Cancel').should('be.visible');
  cy.contains('button', 'Confirm').should('be.visible');
    });
  cy.log('VERIFIED: Select Signer popup is displayed');

  return this;
}

verifySignerDetailsDisplayed() {
  cy.log('Verification: Verify authorized signer details');
  cy.get('[role="dialog"]:visible').should('be.visible').within(() => {
  cy.get('input[placeholder="Search"]').should('be.visible');
  cy.get('button').filter(':visible').should('have.length.at.least', 3);
  cy.get('button').filter(':visible').contains(/Confirm/).should('be.visible');
    });
  cy.log('VERIFIED: Authorized signer details and Confirm button are displayed');

  return this;
}

selectAuthorizedSigner() {
  cy.log('Action: Get and select first authorized signer');
  cy.get('[role="dialog"]:visible').find('[role="checkbox"]').filter(':visible')
    .first().closest('div.flex.items-center.justify-between')
    .then(($signerRow) => {
      const signerName = $signerRow.find('span.text-\\[\\#25282A\\]').first()
        .text().replace(/\s+/g, ' ').trim();
      expect(signerName, 'First authorized signer name').not.to.be.empty;
      cy.wrap(signerName).as('selectedSignerName');
      cy.log(`First authorized signer found: ${signerName}`);

      // Select first signer
      cy.wrap($signerRow).click({ force: true });
      // Verify right tick / selected state
      cy.wrap($signerRow).find('[role="checkbox"]').should('have.attr', 'aria-checked', 'true');
      cy.log(`VERIFIED: Authorized signer "${signerName}" selected`);
    });

  return this;
}


clickConfirmSigner() {
  cy.log('Action: Click Confirm');
  cy.get('[role="dialog"]:visible').contains('button', 'Confirm').should('be.visible').and('not.be.disabled').click({ force: true });
  cy.log('Action completed: Authorized signer confirmed');

  return this;
}

clickCreateForm() {
  cy.log('Action: Click Create Form button');
  cy.get('[data-test="form-slot-qc_form"]').should('be.visible').within(() => {
  cy.contains('button', 'Create Form').should('be.visible').click({ force: true });
    });
  cy.log('Action completed: Create Form button clicked');

  return this;
}

selectFirstParty() {
  cy.log('Action: Select the first available party');
  cy.get('input[role="combobox"]').filter(':visible').first().should('be.visible').click({ force: true });
  cy.get('[role="option"]').filter(':visible').should('have.length.at.least', 1).first().then(($option) => {
      const partyName = $option.text().replace(/\s+/g, ' ').trim();
      expect(partyName).not.to.be.empty;
  cy.log(`First party found: ${partyName}`);
  cy.wrap($option).click({ force: true });
  cy.log(`VERIFIED: Party "${partyName}" selected`);
    });

  return this;
}

clickUploadConfirm() {
    cy.log('**Action: Click "Upload" button to confirm file upload**');
    cy.contains('button', /^Upload\s*$/i, { timeout: 30000 }).filter(':visible').first().should('be.visible').should('not.be.disabled')
      .click({ force: true });
    cy.contains('Add Participants', { timeout: 30000 }).should('be.visible');
    cy.log('✔ Upload confirmed and Add Participants screen is visible');
    return this;
  }



}

export default new PactveraMainPage();