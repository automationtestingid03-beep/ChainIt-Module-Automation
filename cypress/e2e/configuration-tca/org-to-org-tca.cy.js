import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import AdministrationPage from '../../pages/AdministrationPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';

const ADMIN_URL = 'https://develop-admin.chainit.online';

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
    cy.log('Action: Opening Administration');
    AdministrationPage.clickAdministrationButton();
   AdministrationPage.clickAdministrationButton();
    cy.log('Action: Opening Configuration'); 
    ConfigurationPage.clickConfigurationsButton();
  
    cy.log('Action: Opening TCA Templates');
    ConfigurationPage.clickTCAButton();
    TCATemplatePage.verifyPageLoaded();
    cy.log('TCA Templates page opened successfully');

      cy.log('Action: Click Create Workflow');
      TCATemplatePage.clickCreateWorkflow();
    
      cy.log('Action: Verify TCA workflow page is loaded');
      TCATemplatePage.verifyTCALoaded();

     cy.log('Action: Enter Workflow Template Name and Description');
      TCATemplatePage.createUniqueWorkflowTemplate();
    
      cy.log('Action: Add Buyer and Seller roles');
      TCATemplatePage.addBuyerAndSellerRoles();
    
      cy.log('Action: Verify Continue button is enabled');
      TCATemplatePage.verifyContinueButtonEnabled();
    
  });
});