import { ICtx } from '../createStore';

export async function getHelloFromRemote(ctx: ICtx, _param: string) {
  const { text } = await window.Get('/hello/{name}', {
    params: {
      name: 'foo'
    }
  });
  ctx.commit('updateHello', text);
}
