import {useEffect, useState} from 'react';
import getStores from '../utils/getStores';
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
  const instances = getStores(name);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    return observeUpdate(instances, forceUpdate)
  }, []);

  return instances;
};

export default useStore;
