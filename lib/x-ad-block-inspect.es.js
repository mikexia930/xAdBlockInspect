var c = /* @__PURE__ */ ((a) => (a.Tags = "tags", a.Classnames = "classnames", a.Ids = "ids", a))(c || {});
function x(a, e = {
  popup: {
    text: "检测到存在广告屏蔽类插件，为了不影响您的正常访问，建议将本站加入白名单，并刷新页面。"
  },
  button: {
    isUse: !1,
    text: "知道了"
  }
}) {
  function p(t) {
    var r, o, l;
    const s = document.createElement("button");
    return s.textContent = ((r = e == null ? void 0 : e.button) == null ? void 0 : r.text) || "Confirm", (o = e == null ? void 0 : e.button) != null && o.style && typeof ((l = e == null ? void 0 : e.button) == null ? void 0 : l.style) == "object" && Object.keys(e.button.style).forEach((n) => {
      var d;
      s.style[String(n)] = ((d = e.button.style) == null ? void 0 : d[String(n)]) || "";
    }), s.onclick = function() {
      t.style.display = "none";
    }, s;
  }
  function i() {
    var s, r, o;
    const t = document.createElement("div");
    return t.style.position = "fixed", t.style.left = "0", t.style.top = "0", t.style.zIndex = "10000", t.style.backgroundColor = "rgba(255,72,72,0.9)", t.style.padding = "20px", t.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)", t.style.textAlign = "center", t.style.width = "100%", t.style.fontSize = "16px", t.style.color = "#fff", (s = e == null ? void 0 : e.popup) != null && s.style && typeof ((r = e == null ? void 0 : e.popup) == null ? void 0 : r.style) == "object" && Object.keys(e.popup.style).forEach((l) => {
      var n;
      t.style[String(l)] = ((n = e.popup.style) == null ? void 0 : n[String(l)]) || "";
    }), t.innerHTML = ((o = e == null ? void 0 : e.popup) == null ? void 0 : o.text) || "No prompt text set", e.button.isUse && t.appendChild(p(t)), t;
  }
  function y(t) {
    return new Promise((s, r) => {
      const o = new Image();
      o.onload = function() {
        s(!0);
      }, o.onerror = function(l) {
        r(l);
      }, o.src = t;
    });
  }
  async function m(t) {
    let s = !0;
    for (const r of t)
      if (await y(r).then(() => {
        s = !0;
      }).catch(() => {
        s = !1;
      }), s)
        break;
    return s;
  }
  function b(t, s) {
    return new Promise((r, o) => {
      let l = !1;
      t === "ids" ? l = !!document.getElementById(s) : t === "tags" ? l = !!document.getElementsByTagName(s) : t === "classnames" && (l = !!document.getElementsByClassName(s)), l ? r(!0) : o(!1);
    });
  }
  async function u(t, s) {
    let r = !0;
    for (const o of s)
      if (await b(t, o).then(() => {
        r = !0;
      }).catch(() => {
        r = !1;
      }), r)
        break;
    return r;
  }
  document.addEventListener("DOMContentLoaded", async () => {
    let t = !0;
    t && a.hasOwnProperty("images") && a.images && a.images.length > 0 && (t = await m(a.images)), t && a.hasOwnProperty("dom") && a.dom && (t && a.dom.hasOwnProperty(
      "tags"
      /* Tags */
    ) && (t = await u("tags", a.dom.tags)), t && a.dom.hasOwnProperty(
      "classnames"
      /* Classnames */
    ) && (t = await u("classnames", a.dom.classnames)), t && a.dom.hasOwnProperty(
      "ids"
      /* Ids */
    ) && (t = await u("ids", a.dom.ids))), t || document.body.appendChild(i());
  });
}
export {
  c as EnumInspectDomType,
  x as xAdBlockInspect
};
