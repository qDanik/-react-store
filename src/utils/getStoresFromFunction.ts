import {CreateStore, DefaultStores, IGetStoresFromFunction} from '../interfraces';
import {useContext} from 'react';
import StonesContext from '../components/context';
import getStoresBase from './getStoresBase';

const getStoresFromFunction: IGetStoresFromFunction = (values: any, stores?: DefaultStores): any => {
  if(!stores) {
    const context: CreateStore = useContext(StonesContext);
    stores = context.getInstances();
  }

  return getStoresBase(stores, values);
};

export default getStoresFromFunction;
