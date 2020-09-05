import {stones} from './constant';
import getGlobal from './getGlobal';
import {CreateStore} from '../interfraces';

const setGlobalContext = (store: CreateStore): void => {
  const state = getGlobal();
  state[stones] = store;
};

export default setGlobalContext;
