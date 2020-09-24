import {ObserverStore} from './interfaces';
import {get, set} from '../handlers';

export function watchStore<Store extends ObserverStore, Args extends object>
(target: Store, update: () => void, initial: any, storeArgs?: Args): Store {
  const observer: ObserverStore = {
    update
  };

  for (const property in target) {
    if (!target.hasOwnProperty(property)) {
      continue;
    }

    if(initial.hasOwnProperty(property)) {
      observer[property] = initial[property];
    } else {
      observer[property] = target[property];
    }
    const descriptor = Object.getOwnPropertyDescriptor(target, property) || {enumerable: true};

    Object.defineProperty(target, property, {
      enumerable: !!descriptor.enumerable,
      get: get.bind(observer, target, property),
      set: set.bind(observer, target, property)
    });
  }

  if(storeArgs) {
    observer['_all'] = {
      ...storeArgs
    };
  }

  return Object.assign(target, observer);
}
