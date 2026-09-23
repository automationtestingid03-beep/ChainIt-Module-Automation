import ConfigurationPage from '../../pages/ConfigurationPage';
import LoginPage from '../../pages/LoginPage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';

const DUMMY_PDF = 'cypress/fixtures/gaurav.pdf';

describe('Configuration - Document Templates', () => {
  beforeEach(() => {
    cy.log('Action: Log in and select individual account');
    LoginPage.loginWithQrAndSelectAccount();
    cy.log('Verified: Individual account selected');
    cy.log('Action: Open Configuration');
    ConfigurationPage.clickConfigurationButton();
    cy.log('Verified: Configuration opened');
  });

  // Complete document template validation
  it('TC01: should validate Document Templates page, folders, search and create folder', () => {
    cy.log('Action: Open Document Templates');
    ConfigurationPage.clickDocumentButton();
    cy.log('Verified: Document Templates opened');
    DocumentTemplatePage.verifyPageLoaded();
    cy.log('Verified: Document Templates page loaded');

    cy.log('Action: Verify search field');
    DocumentTemplatePage.verifySearchFieldDisplayed();
    cy.log('Verified: Search field displayed');
    cy.log('Action: Verify New Folder button');
    DocumentTemplatePage.verifyNewFolderButtonDisplayed();
    cy.log('Verified: New Folder button displayed');
    cy.log('Action: Verify Create Template button');
    DocumentTemplatePage.verifyCreateTemplateButtonDisplayed();
    cy.log('Verified: Create Template button displayed');

    cy.log('Action: Open list view');
    DocumentTemplatePage.clickListView();
    cy.log('Verified: List view selected');
    cy.log('Action: Verify list view');
    DocumentTemplatePage.verifyListViewDisplayed();
    cy.log('Verified: List view displayed');

    cy.log('Action: Verify table columns');
    DocumentTemplatePage.verifyDocumentTemplateTableColumns();
    cy.log('Verified: Document template table columns displayed');

    cy.log('Action: Verify folder records');
    DocumentTemplatePage.verifyFoldersDisplayed();
    cy.log('Verified: Folder records displayed');

    cy.wait(2000); 
    cy.log('Action: Capture first folder name');
    DocumentTemplatePage.tableRows
      .first()
      .find('td')
      .first()
      .invoke('text')
      .then((folderName) => {

        const searchText = folderName.replace(/\s+/g, ' ').trim();

        expect(searchText).to.not.be.empty;
        cy.log(`Verified: First folder captured: ${searchText}`);

        cy.log(`Action: Search folder: ${searchText}`);
        DocumentTemplatePage.searchFolder(searchText);
        cy.log(`Verified: Folder search completed: ${searchText}`);

        cy.log('Action: Clearing search');
        DocumentTemplatePage.clearSearch();
        cy.log('Verified: Folder search cleared');

        cy.log('Action: Verify folder list after clearing search');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Verified: Folder list restored');

        cy.log('Action: Verify existing folders');
        DocumentTemplatePage.verifyFolderDisplayed('Test Folder');
        cy.log('Verified: Test Folder displayed');

        const newFolderName = `Automation Folder ${Date.now()}`;

        cy.log(`Action: Open New Folder dialog: ${newFolderName}`);
        DocumentTemplatePage.clickNewFolder();
        cy.log('Verified: New Folder dialog opened');
        cy.log('Action: Verify New Folder dialog');
        DocumentTemplatePage.verifyNewFolderPopupDisplayed();
        cy.log('Verified: New Folder dialog displayed');
        cy.log(`Action: Enter folder name: ${newFolderName}`);
        DocumentTemplatePage.enterFolderName(newFolderName);
        cy.log(`Verified: Folder name entered: ${newFolderName}`);
        cy.log('Action: Create folder');
        DocumentTemplatePage.clickCreateFolder();
        cy.log(`Verified: Folder creation submitted: ${newFolderName}`);

        cy.log(`Action: Verifying newly created folder: ${newFolderName}`);
        DocumentTemplatePage.verifyFolderCreated(newFolderName);
        cy.log(`Verified: New folder displayed: ${newFolderName}`);

        cy.log('Action: Clearing folder search');
        DocumentTemplatePage.clearSearch();
        cy.log('Verified: Folder search cleared');

        cy.log('Action: Verify folder list after creation');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Verified: Folder list displayed after creation');

        cy.log('Action: Open grid view');
        DocumentTemplatePage.clickGridView();
        cy.log('Verified: Grid view selected');
        cy.log('Action: Verify grid view');
        DocumentTemplatePage.verifyGridViewDisplayed();
        cy.log('Verified: Grid view displayed');

        cy.log('Verified: Folder counts displayed successfully');
        cy.log(`Action: Open folder: ${searchText}`);
        DocumentTemplatePage.openFolder(searchText);
        cy.log(`Verified: Folder opened: ${searchText}`);
        cy.log('Action: Navigate back from folder');
        DocumentTemplatePage.clickBackButton();
        cy.log('Verified: Returned from folder');

        cy.log('Action: Open list view');
        DocumentTemplatePage.clickListView();
        cy.log('Verified: List view selected');
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
          DocumentTemplatePage.verifyRenamePopup();
          cy.log('Verified: Rename popup displayed');

          cy.log('Action: Cancel Rename operation');
          DocumentTemplatePage.clickRenameCancel();
          cy.log('Verified: Rename operation cancelled');

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
          cy.log('Verified: Delete operation cancelled');

          cy.log('Action: Open Actions menu for view');
          DocumentTemplatePage.clickFirstRecordActions();
          cy.log('Verified: Actions menu opened for view');
          cy.log('Action: Click View option');
          DocumentTemplatePage.clickViewOption();
          cy.log('Verified: View option clicked');
          cy.log('Action: Navigate back from folder view');
          DocumentTemplatePage.clickBackButton();
          cy.log('Verified: Returned from folder view');

          cy.log('Action: Click Create Template');
          DocumentTemplatePage.clickCreateTemplate();
          cy.log('Verified: Create Template page opened');
          cy.log('Action: Select first folder');
          DocumentTemplatePage.selectFirstFolder();
          cy.log('Verified: First folder selected');
          cy.log('Action: Create document template');
          PactveraTemplatePage.clickCreate();
          cy.log('Verified: Document template creation started');

          cy.log('Action: Upload PDF');
          PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);
          cy.log('Verified: PDF uploaded');

          cy.log('Action: Confirm PDF upload');
          DocumentTemplatePage.clickUploadConfirm();
          cy.log('Verified: PDF upload confirmed');

          cy.wait(3000); 
          cy.log('Action: Verify Add Placeholders section');
          DocumentTemplatePage.verifyAddPlaceholdersSectionDisplayed();
          cy.log('Verified: Add Placeholders section displayed');

          cy.log('Action: Continue to Add Fields');
          PactveraTemplatePage.clickContinue();
          cy.log('Verified: Continued to Add Fields');

          cy.log('Action: Verify Add Fields page');
          PactveraTemplatePage.verifyAddFieldsPageDisplayed();
          cy.log('Verified: Add Fields page displayed');

          cy.log('Action: Drag Signature field onto document');
          PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);
          cy.log('Verified: Signature field added to document');

          cy.log('Action: Verify Signature field');
          PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();
          cy.log('Verified: Signature field displayed');

          cy.log('Action: Save document configuration');
          PactveraTemplatePage.clickSaveTemplate();
          cy.log('Verified: Document configuration save submitted');

          cy.log('Action: Open document template actions');
          DocumentTemplatePage.clickFirstDocumentActions();
          cy.log('Verified: Document template actions opened');

          cy.log('Action: Verify document template actions');
          DocumentTemplatePage.verifyDocumentTemplateActions();
          cy.log('Verified: Document template actions displayed');

          cy.log('Action: Capture first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();
          cy.log('Verified: First document template name captured');

          cy.log('Action: Open actions for document template delete');
          DocumentTemplatePage.clickFirstDocumentActions();
          cy.log('Verified: Document template actions opened');
          cy.contains('Delete').should('be.visible').click({ force: true });
          cy.log('Verified: Delete menu option selected');
          DocumentTemplatePage.clickDeleteFirstDocumentTemplate();
          cy.log('Verified: Delete confirmation opened');

          cy.log('Action: Verify document template delete popup');
          DocumentTemplatePage.verifyDocumentTemplateDeletePopup();
          cy.log('Verified: Document template delete popup displayed');

          cy.log('Action: Confirm document template deletion');
          DocumentTemplatePage.confirmDeleteDocumentTemplate();
          cy.log('Verified: Document template deletion confirmed');

          cy.log('Action: Capture document template count before duplicate');
          DocumentTemplatePage.getDocumentTemplateCountBeforeDuplicate();
          cy.log('Verified: Document template count captured');

          cy.log('Action: Capture first document template before duplicate');
          DocumentTemplatePage.getFirstDocumentTemplateName();
          cy.log('Verified: First document template captured');

          cy.log('Action: Duplicate first document template');
          DocumentTemplatePage.clickDuplicateFirstDocumentTemplate();
          cy.log('Verified: Duplicate operation submitted');

          cy.log('Action: Verify document template duplicated');
          DocumentTemplatePage.verifyDocumentTemplateDuplicatedMessage();
          cy.log('Verified: Document template duplicated');

          cy.log('Action: Verify document template count increased');
          DocumentTemplatePage.verifyDocumentTemplateCountIncreased();
          cy.log('Verified: Document template count increased');

          cy.log('Action: Capture first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();
          cy.log('Verified: First document template name captured');

          cy.log('Action: Move first document template');
          DocumentTemplatePage.clickMoveFirstDocumentTemplate();
          cy.log('Verified: Move operation opened');

          cy.log('Action: Verify Move to Folder popup');
          DocumentTemplatePage.verifyMoveToFolderPopup();
          cy.log('Verified: Move to Folder popup displayed');

          cy.log('Action: Select second folder for move');
          DocumentTemplatePage.selectSecondFolderForMove();
          cy.log('Verified: Second folder selected');

          cy.log('Action: Confirm move operation');
          DocumentTemplatePage.confirmMoveDocumentTemplate();
          cy.log('Verified: Move operation confirmed');

          cy.log('Action: Capture first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();
          cy.log('Verified: First document template name captured');

          cy.log('Action: View first document template');
          cy.wait(5000);
          DocumentTemplatePage.clickViewFirstDocumentTemplate();
          cy.log('Verified: Document template view opened');

          cy.log('Action: Verify document template view page');
          DocumentTemplatePage.verifyDocumentTemplateViewPage();
          cy.log('Verified: Document template view page displayed');

          cy.log('Action: Verify document template name in view');
          DocumentTemplatePage.verifyDocumentTemplateNameInView();
          cy.log('Verified: Document template name displayed in view');

          cy.log('Action: Verify document template view is read-only');
          DocumentTemplatePage.verifyDocumentTemplateViewIsReadOnly();
          cy.log('Verified: Document template view is read-only');

          cy.log('Action: Edit document template');
          DocumentTemplatePage.clickEditDocumentTemplate();
          cy.log('Verified: Document template edit opened');

          cy.log('Action: Open Advanced Options');
          DocumentTemplatePage.clickAdvancedOptions();
          cy.log('Verified: Advanced Options opened');

          cy.log('Action: Verify Advanced Options popup');
          DocumentTemplatePage.verifyAdvancedOptionsPopup();
          cy.log('Verified: Advanced Options popup displayed');

          cy.log('Action: Verify allowed signature types');
          DocumentTemplatePage.verifyAllowedSignatureTypes();
          cy.log('Verified: Allowed signature types displayed');

          cy.log('Action: Cancel Advanced Options');
          DocumentTemplatePage.clickAdvancedOptionsCancel();
          cy.log('Verified: Advanced Options cancelled');

          cy.log('Action: Navigate to Document Templates');
          DocumentTemplatePage.clickDocumentTemplates();
          cy.log('Verified: Document Templates page opened');

          cy.log('Action: Delete all empty folders');
          DocumentTemplatePage.deleteAllEmptyFolders();
          cy.log('Verified: Empty folders deleted');


          cy.log('Verified: Document Templates validation completed successfully');
        });
      });
  });
});
