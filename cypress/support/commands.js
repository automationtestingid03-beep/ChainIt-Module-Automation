Cypress.Commands.add('closeQrPopupIfVisible', () => {
  cy.wait(10000);
  cy.get('body').then(($body) => {
    const overlay = $body.find('#qr-popup-overlay');
    const popup = $body.find('#qr-popup');

    if (overlay.length > 0 || popup.length > 0) {
      const closeButton = $body.find('#qr-popup .qr-close');

      if (closeButton.length > 0) {
        cy.wrap(closeButton.first()).click({ force: true });
      } else {
        cy.log('QR popup detected but close selector did not match');
      }
    }
  });
});

Cypress.Commands.add('visitHome', () => {
  cy.visit(Cypress.env('urls').home);
  cy.closeQrPopupIfVisible();
});
