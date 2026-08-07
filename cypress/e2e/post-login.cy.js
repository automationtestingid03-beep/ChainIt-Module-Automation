import SwitchAccountModal from '../pages/SwitchAccountModal';
import MyTasksPage from '../pages/MyTasksPage';

/**
 * Post-Login Flow — Individual Account
 *
 * Prerequisites:
 *   - The tester must manually scan the QR code with their mobile device.
 *
 * Execution modes:
 *   - cypress open (headed)  → cy.pause() stops the test; scan QR; click ▶ Resume
 *   - cypress run (headless) → test waits up to 2 minutes for the URL to change
 */

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

    // ── Step 5: Verify My Tasks page loaded (heading instead of URL — URL
    //            contains a UUID which makes it unreliable for assertions) ──
    MyTasksPage.verifyPageHeading();

    // ── Step 6: Verify user identity & header ──────────────────────────────
    MyTasksPage.verifyUserIdentity();
    MyTasksPage.verifyLogoutButton();

    // ── Step 7: Verify To-Do tab is shown by default ───────────────────────
    MyTasksPage.verifyToDoTabActive();

    // ── Step 8: Verify task list ────────────────────────────────────────────
    MyTasksPage.verifyStartTaskButtons();

    // ── Step 9: Switch to Completed tab and verify it activates ─────────────
    MyTasksPage.clickCompletedTab();
    MyTasksPage.verifyCompletedTabActive();

    // ── Step 10: Verify all sidebar navigation links are visible ─────────────
    MyTasksPage.verifySidebarLinks();
  });
});
