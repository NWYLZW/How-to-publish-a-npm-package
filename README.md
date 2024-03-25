# How to publish a npm package?

|en-US|[zh-Hans](./README.zh-Hans.md)

What the fuck is this question? Maybe you think the question is so foolish when 2025 has arrived, but you know what? I can't publish a package with type when I use the exports, it's so incredible.
## Who is it for?

First, we need to figure out who the target users are. Let's look at the table directly:

| TypeScript | module   | resolution | how to support                      | supported |
|------------|----------|------------|-------------------------------------|-----------|
| 4.9        | commonjs | ---        | exports no type, only typesVersions | ✔︎        |
| 4.9        | commonjs | ---        | directory                           | ✔︎        |
| 4.9        | commonjs | ---        | exports                             | ✖︎        |
| 4.9        | commonjs | ---        | typesVersions                       | ✔︎        |
| 4.9        | esnext   | node       | exports no type, only typesVersions | ✔︎        |
| 4.9        | esnext   | node       | directory                           | ✔︎        |
| 4.9        | esnext   | node       | exports                             | ✖︎        |
| 4.9        | esnext   | node       | typesVersions                       | ✔︎        |
| 4.9        | esnext   | nodenext   | exports no type, only typesVersions | ✔︎        |
| 4.9        | esnext   | nodenext   | directory                           | ✔︎        |
| 4.9        | esnext   | nodenext   | exports                             | ✖︎        |
| 4.9        | esnext   | nodenext   | typesVersions                       | ✔︎        |
| 4.9        | nodenext | ---        | exports no type, only typesVersions | ✔︎        |
| 4.9        | nodenext | ---        | directory                           | ✔︎        |
| 4.9        | nodenext | ---        | exports                             | ✖︎        |
| 4.9        | nodenext | ---        | typesVersions                       | ✔︎        |
| 5.x        | esnext   | bundler    | exports no type, only typesVersions | ✖︎        |
| 5.x        | esnext   | bundler    | directory                           | ✔︎        |
| 5.x        | esnext   | bundler    | exports                             | ✔︎        |
| 5.x        | esnext   | bundler    | typesVersions                       | ✔︎        |
| 5.x        | nodenext | nodenext   | exports no type, only typesVersions | ✔︎        |
| 5.x        | nodenext | nodenext   | directory                           | ✔︎        |
| 5.x        | nodenext | nodenext   | exports                             | ✔︎        |
| 5.x        | nodenext | nodenext   | typesVersions                       | ✔︎        |

Let's explain some of the terms in the table:

- `module`: Here refers to the [module type](https://www.typescriptlang.org/tsconfig#module) declared in the user's tsconfig, such as `commonjs`, `nodenext`, `esnext`, etc.
- `resolution`: Here refers to the [module resolution strategy](https://www.typescriptlang.org/tsconfig#moduleResolution) declared in the user's tsconfig, such as `node`, `classic`, `bundler`, etc.
- Type provision method: Here refers to the type mapping rules provided to users through package.json in the published package.\
  Here we can provide various type mapping rules to users in multiple ways, such as `exports`, `typesVersions`, `types`, etc.
  - `exports`: Here refers to the [export rules](https://nodejs.org/api/packages.html#exports-sugar) declared in package.json.\
    The Node.js documentation does not involve too much type-related information, we can read [related information](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html) in the TypeScript 4.7 version ChangeLog.
  - `typesVersions`: Here refers to the [type mapping rules](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection) declared in package.json.\
    Alas, you can't use `*` otherwise ts will die for users to see, the limitations are great. It also cannot handle conditions.
  - `types`: Here refers to the [type file](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package) declared in package.json.\
    This is the simplest, but also the least flexible, because you can only provide one type file, and you cannot provide multiple versions of type files through this method.

From the perspective of the developer's export method:
- `directory` is fully compatible, it is absolutely possible in any user usage scenario.\
  But relatively speaking, if you don't want users to add a dist in the path when using the code, you can't build and output the product very conveniently locally.
- `exports no type, only typesVersions` can be used without thinking under 4.9, but under 5.x `resolution: bundler` cannot correctly provide types for users.\
  It seems to be a good choice when you don't need to consider higher versions, but if you want to support higher versions, you must consider this problem, after all, the world is not always the same.
- The type export of `exports` cannot be used under ts4.9, and it is fully compatible on ts 5.x. It can be used without considering lower version ts users.\
  Great, compared to the above, this seems to be a complementary option, maybe we can think of other ways?
- `typesVersions` is also fully compatible, but it does not support `conditional export`, and it is impossible to distinguish the types of esm and cjs packages. It can be used without thinking when there is no need to distinguish the node environment.

Combining specific use, we can use `exports` + `typesVersions` for publishing.\
In this case, we can use `exports` to support the recognition mechanism of higher versions of ts, and use `typesVersions` to support the recognition mechanism of lower versions of ts.\
But we need a dividing line, from which version do we start using `exports`? This is critical, here we can use 4.7 and 5.0 as the dividing points for judgment, to see which scenario covers a wider range.

## Other

* If you choose to use `exports`, don't forget to export `package.json`. Your users might need to access the dependency data through your package. If you don't do this, they might have to calculate the path, which could be very inconvenient for them.
