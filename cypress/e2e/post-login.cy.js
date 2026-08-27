import SwitchAccountModal from '../pages/SwitchAccountModal';
import MyTasksPage from '../pages/MyTasksPage';

/**
 * Post-Login Flow — Individual Account
 *
 * Prerequisites:
 *   - The tester must manually scan the QR code with their mobile device.
 *
 * Execution modes:
 *   - cypress open (headed)  → cy.pause() stops the test; scan QR; click Resume
 *   - cypress run (headless) → test waits up to 2 minutes for the URL to change
 */

const ADMIN_URL = 'https://develop-admin.chainit.online';
const INDIVIDUAL_ACCOUNT = 'DEEPENDRA RAO';

describe('Post QR Login — Individual Account Dashboard', () => {

  it('Switches to personal account and verifies My Tasks page after manual QR scan', () => {

    // Step 1: Visit QR Scan Page
    cy.log('Step 1: Opening QR Scan page');

    cy.visit(`${ADMIN_URL}/scan-qr`);

    cy.contains('Scan or Tap the QR Code Login')
      .should('be.visible');

    cy.log('QR Scan page is displayed successfully');


    // Step 2: Manual QR Scan
    cy.log('Step 2: Please scan the QR code using the mobile app');

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.log('QR scan process resumed');


    // Step 3: Wait for QR Login Redirect
    cy.log('Step 3: Waiting for QR login to complete');

    cy.url({ timeout: 120000 })
      .should('not.include', '/scan-qr');

    cy.log('QR login completed successfully');


    // Step 4: Switch Account
    cy.log('Step 4: Verifying Switch Account modal');

    SwitchAccountModal.verifyVisible();

    cy.log(`Selecting Individual Account: "${INDIVIDUAL_ACCOUNT}"`);

    SwitchAccountModal.clickIndividualAccount(INDIVIDUAL_ACCOUNT);

    cy.log(`Account "${INDIVIDUAL_ACCOUNT}" selected successfully`);


    // Step 5: Verify My Tasks Page
    cy.log('Step 5: Verifying My Tasks page heading');

    MyTasksPage.verifyPageHeading();

    cy.log('My Tasks page heading verified successfully');


    // Step 6: Verify User Identity and Header
    cy.log('Step 6: Verifying user identity');

    MyTasksPage.verifyUserIdentity();

    cy.log('User identity verified successfully');

    cy.log('Verifying Logout button');

    MyTasksPage.verifyLogoutButton();

    cy.log('Logout button verified successfully');


    // Step 7: Verify To-Do Tab
    cy.log('Step 7: Verifying To-Do tab is active by default');

    MyTasksPage.verifyToDoTabActive();

    cy.log('To-Do tab is active successfully');


    // Step 8: Verify Task List
    cy.log('Step 8: Verifying Start Task buttons');

    MyTasksPage.verifyStartTaskButtons();

    cy.log('Start Task buttons verified successfully');


    // Step 9: Verify Completed Tab
    cy.log('Step 9: Opening Completed tab');

    MyTasksPage.clickCompletedTab();

    cy.log('Completed tab clicked successfully');

    MyTasksPage.verifyCompletedTabActive();

    cy.log('Completed tab is active successfully');


    // Step 10: Verify Sidebar Navigation
    cy.log('Step 10: Verifying sidebar navigation links');

    MyTasksPage.verifySidebarLinks();

    cy.log('Sidebar navigation links verified successfully');


    // Test Completed
    cy.log('My Tasks page verification test completed successfully');
  });

});