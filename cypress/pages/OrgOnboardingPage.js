import BasePage from './BasePage';

class OrgOnboardingPage extends BasePage {

  // Locators

  get onboardingHeading() {
    return cy.contains(/Onboarding|Checklist/i);
  }

  get expandButton() {
    return cy.contains(/Expand|View All/i);
  }

  get inviteVerifyOfficersTask() {
    return cy.contains('Invite and Verify Officers');
  }

  get startTaskButton() {
    return cy.contains('button', /Start Task/i);
  }

  get continueButton() {
    return cy.contains('button', /Continue/i);
  }

  get addOfficerButton() {
    return cy.contains('button', /Add Officer/i);
  }

  get identifyOfficersHeading() {
    return cy.contains(
      'Identify all Officers of the Organization listed in the Operational Documents'
    );
  }

  get officerNameInput() {
    return cy.get(
      'input[name="name"], input[placeholder*="name" i], input[data-test*="name"]'
    );
  }

  get officerEmailInput() {
    return cy.get(
      'input[name="email"], input[type="email"], input[placeholder*="email" i], input[data-test*="email"]'
    );
  }

  get officerRoleDropdown() {
    return cy.get(
      'input[role="combobox"], select[name="role"], [data-test*="role"]'
    );
  }

  get attestationHeading() {
    return cy.contains('Attestation of Current Officers');
  }

  get signSection() {
    return cy.contains('div', 'Click to sign');
  }

  get signatureTypeTab() {
    return cy.contains(/Type/i);
  }

  get signatureNameInput() {
    return cy.get(
      'input[data-testid="signature-pad-type-input"], input[placeholder="Type your signature"]'
    );
  }

  get signatureContinueButton() {
    return cy.get('button[data-test="complete-sign"]');
  }

  // Onboarding Page

  verifyPageLoaded() {
    cy.log('Verifying Organization Onboarding page');

    this.onboardingHeading
      .should('be.visible', { timeout: 30000 });

    cy.log('Organization Onboarding page loaded successfully');

    return this;
  }

  clickExpandButton() {
    cy.log('Checking Expand or View All button');

    this.expandButton.then(($button) => {
      if ($button.length > 0 && $button.is(':visible')) {
        cy.wrap($button).click();
        cy.log('Expand or View All button clicked successfully');
      } else {
        cy.log('Expand or View All button is not available; continuing');
      }
    });

    return this;
  }

  verifyTaskVisible(taskName) {
    cy.log(`Verifying task is visible: "${taskName}"`);

    cy.contains(taskName, { timeout: 30000 })
      .should('be.visible');

    cy.log(`Task "${taskName}" is visible`);

    return this;
  }

  clickStartTaskFor(taskName) {
    cy.log(`Opening task: "${taskName}"`);

    cy.contains(taskName, { timeout: 30000 })
      .first()
      .parents(
        '[data-test="task-row"], .task-item, [role="listitem"], div'
      )
      .first()
      .within(() => {
        cy.contains('button', /Start Task/i)
          .first()
          .should('be.visible')
          .click();
      });

    cy.log(`Start Task clicked for "${taskName}"`);

    return this;
  }

  // Identify Officers

  clickContinueButton() {
    cy.log('Clicking Continue button');

    this.continueButton
      .should('be.visible', { timeout: 15000 })
      .click();

    cy.log('Continue button clicked successfully');

    return this;
  }

  verifyIdentifyOfficersPage() {
    cy.log('Verifying Identify Officers page');

    this.identifyOfficersHeading
      .should('be.visible', { timeout: 30000 });

    cy.log('Identify Officers page verified successfully');

    return this;
  }

  clickAddOfficerButton() {
    cy.log('Clicking Add Officer button');

    this.addOfficerButton
      .should('be.visible', { timeout: 15000 })
      .click();

    cy.log('Add Officer button clicked successfully');

    return this;
  }

  enterOfficerName(name) {
    cy.log(`Entering officer name: "${name}"`);

    this.officerNameInput
      .should('be.visible', { timeout: 15000 })
      .clear()
      .type(name);

    cy.log(`Officer name entered successfully: "${name}"`);

    return this;
  }

  enterOfficerEmail(email) {
    cy.log(`Entering officer email: "${email}"`);

    this.officerEmailInput
      .should('be.visible', { timeout: 15000 })
      .clear()
      .type(email);

    cy.log(`Officer email entered successfully: "${email}"`);

    return this;
  }

