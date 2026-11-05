# Compass Web Agent 开发指南

本文件适用于 `compass-web/` 及其子目录。开始修改前，先阅读目标目录下更具体的 `AGENTS.md` 和相邻代码；具体目录的规则优先适用于该目录。默认用中文沟通，代码标识符保持英文。

## 工作原则

- 先查看 `git status --short`，识别已有修改和未跟踪文件；保留用户的工作，不覆盖、回退或清理与任务无关的内容。
- 以实际代码、`package.json`、锁文件和配置为依据；`README.md`、`docs/CONTRIBUTING.md`、`CLAUDE.md` 可作为补充，发现不一致时明确指出。
- 围绕需求做最小且完整的修改，沿用所在模块的写法。不要顺手重构其他模块、批量格式化整个仓库、升级依赖或迁移框架。
- 先搜索现有组件、Hook、请求封装和工具函数，再决定新增抽象或依赖。跨模块确有复用需求时再提取公共代码。
- 搜索时优先使用 `rg`，限定模块或文件类型；排除 `node_modules/`、`.next/`、大型 `public/test/` 数据及 `rawdata/` 存档，避免无目的扫描。
- Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.

## 技术栈与目录

项目使用 Yarn Workspaces，工作区位于 `apps/*`、`packages/*`，依赖锁文件为根目录 `yarn.lock`。

| 路径                                                   | 职责                                                   |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `apps/web/src/pages/`                                  | Next.js Pages Router 页面、SSR 入口及 API Routes       |
| `apps/web/src/modules/`                                | 按业务划分的模块，包含组件、Hook、类型、数据适配与状态 |
| `apps/web/src/common/`                                 | 应用内共享组件、工具、Hook、埋点及数据转换             |
| `apps/web/src/styles/`                                 | 全局样式、Tailwind 入口及组件库样式                    |
| `apps/web/i18n/`                                       | 英文、中文翻译资源，**独立 Git 子模块**                |
| `apps/web/public/`                                     | 静态资源和部分数据集                                   |
| `packages/ui/src/`                                     | 工作区共享 UI 组件，对外入口 `index.tsx`               |
| `packages/graphql/src/gql/`                            | GraphQL operation 源文件                               |
| `packages/graphql/src/generated.ts`                    | GraphQL Code Generator 生成的类型及查询 Hook           |
| `packages/eslint-config-custom/`、`packages/tsconfig/` | 共享 ESLint、TypeScript 配置                           |
| `apps/storybook/`                                      | 共享组件示例与交互展示                                 |

- 主应用：Next.js 15.5.9、React 19、TypeScript、Tailwind CSS 3、Sass；复杂控件已有 Ant Design 5、MUI 5。
- 服务端状态：TanStack React Query **v4**；客户端共享状态：Valtio；GraphQL 请求：`graphql-request`；部分业务使用 REST。
- 图表：ECharts、Highcharts；国际化：`next-i18next`；测试：Jest 29、Testing Library、jsdom。
- 版本以当前清单和锁文件为准。不要因 React 19 或 Next.js 15 而擅自引入 App Router、Server Actions 或其他架构迁移。

## 环境与常用命令

以下命令除特别说明外，均在 `compass-web/` 根目录执行，使用仓库已有 Yarn 环境，避免生成 npm/pnpm 锁文件。

```bash
yarn install
yarn dev
yarn build
yarn test:ci

# 单个测试文件，一次运行后退出
yarn workspace @oss-compass/web test:ci --runInBand --runTestsByPath src/modules/intelligent-analysis/DeveloperExperience/CiExperience/components/CiOverview/CiRepoProgressSection.test.ts

# 主应用静态检查
yarn workspace @oss-compass/web lint
yarn workspace @oss-compass/web exec tsc --noEmit --incremental false

# 仅检查本次变更文件；将路径替换为实际文件
yarn prettier --check AGENTS.md
yarn eslint apps/web/src/path/to/changed-file.tsx

# 需要更新 GraphQL 生成物时执行
yarn workspace @oss-compass/graphql gen

# 需要检查共享组件示例时执行
yarn workspace @oss-compass/storybook dev
```

