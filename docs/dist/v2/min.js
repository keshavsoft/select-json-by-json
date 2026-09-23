//#region src/v2/meta.js
var e = {
	version: "v2.0",
	description: "Modular story-driven JSON projection engine"
}, t = (t) => {
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks["select-json-by-json"] = {
		meta: e,
		selectJson: t
	}, globalThis.ks.selectJson = t);
}, n = ({ inValue: e } = {}) => {
	let t = e;
	return typeof t == "object" && !!t;
}, r = ({ inValue: e } = {}) => {
	let t = e;
	return n({ inValue: t }) && !Array.isArray(t);
}, i = ({ inValue: e } = {}) => {
	let t = e;
	return Array.isArray(t);
}, a = ({ inRule: e } = {}) => {
	let t = e;
	return t === !0 || t === 1;
}, o = ({ inArray: e, inSpec: t } = {}) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => c({
		inSource: e,
		inSpec: r
	})).filter((e) => e !== void 0) : [];
}, s = ({ inSource: e, inSpec: t } = {}) => {
	let n = e, i = t, o = {};
	return Object.entries(i).forEach(([e, t]) => {
		if (e in n) {
			if (a({ inRule: t })) {
				o[e] = n[e];
				return;
			}
			if (r({ inValue: t })) {
				let r = c({
					inSource: n[e],
					inSpec: t
				});
				r !== void 0 && (o[e] = r);
			}
		}
	}), o;
}, c = ({ inSource: e, inSpec: t } = {}) => {
	let a = e, c = t;
	if (n({ inValue: a }) && r({ inValue: c })) return i({ inValue: a }) ? o({
		inArray: a,
		inSpec: c
	}) : s({
		inSource: a,
		inSpec: c
	});
}, l = (e, t) => {
	if (typeof e == "object" && e && !Array.isArray(e) && "inSource" in e && "inSpec" in e) {
		let t = e.inSource, n = e.inSpec;
		return c({
			inSource: t,
			inSpec: n
		});
	}
	return c({
		inSource: e,
		inSpec: t
	});
};
t(l);
//#endregion
export { l as default, l as selectJson, e as meta };
