import t, {
  createContext as r,
  useContext as n,
  useCallback as e,
} from "react";
var o =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {},
  i = function (t) {
    return t && t.Math == Math && t;
  },
  u =
    i("object" == typeof globalThis && globalThis) ||
    i("object" == typeof window && window) ||
    i("object" == typeof self && self) ||
    i("object" == typeof o && o) ||
    (function () {
      return this;
    })() ||
    Function("return this")(),
  c = {},
  a = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  },
  f = !a(function () {
    return (
      7 !=
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1]
    );
  }),
  s = !a(function () {
    var t = function () {}.bind();
    return "function" != typeof t || t.hasOwnProperty("prototype");
  }),
  l = s,
  p = Function.prototype.call,
  y = l
    ? p.bind(p)
    : function () {
        return p.apply(p, arguments);
      },
  b = {},
  h = {}.propertyIsEnumerable,
  v = Object.getOwnPropertyDescriptor,
  g = v && !h.call({ 1: 2 }, 1);
b.f = g
  ? function (t) {
      var r = v(this, t);
      return !!r && r.enumerable;
    }
  : h;
var d,
  m,
  w = function (t, r) {
    return {
      enumerable: !(1 & t),
      configurable: !(2 & t),
      writable: !(4 & t),
      value: r,
    };
  },
  O = s,
  S = Function.prototype,
  E = S.bind,
  j = S.call,
  P = O && E.bind(j, j),
  _ = O
    ? function (t) {
        return t && P(t);
      }
    : function (t) {
        return (
          t &&
          function () {
            return j.apply(t, arguments);
          }
        );
      },
  T = _,
  k = T({}.toString),
  x = T("".slice),
  R = function (t) {
    return x(k(t), 8, -1);
  },
  A = _,
  C = a,
  F = R,
  I = u.Object,
  M = A("".split),
  z = C(function () {
    return !I("z").propertyIsEnumerable(0);
  })
    ? function (t) {
        return "String" == F(t) ? M(t, "") : I(t);
      }
    : I,
  U = u.TypeError,
  D = function (t) {
    if (null == t) throw U("Can't call method on " + t);
    return t;
  },
  L = z,
  N = D,
  W = function (t) {
    return L(N(t));
  },
  G = function (t) {
    return "function" == typeof t;
  },
  B = G,
  q = function (t) {
    return "object" == typeof t ? null !== t : B(t);
  },
  K = u,
  V = G,
  X = function (t) {
    return V(t) ? t : void 0;
  },
  Y = function (t, r) {
    return arguments.length < 2 ? X(K[t]) : K[t] && K[t][r];
  },
  $ = _({}.isPrototypeOf),
  H = u,
  J = Y("navigator", "userAgent") || "",
  Q = H.process,
  Z = H.Deno,
  tt = (Q && Q.versions) || (Z && Z.version),
  rt = tt && tt.v8;
rt && (m = (d = rt.split("."))[0] > 0 && d[0] < 4 ? 1 : +(d[0] + d[1])),
  !m &&
    J &&
    (!(d = J.match(/Edge\/(\d+)/)) || d[1] >= 74) &&
    (d = J.match(/Chrome\/(\d+)/)) &&
    (m = +d[1]);
var nt = m,
  et = a,
  ot =
    !!Object.getOwnPropertySymbols &&
    !et(function () {
      var t = Symbol();
      return (
        !String(t) ||
        !(Object(t) instanceof Symbol) ||
        (!Symbol.sham && nt && nt < 41)
      );
    }),
  it = ot && !Symbol.sham && "symbol" == typeof Symbol.iterator,
  ut = Y,
  ct = G,
  at = $,
  ft = it,
  st = u.Object,
  lt = ft
    ? function (t) {
        return "symbol" == typeof t;
      }
    : function (t) {
        var r = ut("Symbol");
        return ct(r) && at(r.prototype, st(t));
      },
  pt = u.String,
  yt = G,
  bt = function (t) {
    try {
      return pt(t);
    } catch (t) {
      return "Object";
    }
  },
  ht = u.TypeError,
  vt = function (t) {
    if (yt(t)) return t;
    throw ht(bt(t) + " is not a function");
  },
  gt = y,
  dt = G,
  mt = q,
  wt = u.TypeError,
  Ot = { exports: {} },
  St = u,
  Et = Object.defineProperty,
  jt = function (t, r) {
    try {
      Et(St, t, { value: r, configurable: !0, writable: !0 });
    } catch (n) {
      St[t] = r;
    }
    return r;
  },
  Pt = jt,
  _t = u["__core-js_shared__"] || Pt("__core-js_shared__", {}),
  Tt = _t;
