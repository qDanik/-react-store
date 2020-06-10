import {createContext} from 'react';
import {CreateStore} from '../interfraces';

export const StonesContext = createContext({
  getInstances: () => {},
  getState: () => {}
} as CreateStore);

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  StonesContext.displayName = 'StoneStore'
}

export default StonesContext
