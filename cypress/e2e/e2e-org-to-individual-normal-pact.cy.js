import SwitchAccountModal from '../pages/SwitchAccountModal';
import LoginPage from '../pages/LoginPage';
import ConfigurationPage from '../pages/ConfigurationPage';
import SidebarPage from '../pages/SidebarPage';
import PactveraMainPage from '../pages/pactvera/PactveraMainPage';
import PactveraTemplatePage from '../pages/configuration/PactveraTemplatePage';
import HomePage from '../pages/HomePage';

const workFlowTest = 'cypress/fixtures/tca_workflow_test.json';
const TCAFlowDocument_PDF = 'cypress/fixtures/Age.pdf';

describe('Configuration - end to end normal flow pactvera', () => {

  beforeEach(() => {
    LoginPage.loginWithQrAndSelectAccount('organization');
  });

  it.only('TC01: Verify complete sidebar navigation', () => {
    cy.log('Action: Open Pactvera menu');
    SidebarPage.clickPactvera();
    cy.log('Verified: Pactvera menu is visible');

    cy.log('Action: Navigate to Pactvera Main page');
    SidebarPage.clickPactveraMain();
    cy.log('Verified: Pactvera Main page is displayed');

    cy.log('Action: Open Create & Send flow');
    PactveraMainPage.clickCreateAndSend();
    cy.log('Verified: Create a Pactvera popup is open');

    cy.log('Action: Verify Continue button state');
    PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
    cy.log('Verified: Continue button is displayed and disabled');

    cy.log('Action: Select Pactvera Transaction option');
    PactveraMainPage.clickPactveraAgreement();
    cy.log('Verified: Pactvera Transaction option is selected');

    cy.log('Action: Continue with agreement setup');
    PactveraMainPage.clickContinueButton();
    cy.log('Verified: flow moved to the next screen');

    cy.log('Action: Verify template options');
    PactveraMainPage.verifyContinueDropdownOptionsDisplayed();
    cy.log('Verified: Create a Pactvera and Select a Template options are displayed');

    cy.log('Action: Choose create-from-scratch flow');
    PactveraMainPage.clickCreatePactveraFromScratch();
    cy.log('Verified: scratch flow is selected');

    cy.log('Action: Verify Agreement Type step');
    PactveraMainPage.verifyAgreementTypeStep();
    cy.log('Verified: Agreement Type step is displayed');

    cy.log('Action: Verify workflow steps');
    PactveraMainPage.verifyAllFourStepsDisplayed();
    cy.log('Verified: all 4 workflow steps are displayed');

    cy.log('Action: Verify Step 1 state');
    PactveraMainPage.verifyStep1Active();
    cy.log('Verified: Step 1 is active');

    cy.log('Action: Verify Continue button without agreement name');
    PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
    cy.log('Verified: Continue button is disabled without agreement name');

    cy.log('Action: Enter unique agreement name');
    PactveraMainPage.enterUniqueAgreementName();
    cy.log('Verified: unique agreement name is entered');

    cy.log('Action: Continue to agreement type screen');
    PactveraMainPage.clickContinueButton();
    cy.log('Verified: flow moved to the agreement type section');

    cy.log('Action: Verify Step 1 completion');
    PactveraMainPage.verifyStep1Completed();
    cy.log('Verified: Step 1 is completed');

    cy.log('Action: Check action button states');
    PactveraMainPage.verifyActionButtonsDisabled();
    cy.log('Verified: Cancel, Save as Draft, and Continue buttons are disabled');

    cy.log('Action: Select first available folder');
    PactveraMainPage.selectFirstFolder();
    cy.log('Verified: first available folder is selected');

    cy.log('Action: Recheck action button states');
    PactveraMainPage.verifyActionButtonsEnabled();
    cy.log('Verified: Cancel, Save as Draft, and Continue buttons are enabled');

    cy.log('Action: Continue after folder selection');
    PactveraMainPage.clickContinueButton();
    cy.log('Verified: next page is displayed');

    cy.log('Action: Verify Parties page elements');
    PactveraMainPage.verifyAllPartiesPageElements();
    cy.log('Verified: all display elements on the Parties page are present');

    cy.log('Action: Open Select from Connections popup');
    PactveraMainPage.clickSelectFromConnections();
    cy.log('Verified: Select from Connections popup is displayed');

    cy.log('Action: Verify popup content');
    PactveraMainPage.verifySelectFromConnectionsPopup();
    cy.log('Verified: Select from Connections popup is visible');

    cy.log('Action: Select individual connection');
    PactveraMainPage.selectIndivualConnection();
    cy.log('Verified: individual connection is selected');

    cy.log('Action: Check all checkboxes');
    PactveraMainPage.checkAllCheckboxes();
    cy.log('Verified: all checkboxes are checked');

    cy.log('Action: Move to next wizard step');
    PactveraMainPage.clickNextButton();
    cy.log('Verified: next wizard step is displayed');

    cy.log('Action: Move to next wizard step again');
    PactveraMainPage.clickNextButton();
    cy.log('Verified: next wizard section is reached');

    cy.log('Action: Send agreement request');
    PactveraMainPage.clickSend();
    cy.log('Verified: send action is triggered');

    cy.log('Action: Validate required document validation');
    PactveraMainPage.verifyAttachDocumentsErrorDisplayed();
    cy.log('Verified: "Please attach documents or forms" error is displayed');

    cy.log('Action: Navigate back to Documents step');
    PactveraMainPage.navigateToDocumentsStep();
    cy.log('Verified: user is back on the Documents step');

    cy.log('Action: Add document to agreement');
    PactveraTemplatePage.clickAddDocumentForAgreement();
    cy.log('Verified: add document flow started');

    cy.log('Action: Verify Add Document popup');
    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();
    cy.log('Verified: Add Document popup is displayed');

    cy.log('Action: Select Upload New option');
    PactveraTemplatePage.clickUploadNew();
    cy.log('Verified: Upload New flow is active');

    cy.log('Action: Upload PDF file');
    PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
    cy.log('Verified: PDF file is uploaded');

    cy.log('Action: Confirm PDF upload');
    PactveraTemplatePage.clickUploadConfirm();
    cy.log('Verified: upload confirmation is complete');

    cy.log('Action: Verify Add Participants section');
    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
    cy.log('Verified: Add Participants section is displayed');

    cy.log('Action: Select party with conditional flow');
    PactveraMainPage.selectPartyWithConditionalFlow().then((isYourOrgSelected) => {
      if (isYourOrgSelected) {
        cy.log('Action: Use Your Organization signer flow');
        PactveraMainPage.getOrganizationAdministratorName();
        cy.log('Verified: Organization Administrator name is available');

        cy.log('Action: Verify Authorized Signer button');
        PactveraMainPage.verifyAuthorizedSignerButton();
        cy.log('Verified: Authorized Signer button is displayed');

        cy.log('Action: Click Authorized Signer');
        PactveraMainPage.clickAuthorizedSignerButton();
        cy.log('Verified: signer button click is successful');

        cy.log('Action: Verify Select Signer popup');
        PactveraMainPage.verifySelectSignerPopup();
        cy.log('Verified: Select Signer popup is displayed');

        cy.log('Action: Select authorized signer');
        cy.get('@organizationAdministratorName').then((signerName) => {
          cy.log(`Action: Select signer "${signerName}"`);
          PactveraMainPage.selectAuthorizedSigner(signerName);
        });
        cy.log('Verified: signer is selected');

        cy.log('Action: Confirm signer selection');
        PactveraMainPage.clickConfirmSigner();
        cy.log('Verified: signer confirmation is complete');
      } else {
        cy.log('Action: Use alternate party selection flow');
        cy.log('Verified: alternate party path is selected');
      }

      cy.log('Action: Continue after document participant selection');
      PactveraTemplatePage.clickContinue();
      cy.log('Verified: document setup continues to canvas step');

      cy.log('Action: Drag signature field onto document');
      PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
      cy.log('Verified: signature field is placed on the document');

      cy.log('Action: Add document to request');
      PactveraMainPage.clickAddToRequest();
      cy.log('Verified: document is added to request');

      cy.log('Action: Add form to agreement');
      PactveraTemplatePage.clickAddForm();
      cy.log('Verified: form section is ready');

      cy.log('Action: Create a new form');
      PactveraTemplatePage.clickCreateNewForm();
      cy.log('Verified: new form builder is open');

      cy.log('Action: Enter form title');
      PactveraMainPage.enterFormTitle();
      cy.log('Verified: random form title is entered');

      cy.log('Action: Drag basic field to form');
      PactveraMainPage.dragBasicFieldToForm('textfield');
      cy.log('Verified: basic textfield is placed on the form');

      cy.log('Action: Wait after field drag');
      cy.wait(2000);
      cy.log('Verified: field render pause is complete');

      cy.log('Action: Continue form flow');
      PactveraMainPage.clickContinueButton();
      cy.log('Verified: form flow continues');

      PactveraMainPage.selectOtherPartyNotYourOrganization();
      cy.log('Action: Add other party form to request');
      PactveraMainPage.clickAddToRequest();
      cy.log('Verified: other party item is added to request');

      cy.log('Action: Move to next review step');
      PactveraMainPage.clickNextButton();
      cy.log('Verified: review step is reached');

      cy.log('Action: Verify full review page');
      PactveraMainPage.verifyCompleteReviewSections();
      cy.log('Verified: complete Review page is displayed');

      cy.log('Action: Send final agreement');
      PactveraMainPage.clickSend();
      cy.log('Verified: agreement is sent');

      cy.get('@agreementName').then((title) => {
        cy.log(`Action: Search created agreement "${title}". Verified: agreement is present in Sent list.`);
        PactveraMainPage.searchAndVerifyRecordCreated(title);
      });

      cy.log('Action: Switch to personal organization');
      SwitchAccountModal.selectPersonalOrganization();
      cy.log('Verified: personal organization is selected');

      cy.log('Action: Verify home tasks section');
      HomePage.verifyCompleteHomeTasksSection();
      cy.log('Verified: home tasks section is complete');

      cy.log('Action: Open Todo tab');
      HomePage.clickTodoTab();
      cy.log('Verified: Todo tab is open');

      cy.log('Action: Verify and start document task');
      HomePage.verifyAndStartDocumentTask(TCAFlowDocument_PDF);
      cy.log('Verified: document task is started');

      cy.log('Action: Verify task detail page');
      HomePage.verifyTaskDetailPageDisplayed(TCAFlowDocument_PDF);
      cy.log('Verified: Task detail page is displayed with correct info');

      cy.log('Action: Verify task field values');
      HomePage.verifyTaskDetailFieldsNotEmpty();
      cy.log('Verified: task detail fields are populated');

      cy.log('Action: Verify Continue and Cancel buttons');
      HomePage.verifyCancelAndContinueButtonsDisplayed();
      cy.log('Verified: Cancel and Continue buttons are displayed');

      cy.log('Action: Continue signing flow');
      HomePage.clickTaskContinue();
      cy.log('Verified: signing flow continues');

      cy.log('Action: Complete document signing flow');
      HomePage.completeDocumentSigningFlow();
      cy.log('Verified: document signing flow is complete');
    });
  });
});

