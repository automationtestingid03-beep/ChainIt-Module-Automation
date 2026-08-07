/**
 * MyTasksPage
 * Page object for the personal My Tasks page (/personal/my-tasks).
 *
 * Sidebar links are stored as a single array and iterated — no repetition.
 */
class MyTasksPage {
  // ── Header ────────────────────────────────────────────────────────────────

  get userNameInHeader() {
    return cy.contains('GAURAV SONAR');
  }

  get personalBadge() {
    return cy.contains('Personal');
  }

  get logoutButton() {
    return cy.contains('a, button', /logout/i);
  }

  // ── Page Content ──────────────────────────────────────────────────────────

  get pageHeading() {
    return cy.contains("My Tasks");
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

  // ── Sidebar ───────────────────────────────────────────────────────────────

  /**
   * Sidebar link labels — defined once as an array so verifySidebarLinks()
   * can iterate without duplicating any assertion.
   */
  get sidebarLinkLabels() {
    return [
      'Home',
      'Profile',
      'My Tasks',
      'Sharing Center',
      'Configuration',
      'Subscription & Billing',
      'Pactvera',
    ];
  }

  // ── Verifications ─────────────────────────────────────────────────────────

  verifyUrl() {
    // Uses a 30-second timeout because navigation after the Switch Account
    // modal click can be slower than the default 10-second command timeout.
    cy.url({ timeout: 30000 }).should('include', '/personal/my-tasks');
    return this;
  }

  verifyPageHeading() {
    this.pageHeading.should('be.visible');
    return this;
  }

  verifyUserIdentity() {
    this.userNameInHeader.should('be.visible');
    this.personalBadge.should('be.visible');
    return this;
  }

  verifyLogoutButton() {
    this.logoutButton.should('be.visible');
    return this;
  }

  verifyToDoTabActive() {
    this.todoTab.should('be.visible');
    return this;
  }

  verifyStartTaskButtons() {
    this.startTaskButtons.should('be.visible');
    return this;
  }

  /**
   * Iterates the sidebarLinkLabels array — no repeated assertions.
   */
  verifySidebarLinks() {
    this.sidebarLinkLabels.forEach((label) => {
      cy.contains(label).should('be.visible');
    });
    return this;
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  clickCompletedTab() {
    this.completedTab.click();
    return this;
  }

  verifyCompletedTabActive() {
    this.completedTab.should('be.visible');
    return this;
  }
}

export default new MyTasksPage();
