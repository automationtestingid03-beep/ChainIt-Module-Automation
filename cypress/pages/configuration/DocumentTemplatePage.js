import BasePage from '../BasePage';

class DocumentTemplatePage extends BasePage {
   get newFolderButton() {
    return cy.contains('button', 'New Folder');
  }

  get folderNameInput() {
    return cy.get('[data-test="name-input"]');
  }

  get createFolderButton() {
    return cy.get('[data-test="add-folder"]');
  }

  get documentHeading() {
    return cy.contains('Document Templates');
  }

  get searchInput() {
    return cy.get('input[placeholder="Search"]');
  }

    get listViewButton() {
    return cy.get('[data-test="list-view"]');
  }

  get gridViewButton() {
    return cy.get('[data-test="grid-view"]');
  }

   get createTemplateButton() {
    return cy.get('[data-test="create-document-button"]');
  }

  get table() {
    return cy.get('table').filter(':visible').first();
  }

  get tableHeaders() {
    return this.table.find('thead th');
  }

  get tableRows() {
    return this.table.find('tbody tr').filter(':visible');
  }

  get backButton() {
  return cy.get('svg.text-primary.cursor-pointer').first();
}

  get threeDotMenu() {
    return this.tableRows
      .first()
      .find('[data-test="actions-folder-actions"]')
      .filter(':visible')
      .first();
  }

  get createTemplateButton() {
  return cy.get('[data-test="create-document-button"]');
}

get folderDropdown() {
  return cy.contains('label', 'Select Folder')
    .parent()
    .find('input, button, [role="combobox"]')
    .first();
}

//Actions

  verifyPageLoaded() {
    cy.log('Action: Verify Document Templates page is displayed');
    this.documentHeading.should('be.visible');
    cy.log('VERIFIED: Document Templates page is displayed');

    return this;
  }


  getFirstFolderName() {
  cy.log('Action: Get first folder name');

  cy.get('tbody tr')
    .filter(':visible')
    .first()
    .find('td')
    .first()
    .invoke('text')
    .then((text) => {
      const folderName = text.replace(/\s+/g, ' ').trim();
      expect(folderName, 'First folder name').to.not.be.empty;
      cy.wrap(folderName).as('firstFolderName');
      cy.log(`First folder name: ${folderName}`); });

  return this;
}

openFirstFolderActions() {
  cy.log('Action: Click three-dot Actions menu for first folder');
  this.threeDotMenu
    .should('be.visible')
    .click({ force: true });
  cy.log('Three-dot Actions menu opened successfully');

  return this;
}

    verifySearchFieldDisplayed() {
    cy.log('Action: Verify Search field is displayed');
    this.searchInput.should('be.visible').and('have.attr', 'placeholder', 'Search');
    cy.log('VERIFIED: Search field is displayed');

    return this;
  }

  verifyNewFolderButtonDisplayed() {
    cy.log('Action: Verify New Folder button is displayed');
    this.newFolderButton.should('be.visible').and('contain.text', 'New Folder');
    cy.log('VERIFIED: New Folder button is displayed');

    return this;
  }

    verifyCreateTemplateButtonDisplayed() {
    cy.log('Action: Verify Create Template button is displayed');
    this.createTemplateButton.should('be.visible').and('contain.text', 'Create Template');
    cy.log('VERIFIED: Create Template button is displayed');

    return this;
  }

   clickListView() {
    cy.log('Action: Switch to List View');
    this.listViewButton.should('be.visible').click();
    cy.log('List View selected successfully');

    return this;
  }

  clickGridView() {
    cy.log('Action: Switch to Grid View');
    this.gridViewButton.should('be.visible').click();
    cy.log('Grid View selected successfully');

    return this;
  }

    verifyListViewDisplayed() {
    cy.log('Action: Verify Document Templates list view');
    this.table.should('be.visible');
    cy.log('VERIFIED: Document Templates list view is displayed');

    return this;
  }

  verifyGridViewDisplayed() {
  cy.log('Action: Verify Grid View is displayed');
  this.gridViewButton.should('be.visible').and('have.class', 'bg-primary-100');
  cy.log('VERIFIED: Grid View is displayed');

  return this;
}

  clickNewFolder() {
    cy.log('Clicking New Folder button');

    this.newFolderButton
      .should('be.visible')
      .then(($button) => {
        cy.wrap($button).click();
      });

    return this;
  }

    verifyDocumentTemplateTableColumns() {
    cy.log('Action: Verify Document Template table column names');
    const expectedColumns = [ 'Folder Name','Created Date','Actions'];

    expectedColumns.forEach((columnName) => {
      this.tableHeaders.contains(columnName).should('be.visible');
      cy.log(`Verified column: ${columnName}`);
    });
    cy.log('VERIFIED: All table column names are displayed');

    return this;
  }

