import SwitchAccountModal from '../pages/SwitchAccountModal';
import ConfigurationPage from '../pages/ConfigurationPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';


describe('Post QR Login — Individual Account Dashboard', () => {

  it('Enter amount details', () => {

    //  Step 1: Visit QR scan page
    cy.log(' Step 1: Opening QR Scan page');

    cy.visit(`${ADMIN_URL}/scan-qr`);

    cy.contains('Scan or Tap the QR Code Login')
      .should('be.visible');

    cy.log(' QR Scan page is displayed successfully');


    //  Step 2: Manual QR scan 
    cy.log(' Step 2: Please scan the QR code using the mobile app');

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.log(' QR scan process resumed');


    //  Step 3: Wait for QR login and redirect 
    cy.log(' Step 3: Waiting for QR login to complete and redirect');

    cy.url({ timeout: 120000 })
      .should('not.include', '/scan-qr');

    cy.log(' QR login completed successfully');
    cy.log(' User has been redirected from the QR Scan page');


    //  Step 4: Switch to Individual Account 
    cy.log(' Step 4: Opening Switch Account modal');

    SwitchAccountModal.verifyVisible();

    cy.log(` Selecting Individual Account: ${INDIVIDUAL_ACCOUNT}`);

    SwitchAccountModal.clickIndividualAccount(INDIVIDUAL_ACCOUNT);

    cy.log(` Individual Account "${INDIVIDUAL_ACCOUNT}" selected successfully`);


    //  Step 5: Configuration 
    cy.log(' Step 5: Opening Configuration');

    ConfigurationPage.clickConfigurationButton();

    cy.log(' Configuration button clicked');


    // Step 6: Pactvera 
    cy.log(' Step 6: Opening Pactvera');

    ConfigurationPage.clickPactveraButton();
    ConfigurationPage.verifyPactveraPage();

    cy.log(' Pactvera page verified successfully');


    //  Step 7: Documents 
    cy.log(' Step 7: Opening Documents');

    ConfigurationPage.clickDocumentButton();
    ConfigurationPage.verifyDocumentPage();

    cy.log(' Document page verified successfully');


    // Step 8: Forms 
    cy.log(' Step 8: Opening Forms');

    ConfigurationPage.clickFormButton();
    ConfigurationPage.verifyFormPage();

    cy.log(' Form page verified successfully');


    // Test completed 
    cy.log(' Test completed successfully');
  });

});