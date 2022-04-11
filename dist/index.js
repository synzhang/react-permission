"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var t = require("react");
function r(t) {
  return t && "object" == typeof t && "default" in t ? t : { default: t };
}
var e = r(t),
  n =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {},
  o = function (t) {
    return t && t.Math == Math && t;
  },
  i =
    o("object" == typeof globalThis && globalThis) ||
    o("object" == typeof window && window) ||
    o("object" == typeof self && self) ||
    o("object" == typeof n && n) ||
    (function () {
      return this;
    })() ||
    Function("return this")(),
  u = {},
  c = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  },
  a = !c(function () {
    return (
      7 !=
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1]
    );
  }),
  f = !c(function () {
    var t = function () {}.bind();
    return "function" != typeof t || t.hasOwnProperty("prototype");
  }),
  s = f,
  l = Function.prototype.call,
  p = s
    ? l.bind(l)
    : function () {
        return l.apply(l, arguments);
      },
  y = {},
  b = {}.propertyIsEnumerable,
  v = Object.getOwnPropertyDescriptor,
  h = v && !b.call({ 1: 2 }, 1);
y.f = h
  ? function (t) {
      var r = v(this, t);
      return !!r && r.enumerable;
    }
  : b;
var d,
  g,
  m = function (t, r) {
    return {
      enumerable: !(1 & t),
      configurable: !(2 & t),
      writable: !(4 & t),
      value: r,
    };
  },
  w = f,
  O = Function.prototype,
  S = O.bind,
  E = O.call,
  j = w && S.bind(E, E),
  P = w
    ? function (t) {
        return t && j(t);
      }
    : function (t) {
        return (
          t &&
          function () {
            return E.apply(t, arguments);
          }
        );
      },
  x = P,
  _ = x({}.toString),
  T = x("".slice),
  k = function (t) {
    return T(_(t), 8, -1);
  },
  R = P,
  C = c,
  A = k,
  F = i.Object,
  I = R("".split),
  M = C(function () {
    return !F("z").propertyIsEnumerable(0);
  })
    ? function (t) {
        return "String" == A(t) ? I(t, "") : F(t);
      }
    : F,
  L = i.TypeError,
  z = function (t) {
    if (null == t) throw L("Can't call method on " + t);
    return t;
  },
  U = M,
  D = z,
  N = function (t) {
    return U(D(t));
  },
  W = function (t) {
    return "function" == typeof t;
  },
  G = W,
  q = function (t) {
    return "object" == typeof t ? null !== t : G(t);
  },
  B = i,
  K = W,
  V = function (t) {
    return K(t) ? t : void 0;
  },
  X = function (t, r) {
    return arguments.length < 2 ? V(B[t]) : B[t] && B[t][r];
  },
  Y = P({}.isPrototypeOf),
  $ = i,
  H = X("navigator", "userAgent") || "",
  J = $.process,
  Q = $.Deno,
  Z = (J && J.versions) || (Q && Q.version),
  tt = Z && Z.v8;
tt && (g = (d = tt.split("."))[0] > 0 && d[0] < 4 ? 1 : +(d[0] + d[1])),
  !g &&
    H &&
    (!(d = H.match(/Edge\/(\d+)/)) || d[1] >= 74) &&
    (d = H.match(/Chrome\/(\d+)/)) &&
    (g = +d[1]);
var rt = g,
  et = c,
  nt =
    !!Object.getOwnPropertySymbols &&
    !et(function () {
      var t = Symbol();
      return (
        !String(t) ||
        !(Object(t) instanceof Symbol) ||
        (!Symbol.sham && rt && rt < 41)
      );
    }),
  ot = nt && !Symbol.sham && "symbol" == typeof Symbol.iterator,
  it = X,
  ut = W,
  ct = Y,
  at = ot,
  ft = i.Object,
  st = at
    ? function (t) {
        return "symbol" == typeof t;
      }
    : function (t) {
        var r = it("Symbol");
        return ut(r) && ct(r.prototype, ft(t));
      },
  lt = i.String,
  pt = W,
  yt = function (t) {
    try {
      return lt(t);
    } catch (t) {
      return "Object";
    }
  },
  bt = i.TypeError,
  vt = function (t) {
    if (pt(t)) return t;
    throw bt(yt(t) + " is not a function");
  },
  ht = p,
  dt = W,
  gt = q,
  mt = i.TypeError,
  wt = { exports: {} },
  Ot = i,
  St = Object.defineProperty,
  Et = function (t, r) {
    try {
      St(Ot, t, { value: r, configurable: !0, writable: !0 });
    } catch (e) {
      Ot[t] = r;
    }
    return r;
  },
  jt = Et,
  Pt = i["__core-js_shared__"] || jt("__core-js_shared__", {}),
  xt = Pt;
