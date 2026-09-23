import { selectJson } from "./src/index.js";
import salesJson from "./sales.json" with { type: "json" };
import selectJsonSpec from "./select.json" with { type: "json" };

const startFunc = ({ inSource = salesJson, inSpec = selectJsonSpec } = {}) => {
    const localSource = inSource;
    const localSpec = inSpec;

    const selectedData = selectJson(localSource, localSpec);
    return selectedData;
};

const result = startFunc();
console.log("Total records selected:", result.length);
console.log("Sample selected data (first 3 items):", result.slice(0, 3));

export { startFunc };
export default startFunc;
