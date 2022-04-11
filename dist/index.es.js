import React, { createContext, useContext, useCallback } from "react";

var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$q =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) ||
  check(typeof window == "object" && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) ||
  check(typeof commonjsGlobal == "object" && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this;
  })() ||
  Function("return this")();

var objectGetOwnPropertyDescriptor = {};

var fails$8 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$7 = fails$8;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$7(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      },
    })[1] != 7
  );
});

var fails$6 = fails$8;

var functionBindNative = !fails$6(function () {
  var test = function () {
    /* empty */
  }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != "function" || test.hasOwnProperty("prototype");
});

var NATIVE_BIND$2 = functionBindNative;

var call$5 = Function.prototype.call;

var functionCall = NATIVE_BIND$2
  ? call$5.bind(call$5)
  : function () {
      return call$5.apply(call$5, arguments);
    };

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG =
  getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$1(this, V);
      return !!descriptor && descriptor.enumerable;
    }
  : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  };
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind = FunctionPrototype$2.bind;
var call$4 = FunctionPrototype$2.call;
var uncurryThis$c = NATIVE_BIND$1 && bind.bind(call$4, call$4);

var functionUncurryThis = NATIVE_BIND$1
  ? function (fn) {
      return fn && uncurryThis$c(fn);
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$4.apply(fn, arguments);
        }
      );
    };

var uncurryThis$b = functionUncurryThis;

var toString$4 = uncurryThis$b({}.toString);
var stringSlice = uncurryThis$b("".slice);

var classofRaw$1 = function (it) {
  return stringSlice(toString$4(it), 8, -1);
};

var global$p = global$q;
var uncurryThis$a = functionUncurryThis;
var fails$5 = fails$8;
var classof$3 = classofRaw$1;

var Object$4 = global$p.Object;
var split = uncurryThis$a("".split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4("z").propertyIsEnumerable(0);
})
  ? function (it) {
      return classof$3(it) == "String" ? split(it, "") : Object$4(it);
    }
  : Object$4;

var global$o = global$q;

var TypeError$9 = global$o.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$3 = function (it) {
  if (it == undefined) throw TypeError$9("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$2 = requireObjectCoercible$3;

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$2(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$c = function (argument) {
  return typeof argument == "function";
};

var isCallable$b = isCallable$c;

var isObject$8 = function (it) {
  return typeof it == "object" ? it !== null : isCallable$b(it);
};

var global$n = global$q;
var isCallable$a = isCallable$c;

var aFunction = function (argument) {
  return isCallable$a(argument) ? argument : undefined;
};

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$n[namespace])
    : global$n[namespace] && global$n[namespace][method];
};

var uncurryThis$9 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$9({}.isPrototypeOf);

var getBuiltIn$3 = getBuiltIn$4;

var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";

var global$m = global$q;
var userAgent = engineUserAgent;

var process = global$m.process;
var Deno = global$m.Deno;
var versions = (process && process.versions) || (Deno && Deno.version);
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split(".");
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$4 = fails$8;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$4(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
    );
  });

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";

var global$l = global$q;
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$9 = isCallable$c;
var isPrototypeOf$1 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$3 = global$l.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == "symbol";
    }
  : function (it) {
      var $Symbol = getBuiltIn$2("Symbol");
      return (
        isCallable$9($Symbol) &&
        isPrototypeOf$1($Symbol.prototype, Object$3(it))
      );
    };

var global$k = global$q;

var String$4 = global$k.String;

var tryToString$1 = function (argument) {
  try {
    return String$4(argument);
  } catch (error) {
    return "Object";
  }
};

var global$j = global$q;
var isCallable$8 = isCallable$c;
var tryToString = tryToString$1;

var TypeError$8 = global$j.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$8(argument)) return argument;
  throw TypeError$8(tryToString(argument) + " is not a function");
};

var aCallable = aCallable$1;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

var global$i = global$q;
var call$3 = functionCall;
var isCallable$7 = isCallable$c;
var isObject$7 = isObject$8;

var TypeError$7 = global$i.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (
    pref === "string" &&
    isCallable$7((fn = input.toString)) &&
    !isObject$7((val = call$3(fn, input)))
  )
    return val;
  if (
    isCallable$7((fn = input.valueOf)) &&
    !isObject$7((val = call$3(fn, input)))
  )
    return val;
  if (
    pref !== "string" &&
    isCallable$7((fn = input.toString)) &&
    !isObject$7((val = call$3(fn, input)))
  )
    return val;
  throw TypeError$7("Can't convert object to primitive value");
};

var shared$3 = { exports: {} };

var global$h = global$q;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty(global$h, key, {
      value: value,
      configurable: true,
      writable: true,
    });
  } catch (error) {
    global$h[key] = value;
  }
  return value;
};

var global$g = global$q;
var setGlobal$2 = setGlobal$3;

var SHARED = "__core-js_shared__";
var store$3 = global$g[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})("versions", []).push({
  version: "3.21.1",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",
  source: "https://github.com/zloirock/core-js",
});

var global$f = global$q;
var requireObjectCoercible$1 = requireObjectCoercible$3;

var Object$2 = global$f.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return Object$2(requireObjectCoercible$1(argument));
};

var uncurryThis$8 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty = uncurryThis$8({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

var uncurryThis$7 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$3 = uncurryThis$7((1.0).toString);

var uid$2 = function (key) {
  return (
    "Symbol(" +
    (key === undefined ? "" : key) +
    ")_" +
    toString$3(++id + postfix, 36)
  );
};

var global$e = global$q;
var shared$2 = shared$3.exports;
var hasOwn$7 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2("wks");
var Symbol$1 = global$e.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1;

var wellKnownSymbol$5 = function (name) {
  if (
    !hasOwn$7(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")
  ) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$7(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};

var global$d = global$q;
var call$2 = functionCall;
var isObject$6 = isObject$8;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$4 = wellKnownSymbol$5;

var TypeError$6 = global$d.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$4("toPrimitive");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$6(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = "default";
    result = call$2(exoticToPrim, input, pref);
    if (!isObject$6(result) || isSymbol$1(result)) return result;
    throw TypeError$6("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = "number";
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};

var global$c = global$q;
var isObject$5 = isObject$8;

var document = global$c.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$5(document) && isObject$5(document.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$3 = fails$8;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine =
  !DESCRIPTORS$5 &&
  !fails$3(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(createElement("div"), "a", {
        get: function () {
          return 7;
        },
      }).a != 7
    );
  });

var DESCRIPTORS$4 = descriptors;
var call$1 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$6 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4
  ? $getOwnPropertyDescriptor$1
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$2(O);
      P = toPropertyKey$1(P);
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor$1(O, P);
        } catch (error) {
          /* empty */
        }
      if (hasOwn$6(O, P))
        return createPropertyDescriptor$2(
          !call$1(propertyIsEnumerableModule.f, O, P),
          O[P]
        );
    };

var objectDefineProperty = {};

var DESCRIPTORS$3 = descriptors;
var fails$2 = fails$8;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug =
  DESCRIPTORS$3 &&
  fails$2(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(
        function () {
          /* empty */
        },
        "prototype",
        {
          value: 42,
          writable: false,
        }
      ).prototype != 42
    );
  });

