import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import AdministrationPage from '../../pages/AdministrationPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';
import SidebarPage from '../../pages/SidebarPage';
import PactveraMainPage from '../../pages/pactvera/PactveraMainPage';

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