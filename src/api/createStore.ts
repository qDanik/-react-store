import {CreateStore, DefaultState, DefaultStores} from '../interfraces';
import Observer from '../core/observer';

const createStore = (initialState: DefaultState, stores: any[], storeArgs: any[]): CreateStore => {
  const state: DefaultStores = {};
  stores.forEach((store) => {
    const instance = new store(...storeArgs);
    state[instance.getStoreName()] = Observer(instance);
  });

  return {
    getInstances: (): DefaultStores => state,
    getState: (): DefaultState => initialState,
  };
};

export default createStore;
