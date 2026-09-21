import BasePage from "./BasePage";

class HomePage extends BasePage {

  // ===== My Tasks widget =====
  get myTasksHeading() {
    return cy.contains('span, div', 'My Tasks');
  }

  get viewAllLink() {
    return cy.contains('a', 'View all');
  }

  get todoTab() {
    return cy.get('[data-test="todo"]');
  }

  get completedTab() {
    return cy.get('[data-test="completed"]');
  }

  get taskCards() {
    return cy.get('[data-test="user-task-card"]');
  }

  get startTaskButtons() {
    return cy.get('[data-test="button-start-task"]');
  }

  get taskDetailHeading() {
    return cy.get('h1');
    }

    get taskDetailBackButton() {
      return cy.get('[data-test="back-button"]');
    }

    get taskField() {
      return cy.contains('.text-primaryBlack-500', 'Task').siblings('.text-primaryBlack-700');
    }

    get descriptionField() {
      return cy.contains('.text-primaryBlack-500', 'Description').siblings('.text-primaryBlack-700');
    }

    get requesterField() {
      return cy.contains('.text-primaryBlack-500', 'Requester').siblings('.text-primaryBlack-700');
    }

    get requestedAtField() {
      return cy.contains('.text-primaryBlack-500', 'Requested At').siblings('.text-primaryBlack-700');
    }

    get taskCancelButton() {
       return cy.get('[data-test="button-cancel"]');
    }

    get taskContinueButton() {
       return cy.get('[data-test="button-continue"]');
    }

   getDocumentNameFromPath(pdfPath) {
     const fileNameWithExt = pdfPath.split('/').pop();       
     const fileName = fileNameWithExt.replace(/\.pdf$/i, ''); 
     cy.log(`Extracted document name from path: "${fileName}"`);
     return fileName;
   }

   // ===== Sign Document Page =====
    get signDocumentHeading() {
    return cy.contains('h1, h2', 'Sign Document');
    }

    get reviewDocumentText() {
    return cy.contains('Please review the document before signing');
    }

    get rejectButton() {
    return cy.contains('button', 'Reject');
    }

    get startSigningButton() {
    return cy.contains('button', 'Start Signing');
    }

    // ===== Signature field on document (after Start Signing) =====
    get signatureFieldCard() {
    return cy.get('[data-field-type="SIGNATURE"]');
    }

    get fillFieldButton() {
    return this.signatureFieldCard.find('button[type="submit"]');
    }

    // ===== Signature Modal =====
    get signatureModal() {
    return cy.get('[id^="headlessui-dialog-panel-"]').contains('Signature').parents('[id^="headlessui-dialog-panel-"]');
    }

    get signatureModalHeading() {
    return cy.contains('#headlessui-dialog-title-\\:r8h\\:, h3', 'Signature');
    }

    get drawTab() {
    return cy.contains('button', 'Draw');
    }

    get typeTab() {
    return cy.contains('button', 'Type');
    }

    get uploadTab() {
    return cy.contains('button', 'Upload');
    }

    get signaturePadCanvas() {
    return cy.get('[data-testid="signature-pad-draw"]');
    }

    get clearSignatureButton() {
    return cy.contains('button', 'Clear Signature');
    }

    get cancelSignButton() {
    return cy.get('[data-test="cancel-sign-document"]');
    }

    get completeSignButton() {
    return cy.get('[data-test="complete-sign"]');
    }

  // ===== Actions =====
  clickTodoTab() {
    cy.log('Action: Click To-Do tab');
    this.todoTab.click();
    return this;
  }

  clickCompletedTab() {
    cy.log('Action: Click Completed tab');
    this.completedTab.click();
    return this;
  }

  clickViewAll() {
    cy.log('Action: Click View all link');
    this.viewAllLink.click();
    return this;
  }

  clickStartTaskByTitle(taskTitle) {
    cy.log(`Action: Click Start Task for "${taskTitle}"`);
    cy.get('[data-test="user-task-card"]').contains(taskTitle).parents('[data-test="user-task-card"]')
    .find('[data-test="button-start-task"]').click();
    return this;
  }

  // ===== Verifications =====
  verifyMyTasksSectionDisplayed() {
    cy.log('Verify: My Tasks section is displayed');
    this.myTasksHeading.should('be.visible');
    this.todoTab.should('be.visible');
    this.completedTab.should('be.visible');
  }

