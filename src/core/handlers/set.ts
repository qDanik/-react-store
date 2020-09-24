import {ObserverStore} from '../watchStore';

export function set<Target extends ObserverStore>
(this: any, target: Target, property: string, value: any): boolean {
  this[property] = value;
  if (property !== 'update' && !property.startsWith('_') && typeof this[property] !== 'function') {
    target.update();
  }

  return true;
}
