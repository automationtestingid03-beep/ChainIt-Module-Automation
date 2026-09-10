import BasePage from "./BasePage";


class SidebarPage extends BasePage {

  get dashboard() {
    return cy.contains('a, button, div', /^Dashboard$/)
      .filter(':visible')
      .first();
  }

  get kyc() {
    return cy.contains('button, a, div', /^KYC$/)
      .filter(':visible')
      .first();
  }

  get kyb() {
    return cy.contains('button, a, div', /^KYB$/)
      .filter(':visible')
      .first();
  }

  get pactvera() {
    return cy.contains('button, a, div', /^Pactvera$/)
      .filter(':visible')
      .first();
  }

  get dataRoom() {
    return cy.contains('button, a, div', /^Data Room$/)
      .filter(':visible')
      .first();
  }

  get administration() {
    return cy.contains('button, a, div', /^Administration$/)
      .filter(':visible')
      .first();
  }

  get configuration() {
    return cy.contains('button, a, div', /^Configuration$/)
      .filter(':visible')
      .first();
  }

   get kycGetStarted() {
    return cy.contains('a, button, div', /^Get Started$/)
      .filter(':visible')
      .first();
  }

  get kycConfiguration() {
    return cy.contains('a, button, div', /^Configuration$/)
      .filter(':visible')
      .first();
  }

  get kycCustomers() {
    return cy.contains('a, button, div', /^Customers$/)
      .filter(':visible')
      .first();
  }

  get scheduledReverifications() {
    return cy.contains('a, button, div', /^Scheduled Reverifications$/)
      .filter(':visible')
      .first();
  }

  get availableReverifications() {
    return cy.contains('a, button, div', /^Available Reverifications$/)
      .filter(':visible')
      .first();
  }

  get kybGetStarted() {
    return cy.contains('a, button, div', /^Get Started$/)
      .filter(':visible')
      .first();
  }

  get kybConfiguration() {
    return cy.contains('a, button, div', /^Configuration$/)
      .filter(':visible')
      .first();
  }

  get pactveraMain() {
    return cy.contains('a, button, div', /^Main$/)
      .filter(':visible')
      .first();
  }

  get pactveraReceived() {
    return cy.contains('a, button, div', /^Received$/)
      .filter(':visible')
      .first();
  }

  get pactveraSent() {
    return cy.contains('a, button, div', /^Sent$/)
      .filter(':visible')
      .first();
  }

  get pactveraFolders() {
    return cy.contains('a, button, div', /^Folders$/)
      .filter(':visible')
      .first();
  }

  get pactveraDrafts() {
    return cy.contains('a, button, div', /^Drafts$/)
      .filter(':visible')
      .first();
  }

  get pactveraCancelled() {
    return cy.contains('a, button, div', /^Cancelled$/)
      .filter(':visible')
      .first();
  }

  get pactveraConnections() {
    return cy.contains('a, button, div', /^Connections$/)
      .filter(':visible')
      .first();
  }

   get dataRoomSetup() {
    return cy.contains('a, button, div', /^Setup$/)
      .filter(':visible')
      .first();
  }

  get dataRoomOpen() {
    return cy.contains('a, button, div', /^Open$/)
      .filter(':visible')
      .first();
  }

  get dataRoomClosed() {
    return cy.contains('a, button, div', /^Closed$/)
      .filter(':visible')
      .first();
  }

  get myOrgId() {
    return cy.contains('a, button, div', /^My Org ID$/)
      .filter(':visible')
      .first();
  }

  get myVerifications() {
    return cy.contains('a, button, div', /^My Verifications$/)
      .filter(':visible')
      .first();
  }

  get adminAvailableVerifications() {
    return cy.contains('a, button, div', /^Available Verifications$/)
      .filter(':visible')
      .first();
  }

  get userManagement() {
    return cy.contains('a, button, div', /^User Management$/)
      .filter(':visible')
      .first();
  }

  get spendingLimits() {
    return cy.contains('a, button, div', /^Spending Limits$/)
      .filter(':visible')
      .first();
  }

  get notifications() {
    return cy.contains('a, button, div', /^Notifications$/)
      .filter(':visible')
      .first();
  }

  get recentActivity() {
    return cy.contains('a, button, div', /^Recent Activity$/)
      .filter(':visible')
      .first();
  }

   get pactveraTemplates() {
    return cy.contains('a, button, div', /^Pactvera Templates$/)
      .filter(':visible')
      .first();
  }

  get documentTemplates() {
    return cy.contains('a, button, div', /^Document Templates$/)
      .filter(':visible')
      .first();
  }

  get formTemplates() {
    return cy.contains('a, button, div', /^Form Templates$/)
      .filter(':visible')
      .first();
  }

