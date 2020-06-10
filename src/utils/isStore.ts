const isStore = (value: any): boolean =>
  value && typeof value === 'object' && (typeof (value.update) === 'function' && value.storeName);

export default isStore;
