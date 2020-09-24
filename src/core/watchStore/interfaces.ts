export interface ObserverStore extends Object {
  [property: string]: any;
  update: () => void;
}
