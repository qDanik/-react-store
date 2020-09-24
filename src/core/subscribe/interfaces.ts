export abstract class Subscribe {
  getList(): Subscribes {
    return {};
  }

  getUpdate(storeName: string): () => void {
    return (): void => {
      return;
    }
  }

  subscribe(storeName: string, cb: () => void): void {
    return;
  }

  unsubscribe(storeName: string, cb: () => void): void {
    return;
  }

  update(storeName: string): void {
    return;
  }

}

export interface Subscribes {
  [key: string]: any[];
}
