import selectJson from "../../src/index.js";

import source from "./source.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };
import rename from "./rename.json" with { type: "json" };

console.log("=== actionType: visibility ===");
const visibility = selectJson(source, spec, "visibility");
console.log(JSON.stringify(visibility, null, 2));

console.log("\n=== actionType: renameKey ===");
const renamed = selectJson(source, rename, "renameKey");
console.log(JSON.stringify(renamed, null, 2));

console.log("\n=== default (no actionType) — same as visibility ===");
const defaultResult = selectJson(source, spec);
console.log(JSON.stringify(defaultResult, null, 2));
