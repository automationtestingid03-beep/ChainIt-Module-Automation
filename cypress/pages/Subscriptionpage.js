
class SubscriptionPage {

  get subscription() {
    return cy.contains("Subscription & Billing");
  }

  get addfundsbtn() {
    return cy.get('[data-test="button-add-funds"]');
  }

  get enterAmountInput(){
    return cy.get('[data-test="amount-input"]');
  }

  get checkbox(){
    return cy.get('[role="checkbox"].checkbox-primary');
  }

  // Iframe
  paymentFrame() {
        return cy.frameLoaded('#payment-form');
    }

    cardHolderName() {
        return cy.iframe('#payment-form')
            .find('input[name="cardholdername"]');
    }

    cardNumber() {
        return cy.iframe('#payment-form')
            .find('input[name="account"]');
    }

    expiryMonth() {
        return cy.iframe('#payment-form')
            .find('input[name="expmonth"]');
    }

    expiryYear() {
        return cy.iframe('#payment-form')
            .find('input[name="expyear"]');
    }

    cvv() {
        return cy.iframe('#payment-form')
            .find('input[name="cv"]');
    }

    zipCode() {
        return cy.iframe('#payment-form')
            .find('input[name="zip"]');
    }

    storeCard() {
        return cy.iframe('#payment-form')
            .find('input[name="store"]');
    }

    payButton() {
        return cy.iframe('#payment-form')
            .find('#payment-submit-button');
    }

  // ── Actions ───────────────────────────────────────────────────────────────

  clickSubscription() {
    this.subscription.click();
    return this;
  }

  clickaddfundsbtn(){
    this.addfundsbtn.click();
    return this;
  }

  enterAmount(amount) {
    this.enterAmountInput.clear().type(amount);
    return this;
  } 

  checkchechbox(){
    this.checkbox.click();
  }
  
  enterCardHolderName(name) {
    this.cardHolderName()
      .clear()
      .type(name);
    return this;
  }

  enterCardNumber(number) {
    this.cardNumber()
      .clear()
      .type(number);
    return this;
  }

  enterExpiryMonth(month) {
    this.expiryMonth()
      .clear()
      .type(month);
    return this;
  }

  enterExpiryYear(year) {
    this.expiryYear()
      .clear()
      .type(year);
    return this;
  }

  enterCVV(cvv) {
    this.cvv()
      .clear()
      .type(cvv);
    return this;
  }

  enterZipCode(zip) {
    this.zipCode()
      .clear()
      .type(zip);
    return this;
  }

  checkStoreCard() {
    this.storeCard().check({ force: true });
    return this;
  }

  uncheckStoreCard() {
    this.storeCard().uncheck({ force: true });
    return this;
  }

  clickPayButton() {
    this.payButton().click();
    return this;
  }

  fillPaymentDetails(payment) {
    this.enterCardHolderName(payment.name);
    this.enterCardNumber(payment.cardNumber);
    this.enterExpiryMonth(payment.expMonth);
    this.enterExpiryYear(payment.expYear);
    this.enterCVV(payment.cvv);
    this.enterZipCode(payment.zipCode);
  }


}

export default new SubscriptionPage();
