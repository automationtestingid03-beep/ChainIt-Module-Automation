import BasePage from '../BasePage';

class PactveraMainPage extends BasePage {

  get mainBreadcrumb() {
    return cy.get('nav[aria-label="breadcrumb"]').contains('a', 'Main').filter(':visible').first();
  }

  get mainHeading() {
    return cy.contains('h1', 'Get Started with Pactvera');
  }

  get createPactveraFromScratchOption() {
    return cy.get('[data-test="pactvera-entry-create-from-scratch"]');
  }

  get selectTemplateOption() {
    return cy.get('[data-test="pactvera-entry-select-template"]');
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

  get agreementNameInput() {
    return cy.get('[data-test="title-input"]');
  } 

   get pactveraDetailsHeading() {
    return cy.contains('h2', 'Pactvera Details');
  }

  get folderDropdown() {
  return cy.get('input[role="combobox"][id="Folder"]');
  }

  get cancelButtondisabled() {
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

  get partiesPageHeading() {
    return cy.contains('h1, h2, h3', 'Parties');
  }

  get defineParticipatingPartiesHeading() {
    return cy.contains('Define Participating Parties');
  }

  get pactveraWizardSidebar() {
    return cy.get('[data-test="pactvera-wizard-summary-sidebar"]');
  }

  get agreementSection() {
    return this.pactveraWizardSidebar.find('div.rounded-lg.border.border-dashed');
  }

  get agreementTitleValue() {
    return this.agreementSection.contains('p', 'Title').next('p');
  }

  get agreementFolderValue() {
    return this.agreementSection.contains('p', 'Folder').next('p');
  }

  get selectPartiesLabel() {
    return cy.contains('Select Parties');
  }

  get selectPartiesRequiredAsterisk() {
    return this.selectPartiesLabel.find('span.text-red-500, span[class*="red"]');
  }

  get selectFromConnectionsButton() {
    return cy.get('[data-test="button-select-from-connections"]');
  }

  get inviteButton() {
    return cy.get('[data-test="button-invite"]');
  }

  get participatingPartiesLabel() {
    return cy.contains('Participating Parties');
  }

  get participatingPartiesTable() {
    return cy.get('table');
  }

  get participatingPartiesTableHeaders() {
    return this.participatingPartiesTable.find('th');
  }

 get myOrganizationCheckbox() {
    return cy.get('label[for="isCreateDefaultParty"]').closest('.flex.gap-3').find('span[role="checkbox"]');
  }

  get corporateDocumentCheckbox() {
    return cy.get('label[for="isCorporateDocument"]').closest('.flex.gap-3').find('span[role="checkbox"]');
  }

  get recipientPaysCheckbox() {
    return cy.get('label[for="isRecipientPaidPactvera"]').closest('.flex.gap-3').find('span[role="checkbox"]');
  }


  get addCCRecipientsHeading() {
    return cy.contains('Add CC recipients');
  }

  get ccSelectFromDirectoryButton() {
    return cy.contains('button', 'Select from Directory');
  }

  get nextButton() {
    return cy.get('[data-test="button-pactvera-wizard-next"]');
  }

  get ccInviteButton() {
    return cy.contains('button', 'Invite').last();
  }


  get roleOptions() {
  return cy.get('[data-test^="tca-role-option-"]');
  }

  get addPartiesStep() {
    return cy.contains('Define Participating Parties').closest('div[class*="rounded"]').parent();
  }

  get selectPartiesSection() {
    return this.addPartiesStep.contains('span', 'Select Parties').closest('.flex.flex-col.gap-2');
  }

  get participatingPartiesSectionAgreement() {
    return this.addPartiesStep.contains('span', 'Participating Parties').closest('.flex.flex-col.gap-2');
  }

  get checkboxOptionsSection() {
    return cy.get('label[for="isCreateDefaultParty"]').closest('.flex.flex-col.gap-1').parent();
  }

  get addCcRecipientsSection() {
    return this.addPartiesStep.contains('div', 'Add CC recipients').closest('.rounded-xl');
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

  get configureButton() {
  return cy.contains('button', 'Configure');
  }

  get valueTransferPopup() {
    return cy.get('[data-test="add-value-transfer-modal"]');
  }

  get valueTransferPopupTitle() {
  return cy.get('[role="dialog"]').find('h3').contains('Add a value transfer');
  }

  get considerationField() {
    return cy.get('[data-test="label-input"]');
  }

  get considerationType() {
    return cy.contains('label', 'Consideration type').parent();
  }

  get currency() {
    return cy.contains('label', 'Currency').parent();
  }

  get productTransfer() {
    return cy.get('[data-test="product-transfer-party-selector"]');
  }

  get selectVDTField() {
  return cy.contains('label', 'Select VDT for value transfer').parent().find('[role="combobox"]');
  }

  get valueTransferContinueButton() {
  return cy.get('[data-test="add-value-transfer-modal"]').contains('button', 'Continue');
  }


  // ===== Send Payment section =====
  get nodeNameInput() {
    return cy.get('[data-test^="node-name-"]');
  }

  get nodeBudgetInput() {
    return cy.get('[data-test^="node-budget-"]');
  }

  get payerPartyDropdown() {
    return cy.get('[data-test^="payer-party-"]');
  }

  get payerAmountInput() {
    return cy.get('[data-test^="payer-amount-"]');
  }

  get payerPercentText() {
    return cy.get('[data-test^="payer-pct-"]');
  }

  get addPayersButton() {
    return cy.get('[data-test^="payer-add-"]');
  }

  // ===== Who Receives Payment section =====
  get netAvailableToPayees() {
    return cy.get('[data-test="net-available-to-payees"]');
  }

  get payeePartyDropdown() {
    return cy.get('[id^="Payout method"]');
  }

  get payeeAmountInput() {
    return cy.get('[data-test^="payee-amount-"]');
  }

  get payeePercentText() {
    return cy.get('[data-test^="payee-percent-"]');
  }

  get payoutMethodDropdown() {
    return cy.get('#Payout\\ method');
  }

  get destinationAccountDropdown() {
    return cy.get('#Destination\\ account');
  }

  get payoutMethodSelectedValue() {
  return cy.get('#Payout\\ method').closest('[class*="-control"]') .find('[class*="-singleValue"]');
  }

  get destinationAccountSelectedValue() {
  return cy.get('#Destination\\ account').closest('[class*="-control"]').find('[class*="-singleValue"]');
  }

  get addBankAccountLink() {
    return cy.get('[data-test="payee-add-bank-account"]');
  }

  get remainingAllocationText() {
    return cy.get('[data-test="remaining-allocation"]');
  } 

  // ===== Select Billing Address section =====
  get billingAddressSectionHeading() {
    return cy.contains('h2', 'Select billing address');
  }

  get billingAddressRefreshButton() {
    return cy.get('[data-test="button-refresh"]');
  }

  get billingAddressOptions() {
    return cy.get('input[name^="billing-address-selection-"]');
  }

  get billingAddressLabelByText() {
    // usage: billingAddressLabelByText(text) — pass a substring of the address
    return (text) => cy.contains('label', text);
  }

  get addNewBillingLocationLink() {
    return cy.contains('button', "I don't want to use a given address / Add new location");
  }

  get billingAddressRefreshButton() {
  return cy.get('[data-test="button-refresh"]');
  }

  // ===== Set Release Conditions section =====
  get releaseConditionsHeading() {
    return cy.contains('h2', 'Set release conditions');
  }

  get alwaysRequiredSection() {
    return cy.get('[data-test="always-required-section"]');
  }

  get valueRecordedCommittedRule() {
    return cy.get('[data-test="always-required-rule-value-recorded-committed"]');
  }

  get obligationsFinalStateRule() {
    return cy.get('[data-test="always-required-rule-obligations-final-state"]');
  }

  get productRecordedCommittedRule() {
    return cy.get('[data-test="always-required-rule-product-recorded-committed"]');
  }

  get manualConfirmationSection() {
    return cy.get('[data-test^="manual-confirmation-section-"]');
  }

  get confirmationPartyDropdown() {
    return cy.get('[data-test^="confirmation-party-dropdown-"]');
  }

  get confirmationPartyInput() {
    return cy.get('#Confirmation\\ party');
  }

  // ===== Transaction summary sidebar - Parties section =====
  get sidebarPartiesSection() {
    return cy.get('[data-test="pactvera-wizard-summary-sidebar"]')
      .contains('p', 'Parties')
      .parent();
  }

  get sidebarPartyNames() {
    return cy.get('[data-test="pactvera-wizard-summary-sidebar"]')
      .contains('p', 'Parties')
      .parent()
      .find('ul li');
  }

  // ===== Actions / Verifications =====
  getSidebarPartyNames() {
    cy.log('Action: Get party names from transaction summary sidebar');
    return this.sidebarPartyNames.then(($parties) => {
      const parties = [...$parties].map((el) => {
        const name = el.querySelector('p.truncate')?.textContent.trim();
        const role = el.querySelector('p.text-xs')?.textContent.trim();
        return { name, role };
      });
      cy.log(`Sidebar parties: ${JSON.stringify(parties)}`);
      return cy.wrap(parties).as('sidebarParties');
    });
  }

  get releaseAuthorityHeading() {
  return cy.contains('h2, p', 'Set release authority');
  }

  get releaseAuthorityProvidingText() {
    return cy.contains('p', 'is providing');
  }

  get authorizedSignerCard() {
    return cy.get('[data-test^="release-authority-signer-"]');
  }

  get authorizedSignerName() {
    return this.authorizedSignerCard.find('p').first();
  }

  get authorizedSignerRole() {
    return this.authorizedSignerCard.contains('p', 'releaser');
  }

  get authorizedSignerEmail() {
    return this.authorizedSignerCard.find('p').last();
  }

  get authorizedSignerCheckIcon() {
    return this.authorizedSignerCard.find('svg, [data-test="signer-selected-check"]');
  }

  get authorityVerifiedBanner() {
   return cy.contains('Authority Verified');
  }

  get authorityVerifiedExpandIcon() {
    return this.authorityVerifiedBanner.parents('div').find('svg').last();
  }

  get releaseAuthorityEditIcon() {
   return cy.contains('Edit');
  }

  // ===== Review Page - Section headings =====
  get reviewHeading() {
    return cy.contains('h2, p', 'Review').first();
  }

  get overviewSection() {
    return cy.contains('p', 'Overview').parents('.rounded-xl.border.border-gray-200.bg-white').first();
  }

  get participatingPartiesSection() {
    return cy.contains('p', 'Participating Parties (Roles)').parents('.rounded-xl.border.border-gray-200.bg-white').first();
  }

  get documentsAndFormsSection() {
    return cy.contains('p', 'Documents and Forms').parents('.rounded-xl.border.border-gray-200.bg-white').first();
  }

  get valueTransfersSection() {
    return cy.get('[data-test="review-value-transfer-card"]');
  }

  get valueTransferEditButton() {
    return cy.get('[data-test="review-vt-edit"]');
 }

  get valueTransferPayeesList() {
    return cy.get('[data-test="review-payees-list"]');
 }

  get valueTransferTCAPayersSection() {
    return cy.get('[data-test="review-tca-payers"]');
  }

  get releaseAuthoritySection() {
    return cy.contains('p', 'Release Authority').parents('.rounded-xl.border.border-gray-200.bg-white').first();
  }

  get releaseConditionsSection() {
    return cy.contains('p', 'Release conditions').parents('.rounded-xl.border.border-gray-200.bg-white').first();
  }

  // ===== Overview fields =====
  get overviewTitle() {
    return this.overviewSection.contains('Title').next();
  }

  get overviewFolder() {
    return this.overviewSection.contains('Folder').next();
  }

  get overviewTransactionType() {
    return this.overviewSection.contains('Transaction type').next();
  }

  // ===== Footer buttons =====
  get cancelButton() {
    return cy.contains('button', 'Cancel');
  }

  get saveAsDraftButtonFooter() {
    return cy.contains('button', 'Save as Draft');
  }

  get sendButton() {
    return cy.contains('button', 'Send');
  } 

  // ===== Agreement Sent - Success screen =====
  get agreementSentContainer() {
    return cy.contains('h2', 'Agreement sent').parents('div').eq(1);
  }

  get agreementSentCheckIcon() {
    return cy.get('.rounded-full.bg-\\[\\#E8F5DF\\] svg');
  }

  get agreementSentHeading() {
    return cy.get('h2').contains('Agreement sent');
  }

  get agreementSentDescription() {
    return cy.contains('p', 'Invitations have been sent to all parties');
  }

  get viewAgreementButton() {
    return cy.contains('button', 'View agreement');
  }

  get createAnotherButton() {
    return cy.contains('button', 'Create another');
  }

  // LOCATORS - Validation Error Toast

  get attachDocumentsErrorToast() {
    return cy.contains('Please attach documents or forms').parents('div').eq(1);
  }

  get attachDocumentsErrorHeading() {
    return cy.contains('Please attach documents or forms');
  }

  get attachDocumentsErrorMessage() {
    return cy.contains('Please configure at least one document or form before sending the request.');
  }

  get attachDocumentsErrorCloseIcon() {
    return this.attachDocumentsErrorToast.find('svg, button').last();
  }

  get documentsStepLink() {
    return cy.contains('Documents');
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
   cy.log('Action: Check and scroll if Continue button is not visible');
   cy.get('body').then(() => {
   cy.contains('button', 'Continue').then(($btn) => {
      if (!Cypress.dom.isVisible($btn)) {
        cy.log('Continue button not visible - scrolling page');
        cy.scrollTo('bottom', { ensureScrollable: false });
      } else {
   cy.log('Continue button already visible - no scroll needed');
      }
    });
  });
  cy.log('Action: Click Continue button');
  this.continueButton.should('exist');
  this.continueButton.scrollIntoView({ ensureScrollable: false });
  this.continueButton.should('be.visible').and('not.be.disabled').click({ force: true });
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

  verifyAllFourStepsDisplayed() {
    cy.log('Action: Verify all 4 Pactvera workflow steps are displayed');
    this.step1.should('be.visible').and('contain.text', 'Pactvera Details');
    this.step2.should('be.visible').and('contain.text', 'Parties');
    this.step3.should('be.visible').and('contain.text', 'Documents');
    this.step4.should('be.visible').and('contain.text', 'Review');
    cy.log('VERIFIED: All 4 workflow steps are displayed');

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

  enterUniqueAgreementName() {
    const agreementName = `Automation PT-${Math.random().toString(36).substring(2, 5)}`;
    cy.log(`Action: Enter agreement name: ${agreementName}`);
    this.agreementNameInput.should('be.visible').clear().type(agreementName);
    cy.wrap(agreementName).as('agreementName');
    cy.log('VERIFIED: Unique agreement name entered');

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

verifyAgreementTypeStep() {
  cy.log('Action: Verify Pactvera Details page is displayed');
  this.pactveraDetailsHeading.should('be.visible');
  cy.contains("You're creating a Pactvera Agreement").should('be.visible');
  cy.contains('Name your agreement').should('be.visible');

  cy.log('VERIFIED: Pactvera Details page is displayed');

  return this;
 } 

verifyActionButtonsDisabled() {
  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  this.cancelButtondisabled.scrollIntoView().should('be.visible').and('be.disabled');
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
    this.transactionTypeOptions.filter(':visible').contains(transactionType, { timeout: 30000 }).should('be.visible').click({ force: true });
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

verifyStep4Completed() {
  cy.log('Verification: Verify Step 4 - Documents & Forms is completed');
  cy.get('[data-test="pactvera-wizard-step-4"]').should('be.visible').find('svg').should('exist');
  cy.log('VERIFIED: Step 4 - Documents & Forms is completed');


  return this;
}

verifyStep5Completed() {
  cy.log('Verification: Verify Step 5 - Value Transfer is completed');
  cy.get('[data-test="pactvera-wizard-step-5"]').should('be.visible').find('svg').should('exist');
  cy.log('VERIFIED: Step 5 - Value Transfer is completed');

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

  verifyPartiesPageHeading() {
    cy.log('Verification: Verify Parties page header');
    cy.contains('h1, h2, h3', 'Parties').should('be.visible');
    cy.log('VERIFIED: Parties page header is displayed');

    return this;
  }

  verifyAgreementSection() {
    cy.log('Verification: Verify Agreement section');
    this.pactveraWizardSidebar.should('be.visible');
    this.pactveraWizardSidebar.should('contain.text', 'Agreement');
    this.agreementSection.should('be.visible');
    this.agreementSection.should('contain.text', 'Title');
    this.agreementSection.should('contain.text', 'Folder');
    cy.log('VERIFIED: Agreement section with Title and Folder is displayed');

    return this;
  }

  verifySelectPartiesSection() {
    cy.log('Verification: Verify Select Parties section');
    this.selectPartiesSection.should('be.visible');
    this.selectPartiesSection.should('contain.text', 'Select Parties');
    this.selectPartiesSection.contains('button', 'Select from Connections').should('be.visible');
    this.selectPartiesSection.contains('button', 'Invite').should('be.visible');
    cy.log('VERIFIED: Select Parties section and both buttons are displayed');

    return this;
  }

  verifyParticipatingPartiesAgreementSection() {
    cy.log('Verification: Verify Participating Parties table section');
    this.participatingPartiesSectionAgreement.should('be.visible');
    this.participatingPartiesSectionAgreement.should('contain.text', 'Participating Parties');
    this.participatingPartiesSectionAgreement.should('contain.text', 'Party Type');
    this.participatingPartiesSectionAgreement.should('contain.text', 'Name');
    this.participatingPartiesSectionAgreement.should('contain.text', 'Role');
    cy.log('VERIFIED: Participating Parties table with columns and empty state are displayed');

    return this;
  }

  verifyAddCcRecipientsAgreementSection() {
    cy.log('Verification: Verify Add CC recipients section');
    this.addCcRecipientsSection.should('be.visible');
    this.addCcRecipientsSection.should('contain.text', 'Add CC recipients');
    this.addCcRecipientsSection.should('contain.text', 'Should anyone else be kept in the loop?');
    this.addCcRecipientsSection.contains('button', 'Select from Directory').should('be.visible');
    this.addCcRecipientsSection.contains('button', 'Invite').should('be.visible');
    cy.log('VERIFIED: Add CC recipients section and both buttons are displayed');

    return this;
  }

  verifyAllPartiesPageElements() {
    cy.log('Verification: Verify all elements on Define Participating Parties page');
    this.verifyPartiesPageHeading();
    this.verifyAgreementSection();
    this.verifySelectPartiesSection();
    this.verifyParticipatingPartiesAgreementSection();
    this.verifyCheckboxOptionsSection();
    this.verifyAddCcRecipientsAgreementSection();
    cy.log('VERIFIED: All elements on Define Participating Parties page are displayed');

    return this;
  }

  verifyCheckboxOptionsSection() {
    cy.log('Verification: Verify checkbox options section');
    this.checkboxOptionsSection.should('be.visible');
    this.checkboxOptionsSection.should('contain.text', 'My organization is a party in this agreement');
    this.checkboxOptionsSection.should('contain.text', 'Mark as a corporate document');
    this.checkboxOptionsSection.should('contain.text', 'Recipient pays for non-ChainIT costs');
    cy.log('VERIFIED: All three checkbox options are displayed');

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
  cy.get('[role="dialog"]:visible').find('.overflow-y-auto > div.flex.items-center.justify-between').filter(':visible')
    .first().then(($signerRow) => {
      const signerName = $signerRow.find('span.text-\\[\\#25282A\\]').first()
        .text().replace(/\s+/g, ' ').trim();
      expect(signerName, 'First authorized signer name').not.to.be.empty;
      cy.wrap(signerName).as('selectedSignerName');
      cy.log(`First authorized signer found: ${signerName}`);

      // Select first signer
      cy.wrap($signerRow).click({ force: true });
      // Verify right tick / selected state
      cy.wrap($signerRow).should('have.class', 'border-secondgreen').and('have.class', 'bg-primary-50');
      cy.get('[role="dialog"]:visible').find('[data-test="select-from-template-confirm-button"]').should('be.visible')
        .and('not.be.disabled');
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
  // cy.log('Action: Select the first available party');
  // cy.get('input[role="combobox"]').filter(':visible').first().should('be.visible').click({ force: true });
  // cy.get('[role="option"]').filter(':visible').should('have.length.at.least', 1).first().then(($option) => {
  //     const partyName = $option.text().replace(/\s+/g, ' ').trim();
  //     expect(partyName).not.to.be.empty;
  // cy.log(`First party found: ${partyName}`);
  // cy.wrap($option).click({ force: true });
  // cy.log(`VERIFIED: Party "${partyName}" selected`);
  //   });
  cy.log('Action: Select party - prefer "Your Organization" if available');
  cy.get('input[role="combobox"]').filter(':visible').first().should('be.visible').click({ force: true });

  cy.get('[role="option"]').filter(':visible').should('have.length.at.least', 1).then(($options) => {
    const optionTexts = [...$options].map((el) => el.textContent.replace(/\s+/g, ' ').trim());
    cy.log(`Available party options: ${optionTexts.join(', ')}`);

    const yourOrgIndex = optionTexts.findIndex((text) => text.includes('Your Organization'));

    if (yourOrgIndex !== -1) {
      const partyName = optionTexts[yourOrgIndex];
      cy.log(`"Your Organization" option found - selecting: ${partyName}`);
      cy.wrap($options[yourOrgIndex]).click({ force: true });
      cy.log(`VERIFIED: Party "${partyName}" selected`);
    } else {
      const partyName = optionTexts[0];
      cy.log(`"Your Organization" not found - selecting first party: ${partyName}`);
      cy.wrap($options[0]).click({ force: true });
      cy.log(`VERIFIED: Party "${partyName}" selected`);
    }
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

  dragBasicFieldToForm(fieldKey = 'textfield') {
  cy.log(`Action: Drag Basic field: ${fieldKey}`);

  const fieldSelector =
    `#group-basic [data-group="basic"][data-key="${fieldKey}"]:not(.gu-mirror)`;

  cy.get('iframe[title="Form Builder"]', { timeout: 30000 })
    .should('be.visible')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .find(fieldSelector)
    .should('be.visible')
    .then(($field) => {
      const fieldEl = $field[0];
      const dropEl = $field[0].ownerDocument.querySelector(
        '.builder-components.drag-container.formio-builder-form'
      );

      expect(dropEl, 'Form Builder drop zone').to.exist;

      const fieldRect = fieldEl.getBoundingClientRect();
      const dropRect = dropEl.getBoundingClientRect();
      const startX = fieldRect.left + fieldRect.width / 2;
      const startY = fieldRect.top + fieldRect.height / 2;
      const endX = dropRect.left + dropRect.width / 2;
      const endY = dropRect.top + 100;

      cy.wrap(fieldEl).trigger('mousedown', {
        button: 0,
        buttons: 1,
        clientX: startX,
        clientY: startY,
        force: true
      });

      const steps = 10;
      for (let step = 1; step <= steps; step += 1) {
        cy.wrap(fieldEl.ownerDocument).trigger('mousemove', {
          button: 0,
          buttons: 1,
          clientX: startX + ((endX - startX) * step) / steps,
          clientY: startY + ((endY - startY) * step) / steps,
          force: true
        });
      }

      cy.wrap(dropEl).trigger('mousemove', {
        button: 0,
        buttons: 1,
        clientX: endX,
        clientY: endY,
        force: true
      });

      cy.wrap(fieldEl.ownerDocument).trigger('mouseup', {
        button: 0,
        buttons: 0,
        clientX: endX,
        clientY: endY,
        force: true
      });
    });

  cy.get('iframe[title="Form Builder"]', { timeout: 30000 })
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .find(`.formio-component-${fieldKey}`, { timeout: 15000 })
    .should('be.visible');
  cy.log(`VERIFIED: "${fieldKey}" added to Form Builder`);
  return this;
  }


  verifyConfigureButtonDisplayed() {
  cy.log('Action: Verify Configure button is displayed');
  this.configureButton.should('be.visible').and('contain.text', 'Configure');
  cy.log('VERIFIED: Configure button is displayed');

  return this;
  }

  clickConfigureButton() {
  cy.log('Action: Click Configure button');
  this.configureButton.scrollIntoView().should('be.visible').and('not.be.disabled').click();
  cy.log('Configure button clicked successfully');
  
  return this;
  }

  verifyValueTransferPopupDisplayed() {
  cy.log('Action: Verify Add a value transfer popup is displayed');
  this.valueTransferPopup.should('be.visible');
  this.valueTransferPopupTitle.should('be.visible').and('contain.text', 'Add a value transfer');
  cy.log('VERIFIED: Add a value transfer popup is displayed');

  return this;
  }

  verifyConsiderationFieldDisplayed() {
  cy.log('Action: Verify Consideration field is displayed');
  this.considerationField.should('be.visible');
  cy.log('VERIFIED: Consideration field is displayed');

  return this;
  }

  verifyConsiderationFieldValue() {
  cy.log('Action: Verify Consideration field value');
  this.considerationField.should('have.value', 'Value Transfer').and('be.disabled');
  cy.log('VERIFIED: Consideration field is auto-populated with Value Transfer');

  return this;
  }

  verifyConsiderationTypeDisplayed() {
  cy.log('Action: Verify Consideration type is displayed');
  this.considerationType.should('be.visible').and('contain.text', 'Product');
  cy.log('VERIFIED: Consideration type is displayed with Product value');

  return this;
  }

  verifyCurrencyDisplayed() {
  cy.log('Action: Verify Currency is displayed');
  this.currency.should('be.visible').and('contain.text', 'USD');
  cy.log('VERIFIED: Currency is displayed with USD value');
  
  return this;
  }

  verifyConsiderationTypeDropdown() {
  cy.log('Action: Verify Consideration type dropdown');
  this.considerationType.scrollIntoView().should('be.visible').and('contain.text', 'Product');
  cy.log('VERIFIED: Consideration type dropdown contains Product');
  return this;
  }

  selectNewlyCreatedProduct() {
  cy.log('Action: Select newly created product from Select VDT dropdown');
  cy.get('@newProductName').then((newProductName) => {
  cy.log(`Newly created product: ${newProductName}`);
  this.selectVDTField.scrollIntoView().should('be.visible').click();
  cy.contains(newProductName).should('be.visible').click();
  cy.log(`VERIFIED: Newly created product "${newProductName}" selected successfully`);
  });
  return this;
 }

 selectFirstVDTProduct() {
  cy.log('Action: Select first product from Select VDT dropdown');
  this.selectVDTField.scrollIntoView().should('be.visible').click();
  // Select first available VDT option
  // this.selectVDTField.should('have.attr', 'aria-expanded', 'true');
  // cy.get('[role="option"]', { timeout: 20000 }).should('exist').filter(':visible').first().should('be.visible').click({ force: true });
  // cy.log('VERIFIED: First product VDT option selected successfully');
  cy.get('body').then(($body) => {
  const options = $body.find('[role="option"]:visible');
    if (options.length > 0) {
      cy.log(`Found ${options.length} VDT option(s) - selecting first one`);
      cy.get('[role="option"]', { timeout: 20000 }).filter(':visible').first().should('be.visible').click({ force: true });
      cy.log('VERIFIED: First product VDT option selected successfully');
    } else {
      cy.log('No VDT options available - clicking "+ Create new Product VDT"');
      cy.contains('+ Create new Product VDT', { timeout: 10000 }).should('be.visible').click({ force: true });
      cy.log('ACTION REQUIRED: Scan QR code on mobile device to create Product VDT manually');
      cy.log('Test paused - complete the mobile scan, then resume the test runner manually');
      cy.pause();
      cy.log('Resumed after manual VDT creation via mobile scan');
    }
  });
  
  return this;
 }

 clickValueTransferContinueButton() {
  cy.log('Action: Click Value Transfer Continue button');
  this.valueTransferContinueButton.should('exist').scrollIntoView().should('be.visible').and('not.be.disabled').click();
  cy.log('Value Transfer Continue button clicked successfully');

  return this;
 }


 validateValueTransferDetails() {
  cy.log('Action: Validate Value Transfer details');
  cy.get('[data-test="value-transfer-card"]').should('exist').within(() => {
  // Value Transfer title
  cy.contains('Value Transfer').should('be.visible');
  // Product Owner
  cy.contains('p', 'Product owner').should('be.visible').parent().find('div.rounded-lg')
    .should('be.visible').invoke('text').should('not.be.empty');
  // Product Recipient
  cy.contains('p', 'Product recipient').should('be.visible').parent().find('div.rounded-lg')
      .should('be.visible').invoke('text').should('not.be.empty');
  // Currency
  cy.contains('p', 'Currency').should('be.visible').parent().find('div.rounded-lg')
      .should('be.visible').invoke('text').should('not.be.empty');
  // Payment Required
  cy.contains('p', 'Payment required').should('be.visible').parent().find('div.rounded-lg')
      .should('be.visible').invoke('text').should('not.be.empty');
  // Consideration Type
  cy.contains('p', 'Consideration type').should('be.visible').parent().find('div.rounded-lg')
      .should('be.visible').invoke('text').should('not.be.empty');
  // Edit icon
  cy.get('[data-test="vt-card-edit"]').should('be.visible');
  // Delete icon
  cy.get('[data-test="vt-card-delete"]').should('be.visible');
    });

  cy.log('Value Transfer details validated successfully');
  return this;
 }

 enterValueTransferAmount(value) {
  cy.log(`Action: Enter Value Transfer amount: ${value}`);
  cy.get('[data-test="amount-input"]').should('exist').scrollIntoView().should('be.visible').clear().type(value.toString());
  cy.get('[data-test="amount-input"]').should('have.value', value.toString());
  cy.log(`Value Transfer amount entered: ${value}`);

  return this;
 }

 validateValueTransferAllocation(value) {
   const formattedValue = Number(value).toFixed(2);
   cy.log(`Action: Validate payment allocation: ${formattedValue} USD`);
   cy.get('[data-test="node-allocation-progress"]').should('be.visible').within(() => {
   cy.contains('Allocated to nodes').should('be.visible').and('contain.text', `Allocated to nodes ${formattedValue} of ${formattedValue} USD`);
   cy.contains('Fully allocated').should('be.visible');
      });
   cy.log(`Payment allocation verified: Allocated to nodes ${formattedValue} of ${formattedValue} USD - Fully allocated`);

   return this;
  } 


  // ===== Actions / Verifications =====
  verifySendPaymentFieldsFilled() {
    this.nodeNameInput.should('have.value', 'Send Payment').and('not.have.value', '');
    this.nodeBudgetInput.should('not.have.value', '');
    this.payerPartyDropdown.should('not.have.value', '');
    this.payerAmountInput.should('not.have.value', '');
  }

  verifyReceivePaymentFieldsFilled() {
    this.payeeAmountInput.should('not.have.value', '');
    this.payoutMethodSelectedValue.invoke('text').should('not.be.empty');
    this.destinationAccountSelectedValue.invoke('text').should('not.be.empty');
  }

  verifyFullyAllocated() {
    this.remainingAllocationText.should('contain.text', 'Fully allocated');
  }

  openPayoutMethodDropdown() {
    this.payoutMethodDropdown.click();
  }

  verifyPayoutMethodOptionsVisible() {
    cy.contains('ACH (Recommended)').should('be.visible');
    cy.contains('RTP (Please check if your bank supports this method)').should('be.visible');
    cy.contains('Wire (Please check if your bank supports this method)').should('be.visible');
  }

  selectPayoutMethod(method) {
    cy.contains(method).click();
  }

  verifyPayoutMethodSelected(method) {
    cy.get('.css-1dimb5e-singleValue').contains(method).should('be.visible');
  } 

  verifyBillingAddressSectionDisplayed() {
    this.billingAddressSectionHeading.should('be.visible');
    cy.contains('p', 'Select a billing location or add a new one.').should('be.visible');
    this.billingAddressOptions.should('have.length.greaterThan', 0);
  }

  selectBillingAddressByText(addressText) {
    this.billingAddressLabelByText(addressText).find('input[type="radio"]').check({ force: true });
  }

  selectFirstBillingAddress() {
    this.billingAddressOptions.first().check({ force: true });
  }

  verifyBillingAddressSelected(addressText) {
    this.billingAddressLabelByText(addressText).find('input[type="radio"]').should('be.checked');
  } 

  clickBillingAddressRefresh() {
  this.billingAddressRefreshButton.click();
  }

  verifyBillingAddressRefreshButtonVisible() {
    this.billingAddressRefreshButton.should('be.visible').and('contain.text', 'Refresh');
  }
      
  // ===== Actions / Verifications =====
  verifyAlwaysRequiredSectionDisplayed() {
    cy.log('Verify: Always required 3 platform-enforced section displayed');
    this.alwaysRequiredSection.should('be.visible').and('contain.text', 'Always required').and('contain.text', '3 platform-enforced');
    this.valueRecordedCommittedRule.should('be.visible').and('contain.text', 'Value recorded and committed');
    this.obligationsFinalStateRule.should('be.visible').and('contain.text', 'All obligations in final state');
    this.productRecordedCommittedRule.should('be.visible').and('contain.text', 'Product recorded and committed to value transfer');
  }

  verifyManualConfirmationSectionDisplayed() {
    cy.log('Verify: Manual confirmation section displayed');
    this.manualConfirmationSection.should('be.visible').and('contain.text', 'Manual confirmation').and('contain.text', 'Condition: Manual Confirmation');
    this.confirmationPartyDropdown.should('be.visible');
  }

  selectConfirmationParty(partyName) {
    cy.log(`Action: Select confirmation party - ${partyName}`);
    this.confirmationPartyDropdown.click();
    cy.contains('[id^="react-select"]', partyName).click();
  }

  verifyConfirmationPartySelected(partyName) {
    this.confirmationPartyDropdown.find('[class*="-singleValue"]').should('contain.text', partyName);
  }

  verifySidebarPartyWithRole(partyName, role) {
  cy.log(`Verify: Party "${partyName}" with role "${role}" displayed in sidebar`);
  this.sidebarPartiesSection.contains('li', partyName).should('contain.text', role);
  } 

  verifyReleaseAuthorityCardDisplayed(signerName) {
  cy.log(`Verify: Release authority card displayed for ${signerName}`);
  cy.get('[data-test^="releaser-option-"]').contains('p', signerName).should('be.visible');
  }

  verifyAuthorizedSignerSelected(signerName) {
    cy.log(`Verify: ${signerName} is shown as selected`);
    cy.get('[data-test^="releaser-option-"]').contains('p', signerName).parents('[data-test^="releaser-option-"]').should('have.class', 'border-primary'); 
  }

  selectAuthorizedSignerRelease(signerName) {
    cy.log(`Action: Select authorized signer - ${signerName}`);
    cy.get('[data-test^="releaser-option-"]').contains('p', signerName).parents('[data-test^="releaser-option-"]').click();
  }

  verifyAndSelectAuthorizedSigner(signerName) {
    cy.log(`Verify: Signer card for ${signerName} exists before selecting`);
    this.verifyReleaseAuthorityCardDisplayed(signerName);
    cy.log(`Action: Select ${signerName} as authorized signer`);
    this.selectAuthorizedSignerRelease(signerName);
    cy.log(`Verify: ${signerName} is now selected`);
    this.verifyAuthorizedSignerSelected(signerName);
  }

  verifyEditIconDisplayed() {
    cy.log('Verify: Edit icon/link is displayed next to signer');
    this.releaseAuthorityEditIcon.should('be.visible');
  }

  verifyAuthorityVerifiedDisplayed() {
  cy.log('Verify: Authority Verified banner is displayed');
  this.authorityVerifiedBanner.should('be.visible');
}

  verifyOverviewSectionNotEmpty() {
    cy.log('Verify: Overview section displayed and not empty');
    this.overviewSection.should('be.visible');
    this.overviewSection.contains('p','Title').parent().invoke('text').should('not.be.empty');
    this.overviewSection.contains('p','Folder').parent().invoke('text').should('not.be.empty');
    this.overviewSection.contains('p','Transaction type').parent().invoke('text').should('not.be.empty');
  }



  verifyParticipatingPartiesNotEmpty() {
    cy.log('Verify: Participating Parties (Roles) table displayed and not empty');
    this.participatingPartiesSection.should('be.visible');
    const expectedHeaders = ['Party Type', 'Name', 'Email', 'Role'];
    this.participatingPartiesSection.find('table thead th').then(($headers) => {
    const actualHeaders = [...$headers].map(h => h.textContent.trim());
    cy.log(`Table headers: ${actualHeaders.join(', ')}`);
    expect(actualHeaders).to.deep.equal(expectedHeaders);
  });

    this.participatingPartiesSection.find('table tbody tr').should('have.length.greaterThan', 0)
    .each(($row, index) => {
    cy.wrap($row).find('td').should('have.length', 4).each(($cell, cellIndex) => {
    const cellText = $cell.text().trim();
    cy.log(`Row ${index + 1}, Column ${cellIndex + 1} (${expectedHeaders[cellIndex]}): "${cellText}"`);
    // 1. Not empty check
    expect(cellText, `Row ${index + 1}, ${expectedHeaders[cellIndex]} should not be empty`).to.not.be.empty;
    // 2. Column-specific content validation
        switch (cellIndex) {
          case 0: // Party Type
            expect(cellText, `Row ${index + 1}, Party Type should be Individual or Organization`).to.be.oneOf(['Individual', 'Organization']);
            break;
          case 1: // Name
            expect(cellText, `Row ${index + 1}, Name should not look like an email`).to.not.match(/@/);
            break;
          case 2: // Email
            expect(cellText, `Row ${index + 1}, Email should be a valid email format`).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            break;
          case 3: // Role
            expect(cellText, `Row ${index + 1}, Role should not look like an email`).to.not.match(/@/);
            break;
        }
      });
    });

  cy.log('VERIFIED: All rows and columns in Participating Parties table are non-empty');
}

  verifyDocumentsAndFormsNotEmpty() {
    cy.log('Verify: Documents and Forms table displayed and not empty');
    this.documentsAndFormsSection.should('be.visible');
    this.documentsAndFormsSection.find('table tbody tr, [role="row"]').should('have.length.greaterThan', 0);
  }

  verifyValueTransfersNotEmpty() {
    cy.log('Verify: Value Transfers Information & Payments displayed and not empty');
    this.valueTransfersSection.should('be.visible');
    this.valueTransfersSection.should('contain.text', 'Value Transfer');
    this.valueTransfersSection.should('contain.text', 'Consideration type');
    this.valueTransfersSection.should('contain.text', 'Product owner');
    this.valueTransfersSection.should('contain.text', 'Product recipient');
    this.valueTransfersSection.should('contain.text', 'Payers');
    this.valueTransfersSection.should('contain.text', 'Amount');
    this.valueTransferEditButton.should('be.visible');

  cy.log('Verify: Payees list is not empty');
  this.valueTransferPayeesList.find('[data-test^="review-payee-"]')
    .should('have.length.greaterThan', 0);

  cy.log('Verify: Collection payers section is not empty');
  this.valueTransferTCAPayersSection.find('[data-test^="review-tca-payer-"]')
    .should('have.length.greaterThan', 0);
  }

  verifyReleaseAuthorityNotEmpty() {
    cy.log('Verify: Release Authority section displayed and not empty');
    this.releaseAuthoritySection.should('be.visible');
    this.releaseAuthoritySection.should('contain.text', 'TCA Releaser');
    this.releaseAuthoritySection.should('contain.text', 'Release authority — transfers');
    this.releaseAuthoritySection.should('contain.text', 'Applies to');
    this.releaseAuthoritySection.should('contain.text', 'Value Transfer');
  }

  verifyReleaseConditionsNotEmpty() {
    cy.log('Verify: Release conditions section displayed and not empty');
    this.releaseConditionsSection.should('be.visible');
    this.releaseConditionsSection.should('contain.text', 'Always required');
  }

  verifyAllReviewFieldsReadOnly() {
   cy.log('Verify: All Review page fields are read-only (rendered as static text, not editable inputs)');
   cy.get('body').then(($body) => {
   const editableInputs = $body.find('input:not([type="hidden"]), textarea, select').filter((i, el) => Cypress.dom.isVisible(el));
   cy.log(`Found ${editableInputs.length} visible editable form elements on Review page`);
   expect(editableInputs.length, 'Review page should have no editable input/textarea/select fields').to.eq(0);
   });
   cy.log('VERIFIED: All Review page fields are static/read-only (no editable form elements present)');
  }

  verifyFooterButtonsDisplayed() {
    cy.log('Verify: Cancel, Save as Draft, and Send buttons are displayed');
    this.cancelButton.scrollIntoView().should('be.visible');
    this.saveAsDraftButtonFooter.scrollIntoView().should('be.visible');
    this.sendButton.scrollIntoView().should('be.visible');
    cy.log('VERIFIED: Cancel, Save as Draft, and Send buttons are displayed');
  }

  verifyCompleteReviewPage() {
    cy.log('Action: Verify complete Review page - all sections not empty and read-only');
    this.verifyOverviewSectionNotEmpty();
    this.verifyParticipatingPartiesNotEmpty();
    this.verifyDocumentsAndFormsNotEmpty();
    this.verifyValueTransfersNotEmpty();
    this.verifyReleaseAuthorityNotEmpty();
    this.verifyReleaseConditionsNotEmpty();
    this.verifyAllReviewFieldsReadOnly();
    this.verifyFooterButtonsDisplayed();
  }

  verifyAgreementSentDisplayed() {
    cy.log('Verify: Agreement sent success screen displayed');
    cy.log('Verify: Green checkmark icon is visible');
    this.agreementSentCheckIcon.should('be.visible');
    cy.log('Verify: "Agreement sent" heading is visible');
    this.agreementSentHeading.should('be.visible').and('have.text', 'Agreement sent');
    cy.log('Verify: Confirmation message text is visible');
    this.agreementSentDescription.should('be.visible').and('contain.text', 'Invitations have been sent to all parties')
      .and('contain.text', 'Once countersigned').and('contain.text', 'pre-funding state');
    cy.log('VERIFIED: Agreement sent screen displayed with checkmark and confirmation text');
  }

  verifyAgreementSentButtonsDisplayed() {
    cy.log('Verify: View agreement and Create another buttons are displayed');
    this.viewAgreementButton.should('be.visible').and('contain.text', 'View agreement');
    this.createAnotherButton.should('be.visible').and('contain.text', 'Create another');
  }

  clickViewAgreement() {
    cy.log('Action: Click View agreement button');this.viewAgreementButton.click();
  }

  clickCreateAnother() {
    cy.log('Action: Click Create another button');this.createAnotherButton.click();
  }

  
  clickSendAndWaitForAgreementSent() {
    cy.log('Action: Click Send button');
    this.sendButton.click();
    cy.log('Action: Wait for either Agreement sent success OR an error to appear');
    cy.get('body', { timeout: 30000 }).should(($body) => {
    const hasSuccess = $body.find('h2:contains("Agreement sent")').length > 0;
    const hasError = $body.find('[role="alert"], .toast-error, [data-test*="error"]').length > 0;
    expect(hasSuccess || hasError, 'Expected either success screen or an error message to appear').to.be.true;
    });
    cy.get('body').then(($body) => {
    const hasError = $body.find('[role="alert"], .toast-error, [data-test*="error"]').length > 0;
    if (hasError) {const errorText = $body.find('[role="alert"], .toast-error, [data-test*="error"]').first().text();
    cy.log(`FAILED: Error appeared after clicking Send - "${errorText}"`);
    throw new Error(`Send action failed with error: "${errorText}"`);
    }
    });
    cy.log('VERIFIED: Agreement sent screen is now displayed (no error occurred)');
    cy.contains('h2', 'Agreement sent').should('be.visible');

    return this;
 }

   //normal flow 
  verifyContinueDropdownOptionsDisplayed() {
    cy.log('Action: Verify "Create a Pactvera" and "Select a Template" options are displayed');
    this.createPactveraFromScratchOption.should('be.visible').and('contain.text', 'Create a Pactvera');
    this.selectTemplateOption.should('be.visible').and('contain.text', 'Select a Template');
    cy.log('Action: "Create a Pactvera" and "Select a Template" options verified as displayed');
    return this;
  }

  clickCreatePactveraFromScratch() {
    cy.log('Action: Click "Create a Pactvera" option from dropdown');
    this.createPactveraFromScratchOption.should('be.visible').click();
    cy.log('Action: "Create a Pactvera" option clicked successfully');
    return this;
  }

  clickSelectATemplate() {
    cy.log('Action: Click "Select a Template" option from dropdown');
    this.selectTemplateOption.should('be.visible').click();
    cy.log('Action: "Select a Template" option clicked successfully');
    return this;
  }


  clickSelectFromConnections() {
    cy.log('Action: Click "Select from Connections" button');
    this.selectFromConnectionsButton.should('be.visible').click();
    cy.log('Action: "Select from Connections" button clicked successfully');
    return this;
  }

  // =====================================================
  // ACTIONS - Individual Checkbox Toggle
  // =====================================================

  checkMyOrganizationCheckbox() {
    cy.log('Action: Check "My organization is a party in this agreement" checkbox');
    this.myOrganizationCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'false') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.myOrganizationCheckbox.should('have.attr', 'aria-checked', 'true');
    cy.log('Action: "My organization is a party in this agreement" checkbox checked successfully');
    return this;
  }

    uncheckMyOrganizationCheckbox() {
    cy.log('Action: Uncheck "My organization is a party in this agreement" checkbox');
    this.myOrganizationCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'true') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.myOrganizationCheckbox.should('have.attr', 'aria-checked', 'false');
    cy.log('Action: "My organization is a party in this agreement" checkbox unchecked successfully');
    return this;
  }

  checkCorporateDocumentCheckbox() {
    cy.log('Action: Check "Mark as a corporate document" checkbox');
    this.corporateDocumentCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'false') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.corporateDocumentCheckbox.should('have.attr', 'aria-checked', 'true');
    cy.log('Action: "Mark as a corporate document" checkbox checked successfully');
    return this;
  }

    uncheckCorporateDocumentCheckbox() {
    cy.log('Action: Uncheck "Mark as a corporate document" checkbox');
    this.corporateDocumentCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'true') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.corporateDocumentCheckbox.should('have.attr', 'aria-checked', 'false');
    cy.log('Action: "Mark as a corporate document" checkbox unchecked successfully');
    return this;
  }

  checkRecipientPaysCheckbox() {
    cy.log('Action: Check "Recipient pays for non-ChainIT costs" checkbox');
    this.recipientPaysCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'false') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.recipientPaysCheckbox.should('have.attr', 'aria-checked', 'true');
    cy.log('Action: "Recipient pays for non-ChainIT costs" checkbox checked successfully');
    return this;
  } 

  uncheckRecipientPaysCheckbox() {
    cy.log('Action: Uncheck "Recipient pays for non-ChainIT costs" checkbox');
    this.recipientPaysCheckbox.then(($el) => {
      if ($el.attr('aria-checked') === 'true') {
        cy.wrap($el).click({ force: true });
      }
    });
    this.recipientPaysCheckbox.should('have.attr', 'aria-checked', 'false');
    cy.log('Action: "Recipient pays for non-ChainIT costs" checkbox unchecked successfully');
    return this;
  }

  // =====================================================
  // ACTIONS - Check/Uncheck All Checkboxes Together
  // =====================================================

  checkAllCheckboxes() {
    cy.log('Action: Check all three checkboxes (My organization, Corporate document, Recipient pays)');
    this.checkMyOrganizationCheckbox();
    this.checkCorporateDocumentCheckbox();
    this.checkRecipientPaysCheckbox();
    cy.log('Action: All three checkboxes checked successfully');
    return this;
  }


  uncheckAllCheckboxes() {
    cy.log('Action: Uncheck all three checkboxes (My organization, Corporate document, Recipient pays)');
    this.uncheckMyOrganizationCheckbox();
    this.uncheckCorporateDocumentCheckbox();
    this.uncheckRecipientPaysCheckbox();
    cy.log('Action: All three checkboxes unchecked successfully');
    return this;
  } 

  clickNextButton() {
    cy.log('Action: Click "Next" button');
    this.nextButton.should('be.visible').should('not.be.disabled').click();
    cy.log('Action: "Next" button clicked successfully');
    return this;
  }

  verifyAttachDocumentsErrorDisplayed() {
    cy.log('Verification: Verify "Please attach documents or forms" error is displayed');
    this.attachDocumentsErrorHeading.should('be.visible');
    this.attachDocumentsErrorMessage.should('be.visible');
   cy.log('VERIFIED: "Please attach documents or forms" error is displayed');
  return this;
  }

  // ACTIONS - Navigate Back to Documents Step
  
  navigateToDocumentsStep() {
    cy.log('Action: Navigate to Documents step');
    this.documentsStepLink.should('be.visible').click();
    cy.log('Action: Navigated to Documents step successfully');
    return this;
  }


    clickSend() {
    cy.log('Action: Click Send button');
    this.sendButton.click();
    cy.log('Action: click send button successfully');
    return this;
  }

}

export default new PactveraMainPage();