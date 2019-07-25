interface IApi {
  '/hello/{name}': {
    get: {
      params: {
        name: string;
      };
      body: never;
      querys: never;
      response: IModel.IText;
    };
    put: never;
    delete: never;
    post: never;
  }
}