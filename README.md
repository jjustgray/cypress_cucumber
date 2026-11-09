# Telnyx Cypress + Cucumber E2E

Automated end-to-end customer journeys for the public [Telnyx website](https://telnyx.com), split into 10 desktop and 5 mobile scenarios. Scenarios exercise multi-page navigation, in-page anchors, pricing sections, and the interactive inference estimator. The suite does not submit signup or sales forms or authenticate to a Telnyx account.

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

The desktop suite uses `cypress.config.js` at 1440 × 900. The separate `cypress.mobile.config.js` runs only the five mobile cases at 390 × 844. Both use `https://telnyx.com` by default; override the target with `CYPRESS_BASE_URL=https://your-test-host.example`.

Cypress video recording is disabled. A screenshot is captured only when a test fails. `npm run report` generates the Cucumber report and a landing page with failed-test screenshots in `cypress/reports/html`.

The site currently throws an uncaught error from its third-party OneTrust `otBannerSdk.js` script because `TenantFeatures` is undefined. Since these cases do not test cookie consent, the suite stubs only that script; application exceptions remain enabled. The live pricing page also contains desktop-width content that expands the document beyond the mobile viewport. Mobile scenarios verify that key headings and pricing content remain accessible rather than asserting the entire page has no overflow.

## Test plan

Open [Telnyx_Test_Plan.xlsx](./Telnyx_Test_Plan.xlsx) for the 15-case matrix and one-week submission schedule. Regenerate it with `npm run plan`.

## GitHub Actions and Pages

`.github/workflows/e2e.yml` runs desktop and mobile tests on pushes and pull requests to `main`, creates a report even when tests fail, and deploys the report to GitHub Pages. The workflow fails after report deployment when E2E tests fail.

The workflow enables GitHub Pages through `configure-pages` when needed. If repository policy blocks that permission, set **Settings → Pages → Build and deployment → GitHub Actions**. The report URL is exposed by the `deploy-report` job.
