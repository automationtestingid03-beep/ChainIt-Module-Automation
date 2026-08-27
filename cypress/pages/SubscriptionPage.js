import BasePage from './BasePage';

class SubscriptionPage extends BasePage {

  // Locators

  get subscription() {
    return cy.contains('Subscription & Billing');
  }

  get addFundsButton() {
    return cy.get('[data-test="button-add-funds"]');
  }

  get enterAmountInput() {
    return cy.get('[data-test="amount-input"]');
  }

  get checkbox() {
    return cy.get('[role="checkbox"].checkbox-primary');
  }

  // Payment iframe

  paymentFrame() {
    return cy.frameLoaded('#payment-form');
  }

  cardHolderName() {
    return cy
      .iframe('#payment-form')
      .find('input[name="cardholdername"]');
  }

  cardNumber() {
    return cy
      .iframe('#payment-form')
      .find('input[name="account"]');
  }

  expiryMonth() {
    return cy
      .iframe('#payment-form')
      .find('input[name="expmonth"]');
  }

  expiryYear() {
    return cy
      .iframe('#payment-form')
      .find('input[name="expyear"]');
  }

  cvv() {
    return cy
      .iframe('#payment-form')
      .find('input[name="cv"]');
  }

  zipCode() {
    return cy
      .iframe('#payment-form')
      .find('input[name="zip"]');
  }

  storeCard() {
    return cy
      .iframe('#payment-form')
      .find('input[name="store"]');
  }

  payButton() {
    return cy
      .iframe('#payment-form')
      .find('#payment-submit-button');
  }

  // Subscription

  clickSubscription() {
    cy.log('Clicking Subscription & Billing');

    this.subscription
      .should('be.visible')
      .click();

    cy.log('Subscription & Billing opened successfully');

    return this;
  }

  // Add Funds

  clickAddFundsButton() {
    cy.log('Clicking Add Funds button');

    this.addFundsButton
      .should('be.visible')
      .click();

    cy.log('Add Funds button clicked successfully');

    return this;
  }

  enterAmount(amount) {
    cy.log(`Entering amount: "${amount}"`);

    this.enterAmountInput
      .should('be.visible')
      .clear()
      .type(amount);

    cy.log(`Amount "${amount}" entered successfully`);

    return this;
  }

  checkCheckbox() {
    cy.log('Selecting confirmation checkbox');

    this.checkbox
      .should('be.visible')
      .click();

    cy.log('Confirmation checkbox selected successfully');

    return this;
  }

  // Payment Details

  enterCardHolderName(name) {
    cy.log(`Entering card holder name: "${name}"`);

    this.cardHolderName()
      .should('be.visible')
      .clear()
      .type(name);

    cy.log('Card holder name entered successfully');

    return this;
  }

  enterCardNumber(number) {
    cy.log('Entering card number');

    this.cardNumber()
      .should('be.visible')
      .clear()
      .type(number);

    cy.log('Card number entered successfully');

    return this;
  }

  enterExpiryMonth(month) {
    cy.log(`Entering expiry month: "${month}"`);

    this.expiryMonth()
      .should('be.visible')
      .clear()
      .type(month);

    cy.log('Expiry month entered successfully');

    return this;
  }

  enterExpiryYear(year) {
    cy.log(`Entering expiry year: "${year}"`);

    this.expiryYear()
      .should('be.visible')
      .clear()
      .type(year);

    cy.log('Expiry year entered successfully');

    return this;
  }

  enterCVV(cvv) {
    cy.log('Entering CVV');

    this.cvv()
      .should('be.visible')
      .clear()
      .type(cvv);

    cy.log('CVV entered successfully');

    return this;
  }

  enterZipCode(zip) {
    cy.log(`Entering ZIP code: "${zip}"`);

    this.zipCode()
      .should('be.visible')
      .clear()
      .type(zip);

    cy.log('ZIP code entered successfully');

    return this;
  }

  // Store Card

  checkStoreCard() {
    cy.log('Selecting Store Card option');

    this.storeCard()
      .should('be.visible')
      .check({ force: true });

    cy.log('Store Card option selected successfully');

    return this;
  }

  uncheckStoreCard() {
    cy.log('Clearing Store Card option');

    this.storeCard()
      .should('be.visible')
      .uncheck({ force: true });

    cy.log('Store Card option cleared successfully');

    return this;
  }

  // Payment

  clickPayButton() {
    cy.log('Clicking Pay button');

    this.payButton()
      .should('be.visible')
      .click();

    cy.log('Pay button clicked successfully');

    return this;
  }

  // Complete Payment Form

  fillPaymentDetails(payment) {
    cy.log('Entering payment details');

    this.enterCardHolderName(payment.name);
    this.enterCardNumber(payment.cardNumber);
    this.enterExpiryMonth(payment.expMonth);
    this.enterExpiryYear(payment.expYear);
    this.enterCVV(payment.cvv);
    this.enterZipCode(payment.zipCode);

    cy.log('Payment details entered successfully');

    return this;
  }
}

export default new SubscriptionPage();