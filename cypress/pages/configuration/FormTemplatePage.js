import BasePage from '../BasePage';
class FormTemplatePage extends BasePage {

   get pageHeading() {
    return cy.contains('h1, h2, span', 'Form Templates').filter(':visible').first();
  }
  get createNewButton() {
    return cy.get('[data-test="create-document-button"]').filter(':visible').first();
  }
  get newFolderButton() {
    return cy.contains('button','New Folder').filter(':visible').first();
  }
  get folderNameInput() {
    return cy.get('[data-test="name-input"]').filter(':visible').first();
  }
  get createFolderButton() {
    return cy.get('[data-test="add-folder"]').filter(':visible').first();
  }
  get titleInput() {
    return cy.get('[data-test="templateName-input"], input[placeholder*="Enter Template Name" i]').filter(':visible').first();
  }
  get folderDropdown() {
    return cy.contains('label',/Select Folder/i).parent().find('input[role="combobox"], [role="combobox"]').first();
  }
  get searchInput() {
    return cy.get('input[placeholder="Search"]').filter(':visible').first();
  }
  get listViewButton() {
    return cy.get('[data-test="list-view"]').filter(':visible').first();
  }
  get gridViewButton() {
    return cy.get('[data-test="grid-view"]').filter(':visible').first();
  }
  get saveButton() {
    return cy.contains('button',/^Save$/i).filter(':visible').last();
  }
  get createButton() {
    return cy.contains('button',/^Create$/i).filter(':visible').last();
  }
  get publishButton() {
    return cy.contains('button',/^Publish$/i).filter(':visible').first();
  }
  get importFormButton() {
    return cy.contains('button',/^Import Form$/i).filter(':visible').first();
  }
  get exportFormButton() {
    return cy.contains('button',/^Export Form$/i).filter(':visible').first();
  }
  get previewButton() {
    return cy.contains('button',/^Preview$/i).filter(':visible').first();
  }
  get cancelButton() {
    return cy.get('[data-test="button-Cancel"]').filter(':visible').first();
  }
  get formHeading() {
    return cy.contains(/Form Templates?/i).filter(':visible').first();
  }
  // TABLE
  get table() {
    return cy.get('table').filter(':visible').first();
  }
  get tableHeaders() {
    return this.table.find('thead th');
  }
  get tableRows() {
    return this.table.find('tbody tr').filter(':visible');
  }
  get firstRecord() {
    return this.tableRows.first();
  }
  /*
   * IMPORTANT:
   * Do not keep a stale row/action reference when React
   * re-renders the table.
   */
  get firstRecordActions() {
    return this.firstRecord.find(
        '[data-test="actions-user-management"], [data-test*="actions"], button[aria-label*="action" i]'
      ).filter(':visible').first();
  }
  get firstFolderActions() {
    return this.firstRecord.find(
        '[data-test="actions-folder-actions"], button[aria-label*="action" i]'
      ).filter(':visible').first();
  }
  // PAGINATION
  get paginationContainer() {
    return cy.get('ul').filter(':has(button)').filter(':visible').last();
  }
  get previousPageButton() {
    return this.paginationContainer.find('li').eq(1).find('button').first();
  }
  get nextPageButton() {
    return this.paginationContainer.find('li').eq(-2).find('button').first();
  }

