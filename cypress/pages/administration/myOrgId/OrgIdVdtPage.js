import BasePage from '../../BasePage';

class OrgIdVdtPage extends BasePage {

  get pageHeading() {
    return cy.contains('Org ID VDT').filter(':visible').first();
  }

  get organizationName() {
    return cy.contains('Eco25').filter(':visible').first();
  }

  get generalInformationSection() {
    return cy.contains('General Information').filter(':visible').first();
  }

  get detailsSection() {
    return cy.contains('Details').filter(':visible').first();
  }

  get whereSection() {
    return cy.contains('Where').filter(':visible').first();
  }

  get whenSection() {
    return cy.contains('When').filter(':visible').first();
  }

  get whoSection() {
    return cy.contains('Who').filter(':visible').first();
  }

  get whatSection() {
    return cy.contains('What').filter(':visible').first();
  }

  get touchAuditButtons() {
    return cy.contains('button', 'Touch Audit').filter(':visible');
  }

  get sosVerifiedStatus() {
    return cy.contains('SOS Verified').filter(':visible').first();
  }

  get beingIdGrade() {
    return cy.contains('Passport Analysis').filter(':visible').first();
  }

  get myOrgIdTabs() {
    return ['Org ID VDT','Verified Details','Credit','Corporate & Legal','Governance & Ownership','Locations','Finance & Accounting','Directory','Employees','Products'];
  }

  get productsTab() {
    return cy.contains('button', 'Products').filter(':visible').first();
  }

  // Page Verification
  verifyPageLoaded() {
    cy.log('Action: Verify Org ID VDT page is loaded');
    this.pageHeading.should('exist').and('be.visible');
    cy.log('Verified: Org ID VDT page heading');

    return this;
  }

  verifyMyOrgIdPageLoaded() {
    cy.log('Action: Verify My Org ID page is loaded');
    cy.contains('My Org ID').filter(':visible').should('exist');
    cy.log('VERIFIED: My Org ID page');
    return this;
  }

  verifyAllMyOrgIdTabs() {
    cy.log('Action: Verify all My Org ID tabs');
    this.myOrgIdTabs.forEach((tabName) => {
    cy.contains('button', tabName).filter(':visible').should('exist').invoke('text')
      .then((text) => {
    const actualTabName = text.replace(/\s+/g, ' ').trim();
    expect(actualTabName).to.eq(tabName);
    cy.log(`Verified tab: ${tabName}`);});
    });
    cy.log('VERIFIED: All My Org ID tabs');

    return this;
  }

  verifyOrganizationInformation() {
    cy.log('Action: Verify organization information');
    this.generalInformationSection.should('exist').and('be.visible');
    this.organizationName.should('exist').and('be.visible');
    cy.log('Verified: General Information');
    cy.log('Verified: Organization name');

    return this;
  }

  verifyDetailsSections() {
    cy.log('Action: Verify Details sections');
    this.detailsSection.should('exist').and('be.visible');
    this.whereSection.should('exist').and('be.visible');
    this.whenSection.should('exist').and('be.visible');
    this.whoSection.should('exist').and('be.visible');
    this.whatSection.should('exist').and('be.visible');
    cy.log('Verified: Details');
    cy.log('Verified: Where');
    cy.log('Verified: When');
    cy.log('Verified: Who');
    cy.log('Verified: What');

    return this;
  }

  verifyWhereSection() {
    cy.log('Action: Verify Where section');
    this.whereSection.should('be.visible');
    cy.contains('Organization Address').filter(':visible').should('exist');
    cy.contains('Latitude:').filter(':visible').should('exist');
    cy.contains('Longitude:').filter(':visible').should('exist');
    cy.contains('SOS Verified').filter(':visible').should('exist');
    cy.log('VERIFIED: Where section');

    return this;
  }

  verifyWhenSection() {
    cy.log('Action: Verify When section');
    this.whenSection.should('be.visible');
    cy.contains('Created At').filter(':visible').should('exist');
    cy.contains('Org ID Minted At').filter(':visible').should('exist');
    cy.log('VERIFIED: When section');

    return this;
  }

  verifyWhoSection() {
    cy.log('Action: Verify Who section');
    this.whoSection.should('be.visible');
    cy.contains('DEEPENDRA RAO').filter(':visible').should('exist');
    cy.contains('BeingID Grade').filter(':visible').should('exist');
    cy.contains('Passport Analysis').filter(':visible').should('exist');
    cy.log('VERIFIED: Who section');

    return this;
  }

  verifyWhatSection() {
    cy.log('Action: Verify What section');
    this.whatSection.should('be.visible');
    cy.contains('Product line').filter(':visible').should('exist');
    cy.contains('Wallet').filter(':visible').should('exist');
    cy.log('VERIFIED: What section');

    return this;
  }

  // Actions
  clickTouchAudit() {
    cy.log('Action: Click Touch Audit');
    this.touchAuditButtons.first().should('be.visible').click({ force: true });

    return this;
  }

  verifyTouchAuditButtons() {
    cy.log('Action: Verify Touch Audit buttons');
    this.touchAuditButtons.should('have.length.at.least', 1).each(($button) => {
    cy.wrap($button).should('be.visible').and('contain.text', 'Touch Audit');
    });
    cy.log('VERIFIED: Touch Audit buttons');

    return this;
  }
  
  // Complete Validation
  verifyAllPageElements() {
    cy.log('Action: Verify all Org ID VDT page elements');
    this.verifyPageLoaded();
    this.verifyOrganizationInformation();
    this.verifyDetailsSections();
    this.verifyWhereSection();
    this.verifyWhenSection();
    this.verifyWhoSection();
    this.verifyWhatSection();
    this.verifyTouchAuditButtons();
    cy.log('VERIFIED: All Org ID VDT page elements and actions');

    return this;
  }
}

export default new OrgIdVdtPage();