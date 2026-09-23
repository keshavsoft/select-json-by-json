const isObject = value => value !== null && typeof value === "object";
const isPlainObject = value => isObject(value) && !Array.isArray(value);

const selectValue = (source, spec) => {
    if (!isObject(source) || !isPlainObject(spec)) return undefined;

    if (Array.isArray(source)) {
        return source
            .map(item => selectValue(item, spec))
            .filter(item => item !== undefined);
    }

    const result = {};

    Object.entries(spec).forEach(([key, rule]) => {
        if (!(key in source)) return;

        if (rule === true || rule === 1) {
            result[key] = source[key];
            return;
        }

        if (isPlainObject(rule)) {
            const selected = selectValue(source[key], rule);
            if (selected !== undefined) result[key] = selected;
        }
    });

    return result;
};

export const selectJson = (source, spec) => selectValue(source, spec);
