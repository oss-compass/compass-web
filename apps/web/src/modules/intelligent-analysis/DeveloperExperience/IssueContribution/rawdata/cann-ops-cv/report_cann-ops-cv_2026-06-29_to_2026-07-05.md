# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **20** 个 Issue
+ 其中外部 Issue **4** 个、内部 **16** 个；I1–I3 及 G 基于「外部且成熟」的 **4** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 1 / Closed 19**，关闭率 **95.0%**。
+ 总体体验分为 **54.9/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I2 · 讨论与解决 | 64.3 | 讨论深度不足且承诺口径不一致 |
| P0 | I3 · 总结与关闭 | 66.3 | 验收清单未完成即关闭且无后续路径 |
| P1 | I1 · 分配与首次响应 | 67.4 | 文档类Issue响应延迟且分流归属偏差 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 创建follow-up issue承接未完成项并关联原Issue |
| REC-02 | P1 | 设置文档类Issue专属标签并指定文档维护者分流 |
| REC-03 | P1 | 在Issue中明确记录变更原因并通知用户 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 20 |
| Open / Closed | 1 / 19 |
| 关闭率 | 95.0% |
| 类型构成 | 缺陷 7 / 需求 6 / 其他 7 |
| 总体体验分 | 54.9/100（D） |
| 首次响应时间 | 中位 1.6h；均值 16.5h |
| 关闭周期 | 中位 2.9天；均值 7.1天 |
| 7天响应率 | 95.0% |
| 评论数/Issue | 1.40 |
| 标签覆盖率 | 90.0% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 94.9/100 |
| 置信度 | 中 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 80.3 | 1/20（5.0%） | 相对可控 | `SUB_INPUT_QUALITY` 69.2 |
| I1 · 分配与首次响应 | 67.4 | 2/4（50.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 50.0 |
| I2 · 讨论与解决 | 64.3 | 2/4（50.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 50.0 |
| I3 · 总结与关闭 | 66.3 | 1/4（25.0%） | P0 | `OBJ_CLOSURE_REUSE` 46.2 |
| G · Bot/Agent 治理（参考） | 63.8 | 0/4（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 20.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-03 | P0 | I3 · 总结与关闭 | 验收清单未完成即关闭且无后续路径 | OBJ_CLOSURE_REUSE：均值 46.2，低分 3/4；OBJ_DECISION_TRANSPARENCY：均值 77.5，低分 0/4 | 原始审计/迁移目标未达成，未完成工作无跟踪无承接 |
| PP-01 | P1 | I1 · 分配与首次响应 | 文档类Issue响应延迟且分流归属偏差 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 0/4 | 用户等待时间长，责任归属不清导致跟进效率低 |
| PP-02 | P1 | I2 · 讨论与解决 | 讨论深度不足且承诺口径不一致 | OBJ_SOLUTION_EVIDENCE：均值 50.0，低分 2/4；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.0，低分 2/4 | 用户期望管理失败，问题推进缺乏实质技术讨论支撑 |
| PP-04 | P2 | G · Bot/Agent 治理 | Bot疑似误关闭未完成Issue且存在缺位 | OBJ_BOT_GOVERNANCE：均值 20.0，低分 4/4；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/4 | 未完成工作被标记resolved造成信息失真，Roadmap缺乏自动化标签管理 |

### 4.1 低分 Issue 明细

#### PP-03 验收清单未完成即关闭且无后续路径（I3 · 总结与关闭）

- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 0分
  - 痛点原因：关闭说明仅29字且仅承诺修复，未提供方案文档与修复链接，无法供他人复用。
  - 原文依据：
    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 55分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，未沉淀具体文档修改方案，缺乏可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 55分
  - 痛点原因：关闭说明仅依赖机器人自动关联合并请求信息，缺乏人工对修复方案或解决结果的详细总结，参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
#### PP-01 文档类Issue响应延迟且分流归属偏差（I1 · 分配与首次响应）

- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 0分
  - 痛点原因：仅回复模板并分配责任人，未提供任何实质性的技术解答或问题处理方案。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 0分
  - 痛点原因：响应耗时超40小时，且仅停留在分派和打标签阶段，始终无实质性技术解答或修复。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
#### PP-02 讨论深度不足且承诺口径不一致（I2 · 讨论与解决）

- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 23分
  - 痛点原因：未提供任何PR、commit或文档等修复证据，仅以算子未开源为由口头回复后便直接关闭issue。
  - 原文依据：
    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少提交与版本引用，仅由机器人因代码合并自动关闭，缺乏人工对修复结果的验证说明。
  - 原文依据：
    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7
#### PP-04 Bot疑似误关闭未完成Issue且存在缺位（G · Bot/Agent 治理）

