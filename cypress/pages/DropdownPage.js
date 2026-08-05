class DropdownPage {
  open(menuTriggerSelector, activeDropdownSelector) {
    cy.get(menuTriggerSelector).first().click({ force: true });
    cy.get(activeDropdownSelector).should('exist');
    return this;
  }

  verifyDropdownVisible(activeDropdownSelector, optionLabel) {
    cy.get(activeDropdownSelector).within(() => {
      cy.contains('a.linkContainer', optionLabel).should('exist');
    });
    return this;
  }

  clickDropdownItem(activeDropdownSelector, itemLabel) {
    cy.get(activeDropdownSelector)
      .contains('a.linkContainer', itemLabel)
      .should('exist')
      .then($item => {
        const wrapper = cy.wrap($item);
        if ($item.attr('target') === '_blank') {
          wrapper.invoke('removeAttr', 'target').click({ force: true });
        } else {
          wrapper.click({ force: true });
        }
      });
    return this;
  }

  verifyNavigation(expectedUrl, expectedText, scope = 'main, body') {
    const baseUrl = Cypress.config('baseUrl').replace(/\/$/, '');

    if (expectedUrl.startsWith('http')) {
      const url = new URL(expectedUrl);
      cy.origin(url.origin, { args: { expectedUrl, expectedText } }, ({ expectedUrl, expectedText }) => {
        cy.url().should('eq', expectedUrl);
        cy.contains(expectedText).should('be.visible');
      });
    } else {
      cy.url().should('eq', `${baseUrl}${expectedUrl}`);
      cy.get('main').then($main => {
        if ($main.length) {
          cy.wrap($main)
            .contains(expectedText)
            .should('be.visible');
        } else {
          cy.get('body')
            .contains(expectedText)
            .should('be.visible');
        }
      });
    }

    return this;
  }
}

export default new DropdownPage();
