# Issue 贡献体验周报 · cann/ops-math

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **66** 个 Issue
+ 其中外部 Issue **23** 个、内部 **43** 个；I1–I3 及 G 基于「外部且成熟」的 **23** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 4 / Closed 62**，关闭率 **93.9%**。
+ 总体体验分为 **44.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 37.1 | 关闭理由与实际矛盾，解决证据缺失 |
| P0 | I1 · 分配与首次响应 | 54.4 | 分流标签与assignee缺失，实质性响应延迟 |
| P1 | I2 · 讨论与解决 | 57.6 | 讨论未持续即被关闭，评论极少 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 强制填写关闭理由模板，包含解决证据链接、根因摘要、后续版本计划三段式结构 |
| REC-02 | P0 | Bot自动根据标题前缀和关键词添加分类标签并assign给对应算子维护者 |
| REC-03 | P1 | 校验Issue是否有关联PR合并或用户确认，未满足条件时阻止Bot关闭 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 66 |
| Open / Closed | 4 / 62 |
| 关闭率 | 93.9% |
| 类型构成 | 缺陷 32 / 需求 27 / 其他 7 |
| 总体体验分 | 44.5/100（D） |
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
| I0 · 创建 | 78.4 | 5/66（7.6%） | 相对可控 | `SUB_INPUT_QUALITY` 65.9 |
| I1 · 分配与首次响应 | 54.4 | 18/23（78.3%） | P0 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 20.0 |
| I2 · 讨论与解决 | 57.6 | 14/23（60.9%） | 需改进 | `OBJ_SOLUTION_EVIDENCE` 17.7 |
| I3 · 总结与关闭 | 37.1 | 20/23（87.0%） | P0 | `OBJ_CLOSURE_REUSE` 9.1 |
| G · Bot/Agent 治理（参考） | 63.4 | 7/23（30.4%） | 参考项 | `OBJ_BOT_GOVERNANCE` 27.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭理由与实际矛盾，解决证据缺失 | OBJ_CLOSURE_REUSE：均值 9.1，低分 22/23；OBJ_DECISION_TRANSPARENCY：均值 40.2，低分 18/23 | 社区无法从已解决Issue积累知识，用户无法判断问题是否真正解决，信任受损 |
| PP-02 | P0 | I1 · 分配与首次响应 | 分流标签与assignee缺失，实质性响应延迟 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 20.0，低分 18/23；OBJ_RESPONSE_SPEED：均值 78.3，低分 3/23 | Issue无法被正确路由到处理团队，用户等待时间长，问题处理效率下降 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot误关闭率高且部分Issue缺位 | OBJ_BOT_GOVERNANCE：均值 27.0，低分 19/23；OBJ_BOT_MISCLOSE_REVERSE：均值 92.2，低分 0/23 | 部分Issue被错误关闭，部分Issue无自动化治理，整体治理一致性受损 |
| PP-04 | P1 | I2 · 讨论与解决 | 讨论未持续即被关闭，评论极少 | OBJ_SOLUTION_EVIDENCE：均值 17.7，低分 21/23；OBJ_RESULT_FORMATION_TIMELINESS：均值 93.0，低分 0/23 | 问题根因未充分讨论，解决方案质量受损，用户参与感低 |
| PP-05 | P2 | I2 · 讨论与解决 | 已解决Issue未关闭，PR联动缺失 | OBJ_SOLUTION_EVIDENCE：均值 17.7，低分 21/23；OBJ_RESULT_FORMATION_TIMELINESS：均值 93.0，低分 0/23 | Issue看板不准确，增加维护负担，社区活跃度数据失真 |

### 4.1 低分 Issue 明细

#### PP-01 关闭理由与实际矛盾，解决证据缺失（I3 · 总结与关闭）

- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，无人工关闭说明且未沉淀方案文档，未留下可复用知识。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及重复链接，仅由代码库直接关闭，导致问题解决过程无法被复用。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人自动关闭，未沉淀任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：仅由机器人随关联MR合并自动关闭，无方案文档、无重复链接且关闭说明为0字，未留下任何可供复用的信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明且未沉淀方案文档。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何关闭说明与方案文档沉淀，导致后续无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为零，未沉淀方案文档，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人随PR合并自动关闭，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人随关联PR合并自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 0分
  - 痛点原因：关闭时无方案文档与复用链接，仅靠状态变更关闭且说明过短，缺乏后续参考价值。
  - 原文依据：
    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub    - `fullt`：add label requirement    - `cann-robot`：add label Accepted    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅由机器人自动关联PR并打标签，无任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，关闭说明为0字且无方案文档沉淀，未留下任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 0分
  - 痛点原因：开发者提出排查建议后无后续进展，未沉淀解决方案且关闭说明为空，导致无法复用排查经验。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：仅靠机器人随 PR 合并自动关闭，关闭说明为 0 字且无方案文档沉淀，未留下任何可供复用的经验信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无人工关闭说明与方案文档，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：关闭说明为0字且未文档化解决方案，无重复主链接，仅由机器人随PR合并自动关闭，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人自动关闭，导致解决方案无法被其他用户复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2033](https://gitcode.com/cann/ops-math/issues/2033) [Requirement|需求建议]: 自定义稀疏矩阵乘cube-SpMM** — 25分
  - 痛点原因：仅建议去其他仓库提需求便关闭，无方案文档与主链接，未沉淀实质性解决方案供后续参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `songkai111`：你好，该算子建议放在ops-nn仓（http://gitcode.com/cann/ops-nn），请考虑在nn仓提出该需求。    - `mhhit`：好的，收到    - `sunchun`：您好，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 25分
  - 痛点原因：关闭说明仅指出提问者拷贝失误，无实质解决方案与文档记录，对后续用户毫无参考价值。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 25分
  - 痛点原因：关闭说明仅89字且无方案文档化与复现链接，仅简单标记完成，缺乏供他人参考的根因与解决方案。
  - 原文依据：
    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 30分
  - 痛点原因：关闭时无任何文字说明且未提供dup主链接，仅靠系统状态变更关闭，缺乏可复用信息。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人自动关闭，缺乏人工总结，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
#### PP-02 分流标签与assignee缺失，实质性响应延迟（I1 · 分配与首次响应）

- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：首次响应和实质回应均缺失，仅添加标签后直接关闭，未进行任何有效沟通。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `tan_xin`：closed from codehub
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 0分
  - 痛点原因：仅快速打标签并随关联PR合并自动关闭，全程无任何实质性技术回复。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：仅机器人在1.22小时自动响应并因关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 0分
  - 痛点原因：仅机器人打标签后直接关闭并标记完成，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：仅有机器人打标签及随PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 0分
  - 痛点原因：仅打标签和机器人自动关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：全程仅机器人打标签并随PR合并自动关闭，缺乏人工技术确认或问题解释等实质回应。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：全程仅由机器人自动响应并随PR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅机器人打标签并随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 0分
  - 痛点原因：首次响应仅添加标签，随后直接由机器人关联PR并关闭，全程无人工实质回应。
  - 原文依据：
    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：仅有打标签响应，直至关联PR合并被机器人关闭，全程无任何人工实质回应。
  - 原文依据：
    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 0分
  - 痛点原因：虽有快速打标签响应，但直至机器人因关联PR合并关闭前，全程无任何人工实质回应。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅机器人自动响应并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 0分
  - 痛点原因：全程仅机器人打标签及随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 40分
  - 痛点原因：首次响应仅分配任务，实质回应耗时171.83小时，期间需用户多次催问，开发者迟迟未提供技术解答。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
#### PP-03 Bot误关闭率高且部分Issue缺位（G · Bot/Agent 治理）

- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 20分
  - 痛点原因：Bot仅执行机械打标与随PR合并关闭，评论数为零，缺乏有效互动与进度同步。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 20分
  - 痛点原因：Bot关闭issue时评论数为零，未向用户说明关闭原因及关联PR情况，缺乏有效沟通。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 20分
  - 痛点原因：Bot 仅执行了打标和关闭操作，但未通过评论向用户公开说明原因，缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，无任何评论互动，缺乏过程说明与有效沟通。
  - 原文依据：
    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭等关键动作，实际关闭与状态流转均依赖人工。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，缺乏状态说明与有效交互，治理过程不透明。
  - 原文依据：
    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)
