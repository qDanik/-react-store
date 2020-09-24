import {Subscribes, Subscribe} from './interfaces';

export class SubscribeImpl implements Subscribe {
  private subscribes: Subscribes = {};

  getList(): Subscribes {
    return this.subscribes;
  }

  getUpdate(storeName: string) {
    return (): void => {
      this.update(storeName);
    }
  }

  hasStore(storeName: string): boolean {
    return this.subscribes.hasOwnProperty(storeName);
  }

  subscribe(storeName: string, cb: () => void): void {
    if (!this.hasStore(storeName)) {
      this.subscribes[storeName] = [];
    }
    this.subscribes[storeName].push(cb);
  }

  unsubscribe(storeName: string, cb: () => void): void {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName] = this.subscribes[storeName].filter(subscribe => subscribe !== cb);
  }

  update(storeName: string): void {
    if (!this.hasStore(storeName)) {
      return;
    }

    this.subscribes[storeName].forEach(cb => cb());
  }

}