  verifyTodoTabActive() {
    cy.log('Verify: To-Do tab is active');
    this.todoTab.should('have.class', 'bg-primary-500').and('have.class', 'text-white');
  }

  verifyCompletedTabActive() {
    cy.log('Verify: Completed tab is active');
    this.completedTab.should('have.class', 'bg-primary-500').and('have.class', 'text-white');
  }

  verifyTaskCardsDisplayed() {
    cy.log('Verify: Task cards are displayed');
    this.taskCards.should('have.length.greaterThan', 0);
  }

  verifyTaskCardHasStartTaskButton(taskTitle) {
    cy.log(`Verify: "${taskTitle}" card has a visible "Start Task" button (not completed)`);
    cy.contains('[data-test="user-task-card"]', taskTitle)
      .find('[data-test="button-start-task"]').should('be.visible').and('contain.text', 'Start Task');
  }

  verifyAllTodoTasksNotCompleted() {
    cy.log('Action: Click To-Do tab and verify no task shows Completed status');
    this.clickTodoTab();
    this.verifyTaskCardsDisplayed();

    this.taskCards.each(($card) => {
      cy.wrap($card).within(() => {
      cy.contains('Completed').should('not.exist');
      cy.get('[data-test="button-start-task"]').should('be.visible');
      });
    });
    cy.log('VERIFIED: All To-Do tasks are not completed (Start Task button present on every card)');
  }

  verifyAllCompletedTasksAreCompleted() {
    cy.log('Action: Click Completed tab and verify every task shows Completed status');
    this.clickCompletedTab();
    this.verifyTaskCardsDisplayed();
    this.taskCards.each(($card) => {
    cy.wrap($card).within(() => {
    cy.contains('COMPLETED').should('be.visible');
      });
    });
    cy.log('VERIFIED: All tasks in Completed tab are marked Completed');
  }

  verifyTaskDetails(taskTitle, requestedBy) {
    cy.log(`Verify: Task "${taskTitle}" requested by "${requestedBy}"`);
    cy.contains('[data-test="user-task-card"]', taskTitle).within(() => {
    cy.contains(taskTitle).should('be.visible');
    cy.contains(`Requested by ${requestedBy}`).should('be.visible');
    });
  }

  verifyCompleteHomeTasksSection() {
    cy.log('Action: Verify complete Home page My Tasks section - default To-Do state and Completed tab');
    this.verifyMyTasksSectionDisplayed();

    cy.log('Verify: To-Do tab is selected by default on page load');
    this.verifyAllTodoTasksNotCompleted();

    cy.log('Action: Switch to Completed tab and verify');
    this.verifyAllCompletedTasksAreCompleted();
  }

  verifyDocumentRequestTaskDisplayed(documentNameOrPath) {
    const documentName = documentNameOrPath.includes('/')
    ? documentNameOrPath.split('/').pop().replace(/\.pdf$/i, '').trim()
    : documentNameOrPath;

  const expectedTaskTitle = `New Document Request: ${documentName}`;
  const escapedTitle = expectedTaskTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactMatchRegex = new RegExp(`^${escapedTitle}$`);

  cy.log(`Verify: Task "${expectedTaskTitle}" is displayed in To-Do list (exact match)`);

  cy.get('body').then(($body) => {
    const taskExists = $body.find('[data-test="user-task-card"]')
      .toArray()
      .some((card) => card.textContent.trim() === expectedTaskTitle
        || exactMatchRegex.test(card.querySelector('span, h1')?.textContent.trim() || ''));

    if (!taskExists) {
      cy.log('Exact task not found in current view - clicking "View all"');
      cy.contains('a', 'View all').click();
      cy.wait(1000);
    } else {
      cy.log('Task already visible - no navigation needed');
    }
  });

  cy.get('[data-test="user-task-card"]')
    .contains(exactMatchRegex, { timeout: 15000 })
    .should('be.visible');
    }

    clickStartTaskForDocument(documentName) {
    const expectedTaskTitle = `New Document Request: ${documentName}`;
    cy.log(`Action: Click Start Task for "${expectedTaskTitle}"`);
    cy.get('[data-test="user-task-card"]').contains(expectedTaskTitle)
    .parents('[data-test="user-task-card"]')
    .find('[data-test="button-start-task"]').should('be.visible').click();
    cy.log(`Action: Start Task clicked for "${expectedTaskTitle}"`);
    }

