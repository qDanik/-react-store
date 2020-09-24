import {useContext, useMemo} from 'react';
import {StoreCatalog} from './interfaces';
import {subscribeStore} from './subscribeStore';
import {ReactStoreContext} from '../constants';
import {PickStores} from '../createStore';

export const useStore: PickStores<StoreCatalog> = <Stores>(value: any): ReturnType<PickStores<Stores>> => {
  const context = useContext(ReactStoreContext);
  const stores = context.getStores();

  const [instances, subscribers] = useMemo(() => {
    let instances;
    if (Array.isArray(value)) {
      instances = value.reduce((acc, key) => ({
        ...acc,
        [key]: stores[key]
      }), {});
    } else {
      instances = stores[value];
    }

    const subscribers = Array.isArray(instances) ? instances : {
      [value]: instances
    };

    return [instances, subscribers]
  }, [value, stores])

  subscribeStore<ReturnType<PickStores<Stores>>>(subscribers, context.subscribes);

  return instances;
}
