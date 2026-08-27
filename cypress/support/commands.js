import { getEnvUrl } from '../utils/helpers';

const ADMIN_URL = 'https://develop-admin.chainit.online';

// Close QR Popup

Cypress.Commands.add('closeQrPopupIfVisible', () => {

  cy.log('Checking for QR popup');

  cy.wait(10000);

  cy.get('body').then(($body) => {

    const overlay = $body.find('#qr-popup-overlay');
    const popup = $body.find('#qr-popup');

    if (overlay.length > 0 || popup.length > 0) {

      cy.log('QR popup detected');

      const closeButton = $body.find('#qr-popup .qr-close');

      if (closeButton.length > 0) {

        cy.log('Closing QR popup');

        cy.wrap(closeButton.first())
          .click({ force: true });

        cy.log('QR popup closed successfully');

      } else {

        cy.log('QR popup detected, but close button was not found');

      }

    } else {

      cy.log('QR popup is not visible');

    }
  });

  return cy;
});


// Visit Home Page

Cypress.Commands.add('visitHome', () => {

  cy.log('Opening Home page');

  cy.visit(getEnvUrl('home'));

  cy.log('Home page opened successfully');

  cy.closeQrPopupIfVisible();

  return cy;
});


// QR Login and Switch to Organization

Cypress.Commands.add('qrLoginAndSwitchToOrg', () => {

  cy.log('Opening QR Login page');

  cy.visit(`${ADMIN_URL}/scan-qr`);

  cy.contains('Scan or Tap the QR Code Login')
    .should('be.visible');

  cy.log('QR Login page displayed successfully');

  cy.log(
    'Please scan the QR code with the mobile app, then resume the test'
  );

  if (Cypress.config('isInteractive')) {
    cy.pause();
  }

  cy.log('QR scan process resumed');

  cy.log('Waiting for QR login to complete');

  cy.url({ timeout: 120000 })
    .should('not.include', '/scan-qr');

  cy.log('QR login completed successfully');

  cy.log('Checking for account selection modal');

  cy.get('body').then(($body) => {

    const selectors = [
      '[aria-label="close"]',
      '[aria-label="Close"]',
      '.close-btn',
      '[data-test="modal-close"]',
      'button:has(svg)',
      '[role="dialog"] button',
    ];

    let closeButtonFound = false;

    for (const selector of selectors) {

      const closeButton = $body.find(selector);

      if (closeButton.length > 0) {

        cy.log(`Close button found using selector: ${selector}`);

        cy.wrap(closeButton.first())
          .click({ force: true });

        cy.log('Modal closed successfully');

        closeButtonFound = true;

        break;
      }
    }

    if (!closeButtonFound) {
      cy.log('No close button found with the configured selectors');
    }
  });

  return cy;
});