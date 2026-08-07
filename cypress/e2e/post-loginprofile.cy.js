import SwitchAccountModal from '../pages/SwitchAccountModal';
import MyTasksPage from '../pages/MyTasksPage';
import postloginProfile from '../pages/PostloginProfile';

const ADMIN_URL = 'https://develop-admin.chainit.online';

describe('Post QR Login — Individual Account Dashboard', () => {
  it('switches to personal account and verifies My Tasks page after manual QR scan', () => {

    // ── Step 1: Visit QR scan page ──────────────────────────────────────────
    cy.visit(`${ADMIN_URL}/scan-qr`);
    cy.contains('Scan or Tap the QR Code Login').should('be.visible');

    // ── Step 2: Pause for manual QR scan ───────────────────────────────────
    cy.log('⏸  Please scan the QR code with your mobile app, then resume the test');

    // In headed mode (cypress open): shows the ▶ Resume button in Cypress UI
    // In headless mode (cypress run): cy.pause() is a no-op — wait below handles it
    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    // ── Step 3: Wait for app to process the scan and redirect ───────────────
    cy.url({ timeout: 120000 }).should('not.include', '/scan-qr');

    // ── Step 4: Handle Switch Account modal — choose Individual ─────────────
    SwitchAccountModal.verifyVisible();
    SwitchAccountModal.clickIndividualAccount();

    //click profile 
    postloginProfile.clickProfileTab();

    postloginProfile.verifyphonenumber();
    postloginProfile.verifyemail();
    postloginProfile.verifyaddress();
    postloginProfile.verifyaccountdetails();
    postloginProfile.verifydeletebtn();

   });
});
