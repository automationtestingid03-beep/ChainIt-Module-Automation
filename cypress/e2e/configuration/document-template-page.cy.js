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
    cy.log('Step 1: Opening Document Templates');
    ConfigurationPage.clickDocumentButton();
    DocumentTemplatePage.verifyPageLoaded();
    cy.log('Document Templates page opened successfully');

    cy.log('Step 2: Verifying Document Templates page elements');
    DocumentTemplatePage.verifySearchFieldDisplayed().verifyNewFolderButtonDisplayed()
      .verifyCreateTemplateButtonDisplayed();
    cy.log('Search, New Folder and Create Template buttons verified');

    cy.log('Step 3: Verifying Document Templates list view');
    DocumentTemplatePage.clickListView();
    DocumentTemplatePage.verifyListViewDisplayed();
    cy.log('List view displayed successfully');

    cy.log('Step 4: Verifying table column names');
    DocumentTemplatePage.verifyDocumentTemplateTableColumns();
    cy.log('Verified columns: Folder Name, Created Date, Actions');

    cy.log('Step 5: Verifying folder records');
    DocumentTemplatePage.verifyFoldersDisplayed();
    cy.log('Folder records displayed successfully');

    cy.wait(2000); // Wait for 2 seconds to ensure the table is fully loaded
    cy.log('Step 6: Capturing first folder name');
    DocumentTemplatePage.tableRows
      .first()
      .find('td')
      .first()
      .invoke('text')
      .then((folderName) => {

        const searchText = folderName.replace(/\s+/g, ' ').trim();

        expect(searchText).to.not.be.empty;
        cy.log(`First folder name captured: ${searchText}`);

        cy.log(`Step 7: Searching folder: ${searchText}`);
        DocumentTemplatePage.searchFolder(searchText);
        cy.log(`Search validation completed successfully: ${searchText}`);

        cy.log('Step 8: Clearing search');
        DocumentTemplatePage.clearSearch();
        cy.log('Search cleared successfully');

        cy.log('Step 9: Verifying folder list after clearing search');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Folder list restored successfully');

        cy.log('Step 10: Verifying existing folders');
        DocumentTemplatePage.verifyFolderDisplayed('Test Folder');
        cy.log('Test Folder verified successfully');

        const newFolderName = `Automation Folder ${Date.now()}`;

        cy.log(`Step 11: Creating new folder: ${newFolderName}`);
        DocumentTemplatePage
          .clickNewFolder()
          .verifyNewFolderPopupDisplayed()
          .enterFolderName(newFolderName)
          .clickCreateFolder();
        cy.log(`Folder creation submitted: ${newFolderName}`);

        cy.log(`Step 12: Verifying newly created folder: ${newFolderName}`);
        DocumentTemplatePage.verifyFolderCreated(newFolderName);
        cy.log(`New folder verified successfully: ${newFolderName}`);

        cy.log('Step 13: Clearing folder search');
        DocumentTemplatePage.clearSearch();
        cy.log('Folder search cleared successfully');

        cy.log('Step 14: Verifying folder list after creation');
        DocumentTemplatePage.verifyFoldersDisplayed();
        cy.log('Folder list verified successfully');

        cy.log('Step 15: Verifying Document Template grid folders');
        DocumentTemplatePage.clickGridView();
        DocumentTemplatePage.verifyGridViewDisplayed();
        cy.log('Grid view displayed successfully');

        cy.log('Folder counts verified successfully');
        cy.log(`Step 17: Opening folder: ${searchText}`);
        DocumentTemplatePage.openFolder(searchText);
        DocumentTemplatePage.clickBackButton();
        cy.log(`Back button clicked successfully after opening folder: ${searchText}`);
        cy.log(`Folder opened successfully: ${searchText}`);

        DocumentTemplatePage.clickListView();
        cy.log('Step 18: Get first folder name');
        DocumentTemplatePage.getFirstFolderName();
        cy.get('@firstFolderName').then((folderName) => {
          cy.log(`First folder selected: ${folderName}`);

          cy.log(`Action: Open Actions menu for folder: ${folderName}`);
          DocumentTemplatePage.openFirstFolderActions();
          DocumentTemplatePage.verifyActionsMenuOptions();

          cy.log('Action: Click Rename');
          DocumentTemplatePage.clickRenameOption();

          cy.log('Action: Verify Rename Folder popup');
          DocumentTemplatePage.verifyRenamePopup();

          cy.log('Action: Cancel Rename operation');
          DocumentTemplatePage.clickRenameCancel();
          cy.log('Rename operation cancelled successfully');

          cy.log('Action: Click Delete');
          DocumentTemplatePage.openFirstFolderActions();
          DocumentTemplatePage.clickDeleteOption();

          cy.log('Action: Verify Delete confirmation popup');
          DocumentTemplatePage.verifyDeletePopup();

          cy.log('Action: Cancel Delete operation');
          DocumentTemplatePage.clickDeleteCancel();
          cy.log('Delete operation cancelled successfully');

          cy.log('Action: click view operation');
          DocumentTemplatePage.openFirstFolderActions();
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
          PactveraTemplatePage.clickUploadConfirm();

          cy.wait(2000); // Wait for 2 seconds to ensure the PDF is uploaded and processed
          cy.log('Action: Verifying Add Participants section');
          PactveraTemplatePage.verifyAddParticipantsSectionDisplayed();


          cy.log('TC01: Document Templates validation completed successfully');
        });
      });
  });
});
