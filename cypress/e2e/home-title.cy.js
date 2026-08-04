import HomePage from '../pages/HomePage';

describe('ChainIT homepage', () => {
  it('verifies homepage landing and main navigation visibility', () => {
    cy.visitHome();

    HomePage.verifyPageTitle('ChainIT - Verification-Native Infrastructure for Validated Authority & AI-Safe Data');
    HomePage.verifyLogoIsVisible();
    HomePage.verifyHeroSectionIsVisible();
    HomePage.verifyHeaderLinksAreVisible();
  });
});
