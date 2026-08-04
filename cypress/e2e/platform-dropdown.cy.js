import HomePage from '../pages/HomePage';
import PlatformDropdownPage from '../pages/PlatformDropdownPage';

describe('ChainIT platform dropdown navigation', () => {
  beforeEach(() => {
    cy.visitHome();
    PlatformDropdownPage.hoverPlatformMenu();
    PlatformDropdownPage.verifyPlatformDropdownVisible();
  });

  it('taps the first visible option and opens Validated Data Tokens page', () => {
    PlatformDropdownPage.tapPlatformItem('validatedDataTokens');
    PlatformDropdownPage.verifyPlatformNavigation('validatedDataTokens');
  });

  it('opens ChainIT ID page', () => {
    PlatformDropdownPage.clickPlatformItem('chainitId');
    PlatformDropdownPage.verifyPlatformNavigation('chainitId');
  });

  it('opens ChainIT Organization ID page', () => {
    PlatformDropdownPage.clickPlatformItem('chainitOrganizationId');
    PlatformDropdownPage.verifyPlatformNavigation('chainitOrganizationId');
  });

  it('opens BeingID page', () => {
    PlatformDropdownPage.clickPlatformItem('beingId');
    PlatformDropdownPage.verifyPlatformNavigation('beingId');
  });

  it('opens Token Grade page', () => {
    PlatformDropdownPage.clickPlatformItem('tokenGrade');
    PlatformDropdownPage.verifyPlatformNavigation('tokenGrade');
  });

  it('opens Touch Audit page', () => {
    PlatformDropdownPage.clickPlatformItem('touchAudit');
    PlatformDropdownPage.verifyPlatformNavigation('touchAudit');
  });

  it('opens ChainIT Check page', () => {
    PlatformDropdownPage.clickPlatformItem('chainitCheck');
    PlatformDropdownPage.verifyPlatformNavigation('chainitCheck');
  });
});
