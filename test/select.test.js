import test from "node:test";
import assert from "node:assert/strict";
import { selectJson, meta } from "../src/index.js";

test("dynamically loads v2 story engine", () => {
    assert.equal(meta.version, "v2.0");
});

test("selects top-level fields", () => {
    const source = { A: 1, B: 2, C: 3 };
    const spec = { A: true, C: true };
    assert.deepEqual(selectJson(source, spec), { A: 1, C: 3 });
});

test("selects nested fields", () => {
    const source = {
        VOUCHER: {
            MASTERID: "10",
            VOUCHERNUMBER: "25",
            DATE: "20260923"
        },
        EXTRA: "ignore"
    };
    const spec = {
        VOUCHER: {
            MASTERID: true,
            VOUCHERNUMBER: true
        }
    };
    assert.deepEqual(selectJson(source, spec), {
        VOUCHER: { MASTERID: "10", VOUCHERNUMBER: "25" }
    });
});

test("selects fields inside nested arrays", () => {
    const source = {
        ALLINVENTORYENTRIES: [
            { STOCKITEMNAME: "Item A", BILLEDQTY: 2, EXTRA: "x" },
            { STOCKITEMNAME: "Item B", BILLEDQTY: 4, EXTRA: "y" }
        ]
    };
    const spec = {
        ALLINVENTORYENTRIES: {
            STOCKITEMNAME: true,
            BILLEDQTY: true
        }
    };
    assert.deepEqual(selectJson(source, spec), {
        ALLINVENTORYENTRIES: [
            { STOCKITEMNAME: "Item A", BILLEDQTY: 2 },
            { STOCKITEMNAME: "Item B", BILLEDQTY: 4 }
        ]
    });
});

test("supports object parameter convention { inSource, inSpec }", () => {
    const inSource = { A: 10, B: 20 };
    const inSpec = { A: true };
    assert.deepEqual(selectJson({ inSource, inSpec }), { A: 10 });
});
