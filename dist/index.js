'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var React=require('react'),React__default=_interopDefault(React);function get(target, property) {
  return this[property];
}function set(target, property, value) {
  this[property] = value;

  if (property !== 'update' && !property.startsWith('_') && typeof this[property] !== 'function') {
    target.update();
  }

  return true;
}var Subscribe =
/** @class */
function () {
  function Subscribe() {}

  Subscribe.prototype.getList = function () {
    return {};
  };

  Subscribe.prototype.getUpdate = function (storeName) {
    return function () {
      return;
    };
  };

  Subscribe.prototype.subscribe = function (storeName, cb) {
    return;
  };

  Subscribe.prototype.unsubscribe = function (storeName, cb) {
    return;
  };

  Subscribe.prototype.update = function (storeName) {
    return;
  };

  return Subscribe;
}();var SubscribeImpl =
/** @class */
function () {
  function SubscribeImpl() {
    this.subscribes = {};
  }

  SubscribeImpl.prototype.getList = function () {
    return this.subscribes;
  };

  SubscribeImpl.prototype.getUpdate = function (storeName) {
    var _this = this;

    return function () {
      _this.update(storeName);
    };
  };

  SubscribeImpl.prototype.hasStore = function (storeName) {
    return this.subscribes.hasOwnProperty(storeName);
  };

  SubscribeImpl.prototype.subscribe = function (storeName, cb) {
    if (!this.hasStore(storeName)) {
      this.subscribes[storeName] = [];
    }

    console.log(storeName, 'SUBSCRIBE');
    this.subscribes[storeName].push(cb);
  };

  SubscribeImpl.prototype.unsubscribe = function (storeName, cb) {
    if (!this.hasStore(storeName)) {
      return;
    }

    console.log(storeName, 'UNSUBSCRIBE');
    this.subscribes[storeName] = this.subscribes[storeName].filter(function (subscribe) {
      return subscribe !== cb;
    });
  };

  SubscribeImpl.prototype.update = function (storeName) {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName].forEach(function (cb) {
      return cb();
    });
  };

  return SubscribeImpl;
}();/*! *****************************************************************************
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
};function watchStore(target, update, initial, storeArgs) {
  var observer = {
    update: update
  };

  for (var property in target) {
    if (!target.hasOwnProperty(property)) {
      continue;
    }

    if (initial.hasOwnProperty(property)) {
      observer[property] = initial[property];
    } else {
      observer[property] = target[property];
    }

    var descriptor = Object.getOwnPropertyDescriptor(target, property) || {
      enumerable: true
    };
    Object.defineProperty(target, property, {
      enumerable: !!descriptor.enumerable,
      get: get.bind(observer, target, property),
      set: set.bind(observer, target, property)
    });
  }

  if (storeArgs) {
    observer['_all'] = __assign({}, storeArgs);
  }

  return Object.assign(target, observer);
}function useForceUpdate() {
  var _a = React.useState(0),
      setState = _a[1];

  return React.useCallback(function () {
    return setState(function (tick) {
      return tick + 1;
    });
  }, [setState]);
}function subscribeStore(instances, subscribes) {
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
}var ReactStoreContext = React.createContext({
  getState: function getState() {
    return {};
  },
  getStores: function getStores() {
    return {};
  },
  subscribes: new SubscribeImpl(),
  useStore: function useStore() {
    return {};
  }
}); // @ts-ignore

if (process.env.NODE_ENV !== 'production') {
  ReactStoreContext.displayName = 'ReactStore';
}var useStore = function useStore(value) {
  var context = React.useContext(ReactStoreContext);
  var stores = context.getStores();

  var _a = React.useMemo(function () {
    var _a;

    var instances;

    if (Array.isArray(value)) {
      instances = value.reduce(function (acc, key) {
        var _a;

        return __assign(__assign({}, acc), (_a = {}, _a[key] = stores[key], _a));
      }, {});
    } else {
      instances = stores[value];
    }

    var subscribers = Array.isArray(instances) ? instances : (_a = {}, _a[value] = instances, _a);
    return [instances, subscribers];
  }, [value, stores]),
      instances = _a[0],
      subscribers = _a[1];

  subscribeStore(subscribers, context.subscribes);
  return instances;
};var connect = function connect(values, Component) {
  function Connect(props) {
    var stores = useStore(values);
    return /*#__PURE__*/React__default.createElement(Component, __assign({}, props, stores));
  }

  Connect.displayName = "connect(" + Component.name + ")";
  return Connect;
};function createStore(initialState, initialStores, storeArgs) {
  var stores = {};
  var subscribes = new SubscribeImpl();
  Object.keys(initialStores).forEach(function (storeName) {
    var instance = initialStores[storeName];
    var update = subscribes.getUpdate(storeName);
    var initial = initialState[storeName] || {};
    stores[storeName] = watchStore(instance, update, initial, storeArgs);
  });

  function getState() {
    return initialState;
  }

  function getStores() {
    return stores;
  }

  var useStore = function useStore(value) {
    var instances = {};

    if (Array.isArray(value)) {
      for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var storeName = value_1[_i];

        if (stores.hasOwnProperty(storeName)) {
          instances[storeName] = stores[storeName];
        }
      }
    } else {
      instances = stores[value];
    }

    var subscribers = Array.isArray(instances) ? instances : [instances];
    subscribeStore(subscribers, subscribes);
    return instances;
  };

  return {
    getState: getState,
    getStores: getStores,
    subscribes: subscribes,
    useStore: useStore
  };
}function Provider(props) {
  var store = props.store,
      children = props.children;
  return /*#__PURE__*/React__default.createElement(ReactStoreContext.Provider, {
    value: store
  }, children);
}exports.Provider=Provider;exports.ReactStoreContext=ReactStoreContext;exports.Subscribe=Subscribe;exports.SubscribeImpl=SubscribeImpl;exports.connect=connect;exports.createStore=createStore;exports.get=get;exports.set=set;exports.useStore=useStore;exports.watchStore=watchStore;