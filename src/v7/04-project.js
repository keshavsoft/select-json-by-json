import objectProjector from "./05-objectProjector.js";
import arrayProjector from "./06-arrayProjector.js";

const project = ({
    inValue,
    inSelect,
    inActionType,
    inspected
} = {}) => {
    if (inspected?.type === "array") {
        return arrayProjector({
            inValue,
            inSelect,
            inActionType
        });
    }

    if (inspected?.type === "object") {
        return objectProjector({
            inValue,
            inSelect,
            inActionType
        });
    }

    return inValue;
};

export default project;