  get tcaTemplates() {
    return cy.contains('a, button, div', /^TCA Templates$/)
      .filter(':visible')
      .first();
  }

  get workflow() {
    return cy.contains('a, button, div', /^Workflow$/)
      .filter(':visible')
      .first();
  }

  clickKYC() {
    cy.log('Action: Open KYC sidebar');
    this.kyc.should('be.visible').click({ force: true });
    return this;
  }

  clickKYB() {
    cy.log('Action: Open KYB sidebar');
    this.kyb.should('be.visible').click({ force: true });
    return this;
  }

  clickPactvera() {
    cy.log('Action: Open Pactvera sidebar');
    this.pactvera.should('be.visible').click({ force: true });
    return this;
  }

  clickDataRoom() {
    cy.log('Action: Open Data Room sidebar');
    this.dataRoom.should('be.visible').click({ force: true });
    return this;
  }

  clickAdministration() {
    cy.log('Action: Open Administration sidebar');
    this.administration.should('be.visible').click({ force: true });
    return this;
  }

  clickConfiguration() {
    cy.log('Action: Open Configuration sidebar');
    this.configuration.should('be.visible').click({ force: true });
    return this;
  }

   clickTCATemplates() {
    cy.log('Action: clcik TCA templates submenu');
    this.tcaTemplates.should('be.visible').click({ force: true });
    return this;
  }

   clickPactveraMain() {
    cy.log('Action: Click Pactvera main submenu');
    this.pactveraMain.should('be.visible').click({ force: true });
    return this;
  }

   clickPactveraSent() {
    cy.log('Action: Click Pactvera sent submenu');
    this.pactveraSent.should('be.visible').click({ force: true });
    return this;
  }

  verifyKYCSubmenu() {
    cy.log('Action: Verify KYC submenu');

    this.kycGetStarted.should('be.visible');
    this.kycConfiguration.should('be.visible');
    this.kycCustomers.should('be.visible');
    this.scheduledReverifications.should('be.visible');
    this.availableReverifications.should('be.visible');

    cy.log('VERIFIED: All KYC submenu items displayed');

    return this;
  }

  verifyKYBSubmenu() {
    cy.log('Action: Verify KYB submenu');

    this.kybGetStarted.should('be.visible');
    this.kybConfiguration.should('be.visible');

    cy.log('VERIFIED: All KYB submenu items displayed');

    return this;
  }

  verifyPactveraSubmenu() {
    cy.log('Action: Verify Pactvera submenu');

    this.pactveraMain.should('be.visible');
    this.pactveraReceived.should('be.visible');
    this.pactveraSent.should('be.visible');
    this.pactveraFolders.should('be.visible');
    this.pactveraDrafts.should('be.visible');
    this.pactveraCancelled.should('be.visible');
    this.pactveraConnections.should('be.visible');

    cy.log('VERIFIED: All Pactvera submenu items displayed');

    return this;
  }

  verifyDataRoomSubmenu() {
    cy.log('Action: Verify Data Room submenu');

    this.dataRoomSetup.should('be.visible');
    this.dataRoomOpen.should('be.visible');
    this.dataRoomClosed.should('be.visible');

    cy.log('VERIFIED: All Data Room submenu items displayed');

    return this;
  }

   verifyAdministrationSubmenu() {
    cy.log('Action: Verify Administration submenu');

    this.myOrgId.should('be.visible');
    this.myVerifications.should('be.visible');
    this.adminAvailableVerifications.should('be.visible');
    this.userManagement.should('be.visible');
    this.spendingLimits.should('be.visible');
    this.notifications.should('be.visible');
    this.recentActivity.should('be.visible');

    cy.log('VERIFIED: All Administration submenu items displayed');

    return this;
  }

   verifyConfigurationSubmenu() {
    cy.log('Action: Verify Configuration submenu');

    this.pactveraTemplates.should('be.visible');
    this.documentTemplates.should('be.visible');
    this.formTemplates.should('be.visible');
    this.tcaTemplates.should('be.visible');
    this.workflow.should('be.visible');

    cy.log('VERIFIED: All Configuration submenu items displayed');

    return this;
  }

    verifyMainSidebar() {
    cy.log('Action: Verify main sidebar');

    this.dashboard.should('be.visible');
    this.kyc.should('be.visible');
    this.kyb.should('be.visible');
    this.pactvera.should('be.visible');
    this.dataRoom.should('be.visible');
    this.administration.should('be.visible');
    this.configuration.should('be.visible');

    cy.log('VERIFIED: Main sidebar items are displayed');

    return this;
  }
}

export default new SidebarPage();