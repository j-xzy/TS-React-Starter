declare namespace IAjaxUtil {
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
}