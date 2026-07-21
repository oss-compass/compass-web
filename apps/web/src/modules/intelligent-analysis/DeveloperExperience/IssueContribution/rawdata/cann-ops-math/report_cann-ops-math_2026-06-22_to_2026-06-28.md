# Issue 贡献体验周报 · cann/ops-math

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **66** 个 Issue
+ **Open 4 / Closed 62**，关闭率 **93.9%**。
+ 总体体验分为 **48.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 46.7 | 关闭阶段缺乏解决证据与知识沉淀 |
| P0 | I1 · 分配与首次响应 | 58.7 | 分流阶段标签与责任归属严重不足 |
| P1 | I2 · 讨论与解决 | 63.2 | 讨论深度不足评论数极低 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 强制填写关闭评论模板：包含根因分析、解决方案链接、影响版本和后续反馈路径 |
| REC-02 | P0 | 配置bot自动添加优先级和组件分类标签，未assign的issue触发提醒 |
| REC-03 | P1 | 发布进展更新评论，说明当前排查状态和下一步计划 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 66 |
| Open / Closed | 4 / 62 |
| 关闭率 | 93.9% |
| 类型构成 | 缺陷 32 / 需求 27 / 其他 7 |
| 总体体验分 | 48.6/100（D） |
| 首次响应时间 | 中位 2.5h；均值 11.6h |
| 关闭周期 | 中位 22.8h；均值 2.8天 |
| 7天响应率 | 98.5% |
| 评论数/Issue | 1.23 |
| 标签覆盖率 | 90.9% |
| 指派覆盖率 | 71.2% |
| 数据完整性 | 91.7/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.3 | 3/66（4.5%） | 相对可控 | `SUB_INPUT_QUALITY` 66.4 |
| I1 · 分配与首次响应 | 58.7 | 36/66（54.5%） | P0 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 10.0 |
| I2 · 讨论与解决 | 63.2 | 16/66（24.2%） | 相对可控 | `OBJ_SOLUTION_EVIDENCE` 30.5 |
| I3 · 总结与关闭 | 46.7 | 56/66（84.8%） | P0 | `OBJ_CLOSURE_REUSE` 14.4 |
| G · Bot/Agent 治理（参考） | 65.6 | 11/66（16.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 24.5 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏解决证据与知识沉淀 | OBJ_CLOSURE_REUSE：均值 14.4，低分 65/66；OBJ_DECISION_TRANSPARENCY：均值 58.9，低分 24/66 | 社区成员无法从已关闭issue获取排查经验，重复问题无法复用已有结论 |
| PP-02 | P0 | I1 · 分配与首次响应 | 分流阶段标签与责任归属严重不足 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 10.0，低分 59/66；OBJ_RESPONSE_SPEED：均值 86.4，低分 3/66 | 问题路由不清晰导致响应延迟，维护者无法按优先级和领域高效分配工作 |
| PP-03 | P1 | I2 · 讨论与解决 | 讨论深度不足评论数极低 | OBJ_SOLUTION_EVIDENCE：均值 30.5，低分 57/66；OBJ_RESULT_FORMATION_TIMELINESS：均值 88.5，低分 5/66 | 问题排查过程缺乏透明度，用户无法了解进展，知识无法在讨论中沉淀 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot误关闭风险高且部分issue缺位 | OBJ_BOT_GOVERNANCE：均值 24.5，低分 60/66；OBJ_BOT_MISCLOSE_REVERSE：均值 96.1，低分 0/66 | 有效issue可能被错误关闭，缺位issue缺乏自动化分流和标签管理 |
| PP-05 | P2 | I2 · 讨论与解决 | Open issue长期停滞无人推进 | OBJ_SOLUTION_EVIDENCE：均值 30.5，低分 57/66；OBJ_RESULT_FORMATION_TIMELINESS：均值 88.5，低分 5/66 | 社区任务流转效率低，贡献者投入无法及时获得闭环反馈 |
| PP-06 | P2 | I1 · 分配与首次响应 | 部分issue正文极简信息不足 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 10.0，低分 59/66；OBJ_RESPONSE_SPEED：均值 86.4，低分 3/66 | 维护者需额外沟通获取基本信息，增加响应成本和延迟 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏解决证据与知识沉淀（I3 · 总结与关闭）

- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，无方案文档化记录，导致其他用户无法获取解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 0分
  - 痛点原因：关闭说明仅为机器人自动生成的MR关联信息，无方案文档化与人工总结的解决方案，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅含简单的指派操作，导致后续毫无复用价值。
  - 原文依据：
    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)
- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：关闭说明为空且无方案文档与复用链接，仅靠代码提交自动关闭，导致解决经验无法被社区复用。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 0分
  - 痛点原因：仅因关联MR合并而机械关闭，无方案文档且关闭说明极简，未留存任何可复用的实现细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - `cann-robot`：add label resolved    - `tieyutong`：/assign    - `cann-robot`：assigned to @tieyutong    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)
- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 0分
  - 痛点原因：关闭说明仅为机器人模板，无人工根因分析与方案总结，缺乏文档化沉淀，复用价值极低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report    - `sunchun`：/assgn @fitZepHYr    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 0分
  - 痛点原因：仅由MR合并自动关闭且说明仅7字，无方案文档沉淀与复用指引，无法为后续类似需求提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `zhanw_coding`：/assign    - `cann-robot`：assigned to @zhanw_coding    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无人工总结解决方案与文档，且存在无效指派，对其他用户无复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063    - `cann-robot`：add label resolved    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：assigned to @weixin_44564637
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 0分
  - 痛点原因：无方案文档化记录，关闭说明仅7字且由机器人自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - `cann-robot`：add label resolved    - `wym_666`：/assign    - `cann-robot`：assigned to @wym_666    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 0分
  - 痛点原因：关闭说明仅7字，无方案文档化与重复链接，仅由机器人因关联合并关闭，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - `cann-robot`：add label resolved    - `cai-chengchao`：/assign    - `cann-robot`：assigned to @cai-chengchao    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，关闭说明为0字且无方案文档，未沉淀任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)
