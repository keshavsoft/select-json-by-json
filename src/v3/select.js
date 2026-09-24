/**
 * select-json-by-json v3 Engine
 * Story: Fast, recursive, zero-dependency JSON projection engine following KeshavSoft conventions.
 */

const isObject = ({ inValue } = {}) => {
    const localValue = inValue;
    return localValue !== null && typeof localValue === "object";
};

const isPlainObject = ({ inValue } = {}) => {
    const localValue = inValue;
    return isObject({ inValue: localValue }) && !Array.isArray(localValue);
};

const isArray = ({ inValue } = {}) => {
    const localValue = inValue;
    return Array.isArray(localValue);
};

const isSelectAll = ({ inRule } = {}) => {
    const localRule = inRule;
    return localRule === true || localRule === 1;
};

const forArray = ({ inArray, inSpec } = {}) => {
    const localArray = inArray;
    const localSpec = inSpec;

    if (!Array.isArray(localArray)) {
        return [];
    }

    return localArray
        .map(item => selectValue({ inSource: item, inSpec: localSpec }))
        .filter(item => item !== undefined);
};

const forObject = ({ inSource, inSpec } = {}) => {
    const localSource = inSource;
    const localSpec = inSpec;

    const localResult = {};

    Object.entries(localSpec).forEach(([key, rule]) => {
        if (!(key in localSource)) return;

        // Leaf rule: keep field value as-is (e.g., true or 1)
        if (isSelectAll({ inRule: rule })) {
            localResult[key] = localSource[key];
            return;
        }

        // Nested rule: recursively project nested child structure
        if (isPlainObject({ inValue: rule })) {
            const localSelected = selectValue({ inSource: localSource[key], inSpec: rule });
            if (localSelected !== undefined) {
                localResult[key] = localSelected;
            }
        }
    });

    return localResult;
};

export const selectValue = ({ inSource, inSpec } = {}) => {
    const localSource = inSource;
    const localSpec = inSpec;

    // Guard: Source must be an object or array, Spec must be a plain object
    if (!isObject({ inValue: localSource }) || !isPlainObject({ inValue: localSpec })) {
        return undefined;
    }

    // Branch 1: Source is an Array
    if (isArray({ inValue: localSource })) {
        return forArray({ inArray: localSource, inSpec: localSpec });
    }

    // Branch 2: Source is a Plain Object
    return forObject({ inSource: localSource, inSpec: localSpec });
};

export const selectJson = (inSource, inSpec) => {
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

export {
    isObject,
    isPlainObject,
    isArray,
    isSelectAll,
    forArray,
    forObject
};

export default selectJson;
