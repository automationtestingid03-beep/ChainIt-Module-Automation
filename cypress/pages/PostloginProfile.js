/**
 * MyTasksPage
 * Page object for the personal My Tasks page (/personal/my-tasks).
 *
 * Sidebar links are stored as a single array and iterated — no repetition.
 */
class PostloginProfile {

  get profileTab() {
    return cy.contains("Profile");
  }

  get phonenumber(){
    return cy.contains("Phone Number");
  }

  get email(){
    return cy.contains("Email Address");
  }

  get address(){
    return cy.contains("Addresses");
  }

  get accountdetails(){
    return cy.contains("Account Details");
  }

  get deletebtn(){
    return cy.contains('button', 'Delete Account');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  clickProfileTab() {
    this.profileTab.click();
    return this;
  }

  verifyphonenumber(){
    this.phonenumber.should('be.visible');
    return this;
  }

  verifyemail(){ 
    this.email.should('be.visible');
    return this;
  }

  verifyaddress(){
    this.address.should('be.visible');
    return this;
  }

  verifyaccountdetails(){
    this.accountdetails.should('be.visible');
    return this;
  }

  verifydeletebtn(){
    this.deletebtn.should('be.visible');
    return this;
  }

}

export default new PostloginProfile();