(wt.exports = function (t, r) {
  return xt[t] || (xt[t] = void 0 !== r ? r : {});
})("versions", []).push({
  version: "3.21.1",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",
  source: "https://github.com/zloirock/core-js",
});
var _t = z,
  Tt = i.Object,
  kt = function (t) {
    return Tt(_t(t));
  },
  Rt = P({}.hasOwnProperty),
  Ct =
    Object.hasOwn ||
    function (t, r) {
      return Rt(kt(t), r);
    },
  At = P,
  Ft = 0,
  It = Math.random(),
  Mt = At((1).toString),
  Lt = function (t) {
    return "Symbol(" + (void 0 === t ? "" : t) + ")_" + Mt(++Ft + It, 36);
  },
  zt = i,
  Ut = wt.exports,
  Dt = Ct,
  Nt = Lt,
  Wt = nt,
  Gt = ot,
  qt = Ut("wks"),
  Bt = zt.Symbol,
  Kt = Bt && Bt.for,
  Vt = Gt ? Bt : (Bt && Bt.withoutSetter) || Nt,
  Xt = function (t) {
    if (!Dt(qt, t) || (!Wt && "string" != typeof qt[t])) {
      var r = "Symbol." + t;
      Wt && Dt(Bt, t) ? (qt[t] = Bt[t]) : (qt[t] = Gt && Kt ? Kt(r) : Vt(r));
    }
    return qt[t];
  },
  Yt = p,
  $t = q,
  Ht = st,
  Jt = function (t, r) {
    var e = t[r];
    return null == e ? void 0 : vt(e);
  },
  Qt = function (t, r) {
    var e, n;
    if ("string" === r && dt((e = t.toString)) && !gt((n = ht(e, t)))) return n;
    if (dt((e = t.valueOf)) && !gt((n = ht(e, t)))) return n;
    if ("string" !== r && dt((e = t.toString)) && !gt((n = ht(e, t)))) return n;
    throw mt("Can't convert object to primitive value");
  },
  Zt = Xt,
  tr = i.TypeError,
  rr = Zt("toPrimitive"),
  er = function (t, r) {
    if (!$t(t) || Ht(t)) return t;
    var e,
      n = Jt(t, rr);
    if (n) {
      if ((void 0 === r && (r = "default"), (e = Yt(n, t, r)), !$t(e) || Ht(e)))
        return e;
      throw tr("Can't convert object to primitive value");
    }
    return void 0 === r && (r = "number"), Qt(t, r);
  },
  nr = st,
  or = function (t) {
    var r = er(t, "string");
    return nr(r) ? r : r + "";
  },
  ir = q,
  ur = i.document,
  cr = ir(ur) && ir(ur.createElement),
  ar = function (t) {
    return cr ? ur.createElement(t) : {};
  },
  fr =
    !a &&
    !c(function () {
      return (
        7 !=
        Object.defineProperty(ar("div"), "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
  sr = a,
  lr = p,
  pr = y,
  yr = m,
  br = N,
  vr = or,
  hr = Ct,
  dr = fr,
  gr = Object.getOwnPropertyDescriptor;
u.f = sr
  ? gr
  : function (t, r) {
      if (((t = br(t)), (r = vr(r)), dr))
        try {
          return gr(t, r);
        } catch (t) {}
      if (hr(t, r)) return yr(!lr(pr.f, t, r), t[r]);
    };
var mr = {},
  wr =
    a &&
    c(function () {
      return (
        42 !=
        Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: !1,
        }).prototype
      );
    }),
  Or = i,
  Sr = q,
  Er = Or.String,
  jr = Or.TypeError,
  Pr = function (t) {
    if (Sr(t)) return t;
    throw jr(Er(t) + " is not an object");
  },
  xr = a,
  _r = fr,
  Tr = wr,
  kr = Pr,
  Rr = or,
  Cr = i.TypeError,
  Ar = Object.defineProperty,
  Fr = Object.getOwnPropertyDescriptor;
mr.f = xr
  ? Tr
    ? function (t, r, e) {
        if (
          (kr(t),
          (r = Rr(r)),
          kr(e),
          "function" == typeof t &&
            "prototype" === r &&
            "value" in e &&
            "writable" in e &&
            !e.writable)
        ) {
          var n = Fr(t, r);
          n &&
            n.writable &&
            ((t[r] = e.value),
            (e = {
              configurable:
                "configurable" in e ? e.configurable : n.configurable,
              enumerable: "enumerable" in e ? e.enumerable : n.enumerable,
              writable: !1,
            }));
        }
        return Ar(t, r, e);
      }
    : Ar
  : function (t, r, e) {
      if ((kr(t), (r = Rr(r)), kr(e), _r))
        try {
          return Ar(t, r, e);
        } catch (t) {}
      if ("get" in e || "set" in e) throw Cr("Accessors not supported");
      return "value" in e && (t[r] = e.value), t;
    };
var Ir = mr,
  Mr = m,
  Lr = a
    ? function (t, r, e) {
        return Ir.f(t, r, Mr(1, e));
      }
    : function (t, r, e) {
        return (t[r] = e), t;
      },
  zr = { exports: {} },
  Ur = W,
  Dr = Pt,
  Nr = P(Function.toString);
Ur(Dr.inspectSource) ||
  (Dr.inspectSource = function (t) {
    return Nr(t);
  });
var Wr,
  Gr,
  qr,
  Br = Dr.inspectSource,
  Kr = W,
  Vr = Br,
  Xr = i.WeakMap,
  Yr = Kr(Xr) && /native code/.test(Vr(Xr)),
  $r = wt.exports,
  Hr = Lt,
  Jr = $r("keys"),
  Qr = {},
  Zr = Yr,
  te = i,
  re = P,
  ee = q,
  ne = Lr,
  oe = Ct,
  ie = Pt,
  ue = function (t) {
    return Jr[t] || (Jr[t] = Hr(t));
  },
  ce = Qr,
  ae = te.TypeError,
  fe = te.WeakMap;
if (Zr || ie.state) {
  var se = ie.state || (ie.state = new fe()),
    le = re(se.get),
    pe = re(se.has),
    ye = re(se.set);
  (Wr = function (t, r) {
    if (pe(se, t)) throw new ae("Object already initialized");
    return (r.facade = t), ye(se, t, r), r;
  }),
    (Gr = function (t) {
      return le(se, t) || {};
    }),
    (qr = function (t) {
      return pe(se, t);
    });
} else {
  var be = ue("state");
  (ce[be] = !0),
    (Wr = function (t, r) {
      if (oe(t, be)) throw new ae("Object already initialized");
      return (r.facade = t), ne(t, be, r), r;
    }),
    (Gr = function (t) {
      return oe(t, be) ? t[be] : {};
    }),
    (qr = function (t) {
      return oe(t, be);
    });
}
var ve = {
    set: Wr,
    get: Gr,
    has: qr,
    enforce: function (t) {
      return qr(t) ? Gr(t) : Wr(t, {});
    },
    getterFor: function (t) {
      return function (r) {
        var e;
        if (!ee(r) || (e = Gr(r)).type !== t)
          throw ae("Incompatible receiver, " + t + " required");
        return e;
      };
    },
  },
  he = a,
  de = Ct,
  ge = Function.prototype,
  me = he && Object.getOwnPropertyDescriptor,
  we = de(ge, "name"),
  Oe = we && "something" === function () {}.name,
  Se = we && (!he || (he && me(ge, "name").configurable)),
  Ee = i,
  je = W,
  Pe = Ct,
  xe = Lr,
  _e = Et,
  Te = Br,
  ke = { EXISTS: we, PROPER: Oe, CONFIGURABLE: Se }.CONFIGURABLE,
  Re = ve.get,
  Ce = ve.enforce,
  Ae = String(String).split("String");
(zr.exports = function (t, r, e, n) {
  var o,
    i = !!n && !!n.unsafe,
    u = !!n && !!n.enumerable,
    c = !!n && !!n.noTargetGet,
    a = n && void 0 !== n.name ? n.name : r;
  je(e) &&
    ("Symbol(" === String(a).slice(0, 7) &&
      (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
    (!Pe(e, "name") || (ke && e.name !== a)) && xe(e, "name", a),
    (o = Ce(e)).source || (o.source = Ae.join("string" == typeof a ? a : ""))),
    t !== Ee
      ? (i ? !c && t[r] && (u = !0) : delete t[r], u ? (t[r] = e) : xe(t, r, e))
      : u
      ? (t[r] = e)
      : _e(r, e);
})(Function.prototype, "toString", function () {
  return (je(this) && Re(this).source) || Te(this);
});
var Fe = {},
  Ie = Math.ceil,
  Me = Math.floor,
  Le = function (t) {
    var r = +t;
    return r != r || 0 === r ? 0 : (r > 0 ? Me : Ie)(r);
  },
  ze = Le,
  Ue = Math.max,
  De = Math.min,
  Ne = Le,
  We = Math.min,
  Ge = function (t) {
    return t > 0 ? We(Ne(t), 9007199254740991) : 0;
  },
  qe = N,
  Be = function (t, r) {
    var e = ze(t);
    return e < 0 ? Ue(e + r, 0) : De(e, r);
  },
  Ke = function (t) {
    return Ge(t.length);
  },
  Ve = function (t) {
    return function (r, e, n) {
      var o,
        i = qe(r),
        u = Ke(i),
        c = Be(n, u);
      if (t && e != e) {
        for (; u > c; ) if ((o = i[c++]) != o) return !0;
      } else
        for (; u > c; c++) if ((t || c in i) && i[c] === e) return t || c || 0;
      return !t && -1;
    };
  },
  Xe = { includes: Ve(!0), indexOf: Ve(!1) },
  Ye = Ct,
  $e = N,
  He = Xe.indexOf,
  Je = Qr,
  Qe = P([].push),
  Ze = function (t, r) {
    var e,
      n = $e(t),
      o = 0,
      i = [];
    for (e in n) !Ye(Je, e) && Ye(n, e) && Qe(i, e);
    for (; r.length > o; ) Ye(n, (e = r[o++])) && (~He(i, e) || Qe(i, e));
    return i;
  },
  tn = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ].concat("length", "prototype");
Fe.f =
  Object.getOwnPropertyNames ||
  function (t) {
    return Ze(t, tn);
  };
var rn = {};
rn.f = Object.getOwnPropertySymbols;
var en = X,
  nn = Fe,
  on = rn,
  un = Pr,
  cn = P([].concat),
  an =
    en("Reflect", "ownKeys") ||
    function (t) {
      var r = nn.f(un(t)),
        e = on.f;
      return e ? cn(r, e(t)) : r;
    },
  fn = Ct,
  sn = an,
  ln = u,
  pn = mr,
  yn = function (t, r, e) {
    for (var n = sn(r), o = pn.f, i = ln.f, u = 0; u < n.length; u++) {
      var c = n[u];
      fn(t, c) || (e && fn(e, c)) || o(t, c, i(r, c));
    }
  },
  bn = c,
  vn = W,
  hn = /#|\.prototype\./,
  dn = function (t, r) {
    var e = mn[gn(t)];
    return e == On || (e != wn && (vn(r) ? bn(r) : !!r));
  },
  gn = (dn.normalize = function (t) {
    return String(t).replace(hn, ".").toLowerCase();
  }),
  mn = (dn.data = {}),
  wn = (dn.NATIVE = "N"),
  On = (dn.POLYFILL = "P"),
  Sn = dn,
  En = i,
  jn = u.f,
  Pn = Lr,
  xn = zr.exports,
  _n = Et,
  Tn = yn,
  kn = Sn,
  Rn = function (t, r) {
    var e,
      n,
      o,
      i,
      u,
      c = t.target,
      a = t.global,
      f = t.stat;
    if ((e = a ? En : f ? En[c] || _n(c, {}) : (En[c] || {}).prototype))
      for (n in r) {
        if (
          ((i = r[n]),
          (o = t.noTargetGet ? (u = jn(e, n)) && u.value : e[n]),
          !kn(a ? n : c + (f ? "." : "#") + n, t.forced) && void 0 !== o)
        ) {
          if (typeof i == typeof o) continue;
          Tn(i, o);
        }
        (t.sham || (o && o.sham)) && Pn(i, "sham", !0), xn(e, n, i, t);
      }
  },
  Cn = f,
  An = Function.prototype,
  Fn = An.apply,
  In = An.call,
  Mn =
    ("object" == typeof Reflect && Reflect.apply) ||
    (Cn
      ? In.bind(Fn)
      : function () {
          return In.apply(Fn, arguments);
        }),
  Ln = i,
  zn = W,
  Un = Ln.String,
  Dn = Ln.TypeError,
  Nn = P,
  Wn = Pr,
  Gn = function (t) {
    if ("object" == typeof t || zn(t)) return t;
    throw Dn("Can't set " + Un(t) + " as a prototype");
  },
  qn =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          var t,
            r = !1,
            e = {};
          try {
            (t = Nn(
              Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set
            ))(e, []),
              (r = e instanceof Array);
          } catch (t) {}
          return function (e, n) {
            return Wn(e), Gn(n), r ? t(e, n) : (e.__proto__ = n), e;
          };
        })()
      : void 0),
  Bn = W,
  Kn = q,
  Vn = qn,
  Xn = {};
