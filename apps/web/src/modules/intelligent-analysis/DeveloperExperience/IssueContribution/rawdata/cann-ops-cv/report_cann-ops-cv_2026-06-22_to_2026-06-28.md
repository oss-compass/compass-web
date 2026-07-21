# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **31** 个 Issue
+ **Open 1 / Closed 30**，关闭率 **96.8%**。
+ 总体体验分为 **52.0/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 49.0 | 关闭阶段缺乏解决证据与沉淀 |
| P1 | I2 · 讨论与解决 | 65.8 | 技术讨论缺失直接关闭Issue |
| P1 | I1 · 分配与首次响应 | 67.7 | 首响时间双峰分布部分Issue等待过长 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 校验关联PR是否已合并，未合并时需在关闭评论中提供明确关闭理由 |
| REC-02 | P1 | 设置自动提醒机制通知维护者处理未响应Issue |
| REC-03 | P1 | 确保Issue中有根因分析摘要和修复验证结论 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 31 |
| Open / Closed | 1 / 30 |
| 关闭率 | 96.8% |
| 类型构成 | 缺陷 11 / 需求 9 / 咨询 1 / 其他 10 |
| 总体体验分 | 52.0/100（D） |
| 首次响应时间 | 中位 0.2h；均值 1.6天 |
| 关闭周期 | 中位 1.8天；均值 5.6天 |
| 7天响应率 | 90.3% |
| 评论数/Issue | 1.39 |
| 标签覆盖率 | 90.3% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 94.1/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 81.6 | 2/31（6.5%） | 相对可控 | `SUB_INPUT_QUALITY` 72.3 |
| I1 · 分配与首次响应 | 67.7 | 6/31（19.4%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 27.1 |
| I2 · 讨论与解决 | 65.8 | 8/31（25.8%） | P1 | `OBJ_SOLUTION_EVIDENCE` 31.8 |
| I3 · 总结与关闭 | 49.0 | 22/31（71.0%） | P0 | `OBJ_CLOSURE_REUSE` 16.9 |
| G · Bot/Agent 治理（参考） | 64.4 | 4/31（12.9%） | 参考项 | `OBJ_BOT_GOVERNANCE` 23.9 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏解决证据与沉淀 | OBJ_CLOSURE_REUSE：均值 16.9，低分 31/31；OBJ_DECISION_TRANSPARENCY：均值 63.1，低分 9/31 | 社区用户无法确认问题是否真正解决，后续类似问题缺乏参考依据 |
| PP-02 | P1 | I1 · 分配与首次响应 | 首响时间双峰分布部分Issue等待过长 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 27.1，低分 23/31；OBJ_RESPONSE_SPEED：均值 88.4，低分 3/31 | 部分贡献者长时间等待反馈，影响社区参与积极性和问题推进效率 |
| PP-03 | P1 | I2 · 讨论与解决 | 技术讨论缺失直接关闭Issue | OBJ_SOLUTION_EVIDENCE：均值 31.8，低分 26/31；OBJ_RESULT_FORMATION_TIMELINESS：均值 91.0，低分 3/31 | 问题根因未充分分析，解决方案缺乏社区共识，后续类似问题无法参考 |
| PP-04 | P2 | G · Bot/Agent 治理 | 部分Issue Bot缺位无标签无响应 | OBJ_BOT_GOVERNANCE：均值 23.9，低分 28/31；OBJ_BOT_MISCLOSE_REVERSE：均值 93.5，低分 0/31 | 缺位Issue缺乏自动分流和分类，依赖人工发现和处理，增加响应延迟风险 |
| PP-05 | P2 | I3 · 总结与关闭 | 关闭时未提供后续反馈路径 | OBJ_CLOSURE_REUSE：均值 16.9，低分 31/31；OBJ_DECISION_TRANSPARENCY：均值 63.1，低分 9/31 | 用户对问题解决后的后续路径不清晰，可能重复提交类似Issue或无法跟踪进展 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏解决证据与沉淀（I3 · 总结与关闭）

