import selectJsonByJson from "../../src/index.js";
// import selectJsonByJson from "../../src/v5/index.js";

import source from "./source.json" with { type: "json" };
import spec from "./spec.json" with { type: "json" };

const result = selectJsonByJson(source, spec);
console.log(result);