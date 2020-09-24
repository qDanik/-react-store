import {createContext} from 'react';
import {StoreCatalog} from './useStore';
import {SubscribeImpl} from '../core';

export const ReactStoreContext = createContext({
  getState: () => ({}),
  getStores: (): Partial<StoreCatalog> => ({}),
  subscribes: new SubscribeImpl(),
  useStore: () => ({})
});

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  ReactStoreContext.displayName = 'ReactStore'
}
