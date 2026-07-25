# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **2** 个 Issue
+ 其中外部 Issue **1** 个、内部 **1** 个；I1–I3 及 G 基于「外部且成熟」的 **1** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 0 / Closed 2**，关闭率 **100.0%**。
+ 总体体验分为 **40.0/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I3 · 总结与关闭 | 29.0 | 关闭阶段知识沉淀严重缺失 |
| P2 | I1 · 分配与首次响应 | 43.0 | 分流响应阶段得分偏低（43.0），首次实质响应时间指标为0.0，缺… |
| P2 | I0 · 创建 | 62.5 | 创建阶段存在轻度痛点，50%的Issue为痛点Issue，输入质量… |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P1 | 强制填写关闭摘要模板，包含解决方案、关联MR、后续反馈路径 |
| REC-02 | P2 | 在Issue中补充技术方案说明和决策依据，而非仅关联MR |
| REC-03 | P2 | 确保所有Issue均被Bot自动分流和标签分配覆盖 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 2 |
| Open / Closed | 0 / 2 |
| 关闭率 | 100.0% |
| 类型构成 | 缺陷 1 / 需求 1 |
| 总体体验分 | 40.0/100（D） |
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
| I0 · 创建 | 62.5 | 1/2（50.0%） | 相对可控 | `SUB_INPUT_QUALITY` 32.5 |
| I1 · 分配与首次响应 | 43.0 | 0/1（0.0%） | 需改进 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 0.0 |
| I2 · 讨论与解决 | 64.8 | 0/1（0.0%） | 相对可控 | `SUB_DISCUSSION_PROGRESSION` 30.0 |
| I3 · 总结与关闭 | 29.0 | 0/1（0.0%） | P1 | `OBJ_CLOSURE_REUSE` 0.0 |
| G · Bot/Agent 治理（参考） | 68.0 | 0/1（0.0%） | 参考项 | `SUB_BOT_HELPFULNESS` 50.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P1 | I3 · 总结与关闭 | 关闭阶段知识沉淀严重缺失 | OBJ_CLOSURE_REUSE：均值 0.0，低分 1/1；OBJ_DECISION_TRANSPARENCY：均值 30.0，低分 1/1 | 已解决问题无法转化为知识资产，用户缺乏后续指引 |
| PP-02 | P2 | I2 · 讨论与解决 | 实质讨论缺失，解决证据薄弱 | OBJ_SOLUTION_EVIDENCE：均值 46.2，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 | 决策过程不透明，其他社区成员难以理解解决逻辑和复用经验 |
| PP-03 | P2 | G · Bot/Agent 治理 | 半数Issue缺乏Bot自动化参与 | OBJ_BOT_GOVERNANCE：均值 60.0，低分 0/1；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/1 | 部分Issue缺少自动化分流和关闭，增加人工维护负担且响应不一致 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段知识沉淀严重缺失（I3 · 总结与关闭）

