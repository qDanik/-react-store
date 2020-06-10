import {stones} from './constant';
import getGlobal from './getGlobal';


const setStore = (name: string, instance: any): void => {
  const state = getGlobal();
  if(typeof state[stones] === 'undefined') {
    state[stones] = {};
  }

  state[stones][name] = instance;
};

export default setStore;
