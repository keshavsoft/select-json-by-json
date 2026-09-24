import registerGlobal from "./registerGlobal.js";
import { selectJson } from "./select.js";
import meta from "./meta.js";

// Register onto globalThis for browser and Node globals
registerGlobal({ inFuncDefinition: selectJson });

export { selectJson, meta };
export default selectJson;
