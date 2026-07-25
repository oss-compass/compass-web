# Issue 贡献体验周报 · cann/ops-nn

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-nn` 共收到 **197** 个 Issue
+ 其中外部 Issue **47** 个、内部 **150** 个；I1–I3 及 G 基于「外部且成熟」的 **47** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 19 / Closed 178**，关闭率 **90.4%**。
+ 总体体验分为 **52.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 51.4 | 关闭流程缺乏知识沉淀 |
| P1 | I2 · 讨论与解决 | 58.4 | 确认分配后讨论长期停滞 |
| P2 | I1 · 分配与首次响应 | 77.6 | — |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中强制填写解决方案摘要（根因、修复方式、关联PR/文档），未填写则阻止关闭 |
| REC-02 | P0 | 增加用户确认前置校验：bot在关闭前需等待用户72小时内无异议回复，或用户明确确认已解决 |
| REC-03 | P1 | 要求维护者提供排查过程记录，并在关闭前等待用户至少一次确认或3天无响应后才可关闭 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 197 |
| Open / Closed | 19 / 178 |
| 关闭率 | 90.4% |
| 类型构成 | 缺陷 84 / 需求 54 / 咨询 10 / 其他 49 |
| 总体体验分 | 52.6/100（D） |
| 首次响应时间 | 中位 0.2h；均值 8.0h |
| 关闭周期 | 中位 1.0天；均值 3.0天 |
| 7天响应率 | 98.0% |
| 评论数/Issue | 1.04 |
| 标签覆盖率 | 91.4% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 92.9/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 81.6 | 5/197（2.5%） | 相对可控 | `SUB_INPUT_QUALITY` 72.1 |
| I1 · 分配与首次响应 | 77.6 | 5/47（10.6%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 58.7 |
| I2 · 讨论与解决 | 58.4 | 15/47（31.9%） | P1 | `OBJ_SOLUTION_EVIDENCE` 38.0 |
| I3 · 总结与关闭 | 51.4 | 29/47（61.7%） | P0 | `OBJ_CLOSURE_REUSE` 20.6 |
| G · Bot/Agent 治理（参考） | 65.4 | 7/47（14.9%） | 参考项 | `OBJ_BOT_GOVERNANCE` 29.9 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭流程缺乏知识沉淀 | OBJ_CLOSURE_REUSE：均值 20.6，低分 43/47；OBJ_DECISION_TRANSPARENCY：均值 63.9，低分 13/47 | 同类问题反复提出，社区知识库无法积累，维护者重复回答相同问题 |
| PP-02 | P0 | G · Bot/Agent 治理 | Bot误关闭率高达27.92% | OBJ_BOT_GOVERNANCE：均值 29.9，低分 35/47；OBJ_BOT_MISCLOSE_REVERSE：均值 98.7，低分 0/47 | 用户问题未解决即被关闭，损害社区信任度并增加 reopen 负担 |
| PP-03 | P1 | I3 · 总结与关闭 | 人工过早关闭且关闭理由不实 | OBJ_CLOSURE_REUSE：均值 20.6，低分 43/47；OBJ_DECISION_TRANSPARENCY：均值 63.9，低分 13/47 | 用户问题被忽视，社区信任度下降，同类问题可能重复提交 |
| PP-04 | P1 | I3 · 总结与关闭 | 长期停滞Issue缺乏生命周期管理 | OBJ_CLOSURE_REUSE：均值 20.6，低分 43/47；OBJ_DECISION_TRANSPARENCY：均值 63.9，低分 13/47 | Issue积压导致社区活跃度下降，贡献者和反馈者流失，有效需求被淹没 |
| PP-05 | P1 | I2 · 讨论与解决 | 确认分配后讨论长期停滞 | OBJ_SOLUTION_EVIDENCE：均值 38.0，低分 37/47；OBJ_RESULT_FORMATION_TIMELINESS：均值 69.8，低分 10/47 | 用户问题长期悬空，目标未满足，社区响应质量低，贡献者流失风险。 |
| PP-06 | P1 | G · Bot/Agent 治理 | Bot模板回复时机不当且无上下文感知 | OBJ_BOT_GOVERNANCE：均值 29.9，低分 35/47；OBJ_BOT_MISCLOSE_REVERSE：均值 98.7，低分 0/47 | 模板噪音干扰有效讨论，降低bot治理可信度，用户对bot介入产生负面感知 |
| PP-07 | P1 | G · Bot/Agent 治理 | Bot在标签分配与分流环节缺位 | OBJ_BOT_GOVERNANCE：均值 29.9，低分 35/47；OBJ_BOT_MISCLOSE_REVERSE：均值 98.7，低分 0/47 | 标签覆盖率不足导致分流延迟，人工负担加重，Issue长期无进展（17-21天停滞） |
| PP-08 | P1 | I0 · 创建 | 模板填写质量低关键信息缺失 | SUB_INPUT_QUALITY：需求模板填写完整，含背景、设计方案及期望输出表格，结构化程度高。 | 下游排查和分流困难，延长首次实质响应周期 |
| PP-09 | P2 | I2 · 讨论与解决 | 未确认解决即以未复现关闭 | OBJ_SOLUTION_EVIDENCE：均值 38.0，低分 37/47；OBJ_RESULT_FORMATION_TIMELINESS：均值 69.8，低分 10/47 | 用户问题未真正解决，信任度下降，同类问题可能反复提交。 |
| PP-10 | P2 | I2 · 讨论与解决 | Bot在人工回答后发通用模板催促 | OBJ_SOLUTION_EVIDENCE：均值 38.0，低分 37/47；OBJ_RESULT_FORMATION_TIMELINESS：均值 69.8，低分 10/47 | 产生噪音干扰，降低用户体验，暴露Bot与人工动作协调缺失。 |
| PP-11 | P2 | I0 · 创建 | 创建阶段标签缺失影响分流 | SUB_INPUT_QUALITY：需求模板填写完整，含背景、设计方案及期望输出表格，结构化程度高。 | 后续筛选统计困难，分流路径仅依赖人员分配不够健壮 |

### 4.1 低分 Issue 明细

#### PP-01 关闭流程缺乏知识沉淀（I3 · 总结与关闭）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 0分
  - 痛点原因：仅由机器人因无反馈自动关闭，关闭说明为0字，未沉淀任何需求评审结论或处理结果供后续参考。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 0分
  - 痛点原因：评论虽给出增量编译命令及原理，但关闭时无任何总结说明，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 0分
  - 痛点原因：关闭说明仅46字且无方案文档与代码链接，仅由系统自动关闭，未沉淀可参考的解决经验。
  - 原文依据：
    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：assigned to @Hana77    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 0分
  - 痛点原因：因长期无反馈被机器人自动关闭，且未留下任何关闭说明文字，导致无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 0分
  - 痛点原因：关闭说明为0字且未关联主链接，仅指派处理人，未沉淀最终解决方案供他人复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 0分
  - 痛点原因：仅给出简短建议后因超时被机器人自动关闭，无方案沉淀与关闭说明，无复用价值。
  - 原文依据：
    - `fullt`：add label wait-feedback    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，关闭说明为0字，未沉淀问题总结与解决方案，无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 0分
  - 痛点原因：关闭时无任何文字说明，未记录最终解决方案或处理结果，无法为后续类似问题提供参考。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，无人工关闭说明，导致解决方案未有效沉淀，缺乏复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档，仅以暂无支持计划为由关闭，未提供替代方案或文档记录，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 0分
  - 痛点原因：关闭说明仅为机器人自动回复，缺乏方案文档化与关联主链接，未沉淀可供复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801    - `cann-robot`：add label resolved    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：assigned to @doufloat
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 0分
  - 痛点原因：未给出最终解决方案且无文档化沉淀，问题未闭环即被关闭，无法为他人提供复用价值。
  - 原文依据：
    - `jinpenghe`：closed from codehub    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现
- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：关闭说明为空，仅口头回复因工程结构差异暂不修改，未沉淀替代方案或文档，无参考价值。
  - 原文依据：
    - `fullt`：add label requirement    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `yolic`：assigned to @yang-di52
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 0分
  - 痛点原因：关闭说明仅19字且无方案文档与主链接，仅靠机器人关联其他issue关闭，缺乏可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `yang-di52`：assigned to @yang-di52    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 0分
  - 痛点原因：仅以4字系统说明关闭，无方案文档化及复用链接，未留存任何解决价值。
  - 原文依据：
    - `wuxs68`：closed from codehub    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅记录问题接收与分配，关闭说明为空且无方案文档化，未提供任何可复用的解决信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 0分
  - 痛点原因：仅由机器人自动关闭且说明仅7字，无方案文档与重复链接，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 0分
  - 痛点原因：无方案文档沉淀且关闭说明仅19字，仅由机器人因关联MR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 0分
  - 痛点原因：关闭说明仅27字且无方案文档化，未沉淀任何解决方案或关联信息，无法供他人参考复用。
  - 原文依据：
    - `chenqi317`：closed from codehub    - `chenqi317`：changed custom state from 进行中 to 已完成    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 0分
  - 痛点原因：仅机器人自动关闭且说明过短，无方案文档化记录，未提供dup主链接，缺乏对性能劣化原因与修复方案的详细描述。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `chenqi317`：assigned to @chenqi317    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀可复用的结论。
  - 原文依据：
    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关闭时未留下任何文字说明，缺乏方案文档与复用链接，未留存可供后续参考的有效信息。
  - 原文依据：
    - `fanqirui`：add label requirement    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `oscillated`：assigned to @chenqi317    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 0分
  - 痛点原因：关闭说明过于简略，仅说明PR合入，无方案文档化，未沉淀问题原因与解决方案，导致无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `chenqi317`：assigned to @chenqi317    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档或重复链接，且关联PR未合并，无任何复用价值。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 25分
  - 痛点原因：关闭过程仅涉及状态流转与系统关闭，无方案文档化及复用链接，说明简略，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已确认    - `harrynospot`：closed from codehub    - `harrynospot`：changed custom state from 已确认 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已解决
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 25分
  - 痛点原因：关闭说明仅78字且无方案文档沉淀，未提供实质技术解答，缺乏可复用的排查经验。
  - 原文依据：
    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `yolic`：assigned to @liujie12345678
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 25分
  - 痛点原因：仅以正在跟踪处理为由草率关闭，未沉淀方案文档或提供具体解决步骤，无复用价值。
  - 原文依据：
    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 25分
  - 痛点原因：仅靠机器人因MR合并自动关闭，无人工解决方案总结、复用链接与文档沉淀，难以供他人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `oscillated`：assigned to @ww-blue    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 25分
  - 痛点原因：关闭时仅简单标记完成，无方案文档化记录与具体解决说明，未沉淀可复用知识。
  - 原文依据：
    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `oscillated`：assigned to @liujie12345678
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 25分
  - 痛点原因：关闭时仅简单标注closed from codehub，缺乏具体解决方案、修复链接及文档沉淀，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `oscillated`：assigned to @yue-ma    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 25分
  - 痛点原因：仅机器人自动关闭，无方案文档沉淀与复用链接，关闭说明缺乏实质参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 25分
  - 痛点原因：关闭说明仅简述因关联MR合并而关闭，无方案文档化且未提供重复主链接，缺乏复用细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `oscillated`：assigned to @lianjieyu    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 30分
  - 痛点原因：关闭说明仅22字且为机器人自动关联MR关闭，缺乏对问题根因和修复方案的详细总结，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 30分
  - 痛点原因：机器人自动关联合并关闭且说明仅21字，未沉淀具体修复方案与关联PR链接，导致后续参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 30分
  - 痛点原因：关闭说明仅31字且由机器人随MR合并自动关闭，未关联重复issue主链接，缺乏详细方案总结供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - `cann-robot`：add label resolved    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cong-jiyu`：assigned to @cong-jiyu    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 30分
  - 痛点原因：关闭说明仅由机器人自动触发且简略，缺乏人工对根因与解决方案的总结，且未落实A2场景文档补充，导致难以复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `chenqi317`：assigned to @ji-songyuan    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 30分
  - 痛点原因：关闭说明仅17字且无关联主链接，仅说明随MR合并关闭，缺乏具体解决细节，导致后续参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 45分
  - 痛点原因：关闭说明仅131字且无方案文档化，仅记录状态变更与责任人指派，缺乏根因分析与解决方案沉淀，难以供他人参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `oscillated`：assigned to @liujie12345678
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联MR合并生成，缺乏具体解决方案沉淀，对其他用户参考价值有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 55分
  - 痛点原因：机器人以关联 issue 合并为由关闭，缺少 dup 主 issue 链接，且未明确文档修复进度与最终方案，复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 55分
  - 痛点原因：关闭说明为机器人模板话术，仅引用关联issue而无具体修改细节总结，缺乏明确指引，后续用户无法直接获取方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 55分
  - 痛点原因：关闭说明仅86字且多为系统自动操作，未明确指引文档更新位置或总结解决方案，导致复用信息不足。
  - 原文依据：
    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `oscillated`：assigned to @liujie12345678
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 55分
  - 痛点原因：系统自动关闭且关闭说明仅68字，未关联重复问题主链接，缺乏具体修复细节供他人复用。
  - 原文依据：
    - `xieshengwei1024`：closed from codehub    - `xieshengwei1024`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `oscillated`：assigned to @yue-ma
