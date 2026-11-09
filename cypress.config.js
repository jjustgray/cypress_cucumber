const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots/desktop",
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://telnyx.com",
    specPattern: "cypress/e2e/features/desktop/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );
      return config;
    },
  },
});