var global$b = global$q;
var isObject$4 = isObject$8;

var String$3 = global$b.String;
var TypeError$5 = global$b.TypeError;

// `Assert: Type(argument) is Object`
var anObject$3 = function (argument) {
  if (isObject$4(argument)) return argument;
  throw TypeError$5(String$3(argument) + " is not an object");
};

var global$a = global$q;
var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$2 = anObject$3;
var toPropertyKey = toPropertyKey$2;

var TypeError$4 = global$a.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$2
  ? V8_PROTOTYPE_DEFINE_BUG
    ? function defineProperty(O, P, Attributes) {
        anObject$2(O);
        P = toPropertyKey(P);
        anObject$2(Attributes);
        if (
          typeof O === "function" &&
          P === "prototype" &&
          "value" in Attributes &&
          WRITABLE in Attributes &&
          !Attributes[WRITABLE]
        ) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable:
                CONFIGURABLE$1 in Attributes
                  ? Attributes[CONFIGURABLE$1]
                  : current[CONFIGURABLE$1],
              enumerable:
                ENUMERABLE in Attributes
                  ? Attributes[ENUMERABLE]
                  : current[ENUMERABLE],
              writable: false,
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      }
    : $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$2(O);
      P = toPropertyKey(P);
      anObject$2(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
          /* empty */
        }
      if ("get" in Attributes || "set" in Attributes)
        throw TypeError$4("Accessors not supported");
      if ("value" in Attributes) O[P] = Attributes.value;
      return O;
    };

var DESCRIPTORS$1 = descriptors;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$5 = DESCRIPTORS$1
  ? function (object, key, value) {
      return definePropertyModule$1.f(
        object,
        key,
        createPropertyDescriptor$1(1, value)
      );
    }
  : function (object, key, value) {
      object[key] = value;
      return object;
    };

var redefine$1 = { exports: {} };

var uncurryThis$6 = functionUncurryThis;
var isCallable$6 = isCallable$c;
var store$1 = sharedStore;

