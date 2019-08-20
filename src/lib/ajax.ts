export async function Get<T extends IAjaxUtil.IGetUrl>(urlPattern: T, params: IAjaxUtil.IGetParams<T> = {} as any) {
  return await adFetch<Promise<IAjaxUtil.IGetReponse<T>>>(urlPattern, 'get', params);
}

export async function Post<T extends IAjaxUtil.IPostUrl>(urlPattern: T, params: IAjaxUtil.IPostParams<T> = {} as any) {
  return await adFetch<Promise<IAjaxUtil.IPostReponse<T>>>(urlPattern, 'post', params);
}

export async function Put<T extends IAjaxUtil.IPutUrl>(urlPattern: T, params: IAjaxUtil.IPutParams<T> = {} as any) {
  return await adFetch<Promise<IAjaxUtil.IPutReponse<T>>>(urlPattern, 'put', params);
}

export async function Delete<T extends IAjaxUtil.IDeleteUrl>(urlPattern: T, params: IAjaxUtil.IDeleteParams<T> = {} as any) {
  return await adFetch<Promise<IAjaxUtil.IDeleteReponse<T>>>(urlPattern, 'delete', params);
}

export async function adFetch<T>(urlPattern: string, method: IAjaxUtil.IHttpMethod, params: any): Promise<T> {
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
        p.querys[k] && (query += `${k}=${p.querys[k]}&`);
      }
    }
    query = query.slice(0, query.length - 1);
  }
  if (query) {
    return base + query;
  }
  return base;
}

interface INormalizeUrlParams {
  params?: {
    [p: string]: string;
  };
  querys?: {
    [p: string]: string;
  };
}
