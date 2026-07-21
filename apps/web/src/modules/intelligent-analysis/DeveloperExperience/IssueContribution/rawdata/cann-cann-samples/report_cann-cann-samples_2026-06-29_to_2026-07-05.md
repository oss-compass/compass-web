# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **8** 个 Issue
+ **Open 2 / Closed 6**，关闭率 **75.0%**。
+ 总体体验分为 **54.4/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P2 | I3 · 总结与关闭 | 57.1 | 存在中度痛点：关闭沉淀得分最低(57.1)，后续反馈路径普遍不明确… |
| P1 | I2 · 讨论与解决 | 65.6 | 开放Issue讨论停滞无闭环机制 |
| P1 | I1 · 分配与首次响应 | 66.8 | 标签覆盖率低，分流依赖人工识别 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P1 | 引入自动标签Bot，根据标题前缀和正文关键词自动添加分类标签 |
| REC-02 | P1 | 配置stale Bot自动添加pending-close标签并提醒用户确认 |
| REC-03 | P2 | 制定关闭评论模板，要求包含解决方案摘要、关联PR链接和后续反馈路径 |

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
| I0 · 创建 | 88.2 | 0/8（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 84.1 |
| I1 · 分配与首次响应 | 66.8 | 2/8（25.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 55.0 |
| I2 · 讨论与解决 | 65.6 | 2/8（25.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 44.2 |
| I3 · 总结与关闭 | 57.1 | 3/8（37.5%） | 需改进 | `OBJ_CLOSURE_REUSE` 28.1 |
| G · Bot/Agent 治理（参考） | 69.3 | 0/8（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 50.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P1 | I1 · 分配与首次响应 | 标签覆盖率低，分流依赖人工识别 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 55.0，低分 4/8；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/8 | 无法自动分类和路由，依赖人工识别问题类型，降低分流效率 |
| PP-02 | P1 | I2 · 讨论与解决 | 开放Issue讨论停滞无闭环机制 | OBJ_SOLUTION_EVIDENCE：均值 44.2，低分 6/8；OBJ_RESULT_FORMATION_TIMELINESS：均值 72.5，低分 1/8 | 用户问题悬而未决，社区活跃度下降，需求交付周期不可控 |
| PP-03 | P2 | I3 · 总结与关闭 | 关闭沉淀不足，后续反馈路径缺失 | OBJ_CLOSURE_REUSE：均值 28.1，低分 7/8；OBJ_DECISION_TRANSPARENCY：均值 65.0，低分 2/8 | 知识沉淀不足，类似问题无法复用解决方案，用户后续反馈无门 |
| PP-04 | P2 | G · Bot/Agent 治理 | Bot治理缺位，开放Issue无自动化介入 | OBJ_BOT_GOVERNANCE：均值 50.0，低分 2/8；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/8 | 开放issue无自动标签、无自动分流、无自动跟进提醒，治理效率低 |

### 4.1 低分 Issue 明细

#### PP-01 标签覆盖率低，分流依赖人工识别（I1 · 分配与首次响应）

