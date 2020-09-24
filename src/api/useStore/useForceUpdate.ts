import {useCallback, useState} from 'react';

export function useForceUpdate(): () => void {
  const [, setState] = useState(0);

  return useCallback((): void => setState(tick => tick + 1), [setState]);
}
