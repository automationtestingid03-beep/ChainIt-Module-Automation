import SidebarPage from '../pages/SidebarPage';
import LoginPage from '../pages/LoginPage';

describe('Configuration - TCA Templates', () => {

  beforeEach(() => {
    LoginPage.loginWithQrAndSelectAccount('organization');
  });
  it('TC01: Verify complete sidebar navigation', () => {
  cy.log('Action: Verify main sidebar');
  SidebarPage.verifyMainSidebar();
  cy.log('Verified: Verify main sidebar');

  cy.log('Action: Open KYC submenu');
  SidebarPage.clickKYC();
  cy.log('Verified: Open KYC submenu');
  cy.log('Action: Verify KYC submenu');
  SidebarPage.verifyKYCSubmenu();
  cy.log('Verified: Verify KYC submenu');
  cy.log('Action: Close KYC submenu');
  SidebarPage.clickKYC();
  cy.log('Verified: Close KYC submenu');

  cy.log('Action: Open KYB submenu');
  SidebarPage.clickKYB();
  cy.log('Verified: Open KYB submenu');
  cy.log('Action: Verify KYB submenu');
  SidebarPage.verifyKYBSubmenu();
  cy.log('Verified: Verify KYB submenu');
  cy.log('Action: Close KYB submenu');
  SidebarPage.clickKYB();
  cy.log('Verified: Close KYB submenu');

  cy.log('Action: Open Pactvera submenu');
  SidebarPage.clickPactvera();
  cy.log('Verified: Open Pactvera submenu');
  cy.log('Action: Verify Pactvera submenu');
  SidebarPage.verifyPactveraSubmenu();
  cy.log('Verified: Verify Pactvera submenu');
  cy.log('Action: Close Pactvera submenu');
  SidebarPage.clickPactvera();
  cy.log('Verified: Close Pactvera submenu');

  cy.log('Action: Open Data Room submenu');
  SidebarPage.clickDataRoom();
  cy.log('Verified: Open Data Room submenu');
  cy.log('Action: Verify Data Room submenu');
  SidebarPage.verifyDataRoomSubmenu();
  cy.log('Verified: Verify Data Room submenu');
  cy.log('Action: Close Data Room submenu');
  SidebarPage.clickDataRoom();
  cy.log('Verified: Close Data Room submenu');

  cy.log('Action: Open Administration submenu');
  SidebarPage.clickAdministration();
  cy.log('Verified: Open Administration submenu');
  cy.log('Action: Verify Administration submenu');
  SidebarPage.verifyAdministrationSubmenu();
  cy.log('Verified: Verify Administration submenu');
  cy.log('Action: Close Administration submenu');
  SidebarPage.clickAdministration();
  cy.log('Verified: Close Administration submenu');

  cy.log('Action: Open Configuration submenu');
  SidebarPage.clickConfiguration();
  cy.log('Verified: Open Configuration submenu');
  cy.log('Action: Verify Configuration submenu');
  SidebarPage.verifyConfigurationSubmenu();
  cy.log('Verified: Verify Configuration submenu');
  cy.log('Action: Close Configuration submenu');
  SidebarPage.clickConfiguration();
  cy.log('Verified: Close Configuration submenu');

  cy.log('Verified: Complete sidebar navigation');
    
  });
});