(Ot.exports = function (t, r) {
  return Tt[t] || (Tt[t] = void 0 !== r ? r : {});
})("versions", []).push({
  version: "3.21.1",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",
  source: "https://github.com/zloirock/core-js",
});
var kt = D,
  xt = u.Object,
  Rt = function (t) {
    return xt(kt(t));
  },
  At = _({}.hasOwnProperty),
  Ct =
    Object.hasOwn ||
    function (t, r) {
      return At(Rt(t), r);
    },
  Ft = _,
  It = 0,
  Mt = Math.random(),
  zt = Ft((1).toString),
  Ut = function (t) {
    return "Symbol(" + (void 0 === t ? "" : t) + ")_" + zt(++It + Mt, 36);
  },
  Dt = u,
  Lt = Ot.exports,
  Nt = Ct,
  Wt = Ut,
  Gt = ot,
  Bt = it,
  qt = Lt("wks"),
  Kt = Dt.Symbol,
  Vt = Kt && Kt.for,
  Xt = Bt ? Kt : (Kt && Kt.withoutSetter) || Wt,
  Yt = function (t) {
    if (!Nt(qt, t) || (!Gt && "string" != typeof qt[t])) {
      var r = "Symbol." + t;
      Gt && Nt(Kt, t) ? (qt[t] = Kt[t]) : (qt[t] = Bt && Vt ? Vt(r) : Xt(r));
    }
    return qt[t];
  },
  $t = y,
  Ht = q,
  Jt = lt,
  Qt = function (t, r) {
    var n = t[r];
    return null == n ? void 0 : vt(n);
  },
  Zt = function (t, r) {
    var n, e;
    if ("string" === r && dt((n = t.toString)) && !mt((e = gt(n, t)))) return e;
    if (dt((n = t.valueOf)) && !mt((e = gt(n, t)))) return e;
    if ("string" !== r && dt((n = t.toString)) && !mt((e = gt(n, t)))) return e;
    throw wt("Can't convert object to primitive value");
  },
  tr = Yt,
  rr = u.TypeError,
  nr = tr("toPrimitive"),
  er = function (t, r) {
    if (!Ht(t) || Jt(t)) return t;
    var n,
      e = Qt(t, nr);
    if (e) {
      if ((void 0 === r && (r = "default"), (n = $t(e, t, r)), !Ht(n) || Jt(n)))
        return n;
      throw rr("Can't convert object to primitive value");
    }
    return void 0 === r && (r = "number"), Zt(t, r);
  },
  or = lt,
  ir = function (t) {
    var r = er(t, "string");
    return or(r) ? r : r + "";
  },
  ur = q,
  cr = u.document,
  ar = ur(cr) && ur(cr.createElement),
  fr = function (t) {
    return ar ? cr.createElement(t) : {};
  },
  sr =
    !f &&
    !a(function () {
      return (
        7 !=
        Object.defineProperty(fr("div"), "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
  lr = f,
  pr = y,
  yr = b,
  br = w,
  hr = W,
  vr = ir,
  gr = Ct,
  dr = sr,
  mr = Object.getOwnPropertyDescriptor;
c.f = lr
  ? mr
  : function (t, r) {
      if (((t = hr(t)), (r = vr(r)), dr))
        try {
          return mr(t, r);
        } catch (t) {}
      if (gr(t, r)) return br(!pr(yr.f, t, r), t[r]);
    };
var wr = {},
  Or =
    f &&
    a(function () {
      return (
        42 !=
        Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: !1,
        }).prototype
      );
    }),
  Sr = u,
  Er = q,
  jr = Sr.String,
  Pr = Sr.TypeError,
  _r = function (t) {
    if (Er(t)) return t;
    throw Pr(jr(t) + " is not an object");
  },
  Tr = f,
  kr = sr,
  xr = Or,
  Rr = _r,
  Ar = ir,
  Cr = u.TypeError,
  Fr = Object.defineProperty,
  Ir = Object.getOwnPropertyDescriptor;
wr.f = Tr
  ? xr
    ? function (t, r, n) {
        if (
          (Rr(t),
          (r = Ar(r)),
          Rr(n),
          "function" == typeof t &&
            "prototype" === r &&
            "value" in n &&
            "writable" in n &&
            !n.writable)
        ) {
          var e = Ir(t, r);
          e &&
            e.writable &&
            ((t[r] = n.value),
            (n = {
              configurable:
                "configurable" in n ? n.configurable : e.configurable,
              enumerable: "enumerable" in n ? n.enumerable : e.enumerable,
              writable: !1,
            }));
        }
        return Fr(t, r, n);
      }
    : Fr
  : function (t, r, n) {
      if ((Rr(t), (r = Ar(r)), Rr(n), kr))
        try {
          return Fr(t, r, n);
        } catch (t) {}
      if ("get" in n || "set" in n) throw Cr("Accessors not supported");
      return "value" in n && (t[r] = n.value), t;
    };
var Mr = wr,
  zr = w,
  Ur = f
    ? function (t, r, n) {
        return Mr.f(t, r, zr(1, n));
      }
    : function (t, r, n) {
        return (t[r] = n), t;
      },
  Dr = { exports: {} },
  Lr = G,
  Nr = _t,
  Wr = _(Function.toString);
Lr(Nr.inspectSource) ||
  (Nr.inspectSource = function (t) {
    return Wr(t);
  });
var Gr,
  Br,
  qr,
  Kr = Nr.inspectSource,
  Vr = G,
  Xr = Kr,
  Yr = u.WeakMap,
  $r = Vr(Yr) && /native code/.test(Xr(Yr)),
  Hr = Ot.exports,
  Jr = Ut,
  Qr = Hr("keys"),
  Zr = {},
  tn = $r,
  rn = u,
  nn = _,
  en = q,
  on = Ur,
  un = Ct,
  cn = _t,
  an = function (t) {
    return Qr[t] || (Qr[t] = Jr(t));
  },
  fn = Zr,
  sn = rn.TypeError,
  ln = rn.WeakMap;
if (tn || cn.state) {
  var pn = cn.state || (cn.state = new ln()),
    yn = nn(pn.get),
    bn = nn(pn.has),
    hn = nn(pn.set);
  (Gr = function (t, r) {
    if (bn(pn, t)) throw new sn("Object already initialized");
    return (r.facade = t), hn(pn, t, r), r;
  }),
    (Br = function (t) {
      return yn(pn, t) || {};
    }),
    (qr = function (t) {
      return bn(pn, t);
    });
} else {
  var vn = an("state");
  (fn[vn] = !0),
    (Gr = function (t, r) {
      if (un(t, vn)) throw new sn("Object already initialized");
      return (r.facade = t), on(t, vn, r), r;
    }),
    (Br = function (t) {
      return un(t, vn) ? t[vn] : {};
    }),
    (qr = function (t) {
      return un(t, vn);
    });
}
var gn = {
    set: Gr,
    get: Br,
    has: qr,
    enforce: function (t) {
      return qr(t) ? Br(t) : Gr(t, {});
    },
    getterFor: function (t) {
      return function (r) {
        var n;
        if (!en(r) || (n = Br(r)).type !== t)
          throw sn("Incompatible receiver, " + t + " required");
        return n;
      };
    },
  },
  dn = f,
  mn = Ct,
  wn = Function.prototype,
  On = dn && Object.getOwnPropertyDescriptor,
  Sn = mn(wn, "name"),
  En = Sn && "something" === function () {}.name,
  jn = Sn && (!dn || (dn && On(wn, "name").configurable)),
  Pn = u,
  _n = G,
  Tn = Ct,
  kn = Ur,
  xn = jt,
  Rn = Kr,
  An = { EXISTS: Sn, PROPER: En, CONFIGURABLE: jn }.CONFIGURABLE,
  Cn = gn.get,
  Fn = gn.enforce,
  In = String(String).split("String");
(Dr.exports = function (t, r, n, e) {
  var o,
    i = !!e && !!e.unsafe,
    u = !!e && !!e.enumerable,
    c = !!e && !!e.noTargetGet,
    a = e && void 0 !== e.name ? e.name : r;
  _n(n) &&
    ("Symbol(" === String(a).slice(0, 7) &&
      (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
    (!Tn(n, "name") || (An && n.name !== a)) && kn(n, "name", a),
    (o = Fn(n)).source || (o.source = In.join("string" == typeof a ? a : ""))),
    t !== Pn
      ? (i ? !c && t[r] && (u = !0) : delete t[r], u ? (t[r] = n) : kn(t, r, n))
      : u
      ? (t[r] = n)
      : xn(r, n);
})(Function.prototype, "toString", function () {
  return (_n(this) && Cn(this).source) || Rn(this);
});
var Mn = {},
  zn = Math.ceil,
  Un = Math.floor,
  Dn = function (t) {
    var r = +t;
    return r != r || 0 === r ? 0 : (r > 0 ? Un : zn)(r);
  },
  Ln = Dn,
  Nn = Math.max,
  Wn = Math.min,
  Gn = Dn,
  Bn = Math.min,
  qn = function (t) {
    return t > 0 ? Bn(Gn(t), 9007199254740991) : 0;
  },
  Kn = W,
  Vn = function (t, r) {
    var n = Ln(t);
    return n < 0 ? Nn(n + r, 0) : Wn(n, r);
  },
  Xn = function (t) {
    return qn(t.length);
  },
  Yn = function (t) {
    return function (r, n, e) {
      var o,
        i = Kn(r),
        u = Xn(i),
        c = Vn(e, u);
      if (t && n != n) {
        for (; u > c; ) if ((o = i[c++]) != o) return !0;
      } else
        for (; u > c; c++) if ((t || c in i) && i[c] === n) return t || c || 0;
      return !t && -1;
    };
  },
  $n = { includes: Yn(!0), indexOf: Yn(!1) },
  Hn = Ct,
  Jn = W,
  Qn = $n.indexOf,
  Zn = Zr,
  te = _([].push),
  re = function (t, r) {
    var n,
      e = Jn(t),
      o = 0,
      i = [];
    for (n in e) !Hn(Zn, n) && Hn(e, n) && te(i, n);
    for (; r.length > o; ) Hn(e, (n = r[o++])) && (~Qn(i, n) || te(i, n));
    return i;
  },
  ne = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ].concat("length", "prototype");
Mn.f =
  Object.getOwnPropertyNames ||
  function (t) {
    return re(t, ne);
  };
var ee = {};
ee.f = Object.getOwnPropertySymbols;
var oe = Y,
  ie = Mn,
  ue = ee,
  ce = _r,
  ae = _([].concat),
  fe =
    oe("Reflect", "ownKeys") ||
    function (t) {
      var r = ie.f(ce(t)),
        n = ue.f;
      return n ? ae(r, n(t)) : r;
    },
  se = Ct,
  le = fe,
  pe = c,
  ye = wr,
  be = function (t, r, n) {
    for (var e = le(r), o = ye.f, i = pe.f, u = 0; u < e.length; u++) {
      var c = e[u];
      se(t, c) || (n && se(n, c)) || o(t, c, i(r, c));
    }
  },
  he = a,
  ve = G,
  ge = /#|\.prototype\./,
  de = function (t, r) {
    var n = we[me(t)];
    return n == Se || (n != Oe && (ve(r) ? he(r) : !!r));
  },
  me = (de.normalize = function (t) {
    return String(t).replace(ge, ".").toLowerCase();
  }),
  we = (de.data = {}),
  Oe = (de.NATIVE = "N"),
  Se = (de.POLYFILL = "P"),
  Ee = de,
  je = u,
  Pe = c.f,
  _e = Ur,
  Te = Dr.exports,
  ke = jt,
  xe = be,
  Re = Ee,
  Ae = function (t, r) {
    var n,
      e,
      o,
      i,
      u,
      c = t.target,
      a = t.global,
      f = t.stat;
    if ((n = a ? je : f ? je[c] || ke(c, {}) : (je[c] || {}).prototype))
      for (e in r) {
        if (
          ((i = r[e]),
          (o = t.noTargetGet ? (u = Pe(n, e)) && u.value : n[e]),
          !Re(a ? e : c + (f ? "." : "#") + e, t.forced) && void 0 !== o)
        ) {
          if (typeof i == typeof o) continue;
          xe(i, o);
        }
        (t.sham || (o && o.sham)) && _e(i, "sham", !0), Te(n, e, i, t);
      }
  },
  Ce = s,
  Fe = Function.prototype,
  Ie = Fe.apply,
  Me = Fe.call,
  ze =
    ("object" == typeof Reflect && Reflect.apply) ||
    (Ce
      ? Me.bind(Ie)
      : function () {
          return Me.apply(Ie, arguments);
        }),
  Ue = u,
  De = G,
  Le = Ue.String,
  Ne = Ue.TypeError,
  We = _,
  Ge = _r,
  Be = function (t) {
    if ("object" == typeof t || De(t)) return t;
    throw Ne("Can't set " + Le(t) + " as a prototype");
  },
  qe =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          var t,
            r = !1,
            n = {};
          try {
            (t = We(
              Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set
            ))(n, []),
              (r = n instanceof Array);
          } catch (t) {}
          return function (n, e) {
            return Ge(n), Be(e), r ? t(n, e) : (n.__proto__ = e), n;
          };
        })()
      : void 0),
  Ke = G,
  Ve = q,
  Xe = qe,
  Ye = {};
