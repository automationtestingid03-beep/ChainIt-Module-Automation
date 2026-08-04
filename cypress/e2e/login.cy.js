import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

describe('ChainIT login flow', () => {
  it('navigates to the login QR landing screen', () => {
    cy.visitHome();
    HomePage.clickLoginLink();

    LoginPage.verifyLoginUrl();
    LoginPage.verifyScanQrHeadingIsVisible();
  });
});