   get formTemplatesLink() {
    return cy.get('a[href="/personal/configuration/forms"]').first();
  }
  // FOLDER PAGE
  verifyPageLoaded() {
    cy.log('Action: Verify Form Templates page is displayed');
    this.formHeading.should('be.visible');
    cy.log('VERIFIED: Form Templates page displayed');
    return this;
  }
  verifyFolderTableColumns() {
    cy.log('Action: Verify folder table columns');
    const expectedColumns = ['Folder Name','Created Date','Actions'];
    expectedColumns.forEach((columnName) => {
      this.tableHeaders.contains(columnName).should('be.visible');
    });
    cy.log('VERIFIED: Folder table columns');
    return this;
  }
  verifyRecordsDisplayed() {
    cy.log('Action: Verify folder records are displayed');
    this.tableRows.should('have.length.at.least', 1);
    cy.log('VERIFIED: Folder records are displayed');
    return this;
  }
  // GRID / LIST VIEW
  clickGridView() {
    cy.log('Action: Switch to Grid View');
    this.gridViewButton.should('be.visible').click({ force: true });
    cy.log('Grid View selected');
    return this;
  }
  verifyGridViewDisplayed() {
    cy.log('Action: Verify Grid View');
    this.gridViewButton.should('be.visible');
    cy.log('VERIFIED: Grid View displayed');
    return this;
  }
  clickListView() {
    cy.log('Action: Switch to List View');
    this.listViewButton.should('be.visible').click({ force: true });
    cy.log('List View selected');
    return this;
  }
  verifyListViewDisplayed() {
    cy.log('Action: Verify List View');
    this.table.should('be.visible');
    cy.log('VERIFIED: List View displayed');
    return this;
  }
  // FOLDER SEARCH
  searchFolder(folderName) {
    cy.log(`Action: Search folder: ${folderName}`);
    this.searchInput.should('be.visible').clear().type(folderName);
    return this;
  }
  verifyFolderSearchResult(folderName) {
    cy.log(`Action: Verify folder search result: ${folderName}`);
    this.tableRows.should('have.length', 1).and('contain.text', folderName);
    cy.log('VERIFIED: Folder search result');
    return this;
  }
  clearSearch() {
    cy.log('Action: Clear Search');
    this.searchInput.should('be.visible').clear();
    return this;
  }
  // FOLDER ACTIONS
  clickFirstFolderActions() {
    cy.log('Action: Click Actions for first folder');
    cy.get('tbody tr').filter(':visible').first().find('td').last().find('button').filter(':visible').last().should('be.visible').scrollIntoView().click({ force: true });
    cy.wait(500);
    cy.log('Folder Actions menu opened');
    return this;
  }
  verifyFolderActionsMenuOptions() {
    cy.log('Action: Verify folder Actions menu');
    ['View','Rename','Delete'].forEach((option) => {
      cy.get('body').contains('button, [role="button"]', option).filter(':visible').should('exist');
      cy.log(`Verified folder action: ${option}`);
    });
    return this;
  }
  viewFirstFolder() {
    cy.log('Action: View first folder');
    cy.get('body').contains('button, [role="button"]','View').filter(':visible').should('exist').click({ force: true });
    cy.wait(500);
    this.formHeading.should('be.visible');
    cy.log('Folder opened successfully');
    return this;
  }
  // FOLDER RENAME / DELETE
  verifyRenameFolderPopup() {
    cy.log('Action: Verify Rename Folder popup');
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.contains('[role="dialog"]:visible',/Rename Folder/i).should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Cancel').should('be.visible');
    cy.log('VERIFIED: Rename Folder popup');
    return this;
  }
  verifyDeleteFolderPopup() {
    cy.log('Action: Verify Delete Folder popup');
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.contains('[role="dialog"]:visible',/Delete Folder/i).should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Cancel').should('be.visible');
    cy.log('VERIFIED: Delete Folder popup');
    return this;
  }
  cancelFolderAction() {
    cy.log('Action: Cancel folder action');
    cy.get('[role="dialog"]:visible').contains('button', 'Cancel').should('be.visible').click({ force: true });
    return this;
  }
  // CREATE FOLDER
  createFolder(folderName) {
    cy.log(`Action: Create folder: ${folderName}`);
    this.newFolderButton.should('be.visible').click({ force: true });
    this.folderNameInput.should('be.visible').clear().type(folderName);
    this.createFolderButton.should('be.visible').click({ force: true });
    cy.log(`Folder creation submitted: ${folderName}`);
    return this;
  }
  verifyFolderDisplayed(folderName) {
    cy.log(`Action: Verify folder: ${folderName}`);
    cy.contains(folderName).filter(':visible').should('be.visible');
    cy.log(`VERIFIED: Folder displayed: ${folderName}`);
    return this;
  }
  openFolder(folderName) {
    cy.log(`Action: Open folder: ${folderName}`);
  // Always use List View before opening a folder
    this.clickListView();
    this.verifyListViewDisplayed();
  // Search the newly created folder
    this.searchFolder(folderName);
  // Wait for the folder to appear after search
    cy.contains('tbody tr', folderName, { timeout: 30000 }).filter(':visible').first().should('be.visible');
    cy.log(`Verified folder displayed: ${folderName}`);
  // Re-query the row after the search to avoid stale DOM
    cy.contains('tbody tr', folderName, { timeout: 30000 }).filter(':visible').first().find('td').first()
    .should('be.visible').click({ force: true });
    cy.wait(1000);
    cy.log(`Folder opened successfully: ${folderName}`);

    return this;
  }

