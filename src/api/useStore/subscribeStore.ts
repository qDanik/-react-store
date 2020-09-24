import {useEffect} from 'react';
import {useForceUpdate} from './useForceUpdate';
import {SubscribeImpl} from '../../core';

export function subscribeStore<Instances>(instances: any, subscribes: SubscribeImpl): void {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const list = Object.keys(instances);
    list.forEach(storeName => subscribes.subscribe(storeName, forceUpdate));

    return (): void => {
      list.forEach(storeName => subscribes.unsubscribe(storeName, forceUpdate));
    }
  }, [forceUpdate, instances]);
}
