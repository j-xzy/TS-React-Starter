export async function Get<T extends IGetUrl>(urlPattern: T, params: IGetParams<T> = {} as any) {
  return await adFetch<Promise<IGetReponse<T>>>(urlPattern, 'get', params);
}

export async function Post<T extends IPostUrl>(urlPattern: T, params: IPostParams<T> = {} as any) {
  return await adFetch<Promise<IPostReponse<T>>>(urlPattern, 'post', params);
}

export async function Put<T extends IPutUrl>(urlPattern: T, params: IPutParams<T> = {} as any) {
  return await adFetch<Promise<IPutReponse<T>>>(urlPattern, 'put', params);
}

export async function Delete<T extends IDeleteUrl>(urlPattern: T, params: IDeleteParams<T> = {} as any) {
  return await adFetch<Promise<IDeleteReponse<T>>>(urlPattern, 'delete', params);
}

export async function adFetch<T>(urlPattern: string, method: IHttpMethod, params: any): Promise<T> {
  if (window.config.mock) {
    const { default: mockData }: any = await import('@/mock/data.json');
    if (mockData[urlPattern] && mockData[urlPattern][method] && mockData[urlPattern][method].response) {
      return await new Promise((resolve) => {
        resolve(mockData[urlPattern][method].response);
      });
    }
  }

  let url = normalizeUrl(urlPattern, params as any);
  if (!/^https?:\/\//.test(url)) {
    url = window.config.host + url;
  }

  return await fetch(url, {
    method,
    ...params
  }).then((r) => r.json());
}

window.Get = Get;
window.Put = Put;
window.Post = Post;
window.Delete = Delete;

/**
 * 格式化urlpattern
 */
export function normalizeUrl(url: string, p: INormalizeUrlParams) {
  let [base] = url.split('?');
  let query = '';
  if (p.params) {
    for (const k in p.params) {
      if (p.params.hasOwnProperty(k)) {
        const reg = new RegExp(`{${k}}`, 'g');
        base = base.replace(reg, p.params[k]);
      }
    }
  }
  if (p.querys) {
    query = '?';
    for (const k in p.querys) {
      if (p.querys.hasOwnProperty(k)) {
        query += `${k}=${p.querys[k]}&`;
      }
    }
    query = query.slice(0, query.length - 1);
  }
  if (query) {
    return base + query;
  }
  return base;
}

// #region declaration
interface INormalizeUrlParams {
  params?: {
    [p: string]: string;
  };
  querys?: {
    [p: string]: string;
  };
}

type IHttpMethod = 'get' | 'post' | 'put' | 'delete';

type IUrl<T extends IHttpMethod> = {
  [p in keyof IApi]: IApi[p][T] extends never ? never : p
}[keyof IApi];

type IGetUrl = IUrl<'get'>;
type IPutUrl = IUrl<'put'>;
type IPostUrl = IUrl<'post'>;
type IDeleteUrl = IUrl<'delete'>;

interface IParams<T extends keyof IApi, P extends IHttpMethod> {
  body: IApi[T][P]['body'];
  params: IApi[T][P]['params'];
  querys: IApi[T][P]['querys'];
}

type IExistParamsKeys<T extends keyof IApi, P extends IHttpMethod> = {
  [k in keyof IParams<T, P>]: IParams<T, P>[k] extends never ? never : k
}[keyof IParams<T, P>];

type IExistParams<T extends keyof IApi, P extends IHttpMethod> = {
  [k in IExistParamsKeys<T, P>]: IApi[T][P][k]
};

type IOmitRequestInit = Omit<RequestInit, 'body' | 'method'>;

type IGetParams<T extends keyof IApi> = IExistParams<T, 'get'> & IOmitRequestInit;
type IPostParams<T extends keyof IApi> = IExistParams<T, 'post'> & IOmitRequestInit;
type IPutParams<T extends keyof IApi> = IExistParams<T, 'put'> & IOmitRequestInit;
type IDeleteParams<T extends keyof IApi> = IExistParams<T, 'delete'> & IOmitRequestInit;

type IGetReponse<T extends IGetUrl> = IApi[T]['get']['response'];
type IPostReponse<T extends IPostUrl> = IApi[T]['post']['response'];
type IPutReponse<T extends IPutUrl> = IApi[T]['put']['response'];
type IDeleteReponse<T extends IDeleteUrl> = IApi[T]['delete']['response'];
// #endregion
