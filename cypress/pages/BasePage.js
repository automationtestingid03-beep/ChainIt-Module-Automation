class BasePage {

  constructor() {
    const pageName = this.constructor.name;

    return new Proxy(this, {
      get: (target, property, receiver) => {
        const value = Reflect.get(target, property, receiver);

        if (typeof value !== 'function' || property === 'constructor') {
          return value;
        }

        return (...args) => {
          cy.log(`Action: ${pageName}.${String(property)}`);
          const result = value.apply(target, args);
          cy.log(`Verified: ${pageName}.${String(property)}`);

          return result === target ? receiver : result;
        };
      },
    });
  }

  visit(path = '/', options = {}) {
    cy.log(`Opening page: ${path}`);

    cy.visit(path, options);

    cy.log(`Page opened successfully: ${path}`);

    return this;
  }

  waitForPageLoad() {
    cy.log('Waiting for page to load');

    cy.location('href', { timeout: 10000 })
      .should('include', 'chainit');

    cy.log('Page loaded successfully');

    return this;
  }

  scrollToElement(selector) {
    cy.log(`Scrolling to element: ${selector}`);

    cy.get(selector)
      .scrollIntoView();

    cy.log(`Element scrolled into view: ${selector}`);

    return this;
  }

  verifyTitle(expectedText) {
    cy.log(`Verifying page title: "${expectedText}"`);

    cy.title()
      .should('eq', expectedText);

    cy.log(`Page title verified successfully: "${expectedText}"`);

    return this;
  }

  verifyUrlContains(fragment) {
    cy.log(`Verifying URL contains: "${fragment}"`);

    cy.location('href')
      .should('include', fragment);

    cy.log(`URL verified successfully: "${fragment}"`);

    return this;
  }
}

export default BasePage;