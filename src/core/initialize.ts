import {CreateStore} from '../interfraces';
import isStore from '../utils/isStore';

function hasPropertyOrSetter(target: any, property: any) {
  if (target.hasOwnProperty(property)) {
    return true;
  }

  return !target.hasOwnProperty(property) && typeof target[property] !== 'function';
}

const defineStoreProperties = (store: any, properties: any) => {
  for (const property in properties) {
    if (!properties.hasOwnProperty(property) || !hasPropertyOrSetter(store, property)) {
      continue;
    }

    const currentValue = store[property];
    if (isStore(currentValue)) {
      defineStoreProperties(currentValue, properties[property]);

      if(currentValue.hasOwnProperty('initialize')) {
        currentValue.initialize();
      }
      continue;
    }

    store[property] = properties[property];
  }
}

const initialize = (store: CreateStore): void => {
  const stores = store.getInstances();
  const state = store.getState();

  for(const property in state) {
    if(!state.hasOwnProperty(property) || !stores.hasOwnProperty(property)) {
      continue;
    }

    const properties = state[property];
    const store = stores[property];

    defineStoreProperties(store, properties);
  }
};

export default initialize;
