import {ObserverStore} from '../watchStore';

export function set<Target extends ObserverStore>
(this: any, target: Target, property: string, value: any): boolean {
  const isEqual: boolean = this[property] === value;
  this[property] = value;

  if (property !== 'update'
    && !isEqual
    && !property.startsWith('_')
    && typeof this[property] !== 'function'
  ) {
    target.update();
  }

  return true;
}
