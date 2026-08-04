const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://chainit.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
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
