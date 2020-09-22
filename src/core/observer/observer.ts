import {ObserverStore} from './interfaces';
import {get, set} from '../handlers';

export function Observer<Store extends ObserverStore, Args extends object>(target: Store, storeArgs?: Args): Store {
  const observer: ObserverStore = {
    update: target.update
  };

  for (const property in target) {
    if (target.hasOwnProperty(property)) {
      observer[property] = target[property];
      const descriptor = Object.getOwnPropertyDescriptor(target, property) || { enumerable: true };

      Object.defineProperty(target, property, {
        enumerable: !!descriptor.enumerable,
        get: get.bind(observer.observer, target, property),
        set: set.bind(observer.observer, target, property)
      });
    }
  }

  return Object.assign(target, observer);
}
