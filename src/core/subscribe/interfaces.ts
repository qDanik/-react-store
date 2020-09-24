export abstract class Subscribe {
  getUpdate(storeName: string) {
    return (): void => {
    }
  };
  update(storeName: string) {};
  subscribe(storeName: string, cb: () => void) {};
  unsubscribe(storeName: string, cb: () => void) {};
}

export interface Subscribes {
  [key: string]: any[];
}
