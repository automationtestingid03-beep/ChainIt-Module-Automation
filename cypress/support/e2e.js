import './commands';
import 'cypress-iframe';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
