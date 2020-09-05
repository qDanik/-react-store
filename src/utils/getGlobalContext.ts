import {stones} from './constant';
import getGlobal from './getGlobal';
import {CreateStore} from '../interfraces';

const getGlobalContext = (): CreateStore => {
  const state = getGlobal();

  return state[stones];
};

export default getGlobalContext;
