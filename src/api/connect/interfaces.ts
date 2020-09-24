import {FunctionComponent} from 'react';

export interface ConnectStores<Stores> {
  <T extends Stores, K extends keyof Stores>(values: K[], Component: FunctionComponent): FunctionComponent<Pick<T, K>>;
}
