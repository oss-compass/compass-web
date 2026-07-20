# Issue 贡献体验周报 · cann/cann-samples

**周期：2026-07-06 至 2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/cann-samples` 共收到 **5** 个 Issue
+ **Open 2 / Closed 3**，关闭率 **60.0%**。
+ 总体体验分为 **47.7/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I4 · 关闭沉淀 | 38.1 | 关闭原因标注不准确，知识沉淀缺失 |
| P0 | I2 · 讨论 | 39.9 | Issue讨论深度严重不足，技术交流几乎缺失 |
| P2 | I3 · 解决 | 41.5 | 存在中度痛点，80%的Issue解决证据不足，开放Issue无解决… |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置Bot自动添加类型标签并通知领域负责人 |
| REC-02 | P0 | 在Issue评论区记录根因分析和方案选择理由，再创建MR |
| REC-03 | P1 | 修正Bot close_reason配置，确保标注为resolved或fixed |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 5 |
| Open / Closed | 2 / 3 |
| 关闭率 | 60.0% |
| 类型构成 | 缺陷 3 / 需求 1 / 其他 1 |
| 总体体验分 | 47.7/100（D） |
| 首次响应时间 | 中位 22.7h；均值 1.7天 |
| 关闭周期 | 中位 1.2天；均值 2.7天 |
| 7天响应率 | 80.0% |
| 评论数/Issue | 1.00 |
| 标签覆盖率 | 60.0% |
| 指派覆盖率 | 40.0% |
| 数据完整性 | 84.5/100 |
| 置信度 | 低 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 80.7 | 2/5（40.0%） | 相对可控 | `OBJ_INPUT_QUALITY` 74.0 |
| I1 · 分流响应 | 47.9 | 5/5（100.0%） | P0 | `OBJ_TRIAGE_QUALITY` 30.0 |
| I2 · 讨论 | 39.9 | 4/5（80.0%） | P0 | `OBJ_DISCUSSION_ACTIVITY` 22.0 |
| I3 · 解决 | 41.5 | 4/5（80.0%） | 需改进 | `OBJ_RESOLUTION_VERIFICATION` 22.2 |
| I4 · 关闭沉淀 | 38.1 | 4/5（80.0%） | P1 | `OBJ_CLOSURE_REUSABILITY` 11.2 |
| G · Bot/Agent 治理（参考） | 64.3 | 1/5（20.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 32.0 |

## 4. 主要问题

| PP-ID | 优先级 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | -------- | ---- |
| PP-01 | P0 | Triage流程全面缺失，Issue缺乏正式标签与指派 | OBJ_TRIAGE_QUALITY：均值 30.0，低分 5/5；OBJ_BOT_GOVERNANCE：均值 32.0，低分 3/5 | 责任归属模糊，Issue难以按领域或优先级检索，后续跟进缺乏明确owner。 |
| PP-02 | P0 | Issue讨论深度严重不足，技术交流几乎缺失 | OBJ_DISCUSSION_ACTIVITY：均值 22.0，低分 5/5；OBJ_FIRST_RESPONSE_TIME：均值 56.0，低分 2/5 | 后来者无法从Issue了解排查过程和决策依据，社区知识沉淀在MR而非Issue中。 |
| PP-03 | P1 | 关闭原因标注不准确，知识沉淀缺失 | OBJ_CLOSURE_REUSABILITY：均值 11.2，低分 5/5；OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 5/5 | Issue状态元数据失真，无法通过close_reason筛选已解决问题，后来者需跳转MR才能了解方案。 |
| PP-04 | P1 | 非Bug类Issue Bot缺位，关闭原因配置不当 | OBJ_BOT_GOVERNANCE：均值 32.0，低分 3/5；OBJ_PROCESS_TRACEABILITY：均值 36.0，低分 4/5 | Feature Request和Roadmap类Issue缺乏自动化支持，分流和跟进依赖人工；已关闭Issue状态元数据失真。 |
| PP-05 | P1 | 响应速度极不均匀，部分Issue长时间无响应 | OBJ_TRIAGE_QUALITY：均值 30.0，低分 5/5；OBJ_BOT_GOVERNANCE：均值 32.0，低分 3/5 | 高价值Feature Request和Roadmap Issue被忽视，社区贡献者积极性受挫。 |

## 5. 本周行动清单

### REC-01 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 分流响应 |
| 承接方 | 社区维护者；候选负责人 `songkai111` |
| 触发条件 | Issue创建时 |
| 具体动作 | 配置Bot自动添加类型标签并通知领域负责人 |
| 目标 | `OBJ_TRIAGE_QUALITY` 和 `OBJ_BOT_GOVERNANCE` 提升至 90 以上 |
| 相关证据 | OBJ_TRIAGE_QUALITY：均值 30.0，低分 5/5；OBJ_BOT_GOVERNANCE：均值 32.0，低分 3/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_TRIAGE_QUALITY` | 均值 30.0，低分 5/5 | 提升标签、指派和分流记录完整度 |
| `OBJ_BOT_GOVERNANCE` | 均值 32.0，低分 3/5 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `SUB_RESPONSE_EFFECTIVENESS` | 首次回复仅泛泛表态且延迟5天，虽后续有MR修复，但响应本身未实质推动分析。 | 让首次响应真正推动问题进入处理 |

