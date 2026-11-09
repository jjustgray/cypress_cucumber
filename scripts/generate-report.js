const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonRoot = path.join(root, "cypress", "reports", "cucumber-json");
const screenshotRoot = path.join(root, "cypress", "screenshots");
const outputRoot = path.join(root, "cypress", "reports", "html");
const cucumberRoot = path.join(outputRoot, "cucumber");
const screenshotOutput = path.join(outputRoot, "screenshots");

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
  const jsonFiles = findFiles(jsonRoot, ".json");
  if (jsonFiles.length > 0) {
    const reporter = await import("multiple-cucumber-html-reporter");
    await reporter.generate({
    jsonDir: jsonRoot,
    reportPath: cucumberRoot,
    reportName: "Telnyx Cypress + Cucumber Results",
    pageTitle: "Telnyx E2E Test Report",
    displayDuration: true,
    openReportInBrowser: false,
    });
  } else {
    fs.mkdirSync(cucumberRoot, { recursive: true });
  }

  const screenshots = findFiles(screenshotRoot, ".png");
  fs.mkdirSync(screenshotOutput, { recursive: true });
  const screenshotCards = screenshots.map((source) => {
    const filename = path.basename(source);
    const destination = path.join(screenshotOutput, filename);
    fs.copyFileSync(source, destination);
    return `<figure><img src="screenshots/${encodeURIComponent(filename)}" alt="Failed test screenshot: ${escapeHtml(filename)}"><figcaption>${escapeHtml(filename)}</figcaption></figure>`;
  });

  const cucumberLink = jsonFiles.length
    ? '<a href="cucumber/index.html">Open detailed Cucumber report</a>'
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
</style></head><body><h1>Telnyx E2E test report</h1>${cucumberLink}${screenshotContent}</body></html>`,
  );
  console.log(`Report created at ${path.relative(root, outputRoot)}.`);
}

main().catch((error) => {
  console.error("Could not generate the test report.", error);
  process.exitCode = 1;
});
