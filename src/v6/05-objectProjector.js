import selectors from "./07-selectors.js";

const projectObject = ({
    inValue,
    inSelect
} = {}) => {
    if (!inValue || typeof inValue !== "object") {
        return inValue;
    }

    return selectors({
        inValue,
        inSelect
    });
};

export default projectObject;