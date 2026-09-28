import selectors from "./07-selectors.js";

const projectObject = ({
    inValue,
    inSelect,
    inActionType
} = {}) => {
    if (!inValue || typeof inValue !== "object") {
        return inValue;
    }

    return selectors({
        inValue,
        inSelect,
        inActionType
    });
};

export default projectObject;