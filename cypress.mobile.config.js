const { defineConfig } = require("cypress");
const desktopConfig = require("./cypress.config");

module.exports = defineConfig({
  ...desktopConfig,
  viewportWidth: 390,
  viewportHeight: 844,
  screenshotsFolder: "cypress/screenshots/mobile",
  e2e: {
    ...desktopConfig.e2e,
    specPattern: "cypress/e2e/features/mobile/*.feature",
  },
});
