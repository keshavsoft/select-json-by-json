import selectors from "./07-selectors.js";

const projectArray = ({
    inValue,
    inSelect,
    inActionType
} = {}) => {
    if (!Array.isArray(inValue)) {
        return inValue;
    }

    return inValue.map((item) => {
        if (item !== null && typeof item === "object") {
            return selectors({
                inValue: item,
                inSelect,
                inActionType
            });
        }

        return item;
    });
};

export default projectArray;