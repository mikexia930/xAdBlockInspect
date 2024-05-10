var P = /* @__PURE__ */ ((o) => (o.Tags = "tags", o.Classnames = "classnames", o.Ids = "ids", o))(P || {});
function k(o, u) {
  function m(a, t) {
    for (const s in t)
      t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null && !Array.isArray(t[s]) ? (a[s] || (a[s] = {}), m(a[s], t[s])) : a[s] = t[s] || "");
    return a;
  }
  let e = {
    popup: {
      isUse: !0,
      repeat: {
        isUse: !0,
        time: 5e3
      },
      text: "检测到存在广告屏蔽类插件，为了不影响您的正常访问，建议将本站加入白名单，并刷新页面。",
      styles: {
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "10000",
        backgroundColor: "rgba(255,72,72,0.95)",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "100%",
        fontSize: "16px",
        color: "#fff"
      }
    },
    button: {
      isUse: !1,
      text: "知道了",
      styles: {
        marginLeft: "12px"
      }
    }
  };
  u && (e = m(e, u));
  let c = null;
  function f(a) {
    var t, s, n, r;
    a.style.display = "none", (s = (t = e == null ? void 0 : e.popup) == null ? void 0 : t.repeat) != null && s.isUse && (c && (clearTimeout(c), c = null), c = setTimeout(() => {
      a.style.display = "block";
    }, ((r = (n = e == null ? void 0 : e.popup) == null ? void 0 : n.repeat) == null ? void 0 : r.time) || 5e3));
  }
  function y(a) {
    var s, n, r;
    const t = document.createElement("button");
    return t.classList.add("ad-block-inspect-popup-close-btn"), t.textContent = ((s = e == null ? void 0 : e.button) == null ? void 0 : s.text) || "Confirm", (n = e == null ? void 0 : e.button) != null && n.styles && typeof ((r = e == null ? void 0 : e.button) == null ? void 0 : r.styles) == "object" && Object.keys(e.button.styles).forEach((i) => {
      var l, p;
      t.style[String(i)] = ((p = (l = e == null ? void 0 : e.button) == null ? void 0 : l.styles) == null ? void 0 : p[String(i)]) || "";
    }), t.onclick = () => {
      f(a);
    }, t;
  }
  function b() {
    var t, s, n, r;
    const a = document.createElement("div");
    return (t = e == null ? void 0 : e.popup) != null && t.styles && typeof ((s = e == null ? void 0 : e.popup) == null ? void 0 : s.styles) == "object" && Object.keys(e.popup.styles).forEach((i) => {
      var l, p;
      a.style[String(i)] = ((p = (l = e == null ? void 0 : e.popup) == null ? void 0 : l.styles) == null ? void 0 : p[String(i)]) || "";
    }), a.classList.add("ad-block-inspect-popup"), a.innerHTML = ((n = e == null ? void 0 : e.popup) == null ? void 0 : n.text) || "No prompt text set", (r = e == null ? void 0 : e.button) != null && r.isUse ? a.appendChild(y(a)) : a.onclick = () => {
      f(a);
    }, a;
  }
  function w(a) {
    return new Promise((t, s) => {
      const n = new Image();
      n.onload = function() {
        t(!0);
      }, n.onerror = function(r) {
        s(r);
      }, n.src = a;
    });
  }
  async function h(a) {
    let t = !0;
    for (const s of a)
      if (await w(s).then(() => {
        t = !0;
      }).catch(() => {
        t = !1;
      }), t)
        break;
    return t;
  }
  function x(a, t) {
    return new Promise((s, n) => {
      let r = !1;
      a === "ids" ? r = !!document.getElementById(t) : a === "tags" ? r = !!document.getElementsByTagName(t) : a === "classnames" && (r = !!document.getElementsByClassName(t)), r ? s(!0) : n(!1);
    });
  }
  async function d(a, t) {
    let s = !0;
    for (const n of t)
      if (await x(a, n).then(() => {
        s = !0;
      }).catch(() => {
        s = !1;
      }), s)
        break;
    return s;
  }
  return new Promise((a) => {
    document.addEventListener("DOMContentLoaded", async () => {
      var s;
      let t = !0;
      t && o.hasOwnProperty("images") && o.images && o.images.length > 0 && (t = await h(o.images)), t && o.hasOwnProperty("dom") && o.dom && (t && o.dom.hasOwnProperty(
        "tags"
        /* Tags */
      ) && (t = await d("tags", o.dom.tags)), t && o.dom.hasOwnProperty(
        "classnames"
        /* Classnames */
      ) && (t = await d("classnames", o.dom.classnames)), t && o.dom.hasOwnProperty(
        "ids"
        /* Ids */
      ) && (t = await d("ids", o.dom.ids))), !t && ((s = e == null ? void 0 : e.popup) != null && s.isUse) && document.body.appendChild(b()), a(t);
    });
  });
}
export {
  P as EnumInspectDomType,
  k as adBlockInspect
};
