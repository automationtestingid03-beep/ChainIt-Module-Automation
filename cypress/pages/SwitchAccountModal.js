/**
 * SwitchAccountModal
 * Handles the "Switch Account" modal that appears immediately after QR scan.
 * The modal shows Current Account, Personal Account, and Organizations sections.
 *
 * All selectors are scoped inside [role="dialog"] to prevent accidentally
 * matching elements with the same text outside the modal (e.g. the username
 * shown in the page header which opens a dropdown when clicked).
 */
class SwitchAccountModal {
  // ── Modal container ───────────────────────────────────────────────────────

  get modal() {
    return cy.get('[role="dialog"]');
  }

  // ── Selectors (scoped inside modal to avoid matching header/other elements) ──

  get heading() {
    return this.modal.contains('Switch Account');
  }

  get personalAccountSection() {
    return this.modal.contains('Personal Account');
  }

  /**
   * GAURAV SONAR row scoped strictly inside the modal dialog.
   * Without this scope, cy.contains('GAURAV SONAR') matches the header
   * username and clicks a user-dropdown instead of switching accounts.
   */
  get individualAccountRow() {
    return this.modal.contains('GAURAV SONAR');
  }

  // ── Verifications ─────────────────────────────────────────────────────────

  verifyVisible() {
    this.heading.should('be.visible');
    this.personalAccountSection.should('be.visible');
    return this;
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  clickIndividualAccount() {
    this.individualAccountRow.click({ force: true });
    return this;
  }
}

export default new SwitchAccountModal();
