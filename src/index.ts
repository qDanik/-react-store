import {stones} from './utils/constant';
import * as interfaces from './interfraces';

export {default as createStore} from './api/createStore';
export {default as Store} from './api/store';
export {default as Provider} from './components/provider';
export {default as useStore} from './api/useStore';

export {default as getStores} from './utils/getStores';

declare global {
  interface Window {
    [stones]: interfaces.DefaultStores;
  }
}
