import SwitchAccountModal from '../pages/SwitchAccountModal';
import SharingPage from '../pages/SharingPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const INDIVIDUAL_ACCOUNT = 'DEEPENDRA RAO';

describe('Post QR Login — Individual Account Dashboard', () => {

  it('Switches to personal account and verifies Sharing Center pages after manual QR scan', () => {

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


    // Step 5: Open Sharing Center
    cy.log('Step 5: Opening Sharing Center');

    SharingPage.clickSharingCenterButton();

    cy.log('Sharing Center opened successfully');


    // Step 6: Open Links Tab
    cy.log('Step 6: Opening Links tab');

    SharingPage.clickLinksTab();

    cy.log('Links tab opened successfully');


    // Step 7: Verify Links Tab
    cy.log('Step 7: Verifying Links tab');

    SharingPage.verifyLinksTab();

    cy.log('Links tab verified successfully');


    // Step 8: Open Access Log
    cy.log('Step 8: Opening Access Log');

    SharingPage.clickAccessLog();

    cy.log('Access Log opened successfully');


    // Step 9: Verify Access Log
    cy.log('Step 9: Verifying Access Log');

    SharingPage.verifyAccessLog();

    cy.log('Access Log verified successfully');


    // Step 10: Open Recently Viewed
    cy.log('Step 10: Opening Recently Viewed');

    SharingPage.clickRecentlyViewed();

    cy.log('Recently Viewed opened successfully');


    // Step 11: Verify Recently Viewed
    cy.log('Step 11: Verifying Recently Viewed');

    SharingPage.verifyRecentlyViewed();

    cy.log('Recently Viewed verified successfully');


    // Test Completed
    cy.log('Sharing Center verification test completed successfully');
  });

});