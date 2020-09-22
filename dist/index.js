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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};function get(target, property) {
  return this[property];
}function set(target, property, value) {
  this[property] = value;

  if (property !== 'update') {
    target.update();
  }

  return true;
}function Observer(target) {
  var observer = {
    update: target.update
  };

  for (var property in target) {
    if (target.hasOwnProperty(property)) {
      observer[property] = target[property];
      var descriptor = Object.getOwnPropertyDescriptor(target, property) || {
        enumerable: true
      };
      Object.defineProperty(target, property, {
        enumerable: !!descriptor.enumerable,
        get: get.bind(observer.observer, target, property),
        set: set.bind(observer.observer, target, property)
      });
    }
  }

  return Object.assign(target, observer);
}var ReactStoreContext = React.createContext({
  getStores: function getStores() {
    return [];
  },
  getState: function getState() {},
  useStore: function useStore() {}
}); // @ts-ignore

if (process.env.NODE_ENV !== 'production') {
  ReactStoreContext.displayName = 'ReactStore';
}var useForceUpdate = function useForceUpdate() {
  var _a = React.useState(0),
      setState = _a[1];

  return function () {
    return setState(function (tick) {
      return tick + 1;
    });
  };
};function getStore(instances) {
  var context = React.useContext(ReactStoreContext);
  var forceUpdate = useForceUpdate();
  React.useEffect(function () {
    var list = Object.values(instances);
    list.map(function (instance) {
      return instance.subcribe(forceUpdate);
    });
    return function () {
      list.map(function (instance) {
        return instance.subcribe(forceUpdate);
      });
    };
  }, [forceUpdate, instances]);
  return instances;
}function createStore(initialState, initialStores, storeArgs) {
  var stores = {};
  Object.keys(initialStores).forEach(function (key) {
    var instance = initialStores[key];
    stores[key] = Observer(instance);
  });

  function getState() {
    return initialState;
  }

  function getStores() {
    return stores;
  }

  var useStore = function useStore(value) {
    var values = Array.isArray(value) ? value : [value];
    var instances = values.reduce(function (acc, key) {
      return __assign(__assign({}, acc), {
        key: stores[key]
      });
    }, {});
    return getStore(instances);
  };

  return {
    getStores: getStores,
    getState: getState,
    useStore: useStore
  };
}function Provider(props) {
  var store = props.store,
      children = props.children;
  return /*#__PURE__*/React__default.createElement(ReactStoreContext.Provider, {
    value: store
  }, children);
}var useStore = function useStore(value) {
  var context = React.useContext(ReactStoreContext);
  var stores = context.getStores();
  var values = Array.isArray(value) ? value : [value];
  var instances = values.reduce(function (acc, key) {
    return __assign(__assign({}, acc), {
      key: stores[key]
    });
  }, {});
  return getStore(instances);
};exports.Provider=Provider;exports.ReactStoreContext=ReactStoreContext;exports.createStore=createStore;exports.useStore=useStore;