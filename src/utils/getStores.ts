import {CreateStore, DefaultStores, IGetStores} from '../interfraces';
import {useContext} from 'react';
import StonesContext from '../components/context';

const getStores: IGetStores = (values: any, stores?: DefaultStores): any => {
  if(!stores) {
    const context: CreateStore = useContext(StonesContext);
    stores = context.getInstances();
  }

  if (typeof stores === 'undefined') {
    throw Error('Provider should be initialize before getInstances()');
  }

  if (typeof values === 'string') {
    return stores[values];
  }

  if (!Array.isArray(values)) {
    throw Error('getInstances() should receive store name as string or array of string');
  }

  const response: any = {};
  for (const instance in stores) {
    if (!stores.hasOwnProperty(instance) || !values.includes(instance)) {
      continue;
    }

    response[instance] = stores[instance];
  }

  return response;
};

export default getStores;
