import {useContext, useEffect} from 'react';
import {ReactStoreContext} from '../constants';
import {useForceUpdate} from './useForceUpdate';


export function getStore<Instances>(instances: Instances): Instances  {
  const {subscribes} = useContext(ReactStoreContext);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const list = Object.keys(instances);
    list.forEach(storeName => subscribes.subscribe(storeName, forceUpdate));

    return (): void => {
      list.forEach(storeName => subscribes.unsubscribe(storeName, forceUpdate));
    }
  }, [forceUpdate, instances]);

  return instances;
}
