import BasePage from './BasePage';
import SwitchAccountModal from './SwitchAccountModal';

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

  loginWithQrAndSelectAccount(accountType = 'individual') {
    cy.log('Opening QR Login page');
    cy.visit(`${Cypress.env('urls').admin}/scan-qr`);
    cy.contains('Scan or Tap the QR Code Login').should('be.visible');

    cy.log('Please scan the QR code with the mobile app');
    if (Cypress.config('isInteractive')) {
      cy.pause();
    }

    cy.url({ timeout: 120000 }).should('not.include', '/scan-qr');
    SwitchAccountModal.verifyVisible();

    if (accountType === 'organization') {
      SwitchAccountModal.getAllOrganizations().then((organizations) => {
        cy.log(`Available organizations: ${organizations.join(', ')}`);
      });
      SwitchAccountModal.selectSecondOrganization();
    } else {
      SwitchAccountModal.clickIndividualAccount();
    }

    return this;
  }
}

export default new LoginPage();