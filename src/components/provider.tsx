import React, {ReactElement} from 'react';
import StonesContext from './context';
import initialize from '../core/initialize';

interface ProviderProps {
  store: any;
  children: any;
}

const Provider = (props: ProviderProps): ReactElement => {
  const {store, children} = props;
  initialize(store);

  return (
    <StonesContext.Provider value={store}>
      {children}
    </StonesContext.Provider>
  )
};

export default Provider;
