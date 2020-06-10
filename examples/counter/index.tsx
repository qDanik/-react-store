import React, {useCallback} from 'react';
import {Store, createStore, Provider, useStore} from '../../src';

class CounterStore extends Store {
  storeName = 'counter';
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

// !!! Declare 'react-stones' module with controllers
// import 'react-stones';
// declare module 'react-stones' {
//   export interface DefaultStores {
//     counter: CounterController;
//   }
// }

interface DefaultStores {
  counter: CounterStore
}

const store = createStore({}, [CounterStore]);

const Counter = () => {
  // if u declare module, u shouldn pass types to useStore
  const counter = useStore<any, keyof DefaultStores>('counter');
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