Xn[Xt("toStringTag")] = "z";
var Yn = i,
  $n = "[object z]" === String(Xn),
  Hn = W,
  Jn = k,
  Qn = Xt("toStringTag"),
  Zn = Yn.Object,
  to =
    "Arguments" ==
    Jn(
      (function () {
        return arguments;
      })()
    ),
  ro = $n
    ? Jn
    : function (t) {
        var r, e, n;
        return void 0 === t
          ? "Undefined"
          : null === t
          ? "Null"
          : "string" ==
            typeof (e = (function (t, r) {
              try {
                return t[r];
              } catch (t) {}
            })((r = Zn(t)), Qn))
          ? e
          : to
          ? Jn(r)
          : "Object" == (n = Jn(r)) && Hn(r.callee)
          ? "Arguments"
          : n;
      },
  eo = i.String,
  no = function (t) {
    if ("Symbol" === ro(t))
      throw TypeError("Cannot convert a Symbol value to a string");
    return eo(t);
  },
  oo = no,
  io = q,
  uo = Lr,
  co = P("".replace),
  ao = String(Error("zxcasd").stack),
  fo = /\n\s*at [^:]*:[^\n]*/,
  so = fo.test(ao),
  lo = m,
  po = !c(function () {
    var t = Error("a");
    return (
      !("stack" in t) ||
      (Object.defineProperty(t, "stack", lo(1, 7)), 7 !== t.stack)
    );
  }),
  yo = X,
  bo = Ct,
  vo = Lr,
  ho = Y,
  go = qn,
  mo = yn,
  wo = function (t, r, e) {
    var n, o;
    return (
      Vn &&
        Bn((n = r.constructor)) &&
        n !== e &&
        Kn((o = n.prototype)) &&
        o !== e.prototype &&
        Vn(t, o),
      t
    );
  },
  Oo = function (t, r) {
    return void 0 === t ? (arguments.length < 2 ? "" : r) : oo(t);
  },
  So = function (t, r) {
    io(r) && "cause" in r && uo(t, "cause", r.cause);
  },
  Eo = function (t, r) {
    if (so && "string" == typeof t) for (; r--; ) t = co(t, fo, "");
    return t;
  },
  jo = po,
  Po = Rn,
  xo = Mn,
  _o = function (t, r, e, n) {
    var o = n ? 2 : 1,
      i = t.split("."),
      u = i[i.length - 1],
      c = yo.apply(null, i);
    if (c) {
      var a = c.prototype;
      if ((bo(a, "cause") && delete a.cause, !e)) return c;
      var f = yo("Error"),
        s = r(function (t, r) {
          var e = Oo(n ? r : t, void 0),
            i = n ? new c(t) : new c();
          return (
            void 0 !== e && vo(i, "message", e),
            jo && vo(i, "stack", Eo(i.stack, 2)),
            this && ho(a, this) && wo(i, this, s),
            arguments.length > o && So(i, arguments[o]),
            i
          );
        });
      (s.prototype = a),
        "Error" !== u && (go ? go(s, f) : mo(s, f, { name: !0 })),
        mo(s, c);
      try {
        a.name !== u && vo(a, "name", u), (a.constructor = s);
      } catch (t) {}
      return s;
    }
  },
  To = i.WebAssembly,
  ko = 7 !== Error("e", { cause: 7 }).cause,
  Ro = function (t, r) {
    var e = {};
    (e[t] = _o(t, r, ko)), Po({ global: !0, forced: ko }, e);
  },
  Co = function (t, r) {
    if (To && To[t]) {
      var e = {};
      (e[t] = _o("WebAssembly." + t, r, ko)),
        Po({ target: "WebAssembly", stat: !0, forced: ko }, e);
    }
  };
