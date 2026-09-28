import inspect from "./03-inspect.js";
import project from "./04-project.js";

const selectJson = (inSource, inSpec, inActionType) => {
    const localSource = inSource;
    const localSpec = inSpec;
    const localActionType = inActionType ?? "visibility";

    const inspected = inspect({
        inValue: localSource
    });

    return project({
        inValue: localSource,
        inSelect: localSpec,
        inActionType: localActionType,
        inspected
    });
};

export default selectJson;