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
    cy.log('Step 2: Please scan the QR code using the mobile app'  );

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }
    cy.log('QR scan process resumed');

    // Step 3: Wait for login
    cy.log('Step 3: Waiting for QR login to complete');

    cy.url({ timeout: 120000 }).should('not.include', '/scan-qr');
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



  it.only('TC01: should validate Pactvera Template listing, search, pagination and actions menu', () => {

  cy.log('================================================');
  cy.log('TC01: Pactvera Template Listing Validation');
  cy.log('================================================');

  cy.log('Step 1: Opening Pactvera Templates');
  ConfigurationPage.clickPactveraButton();
  cy.wait('@getTemplates', { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
 PactveraTemplatePage.verifyPageLoaded();


  cy.log('Step 2: Validating Pactvera Template table columns');
  PactveraTemplatePage.verifyPactveraTemplateTableColumns();

  cy.log('Step 3: Validating records displayed on first page');
  PactveraTemplatePage.verifyRecordsDisplayed();

  cy.log('Step 4: Validating pagination');
  PactveraTemplatePage.verifyPaginationIfRequired();

  cy.log('Step 5: Opening Actions menu');
  PactveraTemplatePage.verifyActionsMenuOptions();
 
  cy.log('Step 6: Validating Search filter');

cy.get('tbody tr')
  .filter(':visible')
  .first()
  .find('td')
  .first()
  .invoke('text')
  .then((templateName) => {

    const searchText = templateName.trim();
    expect(searchText, 'First record template name').to.not.be.empty;

    cy.log(`Step 7:First record template name: ${searchText}`);
    PactveraTemplatePage.searchTemplate(searchText);
    PactveraTemplatePage.verifyTemplateInList(searchText);
    PactveraTemplatePage.verifyOnlySearchResultDisplayed(searchText);

    cy.log('Step 8: Validating Delete action');
    PactveraTemplatePage.deleteFirstTemplate();
    PactveraTemplatePage.verifyDeleteConfirmationPopup();
    PactveraTemplatePage.confirmDeleteTemplate();
    PactveraTemplatePage.verifyTemplateDeleted();
    PactveraTemplatePage.clearTemplateSearch();
    cy.log(`Search filter validated successfully for: ${searchText}`);

    cy.log('Step 13: Validating Duplicate action');
    cy.wait(2000); // Wait for the list to refresh after deletion
    PactveraTemplatePage.duplicateFirstTemplate();
    cy.wait(3000); // Wait for duplication to complete
    PactveraTemplatePage.verifyDuplicatedTemplate();

    cy.log('Step 14: Clicking Edit button');
    PactveraTemplatePage.clickEditTemplate();

    cy.log('Step 15: Verifying Configure Pactvera Template page');
    PactveraTemplatePage.verifyConfigureTemplatePage();

    cy.log('Step 16: Verifying editable fields');
    PactveraTemplatePage.verifyConfigureTemplateEditableFields();

    cy.log('Step 17: Verifying template name');
    PactveraTemplatePage.verifyTemplateNameInEditPage();
  
  });

  cy.log('================================================');
  cy.log('TC01 completed successfully');
  cy.log('================================================');
});

  // =========================================================
  // TC02 - Open Pactvera Templates
  // =========================================================

  it('TC02: should open Pactvera Templates page', () => {
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
  // TC03 - No Document / No Form
  // =========================================================

  it('TC03: should create Pactvera template without document and form', () => {

    const title = generateUniqueTitle(  'Automation Pactvera Template');
    const description = 'This is a generated Pactvera template for Cypress automation';


    cy.log('================================================');
    cy.log(`TC03 Template Title: ${title}`);
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

    cy.log(`TC03 completed successfully: ${title}`);

  });


  // =========================================================
  // TC04 - One Document
  // =========================================================

  it('TC04: should create Pactvera template with one document', () => {

    const title = generateUniqueTitle(
      'Automation_With_Document'
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

    cy.log('Step 18: Clicking Save Template without adding a field');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 19: Verifying validation popup is displayed');
    PactveraTemplatePage.verifyFieldRequiredPopupDisplayed();

    cy.log('Step 20: Closing validation popup');
    PactveraTemplatePage.closeFieldRequiredPopup();

    cy.log('Step 21: Dragging Signature field onto document');
    PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
    

    cy.log('Step 22: Verifying Signature field');
    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();


    cy.log('Step 23: Saving document configuration');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 24: Verifying document configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();

    cy.log('Step 25: Verifying document exists');
    PactveraTemplatePage.verifyDocumentAddedInSummary('gaurav');

    cy.log('Step 26: Saving Pactvera template');
    PactveraTemplatePage.clickSave();

    cy.log('Step 27: Verifying Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    PactveraTemplatePage.searchTemplate(title);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`TC04 completed successfully: ${title}`);

  });


  // =========================================================
  // TC05 - One Form
  // =========================================================

  it('TC05: should create Pactvera template with one form', () => {

    const title = generateUniqueTitle(
      'Automation_With_Form'
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

    cy.log('Step 9: Adding form');
    PactveraTemplatePage.clickAddForm();

    cy.log('Step 10: Creating a new form from the form builder');
    PactveraTemplatePage.clickCreateNewForm();
    PactveraTemplatePage.verifyCreateNewFormPageDisplayed();

    cy.log('Step 10.1: Verifying Basic section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    PactveraTemplatePage.verifyFormBuilderBasicFieldsVisible();

    //cy.log('Step 10.2: Verifying Advanced section fields in the form builder');
    // PactveraTemplatePage.clickFormBuilderAccordion('Advanced');
    // PactveraTemplatePage.verifyFormBuilderAdvancedFieldsVisible();

    cy.log('Step 10.3: Verifying Layout section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Layout');
    PactveraTemplatePage.verifyLayoutFieldsVisible();

    cy.log('Step 10.4: Verifying Data section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Data');
    PactveraTemplatePage.verifyDataFieldsVisible();

    cy.log('Step 10.5: Verifying Individual (IVDT) section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Individual');
    PactveraTemplatePage.verifyIndividualFieldsVisible();

    cy.log('Step 10.6: Verifying Documents section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Documents');
    PactveraTemplatePage.verifyDocumentsFieldsVisible();

    cy.log('Step 11: Validating form title is required when Continue is clicked without a title');
    PactveraTemplatePage.clickContinueFromFormBuilder();
    PactveraTemplatePage.verifyFormTitleRequiredError();

    cy.log('Step 12: Entering form title and dragging Text Field and Text Area into the form');
    PactveraTemplatePage.formBuilderTitleInput.clear().type(`Form_${Date.now()}`);

    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    PactveraTemplatePage.dragBasicFieldToForm();
    
    cy.wait(2000);
    cy.log('Step 13: Clicking Continue on the Build Form page');
    PactveraTemplatePage.clickContinueFromFormBuilder();

    cy.log('Step 14: Saving form configuration');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 15: Verifying form configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();

    cy.log('Step 16: Saving Pactvera template');
    PactveraTemplatePage.clickSave();

    cy.log('Step 17: Verifying Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    PactveraTemplatePage.searchTemplate(title);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`TC05 completed successfully: ${title}`);

  });


  // =========================================================
  // TC06 - Document + Form
  // =========================================================

  it('TC06: should create Pactvera template with document and form', () => {

    const title = generateUniqueTitle(
      'Automation_With_Document_And_Form'
    );


    cy.log('================================================');
    cy.log(`TC06  Template Title: ${title}`);
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

    cy.log('Step 18: Clicking Save Template without adding a field');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 19: Verifying validation popup is displayed');
    PactveraTemplatePage.verifyFieldRequiredPopupDisplayed();

    cy.log('Step 20: Closing validation popup');
    PactveraTemplatePage.closeFieldRequiredPopup();

    cy.log('Step 21: Dragging Signature field onto document');
    PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
    
    cy.log('Step 22: Verifying Signature field');
    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();

    cy.log('Step 23: Saving document configuration');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 24: Adding form');
    PactveraTemplatePage.clickAddForm();

    cy.log('Step 25: Creating a new form from the form builder');
    PactveraTemplatePage.clickCreateNewForm();
    PactveraTemplatePage.dragBasicFieldToForm();
    
    cy.wait(2000);
    cy.log('Step 26: Validating form title is required when Continue is clicked without a title');
    PactveraTemplatePage.clickContinueFromFormBuilder();
    PactveraTemplatePage.verifyFormTitleRequiredError();

    cy.log('Step 27: Entering form title and dragging Text Field and Text Area into the form');
    PactveraTemplatePage.formBuilderTitleInput.clear().type(`Form_${Date.now()}`);
    PactveraTemplatePage.clickContinueFromFormBuilder();

    cy.log('Step 28 : Saving form configuration');
    PactveraTemplatePage.clickSaveTemplate();

    cy.log('Step 29 : Verifying form configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();

    cy.log('Step 30 : Saving Pactvera template');
    PactveraTemplatePage.clickSave();

    cy.log('Step 31 : Verifying Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    PactveraTemplatePage.searchTemplate(title);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`TC06 completed successfully: ${title}`);


  });

});