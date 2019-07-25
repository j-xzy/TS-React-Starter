import { reducers } from '@/store/createStore';
import { initialState } from '@/store/state';
import { createStore } from 'type-redux';

describe('mutation', () => {
  let store = createStore(initialState, reducers);

  beforeEach(() => {
    store = createStore(initialState, reducers);
  });

  it('example', () => {
    expect(store.getState().hello).toEqual('');
    store.commit('updateHello', 'hello');
    expect(store.getState().hello).toEqual('hello');
  });
});
