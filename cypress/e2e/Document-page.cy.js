import SwitchAccountModal from '../pages/SwitchAccountModal';
import ConfigurationPage from '../pages/ConfigurationPage';
import DocumentPage from '../pages/DocumentPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';

describe('Post QR Login — Individual Account Dashboard', () => {

  it('Create unique folder', () => {

    // Generate unique folder name
    const folderNumber = Date.now();
    const folderName = `Test Folder ${folderNumber}`;

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

    SwitchAccountModal.clickIndividualAccount();

    cy.log('Individual Account selected successfully');


    // Step 5: Open Configuration
    cy.log('Step 5: Opening Configuration');

    ConfigurationPage.clickConfigurationButton();

    cy.log('Configuration page opened successfully');


    // Step 6: Open Documents
    cy.log('Step 6: Opening Documents');

    ConfigurationPage.clickDocumentButton();

    cy.log('Documents page opened successfully');


    // Step 7: Create New Folder
    cy.log('Step 7: Creating a new folder');

    DocumentPage.clickNewFolderButton();

    cy.log('New Folder button clicked successfully');


    // Step 8: Enter Folder Name
    cy.log(`Step 8: Entering folder name: "${folderName}"`);

    DocumentPage.enterFolderName(folderName);

    cy.log(`Folder name "${folderName}" entered successfully`);


    // Step 9: Create Folder
    cy.log('Step 9: Creating folder');

    DocumentPage.clickCreateFolderButton();

    cy.log(`Folder "${folderName}" created successfully`);


    // Test Completed
    cy.log('Test completed successfully');
  });

});