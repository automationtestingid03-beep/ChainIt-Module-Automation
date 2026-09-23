import ConfigurationPage from '../../pages/ConfigurationPage';
import LoginPage from '../../pages/LoginPage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';
import { generateUniqueTitle } from '../../utils/helpers';

const DUMMY_PDF = 'cypress/fixtures/gaurav.pdf';

describe('Configuration - Pactvera Templates', () => {

  beforeEach(() => {
    LoginPage.loginWithQrAndSelectAccount();
    ConfigurationPage.clickConfigurationButton();
    cy.intercept(
      'GET',
      '**/documents/v1/pactvera/templates/search**'
    ).as('getTemplates');

  });



  it('TC01: should validate Pactvera Template listing, search, pagination and actions menu', () => {

    cy.log('================================================');
    cy.log('TC01: Pactvera Template Listing Validation');
    cy.log('================================================');

    cy.log('Action: Open Pactvera Templates');
    ConfigurationPage.clickPactveraButton();
    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Pactvera Templates page loaded');


    cy.log('Action: Verify Pactvera Template table columns');
    PactveraTemplatePage.verifyPactveraTemplateTableColumns();
    cy.log('Verified: Pactvera Template table columns displayed');

    cy.log('Action: Verify template records');
    PactveraTemplatePage.verifyRecordsDisplayed();
    cy.log('Verified: Template records displayed');

    cy.log('Action: Verify pagination');
    PactveraTemplatePage.verifyPaginationIfRequired();
    cy.log('Verified: Pagination validated');

    cy.log('Action: Verify template actions menu');
    PactveraTemplatePage.verifyActionsMenuOptions();
    cy.log('Verified: Template actions menu displayed');

    cy.log('Action: Validate template search filter');

    cy.get('tbody tr')
      .filter(':visible')
      .first()
      .find('td')
      .first()
      .invoke('text')
      .then((templateName) => {

        const searchText = templateName.trim();
        expect(searchText, 'First record template name').to.not.be.empty;

        cy.log(`Action: Search template: ${searchText}`);
        PactveraTemplatePage.searchTemplate(searchText);
        cy.log(`Verified: Template search completed: ${searchText}`);
        PactveraTemplatePage.verifyTemplateInList(searchText);
        cy.log(`Verified: Template listed: ${searchText}`);
        PactveraTemplatePage.verifyOnlySearchResultDisplayed(searchText);
        cy.log(`Verified: Only matching template displayed: ${searchText}`);

        cy.log('Action: Delete first template');
        PactveraTemplatePage.deleteFirstTemplate();
        cy.log('Verified: First template delete requested');
        PactveraTemplatePage.verifyDeleteConfirmationPopup();
        cy.log('Verified: Delete confirmation popup displayed');
        PactveraTemplatePage.confirmDeleteTemplate();
        cy.log('Verified: Template deletion confirmed');
        PactveraTemplatePage.verifyTemplateDeleted();
        cy.log('Verified: Template deleted');
        PactveraTemplatePage.clearTemplateSearch();
        cy.log(`Verified: Search filter cleared: ${searchText}`);

        cy.log('Action: Duplicate first template');
        cy.wait(2000); // Wait for the list to refresh after deletion
        PactveraTemplatePage.duplicateFirstTemplate();
        cy.wait(3000); // Wait for duplication to complete
        PactveraTemplatePage.verifyDuplicatedTemplate();
        cy.log('Verified: Template duplicated');

        cy.log('Action: Edit template');
        PactveraTemplatePage.clickEditTemplate();
        cy.log('Verified: Edit template opened');

        cy.log('Action: Verify Configure Pactvera Template page');
        PactveraTemplatePage.verifyConfigureTemplatePage();
        cy.log('Verified: Configure Pactvera Template page displayed');

        cy.log('Action: Verify editable fields');
        PactveraTemplatePage.verifyConfigureTemplateEditableFields();
        cy.log('Verified: Editable fields displayed');

        cy.log('Action: Verify template name');
        PactveraTemplatePage.verifyTemplateNameInEditPage();
        cy.log('Verified: Template name displayed');

      });

    cy.log('================================================');
    cy.log('Verified: TC01 completed successfully');
    cy.log('================================================');
  });

  // =========================================================
  // TC02 - Open Pactvera Templates
  // =========================================================

  it('TC02: should open Pactvera Templates page', () => {
    cy.log('Action: Open Pactvera Templates');
    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Verified: Pactvera Templates API returned 200');
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Pactvera Templates page loaded');

  });


  // =========================================================
  // TC03 - No Document / No Form
  // =========================================================

  it('TC03: should create Pactvera template without document and form', () => {

    const title = generateUniqueTitle('Automation Pactvera Template');
    const description = 'This is a generated Pactvera template for Cypress automation';


    cy.log('================================================');
    cy.log(`TC03 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Action: Open Pactvera Templates');
    ConfigurationPage.clickPactveraButton();
    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.log('Action: Click Create New');
    PactveraTemplatePage.clickCreateNewButton();
    cy.log('Verified: Create New clicked');

    cy.log(`Action: Enter template title: ${title}`);
    PactveraTemplatePage.enterTitle(title);
    cy.log(`Verified: Template title entered: ${title}`);

    cy.log('Action: Create Pactvera template');
    PactveraTemplatePage.clickCreate();
    cy.log('Verified: Pactvera template creation submitted');

    cy.log(`Action: Verify template title: ${title}`);
    PactveraTemplatePage.verifyTitleDisplayed(title);
    cy.log(`Verified: Template title displayed: ${title}`);

    cy.log('Action: Enter template description');
    PactveraTemplatePage.enterDescription(description);
    cy.log('Verified: Template description entered');

    cy.log('Action: Save template');
    PactveraTemplatePage.clickSave();
    cy.log('Verified: Template save submitted');


    cy.log('Action: Verify template list');
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Template list page loaded');
    PactveraTemplatePage.searchTemplate(title);
    cy.log(`Verified: Template search completed: ${title}`);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`Verified: Template listed: ${title}`);

    cy.log(`Verified: TC03 completed successfully: ${title}`);

  });


  // =========================================================
  // TC04 - One Document
  // =========================================================

  it('TC04: should create Pactvera template with one document', () => {

    const title = generateUniqueTitle(
      'Automation_Document'
    );


    cy.log('================================================');
    cy.log(`TC04 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Action: Open Pactvera Templates');
    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Action: Create new Pactvera template');
    PactveraTemplatePage.clickCreateNewButton();
    cy.log('Verified: Create New clicked');
    PactveraTemplatePage.enterTitle(title);
    cy.log(`Verified: Template title entered: ${title}`);
    PactveraTemplatePage.clickCreate();
    cy.log('Verified: Pactvera template creation submitted');

    cy.log('Action: Add document');
    PactveraTemplatePage.clickAddDocument();
    cy.log('Verified: Add document flow opened');

    cy.log('Action: Verify Add Document popup');
    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();
    cy.log('Verified: Add Document popup displayed');

    cy.log('Action: Select Upload New');
    PactveraTemplatePage.clickUploadNew();
    cy.log('Verified: Upload New selected');

    cy.log('Action: Upload PDF');
    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);
    cy.log('Verified: PDF uploaded');

    cy.log('Action: Confirm PDF upload');
    PactveraTemplatePage.clickUploadConfirm();
    cy.log('Verified: PDF upload confirmed');

    cy.log('Action: Verify Add Participants section');
    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
    cy.log('Verified: Add Participants section displayed');

    cy.log('Action: Continue to Add Fields');
    PactveraTemplatePage.clickContinue();
    cy.log('Verified: Continued to Add Fields');

    cy.log('Action: Verify Add Fields page');
    PactveraTemplatePage.verifyAddFieldsPageDisplayed();
    cy.log('Verified: Add Fields page displayed');

    cy.log('Action: Verify available fields');
    PactveraTemplatePage.verifyAllFieldsVisible();
    cy.log('Verified: Available fields displayed');

    cy.log('Action: Save template without adding a field');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Save template action submitted');

    cy.log('Action: Verify field-required validation popup');
    PactveraTemplatePage.verifyFieldRequiredPopupDisplayed();
    cy.log('Verified: Field-required validation popup displayed');

    cy.log('Action: Close validation popup');
    PactveraTemplatePage.closeFieldRequiredPopup();
    cy.log('Verified: Validation popup closed');

    cy.log('Action: Drag Signature field onto document');
    PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
    cy.log('Verified: Signature field added to document');

    cy.log('Action: Verify Signature field');
    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();
    cy.log('Verified: Signature field displayed on document');


    cy.log('Action: Save document configuration');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Document configuration save submitted');

    cy.log('Action: Verify document configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();
    cy.log('Verified: Document configuration saved');

    cy.log('Action: Verify document exists');
    PactveraTemplatePage.verifyDocumentAddedInSummary('gaurav');
    cy.log('Verified: Document exists in summary');

    cy.log('Action: Save Pactvera template');
    PactveraTemplatePage.clickSave();
    cy.log('Verified: Pactvera template save submitted');

    cy.log('Action: Verify Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Pactvera Templates page loaded');
    PactveraTemplatePage.searchTemplate(title);
    cy.log(`Verified: Template search completed: ${title}`);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`Verified: Template listed: ${title}`);
    cy.log(`Verified: TC04 completed successfully: ${title}`);

  });


  // =========================================================
  // TC05 - One Form
  // =========================================================

  it('TC05: should create Pactvera template with one form', () => {

    const title = generateUniqueTitle(
      'Automation_Form'
    );


    cy.log('================================================');
    cy.log(`TC05 Template Title: ${title}`);
    cy.log('================================================');


    cy.log('Action: Open Pactvera Templates');

    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Action: Create new Pactvera template');
    PactveraTemplatePage.clickCreateNewButton();
    cy.log('Verified: Create New clicked');
    PactveraTemplatePage.enterTitle(title);
    cy.log(`Verified: Template title entered: ${title}`);
    PactveraTemplatePage.clickCreate();
    cy.log('Verified: Pactvera template creation submitted');

    cy.log('Action: Add form');
    PactveraTemplatePage.clickAddForm();
    cy.log('Verified: Add form flow opened');

    cy.log('Action: Create form from form builder');
    PactveraTemplatePage.clickCreateNewForm();
    cy.log('Verified: Form builder opened');
    PactveraTemplatePage.verifyCreateNewFormPageDisplayed();
    cy.log('Verified: New form page displayed');

    cy.log('Action: Verify Basic section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    PactveraTemplatePage.verifyFormBuilderBasicFieldsVisible();
    cy.log('Verified: Basic section fields displayed');

    // Advanced section verification is currently disabled.
    // PactveraTemplatePage.clickFormBuilderAccordion('Advanced');
    // PactveraTemplatePage.verifyFormBuilderAdvancedFieldsVisible();

    cy.log('Action: Verify Layout section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Layout');
    PactveraTemplatePage.verifyLayoutFieldsVisible();
    cy.log('Verified: Layout section fields displayed');

    cy.log('Action: Verify Data section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Data');
    PactveraTemplatePage.verifyDataFieldsVisible();
    cy.log('Verified: Data section fields displayed');

    cy.log('Action: Verify Individual section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Individual');
    PactveraTemplatePage.verifyIndividualFieldsVisible();
    cy.log('Verified: Individual section fields displayed');

    cy.log('Action: Verify Documents section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Documents');
    PactveraTemplatePage.verifyDocumentsFieldsVisible();
    cy.log('Verified: Documents section fields displayed');

    cy.log('Action: Verify form title is required');
    PactveraTemplatePage.clickContinueFromFormBuilder();
    PactveraTemplatePage.verifyFormTitleRequiredError();
    cy.log('Verified: Form title validation displayed');

    cy.log('Action: Enter form title and add text field');
    PactveraTemplatePage.formBuilderTitleInput.clear().type(`Form_${Date.now()}`);

    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    FormTemplatePage.dragBasicFieldToForm();
    cy.log('Verified: Form title and text field added');

    cy.wait(2000);
    cy.log('Action: Continue from Build Form page');
    PactveraTemplatePage.clickContinueFromFormBuilder();
    cy.log('Verified: Continued from Build Form page');

    cy.log('Action: Save form configuration');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Form configuration save submitted');

    cy.log('Action: Verify form configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();
    cy.log('Verified: Form configuration saved');

    cy.log('Action: Save Pactvera template');
    PactveraTemplatePage.clickSave();
    cy.log('Verified: Pactvera template save submitted');

    cy.log('Action: Verify Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Pactvera Templates page loaded');
    cy.log(`Action: Search for Pactvera template: ${title}`);
    PactveraTemplatePage.searchTemplate(title);
    cy.log(`Verified: Pactvera template search completed: ${title}`);
    cy.log(`Action: Verify Pactvera template is listed: ${title}`);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`Verified: Pactvera template is listed: ${title}`);
    cy.log(`Verified: TC05 completed successfully: ${title}`);

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


    cy.log('Action: Open Pactvera Templates');
    ConfigurationPage.clickPactveraButton();

    cy.wait('@getTemplates', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);


    cy.log('Action: Create new Pactvera template');
    PactveraTemplatePage.clickCreateNewButton();
    cy.log('Verified: Create New clicked');
    PactveraTemplatePage.enterTitle(title);
    cy.log(`Verified: Template title entered: ${title}`);
    PactveraTemplatePage.clickCreate();
    cy.log('Verified: Pactvera template creation submitted');

    cy.log('Action: Add document');
    PactveraTemplatePage.clickAddDocument();
    cy.log('Verified: Add document flow opened');

    cy.log('Action: Verify Add Document popup');
    PactveraTemplatePage.verifyAddDocumentPopupDisplayed();
    cy.log('Verified: Add Document popup displayed');

    cy.log('Action: Select Upload New');
    PactveraTemplatePage.clickUploadNew();
    cy.log('Verified: Upload New selected');

    cy.log('Action: Upload PDF');
    PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);
    cy.log('Verified: PDF uploaded');

    cy.log('Action: Confirm PDF upload');
    PactveraTemplatePage.clickUploadConfirm();
    cy.log('Verified: PDF upload confirmed');

    cy.log('Action: Verify Add Participants section');
    PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();
    cy.log('Verified: Add Participants section displayed');

    cy.log('Action: Continue to Add Fields');
    PactveraTemplatePage.clickContinue();
    cy.log('Verified: Continued to Add Fields');

    cy.log('Action: Verify Add Fields page');
    PactveraTemplatePage.verifyAddFieldsPageDisplayed();
    cy.log('Verified: Add Fields page displayed');

    cy.log('Action: Verify available fields');
    PactveraTemplatePage.verifyAllFieldsVisible();
    cy.log('Verified: Available fields displayed');

    cy.log('Action: Save template without adding a field');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Save template action submitted');

    cy.log('Action: Verify field-required validation popup');
    PactveraTemplatePage.verifyFieldRequiredPopupDisplayed();
    cy.log('Verified: Field-required validation popup displayed');

    cy.log('Action: Close validation popup');
    PactveraTemplatePage.closeFieldRequiredPopup();
    cy.log('Verified: Validation popup closed');

    cy.log('Action: Drag Signature field onto document');
    PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
    cy.log('Verified: Signature field added to document');

    cy.log('Action: Verify Signature field');
    PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();
    cy.log('Verified: Signature field displayed on document');

    cy.log('Action: Save document configuration');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Document configuration save submitted');

    cy.log('Action: Add form');
    PactveraTemplatePage.clickAddForm();
    cy.log('Verified: Add form flow opened');

    cy.log('Action: Create form from form builder');
    PactveraTemplatePage.clickCreateNewForm();
    cy.log('Verified: Form builder opened');
    PactveraTemplatePage.dragBasicFieldToForm();
    cy.log('Verified: Basic form field added');

    cy.wait(2000);
    cy.log('Action: Verify form title is required');
    PactveraTemplatePage.clickContinueFromFormBuilder();
    PactveraTemplatePage.verifyFormTitleRequiredError();
    cy.log('Verified: Form title validation displayed');

    cy.log('Action: Enter form title and continue');
    PactveraTemplatePage.formBuilderTitleInput.clear().type(`Form_${Date.now()}`);
    PactveraTemplatePage.clickContinueFromFormBuilder();

    cy.log('Action: Save form configuration');
    PactveraTemplatePage.clickSaveTemplate();
    cy.log('Verified: Form configuration save submitted');

    cy.log('Action: Verify form configuration saved');
    PactveraTemplatePage.verifyTemplateConfigSavedSuccessfully();
    cy.log('Verified: Form configuration saved');

    cy.log('Action: Save Pactvera template');
    PactveraTemplatePage.clickSave();
    cy.log('Verified: Pactvera template save submitted');

    cy.log('Action: Verify Pactvera Templates page');
    PactveraTemplatePage.verifyPageLoaded();
    cy.log('Verified: Pactvera Templates page loaded');
    PactveraTemplatePage.searchTemplate(title);
    cy.log(`Verified: Template search completed: ${title}`);
    PactveraTemplatePage.verifyTemplateInList(title);
    cy.log(`Verified: Template listed: ${title}`);
    cy.log(`Verified: TC06 completed successfully: ${title}`);


  });

});