Ye[Yt("toStringTag")] = "z";
var $e = u,
  He = "[object z]" === String(Ye),
  Je = G,
  Qe = R,
  Ze = Yt("toStringTag"),
  to = $e.Object,
  ro =
    "Arguments" ==
    Qe(
      (function () {
        return arguments;
      })()
    ),
  no = He
    ? Qe
    : function (t) {
        var r, n, e;
        return void 0 === t
          ? "Undefined"
          : null === t
          ? "Null"
          : "string" ==
            typeof (n = (function (t, r) {
              try {
                return t[r];
              } catch (t) {}
            })((r = to(t)), Ze))
          ? n
          : ro
          ? Qe(r)
          : "Object" == (e = Qe(r)) && Je(r.callee)
          ? "Arguments"
          : e;
      },
  eo = u.String,
  oo = function (t) {
    if ("Symbol" === no(t))
      throw TypeError("Cannot convert a Symbol value to a string");
    return eo(t);
  },
  io = oo,
  uo = q,
  co = Ur,
  ao = _("".replace),
  fo = String(Error("zxcasd").stack),
  so = /\n\s*at [^:]*:[^\n]*/,
  lo = so.test(fo),
  po = w,
  yo = !a(function () {
    var t = Error("a");
    return (
      !("stack" in t) ||
      (Object.defineProperty(t, "stack", po(1, 7)), 7 !== t.stack)
    );
  }),
  bo = Y,
  ho = Ct,
  vo = Ur,
  go = $,
  mo = qe,
  wo = be,
  Oo = function (t, r, n) {
    var e, o;
    return (
      Xe &&
        Ke((e = r.constructor)) &&
        e !== n &&
        Ve((o = e.prototype)) &&
        o !== n.prototype &&
        Xe(t, o),
      t
    );
  },
  So = function (t, r) {
    return void 0 === t ? (arguments.length < 2 ? "" : r) : io(t);
  },
  Eo = function (t, r) {
    uo(r) && "cause" in r && co(t, "cause", r.cause);
  },
  jo = function (t, r) {
    if (lo && "string" == typeof t) for (; r--; ) t = ao(t, so, "");
    return t;
  },
  Po = yo,
  _o = Ae,
  To = ze,
  ko = function (t, r, n, e) {
    var o = e ? 2 : 1,
      i = t.split("."),
      u = i[i.length - 1],
      c = bo.apply(null, i);
    if (c) {
      var a = c.prototype;
      if ((ho(a, "cause") && delete a.cause, !n)) return c;
      var f = bo("Error"),
        s = r(function (t, r) {
          var n = So(e ? r : t, void 0),
            i = e ? new c(t) : new c();
          return (
            void 0 !== n && vo(i, "message", n),
            Po && vo(i, "stack", jo(i.stack, 2)),
            this && go(a, this) && Oo(i, this, s),
            arguments.length > o && Eo(i, arguments[o]),
            i
          );
        });
      (s.prototype = a),
        "Error" !== u && (mo ? mo(s, f) : wo(s, f, { name: !0 })),
        wo(s, c);
      try {
        a.name !== u && vo(a, "name", u), (a.constructor = s);
      } catch (t) {}
      return s;
    }
  },
  xo = u.WebAssembly,
  Ro = 7 !== Error("e", { cause: 7 }).cause,
  Ao = function (t, r) {
    var n = {};
    (n[t] = ko(t, r, Ro)), _o({ global: !0, forced: Ro }, n);
  },
  Co = function (t, r) {
    if (xo && xo[t]) {
      var n = {};
      (n[t] = ko("WebAssembly." + t, r, Ro)),
        _o({ target: "WebAssembly", stat: !0, forced: Ro }, n);
    }
  };
