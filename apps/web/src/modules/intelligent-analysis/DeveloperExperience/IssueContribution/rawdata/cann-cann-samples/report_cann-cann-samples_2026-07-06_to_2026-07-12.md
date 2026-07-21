# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **5** 个 Issue
+ **Open 2 / Closed 3**，关闭率 **60.0%**。
+ 总体体验分为 **48.9/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 47.8 | 关闭阶段缺乏复用与后续路径 |
| P1 | I2 · 讨论与解决 | 51.1 | 开放Issue讨论长期停滞无进展 |
| P1 | I1 · 分配与首次响应 | 65.2 | 首次实质性响应严重缺失 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 强制填写结构化关闭总结模板（含根因、修复方案、影响范围、后续反馈路径） |
| REC-02 | P1 | 自动提醒assignee跟进并引导社区讨论，设置定期进度更新要求 |
| REC-03 | P1 | 设置首次实质性响应SLA，要求包含技术分析或路由判断，部署自动提醒 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 5 |
| Open / Closed | 2 / 3 |
| 关闭率 | 60.0% |
| 类型构成 | 缺陷 3 / 需求 1 / 其他 1 |
| 总体体验分 | 48.9/100（D） |
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
| I0 · 创建 | 90.4 | 0/5（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 87.8 |
| I1 · 分配与首次响应 | 65.2 | 2/5（40.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 40.0 |
| I2 · 讨论与解决 | 51.1 | 2/5（40.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 32.3 |
| I3 · 总结与关闭 | 47.8 | 4/5（80.0%） | P0 | `OBJ_CLOSURE_REUSE` 9.0 |
| G · Bot/Agent 治理（参考） | 65.2 | 0/5（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 36.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏复用与后续路径 | OBJ_CLOSURE_REUSE：均值 9.0，低分 5/5；OBJ_DECISION_TRANSPARENCY：均值 59.0，低分 2/5 | 知识无法沉淀复用，用户无法了解后续反馈路径，社区经验流失 |
| PP-02 | P1 | I2 · 讨论与解决 | 开放Issue讨论长期停滞无进展 | OBJ_SOLUTION_EVIDENCE：均值 32.3，低分 5/5；OBJ_RESULT_FORMATION_TIMELINESS：均值 56.0，低分 2/5 | 功能建议和路线图无法推进，社区参与感降低，贡献者流失 |
| PP-03 | P1 | I1 · 分配与首次响应 | 首次实质性响应严重缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 40.0，低分 3/5；OBJ_RESPONSE_SPEED：均值 76.0，低分 1/5 | 用户等待5天仅得到模板化回复，问题无法及时进入处理流程，信任度下降 |
| PP-04 | P2 | G · Bot/Agent 治理 | Bot覆盖缺位与误关闭信号并存 | OBJ_BOT_GOVERNANCE：均值 36.0，低分 3/5；OBJ_BOT_MISCLOSE_REVERSE：均值 92.0，低分 0/5 | 开放Issue无自动化跟进和标签辅助，关闭Issue可能存在流程风险 |
| PP-05 | P2 | I1 · 分配与首次响应 | 标签与指派机制不完善 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 40.0，低分 3/5；OBJ_RESPONSE_SPEED：均值 76.0，低分 1/5 | Issue无法有效分类和检索，责任归属不明确，增加管理负担 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏复用与后续路径（I3 · 总结与关闭）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：仅由机器人自动关联关闭，无人工解决方案总结与文档沉淀，无法为其他用户提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `songkai111`：你好，我们将尽快安排同事分析    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#221](https://gitcode.com/cann/cann-samples/issues/221) cann-samples Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时无文字说明、方案文档及链接，仅指派负责人，未沉淀任何可复用信息。
  - 原文依据：
    - `zhangzijie`：assigned to @yangyang016
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：关闭说明为空，未提供方案文档或相关链接，仅指派了负责人跟进，无任何复用价值。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 0分
  - 痛点原因：无方案文档沉淀且关闭说明仅15字，未关联重复issue，导致修复经验难以被社区复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 45分
  - 痛点原因：关闭说明仅解释删除无效文件原因，未沉淀方案文档且无主链接，导致后续复用参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)
