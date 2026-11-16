import "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.intercept(
    {
      hostname: "cdn.cookielaw.org",
      pathname: "**/*.js",
    },
    {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "void 0;",
    },
  );
});
