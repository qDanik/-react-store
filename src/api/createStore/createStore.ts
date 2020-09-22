import {CreateStore, DeclaredStores, DefaultStores, PickStores} from './interfaces';
import {Observer} from 'core/observer';
import {Subscribe, SubscribeImpl} from 'core/subscribe';
import {getStore} from '../useStore/getStore';

export function createStore<State, Stores extends DefaultStores, Args extends object>
(initialState: State, initialStores: Stores, storeArgs?: Args): CreateStore<State, Stores> {
  const stores: DeclaredStores<Stores> = {};
  const subscribes: Subscribe = new SubscribeImpl();

  Object.keys(initialStores).forEach(function (key: string): void {
    const instance = initialStores[key];

    stores[key] = Observer(instance, storeArgs);
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

    return getStore<ReturnType<PickStores<Stores>>>(instances);
  }

  return {
    getStores,
    getState,
    useStore,
    subscribes,
  };
}