- **[#2057](https://gitcode.com/cann/ops-math/issues/2057) [Bug-Report|缺陷反馈]: C++ Clean Code规范整改** — 0分
  - 痛点原因：仅因关联MR合并自动关闭，无方案文档沉淀且无关联主链接，关闭说明简短，无法提供后续复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2057    - `doufloat`：add label bug-report    - `cann-robot`：add label resolved    - `doufloat`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue is already assigned to ***doufloat***. Please do not assign repeatedly.    - [关联PR #3563（merged）](https://gitcode.com/cann/ops-math/merge_requests/3563)
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，无方案文档沉淀，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与重复链接，仅靠机器人因MR合并自动关闭，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `sunzhongwen1`：/assign    - `cann-robot`：assigned to @sunzhongwen1    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及关联链接，仅由机器人自动关闭，导致无任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：关闭说明为空且未沉淀方案文档，仅由机器人自动关闭，未留下可复用的经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 0分
  - 痛点原因：关闭说明仅靠机器人自动留言关联MR，无方案文档化记录与重复主链接，缺乏可供复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：assigned to @jzj007
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无关闭说明、方案文档及重复链接，未沉淀复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅由机器人随关联PR合并自动关闭，未沉淀可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，无方案文档记录与人工关闭说明，无法为后续同类问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，无人工关闭说明、方案文档化及重复链接，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，关闭说明为0字，无方案文档沉淀，未留下可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)
- **[#2035](https://gitcode.com/cann/ops-math/issues/2035) [Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及复用链接，未沉淀有效信息供社区参考。
  - 原文依据：
    - `m0_53222058`：/assign [@m0_53222058](https://gitcode.com/m0_53222058)    - `cann-robot`：assigned to @m0_53222058    - [关联PR #3489（open）](https://gitcode.com/cann/ops-math/merge_requests/3489)
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 0分
  - 痛点原因：关闭时仅变更状态和打标签，无方案文档记录与重复 issue 关联，关闭说明信息量不足，缺乏复用参考价值。
  - 原文依据：
    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub    - `fullt`：add label requirement    - `cann-robot`：add label Accepted    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化与重复链接，仅由机器人因关联PR合并自动关闭，未沉淀复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 0分
  - 痛点原因：关闭说明为空且无方案文档与dup链接，仅记录指派操作，未沉淀任何可复用信息。
  - 原文依据：
    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅靠机器人关联PR自动关闭，未沉淀排查过程与解决方案供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人自动关闭并关联PR，无人工关闭说明与方案文档，缺乏可复用的经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档，未沉淀任何可供其他用户复用的解决经验。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅由机器人因关联PR合并自动关闭，未留下任何可供复用的需求实现细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅靠机器人关联PR合并自动关闭，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：关闭说明仅为机器人自动生成的合并提示，无方案文档沉淀与主链接关联，未留下有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - `cann-robot`：add label resolved    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：assigned to @cwzhang    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档，仅由机器人因关联MR合并自动关闭，未留下任何可供复用的解决思路。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `wangpengbo26`：/assign    - `cann-robot`：assigned to @wangpengbo26    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 0分
  - 痛点原因：关闭说明仅机器人自动回复合并信息，无方案文档沉淀及关联主issue链接，无法供后续复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `cann-robot`：assigned to @h1234515    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人自动关闭并关联PR，未留下任何可供复用的排查经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化沉淀，仅靠机器人自动关联PR关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 25分
  - 痛点原因：关闭说明为机器人自动生成的简短模板，未提供关联主issue链接且无方案文档沉淀，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - `cann-robot`：add label resolved    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：assigned to @Almost_CANN    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 25分
  - 痛点原因：关闭说明仅为机器人关联MR的模板话术，无方案文档化沉淀与人工经验补充，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - `cann-robot`：add label resolved    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：assigned to @hw-zhangpanpan    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 25分
  - 痛点原因：无方案文档化且无dup主链接，关闭说明仅提及关联MR合并，缺乏可供复用的技术细节与解决路径。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `cann-robot`：assigned to @wangqi_ai    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)
- **[#2071](https://gitcode.com/cann/ops-math/issues/2071) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 25分
  - 痛点原因：缺少方案文档与重复issue链接，且关闭说明仅51字过于简略，未留下可复用的有效信息。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `wangqi_ai`：add label requirement    - `cann-robot`：add label Accepted    - `sunchun`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `sunchun`：您好，您的issue重复提交了，当前计划关闭该issue。
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 25分
  - 痛点原因：仅靠机器人留下简短的关联MR关闭说明，无根因分析、解决方案及文档沉淀，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `cann-robot`：assigned to @tianqiguang    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 25分
  - 痛点原因：仅靠机器人自动关联合并请求关闭，无人工总结的解决方案与方案文档化，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `yangjinwen`：assigned to @yangjinwen
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 25分
  - 痛点原因：仅由系统合并请求自动关闭，无方案文档化沉淀且关闭说明简短，缺乏根因分析与解决细节，无法供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `cann-robot`：assigned to @onanfield    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 25分
  - 痛点原因：仅由机器人因MR合并自动关闭，无人工根因分析与方案文档，其他用户无法从中获取排查经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `cann-robot`：assigned to @caoyan_huawei    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 25分
  - 痛点原因：关闭说明仅为机器人关联MR合并的自动回复，无方案文档化与dup主链接，未留下可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `xuejinghui`：assigned to @xuejinghui
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 25分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档与重复链接，关闭说明简短，未沉淀任何需求实现细节供复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - `cann-robot`：add label resolved    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：assigned to @Almost_CANN    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 25分
  - 痛点原因：因无方案文档和重复主链接，且关闭说明仅53字，仅靠系统自动关闭，未留下可复用的有效信息。
  - 原文依据：
    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 25分
  - 痛点原因：关闭说明仅简单提及关联合并的issue2039，无方案文档沉淀和具体解决细节，导致后续复用困难。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)
- **[#2037](https://gitcode.com/cann/ops-math/issues/2037) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 25分
  - 痛点原因：仅机器人因MR合并自动关闭，缺乏人工根因分析与方案文档沉淀，无关联链接，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2037    - `cann-robot`：add label resolved    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：assigned to @hw-zhangpanpan    - [关联PR #3523（merged）](https://gitcode.com/cann/ops-math/merge_requests/3523)
- **[#2036](https://gitcode.com/cann/ops-math/issues/2036) [Bug-Report|缺陷反馈]: bash build.sh --experimental 报错** — 25分
  - 痛点原因：仅靠机器人自动回复关联MR合并来关闭，缺乏人工总结的解决方案及文档化沉淀，无法为后续问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2036    - `cann-robot`：add label resolved    - `zhaohujie`：/assign [@zhaohujie](https://gitcode.com/zhaohujie)    - `cann-robot`：assigned to @zhaohujie    - [关联PR #3516（merged）](https://gitcode.com/cann/ops-math/merge_requests/3516)
- **[#2033](https://gitcode.com/cann/ops-math/issues/2033) [Requirement|需求建议]: 自定义稀疏矩阵乘cube-SpMM** — 25分
  - 痛点原因：仅引导用户去其他仓库提需求，无方案文档沉淀，关闭说明缺乏有效技术信息留存。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `songkai111`：你好，该算子建议放在ops-nn仓（http://gitcode.com/cann/ops-nn），请考虑在nn仓提出该需求。    - `mhhit`：好的，收到    - `sunchun`：您好，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 25分
  - 痛点原因：关闭说明仅说明因关联MR合并自动关闭，无方案文档与复用指引，对其他用户无参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - `cann-robot`：add label resolved    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：assigned to @gcw_8p1hhlB0    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)
- **[#2030](https://gitcode.com/cann/ops-math/issues/2030) [Bug-Report|缺陷反馈]: aclnnPolar A5修复超int32导致的精度问题** — 25分
  - 痛点原因：关闭说明仅机械指向关联issue且无方案文档化，缺乏可复用的排查与修复细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2030    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `sunchun`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `cann-robot`：assigned to @xiu_ling_wang    - [关联PR #3497（merged）](https://gitcode.com/cann/ops-math/merge_requests/3497)
- **[#2024](https://gitcode.com/cann/ops-math/issues/2024) [Requirement|需求建议]: 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 25分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，无人工方案总结与文档沉淀，无法为后续类似需求提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2024    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111    - [关联PR #3481（merged）](https://gitcode.com/cann/ops-math/merge_requests/3481)
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 25分
  - 痛点原因：维护者仅纠正用户提问笔误即关闭，无实质解决方案且未文档化，用户仍求助却被关闭，无复用价值。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 25分
  - 痛点原因：无方案文档化记录，关闭说明简略且仅由系统自动关闭，未沉淀可复用的根因与修复经验。
  - 原文依据：
    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 25分
  - 痛点原因：无方案文档沉淀，关闭说明仅为机器人自动关联合并请求，缺乏人工经验总结，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - `cann-robot`：add label resolved    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：assigned to @focusforce    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)
- **[#2012](https://gitcode.com/cann/ops-math/issues/2012) [Requirement|需求建议]: install.sh 新增 --check 选项用于安装前依赖版本校验** — 25分
  - 痛点原因：关闭说明仅由机器人留下简短关联信息，缺乏方案文档与代码链接，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2012    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111    - [关联PR #3453（merged）](https://gitcode.com/cann/ops-math/merge_requests/3453)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 30分
  - 痛点原因：关闭说明为0字，仅靠系统状态和标签变更关闭，未留下任何文字总结供后续复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人自动关闭，未沉淀最终修复方案与经验，难以供后续类似问题参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2018](https://gitcode.com/cann/ops-math/issues/2018) [Requirement|需求建议]: KthValue算子支持950PR/950DT** — 45分
  - 痛点原因：关闭说明虽长但多为机器人自动记录，缺乏方案文档沉淀与关联链接，无人工总结，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `ConanHuang`：add label requirement    - `ConanHuang`：add label resolved    - `cann-robot`：add label Accepted    - `ConanHuang`：# 非尾轴排序 Tiling 核心逻辑 ## 核心概念 非尾轴排序的 **batch/tile 不是 segment（排序行），而是 inner 位置的分组**。 ``` 尾轴：batchId = segmentId（每批处理若干排序行）…
- **[#2074](https://gitcode.com/cann/ops-math/issues/2074) [Bug-Report|缺陷反馈]: FusedMulAddAdd infershape 与 op_proto 不一致（误用广播且接受动态 shape）** — 55分
  - 痛点原因：关闭说明仅59字且为机器人自动关联MR生成，缺乏人工补充的详细解决方案与复用链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2074    - `pingchuantang`：add label bug-report    - `cann-robot`：add label resolved    - `pingchuantang`：/assign [@pingchuantang](https://gitcode.com/pingchuantang)    - `cann-robot`：assigned to @pingchuantang    - [关联PR #3595（merged）](https://gitcode.com/cann/ops-math/merge_requests/3595)
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 55分
  - 痛点原因：未关联重复issue主链接，且关闭说明仅56字过于简略，缺乏详细的解决方案复用指引。
  - 原文依据：
    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成    - `m0_55003149`：add label documentation    - `cann-robot`：add label Accepted    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `cann-robot`：assigned to @m0_55003149
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 55分
  - 痛点原因：关闭说明仅56字且未提供重复issue主链接，仅靠系统状态流转和codehub操作关闭，缺乏复用价值。
  - 原文依据：
    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成    - `m0_55003149`：changed custom state from 已完成 to 已确认    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted
- **[#2021](https://gitcode.com/cann/ops-math/issues/2021) [Requirement|需求建议]: 【社区任务】BiasAdd 算子(Ascend 910B AscendC 实现)** — 55分
  - 痛点原因：关闭说明仅57字且未关联重复issue主链接，导致其他用户难以复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2021    - `cann-robot`：add label resolved    - `gcw_5x5Ew5Ms`：/assign [@gcw_5x5Ew5Ms](https://gitcode.com/gcw_5x5Ew5Ms)    - `cann-robot`：assigned to @gcw_5x5Ew5Ms    - `fullt`：assigned to @fullt    - [关联PR #3470（merged）](https://gitcode.com/cann/ops-math/merge_requests/3470)
#### PP-02 分流阶段标签与责任归属严重不足（I1 · 分配与首次响应）

- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 0分
  - 痛点原因：仅有机器人指派和关联关闭操作，全程无人工实质性回应。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 0分
  - 痛点原因：首次响应仅为指派人员，后续全由机器人自动加标签并关闭，全程无人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)
- **[#2074](https://gitcode.com/cann/ops-math/issues/2074) [Bug-Report|缺陷反馈]: FusedMulAddAdd infershape 与 op_proto 不一致（误用广播且接受动态 shape）** — 0分
  - 痛点原因：仅执行了指派和打标签等机械操作，始终未对缺陷报告提供实质性的技术分析与回应。
  - 原文依据：
    - `pingchuantang`：/assign [@pingchuantang](https://gitcode.com/pingchuantang)    - `pingchuantang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @pingchuantang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2074    - [关联PR #3595（merged）](https://gitcode.com/cann/ops-math/merge_requests/3595)
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 0分
  - 痛点原因：首次响应仅添加标签，后续直接由机器人关闭，全程无人工实质回应。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 0分
  - 痛点原因：仅执行了指派和打标签操作，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangqi_ai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 0分
  - 痛点原因：仅机器人执行了失败的指派和加标签操作，全程无人工实质回应即被标记解决。
  - 原文依据：
    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 0分
  - 痛点原因：首次响应超65小时且仅有机器人认领操作，始终无任何实质性的技术讨论或反馈。
  - 原文依据：
    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)
- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：维护者仅添加标签并关闭了该缺陷反馈，未提供任何首次响应或实质性技术解答。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `tan_xin`：closed from codehub
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 0分
  - 痛点原因：仅进行了分配和加标签等机械操作，始终未对文档错误提供实质性解答或处理。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 0分
  - 痛点原因：维护者仅进行了分配操作，无任何实质性技术回应，直接由机器人因关联MR合并关闭。
  - 原文依据：
    - `tieyutong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tieyutong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)
- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 0分
  - 痛点原因：仅有分派和打标签的机械响应，全程无人工实质技术回复，最终由机器人直接关闭。
  - 原文依据：
    - `sunchun`：/assgn @fitZepHYr    - `VoyageZhou`：add label bug-report    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 0分
  - 痛点原因：仅机器人分配和打标签，无任何针对需求内容的实质性讨论或解答。
  - 原文依据：
    - `zhanw_coding`：/assign    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 0分
  - 痛点原因：全程仅执行了无效指派操作，无任何针对需求的技术解答，且被机器人直接关闭。
  - 原文依据：
    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weixin_44564637    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无开发者提供实质性的技术解答。
  - 原文依据：
    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tianqiguang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 0分
  - 痛点原因：被指派人仅添加标签且机器人直接标记已解决，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved    - `yangjinwen`：assigned to @yangjinwen    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 0分
  - 痛点原因：全程仅由机器人分配和关闭，无任何人工实质回应。
  - 原文依据：
    - `wym_666`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wym_666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 0分
  - 痛点原因：仅机器人自动分配和关闭，全程无人工实质回应。
  - 原文依据：
    - `cai-chengchao`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cai-chengchao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 0分
  - 痛点原因：全程仅进行打标签和分配操作，在机器人自动关闭前，维护者未提供任何实质性的技术回应。
  - 原文依据：
    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)
- **[#2057](https://gitcode.com/cann/ops-math/issues/2057) [Bug-Report|缺陷反馈]: C++ Clean Code规范整改** — 0分
  - 痛点原因：仅快速分配和打标签，全程无任何实质性技术回应，直接被机器人标记为resolved。
  - 原文依据：
    - `doufloat`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue is already assigned to ***doufloat***. Please do not assign repeatedly.    - `doufloat`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2057    - [关联PR #3563（merged）](https://gitcode.com/cann/ops-math/merge_requests/3563)
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 0分
  - 痛点原因：维护者仅指派和加标签，机器人直接标记已解决，全程无任何实质性技术回应。
  - 原文依据：
    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @onanfield    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 0分
  - 痛点原因：仅分配任务和添加标签，全程无人工针对缺陷内容的实质性分析或解答。
  - 原文依据：
    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 0分
  - 痛点原因：仅打标签后直接由机器人关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 0分
  - 痛点原因：维护者仅执行了分配和打标签等机械操作，未对需求内容进行任何实质性的解答与沟通。
  - 原文依据：
    - `sunzhongwen1`：/assign    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunzhongwen1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 0分
  - 痛点原因：仅进行了指派和加标签操作，全程未对需求提供任何实质性技术回应。
  - 原文依据：
    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `xuejinghui`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 0分
  - 痛点原因：首次响应超15小时，且全程仅有机器人自动分配与关闭，无任何人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：全程仅机器人自动响应并随关联PR合并关闭，无任何人工实质回应，故得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 0分
  - 痛点原因：用户自行指派并直接关闭issue，全程未对文档错误提供任何实质性回应。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：close    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：仅机器人打标签后随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 0分
  - 痛点原因：全程仅机器人加标签和开发者关闭修改状态，无任何实质性文字回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 0分
  - 痛点原因：仅有机器人加标签和指派操作，始终无人工对缺陷进行实质性分析或回应。
  - 原文依据：
    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @jzj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 0分
  - 痛点原因：仅打标签后由机器人关联PR直接关闭，全程无人工实质回应。
  - 原文依据：
    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，未对需求进行任何实质性的技术或业务回应。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @songkai111    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：全程由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 0分
  - 痛点原因：仅通过机器人加标签和关联PR关闭，全程无人工对缺陷进行实质性技术回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：仅打标签后由机器人关联PR合并关闭，全程无实质回应。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 0分
  - 痛点原因：维护者仅分配任务和加标签，无任何实质性内容回应，且被机器人直接关闭。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：全程仅机器人加标签及合并PR后自动关闭，无任何人工实质回应。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)
- **[#2036](https://gitcode.com/cann/ops-math/issues/2036) [Bug-Report|缺陷反馈]: bash build.sh --experimental 报错** — 0分
  - 痛点原因：仅进行了指派和机器人自动关闭操作，全程无针对报错问题的实质性技术回应。
  - 原文依据：
    - `zhaohujie`：/assign [@zhaohujie](https://gitcode.com/zhaohujie)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaohujie    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2036    - [关联PR #3516（merged）](https://gitcode.com/cann/ops-math/merge_requests/3516)
- **[#2035](https://gitcode.com/cann/ops-math/issues/2035) [Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅机器人自动分配负责人并关联PR，全程无人工技术评估或实质性讨论。
  - 原文依据：
    - `m0_53222058`：/assign [@m0_53222058](https://gitcode.com/m0_53222058)    - `cann-robot`：assigned to @m0_53222058    - [关联PR #3489（open）](https://gitcode.com/cann/ops-math/merge_requests/3489)
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：全程仅机器人加标签及关联PR自动关闭，无任何人工实质回应沟通。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 0分
  - 痛点原因：17小时后仅有指派操作，全程无人工实质技术回应，最终仅靠机器人自动关闭。
  - 原文依据：
    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_8p1hhlB0    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)
- **[#2030](https://gitcode.com/cann/ops-math/issues/2030) [Bug-Report|缺陷反馈]: aclnnPolar A5修复超int32导致的精度问题** — 0分
  - 痛点原因：首次响应耗时18.33小时，且全程仅有指派和加标签等机械操作，始终未提供实质性技术解答。
  - 原文依据：
    - `sunchun`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2030    - [关联PR #3497（merged）](https://gitcode.com/cann/ops-math/merge_requests/3497)
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 0分
  - 痛点原因：首次响应仅为分配任务，且全程无针对需求的技术讨论或实质回应，导致得分为零。
  - 原文依据：
    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人因关联PR合并自动关闭并加标签，未对缺陷进行解答。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并而关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 0分
  - 痛点原因：首次响应仅添加标签，后续由机器人直接关闭，全程无人工实质回应说明问题处理情况。
  - 原文依据：
    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2024](https://gitcode.com/cann/ops-math/issues/2024) [Requirement|需求建议]: 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 0分
  - 痛点原因：维护者仅执行了分配任务和添加标签操作，随后被机器人标记为已解决，全程无任何针对需求的技术讨论或实质回复。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2024    - [关联PR #3481（merged）](https://gitcode.com/cann/ops-math/merge_requests/3481)
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：全程仅有打标签和机器人自动关闭操作，无任何人工实质性回应。
  - 原文依据：
    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 0分
  - 痛点原因：首次响应仅加标签，全程无人工实质技术回应，直接由机器人关闭，缺乏有效沟通。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2021](https://gitcode.com/cann/ops-math/issues/2021) [Requirement|需求建议]: 【社区任务】BiasAdd 算子(Ascend 910B AscendC 实现)** — 0分
  - 痛点原因：仅存在机器人指派和加标签操作，全程无任何实质性人工回复。
  - 原文依据：
    - `gcw_5x5Ew5Ms`：/assign [@gcw_5x5Ew5Ms](https://gitcode.com/gcw_5x5Ew5Ms)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_5x5Ew5Ms    - `fullt`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2021    - [关联PR #3470（merged）](https://gitcode.com/cann/ops-math/merge_requests/3470)
- **[#2018](https://gitcode.com/cann/ops-math/issues/2018) [Requirement|需求建议]: KthValue算子支持950PR/950DT** — 0分
  - 痛点原因：首次响应仅为技术笔记与机器人指令，未对需求建议提供实质性解答便直接关闭。
  - 原文依据：
    - `ConanHuang`：# 非尾轴排序 Tiling 核心逻辑 ## 核心概念 非尾轴排序的 **batch/tile 不是 segment（排序行），而是 inner 位置的分组**。 ``` 尾轴：batchId = segmentId（每批处理若干排序行）…    - `ConanHuang`：/assign    - `ConanHuang`：/close    - `ConanHuang`：add label requirement    - `ConanHuang`：add label resolved    - `cann-robot`：add label Accepted
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 0分
  - 痛点原因：全程仅由机器人指派并因关联MR自动关闭，无任何人工实质技术回应。
  - 原文依据：
    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @focusforce    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅有开发者认领和机器人加标签、关闭等操作，全程无针对需求内容的实质性技术回应。
  - 原文依据：
    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cwzhang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 0分
  - 痛点原因：仅认领任务和加标签，全程无任何实质性技术回应即被机器人关闭。
  - 原文依据：
    - `wangpengbo26`：/assign    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangpengbo26    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 0分
  - 痛点原因：首次响应仅分配人员和添加标签，全程无针对该需求建议的实质讨论或解答。
  - 原文依据：
    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @h1234515    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人关联PR合并后自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2012](https://gitcode.com/cann/ops-math/issues/2012) [Requirement|需求建议]: install.sh 新增 --check 选项用于安装前依赖版本校验** — 0分
  - 痛点原因：维护者仅分配任务和打标签，机器人直接关闭问题，全程无任何针对需求的技术讨论或实质回应。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2012    - [关联PR #3453（merged）](https://gitcode.com/cann/ops-math/merge_requests/3453)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 0分
  - 痛点原因：首次响应仅加标签，全程无人工实质回应，直接由机器人关联PR合并关闭。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 40分
  - 痛点原因：分配后近一周无技术跟进致用户催问，直到171小时后才索要测试代码并给出实质建议。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
#### PP-03 讨论深度不足评论数极低（I2 · 讨论与解决）

- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：仅通过codehub关闭并打标签，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：虽有关联PR被合并，但缺少commit引用、文档及release链接等直接解决证据，仅由机器人关闭并标记resolved。
  - 原文依据：
    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏commit、文档及release等直接解决证据，且仅靠机器人自动关闭，无人工确认评论。
  - 原文依据：
    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：虽关联PR已合并，但无commit引用、文档及release链接，且仅由机器人自动关闭无人工说明，解决证据不足。
  - 原文依据：
    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档链接、release记录及人工关闭评论，仅靠机器人自动关闭，证据不足。
  - 原文依据：
    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved
- **[#2035](https://gitcode.com/cann/ops-math/issues/2035) [Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅完成任务分配，关联PR未合并，缺乏commit、文档及release等实质解决证据。
  - 原文依据：
    - [关联PR #3489（open）](https://gitcode.com/cann/ops-math/merge_requests/3489)    - `m0_53222058`：/assign [@m0_53222058](https://gitcode.com/m0_53222058)    - `cann-robot`：assigned to @m0_53222058
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人关联 PR 自动关闭，缺少 commit 引用、文档链接和人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit、文档或release引用，仅由机器人自动关闭，缺乏人工解决证据。
  - 原文依据：
    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅有关联PR与机器人自动关闭，缺乏commit引用、文档链接及release版本等实质性修复落地证据。
  - 原文依据：
    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 15分
  - 痛点原因：虽有合并PR，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 15分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论说明解决详情，且无commit引用与文档链接佐证。
  - 原文依据：
    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 15分
  - 痛点原因：虽有合并的PR，但无commit引用和人工关闭评论，仅由机器人自动关闭，缺乏修复验证说明。
  - 原文依据：
    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 15分
  - 痛点原因：仅靠系统自动关闭，缺乏commit引用、release说明及关闭评论，未留下人工补充的解决证据。
  - 原文依据：
    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，无人工关闭评论、commit引用及文档链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，无commit引用、修复说明或测试验证记录等具体解决证据。
  - 原文依据：
    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与文档链接，且仅靠机器人自动关闭，无人工确认解决的关闭评论。
  - 原文依据：
    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭并打标签，缺乏人工关闭评论、commit引用及文档链接等实质性修复说明。
  - 原文依据：
    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 15分
  - 痛点原因：虽有合并PR与机器人关闭说明，但缺乏commit引用、release引用及人工确认的关闭评论，导致证据强度不足。
  - 原文依据：
    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及人工关闭评论，导致证据链不完整。
  - 原文依据：
    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 15分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏commit引用、文档链接及人工确认的关闭评论，导致证据不足。
  - 原文依据：
    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭记录，缺乏commit引用、文档及release链接等直接可追溯的解决证据。
  - 原文依据：
    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release说明等强证据支撑，证据链单薄。
  - 原文依据：
    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 23分
  - 痛点原因：虽有合并的关联PR和机器人关闭评论，但缺乏commit、文档及release等强解决证据。
  - 原文依据：
    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangqi_ai
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等实质性解决证据，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)    - `tieyutong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tieyutong
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 23分
  - 痛点原因：仅关联PR并由机器人自动关闭，缺乏commit引用、文档链接及release说明等实质性解决证据。
  - 原文依据：
    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)    - `zhanw_coding`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 23分
  - 痛点原因：虽有合并的PR，但无commit、文档及release引用等实质性解决证据，且评论多为无效的分配操作。
  - 原文依据：
    - [关联PR #3569（merged）](https://gitcode.com/cann/ops-math/merge_requests/3569)    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063    - `cann-robot`：add label resolved
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，仅靠机器人自动关闭，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #3575（merged）](https://gitcode.com/cann/ops-math/merge_requests/3575)    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 23分
  - 痛点原因：虽有合并的关联PR及机器人自动关闭，但缺乏commit引用、文档链接与release引用等直接解决证据。
  - 原文依据：
    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)    - `cai-chengchao`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cai-chengchao
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caoyan_huawei
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭评论，未提供commit、文档及release等实质性解决证据。
  - 原文依据：
    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)    - `sunzhongwen1`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunzhongwen1
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 23分
  - 痛点原因：仅靠机器人关联PR自动关闭并打标签，缺乏commit引用、文档链接和release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 23分
  - 痛点原因：仅有关联PR和机器人自动关闭评论，缺乏commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111
- **[#2037](https://gitcode.com/cann/ops-math/issues/2037) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 23分
  - 痛点原因：虽有合并的关联PR，但仅依赖机器人自动关闭，缺乏commit、文档及release等实质性引用支撑。
  - 原文依据：
    - [关联PR #3523（merged）](https://gitcode.com/cann/ops-math/merge_requests/3523)    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2037    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 23分
  - 痛点原因：仅通过评论解释现状并引导去其他仓提需求，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭记录，缺少commit引用、文档链接与release说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @focusforce
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 23分
  - 痛点原因：虽有合并PR和机器人关闭记录，但缺乏commit引用、文档链接与release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cwzhang
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 23分
  - 痛点原因：仅靠机器人关联PR并关闭，缺乏commit引用、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @h1234515
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 31分
  - 痛点原因：虽有合并PR，但缺乏文档链接、release引用及关闭评论，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 31分
  - 痛点原因：无关联PR与修复文档，开发者仅要求提供复现代码，用户追问进度后无实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 38分
  - 痛点原因：虽有关联PR，但关闭由机器人自动触发且指向其他关联issue，无直接commit引用与明确解决说明。
  - 原文依据：
    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 38分
  - 痛点原因：虽有关联PR，但缺少commit和release引用，且关闭评论仅为系统自动操作，解决证据链不完整。
  - 原文依据：
    - [关联PR #3585（closed）](https://gitcode.com/cann/ops-math/merge_requests/3585)    - [关联PR #3586（merged）](https://gitcode.com/cann/ops-math/merge_requests/3586)    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成    - `m0_55003149`：add label documentation
- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 38分
  - 痛点原因：关闭评论仅为分配指令，缺乏修复方案说明，且无commit引用与文档链接佐证，导致证据薄弱。
  - 原文依据：
    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)    - `sunchun`：/assgn @fitZepHYr    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit引用和文档链接，且仅由机器人自动关闭，无人工补充解决细节，证据不足。
  - 原文依据：
    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)    - `wym_666`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wym_666
- **[#2057](https://gitcode.com/cann/ops-math/issues/2057) [Bug-Report|缺陷反馈]: C++ Clean Code规范整改** — 38分
  - 痛点原因：虽关联多个已合并PR，但缺少commit引用与文档链接，导致解决情况缺乏直接证据。
  - 原文依据：
    - [关联PR #3563（merged）](https://gitcode.com/cann/ops-math/merge_requests/3563)    - [关联PR #3596（merged）](https://gitcode.com/cann/ops-math/merge_requests/3596)    - [关联PR #3612（merged）](https://gitcode.com/cann/ops-math/merge_requests/3612)    - [关联PR #3636（merged）](https://gitcode.com/cann/ops-math/merge_requests/3636)    - [关联PR #4026（merged）](https://gitcode.com/cann/ops-math/merge_requests/4026)    - `doufloat`：/assign [@doufloat](https://gitcode.com/doufloat)
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 38分
  - 痛点原因：缺乏commit引用和文档链接，仅靠关联PR和机器人自动关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @onanfield
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 38分
  - 痛点原因：虽有合并的关联PR，但未提供直接的commit引用和release版本说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3539（closed）](https://gitcode.com/cann/ops-math/merge_requests/3539)    - [关联PR #3560（merged）](https://gitcode.com/cann/ops-math/merge_requests/3560)    - [关联PR #3566（merged）](https://gitcode.com/cann/ops-math/merge_requests/3566)    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：close    - `m0_55003149`：closed from codehub
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 38分
  - 痛点原因：仅有关联PR与自动关闭记录，缺少commit引用和文档链接，解决过程证据链不完整。
  - 原文依据：
    - [关联PR #3525（merged）](https://gitcode.com/cann/ops-math/merge_requests/3525)    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 38分
  - 痛点原因：关联PR未合并且处于关闭状态，无commit引用、文档或release等修复落地证据，仅靠评论讨论无法证明问题已彻底解决。
  - 原文依据：
    - [关联PR #3506（closed）](https://gitcode.com/cann/ops-math/merge_requests/3506)    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…    - `Mars_Cheng_cys`：我在开发编译as_strided算子时遇到同样问题 排查发现 ops-math/experimental/CMakeLists.txt中 ${CMAKE_SOURCE_DIR}/conversion/as_strided/op_api/a…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit引用、文档链接及详细的修复验证说明，仅简单声明已解决。
  - 原文依据：
    - [关联PR #3564（merged）](https://gitcode.com/cann/ops-math/merge_requests/3564)    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无文档链接与关闭评论作为解决佐证。
  - 原文依据：
    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2
- **[#2071](https://gitcode.com/cann/ops-math/issues/2071) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 54分
  - 痛点原因：因被判定为重复提交而关闭，缺乏关联PR、文档及release等直接解决证据，导致证据不足。
  - 原文依据：
    - `sunchun`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `sunchun`：您好，您的issue重复提交了，当前计划关闭该issue。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `wangqi_ai`：add label requirement    - `cann-robot`：add label Accepted
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 54分
  - 痛点原因：虽有关联PR和commit引用，但缺少文档与release引用，且仅由机器人自动关闭，缺乏人工对解决结果的明确说明。
  - 原文依据：
    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tianqiguang
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，且仅由机器人因关联MR合并自动关闭，缺乏人工确认解决证据。
  - 原文依据：
    - [关联PR #3520（merged）](https://gitcode.com/cann/ops-math/merge_requests/3520)    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 54分
  - 痛点原因：虽有 PR 和 commit，但无文档与 release 引用，且关闭评论仅为系统状态变更，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #3532（closed）](https://gitcode.com/cann/ops-math/merge_requests/3532)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 54分
  - 痛点原因：虽有合并PR和commit引用，但缺少文档链接与release引用，且仅由机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_8p1hhlB0
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 54分
  - 痛点原因：虽有合并的PR，但缺乏文档链接与release引用，且关闭评论仅为机器人自动回复，无人工说明。
  - 原文依据：
    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)    - `wangpengbo26`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangpengbo26
#### PP-04 Bot误关闭风险高且部分issue缺位（G · Bot/Agent 治理）

- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 0分
  - 痛点原因：Bot仅执行了关联PR合并后的自动关闭，未进行打标和评论，治理动作单一。
  - 原文依据：
    - `sunchun`：/assgn @fitZepHYr    - `VoyageZhou`：add label bug-report    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 15分
  - 痛点原因：Bot仅执行了指派拦截与确认，未进行打标或关闭等实质性治理动作，治理效能极低。
  - 原文依据：
    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)
- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 20分
  - 痛点原因：Bot仅机械执行打标、指派与关闭，全程零评论，缺乏对用户的互动解释，治理过程无效。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论与用户沟通，缺乏治理透明度与有效互动。
  - 原文依据：
    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)
- **[#2074](https://gitcode.com/cann/ops-math/issues/2074) [Bug-Report|缺陷反馈]: FusedMulAddAdd infershape 与 op_proto 不一致（误用广播且接受动态 shape）** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，全程无任何评论互动，缺乏有效引导与状态反馈。
  - 原文依据：
    - `pingchuantang`：/assign [@pingchuantang](https://gitcode.com/pingchuantang)    - `pingchuantang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @pingchuantang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2074    - [关联PR #3595（merged）](https://gitcode.com/cann/ops-math/merge_requests/3595)
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 20分
  - 痛点原因：Bot仅机械打标与关闭，全程零评论，缺乏进度同步与有效互动反馈。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 20分
  - 痛点原因：Bot仅机械执行分配与打标，直接关闭issue且无任何评论说明，缺乏有效互动与治理过程，治理流于形式。
  - 原文依据：
    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangqi_ai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)
- **[#2071](https://gitcode.com/cann/ops-math/issues/2071) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 20分
  - 痛点原因：Bot仅完成打标，未对人工判定重复并计划关闭的issue执行自动关闭或评论互动，治理动作缺失。
  - 原文依据：
    - `sunchun`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `sunchun`：您好，您的issue重复提交了，当前计划关闭该issue。    - `wangqi_ai`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wangqi_ai    - `sunchun`：closed from codehub
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 20分
  - 痛点原因：Bot仅执行打标与分配，无评论互动且未自动关闭issue，治理未闭环。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 20分
  - 痛点原因：Bot仅机械执行指派、打标及随MR合并自动关闭，无可见评论与用户沟通，治理缺乏透明度与互动性。
  - 原文依据：
    - `tieyutong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tieyutong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 20分
  - 痛点原因：Bot直接给需求建议打标resolved并关闭，全程无任何评论说明，治理机械无效。
  - 原文依据：
    - `zhanw_coding`：/assign    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 20分
  - 痛点原因：Bot仅完成打标与指派，无自动评论引导，且初始标签需人工补充，自动化治理闭环不足。
  - 原文依据：
    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tianqiguang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 20分
  - 痛点原因：Bot仅执行了打标、指派和关闭等状态变更操作，但全程无任何评论交互，缺乏有效治理反馈。
  - 原文依据：
    - `wym_666`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wym_666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭操作，零评论无实质治理互动，未真正推动问题解决。
  - 原文依据：
    - `cai-chengchao`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cai-chengchao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 20分
  - 痛点原因：Bot仅完成打标与关联关闭，无任何评论互动与进度同步，治理动作单一且缺乏有效跟进。
  - 原文依据：
    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 20分
  - 痛点原因：Bot执行了关闭和打标动作但全程无任何评论说明，治理过程不透明且缺乏有效互动。
  - 原文依据：
    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @onanfield    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 20分
  - 痛点原因：Bot仅执行打标与分配，但全程无任何评论互动，缺乏有效治理说明，导致治理效果不佳。
  - 原文依据：
    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，未产生任何评论互动，缺乏状态同步与原因说明，导致治理过程不透明。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 20分
  - 痛点原因：Bot将需求建议误标为resolved且无任何评论说明，机械执行打标与分配导致治理无效。
  - 原文依据：
    - `sunzhongwen1`：/assign    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunzhongwen1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 20分
  - 痛点原因：Bot仅静默执行打标、分配和关闭操作，评论数为零，缺乏与用户的交互反馈。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论互动，缺乏过程透明度与用户沟通，导致治理效果极差。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 20分
  - 痛点原因：Bot仅执行打标与分配，未自动关闭issue且无评论互动，治理动作不完整。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：close    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 20分
  - 痛点原因：Bot仅执行打标和关闭，全程无评论，缺乏状态同步与用户引导。
  - 原文依据：
    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 20分
  - 痛点原因：Bot仅执行打标，无自动评论与关闭机制，最终依赖人工关闭，未实现有效闭环管理。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，全程无任何评论互动，缺乏对用户的反馈与引导。
  - 原文依据：
    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @jzj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 20分
  - 痛点原因：Bot仅默默执行打标和关闭操作，全程无任何评论互动，缺乏状态同步与原因说明，治理过程不透明。
  - 原文依据：
    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，无自动评论引导或关闭等主动治理动作，未发挥实际管理作用。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @songkai111    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成
- **[#2043](https://gitcode.com/cann/ops-math/issues/2043) [Bug-Report|缺陷反馈]: 新增 Im2col 算子，复用已有 op_api 时同名 op type 导致 aclnn 调用返回 561103** — 20分
  - 痛点原因：Bot仅完成打标，无自动评论互动与关闭动作，最终依赖人工关闭，治理动作严重缺失。
  - 原文依据：
    - `songkai111`：在复现问题的场景中，可以加一下export ASCEND_GLOBAL_LOG_LEVEL=0和export ASCEND_SLOG_PRINT_TO_STDOUT=1环境变量，跑出来日志信息嘛？我们需要通过日志信息，进行问题定位    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，未向用户说明关闭原因及修复进度，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并直接关闭，全程无评论交互，缺乏状态流转与进度同步，治理过程生硬无效。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程无任何评论互动与说明，缺乏有效沟通，治理不透明。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 20分
  - 痛点原因：Bot无任何评论说明即自动将需求建议打标resolved并关闭，误关需求导致治理失效。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，未留下任何评论与用户互动，缺乏有效沟通与状态说明。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)
- **[#2037](https://gitcode.com/cann/ops-math/issues/2037) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 20分
  - 痛点原因：Bot仅机械执行分配、打标与自动关闭，评论数为0，缺乏对用户的有效反馈与互动，导致治理效果不佳。
  - 原文依据：
    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2037    - [关联PR #3523（merged）](https://gitcode.com/cann/ops-math/merge_requests/3523)
- **[#2036](https://gitcode.com/cann/ops-math/issues/2036) [Bug-Report|缺陷反馈]: bash build.sh --experimental 报错** — 20分
  - 痛点原因：Bot虽执行打标、指派和关闭操作，但评论数为零，未向用户说明处理原因与进度，缺乏有效沟通。
  - 原文依据：
    - `zhaohujie`：/assign [@zhaohujie](https://gitcode.com/zhaohujie)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaohujie    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2036    - [关联PR #3516（merged）](https://gitcode.com/cann/ops-math/merge_requests/3516)
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭或评论引导，导致该需求建议类issue完全依赖人工流转。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `fullt`：add label requirement    - `cann-robot`：add label Accepted
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无评论互动与进度同步，缺乏对用户的有效反馈。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭操作，无任何互动评论，导致治理过程缺乏有效沟通与反馈。
  - 原文依据：
    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_8p1hhlB0    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)
- **[#2030](https://gitcode.com/cann/ops-math/issues/2030) [Bug-Report|缺陷反馈]: aclnnPolar A5修复超int32导致的精度问题** — 20分
  - 痛点原因：关键标签依赖人工添加，Bot仅被动执行指派且无任何互动评论，缺乏主动识别与治理能力。
  - 原文依据：
    - `sunchun`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2030    - [关联PR #3497（merged）](https://gitcode.com/cann/ops-math/merge_requests/3497)
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 20分
  - 痛点原因：Bot仅随MR合并机械打标并关闭issue，未留下任何解释性评论与用户沟通，
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无评论互动，缺乏状态同步与原因解释，导致治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论无解释说明，导致治理过程不透明且缺乏互动。
  - 原文依据：
    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2024](https://gitcode.com/cann/ops-math/issues/2024) [Requirement|需求建议]: 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 20分
  - 痛点原因：Bot误将未解决的需求打上resolved标签并关闭，且无任何评论引导，治理动作完全失效。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2024    - [关联PR #3481（merged）](https://gitcode.com/cann/ops-math/merge_requests/3481)
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程无任何评论与社区互动，缺乏有效沟通反馈。
  - 原文依据：
    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，零评论互动导致治理流于表面。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2021](https://gitcode.com/cann/ops-math/issues/2021) [Requirement|需求建议]: 【社区任务】BiasAdd 算子(Ascend 910B AscendC 实现)** — 20分
  - 痛点原因：Bot仅机械执行分配打标与关闭，无任何评论说明与互动反馈，治理过程缺乏透明度。
  - 原文依据：
    - `gcw_5x5Ew5Ms`：/assign [@gcw_5x5Ew5Ms](https://gitcode.com/gcw_5x5Ew5Ms)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_5x5Ew5Ms    - `fullt`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2021    - [关联PR #3470（merged）](https://gitcode.com/cann/ops-math/merge_requests/3470)
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 20分
  - 痛点原因：Bot仅停留在初始打标阶段，未在问题解决后自动关闭issue或跟进，缺乏全流程治理。
  - 原文依据：
    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `Coder_Nerd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `Coder_Nerd`：assigned to @Coder_Nerd
- **[#2018](https://gitcode.com/cann/ops-math/issues/2018) [Requirement|需求建议]: KthValue算子支持950PR/950DT** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭指令，未留下任何解释性评论，缺乏有效沟通与治理说明。
  - 原文依据：
    - `ConanHuang`：# 非尾轴排序 Tiling 核心逻辑 ## 核心概念 非尾轴排序的 **batch/tile 不是 segment（排序行），而是 inner 位置的分组**。 ``` 尾轴：batchId = segmentId（每批处理若干排序行）…    - `ConanHuang`：/assign    - `ConanHuang`：/close    - `ConanHuang`：add label requirement    - `ConanHuang`：add label resolved    - `cann-robot`：add label Accepted
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 20分
  - 痛点原因：机器人仅机械执行分配、打标与关闭操作，评论数为零，未向用户说明关闭原因或进行有效沟通。
  - 原文依据：
    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @focusforce    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无任何解释性评论，缺乏状态变更说明与用户互动，治理过程不透明。
  - 原文依据：
    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cwzhang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 20分
  - 痛点原因：Bot未发任何评论即直接打标resolved关闭需求，治理动作机械且缺乏有效交互。
  - 原文依据：
    - `wangpengbo26`：/assign    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangpengbo26    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 20分
  - 痛点原因：Bot错误给需求建议打上resolved标签并关闭，治理动作不符合需求生命周期。
  - 原文依据：
    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @h1234515    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，评论数为零，缺乏对用户的沟通解释，治理无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2012](https://gitcode.com/cann/ops-math/issues/2012) [Requirement|需求建议]: install.sh 新增 --check 选项用于安装前依赖版本校验** — 20分
  - 痛点原因：Bot错误地将需求建议类issue标记为resolved且无任何评论说明，治理逻辑失效。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2012    - [关联PR #3453（merged）](https://gitcode.com/cann/ops-math/merge_requests/3453)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为0，缺乏有效沟通与状态引导，治理过程不透明。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 35分
  - 痛点原因：Bot机械执行打标和关闭，阻断了用户指派请求且在无实际修复时错误标记为resolved，治理失效。
  - 原文依据：
    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 35分
  - 痛点原因：Bot对指派指令响应失败且未能有效处理，仅机械打标关闭，治理过程存在无效操作。
  - 原文依据：
    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weixin_44564637    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 35分
  - 痛点原因：Bot在人工已指派后仍提示重复指派，并直接打resolved标签关闭issue，行为机械且缺乏上下文感知。
  - 原文依据：
    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved    - `yangjinwen`：assigned to @yangjinwen    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 35分
  - 痛点原因：Bot自动将仅添加requirement标签的未解决需求issue标记为resolved并关闭，存在误关闭现象。
  - 原文依据：
    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `xuejinghui`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 40分
  - 痛点原因：Bot仅处理重复指派命令，未执行打标或关闭等实质性治理动作，治理能力单一。
  - 原文依据：
    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)
#### PP-05 Open issue长期停滞无人推进（I2 · 讨论与解决）

- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：仅通过codehub关闭并打标签，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：虽有关联PR被合并，但缺少commit引用、文档及release链接等直接解决证据，仅由机器人关闭并标记resolved。
  - 原文依据：
    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏commit、文档及release等直接解决证据，且仅靠机器人自动关闭，无人工确认评论。
  - 原文依据：
    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：虽关联PR已合并，但无commit引用、文档及release链接，且仅由机器人自动关闭无人工说明，解决证据不足。
  - 原文依据：
    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档链接、release记录及人工关闭评论，仅靠机器人自动关闭，证据不足。
  - 原文依据：
    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved
- **[#2035](https://gitcode.com/cann/ops-math/issues/2035) [Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅完成任务分配，关联PR未合并，缺乏commit、文档及release等实质解决证据。
  - 原文依据：
    - [关联PR #3489（open）](https://gitcode.com/cann/ops-math/merge_requests/3489)    - `m0_53222058`：/assign [@m0_53222058](https://gitcode.com/m0_53222058)    - `cann-robot`：assigned to @m0_53222058
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人关联 PR 自动关闭，缺少 commit 引用、文档链接和人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit、文档或release引用，仅由机器人自动关闭，缺乏人工解决证据。
  - 原文依据：
    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅有关联PR与机器人自动关闭，缺乏commit引用、文档链接及release版本等实质性修复落地证据。
  - 原文依据：
    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 15分
  - 痛点原因：虽有合并PR，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 15分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论说明解决详情，且无commit引用与文档链接佐证。
  - 原文依据：
    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 15分
  - 痛点原因：虽有合并的PR，但无commit引用和人工关闭评论，仅由机器人自动关闭，缺乏修复验证说明。
  - 原文依据：
    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 15分
  - 痛点原因：仅靠系统自动关闭，缺乏commit引用、release说明及关闭评论，未留下人工补充的解决证据。
  - 原文依据：
    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，无人工关闭评论、commit引用及文档链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，无commit引用、修复说明或测试验证记录等具体解决证据。
  - 原文依据：
    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与文档链接，且仅靠机器人自动关闭，无人工确认解决的关闭评论。
  - 原文依据：
    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭并打标签，缺乏人工关闭评论、commit引用及文档链接等实质性修复说明。
  - 原文依据：
    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 15分
  - 痛点原因：虽有合并PR与机器人关闭说明，但缺乏commit引用、release引用及人工确认的关闭评论，导致证据强度不足。
  - 原文依据：
    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及人工关闭评论，导致证据链不完整。
  - 原文依据：
    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 15分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏commit引用、文档链接及人工确认的关闭评论，导致证据不足。
  - 原文依据：
    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭记录，缺乏commit引用、文档及release链接等直接可追溯的解决证据。
  - 原文依据：
    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release说明等强证据支撑，证据链单薄。
  - 原文依据：
    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 23分
  - 痛点原因：虽有合并的关联PR和机器人关闭评论，但缺乏commit、文档及release等强解决证据。
  - 原文依据：
    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangqi_ai
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等实质性解决证据，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)    - `tieyutong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tieyutong
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 23分
  - 痛点原因：仅关联PR并由机器人自动关闭，缺乏commit引用、文档链接及release说明等实质性解决证据。
  - 原文依据：
    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)    - `zhanw_coding`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 23分
  - 痛点原因：虽有合并的PR，但无commit、文档及release引用等实质性解决证据，且评论多为无效的分配操作。
  - 原文依据：
    - [关联PR #3569（merged）](https://gitcode.com/cann/ops-math/merge_requests/3569)    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063    - `cann-robot`：add label resolved
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，仅靠机器人自动关闭，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #3575（merged）](https://gitcode.com/cann/ops-math/merge_requests/3575)    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 23分
  - 痛点原因：虽有合并的关联PR及机器人自动关闭，但缺乏commit引用、文档链接与release引用等直接解决证据。
  - 原文依据：
    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)    - `cai-chengchao`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cai-chengchao
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caoyan_huawei
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭评论，未提供commit、文档及release等实质性解决证据。
  - 原文依据：
    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)    - `sunzhongwen1`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunzhongwen1
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 23分
  - 痛点原因：仅靠机器人关联PR自动关闭并打标签，缺乏commit引用、文档链接和release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 23分
  - 痛点原因：仅有关联PR和机器人自动关闭评论，缺乏commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111
- **[#2037](https://gitcode.com/cann/ops-math/issues/2037) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 23分
  - 痛点原因：虽有合并的关联PR，但仅依赖机器人自动关闭，缺乏commit、文档及release等实质性引用支撑。
  - 原文依据：
    - [关联PR #3523（merged）](https://gitcode.com/cann/ops-math/merge_requests/3523)    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2037    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 23分
  - 痛点原因：仅通过评论解释现状并引导去其他仓提需求，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭记录，缺少commit引用、文档链接与release说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @focusforce
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 23分
  - 痛点原因：虽有合并PR和机器人关闭记录，但缺乏commit引用、文档链接与release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cwzhang
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 23分
  - 痛点原因：仅靠机器人关联PR并关闭，缺乏commit引用、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @h1234515
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 31分
  - 痛点原因：虽有合并PR，但缺乏文档链接、release引用及关闭评论，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 31分
  - 痛点原因：无关联PR与修复文档，开发者仅要求提供复现代码，用户追问进度后无实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 38分
  - 痛点原因：虽有关联PR，但关闭由机器人自动触发且指向其他关联issue，无直接commit引用与明确解决说明。
  - 原文依据：
    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 38分
  - 痛点原因：虽有关联PR，但缺少commit和release引用，且关闭评论仅为系统自动操作，解决证据链不完整。
  - 原文依据：
    - [关联PR #3585（closed）](https://gitcode.com/cann/ops-math/merge_requests/3585)    - [关联PR #3586（merged）](https://gitcode.com/cann/ops-math/merge_requests/3586)    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成    - `m0_55003149`：add label documentation
- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 38分
  - 痛点原因：关闭评论仅为分配指令，缺乏修复方案说明，且无commit引用与文档链接佐证，导致证据薄弱。
  - 原文依据：
    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)    - `sunchun`：/assgn @fitZepHYr    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - `VoyageZhou`：add label bug-report
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit引用和文档链接，且仅由机器人自动关闭，无人工补充解决细节，证据不足。
  - 原文依据：
    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)    - `wym_666`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wym_666
- **[#2057](https://gitcode.com/cann/ops-math/issues/2057) [Bug-Report|缺陷反馈]: C++ Clean Code规范整改** — 38分
  - 痛点原因：虽关联多个已合并PR，但缺少commit引用与文档链接，导致解决情况缺乏直接证据。
  - 原文依据：
    - [关联PR #3563（merged）](https://gitcode.com/cann/ops-math/merge_requests/3563)    - [关联PR #3596（merged）](https://gitcode.com/cann/ops-math/merge_requests/3596)    - [关联PR #3612（merged）](https://gitcode.com/cann/ops-math/merge_requests/3612)    - [关联PR #3636（merged）](https://gitcode.com/cann/ops-math/merge_requests/3636)    - [关联PR #4026（merged）](https://gitcode.com/cann/ops-math/merge_requests/4026)    - `doufloat`：/assign [@doufloat](https://gitcode.com/doufloat)
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 38分
  - 痛点原因：缺乏commit引用和文档链接，仅靠关联PR和机器人自动关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @onanfield
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 38分
  - 痛点原因：虽有合并的关联PR，但未提供直接的commit引用和release版本说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3539（closed）](https://gitcode.com/cann/ops-math/merge_requests/3539)    - [关联PR #3560（merged）](https://gitcode.com/cann/ops-math/merge_requests/3560)    - [关联PR #3566（merged）](https://gitcode.com/cann/ops-math/merge_requests/3566)    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：close    - `m0_55003149`：closed from codehub
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 38分
  - 痛点原因：仅有关联PR与自动关闭记录，缺少commit引用和文档链接，解决过程证据链不完整。
  - 原文依据：
    - [关联PR #3525（merged）](https://gitcode.com/cann/ops-math/merge_requests/3525)    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 38分
  - 痛点原因：关联PR未合并且处于关闭状态，无commit引用、文档或release等修复落地证据，仅靠评论讨论无法证明问题已彻底解决。
  - 原文依据：
    - [关联PR #3506（closed）](https://gitcode.com/cann/ops-math/merge_requests/3506)    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…    - `Mars_Cheng_cys`：我在开发编译as_strided算子时遇到同样问题 排查发现 ops-math/experimental/CMakeLists.txt中 ${CMAKE_SOURCE_DIR}/conversion/as_strided/op_api/a…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit引用、文档链接及详细的修复验证说明，仅简单声明已解决。
  - 原文依据：
    - [关联PR #3564（merged）](https://gitcode.com/cann/ops-math/merge_requests/3564)    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无文档链接与关闭评论作为解决佐证。
  - 原文依据：
    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2
- **[#2071](https://gitcode.com/cann/ops-math/issues/2071) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 54分
  - 痛点原因：因被判定为重复提交而关闭，缺乏关联PR、文档及release等直接解决证据，导致证据不足。
  - 原文依据：
    - `sunchun`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `sunchun`：您好，您的issue重复提交了，当前计划关闭该issue。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `wangqi_ai`：add label requirement    - `cann-robot`：add label Accepted
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 54分
  - 痛点原因：虽有关联PR和commit引用，但缺少文档与release引用，且仅由机器人自动关闭，缺乏人工对解决结果的明确说明。
  - 原文依据：
    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tianqiguang
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，且仅由机器人因关联MR合并自动关闭，缺乏人工确认解决证据。
  - 原文依据：
    - [关联PR #3520（merged）](https://gitcode.com/cann/ops-math/merge_requests/3520)    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 54分
  - 痛点原因：虽有 PR 和 commit，但无文档与 release 引用，且关闭评论仅为系统状态变更，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #3532（closed）](https://gitcode.com/cann/ops-math/merge_requests/3532)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 54分
  - 痛点原因：虽有合并PR和commit引用，但缺少文档链接与release引用，且仅由机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_8p1hhlB0
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 54分
  - 痛点原因：虽有合并的PR，但缺乏文档链接与release引用，且关闭评论仅为机器人自动回复，无人工说明。
  - 原文依据：
    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)    - `wangpengbo26`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangpengbo26
#### PP-06 部分issue正文极简信息不足（I1 · 分配与首次响应）

- **[#2076](https://gitcode.com/cann/ops-math/issues/2076) [Requirement|需求建议]: Spence长尾算子支持Ascend950 AscendC实现** — 0分
  - 痛点原因：仅有机器人指派和关联关闭操作，全程无人工实质性回应。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2076    - [关联PR #3324（merged）](https://gitcode.com/cann/ops-math/merge_requests/3324)
- **[#2075](https://gitcode.com/cann/ops-math/issues/2075) 算子新增st用例** — 0分
  - 痛点原因：首次响应仅为指派人员，后续全由机器人自动加标签并关闭，全程无人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@hw-zhangpanpan](https://gitcode.com/hw-zhangpanpan)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hw-zhangpanpan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2075    - [关联PR #3580（merged）](https://gitcode.com/cann/ops-math/merge_requests/3580)
- **[#2074](https://gitcode.com/cann/ops-math/issues/2074) [Bug-Report|缺陷反馈]: FusedMulAddAdd infershape 与 op_proto 不一致（误用广播且接受动态 shape）** — 0分
  - 痛点原因：仅执行了指派和打标签等机械操作，始终未对缺陷报告提供实质性的技术分析与回应。
  - 原文依据：
    - `pingchuantang`：/assign [@pingchuantang](https://gitcode.com/pingchuantang)    - `pingchuantang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @pingchuantang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2074    - [关联PR #3595（merged）](https://gitcode.com/cann/ops-math/merge_requests/3595)
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 0分
  - 痛点原因：首次响应仅添加标签，后续直接由机器人关闭，全程无人工实质回应。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2072](https://gitcode.com/cann/ops-math/issues/2072) [Requirement|需求建议]: 为比较算子补充950分支dtype处理逻辑** — 0分
  - 痛点原因：仅执行了指派和打标签操作，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `wangqi_ai`：/assign [@wangqi_ai](https://gitcode.com/wangqi_ai)    - `wangqi_ai`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangqi_ai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2072    - [关联PR #3593（merged）](https://gitcode.com/cann/ops-math/merge_requests/3593)
- **[#2070](https://gitcode.com/cann/ops-math/issues/2070) [Bug-Report|缺陷反馈]: 修复aclnnAddN代码告警** — 0分
  - 痛点原因：仅机器人执行了失败的指派和加标签操作，全程无人工实质回应即被标记解决。
  - 原文依据：
    - `sunchun`：/assign @fitZepHYr    - `cann-robot`：### Notice This issue can not be assigned to ***fitZepHYr***. Please try to assign to the repository members.    - `VoyageZhou`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2069](https://gitcode.com/cann/ops-math/issues/2069) [Requirement|需求建议]: 【社区任务】新增 Bincount 算子AscendC实现贡献** — 0分
  - 痛点原因：首次响应超65小时且仅有机器人认领操作，始终无任何实质性的技术讨论或反馈。
  - 原文依据：
    - `ddplys`：/assign    - `ddplys`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***ddplys***. Please do not assign repeatedly.    - `cann-robot`：assigned to @ddplys    - [关联PR #3610（closed）](https://gitcode.com/cann/ops-math/merge_requests/3610)    - [关联PR #3640（merged）](https://gitcode.com/cann/ops-math/merge_requests/3640)
- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：维护者仅添加标签并关闭了该缺陷反馈，未提供任何首次响应或实质性技术解答。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `tan_xin`：closed from codehub
- **[#2067](https://gitcode.com/cann/ops-math/issues/2067) [Documentation|文档反馈]: aclnnCdistBackward.md文档错误** — 0分
  - 痛点原因：仅进行了分配和加标签等机械操作，始终未对文档错误提供实质性解答或处理。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2066](https://gitcode.com/cann/ops-math/issues/2066) [Requirement|需求建议]: masked_scale算子Ascend C生成** — 0分
  - 痛点原因：维护者仅进行了分配操作，无任何实质性技术回应，直接由机器人因关联MR合并关闭。
  - 原文依据：
    - `tieyutong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tieyutong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2066    - [关联PR #3584（merged）](https://gitcode.com/cann/ops-math/merge_requests/3584)
- **[#2065](https://gitcode.com/cann/ops-math/issues/2065) [Bug-Report|缺陷反馈]: aclnnAddN不支持aicpu** — 0分
  - 痛点原因：仅有分派和打标签的机械响应，全程无人工实质技术回复，最终由机器人直接关闭。
  - 原文依据：
    - `sunchun`：/assgn @fitZepHYr    - `VoyageZhou`：add label bug-report    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2065,issue2070    - [关联PR #3587（merged）](https://gitcode.com/cann/ops-math/merge_requests/3587)    - [关联PR #1（open）](https://gitcode.com/VoyageZhou/ops-math-910/merge_requests/1)    - [关联PR #3588（merged）](https://gitcode.com/cann/ops-math/merge_requests/3588)
- **[#2064](https://gitcode.com/cann/ops-math/issues/2064) [Requirement|需求建议]: add_kernel_source 不要在 op_kernel 目录下新增 CMakeLists，统一收编到算子根目录…** — 0分
  - 痛点原因：仅机器人分配和打标签，无任何针对需求内容的实质性讨论或解答。
  - 原文依据：
    - `zhanw_coding`：/assign    - `zhanw_coding`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2064    - [关联PR #3446（merged）](https://gitcode.com/cann/ops-math/merge_requests/3446)
- **[#2063](https://gitcode.com/cann/ops-math/issues/2063) [Requirement|需求建议]: RandomUniformIntFusionPass开源开放要求融合Pass需要适配新框架** — 0分
  - 痛点原因：全程仅执行了无效指派操作，无任何针对需求的技术解答，且被机器人直接关闭。
  - 原文依据：
    - `sunchun`：/assign [@ghost](https://gitcode.com/ghost)    - `cann-robot`：### Notice This issue can not be assigned to ***ghost***. Please try to assign to the repository members.    - `chensi79`：/assign [@weixin_44564637](https://gitcode.com/weixin_44564637)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weixin_44564637    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2063
- **[#2062](https://gitcode.com/cann/ops-math/issues/2062) [Bug-Report|缺陷反馈]: OneHot Tiling 中 shape 校验失败时的报错信息不够规范** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无开发者提供实质性的技术解答。
  - 原文依据：
    - `sunchun`：/assign [@tianqiguang](https://gitcode.com/tianqiguang)    - `tianqiguang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @tianqiguang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2062    - [关联PR #3578（merged）](https://gitcode.com/cann/ops-math/merge_requests/3578)
- **[#2061](https://gitcode.com/cann/ops-math/issues/2061) [Bug-Report|缺陷反馈]: 支持MC_XX编译优化** — 0分
  - 痛点原因：被指派人仅添加标签且机器人直接标记已解决，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `sunchun`：/assign [@yangjinwen](https://gitcode.com/yangjinwen)    - `cann-robot`：### Notice This issue is already assigned to ***yangjinwen***. Please do not assign repeatedly.    - `yangjinwen`：add label bug-report    - `cann-robot`：add label resolved    - `yangjinwen`：assigned to @yangjinwen    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2061
- **[#2060](https://gitcode.com/cann/ops-math/issues/2060) [Bug-Report|缺陷反馈]: pow算子在exp=1时存在精度问题** — 0分
  - 痛点原因：全程仅由机器人分配和关闭，无任何人工实质回应。
  - 原文依据：
    - `wym_666`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wym_666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2060    - [关联PR #3534（merged）](https://gitcode.com/cann/ops-math/merge_requests/3534)
- **[#2059](https://gitcode.com/cann/ops-math/issues/2059) [Requirement|需求建议]: Less/GreaterEqual算子不支持910_55芯片** — 0分
  - 痛点原因：仅机器人自动分配和关闭，全程无人工实质回应。
  - 原文依据：
    - `cai-chengchao`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cai-chengchao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2059    - [关联PR #3559（merged）](https://gitcode.com/cann/ops-math/merge_requests/3559)
- **[#2058](https://gitcode.com/cann/ops-math/issues/2058) [Bug-Report|缺陷反馈]: sim_thread_exponential算子性能较差** — 0分
  - 痛点原因：全程仅进行打标签和分配操作，在机器人自动关闭前，维护者未提供任何实质性的技术回应。
  - 原文依据：
    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2058    - [关联PR #3465（merged）](https://gitcode.com/cann/ops-math/merge_requests/3465)    - [关联PR #3590（merged）](https://gitcode.com/cann/ops-math/merge_requests/3590)
- **[#2057](https://gitcode.com/cann/ops-math/issues/2057) [Bug-Report|缺陷反馈]: C++ Clean Code规范整改** — 0分
  - 痛点原因：仅快速分配和打标签，全程无任何实质性技术回应，直接被机器人标记为resolved。
  - 原文依据：
    - `doufloat`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue is already assigned to ***doufloat***. Please do not assign repeatedly.    - `doufloat`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2057    - [关联PR #3563（merged）](https://gitcode.com/cann/ops-math/merge_requests/3563)
- **[#2056](https://gitcode.com/cann/ops-math/issues/2056) [Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR** — 0分
  - 痛点原因：维护者仅指派和加标签，机器人直接标记已解决，全程无任何实质性技术回应。
  - 原文依据：
    - `onanfield`：/assign [@onanfield](https://gitcode.com/onanfield)    - `onanfield`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @onanfield    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2056    - [关联PR #3567（merged）](https://gitcode.com/cann/ops-math/merge_requests/3567)
- **[#2055](https://gitcode.com/cann/ops-math/issues/2055) [Bug-Report|缺陷反馈]: TopkV2算子核内基数排序Tiling侧和Kernel侧UB计算使用的变量不一致** — 0分
  - 痛点原因：仅分配任务和添加标签，全程无人工针对缺陷内容的实质性分析或解答。
  - 原文依据：
    - `sunchun`：/assign [@caoyan_huawei](https://gitcode.com/caoyan_huawei)    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2055    - [关联PR #3558（merged）](https://gitcode.com/cann/ops-math/merge_requests/3558)
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 0分
  - 痛点原因：仅打标签后直接由机器人关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2053](https://gitcode.com/cann/ops-math/issues/2053) [Requirement|需求建议]: reducesum支持batch一致性** — 0分
  - 痛点原因：维护者仅执行了分配和打标签等机械操作，未对需求内容进行任何实质性的解答与沟通。
  - 原文依据：
    - `sunzhongwen1`：/assign    - `sunzhongwen1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunzhongwen1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2053    - [关联PR #3442（merged）](https://gitcode.com/cann/ops-math/merge_requests/3442)
- **[#2052](https://gitcode.com/cann/ops-math/issues/2052) [Requirement|需求建议]: 需要新增sparse_bincount算子** — 0分
  - 痛点原因：仅进行了指派和加标签操作，全程未对需求提供任何实质性技术回应。
  - 原文依据：
    - `sunchun`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `cann-robot`：### Notice This issue is already assigned to ***xuejinghui***. Please do not assign repeatedly.    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `xuejinghui`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2052
- **[#2051](https://gitcode.com/cann/ops-math/issues/2051) [Requirement|需求建议]:新增支持Dawsn算子** — 0分
  - 痛点原因：首次响应超15小时，且全程仅有机器人自动分配与关闭，无任何人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@Almost_CANN](https://gitcode.com/Almost_CANN)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Almost_CANN    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2051    - [关联PR #3432（merged）](https://gitcode.com/cann/ops-math/merge_requests/3432)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：全程仅机器人自动响应并随关联PR合并关闭，无任何人工实质回应，故得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2049](https://gitcode.com/cann/ops-math/issues/2049) [Documentation|文档反馈]: aclnnOneHot.md资料错误** — 0分
  - 痛点原因：用户自行指派并直接关闭issue，全程未对文档错误提供任何实质性回应。
  - 原文依据：
    - `m0_55003149`：/assign [@m0_55003149](https://gitcode.com/m0_55003149)    - `m0_55003149`：close    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @m0_55003149    - `m0_55003149`：closed from codehub    - `m0_55003149`：changed custom state from 进行中 to 已完成
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：仅机器人打标签后随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 0分
  - 痛点原因：全程仅机器人加标签和开发者关闭修改状态，无任何实质性文字回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2046](https://gitcode.com/cann/ops-math/issues/2046) [Bug-Report|缺陷反馈]: CodeCheck告警清理，未初始化变量和除零风险** — 0分
  - 痛点原因：仅有机器人加标签和指派操作，始终无人工对缺陷进行实质性分析或回应。
  - 原文依据：
    - `sunchun`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @jzj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2046    - `jzj007`：changed custom state from 进行中 to 已完成
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 0分
  - 痛点原因：仅打标签后由机器人关联PR直接关闭，全程无人工实质回应。
  - 原文依据：
    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2044](https://gitcode.com/cann/ops-math/issues/2044) [Requirement|需求建议]: 统一全仓 C++ 代码格式化规范** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，未对需求进行任何实质性的技术或业务回应。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @songkai111    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：全程由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 0分
  - 痛点原因：仅通过机器人加标签和关联PR关闭，全程无人工对缺陷进行实质性技术回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：仅打标签后由机器人关联PR合并关闭，全程无实质回应。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2039](https://gitcode.com/cann/ops-math/issues/2039) [Requirement|需求建议]: 构建脚本支持 --ccache 参数控制编译时 ccache 开关** — 0分
  - 痛点原因：维护者仅分配任务和加标签，无任何实质性内容回应，且被机器人直接关闭。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2039    - [关联PR #3509（merged）](https://gitcode.com/cann/ops-math/merge_requests/3509)
- **[#2038](https://gitcode.com/cann/ops-math/issues/2038) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：全程仅机器人加标签及合并PR后自动关闭，无任何人工实质回应。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2038    - [关联PR #3514（merged）](https://gitcode.com/cann/ops-math/merge_requests/3514)
- **[#2036](https://gitcode.com/cann/ops-math/issues/2036) [Bug-Report|缺陷反馈]: bash build.sh --experimental 报错** — 0分
  - 痛点原因：仅进行了指派和机器人自动关闭操作，全程无针对报错问题的实质性技术回应。
  - 原文依据：
    - `zhaohujie`：/assign [@zhaohujie](https://gitcode.com/zhaohujie)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaohujie    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2036    - [关联PR #3516（merged）](https://gitcode.com/cann/ops-math/merge_requests/3516)
- **[#2035](https://gitcode.com/cann/ops-math/issues/2035) [Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅机器人自动分配负责人并关联PR，全程无人工技术评估或实质性讨论。
  - 原文依据：
    - `m0_53222058`：/assign [@m0_53222058](https://gitcode.com/m0_53222058)    - `cann-robot`：assigned to @m0_53222058    - [关联PR #3489（open）](https://gitcode.com/cann/ops-math/merge_requests/3489)
- **[#2032](https://gitcode.com/cann/ops-math/issues/2032) [Bug-Report|缺陷反馈]: 融合规则codecheck修改** — 0分
  - 痛点原因：全程仅机器人加标签及关联PR自动关闭，无任何人工实质回应沟通。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2032    - [关联PR #3421（merged）](https://gitcode.com/cann/ops-math/merge_requests/3421)
- **[#2031](https://gitcode.com/cann/ops-math/issues/2031) [Requirement|需求建议]: SplitV算子AscendC实现贡献** — 0分
  - 痛点原因：17小时后仅有指派操作，全程无人工实质技术回应，最终仅靠机器人自动关闭。
  - 原文依据：
    - `sunchun`：/assign [@gcw_8p1hhlB0](https://gitcode.com/gcw_8p1hhlB0)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_8p1hhlB0    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2031    - [关联PR #3502（merged）](https://gitcode.com/cann/ops-math/merge_requests/3502)
- **[#2030](https://gitcode.com/cann/ops-math/issues/2030) [Bug-Report|缺陷反馈]: aclnnPolar A5修复超int32导致的精度问题** — 0分
  - 痛点原因：首次响应耗时18.33小时，且全程仅有指派和加标签等机械操作，始终未提供实质性技术解答。
  - 原文依据：
    - `sunchun`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2030    - [关联PR #3497（merged）](https://gitcode.com/cann/ops-math/merge_requests/3497)
- **[#2029](https://gitcode.com/cann/ops-math/issues/2029) [Requirement|需求建议]: 【社区任务】Logspace算子开发交付（任务编号 529-13）** — 0分
  - 痛点原因：首次响应仅为分配任务，且全程无针对需求的技术讨论或实质回应，导致得分为零。
  - 原文依据：
    - `sunchun`：/assign [@bububu](https://gitcode.com/bububu)    - `cann-robot`：### Notice This issue can not be assigned to ***bububu***. Please try to assign to the repository members.    - `chensi79`：/assign [@LiJianhao2](https://gitcode.com/LiJianhao2)    - `cann-robot`：assigned to @LiJianhao2    - [关联PR #3496（open）](https://gitcode.com/cann/ops-math/merge_requests/3496)
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人因关联PR合并自动关闭并加标签，未对缺陷进行解答。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并而关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 0分
  - 痛点原因：首次响应仅添加标签，后续由机器人直接关闭，全程无人工实质回应说明问题处理情况。
  - 原文依据：
    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2024](https://gitcode.com/cann/ops-math/issues/2024) [Requirement|需求建议]: 支持 --static --jit 组合，复用已安装 CANN 包的 kernel** — 0分
  - 痛点原因：维护者仅执行了分配任务和添加标签操作，随后被机器人标记为已解决，全程无任何针对需求的技术讨论或实质回复。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2024    - [关联PR #3481（merged）](https://gitcode.com/cann/ops-math/merge_requests/3481)
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：全程仅有打标签和机器人自动关闭操作，无任何人工实质性回应。
  - 原文依据：
    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 0分
  - 痛点原因：首次响应仅加标签，全程无人工实质技术回应，直接由机器人关闭，缺乏有效沟通。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2021](https://gitcode.com/cann/ops-math/issues/2021) [Requirement|需求建议]: 【社区任务】BiasAdd 算子(Ascend 910B AscendC 实现)** — 0分
  - 痛点原因：仅存在机器人指派和加标签操作，全程无任何实质性人工回复。
  - 原文依据：
    - `gcw_5x5Ew5Ms`：/assign [@gcw_5x5Ew5Ms](https://gitcode.com/gcw_5x5Ew5Ms)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_5x5Ew5Ms    - `fullt`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2021    - [关联PR #3470（merged）](https://gitcode.com/cann/ops-math/merge_requests/3470)
- **[#2018](https://gitcode.com/cann/ops-math/issues/2018) [Requirement|需求建议]: KthValue算子支持950PR/950DT** — 0分
  - 痛点原因：首次响应仅为技术笔记与机器人指令，未对需求建议提供实质性解答便直接关闭。
  - 原文依据：
    - `ConanHuang`：# 非尾轴排序 Tiling 核心逻辑 ## 核心概念 非尾轴排序的 **batch/tile 不是 segment（排序行），而是 inner 位置的分组**。 ``` 尾轴：batchId = segmentId（每批处理若干排序行）…    - `ConanHuang`：/assign    - `ConanHuang`：/close    - `ConanHuang`：add label requirement    - `ConanHuang`：add label resolved    - `cann-robot`：add label Accepted
- **[#2017](https://gitcode.com/cann/ops-math/issues/2017) 1952架构下transpose性能优化** — 0分
  - 痛点原因：全程仅由机器人指派并因关联MR自动关闭，无任何人工实质技术回应。
  - 原文依据：
    - `sunchun`：/assign [@focusforce](https://gitcode.com/focusforce)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @focusforce    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2017    - [关联PR #3173（merged）](https://gitcode.com/cann/ops-math/merge_requests/3173)
- **[#2016](https://gitcode.com/cann/ops-math/issues/2016) [Requirement|需求建议]: 新增 Logdet 生态算子（关联PR用于追踪）** — 0分
  - 痛点原因：仅有开发者认领和机器人加标签、关闭等操作，全程无针对需求内容的实质性技术回应。
  - 原文依据：
    - `cwzhang`：/assign [@cwzhang](https://gitcode.com/cwzhang)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cwzhang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2016    - [关联PR #3459（merged）](https://gitcode.com/cann/ops-math/merge_requests/3459)
- **[#2015](https://gitcode.com/cann/ops-math/issues/2015) [Requirement|需求建议]: 重构 ClipByValue/ClipByValueV2 算子为高性能 Broadcast 模板实现** — 0分
  - 痛点原因：仅认领任务和加标签，全程无任何实质性技术回应即被机器人关闭。
  - 原文依据：
    - `wangpengbo26`：/assign    - `wangpengbo26`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangpengbo26    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2015    - [关联PR #3266（merged）](https://gitcode.com/cann/ops-math/merge_requests/3266)
- **[#2014](https://gitcode.com/cann/ops-math/issues/2014) [Requirement|需求建议]: 950添加算子clip_by_norm_no_div_sum** — 0分
  - 痛点原因：首次响应仅分配人员和添加标签，全程无针对该需求建议的实质讨论或解答。
  - 原文依据：
    - `sunchun`：/assign [@h1234515](https://gitcode.com/h1234515)    - `h1234515`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @h1234515    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2014    - [关联PR #3290（merged）](https://gitcode.com/cann/ops-math/merge_requests/3290)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人关联PR合并后自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2012](https://gitcode.com/cann/ops-math/issues/2012) [Requirement|需求建议]: install.sh 新增 --check 选项用于安装前依赖版本校验** — 0分
  - 痛点原因：维护者仅分配任务和打标签，机器人直接关闭问题，全程无任何针对需求的技术讨论或实质回应。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2012    - [关联PR #3453（merged）](https://gitcode.com/cann/ops-math/merge_requests/3453)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 0分
  - 痛点原因：首次响应仅加标签，全程无人工实质回应，直接由机器人关联PR合并关闭。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 40分
  - 痛点原因：分配后近一周无技术跟进致用户催问，直到171小时后才索要测试代码并给出实质建议。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `sunchun` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 强制填写关闭评论模板：包含根因分析、解决方案链接、影响版本和后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 14.4，低分 65/66；OBJ_DECISION_TRANSPARENCY：均值 58.9，低分 24/66 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 14.4，低分 65/66 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 58.9，低分 24/66 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明后续反馈路径或重新开启条件，信息不足 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护者；候选负责人 `sunchun` |
| 触发条件 | Issue创建后2小时内 |
| 具体动作 | 配置bot自动添加优先级和组件分类标签，未assign的issue触发提醒 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 65 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 10.0，低分 59/66；OBJ_RESPONSE_SPEED：均值 86.4，低分 3/66 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 10.0，低分 59/66 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 86.4，低分 3/66 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | chensi79明确assign给Almost_CANN，责任归属清晰且后续有… | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | Issue assignee；候选负责人 `sunchun` |
| 触发条件 | 首次响应后48小时无新评论 |
| 具体动作 | 发布进展更新评论，说明当前排查状态和下一步计划 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；平均评论数提升至 2.5 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 30.5，低分 57/66；OBJ_RESULT_FORMATION_TIMELINESS：均值 88.5，低分 5/66 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 88.5，低分 5/66 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 30.5，低分 57/66 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无实质技术讨论，但通过创建关联PR并合并实现了明确推进。 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **78.3/100**，整体相对可控，但仍需关注：轻度痛点：少量issue正文极简或模板字段未填写，但整体创建质量尚可。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.2 | 内部贡献需求，技术细节具体真实，无AI幻觉或噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 66.4 | 模板填写较完整，含背景、设计方案、数据类型等，但host/kernel侧设计章… |

代表低分 Issue：[#2038](https://gitcode.com/cann/ops-math/issues/2038)
问题：[Bug-Report|缺陷反馈]: 融合规则codecheck修改。

### I1 · 分配与首次响应

本阶段分数为 **58.7/100**，本阶段需要改进，主要问题是：分流阶段标签与责任归属严重不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 10.0 | 均值 10.0，低分 59/66 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 86.4 | 均值 86.4，低分 3/66 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 75.1 | chensi79明确assign给Almost_CANN，责任归属清晰且后续有… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 74.0 | 通过assign命令正确分配给需求提出者，后续PR合并验证路由正确。 |

代表低分 Issue：[#2011](https://gitcode.com/cann/ops-math/issues/2011)
问题：[Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题。

### I2 · 讨论与解决

本阶段分数为 **63.2/100**，整体相对可控，但仍需关注：讨论深度不足评论数极低。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 88.5 | 均值 88.5，低分 5/66 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 30.5 | 均值 30.5，低分 57/66 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 56.7 | 无实质技术讨论，但通过创建关联PR并合并实现了明确推进。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 81.0 | 关联PR #3324已合并，Spence算子AscendC实现需求得到满足。 |

代表低分 Issue：[#2035](https://gitcode.com/cann/ops-math/issues/2035)
问题：[Requirement|需求建议]: 新增 Reduce_any 生态算子（关联PR用于追踪）。

### I3 · 总结与关闭

本阶段分数为 **46.7/100**，本阶段需要改进，主要问题是：关闭阶段缺乏解决证据与知识沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 14.4 | 均值 14.4，低分 65/66 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 58.9 | 均值 58.9，低分 24/66 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 44.2 | 关闭后未说明后续反馈路径或重新开启条件，信息不足 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.2 | PR合并后由bot自动关闭并加resolved标签，无过早关闭迹象。 |

代表低分 Issue：[#2041](https://gitcode.com/cann/ops-math/issues/2041)
问题：[Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截。

### G · Bot/Agent 治理

本阶段分数为 **65.6/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 24.5 | 均值 24.5，低分 60/66 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 96.1 | 均值 96.1，低分 0/66 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 74.7 | Bot执行assign后人工创建PR并合并，后续bot自动关闭，交接顺畅。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 70.6 | Bot正确执行assign、MR合并后自动关闭及加标签，流程推进有效。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 75.9 | assign、关闭、加标签动作均准确合规，时机与MR合并事件匹配。 |

代表低分 Issue：[#2041](https://gitcode.com/cann/ops-math/issues/2041)
问题：[Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 66 | 48.6 | 首期基线 | 78.3 | 58.7 | 63.2 | 46.7 | 65.6 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **8 位社区响应者**贡献 **40 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `sunchun` | 19 |
| `chensi79` | 11 |
| `songkai111` | 3 |
| `nunnons2` | 3 |
| `condfuse_3` | 1 |

Top1 响应占比 **47.5%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.7/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-06-22_to_2026-06-28.json`。
