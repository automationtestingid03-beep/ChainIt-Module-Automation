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

  get firstRecord() {
    return this.tableRows.first();
  }

  get threeDotMenu() {
    return this.firstRecord
      .first()
      .find('[data-test="actions-folder-actions"]')
      .filter(':visible')
      .first();
  }

  get documentThreeDotMenu() {
    return this.firstRecord
      .first()
      .find('[data-test="actions-user-management"]').filter(':visible').first();
  }

  get firstDocumentTemplateName() {
    return this.firstRecord.find('td').eq(0);
  }

  getFirstDocumentTemplateName() {
    cy.log('Action: Get first document template name');
    this.firstDocumentTemplateName.should('be.visible').invoke('text').then((text) => {
      const templateName = text.replace(/\s+/g, ' ').trim();
      expect(templateName, 'First document template name').to.not.be.empty;
      cy.wrap(templateName).as('deletedDocumentTemplateName');
      cy.log(`First document template name: ${templateName}`);
    });
    return this;
  }

  get documentTemplateRows() {
    return this.tableRows.filter(':visible');
  }
  get createTemplateButton() {
    return cy.get('[data-test="create-document-button"]');
  }

  getDocumentTemplateCountBeforeDuplicate() {
    cy.log('Action: Get document template count before duplicate');
    this.documentTemplateRows.should('have.length.at.least', 1).then(($rows) => {
      const count = $rows.length;
      cy.wrap(count).as('documentTemplateCountBefore');
      cy.log(`Document template count before duplicate: ${count}`);
    });

    return this;
  }

  get folderDropdown() {
    return cy.contains('label', 'Select Folder')
      .parent()
      .find('input, button, [role="combobox"]')
      .first();
  }

  get advancedOptionsPopup() {
    return cy.get('[role="dialog"]').filter(':visible');
  }

  get advancedOptionsCancelButton() {
    return this.advancedOptionsPopup.find('[data-test="button-Cancel"]');
  }

  get advancedOptionsSaveButton() {
    return this.advancedOptionsPopup.find('[data-test="button-Save"]');
  }

  get documentTemplatesLink() {
    return cy.get('a[href="/personal/configuration/configuration-documents"]').first();
  }

  get folderCards() {
  return cy.get('[data-test="actions-folder-actions"]');
 }

