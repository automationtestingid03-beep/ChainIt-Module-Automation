import BasePage from './BasePage';

class MyTasksPage extends BasePage {

  // Locators

  get personalBadge() {
    return cy.contains('Personal');
  }

  get logoutButton() {
    return cy.contains('a, button', /logout/i);
  }

  get pageHeading() {
    return cy.contains('My Tasks');
  }

  get todoTab() {
    return cy.contains('To-Do');
  }

  get completedTab() {
    return cy.contains('Completed');
  }

  get startTaskButtons() {
    return cy.contains('Start Task');
  }

  get sidebarLinkLabels() {
    return [
      'Home',
      'Profile',
      'My Tasks',
      'Sharing Center',
      'Configuration',
      'Subscription & Billing',
      'Pactvera'
    ];
  }

  // URL Verification

  verifyUrl() {
    cy.log('Verifying My Tasks page URL');

    cy.url({ timeout: 30000 })
      .should('include', '/personal/my-tasks');

    cy.log('My Tasks page URL verified successfully');

    return this;
  }

  // Page Heading Verification

  verifyPageHeading() {
    cy.log('Verifying My Tasks page heading');

    this.pageHeading
      .should('be.visible');

    cy.log('My Tasks page heading is visible');

    return this;
  }

  // User Identity Verification

  verifyUserIdentity(accountName) {
    cy.log(`Verifying user identity: "${accountName}"`);

    cy.contains(accountName)
      .should('be.visible');

    cy.log(`User "${accountName}" is visible`);

    cy.log('Verifying Personal badge');

    this.personalBadge
      .should('be.visible');

    cy.log('Personal badge is visible');

    return this;
  }

  // Logout Verification

  verifyLogoutButton() {
    cy.log('Verifying Logout button');

    this.logoutButton
      .should('be.visible');

    cy.log('Logout button is visible');

    return this;
  }

  // To-Do Tab Verification

  verifyToDoTabActive() {
    cy.log('Verifying To-Do tab');

    this.todoTab
      .should('be.visible');

    cy.log('To-Do tab is visible');

    return this;
  }

  // Task List Verification

  verifyStartTaskButtons() {
    cy.log('Verifying Start Task buttons');

    this.startTaskButtons
      .should('be.visible');

    cy.log('Start Task button is visible');

    return this;
  }

  // Sidebar Verification

  verifySidebarLinks() {
    cy.log('Verifying sidebar navigation links');

    this.sidebarLinkLabels.forEach((label) => {
      cy.log(`Verifying sidebar link: "${label}"`);

      cy.contains(label)
        .should('be.visible');
    });

    cy.log('All sidebar navigation links are visible');

    return this;
  }

  // Completed Tab

  clickCompletedTab() {
    cy.log('Clicking Completed tab');

    this.completedTab
      .should('be.visible')
      .click();

    cy.log('Completed tab clicked successfully');

    return this;
  }

  verifyCompletedTabActive() {
    cy.log('Verifying Completed tab');

    this.completedTab
      .should('be.visible');

    cy.log('Completed tab is visible');

    return this;
  }
}

export default new MyTasksPage();