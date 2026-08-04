class PlatformDropdownPage {
  constructor() {
    this.platformItems = {
      validatedDataTokens: {
        label: 'Validated Data Tokens',
        url: '/product/validated-data-tokens/',
        heading: 'Validated Data Tokens',
      },
      chainitId: {
        label: 'ChainIT ID',
        url: '/product/chainit-id/',
        heading: 'ChainIT ID: Identity Verification Services',
      },
      chainitOrganizationId: {
        label: 'ChainIT Organization ID',
        url: '/product/chainit-organization-id/',
        heading: 'ChainIT Org ID: Business Verification Services',
      },
      beingId: {
        label: 'BeingID',
        url: '/product/beingid/',
        heading: 'BeingID: Identity Secure Score',
      },
      tokenGrade: {
        label: 'Token Grade',
        url: '/product/token-grading/',
        heading: 'Token Grading System: Verified Scoring Methodology',
      },
      touchAudit: {
        label: 'Touch Audit',
        url: '/product/audit-trail/',
        heading: 'Touch Audit',
      },
      chainitCheck: {
        label: 'ChainIT Check',
        url: '/product/chainit-check/',
        heading: 'ChainIT Check',
      },
    };
  }

  get platformMenu() {
    return cy.get('a.item-platform');
  }

  hoverPlatformMenu() {
    cy.get('a[data-dropdown="platform"]').first()
      .click({ force: true });

    cy.get('div.dropdownSection.active[data-dropdown="platform"]')
      .should('exist');

    return this;
  }

  verifyPlatformDropdownVisible() {
    cy.get('div.dropdownSection.active[data-dropdown="platform"]')
      .within(() => {
        cy.contains('a.linkContainer', this.platformItems.validatedDataTokens.label)
          .should('exist');
      });
    return this;
  }

  clickPlatformItem(itemKey) {
    const item = this.platformItems[itemKey];
    cy.get('div.dropdownSection.active[data-dropdown="platform"]')
      .contains('a.linkContainer', item.label)
      .click({ force: true });
    return this;
  }

  tapPlatformItem(itemKey) {
    return this.clickPlatformItem(itemKey);
  }

  verifyPlatformNavigation(itemKey) {
    const item = this.platformItems[itemKey];
    const baseUrl = Cypress.config('baseUrl').replace(/\/$/, '');
    cy.url().should('eq', `${baseUrl}${item.url}`);
    cy.get('main')
      .should('exist')
      .within(() => {
        cy.contains('h1, h2, h3', item.heading).should('be.visible');
      });
    return this;
  }

  get optionKeys() {
    return Object.keys(this.platformItems);
  }
}

export default new PlatformDropdownPage();