- **[#2043](https://gitcode.com/cann/ops-math/issues/2043) [Bug-Report|缺陷反馈]: 新增 Im2col 算子，复用已有 op_api 时同名 op type 导致 aclnn 调用返回 561103** — 20分
  - 痛点原因：Bot仅完成打标，未进行评论引导或自动关闭，治理动作单一且未闭环。
  - 原文依据：
    - `songkai111`：在复现问题的场景中，可以加一下export ASCEND_GLOBAL_LOG_LEVEL=0和export ASCEND_SLOG_PRINT_TO_STDOUT=1环境变量，跑出来日志信息嘛？我们需要通过日志信息，进行问题定位    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程无任何评论互动，缺乏对用户的状态同步与解释说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，无任何有效评论与交互说明，治理过程缺乏沟通。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 20分
  - 痛点原因：Bot仅机械打标并随关联PR合并关闭，全程无任何评论与用户沟通，缺乏有效互动导致得分极低。
  - 原文依据：
    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 20分
  - 痛点原因：Bot仅完成打标，在人工给出明确处理结论后未自动关闭issue或进行有效回复，缺乏后续治理。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `fullt`：add label requirement    - `cann-robot`：add label Accepted
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 20分
  - 痛点原因：Bot虽完成打标和关闭，但评论数为0，未说明关闭原因及关联PR情况，治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 20分
  - 痛点原因：Bot虽随关联PR合并自动打标并关闭，但全程无任何评论说明，缺乏有效沟通导致得分低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，缺乏有效引导，治理动作单一。
  - 原文依据：
    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 20分
  - 痛点原因：Bot仅机械打标与关闭，全程零评论，缺乏与用户的沟通互动和状态同步，治理透明度不足。
  - 原文依据：
    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 20分
  - 痛点原因：Bot仅机械打标并在PR合并时自动关闭，全程零评论，缺乏对用户的互动引导与进度反馈。
  - 原文依据：
    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 20分
  - 痛点原因：问题已修复且开发者计划关闭，但Bot未执行关闭操作且无评论互动，导致治理流程未闭环。
  - 原文依据：
    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `Coder_Nerd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `Coder_Nerd`：assigned to @Coder_Nerd
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论向用户解释关闭原因及关联PR情况，缺乏有效互动。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭操作，全程零评论无互动，缺乏过程治理与有效沟通。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)
#### PP-04 讨论未持续即被关闭，评论极少（I2 · 讨论与解决）

- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：仅通过codehub直接关闭，未关联任何PR、commit或文档链接等证明问题已解决的证据。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档及release等解决证据，且仅由机器人自动关闭无人工评论。
  - 原文依据：
    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接和release引用，且关闭评论为空，导致证据不足。
  - 原文依据：
    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：仅靠机器人自动关闭，无commit引用、文档链接、release引用及人工关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接及release引用，且仅靠机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏commit引用、文档链接及人工关闭说明等直接解决证据。
  - 原文依据：
    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，无commit引用、文档链接及人工关闭评论等实质性修复证据。
  - 原文依据：
    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档及release引用，且无人工关闭评论说明，仅靠机器人自动关闭，证据不足。
  - 原文依据：
    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：虽有合并的关联PR并由机器人关闭，但缺乏commit引用、文档链接及release说明等实质性解决证据。
  - 原文依据：
    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit引用、文档链接及人工关闭说明等实质性修复证据。
  - 原文依据：
    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 15分
  - 痛点原因：虽有关联PR，但无commit引用、release引用及关闭评论，缺乏明确的解决证据支撑。
  - 原文依据：
    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 15分
  - 痛点原因：仅靠机器人自动关闭，缺乏commit引用、文档链接及人工关闭说明等具体解决证据。
  - 原文依据：
    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 15分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与文档链接，且仅由机器人自动关闭，无人工确认解决的评论。
  - 原文依据：
    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 15分
  - 痛点原因：仅靠机器人自动关联PR关闭，缺乏commit引用、release引用及人工关闭评论等直接证据。
  - 原文依据：
    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 15分
  - 痛点原因：虽有合并PR，但仅靠机器人自动关闭，缺乏commit链接、文档说明及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 15分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭，缺乏解决证据。
  - 原文依据：
    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 23分
  - 痛点原因：仅在评论中口头解释并引导去其他仓库提单，未关联任何PR、代码提交或文档链接等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 31分
  - 痛点原因：开发者索要测试代码后无后续进展，且无关联PR与关闭评论，缺乏实质性的解决证据。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 38分
  - 痛点原因：关联PR已关闭且无合并证据，缺乏commit或文档链接佐证，仅停留在理论解释，未提供实际修复证据。
  - 原文依据：
    - [关联PR #3506（closed）](https://gitcode.com/cann/ops-math/merge_requests/3506)    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…    - `Mars_Cheng_cys`：我在开发编译as_strided算子时遇到同样问题 排查发现 ops-math/experimental/CMakeLists.txt中 ${CMAKE_SOURCE_DIR}/conversion/as_strided/op_api/a…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 38分
  - 痛点原因：仅凭关联PR和口头声明关闭，缺乏commit引用、文档链接及测试验证等实质性证据支撑。
  - 原文依据：
    - [关联PR #3564（merged）](https://gitcode.com/cann/ops-math/merge_requests/3564)    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report
#### PP-05 已解决Issue未关闭，PR联动缺失（I2 · 讨论与解决）

- **[#2068](https://gitcode.com/cann/ops-math/issues/2068) [Bug-Report|缺陷反馈]: ApplyRotaryPosEmb,AddRmsNorm,InplaceAddRmsNorm,ReverseV2等算子支…** — 0分
  - 痛点原因：仅通过codehub直接关闭，未关联任何PR、commit或文档链接等证明问题已解决的证据。
  - 原文依据：
    - `tan_xin`：closed from codehub    - `tan_xin`：add label bug-report
- **[#2050](https://gitcode.com/cann/ops-math/issues/2050) 新增trilu 950算子** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档及release等解决证据，且仅由机器人自动关闭无人工评论。
  - 原文依据：
    - [关联PR #3386（merged）](https://gitcode.com/cann/ops-math/merge_requests/3386)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2050    - `cann-robot`：add label resolved
- **[#2048](https://gitcode.com/cann/ops-math/issues/2048) [Requirement|需求建议]: SortWithIndex算子UT用例补齐** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接和release引用，且关闭评论为空，导致证据不足。
  - 原文依据：
    - [关联PR #3538（merged）](https://gitcode.com/cann/ops-math/merge_requests/3538)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2048    - `caoyan_huawei`：add label requirement    - `cann-robot`：add label resolved
- **[#2042](https://gitcode.com/cann/ops-math/issues/2042) [Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…** — 0分
  - 痛点原因：仅靠机器人自动关闭，无commit引用、文档链接、release引用及人工关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #3531（merged）](https://gitcode.com/cann/ops-math/merge_requests/3531)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2042    - `cann-robot`：add label resolved
- **[#2040](https://gitcode.com/cann/ops-math/issues/2040) [Bug-Report|缺陷反馈]: selectv2,tensormove,split,batchnorm,LayerNormV3,lpnormv2 算子支…** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接及release引用，且仅靠机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #6449（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6449)    - [关联PR #3524（merged）](https://gitcode.com/cann/ops-math/merge_requests/3524)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2040    - `tan_xin`：add label bug-report    - `cann-robot`：add label resolved
- **[#2028](https://gitcode.com/cann/ops-math/issues/2028) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏commit引用、文档链接及人工关闭说明等直接解决证据。
  - 原文依据：
    - [关联PR #3494（merged）](https://gitcode.com/cann/ops-math/merge_requests/3494)    - [关联PR #3495（merged）](https://gitcode.com/cann/ops-math/merge_requests/3495)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2028    - `cann-robot`：add label resolved
- **[#2027](https://gitcode.com/cann/ops-math/issues/2027) [Bug-Report|缺陷反馈]: unpack算子原型定义和信息库不一致** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，无commit引用、文档链接及人工关闭评论等实质性修复证据。
  - 原文依据：
    - [关联PR #3413（merged）](https://gitcode.com/cann/ops-math/merge_requests/3413)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2027    - `cann-robot`：add label resolved
- **[#2023](https://gitcode.com/cann/ops-math/issues/2023) [Requirement|需求建议]: A5平台支持DataCompare算子** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档及release引用，且无人工关闭评论说明，仅靠机器人自动关闭，证据不足。
  - 原文依据：
    - [关联PR #3447（merged）](https://gitcode.com/cann/ops-math/merge_requests/3447)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2023    - `andong_hw`：add label requirement    - `cann-robot`：add label resolved
- **[#2013](https://gitcode.com/cann/ops-math/issues/2013) [Bug-Report|缺陷反馈]: 排查资料文件，当前算子支持的芯片类型与资料文件显示是否一致** — 0分
  - 痛点原因：虽有合并的关联PR并由机器人关闭，但缺乏commit引用、文档链接及release说明等实质性解决证据。
  - 原文依据：
    - [关联PR #3445（merged）](https://gitcode.com/cann/ops-math/merge_requests/3445)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2013    - `cann-robot`：add label resolved
- **[#2073](https://gitcode.com/cann/ops-math/issues/2073) [Bug-Report|缺陷反馈]: reduce_log_sum onnx插件的输入axes为空，编译会报错** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit引用、文档链接及人工关闭说明等实质性修复证据。
  - 原文依据：
    - [关联PR #3500（merged）](https://gitcode.com/cann/ops-math/merge_requests/3500)    - [关联PR #3598（merged）](https://gitcode.com/cann/ops-math/merge_requests/3598)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2073    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2054](https://gitcode.com/cann/ops-math/issues/2054) [Bug-Report|缺陷反馈]: 修复batch_to_space_nd算子在unknown_rank下的校验** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #3553（merged）](https://gitcode.com/cann/ops-math/merge_requests/3553)    - [关联PR #3554（merged）](https://gitcode.com/cann/ops-math/merge_requests/3554)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2054    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2047](https://gitcode.com/cann/ops-math/issues/2047) [Documentation|文档反馈]: 完善 floor_mod 下 remainder 算子接口文档** — 15分
  - 痛点原因：虽有关联PR，但无commit引用、release引用及关闭评论，缺乏明确的解决证据支撑。
  - 原文依据：
    - [关联PR #3530（merged）](https://gitcode.com/cann/ops-math/merge_requests/3530)    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#2045](https://gitcode.com/cann/ops-math/issues/2045) [Bug-Report|缺陷反馈]: add drop_out_do_mask_v3/drop_out_do_mask_v3_d files to class…** — 15分
  - 痛点原因：仅靠机器人自动关闭，缺乏commit引用、文档链接及人工关闭说明等具体解决证据。
  - 原文依据：
    - [关联PR #3518（merged）](https://gitcode.com/cann/ops-math/merge_requests/3518)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2045    - `zhaozi3`：add label bug-report    - `cann-robot`：add label resolved
- **[#2041](https://gitcode.com/cann/ops-math/issues/2041) [Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截** — 15分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与文档链接，且仅由机器人自动关闭，无人工确认解决的评论。
  - 原文依据：
    - [关联PR #3528（merged）](https://gitcode.com/cann/ops-math/merge_requests/3528)    - [关联PR #3529（merged）](https://gitcode.com/cann/ops-math/merge_requests/3529)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2041    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2026](https://gitcode.com/cann/ops-math/issues/2026) [Documentation|文档反馈]: 修正 aclnnInplaceDivsGetWorkspaceSize 参数约束描述中的参数名不一致问题** — 15分
  - 痛点原因：仅靠机器人自动关联PR关闭，缺乏commit引用、release引用及人工关闭评论等直接证据。
  - 原文依据：
    - [关联PR #3485（merged）](https://gitcode.com/cann/ops-math/merge_requests/3485)    - [关联PR #3493（merged）](https://gitcode.com/cann/ops-math/merge_requests/3493)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2026    - `zhang-song-rui`：add label documentation    - `cann-robot`：add label resolved
- **[#2022](https://gitcode.com/cann/ops-math/issues/2022) [Bug-Report|缺陷反馈]: inplace div不支持float向int类型转换** — 15分
  - 痛点原因：虽有合并PR，但仅靠机器人自动关闭，缺乏commit链接、文档说明及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #3472（merged）](https://gitcode.com/cann/ops-math/merge_requests/3472)    - [关联PR #3482（merged）](https://gitcode.com/cann/ops-math/merge_requests/3482)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2022    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved
- **[#2011](https://gitcode.com/cann/ops-math/issues/2011) [Bug-Report|缺陷反馈]: cummin 算子在输入全是nan时，索引输出存在精度问题** — 15分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭，缺乏解决证据。
  - 原文依据：
    - [关联PR #3381（merged）](https://gitcode.com/cann/ops-math/merge_requests/3381)    - [关联PR #3452（merged）](https://gitcode.com/cann/ops-math/merge_requests/3452)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2011    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2034](https://gitcode.com/cann/ops-math/issues/2034) [Requirement|需求建议]: math仓的CMakeLists.txt文件能否保持和其他算子仓的一致** — 23分
  - 痛点原因：仅在评论中口头解释并引导去其他仓库提单，未关联任何PR、代码提交或文档链接等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：你好，math仓使用add_all_modules_sources做了一层封装，更简洁，减少CMakeLists数量。实际开发中，建议使用--genop功能，生成算子模板，来屏蔽这些cmake的差异。    - `fullt`：那能否推动其他算子仓也采用该优化？    - `chensi79`：cv/nn/transformer仓相关需求需要去对应仓提issue    - `chensi79`：changed custom state from 进行中 to 已完成    - `chensi79`：closed from codehub
- **[#2025](https://gitcode.com/cann/ops-math/issues/2025) [Bug-Report|缺陷反馈]: 无法调到自定义viewcopy算子** — 31分
  - 痛点原因：开发者索要测试代码后无后续进展，且无关联PR与关闭评论，缺乏实质性的解决证据。
  - 原文依据：
    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `hehe7758511`：你好，请问最新进度怎么样了？    - `condfuse_3`：>你好，请问最新进度怎么样了？ [@hehe7758511](https://gitcode.com/hehe7758511) [@nunnons2](https://gitcode.com/nunnons2)    - `nunnons2`：方便提供测试代码吗？需要复现下。或者可以直接在example脚本中执行，example支持构建非连续输入。 若必须采用ascendoptest进行测试，请提需求到ascendoptest。    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy    - `hehe7758511`：[@nunnons2](https://gitcode.com/nunnons2) 问题是算子性能验收时五十个样例都是连续tensor样例，就是会被view_copy/op_api/aclnn_copy.cpp导向TensorMove，测…
- **[#2020](https://gitcode.com/cann/ops-math/issues/2020) [Bug-Report|缺陷反馈]: ViewCopy算子CMakeLists.txt写成正确参考形式会编译失败** — 38分
  - 痛点原因：关联PR已关闭且无合并证据，缺乏commit或文档链接佐证，仅停留在理论解释，未提供实际修复证据。
  - 原文依据：
    - [关联PR #3506（closed）](https://gitcode.com/cann/ops-math/merge_requests/3506)    - `chensi79`：add_all_modules_sources(OPTYPE fill ACLNNTYPE aclnn_exclude) 算子名应该是view_copy，而不是fill。    - `hehe7758511`：抱歉，算子名就是是view_copy，add_all_modules_sources(OPTYPE view_copy ACLNNTYPE aclnn_exclude) 我提问题时拷贝失误了，麻烦再解决一下，谢谢!    - `chensi79`：理论上不会出现重复定义的问题，顶层CMakeLists.txt:124-129 if(ENABLE_EXPERIMENTAL)/else 逻辑保证math/conversion和experimental/互斥： ON → 只 add_su…    - `hehe7758511`：https://gitcode.com/hehe7758511/ops-math/tree/add-experimental-view-copy/experimental/conversion/view_copy 这个里面的view_co…    - `Mars_Cheng_cys`：我在开发编译as_strided算子时遇到同样问题 排查发现 ops-math/experimental/CMakeLists.txt中 ${CMAKE_SOURCE_DIR}/conversion/as_strided/op_api/a…
- **[#2019](https://gitcode.com/cann/ops-math/issues/2019) [Bug-Report|缺陷反馈]: AngleV2在Ascend950上unit8与bool数据类型会出现数据被污染，结果失败** — 38分
  - 痛点原因：仅凭关联PR和口头声明关闭，缺乏commit引用、文档链接及测试验证等实质性证据支撑。
  - 原文依据：
    - [关联PR #3564（merged）](https://gitcode.com/cann/ops-math/merge_requests/3564)    - `nextyale`：已在以下pr中加入```PipeBarrier<PIPE_ALL>()```修复同步问题。 https://gitcode.com/cann/ops-math/pull/3564    - `yue-ma`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `yue-ma`：closed from codehub    - `yue-ma`：changed custom state from 进行中 to 已完成    - `Coder_Nerd`：add label bug-report

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者/Bot；候选负责人 `sunchun` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 强制填写关闭理由模板，包含解决证据链接、根因摘要、后续版本计划三段式结构 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 9.1，低分 22/23；OBJ_DECISION_TRANSPARENCY：均值 40.2，低分 18/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 9.1，低分 22/23 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 40.2，低分 18/23 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明重新开启条件或后续反馈路径，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot管理员；候选负责人 `sunchun` |
| 触发条件 | Issue创建后 |
| 具体动作 | Bot自动根据标题前缀和关键词添加分类标签并assign给对应算子维护者 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 70 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 20.0，低分 18/23；OBJ_RESPONSE_SPEED：均值 78.3，低分 3/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 20.0，低分 18/23 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 78.3，低分 3/23 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无assignee分配，但提交者自行创建修复MR并担任MR assigner，… | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot管理员；候选负责人 `sunchun` |
| 触发条件 | Bot关闭Issue前 |
| 具体动作 | 校验Issue是否有关联PR合并或用户确认，未满足条件时阻止Bot关闭 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 5 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 27.0，低分 19/23；OBJ_BOT_MISCLOSE_REVERSE：均值 92.2，低分 0/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 27.0，低分 19/23 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 92.2，低分 0/23 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | bot介入前人类已完成MR创建与合并，问题已解决无需人工接续，交接无阻塞。 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.4/100**，整体相对可控，但仍需关注：轻微痛点，整体输入质量尚可但7.6%的Issue存在模板填写不完整…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.0 | 内容为内部贡献需求，无AI幻觉迹象，信息真实有效 |
| `SUB_INPUT_QUALITY` 输入质量 | 65.9 | 需求模板填写完整，含背景、设计方案、数据类型、硬件支持等结构化章节 |

代表低分 Issue：[#2056](https://gitcode.com/cann/ops-math/issues/2056)
问题：[Bug-Report|缺陷反馈]: 算子pad_v3 set wait个数不匹配导致用例执行失败VEC_ERROR。

### I1 · 分配与首次响应
本阶段分数为 **54.4/100**，本阶段需要改进，主要问题是：分流标签与assignee缺失，实质性响应延迟。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 20.0 | 均值 20.0，低分 18/23 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 78.3 | 均值 78.3，低分 3/23 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 55.4 | 无assignee分配，但提交者自行创建修复MR并担任MR assigner，… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 69.2 | 添加了bug-report标签，issue被正确关联到修复MR并完成合并，路径… |

代表低分 Issue：[#2043](https://gitcode.com/cann/ops-math/issues/2043)
问题：[Bug-Report|缺陷反馈]: 新增 Im2col 算子，复用已有 op_api 时同名 op type 导致 aclnn 调用返回 561103。

### I2 · 讨论与解决
本阶段分数为 **57.6/100**，本阶段需要改进，主要问题是：讨论未持续即被关闭，评论极少。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 93.0 | 均值 93.0，低分 0/23 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 17.7 | 均值 17.7，低分 21/23 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 49.7 | 无评论讨论，但提交者直接创建修复MR形成明确下一步动作，推进路径清晰。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 72.1 | 编译报错bug已通过MR#3598修复并合并，issue标记resolved，… |

代表低分 Issue：[#2042](https://gitcode.com/cann/ops-math/issues/2042)
问题：[Bug-Report|缺陷反馈]: [9.1.0 回合] A5 div 标量 TrueDiv 倒数口径与 FloorDiv 计算 dtype 与 PyTor…。

### I3 · 总结与关闭
本阶段分数为 **37.1/100**，本阶段是本周短板之一，主要问题是：关闭理由与实际矛盾，解决证据缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 9.1 | 均值 9.1，低分 22/23 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 40.2 | 均值 40.2，低分 18/23 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 37.8 | 关闭时未说明重新开启条件或后续反馈路径，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 73.8 | MR合并后由bot关闭issue并添加resolved标签，关闭时机合理，无过… |

代表低分 Issue：[#2041](https://gitcode.com/cann/ops-math/issues/2041)
问题：[Bug-Report|缺陷反馈]: A5上进行aclnnPolar异常用例测试，不支持的format未拦截。

### G · Bot/Agent 治理
本阶段分数为 **63.4/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 27.0 | 均值 27.0，低分 19/23 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 92.2 | 均值 92.2，低分 0/23 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 67.6 | bot介入前人类已完成MR创建与合并，问题已解决无需人工接续，交接无阻塞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 67.3 | bot在MR合并后正确关闭issue并添加resolved标签，流程治理有效，… |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 71.7 | bot在MR合并后执行关闭和标签操作，时机准确动作合规，无错误阻断或误判。 |

代表低分 Issue：[#2043](https://gitcode.com/cann/ops-math/issues/2043)
问题：[Bug-Report|缺陷反馈]: 新增 Im2col 算子，复用已有 op_api 时同名 op type 导致 aclnn 调用返回 561103。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 66 | 44.5 | 首期基线 | 78.4 | 54.4 | 57.6 | 37.1 | 63.4 |

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
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.7/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-06-22_to_2026-06-28.json`。
