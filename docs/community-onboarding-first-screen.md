# 社区入门总览首屏加载优化（2026-11-11）

## 范围

优化默认社区入门总览的浏览器脚本加载、组件挂载和请求启动顺序。覆盖 `/intelligent-analysis/experience/overview`、`/intelligent-analysis/community-experience/overview` 及其 org 路由。没有修改后端接口或报告页的 cards 调用。

## 调整

- 社区贡献、社区工程由静态导入改为 Next dynamic，用户选择对应模块后才挂载、加载相关组件。
- 入口外壳提前启动默认 summary 请求，与总览脚本下载并行。外壳和总览复用同一个 Query Key 和在途请求；15 秒 staleTime 避免脚本加载完成后立即重复查询。现有基于 `overview-summary` 前缀的缓存失效仍生效。非社区入门及截图入口不预取该默认查询。
- 默认先准备顶部 summary、score-insights、close-rate-trends、能力对标摘要。仓库表格、能力对标明细、共性问题和评分说明复用现有 DeferredReportSection，在接近可视区域（240px 提前量）时挂载。仓库 cards、对标明细、共性问题请求同时按可见性启用；选择“共性问题”时立即准备对应数据。
- DeferredReportSection 新增可选 eager、onReady、placeholder，保留现有报告页面的默认行为。已挂载区域滚出屏幕后保持挂载；离开页面断开观察。无 IntersectionObserver 时正常加载全部区域，captureMode 立即挂载全部区域，避免截图漏内容。
- 问题详情和顶部评分趋势弹窗仅在打开时加载和挂载；评分规则正文仅在打开后加载。
- 页面入口、模块切换和分段加载使用原生骨架占位，避免等待脚本时整屏只有一个加载提示。首屏评分分布和对标摘要使用 React.memo，减少下方请求和交互导致的重复渲染。

能力对标摘要和明细仍共享现有 CapabilityBenchmark 源模块；此次对其明细延迟的是组件挂载和请求，不将它描述为独立的明细代码包。

## 静态核对

- 修改文件运行 Prettier、ESLint 和限定目录的 git diff --check。
- 既有入口测试补充新预取 Hook 的 mock；遵照用户要求，没有运行前端测试、类型编译、开发编译或生产构建。
- 没有生成新的构建产物，没有修改依赖和锁文件，没有部署正式环境。

本次没有构建前后的 bundle 分析和浏览器 Performance 实测，不能给出首屏缩短多少毫秒或多少百分比的结论。

## 发布后复核

使用同一正式 URL、浏览器和网络条件，区分冷缓存与再次访问：记录 FCP、LCP 和顶部指标实际展示时间，并比较 JavaScript 下载/解析与主线程长任务。确认默认进入时不下载社区贡献/社区工程组件，滚动接近仓库表格后才启动 cards，打开弹窗时功能正常。窄屏与 captureMode 分别检查，防止只优化桌面普通模式。
