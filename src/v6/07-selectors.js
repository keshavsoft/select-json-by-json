const isObject = ({ inValue } = {}) => {
    return inValue !== null && typeof inValue === "object";
};

const isArray = ({ inValue } = {}) => {
    return Array.isArray(inValue);
};

const selectObject = ({
    inValue,
    inSelect
} = {}) => {
    if (!isObject({ inValue }) || !isObject({ inValue: inSelect })) {
        return inValue;
    }

    const result = {};

    Object.entries(inSelect).forEach(([key, rule]) => {
        if (!Object.prototype.hasOwnProperty.call(inValue, key)) {
            return;
        }

        const value = inValue[key];

        if (rule === true) {
            result[key] = value;
            return;
        }

        if (!isObject({ inValue: rule })) {
            return;
        }

        if (isArray({ inValue: value })) {
            result[key] = value.map((item) => {
                return selectObject({
                    inValue: item,
                    inSelect: rule
                });
            });

            return;
        }

        if (isObject({ inValue: value })) {
            result[key] = selectObject({
                inValue: value,
                inSelect: rule
            });
        }
    });

    return result;
};

const selectors = ({
    inValue,
    inSelect
} = {}) => {
    return selectObject({
        inValue,
        inSelect
    });
};

export {
    selectObject
};

export default selectors;