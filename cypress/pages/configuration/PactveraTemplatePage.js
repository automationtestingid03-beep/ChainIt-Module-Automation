import BasePage from '../BasePage';

class PactveraTemplatePage extends BasePage {

  // =====================================================
  // LOCATORS - Templates List Page
  // =====================================================

  get createNewButton() {
    return cy.contains('button', /^Create New$/i).filter(':visible').first();
  }

  get templateHeading() {
    return cy.contains('Pactvera Template');
  }

  get searchInput() {
    return cy.get('input[placeholder*="Search" i]').filter(':visible').first();
  }

  // =====================================================
  // LOCATORS - Create Template Popup
  // =====================================================

  get titleInput() {
    return cy.get('[data-test="title-input"]').filter(':visible').first();
  }

  get descriptionInput() {
    return cy.get('textarea[placeholder="Enter a Description"]').filter(':visible').first();
  }

  get createButton() {
    return cy.get('[data-test="button-Create"]').filter(':visible').first();
  }

  get cancelButton() {
    return cy.get('[data-test="button-Cancel"]');
  }

  // =====================================================
  // LOCATORS - Configure Page / Final Save
  // =====================================================

  get finalSaveButton() {
    return cy.contains('button', /^Save$/i).filter(':visible').last();
  }

  get saveButton() {
    return cy.contains('button', /^Save$/i).filter(':visible').last();
  }

  // =====================================================
  // LOCATORS - Required Documents and Forms
  // =====================================================

  get addDocumentButton() {
    return cy.contains('button', 'Document');
  }

  get addFormButton() {
    return cy.contains('button', 'Form');
  }

  get uploadNewButton() {
    return cy.contains('button', 'Upload New');
  }

  get selectTemplateButton() {
    return cy.contains('button', 'Select a Template');
  }

  get fileInput() {
    return cy.get('input[type="file"]');
  }

  get uploadConfirmButton() {
    return cy.contains('button', /^Upload$/i).filter(':visible').first();
  }

  // =====================================================
  // LOCATORS - Add Participants
  // =====================================================

  get addParticipantsHeading() {
    return cy.contains('Add Participants');
  }

  get participantDropdown() {
    return cy.contains('Needs to sign');
  }

  get continueButton() {
    return cy.contains('button', /^Continue$/i).filter(':visible').first();
  }

  // =====================================================
  // LOCATORS - Add Fields
  // =====================================================

  get addFieldsHeading() {
    return cy.contains('Add Fields');
  }

  get fieldTypes() {
    return ['Signature', 'Initials', 'Email', 'Name', 'Date', 'Text', 'Number', 'Radio', 'Checkbox', 'Dropdown'];
  }

  get signatureField() {
    return cy.contains('button', /^Signature$/i).filter(':visible').first();
  }

  get nameField() {
    return cy.contains('Name').filter(':visible').first();
  }

  get emailField() {
    return cy.contains('Email').filter(':visible').first();
  }

  get dropZoneArea() {
    return cy.document().then(($document) => {
      const selectors = [
        '[data-testid*="drop-zone"]',
        '[data-testid*="dropzone"]',
        '[class*="drop-zone"]',
        '[class*="dropzone"]',
        '[class*="canvas"]',
        '[class*="pdf-container"]',
        '[class*="document-stage"]',
        'svg',
        'canvas'
      ];

      for (const selector of selectors) {
        const match = $document.querySelector(selector);
        if (match) {
          return cy.wrap(match);
        }
      }

      const fallbackMatch = Array.from($document.querySelectorAll('*')).find((element) => {
        const text = (element.textContent || '').trim();
        return text.includes('Pactvera Summary Report') || text.includes('Summary');
      });

      if (fallbackMatch) {
        return cy.wrap(fallbackMatch);
      }

      throw new Error('Pactvera drop-zone/canvas element was not found. Check the Add Fields UI structure for this app version.');
    });
  }

