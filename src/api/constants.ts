import {createContext} from 'react';
import {Subscribe} from 'core/subscribe';
import {StoreCatalog} from './useStore';

export const ReactStoreContext = createContext({
  getStores: (): Partial<StoreCatalog> => ({}),
  getState: () => ({}),
  useStore: () => ({}),
  subscribes: {} as Subscribe
});

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  ReactStoreContext.displayName = 'ReactStore'
}
