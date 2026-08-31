import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const DUMMY_PDF = 'cypress/fixtures/gaurav.pdf';

function generateUniqueTitle(prefix) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `${prefix}_${timestamp}_${randomSuffix}`;
}

describe('Configuration - Pactvera Templates', () => {

  beforeEach(() => {

    // Step 1: Open QR Scan page
    cy.log('Step 1: Opening QR Scan page');

    cy.visit(`${ADMIN_URL}/scan-qr`);

    cy.contains('Scan or Tap the QR Code Login')
      .should('be.visible');

    cy.log('QR Scan page is displayed successfully');


    // Step 2: Manual QR scan
    cy.log(
      'Step 2: Please scan the QR code using the mobile app'
    );

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.log('QR scan process resumed');


    // Step 3: Wait for login
    cy.log('Step 3: Waiting for QR login to complete');

    cy.url({ timeout: 120000 })
      .should('not.include', '/scan-qr');

    cy.log('QR login completed successfully');


    // Step 4: Switch account
    cy.log('Step 4: Verifying Switch Account modal');

    SwitchAccountModal.verifyVisible();

    SwitchAccountModal.clickIndividualAccount();

    cy.log('Individual account selected successfully');


    // Step 5: Open Configuration
    cy.log('Step 5: Opening Configuration');

    ConfigurationPage.clickConfigurationButton();

    cy.log('Configuration page opened successfully');


    // Step 6: Intercept Pactvera API
    cy.intercept(
      'GET',
      '**/documents/v1/pactvera/templates/search**'
    ).as('getTemplates');

  });


  // =========================================================
  // TC01 - Open Pactvera Templates
  // =========================================================

  it('TC01: should open Pactvera Templates page', () => {

    cy.log('Step 7: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Pactvera Templates API returned 200');

    PactveraTemplatePage.verifyPageLoaded();

    cy.log('Pactvera Templates page verified successfully');

  });


  // =========================================================
  // TC02 - No Document / No Form
  // =========================================================

  it('TC02: should create Pactvera template without document and form', () => {

    const title = generateUniqueTitle(
      'Automation Pactvera Template'
    );

    const description =
      'This is a generated Pactvera template for Cypress automation';


    cy.log('================================================');
    cy.log(`TC02 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Step 7: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Step 8: Clicking Create New');

    PactveraTemplatePage.clickCreateNewButton();


    cy.log(`Step 9: Entering template title: ${title}`);

    PactveraTemplatePage.enterTitle(title);


    cy.log('Step 10: Creating Pactvera template');

    PactveraTemplatePage.clickCreate();


    cy.log(`Step 11: Verifying title: ${title}`);

    PactveraTemplatePage.verifyTitleDisplayed(title);


    cy.log('Step 12: Entering description');

    PactveraTemplatePage.enterDescription(description);


    cy.log('Step 13: Saving template');

    PactveraTemplatePage.clickSave();


    cy.log('Step 14: Verifying template list');

    PactveraTemplatePage.verifyPageLoaded();

    PactveraTemplatePage.searchTemplate(title);

    PactveraTemplatePage.verifyTemplateInList(title);


    cy.log(`TC02 completed successfully: ${title}`);

  });


  // =========================================================
  // TC03 - One Document
  // =========================================================

  it('TC03: should create Pactvera template with one document', () => {

    const title = generateUniqueTitle(
      'Automation_With_Document'
    );


    cy.log('================================================');
    cy.log(`TC03 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Step 7: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Step 8: Creating new Pactvera template');

    PactveraTemplatePage.clickCreateNewButton();

    PactveraTemplatePage.enterTitle(title);

    PactveraTemplatePage.clickCreate();


    cy.log('Step 9: Adding document');

    PactveraTemplatePage.clickAddDocument();


    cy.log('Step 10: Verifying Add Document popup');

    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();


    cy.log('Step 11: Selecting Upload New');

    PactveraTemplatePage.clickUploadNew();


    cy.log('Step 12: Uploading PDF');

    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);


    cy.log('Step 13: Confirming PDF upload');

    PactveraTemplatePage.clickUploadConfirm();


    cy.log('Step 14: Verifying Add Participants section');

    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();


    cy.log('Step 15: Clicking Continue');

    PactveraTemplatePage.clickContinue();


    cy.log('Step 16: Verifying Add Fields page');

    PactveraTemplatePage.verifyAddFieldsPageDisplayed();


    cy.log('Step 17: Verifying available fields');

    PactveraTemplatePage.verifyAllFieldsVisible();


    cy.log('Step 18: Dragging Signature field onto document');

    PactveraTemplatePage.dragFieldToCanvas(
      PactveraTemplatePage.signatureField
    );


    cy.log('Step 19: Verifying Signature field');

    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();


    cy.log('Step 20: Saving document configuration');

    PactveraTemplatePage.clickSaveTemplate();


    cy.log('Step 21: Verifying document configuration saved');

    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();


    cy.log('Step 22: Verifying document exists');

    PactveraTemplatePage.verifyDocumentAddedInSummary('gaurav');


    cy.log('Step 23: Saving Pactvera template');

    PactveraTemplatePage.clickSave();


    cy.log('Step 24: Verifying Pactvera Templates page');

    PactveraTemplatePage.verifyPageLoaded();

    PactveraTemplatePage.searchTemplate(title);

    PactveraTemplatePage.verifyTemplateInList(title);


    cy.log(`TC03 completed successfully: ${title}`);

  });


  // =========================================================
  // TC04 - One Form
  // =========================================================

  it('TC04: should create Pactvera template with one form', () => {

    const title = generateUniqueTitle(
      'Automation_With_Form'
    );


    cy.log('================================================');
    cy.log(`TC04 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Step 7: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Step 8: Creating new Pactvera template');

    PactveraTemplatePage.clickCreateNewButton();

    PactveraTemplatePage.enterTitle(title);

    PactveraTemplatePage.clickCreate();


    cy.log('Step 9: Adding form');

    PactveraTemplatePage.clickAddForm();


    cy.log('Step 10: Selecting Upload New');

    PactveraTemplatePage.clickUploadNew();


    cy.log('Step 11: Uploading form PDF');

    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);


    cy.log('Step 12: Confirming form upload');

    PactveraTemplatePage.clickUploadConfirm();


    cy.log('Step 13: Clicking Continue');

    PactveraTemplatePage.clickContinue();


    cy.log('Step 14: Verifying Add Fields page');

    PactveraTemplatePage.verifyAddFieldsPageDisplayed();


    cy.log('Step 15: Verifying available fields');

    PactveraTemplatePage.verifyAllFieldsVisible();


    cy.log('Step 16: Dragging Name field onto form');

    PactveraTemplatePage.dragFieldToCanvas(
      PactveraTemplatePage.nameField
    );


    cy.log('Step 17: Saving form configuration');

    PactveraTemplatePage.clickSaveTemplate();


    cy.log('Step 18: Verifying form configuration saved');

    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();


    cy.log('Step 19: Saving Pactvera template');

    PactveraTemplatePage.clickSave();


    cy.log('Step 20: Verifying Pactvera Templates page');

    PactveraTemplatePage.verifyPageLoaded();

    PactveraTemplatePage.searchTemplate(title);

    PactveraTemplatePage.verifyTemplateInList(title);


    cy.log(`TC04 completed successfully: ${title}`);

  });


  // =========================================================
  // TC05 - Document + Form
  // =========================================================

  it('TC05: should create Pactvera template with document and form', () => {

    const title = generateUniqueTitle(
      'Automation_With_Document_And_Form'
    );


    cy.log('================================================');
    cy.log(`TC05 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Step 7: Opening Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Step 8: Creating new Pactvera template');

    PactveraTemplatePage.clickCreateNewButton();

    PactveraTemplatePage.enterTitle(title);

    PactveraTemplatePage.clickCreate();


    // ---------------------------------------------------------
    // Document
    // ---------------------------------------------------------

    cy.log('Step 9: Adding document');

    PactveraTemplatePage.clickAddDocument();

    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();

    PactveraTemplatePage.clickUploadNew();

    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);

    PactveraTemplatePage.clickUploadConfirm();


    cy.log('Step 10: Continuing document configuration');

    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();

    PactveraTemplatePage.clickContinue();


    cy.log('Step 11: Adding Signature field to document');

    PactveraTemplatePage.verifyAddFieldsPageDisplayed();

    PactveraTemplatePage.dragFieldToCanvas(
      PactveraTemplatePage.signatureField
    );

    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();


    cy.log('Step 12: Saving document configuration');

    PactveraTemplatePage.clickSaveTemplate();

    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();


    // ---------------------------------------------------------
    // Form
    // ---------------------------------------------------------

    cy.log('Step 13: Adding form');

    PactveraTemplatePage.clickAddForm();

    PactveraTemplatePage.clickUploadNew();

    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);

    PactveraTemplatePage.clickUploadConfirm();


    cy.log('Step 14: Continuing form configuration');

    PactveraTemplatePage.clickContinue();


    cy.log('Step 15: Adding Email field to form');

    PactveraTemplatePage.verifyAddFieldsPageDisplayed();

    PactveraTemplatePage.dragFieldToCanvas(
      PactveraTemplatePage.emailField
    );


    cy.log('Step 16: Saving form configuration');

    PactveraTemplatePage.clickSaveTemplate();

    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();


    // ---------------------------------------------------------
    // Final Save
    // ---------------------------------------------------------

    cy.log('Step 17: Saving complete Pactvera template');

    PactveraTemplatePage.clickSave();


    cy.log('Step 18: Verifying Pactvera Templates page');

    PactveraTemplatePage.verifyPageLoaded();


    cy.log('Step 19: Searching newly created template');

    PactveraTemplatePage.searchTemplate(title);


    cy.log('Step 20: Verifying template title');

    PactveraTemplatePage.verifyTemplateInList(title);


    cy.log(`TC05 completed successfully: ${title}`);

  });

});