- **[#596](https://gitcode.com/cann/ops-cv/issues/596) [Bug-Report|缺陷反馈]:** — 20分
  - 痛点原因：Bot仅执行打标，缺乏自动回复与自动关闭机制，导致人工多次跟进并手动关闭，治理效能低下。
  - 原文依据：
    - `liu-wei`：您好，这个问题可以按“算子清单 + 开发流程 + 现有能力复用”三部分看： 1. 各算子库最新清单 各仓库的清单入口都在 `docs/zh/op_list.md`，aclnn 接口清单在 `docs/zh/op_api_list.md`：…    - `liu-wei`：您好，这个还有什么问题吗？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 20分
  - 痛点原因：Bot仅完成打标，未按人工计划自动关闭该issue，且全程无评论互动，治理动作严重缺失。
  - 原文依据：
    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @nunnons2    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 20分
  - 痛点原因：Bot在人工仅分配责任人且未实际解决问题时，直接打标resolved并关闭issue，属于无效治理。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何有效评论互动，治理流于形式。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | Issue作者/维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue含验收清单且仅部分完成 |
| 具体动作 | 创建follow-up issue承接未完成项并关联原Issue |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 46.2，低分 3/4；OBJ_DECISION_TRANSPARENCY：均值 77.5，低分 0/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 46.2，低分 3/4 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 77.5，低分 0/4 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭评论明确提供SIG会议入口、往期记录和重新提issue的反馈路径。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-01 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Triage维护者；候选负责人 `liu-wei` |
| 触发条件 | 文档类Issue创建 |
| 具体动作 | 设置文档类Issue专属标签并指定文档维护者分流 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 50.0，低分 2/4；OBJ_RESPONSE_SPEED：均值 70.0，低分 0/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 50.0，低分 2/4 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 70.0，低分 0/4 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 明确assignee为liu-wei，责任归属清晰，后续跟进主体明确。 | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | Issue处理者；候选负责人 `liu-wei` |
| 触发条件 | 承诺变更或方案调整 |
| 具体动作 | 在Issue中明确记录变更原因并通知用户 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 50.0，低分 2/4；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.0，低分 2/4 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 70.0，低分 2/4 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 50.0，低分 2/4 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 维护者逐一解答四个问题并跟进确认，形成明确结论和后续路径。 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **80.3/100**，整体相对可控，但仍需关注：轻微痛点，整体创建质量良好但客观指标全为零导致评估盲区。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.4 | 内容为真实用户提问，非AI生成噪音，虽重复填写但意图明确。 |
| `SUB_INPUT_QUALITY` 输入质量 | 69.2 | 模板各字段均填写但内容完全重复同一问题，标题为空，实质信息质量低。 |

代表低分 Issue：[#580](https://gitcode.com/cann/ops-cv/issues/580)
问题：新增长尾算子AnchorResponseFlags。

### I1 · 分配与首次响应
本阶段分数为 **67.4/100**，整体相对可控，但仍需关注：文档类Issue响应延迟且分流归属偏差。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 50.0 | 均值 50.0，低分 2/4 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 70.0 | 均值 70.0，低分 0/4 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 80.2 | 明确assignee为liu-wei，责任归属清晰，后续跟进主体明确。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 76.8 | 正确分配给liu-wei并获全面回复，Accepted标签合理，处理路径正确。 |

代表低分 Issue：[#585](https://gitcode.com/cann/ops-cv/issues/585)
问题：[Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m。

### I2 · 讨论与解决
本阶段分数为 **64.3/100**，整体相对可控，但仍需关注：讨论深度不足且承诺口径不一致。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 70.0 | 均值 70.0，低分 2/4 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 50.0 | 均值 50.0，低分 2/4 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 64.2 | 维护者逐一解答四个问题并跟进确认，形成明确结论和后续路径。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 77.5 | 四个问题均获详细解答含文档链接和代码引用，用户目标有效满足。 |

代表低分 Issue：[#586](https://gitcode.com/cann/ops-cv/issues/586)
问题：[Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…。

### I3 · 总结与关闭
本阶段分数为 **66.3/100**，整体相对可控，但仍需关注：验收清单未完成即关闭且无后续路径。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 46.2 | 均值 46.2，低分 3/4 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 77.5 | 均值 77.5，低分 0/4 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 62.0 | 关闭评论明确提供SIG会议入口、往期记录和重新提issue的反馈路径。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 84.0 | 回答后等待一周并确认无后续问题才关闭，关闭前有跟进，非过早关闭。 |

代表低分 Issue：[#594](https://gitcode.com/cann/ops-cv/issues/594)
问题：[Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…。

### G · Bot/Agent 治理
本阶段分数为 **63.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 20.0 | 均值 20.0，低分 4/4 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/4 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 75.0 | 人工已完整处理issue，bot末尾加标签未阻碍人工流程，交接无障碍。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 63.0 | bot仅添加Accepted标签，帮助有限但未造成干扰，属中性治理动作。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 72.0 | bot在关闭时添加标签，动作正确合规但时机偏晚，对流程推进贡献有限。 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 20 | 54.9 | 首期基线 | 80.3 | 67.4 | 64.3 | 66.3 | 63.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **3 位社区响应者**贡献 **16 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `liu-wei` | 13 |
| `sunchun` | 2 |
| `nunnons2` | 1 |

Top1 响应占比 **81.2%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：94.9/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-06-29_to_2026-07-05.json`。
