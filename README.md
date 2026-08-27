# ChainIT Framework

Cypress-based end-to-end test automation framework for the **ChainIT** identity/verification platform.

## Tech Stack

- **Test Runner:** Cypress v15.19.0
- **Language:** JavaScript (CommonJS)
- **Plugins:** cypress-iframe
- **Browser:** Chrome

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Chrome browser (for headed runs)

## Installation

```bash
npm install
```

## Configuration

Environment variables are managed in `cypress.config.js` under the `env.urls` block:

| Variable | Default | Description |
|----------|---------|-------------|
| `env.urls.home` | `/` | Base home page path |
| `env.urls.contact` | `/contact-us/` | Contact page path |
| `env.urls.docs` | `https://sdk.chainit.online/docs/intro` | Developer docs URL |
| `env.urls.login` | `https://admin-react.chainit.online/` | Admin login URL |

Sensitive credentials (tokens, device IDs) should be stored in `cypress.env.json` (gitignored).

## Project Structure

```
cypress/
├── e2e/                      # Test specs
│   ├── post-login.cy.js
│   ├── post-loginprofile.cy.js
│   ├── Post-login-Subscriptionpage.cy.js
│   ├── Pactvera-page.cy.js
│   ├── Document-page.cy.js
│   ├── Configuration-page.cy.js
│   └── Sharing-page.cy.js
├── pages/                    # Page Object Model classes
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── NavigationPage.js
│   ├── SwitchAccountModal.js
│   ├── MyTasksPage.js
│   ├── PostLoginProfile.js
│   ├── SubscriptionPage.js
│   ├── SharingPage.js
│   ├── ConfigurationPage.js
│   ├── DocumentPage.js
│   ├── PactveraPage.js
│   ├── DownloadPage.js
│   └── FooterPage.js
├── fixtures/                 # Test data files
│   ├── navigationData.json
│   └── gaurav.pdf
├── support/                  # Global setup and custom commands
│   ├── e2e.js
│   └── commands.js
├── utils/                    # Helper utilities
│   └── helpers.js
├── screenshots/              # Failure screenshots
└── videos/                   # Recorded videos
```

## Page Object Model

All page classes extend `BasePage` and follow a consistent pattern:

- **Getters** expose Cypress chainable subjects (selectors)
- **Action methods** perform interactions and return `this` for chaining
- **Verification methods** assert state and return `this` for chaining

Example:

```javascript
class MyPage extends BasePage {
  get someElement() {
    return cy.get('[data-test="some-element"]');
  }

  clickSomeElement() {
    this.someElement.click();
    return this;
  }

  verifySomeElementVisible() {
    this.someElement.should('be.visible');
    return this;
  }
}

export default new MyPage();
```

## Running Tests

### Interactive Mode (headed)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner. Select a spec to run.

### Headless Mode

```bash
npm run cypress:run
```

### Chrome (headed)

```bash
npm run cypress:run:headed
```

### Chrome (headless)

```bash
npm run cypress:run:chrome
```

## QR Authentication Flow

All tests require manual QR code scanning with a mobile device:

1. Test navigates to the `/scan-qr` page
2. Test pauses (in interactive mode) or waits up to 2 minutes (in headless mode)
3. Tester scans the QR code with the ChainIT mobile app
4. Test resumes automatically after redirect
5. Test handles the "Switch Account" modal by selecting "Individual Account"

## Custom Commands

| Command | Description |
|---------|-------------|
| `cy.closeQrPopupIfVisible()` | Waits 10s, then closes QR popup if present |
| `cy.visitHome()` | Visits home URL and closes any visible QR popup |

## Test Conventions

- All test files use kebab-case naming: `*.cy.js`
- All page files use PascalCase naming: `*Page.js`
- All method names use camelCase
- All action and verification methods return `this` for fluent chaining
- Selectors use `data-test` attributes where available, falling back to text/content selectors

## Notes

- `cypress.env.json` contains sensitive tokens and is gitignored
- Test videos and screenshots are captured on failure
- Tests retry once in run mode, zero times in open mode
- Uncaught application exceptions are suppressed to prevent flaky failures
