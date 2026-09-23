//#region src/v1/meta.js
var e = {
	version: "v1.0",
	description: "Select JSON structure using JSON spec projection"
}, t = (t) => {
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks["select-json-by-json"] = {
		meta: e,
		selectJson: t
	}, globalThis.ks.selectJson = t);
}, n = (e) => typeof e == "object" && !!e, r = (e) => n(e) && !Array.isArray(e), i = (e, t) => {
	if (!n(e) || !r(t)) return;
	if (Array.isArray(e)) return e.map((e) => i(e, t)).filter((e) => e !== void 0);
	let a = {};
	return Object.entries(t).forEach(([t, n]) => {
		if (t in e) {
			if (n === !0 || n === 1) {
				a[t] = e[t];
				return;
			}
			if (r(n)) {
				let r = i(e[t], n);
				r !== void 0 && (a[t] = r);
			}
		}
	}), a;
}, a = (e, t) => {
	if (r(e) && "inSource" in e && "inSpec" in e) {
		let t = e.inSource, n = e.inSpec;
		return i(t, n);
	}
	return i(e, t);
};
//#endregion
//#region src/v1/index.js
t(a);
var o = a;
//#endregion
export { o as default, e as meta, a as selectJson };
