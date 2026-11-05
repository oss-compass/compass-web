# 社区工程 API 接入

报告与总览已切换到测试后端，历史静态 JSON 仅作为开发样本保留；接口失败显示重试，不回退静态数据。

## 数据链路

- `CiExperience/api.ts` 复用社区入门的 `compassApiFetch`，校验同仓库、同流水线与同日期的 dataset/journey。
- 报告页先读取 `/ci-experience/ci-data` 仓库目录，再按需读取 `?repo=`。单仓响应同时传递指标与旅程，子组件不再读取全局静态 `CI_JOURNEY`。
- 总览组件仅在 CI 模块挂载时查询 `/ci-experience/ci-data/overview`；第三方嵌入报告视图不读取总览数据。
- 轻量总览只含统计所需字段，不可作为单仓报告的数据源。全量 `/ci-data/all` 仍保留。
- React Query 缓存 5 分钟，请求支持取消；切仓重置日期，同仓刷新保留有效的历史日期选择。
- 19 个 CANN 仓库由后端目录生成选择项，包括 ops-math、ge；仓库内部 key 与 GitCode slug 统一映射，未知仓库显示空状态。
- 当前数据集没有组织维度；其他组织显示空状态，不复用 CANN 数据。
- 痛点 scope 与 `JSON.stringify([dimkey,kb,title])` 保持不变，沿用现有公开读与 actions 写接口及 409 冲突处理。

## 环境

复用 `NEXT_PUBLIC_COMPASS_API_URL`、`NEXT_PUBLIC_USER_JOURNEY_API_PREFIX`。

本地同域开发代理配置：

```env
NEXT_PUBLIC_COMPASS_API_URL=
NEXT_PUBLIC_USER_JOURNEY_API_PREFIX=/user-journey-api-test/user-journey
```

现有 Next rewrites 将测试前缀转发到 `127.0.0.1:18099/user-journey-api/`。直连测试后端时应使用其内部 `/user-journey-api/user-journey` 前缀。

测试服务实际代码目录是 `/root/xyz/cogito-backend`。CI 分支中的 API、service、配置与对应测试已同步到此目录；只重启 `compass-backend-test`，连接测试 ES 19200。

## 日期与兼容

目录保留原始 `latest_day/days_count`，增加 `latest_complete_day/complete_days_count`。报告默认选后端截断后的 `dataset.days` 最后一日。没有完整评分日时显示空状态，0 分仍有效。读取旧 ES 数据时补 dimkey/root、归一化 stats，并重新派生同源旅程，不回写历史文档。

缺失评分保持未评估，低可信度评分显示提示；评分版本来自当日报告。generated_at 缺失时保留为空，uploaded_at 仅表示入库时间。

## 验证

- runtime 2026-11-03：71 分、8 个问题；amct/opbase 默认完整日为 2026-11-02。
- 实际 19 仓数据的轻量与全量总览计算结果逐项相等，包含 114 条周问题。
- HTTP gzip：全量约 13.6 MB，轻量约 191 KB；样本请求约 32 秒降至 5.9 秒。
- 前端 CI 模块及路由共 41 项测试通过；API、查询缓存、切仓、历史日期保留、未知仓库、错误重试、零分与缺分均有覆盖，并回归已有痛点判读与仓库分类聚合测试。
- 后端 CI 模块 51 项测试通过；前端 TypeScript 检查与修改模块 ESLint 检查通过。
- 浏览器验证 runtime、ops-math、ge 报告和社区工程总览，确认读取测试 API，未出现页面运行时异常。

后端 API 细节见 `cogito-backend/md/ci_experience_reports.md`。全量后端回归尚受现有环境示例完整性断言与 Issue 磁盘缓存测试线程退出挂起影响；CI 相关测试独立通过。

## 动态分析与附录

- 单仓 API 的 `report_context.boards[day]` 与 dataset/journey 一起返回。分析、评分明细、问题分类、责任方及版本信息全部取当前选中日的后端结果，并验证仓库、流水线和日期一致性。
- 移除前端的固定归因、固定建议、历史分类数量、固定评分公式和权重；没有来源数据时显示“未提供”，不将旧字典当作当前口径。
- 附录展示当日观测指标与评分明细。完整字典/公式尚未进入源报告时，不展示本地历史字典；源 board 可通过 `scoring_rules` 提供对应日的规则文本。
- 总览附录展示后端已加载仓库的实际观测范围，不再使用静态分类统计。
- 仓库目录支持后端新增仓库，不维护前端白名单；内部 key 与 name/slug 的别名关系来自 API，证据链接基址来自 `dataset.repository_url`。
- 步骤介绍仅展示源数据 description，空趋势不画人为 0 点，缺少状态不默认判为正常。风险颜色、图标、界面标签和排版继续由前端管理。
- `runtimeSources.test.ts` 遍历报告/总览的 CI 内部依赖图，防止再次引入本地 JSON 或 CI_DATA/CI_JOURNEY；补充当日/历史日切换、零分、缺少规则、无建议和后端分类计数测试。

本次动态化验证：后端 CI 相关 55 项测试、前端 CI/路由及新增分类测试共 48 项通过，TypeScript 与修改模块 ESLint 检查通过。真实测试 API 返回 runtime 107 个观测日上下文，最新日 8 个问题；浏览器实际切换 2026-11-03 → 2026-11-02 后，分析与分类统计同步更新，证据链接使用后端 repository_url，无页面运行时错误。

浏览器验收使用独立构建目录，避免与现有 7059 开发服务竞争 .next；临时预览已停止。
