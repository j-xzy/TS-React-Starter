import update from 'immutability-helper';
import { IGetState } from '../createStore';

export function updateHello(getState: IGetState, text: string) {
  return update(getState(), {
    hello: {
      $set: text
    }
  });
}
