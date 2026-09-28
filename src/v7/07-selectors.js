const isObject = ({ inValue } = {}) => {
    return inValue !== null && typeof inValue === "object";
};

const isArray = ({ inValue } = {}) => {
    return Array.isArray(inValue);
};

// ─── actionType: "visibility" ────────────────────────────────────────────────
// Keeps only fields declared true (or nested spec) in inSelect.
// Source is never mutated. Returns a new projected object.

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

// ─── actionType: "renameKey" ─────────────────────────────────────────────────
// Renames keys at every level using inRename as a flat dictionary.
// { "OLD_KEY": "newKey" } — applied recursively to all objects and array items.
// Keys not in the dictionary are kept with their original name.

const renameObject = ({
    inValue,
    inRename
} = {}) => {
    if (!isObject({ inValue }) || !isObject({ inValue: inRename })) {
        return inValue;
    }

    const result = {};

    Object.entries(inValue).forEach(([key, value]) => {
        const localNewKey = inRename[key] ?? key;

        if (isArray({ inValue: value })) {
            result[localNewKey] = value.map((item) => {
                if (item !== null && typeof item === "object") {
                    return renameObject({ inValue: item, inRename });
                }
                return item;
            });
            return;
        }

        if (isObject({ inValue: value })) {
            result[localNewKey] = renameObject({ inValue: value, inRename });
            return;
        }

        result[localNewKey] = value;
    });

    return result;
};

// ─── Router ──────────────────────────────────────────────────────────────────

const selectors = ({
    inValue,
    inSelect,
    inActionType
} = {}) => {
    if (inActionType === "renameKey") {
        return renameObject({
            inValue,
            inRename: inSelect
        });
    }

    return selectObject({
        inValue,
        inSelect
    });
};

export {
    selectObject,
    renameObject
};

export default selectors;