import SwitchAccountModal from '../../pages/SwitchAccountModal';
import ConfigurationPage from '../../pages/ConfigurationPage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';

const ADMIN_URL = 'https://develop-admin.chainit.online';

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

  it('should open Document template page', () => {
    ConfigurationPage.clickDocumentButton();
    DocumentTemplatePage.verifyPageLoaded();
  });

  it('should create a new document folder', () => {
    ConfigurationPage.clickDocumentButton();

    const folderName = `Automation Folder ${Date.now()}`;

    DocumentTemplatePage.clickNewFolder();
    DocumentTemplatePage.enterFolderName(folderName);
    DocumentTemplatePage.clickCreateFolder();
  });
});
