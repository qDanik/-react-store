import {Subscribe} from '../../core';

export type DefaultStates = {
  [key: string]: any;
}

export type DefaultStores = {
  [key: string]: any;
}

export type DeclaredStores<Stores> = {
  [key: string]: Stores;
}

export interface CreateStore<State, Stores> {
  getStores: (() => Stores);
  getState: (() => State);
  useStore: PickStores<Stores>;
  subscribes: Subscribe;
}

export interface PickStores<Stores> {
  <T extends Stores, K extends keyof Stores>(values?: K): T[K];

  <T extends Stores, K extends keyof Stores>(values?: K[]): Pick<T, K>;
}
