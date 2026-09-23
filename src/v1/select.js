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

const selectJson = (inSource, inSpec) => {
    // Support both ({ inSource, inSpec }) and positional (source, spec)
    if (isPlainObject(inSource) && "inSource" in inSource && "inSpec" in inSource) {
        const localSource = inSource.inSource;
        const localSpec = inSource.inSpec;
        return selectValue(localSource, localSpec);
    }
    const localSource = inSource;
    const localSpec = inSpec;
    return selectValue(localSource, localSpec);
};

export { selectJson };
export default selectJson;
