import React, {ReactElement} from 'react';
import {DefaultProps} from './interfaces';
import {ReactStoreContext} from '../constants';

export function Provider<ProviderProps extends DefaultProps>(props: ProviderProps): ReactElement {
  const {store, children} = props;

  return (
    <ReactStoreContext.Provider value={store}>
      {children}
    </ReactStoreContext.Provider>
  )
}
