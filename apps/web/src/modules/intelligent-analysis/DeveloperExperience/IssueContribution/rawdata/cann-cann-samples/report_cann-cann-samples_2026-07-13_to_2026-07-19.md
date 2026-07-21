# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **2** 个 Issue
+ **Open 0 / Closed 2**，关闭率 **100.0%**。
+ 总体体验分为 **47.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I3 · 总结与关闭 | 38.0 | 存在关闭沉淀不足的痛点，缺乏后续反馈路径和经验复用。 |
| P2 | I1 · 分配与首次响应 | 53.0 | 存在响应效率与分流质量偏低的潜在痛点，客观得分仅 45.0。 |
| P2 | I2 · 讨论与解决 | 69.3 | 该阶段表现尚可，无明显痛点，但讨论深度可能依赖直接提交而非文字交流。 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P2 | 补充关闭评论模板，要求填写解决方案摘要及后续反馈路径 |
| REC-02 | P2 | 在快速响应后补充实质性技术回复或明确分流计划 |
| REC-03 | P2 | 扩大 Bot 自动响应与分流配置的覆盖范围 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 2 |
| Open / Closed | 0 / 2 |
| 关闭率 | 100.0% |
| 类型构成 | 缺陷 1 / 需求 1 |
| 总体体验分 | 47.6/100（D） |
| 首次响应时间 | 中位 1.4h；均值 1.4h |
| 关闭周期 | 中位 9.7h；均值 9.7h |
| 7天响应率 | 100.0% |
| 评论数/Issue | 0.50 |
| 标签覆盖率 | 50.0% |
| 指派覆盖率 | 50.0% |
| 数据完整性 | 85.0/100 |
| 置信度 | 低 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 80.8 | 0/2（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 69.0 |
| I1 · 分配与首次响应 | 53.0 | 0/2（0.0%） | 需改进 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 0.0 |
| I2 · 讨论与解决 | 69.3 | 0/2（0.0%） | 相对可控 | `OBJ_SOLUTION_EVIDENCE` 42.3 |
| I3 · 总结与关闭 | 38.0 | 1/2（50.0%） | 需改进 | `OBJ_CLOSURE_REUSE` 0.0 |
| G · Bot/Agent 治理（参考） | 67.6 | 0/2（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 40.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P2 | I3 · 总结与关闭 | 关闭后缺乏复用沉淀与反馈路径 | OBJ_CLOSURE_REUSE：均值 0.0，低分 2/2；OBJ_DECISION_TRANSPARENCY：均值 52.5，低分 1/2 | 社区用户无法了解关闭后的跟进机制，知识沉淀流失。 |
| PP-02 | P2 | I1 · 分配与首次响应 | 分流与响应阶段客观得分偏低 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 0.0，低分 2/2；OBJ_RESPONSE_SPEED：均值 90.0，低分 0/2 | 用户可能仅得到模板回复，缺乏深入交流，影响问题推进效率。 |
| PP-03 | P2 | G · Bot/Agent 治理 | Bot 自动化覆盖率存在缺口 | OBJ_BOT_GOVERNANCE：均值 40.0，低分 1/2；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/2 | 自动化治理覆盖不全，部分流程依赖人工，增加维护负担。 |

### 4.1 低分 Issue 明细

#### PP-01 关闭后缺乏复用沉淀与反馈路径（I3 · 总结与关闭）