#### PP-02 Bot误关闭率高达27.92%（G · Bot/Agent 治理）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 15分
  - 痛点原因：Bot仅留催促评论，未自动打标或关闭，需人工补充标签和指派，自动化治理失效。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：Bot未打标和关闭，且在已有用户解答的情况下仍机械要求补充信息并威胁关闭，治理无效。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 15分
  - 痛点原因：Bot仅发送提示评论，未实际执行打标和自动关闭动作，治理未闭环且依赖人工操作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 15分
  - 痛点原因：Bot仅发送一条模板化催促评论，未执行打标与关闭动作，缺乏实质性治理。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：Bot在人工已解答后仍机械发送要求补充信息的模板回复并威胁关闭，属于无效治理和误判。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：Bot仅发送1条催促评论，未执行自动打标与自动关闭，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 20分
  - 痛点原因：Bot仅执行打标和分配，无评论且未自动关闭，最终由人工关闭导致治理失效。
  - 原文依据：
    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77    - `zhu-xun`：closed from codehub    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 20分
  - 痛点原因：Bot仅执行了打标动作，未产生任何评论互动，缺乏实质性引导，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 20分
  - 痛点原因：Bot仅完成初始打标，未进行评论互动与自动关闭，缺乏后续跟进与闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @cui_jiahao
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 20分
  - 痛点原因：Bot仅执行基础打标与关闭，评论数为零，缺乏自动回复或指派等实质性交互，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `cann-robot`：add label resolved    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 20分
  - 痛点原因：Bot仅机械打标和关闭，无任何评论沟通，在问题仅处于正在处理阶段便过早标记resolved并关闭。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，缺乏自动化引导与进度反馈。
  - 原文依据：
    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论无状态反馈，治理流于形式缺乏有效互动。
  - 原文依据：
    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 20分
  - 痛点原因：Bot错误关闭需求建议并标记为已解决，且零评论互动，机械执行导致治理失当。
  - 原文依据：
    - `chenfeng61`：/assign    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：unassigned @chenfeng61
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何有效评论互动，实际治理与引导均由人工完成。
  - 原文依据：
    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `zhang-wenbo-beat`：assigned to @zhang-wenbo-beat    - `chenqi317`：assigned to @chenqi317
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 20分
  - 痛点原因：Bot仅执行机械的打标与关闭操作，无任何评论互动，缺乏状态解释与治理引导，未能有效辅助社区沟通。
  - 原文依据：
    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cann-robot`：add label resolved    - `cong-jiyu`：assigned to @cong-jiyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 20分
  - 痛点原因：需求已确认且代码已合入，Bot仅完成打标却未自动关闭Issue，也无评论跟进，导致治理未闭环。
  - 原文依据：
    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `he_kan`：assigned to @he_kan
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 20分
  - 痛点原因：Bot在开发者刚提交PR尚未合并修复时即自动标记resolved并关闭，属于过早无效关闭。
  - 原文依据：
    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 20分
  - 痛点原因：问题仅被人工确认分配尚未解决，Bot便错误打标resolved并关闭issue。
  - 原文依据：
    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @ji-songyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，未能发挥自动化引导作用，治理流于形式。
  - 原文依据：
    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：assigned to @chenqi317
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 20分
  - 痛点原因：Bot仅机械打标并关闭，评论数为零，未与用户进行有效互动或提供处理引导，缺乏实质治理动作。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 20分
  - 痛点原因：Bot仅机械执行打标和自动关闭，无任何有效评论与用户互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 20分
  - 痛点原因：Bot 仅执行打标，未自动关闭该 issue，且无任何评论互动，治理动作单一缺乏自动化闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @Chen_HaoWen    - `liujie12345678`：unassigned @liujie12345678
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未在问题解决后自动关闭issue，且全程无评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 20分
  - 痛点原因：Bot仅机械打标与关联关闭，无任何评论互动，缺乏实质性进度同步与治理反馈，有效性不足。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭操作且无任何评论互动，治理动作单一不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @east_yang    - `liujie12345678`：unassigned @liujie12345678
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 20分
  - 痛点原因：Bot仅执行打标动作，未参与评论与关闭issue，治理动作单一，缺乏实际介入。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未自动关闭，治理动作单一未闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang    - `sreofwiseone`：closed from codehub
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无评论互动，未能有效沟通引导用户。
  - 原文依据：
    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3686](https://gitcode.com/cann/ops-nn/issues/3686) [Requirement|需求建议]:matmul 多个算子 Kernel 内 GM 逐元素访问、属性类型与 IR 不一致及文档/参数错误** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭且无任何评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@sxb154714](https://gitcode.com/sxb154714) [@chaotang233](https://gitcode.com/chaotang233) [@y…    - `Hu1L1`：A3. matmul/common/cmct/kernel/kernel_qbmm_cube.h:197,205,209,215这个问题 确认写法符合预期，在实际场景中通过GetValue获取一个标量，经评估直接从GlobalTensor…    - `cann-robot`：add label resolved    - `oscillated`：assigned to @sxb154714    - `oscillated`：assigned to @chaotang233    - `oscillated`：assigned to @yue-ma
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论解答与关闭，实际跟进与解决全依赖人工，治理作用极低。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @yue-ma    - `oscillated`：unassigned @yue-ma    - `chenqi317`：assigned to @zhanglei842
- **[#3683](https://gitcode.com/cann/ops-nn/issues/3683) [Bug-Report|缺陷反馈]: optim 多个算子 Kernel 内 GM 逐元素访问及属性/参数类型与 IR 声明不一致** — 20分
  - 痛点原因：Bot仅机械打标并关闭问题，无任何有效评论互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@kerten](https://gitcode.com/kerten) [@li_wei21](https://gitcode.com/li_wei21) 正在跟踪处理。    - `east_yang`：感谢您的反馈，advance_step算子使用于vlmm场景下更新模型inputToken、inputPositions、seqLens和slotMapping，对于你提到的几处SetValue和GetValue，其下标index含义是n…    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @li_wei21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，未发表任何评论进行引导或解答，实际处理完全依赖人工，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 20分
  - 痛点原因：Bot仅机械打标并随MR合并自动关闭，全程无任何评论，缺乏进度同步与有效回复。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 35分
  - 痛点原因：Bot仅拦截无效指派，未有效引导指派给仓库成员，且未参与后续关闭等治理闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
#### PP-03 人工过早关闭且关闭理由不实（I3 · 总结与关闭）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 0分
  - 痛点原因：仅由机器人因无反馈自动关闭，关闭说明为0字，未沉淀任何需求评审结论或处理结果供后续参考。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 0分
  - 痛点原因：评论虽给出增量编译命令及原理，但关闭时无任何总结说明，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 0分
  - 痛点原因：关闭说明仅46字且无方案文档与代码链接，仅由系统自动关闭，未沉淀可参考的解决经验。
  - 原文依据：
    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：assigned to @Hana77    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 0分
  - 痛点原因：因长期无反馈被机器人自动关闭，且未留下任何关闭说明文字，导致无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 0分
  - 痛点原因：关闭说明为0字且未关联主链接，仅指派处理人，未沉淀最终解决方案供他人复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 0分
  - 痛点原因：仅给出简短建议后因超时被机器人自动关闭，无方案沉淀与关闭说明，无复用价值。
  - 原文依据：
    - `fullt`：add label wait-feedback    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，关闭说明为0字，未沉淀问题总结与解决方案，无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 0分
  - 痛点原因：关闭时无任何文字说明，未记录最终解决方案或处理结果，无法为后续类似问题提供参考。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，无人工关闭说明，导致解决方案未有效沉淀，缺乏复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档，仅以暂无支持计划为由关闭，未提供替代方案或文档记录，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 0分
  - 痛点原因：关闭说明仅为机器人自动回复，缺乏方案文档化与关联主链接，未沉淀可供复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801    - `cann-robot`：add label resolved    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：assigned to @doufloat
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 0分
  - 痛点原因：未给出最终解决方案且无文档化沉淀，问题未闭环即被关闭，无法为他人提供复用价值。
  - 原文依据：
    - `jinpenghe`：closed from codehub    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现
- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：关闭说明为空，仅口头回复因工程结构差异暂不修改，未沉淀替代方案或文档，无参考价值。
  - 原文依据：
    - `fullt`：add label requirement    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `yolic`：assigned to @yang-di52
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 0分
  - 痛点原因：关闭说明仅19字且无方案文档与主链接，仅靠机器人关联其他issue关闭，缺乏可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `yang-di52`：assigned to @yang-di52    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 0分
  - 痛点原因：仅以4字系统说明关闭，无方案文档化及复用链接，未留存任何解决价值。
  - 原文依据：
    - `wuxs68`：closed from codehub    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅记录问题接收与分配，关闭说明为空且无方案文档化，未提供任何可复用的解决信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 0分
  - 痛点原因：仅由机器人自动关闭且说明仅7字，无方案文档与重复链接，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 0分
  - 痛点原因：无方案文档沉淀且关闭说明仅19字，仅由机器人因关联MR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 0分
  - 痛点原因：关闭说明仅27字且无方案文档化，未沉淀任何解决方案或关联信息，无法供他人参考复用。
  - 原文依据：
    - `chenqi317`：closed from codehub    - `chenqi317`：changed custom state from 进行中 to 已完成    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 0分
  - 痛点原因：仅机器人自动关闭且说明过短，无方案文档化记录，未提供dup主链接，缺乏对性能劣化原因与修复方案的详细描述。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `chenqi317`：assigned to @chenqi317    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀可复用的结论。
  - 原文依据：
    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关闭时未留下任何文字说明，缺乏方案文档与复用链接，未留存可供后续参考的有效信息。
  - 原文依据：
    - `fanqirui`：add label requirement    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `oscillated`：assigned to @chenqi317    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 0分
  - 痛点原因：关闭说明过于简略，仅说明PR合入，无方案文档化，未沉淀问题原因与解决方案，导致无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `chenqi317`：assigned to @chenqi317    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档或重复链接，且关联PR未合并，无任何复用价值。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 25分
  - 痛点原因：关闭过程仅涉及状态流转与系统关闭，无方案文档化及复用链接，说明简略，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已确认    - `harrynospot`：closed from codehub    - `harrynospot`：changed custom state from 已确认 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已解决
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 25分
  - 痛点原因：关闭说明仅78字且无方案文档沉淀，未提供实质技术解答，缺乏可复用的排查经验。
  - 原文依据：
    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `yolic`：assigned to @liujie12345678
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 25分
  - 痛点原因：仅以正在跟踪处理为由草率关闭，未沉淀方案文档或提供具体解决步骤，无复用价值。
  - 原文依据：
    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 25分
  - 痛点原因：仅靠机器人因MR合并自动关闭，无人工解决方案总结、复用链接与文档沉淀，难以供他人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `oscillated`：assigned to @ww-blue    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 25分
  - 痛点原因：关闭时仅简单标记完成，无方案文档化记录与具体解决说明，未沉淀可复用知识。
  - 原文依据：
    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `oscillated`：assigned to @liujie12345678
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 25分
  - 痛点原因：关闭时仅简单标注closed from codehub，缺乏具体解决方案、修复链接及文档沉淀，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `oscillated`：assigned to @yue-ma    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 25分
  - 痛点原因：仅机器人自动关闭，无方案文档沉淀与复用链接，关闭说明缺乏实质参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 25分
  - 痛点原因：关闭说明仅简述因关联MR合并而关闭，无方案文档化且未提供重复主链接，缺乏复用细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `oscillated`：assigned to @lianjieyu    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 30分
  - 痛点原因：关闭说明仅22字且为机器人自动关联MR关闭，缺乏对问题根因和修复方案的详细总结，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 30分
  - 痛点原因：机器人自动关联合并关闭且说明仅21字，未沉淀具体修复方案与关联PR链接，导致后续参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 30分
  - 痛点原因：关闭说明仅31字且由机器人随MR合并自动关闭，未关联重复issue主链接，缺乏详细方案总结供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - `cann-robot`：add label resolved    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cong-jiyu`：assigned to @cong-jiyu    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 30分
  - 痛点原因：关闭说明仅由机器人自动触发且简略，缺乏人工对根因与解决方案的总结，且未落实A2场景文档补充，导致难以复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `chenqi317`：assigned to @ji-songyuan    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 30分
  - 痛点原因：关闭说明仅17字且无关联主链接，仅说明随MR合并关闭，缺乏具体解决细节，导致后续参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 45分
  - 痛点原因：关闭说明仅131字且无方案文档化，仅记录状态变更与责任人指派，缺乏根因分析与解决方案沉淀，难以供他人参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `oscillated`：assigned to @liujie12345678
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联MR合并生成，缺乏具体解决方案沉淀，对其他用户参考价值有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 55分
  - 痛点原因：机器人以关联 issue 合并为由关闭，缺少 dup 主 issue 链接，且未明确文档修复进度与最终方案，复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 55分
  - 痛点原因：关闭说明为机器人模板话术，仅引用关联issue而无具体修改细节总结，缺乏明确指引，后续用户无法直接获取方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 55分
  - 痛点原因：关闭说明仅86字且多为系统自动操作，未明确指引文档更新位置或总结解决方案，导致复用信息不足。
  - 原文依据：
    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `oscillated`：assigned to @liujie12345678
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 55分
  - 痛点原因：系统自动关闭且关闭说明仅68字，未关联重复问题主链接，缺乏具体修复细节供他人复用。
  - 原文依据：
    - `xieshengwei1024`：closed from codehub    - `xieshengwei1024`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `oscillated`：assigned to @yue-ma
#### PP-04 长期停滞Issue缺乏生命周期管理（I3 · 总结与关闭）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 0分
  - 痛点原因：仅由机器人因无反馈自动关闭，关闭说明为0字，未沉淀任何需求评审结论或处理结果供后续参考。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 0分
  - 痛点原因：评论虽给出增量编译命令及原理，但关闭时无任何总结说明，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 0分
  - 痛点原因：关闭说明仅46字且无方案文档与代码链接，仅由系统自动关闭，未沉淀可参考的解决经验。
  - 原文依据：
    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：assigned to @Hana77    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 0分
  - 痛点原因：因长期无反馈被机器人自动关闭，且未留下任何关闭说明文字，导致无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 0分
  - 痛点原因：关闭说明为0字且未关联主链接，仅指派处理人，未沉淀最终解决方案供他人复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 0分
  - 痛点原因：仅给出简短建议后因超时被机器人自动关闭，无方案沉淀与关闭说明，无复用价值。
  - 原文依据：
    - `fullt`：add label wait-feedback    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，关闭说明为0字，未沉淀问题总结与解决方案，无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 0分
  - 痛点原因：关闭时无任何文字说明，未记录最终解决方案或处理结果，无法为后续类似问题提供参考。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 0分
  - 痛点原因：仅由机器人因超时自动关闭，无人工关闭说明，导致解决方案未有效沉淀，缺乏复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档，仅以暂无支持计划为由关闭，未提供替代方案或文档记录，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 0分
  - 痛点原因：关闭说明仅为机器人自动回复，缺乏方案文档化与关联主链接，未沉淀可供复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801    - `cann-robot`：add label resolved    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：assigned to @doufloat
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 0分
  - 痛点原因：未给出最终解决方案且无文档化沉淀，问题未闭环即被关闭，无法为他人提供复用价值。
  - 原文依据：
    - `jinpenghe`：closed from codehub    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现
- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：关闭说明为空，仅口头回复因工程结构差异暂不修改，未沉淀替代方案或文档，无参考价值。
  - 原文依据：
    - `fullt`：add label requirement    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `yolic`：assigned to @yang-di52
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 0分
  - 痛点原因：关闭说明仅19字且无方案文档与主链接，仅靠机器人关联其他issue关闭，缺乏可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `yang-di52`：assigned to @yang-di52    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 0分
  - 痛点原因：仅以4字系统说明关闭，无方案文档化及复用链接，未留存任何解决价值。
  - 原文依据：
    - `wuxs68`：closed from codehub    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅记录问题接收与分配，关闭说明为空且无方案文档化，未提供任何可复用的解决信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 0分
  - 痛点原因：仅由机器人自动关闭且说明仅7字，无方案文档与重复链接，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 0分
  - 痛点原因：无方案文档沉淀且关闭说明仅19字，仅由机器人因关联MR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 0分
  - 痛点原因：关闭说明仅27字且无方案文档化，未沉淀任何解决方案或关联信息，无法供他人参考复用。
  - 原文依据：
    - `chenqi317`：closed from codehub    - `chenqi317`：changed custom state from 进行中 to 已完成    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 0分
  - 痛点原因：仅机器人自动关闭且说明过短，无方案文档化记录，未提供dup主链接，缺乏对性能劣化原因与修复方案的详细描述。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `chenqi317`：assigned to @chenqi317    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀可复用的结论。
  - 原文依据：
    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关闭时未留下任何文字说明，缺乏方案文档与复用链接，未留存可供后续参考的有效信息。
  - 原文依据：
    - `fanqirui`：add label requirement    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `oscillated`：assigned to @chenqi317    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 0分
  - 痛点原因：关闭说明过于简略，仅说明PR合入，无方案文档化，未沉淀问题原因与解决方案，导致无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `chenqi317`：assigned to @chenqi317    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档或重复链接，且关联PR未合并，无任何复用价值。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 25分
  - 痛点原因：关闭过程仅涉及状态流转与系统关闭，无方案文档化及复用链接，说明简略，缺乏参考价值。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已确认    - `harrynospot`：closed from codehub    - `harrynospot`：changed custom state from 已确认 to 已完成    - `harrynospot`：changed custom state from 已完成 to 已解决
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 25分
  - 痛点原因：关闭说明仅78字且无方案文档沉淀，未提供实质技术解答，缺乏可复用的排查经验。
  - 原文依据：
    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `yolic`：assigned to @liujie12345678
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 25分
  - 痛点原因：仅以正在跟踪处理为由草率关闭，未沉淀方案文档或提供具体解决步骤，无复用价值。
  - 原文依据：
    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 25分
  - 痛点原因：仅靠机器人因MR合并自动关闭，无人工解决方案总结、复用链接与文档沉淀，难以供他人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `oscillated`：assigned to @ww-blue    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 25分
  - 痛点原因：关闭时仅简单标记完成，无方案文档化记录与具体解决说明，未沉淀可复用知识。
  - 原文依据：
    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `oscillated`：assigned to @liujie12345678
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 25分
  - 痛点原因：关闭时仅简单标注closed from codehub，缺乏具体解决方案、修复链接及文档沉淀，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `oscillated`：assigned to @yue-ma    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 25分
  - 痛点原因：仅机器人自动关闭，无方案文档沉淀与复用链接，关闭说明缺乏实质参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 25分
  - 痛点原因：关闭说明仅简述因关联MR合并而关闭，无方案文档化且未提供重复主链接，缺乏复用细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `oscillated`：assigned to @lianjieyu    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 30分
  - 痛点原因：关闭说明仅22字且为机器人自动关联MR关闭，缺乏对问题根因和修复方案的详细总结，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 30分
  - 痛点原因：机器人自动关联合并关闭且说明仅21字，未沉淀具体修复方案与关联PR链接，导致后续参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - `cann-robot`：add label resolved    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `tangweiwei2`：assigned to @chenqi317    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 30分
  - 痛点原因：关闭说明仅31字且由机器人随MR合并自动关闭，未关联重复issue主链接，缺乏详细方案总结供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - `cann-robot`：add label resolved    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cong-jiyu`：assigned to @cong-jiyu    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 30分
  - 痛点原因：关闭说明仅由机器人自动触发且简略，缺乏人工对根因与解决方案的总结，且未落实A2场景文档补充，导致难以复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `chenqi317`：assigned to @ji-songyuan    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 30分
  - 痛点原因：关闭说明仅17字且无关联主链接，仅说明随MR合并关闭，缺乏具体解决细节，导致后续参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：assigned to @tangweiwei2
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 45分
  - 痛点原因：关闭说明仅131字且无方案文档化，仅记录状态变更与责任人指派，缺乏根因分析与解决方案沉淀，难以供他人参考。
  - 原文依据：
    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `oscillated`：assigned to @liujie12345678
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联MR合并生成，缺乏具体解决方案沉淀，对其他用户参考价值有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - `cann-robot`：add label resolved    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 55分
  - 痛点原因：机器人以关联 issue 合并为由关闭，缺少 dup 主 issue 链接，且未明确文档修复进度与最终方案，复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 55分
  - 痛点原因：关闭说明为机器人模板话术，仅引用关联issue而无具体修改细节总结，缺乏明确指引，后续用户无法直接获取方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `oscillated`：assigned to @yu-xinjie62    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 55分
  - 痛点原因：关闭说明仅86字且多为系统自动操作，未明确指引文档更新位置或总结解决方案，导致复用信息不足。
  - 原文依据：
    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `oscillated`：assigned to @liujie12345678
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 55分
  - 痛点原因：系统自动关闭且关闭说明仅68字，未关联重复问题主链接，缺乏具体修复细节供他人复用。
  - 原文依据：
    - `xieshengwei1024`：closed from codehub    - `xieshengwei1024`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `oscillated`：assigned to @yue-ma
#### PP-05 确认分配后讨论长期停滞（I2 · 讨论与解决）

- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：未关联PR、commit或文档，仅口头回复因工程结构差异暂不修改，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `fullt`：add label requirement    - `yolic`：assigned to @yang-di52
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅回复已收到并指派处理人，未关联任何 PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关联PR仍处于open状态，无代码提交、文档或版本发布等引用，仅停留在分配处理阶段，未提供实际解决证据。
  - 原文依据：
    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `fanqirui`：add label requirement    - `oscillated`：assigned to @chenqi317
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：仅提供文字解答与编译命令，无关联PR或commit引用，且缺乏用户确认解决的闭环证据。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：无关联PR、commit或release等实质性修复证据，仅停留在解释说明与等待反馈阶段。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论，仅停留在指派跟踪阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：无关联PR与commit引用，仅提供操作建议并处于等待用户反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 23分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档及release链接等证明解决细节的强证据。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及release说明等强证据，且由外部系统自动关闭，证据偏弱。
  - 原文依据：
    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 23分
  - 痛点原因：维护者以暂无支持计划为由直接关闭，未提供任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `chenxingyu18`：closed from codehub    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档及release链接，且关闭评论仅为指派讨论，无实质性解决说明。
  - 原文依据：
    - [关联PR #6849（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6849)    - [关联PR #6989（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6989)    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 23分
  - 痛点原因：仅靠评论引导用户去外部平台申请权限，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 23分
  - 痛点原因：无关联PR、commit或文档等实质解决证据，评论仅停留在问题受理与无关的加组织申请，未给出实际解决方案。
  - 原文依据：
    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。    - `wuxs68`：closed from codehub
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等直接解决证据支撑。
  - 原文依据：
    - [关联PR #6736（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6736)    - `chenfeng61`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 23分
  - 痛点原因：虽有合并的关联PR与接纳评论，但缺乏commit引用、文档链接及release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #5976（merged）](https://gitcode.com/cann/ops-nn/merge_requests/5976)    - [关联PR #6657（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6657)    - [关联PR #6729（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6729)    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `chenqi317`：closed from codehub
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 23分
  - 痛点原因：仅靠关联PR合并和机器人自动关闭，缺乏commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 23分
  - 痛点原因：缺乏关联PR、commit或文档等实质性修复证据，仅凭评论解释即关闭。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 23分
  - 痛点原因：仅凭口头解释无需修改便关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit、文档及release引用，无人工对问题解决细节的实质性说明。
  - 原文依据：
    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu
- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在引导沟通和等待反馈阶段，缺乏实质性的代码解决产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在指派和跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 31分
  - 痛点原因：仅提供文字建议，无关联PR或文档链接，且处于等待反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 31分
  - 痛点原因：关联PR未合并且无文档与release引用，仅停留在指派跟踪阶段，缺乏问题已实际解决的证据。
  - 原文依据：
    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 38分
  - 痛点原因：无关联PR、commit或文档等修复证据，仅停留在沟通和提供日志阶段，未给出最终解决方案。
  - 原文依据：
    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现    - `jinpenghe`：closed from codehub
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 38分
  - 痛点原因：虽关联已合并PR，但缺commit与文档链接，关闭评论仅为客套回复，未提供根因分析或具体修复方案说明。
  - 原文依据：
    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)    - [关联PR #6853（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6853)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭评论为机器人自动回复，缺乏人工验证解决结果的证据。
  - 原文依据：
    - [关联PR #6758（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6758)    - [关联PR #6785（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6785)    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅指派任务未总结解决结果。
  - 原文依据：
    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)    - [关联PR #6924（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6924)    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 38分
  - 痛点原因：虽有关联PR且已合入，但缺少commit引用与release版本说明，导致证据不够充分。
  - 原文依据：
    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 38分
  - 痛点原因：虽有关联已合并PR，但缺少commit与release引用，关闭评论仅为常规回复，未提供具体修复验证证据，解决证据不够充分。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 38分
  - 痛点原因：虽关联多个合并PR，但无commit引用，且关闭评论仅停留在问题已收阶段，未明确说明最终解决状态，证据链不完整。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无最终解决或关闭评论，缺乏有效解决证明。
  - 原文依据：
    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 54分
  - 痛点原因：仅凭口头解释与测试建议关闭，缺乏关联PR或官方文档等实质性解决证据支撑。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 54分
  - 痛点原因：虽有两个已合并PR及关闭评论，但缺少文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)    - [关联PR #6799（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6799)    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 54分
  - 痛点原因：因缺少 commit 引用，且仅靠机器人自动关闭，解决过程的证据链不够完整。
  - 原文依据：
    - [关联PR #6793（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6793)    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，且关闭评论多为机器人自动回复，证据链不完整。
  - 原文依据：
    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 54分
  - 痛点原因：关联PR仅为closed状态，且缺乏文档链接与release引用，解决证据链不够完整。
  - 原文依据：
    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：assigned to @yue-ma
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 54分
  - 痛点原因：仅靠评论口头解释，未提供关联PR、文档链接或release等实质性修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
#### PP-06 Bot模板回复时机不当且无上下文感知（G · Bot/Agent 治理）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 15分
  - 痛点原因：Bot仅留催促评论，未自动打标或关闭，需人工补充标签和指派，自动化治理失效。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：Bot未打标和关闭，且在已有用户解答的情况下仍机械要求补充信息并威胁关闭，治理无效。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 15分
  - 痛点原因：Bot仅发送提示评论，未实际执行打标和自动关闭动作，治理未闭环且依赖人工操作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 15分
  - 痛点原因：Bot仅发送一条模板化催促评论，未执行打标与关闭动作，缺乏实质性治理。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：Bot在人工已解答后仍机械发送要求补充信息的模板回复并威胁关闭，属于无效治理和误判。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：Bot仅发送1条催促评论，未执行自动打标与自动关闭，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 20分
  - 痛点原因：Bot仅执行打标和分配，无评论且未自动关闭，最终由人工关闭导致治理失效。
  - 原文依据：
    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77    - `zhu-xun`：closed from codehub    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 20分
  - 痛点原因：Bot仅执行了打标动作，未产生任何评论互动，缺乏实质性引导，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 20分
  - 痛点原因：Bot仅完成初始打标，未进行评论互动与自动关闭，缺乏后续跟进与闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @cui_jiahao
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 20分
  - 痛点原因：Bot仅执行基础打标与关闭，评论数为零，缺乏自动回复或指派等实质性交互，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `cann-robot`：add label resolved    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 20分
  - 痛点原因：Bot仅机械打标和关闭，无任何评论沟通，在问题仅处于正在处理阶段便过早标记resolved并关闭。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，缺乏自动化引导与进度反馈。
  - 原文依据：
    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论无状态反馈，治理流于形式缺乏有效互动。
  - 原文依据：
    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 20分
  - 痛点原因：Bot错误关闭需求建议并标记为已解决，且零评论互动，机械执行导致治理失当。
  - 原文依据：
    - `chenfeng61`：/assign    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：unassigned @chenfeng61
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何有效评论互动，实际治理与引导均由人工完成。
  - 原文依据：
    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `zhang-wenbo-beat`：assigned to @zhang-wenbo-beat    - `chenqi317`：assigned to @chenqi317
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 20分
  - 痛点原因：Bot仅执行机械的打标与关闭操作，无任何评论互动，缺乏状态解释与治理引导，未能有效辅助社区沟通。
  - 原文依据：
    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cann-robot`：add label resolved    - `cong-jiyu`：assigned to @cong-jiyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 20分
  - 痛点原因：需求已确认且代码已合入，Bot仅完成打标却未自动关闭Issue，也无评论跟进，导致治理未闭环。
  - 原文依据：
    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `he_kan`：assigned to @he_kan
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 20分
  - 痛点原因：Bot在开发者刚提交PR尚未合并修复时即自动标记resolved并关闭，属于过早无效关闭。
  - 原文依据：
    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 20分
  - 痛点原因：问题仅被人工确认分配尚未解决，Bot便错误打标resolved并关闭issue。
  - 原文依据：
    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @ji-songyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，未能发挥自动化引导作用，治理流于形式。
  - 原文依据：
    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：assigned to @chenqi317
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 20分
  - 痛点原因：Bot仅机械打标并关闭，评论数为零，未与用户进行有效互动或提供处理引导，缺乏实质治理动作。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 20分
  - 痛点原因：Bot仅机械执行打标和自动关闭，无任何有效评论与用户互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 20分
  - 痛点原因：Bot 仅执行打标，未自动关闭该 issue，且无任何评论互动，治理动作单一缺乏自动化闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @Chen_HaoWen    - `liujie12345678`：unassigned @liujie12345678
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未在问题解决后自动关闭issue，且全程无评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 20分
  - 痛点原因：Bot仅机械打标与关联关闭，无任何评论互动，缺乏实质性进度同步与治理反馈，有效性不足。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭操作且无任何评论互动，治理动作单一不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @east_yang    - `liujie12345678`：unassigned @liujie12345678
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 20分
  - 痛点原因：Bot仅执行打标动作，未参与评论与关闭issue，治理动作单一，缺乏实际介入。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未自动关闭，治理动作单一未闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang    - `sreofwiseone`：closed from codehub
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无评论互动，未能有效沟通引导用户。
  - 原文依据：
    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3686](https://gitcode.com/cann/ops-nn/issues/3686) [Requirement|需求建议]:matmul 多个算子 Kernel 内 GM 逐元素访问、属性类型与 IR 不一致及文档/参数错误** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭且无任何评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@sxb154714](https://gitcode.com/sxb154714) [@chaotang233](https://gitcode.com/chaotang233) [@y…    - `Hu1L1`：A3. matmul/common/cmct/kernel/kernel_qbmm_cube.h:197,205,209,215这个问题 确认写法符合预期，在实际场景中通过GetValue获取一个标量，经评估直接从GlobalTensor…    - `cann-robot`：add label resolved    - `oscillated`：assigned to @sxb154714    - `oscillated`：assigned to @chaotang233    - `oscillated`：assigned to @yue-ma
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论解答与关闭，实际跟进与解决全依赖人工，治理作用极低。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @yue-ma    - `oscillated`：unassigned @yue-ma    - `chenqi317`：assigned to @zhanglei842
- **[#3683](https://gitcode.com/cann/ops-nn/issues/3683) [Bug-Report|缺陷反馈]: optim 多个算子 Kernel 内 GM 逐元素访问及属性/参数类型与 IR 声明不一致** — 20分
  - 痛点原因：Bot仅机械打标并关闭问题，无任何有效评论互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@kerten](https://gitcode.com/kerten) [@li_wei21](https://gitcode.com/li_wei21) 正在跟踪处理。    - `east_yang`：感谢您的反馈，advance_step算子使用于vlmm场景下更新模型inputToken、inputPositions、seqLens和slotMapping，对于你提到的几处SetValue和GetValue，其下标index含义是n…    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @li_wei21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，未发表任何评论进行引导或解答，实际处理完全依赖人工，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 20分
  - 痛点原因：Bot仅机械打标并随MR合并自动关闭，全程无任何评论，缺乏进度同步与有效回复。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 35分
  - 痛点原因：Bot仅拦截无效指派，未有效引导指派给仓库成员，且未参与后续关闭等治理闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
#### PP-07 Bot在标签分配与分流环节缺位（G · Bot/Agent 治理）

- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 15分
  - 痛点原因：Bot仅留催促评论，未自动打标或关闭，需人工补充标签和指派，自动化治理失效。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：Bot未打标和关闭，且在已有用户解答的情况下仍机械要求补充信息并威胁关闭，治理无效。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3841](https://gitcode.com/cann/ops-nn/issues/3841) [Requirement|需求建议]:** — 15分
  - 痛点原因：Bot仅发送提示评论，未实际执行打标和自动关闭动作，治理未闭环且依赖人工操作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 15分
  - 痛点原因：Bot仅发送一条模板化催促评论，未执行打标与关闭动作，缺乏实质性治理。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：Bot在人工已解答后仍机械发送要求补充信息的模板回复并威胁关闭，属于无效治理和误判。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：Bot仅发送1条催促评论，未执行自动打标与自动关闭，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 20分
  - 痛点原因：Bot仅执行打标和分配，无评论且未自动关闭，最终由人工关闭导致治理失效。
  - 原文依据：
    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77    - `zhu-xun`：closed from codehub    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 20分
  - 痛点原因：Bot仅执行了打标动作，未产生任何评论互动，缺乏实质性引导，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 20分
  - 痛点原因：Bot仅完成初始打标，未进行评论互动与自动关闭，缺乏后续跟进与闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @cui_jiahao
- **[#3755](https://gitcode.com/cann/ops-nn/issues/3755) [Documentation|文档反馈]: QUICKSTART中的代码实例与实际代码不匹配；部分描述不清晰** — 20分
  - 痛点原因：Bot仅执行基础打标与关闭，评论数为零，缺乏自动回复或指派等实质性交互，治理流于形式。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yang-di52`：感谢反馈，1、3 部分将会尽快修改，2部分已提供了函数的使用文档链接，无需增加描述    - `cann-robot`：add label resolved    - `yolic`：assigned to @caiwenwen    - `yolic`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 20分
  - 痛点原因：Bot仅机械打标和关闭，无任何评论沟通，在问题仅处于正在处理阶段便过早标记resolved并关闭。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)
- **[#3734](https://gitcode.com/cann/ops-nn/issues/3734) [文档错误] aclnnDualLevelQuantMatmulWeightNz 中 level1GroupSize 描述误写为一级量化** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，缺乏自动化引导与进度反馈。
  - 原文依据：
    - `tangweiwei2`：问题已收到，预计明天会提交相关的PR修复掉。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #6814（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6814)
- **[#3733](https://gitcode.com/cann/ops-nn/issues/3733) [文档错误] aclnnFusedLinearOnlineMaxSum 计算公式中 weight 误写为 wight** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论无状态反馈，治理流于形式缺乏有效互动。
  - 原文依据：
    - `tangweiwei2`：问题已收到，当前已提交PR，预计明天修复。    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - [关联PR #6813（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6813)
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 20分
  - 痛点原因：Bot错误关闭需求建议并标记为已解决，且零评论互动，机械执行导致治理失当。
  - 原文依据：
    - `chenfeng61`：/assign    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：unassigned @chenfeng61
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何有效评论互动，实际治理与引导均由人工完成。
  - 原文依据：
    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `zhang-wenbo-beat`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `zhang-wenbo-beat`：assigned to @zhang-wenbo-beat    - `chenqi317`：assigned to @chenqi317
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 20分
  - 痛点原因：Bot仅执行机械的打标与关闭操作，无任何评论互动，缺乏状态解释与治理引导，未能有效辅助社区沟通。
  - 原文依据：
    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cann-robot`：add label resolved    - `cong-jiyu`：assigned to @cong-jiyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 20分
  - 痛点原因：需求已确认且代码已合入，Bot仅完成打标却未自动关闭Issue，也无评论跟进，导致治理未闭环。
  - 原文依据：
    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `he_kan`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `he_kan`：assigned to @he_kan
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 20分
  - 痛点原因：Bot在开发者刚提交PR尚未合并修复时即自动标记resolved并关闭，属于过早无效关闭。
  - 原文依据：
    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 20分
  - 痛点原因：问题仅被人工确认分配尚未解决，Bot便错误打标resolved并关闭issue。
  - 原文依据：
    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @ji-songyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动，未能发挥自动化引导作用，治理流于形式。
  - 原文依据：
    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved    - `tangweiwei2`：assigned to @tangweiwei2    - `tangweiwei2`：assigned to @chenqi317
- **[#3716](https://gitcode.com/cann/ops-nn/issues/3716) [Documentation|文档问题]: MultiScaleDeformableAttentionGrad 文档声明 FP16/BF16 但 AICore…** — 20分
  - 痛点原因：Bot仅机械打标并关闭，评论数为零，未与用户进行有效互动或提供处理引导，缺乏实质治理动作。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `yu-xinjie62`：您好，确认单算子并不支持FP16/BF16数据类型，该README中的问题我们将提issue修复。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3715](https://gitcode.com/cann/ops-nn/issues/3715) [Documentation|文档问题]: MultiScaleDeformableAttnFunction 文档声明 FP16/BF16 但 AICore …** — 20分
  - 痛点原因：Bot仅机械执行打标和自动关闭，无任何有效评论与用户互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@yu-xinjie62](https://gitcode.com/yu-xinjie62) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yu-xinjie62    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3715,issue3716    - [关联PR #7177（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7177)
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 20分
  - 痛点原因：Bot 仅执行打标，未自动关闭该 issue，且无任何评论互动，治理动作单一缺乏自动化闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @Chen_HaoWen    - `liujie12345678`：unassigned @liujie12345678
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未在问题解决后自动关闭issue，且全程无评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 20分
  - 痛点原因：Bot仅机械打标与关联关闭，无任何评论互动，缺乏实质性进度同步与治理反馈，有效性不足。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭操作且无任何评论互动，治理动作单一不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `liujie12345678`：assigned to @east_yang    - `liujie12345678`：unassigned @liujie12345678
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 20分
  - 痛点原因：Bot仅执行打标动作，未参与评论与关闭issue，治理动作单一，缺乏实际介入。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121    - `cann-robot`：add label resolved    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未自动关闭，治理动作单一未闭环。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678    - `oscillated`：assigned to @east_yang    - `sreofwiseone`：closed from codehub
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无评论互动，未能有效沟通引导用户。
  - 原文依据：
    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)
- **[#3686](https://gitcode.com/cann/ops-nn/issues/3686) [Requirement|需求建议]:matmul 多个算子 Kernel 内 GM 逐元素访问、属性类型与 IR 不一致及文档/参数错误** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭且无任何评论互动，治理动作不完整。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@sxb154714](https://gitcode.com/sxb154714) [@chaotang233](https://gitcode.com/chaotang233) [@y…    - `Hu1L1`：A3. matmul/common/cmct/kernel/kernel_qbmm_cube.h:197,205,209,215这个问题 确认写法符合预期，在实际场景中通过GetValue获取一个标量，经评估直接从GlobalTensor…    - `cann-robot`：add label resolved    - `oscillated`：assigned to @sxb154714    - `oscillated`：assigned to @chaotang233    - `oscillated`：assigned to @yue-ma
- **[#3685](https://gitcode.com/cann/ops-nn/issues/3685) [Bug-Report]: hash 目录算子缺陷汇总（embedding_hash_table 系列）** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论解答与关闭，实际跟进与解决全依赖人工，治理作用极低。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@zl_hw](https://gitcode.com/zl_hw) 正在跟踪处理。    - `xieshengwei1024`：问题1：非问题，这里获取的参数类型是和tiling一致的，该接口内置了类型转换，因此这个类型转换并非无意义。 问题2：非问题，仅获取一个值，没有拷贝的价值 问题3：是问题，已在https://gitcode.com/cann/ops-nn…    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @yue-ma    - `oscillated`：unassigned @yue-ma    - `chenqi317`：assigned to @zhanglei842
- **[#3683](https://gitcode.com/cann/ops-nn/issues/3683) [Bug-Report|缺陷反馈]: optim 多个算子 Kernel 内 GM 逐元素访问及属性/参数类型与 IR 声明不一致** — 20分
  - 痛点原因：Bot仅机械打标并关闭问题，无任何有效评论互动，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@kerten](https://gitcode.com/kerten) [@li_wei21](https://gitcode.com/li_wei21) 正在跟踪处理。    - `east_yang`：感谢您的反馈，advance_step算子使用于vlmm场景下更新模型inputToken、inputPositions、seqLens和slotMapping，对于你提到的几处SetValue和GetValue，其下标index含义是n…    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @li_wei21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，未发表任何评论进行引导或解答，实际处理完全依赖人工，治理流于形式。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 20分
  - 痛点原因：Bot仅机械打标并随MR合并自动关闭，全程无任何评论，缺乏进度同步与有效回复。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 35分
  - 痛点原因：Bot仅拦截无效指派，未有效引导指派给仓库成员，且未参与后续关闭等治理闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
#### PP-08 模板填写质量低关键信息缺失（I0 · 创建）

- **[#3808](https://gitcode.com/cann/ops-nn/issues/3808) glu_grad精度提升** — 10分
  - 痛点原因：正文仅7字'请提升算子精度'，无复现步骤、环境、日志或结构化章节。
  - 原文依据：
    - `cann-robot`：add label resolved    - `ASCEND222`：assigned to @ASCEND222    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - [关联PR #6479（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6479)
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 12分
  - 痛点原因：正文仅'如题'，无复现步骤、环境信息或结构化内容，极为简略。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @cui_jiahao
- **[#3814](https://gitcode.com/cann/ops-nn/issues/3814) [Bug-Report|缺陷反馈]: 卷积反向dw算子知识库json文件规范化** — 25分
  - 痛点原因：所有必填字段填入同一句话，无实质复现步骤或日志，结构有但内容空洞。
  - 原文依据：
    - `zhaozhongyao`：add label bug-report    - `cann-robot`：add label resolved    - `zhaozhongyao`：assigned to @zhaozhongyao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - [关联PR #6981（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6981)
- **[#3711](https://gitcode.com/cann/ops-nn/issues/3711) 整改代码仓部分算子的“超大头文件”类cleancode问题；** — 25分
  - 痛点原因：正文仅重复标题，无具体文件清单、整改标准或结构化章节，信息量极低。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @wkkk0528    - `wkkk0528`：closed from codehub    - `wkkk0528`：changed custom state from 进行中 to 已完成    - [关联PR #6761（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6761)
- **[#3681](https://gitcode.com/cann/ops-nn/issues/3681) [Bug-Report|缺陷反馈]: ascend910_55 SoC 平台的配置注册未使用** — 30分
  - 痛点原因：模板字段大部分为空，仅描述和预期各一句，环境/复现/日志均未填写。
  - 原文依据：
    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved    - `wuyufei`：assigned to @wuyufei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3681    - [关联PR #6565（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6565)    - [关联PR #6752（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6752)
- **[#3796](https://gitcode.com/cann/ops-nn/issues/3796) SwigluGroupQuant补充outputOrigin校验** — 35分
  - 痛点原因：正文仅53字，无复现步骤、环境信息或结构化章节，但任务意图清晰
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3796    - [关联PR #6961（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6961)
- **[#3759](https://gitcode.com/cann/ops-nn/issues/3759) [Bug-Report|缺陷反馈]: swiglu_group_quant_grad算子UB使用缺陷修复** — 35分
  - 痛点原因：模板字段虽填满但内容极简，环境仅写950，无实质日志或复现细节
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `shilulu`：closed from codehub    - `shilulu`：changed custom state from 进行中 to 已完成    - [关联PR #6868（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6868)
- **[#3749](https://gitcode.com/cann/ops-nn/issues/3749) [Requirement|需求建议]: soft_shrink_grad适配Ascend950 Ascendc实现** — 35分
  - 痛点原因：模板各字段均填入相同一句话，无实质复现步骤或环境细节
  - 原文依据：
    - `yolic`：/assign [@Dyrong](https://gitcode.com/Dyrong)    - `Dyrong`：add label bug-report    - `Dyrong`：add label requirement and delete label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Dyrong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3749
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 35分
  - 痛点原因：正文仅38字，无结构化章节、复现步骤或补充信息，过于简略
  - 原文依据：
    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cann-robot`：add label resolved    - `cong-jiyu`：assigned to @cong-jiyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3721](https://gitcode.com/cann/ops-nn/issues/3721) [Bug-Report|缺陷反馈]: bn_infer_grad 算子算子有精度问题，回退bn_infer_grad 算子** — 35分
  - 痛点原因：模板字段齐全但所有必填项均填同一句话，无实质复现步骤、日志或预期对比。
  - 原文依据：
    - `lianjieyu`：/assign    - `lianjieyu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lianjieyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3721    - [关联PR #6794（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6794)
- **[#3680](https://gitcode.com/cann/ops-nn/issues/3680) [Question|问题咨询]: add gelu_mul and hard_swish_grad_v2 ut** — 35分
  - 痛点原因：正文仅一句话描述任务，无环境、复现步骤或预期对比，结构化模板未实质填写。
  - 原文依据：
    - `zhajianqing123`：add label question    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3680    - [关联PR #6751（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6751)
- **[#3679](https://gitcode.com/cann/ops-nn/issues/3679) [Question|问题咨询]: add fatrelu_mul and heaviside ut** — 35分
  - 痛点原因：正文仅重复标题，无复现步骤、环境信息或技术细节，内容过于简略
  - 原文依据：
    - `zhajianqing123`：add label question    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3679    - [关联PR #6750（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6750)
- **[#3819](https://gitcode.com/cann/ops-nn/issues/3819) [Bug-Report|缺陷反馈]: LinglgVectorNorm添加对复数校验，不支持复数类型** — 40分
  - 痛点原因：模板字段虽全但内容完全重复，无实质复现步骤或环境信息。
  - 原文依据：
    - `renruhai`：add label bug-report    - `cann-robot`：add label Accepted    - `yolic`：assigned to @renruhai    - `renruhai`：closed from codehub    - `renruhai`：changed custom state from 进行中 to 已完成    - [关联PR #6719（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6719)
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 40分
  - 痛点原因：模板结构存在但多数字段填NA，无具体文件、函数或复现路径，内容空泛。
  - 原文依据：
    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @doufloat    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801
- **[#3795](https://gitcode.com/cann/ops-nn/issues/3795) [Bug-Report|缺陷反馈]: single_layer_lstm_grad example代码存在doublefree问题** — 40分
  - 痛点原因：模板字段大部分未填写，仅图片和预期结果，缺环境与复现步骤
  - 原文依据：
    - `nextyale`：/assign [@nextyale](https://gitcode.com/nextyale)    - `nextyale`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @nextyale    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3795    - [关联PR #6960（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6960)
- **[#3824](https://gitcode.com/cann/ops-nn/issues/3824) [Bug-Report|缺陷反馈]: swigluquant算子的def文件中没有通过.ExtendCfgInfo("opFile.value", "swi_…** — 45分
  - 痛点原因：模板字段虽全填但内容完全重复，无真实环境信息和复现步骤
  - 原文依据：
    - `guijianwei`：/assign    - `cann-robot`：assigned to @guijianwei    - [关联PR #7009（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7009)    - [关联PR #7010（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7010)
- **[#3799](https://gitcode.com/cann/ops-nn/issues/3799) layer_norm_quant算子infershape迁移** — 45分
  - 痛点原因：内部任务型issue，正文仅33字无结构化描述，但标题意图清晰。
  - 原文依据：
    - `zhaosusu`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaosusu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3799    - [关联PR #6902（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6902)
- **[#3797](https://gitcode.com/cann/ops-nn/issues/3797) [Requirement|需求建议]: matmul高精度模板取消k限制** — 45分
  - 痛点原因：使用模板但多数字段为空，仅核心需求一句，缺背景与设计方案
  - 原文依据：
    - `wuyufei`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @wuyufei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #6806（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6806)    - [关联PR #6965（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6965)
- **[#3777](https://gitcode.com/cann/ops-nn/issues/3777) [Documentation|文档反馈]: AddRmsnormQuant文档有误，scale参数描述错误，修改文档** — 45分
  - 痛点原因：模板三段内容完全重复，仅指出文档和参数名，未描述具体错误或建议修改。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @raoliang_sac    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3777    - [关联PR #6911（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6911)
- **[#3769](https://gitcode.com/cann/ops-nn/issues/3769) [Requirement|需求建议]: matmul cleancode整改** — 45分
  - 痛点原因：模板大部分未填写，仅背景一句话，无设计细节，但结构章节存在。
  - 原文依据：
    - `liyuanqiang`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @liyuanqiang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #6890（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6890)    - [关联PR #7002（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7002)
- **[#3767](https://gitcode.com/cann/ops-nn/issues/3767) [Requirement|需求建议]: FusedMatmul算子matmul+add/mul场景适配升精度** — 45分
  - 痛点原因：使用了模板但内容极简，背景仅一行，价值与设计章节均空。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @lilening    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #7144（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7144)
- **[#3760](https://gitcode.com/cann/ops-nn/issues/3760) [Requirement|需求建议]: 补充下一代hard_swish_grad_v2、deep_norm和foreach_binary_op算子实现** — 45分
  - 痛点原因：模板有结构但Benefit和Design等关键字段为空，需求描述过于简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3760    - [关联PR #6812（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6812)
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 45分
  - 痛点原因：模板字段齐全但各节仅填同一URL，实质描述信息不足
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3660](https://gitcode.com/cann/ops-nn/issues/3660) 修正scatter_nd_sub和sparse_apply_adadelta的README格式问题** — 45分
  - 痛点原因：正文仅重复标题，无结构化章节、复现步骤或环境信息，但任务本身简单明确。
  - 原文依据：
    - `cann-robot`：add label resolved    - `oscillated`：assigned to @guankarl    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3660    - [关联PR #6708（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6708)
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 50分
  - 痛点原因：功能建议描述清晰但缺乏背景论证、对标框架细节和结构化章节。
  - 原文依据：
    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18    - `sunchun`：unassigned @sunchun
- **[#3791](https://gitcode.com/cann/ops-nn/issues/3791) [Requirement|需求建议]: 当前仓库cpp代码大部分不符合clang-format格式要求** — 50分
  - 痛点原因：使用了模板且有结构化章节，但Benefit和Design部分为空，内容偏薄
  - 原文依据：
    - `yang-di52`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3791    - [关联PR #6784（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6784)    - [关联PR #7201（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7201)
- **[#3751](https://gitcode.com/cann/ops-nn/issues/3751) [Bug-Report|缺陷反馈]: [fix]:cv自动融合规避TENSOR_LEVEL相关模板,非指定强制走BASIC_API** — 50分
  - 痛点原因：模板字段齐全但内容重复简略，复现步骤仅复述标题，日志缺失
  - 原文依据：
    - `LINxu233`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `LINxu233`：closed from codehub    - `LINxu233`：changed custom state from 进行中 to 已完成    - [关联PR #6644（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6644)
- **[#3829](https://gitcode.com/cann/ops-nn/issues/3829) [Requirement|需求建议]: swiglu group quant满足模型方静态支持要求** — 55分
  - 痛点原因：模板结构存在但内容稀疏，设计方案等关键字段未填写
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3829    - [关联PR #7014（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7014)    - [关联PR #7141（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7141)
- **[#3820](https://gitcode.com/cann/ops-nn/issues/3820) [Requirement|需求建议]: [CANNbot]新增算子SigmoidCrossEntropyWithLogitsGrad** — 55分
  - 痛点原因：模板章节齐全但Benefit和Design等关键字段为空，内容偏简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @zhouxuan78    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3820    - [关联PR #7004（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7004)
- **[#3803](https://gitcode.com/cann/ops-nn/issues/3803) [Requirement|需求建议]: torch.scatter_reduce算子适配** — 55分
  - 痛点原因：有模板结构和背景信息，但设计与价值字段空缺，无复现步骤
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@weixin_47641640](https://gitcode.com/weixin_47641640) 正在跟踪处理。    - `yolic`：assigned to @weixin_47641640
- **[#3758](https://gitcode.com/cann/ops-nn/issues/3758) [Bug-Report|缺陷反馈]: swiglu_group_quant针对不同模型方的需求，需要将接口归一** — 55分
  - 痛点原因：模板字段齐全但内容高度重复，环境仅填950，日志填无，实质信息偏少
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #6801（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6801)    - [关联PR #6867（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6867)
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 55分
  - 痛点原因：有结构化描述但缺少环境信息、复现步骤和预期对比，作为问题咨询基本可读但信息偏少。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 55分
  - 痛点原因：模板字段齐全但所有必填项仅贴同一文档链接，未填写具体复现步骤与日志内容。
  - 原文依据：
    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @ji-songyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3664](https://gitcode.com/cann/ops-nn/issues/3664) [Bug-Report|缺陷反馈]: Adaptive_max_pool3d_grad的A5整除场景不需要路由到maxpool3dgrad** — 55分
  - 痛点原因：模板填写完整但内容重复单薄，无实际复现步骤与日志
  - 原文依据：
    - `huyihang1117`：/assign    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huyihang1117    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3664    - [关联PR #6622（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6622)
- **[#3654](https://gitcode.com/cann/ops-nn/issues/3654) [Bug-Report|缺陷反馈]: AscendQuantV2ScatterFusionPass融合在AscendQuantV2的offset输入为空时匹配…** — 55分
  - 痛点原因：模板章节齐全但内容高度重复，复现步骤和日志仅重复问题描述，环境仅写Ascend950
  - 原文依据：
    - `yuanbin_22`：/assign    - `yuanbin_22`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yuanbin_22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3654    - [关联PR #6703（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6703)
- **[#3651](https://gitcode.com/cann/ops-nn/issues/3651) [Bug-Report|缺陷反馈]: 当前算子 ophost ut 执行会出现符号未定义问题** — 55分
  - 痛点原因：模板结构完整但内容极简，环境填NA、步骤仅一句话，信息密度低。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3651    - [关联PR #6700（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6700)
- **[#3789](https://gitcode.com/cann/ops-nn/issues/3789) [Bug-Report|缺陷反馈]: swiglu_group_quant_grad group index 在tiling侧尽量不要获取具体值，防止host…** — 58分
  - 痛点原因：模板字段齐全但内容重复，环境仅写950，日志填无，复现步骤与描述雷同
  - 原文依据：
    - `yolic`：/assign [@shilulu](https://gitcode.com/shilulu)    - `tangweiwei2`：问题已收到，当前@shilulu在处理    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3789    - [关联PR #6942（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6942)
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 58分
  - 痛点原因：有截图和PR链接，但缺复现步骤、环境信息与预期对比，结构不完整。
  - 原文依据：
    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。    - `cann-robot`：assigned to @cui_jiahao
- **[#3741](https://gitcode.com/cann/ops-nn/issues/3741) [Bug-Report|缺陷反馈]: alcnn卷积反向接口cubemathtype参数增加范围校验** — 58分
  - 痛点原因：模板字段齐全但内容高度重复，环境仅填950，复现步骤与预期几乎相同。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@zhaozhoujun520](https://gitcode.com/zhaozhoujun520) 正在跟踪处理。    - `cann-robot`：add label resolved    - `yolic`：assigned to @zhaozhoujun520    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3741    - [关联PR #6767（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6767)
- **[#3673](https://gitcode.com/cann/ops-nn/issues/3673) [Bug-Report|缺陷反馈]: bmm基础模板及广播场景切换TensorApi后在重复MakeTensor时单次设置的L2Cache会失效，需要修复** — 58分
  - 痛点原因：有结构化模板但内容稀薄，复现步骤仅重复问题描述，日志填无
  - 原文依据：
    - `AlbertYoung192`：add label bug-report    - `cann-robot`：add label resolved    - `AlbertYoung192`：assigned to @AlbertYoung192    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3673    - [关联PR #6738（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6738)    - [关联PR #6808（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6808)
#### PP-09 未确认解决即以未复现关闭（I2 · 讨论与解决）

- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：未关联PR、commit或文档，仅口头回复因工程结构差异暂不修改，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `fullt`：add label requirement    - `yolic`：assigned to @yang-di52
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅回复已收到并指派处理人，未关联任何 PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关联PR仍处于open状态，无代码提交、文档或版本发布等引用，仅停留在分配处理阶段，未提供实际解决证据。
  - 原文依据：
    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `fanqirui`：add label requirement    - `oscillated`：assigned to @chenqi317
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：仅提供文字解答与编译命令，无关联PR或commit引用，且缺乏用户确认解决的闭环证据。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：无关联PR、commit或release等实质性修复证据，仅停留在解释说明与等待反馈阶段。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论，仅停留在指派跟踪阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：无关联PR与commit引用，仅提供操作建议并处于等待用户反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 23分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档及release链接等证明解决细节的强证据。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及release说明等强证据，且由外部系统自动关闭，证据偏弱。
  - 原文依据：
    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 23分
  - 痛点原因：维护者以暂无支持计划为由直接关闭，未提供任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `chenxingyu18`：closed from codehub    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档及release链接，且关闭评论仅为指派讨论，无实质性解决说明。
  - 原文依据：
    - [关联PR #6849（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6849)    - [关联PR #6989（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6989)    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 23分
  - 痛点原因：仅靠评论引导用户去外部平台申请权限，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 23分
  - 痛点原因：无关联PR、commit或文档等实质解决证据，评论仅停留在问题受理与无关的加组织申请，未给出实际解决方案。
  - 原文依据：
    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。    - `wuxs68`：closed from codehub
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等直接解决证据支撑。
  - 原文依据：
    - [关联PR #6736（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6736)    - `chenfeng61`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 23分
  - 痛点原因：虽有合并的关联PR与接纳评论，但缺乏commit引用、文档链接及release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #5976（merged）](https://gitcode.com/cann/ops-nn/merge_requests/5976)    - [关联PR #6657（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6657)    - [关联PR #6729（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6729)    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `chenqi317`：closed from codehub
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 23分
  - 痛点原因：仅靠关联PR合并和机器人自动关闭，缺乏commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 23分
  - 痛点原因：缺乏关联PR、commit或文档等实质性修复证据，仅凭评论解释即关闭。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 23分
  - 痛点原因：仅凭口头解释无需修改便关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit、文档及release引用，无人工对问题解决细节的实质性说明。
  - 原文依据：
    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu
- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在引导沟通和等待反馈阶段，缺乏实质性的代码解决产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在指派和跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 31分
  - 痛点原因：仅提供文字建议，无关联PR或文档链接，且处于等待反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 31分
  - 痛点原因：关联PR未合并且无文档与release引用，仅停留在指派跟踪阶段，缺乏问题已实际解决的证据。
  - 原文依据：
    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 38分
  - 痛点原因：无关联PR、commit或文档等修复证据，仅停留在沟通和提供日志阶段，未给出最终解决方案。
  - 原文依据：
    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现    - `jinpenghe`：closed from codehub
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 38分
  - 痛点原因：虽关联已合并PR，但缺commit与文档链接，关闭评论仅为客套回复，未提供根因分析或具体修复方案说明。
  - 原文依据：
    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)    - [关联PR #6853（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6853)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭评论为机器人自动回复，缺乏人工验证解决结果的证据。
  - 原文依据：
    - [关联PR #6758（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6758)    - [关联PR #6785（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6785)    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅指派任务未总结解决结果。
  - 原文依据：
    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)    - [关联PR #6924（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6924)    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 38分
  - 痛点原因：虽有关联PR且已合入，但缺少commit引用与release版本说明，导致证据不够充分。
  - 原文依据：
    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 38分
  - 痛点原因：虽有关联已合并PR，但缺少commit与release引用，关闭评论仅为常规回复，未提供具体修复验证证据，解决证据不够充分。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 38分
  - 痛点原因：虽关联多个合并PR，但无commit引用，且关闭评论仅停留在问题已收阶段，未明确说明最终解决状态，证据链不完整。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无最终解决或关闭评论，缺乏有效解决证明。
  - 原文依据：
    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 54分
  - 痛点原因：仅凭口头解释与测试建议关闭，缺乏关联PR或官方文档等实质性解决证据支撑。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 54分
  - 痛点原因：虽有两个已合并PR及关闭评论，但缺少文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)    - [关联PR #6799（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6799)    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 54分
  - 痛点原因：因缺少 commit 引用，且仅靠机器人自动关闭，解决过程的证据链不够完整。
  - 原文依据：
    - [关联PR #6793（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6793)    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，且关闭评论多为机器人自动回复，证据链不完整。
  - 原文依据：
    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 54分
  - 痛点原因：关联PR仅为closed状态，且缺乏文档链接与release引用，解决证据链不够完整。
  - 原文依据：
    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：assigned to @yue-ma
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 54分
  - 痛点原因：仅靠评论口头解释，未提供关联PR、文档链接或release等实质性修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
#### PP-10 Bot在人工回答后发通用模板催促（I2 · 讨论与解决）

- **[#3756](https://gitcode.com/cann/ops-nn/issues/3756) [Requirement|需求建议]: math仓的CMakeLists.txt文件建议和ops-math的保持一致，更简洁** — 0分
  - 痛点原因：未关联PR、commit或文档，仅口头回复因工程结构差异暂不修改，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：好的，感谢反馈    - `yang-di52`：由于ops-nn和ops-math仓的工程结构存在区别，强行修改的工作量较大，暂时不能按照math仓的cmakelist修改。    - `fullt`：/assign [@chenqi317](https://gitcode.com/chenqi317)    - `fullt`：add label requirement    - `yolic`：assigned to @yang-di52
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 0分
  - 痛点原因：仅回复已收到并指派处理人，未关联任何 PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3709](https://gitcode.com/cann/ops-nn/issues/3709) [Requirement|需求建议]: nn仓直接依赖opbase仓源码编译，建议改为依赖library，降低耦合程度** — 0分
  - 痛点原因：关联PR仍处于open状态，无代码提交、文档或版本发布等引用，仅停留在分配处理阶段，未提供实际解决证据。
  - 原文依据：
    - [关联PR #7100（open）](https://gitcode.com/cann/ops-nn/merge_requests/7100)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chenqi317](https://gitcode.com/chenqi317) 正在跟踪处理。    - `fanqirui`：add label requirement    - `oscillated`：assigned to @chenqi317
- **[#3851](https://gitcode.com/cann/ops-nn/issues/3851) [Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？** — 15分
  - 痛点原因：仅提供文字解答与编译命令，无关联PR或commit引用，且缺乏用户确认解决的闭环证据。
  - 原文依据：
    - `harrynospot`：可以只编译单算子，build.sh加参数--ops=算子名（蛇形形式）    - `weixin_63474806`：ops-nn 的核心编译产物之一是 Tiling 策略库。Tiling 负责根据输入张量形状和NPU资源（如统一缓存UB大小）计算数据如何切分，这对算子性能至关重要。修改算子的 Tiling 逻辑后，使用上述局部编译命令会重新生成这部分，…    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3835](https://gitcode.com/cann/ops-nn/issues/3835) [Documentation|文档反馈]: README.md 中 Latest News 条目存在占位符 <<<>>> 显示异常** — 15分
  - 痛点原因：无关联PR、commit或release等实质性修复证据，仅停留在解释说明与等待反馈阶段。
  - 原文依据：
    - `yolic`：您好，<<<>>>为算子kernel的一种调用方式。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3834](https://gitcode.com/cann/ops-nn/issues/3834) [Requirement|需求建议]: 统一 QUICKSTART 中 AddExample 编译命令的 --soc 参数写法** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论，仅停留在指派跟踪阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3832](https://gitcode.com/cann/ops-nn/issues/3832) [Question|问题咨询]:** — 15分
  - 痛点原因：无关联PR与commit引用，仅提供操作建议并处于等待用户反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，若仅需修改单一算子，可使用以下命令编译： ```bash bash build.sh --pkg --soc=${soc_version} --ops=${your_ops} -j${n} ``` **说明：** - 通过 `--o…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3850](https://gitcode.com/cann/ops-nn/issues/3850) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp example文件命名错误，无法运行** — 23分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档及release链接等证明解决细节的强证据。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：/assign [@Apricityh](https://gitcode.com/Apricityh)    - `cann-robot`：### Notice This issue can not be assigned to ***Apricityh***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3846](https://gitcode.com/cann/ops-nn/issues/3846) [Requirement|需求建议]: SoftplusV2Grad 算子支持 Ascend950 ascendc 实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及release说明等强证据，且由外部系统自动关闭，证据偏弱。
  - 原文依据：
    - [关联PR #7046（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7046)    - `yolic`：/assign [@Hana77](https://gitcode.com/Hana77)    - `zhu-xun`：closed from codehub    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 23分
  - 痛点原因：维护者以暂无支持计划为由直接关闭，未提供任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `chenxingyu18`：closed from codehub    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档及release链接，且关闭评论仅为指派讨论，无实质性解决说明。
  - 原文依据：
    - [关联PR #6849（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6849)    - [关联PR #6989（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6989)    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 23分
  - 痛点原因：仅靠评论引导用户去外部平台申请权限，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `ilovescrapy`：changed custom state from 进行中 to 已完成    - `ilovescrapy`：closed from codehub
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 23分
  - 痛点原因：无关联PR、commit或文档等实质解决证据，评论仅停留在问题受理与无关的加组织申请，未给出实际解决方案。
  - 原文依据：
    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。    - `wuxs68`：closed from codehub
- **[#3732](https://gitcode.com/cann/ops-nn/issues/3732) [Requirement|需求建议]: swiglu_mx_quant全泛化实现** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等直接解决证据支撑。
  - 原文依据：
    - [关联PR #6736（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6736)    - `chenfeng61`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenfeng61
- **[#3725](https://gitcode.com/cann/ops-nn/issues/3725) [Requirement|需求建议]: ops-nn的matmul类算子需要增加golden函数，适配新的ops-test-kit测试框架** — 23分
  - 痛点原因：虽有合并的关联PR与接纳评论，但缺乏commit引用、文档链接及release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #5976（merged）](https://gitcode.com/cann/ops-nn/merge_requests/5976)    - [关联PR #6657（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6657)    - [关联PR #6729（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6729)    - `chenqi317`：已确认接纳需求，请一次补充量化 伪量化 全量化的用例表    - `he_kan`：mm类算子 全量化/伪量化/非量化 都已经合入    - `chenqi317`：closed from codehub
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 23分
  - 痛点原因：仅靠关联PR合并和机器人自动关闭，缺乏commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue
- **[#3694](https://gitcode.com/cann/ops-nn/issues/3694) [Bug-Report|缺陷反馈]: norm/group_norm_swish_grad 属性 num_groups 取值类型与 IR 不一致** — 23分
  - 痛点原因：缺乏关联PR、commit或文档等实质性修复证据，仅凭评论解释即关闭。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `east_yang`：感谢您的反馈，num_groups参数表示输入gradOut的C维度分为group组的数量，算子有约束说明group和C整除不超过4000，在实际使用场景中不会超过int32范畴，不涉及属性值截断或异常。    - `east_yang`：closed from codehub    - `east_yang`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3692](https://gitcode.com/cann/ops-nn/issues/3692) [Bug-Report|缺陷反馈]: norm+foreach 多算子 Kernel 内 GlobalTensor::GetValue/SetValue 用于…** — 23分
  - 痛点原因：仅凭口头解释无需修改便关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `luoyufan7`：感谢您的反馈，foreach类六个算子均为 compute 路径中读取单个标量（Init 一次或每 tensor 一次），非逐元素循环，性能影响可忽略；输入scalar转tensor后直接用GetValue取值属于算子设计，无需修改    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @liujie12345678
- **[#3655](https://gitcode.com/cann/ops-nn/issues/3655) [Bug-Report|缺陷反馈]: aclnnSeluBackward算子的样例代码0629执行失败** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit、文档及release引用，无人工对问题解决细节的实质性说明。
  - 原文依据：
    - [关联PR #7107（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7107)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@lianjieyu](https://gitcode.com/lianjieyu) 正在跟踪处理。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3655    - `cann-robot`：add label resolved    - `oscillated`：assigned to @lianjieyu
- **[#3852](https://gitcode.com/cann/ops-nn/issues/3852) [Requirement|需求建议]: [文档/特性] 建议明确公示 NN 算子的高性能与高精度属性支持情况 (Conv, Gelu, Scatter等)** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在引导沟通和等待反馈阶段，缺乏实质性的代码解决产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3840](https://gitcode.com/cann/ops-nn/issues/3840) [Documentation|文档反馈]:** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在指派和跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#3838](https://gitcode.com/cann/ops-nn/issues/3838) [Question|问题咨询]: 任务开发阶段如何进行全面的泛化测试？** — 31分
  - 痛点原因：仅提供文字建议，无关联PR或文档链接，且处于等待反馈状态，缺乏实质性解决证据。
  - 原文依据：
    - `chenqi317`：您好 问题已收到，请@fullt 帮忙处理    - `fullt`：泛化测试主要覆盖不同的数据类型，不同的shape，不同属性，边界等等，可以借助大模型在本地生成批量测试用例并通过测试工具在本地进行批量测试    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `fullt`：add label wait-feedback    - `chenqi317`：assigned to @fullt
- **[#3657](https://gitcode.com/cann/ops-nn/issues/3657) [Requirement|需求建议]: SyncBatchNormBackwardElemt算子AscendC实现** — 31分
  - 痛点原因：关联PR未合并且无文档与release引用，仅停留在指派跟踪阶段，缺乏问题已实际解决的证据。
  - 原文依据：
    - [关联PR #6359（open）](https://gitcode.com/cann/ops-nn/merge_requests/6359)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3781](https://gitcode.com/cann/ops-nn/issues/3781) [Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决** — 38分
  - 痛点原因：无关联PR、commit或文档等修复证据，仅停留在沟通和提供日志阶段，未给出最终解决方案。
  - 原文依据：
    - `gcw_pfzw85mp`：补充：用ulimit -s unlimited 把系统栈放开也不行    - `yolic`：您好，感谢反馈，问题已收到，当前 [@jinpenghe](https://gitcode.com/jinpenghe) 正在跟踪处理。    - `jinpenghe`：[@gcw_pfzw85mp](https://gitcode.com/gcw_pfzw85mp) 麻烦能否提供具体的cann包版本和所加打印呢，以及ops-nn/build/binary/ascend950/bin/build_logs…    - `gcw_pfzw85mp`：cann包版本：9.0.0 重新用-j1 跑了一次，log内容少一点如下，便于你们分析： [2026-07-03 09:13:53] Build started: asc_opc /home/huqi/ops-nn/build/tbe/d…    - `jinpenghe`：环境问题，问题已未复现    - `jinpenghe`：closed from codehub
- **[#3748](https://gitcode.com/cann/ops-nn/issues/3748) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译nn包失败** — 38分
  - 痛点原因：虽关联已合并PR，但缺commit与文档链接，关闭评论仅为客套回复，未提供根因分析或具体修复方案说明。
  - 原文依据：
    - [关联PR #6846（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6846)    - [关联PR #6853（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6853)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yang-di52`：好的，感谢反馈，我们会尽快解决该问题    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `cann-robot`：add label resolved
- **[#3728](https://gitcode.com/cann/ops-nn/issues/3728) [Bug-Report|缺陷反馈]: ScatterNd算子开启确定性计算两次计算结果不一致** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭评论为机器人自动回复，缺乏人工验证解决结果的证据。
  - 原文依据：
    - [关联PR #6758（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6758)    - [关联PR #6785（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6785)    - `chenqi317`：已确认问题 欢迎贡献pr修复合入代码仓    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `zhang-wenbo-beat`：changed custom state from 进行中 to 已完成    - `zhang-wenbo-beat`：add label bug-report
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅指派任务未总结解决结果。
  - 原文依据：
    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)    - [关联PR #6924（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6924)    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - `cann-robot`：add label resolved
- **[#3702](https://gitcode.com/cann/ops-nn/issues/3702) [Documentation|文档]: norm/sync_batch_norm_backward_elemt 混合精度 dtype 组合未在 README …** — 38分
  - 痛点原因：虽有关联PR且已合入，但缺少commit引用与release版本说明，导致证据不够充分。
  - 原文依据：
    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启    - `Chen_HaoWen`：closed from codehub    - `sreofwiseone`：changed custom state from 已解决 to 已完成
- **[#3701](https://gitcode.com/cann/ops-nn/issues/3701) [Documentation|文档]: norm+foreach 多个算子 README 公式/数据类型/行为与 IR 或 Kernel 不一致** — 38分
  - 痛点原因：虽有关联已合并PR，但缺少commit与release引用，关闭评论仅为常规回复，未提供具体修复验证证据，解决证据不够充分。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已经修改 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3693](https://gitcode.com/cann/ops-nn/issues/3693) [Documentation|文档]: norm+foreach 多个算子 README 参数表与 IR 定义不一致** — 38分
  - 痛点原因：虽关联多个合并PR，但无commit引用，且关闭评论仅停留在问题已收阶段，未明确说明最终解决状态，证据链不完整。
  - 原文依据：
    - [关联PR #6829（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6829)    - [关联PR #7119（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7119)    - [关联PR #7121（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7121)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@east_yang](https://gitcode.com/east_yang) [@liujie12345678](https://gitcode.com/liujie1234567…    - `east_yang`：foreach系列问题已通过PR修复 https://gitcode.com/cann/ops-nn/pull/6829    - `Chen_HaoWen`：PR已合入，先行关闭，若有问题可以后续再开启 master：https://gitcode.com/cann/ops-nn/pull/7119 9.1.0：https://gitcode.com/cann/ops-nn/pull/7121
- **[#3713](https://gitcode.com/cann/ops-nn/issues/3713) 【社区任务】SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无最终解决或关闭评论，缺乏有效解决证明。
  - 原文依据：
    - [关联PR #6773（open）](https://gitcode.com/cann/ops-nn/merge_requests/6773)    - `utopiax`：关联PR：https://gitcode.com/cann/ops-nn/pull/6773    - `oscillated`：您好，感谢反馈， [@fullt](https://gitcode.com/fullt) 正在跟踪处理。    - `oscillated`：assigned to @fullt
- **[#3833](https://gitcode.com/cann/ops-nn/issues/3833) aclnnDeepNorm 算子在 Ascend 910 上的性能测试结果存在小幅波动是否正常** — 54分
  - 痛点原因：仅凭口头解释与测试建议关闭，缺乏关联PR或官方文档等实质性解决证据支撑。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liujie12345678](https://gitcode.com/liujie12345678) 正在跟踪处理。    - `liujie12345678`：出现小幅波动属于 NPU 单算子性能测试的正常现象，建议使用充分 warmup 充分预热后多次 repeat 的平均值作为性能参考，并通过锁频、绑核、关闭后台进程等方式进一步降低波动。    - `liujie12345678`：closed from codehub    - `liujie12345678`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liujie12345678
- **[#3724](https://gitcode.com/cann/ops-nn/issues/3724) [Bug-Report|缺陷反馈]: aclnnAdaptiveMaxPool3dBackward算子存在用例A5性能劣化于A2/A3** — 54分
  - 痛点原因：虽有两个已合并PR及关闭评论，但缺少文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #6756（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6756)    - [关联PR #6799（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6799)    - `chenqi317`：已确认问题，提交pr !6799 CANN 修复    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3724    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved
- **[#3720](https://gitcode.com/cann/ops-nn/issues/3720) [Documentation|文档反馈] 补充README Latest News 2026/05更新条目** — 54分
  - 痛点原因：因缺少 commit 引用，且仅靠机器人自动关闭，解决过程的证据链不够完整。
  - 原文依据：
    - [关联PR #6793（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6793)    - `tangweiwei2`：/assign chenqi317    - `chenqi317`：已确认nn 仓的 latest news 信息更新，!6793 相关pr 待合入    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3720    - `tangweiwei2`：add label documentation    - `cann-robot`：add label resolved
- **[#3687](https://gitcode.com/cann/ops-nn/issues/3687) [Bug-Report|缺陷反馈]: dim index in adaptive avg pool3d error** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，且关闭评论多为机器人自动回复，证据链不完整。
  - 原文依据：
    - [关联PR #6725（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6725)    - `chenqi317`：反馈的问题已确认，代码pr已合入， issue关闭    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3687    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @chenqi317
- **[#3684](https://gitcode.com/cann/ops-nn/issues/3684) [Bug-Report|缺陷反馈]: pooling 多算子属性取值类型与 IR 声明不一致及文件名拼写错误** — 54分
  - 痛点原因：关联PR仅为closed状态，且缺乏文档链接与release引用，解决证据链不够完整。
  - 原文依据：
    - [关联PR #7059（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7059)    - `oscillated`：您好，感谢反馈，问题已收到，当前对应算子责任人 [@yue-ma](https://gitcode.com/yue-ma) 正在跟踪处理。    - `sreofwiseone`：closed from codehub    - `sreofwiseone`：changed custom state from 挂起 to 已完成    - `oscillated`：assigned to @yue-ma
- **[#3674](https://gitcode.com/cann/ops-nn/issues/3674) [Question|问题咨询]: matmul SetX2QuantMode判断条件咨询** — 54分
  - 痛点原因：仅靠评论口头解释，未提供关联PR、文档链接或release等实质性修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `wmg1`：您好，当 nSize = 1 scaleShape为[ 1 ]时，这同样属于 per-tensor 场景，并非误判。请问您能详细说明一下，您预期的结果与实际 debug 日志之间的具体差异在哪里吗？这样我可以更准确地定位问题并给出解释。    - `chuguowei`：perchannel的shape为(1,n)/(n)，当n=1时，（1,1）的shape是不是会误判；当前计算结果是对的，只是和我预期有差异    - `wmg1`：您好，n =1时，per-channel和per-tensor等价，计算结果一样，并非误判。    - `chuguowei`：ok    - `chuguowei`：/close
#### PP-11 创建阶段标签缺失影响分流（I0 · 创建）

- **[#3808](https://gitcode.com/cann/ops-nn/issues/3808) glu_grad精度提升** — 10分
  - 痛点原因：正文仅7字'请提升算子精度'，无复现步骤、环境、日志或结构化章节。
  - 原文依据：
    - `cann-robot`：add label resolved    - `ASCEND222`：assigned to @ASCEND222    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - [关联PR #6479（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6479)
- **[#3765](https://gitcode.com/cann/ops-nn/issues/3765) [Question|问题咨询]: 门禁日志无法查看，权限申请** — 12分
  - 痛点原因：正文仅'如题'，无复现步骤、环境信息或结构化内容，极为简略。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@cui_jiahao](https://gitcode.com/cui_jiahao) 正在跟踪处理。    - `cui_jiahao`：请在openlibing平台申请    - `ilovescrapy`：>请在openlibing平台申请 [@cui_jiahao](https://gitcode.com/cui_jiahao) 已申请    - `ilovescrapy`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/2874f21f-d65b-4635-a02e-bdab2bb2b515/image.png 'image.p…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @cui_jiahao
- **[#3814](https://gitcode.com/cann/ops-nn/issues/3814) [Bug-Report|缺陷反馈]: 卷积反向dw算子知识库json文件规范化** — 25分
  - 痛点原因：所有必填字段填入同一句话，无实质复现步骤或日志，结构有但内容空洞。
  - 原文依据：
    - `zhaozhongyao`：add label bug-report    - `cann-robot`：add label resolved    - `zhaozhongyao`：assigned to @zhaozhongyao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - [关联PR #6981（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6981)
- **[#3711](https://gitcode.com/cann/ops-nn/issues/3711) 整改代码仓部分算子的“超大头文件”类cleancode问题；** — 25分
  - 痛点原因：正文仅重复标题，无具体文件清单、整改标准或结构化章节，信息量极低。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `oscillated`：assigned to @wkkk0528    - `wkkk0528`：closed from codehub    - `wkkk0528`：changed custom state from 进行中 to 已完成    - [关联PR #6761（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6761)
- **[#3681](https://gitcode.com/cann/ops-nn/issues/3681) [Bug-Report|缺陷反馈]: ascend910_55 SoC 平台的配置注册未使用** — 30分
  - 痛点原因：模板字段大部分为空，仅描述和预期各一句，环境/复现/日志均未填写。
  - 原文依据：
    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved    - `wuyufei`：assigned to @wuyufei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3681    - [关联PR #6565（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6565)    - [关联PR #6752（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6752)
- **[#3796](https://gitcode.com/cann/ops-nn/issues/3796) SwigluGroupQuant补充outputOrigin校验** — 35分
  - 痛点原因：正文仅53字，无复现步骤、环境信息或结构化章节，但任务意图清晰
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3796    - [关联PR #6961（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6961)
- **[#3759](https://gitcode.com/cann/ops-nn/issues/3759) [Bug-Report|缺陷反馈]: swiglu_group_quant_grad算子UB使用缺陷修复** — 35分
  - 痛点原因：模板字段虽填满但内容极简，环境仅写950，无实质日志或复现细节
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `shilulu`：closed from codehub    - `shilulu`：changed custom state from 进行中 to 已完成    - [关联PR #6868（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6868)
- **[#3749](https://gitcode.com/cann/ops-nn/issues/3749) [Requirement|需求建议]: soft_shrink_grad适配Ascend950 Ascendc实现** — 35分
  - 痛点原因：模板各字段均填入相同一句话，无实质复现步骤或环境细节
  - 原文依据：
    - `yolic`：/assign [@Dyrong](https://gitcode.com/Dyrong)    - `Dyrong`：add label bug-report    - `Dyrong`：add label requirement and delete label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Dyrong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3749
- **[#3726](https://gitcode.com/cann/ops-nn/issues/3726) nn仓增加 committer跳转链接** — 35分
  - 痛点原因：正文仅38字，无结构化章节、复现步骤或补充信息，过于简略
  - 原文依据：
    - `cong-jiyu`：已确认问题，在nn仓readme首页增加committer信息    - `cann-robot`：add label resolved    - `cong-jiyu`：assigned to @cong-jiyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - [关联PR #6810（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6810)
- **[#3721](https://gitcode.com/cann/ops-nn/issues/3721) [Bug-Report|缺陷反馈]: bn_infer_grad 算子算子有精度问题，回退bn_infer_grad 算子** — 35分
  - 痛点原因：模板字段齐全但所有必填项均填同一句话，无实质复现步骤、日志或预期对比。
  - 原文依据：
    - `lianjieyu`：/assign    - `lianjieyu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lianjieyu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3721    - [关联PR #6794（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6794)
- **[#3680](https://gitcode.com/cann/ops-nn/issues/3680) [Question|问题咨询]: add gelu_mul and hard_swish_grad_v2 ut** — 35分
  - 痛点原因：正文仅一句话描述任务，无环境、复现步骤或预期对比，结构化模板未实质填写。
  - 原文依据：
    - `zhajianqing123`：add label question    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3680    - [关联PR #6751（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6751)
- **[#3679](https://gitcode.com/cann/ops-nn/issues/3679) [Question|问题咨询]: add fatrelu_mul and heaviside ut** — 35分
  - 痛点原因：正文仅重复标题，无复现步骤、环境信息或技术细节，内容过于简略
  - 原文依据：
    - `zhajianqing123`：add label question    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3679    - [关联PR #6750（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6750)
- **[#3819](https://gitcode.com/cann/ops-nn/issues/3819) [Bug-Report|缺陷反馈]: LinglgVectorNorm添加对复数校验，不支持复数类型** — 40分
  - 痛点原因：模板字段虽全但内容完全重复，无实质复现步骤或环境信息。
  - 原文依据：
    - `renruhai`：add label bug-report    - `cann-robot`：add label Accepted    - `yolic`：assigned to @renruhai    - `renruhai`：closed from codehub    - `renruhai`：changed custom state from 进行中 to 已完成    - [关联PR #6719（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6719)
- **[#3801](https://gitcode.com/cann/ops-nn/issues/3801) [Bug-Report|缺陷反馈]: Clean Code问题、重复率以及超大函数比例** — 40分
  - 痛点原因：模板结构存在但多数字段填NA，无具体文件、函数或复现路径，内容空泛。
  - 原文依据：
    - `VoyageZhou`：/assign [@doufloat](https://gitcode.com/doufloat)    - `cann-robot`：### Notice This issue can not be assigned to ***baijinxiang_hw***. Please try to assign to the repository members.    - `yolic`：您好，感谢反馈，问题已收到，当前 [@doufloat](https://gitcode.com/doufloat) 正在跟踪处理。    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @doufloat    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3801
- **[#3795](https://gitcode.com/cann/ops-nn/issues/3795) [Bug-Report|缺陷反馈]: single_layer_lstm_grad example代码存在doublefree问题** — 40分
  - 痛点原因：模板字段大部分未填写，仅图片和预期结果，缺环境与复现步骤
  - 原文依据：
    - `nextyale`：/assign [@nextyale](https://gitcode.com/nextyale)    - `nextyale`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @nextyale    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3795    - [关联PR #6960（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6960)
- **[#3824](https://gitcode.com/cann/ops-nn/issues/3824) [Bug-Report|缺陷反馈]: swigluquant算子的def文件中没有通过.ExtendCfgInfo("opFile.value", "swi_…** — 45分
  - 痛点原因：模板字段虽全填但内容完全重复，无真实环境信息和复现步骤
  - 原文依据：
    - `guijianwei`：/assign    - `cann-robot`：assigned to @guijianwei    - [关联PR #7009（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7009)    - [关联PR #7010（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7010)
- **[#3799](https://gitcode.com/cann/ops-nn/issues/3799) layer_norm_quant算子infershape迁移** — 45分
  - 痛点原因：内部任务型issue，正文仅33字无结构化描述，但标题意图清晰。
  - 原文依据：
    - `zhaosusu`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaosusu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3799    - [关联PR #6902（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6902)
- **[#3797](https://gitcode.com/cann/ops-nn/issues/3797) [Requirement|需求建议]: matmul高精度模板取消k限制** — 45分
  - 痛点原因：使用模板但多数字段为空，仅核心需求一句，缺背景与设计方案
  - 原文依据：
    - `wuyufei`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @wuyufei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #6806（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6806)    - [关联PR #6965（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6965)
- **[#3777](https://gitcode.com/cann/ops-nn/issues/3777) [Documentation|文档反馈]: AddRmsnormQuant文档有误，scale参数描述错误，修改文档** — 45分
  - 痛点原因：模板三段内容完全重复，仅指出文档和参数名，未描述具体错误或建议修改。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @raoliang_sac    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3777    - [关联PR #6911（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6911)
- **[#3769](https://gitcode.com/cann/ops-nn/issues/3769) [Requirement|需求建议]: matmul cleancode整改** — 45分
  - 痛点原因：模板大部分未填写，仅背景一句话，无设计细节，但结构章节存在。
  - 原文依据：
    - `liyuanqiang`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @liyuanqiang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #6890（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6890)    - [关联PR #7002（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7002)
- **[#3767](https://gitcode.com/cann/ops-nn/issues/3767) [Requirement|需求建议]: FusedMatmul算子matmul+add/mul场景适配升精度** — 45分
  - 痛点原因：使用了模板但内容极简，背景仅一行，价值与设计章节均空。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @lilening    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #7144（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7144)
- **[#3760](https://gitcode.com/cann/ops-nn/issues/3760) [Requirement|需求建议]: 补充下一代hard_swish_grad_v2、deep_norm和foreach_binary_op算子实现** — 45分
  - 痛点原因：模板有结构但Benefit和Design等关键字段为空，需求描述过于简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3760    - [关联PR #6812（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6812)
- **[#3699](https://gitcode.com/cann/ops-nn/issues/3699) [Bug-Report|缺陷反馈]: matmul_compress算子有kernel实现，但是缺少kernel算子的接口说明文档README.md** — 45分
  - 痛点原因：模板字段齐全但各节仅填同一URL，实质描述信息不足
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@ww-blue](https://gitcode.com/ww-blue) 正在跟踪处理。    - `cann-robot`：add label resolved    - `oscillated`：assigned to @ww-blue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3699    - [关联PR #6966（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6966)    - [关联PR #6967（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6967)
- **[#3660](https://gitcode.com/cann/ops-nn/issues/3660) 修正scatter_nd_sub和sparse_apply_adadelta的README格式问题** — 45分
  - 痛点原因：正文仅重复标题，无结构化章节、复现步骤或环境信息，但任务本身简单明确。
  - 原文依据：
    - `cann-robot`：add label resolved    - `oscillated`：assigned to @guankarl    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3660    - [关联PR #6708（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6708)
- **[#3831](https://gitcode.com/cann/ops-nn/issues/3831) 建议为 AvgPool 算子增加 count_include_pad 参数，对齐主流框架行为** — 50分
  - 痛点原因：功能建议描述清晰但缺乏背景论证、对标框架细节和结构化章节。
  - 原文依据：
    - `sunchun`：/assign    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好暂无支持计划，若您有实际需求可再与我们联系    - `cann-robot`：assigned to @sunchun    - `sunchun`：assigned to @chenxingyu18    - `sunchun`：unassigned @sunchun
- **[#3791](https://gitcode.com/cann/ops-nn/issues/3791) [Requirement|需求建议]: 当前仓库cpp代码大部分不符合clang-format格式要求** — 50分
  - 痛点原因：使用了模板且有结构化章节，但Benefit和Design部分为空，内容偏薄
  - 原文依据：
    - `yang-di52`：add label requirement    - `cann-robot`：add label resolved    - `yolic`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3791    - [关联PR #6784（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6784)    - [关联PR #7201（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7201)
- **[#3751](https://gitcode.com/cann/ops-nn/issues/3751) [Bug-Report|缺陷反馈]: [fix]:cv自动融合规避TENSOR_LEVEL相关模板,非指定强制走BASIC_API** — 50分
  - 痛点原因：模板字段齐全但内容重复简略，复现步骤仅复述标题，日志缺失
  - 原文依据：
    - `LINxu233`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `LINxu233`：closed from codehub    - `LINxu233`：changed custom state from 进行中 to 已完成    - [关联PR #6644（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6644)
- **[#3829](https://gitcode.com/cann/ops-nn/issues/3829) [Requirement|需求建议]: swiglu group quant满足模型方静态支持要求** — 55分
  - 痛点原因：模板结构存在但内容稀疏，设计方案等关键字段未填写
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3829    - [关联PR #7014（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7014)    - [关联PR #7141（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7141)
- **[#3820](https://gitcode.com/cann/ops-nn/issues/3820) [Requirement|需求建议]: [CANNbot]新增算子SigmoidCrossEntropyWithLogitsGrad** — 55分
  - 痛点原因：模板章节齐全但Benefit和Design等关键字段为空，内容偏简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @zhouxuan78    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3820    - [关联PR #7004（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7004)
- **[#3803](https://gitcode.com/cann/ops-nn/issues/3803) [Requirement|需求建议]: torch.scatter_reduce算子适配** — 55分
  - 痛点原因：有模板结构和背景信息，但设计与价值字段空缺，无复现步骤
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@weixin_47641640](https://gitcode.com/weixin_47641640) 正在跟踪处理。    - `yolic`：assigned to @weixin_47641640
- **[#3758](https://gitcode.com/cann/ops-nn/issues/3758) [Bug-Report|缺陷反馈]: swiglu_group_quant针对不同模型方的需求，需要将接口归一** — 55分
  - 痛点原因：模板字段齐全但内容高度重复，环境仅填950，日志填无，实质信息偏少
  - 原文依据：
    - `cann-robot`：add label resolved    - `yolic`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #6801（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6801)    - [关联PR #6867（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6867)
- **[#3746](https://gitcode.com/cann/ops-nn/issues/3746) [Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题** — 55分
  - 痛点原因：有结构化描述但缺少环境信息、复现步骤和预期对比，作为问题咨询基本可读但信息偏少。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@sunchun](https://gitcode.com/sunchun)    - `cann-robot`：assigned to @sunchun
- **[#3722](https://gitcode.com/cann/ops-nn/issues/3722) [Bug-Report|缺陷反馈]: loss/binary_cross_entropy_grad/docs/aclnnBinaryCrossEntropyB…** — 55分
  - 痛点原因：模板字段齐全但所有必填项仅贴同一文档链接，未填写具体复现步骤与日志内容。
  - 原文依据：
    - `chenqi317`：已确认问题，单算子 仅提供了A5 的example 没有提供A2的 需要在资料中说明使用场景    - `chenqi317`：请@ji-songyuan 处理    - `cann-robot`：add label resolved    - `chenqi317`：assigned to @ji-songyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3683,issue3722    - [关联PR #6861（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6861)
- **[#3664](https://gitcode.com/cann/ops-nn/issues/3664) [Bug-Report|缺陷反馈]: Adaptive_max_pool3d_grad的A5整除场景不需要路由到maxpool3dgrad** — 55分
  - 痛点原因：模板填写完整但内容重复单薄，无实际复现步骤与日志
  - 原文依据：
    - `huyihang1117`：/assign    - `huyihang1117`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huyihang1117    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3664    - [关联PR #6622（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6622)
- **[#3654](https://gitcode.com/cann/ops-nn/issues/3654) [Bug-Report|缺陷反馈]: AscendQuantV2ScatterFusionPass融合在AscendQuantV2的offset输入为空时匹配…** — 55分
  - 痛点原因：模板章节齐全但内容高度重复，复现步骤和日志仅重复问题描述，环境仅写Ascend950
  - 原文依据：
    - `yuanbin_22`：/assign    - `yuanbin_22`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yuanbin_22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3654    - [关联PR #6703（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6703)
- **[#3651](https://gitcode.com/cann/ops-nn/issues/3651) [Bug-Report|缺陷反馈]: 当前算子 ophost ut 执行会出现符号未定义问题** — 55分
  - 痛点原因：模板结构完整但内容极简，环境填NA、步骤仅一句话，信息密度低。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `oscillated`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3651    - [关联PR #6700（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6700)
- **[#3789](https://gitcode.com/cann/ops-nn/issues/3789) [Bug-Report|缺陷反馈]: swiglu_group_quant_grad group index 在tiling侧尽量不要获取具体值，防止host…** — 58分
  - 痛点原因：模板字段齐全但内容重复，环境仅写950，日志填无，复现步骤与描述雷同
  - 原文依据：
    - `yolic`：/assign [@shilulu](https://gitcode.com/shilulu)    - `tangweiwei2`：问题已收到，当前@shilulu在处理    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3789    - [关联PR #6942（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6942)
- **[#3747](https://gitcode.com/cann/ops-nn/issues/3747) [Question|问题咨询]: 无法查看流水线日志，显示权限不足** — 58分
  - 痛点原因：有截图和PR链接，但缺复现步骤、环境信息与预期对比，结构不完整。
  - 原文依据：
    - `ilovescrapy`：问题+1    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：/assign [@cui_jiahao](https://gitcode.com/cui_jiahao)    - `cui_jiahao`：申请加入cann组织，审核人写我    - `wuxs68`：>申请加入cann组织，审核人写我 感谢，已加入组织，问题已解决。    - `cann-robot`：assigned to @cui_jiahao
- **[#3741](https://gitcode.com/cann/ops-nn/issues/3741) [Bug-Report|缺陷反馈]: alcnn卷积反向接口cubemathtype参数增加范围校验** — 58分
  - 痛点原因：模板字段齐全但内容高度重复，环境仅填950，复现步骤与预期几乎相同。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@zhaozhoujun520](https://gitcode.com/zhaozhoujun520) 正在跟踪处理。    - `cann-robot`：add label resolved    - `yolic`：assigned to @zhaozhoujun520    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3741    - [关联PR #6767（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6767)
- **[#3673](https://gitcode.com/cann/ops-nn/issues/3673) [Bug-Report|缺陷反馈]: bmm基础模板及广播场景切换TensorApi后在重复MakeTensor时单次设置的L2Cache会失效，需要修复** — 58分
  - 痛点原因：有结构化模板但内容稀薄，复现步骤仅重复问题描述，日志填无
  - 原文依据：
    - `AlbertYoung192`：add label bug-report    - `cann-robot`：add label resolved    - `AlbertYoung192`：assigned to @AlbertYoung192    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3673    - [关联PR #6738（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6738)    - [关联PR #6808（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6808)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `yolic` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 在关闭评论中强制填写解决方案摘要（根因、修复方式、关联PR/文档），未填写则阻止关闭 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 20.6，低分 43/47；OBJ_DECISION_TRANSPARENCY：均值 63.9，低分 13/47 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 20.6，低分 43/47 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 63.9，低分 13/47 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot治理维护者；候选负责人 `yolic` |
| 触发条件 | bot执行关闭动作前 |
| 具体动作 | 增加用户确认前置校验：bot在关闭前需等待用户72小时内无异议回复，或用户明确确认已解决 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 10 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 29.9，低分 35/47；OBJ_BOT_MISCLOSE_REVERSE：均值 98.7，低分 0/47 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 29.9，低分 35/47 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 98.7，低分 0/47 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 人工已在bot之前介入并认领，bot未阻断流程，但bot与人工之间无实质协作衔… | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `yolic` |
| 触发条件 | 以未复现/环境问题为由关闭Issue时 |
| 具体动作 | 要求维护者提供排查过程记录，并在关闭前等待用户至少一次确认或3天无响应后才可关闭 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 70 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 20.6，低分 43/47；OBJ_DECISION_TRANSPARENCY：均值 63.9，低分 13/47 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 20.6，低分 43/47 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 63.9，低分 13/47 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **81.6/100**，整体相对可控，但仍需关注：模板填写质量低关键信息缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.2 | 内部贡献者提交的真实性能问题，无AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 72.1 | 需求模板填写完整，含背景、设计方案及期望输出表格，结构化程度高。 |

代表低分 Issue：[#3808](https://gitcode.com/cann/ops-nn/issues/3808)
问题：glu_grad精度提升。

### I1 · 分配与首次响应
本阶段分数为 **77.6/100**，整体相对可控，但仍需关注：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 58.7 | 均值 58.7，低分 20/47 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 91.5 | 均值 91.5，低分 0/47 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 83.9 | yolic主动认领并assign给自己，责任归属明确。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 78.7 | 添加wait-feedback标签并引导至SIG例会评审，分流路径合理但未深入… |

代表低分 Issue：[#3840](https://gitcode.com/cann/ops-nn/issues/3840)
问题：[Documentation|文档反馈]:。

### I2 · 讨论与解决
本阶段分数为 **58.4/100**，本阶段需要改进，主要问题是：确认分配后讨论长期停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 69.8 | 均值 69.8，低分 10/47 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 38.0 | 均值 38.0，低分 37/47 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 63.2 | 提供了例会评审路径作为下一步，但此后无后续讨论或推进迹象。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 67.2 | 用户需求尚未得到实质满足，仅被引导至例会，无后续结果形成。 |

代表低分 Issue：[#3746](https://gitcode.com/cann/ops-nn/issues/3746)
问题：[Question|问题咨询]: 对于argmax或topk等排序取index等类型算子的问题。

### I3 · 总结与关闭
本阶段分数为 **51.4/100**，本阶段需要改进，主要问题是：关闭流程缺乏知识沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 20.6 | 均值 20.6，低分 43/47 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 63.9 | 均值 63.9，低分 13/47 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 48.6 | 关闭时未明确说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 81.3 | Issue仍处于开启状态，bot虽提示14天关闭但尚未执行，无过早关闭风险。 |

代表低分 Issue：[#3781](https://gitcode.com/cann/ops-nn/issues/3781)
问题：[Question|问题咨询]: 自定义算子编译gather_nd，编译器栈溢出如何解决。

### G · Bot/Agent 治理
本阶段分数为 **65.4/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 29.9 | 均值 29.9，低分 35/47 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 98.7 | 均值 98.7，低分 0/47 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 72.4 | 人工已在bot之前介入并认领，bot未阻断流程，但bot与人工之间无实质协作衔… |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 62.7 | bot在MR合并后自动关闭并加resolved标签，流程闭环有效 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 67.9 | bot动作时机和格式合规，未误关闭或错误阻断，但模板回复对需求issue针对性… |

代表低分 Issue：[#3851](https://gitcode.com/cann/ops-nn/issues/3851)
问题：[Question|问题咨询]: 本地只修改单个算子时是否有推荐的增量编译方式？。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 197 | 52.6 | 首期基线 | 81.6 | 77.6 | 58.4 | 51.4 | 65.4 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **24 位社区响应者**贡献 **106 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `yolic` | 36 |
| `oscillated` | 18 |
| `chenqi317` | 15 |
| `yang-di52` | 4 |
| `east_yang` | 4 |

Top1 响应占比 **34.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：92.9/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-nn/report_cann-ops-nn_2026-06-29_to_2026-07-05.json`。
