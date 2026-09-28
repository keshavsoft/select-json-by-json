import objectProjector from "./05-objectProjector.js";
import arrayProjector from "./06-arrayProjector.js";

const project = ({
    inValue,
    inSelect,
    inspected
} = {}) => {
    if (inspected?.type === "array") {
        return arrayProjector({
            inValue,
            inSelect
        });
    }

    if (inspected?.type === "object") {
        return objectProjector({
            inValue,
            inSelect
        });
    }

    return inValue;
};

export default project;