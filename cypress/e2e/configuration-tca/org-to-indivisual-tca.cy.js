import AdministrationPage from '../../pages/AdministrationPage';
import LoginPage from '../../pages/LoginPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';
import SidebarPage from '../../pages/SidebarPage';
import PactveraMainPage from '../../pages/pactvera/PactveraMainPage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';


  const workFlowTest = 'cypress/fixtures/tca_workflow_test.json';
  const TCAFlowDocument_PDF = 'cypress/fixtures/Age.pdf';
describe('Configuration - TCA Templates', () => {

  beforeEach(() => {
    cy.log('Action: Log in and select organization account');
    LoginPage.loginWithQrAndSelectAccount('organization');
    cy.log('Verified: Organization account selected');
  });


it('TC01: should validate My Org ID tabs and navigate to Products page', () => {
  cy.log('Action: Start My Org ID and Products validation');

  cy.log('Action: Open Administration');
  AdministrationPage.clickAdministrationButton();
  cy.log('Verified: Administration opened');
  cy.log('Action: Open My Org ID');
  AdministrationPage.clickMyOrgButton();
  cy.log('Verified: My Org ID opened');

  cy.log('Action: Verify My Org ID page is loaded');
  OrgIdVdtPage.verifyMyOrgIdPageLoaded();
  cy.log('Verified: My Org ID page is loaded');

  cy.log('Action: Verify all My Org ID tabs');
  OrgIdVdtPage.verifyAllMyOrgIdTabs();
  cy.log('Verified: All My Org ID tabs are displayed');

  cy.log('Action: Click Products tab');
  ProductPage.clickProductsTab();
  cy.log('Verified: Products tab opened');

  cy.log('Action: Verify Products page is loaded');
  ProductPage.verifyProductsPageLoaded();
  cy.log('Verified: Products page is loaded');

  cy.log('Action: Verify search field, Create Product button, Product table, Product table column and record are displayed');
  ProductPage.verifyAllProductPageElements();
  cy.log('Verified: Product page elements displayed');

  cy.wait(2000);

  cy.log('Action: Capture all existing product names before creation');
  ProductPage.captureProductNamesBeforeCreation();
  cy.log('Verified: Existing product names captured');

  cy.log('Action: Click Create Product');
  ProductPage.clickCreateProduct();
  cy.log('Verified: Create Product opened');

  cy.log('Action: Please scan the QR code using the mobile app');
  if (Cypress.config('isInteractive')) {
    cy.pause();
  }
  cy.log('Action: QR scan process resumed');

  cy.log('Action: Find newly created product');
  ProductPage.findNewProductAfterCreation();
  cy.log('Verified: Newly created product found');

  cy.log('Action: Opening Administration');
  SidebarPage.clickAdministration();
  cy.log('Verified: Administration opened');

  cy.log('Action: Opening Configuration');
  SidebarPage.clickConfiguration();
  cy.log('Verified: Configuration opened');

  cy.log('Action: Opening TCA Templates');
  SidebarPage.clickTCATemplates();
  cy.log('Verified: TCA Templates navigation completed');
  TCATemplatePage.verifyPageLoaded();
  cy.log('Verified: TCA Templates page loaded');

  cy.log('Action: Verify Pactvera transaction workflows table columns');
  TCATemplatePage.verifyPactveratransactionColumns();
  cy.log('Verified: Pactvera transaction workflow columns displayed');

  cy.log('Action: Click Create Workflow');
  TCATemplatePage.clickCreateWorkflow();
  cy.log('Verified: Create Workflow opened');

  cy.log('Action: Verify TCA workflow page is loaded');
  TCATemplatePage.verifyTCALoaded();
  cy.log('Verified: TCA workflow page loaded');

  cy.log('Action: Verify Cancel button');
  TCATemplatePage.verifyCancelButtonDisplayed();
  cy.log('Verified: Cancel button displayed');

  cy.log('Action: Continue to Workflow Builder with mandatory fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Verified: Workflow Builder validation triggered');

  cy.log('Action: Verify Workflow Template Name required validation');
  TCATemplatePage.verifyWorkflowTemplateNameRequiredError();
  cy.log('Verified: Workflow Template Name validation displayed');

  cy.log('Action: Enter Workflow Template Name and Description');
  TCATemplatePage.createUniqueWorkflowTemplate();
  cy.log('Verified: Workflow Template Name and Description entered');

  cy.log('Action: Continue to Workflow Builder with Role fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Verified: Workflow Builder validation triggered for empty roles');

  cy.log('Action: Verify Role 1 Name required validation');
  TCATemplatePage.verifyRoleNameRequiredError();
  cy.log('Verified: Role 1 Name validation displayed');

  cy.log('Action: Add Buyer and Seller roles');
  TCATemplatePage.addBuyerAndSellerRoles();
  cy.log('Verified: Buyer and Seller roles added');

  cy.log('Action: Verify Continue button is enabled');
  TCATemplatePage.verifyContinueButtonEnabled();
  cy.log('Verified: Continue button enabled');

  cy.log('Action: Continue to Workflow Builder');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.log('Verified: Continued to Workflow Builder');

  cy.wait(10000);

  cy.log('Action: Import workflow JSON');
  TCATemplatePage.clickImportJson();
  TCATemplatePage.uploadWorkflowJson(workFlowTest);
  cy.log('Verified: Workflow JSON imported');

  cy.log('Action: Continue from Workflow Builder');
  TCATemplatePage.clickContinue();
  cy.log('Verified: Workflow Builder completed');

  cy.log('Action: Click on Publish WorkFlow');
  TCATemplatePage.clickPublishWorkFlow();
  cy.log('Verified: Publish WorkFlow submitted');

  cy.log('Action: Verify template publish success message');
  TCATemplatePage.verifyPublishSuccessMessage();
 cy.log('Action: Verify template publish success message');
 cy.log('Verified: Template publish success message displayed');
 cy.log('Verified: Template publish success message displayed');

  cy.log('Action: Open Pactvera menu');
  SidebarPage.clickPactvera();
  cy.log('Verified: Pactvera menu opened');

  cy.log('Action: Navigate to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  cy.log('Verified: Pactvera Main page opened');

  cy.log('Action: Click Create & Send');
  PactveraMainPage.clickCreateAndSend();
  cy.log('Verified: Create a Pactvera popup opened');

  cy.log('Action: Verify Continue button is displayed and disabled');
  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
  cy.log('Verified: Continue button displayed and disabled');

  cy.log('Action: Click Pactvera Transaction option');
  PactveraMainPage.clickPactveraTransaction();
  cy.log('Verified: Pactvera Transaction option selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Transaction Type step is displayed');
  PactveraMainPage.verifyTransactionTypeStep();
  cy.log('Verified: Transaction Type step displayed');

  cy.log('Action: Verify all 6 workflow steps are displayed');
  PactveraMainPage.verifyAllSixStepsDisplayed();
  cy.log('Verified: All 6 workflow steps displayed');

  cy.log('Action: Verify Step 1 is active');
  PactveraMainPage.verifyStep1Active();
  cy.log('Verified: Step 1 active');

  cy.log('Action: Verify Continue button is disabled without transaction name');
  PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
  cy.log('Verified: Continue button disabled without transaction name');

  cy.log('Action: Enter unique transaction name');
  PactveraMainPage.enterUniqueTransactionName();
  cy.log('Verified: Unique transaction name entered');

  cy.log('Action: Continue to Transaction Type');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continued to Transaction Type');

  cy.log('Action: Verify Step 1 is completed');
  PactveraMainPage.verifyStep1Completed();
  cy.log('Verified: Step 1 completed');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Select the first available folder');
  PactveraMainPage.selectFirstFolder();
  cy.log('Verified: First available folder selected');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are enabled');
  PactveraMainPage.verifyActionButtonsEnabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons enabled');

  cy.log('Action: Click Continue');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue clicked');

  cy.log('Action: Verify Step 3 - Parties is displayed');
  PactveraMainPage.verifyStep3Displayed();
  cy.log('Verified: Step 3 - Parties displayed');

  cy.log('Action: Search and select Purchase transaction type');
  PactveraMainPage.searchAndSelectTransactionType('purchase');
  cy.log('Verified: Purchase transaction type selected');

  cy.log('Action: Verify selected transaction type');
  PactveraMainPage.verifySelectedTransactionType('purchase');
  cy.log('Verified: Selected transaction type displayed');

  cy.log('Action: Verify Roles section is displayed');
  PactveraMainPage.verifyRolesSectionDisplayed();
  cy.log('Verified: Roles section displayed');

  cy.log('Action: Verify Includes section is displayed');
  PactveraMainPage.verifyIncludesSectionDisplayed();
  cy.log('Verified: Includes section displayed');

  cy.log('Action: Verify roles - saler and buyer');
  PactveraMainPage.verifyRoles('saler', 'buyer');
  cy.log('Verified: Roles - saler and buyer displayed');

  cy.log('Action: Verify included features - Value Transfer');
  PactveraMainPage.verifyIncludedFeatures('Value Transfer');
  cy.log('Verified: Included feature - Value Transfer displayed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Verify Step 2 is completed');
  PactveraMainPage.verifyStep2Completed();
  cy.log('Verified: Step 2 completed');

  cy.log('Action: Choose buyer role');
  PactveraMainPage.chooseRole('buyer');
  cy.log('Verified: Buyer role selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Verify organization details auto-populate');
  PactveraMainPage.verifyOrganizationDetailsAutopopulate();
  cy.log('Verified: Organization details auto-populated');

  cy.log('Action: Verify Party section based on selected role');
  PactveraMainPage.verifyPartySectionBasedOnRole();
  cy.log('Verified: Party section matches selected role');

  cy.log('Action: Verify Add CC Recipients section is displayed');
  PactveraMainPage.verifyAddCcRecipientsSection();
  cy.log('Verified: Add CC Recipients section displayed');

  cy.log('Action: Click Select from Directory based on role');
  PactveraMainPage.clickSelectFromDirectoryBasedOnRole();
  cy.log('Verified: Select from Directory opened');

  cy.log('Action: Verify Select from Connections popup is displayed');
  PactveraMainPage.verifySelectFromConnectionsPopup();
  cy.log('Verified: Select from Connections popup displayed');

  cy.log('Action: Select individual connection');
  PactveraMainPage.selectIndivualConnection();
  cy.log('Verified: Individual connection selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Participating Parties section');
  PactveraMainPage.verifyParticipatingPartiesSection();
  cy.log('Verified: Participating Parties section displayed');

  cy.log('Action: Verify Participating Parties columns');
  PactveraMainPage.verifyParticipatingPartiesColumns();
  cy.log('Verified: Participating Parties columns displayed');

  cy.log('Action: Verify Participating Parties edit and delete icons');
  PactveraMainPage.verifyParticipatingPartiesEditDeleteIcons();
  cy.log('Verified: Participating Parties edit and delete icons displayed');

  cy.log('Action: Verify CC Recipients section');
  PactveraMainPage.verifyCCRecipientsSection();
  cy.log('Verified: CC Recipients section displayed');

  cy.log('Action: Verify CC Recipients columns');
  PactveraMainPage.verifyCCRecipientsColumns();
  cy.log('Verified: CC Recipients columns displayed');

  cy.log('Action: Verify CC Recipients edit and delete icons');
  PactveraMainPage.verifyCCRecipientsEditDeleteIcons();
  cy.log('Verified: CC Recipients edit and delete icons displayed');

  cy.log('Action: Verify selected connection appears in Participating Parties');
  PactveraMainPage.verifySelectedConnectionInParticipatingParties();
  cy.log('Verified: Selected connection appears in Participating Parties');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Step 3 is completed');
  PactveraMainPage.verifyStep3Completed();
  cy.log('Verified: Step 3 completed');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Verify Documents section');
  PactveraMainPage.verifyDocumentsSection();
  cy.log('Verified: Documents section displayed');

  cy.log('Action: Verify Document items');
  PactveraMainPage.verifyDocumentItems();
  cy.log('Verified: Document items displayed');

  cy.log('Action: Verify Document buttons');
  PactveraMainPage.verifyDocumentButtons();
  cy.log('Verified: Document buttons displayed');

  cy.log('Action: Verify Form section');
  PactveraMainPage.verifyFormSection();
  cy.log('Verified: Form section displayed');

  cy.log('Action: Verify QC Form');
  PactveraMainPage.verifyQCForm();
  cy.log('Verified: QC Form displayed');

  cy.log('Action: Verify Form buttons');
  PactveraMainPage.verifyFormButtons();
  cy.log('Verified: Form buttons displayed');

  cy.log('Action: Wait before uploading PDF');
  cy.wait(2000);
  cy.log('Verified: Wait completed');

  cy.log('Action: Click Upload New for first document');
  PactveraMainPage.clickUploadNew(1);
  cy.log('Verified: Upload New for document 1 opened');

  cy.log('Action: Upload PDF file');
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Verified: PDF file uploaded');

  cy.log('Action: Confirm PDF upload');
  PactveraMainPage.clickUploadConfirm();
  cy.log('Verified: PDF upload confirmed');

  cy.log('Action: Verify Add Participants section is displayed');
  PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
  cy.log('Verified: Add Participants section displayed');

  cy.log('Action: Select previous individual party');
  PactveraMainPage.selectPreviousIndividualParty();
  cy.log('Verified: Previous individual party selected');

  cy.log('Action: Click Continue');
  PactveraTemplatePage.clickContinue();
  cy.log('Verified: Continue clicked');

  cy.log('Action: Drag Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  cy.log('Verified: Signature field added to document');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Verified: Document added to request');

  cy.log('Action: Verify configured document actions for document 1');
  PactveraMainPage.verifyConfiguredDocumentActions(1);
  cy.log('Verified: Configured document actions displayed for document 1');

  cy.log('Action: Click Upload New for second document');
  PactveraMainPage.clickUploadNew(2);
  cy.log('Verified: Upload New for document 2 opened');

  cy.log('Action: Upload PDF file');
  PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
  cy.log('Verified: PDF file uploaded');

  cy.log('Action: Confirm PDF upload');
  PactveraMainPage.clickUploadConfirm();
  cy.log('Verified: PDF upload confirmed');

  cy.log('Action: Select Your Organization');
  PactveraMainPage.selectYourOrganization();
  cy.log('Verified: Your Organization selected');

  cy.log('Action: Get Organization Administrator name');
  PactveraMainPage.getOrganizationAdministratorName();
  cy.log('Verified: Organization Administrator name retrieved');

  cy.log('Action: Verify Authorized Signer button is displayed');
  PactveraMainPage.verifyAuthorizedSignerButton();
  cy.log('Verified: Authorized Signer button displayed');

  cy.log('Action: Click Authorized Signer button');
  PactveraMainPage.clickAuthorizedSignerButton();
  cy.log('Verified: Authorized Signer popup opened');

  cy.log('Action: Verify Select Signer popup is displayed');
  PactveraMainPage.verifySelectSignerPopup();
  cy.log('Verified: Select Signer popup displayed');

  cy.log('Action: Select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    PactveraMainPage.selectAuthorizedSigner(signerName);
  });
  cy.log('Verified: Authorized signer selected');

  cy.log('Action: Click Confirm Signer');
  PactveraMainPage.clickConfirmSigner();
  cy.log('Verified: Signer selection confirmed');

  cy.log('Action: Click Continue');
  PactveraTemplatePage.clickContinue();
  cy.log('Verified: Continue clicked');

  cy.log('Action: Drag Signature field onto document');
  PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
  cy.log('Verified: Signature field added to document');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Verified: Document added to request');

  cy.log('Action: Verify configured document actions for document 2');
  PactveraMainPage.verifyConfiguredDocumentActions(2);
  cy.log('Verified: Configured document actions displayed for document 2');

  cy.log('Action: Click Create Form');
  PactveraMainPage.clickCreateForm();
  cy.log('Verified: Create Form opened');

  cy.log('Action: Drag basic textfield onto Form');
  PactveraMainPage.dragBasicFieldToForm('textfield');
  cy.log('Verified: Basic textfield added to Form');

  cy.log('Action: Wait after dragging field to form');
  cy.wait(2000);
  cy.log('Verified: Wait completed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Select first party');
  PactveraMainPage.selectFirstParty();
  cy.log('Verified: First party selected');

  cy.log('Action: Click Authorized Signer button');
  PactveraMainPage.clickAuthorizedSignerButton();
  cy.log('Verified: Authorized Signer popup opened');

  cy.log('Action: Select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    PactveraMainPage.selectAuthorizedSigner(signerName);
  });
  cy.log('Verified: Authorized signer selected');

  cy.log('Action: Click Confirm Signer');
  PactveraMainPage.clickConfirmSigner();
  cy.log('Verified: Signer selection confirmed');

  cy.log('Action: Click Add to Request');
  PactveraMainPage.clickAddToRequest();
  cy.log('Verified: Form added to request');

  cy.log('Action: Verify configured Form actions');
  PactveraMainPage.verifyConfiguredFormActions();
  cy.log('Verified: Configured Form actions displayed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Verify Configure button is displayed');
  PactveraMainPage.verifyConfigureButtonDisplayed();
  cy.log('Verified: Configure button displayed');

  cy.log('Action: Click Configure button');
  PactveraMainPage.clickConfigureButton();
  cy.log('Verified: Configure button clicked');

  cy.log('Action: Verify Value Transfer popup is displayed');
  PactveraMainPage.verifyValueTransferPopupDisplayed();
  cy.log('Verified: Value Transfer popup displayed');

  cy.log('Action: Verify Consideration field is displayed');
  PactveraMainPage.verifyConsiderationFieldDisplayed();
  cy.log('Verified: Consideration field displayed');

  cy.log('Action: Verify Consideration field value');
  PactveraMainPage.verifyConsiderationFieldValue();
  cy.log('Verified: Consideration field value displayed');

  cy.log('Action: Select first VDT product');
  PactveraMainPage.selectNewlyCreatedProduct();
  cy.log('Verified: First VDT product selected');

  cy.log('Action: Verify Consideration Type dropdown');
  PactveraMainPage.verifyConsiderationTypeDropdown();
  cy.log('Verified: Consideration Type dropdown displayed');

  cy.log('Action: Verify Currency is displayed');
  PactveraMainPage.verifyCurrencyDisplayed();
  cy.log('Verified: Currency displayed');

  cy.log('Action: Click Value Transfer Continue button');
  PactveraMainPage.clickValueTransferContinueButton();
  cy.log('Verified: Value Transfer continued');

  cy.log('Action: Verify Step 4 is completed');
  PactveraMainPage.verifyStep4Completed();
  cy.log('Verified: Step 4 completed');

  cy.log('Action: Validate Value Transfer details');
  PactveraMainPage.validateValueTransferDetails();
  cy.log('Verified: Value Transfer details validated');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Enter Value Transfer amount');
  PactveraMainPage.enterValueTransferAmount(3);
  cy.log('Verified: Value Transfer amount entered');

  cy.log('Action: Validate Value Transfer allocation');
  PactveraMainPage.validateValueTransferAllocation(3);
  cy.log('Verified: Value Transfer allocation validated');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Send Payment section - all fields not empty');
  PactveraMainPage.verifySendPaymentFieldsFilled();
  cy.log('Verified: Send Payment fields are populated');

  cy.log('Action: Verify Who Receives Payment section - all fields not empty');
  PactveraMainPage.verifyReceivePaymentFieldsFilled();
  cy.log('Verified: Receive Payment fields are populated');

  cy.log('Action: Verify Allocation shows Fully Allocated');
  PactveraMainPage.verifyFullyAllocated();
  cy.log('Verified: Allocation is Fully Allocated');

  cy.log('Action: Open Payout Method dropdown');
  PactveraMainPage.openPayoutMethodDropdown();
  cy.log('Verified: Payout Method dropdown opened');

  cy.log('Action: Verify ACH, RTP, Wire options are visible');
  PactveraMainPage.verifyPayoutMethodOptionsVisible();
  cy.log('Verified: ACH, RTP, and Wire options displayed');

  cy.log('Action: Select RTP payment method');
  PactveraMainPage.selectPayoutMethod('RTP');
  cy.log('Verified: RTP payment method selected');

  cy.log('Action: Verify RTP is selected in Payout Method field');
  PactveraMainPage.verifyPayoutMethodSelected('RTP');
  cy.log('Verified: RTP selected in Payout Method field');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Verify Select Billing Address section is displayed');
  PactveraMainPage.verifyBillingAddressSectionDisplayed();
  cy.log('Verified: Billing Address section displayed');

  cy.log('Action: Verify Refresh button is visible');
  PactveraMainPage.verifyBillingAddressRefreshButtonVisible();
  cy.log('Verified: Billing Address refresh button displayed');

  cy.log('Action: Select first billing address');
  PactveraMainPage.selectFirstBillingAddress();
  cy.log('Verified: First billing address selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Always Required platform-enforced conditions displayed');
  PactveraMainPage.verifyAlwaysRequiredSectionDisplayed();
  cy.log('Verified: Always Required section displayed');

  cy.log('Action: Verify Manual Confirmation section displayed');
  PactveraMainPage.verifyManualConfirmationSectionDisplayed();
  cy.log('Verified: Manual Confirmation section displayed');

  cy.log('Action: Get sidebar party names');
  PactveraMainPage.getSidebarPartyNames();
  cy.log('Verified: Sidebar party names retrieved');

  cy.log('Action: Select confirmation party using stored sidebar parties');
  cy.get('@sidebarParties').then((parties) => {
    cy.log(`Action: Select confirmation party: ${parties[0].name}`);
    PactveraMainPage.selectConfirmationParty(parties[0].name);
  });
  cy.log('Verified: Confirmation party selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Cancel, Save as Draft, and Continue buttons are disabled');
  PactveraMainPage.verifyActionButtonsDisabled();
  cy.log('Verified: Cancel, Save as Draft, and Continue buttons disabled');

  cy.log('Action: Store organization administrator name');
  cy.wrap('MARISA BERNHEISER').as('organizationAdministratorName');
  cy.log('Verified: Organization administrator name stored');

  cy.log('Action: Verify and select authorized signer using stored organization administrator name');
  cy.get('@organizationAdministratorName').then((signerName) => {
    cy.log(`Action: Verify and select ${signerName} as authorized signer`);
    PactveraMainPage.verifyAndSelectAuthorizedSigner(signerName);
  });
  cy.log('Verified: Authorized signer verified and selected');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Edit icon is displayed');
  PactveraMainPage.verifyEditIconDisplayed();
  cy.log('Verified: Edit icon displayed');

  cy.log('Action: Verify Authority Verified banner is displayed');
  PactveraMainPage.verifyAuthorityVerifiedDisplayed();
  cy.log('Verified: Authority Verified banner displayed');

  cy.log('Action: Click Continue button');
  PactveraMainPage.clickContinueButton();
  cy.log('Verified: Continue button clicked');

  cy.log('Action: Verify Step 5 is completed');
  PactveraMainPage.verifyStep5Completed();
  cy.log('Verified: Step 5 completed');

  cy.log('Action: Verify complete Review page');
  PactveraMainPage.verifyCompleteReviewPage();
  cy.log('Verified: Complete Review page displayed');

  cy.log('Action: Click Send button and wait for agreement sent');
  PactveraMainPage.clickSendAndWaitForAgreementSent();
  cy.log('Verified: Agreement sent');

  cy.log('Action: Verify Agreement Sent screen displayed correctly');
  PactveraMainPage.verifyAgreementSentDisplayed();
  cy.log('Verified: Agreement Sent screen displayed');

  cy.log('Action: Verify Agreement Sent action buttons are displayed');
  PactveraMainPage.verifyAgreementSentButtonsDisplayed();
  cy.log('Verified: Agreement Sent action buttons displayed');

  cy.log('Verified: Test flow completed successfully');


   });
});
