class ConfigurationPage {

    configurationbtn(){
        return cy.contains("Configuration");
    }
    
    pactverabtn(){
        return cy.contains("Pactvera Template");
    }

    documemtbtn(){
        return cy.contains("Document Templates");
    }

    formbtn(){
        return cy.contains("Form Templates");
    }

    //actions methods
    
    clickconfigurationbtn(){
        this.configurationbtn().click();
        return this;
    }

    clickpactverabtn(){
        this.pactverabtn().click();
        return this;
    }

    varifypactverapage(){
        this.pactverabtn().should('be.visible');
        return this;
    }

    clickdocumentbtn(){
        this.documemtbtn().click();
        return this;
    }

    verifydocumentpage(){
        this.documemtbtn().should('be.visible');
        return this;
    }

    clickformbtn(){
        this.formbtn().click();
        return this;
    }

    verifyformpage(){
        this.formbtn().should('be.visible');
        return this;
    }

    

}

export default new ConfigurationPage();