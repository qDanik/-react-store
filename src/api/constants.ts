import {createContext} from 'react';
import {StoreCatalog} from './useStore';
import {SubscribeImpl} from '../core';

export const ReactStoreContext = createContext({
  getStores: (): Partial<StoreCatalog> => ({}),
  getState: () => ({}),
  useStore: () => ({}),
  subscribes: new SubscribeImpl()
});

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  ReactStoreContext.displayName = 'ReactStore'
}
