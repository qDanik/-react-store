export function get<Target>(this: any, target: Target, property: string): void {
  return this[property];
}
