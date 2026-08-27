import OrgOnboardingPage from '../pages/OrgOnboardingPage';

describe('Organization Onboarding Flow', () => {
  it('completes the organization onboarding by starting the Invite and Verify Officers task', () => {
    cy.qrLoginAndSwitchToOrg();

    OrgOnboardingPage.verifyPageLoaded();

    OrgOnboardingPage.verifyTaskVisible('Invite and Verify Officers');
    OrgOnboardingPage.clickStartTaskFor('Invite and Verify Officers');

    OrgOnboardingPage.clickContinueButton();

    OrgOnboardingPage.verifyIdentifyOfficersPage();
    OrgOnboardingPage.clickAddOfficerButton();

    OrgOnboardingPage.enterOfficerName('Gaurav');
    OrgOnboardingPage.enterOfficerEmail('gsonar480@gmail.com');
    OrgOnboardingPage.selectOfficerRole('President');
    OrgOnboardingPage.clickAddOfficerSubmitButton();

    OrgOnboardingPage.verifyIdentifyOfficersPage();
    OrgOnboardingPage.clickContinueButton();

    OrgOnboardingPage.verifyAttestationPage();
    OrgOnboardingPage.clickSignSection();
    OrgOnboardingPage.switchToTypeTab();
    OrgOnboardingPage.enterSignatureName('Gaurav Sonar');
    OrgOnboardingPage.clickSignatureContinueButton();

    OrgOnboardingPage.verifyAttestationPage();
    OrgOnboardingPage.clickContinueButton();

    cy.log('⏸  Email has been sent. Please open the email on your mobile device and accept it, then resume the test');
    cy.pause();
  });
});
