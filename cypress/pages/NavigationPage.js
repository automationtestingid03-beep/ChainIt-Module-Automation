class NavigationPage {
  get platformLink() {
    return cy.contains('a', 'Platform');
  }

  get solutionsLink() {
    return cy.contains('a', 'Solutions');
  }

  get developersLink() {
    return cy.contains('a', 'Developers');
  }

  get resourcesLink() {
    return cy.contains('a', 'Resources');
  }

  get demoLink() {
    return cy.contains('a', 'Demo');
  }

  get loginLink() {
    return cy.contains('a', 'Login');
  }

  clickPlatformLink() {
    this.platformLink.click();
    return this;
  }

  clickDevelopersLink() {
    this.developersLink.click();
    return this;
  }

  verifyNavigationLinksVisible() {
    this.platformLink.should('be.visible');
    this.solutionsLink.should('be.visible');
    this.developersLink.should('be.visible');
    this.resourcesLink.should('be.visible');
    this.demoLink.should('be.visible');
    return this;
  }
}

export default new NavigationPage();
