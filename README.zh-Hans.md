# 如何发布一个 npm 包？

|zh-Hans|[en-US](./README.md)

这是什么傻逼问题？也许你会觉得这个问题在 2024 都要到了的时候看起来简直蠢到不能再蠢了，但是你知道吗？我到现在为止我都无法通过 exports 发布一个带有类型的包，这简直是太难以置信了。

## 为谁发？

首先，我们要搞清楚目标用户到底是谁？直接看表格：

| TypeScript 版本 | module | resolution | 类型提供方式 | 是否可用 |
| --- | --- | --- | --- | --- |
| 4.9 | commonjs | --- | exports 不导出类型，只通过 typesVersions 向外部提供 | ✅❎ |
| 4.9 | nodenext | --- | exports 不导出类型，只通过 typesVersions 向外部提供 | ✅❎ |

对表格中对一些名词进行解释：

- `module`：在这里指的是在用户的 tsconfig 中声明的[模块类型](https://www.typescriptlang.org/tsconfig#module)，比如 `commonjs`、`nodenext`、`esnext` 等等。
- `resolution`：在这里指的是在用户的 tsconfig 中声明的[模块解析策略](https://www.typescriptlang.org/tsconfig#moduleResolution)，比如 `node`、`classic`、`bundler` 等等。
- 类型提供方式：在这里指的是在发布包中通过 package.json 向用户提供的类型映射规则。\
  在这里我们可以通过多种方式向用户提供各种类型映射规则，比如 `exports`、`typesVersions`、`types` 等等。
  - `exports`：在这里指的是在 package.json 中声明的[导出规则](https://nodejs.org/api/packages.html#exports-sugar)。\
    在 Node.js 文档中并没有过多的涉及到类型相关的信息，在这里我们对其进行一个[简单的总结](#TODO)。
  - `typesVersions`：在这里指的是在 package.json 中声明的[类型映射规则](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection)。\
    唉，不能用 `*` 不然 ts 就会死给用户看，局限性很大。也无法处理 condition。
  - `types`：在这里指的是在 package.json 中声明的[类型文件](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package)。\
    这个是最简单的，但是也是最不灵活的，因为你只能提供一个类型文件，而且你无法通过这个方式提供多个版本的类型文件。
