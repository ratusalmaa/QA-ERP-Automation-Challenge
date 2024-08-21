const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  chromeWebSecurity: false,
  scrollBehavior: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://phoenix-dev.mceasy.cloud/web/',
    experimentalStudio: true
  },
});