Ro("Error", function (t) {
  return function (r) {
    return xo(t, this, arguments);
  };
}),
  Ro("EvalError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Ro("RangeError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Ro("ReferenceError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Ro("SyntaxError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Ro("TypeError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Ro("URIError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Co("CompileError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Co("LinkError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  }),
  Co("RuntimeError", function (t) {
    return function (r) {
      return xo(t, this, arguments);
    };
  });
var Ao = q,
  Fo = k,
  Io = Xt("match"),
  Mo = function (t) {
    var r;
    return Ao(t) && (void 0 !== (r = t[Io]) ? !!r : "RegExp" == Fo(t));
  },
  Lo = i.TypeError,
  zo = Xt("match"),
  Uo = Rn,
  Do = function (t) {
    if (Mo(t)) throw Lo("The method doesn't accept regular expressions");
    return t;
  },
  No = z,
  Wo = no,
  Go = function (t) {
    var r = /./;
    try {
      "/./"[t](r);
    } catch (e) {
      try {
        return (r[zo] = !1), "/./"[t](r);
      } catch (t) {}
    }
    return !1;
  },
  qo = P("".indexOf);
Uo(
  { target: "String", proto: !0, forced: !Go("includes") },
  {
    includes: function (t) {
      return !!~qo(
        Wo(No(this)),
        Wo(Do(t)),
        arguments.length > 1 ? arguments[1] : void 0
      );
    },
  }
);
const Bo = t.createContext({});
var Ko;
(exports.ROLES = void 0),
  ((Ko = exports.ROLES || (exports.ROLES = {})).ADMIN = "ADMIN"),
  (Ko.USER = "USER");
const Vo = () => {
  const { currentUser: r } = (() => {
    const r = t.useContext(Bo);
    if (void 0 === r)
      throw new Error("useContext must be used within a Provider");
    return r;
  })();
  if (!r) throw Error("User does not exist!");
  return {
    checkAccess: t.useCallback(
      (t) => {
        let { allowedRoles: e } = t;
        return !((null == e ? void 0 : e.length) > 0) || e.includes(r.role);
      },
      [r.role]
    ),
    role: r.role,
  };
};
(exports.PermissionProvider = (t) => {
  let { roles: r, policies: n, currentUser: o, children: i } = t;
  return e.default.createElement(
    Bo.Provider,
    { value: { roles: r, policies: n, currentUser: o } },
    i
  );
}),
  (exports.default = (t) => {
    let {
      policyCheck: r,
      allowedRoles: n,
      forbiddenFallback: o = null,
      children: i,
    } = t;
    const { checkAccess: u } = Vo();
    let c = !1;
    return (
      n && (c = u({ allowedRoles: n })),
      void 0 !== r && (c = r),
      e.default.createElement(e.default.Fragment, null, c ? i : o)
    );
  });
//# sourceMappingURL=index.js.map
