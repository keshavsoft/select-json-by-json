# select-json-by-json

A high-performance standalone JSON projection engine for Node.js and modern browsers.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue?style=flat&logo=github)](https://keshavsoft.github.io/select-json-by-json/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🔗 Quick Links

- 🌐 **Live Demo & Playground**: [https://keshavsoft.github.io/select-json-by-json/](https://keshavsoft.github.io/select-json-by-json/)
- 📦 **GitHub Repository**: [https://github.com/keshavsoft/select-json-by-json](https://github.com/keshavsoft/select-json-by-json)
- 🚀 **CDN Bundle (v1)**: [https://keshavsoft.github.io/select-json-by-json/docs/dist/v1/min.js](https://keshavsoft.github.io/select-json-by-json/docs/dist/v1/min.js)
- 🚀 **CDN Bundle (Latest)**: [https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js](https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js)

---

## 📦 Installation & Usage

### 1. NPX (Copy Engine to Project)

Always pulls the highest version dynamically from `src/`:

```bash
# Copies the highest version to ./select-json-by-json
npx select-json-by-json

# Or specify a custom destination:
npx select-json-by-json ./src/lib/select-json-by-json

# Or target a specific version:
npx select-json-by-json ./lib/select --version-target=v1
```

---

### 2. NPM Package

```bash
npm install select-json-by-json
```

```javascript
import { selectJson } from "select-json-by-json";

// Or import a specific version:
import { selectJson } from "select-json-by-json/v1";

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

### 3. CDN (ES Module)

```html
<script type="module">
    import { selectJson } from "https://keshavsoft.github.io/select-json-by-json/docs/dist/min.js";

    const filtered = selectJson(sourceData, {
        DATE: true,
        VOUCHERNUMBER: true
    });

    console.log(filtered);
</script>
```

Also registered on `globalThis.ks["select-json-by-json"]` and `globalThis.ks.selectJson`.

---

## 🛠️ Build Commands

- `npm run build` - Bundles the highest `src/vN` version with Vite into `docs/dist/vN/min.js` and `docs/dist/min.js`.
- `npm test` - Runs Node.js native test suite.
- `npm start` - Runs the demo in `save.js`.