#### PP-02 开放Issue讨论长期停滞无进展（I2 · 讨论与解决）

- **[#221](https://gitcode.com/cann/cann-samples/issues/221) cann-samples Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅进行了指派操作，未提供任何关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `zhangzijie`：assigned to @yangyang016
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 31分
  - 痛点原因：仅停留在分配负责人阶段，无关联PR、文档链接和release引用等实质性产出，未形成解决闭环。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭原因依赖关联issue合并，自身解决证据链不完整。
  - 原文依据：
    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)    - `songkai111`：你好，我们将尽快安排同事分析    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 38分
  - 痛点原因：虽有关联PR和修复说明，但缺乏commit引用和文档链接等强证据支撑，导致证据强度不足。
  - 原文依据：
    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 54分
  - 痛点原因：缺乏文档链接与release引用，且关闭评论仅由机器人自动触发，导致修复证据链不够完整。
  - 原文依据：
    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved
#### PP-03 首次实质性响应严重缺失（I1 · 分配与首次响应）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：首次响应超120小时且全程无实质技术分析，仅打标签后由机器人自动关闭。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#221](https://gitcode.com/cann/cann-samples/issues/221) cann-samples Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅指派了负责人，未提供任何实质性解答或反馈。
  - 原文依据：
    - `zhangzijie`：assigned to @yangyang016
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：首次响应仅为客套感谢与指派人员，耗时近17小时，且始终未提供任何实质性技术解答。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo
#### PP-04 Bot覆盖缺位与误关闭信号并存（G · Bot/Agent 治理）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 20分
  - 痛点原因：Bot错误地将未解决的编包失败问题标记为已解决并自动关闭，缺乏人工确认导致治理失效。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#219](https://gitcode.com/cann/cann-samples/issues/219) [Bug-Report|缺陷反馈]: 测试清单 ci_functional_test.yaml 中 matmul_basic 的 stdout_contain…** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，未留下任何说明性评论告知关闭原因及关联PR，缺乏有效沟通。
  - 原文依据：
    - `songkai111`：该文件 tests/ci_functional_test.yaml 是早期添加的最小功能测试清单原型，其中的样例句柄和路径引用已与实际工程结构不匹配，导致 CI 功能测试无法正确执行。该文件当前处于无效状态，因此将其删除以保持仓库整洁。 …    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - [关联PR #332（merged）](https://gitcode.com/cann/cann-samples/merge_requests/332)
- **[#218](https://gitcode.com/cann/cann-samples/issues/218) [Bug-Report|缺陷反馈]: vector_add算子存在UB越界可能性** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，未留下任何说明性评论，导致治理过程缺乏透明度。
  - 原文依据：
    - `songkai111`：已收到您的反馈，我们正在处理中    - `songkai111`：已在 `Samples/0_Introduction/vector_add/main.asc` 的 `calc_tiling_params` 函数中修复此问题。在计算 tileSize 后增加 32 字节对齐向下取整，确保 UB 分配总量…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - [关联PR #330（merged）](https://gitcode.com/cann/cann-samples/merge_requests/330)
#### PP-05 标签与指派机制不完善（I1 · 分配与首次响应）

- **[#222](https://gitcode.com/cann/cann-samples/issues/222) [Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败** — 0分
  - 痛点原因：首次响应超120小时且全程无实质技术分析，仅打标签后由机器人自动关闭。
  - 原文依据：
    - `songkai111`：你好，我们将尽快安排同事分析    - `huangkejie1647`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue222    - [关联PR #336（merged）](https://gitcode.com/cann/cann-samples/merge_requests/336)
- **[#221](https://gitcode.com/cann/cann-samples/issues/221) cann-samples Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅指派了负责人，未提供任何实质性解答或反馈。
  - 原文依据：
    - `zhangzijie`：assigned to @yangyang016
- **[#220](https://gitcode.com/cann/cann-samples/issues/220) 建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）** — 0分
  - 痛点原因：首次响应仅为客套感谢与指派人员，耗时近17小时，且始终未提供任何实质性技术解答。
  - 原文依据：
    - `songkai111`：感谢您的建议，我们将指定mc2领域的committer来关注该建议    - `songkai111`：assigned to @wang-minbo

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 强制填写结构化关闭总结模板（含根因、修复方案、影响范围、后续反馈路径） |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 9.0，低分 5/5；OBJ_DECISION_TRANSPARENCY：均值 59.0，低分 2/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 9.0，低分 5/5 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 59.0，低分 2/5 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明重新开启条件或后续反馈路径，仅bot自动关闭。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区运营；候选负责人 `songkai111` |
| 触发条件 | Issue开放超过7天无新评论 |
| 具体动作 | 自动提醒assignee跟进并引导社区讨论，设置定期进度更新要求 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 32.3，低分 5/5；OBJ_RESULT_FORMATION_TIMELINESS：均值 56.0，低分 2/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 56.0，低分 2/5 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 32.3，低分 5/5 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅一条泛泛回复，无技术分析讨论，但后续MR创建推动了解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 维护团队；候选负责人 `songkai111` |
| 触发条件 | Bug类Issue创建后24小时内 |
| 具体动作 | 设置首次实质性响应SLA，要求包含技术分析或路由判断，部署自动提醒 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 40.0，低分 3/5；OBJ_RESPONSE_SPEED：均值 76.0，低分 1/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 40.0，低分 3/5 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 76.0，低分 1/5 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无assignee分配，但songkai111实际承担处理并创建MR，责任隐含… | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **90.4/100**，整体相对可控，但仍需关注：无明显痛点，Issue创建质量高，结构化模板使用规范。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.0 | 真实用户反馈，含具体环境与复现命令，无AI幻觉或噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 87.8 | 包含完整复现步骤、环境信息、错误截图、预期结果和结构化章节，信息充分。 |


### I1 · 分配与首次响应

本阶段分数为 **65.2/100**，整体相对可控，但仍需关注：首次实质性响应严重缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 40.0 | 均值 40.0，低分 3/5 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 76.0 | 均值 76.0，低分 1/5 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 76.8 | 无assignee分配，但songkai111实际承担处理并创建MR，责任隐含… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 75.4 | bug-report标签正确，后续有MR修复，但首次响应慢且仅泛泛回复。 |

代表低分 Issue：[#222](https://gitcode.com/cann/cann-samples/issues/222)
问题：[Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败。

### I2 · 讨论与解决

本阶段分数为 **51.1/100**，本阶段需要改进，主要问题是：开放Issue讨论长期停滞无进展。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 56.0 | 均值 56.0，低分 2/5 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 32.3 | 均值 32.3，低分 5/5 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 61.0 | 仅一条泛泛回复，无技术分析讨论，但后续MR创建推动了解决。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 62.0 | MR#336实际修复了头文件引用问题并已合并，用户目标得到满足。 |

代表低分 Issue：[#221](https://gitcode.com/cann/cann-samples/issues/221)
问题：cann-samples Development Roadmap (2026 Q3)。

### I3 · 总结与关闭

本阶段分数为 **47.8/100**，本阶段需要改进，主要问题是：关闭阶段缺乏复用与后续路径。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 9.0 | 均值 9.0，低分 5/5 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 59.0 | 均值 59.0，低分 2/5 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 49.0 | 关闭时未说明重新开启条件或后续反馈路径，仅bot自动关闭。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 88.0 | MR已合并且修复内容匹配问题，关闭合理，但用户未确认且关闭原因标记为进行中。 |

代表低分 Issue：[#220](https://gitcode.com/cann/cann-samples/issues/220)
问题：建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）。

### G · Bot/Agent 治理

本阶段分数为 **65.2/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 36.0 | 均值 36.0，低分 3/5 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 92.0 | 均值 92.0，低分 0/5 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 72.6 | Bot在人工MR合并后执行收尾，交接顺畅，未造成流程停滞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 63.4 | Bot在MR合并后自动关闭并加resolved标签，流程收尾有效，属中性偏正向… |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 67.0 | Bot关闭和标签动作时机准确，在MR合并后执行，无错误阻断或误判。 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 5 | 48.9 | 首期基线 | 90.4 | 65.2 | 51.1 | 47.8 | 65.2 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **1 位社区响应者**贡献 **5 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `songkai111` | 5 |

Top1 响应占比 **100.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：84.5/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/cann-cann-samples/report_cann-cann-samples_2026-07-06_to_2026-07-12.json`。