  selectOfficerRole(role) {
    cy.log(`Selecting officer role: "${role}"`);

    cy.get('body').then(($body) => {
      const officerForm = $body.find(
        '[data-test*="officer"], [class*="officer"], [class*="modal"], [role="dialog"], form'
      ).first();

      if (officerForm.length > 0) {
        const combobox = officerForm
          .find(
            'input[role="combobox"], select[name="role"], [data-test*="role"]'
          )
          .first();

        cy.wrap(combobox)
          .should('be.visible')
          .click();
      } else {
        this.officerRoleDropdown
          .first()
          .should('be.visible')
          .click();
      }
    });

    cy.contains(
      'li, [role="option"], [data-test*="option"], div[role="listitem"]',
      role,
      { timeout: 10000 }
    )
      .first()
      .click({ force: true });

    cy.log(`Officer role "${role}" selected successfully`);

    return this;
  }

  clickAddOfficerSubmitButton() {
    cy.log('Submitting officer details');

    cy.get('body').then(($body) => {
      const modal = $body.find(
        '[data-test*="officer"], [class*="officer"], [class*="modal"], [role="dialog"], form'
      ).first();

      const context = modal.length > 0 ? modal : $body;

      const buttons = context.find('button');

      let submitButton = null;

      buttons.each((index, element) => {
        const buttonText = (element.textContent || '')
          .trim()
          .toLowerCase();

        if (
          buttonText.includes('add') ||
          buttonText.includes('submit') ||
          buttonText.includes('save') ||
          buttonText.includes('create') ||
          buttonText.includes('confirm')
        ) {
          submitButton = element;
          return false;
        }
      });

      if (submitButton) {
        const buttonText = (submitButton.textContent || '').trim();

        cy.wrap(submitButton)
          .should('be.visible')
          .click({ force: true });

        cy.log(`Officer submit button clicked: "${buttonText}"`);
      } else {
        cy.log('Submit button not found in officer form; trying global search');

        cy.contains(
          'button',
          /Add|Submit|Save|Create|Confirm/i,
          { timeout: 10000 }
        )
          .first()
          .should('be.visible')
          .click({ force: true });

        cy.log('Officer submit button clicked using global search');
      }
    });

    return this;
  }

  // Attestation

  verifyAttestationPage() {
    cy.log('Verifying Attestation page');

    this.attestationHeading
      .should('be.visible', { timeout: 30000 });

    cy.log('Attestation page verified successfully');

    return this;
  }

  clickSignSection() {
    cy.log('Clicking Click to Sign section');

    this.signSection
      .should('be.visible', { timeout: 15000 })
      .click({ force: true });

    cy.log('Signature section opened successfully');

    return this;
  }

  switchToTypeTab() {
    cy.log('Selecting Type signature option');

    cy.get('body').then(($body) => {
      const signatureModal = $body.find(
        '[data-test*="signature"], [class*="signature"], [class*="modal"], [role="dialog"], form'
      ).first();

      const context = signatureModal.length > 0
        ? signatureModal
        : $body;

      const typeTab = context
        .find(
          'button, [role="tab"], [role="button"], div[class*="tab"], span[class*="tab"]'
        )
        .filter((index, element) => {
          const text = (element.textContent || '')
            .trim()
            .toLowerCase();

          return text.includes('type');
        })
        .first();

      if (typeTab.length > 0) {
        cy.wrap(typeTab)
          .should('be.visible')
          .click({ force: true });

        cy.log('Type signature option selected successfully');
      } else {
        throw new Error('Type signature option was not found');
      }
    });

    return this;
  }

  enterSignatureName(name) {
    cy.log(`Entering signature name: "${name}"`);

    this.signatureNameInput
      .should('be.visible', { timeout: 15000 })
      .clear()
      .type(name);

    cy.log(`Signature name entered successfully: "${name}"`);

    return this;
  }

  clickSignatureContinueButton() {
    cy.log('Clicking signature Continue button');

    this.signatureContinueButton
      .should('be.visible', { timeout: 15000 })
      .click({ force: true });

    cy.log('Signature Continue button clicked successfully');

    return this;
  }
}

export default new OrgOnboardingPage();