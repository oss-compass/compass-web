# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **32** 个 Issue
+ 其中外部 Issue **20** 个、内部 **12** 个；I1–I3 及 G 基于「外部且成熟」的 **20** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 7 / Closed 25**，关闭率 **78.1%**。
+ 总体体验分为 **52.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 47.5 | 关闭阶段缺乏解决证据与沉淀 |
| P0 | I2 · 讨论与解决 | 58.8 | 讨论推进严重不足认领即停滞 |
| P1 | I1 · 分配与首次响应 | 73.1 | 首次响应快但无实质技术内容 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 实施关闭模板，要求填写根因分析、解决方案和验证结果 |
| REC-02 | P0 | 发布进展更新，包含排查方向、当前状态和预计完成时间 |
| REC-03 | P1 | 提供初步技术评估、排查方向和预计时间线，而非仅认领 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 32 |
| Open / Closed | 7 / 25 |
| 关闭率 | 78.1% |
| 类型构成 | 缺陷 19 / 需求 11 / 其他 2 |
| 总体体验分 | 52.6/100（D） |
| 首次响应时间 | 中位 0.3h；均值 6.9h |
| 关闭周期 | 中位 1.8h；均值 1.1天 |
| 7天响应率 | 93.8% |
| 评论数/Issue | 1.06 |
| 标签覆盖率 | 84.4% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 91.3/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 92.2 | 0/32（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 90.4 |
| I1 · 分配与首次响应 | 73.1 | 1/20（5.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 35.0 |
| I2 · 讨论与解决 | 58.8 | 6/20（30.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 53.1 |
| I3 · 总结与关闭 | 47.5 | 15/20（75.0%） | P0 | `OBJ_CLOSURE_REUSE` 13.5 |
| G · Bot/Agent 治理（参考） | 66.5 | 0/20（0.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 42.5 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏解决证据与沉淀 | OBJ_CLOSURE_REUSE：均值 13.5，低分 20/20；OBJ_DECISION_TRANSPARENCY：均值 61.5，低分 6/20 | 已关闭Issue无根因记录和方案沉淀，社区无法从历史问题中受益 |
| PP-02 | P0 | I2 · 讨论与解决 | 讨论推进严重不足认领即停滞 | OBJ_SOLUTION_EVIDENCE：均值 53.1，低分 9/20；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.0，低分 6/20 | 问题长期停滞，用户目标无法达成，技术决策过程不透明 |
| PP-03 | P1 | I1 · 分配与首次响应 | 首次响应快但无实质技术内容 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 35.0，低分 13/20；OBJ_RESPONSE_SPEED：均值 100.0，低分 0/20 | 快速响应制造有效处理假象，实际无技术评估和排查方向 |
| PP-04 | P1 | I2 · 讨论与解决 | 开启Bug长期停滞无跟进进展 | OBJ_SOLUTION_EVIDENCE：均值 53.1，低分 9/20；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.0，低分 6/20 | 持续质量问题未解决，用户目标长期未满足，影响社区可信度 |
| PP-05 | P2 | G · Bot/Agent 治理 | Bot自动化治理缺位与覆盖不足 | OBJ_BOT_GOVERNANCE：均值 42.5，低分 9/20；OBJ_BOT_MISCLOSE_REVERSE：均值 94.0，低分 0/20 | Issue缺乏自动化分流和停滞提醒，增加人工治理负担 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏解决证据与沉淀（I3 · 总结与关闭）

- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 0分
  - 痛点原因：关闭时仅靠命令自动关闭，无方案文档与关联链接，关闭说明极简，未留下任何可复用的修复细节。
  - 原文依据：
    - `justsheldon`：closed from codehub    - `justsheldon`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 0分
  - 痛点原因：关闭说明为0字，仅停留在确认问题和指派负责人阶段，未留下最终解决方案供他人参考复用。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 0分
  - 痛点原因：关闭时无任何文字说明，未留下具体解决方案或修复记录，导致问题经验无法被他人复用。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `yang-di52`：assigned to @yang-di52
