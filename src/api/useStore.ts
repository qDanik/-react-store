import {useEffect, useState} from 'react';
import getStoresFromFunction from '../utils/getStoresFromFunction';
import {IUseStores, SubscribeType} from '../interfraces';
import Store from './store';

export const useForceUpdate = () => {
  const [, setState] = useState(0);

  return (): void => setState(tick => tick + 1);
}

const observeUpdate = (instances: Store, callback: SubscribeType): (() => void) => {
  instances.subscribe(callback);

  return (): void => {
    instances.unsubscribe(callback);
  }
}

const useStore: IUseStores = (name: any): any => {
  const instances = getStoresFromFunction(name);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return observeUpdate(instances, forceUpdate)
  }, []);

  return instances;
};

export default useStore;
