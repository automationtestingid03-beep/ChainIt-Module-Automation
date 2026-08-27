import BasePage from './BasePage';

class LoginPage extends BasePage {

  // Locators

  get scanQrHeading() {
    return cy.contains('Scan or Tap the QR Code Login');
  }

  // URL Verification

  verifyLoginUrl() {
    cy.log('Verifying Login page URL');

    const loginBase = Cypress.env('urls').login.replace(/\/$/, '');
    const expectedUrl = `${loginBase}/scan-qr`;

    cy.url()
      .should('eq', expectedUrl);

    cy.log(`Login page URL verified successfully: ${expectedUrl}`);

    return this;
  }

  // QR Login Page Verification

  verifyScanQrHeadingIsVisible() {
    cy.log('Verifying Scan QR Login heading');

    cy.origin(Cypress.env('urls').login, () => {
      cy.contains('Scan or Tap the QR Code Login')
        .should('be.visible');
    });

    cy.log('Scan QR Login heading is visible');

    return this;
  }
}

export default new LoginPage();