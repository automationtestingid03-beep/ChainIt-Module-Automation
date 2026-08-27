import SwitchAccountModal from '../pages/SwitchAccountModal';
import MyTasksPage from '../pages/MyTasksPage';
import postLoginProfile from '../pages/PostLoginProfile';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const INDIVIDUAL_ACCOUNT = 'DEEPENDRA RAO';

describe('Post QR Login — Individual Account Dashboard', () => {

  it('Switches to personal account and verifies Profile page after manual QR scan', () => {

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


    // Step 5: Open Profile
    cy.log('Step 5: Opening Profile');

    postLoginProfile.clickProfileTab();

    cy.log('Profile page opened successfully');


    // Step 6: Verify Phone Number
    cy.log('Step 6: Verifying phone number');

    postLoginProfile.verifyPhoneNumber();

    cy.log('Phone number verified successfully');


    // Step 7: Verify Email
    cy.log('Step 7: Verifying email address');

    postLoginProfile.verifyEmail();

    cy.log('Email address verified successfully');


    // Step 8: Verify Address
    cy.log('Step 8: Verifying address');

    postLoginProfile.verifyAddress();

    cy.log('Address verified successfully');


    // Step 9: Verify Account Details
    cy.log('Step 9: Verifying account details');

    postLoginProfile.verifyAccountDetails();

    cy.log('Account details verified successfully');


    // Step 10: Verify Delete Button
    cy.log('Step 10: Verifying Delete Account button');

    postLoginProfile.verifyDeleteButton();

    cy.log('Delete Account button verified successfully');


    // Test Completed
    cy.log('Profile page verification test completed successfully');
  });

});