import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';


const ADMIN_URL = 'https://develop-admin.chainit.online';

describe('Configuration - Form Templates', () => {
  beforeEach(() => {
    cy.log('Action: Opening QR Scan page');
    cy.visit(`${ADMIN_URL}/scan-qr`);
    cy.contains('Scan or Tap the QR Code Login').should('be.visible');
    cy.log('Action: Waiting for QR scan');

    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.log('QR scan process resumed');
    cy.log('Action: Waiting for QR login to complete');
    cy.url({ timeout: 120000 }).should('not.include', '/scan-qr');
    cy.log('QR login completed successfully');
    cy.log('Action: Selecting individual account');
    SwitchAccountModal.verifyVisible();
    SwitchAccountModal.clickIndividualAccount();
    cy.log('Action: Opening Configuration');
    ConfigurationPage.clickConfigurationButton();
  });

  it('TC01: should validate Form Templates page, folder management, create template, builder, search and actions', () => {
    cy.log('Action: Opening Form Templates');
    ConfigurationPage.clickFormButton();
    FormTemplatePage.verifyPageLoaded();

    cy.log('Click on list view');
    FormTemplatePage.clickListView();

    cy.log('Action: Verifying folder columns and records');
    FormTemplatePage.verifyFolderTableColumns().verifyRecordsDisplayed();

    cy.log('Action: Verifying folder search');
    FormTemplatePage.firstRecord.find('td').first().invoke('text').then((folderName) => {
      const searchText = folderName.replace(/\s+/g, ' ').trim();
      expect(searchText, 'First folder name').to.not.be.empty;
      FormTemplatePage.searchFolder(searchText).verifyFolderSearchResult(searchText).clearSearch();
    });

    cy.log('Action: Verifying Grid and List views');
    FormTemplatePage.clickGridView().verifyGridViewDisplayed().clickListView().verifyListViewDisplayed();

    DocumentTemplatePage.getFirstFolderName();
    cy.get('@firstFolderName').then((folderName) => {
    cy.log(`First folder selected: ${folderName}`);
    
    cy.log(`Action: Open Actions menu for folder: ${folderName}`);
    DocumentTemplatePage.clickFirstRecordActions();
    DocumentTemplatePage.verifyActionsMenuOptions();
    
    cy.log('Action: Click Rename');
    DocumentTemplatePage.clickRenameOption();
    
    cy.log('Action: Verify Rename Folder popup');
  //DocumentTemplatePage.verifyRenamePopup();
    
    cy.log('Action: Cancel Rename operation');
    DocumentTemplatePage.clickRenameCancel();
    cy.log('Rename operation cancelled successfully');
    
    cy.log('Action: Click Delete');
    DocumentTemplatePage.clickFirstRecordActions();
    DocumentTemplatePage.clickDeleteOption();
  
    cy.log('Action: Verify Delete confirmation popup');
    DocumentTemplatePage.verifyDeletePopup();
  
    cy.log('Action: Cancel Delete operation');
    DocumentTemplatePage.clickDeleteCancel();
    cy.log('Delete operation cancelled successfully');
    
    cy.log('Action: click view operation');
    DocumentTemplatePage.clickFirstRecordActions();
    DocumentTemplatePage.clickViewOption();
    DocumentTemplatePage.clickBackButton();

    const newFolderName = `Automation Form Folder ${Date.now()}`;
    cy.log(`Action: Creating folder: ${newFolderName}`);
    FormTemplatePage.createFolder(newFolderName).verifyFolderDisplayed(newFolderName).openFolder(newFolderName);

    cy.log('Action: Verifying Form Template table and pagination');
    FormTemplatePage.verifyFormTemplateTableColumns().verifyPaginationIfRequired();
    cy.get('tbody').then(($tbody) => {
      const hasData = $tbody.find('tr').length > 0 && !$tbody.text().includes('No result found');
      if (hasData) {
        FormTemplatePage.verifyTemplateRecordsDisplayed();
      }
    });

    const newTemplateName = `Automation Form Template ${Date.now()}`;
    cy.log(`Action: Creating Form Template: ${newTemplateName}`);
    FormTemplatePage.clickCreateNewButton();

    cy.log('Action: Verifying Form editor');
    FormTemplatePage.verifyFormEditorDisplayed();

    cy.log('Action: Verifying Basic section fields in the form builder');
    //PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    PactveraTemplatePage.verifyFormBuilderBasicFieldsVisible();
    
    cy.log('Action: Verifying Layout section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Layout');
    PactveraTemplatePage.verifyLayoutFieldsVisible();
    
    cy.log('Action: Verifying Data section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Data');
    PactveraTemplatePage.verifyDataFieldsVisible();
    
    cy.log('Action: Verifying Individual (IVDT) section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Individual');
    PactveraTemplatePage.verifyIndividualFieldsVisible();
    
    cy.log('Action: Verifying Documents section fields in the form builder');
    PactveraTemplatePage.clickFormBuilderAccordion('Documents');
    PactveraTemplatePage.verifyDocumentsFieldsVisible();

    cy.log('Action: Verifying Publish validation without title');
    FormTemplatePage.publishWithoutTitle().verifyTitleRequiredValidation().verifyPublishValidationError();

    cy.log('Action: Verifying Import Form');
    FormTemplatePage.openImportForm().verifyImportFormPopup().closeImportForm();

    cy.log(`Action: Entering template name: ${newTemplateName}`);
    FormTemplatePage.enterTitle(newTemplateName);

    cy.log('Action: Verifying Export Form and Preview');
    FormTemplatePage.exportForm().openPreview().verifyPreviewDisplayed().closePreview();

    cy.log('Action: Adding Text Field to Form');
    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    FormTemplatePage.dragBasicFieldToForm('textfield');
  
    cy.log('Action: Publishing Form Template');
    cy.wait(1500);
    FormTemplatePage.publishTemplate();

    cy.log(`Action: Verifying created template: ${newTemplateName}`);
    FormTemplatePage.verifyPageLoaded().searchTemplate(newTemplateName).verifyTemplateInList(newTemplateName);
    
    cy.log('Action: Verifying Form Template actions');
    FormTemplatePage.verifyActionsMenuOptions();
    cy.get('body').click(500, 500);

    cy.log('Action: Verifying View Form Template');
    FormTemplatePage.searchTemplate(newTemplateName).clickFirstTemplateActions().clickViewTemplate().verifyTemplateViewPage().verifyTemplateViewIsReadOnly();

    cy.log('Action: click on Form Templates in header');
    FormTemplatePage.clickFormTemplates();

    cy.log('Action: Delete all Empty folder');
    DocumentTemplatePage.deleteAllEmptyFolders();

    cy.log('Action: Form Templates validation completed successfully');
  });
});
});