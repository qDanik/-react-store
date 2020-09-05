import Store from '../api/store';

export interface IStore {
  [key: string]: any;

  storeName: string;
  subscribes: SubscribeType[];
  getStoreName: (() => string);
  update: (() => void);
  subscribe: ((args: SubscribeType) => void);
  unsubscribe: ((args: SubscribeType) => void);
}

export interface DefaultState {
  [key: string]: any;
}

export interface CreateStore {
  getInstances: (() => DefaultStores);
  getState: (() => DefaultState);
}

export interface DefaultStores {
  [key: string]: Store;
}

export type SubscribeType = (() => void);

export type StoresNames = keyof DefaultStores;

export interface IProxy {
  instance?: IStore;
  observer: {
    [key: string]: any;
  };
  listener?: {
    [key: string]: any;
  };
}

export interface IUseStores {
  <T extends DefaultStores, K extends StoresNames>(values?: K): T[K];

  <T extends DefaultStores, K extends StoresNames>(values?: K[]): {
    [P in K]: T[P]
  };
}

export interface IGetStoresBase {
  <T extends DefaultStores, K extends StoresNames>(stores: DefaultStores, values?: K): T[K];

  <T extends DefaultStores, K extends StoresNames>(stores: DefaultStores, values?: K[]): {
    [P in K]: T[P]
  };
}

export interface IGetStoresFromFunction {
  <T extends DefaultStores, K extends StoresNames>(values?: K, stores?: DefaultStores): T[K];

  <T extends DefaultStores, K extends StoresNames>(values?: K[], stores?: DefaultStores): {
    [P in K]: T[P]
  };
}

export interface IGetStoresFromComponent {
  <T extends DefaultStores, K extends StoresNames>(values?: K): T[K];

  <T extends DefaultStores, K extends StoresNames>(values?: K[]): {
    [P in K]: T[P]
  };
}
