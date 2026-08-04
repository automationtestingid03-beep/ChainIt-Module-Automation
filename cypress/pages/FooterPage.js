class FooterPage {
  get privacyPolicyLink() {
    return cy.contains('a', 'Privacy Policy');
  }

  get termsOfServiceLink() {
    return cy.contains('a', 'Terms of Service');
  }

  get contactLink() {
    return cy.contains('a', 'Contact');
  }

  verifyFooterLinksVisible() {
    this.privacyPolicyLink.should('be.visible');
    this.termsOfServiceLink.should('be.visible');
    this.contactLink.should('be.visible');
    return this;
  }
}

export default new FooterPage();
