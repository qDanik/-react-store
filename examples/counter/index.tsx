import React, {useCallback} from 'react';
import {createStore, Provider, useStore} from '../../src';

export class CounterStore {
  count = 0;

  increase(): void {
    this.count++;
  }

  decrease(): void {
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}

const store = createStore({}, {
  counter: new CounterStore(),
});

const rootStore = store.getStores;

type StoreCatalog = ReturnType<typeof rootStore>;

const Counter = () => {
  const counter = useStore('file');
  const onIncrease = useCallback(() => counter.increase(), [counter.count]);
  const onDecrease = useCallback(() => counter.decrease(), [counter.count]);

  return (
    <div>
      <p>
        <span>Count:</span>
        <span>{counter.getCount()}</span>
      </p>
      <button onClick={onIncrease}>Increase</button>
      <button onClick={onDecrease}>Decrease</button>
    </div>
  )
}

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
)