- **[#224](https://gitcode.com/cann/cann-samples/issues/224) [Requirement|需求建议]: 更新ops-tensor submodule的版本** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动提示，无方案文档沉淀及关联链接，未留下可供复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - `cann-robot`：add label resolved    - `liuyufan0725`：/assign    - `cann-robot`：assigned to @liuyufan0725    - [关联PR #337（merged）](https://gitcode.com/cann/cann-samples/merge_requests/337)
- **[#223](https://gitcode.com/cann/cann-samples/issues/223) [Bug-Report|缺陷反馈]: cann-samples中matmul类样例依赖ops-tensor仓代码，引用ops-tensor仓时使用commit…** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档且无重复链接，无法为后续类似问题提供参考。
  - 原文依据：
    - `chenkang30`：closed from codehub    - `chenkang30`：changed custom state from 进行中 to 已完成    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：unassigned @yangyang016
#### PP-02 分流与响应阶段客观得分偏低（I1 · 分配与首次响应）

- **[#224](https://gitcode.com/cann/cann-samples/issues/224) [Requirement|需求建议]: 更新ops-tensor submodule的版本** — 0分
  - 痛点原因：仅有机器人指派及随MR合并自动关闭的操作，全程无人工实质性回应。
  - 原文依据：
    - `liuyufan0725`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liuyufan0725    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - [关联PR #337（merged）](https://gitcode.com/cann/cann-samples/merge_requests/337)
- **[#223](https://gitcode.com/cann/cann-samples/issues/223) [Bug-Report|缺陷反馈]: cann-samples中matmul类样例依赖ops-tensor仓代码，引用ops-tensor仓时使用commit…** — 0分
  - 痛点原因：仅进行了指派和关闭等状态流转操作，全程未提供任何实质性的技术解答或沟通。
  - 原文依据：
    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：unassigned @yangyang016    - `chenkang30`：closed from codehub    - `chenkang30`：changed custom state from 进行中 to 已完成
#### PP-03 Bot 自动化覆盖率存在缺口（G · Bot/Agent 治理）

- **[#224](https://gitcode.com/cann/cann-samples/issues/224) [Requirement|需求建议]: 更新ops-tensor submodule的版本** — 20分
  - 痛点原因：Bot仅机械执行打标、分配与关闭，无任何评论交互，缺乏有效说明与引导，治理深度不足。
  - 原文依据：
    - `liuyufan0725`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liuyufan0725    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - [关联PR #337（merged）](https://gitcode.com/cann/cann-samples/merge_requests/337)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者 |
| 触发条件 | Issue 关闭时 |
| 具体动作 | 补充关闭评论模板，要求填写解决方案摘要及后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 0.0，低分 2/2；OBJ_DECISION_TRANSPARENCY：均值 52.5，低分 1/2 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 0.0，低分 2/2 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 52.5，低分 1/2 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未明确说明后续反馈路径或重新开启条件，信息不足 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 维护者 |
| 触发条件 | 首次响应时 |
| 具体动作 | 在快速响应后补充实质性技术回复或明确分流计划 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 0.0，低分 2/2；OBJ_RESPONSE_SPEED：均值 90.0，低分 0/2 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 0.0，低分 2/2 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 90.0，低分 0/2 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 用户自我认领/assign，bot确认assignee，责任归属清晰 | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot 维护者 |
| 触发条件 | Issue 创建时 |
| 具体动作 | 扩大 Bot 自动响应与分流配置的覆盖范围 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 40.0，低分 1/2；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/2 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 40.0，低分 1/2 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 100.0，低分 0/2 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | bot assign后用户自行创建MR推进，MR合并后bot关闭，交接顺畅无停滞 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **80.8/100**，整体相对可控，但仍需关注：该阶段表现良好，无明显痛点，需求创建结构化程度较高。。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 92.5 | 内部贡献者提交的真实需求，内容具体合理，无幻觉或噪音迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 69.0 | 结构化章节完整，含背景、价值、设计方案，但作为需求缺少更详细技术方案细节 |


### I1 · 分配与首次响应

本阶段分数为 **53.0/100**，本阶段需要改进，主要问题是：存在响应效率与分流质量偏低的潜在痛点，客观得分仅 45.0。。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 0.0 | 均值 0.0，低分 2/2 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 90.0 | 均值 90.0，低分 0/2 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 67.5 | 用户自我认领/assign，bot确认assignee，责任归属清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 62.5 | bot正确执行assign，issue关联MR#337并最终resolved，… |


### I2 · 讨论与解决

本阶段分数为 **69.3/100**，整体相对可控，但仍需关注：该阶段表现尚可，无明显痛点，但讨论深度可能依赖直接提交而非文字交流。。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 100.0 | 均值 100.0，低分 0/2 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 42.3 | 均值 42.3，低分 2/2 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 53.5 | 无文字讨论，但用户直接创建MR推进，从创建到关闭仅2.2小时，行动推进高效 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 80.0 | 用户需求通过MR#337合并实现，issue标记resolved关闭，目标有效… |


### I3 · 总结与关闭

本阶段分数为 **38.0/100**，本阶段是本周短板之一，主要问题是：存在关闭沉淀不足的痛点，缺乏后续反馈路径和经验复用。。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 0.0 | 均值 0.0，低分 2/2 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 52.5 | 均值 52.5，低分 1/2 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 30.0 | 关闭后未明确说明后续反馈路径或重新开启条件，信息不足 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 81.5 | MR已合并后由bot关闭，有resolved标签，无过早关闭风险 |

代表低分 Issue：[#224](https://gitcode.com/cann/cann-samples/issues/224)
问题：[Requirement|需求建议]: 更新ops-tensor submodule的版本。

### G · Bot/Agent 治理

本阶段分数为 **67.6/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 40.0 | 均值 40.0，低分 1/2 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/2 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 65.0 | bot assign后用户自行创建MR推进，MR合并后bot关闭，交接顺畅无停滞 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 62.5 | bot执行assign响应命令、MR合并后自动关闭、添加resolved标签，… |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 65.0 | assign、close、label三个动作均准确合规且时机合适，无错误阻断或… |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 2 | 47.6 | 首期基线 | 80.8 | 53.0 | 69.3 | 38.0 | 67.6 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **0 位社区响应者**贡献 **0 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `—` | 0 |

Top1 响应占比 **0.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：85.0/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/cann-cann-samples/report_cann-cann-samples_2026-07-13_to_2026-07-19.json`。
