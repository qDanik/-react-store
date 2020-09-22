import {createContext} from 'react';
import {SubscribeImpl} from 'core/subscribe';
import {StoreCatalog} from './useStore';

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
