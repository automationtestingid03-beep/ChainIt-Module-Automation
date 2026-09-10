import SwitchAccountModal from '../../pages/SwitchAccountModal';
import AdministrationPage from '../../pages/AdministrationPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';
import SidebarPage from '../../pages/SidebarPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const workFlowTest = 'cypress/fixtures/tca_workflow_test.json';
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

  cy.log('Action:Verify search field, Create Product button, Product table, Product table column and record are displayed')
  ProductPage.verifyAllProductPageElements();

  cy.wait(2000);
  cy.log('Action: Capture all existing product names before creation');
  ProductPage.captureProductNamesBeforeCreation();

  cy.log('Action: Click Create Product');
  ProductPage.clickCreateProduct();

  cy.log('Action: Please scan the QR code using the mobile app');
    if (Cypress.config('isInteractive')) {
      cy.pause();
    }
  cy.log('QR scan process resumed');

  cy.log('Action: Find newly created product');
  ProductPage.findNewProductAfterCreation();

  cy.log('Action: Opening Administration');
  SidebarPage.clickAdministration();
  
  cy.log('Action: Opening Configuration'); 
  SidebarPage.clickConfiguration();
   
  cy.log('Action: Opening TCA Templates');
  SidebarPage.clickTCATemplates();
  TCATemplatePage.verifyPageLoaded();
  cy.log('TCA Templates page opened successfully');
   
  cy.log('Action: Verify Pactvera transaction workflows table columns');
  TCATemplatePage.verifyPactveratransactionColumns();
   
  cy.log('Action: Click Create Workflow');
  TCATemplatePage.clickCreateWorkflow();
   
  cy.log('Action: Verify TCA workflow page is loaded');
  TCATemplatePage.verifyTCALoaded();
   
  cy.log('Action: Verify Cancel button');
  TCATemplatePage.verifyCancelButtonDisplayed();

  cy.log('Action: Continue to Workflow Builder with mandatory fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();

  cy.log('Action: Verify Workflow Template Name required validation');
  TCATemplatePage.verifyWorkflowTemplateNameRequiredError();

  cy.log('Action: Enter Workflow Template Name and Description');
  TCATemplatePage.createUniqueWorkflowTemplate();

  cy.log('Action: Continue to Workflow Builder with Role fields empty');
  TCATemplatePage.clickContinueToWorkflowBuilder();

  cy.log('Action: Verify Role 1 Name required validation');
  TCATemplatePage.verifyRoleNameRequiredError();

  cy.log('Action: Add Buyer and Seller roles');
  TCATemplatePage.addBuyerAndSellerRoles();

  cy.log('Action: Verify Continue button is enabled');
  TCATemplatePage.verifyContinueButtonEnabled();
   
  cy.log('Action: Continue to Workflow Builder');
  TCATemplatePage.clickContinueToWorkflowBuilder();
  cy.wait(10000);
   
  cy.log('Action: Import workflow JSON');
  TCATemplatePage.clickImportJson();
  TCATemplatePage.uploadWorkflowJson(workFlowTest);
   
  cy.log('Action: Continue from Workflow Builder');
  TCATemplatePage.clickContinue();
  cy.log('Workflow Builder completed successfully');
   
  cy.log('Action: Click on Publish WorkFlow');
  TCATemplatePage.clickPublishWorkFlow();
  cy.log('Publish WorkFlow button clicked successfully');
   
  cy.log('Action: Verify template publish success message');
  TCATemplatePage.verifyPublishSuccessMessage();  

   });
});
