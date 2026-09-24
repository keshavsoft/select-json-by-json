import registerGlobal from "./registerGlobal.js";
import selectValue from "./selectValue/index.js";
import meta from "./meta.js";

/**
 * Story: Public API Normalizer
 * Normalizes input arguments ({ inSource, inSpec } or (source, spec)),
 * registers onto globalThis, and initiates the projection story.
 */
const selectJson = (inSource, inSpec) => {
    // Case 1: Called with single options object { inSource, inSpec }
    if (
        inSource !== null &&
        typeof inSource === "object" &&
        !Array.isArray(inSource) &&
        "inSource" in inSource &&
        "inSpec" in inSource
    ) {
        const localSource = inSource.inSource;
        const localSpec = inSource.inSpec;
        return selectValue({ inSource: localSource, inSpec: localSpec });
    }

    // Case 2: Called with positional arguments (source, spec)
    const localSource = inSource;
    const localSpec = inSpec;
    return selectValue({ inSource: localSource, inSpec: localSpec });
};

registerGlobal(selectJson);

export { selectJson, meta };
export default selectJson;
