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
};var ReactStoreContext = React.createContext({
  getStores: function getStores() {
    return {};
  },
  getState: function getState() {
    return {};
  },
  useStore: function useStore() {
    return {};
  },
  subscribes: {}
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
  var subscribes = React.useContext(ReactStoreContext).subscribes;
  var forceUpdate = useForceUpdate();
  React.useEffect(function () {
    var list = Object.keys(instances);
    list.forEach(function (storeName) {
      return subscribes.subscribe(storeName, forceUpdate);
    });
    return function () {
      list.forEach(function (storeName) {
        return subscribes.unsubscribe(storeName, forceUpdate);
      });
    };
  }, [forceUpdate, instances]);
  return instances;
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
};var connect = function connect(values, Component) {
  function Connect(props) {
    var stores = useStore(values);
    return /*#__PURE__*/React__default.createElement(Component, __assign({}, props, stores));
  }

  Connect.displayName = "connect(" + Component.name + ")";
  return Connect;
};function get(target, property) {
  return this[property];
}function set(target, property, value) {
  this[property] = value;

  if (property !== 'update' && !property.startsWith('_') && typeof this[property] !== 'function') {
    target.update();
  }

  return true;
}function Observer(target, storeArgs) {
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
}var SubscribeImpl =
/** @class */
function () {
  function SubscribeImpl() {
    this.subscribes = {};
  }

  SubscribeImpl.prototype.hasStore = function (storeName) {
    return this.subscribes.hasOwnProperty(storeName);
  };

  SubscribeImpl.prototype.update = function (storeName) {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName].forEach(function (cb) {
      return cb();
    });
  };

  SubscribeImpl.prototype.subscribe = function (storeName, cb) {
    if (!this.hasStore(storeName)) {
      this.subscribes[storeName] = [];
    }

    this.subscribes[storeName].push(cb);
  };

  SubscribeImpl.prototype.unsubscribe = function (storeName, cb) {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName] = this.subscribes[storeName].filter(function (subscribe) {
      return subscribe !== cb;
    });
  };

  return SubscribeImpl;
}();function createStore(initialState, initialStores, storeArgs) {
  var stores = {};
  var subscribes = new SubscribeImpl();
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
    var storeNames = Array.isArray(value) ? value : [value];
    var instances = {};

    for (var _i = 0, storeNames_1 = storeNames; _i < storeNames_1.length; _i++) {
      var storeName = storeNames_1[_i];

      if (stores.hasOwnProperty(storeName)) {
        instances[storeName] = stores[storeName];
      }
    }

    return getStore(instances);
  };

  return {
    getStores: getStores,
    getState: getState,
    useStore: useStore,
    subscribes: subscribes
  };
}function Provider(props) {
  var store = props.store,
      children = props.children;
  return /*#__PURE__*/React__default.createElement(ReactStoreContext.Provider, {
    value: store
  }, children);
}exports.Provider=Provider;exports.ReactStoreContext=ReactStoreContext;exports.connect=connect;exports.createStore=createStore;exports.useStore=useStore;