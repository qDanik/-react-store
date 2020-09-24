import {CreateStore, DeclaredStores, DefaultStores, PickStores} from './interfaces';
import {Observer, SubscribeImpl} from '../../core';
import {getStore} from '../useStore/getStore';

export function createStore<State, Stores extends DefaultStores, Args extends object>
(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores> {
  const stores: DeclaredStores<Stores> = {};
  const subscribes: SubscribeImpl = new SubscribeImpl();

  Object.keys(initialStores).forEach(function (storeName: string): void {
    const instance = initialStores[storeName];
    const update = subscribes.getUpdate(storeName);

    stores[storeName] = Observer(instance, update, storeArgs);
  });

  function getState(): State {
    return initialState as State
  }

  function getStores(): Stores {
    return stores as Stores
  }

  const useStore: PickStores<Stores> = (value: any): ReturnType<PickStores<Stores>> => {
    const storeNames = Array.isArray(value) ? value : [value];
    const instances: ReturnType<PickStores<Stores>> = {};
    for (let storeName of storeNames) {
      if (stores.hasOwnProperty(storeName)) {
        instances[storeName] = stores[storeName];
      }
    }

    return getStore<ReturnType<PickStores<Stores>>>(instances, subscribes);
  }

  return {
    getStores,
    getState,
    useStore,
    subscribes,
  };
}