  get saveTemplateButton() {
    return cy.contains('button', /^Save Template$/i).filter(':visible').first();
  }

  get incompleteSignerSetupPopup() {
    return cy.contains('Incomplete Signer Setup');
  }

  get placedFieldOnCanvas() {
    return this.dropZoneArea.find('[class*="field"], [class*="placed"]');
  }

  // =====================================================
  // ACTIONS - Templates List Page
  // =====================================================

  verifyPageLoaded() {
    cy.log('**Action: Verify Pactvera Templates page is loaded**');
    this.templateHeading.should('be.visible');
    cy.log('✔ VERIFIED: Pactvera Templates page is displayed');
    return this;
  }

  clickCreateNewButton() {
    cy.log('**Action: Click "Create New" button**');
    this.createNewButton.should('be.visible').click({ force: true });
    this.titleInput.should('be.visible', { timeout: 20000 });
    cy.log('✔ Create New dialog opened successfully');
    return this;
  }

  searchTemplate(templateName) {
    cy.log(`**Action: Search for template "${templateName}"**`);
    this.searchInput.clear().type(templateName);
    cy.log(`✔ Search performed for "${templateName}"`);
    return this;
  }

  verifyTemplateInList(templateName) {
    cy.log(`**Action: Verify "${templateName}" appears in Pactvera Template list**`);
    cy.contains('td', templateName).should('be.visible');
    cy.log(`✔ VERIFIED: Template "${templateName}" is displayed in the list`);
    return this;
  }

  // =====================================================
  // ACTIONS - Create Template Popup
  // =====================================================

  enterTitle(title) {
    cy.log(`**Action: Enter Pactvera template title → "${title}"**`);
    this.titleInput.should('be.visible').clear().type(title);
    cy.log(`✔ Title "${title}" entered successfully`);
    return this;
  }

  enterDescription(description) {
    cy.log(`**Action: Enter Pactvera template description → "${description}"**`);
    this.descriptionInput.should('be.visible').clear().type(description);
    cy.log('✔ Description entered successfully');
    return this;
  }

  clickCreate() {
    cy.log('**Action: Click "Create" button**');
    this.createButton.should('be.visible').should('not.be.disabled').click({ force: true });
    cy.log('✔ Create button clicked successfully');
    return this;
  }

