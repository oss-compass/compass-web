# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **5** 个 Issue
+ 其中外部 Issue **4** 个、内部 **1** 个；I1–I3 及 G 基于「外部且成熟」的 **4** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 2 / Closed 3**，关闭率 **60.0%**。
+ 总体体验分为 **51.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 50.5 | 关闭阶段缺乏沉淀与反馈路径 |
| P1 | I2 · 讨论与解决 | 59.9 | 讨论深度不足且存在停滞 |
| P1 | I1 · 分配与首次响应 | 65.4 | 首次响应时间极不稳定 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中添加解决方案摘要、关联MR链接和后续反馈路径 |
| REC-02 | P1 | 配置自动提醒或升级机制通知维护者 |
| REC-03 | P1 | 配置标签自动打标规则和assignee自动分配策略 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 5 |
| Open / Closed | 2 / 3 |
| 关闭率 | 60.0% |
| 类型构成 | 缺陷 3 / 需求 1 / 其他 1 |
| 总体体验分 | 51.5/100（D） |
| 首次响应时间 | 中位 17.0h；均值 1.4天 |
| 关闭周期 | 中位 1.2天；均值 2.7天 |
| 7天响应率 | 100.0% |
| 评论数/Issue | 1.00 |
| 标签覆盖率 | 60.0% |
| 指派覆盖率 | 40.0% |
| 数据完整性 | 84.5/100 |
| 置信度 | 低 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 89.2 | 0/5（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 84.8 |
| I1 · 分配与首次响应 | 65.4 | 2/4（50.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 50.0 |
| I2 · 讨论与解决 | 59.9 | 1/4（25.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 40.4 |
| I3 · 总结与关闭 | 50.5 | 3/4（75.0%） | P0 | `OBJ_CLOSURE_REUSE` 11.2 |
| G · Bot/Agent 治理（参考） | 64.0 | 1/4（25.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 30.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏沉淀与反馈路径 | OBJ_CLOSURE_REUSE：均值 11.2，低分 4/4；OBJ_DECISION_TRANSPARENCY：均值 66.2，低分 1/4 | 社区用户无法从已关闭Issue获取解决方案参考，也无法了解后续反馈渠道 |
| PP-02 | P1 | I1 · 分配与首次响应 | 首次响应时间极不稳定 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/4 | 部分用户等待5天才收到首次回复，严重影响社区信任和问题解决效率 |
| PP-03 | P1 | I1 · 分配与首次响应 | 标签与指派覆盖率不足 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/4 | Issue缺乏标签分类和正式指派，影响优先级排序和检索效率 |
| PP-04 | P1 | I2 · 讨论与解决 | 讨论深度不足且存在停滞 | OBJ_SOLUTION_EVIDENCE：均值 40.4，低分 4/4；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.0，低分 1/4 | 功能建议类Issue长期无进展，社区贡献意愿受挫，技术讨论未充分展开 |
| PP-05 | P2 | G · Bot/Agent 治理 | 开放Issue缺乏Bot自动化分流 | OBJ_BOT_GOVERNANCE：均值 30.0，低分 3/4；OBJ_BOT_MISCLOSE_REVERSE：均值 90.0，低分 0/4 | 社区提交的Issue无法获得自动化初步处理，增加维护者手动分流负担 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏沉淀与反馈路径（I3 · 总结与关闭）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：关闭说明仅为机器人提示关联MR合并，无方案文档与主链接，未留存任何问题定位与解决信息供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `songkai111`：你好，我们将尽快安排同事分析    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：关闭时无任何文字说明，且缺乏方案文档与重复主链接，未留存任何可供后续复用的参考信息。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 0分
  - 痛点原因：未提供方案文档和重复issue主链接，关闭说明仅15字过于简略，导致后续无法有效复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 45分
  - 痛点原因：关闭说明仅解释删除无效文件原因，未提供方案文档化记录与重复issue主链接，复用参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)
#### PP-02 首次响应时间极不稳定（I1 · 分配与首次响应）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：全程仅有套话回复和打标签，未提供任何实质技术分析或解决方案，最终被机器人直接关闭。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：首次响应仅指派负责人并承诺关注，缺乏技术解答或具体处理方案，未构成实质回应。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
#### PP-03 标签与指派覆盖率不足（I1 · 分配与首次响应）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：全程仅有套话回复和打标签，未提供任何实质技术分析或解决方案，最终被机器人直接关闭。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：首次响应仅指派负责人并承诺关注，缺乏技术解答或具体处理方案，未构成实质回应。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
#### PP-04 讨论深度不足且存在停滞（I2 · 讨论与解决）

- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 31分
  - 痛点原因：仅停留在指派负责人阶段，无关联PR、文档或release等实质性解决证据。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 38分
  - 痛点原因：虽关联了已合并PR，但无commit引用与文档链接，且关闭评论仅为机器人自动回复，缺乏人工解决证据说明。
  - 原文依据：
    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)    - `songkai111`：你好，我们将尽快安排同事分析    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 38分
  - 痛点原因：虽有关联PR和文字修复说明，但缺乏直接的代码提交链接与文档链接作为强证据支撑，证据链不完整。
  - 原文依据：
    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 54分
  - 痛点原因：虽有关联PR与机器人关闭评论，但缺乏文档链接、release引用及明确的修复验证证据，导致证据强度不足。
  - 原文依据：
    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved
#### PP-05 开放Issue缺乏Bot自动化分流（G · Bot/Agent 治理）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 20分
  - 痛点原因：Bot仅因关联MR合并便机械关闭issue，未验证用户问题是否真正解决，缺乏有效互动。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 20分
  - 痛点原因：Bot仅机械执行打标与自动关闭，评论数为零，缺乏实质性互动与有效反馈。
  - 原文依据：
    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，未提供任何状态更新或修复说明，缺乏有效沟通。
  - 原文依据：
    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 在关闭评论中添加解决方案摘要、关联MR链接和后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 11.2，低分 4/4；OBJ_DECISION_TRANSPARENCY：均值 66.2，低分 1/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 11.2，低分 4/4 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 66.2，低分 1/4 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足故给保守分。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue创建后48小时无响应 |
| 具体动作 | 配置自动提醒或升级机制通知维护者 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 50.0，低分 2/4 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 70.0，低分 1/4 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | songkai111实际承接并提交MR，但无正式assignee指派，责任归属… | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue创建后 |
| 具体动作 | 配置标签自动打标规则和assignee自动分配策略 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 50.0，低分 2/4 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 70.0，低分 1/4 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | songkai111实际承接并提交MR，但无正式assignee指派，责任归属… | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **89.2/100**，整体相对可控，但仍需关注：Issue创建质量高，输入结构完整，无显著痛点。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.6 | 内容为真实用户编包失败反馈，有具体命令和报错截图，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 84.8 | 包含问题描述、环境信息、复现步骤、预期结果及截图，结构化完整。 |


### I1 · 分配与首次响应
本阶段分数为 **65.4/100**，整体相对可控，但仍需关注：首次响应时间极不稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 50.0 | 均值 50.0，低分 2/4 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 70.0 | 均值 70.0，低分 1/4 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 72.0 | songkai111实际承接并提交MR，但无正式assignee指派，责任归属… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 75.0 | bug-report标签正确，songkai111接手并创建修复MR，分流路径… |

代表低分 Issue：[#222](https://gitcode.com/cann/cann-samples/issues/222)
问题：[Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败。

### I2 · 讨论与解决
本阶段分数为 **59.9/100**，本阶段需要改进，主要问题是：讨论深度不足且存在停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 70.0 | 均值 70.0，低分 1/4 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 40.4 | 均值 40.4，低分 4/4 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 66.2 | 仅一条回复称将安排分析，随后直接创建MR，讨论环节薄弱但推进有效。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 67.5 | MR#336移除内部头文件引用修复编译问题并已合并，用户目标得到有效满足。 |

代表低分 Issue：[#220](https://gitcode.com/cann/cann-samples/issues/220)
问题：建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）。

### I3 · 总结与关闭
本阶段分数为 **50.5/100**，本阶段需要改进，主要问题是：关闭阶段缺乏沉淀与反馈路径。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 11.2 | 均值 11.2，低分 4/4 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 66.2 | 均值 66.2，低分 1/4 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 47.5 | 关闭时未说明后续反馈路径或重新开启条件，信息不足故给保守分。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 88.8 | MR合并后由bot关闭并加resolved标签，修复与关闭有明确因果关系，非过… |

代表低分 Issue：[#220](https://gitcode.com/cann/cann-samples/issues/220)
问题：建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）。

### G · Bot/Agent 治理
本阶段分数为 **64.0/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 30.0 | 均值 30.0，低分 3/4 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 90.0 | 均值 90.0，低分 0/4 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 72.5 | 人工已创建修复MR，bot仅完成收尾关闭，交接顺畅无阻塞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 67.5 | bot在MR合并后自动关闭并加resolved标签，流程守卫有效，帮助闭环。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 71.2 | bot动作准确：MR合并触发关闭、添加resolved标签，时机合适无误判。 |

代表低分 Issue：[#219](https://gitcode.com/cann/cann-samples/issues/219)
问题：[Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 5 | 51.5 | 首期基线 | 89.2 | 65.4 | 59.9 | 50.5 | 64.0 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **1 位社区响应者**贡献 **5 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `songkai111` | 5 |

Top1 响应占比 **100.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：84.5/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-cann-samples/report_cann-cann-samples_2026-07-06_to_2026-07-12.json`。
