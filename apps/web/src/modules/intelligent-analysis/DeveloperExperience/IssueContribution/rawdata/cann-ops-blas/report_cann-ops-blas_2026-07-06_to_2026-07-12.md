# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **32** 个 Issue
+ **Open 7 / Closed 25**，关闭率 **78.1%**。
+ 总体体验分为 **51.1/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 45.2 | 关闭阶段质量全面不足 |
| P0 | I2 · 讨论与解决 | 60.2 | 讨论停滞，确认后无技术跟进 |
| P1 | I1 · 分配与首次响应 | 65.5 | 实质性技术响应缺失 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 校验是否包含解决证据、测试结果和后续反馈路径，不满足则阻止关闭 |
| REC-02 | P0 | 发布进展更新或排查方向说明 |
| REC-03 | P1 | 校验close_reason与Issue标签/状态一致性，不一致时阻止关闭并告警 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 32 |
| Open / Closed | 7 / 25 |
| 关闭率 | 78.1% |
| 类型构成 | 缺陷 19 / 需求 11 / 其他 2 |
| 总体体验分 | 51.1/100（D） |
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
| I0 · 创建 | 92.4 | 0/32（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 91.0 |
| I1 · 分配与首次响应 | 65.5 | 6/32（18.8%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 21.9 |
| I2 · 讨论与解决 | 60.2 | 8/32（25.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 43.3 |
| I3 · 总结与关闭 | 45.2 | 24/32（75.0%） | P0 | `OBJ_CLOSURE_REUSE` 14.5 |
| G · Bot/Agent 治理（参考） | 65.4 | 3/32（9.4%） | 参考项 | `OBJ_BOT_GOVERNANCE` 37.8 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段质量全面不足 | OBJ_CLOSURE_REUSE：均值 14.5，低分 31/32；OBJ_DECISION_TRANSPARENCY：均值 52.8，低分 16/32 | 社区知识沉淀断裂，后续开发者无法从已关闭Issue中获取可复用的解决方案 |
| PP-02 | P0 | I2 · 讨论与解决 | 讨论停滞，确认后无技术跟进 | OBJ_SOLUTION_EVIDENCE：均值 43.3，低分 21/32；OBJ_RESULT_FORMATION_TIMELINESS：均值 75.6，低分 7/32 | Bug和需求Issue长期悬置，开发者无法获得排查方向或修复时间线 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot误关闭与状态不一致 | OBJ_BOT_GOVERNANCE：均值 37.8，低分 18/32；OBJ_BOT_MISCLOSE_REVERSE：均值 91.9，低分 0/32 | Bot关闭动作与Issue实际状态不同步，可能导致已解决问题被误判为进行中或反之 |
| PP-04 | P1 | I1 · 分配与首次响应 | 实质性技术响应缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 21.9，低分 25/32；OBJ_RESPONSE_SPEED：均值 88.8，低分 3/32 | 开发者快速收到确认但无法获得技术判断，问题实质未被触及 |
| PP-05 | P2 | G · Bot/Agent 治理 | Bot缺位导致自动化治理空白 | OBJ_BOT_GOVERNANCE：均值 37.8，低分 18/32；OBJ_BOT_MISCLOSE_REVERSE：均值 91.9，低分 0/32 | 部分Issue无自动化标签分类和停滞提醒，依赖纯人工治理增加维护负担 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段质量全面不足（I3 · 总结与关闭）

