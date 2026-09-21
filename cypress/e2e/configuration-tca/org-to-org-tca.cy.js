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


    it.only('TC01: Verify complete sidebar navigation', () => {
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
    PactveraMainPage.clickPactveraAgreement();
    cy.log('Action: Pactvera Transaction option selected successfully');


    cy.log('Action: Click Continue button');
    PactveraMainPage.clickContinueButton();
    cy.log('Action: Continue button clicked successfully');

    cy.log('Action: Verify Create a Pactvera and Select a Template options are displayed');
    PactveraMainPage.verifyContinueDropdownOptionsDisplayed();
    cy.log('Action: Create a Pactvera and Select a Template options verified as displayed');

    cy.log('Action: Click Create a Pactvera option');
    PactveraMainPage.clickCreatePactveraFromScratch();
    cy.log('Action: Create a Pactvera option clicked successfully — proceeding with scratch flow');

    cy.log('Action: Verify Agreement Type step is displayed');
    PactveraMainPage.verifyAgreementTypeStep();
    cy.log('Action: Agreement Type step verified as displayed');

    cy.log('Action: Verify all 4 workflow steps are displayed');
    PactveraMainPage.verifyAllFourStepsDisplayed();
    cy.log('Action: All 4 workflow steps verified as displayed');
    
    cy.log('Action: Verify Step 1 is active');
    PactveraMainPage.verifyStep1Active();
    cy.log('Action: Step 1 verified as active');

    cy.log('Action: Verify Continue button is disabled without agreement name');
    PactveraMainPage.verifyContinueButtonDisplayedAndDisabled();
    cy.log('Action: Continue button verified as disabled without agreement name');

    cy.log('Action: Enter unique agreement name');
    PactveraMainPage.enterUniqueAgreementName();
    cy.log('Action: Unique agreement name entered successfully');

    cy.log('Action: Continue to agreement Type');
    PactveraMainPage.clickContinueButton();
    cy.log('Action: Continued to agreement Type successfully');

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

    cy.log('Action: Verify all display elements on Parties page - buttons, text, headers');
    PactveraMainPage.verifyAllPartiesPageElements();
    cy.log('Action: All display elements on Parties page verified successfully');

    cy.log('Action: Click Select from Connections button');
    PactveraMainPage.clickSelectFromConnections();
    cy.log('Action: Select from Connections button clicked successfully');

    cy.log('Action: Verify Select from Connections popup is displayed');
    PactveraMainPage.verifySelectFromConnectionsPopup();
    cy.log('Action: Select from Connections popup verified as displayed');
  
    cy.log('Action: Select individual connection');
    PactveraMainPage.selectIndivualConnection();
    cy.log('Action: Individual connection selected successfully');

    cy.log('Action: Check all checkboxes');
    PactveraMainPage.checkAllCheckboxes();
    cy.log('Action: All checkboxes checked successfully');

    cy.log('Action: Click Next button to proceed to next wizard step');
    PactveraMainPage.clickNextButton();
    cy.log('Action: Next button clicked successfully — proceeded to next step');

    cy.log('Action: Click Next button to proceed to next wizard step');
    PactveraMainPage.clickNextButton();
    cy.log('Action: Next button clicked successfully — proceeded to next step');

    cy.log('Action: Click Send button to proceed to next wizard step');
    PactveraMainPage.clickSend();
    cy.log('Action: Send button clicked successfully — proceeded to next step');

    cy.log('Action: Verify "Please attach documents or forms" error is displayed');
    PactveraMainPage.verifyAttachDocumentsErrorDisplayed();
    cy.log('Action: Error verified as displayed successfully');

    cy.log('Action: Navigate back to Documents step');
    PactveraMainPage.navigateToDocumentsStep();
    cy.log('Action: Navigated to Documents step successfully');

    cy.log('Action: Adding document');
    PactveraTemplatePage.clickAddDocumentForAgreement();
 
    cy.log('Action: Verifying Add Document popup');
    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();
 
    cy.log('Action: Selecting Upload New');
    PactveraTemplatePage.clickUploadNew();
 
    cy.log('Action: Uploading PDF');
    PactveraTemplatePage.uploadPdfFile(TCAFlowDocument_PDF);
 
    cy.log('Action: Confirming PDF upload');
    PactveraTemplatePage.clickUploadConfirm();
 
    cy.log('Action: Verifying Add Participants section');
    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();

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
 
    cy.log('Action: Clicking Continue');
    PactveraTemplatePage.clickContinue();
 
    cy.log('Action: Drag Signature field onto document');
    PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
    cy.log('Action: Signature field dragged onto document successfully');

    cy.log('Action: Click Add to Request');
    PactveraMainPage.clickAddToRequest();
    cy.log('Action: Add to Request clicked successfully'); 

    cy.log('Action: Adding form');
    PactveraTemplatePage.clickAddForm();
 
    cy.log('Action: Creating a new form from the form builder');
    PactveraTemplatePage.clickCreateNewForm();   

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
    
     cy.log('Action: Click Next button to proceed to next wizard step');
     PactveraMainPage.clickNextButton();
     cy.log('Action: Next button clicked successfully — proceeded to next step');



    cy.pause();







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