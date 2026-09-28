const isObject = ({ inValue } = {}) => {
    return inValue !== null && typeof inValue === "object";
};

const isArray = ({ inValue } = {}) => {
    return Array.isArray(inValue);
};

const isPlainObject = ({ inValue } = {}) => {
    return isObject({ inValue }) && !isArray({ inValue });
};

const inspect = ({ inValue } = {}) => {
    if (isArray({ inValue })) {
        return {
            type: "array",
            isArray: true,
            isObject: true
        };
    }

    if (isPlainObject({ inValue })) {
        return {
            type: "object",
            isArray: false,
            isObject: true
        };
    }

    return {
        type: typeof inValue,
        isArray: false,
        isObject: false
    };
};

export {
    isObject,
    isArray,
    isPlainObject
};

export default inspect;