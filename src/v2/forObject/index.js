import selectValue from "../selectValue/index.js";
import { isPlainObject, isSelectAll } from "../guards/index.js";

/**
 * Story: Object Projection Phase
 * Iterates through the spec rules and picks matching keys from the source object.
 */
const forObject = ({ inSource, inSpec } = {}) => {
    const localSource = inSource;
    const localSpec = inSpec;

    const result = {};

    Object.entries(localSpec).forEach(([key, rule]) => {
        if (!(key in localSource)) return;

        // Leaf rule: keep field value as-is
        if (isSelectAll({ inRule: rule })) {
            result[key] = localSource[key];
            return;
        }

        // Nested rule: recursively project nested child structure
        if (isPlainObject({ inValue: rule })) {
            const selected = selectValue({ inSource: localSource[key], inSpec: rule });
            if (selected !== undefined) {
                result[key] = selected;
            }
        }
    });

    return result;
};

export { forObject };
export default forObject;
