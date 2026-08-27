import SwitchAccountModal from '../pages/SwitchAccountModal';
import SubscriptionPage from '../pages/SubscriptionPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const INDIVIDUAL_ACCOUNT = 'DEEPENDRA RAO';

describe('Post QR Login — Individual Account Dashboard', () => {

  it('Add funds using card payment', () => {

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


    // Step 3: Wait for QR Login and Redirect
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


    // Step 5: Open Subscription
    cy.log('Step 5: Opening Subscription');

    SubscriptionPage.clickSubscription();

    cy.log('Subscription page opened successfully');


    // Step 6: Click Add Funds
    cy.log('Step 6: Opening Add Funds');

    SubscriptionPage.clickAddFundsButton();

    cy.log('Add Funds button clicked successfully');


    // Step 7: Enter Amount
    cy.log('Step 7: Entering amount');

    SubscriptionPage.enterAmount(1);

    cy.log('Amount entered successfully');


    // Step 8: Select Checkbox
    cy.log('Step 8: Selecting required checkbox');

    SubscriptionPage.checkCheckbox();

    cy.log('Required checkbox selected successfully');


    // Step 9: Continue to Payment
    cy.log('Step 9: Continuing to payment');

    SubscriptionPage.clickAddFundsButton();

    cy.log('Payment details section opened successfully');


    // Step 10: Enter Payment Details
    cy.log('Step 10: Entering payment details');

    SubscriptionPage.fillPaymentDetails({
      name: 'John Doe',
      cardNumber: '4242424242424242',
      expMonth: '08',
      expYear: '26',
      cvv: '123',
      zipCode: '10001'
    });

    cy.log('Payment details entered successfully');


    // Step 11: Store Card
    cy.log('Step 11: Selecting Store Card option');

    SubscriptionPage.checkStoreCard();

    cy.log('Store Card option selected successfully');


    // Step 12: Pay
    cy.log('Step 12: Clicking Pay button');

    SubscriptionPage.clickPayButton();

    cy.log('Pay button clicked successfully');


    // Test Completed
    cy.log('Add funds payment test completed successfully');
  });

});