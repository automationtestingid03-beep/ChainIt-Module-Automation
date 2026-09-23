import ConfigurationPage from '../../pages/ConfigurationPage';
import LoginPage from '../../pages/LoginPage';
import AdministrationPage from '../../pages/AdministrationPage';
import OrgIdVdtPage from '../../pages/administration/myOrgId/OrgIdVdtPage';
import ProductPage from '../../pages/administration/myOrgId/ProductPage';
import TCATemplatePage from '../../pages/configuration/TCATemplatePage';
import SidebarPage from '../../pages/SidebarPage';
import PactveraMainPage from '../../pages/pactvera/PactveraMainPage';
import PactveraTemplatePage from '../../pages/configuration/PactveraTemplatePage';
import DocumentTemplatePage from '../../pages/configuration/DocumentTemplatePage';
import FormTemplatePage from '../../pages/configuration/FormTemplatePage';
import HomePage from '../../pages/HomePage';


const workFlowTest = 'cypress/fixtures/tca_workflow_test.json';
const TCAFlowDocument_PDF = 'cypress/fixtures/Age.pdf';
//const TCAFlowDocument_PDF = 'cypress/fixtures/Form PT-nb8.pdf';



describe('Configuration - TCA Templates', () => {
 
  beforeEach(() => {
    cy.log('Action: Log in and select organization account');
    LoginPage.loginWithQrAndSelectAccount('organization');
    cy.log('Verified: Organization account selected');
  });



 it('TC01: should validate All Pactvera Main page cards and navigation actions', () => {

  cy.log('Action: Open Pactvera menu');
  SidebarPage.clickPactvera();
  cy.log('Verified: Pactvera menu opened');

  cy.log('Action: Navigate to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  cy.log('Verified: Pactvera Main navigation completed');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Action: Verify Send a Pactvera card');
  PactveraMainPage.verifySendPactveraCard();
  cy.log('Verified: Send a Pactvera card displayed');

  cy.log('Action: Open Create & Send');
  PactveraMainPage.clickCreateAndSend();
  cy.log('Verified: Create a Pactvera popup opened');

  cy.log('Action: Close Create a Pactvera popup');
  PactveraMainPage.closeCreatePactveraPopup();
  cy.log('Verified: Create a Pactvera popup closed');

  cy.log('Action: Verify View Received Pactveras card');
  PactveraMainPage.verifyReceivedPactveraCard();
  cy.log('Verified: View Received Pactveras card displayed');

  cy.log('Action: Open received Pactveras');
  PactveraMainPage.clickOpenReceived();
  cy.log('Verified: Received Pactveras page opened');

  cy.log('Action: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  cy.log('Verified: Main breadcrumb clicked');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Action: Verify View Sent Pactveras card');
  PactveraMainPage.verifySentPactveraCard();
  cy.log('Verified: View Sent Pactveras card displayed');

  cy.log('Action: Open sent Pactveras');
  PactveraMainPage.clickViewSent();
  cy.log('Verified: Sent Pactveras page opened');

  cy.log('Action: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  cy.log('Verified: Main breadcrumb clicked');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Action: Verify Manage Templates card');
  PactveraMainPage.verifyManageTemplatesCard();
  cy.log('Verified: Manage Templates card displayed');

  cy.log('Action: Open Pactvera Templates');
  PactveraMainPage.clickOpenTemplates();
  cy.log('Verified: Pactvera Templates page opened');

  cy.log('Action: Navigate back to Pactvera Main page');
  SidebarPage.clickPactveraMain();
  cy.log('Verified: Pactvera Main navigation completed');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Action: Verify Manage Connections card');
  PactveraMainPage.verifyManageConnectionsCard();
  cy.log('Verified: Manage Connections card displayed');

  cy.log('Action: Open Connections');
  PactveraMainPage.clickGoToConnections();
  cy.log('Verified: Connections page opened');

  cy.log('Action: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  cy.log('Verified: Main breadcrumb clicked');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Action: Verify View and Manage Sent Folders card');
  PactveraMainPage.verifySentFoldersCard();
  cy.log('Verified: View and Manage Sent Folders card displayed');

  cy.log('Action: Open Sent Folders');
  PactveraMainPage.clickViewFolders();
  cy.log('Verified: Sent Folders page opened');

  cy.log('Action: Navigate back to Pactvera Main page');
  PactveraMainPage.clickMainBreadcrumb();
  cy.log('Verified: Main breadcrumb clicked');
  cy.log('Action: Verify Pactvera Main page');
  PactveraMainPage.verifyMainPageDisplayed();
  cy.log('Verified: Pactvera Main page displayed');

  cy.log('Verified: All Pactvera Main page cards and navigation actions are working successfully');
});
});
