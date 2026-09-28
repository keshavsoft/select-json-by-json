import selectJson from "./02-engine.js";
import registerGlobal from "./registerGlobal.js";
import meta from "./meta.js";

registerGlobal({
    inFuncDefinition: selectJson
});

export { selectJson, meta };

export default selectJson;