### REC-02 · 补齐技术讨论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论 |
| 承接方 | Issue处理者；候选负责人 `songkai111` |
| 触发条件 | 接手Issue后 |
| 具体动作 | 在Issue评论区记录根因分析和方案选择理由，再创建MR |
| 目标 | `OBJ_DISCUSSION_ACTIVITY` 和 `OBJ_FIRST_RESPONSE_TIME` 提升；平均评论数提升至 2 以上 |
| 相关证据 | OBJ_DISCUSSION_ACTIVITY：均值 22.0，低分 5/5；OBJ_FIRST_RESPONSE_TIME：均值 56.0，低分 2/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_DISCUSSION_ACTIVITY` | 均值 22.0，低分 5/5 | 增加有效评论、技术讨论和往返轮次 |
| `OBJ_FIRST_RESPONSE_TIME` | 均值 56.0，低分 2/5 | 缩短首次人工响应时间，提高 7 天响应率 |
| `SUB_DISCUSSION_DEPTH` | issue内仅一条表态评论，无技术分析交互；MR描述有技术细节但不在讨论区。 | 补齐问题拆解、技术分析和判断依据 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 关闭沉淀 |
| 承接方 | Bot配置维护者；候选负责人 `songkai111` |
| 触发条件 | MR合并触发Issue关闭时 |
| 具体动作 | 修正Bot close_reason配置，确保标注为resolved或fixed |
| 目标 | `OBJ_CLOSURE_REUSABILITY` 和 `OBJ_SOLUTION_EVIDENCE` 提升至 100 以上 |
| 相关证据 | OBJ_CLOSURE_REUSABILITY：均值 11.2，低分 5/5；OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 5/5 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSABILITY` | 均值 11.2，低分 5/5 | 关闭时沉淀原因、结论和可复用摘要 |
| `OBJ_SOLUTION_EVIDENCE` | 均值 23.1，低分 5/5 | 补充修改内容、关联变更和影响范围 |
| `SUB_CLOSE_QUALITY` | bot因MR合并关闭时机正确，但关闭原因标注'进行中'与实际已修复矛盾，质量一… | 让关闭动作清晰、合理、可解释 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **80.7/100**，整体相对可控，但仍需关注：存在轻度痛点，开放Issue创建得分偏低且缺乏标签元数据，但已关闭…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_INPUT_QUALITY` | 74.0 | 均值 74.0，低分 2/5 |
| `SUB_CONTEXT_SUFFICIENCY` | 87.0 | 提供了硬件型号、CANN版本、操作系统、完整重现命令和报错截图，上下文充足。 |
| `SUB_CREATION_CLARITY` | 89.4 | 标题明确指出编包失败，正文含截图、重现步骤和环境信息，核心诉求清晰。 |

代表低分 Issue：[#220](https://gitcode.com/cann/cann-samples/issues/220)
问题：建议补充 Matmul + AllReduce 融合的 MC2 示例（#216 的补充方案）。

### I1 · 分流响应

本阶段分数为 **47.9/100**，本阶段需要改进，主要问题是：Triage流程全面缺失，Issue缺乏正式标签与指派。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_TRIAGE_QUALITY` | 30.0 | 均值 30.0，低分 5/5 |
| `OBJ_BOT_GOVERNANCE` | 32.0 | 均值 32.0，低分 3/5 |
| `SUB_RESPONSE_EFFECTIVENESS` | 63.4 | 首次回复仅泛泛表态且延迟5天，虽后续有MR修复，但响应本身未实质推动分析。 |
| `SUB_ROUTING_CORRECTNESS` | 66.4 | 仅有作者自加的bug-report标签，无维护者分流或重定向动作，路由证据不足。 |

