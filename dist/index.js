'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var React=require('react'),React__default=_interopDefault(React);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}var isStore = function isStore(value) {
  return value && _typeof(value) === 'object' && typeof value.update === 'function' && value.storeName;
};function set(target, property, value) {
  this[property] = value;

  if (property !== 'update') {
    target.update();
  }

  return true;
}

function get(target, property) {
  if (isStore(this[property])) {
    this[property].update = target.update;
  }

  return this[property];
}

var handler = {
  get: get,
  set: set
};function Observer(target) {
  var proxy = {
    observer: {
      update: target.update
    },
    listener: {}
  };

  for (var property in target) {
    if (target && !target.hasOwnProperty(property)) {
      continue;
    }

    proxy.observer[property] = target[property];
    var descriptor = Object.getOwnPropertyDescriptor(target, property) || {
      enumerable: true
    };

    if (isStore(target[property])) {
      target[property] = Observer(target[property]);
    }

    Object.defineProperty(target, property, {
      enumerable: !!descriptor.enumerable,
      get: handler.get.bind(proxy.observer, target, property),
      set: handler.set.bind(proxy.observer, target, property)
    });
  }

  proxy.instance = Object.assign(target, proxy.observer);
  return proxy.instance;
}var createStore = function createStore(initialState, stores, storeArgs) {
  var state = {};
  stores.forEach(function (store) {
    var instance = new (store.bind.apply(store, __spreadArrays([void 0], storeArgs)))();
    state[instance.getStoreName()] = Observer(instance);
  });
  return {
    getInstances: function getInstances() {
      return state;
    },
    getState: function getState() {
      return initialState;
    }
  };
};var Store =
/** @class */
function () {
  function Store() {
    var _this = this;

    this.storeName = 'default';
    this.subscribes = [];

    this.update = function () {
      _this.subscribes.forEach(function (callback) {
        return callback();
      });
    };

    this.subscribe = function (callback) {
      _this.subscribes.push(callback);
    };

    this.unsubscribe = function (callback) {
      _this.subscribes = _this.subscribes.filter(function (subscribe) {
        return subscribe !== callback;
      });
    };
  }

  Store.prototype.getStoreName = function () {
    return this.storeName;
  };

  return Store;
}();var StonesContext = React.createContext({
  getInstances: function getInstances() {},
  getState: function getState() {}
}); // @ts-ignore

if (process.env.NODE_ENV !== 'production') {
  StonesContext.displayName = 'StoneStore';
}var getStoresBase = function getStoresBase(stores, values) {
  if (typeof stores === 'undefined') {
    throw Error('Provider should be initialize before getInstances()');
  }

  if (typeof values === 'string') {
    return stores[values];
  }

  if (!Array.isArray(values)) {
    throw Error('getInstances() should receive store name as string or array of string');
  }

  var response = {};

  for (var instance in stores) {
    if (!stores.hasOwnProperty(instance) || !values.includes(instance)) {
      continue;
    }

    response[instance] = stores[instance];
  }

  return response;
};var getStoresFromFunction = function getStoresFromFunction(values, stores) {
  if (!stores) {
    var context = React.useContext(StonesContext);
    stores = context.getInstances();
  }

  return getStoresBase(stores, values);
};var useForceUpdate = function useForceUpdate() {
  var _a = React.useState(0),
      setState = _a[1];

  return function () {
    return setState(function (tick) {
      return tick + 1;
    });
  };
};

var observeUpdate = function observeUpdate(instances, callback) {
  instances.subscribe(callback);
  return function () {
    instances.unsubscribe(callback);
  };
};

var useStore = function useStore(name) {
  var instances = getStoresFromFunction(name);
  var forceUpdate = useForceUpdate();
  React.useEffect(function () {
    return observeUpdate(instances, forceUpdate);
  }, []);
  return instances;
};var stones = Symbol('stones');var getGlobal = function getGlobal() {
  var __window = typeof window !== 'undefined' && window;

  var __global = typeof globalThis !== 'undefined' && globalThis;

  return __global || __window;
};var getGlobalContext = function getGlobalContext() {
  var state = getGlobal();
  return state[stones];
};var getStoresFromComponent = function getStoresFromComponent(values) {
  var context = getGlobalContext();
  var stores = context.getInstances();
  return getStoresBase(stores, values);
};function hasPropertyOrSetter(target, property) {
  if (target.hasOwnProperty(property)) {
    return true;
  }

  return !target.hasOwnProperty(property) && typeof target[property] !== 'function';
}

var defineStoreProperties = function defineStoreProperties(store, properties) {
  for (var property in properties) {
    if (!properties.hasOwnProperty(property) || !hasPropertyOrSetter(store, property)) {
      continue;
    }

    var currentValue = store[property];

    if (isStore(currentValue)) {
      defineStoreProperties(currentValue, properties[property]);

      if (currentValue.hasOwnProperty('initialize')) {
        currentValue.initialize();
      }

      continue;
    }

    store[property] = properties[property];
  }
};

var initialize = function initialize(store) {
  var stores = store.getInstances();
  var state = store.getState();

  for (var property in state) {
    if (!state.hasOwnProperty(property) || !stores.hasOwnProperty(property)) {
      continue;
    }

    var properties = state[property];
    var store_1 = stores[property];
    defineStoreProperties(store_1, properties);
  }
};var setGlobalContext = function setGlobalContext(store) {
  var state = getGlobal();
  state[stones] = store;
};var Provider = function Provider(props) {
  var store = props.store,
      children = props.children;
  initialize(store);
  setGlobalContext(store);
  return /*#__PURE__*/React__default.createElement(StonesContext.Provider, {
    value: store
  }, children);
};exports.Provider=Provider;exports.Store=Store;exports.createStore=createStore;exports.getStores=getStoresFromComponent;exports.useStore=useStore;