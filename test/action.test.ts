import { reducers } from '@/store/createStore';
import { initialState } from '@/store/state';
import { createStore } from 'type-redux';

describe('action', () => {
  let store = createStore(initialState, reducers);

  beforeEach(() => {
    store = createStore(initialState, reducers);
  });

  it('example', async () => {
    expect(store.getState().hello).toEqual('');
    await store.dispatch('getHelloFromRemote');
    expect(store.getState().hello).not.toBe('');
  });
});
