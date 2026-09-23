import ConfigurationPage from '../../pages/ConfigurationPage';
import LoginPage from '../../pages/LoginPage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';



describe('Configuration - Form Templates', () => {
  beforeEach(() => {
    cy.log('Action: Log in and select individual account');
    LoginPage.loginWithQrAndSelectAccount();
    cy.log('Verified: Individual account selected');
    cy.log('Action: Open Configuration');
    ConfigurationPage.clickConfigurationButton();
    cy.log('Verified: Configuration opened');
  });

  it('TC01: should validate Form Templates page, folder management, create template, builder, search and actions', () => {
    cy.log('Action: Open Form Templates');
    ConfigurationPage.clickFormButton();
    cy.log('Verified: Form Templates opened');
    FormTemplatePage.verifyPageLoaded();
    cy.log('Verified: Form Templates page loaded');

    cy.log('Action: Open list view');
    FormTemplatePage.clickListView();
    cy.log('Verified: List view selected');

    cy.log('Action: Verify folder table columns');
    FormTemplatePage.verifyFolderTableColumns();
    cy.log('Verified: Folder table columns displayed');
    cy.log('Action: Verify folder records');
    FormTemplatePage.verifyRecordsDisplayed();
    cy.log('Verified: Folder records displayed');

    cy.log('Action: Capture and search first folder');
    FormTemplatePage.firstRecord.find('td').first().invoke('text').then((folderName) => {
      const searchText = folderName.replace(/\s+/g, ' ').trim();
      expect(searchText, 'First folder name').to.not.be.empty;
      FormTemplatePage.searchFolder(searchText);
      cy.log(`Verified: Folder search completed: ${searchText}`);
      FormTemplatePage.verifyFolderSearchResult(searchText);
      cy.log(`Verified: Folder search result displayed: ${searchText}`);
      FormTemplatePage.clearSearch();
      cy.log('Verified: Folder search cleared');
    });

    cy.log('Action: Open grid view');
    FormTemplatePage.clickGridView();
    cy.log('Verified: Grid view selected');
    FormTemplatePage.verifyGridViewDisplayed();
    cy.log('Verified: Grid view displayed');
    cy.log('Action: Return to list view');
    FormTemplatePage.clickListView();
    cy.log('Verified: List view selected');
    FormTemplatePage.verifyListViewDisplayed();
    cy.log('Verified: List view displayed');

    cy.log('Action: Capture first folder name');
    DocumentTemplatePage.getFirstFolderName();
    cy.log('Verified: First folder name captured');
    cy.get('@firstFolderName').then((folderName) => {
    cy.log(`Verified: First folder selected: ${folderName}`);
    
    cy.log(`Action: Open Actions menu for folder: ${folderName}`);
    DocumentTemplatePage.clickFirstRecordActions();
    cy.log('Verified: Folder actions menu opened');
    cy.log('Action: Verify folder actions');
    DocumentTemplatePage.verifyActionsMenuOptions();
    cy.log('Verified: Folder actions displayed');
    
    cy.log('Action: Click Rename');
    DocumentTemplatePage.clickRenameOption();
    cy.log('Verified: Rename option clicked');
    
    cy.log('Action: Verify Rename Folder popup');
    // Rename popup verification remains disabled in the existing flow.
    
    cy.log('Action: Cancel Rename operation');
    DocumentTemplatePage.clickRenameCancel();
    cy.log('Verified: Rename operation cancelled successfully');

    cy.log('Action: Open Actions menu for delete');
    DocumentTemplatePage.clickFirstRecordActions();
    cy.log('Verified: Actions menu opened for delete');
    cy.log('Action: Click Delete option');
    DocumentTemplatePage.clickDeleteOption();
    cy.log('Verified: Delete option clicked');

    cy.log('Action: Verify Delete confirmation popup');
    DocumentTemplatePage.verifyDeletePopup();
    cy.log('Verified: Delete confirmation popup displayed');

    cy.log('Action: Cancel Delete operation');
    DocumentTemplatePage.clickDeleteCancel();
    cy.log('Verified: Delete operation cancelled successfully');

    cy.log('Action: Open Actions menu for view');
    DocumentTemplatePage.clickFirstRecordActions();
    cy.log('Verified: Actions menu opened for view');
    cy.log('Action: Click View option');
    DocumentTemplatePage.clickViewOption();
    cy.log('Verified: View option clicked');
    cy.log('Action: Navigate back from folder view');
    DocumentTemplatePage.clickBackButton();
    cy.log('Verified: Returned from folder view');

    const newFolderName = `Automation Form Folder ${Date.now()}`;
    cy.log(`Action: Create folder: ${newFolderName}`);
    FormTemplatePage.createFolder(newFolderName);
    cy.log(`Verified: Folder creation submitted: ${newFolderName}`);
    FormTemplatePage.verifyFolderDisplayed(newFolderName);
    cy.log(`Verified: Folder displayed: ${newFolderName}`);
    FormTemplatePage.openFolder(newFolderName);
    cy.log(`Verified: Folder opened: ${newFolderName}`);

    cy.log('Action: Verify Form Template table columns');
    FormTemplatePage.verifyFormTemplateTableColumns();
    cy.log('Verified: Form Template table columns displayed');
    cy.log('Action: Verify Form Template pagination');
    FormTemplatePage.verifyPaginationIfRequired();
    cy.log('Verified: Form Template pagination validated');
    cy.get('tbody').then(($tbody) => {
      const hasData = $tbody.find('tr').length > 0 && !$tbody.text().includes('No result found');
      if (hasData) {
        cy.log('Action: Verify Form Template records');
        FormTemplatePage.verifyTemplateRecordsDisplayed();
        cy.log('Verified: Form Template records displayed');
      }
    });

    const newTemplateName = `Automation Form Template ${Date.now()}`;
    cy.log(`Action: Open Create Form Template: ${newTemplateName}`);
    FormTemplatePage.clickCreateNewButton();
    cy.log('Verified: Form Template creation opened');

    cy.log('Action: Verifying Form editor');
    FormTemplatePage.verifyFormEditorDisplayed();
    cy.log('Verified: Form editor displayed');

    cy.log('Action: Verifying Basic section fields in the form builder');
    // Basic accordion is already expanded by the existing flow.
    PactveraTemplatePage.verifyFormBuilderBasicFieldsVisible();
    cy.log('Verified: Basic section fields displayed');
    
    cy.log('Action: Verify Layout section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Layout');
    cy.log('Verified: Layout section selected');
    PactveraTemplatePage.verifyLayoutFieldsVisible();
    cy.log('Verified: Layout section fields displayed');
    
    cy.log('Action: Verify Data section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Data');
    cy.log('Verified: Data section selected');
    PactveraTemplatePage.verifyDataFieldsVisible();
    cy.log('Verified: Data section fields displayed');
    
    cy.log('Action: Verify Individual section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Individual');
    cy.log('Verified: Individual section selected');
    PactveraTemplatePage.verifyIndividualFieldsVisible();
    cy.log('Verified: Individual section fields displayed');
    
    cy.log('Action: Verify Documents section fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Documents');
    cy.log('Verified: Documents section selected');
    PactveraTemplatePage.verifyDocumentsFieldsVisible();
    cy.log('Verified: Documents section fields displayed');

    cy.log('Action: Publish form without title');
    FormTemplatePage.publishWithoutTitle();
    cy.log('Verified: Publish without title submitted');
    cy.log('Action: Verify title-required validation');
    FormTemplatePage.verifyTitleRequiredValidation();
    cy.log('Verified: Title-required validation displayed');
    cy.log('Action: Verify publish validation error');
    FormTemplatePage.verifyPublishValidationError();
    cy.log('Verified: Publish validation error displayed');

    cy.log('Action: Open Import Form');
    FormTemplatePage.openImportForm();
    cy.log('Verified: Import Form opened');
    cy.log('Action: Verify Import Form popup');
    FormTemplatePage.verifyImportFormPopup();
    cy.log('Verified: Import Form popup displayed');
    cy.log('Action: Close Import Form');
    FormTemplatePage.closeImportForm();
    cy.log('Verified: Import Form closed');

    cy.log(`Action: Entering template name: ${newTemplateName}`);
    FormTemplatePage.enterTitle(newTemplateName);
    cy.log(`Verified: Template name entered: ${newTemplateName}`);

    cy.log('Action: Export form');
    FormTemplatePage.exportForm();
    cy.log('Verified: Form export opened');
    cy.log('Action: Open form preview');
    FormTemplatePage.openPreview();
    cy.log('Verified: Form preview opened');
    cy.log('Action: Verify form preview');
    FormTemplatePage.verifyPreviewDisplayed();
    cy.log('Verified: Form preview displayed');
    cy.log('Action: Close form preview');
    FormTemplatePage.closePreview();
    cy.log('Verified: Form preview closed');

    cy.log('Action: Open Basic form fields');
    PactveraTemplatePage.clickFormBuilderAccordion('Basic');
    cy.log('Verified: Basic form fields opened');
    cy.log('Action: Add Text Field to form');
    FormTemplatePage.dragBasicFieldToForm('textfield');
    cy.log('Verified: Text Field added to form');
  
    cy.log('Action: Publishing Form Template');
    cy.wait(1500);
    cy.log('Action: Publish Form Template');
    FormTemplatePage.publishTemplate();
    cy.log('Verified: Form Template published');

    cy.log('Action: Verify Form Templates page');
    FormTemplatePage.verifyPageLoaded();
    cy.log('Verified: Form Templates page loaded');
    cy.log(`Action: Search created template: ${newTemplateName}`);
    FormTemplatePage.searchTemplate(newTemplateName);
    cy.log('Verified: Created template search completed');
    FormTemplatePage.verifyTemplateInList(newTemplateName);
    cy.log(`Verified: Created template listed: ${newTemplateName}`);
    
    cy.log('Action: Verifying Form Template actions');
    FormTemplatePage.verifyActionsMenuOptions();
    cy.log('Verified: Form Template actions displayed');
    cy.log('Action: Close Form Template actions menu');
    cy.get('body').click(500, 500);
    cy.log('Verified: Form Template actions menu closed');

    cy.log('Action: Search created Form Template');
    FormTemplatePage.searchTemplate(newTemplateName);
    cy.log('Verified: Form Template search completed');
    cy.log('Action: Open Form Template actions');
    FormTemplatePage.clickFirstTemplateActions();
    cy.log('Verified: Form Template actions opened');
    cy.log('Action: Open Form Template view');
    FormTemplatePage.clickViewTemplate();
    cy.log('Verified: Form Template view opened');
    cy.log('Action: Verify Form Template view page');
    FormTemplatePage.verifyTemplateViewPage();
    cy.log('Verified: Form Template view page displayed');
    cy.log('Action: Verify Form Template view is read-only');
    FormTemplatePage.verifyTemplateViewIsReadOnly();
    cy.log('Verified: Form Template view is read-only');

    cy.log('Action: Navigate to Form Templates');
    FormTemplatePage.clickFormTemplates();
    cy.log('Verified: Form Templates page opened');

    cy.log('Action: Delete all empty folders');
    DocumentTemplatePage.deleteAllEmptyFolders();
    cy.log('Verified: Empty folders deleted');

    cy.log('Verified: Form Templates validation completed successfully');
  });
});
});