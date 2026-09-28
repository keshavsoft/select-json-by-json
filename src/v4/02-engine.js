import inspect from "./03-inspect.js";
import project from "./04-project.js";

const selectJson = (inSource, inSpec) => {
    const localSource = inSource;
    const localSpec = inSpec;

    const inspected = inspect({
        inValue: localSource
    });

    return project({
        inValue: localSource,
        inSelect: localSpec,
        inspected
    });
};

export default selectJson;