    verifyFoldersDisplayed() {
    cy.log('Action: Verify folder records are displayed');
    this.tableRows.should('have.length.at.least', 1);
    cy.log('VERIFIED: Folder records are displayed');

    return this;
  }

  verifyFolderDisplayed(folderName) {
    cy.log(`Action: Verify folder is displayed: ${folderName}`);
    this.tableRows.contains(folderName).should('be.visible');
    cy.log(`VERIFIED: Folder is displayed: ${folderName}`);

    return this;
  }

    searchFolder(folderName) {
    cy.log(`Action: Search for folder: ${folderName}`);
    this.searchInput.should('be.visible').clear().type(folderName);

    return this;
  }

  verifySearchResult(folderName) {
    cy.log(`Action: Verify search result: ${folderName}`);
    this.tableRows.contains(folderName).should('be.visible');
    cy.log(`VERIFIED: Search result displayed: ${folderName}`);

    return this;
  }

  enterFolderName(folderName) {
    cy.log(`Entering document folder name: ${folderName}`);

    this.folderNameInput
      .should('be.visible')
      .clear()
      .type(folderName);

    return this;
  }


  verifySearchResult(folderName) {
  cy.log(`Action: Verify matching search results: ${folderName}`);

  cy.get('tbody tr')
    .filter(':visible')
    .should('have.length.at.least', 1);

  cy.get('tbody tr')
    .filter(':visible')
    .then(($rows) => {
      const actualFolderNames = [...$rows].map(($row) => {
        return Cypress.$($row)
          .find('td')
          .first()
          .text()
          .replace(/\s+/g, ' ')
          .trim();
      });

      cy.log(`Search results: ${actualFolderNames.join(', ')}`);

      actualFolderNames.forEach((actualName) => {
        expect(
          actualName.toLowerCase(),
          `Folder "${actualName}" should match search "${folderName}"`
        ).to.contain(folderName.toLowerCase());
      });
    });

  cy.log(`VERIFIED: All search results match "${folderName}"`);

  return this;
  }

  clearSearch() {
    cy.log('Action: Clear folder search');
    this.searchInput.should('be.visible').clear();
    cy.log('Search field cleared successfully');

    return this;
  }

   clickNewFolder() {
    cy.log('Action: Click New Folder button');
    this.newFolderButton.should('be.visible').click();
    cy.log('New Folder button clicked successfully');

    return this;
  }

    verifyNewFolderPopupDisplayed() {
    cy.log('Action: Verify New Folder popup');
    this.folderNameInput.should('be.visible');
    this.createFolderButton.should('be.visible');
    cy.log('VERIFIED: New Folder popup is displayed');

    return this;
  }


clickViewOption() {
  cy.log('Action: Click View option');
  cy.contains('View').should('be.visible').click({ force: true });
  cy.log('View option clicked successfully');

  return this;
}

clickRenameOption() {
  cy.log('Action: Click Rename');
  cy.contains('Rename').should('be.visible').click({ force: true });
  cy.log('Rename clicked successfully');

  return this;
}

verifyRenamePopup() {
  cy.log('Action: Verify Rename Folder popup');
  cy.contains('Rename Folder').should('be.visible');
  cy.get('input').filter(':visible').should('exist');
  cy.contains('button', 'Cancel').should('be.visible');
  cy.contains('button', 'Rename').should('be.visible');
  cy.log('VERIFIED: Rename Folder popup is displayed');

  return this;
}

clickRenameCancel() {
  cy.log('Action: Click Cancel on Rename popup');
  cy.contains('button', 'Cancel').should('be.visible').click();
  cy.log('Rename popup closed successfully');

  return this;
}

verifyDeletePopup() {
   cy.log('Action: Verify Delete Folder popup');

  cy.contains('Delete Folder').should('be.visible');
  cy.contains('button', 'Cancel').should('be.visible');

  cy.get('body').then(($body) => {
    const moveButton = $body.find('button')
      .filter((index, el) =>
        el.innerText.trim() === 'Move to Another Folder' );

    if (moveButton.length > 0) {
      // Folder contains templates/documents
      cy.log('Folder contains templates/documents');
      cy.log('Verifying Move to Another Folder option');
      cy.contains('button', 'Move to Another Folder').should('be.visible');
      cy.contains('button', 'Delete').should('not.exist');
      cy.log('VERIFIED: Move to Another Folder is displayed');
      cy.log('VERIFIED: Delete button is not displayed');

    } else {
      // Folder is empty
      cy.log('Folder does not contain any templates/documents');
      cy.log('Verifying Delete option');
      cy.contains('button', 'Delete').should('be.visible');
      cy.contains('button', 'Move to Another Folder').should('not.exist');
      cy.log('VERIFIED: Delete button is displayed');
      cy.log('VERIFIED: Move to Another Folder is not displayed');
    }
  });


  return this;
}

clickDeleteOption() {
  cy.log('Action: Click Delete');
  cy.contains('Delete').should('be.visible').click({ force: true });
  cy.log('Delete clicked successfully');

  return this;
}

clickDeleteCancel() {
  cy.log('Action: Click Cancel on Delete popup');
  cy.contains('button', 'Cancel').should('be.visible').click();
  cy.log('Delete popup closed successfully');

  return this;
}

