class SharingPage {

    sharingcenterbtn(){
        return cy.contains("Sharing Center");
    }

    linkstab(){
        return cy.contains("Links");
    }
    
    accesslog(){
        return cy.contains("Access Logs");
    }

    recentlyviewed(){
        return cy.contains("Recently Viewed");
    }

    //actions methods
    
    clicksharingbtn(){
        this.sharingcenterbtn().click();
        return this;
    }

    clicklinkstab(){
        this.linkstab().click();
        return this;
    }

    verifylinkstab(){
        this.linkstab().should('be.visible');
        return this;
    }

    clickaccesslog(){
        this.accesslog().click();
        return this;
    }

    verifyaccesslog(){
        this.accesslog().click();
        return this;
    }

    clickrecentlyviewed(){
        this.recentlyviewed().click();
        return this;
    }

    verifyrenctlyviewed(){
        this.recentlyviewed().should('be.visible');
        return this;
    }

}

export default new SharingPage();