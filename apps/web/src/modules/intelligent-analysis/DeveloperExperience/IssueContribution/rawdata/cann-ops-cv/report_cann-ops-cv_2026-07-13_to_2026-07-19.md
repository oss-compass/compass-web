# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **13** 个 Issue
+ 其中外部 Issue **1** 个、内部 **12** 个；I1–I3 及 G 基于「外部且成熟」的 **1** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 3 / Closed 10**，关闭率 **76.9%**。
+ 总体体验分为 **51.4/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P2 | I3 · 总结与关闭 | 41.0 | 关闭阶段存在严重痛点，解决证据得分极低且关闭后无知识沉淀 |
| P0 | I2 · 讨论与解决 | 60.6 | 关闭阶段解决证据与知识沉淀缺失 |
| P2 | I1 · 分配与首次响应 | 78.8 | 分流整体有效但开放Issue标签缺失，Bot仅在命令触发时介入标签… |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中补充解决方案摘要、关键变更链接和后续反馈路径 |
| REC-02 | P1 | 要求在PR提交前进行简要技术方案讨论或在设计字段中补充方案描述 |
| REC-03 | P1 | Bot自动添加类型标签并设置超时提醒，超时未响应自动@维护者 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 13 |
| Open / Closed | 3 / 10 |
| 关闭率 | 76.9% |
| 类型构成 | 缺陷 4 / 需求 6 / 咨询 1 / 其他 2 |
| 总体体验分 | 51.4/100（D） |
| 首次响应时间 | 中位 0.6h；均值 5.5h |
| 关闭周期 | 中位 24.0h；均值 1.3天 |
| 7天响应率 | 100.0% |
| 评论数/Issue | 0.85 |
| 标签覆盖率 | 76.9% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 91.0/100 |
| 置信度 | 中 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 82.1 | 0/13（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 72.8 |
| I1 · 分配与首次响应 | 78.8 | 0/1（0.0%） | 相对可控 | `OBJ_RESPONSE_SPEED` 60.0 |
| I2 · 讨论与解决 | 60.6 | 0/1（0.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 0.0 |
| I3 · 总结与关闭 | 41.0 | 1/1（100.0%） | 需改进 | `OBJ_CLOSURE_REUSE` 0.0 |
| G · Bot/Agent 治理（参考） | 70.5 | 0/1（0.0%） | 参考项 | `SUB_BOT_HELPFULNESS` 50.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 关闭阶段解决证据与知识沉淀缺失 | OBJ_SOLUTION_EVIDENCE：均值 0.0，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 | 社区无法追溯解决方案，知识无法沉淀复用 |
| PP-02 | P1 | I2 · 讨论与解决 | 技术讨论深度不足缺乏社区参与 | OBJ_SOLUTION_EVIDENCE：均值 0.0，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 | 技术决策过程不透明，社区无法参与讨论和审查 |
| PP-03 | P1 | G · Bot/Agent 治理 | 开放Issue存在Bot治理缺位 | OBJ_BOT_GOVERNANCE：均值 60.0，低分 0/1；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/1 | 开放Issue缺乏自动化分类和超时提醒，可能被遗忘 |
| PP-04 | P2 | I1 · 分配与首次响应 | 开放Issue标签缺失影响分类检索 | OBJ_RESPONSE_SPEED：均值 60.0，低分 0/1；OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 100.0，低分 0/1 | 开放Issue无法通过标签分类检索，影响社区参与和问题发现 |
| PP-05 | P2 | I1 · 分配与首次响应 | 需求模板关键字段填写不完整 | OBJ_RESPONSE_SPEED：均值 60.0，低分 0/1；OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 100.0，低分 0/1 | 需求价值和技术方案不清晰，影响评估优先级和方案审查 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段解决证据与知识沉淀缺失（I2 · 讨论与解决）

