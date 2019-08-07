# ✨TS-React-Starter 

> 简单友好的 Typescript+React 快速启动模板

## 特性

- ❤️ 内置Ts友好的状态管理[TypeRedux](https://github.com/whj1995/type-redux)

- 💪 全链路的类型保护

- ⚡️ Ajax的完美约束

- 🌈 无痛感Mock数据

- ✍️ 易于测试

## 快速开始

### 启动项目

``` bash
npm i # 安装依赖

npm run start # 启动

npm run type-check:watch # 开启ts类型检查
```

### 如何发送一个请求

1. 定义请求接口

``` ts
// src/interface/api/hello.d.ts

interface IApi {
  '/hello/{name}': {
    get: {
      params: {
        name: string;
      };
      body: never;
      querys: never;
      response: {
        text：string;
      };
    };
    put: never;
    delete: never;
    post: never;
  }
}
```

2. 发起请求

此时*window.Get*方法自动约束了*hello/{name}*接口，包括url地址、请求参数、Response等

![](https://raw.githubusercontent.com/whj1995/images-host/master/%E6%89%B9%E6%B3%A8%202019-08-07%20104712.png)

![](https://raw.githubusercontent.com/whj1995/images-host/master/%E6%89%B9%E6%B3%A8%202019-08-07%20104941.png)

### 如何无痛感的Mock数据

接上例

``` ts
// src/config/index.ts

export const config = {
  mock: true // 设置为true
};
```

之后，请求自动走Mock

[更多Mock详情查看](https://github.com/whj1995/ts-faker/tree/master/test)

## 例子

https://github.com/whj1995/ts-react-demo