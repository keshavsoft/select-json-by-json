#!/usr/bin/env node

import { readdirSync, existsSync, cpSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const srcDir = resolve(packageRoot, "src");

const packageJson = JSON.parse(readFileSync(resolve(packageRoot, "package.json"), "utf8"));

// 1. Parse CLI Arguments
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
    console.log(`
select-json-by-json CLI - Pure JSON Projection Utility

Usage:
  npx select-json-by-json [destination-directory] [options]

Arguments:
  destination-directory   Folder to copy the latest engine to (default: ./select-json-by-json)

Options:
  -v, --version           Display package and engine version
  -h, --help              Show this help message
  --version-target=<ver>  Specify an explicit version to copy (e.g. --version-target=v1)

Examples:
  npx select-json-by-json
  npx select-json-by-json ./lib/select-json-by-json
  npx select-json-by-json ./select-engine --version-target=v1
`);
    process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
    console.log(`select-json-by-json CLI v${packageJson.version}`);
    process.exit(0);
}

// 2. Discover Versions in src/
if (!existsSync(srcDir)) {
    console.error("❌ Error: Could not locate 'src' directory in select-json-by-json package.");
    process.exit(1);
}

const versionFolders = readdirSync(srcDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^v\d+$/.test(entry.name))
    .map(entry => ({ name: entry.name, n: Number(entry.name.slice(1)) }))
    .sort((a, b) => b.n - a.n);

if (versionFolders.length === 0) {
    console.error("❌ Error: No version folders (v1, v2, ... vN) found in src/.");
    process.exit(1);
}

// 3. Determine Target Version
const explicitVersionArg = args.find(arg => arg.startsWith("--version-target="));
let selectedVersion = versionFolders[0].name; // Highest version by default

if (explicitVersionArg) {
    const targetVer = explicitVersionArg.split("=")[1]?.trim();
    if (versionFolders.some(v => v.name === targetVer)) {
        selectedVersion = targetVer;
    } else {
        console.error(`❌ Error: Requested version '${targetVer}' not found in src/. Available: ${versionFolders.map(v => v.name).join(", ")}`);
        process.exit(1);
    }
}

// 4. Determine Destination Directory
const customDest = args.find(arg => !arg.startsWith("-"));
const destinationPath = resolve(process.cwd(), customDest || "./select-json-by-json");

console.log(`\n⚡ select-json-by-json CLI`);
console.log(`📦 Discovered highest version: ${selectedVersion}`);
console.log(`📂 Copying engine to: ${destinationPath} ...`);

try {
    const sourceVersionDir = resolve(srcDir, selectedVersion);
    mkdirSync(destinationPath, { recursive: true });

    // Copy the engine version directory
    cpSync(sourceVersionDir, destinationPath, { recursive: true });

    console.log(`✅ Successfully copied ${selectedVersion} to ${destinationPath}`);
    console.log(`\n🚀 Getting Started:`);
    console.log(`   import { selectJson } from "${customDest || "./select-json-by-json"}/index.js";`);
    console.log(`   const result = selectJson(data, { DATE: true });\n`);
} catch (error) {
    console.error(`❌ Failed to copy version:`, error.message);
    process.exit(1);
}
