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
