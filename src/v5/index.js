import selectJson from "./02-engine.js";
import registerGlobal from "./08-registerGlobal.js";
import meta from "./09-meta.js";

registerGlobal({
    inFuncDefinition: selectJson
});

export { selectJson, meta };

export default selectJson;