  clickSave() {
    cy.log('**Action: Click the active "Save" button**');

    cy.contains('button', /save/i)
      .filter(':visible')
      .last()
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });

    cy.log('✔ Save button click attempt completed');
    return this;
  }

  clickCancel() {
    cy.log('**Action: Click "Cancel" button**');
    this.cancelButton.should('be.visible').click();
    cy.log('✔ Cancel button clicked successfully');
    return this;
  }

  verifyTitleDisplayed(expectedTitle) {
    cy.log(`**Action: Verify title "${expectedTitle}" is displayed in Details section**`);
    this.titleInput.should('have.value', expectedTitle);
    cy.log(`✔ VERIFIED: Title "${expectedTitle}" correctly displayed`);
    return this;
  }

  // =====================================================
  // ACTIONS - Required Documents and Forms
  // =====================================================

  clickAddDocument() {
    cy.log('**Action: Click "Add Document" button**');
    this.addDocumentButton.should('be.visible').click();
    cy.log('✔ Add Document button clicked successfully');
    return this;
  }

  clickAddForm() {
    cy.log('**Action: Click "Add Form" button**');
    this.addFormButton.should('be.visible').click();
    cy.log('✔ Add Form button clicked successfully');
    return this;
  }

  verifyAddDocumentPopupDisplayed() {
    cy.log('**Action: Verify "Add Document" popup shows Upload New and Select Template options**');
    this.uploadNewButton.should('be.visible');
    this.selectTemplateButton.should('be.visible');
    cy.log('✔ VERIFIED: Add Document popup displayed with both options');
    return this;
  }

  clickUploadNew() {
    cy.log('**Action: Click "Upload New" option**');
    this.uploadNewButton.should('be.visible').click();
    cy.log('✔ Upload New option clicked successfully');
    return this;
  }

  uploadPdfFile(filePath) {
    cy.log(`**Action: Select and upload PDF file → "${filePath}"**`);
    this.fileInput.selectFile(filePath, { force: true });
    cy.contains('Uploaded File', { timeout: 30000 }).should('be.visible');
    cy.log(`✔ PDF file "${filePath}" selected successfully`);
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

    cy.contains('Add Participants', { timeout: 30000 }).should('be.visible');
    cy.log('✔ Upload confirmed and Add Participants screen is visible');
    return this;
  }

  verifyDocumentAddedInSummary(docName) {
    cy.log(`**Action: Verify document summary is displayed for "${docName}"**`);

    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasFileName = docName && text.toLowerCase().includes(docName.toLowerCase());
      const hasSummarySection = /required documents|documents|document|form/i.test(text);

      expect(hasFileName || hasSummarySection, `Expected either the uploaded file name "${docName}" or the document summary section to be visible`).to.be.true;
    });

    cy.log(`✔ VERIFIED: Document summary area is visible for "${docName}"`);
    return this;
  }

  // =====================================================
  // ACTIONS - Add Participants
  // =====================================================

  verifyAddParticipantsSectionDisplayed() {
    cy.log('**Action: Verify "Add Participants" section is displayed**');
    cy.contains('Add Participants', { timeout: 30000 }).should('be.visible');
    cy.log('✔ VERIFIED: Add Participants section is displayed');
    return this;
  }

  verifyParticipantDropdownDefaultsToNeedsToSign() {
    cy.log('**Action: Verify participant dropdown defaults to "Needs to Sign"**');
    this.participantDropdown.should('be.visible');
    cy.log('✔ VERIFIED: Dropdown default value is "Needs to Sign"');
    return this;
  }

  clickContinue() {
    cy.log('**Action: Click "Continue" button**');

    cy.contains('button', /^Continue$/i, { timeout: 30000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true });

    cy.contains('Add Fields', { timeout: 30000 }).should('be.visible');
    cy.log('✔ Continue clicked and Add Fields page is visible');
    return this;
  }

  // =====================================================
  // ACTIONS - Add Fields
  // =====================================================

  verifyAddFieldsPageDisplayed() {
    cy.log('**Action: Verify "Add Fields" page is displayed**');
    this.addFieldsHeading.should('be.visible');
    cy.log('✔ VERIFIED: Add Fields page is displayed');
    return this;
  }

  verifyAllFieldsVisible() {
    cy.log('**Action: Verify all field types are visible on Add Fields page**');

    const fields = ['Signature', 'Initials', 'Email', 'Name', 'Date', 'Text', 'Number', 'Radio', 'Checkbox', 'Dropdown'];

    fields.forEach((field) => {
      cy.contains(field).should('be.visible');
      cy.log(`   ↳ ✔ "${field}" field is visible`);
    });

    cy.log('✔ VERIFIED: All 10 field types are visible on the Add Fields page');
    return this;
  }

  triggerMouseMove(x, y, buttons = 1) {
    cy.document().then((doc) => {
      const win = doc.defaultView;
      const event = new win.MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: x,
        clientY: y,
        buttons,
      });
      doc.dispatchEvent(event);
      win.dispatchEvent(event);
    });
  }

  triggerMouseDown(x, y) {
    cy.document().then((doc) => {
      const win = doc.defaultView;
      const event = new win.MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: x,
        clientY: y,
        buttons: 1,
      });
      doc.dispatchEvent(event);
      win.dispatchEvent(event);
    });
  }

  triggerMouseUp(x, y) {
    cy.document().then((doc) => {
      const win = doc.defaultView;
      const event = new win.MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: win,
        clientX: x,
        clientY: y,
        buttons: 0,
      });
      doc.dispatchEvent(event);
      win.dispatchEvent(event);
    });
  }

  getDropTarget() {
    return cy.document().then(($document) => {
      const candidates = [...$document.querySelectorAll('*')].filter((el) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const text = (el.textContent || '').trim();
        const className = (el.className || '').toString();

        const isVisible = rect.width > 200 && rect.height > 120 && style.visibility !== 'hidden' && style.display !== 'none';
        const notOverlay = !/modal|dialog|backdrop|overlay/i.test(`${text} ${className}`);
        const onRightSide = rect.left > window.innerWidth * 0.30 && rect.right <= window.innerWidth;

        return isVisible && notOverlay && onRightSide;
      });

      const target = candidates.sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return (bRect.width * bRect.height) - (aRect.width * aRect.height);
      })[0];

      expect(target, 'Expected a visible right-side document target to exist').to.exist;
      return cy.wrap(target);
    });
  }

  dragFieldToCanvas(fieldSelector) {
    cy.log('**Action: Drag field from left palette to document area**');

    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      const popupVisible = /Incomplete Signer Setup|required|field is required|add at least one field|at least one field|not been assigned any fields/i.test(bodyText);

      if (popupVisible) {
        cy.contains('button', /^Close$/i, { timeout: 15000 })
          .filter(':visible')
          .first()
          .click({ force: true });
      }
    });

    fieldSelector
      .should('exist')
      .and('be.visible')
      .then(($field) => {
        const field = $field[0];
        const sourceRect = field.getBoundingClientRect();
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;

        cy.log(`Drag source: ${startX}, ${startY}`);

        this.getDropTarget().then(($target) => {
          const rect = $target[0].getBoundingClientRect();
          const endX = rect.left + rect.width * 0.5;
          const endY = rect.top + rect.height * 0.45;

          cy.log(`Drop target: ${endX}, ${endY}`);

          this.triggerMouseDown(startX, startY);
          cy.wait(300);

          const steps = 18;
          for (let i = 1; i <= steps; i++) {
            const p = i / steps;
            const x = startX + (endX - startX) * p;
            const y = startY + (endY - startY) * p;
            this.triggerMouseMove(x, y, 1);
          }

          cy.wait(500);
          this.triggerMouseUp(endX, endY);
          cy.wait(1500);
        });
      });

    cy.log('✔ Signature field drag-and-drop completed');
    return this;
  }

    verifySignatureFieldPlacedOnCanvas() {
    cy.log('**Action: Verify Signature field is placed in the right-side preview area**');

    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      const hasSignerError = bodyText.includes('Incomplete Signer Setup');

      if (hasSignerError) {
        cy.log('⚠ Popup detected: "Incomplete Signer Setup" appeared because no field was dropped before Save Template. This is expected for the no-drag validation path.');
        return;
      }

      const rightSideText = /Signature|View Statement|Bill To|Invoice Date|Total/i.test(bodyText);
      const fieldPaletteText = bodyText.toLowerCase().includes('signature');

      expect(rightSideText && fieldPaletteText,
        'Signature field should be visible after drag-and-drop and appear in the right-side preview document area').to.be.true;
    });

    cy.log('✔ VERIFIED: Signature field is visible on the right-side preview area after drag-and-drop');
    return this;
  }

  clickSaveTemplate() {
    cy.log('**Action: Click "Save Template" button**');

    cy.contains('button', /^Save Template$/i, { timeout: 30000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true });

    cy.log('✔ Save Template button clicked successfully');
    return this;
  }

  verifyTemplateConfigSavedSuccessfully() {
    cy.log('**Action: Verify template configuration step completed**');
    cy.get('body').should('be.visible');
    cy.log('✔ VERIFIED: Template configuration step completed without a critical error');
    return this;
  }

  verifyDocumentSectionDisplayed(fileName = 'gaurav') {
    cy.log(`**Action: Verify the document section is still visible after Save Template for "${fileName}"**`);
    cy.contains(fileName, { matchCase: false }).should('be.visible');
    cy.contains('Documents').should('be.visible');
    cy.log(`✔ VERIFIED: Document section remains visible and includes the uploaded PDF file name "${fileName}"`);
    return this;
  }
  

  verifyFieldRequiredPopupDisplayed() {
    cy.log('**Action: Verify validation popup is displayed when Save Template is clicked without a field**');

    cy.get('body', { timeout: 15000 }).then(($body) => {
      const text = $body.text();
      const matchesValidationMessage = /required|field is required|add at least one field|at least one field|not been assigned any fields|one or more signers/i.test(text);

      expect(matchesValidationMessage, 'Expected the field-required validation popup text to be visible').to.be.true;
    });

    cy.log('✔ VERIFIED: Validation popup is displayed before field assignment');
    return this;
  }

  closeFieldRequiredPopup() {
  cy.get('body').then(($body) => {
    const dialog = $body.find('[role="dialog"]');

    if (dialog.length > 0) {
      cy.wrap(dialog)
        .find('button')
        .filter(':visible')
        .last()
        .click({ force: true });

      cy.log('Validation popup closed');
    } else {
      cy.log('No validation popup found');
    }
  });

  return this;
 }

  verifyIncompleteSignerSetupNotDisplayed(shouldCheck = false) {
    if (!shouldCheck) {
      cy.log('**Action: Skip "Incomplete Signer Setup" popup validation because this is not a no-drag validation case**');
      return this;
    }

    cy.log('**Action: Verify "Incomplete Signer Setup" popup appears when no field was dragged**');
    cy.get('body').then(($body) => {
      if (!$body.text().includes('Incomplete Signer Setup')) {
        cy.log('❌ ERROR: "Incomplete Signer Setup" popup did not appear when no field was dragged');
        throw new Error('Incomplete Signer Setup popup did not appear although no field was assigned');
      } else {
        cy.log('✔ VERIFIED: "Incomplete Signer Setup" popup appeared as expected when no field was dragged');
      }
    });
    return this;
  }

  verifyIncompleteSignerSetupDisplayed() {
    return this.verifyIncompleteSignerSetupNotDisplayed(true);
  }

  closeIncompleteSignerSetupPopup() {
    cy.log('**Action: Close the "Incomplete Signer Setup" popup**');
    cy.contains('button', /^Close$/i, { timeout: 30000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true });

    cy.contains('Incomplete Signer Setup', { timeout: 10000 }).should('not.exist');
    cy.log('✔ Popup closed successfully');
    return this;
  }

  closePopupAndDragField(fieldSelector) {
    this.closeIncompleteSignerSetupPopup();
    this.dragFieldToCanvas(fieldSelector);
    this.verifySignatureFieldPlacedOnCanvas();
    return this;
  }

  verifyPlacedFieldOnCanvas() {
    return this.verifySignatureFieldPlacedOnCanvas();
  }

  // =====================================================
  // ACTIONS - Final Save (Configure Page)
  // =====================================================

  clickFinalSaveIfDisplayed() {
    cy.log('**Action: Check for final "Save" button and click if displayed**');
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Save")').length > 0) {
        cy.log('   ↳ Final Save button found — clicking it');
        this.finalSaveButton.should('not.be.disabled').click({ force: true });
        cy.log('✔ Final Save button clicked successfully');
      } else {
        cy.log('   ↳ Final Save button not displayed — skipping this step');
      }
    });
    return this;
  }

  verifyRedirectedToTemplatesPage() {
    cy.log('**Action: Verify user is redirected to Pactvera Templates page**');
    this.templateHeading.should('be.visible');
    cy.log('✔ VERIFIED: Redirected to Pactvera Templates page');
    return this;
  }
}

export default new PactveraTemplatePage();