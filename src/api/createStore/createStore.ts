import {CreateStore, DeclaredStores, DefaultStates, DefaultStores, PickStores} from './interfaces';
import {watchStore, SubscribeImpl} from '../../core';
import {subscribeStore} from '../useStore/subscribeStore';

export function createStore<State extends DefaultStates, Stores extends DefaultStores, Args extends object>
(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores> {
  const stores: DeclaredStores<Stores> = {};
  const subscribes: SubscribeImpl = new SubscribeImpl();

  Object.keys(initialStores).forEach(function (storeName: string): void {
    const instance = initialStores[storeName];
    const update = subscribes.getUpdate(storeName);
    const initial = initialState[storeName] || {};

    stores[storeName] = watchStore(instance, update, initial, storeArgs);
  });

  function getState(): State {
    return initialState as State
  }

  function getStores(): Stores {
    return stores as Stores
  }

  const useStore: PickStores<Stores> = (value: any): ReturnType<PickStores<Stores>> => {
    let instances: ReturnType<PickStores<Stores>> = {};
    if (Array.isArray(value)) {
      for (const storeName of value) {
        if (stores.hasOwnProperty(storeName)) {
          instances[storeName] = stores[storeName];
        }
      }
    } else {
      instances = stores[value];
    }

    const subscribers = Array.isArray(instances) ? instances : [instances];
    subscribeStore<ReturnType<PickStores<Stores>>>(subscribers, subscribes);

    return instances;
  }

  return {
    getState,
    getStores,
    subscribes,
    useStore,
  };
}
