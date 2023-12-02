# 如何发布一个 npm 包？

|zh-Hans|[en-US](./README.md)

这是什么傻逼问题？也许你会觉得这个问题在 2024 都要到了的时候看起来简直蠢到不能再蠢了，但是你知道吗？我到现在为止我都无法通过 exports 发布一个带有类型的包，这简直是太难以置信了。

## 为谁发？

首先，我们要搞清楚目标用户到底是谁？这里按照几个维度来划分：

* 运行环境：浏览器、Node.js、Bundler
  * 浏览器：ESM、UMD\
    浏览器的版本不做细致划分，按照前 ESM 时代和 ESM 时代进行区分。
  * Node.js：CommonJS、ESM\
    Node.js 也是按照前 CommonJS 时代和 ESM 时代进行区分。
  * Bundler：CommonJS、ESM
* TypeScript 版本：^4.5、^5.0

### 前端用户

虽然现在已经有了 Node.js 的服务端运行环境，以及各种 JS 的服务端解决方案了，但是 JS 还是主要运用在前端，所以我们先来看看前端用户。
