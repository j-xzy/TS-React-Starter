import { commit, dispatch, useMappedState } from '@/store/createStore';
import { Post, Delete, Put, Get } from '@/lib/ajax';
import { config } from '@/config';

declare global {
  interface Window {
    config: typeof config;
    Post: typeof Post;
    Delete: typeof Delete;
    Put: typeof Put;
    Get: typeof Get;
    commit: typeof commit;
    dispatch: typeof dispatch;
    useMappedState: typeof useMappedState;
  }
}
