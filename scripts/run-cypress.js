const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const device = process.argv[2];
const configs = {
  desktop: "cypress.config.js",
  mobile: "cypress.mobile.config.js",
};

if (!Object.hasOwn(configs, device)) {
  console.error("Usage: node scripts/run-cypress.js <desktop|mobile>");
  process.exit(2);
}

const projectRoot = path.resolve(__dirname, "..");
const deviceReport = path.join(
  projectRoot,
  "cypress",
  "reports",
  "cucumber-json",
  `${device}.json`,
);
const deviceScreenshots = path.join(
  projectRoot,
  "cypress",
  "screenshots",
  device,
);
fs.rmSync(deviceReport, { force: true });
fs.rmSync(deviceScreenshots, { recursive: true, force: true });
fs.rmSync(path.join(projectRoot, "cucumber-report.json"), { force: true });
const result = spawnSync(
  process.execPath,
  [
    path.join(projectRoot, "node_modules", "cypress", "bin", "cypress"),
    "run",
    "--config-file",
    configs[device],
  ],
  { cwd: projectRoot, env: process.env, stdio: "inherit" },
);

if (result.error) {
  throw result.error;
}

const reportPath = path.join(projectRoot, "cucumber-report.json");
if (fs.existsSync(reportPath)) {
  fs.mkdirSync(path.dirname(deviceReport), { recursive: true });
  fs.copyFileSync(reportPath, deviceReport);
  fs.unlinkSync(reportPath);
} else {
  console.error("Cucumber JSON report was not created.");
  process.exit(1);
}

process.exit(result.status ?? 1);
