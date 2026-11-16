# Telnyx Cypress + Cucumber E2E

[![E2E status](https://github.com/jjustgray/cypress_cucumber/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/jjustgray/cypress_cucumber/actions/workflows/e2e.yml) · [Latest E2E report](https://jjustgray.github.io/cypress_cucumber/)

Automated end-to-end customer journeys for the public [Telnyx website](https://telnyx.com), with 10 desktop and 5 mobile scenarios matching the 15-case test plan. A separate mobile regression scenario tagged `@known-issue` documents current pricing-page overflow; it is reported as skipped and is not part of the 15-case matrix. The suite does not submit signup or sales forms or authenticate to a Telnyx account.

## Requirements

- Node.js 22+
- npm

## Run locally

```sh
npm ci
npm run test:desktop
npm run test:mobile
npm run report
```

The desktop suite uses `cypress.config.js` at 1440 × 900. The separate `cypress.mobile.config.js` runs 5 mobile scenarios at 390 × 844. Both read the same area-based feature files and select scenarios tagged `@desktop` or `@mobile`. Both use `https://telnyx.com` by default; override the target with `CYPRESS_BASE_URL=https://your-test-host.example`.

Local runs use Cypress's default Electron browser. Set `E2E_BROWSER=chrome` to use Chrome; GitHub Actions always runs Chrome.

In-plan scenarios carry their matching test-plan ID (for example, `@TC-01`); smoke scenarios also carry `@smoke`. Set `CYPRESS_TAGS` to a Cucumber tag expression to run a subset; for example, in PowerShell, `$env:CYPRESS_TAGS='@desktop and @smoke'; npm run test:desktop`. When unset, each config selects all scenarios for its device.

Cypress video recording is disabled. A screenshot is captured only when a test fails. `npm run report` generates separate desktop and mobile Cucumber reports with browser and viewport metadata, plus a landing page with failed-test screenshots in `cypress/reports/html`.

Feature files are grouped by area (homepage, products, pricing, SIP pricing, sales, resources, and inference calculator). Shared product-catalog and pricing-plan checks use Scenario Outlines with device-specific example tags. Step definitions use business-readable Given/When/Then steps and delegate browser interactions to page objects in `cypress/support/pages/`, where page-specific selectors and routes are maintained. Expected user-facing copy and pricing data live in `cypress/fixtures/site-content.json`.

The site currently throws an uncaught error from its third-party OneTrust scripts (including `otBannerSdk.js`, where `TenantFeatures` is undefined). Since these cases do not test cookie consent, a global `beforeEach` stubs JavaScript assets only from OneTrust's CDN; application exceptions remain enabled. Cypress uses a 10-second default command timeout, a 60-second page-load timeout, and one run-mode retry. The live pricing page currently contains desktop-width content that expands the document beyond the mobile viewport. The regression check is retained as `@known-issue` and reported as skipped until the site is fixed; mobile scenarios also verify that key headings and pricing content remain accessible.

## Test plan

The [Telnyx_Test_Plan.xlsx](./Telnyx_Test_Plan.xlsx) is included in the repository and contains one test-plan sheet with the plan summary and a 15-case matrix: 10 desktop and 5 mobile.

## GitHub Actions and Pages

`.github/workflows/e2e.yml` runs desktop and mobile tests on pushes and pull requests to `main`. CI caches the Cypress binary, runs Chrome, creates separate metadata-rich desktop/mobile reports even when tests fail, and deploys them to GitHub Pages. The workflow fails after report deployment when E2E tests fail.

The workflow enables GitHub Pages through `configure-pages` when needed. If repository policy blocks that permission, set **Settings → Pages → Build and deployment → GitHub Actions**. The report URL is exposed by the `deploy-report` job.