- **[#307](https://gitcode.com/cann/ops-blas/issues/307) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口** — 0分
  - 痛点原因：机器人随MR合并自动关闭，无人工关闭说明、方案文档及重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue307    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `LuckySun`：assigned to @LuckySun    - [关联PR #262（merged）](https://gitcode.com/cann/ops-blas/merge_requests/262)
- **[#306](https://gitcode.com/cann/ops-blas/issues/306) [Requirement|需求建议]: 新增面向 arch22 的 `aclblasChemm` 算子，实现复数 Hermitian 矩阵乘法** — 0分
  - 痛点原因：关闭时未留下任何文字说明，且缺乏方案文档与复用链接，导致后续无法参考。
  - 原文依据：
    - `zhaotiensn`：add label requirement    - `wangzitao_leo`：assigned to @zhaotiensn    - [关联PR #207（open）](https://gitcode.com/cann/ops-blas/merge_requests/207)
- **[#305](https://gitcode.com/cann/ops-blas/issues/305) [Requirement|需求建议]: blaze 实践编码中不应引入 adv_api/matmul/matmul.h 高阶 API 头文件** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人因关联PR合并自动关闭，未沉淀任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue305    - `cann-robot`：add label resolved    - [关联PR #274（merged）](https://gitcode.com/cann/ops-blas/merge_requests/274)
- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 0分
  - 痛点原因：关闭说明仅17字且无方案文档化，仅用指令变更状态，未留下任何根因或修复方案供后续复用。
  - 原文依据：
    - `justsheldon`：closed from codehub    - `justsheldon`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 0分
  - 痛点原因：关闭说明为空，未总结问题根因与最终修复方案，导致后续无法参考复用。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 0分
  - 痛点原因：关闭时未留下任何文字说明，导致其他用户无法复用其解决方案。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `yang-di52`：assigned to @yang-di52
- **[#295](https://gitcode.com/cann/ops-blas/issues/295) [Daily-QA|每日监测] ascend950 算子测试失败: srotmg (2026-07-09)** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档化，仅留通用回复便直接关闭，未沉淀根因与修复细节，无法供他人借鉴。
  - 原文依据：
    - `LuckySun`：closed from codehub    - `LuckySun`：changed custom state from 已确认 to 已完成    - `wangzitao_leo`：add label bug-report    - `LuckySun`：您好，感谢反馈，问题确认和修复中    - `LuckySun`：使用最新的社区toolkit包，本地全量执行并未复现错误。 ![image.png](https://raw.gitcode.com/user-images/assets/8916851/8ac75e52-964f-4c5c-b352-1…    - `LuckySun`：assigned to @LuckySun
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 0分
  - 痛点原因：关闭说明为空，无方案文档化记录与重复主链接，未留存任何问题解决过程或结论供后续参考。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 0分
  - 痛点原因：关闭说明为空，无方案文档与复现链接，仅分配负责人和客套回复，未留下任何可复用的经验。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `yang-di52`：感谢反馈，我们将尽快修改    - `yang-di52`：assigned to @yang-di52
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 0分
  - 痛点原因：关闭说明为0字，仅分配负责人而未沉淀根因或解决方案，缺乏复用价值。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#291](https://gitcode.com/cann/ops-blas/issues/291) [Daily-QA|每日监测] ascend950 大面积测试失败: 37 个算子 (CANN 9.1.0, 2026-07-09)** — 0分
  - 痛点原因：关闭时无方案文档、复用链接及关闭说明，仅由系统操作关闭，未留存任何可复用信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#290](https://gitcode.com/cann/ops-blas/issues/290) [Bug-Report|缺陷反馈]: aclblasCgemvBatched 测试运行时 Segmentation fault** — 0分
  - 痛点原因：关闭说明仅17字且无方案文档化，仅靠机器人关联MR关闭，未沉淀根因与解决方案供他人复用。
  - 原文依据：
    - `zhanghua145`：Create issue mr links: **fix(cgemv_batched): 修复test中stream/handle销毁顺序导致的段错误 (closes #290)** #270    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue290    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @zhanghua145    - [关联PR #270（merged）](https://gitcode.com/cann/ops-blas/merge_requests/270)
- **[#288](https://gitcode.com/cann/ops-blas/issues/288) [Bug-Report|缺陷反馈]: 日志配置接口入参类型及签名设计问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅靠机器人随PR合并自动关闭，无法为后续提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue288    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - [关联PR #266（merged）](https://gitcode.com/cann/ops-blas/merge_requests/266)
- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档或关联链接，仅停留在需求确认阶段，毫无复用价值。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 0分
  - 痛点原因：关闭说明仅6字且无方案文档与关联链接，仅由机器人随MR合并自动关闭，未留存有效信息供社区复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue286    - `cann-robot`：add label resolved    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …
- **[#285](https://gitcode.com/cann/ops-blas/issues/285) [Bug-Report|缺陷反馈]: ops-blas 在部分CANN-9.1.0版本下编译失败** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无人工总结的解决方案与排查过程，缺乏可供复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue285    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：## 根因分析 `OP` 与 `OP_MODULE_ID` 是同一模块号（63）的新旧两套名字。CANN 包更新后，`log/log.h` 删除了 `#include "dlog_pub.h"` 并改用自带的 `constexpr OP_…    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 0分
  - 痛点原因：关闭复用价值得分0，低于合格线 60
  - 原文依据：
    - `yuyuanfeng`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#276](https://gitcode.com/cann/ops-blas/issues/276) [Requirement|需求建议]: 新增 gemvStridedBatched 系列接口（Ascend 950）** — 0分
  - 痛点原因：仅由机器人自动关闭并关联PR，无人工关闭说明与方案文档沉淀，社区无法复用其解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue276    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #250（merged）](https://gitcode.com/cann/ops-blas/merge_requests/250)
- **[#304](https://gitcode.com/cann/ops-blas/issues/304) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐 cuBLASLt 日志控制能力** — 30分
  - 痛点原因：关闭说明为0字，仅通过代码库操作关闭，未留下最终解决方案或经验总结供其他用户复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#303](https://gitcode.com/cann/ops-blas/issues/303) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐日志控制能力** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随关联PR合并自动关闭，未留下任何供后续复用的总结信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue303    - `cann-robot`：add label resolved    - [关联PR #271（merged）](https://gitcode.com/cann/ops-blas/merge_requests/271)
- **[#301](https://gitcode.com/cann/ops-blas/issues/301) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 BLAS 标准** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人随PR合并自动关闭，未补充人工总结，缺乏复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue301    - `cann-robot`：add label resolved    - [关联PR #268（merged）](https://gitcode.com/cann/ops-blas/merge_requests/268)
- **[#300](https://gitcode.com/cann/ops-blas/issues/300) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 cuBLAS 标准** — 30分
  - 痛点原因：关闭说明仅17字且无复现链接，缺乏详细解决方案，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。
- **[#298](https://gitcode.com/cann/ops-blas/issues/298) [Readme-QA] ascend950 aclblasSgemmGroupedBatched 调用示例编译失败 (2026-07-09)** — 30分
  - 痛点原因：关闭说明仅13字且仅表达感谢与尽快修复，未提供具体修复方案或根因，导致无法复用。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `Crrryyyy`：感谢反馈，我们将会尽快修复    - `Crrryyyy`：/assign    - `Crrryyyy`：你好，本地编译最新主线代码，aclblasSgemmGroupedBatched算子接口编译 功能无误，请确认 ![image.png](https://raw.gitcode.com/user-images/assets/8916851…
- **[#296](https://gitcode.com/cann/ops-blas/issues/296) [Requirement|需求建议]: dot 算子 README 规范完善及参数校验补充** — 30分
  - 痛点原因：关闭时无任何人工说明，仅由机器人自动关闭并打标签，缺乏最终方案沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue296    - `cann-robot`：add label resolved    - [关联PR #267（merged）](https://gitcode.com/cann/ops-blas/merge_requests/267)
- **[#283](https://gitcode.com/cann/ops-blas/issues/283) [Readme-QA] ascend950 aclblasSnrm2Ex 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且仅标注从codehub关闭，未记录最终解决方案与处理结果，导致其他用户无法复用解决经验。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由机器人自动触发，缺乏人工对问题原因和修复方案的详细总结，无重复主链接，难以供社区复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且仅由机器人关联MR，无具体解决方案与重复issue主链接，对其他用户参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由机器人自动关联MR关闭，缺乏人工总结的最终修复方案与复用指导。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由机器人自动关联关闭，缺乏人工补充的复用方案与重复链接，无法供他人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且为机器人自动回复，缺乏人工对问题根因与解决方案的总结沉淀，难以供其他用户参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：assigned to @justsheldon    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#277](https://gitcode.com/cann/ops-blas/issues/277) [Readme-QA] ascend950 aclblasSgelsBatched 调用示例运行失败 (2026-07-06)** — 30分
  - 痛点原因：关闭说明仅16字且由系统自动关闭，缺乏根因分析与修复方案沉淀，无dup主链接供复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `justsheldon`：本地按照重现步骤，分别压测了1000次和10000次均未复现，需要确认线上运行超时是否为必现    - `justsheldon`：assigned to @justsheldon
#### PP-02 讨论停滞，确认后无技术跟进（I2 · 讨论与解决）

- **[#306](https://gitcode.com/cann/ops-blas/issues/306) [Requirement|需求建议]: 新增面向 arch22 的 `aclblasChemm` 算子，实现复数 Hermitian 矩阵乘法** — 0分
  - 痛点原因：关联 PR 尚未合并，且无 commit、文档链接、release 引用及关闭评论，缺乏实际解决的有效证据。
  - 原文依据：
    - [关联PR #207（open）](https://gitcode.com/cann/ops-blas/merge_requests/207)    - `zhaotiensn`：add label requirement    - `wangzitao_leo`：assigned to @zhaotiensn
- **[#288](https://gitcode.com/cann/ops-blas/issues/288) [Bug-Report|缺陷反馈]: 日志配置接口入参类型及签名设计问题** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #266（merged）](https://gitcode.com/cann/ops-blas/merge_requests/266)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue288    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：仅停留在需求确认与分配阶段，无关联PR、提交记录、文档链接及关闭评论等任何解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#276](https://gitcode.com/cann/ops-blas/issues/276) [Requirement|需求建议]: 新增 gemvStridedBatched 系列接口（Ascend 950）** — 0分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工确认评论、文档链接及release引用等实质性证据。
  - 原文依据：
    - [关联PR #250（merged）](https://gitcode.com/cann/ops-blas/merge_requests/250)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue276    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#304](https://gitcode.com/cann/ops-blas/issues/304) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐 cuBLASLt 日志控制能力** — 15分
  - 痛点原因：仅凭内部系统操作关闭并标记完成，缺乏关联PR、commit或release等实质性代码解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#303](https://gitcode.com/cann/ops-blas/issues/303) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐日志控制能力** — 15分
  - 痛点原因：仅靠机器人关联PR和文档关闭，缺乏commit引用、release说明及人工关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #271（merged）](https://gitcode.com/cann/ops-blas/merge_requests/271)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue303    - `cann-robot`：add label resolved
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 15分
  - 痛点原因：未关联PR、commit或release，评论仅停留在确认与分配阶段，缺乏实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 23分
  - 痛点原因：虽关联PR已合并，但无commit、文档及release引用，且关闭操作因非作者受阻，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #247（merged）](https://gitcode.com/cann/ops-blas/merge_requests/247)    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。
- **[#307](https://gitcode.com/cann/ops-blas/issues/307) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口** — 31分
  - 痛点原因：虽有合并的PR，但缺乏文档链接、release引用及人工关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #262（merged）](https://gitcode.com/cann/ops-blas/merge_requests/262)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue307    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `LuckySun`：assigned to @LuckySun
- **[#305](https://gitcode.com/cann/ops-blas/issues/305) [Requirement|需求建议]: blaze 实践编码中不应引入 adv_api/matmul/matmul.h 高阶 API 头文件** — 31分
  - 痛点原因：仅靠机器人自动关闭和PR合并，缺乏人工关闭评论、文档链接及版本发布说明等实质性解决证据。
  - 原文依据：
    - [关联PR #274（merged）](https://gitcode.com/cann/ops-blas/merge_requests/274)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue305    - `cann-robot`：add label resolved
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 31分
  - 痛点原因：仅确认问题并分配负责人，未关联修复 PR 或发布版本，缺乏实质性解决证据。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 31分
  - 痛点原因：无关联 PR 与 release 引用，评论仅停留在初步响应与分配负责人，缺乏实质修复证据。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快修改    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#291](https://gitcode.com/cann/ops-blas/issues/291) [Daily-QA|每日监测] ascend950 大面积测试失败: 37 个算子 (CANN 9.1.0, 2026-07-09)** — 31分
  - 痛点原因：无关联PR、文档链接及关闭评论，仅凭系统状态变更关闭，缺乏实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#301](https://gitcode.com/cann/ops-blas/issues/301) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 BLAS 标准** — 46分
  - 痛点原因：仅由机器人自动关闭并打标签，缺少release版本引用和人工关闭评论说明。
  - 原文依据：
    - [关联PR #268（merged）](https://gitcode.com/cann/ops-blas/merge_requests/268)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue301    - `cann-robot`：add label resolved
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 46分
  - 痛点原因：无关联PR且无关闭评论，仅确认问题并分配负责人，未提供实际修复或解决的证据。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 46分
  - 痛点原因：无关联PR和关闭评论，仅承诺修改并指派负责人，缺乏实质性修复证据。
  - 原文依据：
    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#296](https://gitcode.com/cann/ops-blas/issues/296) [Requirement|需求建议]: dot 算子 README 规范完善及参数校验补充** — 46分
  - 痛点原因：虽有关联PR合并及机器人自动关闭，但缺乏人工关闭评论说明与release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #267（merged）](https://gitcode.com/cann/ops-blas/merge_requests/267)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue296    - `cann-robot`：add label resolved
- **[#295](https://gitcode.com/cann/ops-blas/issues/295) [Daily-QA|每日监测] ascend950 算子测试失败: srotmg (2026-07-09)** — 54分
  - 痛点原因：仅以本地未复现为由关闭，未关联修复PR或提供明确的代码修复证据，解决过程缺乏实质性支撑。
  - 原文依据：
    - `LuckySun`：您好，感谢反馈，问题确认和修复中    - `LuckySun`：使用最新的社区toolkit包，本地全量执行并未复现错误。 ![image.png](https://raw.gitcode.com/user-images/assets/8916851/8ac75e52-964f-4c5c-b352-1…    - `LuckySun`：closed from codehub    - `LuckySun`：changed custom state from 已确认 to 已完成    - `wangzitao_leo`：add label bug-report    - `LuckySun`：assigned to @LuckySun
- **[#290](https://gitcode.com/cann/ops-blas/issues/290) [Bug-Report|缺陷反馈]: aclblasCgemvBatched 测试运行时 Segmentation fault** — 54分
  - 痛点原因：虽有合并的PR和commit，但无文档链接与release引用，且仅由机器人自动关闭，缺乏人工修复验证结论。
  - 原文依据：
    - [关联PR #270（merged）](https://gitcode.com/cann/ops-blas/merge_requests/270)    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：Create issue mr links: **fix(cgemv_batched): 修复test中stream/handle销毁顺序导致的段错误 (closes #290)** #270    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue290    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#289](https://gitcode.com/cann/ops-blas/issues/289) [Documentation|文档反馈]: QUICKSTART.md中scopy算子源文件路径错误** — 54分
  - 痛点原因：开发者明确表示原问题无需修改，且缺少commit引用，仅靠机器人关联PR关闭，未提供实质代码变更证据。
  - 原文依据：
    - [关联PR #265（merged）](https://gitcode.com/cann/ops-blas/merge_requests/265)    - `zhanghua145`：## 更正说明 经过对 CMake 构建系统的进一步核实，原 issue 中**第72行的编译产物路径实际是正确的，无需修改**。 **原因：** - CMake 通过 `add_subdirectory(copy/scopy)` 进入 …    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue289    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 54分
  - 痛点原因：未关联修复PR或release版本，仅以已闭环和closed from codehub关闭，缺乏实质性的代码修复证据。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `yuyuanfeng`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
#### PP-03 Bot误关闭与状态不一致（G · Bot/Agent 治理）

- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 15分
  - 痛点原因：Bot仅拦截非作者关闭操作，未打标且未自动关闭，治理动作单一导致得分极低。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：unassigned @wangzitao_leo
- **[#307](https://gitcode.com/cann/ops-blas/issues/307) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，缺乏有效的自动化治理反馈与引导。
  - 原文依据：
    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `LuckySun`：assigned to @LuckySun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue307    - [关联PR #262（merged）](https://gitcode.com/cann/ops-blas/merge_requests/262)
- **[#305](https://gitcode.com/cann/ops-blas/issues/305) [Requirement|需求建议]: blaze 实践编码中不应引入 adv_api/matmul/matmul.h 高阶 API 头文件** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，未留下任何评论说明原因，缺乏透明度与用户互动。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue305    - [关联PR #274（merged）](https://gitcode.com/cann/ops-blas/merge_requests/274)
- **[#303](https://gitcode.com/cann/ops-blas/issues/303) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐日志控制能力** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未发布任何可见评论说明关闭原因，缺乏治理透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue303    - [关联PR #271（merged）](https://gitcode.com/cann/ops-blas/merge_requests/271)
- **[#301](https://gitcode.com/cann/ops-blas/issues/301) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 BLAS 标准** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，未对关闭原因及关联PR合并情况向用户作有效说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue301    - [关联PR #268（merged）](https://gitcode.com/cann/ops-blas/merge_requests/268)
- **[#296](https://gitcode.com/cann/ops-blas/issues/296) [Requirement|需求建议]: dot 算子 README 规范完善及参数校验补充** — 20分
  - 痛点原因：Bot虽自动打标并随PR合并关闭，但全程零评论，缺乏状态同步与反馈，治理过程过于静默。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue296    - [关联PR #267（merged）](https://gitcode.com/cann/ops-blas/merge_requests/267)
- **[#290](https://gitcode.com/cann/ops-blas/issues/290) [Bug-Report|缺陷反馈]: aclblasCgemvBatched 测试运行时 Segmentation fault** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，评论数为零，缺乏有效沟通与引导，导致治理流于形式。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `zhanghua145`：Create issue mr links: **fix(cgemv_batched): 修复test中stream/handle销毁顺序导致的段错误 (closes #290)** #270    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue290    - [关联PR #270（merged）](https://gitcode.com/cann/ops-blas/merge_requests/270)
- **[#289](https://gitcode.com/cann/ops-blas/issues/289) [Documentation|文档反馈]: QUICKSTART.md中scopy算子源文件路径错误** — 20分
  - 痛点原因：Bot仅机械打标关闭且无评论互动，在用户反馈有误时未有效沟通即自动关闭。
  - 原文依据：
    - `zhanghua145`：## 更正说明 经过对 CMake 构建系统的进一步核实，原 issue 中**第72行的编译产物路径实际是正确的，无需修改**。 **原因：** - CMake 通过 `add_subdirectory(copy/scopy)` 进入 …    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue289    - [关联PR #265（merged）](https://gitcode.com/cann/ops-blas/merge_requests/265)
- **[#288](https://gitcode.com/cann/ops-blas/issues/288) [Bug-Report|缺陷反馈]: 日志配置接口入参类型及签名设计问题** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，但评论数为零，未留下任何说明性反馈，导致治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue288    - [关联PR #266（merged）](https://gitcode.com/cann/ops-blas/merge_requests/266)
- **[#285](https://gitcode.com/cann/ops-blas/issues/285) [Bug-Report|缺陷反馈]: ops-blas 在部分CANN-9.1.0版本下编译失败** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭，未参与问题确认和根因分析等实质性互动，缺乏有效评论。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：## 根因分析 `OP` 与 `OP_MODULE_ID` 是同一模块号（63）的新旧两套名字。CANN 包更新后，`log/log.h` 删除了 `#include "dlog_pub.h"` 并改用自带的 `constexpr OP_…    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue285
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 20分
  - 痛点原因：Bot虽添加resolved标签但未自动关闭该已闭环的issue，且无Bot评论，缺乏有效的自动化闭环动作。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `yuyuanfeng`：closed from codehub
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot在人工确认问题修复中时错误打上resolved标签并关闭，且无评论交互，治理动作与实际状态脱节。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot错误打标resolved并关闭issue，与人工回复中问题仍在确认修复的实际状态脱节，且无任何有效评论。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标并关闭issue，评论数为零，缺乏有效沟通导致治理流于形式。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，缺乏自动回复与用户引导，治理交互严重缺失。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot在问题仍处修复中时无评论直接打标resolved并关闭，存在误关且缺乏有效沟通。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#276](https://gitcode.com/cann/ops-blas/issues/276) [Requirement|需求建议]: 新增 gemvStridedBatched 系列接口（Ascend 950）** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论互动，缺乏进度同步与状态通知，导致治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue276    - [关联PR #250（merged）](https://gitcode.com/cann/ops-blas/merge_requests/250)
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 35分
  - 痛点原因：Bot对非作者用户的关闭指令仅重复报错，未提供有效引导，导致无效交互循环。
  - 原文依据：
    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `cann-robot`：add label resolved
#### PP-04 实质性技术响应缺失（I1 · 分配与首次响应）

- **[#307](https://gitcode.com/cann/ops-blas/issues/307) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口** — 0分
  - 痛点原因：人工仅进行了打标签和分配，最终由机器人自动关闭，全程无针对需求的实质性回复。
  - 原文依据：
    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `LuckySun`：assigned to @LuckySun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue307    - [关联PR #262（merged）](https://gitcode.com/cann/ops-blas/merge_requests/262)
- **[#306](https://gitcode.com/cann/ops-blas/issues/306) [Requirement|需求建议]: 新增面向 arch22 的 `aclblasChemm` 算子，实现复数 Hermitian 矩阵乘法** — 0分
  - 痛点原因：仅打标签和指派人员，未对需求内容进行实质性技术讨论或确认。
  - 原文依据：
    - `zhaotiensn`：add label requirement    - `wangzitao_leo`：assigned to @zhaotiensn    - [关联PR #207（open）](https://gitcode.com/cann/ops-blas/merge_requests/207)
- **[#305](https://gitcode.com/cann/ops-blas/issues/305) [Requirement|需求建议]: blaze 实践编码中不应引入 adv_api/matmul/matmul.h 高阶 API 头文件** — 0分
  - 痛点原因：仅机器人自动响应并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue305    - [关联PR #274（merged）](https://gitcode.com/cann/ops-blas/merge_requests/274)
- **[#304](https://gitcode.com/cann/ops-blas/issues/304) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐 cuBLASLt 日志控制能力** — 0分
  - 痛点原因：全程无任何首次响应与实质回应，仅通过状态变更和关闭操作处理。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#303](https://gitcode.com/cann/ops-blas/issues/303) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐日志控制能力** — 0分
  - 痛点原因：仅有机器人自动打标签并随PR合并关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue303    - [关联PR #271（merged）](https://gitcode.com/cann/ops-blas/merge_requests/271)
- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 0分
  - 痛点原因：仅进行了初步确认和分配负责人，始终未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：unassigned @wangzitao_leo
- **[#301](https://gitcode.com/cann/ops-blas/issues/301) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 BLAS 标准** — 0分
  - 痛点原因：机器人自动打标签并随关联PR合并关闭，全程无人工或实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue301    - [关联PR #268（merged）](https://gitcode.com/cann/ops-blas/merge_requests/268)
- **[#300](https://gitcode.com/cann/ops-blas/issues/300) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 cuBLAS 标准** — 0分
  - 痛点原因：首次响应仅为客套确认，随后直接关闭，全程缺乏针对接口参数的实质性技术解答。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成
- **[#299](https://gitcode.com/cann/ops-blas/issues/299) [Readme-QA] ascend950 aclblasIsamax 调用示例运行失败 (2026-07-09)** — 0分
  - 痛点原因：仅有客套回复、打标签和指派，始终未提供任何实质性的技术解答或问题处理反馈。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `xutianze`：assigned to @xutianze
- **[#297](https://gitcode.com/cann/ops-blas/issues/297) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-07-09)** — 0分
  - 痛点原因：首次响应仅停留在感谢反馈和打标签分配，未提供任何实质性解答或解决方案。
  - 原文依据：
    - `yang-di52`：感谢您的反馈，我将尽快修改该问题    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#296](https://gitcode.com/cann/ops-blas/issues/296) [Requirement|需求建议]: dot 算子 README 规范完善及参数校验补充** — 0分
  - 痛点原因：仅由机器人自动打标签并在关联PR合并后自动关闭，全程无人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue296    - [关联PR #267（merged）](https://gitcode.com/cann/ops-blas/merge_requests/267)
- **[#294](https://gitcode.com/cann/ops-blas/issues/294) [Daily-QA|每日监测] ascend950 算子测试失败: gemv_batched (2026-07-09)** — 0分
  - 痛点原因：仅有问候、加标签和分配负责人等流程性操作，始终未提供实质性技术回应。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `justsheldon`：assigned to @justsheldon
- **[#293](https://gitcode.com/cann/ops-blas/issues/293) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-07-09)** — 0分
  - 痛点原因：维护者仅进行了客套回复、打标签和指派，未提供任何技术分析或解决方案，无实质回应。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快修改    - `wangzitao_leo`：add label bug-report    - `yang-di52`：assigned to @yang-di52
- **[#292](https://gitcode.com/cann/ops-blas/issues/292) arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准** — 0分
  - 痛点原因：首次响应虽快，但仅停留在感谢反馈和指派人员，未提供任何技术分析或解决方案等实质性内容。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @xutianze
- **[#291](https://gitcode.com/cann/ops-blas/issues/291) [Daily-QA|每日监测] ascend950 大面积测试失败: 37 个算子 (CANN 9.1.0, 2026-07-09)** — 0分
  - 痛点原因：维护者仅执行打标签、分配及关闭等机械操作，全程未提供任何实质性技术回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#290](https://gitcode.com/cann/ops-blas/issues/290) [Bug-Report|缺陷反馈]: aclblasCgemvBatched 测试运行时 Segmentation fault** — 0分
  - 痛点原因：首次响应后未对问题原因或解决方案进行实质性技术沟通，直接分配并提交修复链接关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `zhanghua145`：Create issue mr links: **fix(cgemv_batched): 修复test中stream/handle销毁顺序导致的段错误 (closes #290)** #270    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue290    - [关联PR #270（merged）](https://gitcode.com/cann/ops-blas/merge_requests/270)
- **[#288](https://gitcode.com/cann/ops-blas/issues/288) [Bug-Report|缺陷反馈]: 日志配置接口入参类型及签名设计问题** — 0分
  - 痛点原因：全程仅机器人打标签和分配负责人，无任何人工实质技术回应，最终靠关联PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue288    - [关联PR #266（merged）](https://gitcode.com/cann/ops-blas/merge_requests/266)
- **[#287](https://gitcode.com/cann/ops-blas/issues/287) [Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子** — 0分
  - 痛点原因：首次回复仅停留在需求确认和分配负责人，始终未给出任何实质性的技术解答或处理结果。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 0分
  - 痛点原因：仅有人尝试用命令关闭但无权限，全程无任何针对该需求的技术评估或实质回应。
  - 原文依据：
    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `cann-robot`：add label resolved
- **[#283](https://gitcode.com/cann/ops-blas/issues/283) [Readme-QA] ascend950 aclblasSnrm2Ex 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：仅回复套话并打标签指派，未提供任何实质性技术解答即关闭，导致无实质回应。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `wangzitao_leo`：add label bug-report    - `yuyuanfeng`：assigned to @yuyuanfeng    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：仅有初步确认和打标签指派，全程无实质性技术回应或问题解决说明。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：仅有快速确认、加标签和指派人员，始终未提供任何实质性的技术解答或问题定位分析。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：首次响应仅为客套话，后续仅加标签和分配任务，全程无任何实质性技术回应。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 0分
  - 痛点原因：仅快速确认问题并打标签分配人员，始终未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#276](https://gitcode.com/cann/ops-blas/issues/276) [Requirement|需求建议]: 新增 gemvStridedBatched 系列接口（Ascend 950）** — 0分
  - 痛点原因：首次响应耗时超71小时且全程无人工实质回应，仅靠机器人打标签及关联PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue276    - [关联PR #250（merged）](https://gitcode.com/cann/ops-blas/merge_requests/250)
#### PP-05 Bot缺位导致自动化治理空白（G · Bot/Agent 治理）

- **[#302](https://gitcode.com/cann/ops-blas/issues/302) [Bug] sdgmm_kernel.cpp 在 arch35 平台编译失败：MakeCoord/MakeShape 命名空间歧义导致整个 ops_blas …** — 15分
  - 痛点原因：Bot仅拦截非作者关闭操作，未打标且未自动关闭，治理动作单一导致得分极低。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：unassigned @wangzitao_leo
- **[#307](https://gitcode.com/cann/ops-blas/issues/307) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，缺乏有效的自动化治理反馈与引导。
  - 原文依据：
    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `LuckySun`：assigned to @LuckySun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue307    - [关联PR #262（merged）](https://gitcode.com/cann/ops-blas/merge_requests/262)
- **[#305](https://gitcode.com/cann/ops-blas/issues/305) [Requirement|需求建议]: blaze 实践编码中不应引入 adv_api/matmul/matmul.h 高阶 API 头文件** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，未留下任何评论说明原因，缺乏透明度与用户互动。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue305    - [关联PR #274（merged）](https://gitcode.com/cann/ops-blas/merge_requests/274)
- **[#303](https://gitcode.com/cann/ops-blas/issues/303) [Requirement|需求建议]: 新增 aclblasLt Logger 接口，对齐日志控制能力** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未发布任何可见评论说明关闭原因，缺乏治理透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue303    - [关联PR #271（merged）](https://gitcode.com/cann/ops-blas/merge_requests/271)
- **[#301](https://gitcode.com/cann/ops-blas/issues/301) [Requirement|需求建议]: aclblasSdgmm 接口参数顺序与命名对齐 BLAS 标准** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，未对关闭原因及关联PR合并情况向用户作有效说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue301    - [关联PR #268（merged）](https://gitcode.com/cann/ops-blas/merge_requests/268)
- **[#296](https://gitcode.com/cann/ops-blas/issues/296) [Requirement|需求建议]: dot 算子 README 规范完善及参数校验补充** — 20分
  - 痛点原因：Bot虽自动打标并随PR合并关闭，但全程零评论，缺乏状态同步与反馈，治理过程过于静默。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue296    - [关联PR #267（merged）](https://gitcode.com/cann/ops-blas/merge_requests/267)
- **[#290](https://gitcode.com/cann/ops-blas/issues/290) [Bug-Report|缺陷反馈]: aclblasCgemvBatched 测试运行时 Segmentation fault** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，评论数为零，缺乏有效沟通与引导，导致治理流于形式。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `zhanghua145`：Create issue mr links: **fix(cgemv_batched): 修复test中stream/handle销毁顺序导致的段错误 (closes #290)** #270    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue290    - [关联PR #270（merged）](https://gitcode.com/cann/ops-blas/merge_requests/270)
- **[#289](https://gitcode.com/cann/ops-blas/issues/289) [Documentation|文档反馈]: QUICKSTART.md中scopy算子源文件路径错误** — 20分
  - 痛点原因：Bot仅机械打标关闭且无评论互动，在用户反馈有误时未有效沟通即自动关闭。
  - 原文依据：
    - `zhanghua145`：## 更正说明 经过对 CMake 构建系统的进一步核实，原 issue 中**第72行的编译产物路径实际是正确的，无需修改**。 **原因：** - CMake 通过 `add_subdirectory(copy/scopy)` 进入 …    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue289    - [关联PR #265（merged）](https://gitcode.com/cann/ops-blas/merge_requests/265)
- **[#288](https://gitcode.com/cann/ops-blas/issues/288) [Bug-Report|缺陷反馈]: 日志配置接口入参类型及签名设计问题** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，但评论数为零，未留下任何说明性反馈，导致治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue288    - [关联PR #266（merged）](https://gitcode.com/cann/ops-blas/merge_requests/266)
- **[#285](https://gitcode.com/cann/ops-blas/issues/285) [Bug-Report|缺陷反馈]: ops-blas 在部分CANN-9.1.0版本下编译失败** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭，未参与问题确认和根因分析等实质性互动，缺乏有效评论。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：## 根因分析 `OP` 与 `OP_MODULE_ID` 是同一模块号（63）的新旧两套名字。CANN 包更新后，`log/log.h` 删除了 `#include "dlog_pub.h"` 并改用自带的 `constexpr OP_…    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue285
- **[#284](https://gitcode.com/cann/ops-blas/issues/284) [Daily-QA|每日监测] ascend950 算子测试失败: snrm2_ex (2026-07-06)** — 20分
  - 痛点原因：Bot虽添加resolved标签但未自动关闭该已闭环的issue，且无Bot评论，缺乏有效的自动化闭环动作。
  - 原文依据：
    - `yuyuanfeng`：感谢反馈，问题正在确认和处理中。    - `yuyuanfeng`：问题同：https://gitcode.com/cann/ops-blas/issues/285， 已闭环    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `yuyuanfeng`：closed from codehub
- **[#282](https://gitcode.com/cann/ops-blas/issues/282) [Readme-QA] ascend950 aclblasTSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot在人工确认问题修复中时错误打上resolved标签并关闭，且无评论交互，治理动作与实际状态脱节。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#281](https://gitcode.com/cann/ops-blas/issues/281) [Readme-QA] ascend950 aclblasTSTgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot错误打标resolved并关闭issue，与人工回复中问题仍在确认修复的实际状态脱节，且无任何有效评论。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#280](https://gitcode.com/cann/ops-blas/issues/280) [Readme-QA] ascend950 aclblasHSSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械打标并关闭issue，评论数为零，缺乏有效沟通导致治理流于形式。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#279](https://gitcode.com/cann/ops-blas/issues/279) [Readme-QA] ascend950 aclblasHSHgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，缺乏自动回复与用户引导，治理交互严重缺失。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#278](https://gitcode.com/cann/ops-blas/issues/278) [Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)** — 20分
  - 痛点原因：Bot在问题仍处修复中时无评论直接打标resolved并关闭，存在误关且缺乏有效沟通。
  - 原文依据：
    - `justsheldon`：您好，感谢反馈，问题确认和修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue278,issue279,issue280,issue281,issue282    - [关联PR #256（merged）](https://gitcode.com/cann/ops-blas/merge_requests/256)
- **[#276](https://gitcode.com/cann/ops-blas/issues/276) [Requirement|需求建议]: 新增 gemvStridedBatched 系列接口（Ascend 950）** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论互动，缺乏进度同步与状态通知，导致治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue276    - [关联PR #250（merged）](https://gitcode.com/cann/ops-blas/merge_requests/250)
- **[#286](https://gitcode.com/cann/ops-blas/issues/286) [Requirement|需求建议]: 新增 aclblasSdgmm 算子（对角矩阵乘法，FP32）** — 35分
  - 痛点原因：Bot对非作者用户的关闭指令仅重复报错，未提供有效引导，导致无效交互循环。
  - 原文依据：
    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `eternityk`：/close    - `cann-robot`：### Notice [@eternityk](https://gitcode.com/eternityk) , you can't close an issue unless you are the author of it or a …    - `wangzitao_leo`：您好，感谢反馈，需求确认中。    - `cann-robot`：add label resolved

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护团队；候选负责人 `justsheldon` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 校验是否包含解决证据、测试结果和后续反馈路径，不满足则阻止关闭 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 14.5，低分 31/32；OBJ_DECISION_TRANSPARENCY：均值 52.8，低分 16/32 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 14.5，低分 31/32 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 52.8，低分 16/32 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明重新开启条件或后续反馈路径，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | Assignee；候选负责人 `justsheldon` |
| 触发条件 | Issue确认后7天无新评论 |
| 具体动作 | 发布进展更新或排查方向说明 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 43.3，低分 21/32；OBJ_RESULT_FORMATION_TIMELINESS：均值 75.6，低分 7/32 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 75.6，低分 7/32 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 43.3，低分 21/32 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无任何评论讨论，但设计已在正文中完整给出且PR已合并，进展靠实现而非讨论推动。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `justsheldon` |
| 触发条件 | Bot执行关闭动作前 |
| 具体动作 | 校验close_reason与Issue标签/状态一致性，不一致时阻止关闭并告警 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 37.8，低分 18/32；OBJ_BOT_MISCLOSE_REVERSE：均值 91.9，低分 0/32 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 37.8，低分 18/32 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 91.9，低分 0/32 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | bot关闭时人工工作已完成，无需后续接续，流程未卡住，交接无障碍。 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **92.4/100**，整体相对可控，但仍需关注：无显著痛点，Issue创建质量高，模板填写完整，结构化程度好。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.8 | 内部团队提出，技术细节具体且自洽，无幻觉或AI噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 91.0 | 需求模板完整，含背景、来源、价值、设计方案及接口签名与双路径表格，结构化程度高。 |


### I1 · 分配与首次响应

本阶段分数为 **65.5/100**，整体相对可控，但仍需关注：实质性技术响应缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 21.9 | 均值 21.9，低分 25/32 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 88.8 | 均值 88.8，低分 3/32 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 85.2 | 创建后立即自分配给LuckySun，责任归属明确无歧义。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 76.4 | 自建即自分配并标注requirement标签，后续PR合并关闭，分流路径正确。 |

代表低分 Issue：[#307](https://gitcode.com/cann/ops-blas/issues/307)
问题：[Requirement|需求建议]: Feat: 新增面向arch35的aclblasDotEx接口。

### I2 · 讨论与解决

本阶段分数为 **60.2/100**，整体相对可控，但仍需关注：讨论停滞，确认后无技术跟进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 75.6 | 均值 75.6，低分 7/32 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 43.3 | 均值 43.3，低分 21/32 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 55.7 | 无任何评论讨论，但设计已在正文中完整给出且PR已合并，进展靠实现而非讨论推动。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 67.0 | 关联PR#262已合并，需求功能已实现并关闭，用户目标得到有效满足。 |

代表低分 Issue：[#287](https://gitcode.com/cann/ops-blas/issues/287)
问题：[Requirement|需求建议]: 新增 TrsmBatched（StrsmBatched / CtrsmBatched）批量三角求解算子。

### I3 · 总结与关闭

本阶段分数为 **45.2/100**，本阶段需要改进，主要问题是：关闭阶段质量全面不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 14.5 | 均值 14.5，低分 31/32 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 52.8 | 均值 52.8，低分 16/32 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 44.5 | 关闭后未说明重新开启条件或后续反馈路径，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 80.5 | Issue仍处于open状态，不存在过早关闭风险。 |

代表低分 Issue：[#292](https://gitcode.com/cann/ops-blas/issues/292)
问题：arch35 测试中部分算子 mare_multiplier 取值不符合社区精度标准。

### G · Bot/Agent 治理

本阶段分数为 **65.4/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 37.8 | 均值 37.8，低分 18/32 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 91.9 | 均值 91.9，低分 0/32 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 70.6 | bot关闭时人工工作已完成，无需后续接续，流程未卡住，交接无障碍。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 63.1 | 无bot介入，信息不足，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 66.2 | bot关闭时机与MR合并同步，标签添加准确，动作合规无误判。 |

代表低分 Issue：[#278](https://gitcode.com/cann/ops-blas/issues/278)
问题：[Readme-QA] ascend950 aclblasSgemvBatched 调用示例编译失败 (2026-07-06)。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 32 | 51.1 | 首期基线 | 92.4 | 65.5 | 60.2 | 45.2 | 65.4 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-07-06_to_2026-07-12.json`。