Ao("Error", function (t) {
  return function (r) {
    return To(t, this, arguments);
  };
}),
  Ao("EvalError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Ao("RangeError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Ao("ReferenceError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Ao("SyntaxError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Ao("TypeError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Ao("URIError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Co("CompileError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Co("LinkError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  }),
  Co("RuntimeError", function (t) {
    return function (r) {
      return To(t, this, arguments);
    };
  });
var Fo = q,
  Io = R,
  Mo = Yt("match"),
  zo = function (t) {
    var r;
    return Fo(t) && (void 0 !== (r = t[Mo]) ? !!r : "RegExp" == Io(t));
  },
  Uo = u.TypeError,
  Do = Yt("match"),
  Lo = Ae,
  No = function (t) {
    if (zo(t)) throw Uo("The method doesn't accept regular expressions");
    return t;
  },
  Wo = D,
  Go = oo,
  Bo = function (t) {
    var r = /./;
    try {
      "/./"[t](r);
    } catch (n) {
      try {
        return (r[Do] = !1), "/./"[t](r);
      } catch (t) {}
    }
    return !1;
  },
  qo = _("".indexOf);
Lo(
  { target: "String", proto: !0, forced: !Bo("includes") },
  {
    includes: function (t) {
      return !!~qo(
        Go(Wo(this)),
        Go(No(t)),
        arguments.length > 1 ? arguments[1] : void 0
      );
    },
  }
);
const Ko = r({}),
  Vo = (r) => {
    let { roles: n, policies: e, currentUser: o, children: i } = r;
    return t.createElement(
      Ko.Provider,
      { value: { roles: n, policies: e, currentUser: o } },
      i
    );
  };
let Xo;
!(function (t) {
  (t.ADMIN = "ADMIN"), (t.USER = "USER");
})(Xo || (Xo = {}));
const Yo = () => {
    const { currentUser: t } = (() => {
      const t = n(Ko);
      if (void 0 === t)
        throw new Error("useContext must be used within a Provider");
      return t;
    })();
    if (!t) throw Error("User does not exist!");
    return {
      checkAccess: e(
        (r) => {
          let { allowedRoles: n } = r;
          return !((null == n ? void 0 : n.length) > 0) || n.includes(t.role);
        },
        [t.role]
      ),
      role: t.role,
    };
  },
  $o = (r) => {
    let {
      policyCheck: n,
      allowedRoles: e,
      forbiddenFallback: o = null,
      children: i,
    } = r;
    const { checkAccess: u } = Yo();
    let c = !1;
    return (
      e && (c = u({ allowedRoles: e })),
      void 0 !== n && (c = n),
      t.createElement(t.Fragment, null, c ? i : o)
    );
  };
export { Vo as PermissionProvider, Xo as ROLES, $o as default };
//# sourceMappingURL=index.es.js.map