    verifyAndStartDocumentTask(pdfPath) {
      const documentName = pdfPath.split('/').pop().replace(/\.pdf$/i, '').trim();
  const expectedTaskTitle = `New Document Request: ${documentName}`;
  const escapedTitle = expectedTaskTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exactMatchRegex = new RegExp(`^${escapedTitle}$`);

  cy.log(`Extracted document name: "${documentName}"`);
  cy.log(`Verify: Task "${expectedTaskTitle}" is displayed in To-Do list (exact match)`);

  cy.get('body').then(($body) => {
    const taskExists = $body.find('[data-test="user-task-card"]')
      .toArray()
      .some((card) => card.textContent.trim() === expectedTaskTitle
        || exactMatchRegex.test(card.querySelector('span, h1')?.textContent.trim() || ''));

    if (!taskExists) {
      cy.log('Exact task not found in current view - clicking "View all"');
      cy.contains('a', 'View all').click();
      cy.wait(1000);
    } else {
      cy.log('Task already visible - no navigation needed');
    }
  });

  cy.get('[data-test="user-task-card"]')
    .contains(exactMatchRegex, { timeout: 15000 })
    .should('be.visible');

  cy.log(`VERIFIED: "${expectedTaskTitle}" task found`);

  cy.get('[data-test="user-task-card"]')
    .contains(exactMatchRegex)
    .parents('[data-test="user-task-card"]')
    .find('[data-test="button-start-task"]')
    .should('be.visible')
    .click();

  cy.log(`Action: Start Task clicked for "${expectedTaskTitle}"`);
  return this;
    }

    verifyTaskDetailPageDisplayed(pdfPathOrTitle) {
        const documentName = pdfPathOrTitle.includes('/')
    ? pdfPathOrTitle.split('/').pop().replace(/\.pdf$/i, '').trim()
    : pdfPathOrTitle;

  const expectedTaskTitle = `New Document Request: ${documentName}`;

  cy.log(`Verify: Task detail page displayed for "${expectedTaskTitle}"`);
  this.taskDetailHeading.should('be.visible').and('have.text', expectedTaskTitle);
  cy.log(`VERIFIED: Task detail heading matches "${expectedTaskTitle}"`);
    }

   verifyTaskDetailFieldsNotEmpty() {
        cy.log('Verify: Task detail fields are all populated (not empty)');
        this.taskField.invoke('text').then((text) => {
        cy.log(`Task field value: "${text.trim()}"`);
        expect(text.trim(), 'Task field should not be empty').to.not.be.empty;
        });
        this.descriptionField.invoke('text').then((text) => {
        cy.log(`Description field value: "${text.trim()}"`);
        expect(text.trim(), 'Description field should not be empty').to.not.be.empty;
        });
        this.requesterField.invoke('text').then((text) => {
        cy.log(`Requester field value: "${text.trim()}"`);
        expect(text.trim(), 'Requester field should not be empty').to.not.be.empty;
        });
        this.requestedAtField.invoke('text').then((text) => {
        cy.log(`Requested At field value: "${text.trim()}"`);
        expect(text.trim(), 'Requested At field should not be empty').to.not.be.empty;
        });
        cy.log('VERIFIED: All task detail fields are populated');
        }

    verifyCancelAndContinueButtonsDisplayed() {
        cy.log('Verify: Cancel and Continue buttons are displayed');
        this.taskCancelButton.should('be.visible').and('contain.text', 'Cancel');
        this.taskContinueButton.should('be.visible').and('contain.text', 'Continue');
    }

    // ===== Actions =====
    clickTaskCancel() {
        cy.log('Action: Click Cancel button');
        this.taskCancelButton.click();
        return this;
    }

    clickTaskContinue() {
        cy.log('Action: Click Continue button');
        this.taskContinueButton.should('not.be.disabled').click();
        cy.log('Action: Continue clicked successfully - proceeding to next step');
        return this;
    }

    // ===== Actions =====
    clickRejectDocument() {
        cy.log('Action: Click Reject button');
        this.rejectButton.click();
        return this;
    }