   enterFolderName(folderName) {
    cy.log(`Action: Enter document folder name: ${folderName}`);
    this.folderNameInput.should('be.visible').clear().type(folderName);
    cy.log(`Folder name entered successfully: ${folderName}`);

    return this;
  }

    clickCreateFolder() {
    cy.log('Action: Click Create Folder');
    this.createFolderButton.should('be.visible').scrollIntoView().click();
    cy.log('Create Folder clicked successfully');

    return this;
  }

  verifyPageLoaded() {
    cy.log('Verifying Document template page');

    this.documentHeading
      .should('be.visible');

    return this;
  }

    createFolder(folderName) {
    cy.log(`Action: Create new document folder: ${folderName}`);
    this.clickNewFolder();
    this.verifyNewFolderPopupDisplayed();
    this.enterFolderName(folderName);
    this.clickCreateFolder();
    cy.log(`Folder creation completed: ${folderName}`);

    return this;
  }


  verifyFolderCreated(folderName) {
    cy.log(`Action: Verify newly created folder: ${folderName}`);
    this.searchFolder(folderName);
    this.tableRows.contains(folderName).should('be.visible');
    cy.log(`VERIFIED: Folder created successfully: ${folderName}`);

    return this;
  }

    verifyGridFolderDisplayed(folderName) {
    cy.log(`Action: Verify grid folder: ${folderName}`);
    cy.contains(folderName).filter(':visible').should('be.visible');
    cy.log(`VERIFIED: Grid folder displayed: ${folderName}`);

    return this;
  }

  verifyFolderCount(folderName, count) {
    cy.log(`Action: Verify ${folderName} folder count: ${count}`);
    cy.contains(folderName).filter(':visible').closest('div').should('contain.text', `${count} Folders`);
    cy.log(`VERIFIED: ${folderName} folder count is ${count}`);

    return this;
  }
openFolder(folderName) {
   cy.log(`Action: Open folder: ${folderName}`);
   cy.contains('p', folderName)
    .filter(':visible')
    .should('exist')
    .click();
  cy.log(`Folder clicked successfully: ${folderName}`);

  return this;
  }

  clickBackButton() {
  cy.log('Action: Click Back button');
  this.backButton
    .should('be.visible')
    .click();
  cy.log('Back button clicked successfully');

  return this;
}

verifyActionsMenuOptions() {
  cy.log('**Action: Verify Actions menu options**');

  this.threeDotMenu.should('be.visible').click({ force: true });
  cy.contains('View').should('be.visible');
  cy.contains('Rename').should('be.visible');
  cy.contains('Delete').should('be.visible');

  cy.log('✔ View option is displayed');
  cy.log('✔ Rename option is displayed');
  cy.log('✔ Delete option is displayed');

  return this;
}


openFolderActions(folderName) {
  cy.log(`Action: Click three-dot Actions menu for folder: ${folderName}`);

  cy.get('tbody tr')
    .filter(':visible')
    .contains('td', folderName)
    .closest('tr')
    .find('[data-test="actions-folder-actions"]')
    .should('be.visible')
    .click({ force: true });

  cy.log(`Three-dot Actions menu opened for folder: ${folderName}`);

  return this;
}

clickCreateTemplate() {
  cy.log('Action: Click Create Template');
  this.createTemplateButton.should('be.visible').click();
  cy.log('Create Template popup opened successfully');

  return this;
}

selectFirstFolder() {
    cy.log('Action: Open Select Folder dropdown');
    cy.get('#react-select-2-input').should('be.visible').click({ force: true });
    cy.log('Select Folder dropdown opened');
    cy.get('[class*="menu"]').filter(':visible').find('[class*="option"]').first()
    .should('be.visible').click({ force: true });
     cy.log('First folder selected successfully');
}


}

export default new DocumentTemplatePage();