- `yarn test` 和 `yarn workspace @oss-compass/web ts-lint` 均为 **watch 模式**，自动化验证使用上述一次性命令。
- Node 配置存在历史差异：`.nvmrc` 为 v16，CI 和 Docker 使用 18，应用已升级到 Next.js 15。先核对当前依赖的运行要求及实际 Node/Yarn 版本，不要只按 `.nvmrc` 判断兼容性，也不要顺带修改版本配置。
- Web 环境变量示例见 `apps/web/.env.example`。Next.js 应用目录为 `apps/web/`；配置前确认命令工作目录和变量加载位置，不能直接假定贡献文档所述的根目录 `.env.local` 对所有工作区生效。
- GraphQL Codegen 从远程 `${API_URL}/api/graphql` 获取 schema，且 `packages/graphql/env.js` 按 Codegen 工作目录加载 `.env.local`。执行前确认 endpoint 与环境可用。
- 类型检查、测试或构建若被既有依赖、配置或外部服务阻塞，记录具体命令和错误；不要通过关闭检查、扩大忽略范围或改动无关配置制造通过结果。

## 代码风格与模块边界

- 新增业务代码使用 TypeScript：组件用 `.tsx`，无 JSX 的逻辑用 `.ts`；现有 JavaScript 配置文件保持其格式。
- 遵循 `.prettierrc.js`：单引号、ES5 尾逗号，其他格式交给 Prettier；Tailwind 类顺序由插件处理。避免产生与功能无关的格式差异。
- 遵循共享 ESLint：单函数复杂度上限为 30，遵守 Valtio 规则；禁止新增 `@mui/*/*/*` 深层导入（配置列明的例外除外）。不要滥用 `eslint-disable`。
- React 组件使用函数组件和 Hook；命名与相邻文件一致，组件通常为 PascalCase，Hook 以 `use` 开头，工具函数用 camelCase。保持既有导出方式，不强制统一全仓库。
- 页面负责路由、布局、鉴权和数据预加载，业务逻辑放入 `src/modules/<feature>/`。模块内部的辅助逻辑就近维护，公共层不反向依赖业务模块。
- 避免新增 `any`、双重类型断言或无依据的非空断言；接口边界先收窄和校验。尊重当前 TS 配置，不在功能任务中全局开启严格模式。
- Hook 始终在组件顶层调用；补全依赖，清理事件、定时器及异步副作用。只在有明确用途时使用 `useMemo`、`useCallback`。
- 跨目录导入优先使用已配置的 `@common/*`、`@modules/*`、`@public/*`、`@styles/*` 和工作区包名。同目录使用相对路径；新增别名时同时核对 TypeScript 与 Jest 映射。

## 请求、状态与数据正确性

- GraphQL 复用 `@common/gqlClient` 和 `@oss-compass/graphql`；REST 优先复用所属业务已有的 API client，例如 UserJourney 的 `rawData/apiClient.ts`，避免在展示组件内重复拼接 URL 和处理认证。
- React Query 管理请求、缓存与失效；遵循 v4 API，不复制 v5 专属写法。Query Key 必须包含影响响应的仓库、组织、日期、筛选等参数；参数未就绪时通过 `enabled` 控制请求。
- 区分加载中、请求失败、无数据、部分数据和正常结果。失败不能伪装成空列表或成功状态，不能静默退回演示数据。
- 更新操作成功后按业务范围更新或失效缓存；查询按需传递 `AbortSignal`，防止切换条件后的旧请求影响当前展示。
- 局部交互状态优先 `useState`；只有跨组件共享时才使用已有 Valtio store。使用快照读取、proxy 执行更新，遵循仓库的 Valtio ESLint 约束。
- 保留指标口径：明确时间范围、单位、百分比、分母、聚合方式及空值含义；不能把缺失值一律当作 0。报告、旅程和指标数据应匹配同一仓库与版本，异常组合应显式报错。
- 鉴权复用现有 `AuthRequire` 和对应业务认证封装；前端权限控制用于交互，后端接口仍需校验权限。

## UI、SSR 与国际化

