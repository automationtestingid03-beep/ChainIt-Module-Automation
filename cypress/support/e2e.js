import './commands';
import 'cypress-iframe';

// Prevent Cypress from failing tests on uncaught application exceptions
// such as API or application-side errors.

Cypress.on('uncaught:exception', (err, runnable) => {
  cy.log(`Application exception ignored: ${err.message}`);
  return false;
});

// Clear browser state before every test

beforeEach(() => {
  cy.log('Clearing cookies');
  cy.clearCookies();

  cy.log('Clearing local storage');
  cy.clearLocalStorage();

  cy.log('Browser state cleared successfully');
});