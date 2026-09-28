import selectJson from "./02-engine.js";
import registerGlobal from "./08-registerGlobal.js";

registerGlobal({
    inFuncDefinition: selectJson
});

export { selectJson };

export default selectJson;