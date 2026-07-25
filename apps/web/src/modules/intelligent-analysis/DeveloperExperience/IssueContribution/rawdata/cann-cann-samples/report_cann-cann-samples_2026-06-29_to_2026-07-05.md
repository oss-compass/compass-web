# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **8** 个 Issue
+ 其中外部 Issue **7** 个、内部 **1** 个；I1–I3 及 G 基于「外部且成熟」的 **7** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 2 / Closed 6**，关闭率 **75.0%**。
+ 总体体验分为 **54.4/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I3 · 总结与关闭 | 56.4 | 关闭Issue缺乏解决方案沉淀与反馈路径 |
| P1 | I2 · 讨论与解决 | 63.8 | 开放Issue讨论停滞缺乏推进机制 |
| P2 | I1 · 分配与首次响应 | 69.3 | 存在中度痛点，标签覆盖率仅37.5%，部分Issue无assign… |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P1 | 配置关闭模板，要求填写解决方案摘要、受影响文件/PR链接、后续反馈路径三项必填字段 |
| REC-02 | P1 | 部署Triage Bot根据标题前缀[BUG]/[Documentation]/[Question]/[Requirement]自动打标签 |
| REC-03 | P1 | Bot自动发送跟进提醒并@用户确认方案是否有效 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 8 |
| Open / Closed | 2 / 6 |
| 关闭率 | 75.0% |
| 类型构成 | 缺陷 3 / 需求 2 / 咨询 1 / 其他 2 |
| 总体体验分 | 54.4/100（D） |
| 首次响应时间 | 中位 19.6h；均值 1.5天 |
| 关闭周期 | 中位 4.1天；均值 5.9天 |
| 7天响应率 | 100.0% |
| 评论数/Issue | 2.88 |
| 标签覆盖率 | 37.5% |
| 指派覆盖率 | 62.5% |
| 数据完整性 | 86.2/100 |
| 置信度 | 低 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 88.6 | 0/8（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 83.8 |
| I1 · 分配与首次响应 | 69.3 | 2/7（28.6%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 62.9 |
| I2 · 讨论与解决 | 63.8 | 2/7（28.6%） | P1 | `OBJ_SOLUTION_EVIDENCE` 45.1 |
| I3 · 总结与关闭 | 56.4 | 4/7（57.1%） | P1 | `OBJ_CLOSURE_REUSE` 27.9 |
| G · Bot/Agent 治理（参考） | 68.9 | 0/7（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 54.3 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P1 | I3 · 总结与关闭 | 关闭Issue缺乏解决方案沉淀与反馈路径 | OBJ_CLOSURE_REUSE：均值 27.9，低分 6/7；OBJ_DECISION_TRANSPARENCY：均值 63.6，低分 2/7 | 同类问题重复提交风险高，社区知识库未有效积累，新用户无法从历史Issue中自助获取解决方案 |
| PP-02 | P1 | G · Bot/Agent 治理 | Bot在分流标签和初始响应环节全面缺位 | OBJ_BOT_GOVERNANCE：均值 54.3，低分 1/7；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/7 | 标签覆盖率仅37.5%，人工分流负担重且不一致，开放Issue无超时提醒导致讨论停滞 |
| PP-03 | P1 | I2 · 讨论与解决 | 开放Issue讨论停滞缺乏推进机制 | OBJ_SOLUTION_EVIDENCE：均值 45.1，低分 5/7；OBJ_RESULT_FORMATION_TIMELINESS：均值 71.4，低分 1/7 | 用户需求和建议长期悬置，社区无法形成有效决策，开放Issue占用维护者注意力但无进展 |
| PP-04 | P2 | I1 · 分配与首次响应 | 标签覆盖率低影响分流结构化 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 62.9，低分 3/7；OBJ_RESPONSE_SPEED：均值 74.3，低分 0/7 | Issue检索和过滤困难，维护者无法按类别批量处理，分流路径不够结构化 |
| PP-05 | P2 | I1 · 分配与首次响应 | 部分Issue首次响应时间过长 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 62.9，低分 3/7；OBJ_RESPONSE_SPEED：均值 74.3，低分 0/7 | 用户等待时间长影响社区体验，部分Issue可能因响应延迟导致用户流失 |

