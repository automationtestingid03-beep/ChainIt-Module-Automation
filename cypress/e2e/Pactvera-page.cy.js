import SwitchAccountModal from '../pages/SwitchAccountModal';
import ConfigurationPage from '../pages/ConfigurationPage';
import PactveraPage from '../pages/PactveraPage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const INDIVIDUAL_ACCOUNT = 'DEEPENDRA RAO';

describe('Post QR Login — Individual Account Dashboard', () => {

  beforeEach(() => {

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


    // Step 5: Open Configuration
    cy.log('Step 5: Opening Configuration');

    ConfigurationPage.clickConfigurationButton();

    cy.log('Configuration page opened successfully');


    // Step 6: Intercept Pactvera API
    cy.log('Step 6: Setting up Pactvera templates API interception');

    cy.intercept(
      'GET',
      '**/documents/v1/pactvera/templates/search**'
    ).as('getTemplates');

    cy.log('Pactvera templates API interception configured');
  });


  // Test 1: Create Pactvera Template
  it('Create Pactvera Template', () => {

    cy.log('Step 1: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.log('Pactvera Templates page opened');


    cy.log('Step 2: Waiting for Pactvera templates API response');

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera templates API response received successfully');


    cy.log('Step 3: Verifying Pactvera page');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page verified successfully');


    cy.log('Step 4: Clicking Create New button');

    PactveraPage.clickCreateNewButton();

    cy.log('Create New button clicked successfully');


    cy.log('Step 5: Entering template title');

    PactveraPage.enterTitleText('Test Title');

    cy.log('Template title entered successfully');


    cy.log('Step 6: Creating template');

    PactveraPage.clickCreateButton();

    cy.log('Create button clicked successfully');


    cy.log('Step 7: Entering template description');

    PactveraPage.enterDescriptionText('Test Description');

    cy.log('Template description entered successfully');


    cy.log('Step 8: Saving template');

    PactveraPage.clickSaveButton();

    cy.log('Pactvera template saved successfully');


    cy.log('Create Pactvera Template test completed successfully');
  });


  // Test 2: Check Cancel Button
  it('Check cancel button works', () => {

    cy.log('Step 1: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.log('Pactvera Templates page opened');


    cy.log('Step 2: Waiting for Pactvera templates API response');

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera templates API response received successfully');


    cy.log('Step 3: Verifying Pactvera page');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page verified successfully');


    cy.log('Step 4: Clicking Create New button');

    PactveraPage.clickCreateNewButton();

    cy.log('Create New button clicked successfully');


    cy.log('Step 5: Clicking Cancel button');

    PactveraPage.clickCancelButton();

    cy.log('Cancel button clicked successfully');


    cy.log('Step 6: Verifying Pactvera page after cancellation');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page displayed successfully after cancellation');


    cy.log('Check cancel button test completed successfully');
  });


  // Test 3: Check Error Message
  it('Check error message', () => {

    cy.log('Step 1: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.log('Pactvera Templates page opened');


    cy.log('Step 2: Waiting for Pactvera templates API response');

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera templates API response received successfully');


    cy.log('Step 3: Verifying Pactvera page');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page verified successfully');


    cy.log('Step 4: Clicking Create New button');

    PactveraPage.clickCreateNewButton();

    cy.log('Create New button clicked successfully');


    cy.log('Step 5: Clicking Create button without entering required details');

    PactveraPage.clickCreateButton();

    cy.log('Create button clicked successfully');


    cy.log('Step 6: Verifying error message');

    PactveraPage.verifyErrorMessage();

    cy.log('Error message verified successfully');


    cy.log('Check error message test completed successfully');
  });


  // Test 4: Check Delete Button
  it('Check delete button works', () => {

    cy.log('Step 1: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.log('Pactvera Templates page opened');


    cy.log('Step 2: Waiting for Pactvera templates API response');

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera templates API response received successfully');


    cy.log('Step 3: Verifying Pactvera page');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page verified successfully');


    cy.log('Step 4: Opening template menu');

    PactveraPage.clickThreeDotMenu();

    cy.log('Template menu opened successfully');


    cy.log('Step 5: Clicking Delete button');

    PactveraPage.clickDeleteButton();

    cy.log('Delete button clicked successfully');


    cy.log('Step 6: Confirming delete action');

    PactveraPage.clickDeleteButtonPopup();

    cy.log('Delete action confirmed successfully');


    cy.log('Step 7: Verifying delete confirmation message');

    PactveraPage.verifyDeleteMessage();

    cy.log('Delete confirmation message verified successfully');


    cy.log('Check delete button test completed successfully');
  });


  // Test 5: Create Pactvera Template Using Add File
  it('Create Pactvera Template Using Add File', () => {

    cy.log('Step 1: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.log('Pactvera Templates page opened');


    cy.log('Step 2: Waiting for Pactvera templates API response');

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera templates API response received successfully');


    cy.log('Step 3: Verifying Pactvera page');

    PactveraPage.verifyPactveraText();

    cy.log('Pactvera page verified successfully');


    cy.log('Step 4: Clicking Create New button');

    PactveraPage.clickCreateNewButton();

    cy.log('Create New button clicked successfully');


    cy.log('Step 5: Entering template title');

    PactveraPage.enterTitleText('Test Title');

    cy.log('Template title entered successfully');


    cy.log('Step 6: Creating template');

    PactveraPage.clickCreateButton();

    cy.log('Create button clicked successfully');


    cy.log('Step 7: Entering template description');

    PactveraPage.enterDescriptionText('Test Description');

    cy.log('Template description entered successfully');


    cy.log('Step 8: Opening Document section');

    PactveraPage.clickDocumentButton();

    cy.log('Document section opened successfully');


    cy.log('Step 9: Clicking Upload New button');

    PactveraPage.clickUploadNewButton();

    cy.log('Upload New button clicked successfully');


    cy.log('Step 10: Adding file');

    PactveraPage.addFile();

    cy.log('File added successfully');


    cy.log('Step 11: Uploading file');

    PactveraPage.clickUploadButton();

    cy.log('File uploaded successfully');


    cy.log('Create Pactvera Template Using Add File test completed successfully');
  });

});