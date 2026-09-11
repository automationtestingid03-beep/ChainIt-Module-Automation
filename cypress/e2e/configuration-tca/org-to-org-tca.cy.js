import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import AdministrationPage from '../../pages/AdministrationPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';
import SidebarPage from '../../pages/SidebarPage';
import PactveraMainPage from '../../pages/pactvera/PactveraMainPage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const workFlowTest = 'cypress/fixtures/tca_workflow_test.json';
const TCAFlowDocument_PDF = 'cypress/fixtures/Age.pdf';

function generateUniqueTitle(prefix) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `${prefix}_${timestamp}_${randomSuffix}`;
}

describe('Configuration - TCA Templates', () => {

  beforeEach(() => {

    // Step 1: Open QR Scan page
    cy.log('Step 1: Opening QR Scan page');
    cy.visit(`${ADMIN_URL}/scan-qr`);
    cy.contains('Scan or Tap the QR Code Login')
      .should('be.visible');
    cy.log('QR Scan page is displayed successfully');


    // Step 2: Manual QR scan
    cy.log('Step 2: Please scan the QR code using the mobile app');

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }
    cy.log('QR scan process resumed');

    // Step 3: Wait for login
    cy.log('Step 3: Waiting for QR login to complete');

    cy.url({ timeout: 120000 }).should('not.include', '/scan-qr');
    cy.log('QR login completed successfully');

    // Step 4: Switch account
    cy.log('Step 4: Verifying Switch Account modal');
    SwitchAccountModal.verifyVisible();
    SwitchAccountModal.getAllOrganizations().then((orgs) => {
    cy.log(`Available organizations: ${orgs.join(', ')}`); 
    });
    SwitchAccountModal.selectSecondOrganization();

    
  });

it.only('TC01: should validate All Pactvera Main page cards and navigation actions', () => {

cy.log('Step 1: Open Pactvera menu');
  SidebarPage.clickPactvera();
  cy.log('Pactvera menu opened successfully');

  cy.log('Step 2: Navigate to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  cy.log('Pactvera Main page displayed successfully');

  cy.log('Step 4: Click Create & Send');
  PactveraMainPage.clickCreateAndSend();
  cy.log('Create a Pactvera popup opened successfully');

  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
  PactveraMainPage.clickPactveraTransaction();
  PactveraMainPage.clickContinueButton();

  PactveraMainPage.verifyTransactionTypeStep();

  cy.log('Step 2: Verify all 6 workflow steps are displayed');
  PactveraMainPage.verifyAllSixStepsDisplayed();

  cy.log('Step 3: Verify Step 1 is active');
  PactveraMainPage.verifyStep1Active();

  cy.log('Step 4: Verify Continue button is disabled without transaction name');
  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();

  cy.log('Step 5: Enter unique transaction name');
  PactveraMainPage.enterUniqueTransactionName();

  cy.log('Step 7: Continue to Transaction Type');
  PactveraMainPage.clickContinueButton();

  cy.log('Step 8: Verify Step 1 is completed');
  PactveraMainPage.verifyStep1Completed();

  cy.log('Step 7: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();

  cy.log('Step 8: Select the first available folder');
  PactveraMainPage.selectFirstFolder();

  cy.log('Step 9: Verify Cancel, Save as Draft, and Continue buttons are enabled');
  PactveraMainPage.verifyActionButtonsEnabled();

  cy.log('Step 10: Click Continue');
  PactveraMainPage.clickContinueButton();

  cy.log('Step 11: Verify Step 3 - Parties is displayed');
  PactveraMainPage.verifyStep3Displayed();

  cy.log('Action: Search and Select for Purchase transaction type');
  PactveraMainPage.searchAndSelectTransactionType('purchase');

  cy.log('Action: Verify selected transaction type');
  PactveraMainPage.verifySelectedTransactionType('purchase');
  PactveraMainPage.verifyRolesSectionDisplayed();
  PactveraMainPage.verifyIncludesSectionDisplayed();
  PactveraMainPage.verifyRoles('saler', 'buyer');
  PactveraMainPage.verifyIncludedFeatures('Value Transfer');
  PactveraMainPage.clickContinueButton();

  cy.log('Step 9: Verify Cancel, Save as Draft, and Continue buttons are enabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  PactveraMainPage.verifyStep2Completed();
  PactveraMainPage.chooseRole('buyer');
  PactveraMainPage.clickContinueButton();
  PactveraMainPage.verifyActionButtonsDisabled();
  PactveraMainPage.verifyOrganizationDetailsAutopopulate();
  PactveraMainPage.verifyPartySectionBasedOnRole();
  PactveraMainPage.verifyAddCcRecipientsSection();
  PactveraMainPage.clickSelectFromDirectoryBasedOnRole();

  PactveraMainPage.verifySelectFromConnectionsPopup();
  PactveraMainPage.selectIndivualConnection();
  PactveraMainPage.clickContinueButton();
  PactveraMainPage.verifyParticipatingPartiesSection();
  PactveraMainPage.verifyParticipatingPartiesColumns();
  PactveraMainPage.verifyParticipatingPartiesEditDeleteIcons();

  PactveraMainPage.verifyCCRecipientsSection();
  PactveraMainPage.verifyCCRecipientsColumns();
  PactveraMainPage.verifyCCRecipientsEditDeleteIcons();
  PactveraMainPage.verifySelectedConnectionInParticipatingParties();
  PactveraMainPage.clickContinueButton();
  PactveraMainPage.verifyStep3Completed();
  PactveraMainPage.verifyActionButtonsDisabled();

  PactveraMainPage.verifyDocumentsSection();
  PactveraMainPage.verifyDocumentItems();
  PactveraMainPage.verifyDocumentButtons();
  PactveraMainPage.verifyFormSection();
  PactveraMainPage.verifyQCForm();
  PactveraMainPage.verifyFormButtons();
  cy.log('Action: Uploading PDF');
  PactveraMainPage.clickUploadNew(1);
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Action: Confirming PDF upload');
  PactveraMainPage.clickUploadConfirm();
  cy.log('Action: Verifying Add Participants section');
  PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
  cy.log('Action: Clicking Continue');
  PactveraMainPage.selectPreviousIndividualParty();
  PactveraTemplatePage.clickContinue();
  cy.log('Action: Dragging Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  PactveraMainPage.clickAddToRequest();
  PactveraMainPage.verifyConfiguredDocumentActions(1);
  cy.log('Action: Uploading PDF');
  PactveraMainPage.clickUploadNew(2);
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Action: Confirming PDF upload');
  PactveraMainPage.clickUploadConfirm();
  PactveraMainPage.selectYourOrganization();
  PactveraMainPage.getOrganizationAdministratorName();
  PactveraMainPage.verifyAuthorizedSignerButton();
  PactveraMainPage.clickAuthorizedSignerButton();
  PactveraMainPage.verifySelectSignerPopup();
  cy.get('@organizationAdministratorName').then((signerName) => {
  PactveraMainPage.selectAuthorizedSigner(signerName);});
  cy.pause();
  PactveraMainPage.clickConfirmSigner();
  PactveraTemplatePage.clickContinue();
  cy.log('Action: Dragging Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  PactveraMainPage.clickAddToRequest();
  PactveraMainPage.verifyConfiguredDocumentActions(2);
  PactveraMainPage.clickCreateForm();
  FormTemplatePage.dragBasicFieldToForm('textfield');
   PactveraTemplatePage.clickContinue();
   PactveraMainPage.selectFirstParty();
   PactveraMainPage.clickAddToRequest();
   PactveraMainPage.verifyConfiguredFormActions();
   PactveraTemplatePage.clickContinue();
  cy.log('Test completed successfully');


cy.log('VERIFIED: All Pactvera Main page cards and navigation actions are working successfully');
});


























  it('TC01: should validate All Pactvera Main page cards and navigation actions', () => {

  cy.log('Step 1: Open Pactvera menu');
  SidebarPage.clickPactvera();
  cy.log('Pactvera menu opened successfully');

  cy.log('Step 2: Navigate to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Pactvera Main page displayed successfully');

  cy.log('Step 3: Verify Send a Pactvera card');
  PactveraMainPage.verifySendPactveraCard();
  cy.log('Send a Pactvera card verified successfully');

  cy.log('Step 4: Click Create & Send');
  PactveraMainPage.clickCreateAndSend();
  cy.log('Create a Pactvera popup opened successfully');

  cy.log('Step 5: Close Create a Pactvera popup');
  PactveraMainPage.closeCreatePactveraPopup();
  cy.log('Create a Pactvera popup closed successfully');

  cy.log('Step 6: Verify View Received Pactveras card');
  PactveraMainPage.verifyReceivedPactveraCard();
  cy.log('View Received Pactveras card verified successfully');

  cy.log('Step 7: Click Open Received');
  PactveraMainPage.clickOpenReceived();
  cy.log('Received Pactveras page opened successfully');

  cy.log('Step 8: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Returned to Pactvera Main page successfully');

  cy.log('Step 9: Verify View Sent Pactveras card');
  PactveraMainPage.verifySentPactveraCard();
  cy.log('View Sent Pactveras card verified successfully');

  cy.log('Step 10: Click View Sent');
  PactveraMainPage.clickViewSent();
  cy.log('Sent Pactveras page opened successfully');

  cy.log('Step 11: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Returned to Pactvera Main page successfully');

  cy.log('Step 12: Verify Manage Templates card');
  PactveraMainPage.verifyManageTemplatesCard();
  cy.log('Manage Templates card verified successfully');

  cy.log('Step 13: Click Open Templates');
  PactveraMainPage.clickOpenTemplates();
  cy.log('Templates page opened successfully');

  cy.log('Step 14: Navigate back to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Returned to Pactvera Main page successfully');

  cy.log('Step 15: Verify Manage Connections card');
  PactveraMainPage.verifyManageConnectionsCard();
  cy.log('Manage Connections card verified successfully');

  cy.log('Step 16: Click Go to Connections');
  PactveraMainPage.clickGoToConnections();
  cy.log('Connections page opened successfully');

  cy.log('Step 17: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Returned to Pactvera Main page successfully');

  cy.log('Step 18: Verify View & Manage Sent Folders card');
  PactveraMainPage.verifySentFoldersCard();
  cy.log('View & Manage Sent Folders card verified successfully');

  cy.log('Step 19: Click View Folders');
  PactveraMainPage.clickViewFolders();
  cy.log('Sent Folders page opened successfully');

  cy.log('Step 20: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Returned to Pactvera Main page successfully');

  cy.log('VERIFIED: All Pactvera Main page cards and navigation actions are working successfully');
});
});