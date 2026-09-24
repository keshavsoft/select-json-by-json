import meta from "./meta.js";

export const registerGlobal = (inParam) => {
    const localFuncDefinition = typeof inParam === "function"
        ? inParam
        : inParam?.inFuncDefinition;

    if (typeof globalThis === "undefined" || !localFuncDefinition) return;

    globalThis.ks ??= {};
    globalThis.ks["select-json-by-json"] = {
        meta,
        selectJson: localFuncDefinition
    };

    globalThis.ks.selectJson = localFuncDefinition;
};

export default registerGlobal;
