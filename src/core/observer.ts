import {IProxy, IStore} from '../interfraces';
import handler from '../core/handler';
import isStore from '../utils/isStore';
import Store from '../api/store';


function Observer(target: IStore): Store {
  const proxy: IProxy = {
    observer: {
      update: target.update
    },
    listener: {},
  };

  for (const property in target) {
    if ((target && !target.hasOwnProperty(property))) {
      continue;
    }

    proxy.observer[property] = target[property];
    const descriptor = Object.getOwnPropertyDescriptor(target, property) || { enumerable: true };

    if(isStore(target[property])) {
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
}

export default Observer;
