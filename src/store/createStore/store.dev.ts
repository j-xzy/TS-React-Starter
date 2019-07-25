import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'type-redux';
import { IReducers, IState } from './index';

export function store(initialState: IState, reducers: IReducers) {
  return createStore(initialState, reducers, applyMiddleware(createLogger()));
}
