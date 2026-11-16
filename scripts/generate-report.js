const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonRoot = path.join(root, "cypress", "reports", "cucumber-json");
const screenshotRoot = path.join(root, "cypress", "screenshots");
const outputRoot = path.join(root, "cypress", "reports", "html");
const cucumberRoot = path.join(outputRoot, "cucumber");
const screenshotOutput = path.join(outputRoot, "screenshots");
const deviceRuns = [
  { name: "desktop", label: "Desktop", viewport: "1440x900" },
  { name: "mobile", label: "Mobile", viewport: "390x844" },
];

function findFiles(directory, extension) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findFiles(fullPath, extension);
    return fullPath.endsWith(extension) ? [fullPath] : [];
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

async function main() {
  fs.mkdirSync(outputRoot, { recursive: true });
  const reportLinks = [];
  const browserName = process.env.E2E_BROWSER || "electron";
  const hasDeviceReports = deviceRuns.some(
    (run) => findFiles(path.join(jsonRoot, run.name), ".json").length > 0,
  );
  if (hasDeviceReports) {
    const reporter = await import("multiple-cucumber-html-reporter");
    for (const run of deviceRuns) {
      const jsonDir = path.join(jsonRoot, run.name);
      if (findFiles(jsonDir, ".json").length === 0) continue;

      await reporter.generate({
        jsonDir,
        reportPath: path.join(cucumberRoot, run.name),
        reportName: `Telnyx ${run.label} Cypress + Cucumber Results`,
        pageTitle: `Telnyx ${run.label} E2E Test Report`,
        displayDuration: true,
        openReportInBrowser: false,
        metadata: {
          browser: {
            name: browserName,
            version: process.env.E2E_BROWSER_VERSION || "not reported",
          },
          device: `${run.label} (${run.viewport})`,
          executionPlatform:
            process.env.GITHUB_ACTIONS === "true" ? "GitHub Actions" : "local",
          platform: {
            name: os.type(),
            version: os.release(),
          },
        },
      });
      reportLinks.push(
        `<li><a href="cucumber/${run.name}/index.html">${run.label} report (${run.viewport})</a></li>`,
      );
    }
  }

  const screenshots = findFiles(screenshotRoot, ".png");
  fs.mkdirSync(screenshotOutput, { recursive: true });
  const screenshotCards = screenshots.map((source) => {
    const filename = path.basename(source);
    const destination = path.join(screenshotOutput, filename);
    fs.copyFileSync(source, destination);
    return `<figure><img src="screenshots/${encodeURIComponent(filename)}" alt="Failed test screenshot: ${escapeHtml(filename)}"><figcaption>${escapeHtml(filename)}</figcaption></figure>`;
  });

  const cucumberLinks = reportLinks.length
    ? `<ul>${reportLinks.join("")}</ul>`
    : "<p>No Cucumber JSON results were generated in this run.</p>";
  const screenshotContent = screenshotCards.length
    ? `<section><h2>Failed-test screenshots</h2><div class="screenshots">${screenshotCards.join("")}</div></section>`
    : "<p>No failed-test screenshots were captured.</p>";

  fs.writeFileSync(
    path.join(outputRoot, "index.html"),
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Telnyx E2E test report</title><style>
body{font:16px/1.5 system-ui,sans-serif;max-width:1100px;margin:2rem auto;padding:0 1rem;color:#172b3a}
a{color:#075b91}figure{margin:0;border:1px solid #ccd5dc;padding:.5rem}img{max-width:100%;height:auto}.screenshots{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem}
</style></head><body><h1>Telnyx E2E test report</h1>${cucumberLinks}${screenshotContent}</body></html>`,
  );
  console.log(`Report created at ${path.relative(root, outputRoot)}.`);
}

main().catch((error) => {
  console.error("Could not generate the test report.", error);
  process.exitCode = 1;
});
