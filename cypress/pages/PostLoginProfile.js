import BasePage from './BasePage';

class PostLoginProfile extends BasePage {

  // Locators

  get profileTab() {
    return cy.contains('Profile');
  }

  get phoneNumber() {
    return cy.contains('Phone Number');
  }

  get email() {
    return cy.contains('Email Address');
  }

  get address() {
    return cy.contains('Addresses');
  }

  get accountDetails() {
    return cy.contains('Account Details');
  }

  get deleteButton() {
    return cy.contains('button', 'Delete Account');
  }

  // Profile Navigation

  clickProfileTab() {
    cy.log('Clicking Profile tab');

    this.profileTab
      .should('be.visible')
      .click();

    cy.log('Profile tab opened successfully');

    return this;
  }

  // Profile Verification

  verifyPhoneNumber() {
    cy.log('Verifying Phone Number section');

    this.phoneNumber
      .should('be.visible');

    cy.log('Phone Number section is visible');

    return this;
  }

  verifyEmail() {
    cy.log('Verifying Email Address section');

    this.email
      .should('be.visible');

    cy.log('Email Address section is visible');

    return this;
  }

  verifyAddress() {
    cy.log('Verifying Addresses section');

    this.address
      .should('be.visible');

    cy.log('Addresses section is visible');

    return this;
  }

  verifyAccountDetails() {
    cy.log('Verifying Account Details section');

    this.accountDetails
      .should('be.visible');

    cy.log('Account Details section is visible');

    return this;
  }

  verifyDeleteButton() {
    cy.log('Verifying Delete Account button');

    this.deleteButton
      .should('be.visible');

    cy.log('Delete Account button is visible');

    return this;
  }
}

export default new PostLoginProfile();