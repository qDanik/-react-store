import isStore from '../utils/isStore';
import {IStore} from '../interfraces';

function set(this: any, target: IStore, property: string, value: any): boolean {
  this[property] = value;
  if (property !== 'update') {
    target.update();
  }

  return true;
}

function get(this: any, target: IStore, property: string): void {
  if (isStore(this[property])) {
    this[property].update = target.update;
  }

  return this[property];
}

export default {
  get,
  set,
};
