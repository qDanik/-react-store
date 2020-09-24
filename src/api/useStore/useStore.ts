import {PickStores} from '../createStore';
import {StoreCatalog} from './interfaces';
import {useContext} from 'react';
import {ReactStoreContext} from '../constants';
import {getStore} from './getStore';

export const useStore: PickStores<StoreCatalog> = <Stores>(value: any): ReturnType<PickStores<Stores>> => {
  const context = useContext(ReactStoreContext);
  const stores = context.getStores();
  const values = Array.isArray(value) ? value : [value];
  const instances: ReturnType<PickStores<Stores>> = values.reduce((acc, key) => ({
    ...acc,
    key: stores[key]
  }), {});

  return getStore<ReturnType<PickStores<Stores>>>(instances, context.subscribes);
}
