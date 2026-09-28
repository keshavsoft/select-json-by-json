//#region src/v7/03-inspect.js
var e = ({ inValue: e } = {}) => typeof e == "object" && !!e, t = ({ inValue: e } = {}) => Array.isArray(e), n = ({ inValue: n } = {}) => e({ inValue: n }) && !t({ inValue: n }), r = ({ inValue: e } = {}) => t({ inValue: e }) ? {
	type: "array",
	isArray: !0,
	isObject: !0
} : n({ inValue: e }) ? {
	type: "object",
	isArray: !1,
	isObject: !0
} : {
	type: typeof e,
	isArray: !1,
	isObject: !1
}, i = ({ inValue: e } = {}) => typeof e == "object" && !!e, a = ({ inValue: e } = {}) => Array.isArray(e), o = ({ inValue: e, inSelect: t } = {}) => {
	if (!i({ inValue: e }) || !i({ inValue: t })) return e;
	let n = {};
	return Object.entries(t).forEach(([t, r]) => {
		if (!Object.prototype.hasOwnProperty.call(e, t)) return;
		let s = e[t];
		if (r === !0) {
			n[t] = s;
			return;
		}
		if (i({ inValue: r })) {
			if (a({ inValue: s })) {
				n[t] = s.map((e) => o({
					inValue: e,
					inSelect: r
				}));
				return;
			}
			i({ inValue: s }) && (n[t] = o({
				inValue: s,
				inSelect: r
			}));
		}
	}), n;
}, s = ({ inValue: e, inRename: t } = {}) => {
	if (!i({ inValue: e }) || !i({ inValue: t })) return e;
	let n = {};
	return Object.entries(e).forEach(([e, r]) => {
		let o = t[e] ?? e;
		if (a({ inValue: r })) {
			n[o] = r.map((e) => typeof e == "object" && e ? s({
				inValue: e,
				inRename: t
			}) : e);
			return;
		}
		if (i({ inValue: r })) {
			n[o] = s({
				inValue: r,
				inRename: t
			});
			return;
		}
		n[o] = r;
	}), n;
}, c = ({ inValue: e, inSelect: t, inActionType: n } = {}) => n === "renameKey" ? s({
	inValue: e,
	inRename: t
}) : o({
	inValue: e,
	inSelect: t
}), l = ({ inValue: e, inSelect: t, inActionType: n } = {}) => !e || typeof e != "object" ? e : c({
	inValue: e,
	inSelect: t,
	inActionType: n
}), u = ({ inValue: e, inSelect: t, inActionType: n } = {}) => Array.isArray(e) ? e.map((e) => typeof e == "object" && e ? c({
	inValue: e,
	inSelect: t,
	inActionType: n
}) : e) : e, d = ({ inValue: e, inSelect: t, inActionType: n, inspected: r } = {}) => r?.type === "array" ? u({
	inValue: e,
	inSelect: t,
	inActionType: n
}) : r?.type === "object" ? l({
	inValue: e,
	inSelect: t,
	inActionType: n
}) : e, f = (e, t, n) => {
	let i = e;
	return d({
		inValue: i,
		inSelect: t,
		inActionType: n ?? "visibility",
		inspected: r({ inValue: i })
	});
}, p = {
	version: "v7.0",
	description: "Modular story-driven JSON projection engine — actionType: visibility | renameKey"
};
//#endregion
//#region src/v7/index.js
((e) => {
	let t = typeof e == "function" ? e : e?.inFuncDefinition;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks["select-json-by-json"] = {
		meta: p,
		selectJson: t
	}, globalThis.ks.selectJson = t);
})({ inFuncDefinition: f });
var m = f;
//#endregion
export { m as default, p as meta, f as selectJson };
