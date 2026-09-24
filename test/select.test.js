import test from "node:test";
import assert from "node:assert/strict";
import { selectJson, meta } from "../src/index.js";
import selectJsonV3, { selectJson as namedV3, meta as metaV3 } from "../src/v3/index.js";

test("dynamically loads v3 engine as latest", () => {
    assert.equal(meta.version, "v3.0");
    assert.equal(metaV3.version, "v3.0");
    assert.equal(typeof selectJson, "function");
    assert.equal(typeof selectJsonV3, "function");
    assert.equal(typeof namedV3, "function");
});

test("selects top-level fields", () => {
    const source = { A: 1, B: 2, C: 3 };
    const spec = { A: true, C: true };
    assert.deepEqual(selectJson(source, spec), { A: 1, C: 3 });
});

test("supports rule 1 as select all", () => {
    const source = { A: "keep", B: "skip", C: "alsoKeep" };
    const spec = { A: 1, B: 0, C: true };
    assert.deepEqual(selectJson(source, spec), { A: "keep", C: "alsoKeep" });
});

test("selects nested fields in objects", () => {
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

test("supports multi-level deep nested arrays (inventory -> batch allocations)", () => {
    const source = [
        {
            VOUCHERNUMBER: 1,
            ITEMS: [
                {
                    STOCKITEMNAME: "Rope",
                    RATE: 100,
                    BATCHES: [
                        { BATCHNAME: "B1", QTY: 10, IGNORE: true },
                        { BATCHNAME: "B2", QTY: 20, IGNORE: true }
                    ]
                }
            ]
        }
    ];

    const spec = {
        VOUCHERNUMBER: true,
        ITEMS: {
            STOCKITEMNAME: true,
            BATCHES: {
                BATCHNAME: true,
                QTY: true
            }
        }
    };

    const expected = [
        {
            VOUCHERNUMBER: 1,
            ITEMS: [
                {
                    STOCKITEMNAME: "Rope",
                    BATCHES: [
                        { BATCHNAME: "B1", QTY: 10 },
                        { BATCHNAME: "B2", QTY: 20 }
                    ]
                }
            ]
        }
    ];

    assert.deepEqual(selectJson(source, spec), expected);
});

test("supports object parameter convention { inSource, inSpec }", () => {
    const inSource = { A: 10, B: 20 };
    const inSpec = { A: true };
    assert.deepEqual(selectJson({ inSource, inSpec }), { A: 10 });
    assert.deepEqual(selectJsonV3({ inSource, inSpec }), { A: 10 });
});

test("safely handles null, undefined, and non-object inputs", () => {
    assert.equal(selectJson(null, { A: true }), undefined);
    assert.equal(selectJson(undefined, { A: true }), undefined);
    assert.equal(selectJson("string", { A: true }), undefined);
    assert.equal(selectJson(123, { A: true }), undefined);
    assert.equal(selectJson({ A: 1 }, null), undefined);
    assert.equal(selectJson({ A: 1 }, undefined), undefined);
});

test("registers v3 on globalThis.ks", () => {
    assert.equal(typeof globalThis.ks, "object");
    assert.equal(typeof globalThis.ks.selectJson, "function");
    assert.equal(typeof globalThis.ks["select-json-by-json"], "object");
    assert.equal(globalThis.ks["select-json-by-json"].meta.version, "v3.0");
    
    // Test execution through global
    const res = globalThis.ks.selectJson({ X: 100, Y: 200 }, { X: true });
    assert.deepEqual(res, { X: 100 });
});

test("handles empty arrays and array with non-objects gracefully", () => {
    assert.deepEqual(selectJson([], { A: true }), []);
    assert.deepEqual(selectJson([null, undefined, 42, "text", { A: 99 }], { A: true }), [{ A: 99 }]);
});

