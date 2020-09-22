import {useState} from 'react';

export const useForceUpdate = () => {
  const [, setState] = useState(0);

  return (): void => setState(tick => tick + 1);
}
