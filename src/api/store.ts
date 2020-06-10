import {IStore, SubscribeType} from '../interfraces';

class Store implements IStore {
  storeName = 'default';

  subscribes: SubscribeType[] = [];

  getStoreName(): string {
    return this.storeName;
  }

  update = (): void => {
    this.subscribes.forEach(callback => callback());
  }

  subscribe = (callback: SubscribeType) => {
    this.subscribes.push(callback);
  }

  unsubscribe = (callback: SubscribeType) => {
    this.subscribes = this.subscribes.filter(subscribe => subscribe !== callback);
  }
}

export default Store;
