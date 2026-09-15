import SwitchAccountModal from '../pages/SwitchAccountModal';
import SidebarPage from '../pages/SidebarPage';

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
  it('TC01: Verify complete sidebar navigation', () => {
  cy.log('Action: Verify main sidebar'); 
  SidebarPage.verifyMainSidebar();

  cy.log('Action: Verify KYC submenu');
  SidebarPage.clickKYC().verifyKYCSubmenu();
  SidebarPage.clickKYC();

  cy.log('Action: Verify KYB submenu');
  SidebarPage.clickKYB().verifyKYBSubmenu();
  SidebarPage.clickKYB();

  cy.log('Action: Verify Pactvera submenu');
  SidebarPage.clickPactvera().verifyPactveraSubmenu();
  SidebarPage.clickPactvera();

  cy.log('Action: Verify Data Room submenu');
  SidebarPage.clickDataRoom().verifyDataRoomSubmenu();
  SidebarPage.clickDataRoom();

  cy.log('Action: Verify Administration submenu');
  SidebarPage.clickAdministration().verifyAdministrationSubmenu();
  SidebarPage.clickAdministration();

  cy.log('Action: Verify Configuration submenu');
  SidebarPage.clickConfiguration().verifyConfigurationSubmenu();
  SidebarPage.clickConfiguration();
  
  cy.log('VERIFIED: Complete sidebar navigation successfully');
    
  });
});