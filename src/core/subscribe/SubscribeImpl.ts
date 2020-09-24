import {Subscribes, Subscribe} from './interfaces';

export class SubscribeImpl implements Subscribe {
  private subscribes: Subscribes = {};

  hasStore(storeName: string) {
    return this.subscribes.hasOwnProperty(storeName);
  }

  getUpdate(storeName: string) {
    return () => {
      this.update(storeName);
    }
  }

  update(storeName: string) {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName].forEach(cb => cb());
  }

  subscribe(storeName: string, cb: () => void) {
    if (!this.hasStore(storeName)) {
      this.subscribes[storeName] = [];
    }

    this.subscribes[storeName].push(cb);
  }

  unsubscribe(storeName: string, cb: () => void) {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName] = this.subscribes[storeName].filter(subscribe => subscribe !== cb);
  }
}
