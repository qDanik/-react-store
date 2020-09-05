import {CreateStore, DefaultStores, IGetStoresFromComponent} from '../interfraces';
import getGlobalContext from './getGlobalContext';
import getStoresBase from './getStoresBase';

const getStoresFromComponent: IGetStoresFromComponent = (values: any): any => {
  const context: CreateStore = getGlobalContext();
  const stores: DefaultStores = context.getInstances();

  return getStoresBase(stores, values);
};

export default getStoresFromComponent;