var functionToString = uncurryThis$6(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$9 = global$q;
var isCallable$5 = isCallable$c;
var inspectSource$1 = inspectSource$2;

var WeakMap$1 = global$9.WeakMap;

var nativeWeakMap =
  isCallable$5(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1("keys");

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$8 = global$q;
var uncurryThis$5 = functionUncurryThis;
var isObject$3 = isObject$8;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$5 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$3 = global$8.TypeError;
var WeakMap = global$8.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$3("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$5(store.get);
  var wmhas = uncurryThis$5(store.has);
  var wmset = uncurryThis$5(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey("state");
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$5(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$5(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$5(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
};

var DESCRIPTORS = descriptors;
var hasOwn$4 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$4(FunctionPrototype$1, "name");
// additional protection from minified / mangled / dropped function names
var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === "something";
var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS ||
    (DESCRIPTORS && getDescriptor(FunctionPrototype$1, "name").configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
};

var global$7 = global$q;
var isCallable$4 = isCallable$c;
var hasOwn$3 = hasOwnProperty_1;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var setGlobal$1 = setGlobal$3;
var inspectSource = inspectSource$2;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split("String");

(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable$4(value)) {
    if (String(name).slice(0, 7) === "Symbol(") {
      name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
    }
    if (
      !hasOwn$3(value, "name") ||
      (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
    ) {
      createNonEnumerableProperty$3(value, "name", name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == "string" ? name : "");
    }
  }
  if (O === global$7) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$3(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, "toString", function toString() {
  return (
    (isCallable$4(this) && getInternalState(this).source) || inspectSource(this)
  );
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0
    ? 0
    : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0
    ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff)
    : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$1 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false),
};

var uncurryThis$4 = functionUncurryThis;
var hasOwn$2 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push = uncurryThis$4([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$2(hiddenKeys$1, key) && hasOwn$2(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (hasOwn$2(O, (key = names[i++]))) {
      ~indexOf(result, key) || push(result, key);
    }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$1 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf",
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;

var hiddenKeys = enumBugKeys.concat("length", "prototype");

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  };

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$1 = getBuiltIn$4;
var uncurryThis$3 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$1 = anObject$3;

var concat = uncurryThis$3([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 =
  getBuiltIn$1("Reflect", "ownKeys") ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$1(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols
      ? concat(keys, getOwnPropertySymbols(it))
      : keys;
  };

var hasOwn$1 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$1(target, key) && !(exceptions && hasOwn$1(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$1 = fails$8;
var isCallable$3 = isCallable$c;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$3(detection)
    ? fails$1(detection)
    : !!detection;
};

var normalize = (isForced$1.normalize = function (string) {
  return String(string).replace(replacement, ".").toLowerCase();
});

var data = (isForced$1.data = {});
var NATIVE = (isForced$1.NATIVE = "N");
var POLYFILL = (isForced$1.POLYFILL = "P");

var isForced_1 = isForced$1;

var global$6 = global$q;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var redefine = redefine$1.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$6;
  } else if (STATIC) {
    target = global$6[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$6[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(
        GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
        options.forced
      );
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$2(sourceProperty, "sham", true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
};

var NATIVE_BIND = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply =
  (typeof Reflect == "object" && Reflect.apply) ||
  (NATIVE_BIND
    ? call.bind(apply$1)
    : function () {
        return call.apply(apply$1, arguments);
      });

var global$5 = global$q;
var isCallable$2 = isCallable$c;

var String$2 = global$5.String;
var TypeError$2 = global$5.TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == "object" || isCallable$2(argument)) return argument;
  throw TypeError$2("Can't set " + String$2(argument) + " as a prototype");
};

/* eslint-disable no-proto -- safe */

var uncurryThis$2 = functionUncurryThis;
var anObject = anObject$3;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ("__proto__" in {}
    ? (function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          setter = uncurryThis$2(
            Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set
          );
          setter(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
          /* empty */
        }
        return function setPrototypeOf(O, proto) {
          anObject(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter(O, proto);
          else O.__proto__ = proto;
          return O;
        };
      })()
    : undefined);

var isCallable$1 = isCallable$c;
var isObject$2 = isObject$8;
var setPrototypeOf$1 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$1((NewTarget = dummy.constructor)) &&
    NewTarget !== Wrapper &&
    isObject$2((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    setPrototypeOf$1($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$3 = wellKnownSymbol$5;

var TO_STRING_TAG$1 = wellKnownSymbol$3("toStringTag");
var test = {};

test[TO_STRING_TAG$1] = "z";

var toStringTagSupport = String(test) === "[object z]";

var global$4 = global$q;
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable = isCallable$c;
var classofRaw = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$5;

var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var Object$1 = global$4.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments;
    })()
  ) == "Arguments";

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$2 = TO_STRING_TAG_SUPPORT
  ? classofRaw
  : function (it) {
      var O, tag, result;
      return it === undefined
        ? "Undefined"
        : it === null
        ? "Null"
        : // @@toStringTag case
        typeof (tag = tryGet((O = Object$1(it)), TO_STRING_TAG)) == "string"
        ? tag
        : // builtinTag case
        CORRECT_ARGUMENTS
        ? classofRaw(O)
        : // ES3 arguments fallback
        (result = classofRaw(O)) == "Object" && isCallable(O.callee)
        ? "Arguments"
        : result;
    };

var global$3 = global$q;
var classof$1 = classof$2;

var String$1 = global$3.String;

var toString$2 = function (argument) {
  if (classof$1(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return String$1(argument);
};

var toString$1 = toString$2;

var normalizeStringArgument$1 = function (argument, $default) {
  return argument === undefined
    ? arguments.length < 2
      ? ""
      : $default
    : toString$1(argument);
};

var isObject$1 = isObject$8;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$1(options) && "cause" in options) {
    createNonEnumerableProperty$1(O, "cause", options.cause);
  }
};

var uncurryThis$1 = functionUncurryThis;

var replace = uncurryThis$1("".replace);

var TEST = (function (arg) {
  return String(Error(arg).stack);
})("zxcasd");
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var clearErrorStack$1 = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == "string") {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, "");
  }
  return stack;
};

var fails = fails$8;
var createPropertyDescriptor = createPropertyDescriptor$3;

var errorStackInstallable = !fails(function () {
  var error = Error("a");
  if (!("stack" in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, "stack", createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});

var getBuiltIn = getBuiltIn$4;
var hasOwn = hasOwnProperty_1;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var isPrototypeOf = objectIsPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$2;
var inheritIfRequired = inheritIfRequired$1;
var normalizeStringArgument = normalizeStringArgument$1;
var installErrorCause = installErrorCause$1;
var clearErrorStack = clearErrorStack$1;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

var wrapErrorConstructorWithCause$1 = function (
  FULL_NAME,
  wrapper,
  FORCED,
  IS_AGGREGATE_ERROR
) {
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split(".");
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn(OriginalErrorPrototype, "cause"))
    delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn("Error");

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(
      IS_AGGREGATE_ERROR ? b : a,
      undefined
    );
    var result = IS_AGGREGATE_ERROR
      ? new OriginalError(a)
      : new OriginalError();
    if (message !== undefined)
      createNonEnumerableProperty(result, "message", message);
    if (ERROR_STACK_INSTALLABLE)
      createNonEnumerableProperty(
        result,
        "stack",
        clearErrorStack(result.stack, 2)
      );
    if (this && isPrototypeOf(OriginalErrorPrototype, this))
      inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION)
      installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== "Error") {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  }

  copyConstructorProperties(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, "name", ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) {
    /* empty */
  }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */

var $$1 = _export;
var global$2 = global$q;
var apply = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = "WebAssembly";
var WebAssembly = global$2[WEB_ASSEMBLY];

var FORCED = Error("e", { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $$1({ global: true, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(
      WEB_ASSEMBLY + "." + ERROR_NAME,
      wrapper,
      FORCED
    );
    $$1({ target: WEB_ASSEMBLY, stat: true, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper("Error", function (init) {
  return function Error(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("EvalError", function (init) {
  return function EvalError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("RangeError", function (init) {
  return function RangeError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("ReferenceError", function (init) {
  return function ReferenceError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("SyntaxError", function (init) {
  return function SyntaxError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("TypeError", function (init) {
  return function TypeError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("URIError", function (init) {
  return function URIError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("CompileError", function (init) {
  return function CompileError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("LinkError", function (init) {
  return function LinkError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("RuntimeError", function (init) {
  return function RuntimeError(message) {
    return apply(init, this, arguments);
  };
});

var isObject = isObject$8;
var classof = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$5;

var MATCH$1 = wellKnownSymbol$1("match");

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof(it) == "RegExp")
  );
};

var global$1 = global$q;
var isRegExp = isRegexp;

var TypeError$1 = global$1.TypeError;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError$1("The method doesn't accept regular expressions");
  }
  return it;
};

var wellKnownSymbol = wellKnownSymbol$5;

var MATCH = wellKnownSymbol("match");

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    "/./"[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return "/./"[METHOD_NAME](regexp);
    } catch (error2) {
      /* empty */
    }
  }
  return false;
};

var $ = _export;
var uncurryThis = functionUncurryThis;
var notARegExp = notARegexp;
var requireObjectCoercible = requireObjectCoercible$3;
var toString = toString$2;
var correctIsRegExpLogic = correctIsRegexpLogic;

var stringIndexOf = uncurryThis("".indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$(
  { target: "String", proto: true, forced: !correctIsRegExpLogic("includes") },
  {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf(
        toString(requireObjectCoercible(this)),
        toString(notARegExp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    },
  }
);

const PermissionContext = /*#__PURE__*/ createContext({});
const PermissionProvider = (_ref) => {
  let { roles, policies, currentUser, children } = _ref;
  return /*#__PURE__*/ React.createElement(
    PermissionContext.Provider,
    {
      value: {
        roles,
        policies,
        currentUser,
      },
    },
    children
  );
};
const usePermission = () => {
  const context = useContext(PermissionContext);

  if (typeof context === "undefined") {
    throw new Error("useContext must be used within a Provider");
  }

  return context;
};

let ROLES;

(function (ROLES) {
  ROLES["ADMIN"] = "ADMIN";
  ROLES["USER"] = "USER";
})(ROLES || (ROLES = {}));

const usePermitByRole = () => {
  const { currentUser } = usePermission();

  if (!currentUser) {
    throw Error("User does not exist!");
  }

  const checkAccess = useCallback(
    (_ref) => {
      let { allowedRoles } = _ref;

      if (
        (allowedRoles === null || allowedRoles === void 0
          ? void 0
          : allowedRoles.length) > 0
      ) {
        return allowedRoles.includes(currentUser.role);
      }

      return true;
    },
    [currentUser.role]
  );
  return {
    checkAccess,
    role: currentUser.role,
  };
};

const Permission = (_ref2) => {
  let { policyCheck, allowedRoles, forbiddenFallback = null, children } = _ref2;
  const { checkAccess } = usePermitByRole();
  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({
      allowedRoles,
    });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    canAccess ? children : forbiddenFallback
  );
};

export { PermissionProvider, ROLES, Permission as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25vcm1hbGl6ZS1zdHJpbmctYXJndW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zdGFsbC1lcnJvci1jYXVzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGVhci1lcnJvci1zdGFjay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lcnJvci1zdGFjay1pbnN0YWxsYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93cmFwLWVycm9yLWNvbnN0cnVjdG9yLXdpdGgtY2F1c2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmVycm9yLmNhdXNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXJlZ2V4cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9ub3QtYS1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1pcy1yZWdleHAtbG9naWMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pbmNsdWRlcy5qcyIsIi4uL3NyYy9Db250ZXh0LnRzeCIsIi4uL3NyYy9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGJpbmQgPSBGdW5jdGlvblByb3RvdHlwZS5iaW5kO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzID0gTkFUSVZFX0JJTkQgJiYgYmluZC5iaW5kKGNhbGwsIGNhbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiB1bmN1cnJ5VGhpcyhmbik7XG59IDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwiLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoYXJndW1lbnQpID8gYXJndW1lbnQgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pIDogZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyICRTeW1ib2wgPSBnZXRCdWlsdEluKCdTeW1ib2wnKTtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoJFN5bWJvbCkgJiYgaXNQcm90b3R5cGVPZigkU3ltYm9sLnByb3RvdHlwZSwgT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDYWxsYWJsZShhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsInZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xuXG4vLyBgR2V0TWV0aG9kYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChWLCBQKSB7XG4gIHZhciBmdW5jID0gVltQXTtcbiAgcmV0dXJuIGZ1bmMgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMjEuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxNC0yMDIyIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJyxcbiAgbGljZW5zZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMjEuMS9MSUNFTlNFJyxcbiAgc291cmNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMnXG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyIE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBzeW1ib2xGb3IgPSBTeW1ib2wgJiYgU3ltYm9sWydmb3InXTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXNPd24oV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAnU3ltYm9sLicgKyBuYW1lO1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhc093bihTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIGlmIChVU0VfU1lNQk9MX0FTX1VJRCAmJiBzeW1ib2xGb3IpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IHN5bWJvbEZvcihkZXNjcmlwdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCJ2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmtzIHRvIElFOCBmb3IgaXRzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDM2LVxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzMzNFxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdwcm90b3R5cGUnLCB7XG4gICAgdmFsdWU6IDQyLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KS5wcm90b3R5cGUgIT0gNDI7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IFR5cGUoYXJndW1lbnQpIGlzIE9iamVjdGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc09iamVjdChhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhGdW5jdGlvbi50b1N0cmluZyk7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgY29yZS1qc0AzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICghaXNDYWxsYWJsZShzdG9yZS5pbnNwZWN0U291cmNlKSkge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNDYWxsYWJsZShXZWFrTWFwKSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuZ2V0KTtcbiAgdmFyIHdtaGFzID0gdW5jdXJyeVRoaXMoc3RvcmUuaGFzKTtcbiAgdmFyIHdtc2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuc2V0KTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmICh3bWhhcyhzdG9yZSwgaXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKGhhc093bihpdCwgU1RBVEUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0RGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbnZhciBFWElTVFMgPSBoYXNPd24oRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJyk7XG4vLyBhZGRpdGlvbmFsIHByb3RlY3Rpb24gZnJvbSBtaW5pZmllZCAvIG1hbmdsZWQgLyBkcm9wcGVkIGZ1bmN0aW9uIG5hbWVzXG52YXIgUFJPUEVSID0gRVhJU1RTICYmIChmdW5jdGlvbiBzb21ldGhpbmcoKSB7IC8qIGVtcHR5ICovIH0pLm5hbWUgPT09ICdzb21ldGhpbmcnO1xudmFyIENPTkZJR1VSQUJMRSA9IEVYSVNUUyAmJiAoIURFU0NSSVBUT1JTIHx8IChERVNDUklQVE9SUyAmJiBnZXREZXNjcmlwdG9yKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpLmNvbmZpZ3VyYWJsZSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRVhJU1RTOiBFWElTVFMsXG4gIFBST1BFUjogUFJPUEVSLFxuICBDT05GSUdVUkFCTEU6IENPTkZJR1VSQUJMRVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuQ09ORklHVVJBQkxFO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIHZhciBuYW1lID0gb3B0aW9ucyAmJiBvcHRpb25zLm5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubmFtZSA6IGtleTtcbiAgdmFyIHN0YXRlO1xuICBpZiAoaXNDYWxsYWJsZSh2YWx1ZSkpIHtcbiAgICBpZiAoU3RyaW5nKG5hbWUpLnNsaWNlKDAsIDcpID09PSAnU3ltYm9sKCcpIHtcbiAgICAgIG5hbWUgPSAnWycgKyBTdHJpbmcobmFtZSkucmVwbGFjZSgvXlN5bWJvbFxcKChbXildKilcXCkvLCAnJDEnKSArICddJztcbiAgICB9XG4gICAgaWYgKCFoYXNPd24odmFsdWUsICduYW1lJykgfHwgKENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FICYmIHZhbHVlLm5hbWUgIT09IG5hbWUpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywgbmFtZSk7XG4gICAgfVxuICAgIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICAgIGlmICghc3RhdGUuc291cmNlKSB7XG4gICAgICBzdGF0ZS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnID8gbmFtZSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHRoaXMpICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIHNhZmVcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiAobnVtYmVyID4gMCA/IGZsb29yIDogY2VpbCkobnVtYmVyKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyT3JJbmZpbml0eShhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYExlbmd0aE9mQXJyYXlMaWtlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbGVuZ3Rob2ZhcnJheWxpa2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdG9MZW5ndGgob2JqLmxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KGtleXMsIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlLCBleGNlcHRpb25zKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwga2V5KSAmJiAhKGV4Y2VwdGlvbnMgJiYgaGFzT3duKGV4Y2VwdGlvbnMsIGtleSkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgfVxuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBhcHBseSA9IEZ1bmN0aW9uUHJvdG90eXBlLmFwcGx5O1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAodHlwZW9mIGFyZ3VtZW50ID09ICdvYmplY3QnIHx8IGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhhcmd1bWVudCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gLS0gc2FmZSAqL1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qtc2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gICAgc2V0dGVyID0gdW5jdXJyeVRoaXMoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0KTtcbiAgICBzZXR0ZXIodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG5cbi8vIG1ha2VzIHN1YmNsYXNzaW5nIHdvcmsgY29ycmVjdCBmb3Igd3JhcHBlZCBidWlsdC1pbnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR0aGlzLCBkdW1teSwgV3JhcHBlcikge1xuICB2YXIgTmV3VGFyZ2V0LCBOZXdUYXJnZXRQcm90b3R5cGU7XG4gIGlmIChcbiAgICAvLyBpdCBjYW4gd29yayBvbmx5IHdpdGggbmF0aXZlIGBzZXRQcm90b3R5cGVPZmBcbiAgICBzZXRQcm90b3R5cGVPZiAmJlxuICAgIC8vIHdlIGhhdmVuJ3QgY29tcGxldGVseSBjb3JyZWN0IHByZS1FUzYgd2F5IGZvciBnZXR0aW5nIGBuZXcudGFyZ2V0YCwgc28gdXNlIHRoaXNcbiAgICBpc0NhbGxhYmxlKE5ld1RhcmdldCA9IGR1bW15LmNvbnN0cnVjdG9yKSAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciBPYmplY3QgPSBnbG9iYWwuT2JqZWN0O1xuXG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgaXNDYWxsYWJsZShPLmNhbGxlZSkgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG52YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGNsYXNzb2YoYXJndW1lbnQpID09PSAnU3ltYm9sJykgdGhyb3cgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuICByZXR1cm4gU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50LCAkZGVmYXVsdCkge1xuICByZXR1cm4gYXJndW1lbnQgPT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gJycgOiAkZGVmYXVsdCA6IHRvU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG4vLyBgSW5zdGFsbEVycm9yQ2F1c2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL3Byb3Bvc2FsLWVycm9yLWNhdXNlLyNzZWMtZXJyb3JvYmplY3RzLWluc3RhbGwtZXJyb3ItY2F1c2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIG9wdGlvbnMpIHtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpICYmICdjYXVzZScgaW4gb3B0aW9ucykge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCAnY2F1c2UnLCBvcHRpb25zLmNhdXNlKTtcbiAgfVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcblxudmFyIFRFU1QgPSAoZnVuY3Rpb24gKGFyZykgeyByZXR1cm4gU3RyaW5nKEVycm9yKGFyZykuc3RhY2spOyB9KSgnenhjYXNkJyk7XG52YXIgVjhfT1JfQ0hBS1JBX1NUQUNLX0VOVFJZID0gL1xcblxccyphdCBbXjpdKjpbXlxcbl0qLztcbnZhciBJU19WOF9PUl9DSEFLUkFfU1RBQ0sgPSBWOF9PUl9DSEFLUkFfU1RBQ0tfRU5UUlkudGVzdChURVNUKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RhY2ssIGRyb3BFbnRyaWVzKSB7XG4gIGlmIChJU19WOF9PUl9DSEFLUkFfU1RBQ0sgJiYgdHlwZW9mIHN0YWNrID09ICdzdHJpbmcnKSB7XG4gICAgd2hpbGUgKGRyb3BFbnRyaWVzLS0pIHN0YWNrID0gcmVwbGFjZShzdGFjaywgVjhfT1JfQ0hBS1JBX1NUQUNLX0VOVFJZLCAnJyk7XG4gIH0gcmV0dXJuIHN0YWNrO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBlcnJvciA9IEVycm9yKCdhJyk7XG4gIGlmICghKCdzdGFjaycgaW4gZXJyb3IpKSByZXR1cm4gdHJ1ZTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnJvciwgJ3N0YWNrJywgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIDcpKTtcbiAgcmV0dXJuIGVycm9yLnN0YWNrICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIG5vcm1hbGl6ZVN0cmluZ0FyZ3VtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25vcm1hbGl6ZS1zdHJpbmctYXJndW1lbnQnKTtcbnZhciBpbnN0YWxsRXJyb3JDYXVzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnN0YWxsLWVycm9yLWNhdXNlJyk7XG52YXIgY2xlYXJFcnJvclN0YWNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsZWFyLWVycm9yLXN0YWNrJyk7XG52YXIgRVJST1JfU1RBQ0tfSU5TVEFMTEFCTEUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXJyb3Itc3RhY2staW5zdGFsbGFibGUnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoRlVMTF9OQU1FLCB3cmFwcGVyLCBGT1JDRUQsIElTX0FHR1JFR0FURV9FUlJPUikge1xuICB2YXIgT1BUSU9OU19QT1NJVElPTiA9IElTX0FHR1JFR0FURV9FUlJPUiA/IDIgOiAxO1xuICB2YXIgcGF0aCA9IEZVTExfTkFNRS5zcGxpdCgnLicpO1xuICB2YXIgRVJST1JfTkFNRSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgdmFyIE9yaWdpbmFsRXJyb3IgPSBnZXRCdWlsdEluLmFwcGx5KG51bGwsIHBhdGgpO1xuXG4gIGlmICghT3JpZ2luYWxFcnJvcikgcmV0dXJuO1xuXG4gIHZhciBPcmlnaW5hbEVycm9yUHJvdG90eXBlID0gT3JpZ2luYWxFcnJvci5wcm90b3R5cGU7XG5cbiAgLy8gVjggOS4zLSBidWcgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MTIwMDZcbiAgaWYgKCFJU19QVVJFICYmIGhhc093bihPcmlnaW5hbEVycm9yUHJvdG90eXBlLCAnY2F1c2UnKSkgZGVsZXRlIE9yaWdpbmFsRXJyb3JQcm90b3R5cGUuY2F1c2U7XG5cbiAgaWYgKCFGT1JDRUQpIHJldHVybiBPcmlnaW5hbEVycm9yO1xuXG4gIHZhciBCYXNlRXJyb3IgPSBnZXRCdWlsdEluKCdFcnJvcicpO1xuXG4gIHZhciBXcmFwcGVkRXJyb3IgPSB3cmFwcGVyKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBub3JtYWxpemVTdHJpbmdBcmd1bWVudChJU19BR0dSRUdBVEVfRVJST1IgPyBiIDogYSwgdW5kZWZpbmVkKTtcbiAgICB2YXIgcmVzdWx0ID0gSVNfQUdHUkVHQVRFX0VSUk9SID8gbmV3IE9yaWdpbmFsRXJyb3IoYSkgOiBuZXcgT3JpZ2luYWxFcnJvcigpO1xuICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShyZXN1bHQsICdtZXNzYWdlJywgbWVzc2FnZSk7XG4gICAgaWYgKEVSUk9SX1NUQUNLX0lOU1RBTExBQkxFKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocmVzdWx0LCAnc3RhY2snLCBjbGVhckVycm9yU3RhY2socmVzdWx0LnN0YWNrLCAyKSk7XG4gICAgaWYgKHRoaXMgJiYgaXNQcm90b3R5cGVPZihPcmlnaW5hbEVycm9yUHJvdG90eXBlLCB0aGlzKSkgaW5oZXJpdElmUmVxdWlyZWQocmVzdWx0LCB0aGlzLCBXcmFwcGVkRXJyb3IpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gT1BUSU9OU19QT1NJVElPTikgaW5zdGFsbEVycm9yQ2F1c2UocmVzdWx0LCBhcmd1bWVudHNbT1BUSU9OU19QT1NJVElPTl0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xuXG4gIFdyYXBwZWRFcnJvci5wcm90b3R5cGUgPSBPcmlnaW5hbEVycm9yUHJvdG90eXBlO1xuXG4gIGlmIChFUlJPUl9OQU1FICE9PSAnRXJyb3InKSB7XG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSBzZXRQcm90b3R5cGVPZihXcmFwcGVkRXJyb3IsIEJhc2VFcnJvcik7XG4gICAgZWxzZSBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKFdyYXBwZWRFcnJvciwgQmFzZUVycm9yLCB7IG5hbWU6IHRydWUgfSk7XG4gIH1cblxuICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKFdyYXBwZWRFcnJvciwgT3JpZ2luYWxFcnJvcik7XG5cbiAgaWYgKCFJU19QVVJFKSB0cnkge1xuICAgIC8vIFNhZmFyaSAxMy0gYnVnOiBXZWJBc3NlbWJseSBlcnJvcnMgZG9lcyBub3QgaGF2ZSBhIHByb3BlciBgLm5hbWVgXG4gICAgaWYgKE9yaWdpbmFsRXJyb3JQcm90b3R5cGUubmFtZSAhPT0gRVJST1JfTkFNRSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KE9yaWdpbmFsRXJyb3JQcm90b3R5cGUsICduYW1lJywgRVJST1JfTkFNRSk7XG4gICAgfVxuICAgIE9yaWdpbmFsRXJyb3JQcm90b3R5cGUuY29uc3RydWN0b3IgPSBXcmFwcGVkRXJyb3I7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxuICByZXR1cm4gV3JhcHBlZEVycm9yO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBmdW5jdGlvbnMgYC5sZW5ndGhgICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciB3cmFwRXJyb3JDb25zdHJ1Y3RvcldpdGhDYXVzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93cmFwLWVycm9yLWNvbnN0cnVjdG9yLXdpdGgtY2F1c2UnKTtcblxudmFyIFdFQl9BU1NFTUJMWSA9ICdXZWJBc3NlbWJseSc7XG52YXIgV2ViQXNzZW1ibHkgPSBnbG9iYWxbV0VCX0FTU0VNQkxZXTtcblxudmFyIEZPUkNFRCA9IEVycm9yKCdlJywgeyBjYXVzZTogNyB9KS5jYXVzZSAhPT0gNztcblxudmFyIGV4cG9ydEdsb2JhbEVycm9yQ2F1c2VXcmFwcGVyID0gZnVuY3Rpb24gKEVSUk9SX05BTUUsIHdyYXBwZXIpIHtcbiAgdmFyIE8gPSB7fTtcbiAgT1tFUlJPUl9OQU1FXSA9IHdyYXBFcnJvckNvbnN0cnVjdG9yV2l0aENhdXNlKEVSUk9SX05BTUUsIHdyYXBwZXIsIEZPUkNFRCk7XG4gICQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIE8pO1xufTtcblxudmFyIGV4cG9ydFdlYkFzc2VtYmx5RXJyb3JDYXVzZVdyYXBwZXIgPSBmdW5jdGlvbiAoRVJST1JfTkFNRSwgd3JhcHBlcikge1xuICBpZiAoV2ViQXNzZW1ibHkgJiYgV2ViQXNzZW1ibHlbRVJST1JfTkFNRV0pIHtcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bRVJST1JfTkFNRV0gPSB3cmFwRXJyb3JDb25zdHJ1Y3RvcldpdGhDYXVzZShXRUJfQVNTRU1CTFkgKyAnLicgKyBFUlJPUl9OQU1FLCB3cmFwcGVyLCBGT1JDRUQpO1xuICAgICQoeyB0YXJnZXQ6IFdFQl9BU1NFTUJMWSwgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwgTyk7XG4gIH1cbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWVycm9yLWNhdXNlXG5leHBvcnRHbG9iYWxFcnJvckNhdXNlV3JhcHBlcignRXJyb3InLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gRXJyb3IobWVzc2FnZSkgeyByZXR1cm4gYXBwbHkoaW5pdCwgdGhpcywgYXJndW1lbnRzKTsgfTtcbn0pO1xuZXhwb3J0R2xvYmFsRXJyb3JDYXVzZVdyYXBwZXIoJ0V2YWxFcnJvcicsIGZ1bmN0aW9uIChpbml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBFdmFsRXJyb3IobWVzc2FnZSkgeyByZXR1cm4gYXBwbHkoaW5pdCwgdGhpcywgYXJndW1lbnRzKTsgfTtcbn0pO1xuZXhwb3J0R2xvYmFsRXJyb3JDYXVzZVdyYXBwZXIoJ1JhbmdlRXJyb3InLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gUmFuZ2VFcnJvcihtZXNzYWdlKSB7IHJldHVybiBhcHBseShpbml0LCB0aGlzLCBhcmd1bWVudHMpOyB9O1xufSk7XG5leHBvcnRHbG9iYWxFcnJvckNhdXNlV3JhcHBlcignUmVmZXJlbmNlRXJyb3InLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gUmVmZXJlbmNlRXJyb3IobWVzc2FnZSkgeyByZXR1cm4gYXBwbHkoaW5pdCwgdGhpcywgYXJndW1lbnRzKTsgfTtcbn0pO1xuZXhwb3J0R2xvYmFsRXJyb3JDYXVzZVdyYXBwZXIoJ1N5bnRheEVycm9yJywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFN5bnRheEVycm9yKG1lc3NhZ2UpIHsgcmV0dXJuIGFwcGx5KGluaXQsIHRoaXMsIGFyZ3VtZW50cyk7IH07XG59KTtcbmV4cG9ydEdsb2JhbEVycm9yQ2F1c2VXcmFwcGVyKCdUeXBlRXJyb3InLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gVHlwZUVycm9yKG1lc3NhZ2UpIHsgcmV0dXJuIGFwcGx5KGluaXQsIHRoaXMsIGFyZ3VtZW50cyk7IH07XG59KTtcbmV4cG9ydEdsb2JhbEVycm9yQ2F1c2VXcmFwcGVyKCdVUklFcnJvcicsIGZ1bmN0aW9uIChpbml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBVUklFcnJvcihtZXNzYWdlKSB7IHJldHVybiBhcHBseShpbml0LCB0aGlzLCBhcmd1bWVudHMpOyB9O1xufSk7XG5leHBvcnRXZWJBc3NlbWJseUVycm9yQ2F1c2VXcmFwcGVyKCdDb21waWxlRXJyb3InLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gQ29tcGlsZUVycm9yKG1lc3NhZ2UpIHsgcmV0dXJuIGFwcGx5KGluaXQsIHRoaXMsIGFyZ3VtZW50cyk7IH07XG59KTtcbmV4cG9ydFdlYkFzc2VtYmx5RXJyb3JDYXVzZVdyYXBwZXIoJ0xpbmtFcnJvcicsIGZ1bmN0aW9uIChpbml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBMaW5rRXJyb3IobWVzc2FnZSkgeyByZXR1cm4gYXBwbHkoaW5pdCwgdGhpcywgYXJndW1lbnRzKTsgfTtcbn0pO1xuZXhwb3J0V2ViQXNzZW1ibHlFcnJvckNhdXNlV3JhcHBlcignUnVudGltZUVycm9yJywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFJ1bnRpbWVFcnJvcihtZXNzYWdlKSB7IHJldHVybiBhcHBseShpbml0LCB0aGlzLCBhcmd1bWVudHMpOyB9O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbi8vIGBJc1JlZ0V4cGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzcmVnZXhwXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjbGFzc29mKGl0KSA9PSAnUmVnRXhwJyk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcblxudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc1JlZ0V4cChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIGRvZXNuJ3QgYWNjZXB0IHJlZ3VsYXIgZXhwcmVzc2lvbnNcIik7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICB2YXIgcmVnZXhwID0gLy4vO1xuICB0cnkge1xuICAgICcvLi8nW01FVEhPRF9OQU1FXShyZWdleHApO1xuICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICB0cnkge1xuICAgICAgcmVnZXhwW01BVENIXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuICcvLi8nW01FVEhPRF9OQU1FXShyZWdleHApO1xuICAgIH0gY2F0Y2ggKGVycm9yMikgeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIG5vdEFSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbm90LWEtcmVnZXhwJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBjb3JyZWN0SXNSZWdFeHBMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LWlzLXJlZ2V4cC1sb2dpYycpO1xuXG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXNcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhY29ycmVjdElzUmVnRXhwTG9naWMoJ2luY2x1ZGVzJykgfSwge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qICwgcG9zaXRpb24gPSAwICovKSB7XG4gICAgcmV0dXJuICEhfnN0cmluZ0luZGV4T2YoXG4gICAgICB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKSxcbiAgICAgIHRvU3RyaW5nKG5vdEFSZWdFeHAoc2VhcmNoU3RyaW5nKSksXG4gICAgICBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IEZDLCBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHJvbGVzOiBhbnk7XG4gIHBvbGljaWVzOiBhbnk7XG4gIGN1cnJlbnRVc2VyOiBhbnk7XG59O1xuXG50eXBlIENvbnRleHQgPSB7XG4gIHJvbGVzOiBhbnk7XG4gIHBvbGljaWVzOiBhbnk7XG4gIGN1cnJlbnRVc2VyOiBhbnk7XG59O1xuXG5jb25zdCBQZXJtaXNzaW9uQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8Q29udGV4dD4oe30gYXMgQ29udGV4dCk7XG5cbmV4cG9ydCBjb25zdCBQZXJtaXNzaW9uUHJvdmlkZXI6IEZDPFByb3BzPiA9ICh7XG4gIHJvbGVzLFxuICBwb2xpY2llcyxcbiAgY3VycmVudFVzZXIsXG4gIGNoaWxkcmVuLFxufSkgPT4gKFxuICA8UGVybWlzc2lvbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgcm9sZXMsIHBvbGljaWVzLCBjdXJyZW50VXNlciB9fT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvUGVybWlzc2lvbkNvbnRleHQuUHJvdmlkZXI+XG4pO1xuXG5leHBvcnQgY29uc3QgdXNlUGVybWlzc2lvbiA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoUGVybWlzc2lvbkNvbnRleHQpO1xuXG4gIGlmICh0eXBlb2YgY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcInVzZUNvbnRleHQgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIFByb3ZpZGVyXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQ7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBlcm1pc3Npb25Qcm92aWRlciwgdXNlUGVybWlzc2lvbiB9IGZyb20gXCIuL0NvbnRleHRcIjtcblxuZXhwb3J0IGVudW0gUk9MRVMge1xuICBBRE1JTiA9IFwiQURNSU5cIixcbiAgVVNFUiA9IFwiVVNFUlwiLFxufVxuXG50eXBlIFJvbGVUeXBlcyA9IGtleW9mIHR5cGVvZiBST0xFUztcblxuY29uc3QgdXNlUGVybWl0QnlSb2xlID0gKCkgPT4ge1xuICBjb25zdCB7IGN1cnJlbnRVc2VyIH0gPSB1c2VQZXJtaXNzaW9uKCk7XG5cbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIHRocm93IEVycm9yKFwiVXNlciBkb2VzIG5vdCBleGlzdCFcIik7XG4gIH1cblxuICBjb25zdCBjaGVja0FjY2VzcyA9IHVzZUNhbGxiYWNrKFxuICAgICh7IGFsbG93ZWRSb2xlcyB9OiB7IGFsbG93ZWRSb2xlczogUm9sZVR5cGVzW10gfSkgPT4ge1xuICAgICAgaWYgKGFsbG93ZWRSb2xlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gYWxsb3dlZFJvbGVzLmluY2x1ZGVzKGN1cnJlbnRVc2VyLnJvbGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIFtjdXJyZW50VXNlci5yb2xlXVxuICApO1xuXG4gIHJldHVybiB7IGNoZWNrQWNjZXNzLCByb2xlOiBjdXJyZW50VXNlci5yb2xlIH07XG59O1xuXG50eXBlIFBlcm1pc3Npb25Qcm9wcyA9IHtcbiAgZm9yYmlkZGVuRmFsbGJhY2s/OiBSZWFjdE5vZGU7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG59ICYgKFxuICB8IHtcbiAgICAgIGFsbG93ZWRSb2xlczogUm9sZVR5cGVzW107XG4gICAgICBwb2xpY3lDaGVjaz86IG5ldmVyO1xuICAgIH1cbiAgfCB7XG4gICAgICBhbGxvd2VkUm9sZXM/OiBuZXZlcjtcbiAgICAgIHBvbGljeUNoZWNrOiBib29sZWFuO1xuICAgIH1cbik7XG5cbmNvbnN0IFBlcm1pc3Npb24gPSAoe1xuICBwb2xpY3lDaGVjayxcbiAgYWxsb3dlZFJvbGVzLFxuICBmb3JiaWRkZW5GYWxsYmFjayA9IG51bGwsXG4gIGNoaWxkcmVuLFxufTogUGVybWlzc2lvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2hlY2tBY2Nlc3MgfSA9IHVzZVBlcm1pdEJ5Um9sZSgpO1xuXG4gIGxldCBjYW5BY2Nlc3MgPSBmYWxzZTtcblxuICBpZiAoYWxsb3dlZFJvbGVzKSB7XG4gICAgY2FuQWNjZXNzID0gY2hlY2tBY2Nlc3MoeyBhbGxvd2VkUm9sZXMgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHBvbGljeUNoZWNrICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY2FuQWNjZXNzID0gcG9saWN5Q2hlY2s7XG4gIH1cblxuICByZXR1cm4gPD57Y2FuQWNjZXNzID8gY2hpbGRyZW4gOiBmb3JiaWRkZW5GYWxsYmFja308Lz47XG59O1xuXG5leHBvcnQgeyBQZXJtaXNzaW9uUHJvdmlkZXIgfTtcbmV4cG9ydCBkZWZhdWx0IFBlcm1pc3Npb247XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFpbHMiLCJyZXF1aXJlJCQwIiwiTkFUSVZFX0JJTkQiLCJjYWxsIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwiRnVuY3Rpb25Qcm90b3R5cGUiLCJ1bmN1cnJ5VGhpcyIsInRvU3RyaW5nIiwiY2xhc3NvZlJhdyIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiY2xhc3NvZiIsInJlcXVpcmUkJDMiLCJPYmplY3QiLCJUeXBlRXJyb3IiLCJyZXF1aXJlT2JqZWN0Q29lcmNpYmxlIiwidG9JbmRleGVkT2JqZWN0IiwiaXNDYWxsYWJsZSIsImlzT2JqZWN0IiwiZ2V0QnVpbHRJbiIsIk5BVElWRV9TWU1CT0wiLCJpc1Byb3RvdHlwZU9mIiwiVVNFX1NZTUJPTF9BU19VSUQiLCJyZXF1aXJlJCQ0IiwiaXNTeW1ib2wiLCJTdHJpbmciLCJ0cnlUb1N0cmluZyIsImFDYWxsYWJsZSIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJzZXRHbG9iYWwiLCJzdG9yZSIsInNoYXJlZE1vZHVsZSIsInRvT2JqZWN0IiwidWlkIiwic2hhcmVkIiwiaGFzT3duIiwicmVxdWlyZSQkNSIsIlN5bWJvbCIsIndlbGxLbm93blN5bWJvbCIsInJlcXVpcmUkJDYiLCJ0b1ByaW1pdGl2ZSIsInRvUHJvcGVydHlLZXkiLCJFWElTVFMiLCJERVNDUklQVE9SUyIsIklFOF9ET01fREVGSU5FIiwicmVxdWlyZSQkNyIsIiRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJhbk9iamVjdCIsIkNPTkZJR1VSQUJMRSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwiY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5IiwiaW5zcGVjdFNvdXJjZSIsIldlYWtNYXAiLCJzaGFyZWRLZXkiLCJoaWRkZW5LZXlzIiwicmVxdWlyZSQkOCIsInJlZGVmaW5lTW9kdWxlIiwidG9JbnRlZ2VyT3JJbmZpbml0eSIsIm1pbiIsInRvQWJzb2x1dGVJbmRleCIsInRvTGVuZ3RoIiwibGVuZ3RoT2ZBcnJheUxpa2UiLCJlbnVtQnVnS2V5cyIsIm93bktleXMiLCJjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzIiwiaXNGb3JjZWQiLCJhcHBseSIsImFQb3NzaWJsZVByb3RvdHlwZSIsInNldFByb3RvdHlwZU9mIiwiaW5oZXJpdElmUmVxdWlyZWQiLCJUT19TVFJJTkdfVEFHIiwibm9ybWFsaXplU3RyaW5nQXJndW1lbnQiLCJpbnN0YWxsRXJyb3JDYXVzZSIsImNsZWFyRXJyb3JTdGFjayIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQxMCIsIndyYXBFcnJvckNvbnN0cnVjdG9yV2l0aENhdXNlIiwiJCIsIk1BVENIIiwiUGVybWlzc2lvbkNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiUGVybWlzc2lvblByb3ZpZGVyIiwicm9sZXMiLCJwb2xpY2llcyIsImN1cnJlbnRVc2VyIiwiY2hpbGRyZW4iLCJ1c2VQZXJtaXNzaW9uIiwiY29udGV4dCIsInVzZUNvbnRleHQiLCJFcnJvciIsIlJPTEVTIiwidXNlUGVybWl0QnlSb2xlIiwiY2hlY2tBY2Nlc3MiLCJ1c2VDYWxsYmFjayIsImFsbG93ZWRSb2xlcyIsImxlbmd0aCIsImluY2x1ZGVzIiwicm9sZSIsIlBlcm1pc3Npb24iLCJwb2xpY3lDaGVjayIsImZvcmJpZGRlbkZhbGxiYWNrIiwiY2FuQWNjZXNzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDMUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtJQUNBQSxRQUFjO0FBQ2Q7QUFDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLFVBQVUsSUFBSSxRQUFRLElBQUksVUFBVSxDQUFDO0FBQ3BELEVBQUUsS0FBSyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7QUFDNUM7QUFDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0FBQ3hDLEVBQUUsS0FBSyxDQUFDLE9BQU9BLGNBQU0sSUFBSSxR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