- **[#295](https://gitcode.com/cann/ops-blas/issues/295) [Daily-QA|每日监测] ascend950 算子测试失败: srotmg (2026-07-09)** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档与重复链接，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `LuckySun`：closed from codehub    - `LuckySun`：changed custom state from 已确认 to 已完成    - `wangzitao_leo`：add label bug-report    - `LuckySun`：您好，感谢反馈，问题确认和修复中    - `LuckySun`：使用最新的社区toolkit包，本地全量执行并未复现错误。 ![image.png](https://raw.gitcode.com/user-images/assets/8916851/8ac75e52-964f-4c5c-b352-1…    - `LuckySun`：assigned to @LuckySun
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化与dup主链接，仅打标签和分配负责人，未留存任何问题解决过程与结论。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 0分
  - 痛点原因：关闭说明为空，无方案文档化及重复链接，仅简单打标签和指派，未留下任何可供复用的解决经验。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `yang-di52`：感谢反馈，我们将尽快修改    - `yang-di52`：assigned to @yang-di52
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 0分
  - 痛点原因：关闭时无任何说明文字，未总结解决方案与复用指引，无法为后续类似问题提供参考。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，未沉淀任何可供复用的信息。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 0分
  - 痛点原因：关闭说明仅6字且无方案文档与复用链接，仅靠机器人自动关联关闭，无任何可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue286    - `cann-robot`：add label resolved    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …
- **[#285](https://gitcode.com/cann/ops-blas/issues/285) [Bug-Report|缺陷反馈]: ops-blas 在部分CANN-9.1.0版本下编译失败** — 0分
  - 痛点原因：关闭时仅由机器人留下17字关联合并说明，无人工方案总结与根因分析，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue285    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：## 根因分析 `OP` 与 `OP_MODULE_ID` 是同一模块号（63）的新旧两套名字。CANN 包更新后，`log/log.h` 删除了 `#include "dlog_pub.h"` 并改用自带的 `constexpr OP_…    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 0分
  - 痛点原因：关闭说明仅16字且无实质内容，未文档化根因与解决方案，也无重复链接，无法供他人参考复用。
  - 原文依据：
    - `yuyuanfeng`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#300](https://gitcode.com/cann/ops-blas/issues/300) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 cuBLAS 标准** — 30分
  - 痛点原因：关闭说明仅17字且未提供关联链接，缺乏供他人复用的最终修复信息。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。
- **[#298](https://gitcode.com/cann/ops-blas/issues/298) [Readme-QA] ascend950 aclblasSgemmGroupedBatched 调用示例编译失败 (2026-07-09)** — 30分
  - 痛点原因：关闭说明仅13字通用感谢语，无具体技术方案或修复细节，未提供有效复用信息。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `Crrryyyy`：感谢反馈，我们将会尽快修复    - `Crrryyyy`：/assign    - `Crrryyyy`：你好，本地编译最新主线代码，aclblasSgemmGroupedBatched算子接口编译 功能无误，请确认 ![image.png](https://raw.gitcode.com/user-images/assets/8916851…
- **[#283](https://gitcode.com/cann/ops-blas/issues/283) [Readme-QA] ascend950 aclblasSnrm2Ex 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且无主链接，缺乏问题原因与解决方案的总结，难以供他人复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #287（merged）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且无重复主链接，仅由机器人自动关闭，未沉淀可复用的解决方案细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由机器人自动关闭，仅列举关联issue编号，缺乏明确的重复主链接与最终修复结论。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且未关联重复issue主链接，导致其他用户无法获取有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：机器人自动关闭且说明仅16字，未提供主链接供后续用户参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由机器人自动关闭，缺乏问题原因与解决方案的详细描述，难以供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#277](https://gitcode.com/cann/ops-blas/issues/277) [Readme-QA] ascend950 aclblasSgelsBatched 调用示例运行失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且无关联主链接，未沉淀具体根因与修复方案，导致其他用户无法参考复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：本地按照重现步骤，分别压测了1000次和10000次均未复现，需要确认线上运行超时是否为必现    - `justsheldon`：assigned to @justsheldon
#### PP-02 讨论推进严重不足认领即停滞（I2 · 讨论与解决）

- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：仅停留在需求确认与分配负责人阶段，无关联PR、代码提交、文档链接或release等任何解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 15分
  - 痛点原因：无关联PR与commit引用，且无关闭评论，仅有确认和分配留言，缺乏问题已修复的实质证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且关闭过程仅靠无效的机器人指令，缺乏实质证据。
  - 原文依据：
    - [关联PR #247（merged）](https://gitcode.com/cann/ops-blas/merge_requests/247)    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 31分
  - 痛点原因：缺乏关联PR与关闭评论，仅停留在确认和修复阶段，无实际解决证据。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 31分
  - 痛点原因：缺乏关联PR、release引用及关闭评论等实际修复证据，仅停留在指派和承诺修改阶段，无法证明问题已解决。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快修改    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 46分
  - 痛点原因：缺少关联PR与关闭评论，仅确认问题并指派，虽有commit和文档引用但核心解决证据不足。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 46分
  - 痛点原因：仅口头承诺修改，无关联 PR 和关闭评论，缺乏实质性的解决证据支撑。
  - 原文依据：
    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#295](https://gitcode.com/cann/ops-blas/issues/295) [Daily-QA|每日监测] ascend950 算子测试失败: srotmg (2026-07-09)** — 54分
  - 痛点原因：仅以本地未复现为由关闭，无关联PR及明确修复代码，缺乏实质性修复证明。
  - 原文依据：
    - `LuckySun`：您好，感谢反馈，问题确认和修复中    - `LuckySun`：使用最新的社区toolkit包，本地全量执行并未复现错误。 ![image.png](https://raw.gitcode.com/user-images/assets/8916851/8ac75e52-964f-4c5c-b352-1…    - `LuckySun`：closed from codehub    - `LuckySun`：changed custom state from 已确认 to 已完成    - `wangzitao_leo`：add label bug-report    - `LuckySun`：assigned to @LuckySun
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 54分
  - 痛点原因：仅关联其他issue并直接关闭，缺乏关联PR和文档链接等直接修复证据，导致得分偏低。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `yuyuanfeng`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
#### PP-03 首次响应快但无实质技术内容（I1 · 分配与首次响应）

- **[#300](https://gitcode.com/cann/ops-blas/issues/300) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 cuBLAS 标准** — 0分
  - 痛点原因：首次响应仅确认问题，随后直接关闭并标记完成，全程未提供任何实质性的技术解答或方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 0分
  - 痛点原因：虽有快速响应，但后续仅停留在打标签和指派，始终未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 0分
  - 痛点原因：仅有客套回复和打标签分配任务，始终未提供针对该问题的实质性技术解答或排查反馈。
  - 原文依据：
    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 0分
  - 痛点原因：仅有初步响应、打标签和指派，全程未提供任何实质性的技术回应或解决方案。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 0分
  - 痛点原因：仅有客套回复、打标签和指派操作，始终未提供任何技术分析或解决方案等实质回应内容。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快修改    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 0分
  - 痛点原因：首次响应虽快，但仅停留在客套回复与指派操作，始终未提供技术分析或实质解答。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：仅给出简单确认与指派，始终未提供技术评估或处理计划等实质回应。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 0分
  - 痛点原因：仅存在无效的关闭指令与机器人权限提示，未对需求内容提供任何实质性技术回应。
  - 原文依据：
    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `cann-robot`：add label resolved
- **[#283](https://gitcode.com/cann/ops-blas/issues/283) [Readme-QA] ascend950 aclblasSnrm2Ex 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：虽快速响应，但全程仅做加标签和分配等流程操作，无任何实质技术解答便直接关闭。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `wangzitao_leo`：add label bug-report    - `yuyuanfeng`：assigned to @yuyuanfeng    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - [关联PR #287（merged）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：首次响应仅为客套确认，后续仅添加标签和指派人员，始终未提供实质性技术回应。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：虽有快速初步响应，但仅停留在客套确认、打标签和指派，全程无任何实质性技术解答。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：首次响应仅为感谢反馈和打标签等流程性操作，始终未提供实质性的技术解答。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：首次响应仅为确认和打标签，全程未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
#### PP-04 开启Bug长期停滞无跟进进展（I2 · 讨论与解决）

- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：仅停留在需求确认与分配负责人阶段，无关联PR、代码提交、文档链接或release等任何解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 15分
  - 痛点原因：无关联PR与commit引用，且无关闭评论，仅有确认和分配留言，缺乏问题已修复的实质证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且关闭过程仅靠无效的机器人指令，缺乏实质证据。
  - 原文依据：
    - [关联PR #247（merged）](https://gitcode.com/cann/ops-blas/merge_requests/247)    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 31分
  - 痛点原因：缺乏关联PR与关闭评论，仅停留在确认和修复阶段，无实际解决证据。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 31分
  - 痛点原因：缺乏关联PR、release引用及关闭评论等实际修复证据，仅停留在指派和承诺修改阶段，无法证明问题已解决。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快修改    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 46分
  - 痛点原因：缺少关联PR与关闭评论，仅确认问题并指派，虽有commit和文档引用但核心解决证据不足。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 46分
  - 痛点原因：仅口头承诺修改，无关联 PR 和关闭评论，缺乏实质性的解决证据支撑。
  - 原文依据：
    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#295](https://gitcode.com/cann/ops-blas/issues/295) [Daily-QA|每日监测] ascend950 算子测试失败: srotmg (2026-07-09)** — 54分
  - 痛点原因：仅以本地未复现为由关闭，无关联PR及明确修复代码，缺乏实质性修复证明。
  - 原文依据：
    - `LuckySun`：您好，感谢反馈，问题确认和修复中    - `LuckySun`：使用最新的社区toolkit包，本地全量执行并未复现错误。 ![image.png](https://raw.gitcode.com/user-images/assets/8916851/8ac75e52-964f-4c5c-b352-1…    - `LuckySun`：closed from codehub    - `LuckySun`：changed custom state from 已确认 to 已完成    - `wangzitao_leo`：add label bug-report    - `LuckySun`：assigned to @LuckySun
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 54分
  - 痛点原因：仅关联其他issue并直接关闭，缺乏关联PR和文档链接等直接修复证据，导致得分偏低。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `yuyuanfeng`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
#### PP-05 Bot自动化治理缺位与覆盖不足（G · Bot/Agent 治理）

- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 15分
  - 痛点原因：Bot未执行打标，且对非作者的关闭指令仅作拦截提示，未能成功关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：unassigned @wangzitao_leo
- **[#285](https://gitcode.com/cann/ops-blas/issues/285) [Bug-Report|缺陷反馈]: ops-blas 在部分CANN-9.1.0版本下编译失败** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，无任何实质性评论，缺乏自动化引导和回复。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：## 根因分析 `OP` 与 `OP_MODULE_ID` 是同一模块号（63）的新旧两套名字。CANN 包更新后，`log/log.h` 删除了 `#include "dlog_pub.h"` 并改用自带的 `constexpr OP_…    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue285
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标，在人工确认问题闭环后未自动关闭issue且无评论互动，缺乏实际治理动作。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `yuyuanfeng`：closed from codehub
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标且过早标记resolved，无任何有效评论沟通，与人工确认修复中的状态脱节，治理流于形式。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot在人工确认问题修复中时误打已解决标签并关闭issue，治理动作与实际状态严重不符。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标且无任何有效评论，在人工确认修复中时提前标记resolved并关闭，治理流于形式。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：人工尚在修复中，Bot却误打resolved标签并关闭，且无任何Bot评论，导致治理无效。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标并关闭，未产生任何有效评论与用户沟通，治理流于形式。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 35分
  - 痛点原因：用户两次尝试用Bot命令关闭issue均因非作者身份被拒，Bot未能有效解决诉求。
  - 原文依据：
    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `cann-robot`：add label resolved

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `justsheldon` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 实施关闭模板，要求填写根因分析、解决方案和验证结果 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 70 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 13.5，低分 20/20；OBJ_DECISION_TRANSPARENCY：均值 61.5，低分 6/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 13.5，低分 20/20 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 61.5，低分 6/20 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | Issue负责人；候选负责人 `justsheldon` |
| 触发条件 | 认领后72小时无更新 |
| 具体动作 | 发布进展更新，包含排查方向、当前状态和预计完成时间 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 60 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 53.1，低分 9/20；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.0，低分 6/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 67.0，低分 6/20 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 53.1，低分 9/20 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅一句确认回复，后续靠PR推进，issue内无持续技术讨论或结论记录。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Issue响应人；候选负责人 `justsheldon` |
| 触发条件 | 首次响应时 |
| 具体动作 | 提供初步技术评估、排查方向和预计时间线，而非仅认领 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 35.0，低分 13/20；OBJ_RESPONSE_SPEED：均值 100.0，低分 0/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 35.0，低分 13/20 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 100.0，低分 0/20 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | wangzitao_leo先自认领后转交eternityk，责任链清晰但ete… | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **92.2/100**，整体相对可控，但仍需关注：创建阶段表现良好，Issue模板完整、输入质量高，无显著痛点。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 94.1 | 内部团队提出的技术需求，内容具体且含真实接口签名与算子路径设计，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 90.4 | 需求模板填写完整，含背景、设计方案、接口签名与双路径表格，结构化程度高。 |


### I1 · 分配与首次响应
本阶段分数为 **73.1/100**，整体相对可控，但仍需关注：首次响应快但无实质技术内容。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 35.0 | 均值 35.0，低分 13/20 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 100.0 | 均值 100.0，低分 0/20 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 85.4 | wangzitao_leo先自认领后转交eternityk，责任链清晰但ete… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 77.4 | 快速响应并assign转交，但无标签分类，分流路径靠人工非正式流程。 |

代表低分 Issue：[#287](https://gitcode.com/cann/ops-blas/issues/287)
问题：[Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子。

### I2 · 讨论与解决
本阶段分数为 **58.8/100**，本阶段需要改进，主要问题是：讨论推进严重不足认领即停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 67.0 | 均值 67.0，低分 6/20 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 53.1 | 均值 53.1，低分 9/20 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 54.0 | 仅一句确认回复，后续靠PR推进，issue内无持续技术讨论或结论记录。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 60.0 | PR#275已合并修复编译问题，作者自行关闭标记已完成，目标达成。 |

代表低分 Issue：[#287](https://gitcode.com/cann/ops-blas/issues/287)
问题：[Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子。

### I3 · 总结与关闭
本阶段分数为 **47.5/100**，本阶段需要改进，主要问题是：关闭阶段缺乏解决证据与沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 13.5 | 均值 13.5，低分 20/20 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 61.5 | 均值 61.5，低分 6/20 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 44.5 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 80.6 | 有合并PR且作者自关闭，状态从进行中改已完成，无过早关闭迹象。 |

代表低分 Issue：[#297](https://gitcode.com/cann/ops-blas/issues/297)
问题：[Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)。

### G · Bot/Agent 治理
本阶段分数为 **66.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 42.5 | 均值 42.5，低分 9/20 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.0 | 均值 94.0，低分 0/20 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 68.5 | 无bot介入，人工直接处理，给中性分 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 61.1 | 无bot介入，信息不足，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 63.8 | 权限校验准确及时，未误导未错误阻断，动作合规且时机合适。 |



## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 32 | 52.6 | 首期基线 | 92.2 | 73.1 | 58.8 | 47.5 | 66.5 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **9 位社区响应者**贡献 **30 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `justsheldon` | 8 |
| `wangzitao_leo` | 7 |
| `eternityk` | 3 |
| `Crrryyyy` | 3 |
| `yuyuanfeng` | 3 |

Top1 响应占比 **26.7%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-07-06_to_2026-07-12.json`。