get deleteFolderPopup() {
  return cy.get('[role="dialog"]').filter(':visible');
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
        cy.log(`First folder name: ${folderName}`);
      });

    return this;
  }

  clickUploadConfirm() {
    cy.log('**Action: Click "Upload" button to confirm file upload**');

    cy.contains('button', /^Upload\s*$/i, { timeout: 30000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });

    cy.contains('Add Placeholders', { timeout: 30000 }).should('be.visible');
    cy.log('✔ Upload confirmed and Add Placeholders screen is visible');
    return this;
  }

  verifyAddPlaceholdersSectionDisplayed() {
    cy.log('**Action: Verify "Add Placeholders" section is displayed**');
    cy.contains('Add Placeholders', { timeout: 30000 }).should('be.visible');
    cy.log('✔ VERIFIED: Add Placeholders section is displayed');
    return this;
  }

  openFirstFolderActions() {
    cy.log('Action: Click three-dot Actions menu for first folder');
    this.threeDotMenu.should('exist').scrollIntoView().should('be.visible').click({ force: true });
    cy.log('Three-dot Actions menu opened successfully');

    return this;
  }

  clickFirstRecordActions() {
    cy.log('Action: Click Actions menu for first record');
    cy.get('tbody tr').filter(':visible').first().find('[data-test="actions-folder-actions"]').filter(':visible')
      .first().should('be.visible').click({ force: true });
    cy.log('First record Actions menu clicked successfully');

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
    const expectedColumns = ['Folder Name', 'Created Date', 'Actions'];

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
          el.innerText.trim() === 'Move to Another Folder');

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
    this.backButton.should('be.visible').click();
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


  clickFirstDocumentActions() {
    cy.log('Action: Click Actions menu for first document template');
    this.documentThreeDotMenu.should('exist').and('be.visible')
      .scrollIntoView().click({ force: true });
    cy.log('First document template Actions menu opened successfully');

    return this;
  }

  clickDeleteFirstDocumentTemplate() {
    cy.log('Action: Open Actions menu for first document template');
    this.documentThreeDotMenu.should('exist').and('be.visible').scrollIntoView()
      .click({ force: true });
    cy.log('Actions menu opened successfully');
    cy.contains('Delete').should('be.visible').click({ force: true });
    cy.log('Delete option clicked successfully');

    return this;
  }

  verifyDocumentTemplateActions() {
    cy.log('Action: Verify document template Actions menu options');
    cy.contains('View').should('be.visible');
    cy.contains('Edit').should('be.visible');
    cy.contains('Duplicate').should('be.visible');
    cy.contains('Move').should('be.visible');
    cy.contains('Delete').should('be.visible');
    cy.log('Verified: View option is displayed');
    cy.log('Verified: Edit option is displayed');
    cy.log('Verified: Duplicate option is displayed');
    cy.log('Verified: Move option is displayed');
    cy.log('Verified: Delete option is displayed');

    return this;
  }

  verifyDocumentTemplateDeletePopup() {
    cy.log('Action: Verify Delete Document Template popup');
    cy.contains('Document Template Deletion', { timeout: 30000 }).should('be.visible');
    cy.contains('button', 'Cancel').should('be.visible');
    cy.contains('button', 'Delete').should('be.visible');
    cy.log('Verified: Delete Document Template popup is displayed');
    cy.log('Verified: Cancel button is displayed');
    cy.log('Verified: Delete button is displayed');

    return this;
  }

  confirmDeleteDocumentTemplate() {
    cy.get('@deletedDocumentTemplateName').then((templateName) => {
      cy.log(`Action: Verify deleted template is removed: ${templateName}`);
      cy.get('tbody tr').filter(':visible').should('not.contain.text', templateName);
      cy.log(`VERIFIED: Document template "${templateName}" is deleted successfully`);
    });

    return this;
  }

  clickDuplicateFirstDocumentTemplate() {
    cy.log('Action: Open Actions menu for first document template');
    this.documentThreeDotMenu.should('exist').and('be.visible').scrollIntoView().click({ force: true });
    cy.log('Actions menu opened successfully');
    cy.contains('Duplicate').should('be.visible').click({ force: true });
    cy.log('Duplicate option clicked successfully');

    return this;
  }
  verifyDocumentTemplateDuplicatedMessage() {
    cy.log('Action: Verify document template duplicate success message');
    cy.contains('Document Template Duplicated', { timeout: 30000 }).should('be.visible');
    cy.contains('Document template duplicated successfully.', { timeout: 30000 }).should('be.visible');
    cy.log('VERIFIED: Document template duplicated successfully');

    return this;
  }

  verifyDocumentTemplateCountIncreased() {
    cy.log('Action: Verify document template count increased after duplicate');
    cy.get('@documentTemplateCountBefore').then((beforeCount) => {
      cy.get('tbody tr').filter(':visible').should('have.length', beforeCount + 1);
      cy.get('tbody tr').filter(':visible').then(($rows) => {
        const afterCount = $rows.length;
        cy.log(`Document template count before duplicate: ${beforeCount}`);
        cy.log(`Document template count after duplicate: ${afterCount}`);
        expect(afterCount).to.equal(beforeCount + 1);
        cy.log('VERIFIED: Document template count increased by 1');
      });
    });

    return this;
  }

  clickMoveFirstDocumentTemplate() {
    cy.log('Action: Open Actions menu for first document template');
    this.documentThreeDotMenu.should('exist').and('be.visible').scrollIntoView().click({ force: true });
    cy.log('Actions menu opened successfully');
    cy.contains('Move').should('be.visible').click({ force: true });
    cy.log('Move option clicked successfully');

    return this;
  }

  clickViewFirstDocumentTemplate() {
    cy.log('Action: Open Actions menu for first document template');
    cy.get('tbody tr').filter(':visible').first().find('[data-test="actions-user-management"]').filter(':visible')
    .first().should('exist').should('be.visible').scrollIntoView().click({ force: true });
    cy.log('Actions menu opened successfully');
    cy.contains('View').should('be.visible').click({ force: true });
    cy.log('View option clicked successfully');

    return this;
  }

  verifyMoveToFolderPopup() {
    cy.log('Action: Verify Move to Folder popup');

    cy.contains('Move to Folder', { timeout: 30000 }).should('be.visible');
    cy.contains('Select Folder').should('be.visible');
    cy.contains('button', 'Cancel').should('be.visible');
    cy.contains('button', 'Move').should('be.visible');
    cy.log('Verified: Move to Folder popup is displayed');
    cy.log('Verified: Cancel button is displayed');
    cy.log('Verified: Move button is displayed');

    return this;
  }

  selectSecondFolderForMove() {
    cy.log('Action: Open Select Folder dropdown');
    cy.contains('Move to Folder').closest('[role="dialog"]').find('input[role="combobox"]')
      .should('be.visible').click({ force: true });
    cy.log('Folder dropdown opened successfully');
    cy.get('[role="option"]').filter(':visible').should('have.length.at.least', 2)
      .eq(1).invoke('text').then((text) => {
        const folderName = text.replace(/\s+/g, ' ').trim();
        expect(folderName, 'Second folder name').to.not.be.empty;
        cy.wrap(folderName).as('targetFolderName');
        cy.log(`Second folder selected: ${folderName}`);
      });
    cy.get('[role="option"]').filter(':visible').eq(1).click({ force: true });
    cy.log('Second folder selected successfully');

    return this;
  }

  confirmMoveDocumentTemplate() {
    cy.log('Action: Click Move button');
    cy.contains('button', 'Move').filter(':visible').should('be.visible').and('not.be.disabled').click({ force: true });
    cy.log('Move button clicked successfully');
    cy.contains('Document Template Moved', { timeout: 30000 }).should('be.visible');
    cy.contains('Document template moved successfully.', { timeout: 30000 }).should('be.visible');
    cy.log('VERIFIED: Document template moved successfully');

    return this;
  }

  searchMovedFolder() {
    cy.get('@targetFolderName').then((folderName) => {
      cy.log(`Action: Search moved folder: ${folderName}`);
      this.searchInput.should('be.visible').clear().type(folderName);
      cy.log(`Folder search completed: ${folderName}`);
    });

    return this;
  }

  openMovedFolder() {
    cy.get('@targetFolderName').then((folderName) => {
      cy.log(`Action: Open moved folder: ${folderName}`);
      cy.contains('tbody tr', folderName).filter(':visible').first().contains(folderName).click({ force: true });
      cy.log(`Moved folder "${folderName}" opened successfully`);
    });

    return this;
  }

  verifyMovedDocumentTemplate() {
    cy.get('@movedDocumentTemplateName').then((templateName) => {
      cy.log(`Action: Verify moved document template: ${templateName}`);
      cy.contains('tbody tr', templateName, { timeout: 30000 }).filter(':visible').should('exist')
        .and('contain.text', templateName);
      cy.log(`VERIFIED: Document template "${templateName}" is available in the moved folder`);
    });

    return this;
  }

  verifyDocumentTemplateViewPage() {
    cy.log('Action: Verify document template View page');
    cy.contains('Details', { timeout: 30000 }).should('be.visible');
    cy.contains('Summary').should('be.visible');
    cy.contains('Template Name').should('be.visible');
    cy.contains('Created').should('be.visible');
    cy.contains('Updated').should('be.visible');
    cy.contains('Recipients').should('be.visible');
    cy.contains('Preview').should('be.visible');
    cy.contains('Signature').should('be.visible');
    cy.log('VERIFIED: Document template View page is displayed');

    return this;
  }

  verifyDocumentTemplateNameInView() {
    cy.log('Action: Verify document template name');
    cy.get('@deletedDocumentTemplateName').then((templateName) => {
      cy.contains('span', templateName).should('be.visible');
      cy.log(`VERIFIED: Template name is displayed: ${templateName}`);
    });

    return this;
  }

  verifyDocumentTemplateViewIsReadOnly() {
    cy.log('Action: Verify document template View page is read-only');
    cy.get('[data-test="document-view-edit-button"]').should('be.visible').and('contain.text', 'Edit');
    cy.get('input[type="text"]:visible').should('not.exist');
    cy.get('textarea:visible').should('not.exist');
    cy.get('select:visible').should('not.exist');
    cy.get('[contenteditable="true"]:visible').should('not.exist');
    cy.log('VERIFIED: Document template View page is read-only');

    return this;
  }

  clickEditDocumentTemplate() {
    cy.log('Action: Click Edit button');
    cy.get('[data-test="document-view-edit-button"]').should('be.visible').click({ force: true });
    cy.log('Edit button clicked successfully');

    return this;
  }

  clickAdvancedOptions() {
    cy.log('Action: Click Advanced options');
    cy.contains('button', 'Advanced options').should('be.visible').click({ force: true });
    cy.log('Advanced options popup opened successfully');

    return this;
  }

  verifyAdvancedOptionsPopup() {
    cy.log('Action: Verify Advanced options popup');
    this.advancedOptionsPopup.should('be.visible').within(() => {
      cy.contains('Advanced options').should('be.visible');
      cy.contains('Allowed signature types').should('be.visible');
      cy.contains('Date format').should('be.visible');
      cy.contains('Time zone').should('be.visible');
      cy.get('[data-test="button-Cancel"]').should('be.visible').and('contain.text', 'Cancel');
      cy.get('[data-test="button-Save"]').should('be.visible').and('contain.text', 'Save');
    });
    cy.log('VERIFIED: Advanced options popup is displayed');

    return this;
  }

  verifyAllowedSignatureTypes() {
    cy.log('Action: Verify Allowed signature types dropdown');
    cy.contains('Allowed signature types').parent().find('[role="combobox"]').should('be.visible').click({ force: true });
    const signatureTypes = ['Select All', 'Draw', 'Type', 'Upload'];
    signatureTypes.forEach((type) => {
      cy.contains('[role="option"]', type).should('be.visible');
      cy.log(`Verified signature type: ${type}`);
    });
    cy.log('VERIFIED: All Allowed signature types are displayed');

    return this;
  }

  clickAdvancedOptionsCancel() {
    cy.log('Action: Click Cancel button in Advanced options');
    this.advancedOptionsPopup.find('[data-test="button-Cancel"]').should('be.visible').click();
    cy.log('Advanced options cancelled successfully');

    return this;
  }

  clickAdvancedOptionsSave() {
    cy.log('Action: Click Save button in Advanced options');
    this.advancedOptionsPopup.find('[data-test="button-Save"]').should('be.visible').click();
    cy.log('Advanced options saved successfully');

    return this;
  }

  clickDocumentTemplates() {
    cy.log('Action: Click Document Templates');
    this.documentTemplatesLink.should('be.visible').click();
    cy.log('Document Templates clicked successfully');
    return this;
  }

  deleteAllEmptyFolders() {
     cy.log('Action: Delete all folders containing zero templates');

  const deleteEmptyFolder = (index = 1) => {

    cy.wait(1500);

    // Re-query the page every time
    cy.get('body').then(($body) => {

      const emptyFolders = $body
        .find('span')
        .filter((i, el) => {
          return Cypress.$(el).text().trim() === '0 Templates';
        });

      if (emptyFolders.length === 0) {
        cy.log('VERIFIED: No folders with zero templates remaining');
        return;
      }

      cy.log(`Empty folder ${index} found`);

      // Get folder card from CURRENT DOM
      const folderCard = Cypress.$(emptyFolders[0])
        .closest('div.bg-\\[\\#F3F3F3\\]');

      const folderName = folderCard
        .find('p')
        .first()
        .text()
        .replace(/\s+/g, ' ')
        .trim();

      expect(folderName).to.not.be.empty;

      cy.log(`Folder name: ${folderName}`);

      // IMPORTANT:
      // Break the jQuery chain and re-query the folder using its name
      cy.contains('p', folderName)
        .should('be.visible')
        .closest('div.bg-\\[\\#F3F3F3\\]')
        .find('[data-test="actions-folder-actions"]')
        .should('be.visible')
        .click({ force: true });

      cy.log(`Actions menu opened for: ${folderName}`);

      // Wait for Actions menu
      cy.wait(800);

      // Re-query menu from BODY
      cy.get('body')
        .contains('button', 'Delete')
        .filter(':visible')
        .should('exist')
        .click({ force: true });

      cy.log(`Delete option clicked for: ${folderName}`);

      // Wait for popup
      cy.wait(800);

      cy.contains('Delete Folder')
        .should('be.visible');

      cy.log('Delete Folder popup displayed');

      // Click Delete in popup
      cy.contains('button', 'Delete')
        .filter(':visible')
        .last()
        .should('be.visible')
        .click({ force: true });

      cy.log(`Folder deleted successfully: ${folderName}`);

      // IMPORTANT:
      // Do NOT continue using folderCard or emptyFolders here.
      // Wait for React to finish rendering.
      cy.wait(2000);

      // Start completely fresh
      deleteEmptyFolder(index + 1);
    });
  };

  deleteEmptyFolder();
    return this;
  }
}

export default new DocumentTemplatePage();
