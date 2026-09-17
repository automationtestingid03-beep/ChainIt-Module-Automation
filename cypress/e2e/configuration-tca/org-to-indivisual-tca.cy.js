import SwitchAccountModal from '../../pages/SwitchAccountModal';
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


it('TC01: should validate My Org ID tabs and navigate to Products page', () => {
  cy.log('TC01: My Org ID - Products Complete Validation');

  cy.log('Action: Open Administration');
  AdministrationPage.clickAdministrationButton();
  AdministrationPage.clickMyOrgButton();

  cy.log('Action: Verify My Org ID page is loaded');
  OrgIdVdtPage.verifyMyOrgIdPageLoaded();
  cy.log('VERIFIED: My Org ID page is loaded');

  cy.log('Action: Verify all My Org ID tabs');
  OrgIdVdtPage.verifyAllMyOrgIdTabs();
  cy.log('VERIFIED: All My Org ID tabs are displayed');

  cy.log('Action: Click Products tab');
  ProductPage.clickProductsTab();
  cy.log('Products tab clicked successfully'); 

  cy.log('Action: Verify Products page is loaded');
  ProductPage.verifyProductsPageLoaded();
  cy.log('VERIFIED: Products page is loaded');

  cy.log('Action: Verify search field, Create Product button, Product table, Product table column and record are displayed');
  ProductPage.verifyAllProductPageElements();
  cy.log('Action: Search field, Create Product button, Product table, columns and records verified as displayed');

  cy.wait(2000);

  cy.log('Action: Capture all existing product names before creation');
  ProductPage.captureProductNamesBeforeCreation();
  cy.log('Action: Existing product names captured successfully');

  cy.log('Action: Click Create Product');
  ProductPage.clickCreateProduct();
  cy.log('Action: Create Product clicked successfully');

  cy.log('Action: Please scan the QR code using the mobile app');
  if (Cypress.config('isInteractive')) {
    cy.pause();
  }
  cy.log('Action: QR scan process resumed');

  cy.log('Action: Find newly created product');
  ProductPage.findNewProductAfterCreation();
  cy.log('Action: Newly created product found successfully');

  cy.log('Action: Opening Administration');
  SidebarPage.clickAdministration();
  cy.log('Action: Administration opened successfully');

  cy.log('Action: Opening Configuration');
  SidebarPage.clickConfiguration();
  cy.log('Action: Configuration opened successfully');

  cy.log('Action: Opening TCA Templates');
  SidebarPage.clickTCATemplates();
  TCATemplatePage.verifyPageLoaded();
  cy.log('Action: TCA Templates page opened successfully');

  cy.log('Action: Verify Pactvera transaction workflows table columns');
  TCATemplatePage.verifyPactveratransactionColumns();
  cy.log('Action: Pactvera transaction workflows table columns verified successfully');

  cy.log('Action: Click Create Workflow');
  TCATemplatePage.clickCreateWorkflow();
  cy.log('Action: Create Workflow clicked successfully');

  cy.log('Action: Verify TCA workflow page is loaded');
  TCATemplatePage.verifyTCALoaded();
  cy.log('Action: TCA workflow page verified as loaded');

  cy.log('Action: Verify Cancel button');
  TCATemplatePage.verifyCancelButtonDisplayed();
  cy.log('Action: Cancel button verified as displayed');

  cy.log('Action: Continue to Workflow Builder with mandatory fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Action: Continue to Workflow Builder clicked with mandatory fields empty');

  cy.log('Action: Verify Workflow Template Name required validation');
  TCATemplatePage.verifyWorkflowTemplateNameRequiredError();
  cy.log('Action: Workflow Template Name required validation verified successfully');

  cy.log('Action: Enter Workflow Template Name and Description');
  TCATemplatePage.createUniqueWorkflowTemplate();
  cy.log('Action: Workflow Template Name and Description entered successfully');

  cy.log('Action: Continue to Workflow Builder with Role fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Action: Continue to Workflow Builder clicked with Role fields empty');

  cy.log('Action: Verify Role 1 Name required validation');
  TCATemplatePage.verifyRoleNameRequiredError();
  cy.log('Action: Role 1 Name required validation verified successfully');

  cy.log('Action: Add Buyer and Seller roles');
  TCATemplatePage.addBuyerAndSellerRoles();
  cy.log('Action: Buyer and Seller roles added successfully');

  cy.log('Action: Verify Continue button is enabled');
  TCATemplatePage.verifyContinueButtonEnabled();
  cy.log('Action: Continue button verified as enabled');

  cy.log('Action: Continue to Workflow Builder');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Action: Continue to Workflow Builder clicked successfully');

  cy.wait(10000);

  cy.log('Action: Import workflow JSON');
  TCATemplatePage.clickImportJson();
  TCATemplatePage.uploadWorkflowJson(workFlowTest);
  cy.log('Action: Workflow JSON imported successfully');

  cy.log('Action: Continue from Workflow Builder');
  TCATemplatePage.clickContinue();
  cy.log('Action: Workflow Builder completed successfully');

  cy.log('Action: Click on Publish WorkFlow');
  TCATemplatePage.clickPublishWorkFlow();
  cy.log('Action: Publish WorkFlow button clicked successfully');

  cy.log('Action: Verify template publish success message');
  TCATemplatePage.verifyPublishSuccessMessage();
 cy.log('Action: Template publish success message verified successfully');

  cy.log('Action: Open Pactvera menu');
  SidebarPage.clickPactvera();
  cy.log('Action: Pactvera menu opened successfully');

  cy.log('Action: Navigate to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  cy.log('Action: Pactvera Main page displayed successfully');

  cy.log('Action: Click Create & Send');
  PactveraMainPage.clickCreateAndSend();
  cy.log('Action: Create a Pactvera popup opened successfully');

  cy.log('Action: Verify Continue button is displayed and disabled');
  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
  cy.log('Action: Continue button verified as displayed and disabled');

  cy.log('Action: Click Pactvera Transaction option');
  PactveraMainPage.clickPactveraTransaction();
  cy.log('Action: Pactvera Transaction option selected successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Transaction Type step is displayed');
  PactveraMainPage.verifyTransactionTypeStep();
  cy.log('Action: Transaction Type step verified as displayed');

  cy.log('Action: Verify all 6 workflow steps are displayed');
  PactveraMainPage.verifyAllSixStepsDisplayed();
  cy.log('Action: All 6 workflow steps verified as displayed');

  cy.log('Action: Verify Step 1 is active');
  PactveraMainPage.verifyStep1Active();
  cy.log('Action: Step 1 verified as active');

  cy.log('Action: Verify Continue button is disabled without transaction name');
  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
  cy.log('Action: Continue button verified as disabled without transaction name');

  cy.log('Action: Enter unique transaction name');
  PactveraMainPage.enterUniqueTransactionName();
  cy.log('Action: Unique transaction name entered successfully');

  cy.log('Action: Continue to Transaction Type');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continued to Transaction Type successfully');

  cy.log('Action: Verify Step 1 is completed');
  PactveraMainPage.verifyStep1Completed();
  cy.log('Action: Step 1 verified as completed');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Select the first available folder');
  PactveraMainPage.selectFirstFolder();
  cy.log('Action: First available folder selected successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are enabled');
  PactveraMainPage.verifyActionButtonsEnabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as enabled');

  cy.log('Action: Click Continue');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue clicked successfully');

  cy.log('Action: Verify Step 3 - Parties is displayed');
  PactveraMainPage.verifyStep3Displayed();
  cy.log('Action: Step 3 - Parties verified as displayed');

  cy.log('Action: Search and select Purchase transaction type');
  PactveraMainPage.searchAndSelectTransactionType('purchase');
  cy.log('Action: Purchase transaction type searched and selected successfully');

  cy.log('Action: Verify selected transaction type');
  PactveraMainPage.verifySelectedTransactionType('purchase');
  cy.log('Action: Selected transaction type verified successfully');

  cy.log('Action: Verify Roles section is displayed');
  PactveraMainPage.verifyRolesSectionDisplayed();
  cy.log('Action: Roles section verified as displayed');

  cy.log('Action: Verify Includes section is displayed');
  PactveraMainPage.verifyIncludesSectionDisplayed();
  cy.log('Action: Includes section verified as displayed');

  cy.log('Action: Verify roles - saler and buyer');
  PactveraMainPage.verifyRoles('saler', 'buyer');
  cy.log('Action: Roles - saler and buyer verified successfully');

  cy.log('Action: Verify included features - Value Transfer');
  PactveraMainPage.verifyIncludedFeatures('Value Transfer');
  cy.log('Action: Included features - Value Transfer verified successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Verify Step 2 is completed');
  PactveraMainPage.verifyStep2Completed();
  cy.log('Action: Step 2 verified as completed');

  cy.log('Action: Choose buyer role');
  PactveraMainPage.chooseRole('buyer');
  cy.log('Action: Buyer role chosen successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Verify organization details auto-populate');
  PactveraMainPage.verifyOrganizationDetailsAutopopulate();
  cy.log('Action: Organization details verified as auto-populated');

  cy.log('Action: Verify Party section based on selected role');
  PactveraMainPage.verifyPartySectionBasedOnRole();
  cy.log('Action: Party section verified based on selected role');

  cy.log('Action: Verify Add CC Recipients section is displayed');
  PactveraMainPage.verifyAddCcRecipientsSection();
  cy.log('Action: Add CC Recipients section verified as displayed');

  cy.log('Action: Click Select from Directory based on role');
  PactveraMainPage.clickSelectFromDirectoryBasedOnRole();
  cy.log('Action: Select from Directory clicked successfully based on role');

  cy.log('Action: Verify Select from Connections popup is displayed');
  PactveraMainPage.verifySelectFromConnectionsPopup();
  cy.log('Action: Select from Connections popup verified as displayed');

  cy.log('Action: Select individual connection');
  PactveraMainPage.selectIndivualConnection();
  cy.log('Action: Individual connection selected successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Participating Parties section');
  PactveraMainPage.verifyParticipatingPartiesSection();
  cy.log('Action: Participating Parties section verified successfully');

  cy.log('Action: Verify Participating Parties columns');
  PactveraMainPage.verifyParticipatingPartiesColumns();
  cy.log('Action: Participating Parties columns verified successfully');

  cy.log('Action: Verify Participating Parties edit and delete icons');
  PactveraMainPage.verifyParticipatingPartiesEditDeleteIcons();
  cy.log('Action: Participating Parties edit and delete icons verified successfully');

  cy.log('Action: Verify CC Recipients section');
  PactveraMainPage.verifyCCRecipientsSection();
  cy.log('Action: CC Recipients section verified successfully');

  cy.log('Action: Verify CC Recipients columns');
  PactveraMainPage.verifyCCRecipientsColumns();
  cy.log('Action: CC Recipients columns verified successfully');

  cy.log('Action: Verify CC Recipients edit and delete icons');
  PactveraMainPage.verifyCCRecipientsEditDeleteIcons();
  cy.log('Action: CC Recipients edit and delete icons verified successfully');

  cy.log('Action: Verify selected connection appears in Participating Parties');
  PactveraMainPage.verifySelectedConnectionInParticipatingParties();
  cy.log('Action: Selected connection verified in Participating Parties successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Step 3 is completed');
  PactveraMainPage.verifyStep3Completed();
  cy.log('Action: Step 3 verified as completed');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Verify Documents section');
  PactveraMainPage.verifyDocumentsSection();
  cy.log('Action: Documents section verified successfully');

  cy.log('Action: Verify Document items');
  PactveraMainPage.verifyDocumentItems();
  cy.log('Action: Document items verified successfully');

  cy.log('Action: Verify Document buttons');
  PactveraMainPage.verifyDocumentButtons();
  cy.log('Action: Document buttons verified successfully');

  cy.log('Action: Verify Form section');
  PactveraMainPage.verifyFormSection();
  cy.log('Action: Form section verified successfully');

  cy.log('Action: Verify QC Form');
  PactveraMainPage.verifyQCForm();
  cy.log('Action: QC Form verified successfully');

  cy.log('Action: Verify Form buttons');
  PactveraMainPage.verifyFormButtons();
  cy.log('Action: Form buttons verified successfully');

  cy.log('Action: Wait before uploading PDF');
  cy.wait(2000);
  cy.log('Action: Wait completed');

  cy.log('Action: Click Upload New for first document');
  PactveraMainPage.clickUploadNew(1);
  cy.log('Action: Upload New (document 1) clicked successfully');

  cy.log('Action: Upload PDF file');
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Action: PDF file uploaded successfully');

  cy.log('Action: Confirm PDF upload');
  PactveraMainPage.clickUploadConfirm();
  cy.log('Action: PDF upload confirmed successfully');

  cy.log('Action: Verify Add Participants section is displayed');
  PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
  cy.log('Action: Add Participants section verified as displayed');

  cy.log('Action: Select previous individual party');
  PactveraMainPage.selectPreviousIndividualParty();
  cy.log('Action: Previous individual party selected successfully');

  cy.log('Action: Click Continue');
  PactveraTemplatePage.clickContinue();
  cy.log('Action: Continue clicked successfully');

  cy.log('Action: Drag Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  cy.log('Action: Signature field dragged onto document successfully');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Action: Add to Request clicked successfully');

  cy.log('Action: Verify configured document actions for document 1');
  PactveraMainPage.verifyConfiguredDocumentActions(1);
  cy.log('Action: Configured document actions verified for document 1');

  cy.log('Action: Click Upload New for second document');
  PactveraMainPage.clickUploadNew(2);
  cy.log('Action: Upload New (document 2) clicked successfully');

  cy.log('Action: Upload PDF file');
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Action: PDF file uploaded successfully');

  cy.log('Action: Confirm PDF upload');
  PactveraMainPage.clickUploadConfirm();
  cy.log('Action: PDF upload confirmed successfully');

  cy.log('Action: Select Your Organization');
  PactveraMainPage.selectYourOrganization();
  cy.log('Action: Your Organization selected successfully');

  cy.log('Action: Get Organization Administrator name');
  PactveraMainPage.getOrganizationAdministratorName();
  cy.log('Action: Organization Administrator name retrieved successfully');

  cy.log('Action: Verify Authorized Signer button is displayed');
  PactveraMainPage.verifyAuthorizedSignerButton();
  cy.log('Action: Authorized Signer button verified as displayed');

  cy.log('Action: Click Authorized Signer button');
  PactveraMainPage.clickAuthorizedSignerButton();
  cy.log('Action: Authorized Signer button clicked successfully');

  cy.log('Action: Verify Select Signer popup is displayed');
  PactveraMainPage.verifySelectSignerPopup();
  cy.log('Action: Select Signer popup verified as displayed');

  cy.log('Action: Select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    PactveraMainPage.selectAuthorizedSigner(signerName);
  });
  cy.log('Action: Authorized signer selected successfully');

  cy.log('Action: Click Confirm Signer');
  PactveraMainPage.clickConfirmSigner();
  cy.log('Action: Confirm Signer clicked successfully');

  cy.log('Action: Click Continue');
  PactveraTemplatePage.clickContinue();
  cy.log('Action: Continue clicked successfully');

  cy.log('Action: Drag Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  cy.log('Action: Signature field dragged onto document successfully');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Action: Add to Request clicked successfully');

  cy.log('Action: Verify configured document actions for document 2');
  PactveraMainPage.verifyConfiguredDocumentActions(2);
  cy.log('Action: Configured document actions verified for document 2');

  cy.log('Action: Click Create Form');
  PactveraMainPage.clickCreateForm();
  cy.log('Action: Create Form clicked successfully');

  cy.log('Action: Drag basic textfield onto Form');
  PactveraMainPage.dragBasicFieldToForm('textfield');
  cy.log('Action: Basic textfield dragged onto Form successfully');

  cy.log('Action: Wait after dragging field to form');
  cy.wait(2000);
  cy.log('Action: Wait completed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Select first party');
  PactveraMainPage.selectFirstParty();
  cy.log('Action: First party selected successfully');

  cy.log('Action: Click Authorized Signer button');
  PactveraMainPage.clickAuthorizedSignerButton();
  cy.log('Action: Authorized Signer button clicked successfully');

  cy.log('Action: Select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    PactveraMainPage.selectAuthorizedSigner(signerName);
  });
  cy.log('Action: Authorized signer selected successfully');

  cy.log('Action: Click Confirm Signer');
  PactveraMainPage.clickConfirmSigner();
  cy.log('Action: Confirm Signer clicked successfully');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Action: Add to Request clicked successfully');

  cy.log('Action: Verify configured Form actions');
  PactveraMainPage.verifyConfiguredFormActions();
  cy.log('Action: Configured Form actions verified successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Verify Configure button is displayed');
  PactveraMainPage.verifyConfigureButtonDisplayed();
  cy.log('Action: Configure button verified as displayed');

  cy.log('Action: Click Configure button');
  PactveraMainPage.clickConfigureButton();
  cy.log('Action: Configure button clicked successfully');

  cy.log('Action: Verify Value Transfer popup is displayed');
  PactveraMainPage.verifyValueTransferPopupDisplayed();
  cy.log('Action: Value Transfer popup verified as displayed');

  cy.log('Action: Verify Consideration field is displayed');
  PactveraMainPage.verifyConsiderationFieldDisplayed();
  cy.log('Action: Consideration field verified as displayed');

  cy.log('Action: Verify Consideration field value');
  PactveraMainPage.verifyConsiderationFieldValue();
  cy.log('Action: Consideration field value verified successfully');

  cy.log('Action: Select first VDT product');
  PactveraMainPage.selectNewlyCreatedProduct();
  cy.log('Action: First VDT product selected successfully');

  cy.log('Action: Verify Consideration Type dropdown');
  PactveraMainPage.verifyConsiderationTypeDropdown();
  cy.log('Action: Consideration Type dropdown verified successfully');

  cy.log('Action: Verify Currency is displayed');
  PactveraMainPage.verifyCurrencyDisplayed();
  cy.log('Action: Currency verified as displayed');

  cy.log('Action: Click Value Transfer Continue button');
  PactveraMainPage.clickValueTransferContinueButton();
  cy.log('Action: Value Transfer Continue button clicked successfully');

  cy.log('Action: Verify Step 4 is completed');
  PactveraMainPage.verifyStep4Completed();
  cy.log('Action: Step 4 verified as completed');

  cy.log('Action: Validate Value Transfer details');
  PactveraMainPage.validateValueTransferDetails();
  cy.log('Action: Value Transfer details validated successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Enter Value Transfer amount');
  PactveraMainPage.enterValueTransferAmount(3);
  cy.log('Action: Value Transfer amount entered successfully');

  cy.log('Action: Validate Value Transfer allocation');
  PactveraMainPage.validateValueTransferAllocation(3);
  cy.log('Action: Value Transfer allocation validated successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Send Payment section - all fields not empty');
  PactveraMainPage.verifySendPaymentFieldsFilled();
  cy.log('Action: Send Payment section fields verified as not empty');

  cy.log('Action: Verify Who Receives Payment section - all fields not empty');
  PactveraMainPage.verifyReceivePaymentFieldsFilled();
  cy.log('Action: Who Receives Payment section fields verified as not empty');

  cy.log('Action: Verify Allocation shows Fully Allocated');
  PactveraMainPage.verifyFullyAllocated();
  cy.log('Action: Allocation verified as Fully Allocated');

  cy.log('Action: Open Payout Method dropdown');
  PactveraMainPage.openPayoutMethodDropdown();
  cy.log('Action: Payout Method dropdown opened successfully');

  cy.log('Action: Verify ACH, RTP, Wire options are visible');
  PactveraMainPage.verifyPayoutMethodOptionsVisible();
  cy.log('Action: ACH, RTP, Wire options verified as visible');

  cy.log('Action: Select RTP payment method');
  PactveraMainPage.selectPayoutMethod('RTP');
  cy.log('Action: RTP payment method selected successfully');

  cy.log('Action: Verify RTP is selected in Payout Method field');
  PactveraMainPage.verifyPayoutMethodSelected('RTP');
  cy.log('Action: RTP verified as selected in Payout Method field');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Verify Select Billing Address section is displayed');
  PactveraMainPage.verifyBillingAddressSectionDisplayed();
  cy.log('Action: Select Billing Address section verified as displayed');

  cy.log('Action: Verify Refresh button is visible');
  PactveraMainPage.verifyBillingAddressRefreshButtonVisible();
  cy.log('Action: Refresh button verified as visible');

  cy.log('Action: Select first billing address');
  PactveraMainPage.selectFirstBillingAddress();
  cy.log('Action: First billing address selected successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Always Required platform-enforced conditions displayed');
  PactveraMainPage.verifyAlwaysRequiredSectionDisplayed();
  cy.log('Action: Always Required section verified as displayed');

  cy.log('Action: Verify Manual Confirmation section displayed');
  PactveraMainPage.verifyManualConfirmationSectionDisplayed();
  cy.log('Action: Manual Confirmation section verified as displayed');

  cy.log('Action: Get sidebar party names');
  PactveraMainPage.getSidebarPartyNames();
  cy.log('Action: Sidebar party names retrieved successfully');

  cy.log('Action: Select confirmation party using stored sidebar parties');
  cy.get('@sidebarParties').then((parties) => {
    cy.log(`Action: Reusing stored parties: ${JSON.stringify(parties)}`);
    PactveraMainPage.selectConfirmationParty(parties[0].name);
  });
  cy.log('Action: Confirmation party selected successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Action: Cancel, Save as Draft, and Continue buttons verified as disabled');

  cy.log('Action: Store organization administrator name');
  cy.wrap('MARISA BERNHEISER').as('organizationAdministratorName');
  cy.log('Action: Organization administrator name stored successfully');

  cy.log('Action: Verify and select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    cy.log(`Action: Verify and select ${signerName} as authorized signer`);
    PactveraMainPage.verifyAndSelectAuthorizedSigner(signerName);
  });
  cy.log('Action: Authorized signer verified and selected successfully');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Edit icon is displayed');
  PactveraMainPage.verifyEditIconDisplayed();
  cy.log('Action: Edit icon verified as displayed');

  cy.log('Action: Verify Authority Verified banner is displayed');
  PactveraMainPage.verifyAuthorityVerifiedDisplayed();
  cy.log('Action: Authority Verified banner verified as displayed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Action: Continue button clicked successfully');

  cy.log('Action: Verify Step 5 is completed');
  PactveraMainPage.verifyStep5Completed();
  cy.log('Action: Step 5 verified as completed');

  cy.log('Action: Verify complete Review page');
  PactveraMainPage.verifyCompleteReviewPage();
  cy.log('Action: Complete Review page verified successfully');

  cy.log('Action: Click Send button and wait for agreement sent');
  PactveraMainPage.clickSendAndWaitForAgreementSent();
  cy.log('Action: Send button clicked and agreement sent successfully');

  cy.log('Action: Verify Agreement Sent screen displayed correctly');
  PactveraMainPage.verifyAgreementSentDisplayed();
  cy.log('Action: Agreement Sent screen verified as displayed correctly');

  cy.log('Action: Verify Agreement Sent action buttons are displayed');
  PactveraMainPage.verifyAgreementSentButtonsDisplayed();
  cy.log('Action: Agreement Sent action buttons verified as displayed');

  cy.log('Action: Test flow completed successfully');


   });
});