    clickStartSigning() {
        cy.log('Action: Click Start Signing button');
        this.startSigningButton.should('be.visible').click();
        cy.log('Action: Start Signing clicked - proceeding to field placement');
        return this;
    }

    clickFillField() {
        cy.log('Action: Click Fill Field (signature) button on document');
        this.signatureFieldCard.should('be.visible');
        this.fillFieldButton.click({ force: true });
        cy.log('Action: Fill Field clicked - Signature popup should open');
        return this;
    }

    drawSignatureOnCanvas() {
       cy.log('Action: Draw signature on canvas');

  this.signaturePadCanvas.then(($canvas) => {
    const canvas = $canvas[0];
    const rect = canvas.getBoundingClientRect();

    const startX = rect.left + rect.width * 0.2;
    const startY = rect.top + rect.height * 0.5;
    const endX = rect.left + rect.width * 0.8;
    const endY = rect.top + rect.height * 0.5;

    cy.wrap($canvas)
      .trigger('mousedown', { clientX: startX, clientY: startY, force: true })
      .trigger('mousemove', { clientX: (startX + endX) / 2, clientY: startY - 20, force: true })
      .trigger('mousemove', { clientX: endX, clientY: endY, force: true })
      .trigger('mouseup', { clientX: endX, clientY: endY, force: true });
  });

  cy.log('Verify: Continue button is enabled - confirms signature was actually drawn');
  this.verifyCompleteSignButtonEnabled();

  cy.log('VERIFIED: Signature drawn on canvas');
  return this;
    }

    clickClearSignature() {
        cy.log('Action: Click Clear Signature');
        this.clearSignatureButton.click();
        return this;
    }

    clickCancelSign() {
        cy.log('Action: Click Cancel on Signature modal');
        this.cancelSignButton.click();
        return this;
    }

    clickCompleteSign() {
        cy.log('Action: Click Continue (complete-sign) button');
        this.completeSignButton.should('not.be.disabled').click();
        cy.log('Action: Signature completed successfully');
        return this;
    }

    // ===== Verifications =====
    verifySignDocumentPageDisplayed() {
        cy.log('Verify: Sign Document page displayed with Reject and Start Signing buttons');
        this.reviewDocumentText.should('be.visible');
        this.rejectButton.should('be.visible').and('contain.text', 'Reject');
        this.startSigningButton.should('be.visible').and('contain.text', 'Start Signing');
    }

    verifySignatureFieldDisplayed() {
        cy.log('Verify: Signature field card is displayed on document');
        this.signatureFieldCard.should('be.visible');
        this.signatureFieldCard.should('contain.text', 'Signature');
    }

    verifySignatureModalDisplayed() {
        cy.log('Verify: Signature modal is displayed with Draw/Type/Upload tabs');
        cy.contains('h3', 'Signature').should('be.visible');
        this.drawTab.should('be.visible');
        this.typeTab.should('be.visible');
        this.uploadTab.should('be.visible');
        this.signaturePadCanvas.should('be.visible');
    }

    verifyCompleteSignButtonDisabled() {
        cy.log('Verify: Continue button is disabled before drawing signature');
        this.completeSignButton.should('be.disabled');
    }

    verifyCompleteSignButtonEnabled() {
        cy.log('Verify: Continue button is enabled after drawing signature');
        this.completeSignButton.should('not.be.disabled');
    }

    // ===== Full flow =====
    completeDocumentSigningFlow() {
        cy.log('Action: Full sign document flow - Start Signing to Complete');
        cy.log('Verify: Sign Document page displayed');
        this.verifySignDocumentPageDisplayed();
        cy.log('Action: Click Start Signing');
        this.clickStartSigning();
        cy.log('Verify: Signature field displayed on document');
        this.verifySignatureFieldDisplayed();
        cy.log('Action: Click Fill Field to open Signature popup');
        this.clickFillField();
        cy.log('Verify: Signature modal displayed');
        this.verifySignatureModalDisplayed();
        cy.log('Verify: Continue button is disabled before drawing');
        this.verifyCompleteSignButtonDisabled();
        cy.log('Action: Draw signature');
        this.drawSignatureOnCanvas();
        cy.pause();
        this.clickCompleteSign();
        cy.log('VERIFIED: Document signing flow completed successfully');
    }

}

export default new HomePage();