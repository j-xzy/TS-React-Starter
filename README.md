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

此时*window.Get*方法自动约束了 hello/{name} 接口

地址被约束：

![](https://raw.githubusercontent.com/whj1995/images-host/master/ts-temp-url.gif)

请求参数被约束：

![](https://raw.githubusercontent.com/whj1995/images-host/master/ts-temp-params.gif)

Response被约束：

![](https://raw.githubusercontent.com/whj1995/images-host/master/ts-temp-response.gif)


### 如何无痛感的Mock数据

接口定义完成之后，将 *config.mock* 设置为 *true*：

``` ts
// src/config/index.ts

export const config = {
  mock: true // 设置为true
};
```

之后，请求自动走Mock

[更多Mock详情查看](https://github.com/whj1995/ts-faker/tree/master/test)

### 最佳实践

常用的配置项、方法挂载在全局window下，可在任意地方使用。

1. window.config
2. window.useMappedState
3. window.commit
4. window.dispatch
5. window.Get、window.Post、window.Put、window.Delete


## Rxjs版

https://github.com/whj1995/TS-Rx-React-Starter

## 例子

https://github.com/whj1995/ts-react-demo