### 4.1 低分 Issue 明细

#### PP-01 关闭Issue缺乏解决方案沉淀与反馈路径（I3 · 总结与关闭）

- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 0分
  - 痛点原因：关闭时无总结说明与方案文档，仅口头指向roadmap，未沉淀任何可复用经验。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#211](https://gitcode.com/cann/cann-samples/issues/211) [Question|问题咨询]: No CMAKE_ASC_COMPILER could be found.** — 0分
  - 痛点原因：关闭说明为空且无重复链接，仅靠评论零散回复，导致其他用户无法直接复用解决方案。
  - 原文依据：
    - `zhangzijie`：您好，可以提供一下run包的版本吗？ 以及 which bisheng 的返回值 和 bisheng -v的返回值    - `songkai111`：您好，我们支持的最早期版本是9.0.0，请取用README.md中的配套包
- **[#217](https://gitcode.com/cann/cann-samples/issues/217) [Documentation|文档反馈]: 根目录README快速入门中matmul运行示例与样例自身README存在多处不一致** — 30分
  - 痛点原因：关闭说明仅21字且仅泛称修复已合入，未提供具体修复细节或关联链接，难以供他人复用。
  - 原文依据：
    - `yangyang016`：closed from codehub    - `yangyang016`：changed custom state from 进行中 to 已完成    - `songkai111`：您好，已收到您的反馈，我们将安排责任人处理    - `yangyang016`：您好，相关修复已合入，感谢您的反馈，如有问题请进一步联系我们    - `yangyang016`：assigned to @yangyang016    - [关联PR #331（closed）](https://gitcode.com/cann/cann-samples/merge_requests/331)
- **[#215](https://gitcode.com/cann/cann-samples/issues/215) [Bug-Report|缺陷反馈]: 全量编译报错** — 30分
  - 痛点原因：仅由系统自动关闭且说明仅14字，无具体解决方案总结，复用价值低。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 待办的 to 已完成    - `songkai111`：你好，正在安排相关责任人解决    - `songkai111`：/assign yangyangcann    - `songkai111`：/assign yangyang016    - `Crrryyyy`：您好，感谢反馈，问题确认中。
- **[#212](https://gitcode.com/cann/cann-samples/issues/212) [BUG] 仓库README中matmul用例运行命令缺少进入目录步骤导致执行报错** — 30分
  - 痛点原因：关闭说明仅34字且未关联代码提交链接，虽有文字方案但缺乏可追溯的修复证据，难以供后续参考。
  - 原文依据：
    - `huangkejie1647`：closed from codehub    - `huangkejie1647`：changed custom state from 进行中 to 已完成    - `zhangzijie`：感谢反馈，matmul样例的python依赖需要分析一下是否需要保留    - `huangkejie1647`：主页示例中的旧版路径配置已不再适用。请确保在二进制可执行文件所在的同级目录下运行程序，以正确加载相对路径下的 gen_data.py 和 verify_result.py依赖脚本。预计将于 7 月 2 日（周四）前 完成主页执行方式更新。…    - `huangkejie1647`：主页示例中的旧版 matmul 启动方式已更新。现在请按照最新方式运行用例，即可正确获取预期结果。    - `yangyang016`：assigned to @huangkejie1647
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 30分
  - 痛点原因：机器人自动关闭且说明仅20字，人工未补充最终解决方案总结与关联指引，导致后续参考信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `cann-robot`：add label resolved    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中
#### PP-02 Bot在分流标签和初始响应环节全面缺位（G · Bot/Agent 治理）

- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何解释性评论与用户互动，缺乏透明沟通导致治理流于形式。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210
#### PP-03 开放Issue讨论停滞缺乏推进机制（I2 · 讨论与解决）

- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 0分
  - 痛点原因：仅口头承诺关注roadmap并分配负责人，无关联PR、代码提交或文档更新等实质解决证据。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#211](https://gitcode.com/cann/cann-samples/issues/211) [Question|问题咨询]: No CMAKE_ASC_COMPILER could be found.** — 31分
  - 痛点原因：缺乏PR和commit等代码修复证据，仅口头建议使用配套包，且无用户确认已解决的评论。
  - 原文依据：
    - `zhangzijie`：您好，可以提供一下run包的版本吗？ 以及 which bisheng 的返回值 和 bisheng -v的返回值    - `songkai111`：您好，我们支持的最早期版本是9.0.0，请取用README.md中的配套包
- **[#212](https://gitcode.com/cann/cann-samples/issues/212) [BUG] 仓库README中matmul用例运行命令缺少进入目录步骤导致执行报错** — 38分
  - 痛点原因：缺少commit引用，解决过程依赖评论承诺更新主页，虽有合并PR但缺乏直接代码修复证据。
  - 原文依据：
    - [关联PR #325（closed）](https://gitcode.com/cann/cann-samples/merge_requests/325)    - [关联PR #333（merged）](https://gitcode.com/cann/cann-samples/merge_requests/333)    - `zhangzijie`：感谢反馈，matmul样例的python依赖需要分析一下是否需要保留    - `huangkejie1647`：主页示例中的旧版路径配置已不再适用。请确保在二进制可执行文件所在的同级目录下运行程序，以正确加载相对路径下的 gen_data.py 和 verify_result.py依赖脚本。预计将于 7 月 2 日（周四）前 完成主页执行方式更新。…    - `huangkejie1647`：主页示例中的旧版 matmul 启动方式已更新。现在请按照最新方式运行用例，即可正确获取预期结果。    - `huangkejie1647`：closed from codehub
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 38分
  - 痛点原因：机器人称因关联issue合并而关闭，但本issue未直接关联PR或commit，缺乏可追溯修复证据。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `cann-robot`：add label resolved
- **[#213](https://gitcode.com/cann/cann-samples/issues/213) [Question|问题咨询]: A5 使用蓝区toolkit + 最新主线代码 全量编译出现问题** — 54分
  - 痛点原因：仅提供本地验证截图与版本建议，缺乏关联PR与commit引用等代码级修复证据，导致证据链不完整。
  - 原文依据：
    - `songkai111`：您好，请使用README.md中指定的cann 9.1.0版本，本地验证该版本ok，验证报告： ![image.png](https://raw.gitcode.com/user-images/assets/8788227/72f560d…    - `Crrryyyy`：感谢！    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `Crrryyyy`：add label bug-report
#### PP-04 标签覆盖率低影响分流结构化（I1 · 分配与首次响应）

- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 0分
  - 痛点原因：人工仅回复在修复中无实质技术解答，随后机器人直接关闭，全程无实质回应。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210
- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 20分
  - 痛点原因：初次回复仅敷衍表示请关注roadmap并分配任务，18天后仍未给出实质技术回应或排期计划。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#217](https://gitcode.com/cann/cann-samples/issues/217) [Documentation|文档反馈]: 根目录README快速入门中matmul运行示例与样例自身README存在多处不一致** — 40分
  - 痛点原因：首次响应仅为客套话，间隔近12天才给出修复合入的实质回应，耗时过长。
  - 原文依据：
    - `songkai111`：您好，已收到您的反馈，我们将安排责任人处理    - `yangyang016`：您好，相关修复已合入，感谢您的反馈，如有问题请进一步联系我们    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：closed from codehub    - `yangyang016`：changed custom state from 进行中 to 已完成    - [关联PR #331（closed）](https://gitcode.com/cann/cann-samples/merge_requests/331)
#### PP-05 部分Issue首次响应时间过长（I1 · 分配与首次响应）

- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 0分
  - 痛点原因：人工仅回复在修复中无实质技术解答，随后机器人直接关闭，全程无实质回应。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210
- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 20分
  - 痛点原因：初次回复仅敷衍表示请关注roadmap并分配任务，18天后仍未给出实质技术回应或排期计划。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#217](https://gitcode.com/cann/cann-samples/issues/217) [Documentation|文档反馈]: 根目录README快速入门中matmul运行示例与样例自身README存在多处不一致** — 40分
  - 痛点原因：首次响应仅为客套话，间隔近12天才给出修复合入的实质回应，耗时过长。
  - 原文依据：
    - `songkai111`：您好，已收到您的反馈，我们将安排责任人处理    - `yangyang016`：您好，相关修复已合入，感谢您的反馈，如有问题请进一步联系我们    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：closed from codehub    - `yangyang016`：changed custom state from 进行中 to 已完成    - [关联PR #331（closed）](https://gitcode.com/cann/cann-samples/merge_requests/331)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `songkai111` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 配置关闭模板，要求填写解决方案摘要、受影响文件/PR链接、后续反馈路径三项必填字段 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 27.9，低分 6/7；OBJ_DECISION_TRANSPARENCY：均值 63.6，低分 2/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 27.9，低分 6/7 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 63.6，低分 2/7 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭评论提及可进一步联系，但未说明具体反馈入口或重开条件 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | 社区维护者；候选负责人 `songkai111` |
| 触发条件 | Issue创建时 |
| 具体动作 | 部署Triage Bot根据标题前缀[BUG]/[Documentation]/[Question]/[Requirement]自动打标签 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 90 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 54.3，低分 1/7；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 54.3，低分 1/7 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 100.0，低分 0/7 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，人工处理流程本身顺畅，给保守中性分 | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | Issue assignee；候选负责人 `songkai111` |
| 触发条件 | 用户7天未回复排查方向 |
| 具体动作 | Bot自动发送跟进提醒并@用户确认方案是否有效 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 75 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 45.1，低分 5/7；OBJ_RESULT_FORMATION_TIMELINESS：均值 71.4，低分 1/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 71.4，低分 1/7 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 45.1，低分 5/7 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 从受理到分配到PR合并关闭流程连贯，但讨论内容较少 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **88.6/100**，整体相对可控，但仍需关注：无显著痛点，Issue创建质量较高，模板填写完整且信息充分。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.4 | 引用真实README内容，问题描述具体可验证，无AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 83.8 | 内容完整，含四项具体不一致对比、修改建议及预期价值，结构化清晰 |


### I1 · 分配与首次响应
本阶段分数为 **69.3/100**，整体相对可控，但仍需关注：存在中度痛点，标签覆盖率仅37.5%，部分Issue无assign…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 62.9 | 均值 62.9，低分 3/7 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 74.3 | 均值 74.3，低分 0/7 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 71.1 | 明确assignee为yangyang016，后续由其处理并关闭，责任清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 69.4 | 正确分配责任人并关联PR，PR#333已合并，路由有效 |

代表低分 Issue：[#210](https://gitcode.com/cann/cann-samples/issues/210)
问题：[Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…。

### I2 · 讨论与解决
本阶段分数为 **63.8/100**，整体相对可控，但仍需关注：开放Issue讨论停滞缺乏推进机制。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 71.4 | 均值 71.4，低分 1/7 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 45.1 | 均值 45.1，低分 5/7 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 71.4 | 从受理到分配到PR合并关闭流程连贯，但讨论内容较少 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 72.9 | PR#333已合并，维护者确认修复合入，用户文档修正目标已满足 |

代表低分 Issue：[#216](https://gitcode.com/cann/cann-samples/issues/216)
问题：[Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等。

### I3 · 总结与关闭
本阶段分数为 **56.4/100**，本阶段需要改进，主要问题是：关闭Issue缺乏解决方案沉淀与反馈路径。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 27.9 | 均值 27.9，低分 6/7 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 63.6 | 均值 63.6，低分 2/7 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 56.0 | 关闭评论提及可进一步联系，但未说明具体反馈入口或重开条件 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 88.7 | PR合并后关闭，关闭原因已完成，无过早关闭迹象 |

代表低分 Issue：[#216](https://gitcode.com/cann/cann-samples/issues/216)
问题：[Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等。

### G · Bot/Agent 治理
本阶段分数为 **68.9/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 54.3 | 均值 54.3，低分 1/7 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/7 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 60.0 | 无bot介入，人工处理流程本身顺畅，给保守中性分 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 55.0 | 无bot参与记录，信息不足，给保守中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 55.7 | 无bot介入事件，信息不足，给保守中性分 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 8 | 54.4 | 首期基线 | 88.6 | 69.3 | 63.8 | 56.4 | 68.9 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **5 位社区响应者**贡献 **19 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `songkai111` | 10 |
| `zhangzijie` | 3 |
| `yangyang016` | 2 |
| `Crrryyyy` | 2 |
| `huangkejie1647` | 2 |

Top1 响应占比 **52.6%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：86.2/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-cann-samples/report_cann-cann-samples_2026-06-29_to_2026-07-05.json`。