- **[#214](https://gitcode.com/cann/cann-samples/issues/214) 新增 INT8 量化矩阵乘样例 quant_matmul_int8** — 0分
  - 痛点原因：首次响应超 100 小时且仅有认领与开发中表态，全程无任何实质技术回应。
  - 原文依据：
    - `tangweiwei2`：/assign tangweiwei2    - `tangweiwei2`：需求已收到，目前正在开发实现中    - `cann-robot`：add label resolved    - `songkai111`：assigned to @tangweiwei2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - [关联PR #326（merged）](https://gitcode.com/cann/cann-samples/merge_requests/326)
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 0分
  - 痛点原因：人工首次回复仅为套话，后续无任何实质性解答便由机器人直接关闭。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210
- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 20分
  - 痛点原因：首次响应仅敷衍指派并让看roadmap，时隔436小时才在用户追问下推进，前期无实质解答。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#217](https://gitcode.com/cann/cann-samples/issues/217) [Documentation|文档反馈]: 根目录README快速入门中matmul运行示例与样例自身README存在多处不一致** — 40分
  - 痛点原因：首次响应近55小时且仅为模板回复，实质修复回应耗时超290小时，严重超时。
  - 原文依据：
    - `songkai111`：您好，已收到您的反馈，我们将安排责任人处理    - `yangyang016`：您好，相关修复已合入，感谢您的反馈，如有问题请进一步联系我们    - `yangyang016`：assigned to @yangyang016    - `yangyang016`：closed from codehub    - `yangyang016`：changed custom state from 进行中 to 已完成    - [关联PR #331（closed）](https://gitcode.com/cann/cann-samples/merge_requests/331)
#### PP-02 开放Issue讨论停滞无闭环机制（I2 · 讨论与解决）

- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 0分
  - 痛点原因：无关联 PR、commit、文档及 release 引用等实质性解决凭证，仅停留在口头承诺与指派负责人阶段。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#211](https://gitcode.com/cann/cann-samples/issues/211) [Question|问题咨询]: No CMAKE_ASC_COMPILER could be found.** — 31分
  - 痛点原因：缺乏关联PR与commit等代码修复证据，仅靠口头建议和文档指引，且无关闭评论确认最终解决。
  - 原文依据：
    - `zhangzijie`：您好，可以提供一下run包的版本吗？ 以及 which bisheng 的返回值 和 bisheng -v的返回值    - `songkai111`：您好，我们支持的最早期版本是9.0.0，请取用README.md中的配套包
- **[#214](https://gitcode.com/cann/cann-samples/issues/214) 新增 INT8 量化矩阵乘样例 quant_matmul_int8** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和release引用，且关闭评论仅提及MR合并，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #326（merged）](https://gitcode.com/cann/cann-samples/merge_requests/326)    - `tangweiwei2`：/assign tangweiwei2    - `tangweiwei2`：需求已收到，目前正在开发实现中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - `cann-robot`：add label resolved    - `songkai111`：assigned to @tangweiwei2
- **[#212](https://gitcode.com/cann/cann-samples/issues/212) [BUG] 仓库README中matmul用例运行命令缺少进入目录步骤导致执行报错** — 38分
  - 痛点原因：缺乏直接修复的commit引用，且关联了未合并的PR，仅凭评论承诺更新文档导致证据链弱。
  - 原文依据：
    - [关联PR #325（closed）](https://gitcode.com/cann/cann-samples/merge_requests/325)    - [关联PR #333（merged）](https://gitcode.com/cann/cann-samples/merge_requests/333)    - `zhangzijie`：感谢反馈，matmul样例的python依赖需要分析一下是否需要保留    - `huangkejie1647`：主页示例中的旧版路径配置已不再适用。请确保在二进制可执行文件所在的同级目录下运行程序，以正确加载相对路径下的 gen_data.py 和 verify_result.py依赖脚本。预计将于 7 月 2 日（周四）前 完成主页执行方式更新。…    - `huangkejie1647`：主页示例中的旧版 matmul 启动方式已更新。现在请按照最新方式运行用例，即可正确获取预期结果。    - `huangkejie1647`：closed from codehub
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 38分
  - 痛点原因：未关联PR与commit引用，仅由机器人关联其他issue关闭，缺乏直接的代码修复证据。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `cann-robot`：add label resolved
- **[#213](https://gitcode.com/cann/cann-samples/issues/213) [Question|问题咨询]: A5 使用蓝区toolkit + 最新主线代码 全量编译出现问题** — 54分
  - 痛点原因：仅通过建议切换版本和本地验证关闭，未关联PR或commit，缺乏代码层面的实质性修复证据。
  - 原文依据：
    - `songkai111`：您好，请使用README.md中指定的cann 9.1.0版本，本地验证该版本ok，验证报告： ![image.png](https://raw.gitcode.com/user-images/assets/8788227/72f560d…    - `Crrryyyy`：感谢！    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `Crrryyyy`：add label bug-report
#### PP-03 关闭沉淀不足，后续反馈路径缺失（I3 · 总结与关闭）

- **[#216](https://gitcode.com/cann/cann-samples/issues/216) [Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等** — 0分
  - 痛点原因：关闭说明为零且无方案文档与主链接，仅口头回应关注roadmap，未沉淀任何可复用价值。
  - 原文依据：
    - `songkai111`：好的，请关注我们的roadmap，后续添加该用例后将在roadmap中呈现    - `songkai111`：/assign wang-minbo    - `songkai111`：/assign wang-minbo    - `xdnjust`：[@wang-minbo](https://gitcode.com/wang-minbo) [@songkai111](https://gitcode.com/songkai111) 当前是否有开发排期计划？大概是什么时候能够上线    - `songkai111`：目前暂定在Q3季度中完成，还在和具体负责团队确认时间细节    - `songkai111`：assigned to @wang-minbo
- **[#211](https://gitcode.com/cann/cann-samples/issues/211) [Question|问题咨询]: No CMAKE_ASC_COMPILER could be found.** — 0分
  - 痛点原因：关闭说明为0字，未总结最终解决方案，导致其他用户遇到同类问题时无法复用。
  - 原文依据：
    - `zhangzijie`：您好，可以提供一下run包的版本吗？ 以及 which bisheng 的返回值 和 bisheng -v的返回值    - `songkai111`：您好，我们支持的最早期版本是9.0.0，请取用README.md中的配套包
- **[#217](https://gitcode.com/cann/cann-samples/issues/217) [Documentation|文档反馈]: 根目录README快速入门中matmul运行示例与样例自身README存在多处不一致** — 30分
  - 痛点原因：关闭说明仅21字且仅泛泛提及修复已合入，未提供具体修复方案链接或代码变更详情，缺乏复用指引。
  - 原文依据：
    - `yangyang016`：closed from codehub    - `yangyang016`：changed custom state from 进行中 to 已完成    - `songkai111`：您好，已收到您的反馈，我们将安排责任人处理    - `yangyang016`：您好，相关修复已合入，感谢您的反馈，如有问题请进一步联系我们    - `yangyang016`：assigned to @yangyang016    - [关联PR #331（closed）](https://gitcode.com/cann/cann-samples/merge_requests/331)
- **[#215](https://gitcode.com/cann/cann-samples/issues/215) [Bug-Report|缺陷反馈]: 全量编译报错** — 30分
  - 痛点原因：关闭说明仅14字且为系统自动关闭，未记录具体的错误原因与解决方案，导致其他用户无法参考复用。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 待办的 to 已完成    - `songkai111`：你好，正在安排相关责任人解决    - `songkai111`：/assign yangyangcann    - `songkai111`：/assign yangyang016    - `Crrryyyy`：您好，感谢反馈，问题确认中。
- **[#214](https://gitcode.com/cann/cann-samples/issues/214) 新增 INT8 量化矩阵乘样例 quant_matmul_int8** — 30分
  - 痛点原因：关闭复用价值得分30，低于合格线 60
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - `cann-robot`：add label resolved    - `tangweiwei2`：/assign tangweiwei2    - `tangweiwei2`：需求已收到，目前正在开发实现中    - `songkai111`：assigned to @tangweiwei2    - [关联PR #326（merged）](https://gitcode.com/cann/cann-samples/merge_requests/326)
- **[#212](https://gitcode.com/cann/cann-samples/issues/212) [BUG] 仓库README中matmul用例运行命令缺少进入目录步骤导致执行报错** — 30分
  - 痛点原因：关闭说明仅变更状态且过简，未提供最终修复的代码或文档链接，导致他人无法追溯复用。
  - 原文依据：
    - `huangkejie1647`：closed from codehub    - `huangkejie1647`：changed custom state from 进行中 to 已完成    - `zhangzijie`：感谢反馈，matmul样例的python依赖需要分析一下是否需要保留    - `huangkejie1647`：主页示例中的旧版路径配置已不再适用。请确保在二进制可执行文件所在的同级目录下运行程序，以正确加载相对路径下的 gen_data.py 和 verify_result.py依赖脚本。预计将于 7 月 2 日（周四）前 完成主页执行方式更新。…    - `huangkejie1647`：主页示例中的旧版 matmul 启动方式已更新。现在请按照最新方式运行用例，即可正确获取预期结果。    - `yangyang016`：assigned to @huangkejie1647
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 30分
  - 痛点原因：关闭说明仅20字且未提供关联主链接，仅以关联issue合并为由关闭，缺乏具体方案细节供其他用户复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `cann-robot`：add label resolved    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中
#### PP-04 Bot治理缺位，开放Issue无自动化介入（G · Bot/Agent 治理）

- **[#214](https://gitcode.com/cann/cann-samples/issues/214) 新增 INT8 量化矩阵乘样例 quant_matmul_int8** — 20分
  - 痛点原因：Bot未产生任何自动评论与交互，用户需手动输入指令及回复，自动化引导与协同能力不足。
  - 原文依据：
    - `tangweiwei2`：/assign tangweiwei2    - `tangweiwei2`：需求已收到，目前正在开发实现中    - `cann-robot`：add label resolved    - `songkai111`：assigned to @tangweiwei2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - [关联PR #326（merged）](https://gitcode.com/cann/cann-samples/merge_requests/326)
- **[#210](https://gitcode.com/cann/cann-samples/issues/210) [Documentation|文档反馈]: Samples/1_Features/instruction_optimization/mte2_preload/…** — 20分
  - 痛点原因：人工回复正在修复中，Bot却直接打标resolved并关闭，过早关闭且状态判定与实际脱节。
  - 原文依据：
    - `zhangzijie`：感谢反馈，我们关注到了这个问题，在修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210

## 5. 本周行动清单

### REC-01 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-01 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue创建时 |
| 具体动作 | 引入自动标签Bot，根据标题前缀和正文关键词自动添加分类标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 80% 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 55.0，低分 4/8；OBJ_RESPONSE_SPEED：均值 70.0，低分 1/8 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 55.0，低分 4/8 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 70.0，低分 1/8 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | yangyang016被明确指派，PR由其关联并最终合入，责任清晰 | 明确责任人、候选负责人和下一步动作 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue无用户回复超过14天 |
| 具体动作 | 配置stale Bot自动添加pending-close标签并提醒用户确认 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 75 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 44.2，低分 6/8；OBJ_RESULT_FORMATION_TIMELINESS：均值 72.5，低分 1/8 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 72.5，低分 1/8 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 44.2，低分 6/8 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 评论简短但形成明确行动链：确认接收→安排处理→修复合入 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护团队；候选负责人 `songkai111` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 制定关闭评论模板，要求包含解决方案摘要、关联PR链接和后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 28.1，低分 7/8；OBJ_DECISION_TRANSPARENCY：均值 65.0，低分 2/8 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 28.1，低分 7/8 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 65.0，低分 2/8 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭评论提及'如有问题请联系'，提供基本反馈路径但不够具体 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **88.2/100**，整体相对可控，但仍需关注：创建阶段无明显痛点，issue模板使用规范，结构化输入质量较高。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 92.4 | 内容具体引用文件路径与命令，关联Issue#212，为真实有效反馈 |
| `SUB_INPUT_QUALITY` 输入质量 | 84.1 | 问题描述详尽，含四处不一致对比、修改建议及预期价值，结构化程度高 |


### I1 · 分配与首次响应

本阶段分数为 **66.8/100**，整体相对可控，但仍需关注：标签覆盖率低，分流依赖人工识别。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 55.0 | 均值 55.0，低分 4/8 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 70.0 | 均值 70.0，低分 1/8 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 71.9 | yangyang016被明确指派，PR由其关联并最终合入，责任清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 74.5 | 有明确assignee且PR关联修复，路由正确，但无标签分类辅助 |

代表低分 Issue：[#214](https://gitcode.com/cann/cann-samples/issues/214)
问题：新增 INT8 量化矩阵乘样例 quant_matmul_int8。

### I2 · 讨论与解决

本阶段分数为 **65.6/100**，整体相对可控，但仍需关注：开放Issue讨论停滞无闭环机制。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 72.5 | 均值 72.5，低分 1/8 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 44.2 | 均值 44.2，低分 6/8 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 74.0 | 评论简短但形成明确行动链：确认接收→安排处理→修复合入 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 78.8 | PR#333已合并修复文档不一致，关闭评论确认修复合入，目标达成 |

代表低分 Issue：[#216](https://gitcode.com/cann/cann-samples/issues/216)
问题：[Requirement|需求建议]: 缺少常规MC2算子的开发和优化示例，如matmulallreduce等。

### I3 · 总结与关闭

本阶段分数为 **57.1/100**，本阶段需要改进，主要问题是：存在中度痛点：关闭沉淀得分最低(57.1)，后续反馈路径普遍不明确…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 28.1 | 均值 28.1，低分 7/8 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 65.0 | 均值 65.0，低分 2/8 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 55.6 | 关闭评论提及'如有问题请联系'，提供基本反馈路径但不够具体 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 90.0 | 修复合入后由assignee关闭，关闭原因明确为已完成，无过早关闭迹象 |

代表低分 Issue：[#211](https://gitcode.com/cann/cann-samples/issues/211)
问题：[Question|问题咨询]: No CMAKE_ASC_COMPILER could be found.。

### G · Bot/Agent 治理

本阶段分数为 **69.3/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 50.0 | 均值 50.0，低分 2/8 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/8 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 68.1 | 无bot介入但人工处理顺畅，assignee承接并完成修复闭环 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 57.4 | 无bot评论介入，信息不足，给保守中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 59.5 | 无bot介入动作可评估，信息不足，给保守中性分 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 8 | 54.4 | 首期基线 | 88.2 | 66.8 | 65.6 | 57.1 | 69.3 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：86.2/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/cann-cann-samples/report_cann-cann-samples_2026-06-29_to_2026-07-05.json`。
