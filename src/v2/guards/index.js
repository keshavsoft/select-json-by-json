export const isObject = ({ inValue } = {}) => {
    const localValue = inValue;
    return localValue !== null && typeof localValue === "object";
};

export const isPlainObject = ({ inValue } = {}) => {
    const localValue = inValue;
    return isObject({ inValue: localValue }) && !Array.isArray(localValue);
};

export const isArray = ({ inValue } = {}) => {
    const localValue = inValue;
    return Array.isArray(localValue);
};

export const isSelectAll = ({ inRule } = {}) => {
    const localRule = inRule;
    return localRule === true || localRule === 1;
};

export default {
    isObject,
    isPlainObject,
    isArray,
    isSelectAll
};
