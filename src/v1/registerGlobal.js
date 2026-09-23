import meta from "./meta.js";

export const registerGlobal = (inFuncDefinition) => {
    if (typeof globalThis === "undefined" || !inFuncDefinition) return;

    globalThis.ks ??= {};
    globalThis.ks["select-json-by-json"] = {
        meta,
        selectJson: inFuncDefinition
    };

    globalThis.ks.selectJson = inFuncDefinition;
};

export default registerGlobal;