代表低分 Issue：[#222](https://gitcode.com/cann/cann-samples/issues/222)
问题：[Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败。

### I2 · 讨论

本阶段分数为 **39.9/100**，本阶段是本周短板之一，主要问题是：Issue讨论深度严重不足，技术交流几乎缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_DISCUSSION_ACTIVITY` | 22.0 | 均值 22.0，低分 5/5 |
| `OBJ_FIRST_RESPONSE_TIME` | 56.0 | 均值 56.0，低分 2/5 |
| `SUB_DISCUSSION_DEPTH` | 35.6 | issue内仅一条表态评论，无技术分析交互；MR描述有技术细节但不在讨论区。 |
| `SUB_DISCUSSION_PROGRESS` | 46.0 | 从表态回复到创建MR有推进，但issue讨论区本身未形成排查方向或下一步动作。 |

代表低分 Issue：[#221](https://gitcode.com/cann/cann-samples/issues/221)
问题：cann-samples Development Roadmap (2026 Q3)。

### I3 · 解决

本阶段分数为 **41.5/100**，本阶段需要改进，主要问题是：存在中度痛点，80%的Issue解决证据不足，开放Issue无解决…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESOLUTION_VERIFICATION` | 22.2 | 均值 22.2，低分 5/5 |
| `OBJ_SOLUTION_EVIDENCE` | 23.1 | 均值 23.1，低分 5/5 |
| `SUB_DECISION_RATIONALE` | 49.4 | MR描述解释了修复理由，但issue关闭原由标注为'进行中'不够准确。 |
| `SUB_RESOLUTION_CONFIDENCE` | 53.0 | MR已合并且描述编译验证通过，bot因MR合并关闭，解决可信度较高。 |

代表低分 Issue：[#221](https://gitcode.com/cann/cann-samples/issues/221)
问题：cann-samples Development Roadmap (2026 Q3)。

### I4 · 关闭沉淀

本阶段分数为 **38.1/100**，本阶段是本周短板之一，主要问题是：关闭原因标注不准确，知识沉淀缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSABILITY` | 11.2 | 均值 11.2，低分 5/5 |
| `OBJ_SOLUTION_EVIDENCE` | 23.1 | 均值 23.1，低分 5/5 |
| `SUB_CLOSE_QUALITY` | 44.4 | bot因MR合并关闭时机正确，但关闭原因标注'进行中'与实际已修复矛盾，质量一… |
| `SUB_KNOWLEDGE_RETENTION` | 45.4 | MR描述有技术说明，但issue评论区无总结性结论，后来者需跳转MR才能了解。 |

代表低分 Issue：[#221](https://gitcode.com/cann/cann-samples/issues/221)
问题：cann-samples Development Roadmap (2026 Q3)。

### G · Bot/Agent 治理

本阶段分数为 **64.3/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` | 32.0 | 均值 32.0，低分 3/5 |
| `OBJ_PROCESS_TRACEABILITY` | 36.0 | 均值 36.0，低分 4/5 |
| `SUB_BOT_HELPFULNESS` | 63.4 | bot在MR合并后自动关闭issue，正确执行流程闭环，对处理流程有正向帮助。 |
| `SUB_BOT_HANDOFF_QUALITY` | 65.6 | bot关闭前songkai111已完成MR创建与合并，人工处理到位，bot仅执… |

代表低分 Issue：[#222](https://gitcode.com/cann/cann-samples/issues/222)
问题：[Bug-Report|缺陷反馈]: 用7月8日最新的社区toolkit包编包失败。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | I4 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06 至 2026-07-12 | 5 | 47.7 | 首期基线 | 80.7 | 47.9 | 39.9 | 41.5 | 38.1 | 64.3 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **1 位社区响应者**贡献 **5 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `songkai111` | 5 |

Top1 响应占比 **100.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06 至 2026-07-12 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：84.5/100，整体置信度 低。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`outputs/2026_w28/issue_experience_report_data.json`。
