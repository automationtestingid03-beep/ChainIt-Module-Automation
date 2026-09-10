import OrgIdVdtPage from './administration/myOrgId/OrgIdVdtPage';
import BasePage from './BasePage';



class AdministrationPage extends BasePage {

  // Locators
  get administrationButton() {
    return cy.contains('button, a, div', /administration/i).filter(':visible').first();
  }

   get myOrgIdButton() {
    return cy.contains('button, a, div', /my org/i).filter(':visible').first();
  }

 clickAdministrationButton() {
    cy.log('Clicking Administration button');
    this.administrationButton.should('be.visible').click({ force: true });
    cy.log('Administration button clicked successfully');

    return this;
  }

  clickMyOrgButton() {
      cy.log('Clicking My Org ID button');
      this.myOrgIdButton.should('be.visible').click({ force: true });
      cy.log('My Org ID button clicked successfully');
      return OrgIdVdtPage.verifyPageLoaded();
    }

}

export default new AdministrationPage();