- 优先复用 `@oss-compass/ui`、`@common/components` 和模块内组件；沿用当前页面的 Ant Design/MUI 选择，避免为同一交互再引入新的组件库。
- 优先沿用 Tailwind、CSS/SCSS Modules 和现有主题变量。注意本项目 `md`、`lg` 等断点采用 **max-width**，`>md` 等为 min-width；不要套用 Tailwind 默认的断点含义。
- 交互元素使用语义化标签，图标按钮提供可访问名称，表单有标签，弹窗和可点击区域支持合理的键盘操作。状态变化除颜色外提供文本提示。
- 图表优先复用 `@common/components/EChartX` 等封装；自行管理实例时必须处理 resize、卸载释放和空数据。
- Pages Router 需要考虑 SSR：避免在模块初始化或服务端渲染阶段直接访问 `window`、`document`、`localStorage`。浏览器专用库沿用已有 `NoSsr` 或 `next/dynamic({ ssr: false })` 用法。
- 面向用户的新文案优先通过 `useTranslation('<namespace>')` 和现有命名空间维护；补齐 `en`、`zh` 对应键及页面语言资源加载，不为修一个页面批量改写历史文案。
- `apps/web/i18n/` 是 Git 子模块：修改前检查其独立工作树；交付时说明翻译修改与主仓库指针状态，不擅自切换分支、更新到远端最新版或提交/推送子模块。

## 生成物、环境与安全边界

- GraphQL 修改应编辑 `src/gql/**/*.graphql` 并执行 Codegen，不直接手改 `generated.ts`；交付时核对生成差异是否符合本次 operation 变更。
- 不手改 `.next/`、`node_modules/`、`*.tsbuildinfo` 等构建产物。保留 `patches/` 中已有补丁；新增补丁或锁文件变化应有明确依赖变更原因。
- `public/` 文件可被浏览器直接访问，禁止放入密钥、个人敏感数据或内部凭据。`NEXT_PUBLIC_*` 变量会暴露到客户端，只能存放可公开配置。
- 不输出或提交 `.env*` 中的真实值、访问令牌、认证文件和带凭据的日志。需要新增环境变量时，在示例文件中写占位值并说明用途。
- 变更请求地址时检查 `src/middleware.ts`、`next.config.js` 的 matcher、rewrite 和现有环境变量，明确 GraphQL、Next API Routes、UserJourney REST 各自的链路；不要将所有 `/api/*` 一概改为后端代理。
- 测试默认使用可控的 mock 或 fixture，不调用生产写接口、不触发真实通知或报告重跑。静态演示数据与真实接口保持明确边界。

## 验证与交付

- 按风险选择检查：纯文档运行格式与 diff 检查；代码修改运行相关 ESLint、一次性类型检查和受影响测试；涉及路由、共享组件或构建配置时增加生产构建。
- 使用现有 Jest / Testing Library，测试通常与代码同目录，命名为 `*.test.ts` 或 `*.test.tsx`。不要为低风险文案或样式调整添加机械测试。
- 业务逻辑重点验证真实行为与边界：空值和零值、筛选切换、聚合口径、错误响应、权限及状态转换；组件测试优先按角色、标签和用户可见文本查询，避免依赖内部实现。
- 修改共享 UI 时核对现有调用方及相关 Storybook 示例；UI 改动在条件允许时检查桌面/窄屏和加载、错误、空数据状态。
- 结束前检查 `git diff --check` 与改动范围，确认没有混入用户已有修改、敏感信息、生成垃圾或无关依赖变化。
- 交付说明写清：改了什么、为何这样改、实际运行了哪些验证，以及未完成验证的原因。未运行的测试不能声称通过。

## 参考资料

- [AGENTS.md 格式与内容组织](https://agents.md/)
- [TanStack Query v4：Query Keys](https://tanstack.com/query/v4/docs/framework/react/guides/query-keys)
- 仓库依据：`package.json`、`apps/web/package.json`、`.prettierrc.js`、`packages/eslint-config-custom/index.js`、`apps/web/tailwind.config.js`、`apps/web/jest.config.js`。