- **[#223](https://gitcode.com/cann/cann-samples/issues/223) [Bug-Report|缺陷反馈]: cann-samples中matmul类样例依赖ops-tensor仓代码，引用ops-tensor仓时使用commit…** — 0分
  - 痛点原因：仅由系统自动关闭且无任何关闭说明与方案文档，未留下任何可复用的解决方案记录。
  - 原文依据：
    - `chenkang30`：closed from codehub    - `chenkang30`：changed custom state from 进行中 to 已完成    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：unassigned @yangyang016
#### PP-02 实质讨论缺失，解决证据薄弱（I2 · 讨论与解决）

- **[#223](https://gitcode.com/cann/cann-samples/issues/223) [Bug-Report|缺陷反馈]: cann-samples中matmul类样例依赖ops-tensor仓代码，引用ops-tensor仓时使用commit…** — 30分
  - 痛点原因：零评论无可见讨论推进，但通过codehub代码提交完成。
  - 原文依据：
    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：unassigned @yangyang016    - `chenkang30`：closed from codehub    - `chenkang30`：changed custom state from 进行中 to 已完成
#### PP-03 半数Issue缺乏Bot自动化参与（G · Bot/Agent 治理）

- **[#223](https://gitcode.com/cann/cann-samples/issues/223) [Bug-Report|缺陷反馈]: cann-samples中matmul类样例依赖ops-tensor仓代码，引用ops-tensor仓时使用commit…** — 50分
  - 痛点原因：无bot介入记录，信息不足，给中性分。
  - 原文依据：
    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：unassigned @yangyang016    - `chenkang30`：closed from codehub    - `chenkang30`：changed custom state from 进行中 to 已完成

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护团队 |
| 触发条件 | Issue关闭时 |
| 具体动作 | 强制填写关闭摘要模板，包含解决方案、关联MR、后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 0.0，低分 1/1；OBJ_DECISION_TRANSPARENCY：均值 30.0，低分 1/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 0.0，低分 1/1 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 30.0，低分 1/1 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时无后续反馈路径说明，但作为已完成内部任务影响较小。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者 |
| 触发条件 | 创建MR关联Issue时 |
| 具体动作 | 在Issue中补充技术方案说明和决策依据，而非仅关联MR |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 60 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 46.2，低分 1/1；OBJ_RESULT_FORMATION_TIMELINESS：均值 100.0，低分 0/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 100.0，低分 0/1 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 46.2，低分 1/1 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 零评论无可见讨论推进，但通过codehub代码提交完成。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | 维护团队 |
| 触发条件 | 新Issue创建时 |
| 具体动作 | 确保所有Issue均被Bot自动分流和标签分配覆盖 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升至 10% 以上 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 60.0，低分 0/1；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/1 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 60.0，低分 0/1 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 100.0，低分 0/1 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，无需交接，信息不足给中性分。 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **62.5/100**，整体相对可控，但仍需关注：创建阶段存在轻度痛点，50%的Issue为痛点Issue，输入质量…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 92.5 | 内部贡献者真实需求，无AI生成或幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 32.5 | LLM评分失败或缺失 |

代表低分 Issue：[#224](https://gitcode.com/cann/cann-samples/issues/224)
问题：[Requirement|需求建议]: 更新ops-tensor submodule的版本。

### I1 · 分配与首次响应
本阶段分数为 **43.0/100**，本阶段需要改进，主要问题是：分流响应阶段得分偏低（43.0），首次实质响应时间指标为0.0，缺…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 0.0 | 均值 0.0，低分 1/1 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 80.0 | 均值 80.0，低分 0/1 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 40.0 | 指派后迅速取消，由作者自行关闭，中间处理责任不明确。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 55.0 | yangyang016自行指派后迅速取消，无标签引导，但最终通过codehub… |


### I2 · 讨论与解决
本阶段分数为 **64.8/100**，整体相对可控，但仍需关注：讨论解决阶段表现中等（64.8），通过MR路径高效解决但缺乏实质讨…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 100.0 | 均值 100.0，低分 0/1 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 46.2 | 均值 46.2，低分 1/1 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 30.0 | 零评论无可见讨论推进，但通过codehub代码提交完成。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 75.0 | 作者自行关闭为已完成，从codehub关闭暗示代码已提交。 |


### I3 · 总结与关闭
本阶段分数为 **29.0/100**，本阶段是本周短板之一，主要问题是：关闭阶段知识沉淀严重缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 0.0 | 均值 0.0，低分 1/1 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 30.0 | 均值 30.0，低分 1/1 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 25.0 | 关闭时无后续反馈路径说明，但作为已完成内部任务影响较小。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 75.0 | 作者自行关闭为已完成且从codehub关闭，非过早关闭。 |


### G · Bot/Agent 治理
本阶段分数为 **68.0/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 60.0 | 均值 60.0，低分 0/1 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/1 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 50.0 | 无bot介入，无需交接，信息不足给中性分。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 50.0 | 无bot介入记录，信息不足，给中性分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 50.0 | 无bot介入记录，信息不足，给中性分。 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 2 | 40.0 | 首期基线 | 62.5 | 43.0 | 64.8 | 29.0 | 68.0 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **0 位社区响应者**贡献 **0 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `—` | 0 |

Top1 响应占比 **0.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：85.0/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-cann-samples/report_cann-cann-samples_2026-07-13_to_2026-07-19.json`。
