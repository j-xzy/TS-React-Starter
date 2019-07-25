import { createStore } from 'type-redux';
import { IReducers, IState } from './index';

export function store(initialState: IState, reducers: IReducers) {
  return createStore(initialState, reducers);
}
