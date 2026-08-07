class PactveraPage {

    // Locators
    createnewbtn() {
        return cy.contains('button', 'Create New');
    }

    entertitle() {
        return cy.get('[data-test="title-input"]');
    }

    createbtn() {
        return cy.contains('button', 'Create')
            .should('be.visible')
            .should('not.be.disabled');
    }

    description() {
        return cy.get('textarea[placeholder="Enter a Description"]');
    }

    savebtn() {
        return cy.contains('button', 'Save')
            .should('be.visible')
            .should('not.be.disabled');
    }

    // Action methods

    clickcreatenewbtn() {
        this.createnewbtn()
            .should('be.visible')
            .click();

        // Wait for modal to open
        this.entertitle().should('be.visible');

        return this;
    }

    entertitletext(title) {
        this.entertitle()
            .should('be.visible')
            .clear()
            .type(title);

        return this;
    }

    clickcreatebtn() {
        this.createbtn()
            .scrollIntoView()
            .click();

        return this;
    }

    enterdescriptiontext(description) {
        this.description()
            .should('be.visible')
            .clear()
            .type(description);

        return this;
    }

    clicksavebtn() {
        this.savebtn()
            .scrollIntoView()
            .click();

        return this;
    }
}

export default new PactveraPage();