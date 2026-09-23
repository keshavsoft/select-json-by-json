import { isObject, isPlainObject, isArray } from "../guards/index.js";
import forArray from "../forArray/index.js";
import forObject from "../forObject/index.js";

/**
 * Story: Dispatcher / Orchestrator Phase
 * Evaluates the source data type and dispatches to either the array handler or the object handler.
 */
const selectValue = ({ inSource, inSpec } = {}) => {
    const localSource = inSource;
    const localSpec = inSpec;

    // Guard: Source must be an object/array and Spec must be a plain object
    if (!isObject({ inValue: localSource }) || !isPlainObject({ inValue: localSpec })) {
        return undefined;
    }

    // Story Branch 1: Source is an Array
    if (isArray({ inValue: localSource })) {
        return forArray({ inArray: localSource, inSpec: localSpec });
    }

    // Story Branch 2: Source is a Plain Object
    return forObject({ inSource: localSource, inSpec: localSpec });
};

export { selectValue };
export default selectValue;