- **[#575](https://gitcode.com/cann/ops-cv/issues/575) [Bug-Report|缺陷反馈]: UpsampleLinear1dBackward存在clean code检测问题** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档沉淀且关闭说明为空，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue575    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1057（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1057)
- **[#574](https://gitcode.com/cann/ops-cv/issues/574) [Bug-Report|缺陷反馈]: UpsampleBicubic2dGrad、UpsampleBilinear2dAA正反向缺少上边界限制** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人因关联MR合并自动关闭，未留下任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue574    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1056（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1056)
- **[#573](https://gitcode.com/cann/ops-cv/issues/573) [Bug-Report|缺陷反馈]: resize_upsample_trilinear clean code检测问题** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅由机器人随MR合并自动关闭，缺乏经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue573    - `cann-robot`：add label resolved    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - [关联PR #1059（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1059)    - [关联PR #1060（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1060)
- **[#572](https://gitcode.com/cann/ops-cv/issues/572) [Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与重复链接，未留存任何可复用的解决经验。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `surezz`：/assign    - `liu-wei`：您好，这个issue目前是什么进展，我看对应的PR已经是草稿状态了，issue是否可以关闭了？    - `cann-robot`：assigned to @surezz
- **[#566](https://gitcode.com/cann/ops-cv/issues/566) 修复precommit的oat检查抢资源问题** — 0分
  - 痛点原因：被机器人随关联PR合并自动关闭，无任何关闭说明、方案文档及dup链接，未沉淀可复用的问题解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue566    - `cann-robot`：add label resolved    - `renruhai`：assigned to @zhangfands    - [关联PR #1052（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1052)
- **[#565](https://gitcode.com/cann/ops-cv/issues/565) [Bug-Report|缺陷反馈]: UpsampleBilinear2dAABackward存在clean code检测问题** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无关闭说明与方案文档，未留下任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue565    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1050（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1050)
- **[#564](https://gitcode.com/cann/ops-cv/issues/564) [Requirement|需求建议]: 【upsample_bilinear2d_grad】 补全 ascend950 arch35 tiling/kerne…** — 0分
  - 痛点原因：仅随MR合并自动关闭，关闭说明仅7字且无方案文档与关联链接，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue564    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1035（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1035)
- **[#563](https://gitcode.com/cann/ops-cv/issues/563) [Requirement|需求建议]: feat: 支持 rgb2yuv422 和 yuv4442yuv422 算子** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联链接，未留下任何可复用的实现细节或解决指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue563    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1036（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1036)
- **[#561](https://gitcode.com/cann/ops-cv/issues/561) [Requirement|需求建议]: 【社区任务】upsample_nearest算子开发交付（任务编号 05-29）** — 0分
  - 痛点原因：关闭说明为0字且未关联主链接，仅提及未合入的PR，未沉淀任何可复用的信息。
  - 原文依据：
    - `kxingaa`：/assign    - `liu-wei`：你好，这个issue是什么进展了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `kxingaa`：>你好，这个issue是什么进展了？ [@liu-wei](https://gitcode.com/liu-wei) https://gitcode.com/cann/ops-cv/pull/1070 pr还没有合入。 https://g…    - `cann-robot`：assigned to @kxingaa    - [关联PR #1048（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1048)
- **[#559](https://gitcode.com/cann/ops-cv/issues/559) [Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。** — 0分
  - 痛点原因：关闭说明0字且无方案文档化，仅靠机器人因关联MR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue559    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @zhangfands    - [关联PR #1042（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1042)
- **[#557](https://gitcode.com/cann/ops-cv/issues/557) [Requirement|需求建议]: 增加 ExtractGlimpseV2,UpsampleBicubic2d 支持 Ascend950 实现 SIMT** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，关闭说明仅7字且无方案文档化，未留存任何供他人复用的方案细节或链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue557    - `cann-robot`：add label resolved    - `wang-shilong32`：/assign    - `cann-robot`：assigned to @wang-shilong32    - [关联PR #1039（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1039)
- **[#556](https://gitcode.com/cann/ops-cv/issues/556) [Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定** — 0分
  - 痛点原因：关闭说明为空，仅由机器人关联MR合并自动关闭，无方案文档沉淀与复用链接，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue556    - `liu-wei`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @wanshilin    - `liu-wei`：assigned to @liu-wei    - [关联PR #1037（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1037)
- **[#553](https://gitcode.com/cann/ops-cv/issues/553) [Requirement|需求建议] 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 0分
  - 痛点原因：关闭说明仅22字且无方案文档化，仅以代码合入为由关闭，未提供供其他用户复用解决方案的有效指引。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `liu-wei`：相关修改代码已合入，issue问题解决关闭。    - `liu-wei`：assigned to @liu-wei    - [关联PR #1025（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1025)
- **[#552](https://gitcode.com/cann/ops-cv/issues/552) [CodeStyle|代码规范] 全量算子代码添加 clang-format 格式化约束** — 0分
  - 痛点原因：机器人随关联PR合并自动关闭，关闭说明为0字，未沉淀任何方案文档或复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue552    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - [关联PR #1008（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1008)
- **[#551](https://gitcode.com/cann/ops-cv/issues/551) [Bug-Report|缺陷反馈]: GridSampler3DGrad算子950实现bf16数据类型精度问题修复** — 0分
  - 痛点原因：仅因关联MR合并自动关闭，关闭说明仅7字且无方案文档，未沉淀任何修复细节供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue551    - `cann-robot`：add label resolved    - `qy3311888`：/assign    - `cann-robot`：assigned to @qy3311888    - [关联PR #1033（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1033)    - [关联PR #1034（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1034)
- **[#549](https://gitcode.com/cann/ops-cv/issues/549) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复** — 0分
  - 痛点原因：无方案文档与主链接，关闭说明仅7字，仅由机器人随MR合并自动关闭，未留存可供复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue549    - `cann-robot`：add label resolved    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - [关联PR #1022（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1022)    - [关联PR #1024（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1024)
- **[#546](https://gitcode.com/cann/ops-cv/issues/546) [Requirement|需求建议]: 新增DIoUGrad，GIoUGrad，UpsampleNearest2dGrad算子950Simt实现** — 0分
  - 痛点原因：缺乏方案文档与关联主链接，关闭说明仅7字且由机器人自动关闭，无任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue546    - `cann-robot`：add label resolved    - `u010470851`：/assign    - `cann-robot`：assigned to @u010470851    - [关联PR #983（merged）](https://gitcode.com/cann/ops-cv/merge_requests/983)
- **[#562](https://gitcode.com/cann/ops-cv/issues/562) [Bug-Report|缺陷反馈]: resize 系列 op_host UT CMakeLists 缺少芯片版本隔离** — 25分
  - 痛点原因：仅因关联MR合并而机械关闭，无方案文档沉淀，缺乏根因分析与修复细节，无法为同类问题提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue562    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1045（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1045)
- **[#558](https://gitcode.com/cann/ops-cv/issues/558) [Bug-Report|缺陷反馈]: upsample tiling 属性空指针校验缺失** — 25分
  - 痛点原因：缺乏方案文档沉淀与复现链接，关闭说明简略，仅机械变更状态，未留存可复用的解决经验。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `wangdong2333`：add label bug-report    - `cann-robot`：add label Accepted    - `wangdong2333`：/assign [@wangdong2333](https://gitcode.com/wangdong2333)    - `liu-wei`：这个issue现在是什么进展，我看对应的PR已经关闭了？
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 25分
  - 痛点原因：仅由机器人自动关闭并关联其他issue，无方案文档沉淀且关闭说明过简，未留下可供后续参考的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#550](https://gitcode.com/cann/ops-cv/issues/550) [Requirement|需求建议]: 新增 image_projective_transform 算子，支持 Ascend950 平台** — 25分
  - 痛点原因：关闭说明仅随MR合并机械关闭，未沉淀方案文档或关联重复issue，缺乏后续参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue550    - `yourealize`：add label requirement    - `cann-robot`：add label resolved    - `yourealize`：/assign [@yourealize](https://gitcode.com/yourealize)    - `cann-robot`：assigned to @yourealize    - [关联PR #1016（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1016)
- **[#547](https://gitcode.com/cann/ops-cv/issues/547) [Bug-Report|缺陷反馈]: resize 系列算子 ascend950 op_host tiling UT 未编译执行** — 25分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，无具体解决方案文档化记录，无法为他人提供复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue547    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1018（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1018)
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 30分
  - 痛点原因：关闭说明仅29字且无dup主链接，仅由系统自动关闭，未提供可追溯的复用信息。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#560](https://gitcode.com/cann/ops-cv/issues/560) docs: image_projective_transform 算子文档问题修复** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关闭并关联PR，缺乏人工对问题及解决方案的总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue560    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @yourealize    - [关联PR #1044（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1044)
- **[#554](https://gitcode.com/cann/ops-cv/issues/554) [Documentation|文档更新] 更新社区贡献指南文档 CONTRIBUTING.md** — 30分
  - 痛点原因：关闭说明仅20字且缺少关联的主链接，仅靠状态变更和标签关闭，未沉淀可复用的方案细节。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：相关修改已合入，issue问题解决关闭。    - `liu-wei`：assigned to @liu-wei
- **[#571](https://gitcode.com/cann/ops-cv/issues/571) 数值精度 / shape 边界** — 45分
  - 痛点原因：仅解释了硬件精度限制，未提供解决方案或规避措施，无文档沉淀，直接因无回复草率关闭，他人无法参考。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：1. 目前aicore精度最多支持到float运算，无法支持double类型。因此GridSample算子内部会出现您说的“grid值 × 图片边长 > 2^24(16777216) 时采样点精度下降(fp32 尾数限制)”问题。如果希望…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：assigned to @renruhai
- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 45分
  - 痛点原因：关闭时未沉淀方案文档且无复用链接，仅简单改状态并关闭，导致问题解决方案难以被后续用户复用。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#576](https://gitcode.com/cann/ops-cv/issues/576) [Bug-Report|缺陷反馈]: ImageProjectiveTransform算子binary.json格式配置错误且缺少op_graph实现** — 55分
  - 痛点原因：机器人自动关闭且说明仅61字，虽提交修复PR，但缺乏对缺陷根因与修复细节的总结，难以供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue576    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `yourealize`：修复 PR 已提交：https://gitcode.com/cann/ops-cv/merge_requests/1062    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅73字且无重复问题主链接，有效解决方案仅停留在评论中，未提炼结构化总结供后续复用。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅停留在技术解释层面，缺乏对同类问题的复用指引与文档沉淀，且无重复issue关联链接。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#548](https://gitcode.com/cann/ops-cv/issues/548) [Documentation|文档反馈]: quick-start进入项目源码失败** — 55分
  - 痛点原因：关闭说明仅为排查提问，未沉淀最终解决方案，且缺少关联主链接，导致复用不足。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：您好，您这边是从ops-cv仓的页面cannlab进去的吗？ 能否在gitCode路径下使用如下命令看看是否有ops-cv目录存在： `find ./ -name ops-cv -type d`    - `liu-wei`：`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` 这里的`${gitCode_id}`是指带。 假如你的gitCode_id是shane，那这个命令就是： `cd /mnt/workspac…    - `liu-wei`：>`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` > >这里的`${gitCode_id}`是指带。 > >假如你的gitCode_id是shane，那这个命令就是： > >`cd /mn…
#### PP-02 首响时间双峰分布部分Issue等待过长（I1 · 分配与首次响应）

- **[#576](https://gitcode.com/cann/ops-cv/issues/576) [Bug-Report|缺陷反馈]: ImageProjectiveTransform算子binary.json格式配置错误且缺少op_graph实现** — 0分
  - 痛点原因：仅执行了分配和打标签等流程操作，虽提交修复PR但未对缺陷问题进行任何实质性的文字回应。
  - 原文依据：
    - `yourealize`：修复 PR 已提交：https://gitcode.com/cann/ops-cv/merge_requests/1062    - `yourealize`：/assign    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue576
- **[#575](https://gitcode.com/cann/ops-cv/issues/575) [Bug-Report|缺陷反馈]: UpsampleLinear1dBackward存在clean code检测问题** — 0分
  - 痛点原因：全程仅机器人打标签和自动关闭，无任何人工技术分析或解决方案的实质回应。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue575    - [关联PR #1057（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1057)
- **[#574](https://gitcode.com/cann/ops-cv/issues/574) [Bug-Report|缺陷反馈]: UpsampleBicubic2dGrad、UpsampleBilinear2dAA正反向缺少上边界限制** — 0分
  - 痛点原因：仅进行了打标签和分配操作，随后被机器人直接关闭，全程无任何实质性技术回应。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue574    - [关联PR #1056（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1056)
- **[#573](https://gitcode.com/cann/ops-cv/issues/573) [Bug-Report|缺陷反馈]: resize_upsample_trilinear clean code检测问题** — 0分
  - 痛点原因：仅靠机器人自动指派并随关联MR合并关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue573    - [关联PR #1059（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1059)    - [关联PR #1060（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1060)
- **[#572](https://gitcode.com/cann/ops-cv/issues/572) [Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2** — 0分
  - 痛点原因：响应耗时超428小时且全程无实质技术回应，仅机器人分配标签及用户催问进展。
  - 原文依据：
    - `surezz`：/assign    - `liu-wei`：您好，这个issue目前是什么进展，我看对应的PR已经是草稿状态了，issue是否可以关闭了？    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @surezz    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#566](https://gitcode.com/cann/ops-cv/issues/566) 修复precommit的oat检查抢资源问题** — 0分
  - 痛点原因：全程仅靠机器人分配和关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `renruhai`：assigned to @zhangfands    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue566    - [关联PR #1052（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1052)
- **[#565](https://gitcode.com/cann/ops-cv/issues/565) [Bug-Report|缺陷反馈]: UpsampleBilinear2dAABackward存在clean code检测问题** — 0分
  - 痛点原因：全程仅有打标签和分配人员等操作，无任何人工实质性回复，直接被机器人关联合并请求关闭。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue565    - [关联PR #1050（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1050)
- **[#564](https://gitcode.com/cann/ops-cv/issues/564) [Requirement|需求建议]: 【upsample_bilinear2d_grad】 补全 ascend950 arch35 tiling/kerne…** — 0分
  - 痛点原因：全程仅机器人指派和关联合并自动关闭，无任何人工实质性回应。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue564    - [关联PR #1035（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1035)
- **[#563](https://gitcode.com/cann/ops-cv/issues/563) [Requirement|需求建议]: feat: 支持 rgb2yuv422 和 yuv4442yuv422 算子** — 0分
  - 痛点原因：首次响应仅为assign操作，无任何人工实质技术回应，后续由机器人自动加标签、分配并关闭。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue563    - [关联PR #1036（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1036)
- **[#562](https://gitcode.com/cann/ops-cv/issues/562) [Bug-Report|缺陷反馈]: resize 系列 op_host UT CMakeLists 缺少芯片版本隔离** — 0分
  - 痛点原因：维护者仅进行了指派和加标签操作，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue562    - [关联PR #1045（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1045)
- **[#560](https://gitcode.com/cann/ops-cv/issues/560) docs: image_projective_transform 算子文档问题修复** — 0分
  - 痛点原因：仅机器人自动打标签和分配，随后随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue560    - [关联PR #1044（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1044)
- **[#559](https://gitcode.com/cann/ops-cv/issues/559) [Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。** — 0分
  - 痛点原因：全程仅由机器人加标签、分配人员及随PR合并关闭，无任何人工实质解答。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @zhangfands    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue559    - [关联PR #1042（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1042)
- **[#557](https://gitcode.com/cann/ops-cv/issues/557) [Requirement|需求建议]: 增加 ExtractGlimpseV2,UpsampleBicubic2d 支持 Ascend950 实现 SIMT** — 0分
  - 痛点原因：仅通过机器人指令分配任务并随代码合并关闭，全程无人工实质技术回应。
  - 原文依据：
    - `wang-shilong32`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wang-shilong32    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue557    - [关联PR #1039（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1039)
- **[#556](https://gitcode.com/cann/ops-cv/issues/556) [Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定** — 0分
  - 痛点原因：仅完成打标签和分配负责人等流程操作，始终未对缺陷提供任何实质性的技术解答或排查。
  - 原文依据：
    - `liu-wei`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @wanshilin    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue556    - [关联PR #1037（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1037)
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 0分
  - 痛点原因：仅进行了分配和打标签操作，全程无任何针对需求的技术性实质回应。
  - 原文依据：
    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#552](https://gitcode.com/cann/ops-cv/issues/552) [CodeStyle|代码规范] 全量算子代码添加 clang-format 格式化约束** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人分配任务、打标签并随关联PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue552    - [关联PR #1008（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1008)
- **[#551](https://gitcode.com/cann/ops-cv/issues/551) [Bug-Report|缺陷反馈]: GridSampler3DGrad算子950实现bf16数据类型精度问题修复** — 0分
  - 痛点原因：仅机器人自动指派与关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue551    - [关联PR #1033（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1033)    - [关联PR #1034（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1034)
- **[#550](https://gitcode.com/cann/ops-cv/issues/550) [Requirement|需求建议]: 新增 image_projective_transform 算子，支持 Ascend950 平台** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，机器人直接标记为resolved，全程未提供任何实质性技术解答或反馈。
  - 原文依据：
    - `yourealize`：/assign [@yourealize](https://gitcode.com/yourealize)    - `yourealize`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue550    - [关联PR #1016（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1016)
- **[#549](https://gitcode.com/cann/ops-cv/issues/549) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复** — 0分
  - 痛点原因：仅有机器人指派和自动关闭标签，全程无人工实质回应。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue549    - [关联PR #1022（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1022)    - [关联PR #1024（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1024)
- **[#547](https://gitcode.com/cann/ops-cv/issues/547) [Bug-Report|缺陷反馈]: resize 系列算子 ascend950 op_host tiling UT 未编译执行** — 0分
  - 痛点原因：维护者仅分配任务和加标签，机器人直接标记已解决，全程无针对缺陷的实质性技术回应。
  - 原文依据：
    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue547    - [关联PR #1018（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1018)
- **[#546](https://gitcode.com/cann/ops-cv/issues/546) [Requirement|需求建议]: 新增DIoUGrad，GIoUGrad，UpsampleNearest2dGrad算子950Simt实现** — 0分
  - 痛点原因：仅通过机器人指派和关联合并关闭，全程无人工针对需求进行实质性技术解答。
  - 原文依据：
    - `u010470851`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @u010470851    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue546    - [关联PR #983（merged）](https://gitcode.com/cann/ops-cv/merge_requests/983)
- **[#561](https://gitcode.com/cann/ops-cv/issues/561) [Requirement|需求建议]: 【社区任务】upsample_nearest算子开发交付（任务编号 05-29）** — 20分
  - 痛点原因：认领任务后长达500小时才出现实质回应，期间缺乏进展跟进与实质沟通，响应严重滞后。
  - 原文依据：
    - `kxingaa`：/assign    - `liu-wei`：你好，这个issue是什么进展了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `kxingaa`：>你好，这个issue是什么进展了？ [@liu-wei](https://gitcode.com/liu-wei) https://gitcode.com/cann/ops-cv/pull/1070 pr还没有合入。 https://g…    - `cann-robot`：assigned to @kxingaa    - [关联PR #1048（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1048)
- **[#558](https://gitcode.com/cann/ops-cv/issues/558) [Bug-Report|缺陷反馈]: upsample tiling 属性空指针校验缺失** — 20分
  - 痛点原因：维护者仅执行分配和打标签操作，迟迟未提供技术性实质回应，导致实质回应耗时近455小时。
  - 原文依据：
    - `wangdong2333`：/assign [@wangdong2333](https://gitcode.com/wangdong2333)    - `liu-wei`：这个issue现在是什么进展，我看对应的PR已经关闭了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `wangdong2333`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wangdong2333
#### PP-03 技术讨论缺失直接关闭Issue（I2 · 讨论与解决）

- **[#575](https://gitcode.com/cann/ops-cv/issues/575) [Bug-Report|缺陷反馈]: UpsampleLinear1dBackward存在clean code检测问题** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #1057（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1057)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue575    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423
- **[#566](https://gitcode.com/cann/ops-cv/issues/566) 修复precommit的oat检查抢资源问题** — 0分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、commit引用及文档链接等明确解决证据。
  - 原文依据：
    - [关联PR #1052（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1052)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue566    - `cann-robot`：add label resolved    - `renruhai`：assigned to @zhangfands
- **[#565](https://gitcode.com/cann/ops-cv/issues/565) [Bug-Report|缺陷反馈]: UpsampleBilinear2dAABackward存在clean code检测问题** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit、文档、release引用及人工关闭说明等实质解决证据。
  - 原文依据：
    - [关联PR #1050（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1050)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue565    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423
- **[#556](https://gitcode.com/cann/ops-cv/issues/556) [Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定** — 0分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及人工确认解决的说明，证据链不完整。
  - 原文依据：
    - [关联PR #1037（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1037)    - [关联PR #1038（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1038)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue556    - `liu-wei`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @wanshilin
- **[#552](https://gitcode.com/cann/ops-cv/issues/552) [CodeStyle|代码规范] 全量算子代码添加 clang-format 格式化约束** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏commit引用、文档链接及人工关闭评论等强证据支撑。
  - 原文依据：
    - [关联PR #1008（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1008)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue552    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei
- **[#560](https://gitcode.com/cann/ops-cv/issues/560) docs: image_projective_transform 算子文档问题修复** — 15分
  - 痛点原因：仅靠机器人关联PR关闭，无commit引用和人工关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #1044（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1044)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue560    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @yourealize
- **[#573](https://gitcode.com/cann/ops-cv/issues/573) [Bug-Report|缺陷反馈]: resize_upsample_trilinear clean code检测问题** — 23分
  - 痛点原因：仅有关联PR与机器人关闭评论，缺少commit引用、文档链接及release记录等直接解决证据。
  - 原文依据：
    - [关联PR #1059（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1059)    - [关联PR #1060（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1060)    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue573    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ
- **[#572](https://gitcode.com/cann/ops-cv/issues/572) [Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2** — 23分
  - 痛点原因：关联PR处于草稿状态被直接关闭，缺乏代码提交、文档及版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #1021（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1021)    - `surezz`：/assign    - `liu-wei`：您好，这个issue目前是什么进展，我看对应的PR已经是草稿状态了，issue是否可以关闭了？    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 23分
  - 痛点原因：仅口头提供替代方案，无PR、commit或文档等实质解决证据便直接关闭。
  - 原文依据：
    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：assigned to @renruhai
- **[#564](https://gitcode.com/cann/ops-cv/issues/564) [Requirement|需求建议]: 【upsample_bilinear2d_grad】 补全 ascend950 arch35 tiling/kerne…** — 23分
  - 痛点原因：虽有PR合并并由机器人自动关闭，但缺乏commit、文档及release等直接证据引用，无人工对解决结果的详细说明。
  - 原文依据：
    - [关联PR #1035（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1035)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue564    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#563](https://gitcode.com/cann/ops-cv/issues/563) [Requirement|需求建议]: feat: 支持 rgb2yuv422 和 yuv4442yuv422 算子** — 23分
  - 痛点原因：虽有合并的关联PR，但缺少commit、文档及release引用，且关闭评论仅为机器人自动留言，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #1036（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1036)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue563    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#557](https://gitcode.com/cann/ops-cv/issues/557) [Requirement|需求建议]: 增加 ExtractGlimpseV2,UpsampleBicubic2d 支持 Ascend950 实现 SIMT** — 23分
  - 痛点原因：虽有关联PR合并触发机器人关闭，但缺乏commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #1039（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1039)    - `wang-shilong32`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue557    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wang-shilong32
- **[#553](https://gitcode.com/cann/ops-cv/issues/553) [Requirement|需求建议] 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 23分
  - 痛点原因：仅凭关联PR和简单文字说明关闭，缺少commit、文档及release等实质性证据支撑解决结果。
  - 原文依据：
    - [关联PR #1025（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1025)    - `liu-wei`：相关修改代码已合入，issue问题解决关闭。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei
- **[#551](https://gitcode.com/cann/ops-cv/issues/551) [Bug-Report|缺陷反馈]: GridSampler3DGrad算子950实现bf16数据类型精度问题修复** — 23分
  - 痛点原因：仅靠关联PR合并与机器人自动关闭，缺乏commit引用、文档及release等直接解决证据。
  - 原文依据：
    - [关联PR #1033（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1033)    - [关联PR #1034（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1034)    - `qy3311888`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue551    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888
- **[#549](https://gitcode.com/cann/ops-cv/issues/549) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复** — 23分
  - 痛点原因：仅靠机器人随关联PR合并自动关闭，缺乏commit引用、文档链接及release记录等直接修复证据。
  - 原文依据：
    - [关联PR #1022（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1022)    - [关联PR #1024（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1024)    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ
- **[#547](https://gitcode.com/cann/ops-cv/issues/547) [Bug-Report|缺陷反馈]: resize 系列算子 ascend950 op_host tiling UT 未编译执行** — 23分
  - 痛点原因：仅靠关联PR合并触发自动关闭，缺乏commit引用、文档和release等直接修复证据。
  - 原文依据：
    - [关联PR #1018（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1018)    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue547    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2
- **[#546](https://gitcode.com/cann/ops-cv/issues/546) [Requirement|需求建议]: 新增DIoUGrad，GIoUGrad，UpsampleNearest2dGrad算子950Simt实现** — 23分
  - 痛点原因：仅依赖关联PR合并与机器人自动关闭，缺乏commit引用、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #983（merged）](https://gitcode.com/cann/ops-cv/merge_requests/983)    - `u010470851`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue546    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @u010470851
- **[#574](https://gitcode.com/cann/ops-cv/issues/574) [Bug-Report|缺陷反馈]: UpsampleBicubic2dGrad、UpsampleBilinear2dAA正反向缺少上边界限制** — 31分
  - 痛点原因：虽有合并的关联PR与机器人自动关闭，但缺乏人工关闭评论、文档链接及版本发布引用等强解决证据。
  - 原文依据：
    - [关联PR #1056（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1056)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue574    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423
- **[#559](https://gitcode.com/cann/ops-cv/issues/559) [Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。** — 31分
  - 痛点原因：虽有合并的关联PR，但无文档或release补充证据，且缺乏人工关闭评论说明解决详情，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #1042（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1042)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue559    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @zhangfands
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：缺乏PR和commit等代码修复证据，仅以文档链接作为解答，且在无实质解决动作下直接关闭。
  - 原文依据：
    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：仅口头说明后续删除配置，无关联PR或commit引用等代码修复凭证即直接关闭，缺乏实质解决证据。
  - 原文依据：
    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：仅凭文字解释和文档链接说明原因，无关联PR、commit或release等代码级修复证据即关闭。
  - 原文依据：
    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#562](https://gitcode.com/cann/ops-cv/issues/562) [Bug-Report|缺陷反馈]: resize 系列 op_host UT CMakeLists 缺少芯片版本隔离** — 38分
  - 痛点原因：虽有关联PR并自动关闭，但缺少commit引用与文档链接，关闭评论仅为系统触发，缺乏人工补充的修复证据。
  - 原文依据：
    - [关联PR #1045（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1045)    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue562    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2
- **[#558](https://gitcode.com/cann/ops-cv/issues/558) [Bug-Report|缺陷反馈]: upsample tiling 属性空指针校验缺失** — 38分
  - 痛点原因：关联PR已关闭未合并，无修复commit引用，仅以计划关闭草率收尾，缺乏实际解决证据。
  - 原文依据：
    - [关联PR #1041（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1041)    - `wangdong2333`：/assign [@wangdong2333](https://gitcode.com/wangdong2333)    - `liu-wei`：这个issue现在是什么进展，我看对应的PR已经关闭了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 54分
  - 痛点原因：虽有合并的关联PR，但缺乏文档链接与release引用，且仅靠机器人自动关闭，缺乏人工对解决结果的确认说明。
  - 原文依据：
    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2
- **[#550](https://gitcode.com/cann/ops-cv/issues/550) [Requirement|需求建议]: 新增 image_projective_transform 算子，支持 Ascend950 平台** — 54分
  - 痛点原因：虽有关联PR和关闭评论，但缺少文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #1016（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1016)    - `yourealize`：/assign [@yourealize](https://gitcode.com/yourealize)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue550    - `yourealize`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize
#### PP-04 部分Issue Bot缺位无标签无响应（G · Bot/Agent 治理）

- **[#576](https://gitcode.com/cann/ops-cv/issues/576) [Bug-Report|缺陷反馈]: ImageProjectiveTransform算子binary.json格式配置错误且缺少op_graph实现** — 20分
  - 痛点原因：Bot仅机械打标并关闭，评论数为零，未对用户提交的修复PR进行状态同步与有效反馈。
  - 原文依据：
    - `yourealize`：修复 PR 已提交：https://gitcode.com/cann/ops-cv/merge_requests/1062    - `yourealize`：/assign    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue576
- **[#575](https://gitcode.com/cann/ops-cv/issues/575) [Bug-Report|缺陷反馈]: UpsampleLinear1dBackward存在clean code检测问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无任何评论互动，缺乏对用户的状态同步与解释说明，治理沟通严重缺失。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue575    - [关联PR #1057（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1057)
- **[#574](https://gitcode.com/cann/ops-cv/issues/574) [Bug-Report|缺陷反馈]: UpsampleBicubic2dGrad、UpsampleBilinear2dAA正反向缺少上边界限制** — 20分
  - 痛点原因：Bot仅执行打标与关闭，无任何评论互动，缺乏自动分配及状态流转提示，治理动作单一。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue574    - [关联PR #1056（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1056)
- **[#573](https://gitcode.com/cann/ops-cv/issues/573) [Bug-Report|缺陷反馈]: resize_upsample_trilinear clean code检测问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论与用户互动，缺乏有效沟通与状态说明。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue573    - [关联PR #1059（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1059)    - [关联PR #1060（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1060)
- **[#572](https://gitcode.com/cann/ops-cv/issues/572) [Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2** — 20分
  - 痛点原因：Bot仅完成打标和分配，未响应人工关闭请求，缺乏自动闭环能力。
  - 原文依据：
    - `surezz`：/assign    - `liu-wei`：您好，这个issue目前是什么进展，我看对应的PR已经是草稿状态了，issue是否可以关闭了？    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @surezz    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅执行打标，在人工提出关闭后未自动关闭且无评论互动，治理动作严重缺失。
  - 原文依据：
    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅执行打标，未进行评论互动或自动关闭，未能有效协助人工完成治理闭环。
  - 原文依据：
    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅完成基础打标，未参与评论、分配及关闭流程，核心治理动作依赖人工，缺乏自动化闭环。
  - 原文依据：
    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#566](https://gitcode.com/cann/ops-cv/issues/566) 修复precommit的oat检查抢资源问题** — 20分
  - 痛点原因：Bot仅机械打标并自动关闭，全程无任何评论互动，缺乏有效沟通与治理引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `renruhai`：assigned to @zhangfands    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue566    - [关联PR #1052（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1052)
- **[#565](https://gitcode.com/cann/ops-cv/issues/565) [Bug-Report|缺陷反馈]: UpsampleBilinear2dAABackward存在clean code检测问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，无任何评论互动，缺乏有效解释说明，治理流于形式。
  - 原文依据：
    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue565    - [关联PR #1050（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1050)
- **[#564](https://gitcode.com/cann/ops-cv/issues/564) [Requirement|需求建议]: 【upsample_bilinear2d_grad】 补全 ascend950 arch35 tiling/kerne…** — 20分
  - 痛点原因：Bot虽完成打标、分配与关闭操作，但全程无任何评论，缺乏治理透明度与用户反馈。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue564    - [关联PR #1035（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1035)
- **[#563](https://gitcode.com/cann/ops-cv/issues/563) [Requirement|需求建议]: feat: 支持 rgb2yuv422 和 yuv4442yuv422 算子** — 20分
  - 痛点原因：Bot仅执行了打标、分配和关闭操作，但全程无任何评论反馈，缺乏有效交互。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue563    - [关联PR #1036（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1036)
- **[#562](https://gitcode.com/cann/ops-cv/issues/562) [Bug-Report|缺陷反馈]: resize 系列 op_host UT CMakeLists 缺少芯片版本隔离** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，无任何有效评论或引导，治理流于形式。
  - 原文依据：
    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue562    - [关联PR #1045（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1045)
- **[#560](https://gitcode.com/cann/ops-cv/issues/560) docs: image_projective_transform 算子文档问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未留下任何解释性评论，缺乏用户交互，治理透明度低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue560    - [关联PR #1044（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1044)
- **[#559](https://gitcode.com/cann/ops-cv/issues/559) [Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。** — 20分
  - 痛点原因：Bot直接打标并关闭issue，且全程无任何评论解释原因，缺乏有效沟通与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @zhangfands    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue559    - [关联PR #1042（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1042)
- **[#558](https://gitcode.com/cann/ops-cv/issues/558) [Bug-Report|缺陷反馈]: upsample tiling 属性空指针校验缺失** — 20分
  - 痛点原因：Bot仅完成打标，未自动关闭或评论跟进，最终依赖人工介入处理，未发挥实际治理作用。
  - 原文依据：
    - `wangdong2333`：/assign [@wangdong2333](https://gitcode.com/wangdong2333)    - `liu-wei`：这个issue现在是什么进展，我看对应的PR已经关闭了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `wangdong2333`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wangdong2333
- **[#557](https://gitcode.com/cann/ops-cv/issues/557) [Requirement|需求建议]: 增加 ExtractGlimpseV2,UpsampleBicubic2d 支持 Ascend950 实现 SIMT** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，无任何评论反馈，导致治理过程缺乏透明度与有效互动。
  - 原文依据：
    - `wang-shilong32`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wang-shilong32    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue557    - [关联PR #1039（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1039)
- **[#556](https://gitcode.com/cann/ops-cv/issues/556) [Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定** — 20分
  - 痛点原因：Bot无评论直接打标resolved并关闭，而人工仍在指派负责人，属于过早无效关闭且缺乏沟通。
  - 原文依据：
    - `liu-wei`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @wanshilin    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue556    - [关联PR #1037（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1037)
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程未发表任何解释性评论，缺乏治理透明度与有效沟通。
  - 原文依据：
    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#554](https://gitcode.com/cann/ops-cv/issues/554) [Documentation|文档更新] 更新社区贡献指南文档 CONTRIBUTING.md** — 20分
  - 痛点原因：Bot仅完成打标，未自动关闭已解决issue，且无任何评论互动，最终依赖人工关闭。
  - 原文依据：
    - `liu-wei`：相关修改已合入，issue问题解决关闭。    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#553](https://gitcode.com/cann/ops-cv/issues/553) [Requirement|需求建议] 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 20分
  - 痛点原因：Bot仅打标未自动关闭，仍依赖人工关闭且无评论交互，治理闭环能力不足。
  - 原文依据：
    - `liu-wei`：相关修改代码已合入，issue问题解决关闭。    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - [关联PR #1025（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1025)
- **[#552](https://gitcode.com/cann/ops-cv/issues/552) [CodeStyle|代码规范] 全量算子代码添加 clang-format 格式化约束** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无评论同步状态与原因，缺乏治理透明度与互动性。
  - 原文依据：
    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue552    - [关联PR #1008（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1008)
- **[#551](https://gitcode.com/cann/ops-cv/issues/551) [Bug-Report|缺陷反馈]: GridSampler3DGrad算子950实现bf16数据类型精度问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标、指派与关闭指令，无任何实质性治理评论，缺乏有效互动。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue551    - [关联PR #1033（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1033)    - [关联PR #1034（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1034)
- **[#550](https://gitcode.com/cann/ops-cv/issues/550) [Requirement|需求建议]: 新增 image_projective_transform 算子，支持 Ascend950 平台** — 20分
  - 痛点原因：Bot直接打标resolved并关闭issue，全程无评论互动，治理流于形式。
  - 原文依据：
    - `yourealize`：/assign [@yourealize](https://gitcode.com/yourealize)    - `yourealize`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue550    - [关联PR #1016（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1016)
- **[#549](https://gitcode.com/cann/ops-cv/issues/549) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复** — 20分
  - 痛点原因：Bot仅执行了分配、打标和关闭等机械操作，但评论数为零，缺乏状态同步与互动反馈，导致治理过程不透明。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue549    - [关联PR #1022（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1022)    - [关联PR #1024（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1024)
- **[#548](https://gitcode.com/cann/ops-cv/issues/548) [Documentation|文档反馈]: quick-start进入项目源码失败** — 20分
  - 痛点原因：Bot仅完成打标，未自动回复或关闭issue，所有沟通与结案均由人工完成，自动化治理缺失。
  - 原文依据：
    - `liu-wei`：您好，您这边是从ops-cv仓的页面cannlab进去的吗？ 能否在gitCode路径下使用如下命令看看是否有ops-cv目录存在： `find ./ -name ops-cv -type d`    - `liu-wei`：`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` 这里的`${gitCode_id}`是指带。 假如你的gitCode_id是shane，那这个命令就是： `cd /mnt/workspac…    - `liu-wei`：>`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` > >这里的`${gitCode_id}`是指带。 > >假如你的gitCode_id是shane，那这个命令就是： > >`cd /mn…    - `liu-wei`：您好，我们计划关闭这个issue，如果您还有其他问题，可以随时提issue或者参与SIG会议一起参与讨论。 sig会时间可参考https://meeting.osinfra.cn/cann/， 我们的sig组为sig-ops-basic，…    - `hanxiaolong`：最早是从ops-nn进入的，后续是从ops-cv进入的，目录还是ops-nn，感觉是个bug [@liu-wei](https://gitcode.com/liu-wei)    - `liu-wei`：>最早是从ops-nn进入的，后续是从ops-cv进入的，目录还是ops-nn，感觉是个bug >[@liu-wei](https://gitcode.com/liu-wei) [@hanxiaolong](https://gitcode…
- **[#547](https://gitcode.com/cann/ops-cv/issues/547) [Bug-Report|缺陷反馈]: resize 系列算子 ascend950 op_host tiling UT 未编译执行** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论交互，缺乏实质治理反馈与验证说明。
  - 原文依据：
    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue547    - [关联PR #1018（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1018)
- **[#546](https://gitcode.com/cann/ops-cv/issues/546) [Requirement|需求建议]: 新增DIoUGrad，GIoUGrad，UpsampleNearest2dGrad算子950Simt实现** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无任何评论说明状态或关闭原因，缺乏有效沟通。
  - 原文依据：
    - `u010470851`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @u010470851    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue546    - [关联PR #983（merged）](https://gitcode.com/cann/ops-cv/merge_requests/983)
#### PP-05 关闭时未提供后续反馈路径（I3 · 总结与关闭）

- **[#575](https://gitcode.com/cann/ops-cv/issues/575) [Bug-Report|缺陷反馈]: UpsampleLinear1dBackward存在clean code检测问题** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档沉淀且关闭说明为空，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue575    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1057（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1057)
- **[#574](https://gitcode.com/cann/ops-cv/issues/574) [Bug-Report|缺陷反馈]: UpsampleBicubic2dGrad、UpsampleBilinear2dAA正反向缺少上边界限制** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人因关联MR合并自动关闭，未留下任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue574    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1056（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1056)
- **[#573](https://gitcode.com/cann/ops-cv/issues/573) [Bug-Report|缺陷反馈]: resize_upsample_trilinear clean code检测问题** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅由机器人随MR合并自动关闭，缺乏经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue573    - `cann-robot`：add label resolved    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - [关联PR #1059（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1059)    - [关联PR #1060（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1060)
- **[#572](https://gitcode.com/cann/ops-cv/issues/572) [Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与重复链接，未留存任何可复用的解决经验。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `surezz`：/assign    - `liu-wei`：您好，这个issue目前是什么进展，我看对应的PR已经是草稿状态了，issue是否可以关闭了？    - `cann-robot`：assigned to @surezz
- **[#566](https://gitcode.com/cann/ops-cv/issues/566) 修复precommit的oat检查抢资源问题** — 0分
  - 痛点原因：被机器人随关联PR合并自动关闭，无任何关闭说明、方案文档及dup链接，未沉淀可复用的问题解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue566    - `cann-robot`：add label resolved    - `renruhai`：assigned to @zhangfands    - [关联PR #1052（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1052)
- **[#565](https://gitcode.com/cann/ops-cv/issues/565) [Bug-Report|缺陷反馈]: UpsampleBilinear2dAABackward存在clean code检测问题** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无关闭说明与方案文档，未留下任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue565    - `chenhaijie1423`：add label bug-report    - `cann-robot`：add label resolved    - `chenhaijie1423`：assigned to @chenhaijie1423    - [关联PR #1050（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1050)
- **[#564](https://gitcode.com/cann/ops-cv/issues/564) [Requirement|需求建议]: 【upsample_bilinear2d_grad】 补全 ascend950 arch35 tiling/kerne…** — 0分
  - 痛点原因：仅随MR合并自动关闭，关闭说明仅7字且无方案文档与关联链接，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue564    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1035（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1035)
- **[#563](https://gitcode.com/cann/ops-cv/issues/563) [Requirement|需求建议]: feat: 支持 rgb2yuv422 和 yuv4442yuv422 算子** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联链接，未留下任何可复用的实现细节或解决指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue563    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1036（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1036)
- **[#561](https://gitcode.com/cann/ops-cv/issues/561) [Requirement|需求建议]: 【社区任务】upsample_nearest算子开发交付（任务编号 05-29）** — 0分
  - 痛点原因：关闭说明为0字且未关联主链接，仅提及未合入的PR，未沉淀任何可复用的信息。
  - 原文依据：
    - `kxingaa`：/assign    - `liu-wei`：你好，这个issue是什么进展了？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `kxingaa`：>你好，这个issue是什么进展了？ [@liu-wei](https://gitcode.com/liu-wei) https://gitcode.com/cann/ops-cv/pull/1070 pr还没有合入。 https://g…    - `cann-robot`：assigned to @kxingaa    - [关联PR #1048（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1048)
- **[#559](https://gitcode.com/cann/ops-cv/issues/559) [Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。** — 0分
  - 痛点原因：关闭说明0字且无方案文档化，仅靠机器人因关联MR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue559    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @zhangfands    - [关联PR #1042（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1042)
- **[#557](https://gitcode.com/cann/ops-cv/issues/557) [Requirement|需求建议]: 增加 ExtractGlimpseV2,UpsampleBicubic2d 支持 Ascend950 实现 SIMT** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，关闭说明仅7字且无方案文档化，未留存任何供他人复用的方案细节或链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue557    - `cann-robot`：add label resolved    - `wang-shilong32`：/assign    - `cann-robot`：assigned to @wang-shilong32    - [关联PR #1039（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1039)
- **[#556](https://gitcode.com/cann/ops-cv/issues/556) [Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定** — 0分
  - 痛点原因：关闭说明为空，仅由机器人关联MR合并自动关闭，无方案文档沉淀与复用链接，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue556    - `liu-wei`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @wanshilin    - `liu-wei`：assigned to @liu-wei    - [关联PR #1037（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1037)
- **[#553](https://gitcode.com/cann/ops-cv/issues/553) [Requirement|需求建议] 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 0分
  - 痛点原因：关闭说明仅22字且无方案文档化，仅以代码合入为由关闭，未提供供其他用户复用解决方案的有效指引。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `liu-wei`：相关修改代码已合入，issue问题解决关闭。    - `liu-wei`：assigned to @liu-wei    - [关联PR #1025（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1025)
- **[#552](https://gitcode.com/cann/ops-cv/issues/552) [CodeStyle|代码规范] 全量算子代码添加 clang-format 格式化约束** — 0分
  - 痛点原因：机器人随关联PR合并自动关闭，关闭说明为0字，未沉淀任何方案文档或复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue552    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - [关联PR #1008（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1008)
- **[#551](https://gitcode.com/cann/ops-cv/issues/551) [Bug-Report|缺陷反馈]: GridSampler3DGrad算子950实现bf16数据类型精度问题修复** — 0分
  - 痛点原因：仅因关联MR合并自动关闭，关闭说明仅7字且无方案文档，未沉淀任何修复细节供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue551    - `cann-robot`：add label resolved    - `qy3311888`：/assign    - `cann-robot`：assigned to @qy3311888    - [关联PR #1033（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1033)    - [关联PR #1034（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1034)
- **[#549](https://gitcode.com/cann/ops-cv/issues/549) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复** — 0分
  - 痛点原因：无方案文档与主链接，关闭说明仅7字，仅由机器人随MR合并自动关闭，未留存可供复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue549    - `cann-robot`：add label resolved    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - [关联PR #1022（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1022)    - [关联PR #1024（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1024)
- **[#546](https://gitcode.com/cann/ops-cv/issues/546) [Requirement|需求建议]: 新增DIoUGrad，GIoUGrad，UpsampleNearest2dGrad算子950Simt实现** — 0分
  - 痛点原因：缺乏方案文档与关联主链接，关闭说明仅7字且由机器人自动关闭，无任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue546    - `cann-robot`：add label resolved    - `u010470851`：/assign    - `cann-robot`：assigned to @u010470851    - [关联PR #983（merged）](https://gitcode.com/cann/ops-cv/merge_requests/983)
- **[#562](https://gitcode.com/cann/ops-cv/issues/562) [Bug-Report|缺陷反馈]: resize 系列 op_host UT CMakeLists 缺少芯片版本隔离** — 25分
  - 痛点原因：仅因关联MR合并而机械关闭，无方案文档沉淀，缺乏根因分析与修复细节，无法为同类问题提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue562    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1045（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1045)
- **[#558](https://gitcode.com/cann/ops-cv/issues/558) [Bug-Report|缺陷反馈]: upsample tiling 属性空指针校验缺失** — 25分
  - 痛点原因：缺乏方案文档沉淀与复现链接，关闭说明简略，仅机械变更状态，未留存可复用的解决经验。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `wangdong2333`：add label bug-report    - `cann-robot`：add label Accepted    - `wangdong2333`：/assign [@wangdong2333](https://gitcode.com/wangdong2333)    - `liu-wei`：这个issue现在是什么进展，我看对应的PR已经关闭了？
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 25分
  - 痛点原因：仅由机器人自动关闭并关联其他issue，无方案文档沉淀且关闭说明过简，未留下可供后续参考的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#550](https://gitcode.com/cann/ops-cv/issues/550) [Requirement|需求建议]: 新增 image_projective_transform 算子，支持 Ascend950 平台** — 25分
  - 痛点原因：关闭说明仅随MR合并机械关闭，未沉淀方案文档或关联重复issue，缺乏后续参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue550    - `yourealize`：add label requirement    - `cann-robot`：add label resolved    - `yourealize`：/assign [@yourealize](https://gitcode.com/yourealize)    - `cann-robot`：assigned to @yourealize    - [关联PR #1016（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1016)
- **[#547](https://gitcode.com/cann/ops-cv/issues/547) [Bug-Report|缺陷反馈]: resize 系列算子 ascend950 op_host tiling UT 未编译执行** — 25分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，无具体解决方案文档化记录，无法为他人提供复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue547    - `cheng-ziyang2`：add label bug-report    - `cann-robot`：add label resolved    - `cheng-ziyang2`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1018（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1018)
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 30分
  - 痛点原因：关闭说明仅29字且无dup主链接，仅由系统自动关闭，未提供可追溯的复用信息。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#560](https://gitcode.com/cann/ops-cv/issues/560) docs: image_projective_transform 算子文档问题修复** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关闭并关联PR，缺乏人工对问题及解决方案的总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue560    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @yourealize    - [关联PR #1044（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1044)
- **[#554](https://gitcode.com/cann/ops-cv/issues/554) [Documentation|文档更新] 更新社区贡献指南文档 CONTRIBUTING.md** — 30分
  - 痛点原因：关闭说明仅20字且缺少关联的主链接，仅靠状态变更和标签关闭，未沉淀可复用的方案细节。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：相关修改已合入，issue问题解决关闭。    - `liu-wei`：assigned to @liu-wei
- **[#571](https://gitcode.com/cann/ops-cv/issues/571) 数值精度 / shape 边界** — 45分
  - 痛点原因：仅解释了硬件精度限制，未提供解决方案或规避措施，无文档沉淀，直接因无回复草率关闭，他人无法参考。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：1. 目前aicore精度最多支持到float运算，无法支持double类型。因此GridSample算子内部会出现您说的“grid值 × 图片边长 > 2^24(16777216) 时采样点精度下降(fp32 尾数限制)”问题。如果希望…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：assigned to @renruhai
- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 45分
  - 痛点原因：关闭时未沉淀方案文档且无复用链接，仅简单改状态并关闭，导致问题解决方案难以被后续用户复用。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#576](https://gitcode.com/cann/ops-cv/issues/576) [Bug-Report|缺陷反馈]: ImageProjectiveTransform算子binary.json格式配置错误且缺少op_graph实现** — 55分
  - 痛点原因：机器人自动关闭且说明仅61字，虽提交修复PR，但缺乏对缺陷根因与修复细节的总结，难以供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue576    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `yourealize`：修复 PR 已提交：https://gitcode.com/cann/ops-cv/merge_requests/1062    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅73字且无重复问题主链接，有效解决方案仅停留在评论中，未提炼结构化总结供后续复用。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅停留在技术解释层面，缺乏对同类问题的复用指引与文档沉淀，且无重复issue关联链接。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#548](https://gitcode.com/cann/ops-cv/issues/548) [Documentation|文档反馈]: quick-start进入项目源码失败** — 55分
  - 痛点原因：关闭说明仅为排查提问，未沉淀最终解决方案，且缺少关联主链接，导致复用不足。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：您好，您这边是从ops-cv仓的页面cannlab进去的吗？ 能否在gitCode路径下使用如下命令看看是否有ops-cv目录存在： `find ./ -name ops-cv -type d`    - `liu-wei`：`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` 这里的`${gitCode_id}`是指带。 假如你的gitCode_id是shane，那这个命令就是： `cd /mnt/workspac…    - `liu-wei`：>`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` > >这里的`${gitCode_id}`是指带。 > >假如你的gitCode_id是shane，那这个命令就是： > >`cd /mn…

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 校验关联PR是否已合并，未合并时需在关闭评论中提供明确关闭理由 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 16.9，低分 31/31；OBJ_DECISION_TRANSPARENCY：均值 63.1，低分 9/31 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 16.9，低分 31/31 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 63.1，低分 9/31 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护团队；候选负责人 `liu-wei` |
| 触发条件 | Issue创建后24h未响应 |
| 具体动作 | 设置自动提醒机制通知维护者处理未响应Issue |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 27.1，低分 23/31；OBJ_RESPONSE_SPEED：均值 88.4，低分 3/31 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 27.1，低分 23/31 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 88.4，低分 3/31 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 明确分配给yourealize，且其本人提交修复PR，责任清晰 | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | Bug类Issue关闭前 |
| 具体动作 | 确保Issue中有根因分析摘要和修复验证结论 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 31.8，低分 26/31；OBJ_RESULT_FORMATION_TIMELINESS：均值 91.0，低分 3/31 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 91.0，低分 3/31 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 31.8，低分 26/31 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 作者自查自修，PR直接推进至合并，但缺乏多轮讨论交互 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **81.6/100**，整体相对可控，但仍需关注：存在轻微痛点，部分Issue模板填写草率、内容空洞缺乏有效复现信息。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.9 | 内部贡献者提交的真实技术需求，内容具体无幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 72.3 | 结构完整，含复现步骤、环境、预期、日志及修复PR，信息充分 |

代表低分 Issue：[#549](https://gitcode.com/cann/ops-cv/issues/549)
问题：[Bug-Report|缺陷反馈]: resize_upsample_trilinear A5api修复。

### I1 · 分配与首次响应

本阶段分数为 **67.7/100**，整体相对可控，但仍需关注：首响时间双峰分布部分Issue等待过长。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 27.1 | 均值 27.1，低分 23/31 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 88.4 | 均值 88.4，低分 3/31 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 86.6 | 明确分配给yourealize，且其本人提交修复PR，责任清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 78.5 | Bot正确分配给提交者并添加bug-report标签，路由合理 |

代表低分 Issue：[#572](https://gitcode.com/cann/ops-cv/issues/572)
问题：[Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2。

### I2 · 讨论与解决

本阶段分数为 **65.8/100**，整体相对可控，但仍需关注：技术讨论缺失直接关闭Issue。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 91.0 | 均值 91.0，低分 3/31 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 31.8 | 均值 31.8，低分 26/31 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 63.8 | 作者自查自修，PR直接推进至合并，但缺乏多轮讨论交互 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 81.1 | 修复PR已合并，涵盖binary.json修正、op_graph新增及测试用例… |

代表低分 Issue：[#572](https://gitcode.com/cann/ops-cv/issues/572)
问题：[Requirement|需求建议]: 950支持ps_roi_pooling_grad_v2d/ps_roi_pooling_v2。

### I3 · 总结与关闭

本阶段分数为 **49.0/100**，本阶段需要改进，主要问题是：关闭阶段缺乏解决证据与沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 16.9 | 均值 16.9，低分 31/31 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 63.1 | 均值 63.1，低分 9/31 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 46.0 | 关闭时未说明后续反馈路径或重新开启条件，信息不足 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.2 | PR合并后由Bot关闭，修复内容已验证，无明显过早关闭风险 |

代表低分 Issue：[#556](https://gitcode.com/cann/ops-cv/issues/556)
问题：[Bug-Report|缺陷反馈]: add_exmaple用例跑不通，报错--ops未指定。

### G · Bot/Agent 治理

本阶段分数为 **64.4/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 23.9 | 均值 23.9，低分 28/31 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 93.5 | 均值 93.5，低分 0/31 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 75.7 | Bot分配后人工立即承接修复，PR合并流程顺畅无停滞 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 69.6 | Bot完成分配、标签和MR合并关闭，流程治理有效但无额外帮助 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 74.5 | Bot动作准确及时，分配与关闭均基于MR合并，无错误阻断 |

代表低分 Issue：[#559](https://gitcode.com/cann/ops-cv/issues/559)
问题：[Question|问题咨询]: precommit在扫描oat时没有告警但显示失败，导致precommit检测失败。。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 31 | 52.0 | 首期基线 | 81.6 | 67.7 | 65.8 | 49.0 | 64.4 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **2 位社区响应者**贡献 **23 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `liu-wei` | 13 |
| `renruhai` | 10 |

Top1 响应占比 **56.5%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：94.1/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-06-22_to_2026-06-28.json`。
