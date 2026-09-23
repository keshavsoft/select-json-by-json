import registerGlobal from "./registerGlobal.js";
import { selectJson } from "./select.js";
import meta from "./meta.js";

registerGlobal(selectJson);

export { selectJson, meta };
export default selectJson;