  // CREATE FORM TEMPLATE
  clickCreateNewButton() {
    cy.log('Action: Click Create Form Template');
    this.createNewButton.should('be.visible').click({ force: true });
    cy.log('Create Form Template page displayed');
    return this;
  }
  selectExistingFolder(folderName) {
    cy.log(`Action: Select folder: ${folderName}`);
    this.folderDropdown.should('be.visible').click({ force: true });
    cy.get('[role="option"]').filter(':visible').contains(folderName).should('be.visible').click({ force: true });
    cy.log(`Folder selected: ${folderName}`);
    return this;
  }
  clickCreateTemplate() {
    cy.log('Action: Click Create');
    this.createButton.should('be.visible').and('not.be.disabled').click({ force: true });
    this.titleInput.should('be.visible');
    cy.log('Create Form editor displayed');
    return this;
  }
  enterTitle(title) {
    cy.log(`Action: Enter form template title: ${title}`);
    this.titleInput.should('be.visible').clear().type(title);
    return this;
  }
  // FORM EDITOR
  verifyFormEditorDisplayed() {
    cy.log('Action: Verify Form editor');
    cy.contains(/Create Form Template|Edit Form Template|Create Form/i).filter(':visible').should('be.visible');
    this.titleInput.should('be.visible');
    this.publishButton.should('be.visible');
    this.importFormButton.should('be.visible');
    this.exportFormButton.should('be.visible');
    this.previewButton.should('be.visible');
    cy.log('VERIFIED: Form editor displayed');
    return this;
  }
  verifyFormBuilderSections() {
    cy.log('Action: Verify Form Builder sections');
    ['Basic','Advanced','Layout','Data','Individual (IVDT)','Documents (IVDT)'].forEach((section) => {
    cy.contains(section).filter(':visible').should('be.visible');
    cy.log(`Verified section: ${section}`);
    });
    cy.log('VERIFIED: All Form Builder sections');
    return this;
  }
  // PUBLISH WITHOUT TITLE
  publishWithoutTitle() {
    cy.log('Action: Click Publish without entering template name');
    this.publishButton.should('be.visible').click({ force: true });
    cy.log('Publish clicked without title');
    return this;
  }
  verifyTitleRequiredValidation() {
    cy.log('Action: Verify title required validation');
    cy.contains('Name is required').filter(':visible').should('be.visible');
    cy.log('VERIFIED: Name is required');
    return this;
  }
  verifyPublishValidationError() {
    cy.log('Action: Verify Publish validation error');
    cy.contains('Validation Error').filter(':visible').should('be.visible');
    cy.contains('Please add at least one field to the form').filter(':visible').should('be.visible');
    cy.log('VERIFIED: Publish validation error');
    return this;
  }
  // IMPORT FORM
  openImportForm() {
    cy.log('Action: Open Import Form');
    this.importFormButton.should('be.visible').click({ force: true });
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.contains('[role="dialog"]:visible','Import Form').should('be.visible');
    cy.log('Import Form popup displayed');
    return this;
  }
  verifyImportFormPopup() {
    cy.log('Action: Verify Import Form popup');
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.contains('[role="dialog"]:visible','Upload Document').should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Upload File').should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Confirm').should('be.visible');
    return this;
  }
  closeImportForm() {
    cy.log('Action: Close Import Form');
    cy.get('[role="dialog"]:visible').contains('button', 'Cancel').should('be.visible').click({ force: true });
    cy.get('[role="dialog"]:visible').should('not.exist');
    cy.log('Import Form popup closed');
    return this;
  }
  // EXPORT FORM
  exportForm() {
    cy.log('Action: Click Export Form');
    this.exportFormButton.should('be.visible').click({ force: true });
    cy.log('Export Form clicked successfully');
    return this;
  }
  // PREVIEW
  openPreview() {
    cy.log('Action: Click Preview');
    this.previewButton.should('be.visible').click({ force: true });
    cy.wait(500);
    cy.log('Preview opened');
    return this;
  }
  verifyPreviewDisplayed() {
    cy.log('Action: Verify Preview');
    cy.contains(/Preview/i).filter(':visible').should('be.visible');
    cy.log('VERIFIED: Preview displayed');
    return this;
  }

  closePreview() {
     cy.log('Action: Close Preview');
     cy.get('[role="dialog"]:visible').contains('h3', 'Preview').closest('div.flex').find('button')
       .first().should('be.visible').click({ force: true });
     cy.get('[role="dialog"]:visible').should('not.exist');
     cy.log('Preview closed successfully');
     
    return this;
  }
  // ADD BASIC FORM FIELD
  dragBasicFieldToForm(fieldKey = 'textfield') {
    cy.log(`Action: Drag ${fieldKey} field to Form Builder`);

    cy.get('iframe[title="Form Builder"]', { timeout: 30000 })
      .should('exist')
      .then(($iframe) => {
        const iframe = $iframe[0];
        const doc = iframe.contentDocument;

        const fieldEl = doc.querySelector(
          `#group-basic [data-group="basic"][data-key="${fieldKey}"]:not(.gu-mirror)`
        );

        const dropEl = doc.querySelector(
          '.builder-components.drag-container.formio-builder-form'
        );

        expect(fieldEl, `Source field: ${fieldKey}`).to.exist;
        expect(dropEl, 'Form Builder drop zone').to.exist;

        const fieldRect = fieldEl.getBoundingClientRect();
        const dropRect = dropEl.getBoundingClientRect();

        const startX = fieldRect.left + fieldRect.width / 2;
        const startY = fieldRect.top + fieldRect.height / 2;

        const endX = dropRect.left + dropRect.width / 2;
        const endY = dropRect.top + 100;

        cy.log(`Start: ${startX}, ${startY}`);
        cy.log(`End: ${endX}, ${endY}`);

        // Mouse down on source
        cy.wrap(fieldEl).trigger('mousedown', {
          button: 0,
          buttons: 1,
          clientX: startX,
          clientY: startY,
          force: true
        });

        // Move gradually toward drop zone
        const steps = 10;

        for (let i = 1; i <= steps; i++) {
          const x = startX + ((endX - startX) * i) / steps;
          const y = startY + ((endY - startY) * i) / steps;

          cy.wrap(doc).trigger('mousemove', {
            button: 0,
            buttons: 1,
            clientX: x,
            clientY: y,
            force: true
          });
        }

        // Move directly over drop zone
        cy.wrap(dropEl).trigger('mousemove', {
          button: 0,
          buttons: 1,
          clientX: endX,
          clientY: endY,
          force: true
        });

        // Drop
        cy.wrap(doc).trigger('mouseup', {
          button: 0,
          buttons: 0,
          clientX: endX,
          clientY: endY,
          force: true
        });
      });

    // ---------------------------------------------------------
    // Trigger blur / outside click
    // ---------------------------------------------------------
    cy.get('iframe[title="Form Builder"]', { timeout: 30000 })
      .its('0.contentDocument')
      .then((doc) => {
        // Blur active element
        if (
          doc.activeElement &&
          typeof doc.activeElement.blur === 'function'
        ) {
          doc.activeElement.blur();
        }

        // Simulate outside click using native DOM events
        const body = doc.body;

        body.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: doc.defaultView
          })
        );

        body.dispatchEvent(
          new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true,
            view: doc.defaultView
          })
        );

        body.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: doc.defaultView
          })
        );
      });

    // ---------------------------------------------------------
    // Verify component
    // ---------------------------------------------------------
    cy.get('iframe[title="Form Builder"]', { timeout: 30000 })
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .find(`.formio-component-${fieldKey}`, { timeout: 15000 })
      .should('exist')
      .and('be.visible');

    cy.log(`VERIFIED: ${fieldKey} field added to Form Builder`);

    return this;
  }

  // PUBLISH TEMPLATE
  publishTemplate() {
    cy.log('Action: Publish Form Template');
    this.publishButton.should('be.visible').and('not.be.disabled').click({ force: true });
    cy.log('Publish button clicked');
    return this;
  }
  // TEMPLATE LIST
  verifyFormTemplateTableColumns() {
    cy.log('Action: Verify Form Template table columns');
    ['Template Name','Created By','Created','Updated','Use Template','Actions'].forEach((columnName) => {
    this.tableHeaders.contains(columnName).should('be.visible');
    cy.log(`Verified column: ${columnName}`);
    });
    cy.log('VERIFIED: All Form Template columns');
    return this;
  }
  verifyTemplateRecordsDisplayed() {
    cy.log('Action: Verify Form Template records');
    this.tableRows.should('have.length.at.least', 1);
    return this;
  }
  // TEMPLATE SEARCH
  searchTemplate(templateName) {
  cy.log(`Action: Search Form Template: ${templateName}`);

  cy.intercept(
    'GET',
    '**/documents/v1/form-builder/template*'
  ).as('getFormTemplates');

  this.searchInput
    .should('be.visible')
    .clear()
    .type(templateName);

  cy.wait('@getFormTemplates');

  return this;
}
  verifyTemplateInList(templateName) {
    cy.log(`Action: Verify template in list: ${templateName}`);
    this.tableRows.contains(templateName).should('be.visible');
    cy.log(`VERIFIED: Template displayed: ${templateName}`);
    return this;
  }
  verifyOnlySearchResultDisplayed(templateName) {
    cy.log(`Action: Verify only search result: ${templateName}`);
    this.tableRows.should('have.length', 1).and('contain.text', templateName);
    return this;
  }
  // TEMPLATE ACTIONS
    // TEMPLATE ACTIONS

  clickFirstTemplateActions() {
    cy.log('Action: Click Actions for first Form Template');

    const actionsButton = () => {
      return cy.get('tbody tr')
        .filter(':visible')
        .first()
        .find('[data-test="actions-template-actions"]')
        .filter(':visible')
        .first();
    };

    // Make sure the correct Actions button exists
    actionsButton()
      .scrollIntoView()
      .should('be.visible')
      .should('have.attr', 'aria-haspopup', 'menu')
      .should('have.attr', 'aria-expanded', 'false');

    /*
     * Use keyboard Enter instead of force-click.
     *
     * This is intentional because the application is using
     * Headless UI Menu. Enter is a native supported way of
     * opening the Headless UI menu and avoids the race condition
     * we were seeing after force-click.
     */
    actionsButton()
      .focus()
      .type('{enter}');

    // Verify that the menu button changed to OPEN state
    actionsButton()
      .should('have.attr', 'aria-expanded', 'true');

    cy.log('Form Template Actions menu opened');

    return this;
  }

  // Get the currently opened Form Template Actions menu
  getOpenTemplateActionsMenu() {
    return cy.get(
      '[role="menu"]:visible, ' +
      '[id^="headlessui-menu-items-"]:visible, ' +
      '[data-open]:visible'
    )
      .filter(':not(button)')
      .last()
      .should('be.visible');
  }

  // VERIFY ACTIONS MENU OPTIONS
  verifyActionsMenuOptions() {
    cy.log('Action: Verify Form Template Actions');

    // Open the Actions menu
    this.clickFirstTemplateActions();

    const actions = [
      'View',
      'Edit',
      'Duplicate',
      'Move',
      'Delete'
    ];

    /*
     * IMPORTANT:
     * Do NOT use:
     *
     * cy.contains('View')
     *
     * because that searches the whole page.
     *
     * Instead, first locate the opened menu and then search
     * only inside that menu.
     */
    this.getOpenTemplateActionsMenu().within(() => {

      actions.forEach((option) => {

        cy.contains(
          '[role="menuitem"], button, a',
          new RegExp(`^${option}$`, 'i')
        )
          .filter(':visible')
          .should('exist');

        cy.log(`Verified template action: ${option}`);
      });
    });

    cy.log('VERIFIED: All Form Template Actions');

    return this;
  }


  // VIEW TEMPLATE
  clickViewTemplate() {
    cy.log('Action: Click View');

    /*
     * The menu should already be open when this method is called.
     * Locate View only inside the currently opened menu.
     */
    this.getOpenTemplateActionsMenu()
      .contains(
        '[role="menuitem"], button, a',
        /^View$/i
      )
      .filter(':visible')
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);

    cy.log('View clicked');

    return this;
  }
  verifyTemplateViewPage() {
    cy.log('Action: Verify Form Template View page');
    cy.contains(/Form Template|Template Details|Details/i).filter(':visible').should('be.visible');
    cy.contains('Summary').filter(':visible').should('be.visible');
    cy.contains('Template Name').filter(':visible').should('be.visible');
    cy.contains('Created').filter(':visible').should('be.visible');
    cy.contains('Updated').filter(':visible').should('be.visible');
    cy.log('VERIFIED: Form Template View page');
    return this;
  }
  verifyTemplateViewIsReadOnly() {
    cy.log('Action: Verify View page is read-only');
    cy.get('input[type="text"]:visible').should('not.exist');
    cy.get('textarea:visible').should('not.exist');
    cy.get('select:visible').should('not.exist');
    cy.get('[contenteditable="true"]:visible').should('not.exist');
    cy.log('VERIFIED: Form Template View page is read-only');
    return this;
  }
  // EDIT TEMPLATE
  clickEditTemplate() {
    cy.log('Action: Click Edit');

    this.getOpenTemplateActionsMenu()
      .contains(
        '[role="menuitem"], button, a',
        /^Edit$/i
      )
      .filter(':visible')
      .should('be.visible')
      .click({ force: true });

    cy.wait(500);

    cy.log('Edit page opened');

    return this;
  }
  verifyTemplateNameInEditPage(expectedTitle) {
    cy.log(`Action: Verify template name: ${expectedTitle}`);
    this.titleInput.should('be.visible').and('have.value', expectedTitle);
    cy.log('VERIFIED: Template name displayed correctly');
    return this;
  }
  // DUPLICATE TEMPLATE
  duplicateFirstTemplate() {
    cy.log('Action: Duplicate first Form Template');

    cy.get('tbody tr')
      .filter(':visible')
      .first()
      .then(($row) => {

        const templateName = $row
          .find('td')
          .eq(1)
          .text()
          .replace(/\s+/g, ' ')
          .trim();

        expect(
          templateName,
          'Template name before duplicate'
        ).to.not.be.empty;

        cy.wrap(templateName).as('originalFormTemplateName');
      });

    // Open actions menu
    this.clickFirstTemplateActions();

    // Click Duplicate only inside the opened menu
    this.getOpenTemplateActionsMenu()
      .contains(
        '[role="menuitem"], button, a',
        /^Duplicate$/i
      )
      .filter(':visible')
      .should('be.visible')
      .click({ force: true });

    cy.log('Duplicate clicked');

    return this;
  }
  verifyDuplicatedTemplate() {
    cy.log('Action: Verify duplicated Form Template');
    cy.get('@originalFormTemplateName').then((templateName) => {
        cy.get('tbody tr').filter(':visible').should(($rows) => {
            const found = [...$rows].some((row) => {
              const name =
                Cypress.$(row).find('td').eq(1).text().replace(/\s+/g, ' ').trim();
              return (
                name === templateName ||
                name.startsWith(`${templateName} (`)
              );
            });
            expect(
              found,
              `Duplicated template based on "${templateName}"`
            ).to.equal(true);
          });
      });
    cy.log('VERIFIED: Duplicated Form Template');
    return this;
  }
  // DELETE TEMPLATE
  deleteFirstTemplate() {
    cy.log('Action: Delete first Form Template');

    cy.get('tbody tr')
      .filter(':visible')
      .first()
      .then(($row) => {

        /*
         * Table structure:
         * td[0] = checkbox
         * td[1] = Template Name
         * td[2] = Created By
         * td[3] = Created
         * td[4] = Updated
         * td[5] = Use Template
         * td[6] = Actions
         */

        const templateName = $row
          .find('td')
          .eq(1)
          .text()
          .replace(/\s+/g, ' ')
          .trim();

        expect(
          templateName,
          'Template name before delete'
        ).to.not.be.empty;

        cy.wrap(templateName).as('deletedFormTemplateName');
      });

    // Open actions menu
    this.clickFirstTemplateActions();

    // Click Delete only inside the opened menu
    this.getOpenTemplateActionsMenu()
      .contains(
        '[role="menuitem"], button, a',
        /^Delete$/i
      )
      .filter(':visible')
      .should('be.visible')
      .click({ force: true });

    cy.log('Delete option clicked');

    return this;
  }
  verifyDeleteConfirmationPopup() {
    cy.log('Action: Verify Delete confirmation popup');
    cy.get('[role="dialog"]:visible').should('be.visible');
    cy.get('[role="dialog"]:visible').contains(/Delete.*Form Template|Delete Template/i).should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Cancel').should('be.visible');
    cy.get('[role="dialog"]:visible').contains('button', 'Delete').should('be.visible');
    cy.log('VERIFIED: Delete confirmation popup');
    return this;
  }
  confirmDeleteTemplate() {
    cy.log('Action: Confirm Form Template deletion');
    cy.get('[role="dialog"]:visible').contains('button', 'Delete').should('be.visible').click({ force: true });
    cy.log('Delete confirmed');
    return this;
  }
  verifyTemplateDeleted() {
    cy.log('Action: Verify Form Template deleted');
    cy.get('@deletedFormTemplateName').then((templateName) => {
        cy.get('tbody tr').filter(':visible').should(($rows) => {
            const exists = [...$rows].some((row) => {
              const name =
                Cypress.$(row).find('td').eq(1).text().replace(/\s+/g, ' ').trim();
              return name === templateName;
            });
            expect(exists,`Template "${templateName}" should be deleted`).to.equal(false);
          });
      });
    cy.log('VERIFIED: Form Template deleted');
    return this;
  }
  // PAGINATION
  clickNextPage() {
    cy.log('Action: Click Next page');
    this.nextPageButton.should('be.visible').and('not.be.disabled').click({ force: true });
    cy.wait(500);
    return this;
  }
  clickPreviousPage() {
    cy.log('Action: Click Previous page');
    this.previousPageButton.should('be.visible').and('not.be.disabled').click({ force: true });
    cy.wait(500);
    return this;
  }
  verifyPaginationIfRequired() {
    cy.log('Action: Verify pagination if more than one page');
    this.paginationContainer.then(($pagination) => {
        const buttons = $pagination.find('button');
        const pageNumbers =[...buttons].map((button) =>Number(button.innerText.trim())).filter((number) =>!Number.isNaN(number));
        if (pageNumbers.length > 1) {
          cy.log('Multiple pages detected');
          this.nextPageButton.should('not.be.disabled');
          this.clickNextPage();
          this.previousPageButton.should('not.be.disabled');
          this.clickPreviousPage();
          cy.log('VERIFIED: Next and Previous pagination');
        } else {
          cy.log('Only one page available');
        }
      });
    return this;
  }
  // BACK TO FORM TEMPLATES
  clickBackToTemplates() {
    cy.log('Action: Return to Form Templates');
    cy.go('back');
    cy.contains(/Form Templates?/i).filter(':visible').should('be.visible');
    cy.log('Returned to Form Templates');
    return this;
  }

  clickFormTemplates() {
    cy.log('Action: Click Form Templates');
    this.formTemplatesLink.should('be.visible').click();
    cy.log('Form Templates clicked successfully');
    return this;
  }
}
export default new FormTemplatePage();
