# select-json-by-json

A high-performance standalone JSON projection engine for Node.js and modern browsers.
**Engine v6.0 · Package v1.6.1**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue?style=flat&logo=github)](https://keshavsoft.github.io/select-json-by-json/)
[![npm](https://img.shields.io/badge/npm-select--json--by--json-red?style=flat&logo=npm)](https://www.npmjs.com/package/select-json-by-json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🔗 Quick Links

- 🌐 **Live Demo & Playground**: [https://keshavsoft.github.io/select-json-by-json/](https://keshavsoft.github.io/select-json-by-json/)
- 📦 **GitHub Repository**: [https://github.com/keshavsoft/select-json-by-json](https://github.com/keshavsoft/select-json-by-json)
- 🚀 **CDN Bundle (Latest)**: [https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js](https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js)
- 🚀 **CDN Bundle (v6)**: [https://keshavsoft.github.io/select-json-by-json/docs/dist/v6/min.js](https://keshavsoft.github.io/select-json-by-json/docs/dist/v6/min.js)

---

## How It Works

`selectJson(source, spec)` takes two arguments:

| Argument | Role |
|---|---|
| `source` (1st) | The **input** JSON — an object or array to project from. **Never mutated.** |
| `spec` (2nd) | The **projection spec** — a JSON object declaring which fields to keep. |

The result is always a **new object/array** with only the fields declared in the spec. The original `source` is untouched.

```js
const result = selectJson(source, spec);
// source is never modified — result is a fresh projection
```

### Spec Rules

| Spec value | Meaning |
|---|---|
| `true` | Keep this field from source as-is |
| `{ ... }` | Descend into nested object/array with sub-spec |
| _(absent)_ | Field is excluded from result |

---

## 📦 Installation & Usage

### 1. NPX — Copy Engine to Your Project

Copies the highest engine version (`v6`) directly into your project as plain JS files, zero dependencies:

```bash
# Copies v6 engine to ./select-json-by-json/
npx select-json-by-json

# Custom destination:
npx select-json-by-json ./src/lib/engine

# Target a specific version:
npx select-json-by-json ./lib/engine --version-target=v6
npx select-json-by-json ./lib/engine --version-target=v5

# Show all options:
npx select-json-by-json --help
```

After copying, import directly:

```js
import { selectJson } from "./select-json-by-json/index.js";

const result = selectJson(source, { DATE: true, VOUCHERNUMBER: true });
```

---

### 2. NPM Package

```bash
npm install select-json-by-json
```

```javascript
// Latest engine (v6)
import { selectJson } from "select-json-by-json";

// Pin a specific engine version:
import { selectJson } from "select-json-by-json/v6";
import { selectJson } from "select-json-by-json/v5";

const result = selectJson(sales, {
    DATE: true,
    VOUCHERNUMBER: true,
    "ALLINVENTORYENTRIES.LIST": {
        STOCKITEMNAME: true,
        RATE: true
    }
});
```

---

### 3. CDN (ES Module — Browser)

```html
<script type="module">
    import { selectJson } from "https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js";

    const result = selectJson(sourceData, {
        DATE: true,
        VOUCHERNUMBER: true
    });

    console.log(result);
</script>
```

Also registered globally as `globalThis.ks["select-json-by-json"]` and `globalThis.ks.selectJson`.

> 🌐 Try it live: [Interactive Playground](https://keshavsoft.github.io/select-json-by-json/)

---

## 🧪 Testing

```bash
# Run the Node.js native test suite
npm test

# Quick manual tests
node ./test/v2/index.js
node ./test/v1/index.js
```

---

## 🛠️ Build Commands

| Command | Description |
|---|---|
| `npm run build` | Bundles highest `src/vN` with Vite → `docs/dist/vN/min.js` and `docs/dist/min.js` |
| `npm test` | Runs Node.js native test suite |
| `npm start` | Runs the demo in `save.js` |

---

## 📁 Project Structure

```
src/
  index.js              ← re-exports from src/v6 (latest)
  v5/                   ← previous engine version
  v6/                   ← current engine (v6.0)
    02-engine.js
    03-inspect.js
    04-project.js
    05-objectProjector.js
    06-arrayProjector.js
    07-selectors.js
    registerGlobal.js
    meta.js
    index.js

bin/
  cli.js                ← npx CLI — copies highest src/vN to destination

test/
  v1/                   ← manual test with source.json + spec.json
  v2/                   ← manual test with updated spec

docs/
  index.html            ← Live playground (GitHub Pages)
  dist/
    min.js              ← latest CDN bundle (v6)
    v6/min.js           ← versioned CDN bundle
```

