class LoginPage {
  get scanQrHeading() {
    return cy.contains('Scan or Tap the QR Code Login');
  }

  verifyLoginUrl() {
    const loginBase = Cypress.env('urls').login.replace(/\/$/, '');
    cy.url().should('eq', `${loginBase}/scan-qr`);
    return this;
  }

  verifyScanQrHeadingIsVisible() {
    cy.origin(Cypress.env('urls').login, () => {
      cy.contains('Scan or Tap the QR Code Login').should('be.visible');
    });
    return this;
  }
}

export default new LoginPage();
