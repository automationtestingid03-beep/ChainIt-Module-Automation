import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';

const ADMIN_URL = 'https://develop-admin.chainit.online';
const DUMMY_PDF = 'cypress/fixtures/gaurav.pdf';

describe('Configuration - Document Templates', () => {
  beforeEach(() => {
    cy.log('Step 1: Opening QR Scan page');
    cy.visit(`${ADMIN_URL}/scan-qr`);
    cy.contains('Scan or Tap the QR Code Login')
      .should('be.visible');
    cy.log('QR Scan page is displayed successfully');

    cy.log('Step 2: Please scan the QR code using the mobile app');
    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.log('QR scan process resumed');
    cy.log('Step 3: Waiting for QR login to complete');
    cy.url({ timeout: 120000 })
      .should('not.include', '/scan-qr');
    cy.log('QR login completed successfully');

    cy.log('Step 4: Verifying Switch Account modal');
    SwitchAccountModal.verifyVisible();
    SwitchAccountModal.clickIndividualAccount();

    cy.log('Step 5: Opening Configuration');
    ConfigurationPage.clickConfigurationButton();
  });

  // Complete document template validation
  it('TC01: should validate Document Templates page, folders, search and create folder', () => {
    cy.log('TC01: Document Templates Complete Validation');
    cy.log('Action: Opening Document Templates');
    ConfigurationPage.clickDocumentButton();
    DocumentTemplatePage.verifyPageLoaded();
    cy.log('Document Templates page opened successfully');

    cy.log('Action: Verifying Document Templates page elements');
    DocumentTemplatePage.verifySearchFieldDisplayed().verifyNewFolderButtonDisplayed()
      .verifyCreateTemplateButtonDisplayed();
    cy.log('Search, New Folder and Create Template buttons verified');

    cy.log('Action: Verifying Document Templates list view');
    DocumentTemplatePage.clickListView();
    DocumentTemplatePage.verifyListViewDisplayed();
    cy.log('List view displayed successfully');

    cy.log('Action: Verifying table column names');
    DocumentTemplatePage.verifyDocumentTemplateTableColumns();
    cy.log('Verified columns: Folder Name, Created Date, Actions');

    cy.log('Action: Verifying folder records');
    DocumentTemplatePage.verifyFoldersDisplayed();
    cy.log('Folder records displayed successfully');

    cy.wait(2000); 
    cy.log('Action: Capturing first folder name');
    DocumentTemplatePage.tableRows
      .first()
      .find('td')
      .first()
      .invoke('text')
      .then((folderName) => {

        const searchText = folderName.replace(/\s+/g, ' ').trim();

        expect(searchText).to.not.be.empty;
        cy.log(`First folder name captured: ${searchText}`);

        cy.log(`Action: Searching folder: ${searchText}`);
        DocumentTemplatePage.searchFolder(searchText);
        cy.log(`Search validation completed successfully: ${searchText}`);

        cy.log('Action: Clearing search');
        DocumentTemplatePage.clearSearch();
        cy.log('Search cleared successfully');

        cy.log('Action: Verifying folder list after clearing search');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Folder list restored successfully');

        cy.log('Action: Verifying existing folders');
        DocumentTemplatePage.verifyFolderDisplayed('Test Folder');
        cy.log('Test Folder verified successfully');

        const newFolderName = `Automation Folder ${Date.now()}`;

        cy.log(`Action: Creating new folder: ${newFolderName}`);
        DocumentTemplatePage
          .clickNewFolder()
          .verifyNewFolderPopupDisplayed()
          .enterFolderName(newFolderName)
          .clickCreateFolder();
        cy.log(`Folder creation submitted: ${newFolderName}`);

        cy.log(`Action: Verifying newly created folder: ${newFolderName}`);
        DocumentTemplatePage.verifyFolderCreated(newFolderName);
        cy.log(`New folder verified successfully: ${newFolderName}`);

        cy.log('Action: Clearing folder search');
        DocumentTemplatePage.clearSearch();
        cy.log('Folder search cleared successfully');

        cy.log('Action: Verifying folder list after creation');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Folder list verified successfully');

        cy.log('Action: Verifying Document Template grid folders');
        DocumentTemplatePage.clickGridView();
        DocumentTemplatePage.verifyGridViewDisplayed();
        cy.log('Grid view displayed successfully');

        cy.log('Folder counts verified successfully');
        cy.log(`Action: Opening folder: ${searchText}`);
        DocumentTemplatePage.openFolder(searchText);
        DocumentTemplatePage.clickBackButton();
        cy.log(`Back button clicked successfully after opening folder: ${searchText}`);
        cy.log(`Folder opened successfully: ${searchText}`);

        DocumentTemplatePage.clickListView();
        cy.log('Action: Get first folder name');
        DocumentTemplatePage.getFirstFolderName();
        cy.get('@firstFolderName').then((folderName) => {
        cy.log(`First folder selected: ${folderName}`);

          cy.log(`Action: Open Actions menu for folder: ${folderName}`);
          DocumentTemplatePage.clickFirstRecordActions();
          DocumentTemplatePage.verifyActionsMenuOptions();

          cy.log('Action: Click Rename');
          DocumentTemplatePage.clickRenameOption();

          cy.log('Action: Verify Rename Folder popup');
          DocumentTemplatePage.verifyRenamePopup();

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

          cy.log('Action: Click Create Template');
          DocumentTemplatePage.clickCreateTemplate();
          cy.log('Action: Select first folder');
          DocumentTemplatePage.selectFirstFolder();
          cy.log('Action: Click Creating Document template');
          PactveraTemplatePage.clickCreate();

          cy.log('Action: Uploading PDF');
          PactveraTemplatePage.uploadPdfFile(DUMMY_PDF);

          cy.log('Action: Confirming PDF upload');
          DocumentTemplatePage.clickUploadConfirm();

          cy.wait(3000); 
          cy.log('Action: Verifying Add Placeholders section');
          DocumentTemplatePage.verifyAddPlaceholdersSectionDisplayed();

          cy.log('Action: Clicking Continue');
          PactveraTemplatePage.clickContinue();

          cy.log('Action: Verifying Add Fields page');
          PactveraTemplatePage.verifyAddFieldsPageDisplayed();

          cy.log('Action: Dragging Signature field onto document');
          PactveraTemplatePage.dragFieldToCanvas(PactveraTemplatePage.signatureField);

          cy.log('Action: Verifying Signature field');
          PactveraTemplatePage.verifySignatureFieldPlacedOnCanvas();

          cy.log('Action: Saving document configuration');
          PactveraTemplatePage.clickSaveTemplate();

          cy.log('Action: Click Actions menu for first document template');
          DocumentTemplatePage.clickFirstDocumentActions();

          cy.log('Action: Verifying Actions menu options for document template');
          DocumentTemplatePage.verifyDocumentTemplateActions();

          cy.log('Action: get first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();

          cy.log('Action: Click Actions menu for first document template');
          DocumentTemplatePage.clickFirstDocumentActions();
          cy.contains('Delete').should('be.visible').click({ force: true });
          DocumentTemplatePage.clickDeleteFirstDocumentTemplate();

          cy.log('Action: Verifying Delete confirmation popup for document template');
          DocumentTemplatePage.verifyDocumentTemplateDeletePopup();

          cy.log('Action: Confirming Delete operation for document template');
          DocumentTemplatePage.confirmDeleteDocumentTemplate();

          cy.log('Action: get document template count before duplicate');
          DocumentTemplatePage.getDocumentTemplateCountBeforeDuplicate();

          cy.log('Action: get first document template name before duplicate');
          DocumentTemplatePage.getFirstDocumentTemplateName();

          cy.log('Action: Click Actions menu for first document template');
          DocumentTemplatePage.clickDuplicateFirstDocumentTemplate();

          cy.log('Action: Verifying Duplicate confirmation for document template');
          DocumentTemplatePage.verifyDocumentTemplateDuplicatedMessage();

          cy.log('Action: get document template count after duplicate');
          DocumentTemplatePage.verifyDocumentTemplateCountIncreased();

          cy.log('Action: get first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();

          cy.log('Action: Click Actions Move for first document template');
          DocumentTemplatePage.clickMoveFirstDocumentTemplate();

          cy.log('Action: Verifying Move to Folder popup for document template');
          DocumentTemplatePage.verifyMoveToFolderPopup();

          cy.log('Action: Select second folder for move');
          DocumentTemplatePage.selectSecondFolderForMove();

          cy.log('Action: Confirming Move operation for document template');
          DocumentTemplatePage.confirmMoveDocumentTemplate();

          cy.log('Action: get first document template name');
          DocumentTemplatePage.getFirstDocumentTemplateName();

          cy.log('Action: Click Actions View for first document template');
          DocumentTemplatePage.clickViewFirstDocumentTemplate();

          cy.log('Action: Verifying Document Template View page');
          DocumentTemplatePage.verifyDocumentTemplateViewPage();

          cy.log('Action: Verifying Document Template Name in View page');
          DocumentTemplatePage.verifyDocumentTemplateNameInView();

          cy.log('Action: Verifying Document Template View is Read-Only');
          DocumentTemplatePage.verifyDocumentTemplateViewIsReadOnly();

          cy.log('Action: Click Edit button in Document Template View page');
          DocumentTemplatePage.clickEditDocumentTemplate();

          cy.log('Action: Click Advanced options');
          DocumentTemplatePage.clickAdvancedOptions();

          cy.log('Action: Verifying Advanced Options popup');
          DocumentTemplatePage.verifyAdvancedOptionsPopup();

          cy.log('Action: Verifying Allowed Signature Types in Advanced Options');
          DocumentTemplatePage.verifyAllowedSignatureTypes();

          cy.log('Action: click Cancel in Advanced Options');
          DocumentTemplatePage.clickAdvancedOptionsCancel();

          cy.log('Action: click on Document Templates in header');
          DocumentTemplatePage.clickDocumentTemplates();

          cy.log('Action: Delete all Empty folder');
          DocumentTemplatePage.deleteAllEmptyFolders();


          cy.log('TC01: Document Templates validation completed successfully');
        });
      });
  });
});