- **[#621](https://gitcode.com/cann/ops-cv/issues/621) [Question|问题咨询]: 【社区任务】关于 GaussianBlur 高通道用例 A100 标准性能数据及测试口径的确认** — 0分
  - 痛点原因：仅停留在评论讨论和指派阶段，未关联任何PR、代码提交或文档链接等实质性解决证据。
  - 原文依据：
    - `TreamTik`：[@renruhai](https://gitcode.com/renruhai)    - `renruhai`：您好， 1. 性能优先考虑C=1,3,4场景 2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上    - `TreamTik`：>您好， >1. 性能优先考虑C=1,3,4场景 >2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 >3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上 [@renruhai](https://gitcod…    - `nunnons2`：assigned to @renruhai    - `nunnons2`：assigned to @fullt
#### PP-02 技术讨论深度不足缺乏社区参与（I2 · 讨论与解决）

- **[#621](https://gitcode.com/cann/ops-cv/issues/621) [Question|问题咨询]: 【社区任务】关于 GaussianBlur 高通道用例 A100 标准性能数据及测试口径的确认** — 0分
  - 痛点原因：仅停留在评论讨论和指派阶段，未关联任何PR、代码提交或文档链接等实质性解决证据。
  - 原文依据：
    - `TreamTik`：[@renruhai](https://gitcode.com/renruhai)    - `renruhai`：您好， 1. 性能优先考虑C=1,3,4场景 2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上    - `TreamTik`：>您好， >1. 性能优先考虑C=1,3,4场景 >2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 >3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上 [@renruhai](https://gitcod…    - `nunnons2`：assigned to @renruhai    - `nunnons2`：assigned to @fullt
#### PP-03 开放Issue存在Bot治理缺位（G · Bot/Agent 治理）

- **[#621](https://gitcode.com/cann/ops-cv/issues/621) [Question|问题咨询]: 【社区任务】关于 GaussianBlur 高通道用例 A100 标准性能数据及测试口径的确认** — 50分
  - 痛点原因：无bot介入，给中性分
  - 原文依据：
    - `TreamTik`：[@renruhai](https://gitcode.com/renruhai)    - `renruhai`：您好， 1. 性能优先考虑C=1,3,4场景 2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上    - `TreamTik`：>您好， >1. 性能优先考虑C=1,3,4场景 >2. 对于NPU算子来说，应该不要C的限制，如果实现时有问题可以再讨论。 >3. 统计性能时统计端到端耗时，会把GPU拆分耗时也加上 [@renruhai](https://gitcod…    - `nunnons2`：assigned to @renruhai    - `nunnons2`：assigned to @fullt
#### PP-04 开放Issue标签缺失影响分类检索（I1 · 分配与首次响应）

#### PP-05 需求模板关键字段填写不完整（I1 · 分配与首次响应）


## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | Issue维护者；候选负责人 `renruhai` |
| 触发条件 | PR合并关闭Issue时 |
| 具体动作 | 在关闭评论中补充解决方案摘要、关键变更链接和后续反馈路径 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 60 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 0.0，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 100.0，低分 0/1 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 0.0，低分 1/1 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | renruhai回答三个问题，用户确认收到并上传数据 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `renruhai` |
| 触发条件 | 需求或Bug类Issue创建时 |
| 具体动作 | 要求在PR提交前进行简要技术方案讨论或在设计字段中补充方案描述 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；平均评论数提升至 2 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 0.0，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 100.0，低分 0/1 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 0.0，低分 1/1 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | renruhai回答三个问题，用户确认收到并上传数据 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `renruhai` |
| 触发条件 | Issue创建后未使用/assign命令时 |
| 具体动作 | Bot自动添加类型标签并设置超时提醒，超时未响应自动@维护者 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 10 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 60.0，低分 0/1；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 60.0，低分 0/1 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 100.0，低分 0/1 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入但人工处理良好，有明确assignee | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **82.1/100**，整体相对可控，但仍需关注：模板填写质量参差，部分需求Issue的Benefit和Design…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.4 | 内容真实有效，技术背景具体，无AI幻觉或噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 72.8 | 背景和目标明确，关联PR清晰，但缺少结构化章节和详细技术描述。 |


### I1 · 分配与首次响应
本阶段分数为 **78.8/100**，整体相对可控，但仍需关注：分流整体有效但开放Issue标签缺失，Bot仅在命令触发时介入标签…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 100.0 | 均值 100.0，低分 0/1 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 60.0 | 均值 60.0，低分 0/1 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 82.0 | 有明确assignee，renruhai实际回复并回答问题 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 72.0 | 分配给renruhai且实际回复，但无标签分类 |


### I2 · 讨论与解决
本阶段分数为 **60.6/100**，整体相对可控，但仍需关注：关闭阶段解决证据与知识沉淀缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 100.0 | 均值 100.0，低分 0/1 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 0.0 | 均值 0.0，低分 1/1 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 78.0 | renruhai回答三个问题，用户确认收到并上传数据 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 75.0 | 三个问题均获回答，用户确认收到，但仍在等待验收 |


### I3 · 总结与关闭
本阶段分数为 **41.0/100**，本阶段需要改进，主要问题是：关闭阶段存在严重痛点，解决证据得分极低且关闭后无知识沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 0.0 | 均值 0.0，低分 1/1 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 30.0 | 均值 30.0，低分 1/1 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 70.0 | 有后续验收动作，但未明确其他反馈路径 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 90.0 | issue仍open，无过早关闭风险 |

代表低分 Issue：[#621](https://gitcode.com/cann/ops-cv/issues/621)
问题：[Question|问题咨询]: 【社区任务】关于 GaussianBlur 高通道用例 A100 标准性能数据及测试口径的确认。

### G · Bot/Agent 治理
本阶段分数为 **70.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 60.0 | 均值 60.0，低分 0/1 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/1 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 75.0 | 无bot介入但人工处理良好，有明确assignee |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 50.0 | 无bot介入，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 50.0 | 无bot介入，给中性分 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 13 | 51.4 | 首期基线 | 82.1 | 78.8 | 60.6 | 41.0 | 70.5 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **2 位社区响应者**贡献 **2 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `renruhai` | 1 |
| `liu-wei` | 1 |

Top1 响应占比 **50.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.0/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-07-13_to_2026-07-19.json`。
