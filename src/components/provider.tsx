import React, {ReactElement, useEffect} from 'react';
import StonesContext from './context';
import initialize from '../core/initialize';
import setGlobalContext from '../utils/setGlobalContext';

interface ProviderProps {
  store: any;
  children: any;
}

const Provider = (props: ProviderProps): ReactElement => {
  const {store, children} = props;
  initialize(store);
  setGlobalContext(store);

  return (
    <StonesContext.Provider value={store}>
      {children}
    </StonesContext.Provider>
  )
};

export default Provider;
