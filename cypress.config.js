const { defineConfig } = require('cypress');

module.exports = defineConfig({

  e2e: {

    // Default application URL
    baseUrl: 'https://chainit.com',

    // Test files
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Support file
    supportFile: 'cypress/support/e2e.js',

    // Browser viewport
    viewportWidth: 1440,
    viewportHeight: 900,

    // Test artifacts
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,

    // Cypress timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,

    // Retry failed tests
    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },

  env: {
    appName: 'ChainIT',

    urls: {
      home: '/',
      contact: '/contact-us/',
      docs: 'https://sdk.chainit.online/docs/intro',
      login: 'https://admin-react.chainit.online/',
    },
  },
});