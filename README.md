# select-json-by-spec

A small standalone JSON projection utility for Node.js.

It takes a source JSON object and a JSON spec and recursively keeps only the requested fields.

```js
import { selectJson } from "./src/index.js";

const result = selectJson(source, {
    MASTERID: true,
    VOUCHERNUMBER: true,
    ALLINVENTORYENTRIES: {
        STOCKITEMNAME: true,
        BILLEDQTY: true
    }
});
```

`true` (or `1`) keeps a field. An object recursively selects nested fields. Arrays are traversed automatically.

This is a separate experiment; it does not modify `json-to-spec` or `json-to-dom`.
