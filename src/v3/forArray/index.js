import selectValue from "../selectValue/index.js";

/**
 * Story: Array Traversal Phase
 * Iterates through each item in the array and applies the projection spec recursively.
 */
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

export { forArray };
export default forArray;
