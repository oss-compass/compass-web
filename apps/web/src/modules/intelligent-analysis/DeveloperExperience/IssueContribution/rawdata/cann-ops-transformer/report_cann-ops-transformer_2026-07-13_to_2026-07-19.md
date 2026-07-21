# Issue 贡献体验周报 · cann/ops-transformer

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-transformer` 共收到 **109** 个 Issue
+ **Open 30 / Closed 79**，关闭率 **72.5%**。
+ 总体体验分为 **47.3/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 46.9 | 关闭阶段沉淀严重不足 |
| P1 | I2 · 讨论与解决 | 54.0 | 技术讨论停滞缺乏实质推进 |
| P1 | I1 · 分配与首次响应 | 62.3 | 部分Issue无响应且缺乏标签 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 要求填写解决方案摘要和验证结果 |
| REC-02 | P0 | 增加关闭前校验或人工确认步骤，排查误关闭逻辑 |
| REC-03 | P1 | 触发提醒或升级给模块负责人 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 109 |
| Open / Closed | 30 / 79 |
| 关闭率 | 72.5% |
| 类型构成 | 缺陷 53 / 需求 29 / 咨询 2 / 其他 25 |
| 总体体验分 | 47.3/100（D） |
| 首次响应时间 | 中位 0.1h；均值 5.1h |
| 关闭周期 | 中位 4.0h；均值 23.6h |
| 7天响应率 | 95.4% |
| 评论数/Issue | 1.17 |
| 标签覆盖率 | 78.0% |
| 指派覆盖率 | 96.3% |
| 数据完整性 | 91.9/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 79.5 | 7/109（6.4%） | 相对可控 | `SUB_INPUT_QUALITY` 68.6 |
| I1 · 分配与首次响应 | 62.3 | 25/109（22.9%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 10.1 |
| I2 · 讨论与解决 | 54.0 | 37/109（33.9%） | P1 | `OBJ_SOLUTION_EVIDENCE` 22.3 |
| I3 · 总结与关闭 | 46.9 | 88/109（80.7%） | P0 | `OBJ_CLOSURE_REUSE` 11.9 |
| G · Bot/Agent 治理（参考） | 67.8 | 7/109（6.4%） | 参考项 | `OBJ_BOT_GOVERNANCE` 33.4 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段沉淀严重不足 | OBJ_CLOSURE_REUSE：均值 11.9，低分 109/109；OBJ_DECISION_TRANSPARENCY：均值 57.2，低分 43/109 | 社区知识无法沉淀，后续遇到类似问题难以复用解决方案。 |
| PP-02 | P0 | G · Bot/Agent 治理 | Bot误关闭率与缺位率双高 | OBJ_BOT_GOVERNANCE：均值 33.4，低分 72/109；OBJ_BOT_MISCLOSE_REVERSE：均值 94.9，低分 0/109 | 有效Issue可能被错误关闭导致问题流失，同时部分Issue缺乏自动化分流响应。 |
| PP-03 | P1 | I2 · 讨论与解决 | 技术讨论停滞缺乏实质推进 | OBJ_SOLUTION_EVIDENCE：均值 22.3，低分 106/109；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.6，低分 27/109 | 问题长期悬而未决，用户目标无法达成，社区活跃度受损。 |
| PP-04 | P1 | I1 · 分配与首次响应 | 部分Issue无响应且缺乏标签 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 10.1，低分 98/109；OBJ_RESPONSE_SPEED：均值 90.8，低分 7/109 | 用户反馈石沉大海，影响社区贡献者体验和问题解决效率。 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段沉淀严重不足（I3 · 总结与关闭）

- **[#3834](https://gitcode.com/cann/ops-transformer/issues/3834) [Requirement|需求建议]: GenPositionIdsFromMask算子AscendC实现** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与重复链接，仅关联未合并的PR，未沉淀任何可复用信息。
  - 原文依据：
    - `wuxs68`：/assign    - `cann-robot`：assigned to @wuxs68    - [关联PR #8900（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8900)
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接，评论仅为机械分配负责人与打标签，未留存任何可复用信息。
  - 原文依据：
    - `l00858142`：add label requirement    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3832](https://gitcode.com/cann/ops-transformer/issues/3832) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT4_E2M1等不存在** — 0分
  - 痛点原因：关闭说明为空，仅停留在分配任务和询问版本阶段，无方案文档化与根因分析，无复用价值。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：你好，你使用的cann toolkit包是哪个版本    - `iansheng`：>你好，你使用的cann toolkit包是哪个版本 [@weihao18](https://gitcode.com/weihao18) 9.1.0.B101，大概7月初的主线版本    - `cann-robot`：assigned to @weihao18
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 0分
  - 痛点原因：关闭说明仅为机器人自动关联MR合并，缺乏人工方案总结与文档沉淀，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `cann-robot`：assigned to @libohao6    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3829](https://gitcode.com/cann/ops-transformer/issues/3829) [Requirement|需求建议]: [第三方依赖消减] 移除 2 项未使用的三方依赖** — 0分
  - 痛点原因：关闭时未留下任何说明文字，导致已有的方案文档无法被其他用户直接复用。
  - 原文依据：
    - `weihao18`：/assign    - `cann-robot`：assigned to @weihao18
- **[#3828](https://gitcode.com/cann/ops-transformer/issues/3828) [Bug-Report|缺陷反馈]: MC2 matmulallreduce类算子，部分case性能不达标** — 0分
  - 痛点原因：关闭说明仅提及关联MR合并，无方案文档化，缺乏具体排查与解决细节，无法供后人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3828    - `cann-robot`：add label resolved    - `weihao18`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：assigned to @ouyf    - [关联PR #8695（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8695)
- **[#3827](https://gitcode.com/cann/ops-transformer/issues/3827) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试套件补充msprof性能采集、initial_state非连续用例及RD…** — 0分
  - 痛点原因：关闭说明仅7字且由机器人自动触发，无方案文档化记录，未提供可复用的解决过程或关联主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3827    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign    - `cann-robot`：assigned to @huang-chuhong    - [关联PR #8815（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8815)
- **[#3826](https://gitcode.com/cann/ops-transformer/issues/3826) [Bug-Report|缺陷反馈]: BlockEpilogueSwigluMxQuant 的调用点以临时 Arguments 对象调用 Init，但类内保存…** — 0分
  - 痛点原因：关闭说明仅因关联MR合并而关闭，无方案文档化记录，未沉淀可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3826    - `macech`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：assigned to @macech    - [关联PR #8777（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8777)
- **[#3823](https://gitcode.com/cann/ops-transformer/issues/3823) [Documentation|文档反馈]: megamoe 资料需要补充A2、A3的example** — 0分
  - 痛点原因：关闭说明为0字且无主链接，虽关联PR但未沉淀任何文字指引，导致关闭后毫无复用价值。
  - 原文依据：
    - `ryan_li`：add label documentation    - `ryan_li`：assigned to @ryan_li    - [关联PR #8770（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8770)    - [关联PR #8771（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8771)
- **[#3822](https://gitcode.com/cann/ops-transformer/issues/3822) [Bug-Report|缺陷反馈]: SLIG算子维测日志格式有误** — 0分
  - 痛点原因：关闭时未留下任何说明文字，无方案文档沉淀与重复链接，仅关联PR，导致解决经验无法被社区复用。
  - 原文依据：
    - `llwy0320`：add label bug-report    - `llwy0320`：assigned to @llwy0320    - [关联PR #8856（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8856)    - [关联PR #8923（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8923)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 0分
  - 痛点原因：关闭说明仅17字且由机器人自动关联其他issue关闭，无方案文档化或重复链接，未留下可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign @wangrui_    - `cann-robot`：assigned to @wangrui_    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，关联PR仍处于open状态，未沉淀任何可供后续复用的信息。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)
- **[#3819](https://gitcode.com/cann/ops-transformer/issues/3819) [Requirement|需求建议]: dsv4 metadata功能泛化** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与复用链接，关联PR仍为open状态，未留存任何复用价值。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8829（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8829)
- **[#3814](https://gitcode.com/cann/ops-transformer/issues/3814) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule op def 的 DataType/Format 参数与 aicore 配…** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，仅因关联MR合并而关闭，无法为其他用户提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign    - `cann-robot`：assigned to @huang-chuhong    - [关联PR #8841（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8841)
- **[#3813](https://gitcode.com/cann/ops-transformer/issues/3813) moe_ep_dispatch优化count计算与atomicadd使用** — 0分
  - 痛点原因：关闭说明仅为机器人自动回复，无方案文档沉淀，缺乏可复用的技术细节与经验总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3813    - `cann-robot`：add label resolved    - `weihao18`：/assign [@z1017i](https://gitcode.com/z1017i)    - `cann-robot`：assigned to @z1017i    - [关联PR #8820（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8820)
- **[#3818](https://gitcode.com/cann/ops-transformer/issues/3818) [Requirement|需求建议]: 新增算子需求：ScaledCosineAttentionScore** — 0分
  - 痛点原因：关闭时仅说明转移至其他仓库，未留下方案文档与有效关闭说明，且关联PR已关闭，无任何复用价值。
  - 原文依据：
    - `yolic`：您好，感谢提出，当前issue已转移至transformer仓处理。    - `weihao18`：/assign [@wuxs68](https://gitcode.com/wuxs68)    - `cann-robot`：assigned to @wuxs68    - [关联PR #8892（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8892)    - [关联PR #8918（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8918)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 0分
  - 痛点原因：关闭说明仅为系统自动生成的MR合并关联信息，未沉淀方案文档与关联主链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `cann-robot`：assigned to @wangss21    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3810](https://gitcode.com/cann/ops-transformer/issues/3810) [Bug-Report|缺陷反馈]: master编译报错** — 0分
  - 痛点原因：仅确认分支即指派处理，未记录任何解决方案或关闭说明，导致后续无法复用参考。
  - 原文依据：
    - `george_zhanglei`：add label bug-report    - `weihao18`：感谢反馈，请问一下你那边源码是哪个分支的？    - `george_zhanglei`：master分支    - `weihao18`：assigned to @weihao18    - [关联PR #8904（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8904)
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化与复用链接，未留存任何可复用的解决经验。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign
- **[#3808](https://gitcode.com/cann/ops-transformer/issues/3808) [Bug-Report|缺陷反馈]: moe_ep_dispatch/moe_ep_dispatch_epilogue/moe_ep_combine拦截信息不…** — 0分
  - 痛点原因：缺乏方案文档化记录与重复主链接，关闭说明仅49字且由机器人自动关闭，导致复用价值极低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - `junnyleo`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@junnyleo](https://gitcode.com/junnyleo)    - `cann-robot`：assigned to @junnyleo
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 0分
  - 痛点原因：关闭说明为空且无方案文档与dup主链接，仅由机器人随MR合并自动关闭，未沉淀复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3796](https://gitcode.com/cann/ops-transformer/issues/3796) [Requirement|需求建议]: 开源 GroupedMatmul 转置融合 pass** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀方案文档，未提供重复issue主链接，且关联PR未关闭，无法供他人复用。
  - 原文依据：
    - `zhoushaolong`：add label requirement    - `zhoushaolong`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `cann-robot`：assigned to @zhoushaolong    - [关联PR #8546（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8546)
- **[#3794](https://gitcode.com/cann/ops-transformer/issues/3794) [Question|问题咨询]: 950上FAG算子采用了未公开的接口。** — 0分
  - 痛点原因：关闭说明为空，且未提供方案文档或重复链接，问题解答未沉淀，无法供其他用户参考复用。
  - 原文依据：
    - `weihao18`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：assigned to @coder_linx
- **[#3792](https://gitcode.com/cann/ops-transformer/issues/3792) [Requirement|需求建议]: chunk_gated_delta_rule 测试脚本支持静态图模式** — 0分
  - 痛点原因：仅由机器人随MR合并自动关闭，关闭说明仅7字，无方案文档与关联链接，缺乏人工总结，无参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3792    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign    - `cann-robot`：assigned to @huang-chuhong    - [关联PR #8791（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8791)
- **[#3791](https://gitcode.com/cann/ops-transformer/issues/3791) [Documentation|文档反馈]: trans仓aclnn编译运行样例是FlashAttentionScore算子，但是示例结果叫“mean resu…** — 0分
  - 痛点原因：关闭时未留下任何关闭说明，问题处理过程和结论缺失，导致无法为后续类似问题提供参考。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `weihao18`：/assign [@yue-ma](https://gitcode.com/yue-ma)    - `cann-robot`：### Notice This issue can not be assigned to ***yue-ma***. Please try to assign to the repository members.    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `weihao18`：assigned to @huang-wei-chen    - `cann-robot`：assigned to @xiu_ling_wang and unassigned @huang-wei-chen
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅靠状态变更和加标签关闭，导致解决经验无法被社区复用。
  - 原文依据：
    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3789](https://gitcode.com/cann/ops-transformer/issues/3789) [Roadmap] ops-transformer 2026Q3 roadmap** — 0分
  - 痛点原因：关闭时未留下任何说明文字，未沉淀可复用的结论。

- **[#3788](https://gitcode.com/cann/ops-transformer/issues/3788) [Bug-Report|缺陷反馈]: 【GroupedMatmulSwigluQuantV2】MX WeightNz多Tensor改动导致MXA8W4多Ten…** — 0分
  - 痛点原因：关闭说明为空，无方案文档与复用链接，且关联PR仍处于open状态，毫无复用价值。
  - 原文依据：
    - `zhangzhizhuo`：add label bug-report    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - [关联PR #8786（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8786)
- **[#3787](https://gitcode.com/cann/ops-transformer/issues/3787) [Bug-Report|缺陷反馈]: SMLA算子pytest缺少aclgraph调用** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无任何关闭说明、方案文档或关联链接，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3787    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `SH_jingsong`：assigned to @SH_jingsong    - [关联PR #8759（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8759)
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 0分
  - 痛点原因：关闭时无方案文档和说明文字，仅指派人员并关联未关闭PR，未沉淀可复用经验。
  - 原文依据：
    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)
- **[#3783](https://gitcode.com/cann/ops-transformer/issues/3783) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试框架chunk_size未透传及seqlen语义不一致** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无方案文档化且关闭说明仅7字，缺乏可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3783    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign    - `cann-robot`：assigned to @huang-chuhong    - [关联PR #8773（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8773)
- **[#3781](https://gitcode.com/cann/ops-transformer/issues/3781) [Requirement|需求建议]: Compressor pytest支持批跑性能及批跑读取case优化** — 0分
  - 痛点原因：关闭说明仅提及关联MR合并，无方案文档沉淀与复用指引，导致后续无法直接复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3781    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `cann-robot`：assigned to @wangss21    - [关联PR #8756（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8756)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 0分
  - 痛点原因：仅因MR合并自动关闭，关闭说明仅13字且无方案文档沉淀，未留下任何供后人参考的复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - `cann-robot`：add label resolved    - `weihao18`：/assign @cjz_    - `cann-robot`：assigned to @cjz_    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3779](https://gitcode.com/cann/ops-transformer/issues/3779) [Bug-Report|缺陷反馈]: Mega_moe在DeepSeekV4模型侧精度问题，请修复** — 0分
  - 痛点原因：仅由机器人关联MR自动关闭，无任何关闭说明与方案文档沉淀，导致问题解决经验无法被复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3779    - `lyt_claire`：add label bug-report    - `cann-robot`：add label resolved    - `lyt_claire`：assigned to @lyt_claire    - [关联PR #8375（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8375)
- **[#3777](https://gitcode.com/cann/ops-transformer/issues/3777) [Bug-Report|缺陷反馈]: mc2/3rd下面部分cpp文件不参与编译** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，关联PR仍处于开启状态，未留存任何可复用信息。
  - 原文依据：
    - `hblnb`：add label bug-report    - `hblnb`：assigned to @hblnb    - [关联PR #8239（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8239)
- **[#3774](https://gitcode.com/cann/ops-transformer/issues/3774) [Bug-Report|缺陷反馈]: flash_attn图模式跨进程static kernel残留导致aicore error** — 0分
  - 痛点原因：仅由机器人自动关闭，关闭说明仅7字且无方案文档化，无法供其他用户复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `PerrySkywalker`：/assign    - `PerrySkywalker`：/close    - `cann-robot`：### Notice [@PerrySkywalker](https://gitcode.com/PerrySkywalker) , this issue is linked to an open PR. Please merge the…
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与dup链接，仅记录投票结果，未沉淀任何可复用经验。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 0分
  - 痛点原因：关闭说明为空且无方案文档与dup主链接，仅由机器人因关联MR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，关联PR仍处open状态，导致解决经验无法被社区复用。
  - 原文依据：
    - `zhong-zixin`：add label requirement    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 0分
  - 痛点原因：关闭说明仅提及因关联issue合并而自动关闭，无方案文档和具体解决步骤，未留下可复用的上下文信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：assigned to @zl_hw    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人因关联MR合并自动关闭，未沉淀任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 0分
  - 痛点原因：关闭说明为0字，无方案文档沉淀且无dup主链接，仅由机器人随PR合并自动关闭，未留下可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无方案文档与主链接，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `cann-robot`：assigned to @zzzyh22    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3760](https://gitcode.com/cann/ops-transformer/issues/3760) moe_init_routing_quant_v2 自定义 CHECK_NULL 宏错误码不规范** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `Huang-Peng`：add label bug    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `cann-robot`：assigned to @Huang-Peng    - [关联PR #8673（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8673)
- **[#3759](https://gitcode.com/cann/ops-transformer/issues/3759) cleancode: 删除 CheckEpTpRecvTensorDim 函数内连续空行** — 0分
  - 痛点原因：关闭说明仅为机器人自动触发的合并关联信息，缺乏人工总结的解决方案，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3759    - `cann-robot`：add label resolved    - `weihao18`：/assign [@Gan12](https://gitcode.com/Gan12)    - `cann-robot`：assigned to @Gan12    - [关联PR #8685（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8685)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 0分
  - 痛点原因：关闭说明仅13字且依赖机器人自动关联关闭，无方案文档沉淀与dup主链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - `cann-robot`：add label resolved    - `weihao18`：/assign @cjz_    - `cann-robot`：assigned to @cjz_    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅记录了指派人员操作，未留下任何可复用的排查或解决信息。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 0分
  - 痛点原因：关闭说明为0字，未沉淀最终修复方案或解决路径，导致其他用户无法复用解决经验。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3753](https://gitcode.com/cann/ops-transformer/issues/3753) [Requirement|需求建议]: chunk_gated_delta_rule 测试框架重构与 RDV 测试模式** — 0分
  - 痛点原因：仅靠机器人自动关闭，关闭说明仅7字，无方案文档沉淀与关联重复issue，缺乏可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3753    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `cann-robot`：### Notice This issue is already assigned to ***huang-chuhong***. Please do not assign repeatedly.    - `cann-robot`：assigned to @huang-chuhong
- **[#3751](https://gitcode.com/cann/ops-transformer/issues/3751) [Requirement|需求建议]: InplacePartialRotaryMulGrad 算子缺少golden.py 文件** — 0分
  - 痛点原因：仅由机器人随MR合并自动关闭，无关闭说明、方案文档及关联链接，未留下可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3751    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `alfengyuan`：add label requirement    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - [关联PR #8696（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8696)
- **[#3750](https://gitcode.com/cann/ops-transformer/issues/3750) [Bug] KvRmsNormRopeCache: regbase 两个模板存在 cache 越界写、PA_BLK_NZ 写错页、NZ 整行不写等一组缺陷** — 0分
  - 痛点原因：关闭说明为空且无方案文档，关联修复PR仍处于open状态，无法提供复用参考。
  - 原文依据：
    - `qianzehong`：修复 PR：https://gitcode.com/cann/ops-transformer/merge_requests/8690 该 PR 同时修复上述两个缺陷（Norm 模式 cache 的 B/N 线性容量校验、recompute…    - `weihao18`：/assign [@qianzehong](https://gitcode.com/qianzehong)    - `cann-robot`：assigned to @qianzehong    - [关联PR #8690（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8690)
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：关闭时无任何文字说明，且缺乏修复方案文档与重复issue链接，导致无参考价值。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3745](https://gitcode.com/cann/ops-transformer/issues/3745) [Bug-Report|缺陷反馈]: SLIKG算子存在同步卡死问题** — 0分
  - 痛点原因：仅由机器人关联PR自动关闭，无方案文档化记录且关闭说明为0字，未提供任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3745    - `llwy0320`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #8675（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8675)
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，未记录任何解决过程，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3743](https://gitcode.com/cann/ops-transformer/issues/3743) [Bug-Report|缺陷反馈]: dense_lightning_indexer_softmax_lse最大序列没有增加相关校验** — 0分
  - 痛点原因：关闭时仅由机器人关联MR自动关闭，无方案文档沉淀，关闭说明未包含具体问题原因与解决方案，无法供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3743    - `shilulu`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@shilulu](https://gitcode.com/shilulu)    - `cann-robot`：assigned to @shilulu    - [关联PR #8667（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8667)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 0分
  - 痛点原因：关闭说明仅为机器人自动留言，无方案文档沉淀与重复链接，未提供任何可供复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `cann-robot`：assigned to @zzzyh22    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3741](https://gitcode.com/cann/ops-transformer/issues/3741) [Bug-Report|缺陷反馈]: moe_init_routing_quant_v2算子，非950平台手动同步迁移** — 0分
  - 痛点原因：无方案文档、无重复链接且关闭说明为0字，关联PR未闭环，未沉淀任何可复用信息。
  - 原文依据：
    - `kdy18482276080`：add label bug-report    - `kdy18482276080`：assigned to @kdy18482276080    - [关联PR #8656（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8656)
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：关闭说明仅6字且无方案文档与关联链接，仅靠机器人或命令机械关闭，毫无复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `PerrySkywalker`：/close
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅包含任务分配，无法为后续类似问题提供参考。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3736](https://gitcode.com/cann/ops-transformer/issues/3736) [Bug-Report|缺陷反馈]: 整改tensor api 后处理修改成正确的aiv风格的命名空间** — 0分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，无方案文档沉淀，缺乏问题根因与解决思路的实质性描述，无参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3736    - `kknan`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `cann-robot`：assigned to @kknan    - [关联PR #8652（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8652)
- **[#3733](https://gitcode.com/cann/ops-transformer/issues/3733) [Bug-Report|缺陷反馈]: keycache和valuecache在nz数据格式下，输入数据类型不一致的校验拦截** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅由机器人关联其他issue关闭，未沉淀任何可复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - `BIGWHITETEETH`：add label bug-report    - `cann-robot`：add label resolved    - `BIGWHITETEETH`：/assign    - `cann-robot`：assigned to @BIGWHITETEETH    - [关联PR #8626（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8626)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅指派处理而无关闭说明、方案文档及重复链接，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅记录指派操作，未留存任何可供复用的解决信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3728](https://gitcode.com/cann/ops-transformer/issues/3728) [Bug-Report|缺陷反馈]:** — 0分
  - 痛点原因：仅靠机器人因MR合并自动关闭，无方案文档化记录与重复issue主链接，未留下可供复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `HertzHan`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@HertzHan](https://gitcode.com/HertzHan)    - `cann-robot`：assigned to @HertzHan    - [关联PR #8582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8582)
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：关闭时未留下任何文字说明，仅分配负责人和发送模板回复，缺乏解决过程总结，无复用参考价值。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 25分
  - 痛点原因：无方案文档沉淀且未关联主issue，关闭说明仅为机器人合并提示，缺乏业务细节供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `cann-robot`：assigned to @zhaoDan0110    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3807](https://gitcode.com/cann/ops-transformer/issues/3807) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule SYS_WORKSPACE_SIZE魔法数16MB硬编码无来源说明** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档化，仅简单标记从 codehub 关闭，未留下可复用的解决经验。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3806](https://gitcode.com/cann/ops-transformer/issues/3806) [Requirement|需求建议]: chunk_gated_delta_rule chunk_size硬编码为64，不随输入自适应** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档化，未沉淀有效解决方案供后续复用。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3805](https://gitcode.com/cann/ops-transformer/issues/3805) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule matmul tiling固定baseM/K/N=128，dk=128时无…** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档化及重复链接，未沉淀可复用的解决经验。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3804](https://gitcode.com/cann/ops-transformer/issues/3804) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule aclnn接口SoC名称硬编码字符串匹配Ascend950** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档，仅记录从codehub关闭，缺乏根因分析与修复细节，无法供他人参考复用。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3803](https://gitcode.com/cann/ops-transformer/issues/3803) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 跨SyncAll读写finalState_可能存在GM可见性竞态** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档与复用链接，未沉淀根因分析与解决思路，缺乏后续参考价值。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3802](https://gitcode.com/cann/ops-transformer/issues/3802) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule mask workspace常量不一致，MASK_NUM(4)与TASK_…** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档化与主链接，仅记录状态变更，未沉淀可复用的解决经验。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3801](https://gitcode.com/cann/ops-transformer/issues/3801) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule infershape 误用维度常量DIM_0/DIM_1作为输出索引** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档化与dup主链接，未留下有价值的复用信息供社区参考。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3800](https://gitcode.com/cann/ops-transformer/issues/3800) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 空输出判断使用AND而非OR，部分空输出时仍继续执行** — 25分
  - 痛点原因：关闭时仅简短说明且无方案文档化沉淀，未提供可复用的修复细节。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3799](https://gitcode.com/cann/ops-transformer/issues/3799) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule GetPlatformInfo()空实现，InitCompileInfo错…** — 25分
  - 痛点原因：关闭说明仅59字且无方案文档与主链接，直接由代码库关闭，未沉淀可复用的解决经验。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3798](https://gitcode.com/cann/ops-transformer/issues/3798) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 事件ID冲突，FIX_MTE2_EVENT与S_MTE3_EVENT共用I…** — 25分
  - 痛点原因：无方案文档沉淀且关闭说明过短，仅记录状态流转与分配，未留下有效的技术解决路径供复用。
  - 原文依据：
    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：检视意见提错    - `cann-robot`：assigned to @haijie_699874
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 25分
  - 痛点原因：缺乏方案文档化与重复主链接，关闭说明仅为机器人因MR合并自动关闭的简略记录，未能沉淀有效信息供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `cann-robot`：assigned to @wangyinchu1    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3784](https://gitcode.com/cann/ops-transformer/issues/3784) [Requirement|需求建议]: all_gather_matmul、matmul_allto_all、allto_all_matmul算子在910b等…** — 25分
  - 痛点原因：缺乏方案文档化和复用链接，关闭说明仅为机器人自动关闭并关联MR，未沉淀解决经验供他人复用。
  - 原文依据：
    - `sangzhenguo`：Create issue mr links: **mc2部分算子关闭cce-auto-sync编译选项** #7473    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3784    - `cann-robot`：add label resolved    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `cann-robot`：assigned to @sangzhenguo    - [关联PR #7473（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7473)
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 25分
  - 痛点原因：关闭说明仅依赖机器人自动关联其他issue合并，无方案文档化且无主链接，导致无法提供有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `cann-robot`：assigned to @xiongyifu    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3778](https://gitcode.com/cann/ops-transformer/issues/3778) [Bug-Report|缺陷反馈]: moe_ep_combine.h存在编译问题** — 25分
  - 痛点原因：仅由机器人关联MR自动关闭，无方案文档化与复用链接，关闭说明简短，缺乏可供后续复用的根因与解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3778    - `zhong-zixin`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8754（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8754)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 25分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档化沉淀，缺乏可供后续复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `cann-robot`：assigned to @WangShuying5    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 25分
  - 痛点原因：关闭说明仅为机器人自动生成的关联合并记录，无方案文档化与主链接，缺乏可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - `cann-robot`：add label resolved    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：assigned to @jiangyixuan2    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3762](https://gitcode.com/cann/ops-transformer/issues/3762) moe_init_routing_v3 clean code** — 25分
  - 痛点原因：关闭说明仅提及因MR合并关闭关联issue，无方案文档化记录与重复主链接，无法提供有效复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3762    - `cann-robot`：add label resolved    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `cann-robot`：assigned to @Huang-Peng    - [关联PR #8583（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8583)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 25分
  - 痛点原因：仅靠机器人自动关联MR关闭，无方案文档沉淀且缺少复用链接，关闭说明过简，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - `cann-robot`：add label resolved    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：assigned to @qq_48757028    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3756](https://gitcode.com/cann/ops-transformer/issues/3756) feat(mc2): 添加 atcoss 通信 barrier 模板实现** — 25分
  - 痛点原因：机械性关闭且无方案文档与dup链接，关联PR仍处于open状态，导致缺乏可复用的解决经验。
  - 原文依据：
    - `luoxinhui666`：closed from codehub    - `weihao18`：/assign [@luoxinhui666](https://gitcode.com/luoxinhui666)    - `cann-robot`：assigned to @luoxinhui666    - [关联PR #8625（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8625)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 25分
  - 痛点原因：关闭时无方案文档与复用链接，仅靠机器人自动说明因关联MR合并而关闭，未沉淀任何参考内容。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `cann-robot`：assigned to @qiansunchi159    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3752](https://gitcode.com/cann/ops-transformer/issues/3752) [Bug-Report|缺陷反馈]: case54：The address for scalar to access the internal buffer …** — 25分
  - 痛点原因：关闭说明仅为机器人自动留言，无人工总结的解决方案文档及重复issue主链接，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3752    - `st0rm60rn`：add label bug-report    - `cann-robot`：add label resolved    - `weihao18`：/assign [@st0rm60rn](https://gitcode.com/st0rm60rn)    - `cann-robot`：assigned to @st0rm60rn    - [关联PR #8689（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8689)
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 25分
  - 痛点原因：关闭说明仅为机器人因MR合并自动关闭的简短提示，无方案文档沉淀与复用链接，缺乏人工总结，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `cann-robot`：assigned to @Kiana1216    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 25分
  - 痛点原因：关闭说明仅记录机器人因MR合并自动关闭，无方案文档沉淀且无重复issue主链接，缺乏复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - `cann-robot`：add label resolved    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：assigned to @liumingxuan9    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 25分
  - 痛点原因：仅由机器人自动关联MR关闭，无方案文档沉淀与可复用链接，导致后续无法直接参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：assigned to @l00858142    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 25分
  - 痛点原因：关闭时仅变更状态和打标签，无方案文档化及重复链接沉淀，关闭说明简短，缺乏可复用的解决信息。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 25分
  - 痛点原因：关闭说明仅为机器人自动触发，无方案文档沉淀与复用指引，未留下可供后续参考的有效经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `cann-robot`：assigned to @wangyinchu1    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 25分
  - 痛点原因：仅机器人关联MR关闭且说明简短，无方案文档化与重复链接，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `cann-robot`：assigned to @xuanyuandy    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3726](https://gitcode.com/cann/ops-transformer/issues/3726) [Bug-Report|缺陷反馈]: flash_attn静态图模式下tiling data访问失败及flag误判** — 25分
  - 痛点原因：无方案文档化记录，关闭说明仅为机器人合并关联的简短描述，未沉淀有效解决方案供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726    - `cann-robot`：add label resolved    - `weihao18`：/assign [@PerrySkywalker](https://gitcode.com/PerrySkywalker)    - `PerrySkywalker`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***PerrySkywalker***. Please do not assign repeatedly.    - `cann-robot`：assigned to @PerrySkywalker
- **[#3825](https://gitcode.com/cann/ops-transformer/issues/3825) [Documentation|文档反馈]: grouped_matmul_swiglu_quant_v2文档 N 轴对齐描述存在冲突** — 30分
  - 痛点原因：被关联 MR 自动关闭，关闭说明仅 49 字且无主链接，未沉淀可复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3825    - `NeverLCY`：add label documentation    - `cann-robot`：add label resolved    - `weihao18`：/assign [@NeverLCY](https://gitcode.com/NeverLCY)    - `cann-robot`：assigned to @NeverLCY    - [关联PR #8874（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8874)
- **[#3824](https://gitcode.com/cann/ops-transformer/issues/3824) [Documentation|文档反馈]: MoeInitRoutingV3 文档缺失quant_mode 14、15** — 30分
  - 痛点原因：关闭说明为0字且未提供重复issue主链接，仅由机器人随MR合并自动关闭，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3824    - `wuxiyuan`：add label documentation    - `cann-robot`：add label resolved    - `wuxiyuan`：assigned to @wuxiyuan    - [关联PR #8867（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8867)
- **[#3817](https://gitcode.com/cann/ops-transformer/issues/3817) [Documentation|文档反馈]: flash_attn算子文档参数类型和约束描述修正** — 30分
  - 痛点原因：关闭说明仅7字且无重复主链接，仅靠机器人自动关闭，未留下人工总结的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3817    - `cann-robot`：add label resolved    - `haijie_699874`：/assign    - `cann-robot`：assigned to @haijie_699874    - [关联PR #8850（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8850)    - [关联PR #8861（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8861)
- **[#3816](https://gitcode.com/cann/ops-transformer/issues/3816) [Documentation|文档反馈]: flash_attn arch35 kernel __has_include 与 GET_TILING_DATA_…** — 30分
  - 痛点原因：关闭说明仅7字且仅提及随关联MR合并而关闭，未沉淀具体解决方案细节，导致他人无法直接复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3816    - `cann-robot`：add label resolved    - `PerrySkywalker`：/assign    - `cann-robot`：assigned to @PerrySkywalker    - [关联PR #8847（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8847)
- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 30分
  - 痛点原因：关闭说明仅47字且仅说明因MR合并关闭，缺乏主链接等详细复用信息，导致复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `cann-robot`：assigned to @Yuyu-Li    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 30分
  - 痛点原因：关闭说明为0字，仅留机器人合并关联的机械回复，且未提供重复issue主链接，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3775](https://gitcode.com/cann/ops-transformer/issues/3775) [Documentation|文档反馈]: 更新文档对于combine算子的描述** — 30分
  - 痛点原因：关闭说明仅为机器人自动触发的关联关闭，缺乏人工对文档更新内容的总结与复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3775    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `cann-robot`：assigned to @Yuyu-Li    - [关联PR #8745（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8745)
- **[#3773](https://gitcode.com/cann/ops-transformer/issues/3773) [Bug-Report|缺陷反馈]: MhcPre日志报错与资料不一致** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人自动关闭，缺乏问题原因与解决方案的文字总结，且未提供dup主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3773    - `liweijian16`：add label bug-report    - `cann-robot`：add label resolved    - `liweijian16`：assigned to @liweijian16    - [关联PR #8537（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8537)
- **[#3735](https://gitcode.com/cann/ops-transformer/issues/3735) [Bug-Report|缺陷反馈]: EngramBarrier修改和资料修改** — 30分
  - 痛点原因：关闭说明仅7字且无dup主链接，仅由机器人因MR合并自动关闭，未有效沉淀可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3735    - `cann-robot`：add label resolved    - `liuyibin`：/assign    - `cann-robot`：assigned to @liuyibin    - [关联PR #8619（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8619)
- **[#3732](https://gitcode.com/cann/ops-transformer/issues/3732) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 30分
  - 痛点原因：关闭说明为0字且无关联链接，仅由机器人随MR合并自动关闭，缺乏人工总结与复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - [关联PR #8637（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8637)
- **[#3795](https://gitcode.com/cann/ops-transformer/issues/3795) [Documentation|文档反馈]: GroupedMatmulActivationQuant 算子文档存在 blocksize 错误、参数类型缺失及冗…** — 55分
  - 痛点原因：关闭说明仅为机器人自动生成的简短关联信息，未提供直接的修复链接，缺乏针对文档错误修复细节的具体总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3795    - `zhoushaolong`：add label documentation    - `cann-robot`：add label resolved    - `weihao18`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `zhoushaolong`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `cann-robot`：### Notice This issue is already assigned to ***zhoushaolong***. Please do not assign repeatedly.
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 55分
  - 痛点原因：关闭说明仅为机器人关联MR合并的模板话术，未在issue内沉淀具体解决方案或补充文档链接，信息复用困难。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `weihao18`：assigned to @weihao18    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 55分
  - 痛点原因：关闭说明仅65字且未提供dup主链接，仅以关联issue合并为由关闭，导致后续难以追溯和复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - `cann-robot`：add label resolved    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：assigned to @SimpleBright_Man    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3740](https://gitcode.com/cann/ops-transformer/issues/3740) [Bug-Report|缺陷反馈]: aclnnMoeTokenPermute.md 按照公式手推计算结果 和 文档里的demo实际执行出来的结果不一致** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联MR合并生成，缺乏具体解决方案与复用指引，且未提供dup主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3740    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `alfengyuan`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 55分
  - 痛点原因：关闭说明仅由机器人自动生成且仅提及关联MR合并，缺乏可供其他用户复用的详细人工总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `cann-robot`：assigned to @fanzijian    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
#### PP-02 Bot误关闭率与缺位率双高（G · Bot/Agent 治理）

- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：Bot仅机械执行人工触发的关闭与状态变更，无打标分类且无评论反馈，治理动作单一无效。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 15分
  - 痛点原因：Bot仅对重复分配做被动提示，未执行自动打标或关闭等有效治理动作。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3791](https://gitcode.com/cann/ops-transformer/issues/3791) [Documentation|文档反馈]: trans仓aclnn编译运行样例是FlashAttentionScore算子，但是示例结果叫“mean resu…** — 15分
  - 痛点原因：Bot拒绝了用户的assign请求导致分配失败，且未实现有效自动打标与关闭，自动化治理能力不足。
  - 原文依据：
    - `weihao18`：/assign [@yue-ma](https://gitcode.com/yue-ma)    - `cann-robot`：### Notice This issue can not be assigned to ***yue-ma***. Please try to assign to the repository members.    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `gitcode-chenjiao`：add label documentation    - `weihao18`：assigned to @huang-wei-chen    - `cann-robot`：assigned to @xiu_ling_wang and unassigned @huang-wei-chen
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 15分
  - 痛点原因：Bot提示禁止重复指派后却又执行了错误的指派动作，行为自相矛盾，未能有效治理。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 20分
  - 痛点原因：Bot无任何评论互动，且需人工手动打标，仅执行机械分配与关闭，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @libohao6    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3828](https://gitcode.com/cann/ops-transformer/issues/3828) [Bug-Report|缺陷反馈]: MC2 matmulallreduce类算子，部分case性能不达标** — 20分
  - 痛点原因：Bot仅机械执行指派、打标及随关联MR合并自动关闭，全程无任何评论互动，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ouyf    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3828    - [关联PR #8695（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8695)
- **[#3827](https://gitcode.com/cann/ops-transformer/issues/3827) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试套件补充msprof性能采集、initial_state非连续用例及RD…** — 20分
  - 痛点原因：Bot虽打标并关闭，但评论数为零且仅因MR合并被动关闭，缺乏主动治理与状态同步，导致有效性低。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3827    - [关联PR #8815（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8815)
- **[#3826](https://gitcode.com/cann/ops-transformer/issues/3826) [Bug-Report|缺陷反馈]: BlockEpilogueSwigluMxQuant 的调用点以临时 Arguments 对象调用 Init，但类内保存…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论互动与引导，未发挥实质治理作用。
  - 原文依据：
    - `weihao18`：/assign [@macech](https://gitcode.com/macech)    - `macech`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3826    - [关联PR #8777（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8777)
- **[#3825](https://gitcode.com/cann/ops-transformer/issues/3825) [Documentation|文档反馈]: grouped_matmul_swiglu_quant_v2文档 N 轴对齐描述存在冲突** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，未留下任何处理说明评论，治理过程缺乏透明度。
  - 原文依据：
    - `weihao18`：/assign [@NeverLCY](https://gitcode.com/NeverLCY)    - `NeverLCY`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @NeverLCY    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3825    - [关联PR #8874（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8874)
- **[#3824](https://gitcode.com/cann/ops-transformer/issues/3824) [Documentation|文档反馈]: MoeInitRoutingV3 文档缺失quant_mode 14、15** — 20分
  - 痛点原因：Bot仅执行了打标和关闭操作，全程无任何评论与用户互动或解释原因，治理过程不透明。
  - 原文依据：
    - `wuxiyuan`：add label documentation    - `cann-robot`：add label resolved    - `wuxiyuan`：assigned to @wuxiyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3824    - [关联PR #8867（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8867)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 20分
  - 痛点原因：Bot仅机械执行分配、打标与关闭操作，无任何评论进行有效沟通，且误打标resolved，治理无效。
  - 原文依据：
    - `weihao18`：/assign @wangrui_    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3817](https://gitcode.com/cann/ops-transformer/issues/3817) [Documentation|文档反馈]: flash_attn算子文档参数类型和约束描述修正** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭操作，全程无评论说明，缺乏对用户的有效反馈。
  - 原文依据：
    - `haijie_699874`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @haijie_699874    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3817    - [关联PR #8850（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8850)    - [关联PR #8861（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8861)
- **[#3816](https://gitcode.com/cann/ops-transformer/issues/3816) [Documentation|文档反馈]: flash_attn arch35 kernel __has_include 与 GET_TILING_DATA_…** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭操作，全程无评论互动，治理流于形式缺乏有效反馈。
  - 原文依据：
    - `PerrySkywalker`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @PerrySkywalker    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3816    - [关联PR #8847（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8847)
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 20分
  - 痛点原因：Bot误给需求建议打上resolved标签且无任何评论互动，治理动作完全无效。
  - 原文依据：
    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3814](https://gitcode.com/cann/ops-transformer/issues/3814) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule op def 的 DataType/Format 参数与 aicore 配…** — 20分
  - 痛点原因：Bot仅完成打标与关闭等机械动作，未留下任何评论与用户进行有效沟通反馈。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - [关联PR #8841（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8841)
- **[#3813](https://gitcode.com/cann/ops-transformer/issues/3813) moe_ep_dispatch优化count计算与atomicadd使用** — 20分
  - 痛点原因：Bot仅机械执行指派、打标和关闭操作，全程无评论互动，缺乏有效沟通反馈导致体验不佳。
  - 原文依据：
    - `weihao18`：/assign [@z1017i](https://gitcode.com/z1017i)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @z1017i    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3813    - [关联PR #8820（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8820)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 20分
  - 痛点原因：Bot仅机械执行打标与分配操作，全程无任何评论反馈，缺乏交互说明，导致治理过程不透明且无效。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，无任何评论交互，缺乏与用户的沟通，治理过程不透明。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 20分
  - 痛点原因：Bot仅执行打标与分配，无任何评论回复或自动关闭动作，未形成有效闭环。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18
- **[#3808](https://gitcode.com/cann/ops-transformer/issues/3808) [Bug-Report|缺陷反馈]: moe_ep_dispatch/moe_ep_dispatch_epilogue/moe_ep_combine拦截信息不…** — 20分
  - 痛点原因：Bot直接打标并关闭了issue，但全程无任何评论说明原因，缺乏与用户的沟通解释。
  - 原文依据：
    - `weihao18`：/assign [@junnyleo](https://gitcode.com/junnyleo)    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @junnyleo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - `junnyleo`：changed custom state from 进行中 to 已完成
- **[#3806](https://gitcode.com/cann/ops-transformer/issues/3806) [Requirement|需求建议]: chunk_gated_delta_rule chunk_size硬编码为64，不随输入自适应** — 20分
  - 痛点原因：Bot仅完成打标和指派，无评论互动且未自动关闭，最终由人工关闭，治理不完整。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3802](https://gitcode.com/cann/ops-transformer/issues/3802) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule mask workspace常量不一致，MASK_NUM(4)与TASK_…** — 20分
  - 痛点原因：Bot仅执行打标与分配，未参与关闭流程且无评论互动，治理动作单一未形成闭环。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3800](https://gitcode.com/cann/ops-transformer/issues/3800) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 空输出判断使用AND而非OR，部分空输出时仍继续执行** — 20分
  - 痛点原因：Bot仅执行打标与指派，无评论引导且未自动关闭，治理流程缺乏闭环。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3799](https://gitcode.com/cann/ops-transformer/issues/3799) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule GetPlatformInfo()空实现，InitCompileInfo错…** — 20分
  - 痛点原因：Bot仅完成打标和分配，未参与关闭且无任何评论，治理动作单一。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3798](https://gitcode.com/cann/ops-transformer/issues/3798) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 事件ID冲突，FIX_MTE2_EVENT与S_MTE3_EVENT共用I…** — 20分
  - 痛点原因：Bot仅执行打标与指派，无关闭操作且零评论，治理动作单一，未有效参与后续流程。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：检视意见提错    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，未留下任何评论说明关闭原因，缺乏治理透明度与用户反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 20分
  - 痛点原因：Bot对需求建议直接打resolved标签并关闭，全程无评论说明，治理行为机械无效。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3792](https://gitcode.com/cann/ops-transformer/issues/3792) [Requirement|需求建议]: chunk_gated_delta_rule 测试脚本支持静态图模式** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭，全程无评论与用户互动，缺乏有效沟通与闭环反馈。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3792    - [关联PR #8791（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8791)
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 20分
  - 痛点原因：Bot仅打标且无评论互动，最终由人工关闭，未实现自动化闭环治理。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3787](https://gitcode.com/cann/ops-transformer/issues/3787) [Bug-Report|缺陷反馈]: SMLA算子pytest缺少aclgraph调用** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，评论数为零，缺乏自动化回复与状态变更说明，未能实现有效治理。
  - 原文依据：
    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `SH_jingsong`：assigned to @SH_jingsong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3787    - [关联PR #8759（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8759)
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 20分
  - 痛点原因：Bot仅机械打标和关闭，全程无评论互动，缺乏对用户的有效引导与进度同步。
  - 原文依据：
    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
- **[#3784](https://gitcode.com/cann/ops-transformer/issues/3784) [Requirement|需求建议]: all_gather_matmul、matmul_allto_all、allto_all_matmul算子在910b等…** — 20分
  - 痛点原因：Bot未发表任何评论即直接打标并关闭issue，缺乏有效交互与治理引导。
  - 原文依据：
    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sangzhenguo    - `sangzhenguo`：Create issue mr links: **mc2部分算子关闭cce-auto-sync编译选项** #7473    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3784    - [关联PR #7473（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7473)
- **[#3783](https://gitcode.com/cann/ops-transformer/issues/3783) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试框架chunk_size未透传及seqlen语义不一致** — 20分
  - 痛点原因：Bot虽完成打标分配与关闭，但全程零评论，未公开说明关闭原因，导致治理过程不透明。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3783    - [关联PR #8773（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8773)
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 20分
  - 痛点原因：Bot在无任何评论反馈的情况下直接将需求打上resolved标签，缺乏有效互动导致治理失效。
  - 原文依据：
    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3781](https://gitcode.com/cann/ops-transformer/issues/3781) [Requirement|需求建议]: Compressor pytest支持批跑性能及批跑读取case优化** — 20分
  - 痛点原因：Bot直接打标resolved并关闭需求issue，全程无任何评论说明，治理粗暴且缺乏有效沟通。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3781    - [关联PR #8756（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8756)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关联关闭，无任何评论互动，未发挥实际治理引导作用。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3779](https://gitcode.com/cann/ops-transformer/issues/3779) [Bug-Report|缺陷反馈]: Mega_moe在DeepSeekV4模型侧精度问题，请修复** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，未在评论区发布任何说明或与用户交互，缺乏有效反馈。
  - 原文依据：
    - `lyt_claire`：add label bug-report    - `cann-robot`：add label resolved    - `lyt_claire`：assigned to @lyt_claire    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3779    - [关联PR #8375（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8375)
- **[#3778](https://gitcode.com/cann/ops-transformer/issues/3778) [Bug-Report|缺陷反馈]: moe_ep_combine.h存在编译问题** — 20分
  - 痛点原因：Bot仅被动执行打标与分配，无任何引导性评论，治理过程缺乏有效沟通。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhong-zixin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3778    - [关联PR #8754（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8754)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无任何评论互动，缺乏对用户的状态同步与解释，治理过程不透明。
  - 原文依据：
    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3775](https://gitcode.com/cann/ops-transformer/issues/3775) [Documentation|文档反馈]: 更新文档对于combine算子的描述** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，无任何评论交互，直接打resolved标签，缺乏实质性治理沟通。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3775    - [关联PR #8745（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8745)
- **[#3773](https://gitcode.com/cann/ops-transformer/issues/3773) [Bug-Report|缺陷反馈]: MhcPre日志报错与资料不一致** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，无任何评论进行状态同步或说明，缺乏有效交互。
  - 原文依据：
    - `liweijian16`：add label bug-report    - `cann-robot`：add label resolved    - `liweijian16`：assigned to @liweijian16    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3773    - [关联PR #8537（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8537)
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 20分
  - 痛点原因：Bot仅执行打标和关闭，未产生任何评论进行状态同步或用户引导，缺乏有效互动。
  - 原文依据：
    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，无任何交互评论，治理缺乏有效反馈与引导。
  - 原文依据：
    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @WangShuying5    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭，评论数为0，缺乏与用户的有效互动与沟通反馈。
  - 原文依据：
    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，评论数为0，缺乏与用户的互动反馈及治理原因解释，导致有效性不足。
  - 原文依据：
    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 20分
  - 痛点原因：Bot仅完成打标、分配和关闭的机械操作，无任何评论互动与引导，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，未产生任何有效评论，缺乏自动化引导与深度治理。
  - 原文依据：
    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 20分
  - 痛点原因：Bot虽执行了打标和关闭，但无任何评论互动，缺乏状态变更说明与用户引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 20分
  - 痛点原因：Bot仅机械执行打标与分配且直接标记resolved，全程无评论互动，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3762](https://gitcode.com/cann/ops-transformer/issues/3762) moe_init_routing_v3 clean code** — 20分
  - 痛点原因：Bot仅机械执行分配、打标和关闭动作，评论数为零，未提供任何状态同步或交互说明，缺乏有效沟通。
  - 原文依据：
    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Huang-Peng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3762    - [关联PR #8583（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8583)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何说明性评论，未同步状态变更与关闭原因，缺乏过程透明度。
  - 原文依据：
    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3759](https://gitcode.com/cann/ops-transformer/issues/3759) cleancode: 删除 CheckEpTpRecvTensorDim 函数内连续空行** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭操作，全程无任何评论互动，缺乏过程透明度与有效沟通。
  - 原文依据：
    - `weihao18`：/assign [@Gan12](https://gitcode.com/Gan12)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Gan12    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3759    - [关联PR #8685（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8685)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭动作，评论数为零，缺乏有效沟通与状态反馈，治理过程过于单一。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 20分
  - 痛点原因：Bot仅执行打标与分配操作，但全程无任何评论互动，缺乏状态变更的透明反馈，导致治理失效。
  - 原文依据：
    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3752](https://gitcode.com/cann/ops-transformer/issues/3752) [Bug-Report|缺陷反馈]: case54：The address for scalar to access the internal buffer …** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，无任何评论交互，且直接打上resolved标签，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@st0rm60rn](https://gitcode.com/st0rm60rn)    - `st0rm60rn`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @st0rm60rn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3752    - [关联PR #8689（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8689)
- **[#3751](https://gitcode.com/cann/ops-transformer/issues/3751) [Requirement|需求建议]: InplacePartialRotaryMulGrad 算子缺少golden.py 文件** — 20分
  - 痛点原因：Bot仅机械打标并因关联MR合并关闭，全程无任何评论说明处理过程或与用户互动。
  - 原文依据：
    - `alfengyuan`：add label requirement    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3751    - `alfengyuan`：changed custom state from 进行中 to 已完成    - [关联PR #8696（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8696)
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 20分
  - 痛点原因：Bot直接关闭需求建议类issue并打标resolved，且无任何有效评论，属于无效治理。
  - 原文依据：
    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 20分
  - 痛点原因：Bot仅执行打标、指派和关闭等机械操作，无任何评论互动，未能提供有效治理反馈。
  - 原文依据：
    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 20分
  - 痛点原因：Bot直接给需求建议打resolved标签并关闭，无任何评论互动，治理动作误判且无效。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @l00858142    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3745](https://gitcode.com/cann/ops-transformer/issues/3745) [Bug-Report|缺陷反馈]: SLIKG算子存在同步卡死问题** — 20分
  - 痛点原因：Bot仅执行打标和关闭动作，但全程无评论说明，缺乏与用户的沟通反馈，治理过程不透明。
  - 原文依据：
    - `llwy0320`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3745    - [关联PR #8675（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8675)
- **[#3743](https://gitcode.com/cann/ops-transformer/issues/3743) [Bug-Report|缺陷反馈]: dense_lightning_indexer_softmax_lse最大序列没有增加相关校验** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，无任何评论互动，缺乏对用户的有效引导与反馈，治理流于形式。
  - 原文依据：
    - `weihao18`：/assign [@shilulu](https://gitcode.com/shilulu)    - `shilulu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3743    - [关联PR #8667（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8667)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 20分
  - 痛点原因：Bot仅执行了打标和分配动作，但评论数为零，缺乏状态反馈与有效引导，治理互动严重不足。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3740](https://gitcode.com/cann/ops-transformer/issues/3740) [Bug-Report|缺陷反馈]: aclnnMoeTokenPermute.md 按照公式手推计算结果 和 文档里的demo实际执行出来的结果不一致** — 20分
  - 痛点原因：Bot虽完成打标与关闭，但未产生任何有效评论，实际由人工定位并修复，Bot治理未发挥作用。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `alfengyuan`：初步看了下是demo代码书写有误： ```cpp std::vector<float> xHostData = {0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3}; s…    - `alfengyuan`：修改一下示例文档demo就好了，我来帮忙修复吧 [@weihao18](https://gitcode.com/weihao18) [@cpy_123456](https://gitcode.com/cpy_123456)    - `alfengyuan`：/assign    - `alfengyuan`：add label bug-report    - `cann-robot`：add label Accepted
- **[#3736](https://gitcode.com/cann/ops-transformer/issues/3736) [Bug-Report|缺陷反馈]: 整改tensor api 后处理修改成正确的aiv风格的命名空间** — 20分
  - 痛点原因：机器人重复指派且错误添加resolved标签，全程无评论沟通，治理行为无效。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3736    - [关联PR #8652（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8652)
- **[#3735](https://gitcode.com/cann/ops-transformer/issues/3735) [Bug-Report|缺陷反馈]: EngramBarrier修改和资料修改** — 20分
  - 痛点原因：Bot仅执行打标、分配和关闭动作，全程无任何评论，缺乏状态说明与用户交互，治理过程不透明。
  - 原文依据：
    - `liuyibin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liuyibin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3735    - [关联PR #8619（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8619)
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭，全程无任何评论说明，导致治理过程不透明且缺乏有效交互。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3733](https://gitcode.com/cann/ops-transformer/issues/3733) [Bug-Report|缺陷反馈]: keycache和valuecache在nz数据格式下，输入数据类型不一致的校验拦截** — 20分
  - 痛点原因：Bot未经有效验证直接给缺陷反馈打上resolved标签且无任何评论说明，属于无效治理。
  - 原文依据：
    - `BIGWHITETEETH`：/assign    - `BIGWHITETEETH`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @BIGWHITETEETH    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - [关联PR #8626（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8626)
- **[#3732](https://gitcode.com/cann/ops-transformer/issues/3732) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 20分
  - 痛点原因：Bot仅机械打标和关闭，未产生任何有效评论与用户互动，治理流于形式。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - [关联PR #8637（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8637)
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无任何评论说明，缺乏治理反馈与透明度。
  - 原文依据：
    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fanzijian    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
- **[#3728](https://gitcode.com/cann/ops-transformer/issues/3728) [Bug-Report|缺陷反馈]:** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论与用户沟通，缺乏治理透明度与反馈。
  - 原文依据：
    - `weihao18`：/assign [@HertzHan](https://gitcode.com/HertzHan)    - `HertzHan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @HertzHan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - [关联PR #8582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8582)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 20分
  - 痛点原因：Bot直接将需求建议打标resolved并关闭，且无任何评论说明，属于无效治理。
  - 原文依据：
    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 35分
  - 痛点原因：Bot拦截了非作者用户的关闭指令，未能协助完成issue关闭，导致治理流程未闭环。
  - 原文依据：
    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `weihao18`：closed from codehub
#### PP-03 技术讨论停滞缺乏实质推进（I2 · 讨论与解决）

- **[#3834](https://gitcode.com/cann/ops-transformer/issues/3834) [Requirement|需求建议]: GenPositionIdsFromMask算子AscendC实现** — 0分
  - 痛点原因：关联的PR未合并，且无commit引用、release说明及关闭评论，缺乏实际解决证据。
  - 原文依据：
    - [关联PR #8900（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8900)    - `wuxs68`：/assign    - `cann-robot`：assigned to @wuxs68
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 0分
  - 痛点原因：仅有关联PR，无commit、文档或release引用，且关闭时无评论说明，证据链不完整。
  - 原文依据：
    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)    - [关联PR #8947（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8947)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 0分
  - 痛点原因：关联PR处于open状态未合并，且无commit、文档、release引用及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861
- **[#3819](https://gitcode.com/cann/ops-transformer/issues/3819) [Requirement|需求建议]: dsv4 metadata功能泛化** — 0分
  - 痛点原因：仅关联了未合并的open状态PR，缺乏commit、文档及release等实际解决证据。
  - 原文依据：
    - [关联PR #8829（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8829)    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861
- **[#3810](https://gitcode.com/cann/ops-transformer/issues/3810) [Bug-Report|缺陷反馈]: master编译报错** — 0分
  - 痛点原因：关联PR虽已合并，但讨论仅询问分支未说明修复内容，且缺乏commit、文档或release等直接修复证据。
  - 原文依据：
    - [关联PR #8904（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8904)    - `weihao18`：感谢反馈，请问一下你那边源码是哪个分支的？    - `george_zhanglei`：master分支    - `george_zhanglei`：add label bug-report    - `weihao18`：assigned to @weihao18
- **[#3794](https://gitcode.com/cann/ops-transformer/issues/3794) [Question|问题咨询]: 950上FAG算子采用了未公开的接口。** — 0分
  - 痛点原因：仅分配了处理人，未提供任何关联PR、代码提交、文档链接或关闭评论等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：assigned to @coder_linx
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭时无说明评论，且缺少commit、文档或release等直接解决证据链接，仅靠系统状态变更关闭。
  - 原文依据：
    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3788](https://gitcode.com/cann/ops-transformer/issues/3788) [Bug-Report|缺陷反馈]: 【GroupedMatmulSwigluQuantV2】MX WeightNz多Tensor改动导致MXA8W4多Ten…** — 0分
  - 痛点原因：关联PR仍处于open状态未合并，且无commit、release引用及关闭评论证明问题已解决。
  - 原文依据：
    - [关联PR #8786（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8786)    - `zhangzhizhuo`：add label bug-report    - `zhangzhizhuo`：assigned to @zhangzhizhuo
- **[#3787](https://gitcode.com/cann/ops-transformer/issues/3787) [Bug-Report|缺陷反馈]: SMLA算子pytest缺少aclgraph调用** — 0分
  - 痛点原因：虽关联PR已合并，但无commit引用与文档链接等实质证据，且关闭时仅机器人自动操作，无人工关闭评论说明解决情况。
  - 原文依据：
    - [关联PR #8759（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8759)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3787    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `SH_jingsong`：assigned to @SH_jingsong
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 0分
  - 痛点原因：关联的 PR 处于 open 状态未合并，且无 commit、文档或 release 引用，缺乏实际解决证据。
  - 原文依据：
    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock
- **[#3779](https://gitcode.com/cann/ops-transformer/issues/3779) [Bug-Report|缺陷反馈]: Mega_moe在DeepSeekV4模型侧精度问题，请修复** — 0分
  - 痛点原因：虽有合并的关联PR，但无提交记录、文档或版本说明等直接证据引用，且无人工关闭评论，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #8375（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8375)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3779    - `lyt_claire`：add label bug-report    - `cann-robot`：add label resolved    - `lyt_claire`：assigned to @lyt_claire
- **[#3777](https://gitcode.com/cann/ops-transformer/issues/3777) [Bug-Report|缺陷反馈]: mc2/3rd下面部分cpp文件不参与编译** — 0分
  - 痛点原因：关联的PR处于未合并状态，且缺乏commit、文档或release等实质性解决证据。
  - 原文依据：
    - [关联PR #8239（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8239)    - `hblnb`：add label bug-report    - `hblnb`：assigned to @hblnb
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：仅靠评论区+1表态，完全缺乏关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 0分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工补充的代码提交记录或明确解决说明等强证据。
  - 原文依据：
    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 0分
  - 痛点原因：关联的两个PR均未合并且处于open状态，同时缺乏commit、文档及release等实际解决证据。
  - 原文依据：
    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：assigned to @zhong-zixin
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 0分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216
- **[#3760](https://gitcode.com/cann/ops-transformer/issues/3760) moe_init_routing_quant_v2 自定义 CHECK_NULL 宏错误码不规范** — 0分
  - 痛点原因：虽关联PR已合并，但无commit引用、文档链接、release引用及关闭评论，缺乏解决证据。
  - 原文依据：
    - [关联PR #8673（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8673)    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `Huang-Peng`：add label bug    - `cann-robot`：assigned to @Huang-Peng
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关联PR处于未合并状态，且无commit引用与关闭评论，缺乏实际已解决的证据。
  - 原文依据：
    - [关联PR #8813（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8813)    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815
- **[#3751](https://gitcode.com/cann/ops-transformer/issues/3751) [Requirement|需求建议]: InplacePartialRotaryMulGrad 算子缺少golden.py 文件** — 0分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #8696（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8696)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3751    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `alfengyuan`：add label requirement    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅存在人员指派记录，无关联PR、代码提交或关闭评论等任何证明问题已解决的证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3745](https://gitcode.com/cann/ops-transformer/issues/3745) [Bug-Report|缺陷反馈]: SLIKG算子存在同步卡死问题** — 0分
  - 痛点原因：仅关联了合并的PR，但缺乏commit引用、文档链接、release引用及人工关闭评论，导致解决证据不足。
  - 原文依据：
    - [关联PR #8675（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8675)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3745    - `llwy0320`：add label bug-report    - `cann-robot`：add label resolved
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅指派了负责人，未关联任何 PR、commit 或文档链接等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3741](https://gitcode.com/cann/ops-transformer/issues/3741) [Bug-Report|缺陷反馈]: moe_init_routing_quant_v2算子，非950平台手动同步迁移** — 0分
  - 痛点原因：关联的PR仍处于未合并状态，且缺乏commit引用、文档说明及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8656（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8656)    - `kdy18482276080`：add label bug-report    - `kdy18482276080`：assigned to @kdy18482276080
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：仅记录缺陷反馈与负责人指派，无关联PR、commit引用及关闭评论等任何证明问题已解决的证据。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅完成了任务指派，未关联任何 PR、提交记录或文档链接等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联PR、commit引用及关闭评论等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3832](https://gitcode.com/cann/ops-transformer/issues/3832) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT4_E2M1等不存在** — 15分
  - 痛点原因：无关联PR和代码提交，仅停留在版本询问与任务分配阶段，未提供任何实质性的解决证据。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：你好，你使用的cann toolkit包是哪个版本    - `iansheng`：>你好，你使用的cann toolkit包是哪个版本 [@weihao18](https://gitcode.com/weihao18) 9.1.0.B101，大概7月初的主线版本    - `cann-robot`：assigned to @weihao18
- **[#3829](https://gitcode.com/cann/ops-transformer/issues/3829) [Requirement|需求建议]: [第三方依赖消减] 移除 2 项未使用的三方依赖** — 15分
  - 痛点原因：仅完成指派，缺少关联 PR、commit 引用和 release 引用等实际解决证据，未形成有效闭环。
  - 原文依据：
    - `weihao18`：/assign    - `cann-robot`：assigned to @weihao18
- **[#3824](https://gitcode.com/cann/ops-transformer/issues/3824) [Documentation|文档反馈]: MoeInitRoutingV3 文档缺失quant_mode 14、15** — 15分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit引用和人工关闭评论说明修复细节，证据不足。
  - 原文依据：
    - [关联PR #8867（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8867)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3824    - `wuxiyuan`：add label documentation    - `cann-robot`：add label resolved    - `wuxiyuan`：assigned to @wuxiyuan
- **[#3823](https://gitcode.com/cann/ops-transformer/issues/3823) [Documentation|文档反馈]: megamoe 资料需要补充A2、A3的example** — 15分
  - 痛点原因：缺乏commit和release引用，且关联PR仍有open状态，未形成完整的解决闭环证据。
  - 原文依据：
    - [关联PR #8770（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8770)    - [关联PR #8771（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8771)    - `ryan_li`：add label documentation    - `ryan_li`：assigned to @ryan_li
- **[#3791](https://gitcode.com/cann/ops-transformer/issues/3791) [Documentation|文档反馈]: trans仓aclnn编译运行样例是FlashAttentionScore算子，但是示例结果叫“mean resu…** — 15分
  - 痛点原因：关联的两个PR均处于未合并状态，无commit引用与关闭评论，且分配人员失败，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8805（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8805)    - [关联PR #8806（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8806)    - `weihao18`：/assign [@yue-ma](https://gitcode.com/yue-ma)    - `cann-robot`：### Notice This issue can not be assigned to ***yue-ma***. Please try to assign to the repository members.    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `gitcode-chenjiao`：add label documentation
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 15分
  - 痛点原因：虽有合并的关联PR，但无commit引用、release说明及人工确认解决的评论，导致证据不足。
  - 原文依据：
    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 15分
  - 痛点原因：仅口头回复修复建议并指派，无关联PR或commit引用证明已实质修复，且无关闭评论说明最终状态。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3732](https://gitcode.com/cann/ops-transformer/issues/3732) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、release引用及人工解决说明，导致证据不足。
  - 原文依据：
    - [关联PR #8637（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8637)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 23分
  - 痛点原因：虽关联三个已合并PR，但无commit引用、文档链接及有效关闭说明，仅靠assign命令关闭，证据链不完整。
  - 原文依据：
    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)    - [关联PR #8896（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8896)    - [关联PR #8908（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8908)    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - `libohao6`：add label requirement
- **[#3828](https://gitcode.com/cann/ops-transformer/issues/3828) [Bug-Report|缺陷反馈]: MC2 matmulallreduce类算子，部分case性能不达标** — 23分
  - 痛点原因：仅有关联PR与机器人关闭评论，缺乏commit引用、文档及release等直接解决证据，导致得分过低。
  - 原文依据：
    - [关联PR #8695（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8695)    - `weihao18`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3828    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ouyf
- **[#3827](https://gitcode.com/cann/ops-transformer/issues/3827) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试套件补充msprof性能采集、initial_state非连续用例及RD…** — 23分
  - 痛点原因：虽有合并的关联 PR，但缺乏 commit 引用、文档链接和 release 引用等直接修复证据，导致证据强度不足。
  - 原文依据：
    - [关联PR #8815（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8815)    - `huang-chuhong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3827    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong
- **[#3826](https://gitcode.com/cann/ops-transformer/issues/3826) [Bug-Report|缺陷反馈]: BlockEpilogueSwigluMxQuant 的调用点以临时 Arguments 对象调用 Init，但类内保存…** — 23分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #8777（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8777)    - `weihao18`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3826    - `macech`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 23分
  - 痛点原因：仅关联已合并PR，缺乏commit引用、文档及release链接等直接证据，仅靠机器人自动关闭，导致证据支撑不足。
  - 原文依据：
    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)    - `weihao18`：/assign @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 23分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110
- **[#3813](https://gitcode.com/cann/ops-transformer/issues/3813) moe_ep_dispatch优化count计算与atomicadd使用** — 23分
  - 痛点原因：虽有关联PR和机器人关闭评论，但缺乏commit引用、文档链接及release说明等强证据支撑。
  - 原文依据：
    - [关联PR #8820（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8820)    - `weihao18`：/assign [@z1017i](https://gitcode.com/z1017i)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3813    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @z1017i
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭评论，无commit引用、文档链接及release引用等直接解决证据支撑。
  - 原文依据：
    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 23分
  - 痛点原因：仅关联合并PR及文字说明，缺失commit、文档和release等直接证据链接，导致可追溯性不足。
  - 原文依据：
    - [关联PR #8852（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8852)    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report
- **[#3808](https://gitcode.com/cann/ops-transformer/issues/3808) [Bug-Report|缺陷反馈]: moe_ep_dispatch/moe_ep_dispatch_epilogue/moe_ep_combine拦截信息不…** — 23分
  - 痛点原因：仅有关联PR与机器人自动关闭，缺乏commit、文档及release等直接证据，解决证据链薄弱。
  - 原文依据：
    - [关联PR #8792（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8792)    - `weihao18`：/assign [@junnyleo](https://gitcode.com/junnyleo)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - `junnyleo`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted
- **[#3807](https://gitcode.com/cann/ops-transformer/issues/3807) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule SYS_WORKSPACE_SIZE魔法数16MB硬编码无来源说明** — 23分
  - 痛点原因：关联PR仍为open状态，无commit、文档及release引用，仅靠状态变更关闭，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @haijie_699874
- **[#3806](https://gitcode.com/cann/ops-transformer/issues/3806) [Requirement|需求建议]: chunk_gated_delta_rule chunk_size硬编码为64，不随输入自适应** — 23分
  - 痛点原因：关联PR未合并且无commit与release引用，仅凭状态变更关闭，缺乏代码落地的实质证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874
- **[#3803](https://gitcode.com/cann/ops-transformer/issues/3803) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 跨SyncAll读写finalState_可能存在GM可见性竞态** — 23分
  - 痛点原因：关联PR仍为open状态且无commit或release引用，仅通过codehub关闭，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @haijie_699874
- **[#3802](https://gitcode.com/cann/ops-transformer/issues/3802) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule mask workspace常量不一致，MASK_NUM(4)与TASK_…** — 23分
  - 痛点原因：关联PR未合并且无commit引用，仅靠状态流转关闭，缺乏实质代码修复证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874
- **[#3799](https://gitcode.com/cann/ops-transformer/issues/3799) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule GetPlatformInfo()空实现，InitCompileInfo错…** — 23分
  - 痛点原因：关联PR未合并且无commit、文档及release引用，仅靠状态流转关闭，缺乏实质性修复证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874
- **[#3798](https://gitcode.com/cann/ops-transformer/issues/3798) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 事件ID冲突，FIX_MTE2_EVENT与S_MTE3_EVENT共用I…** — 23分
  - 痛点原因：关联PR未合并且无commit等修复证据，关闭评论显示检视意见提错，缺乏实质性解决证明。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：检视意见提错    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档和release引用，且关闭评论仅为机器人自动关闭，无人工解决说明。
  - 原文依据：
    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1
- **[#3792](https://gitcode.com/cann/ops-transformer/issues/3792) [Requirement|需求建议]: chunk_gated_delta_rule 测试脚本支持静态图模式** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接和release引用等直接证据支撑。
  - 原文依据：
    - [关联PR #8791（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8791)    - `huang-chuhong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3792    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong
- **[#3784](https://gitcode.com/cann/ops-transformer/issues/3784) [Requirement|需求建议]: all_gather_matmul、matmul_allto_all、allto_all_matmul算子在910b等…** — 23分
  - 痛点原因：虽关联PR已合并，但缺乏commit引用、文档链接和release引用，仅靠机器人关闭导致解决证据链不完整。
  - 原文依据：
    - [关联PR #7473（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7473)    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `sangzhenguo`：Create issue mr links: **mc2部分算子关闭cce-auto-sync编译选项** #7473    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3784    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sangzhenguo
- **[#3783](https://gitcode.com/cann/ops-transformer/issues/3783) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试框架chunk_size未透传及seqlen语义不一致** — 23分
  - 痛点原因：虽有合并的关联PR和机器人自动关闭，但缺乏commit引用、文档链接及人工解决说明，证据不足。
  - 原文依据：
    - [关联PR #8773（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8773)    - `huang-chuhong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3783    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 23分
  - 痛点原因：仅靠机器人自动关闭并关联合并PR，缺乏commit、文档及release引用，解决证据链不完整。
  - 原文依据：
    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu
- **[#3781](https://gitcode.com/cann/ops-transformer/issues/3781) [Requirement|需求建议]: Compressor pytest支持批跑性能及批跑读取case优化** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及release引用，仅靠机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #8756（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8756)    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3781    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit、文档及release等直接解决证据。
  - 原文依据：
    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)    - `weihao18`：/assign @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_
- **[#3778](https://gitcode.com/cann/ops-transformer/issues/3778) [Bug-Report|缺陷反馈]: moe_ep_combine.h存在编译问题** — 23分
  - 痛点原因：虽有关联PR，但仅靠机器人自动关闭，缺乏commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #8754（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8754)    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3778    - `zhong-zixin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhong-zixin
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 23分
  - 痛点原因：仅靠关联PR和机器人关闭评论，缺乏commit、文档及release等直接修复证据。
  - 原文依据：
    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)    - [关联PR #8731（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8731)    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档及release链接等直接证据，且仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 23分
  - 痛点原因：虽有关联PR和关闭记录，但缺乏commit引用、文档链接及release引用等直接解决证据，导致证据强度不足。
  - 原文依据：
    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 23分
  - 痛点原因：仅靠机器人关闭和关联PR，缺乏commit引用、文档链接与release说明，证据链不完整。
  - 原文依据：
    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22
- **[#3762](https://gitcode.com/cann/ops-transformer/issues/3762) moe_init_routing_v3 clean code** — 23分
  - 痛点原因：仅靠机器人关联合并PR并自动关闭，缺乏commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #8583（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8583)    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3762    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Huang-Peng
- **[#3759](https://gitcode.com/cann/ops-transformer/issues/3759) cleancode: 删除 CheckEpTpRecvTensorDim 函数内连续空行** — 23分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺少commit引用、文档链接和release等直接解决证据。
  - 原文依据：
    - [关联PR #8685（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8685)    - `weihao18`：/assign [@Gan12](https://gitcode.com/Gan12)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3759    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Gan12
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 23分
  - 痛点原因：虽有关联PR并自动关闭，但缺少commit引用、文档链接和release引用等直接解决证据。
  - 原文依据：
    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)    - `weihao18`：/assign @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_
- **[#3756](https://gitcode.com/cann/ops-transformer/issues/3756) feat(mc2): 添加 atcoss 通信 barrier 模板实现** — 23分
  - 痛点原因：关联PR仍为open未合并状态，且缺乏commit、文档及release引用，仅凭关闭评论无法证明问题已解决。
  - 原文依据：
    - [关联PR #8625（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8625)    - `weihao18`：/assign [@luoxinhui666](https://gitcode.com/luoxinhui666)    - `luoxinhui666`：closed from codehub    - `cann-robot`：assigned to @luoxinhui666
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 23分
  - 痛点原因：虽有关联PR，但无commit引用、文档链接及release说明，仅靠机器人自动关闭，解决证据薄弱。
  - 原文依据：
    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159
- **[#3753](https://gitcode.com/cann/ops-transformer/issues/3753) [Requirement|需求建议]: chunk_gated_delta_rule 测试框架重构与 RDV 测试模式** — 23分
  - 痛点原因：虽有关联PR已合并，但关闭评论仅为机器人指派通知，无commit、文档及release引用，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8700（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8700)    - `huang-chuhong`：/assign    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `cann-robot`：### Notice This issue is already assigned to ***huang-chuhong***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3753    - `cann-robot`：add label resolved
- **[#3752](https://gitcode.com/cann/ops-transformer/issues/3752) [Bug-Report|缺陷反馈]: case54：The address for scalar to access the internal buffer …** — 23分
  - 痛点原因：虽有合并的关联PR，但无commit、文档及release引用，且关闭评论仅为机器人自动回复，证据链薄弱。
  - 原文依据：
    - [关联PR #8689（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8689)    - `weihao18`：/assign [@st0rm60rn](https://gitcode.com/st0rm60rn)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3752    - `st0rm60rn`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @st0rm60rn
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 23分
  - 痛点原因：仅关联合并的PR并由机器人自动关闭，缺乏commit引用、文档链接、release引用及人工解决说明。
  - 原文依据：
    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 23分
  - 痛点原因：仅有关联PR和机器人关闭记录，缺乏commit引用、文档链接及release引用等直接解决证据支撑。
  - 原文依据：
    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 23分
  - 痛点原因：虽有合并PR与机器人关闭评论，但缺乏commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)    - [关联PR #8728（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8728)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - `l00858142`：add label requirement    - `cann-robot`：add label resolved
- **[#3743](https://gitcode.com/cann/ops-transformer/issues/3743) [Bug-Report|缺陷反馈]: dense_lightning_indexer_softmax_lse最大序列没有增加相关校验** — 23分
  - 痛点原因：虽有已合并的PR，但关闭评论仅为分配指令，缺乏commit引用、文档及release链接等直接解决证据。
  - 原文依据：
    - [关联PR #8667（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8667)    - [关联PR #8798（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8798)    - [关联PR #8799（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8799)    - `weihao18`：/assign [@shilulu](https://gitcode.com/shilulu)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3743    - `shilulu`：add label bug-report
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 23分
  - 痛点原因：因关联 issue 的 MR 合并被连带关闭，自身缺乏直接证明需求已实现的 commit、文档或 release 证据。
  - 原文依据：
    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 23分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭操作被机器人拦截，缺乏有效解决证据。
  - 原文依据：
    - [关联PR #8653（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8653)    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 23分
  - 痛点原因：仅凭机器人命令关闭，无关联PR、commit、文档或release链接，缺乏实质解决依据。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3736](https://gitcode.com/cann/ops-transformer/issues/3736) [Bug-Report|缺陷反馈]: 整改tensor api 后处理修改成正确的aiv风格的命名空间** — 23分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接及release记录，且仅由机器人自动关闭，缺乏人工验证与实质性解决证据。
  - 原文依据：
    - [关联PR #8652（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8652)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3736    - `kknan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 23分
  - 痛点原因：虽有合并的关联PR和机器人关闭评论，但无commit引用、文档链接及release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1
- **[#3733](https://gitcode.com/cann/ops-transformer/issues/3733) [Bug-Report|缺陷反馈]: keycache和valuecache在nz数据格式下，输入数据类型不一致的校验拦截** — 23分
  - 痛点原因：虽有合并PR，但仅由机器人连带关闭，缺乏commit、文档及release引用等直接修复证据。
  - 原文依据：
    - [关联PR #8626（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8626)    - [关联PR #8631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8631)    - `BIGWHITETEETH`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - `BIGWHITETEETH`：add label bug-report    - `cann-robot`：add label resolved
- **[#3728](https://gitcode.com/cann/ops-transformer/issues/3728) [Bug-Report|缺陷反馈]:** — 23分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及release说明等直接证据，且仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #8582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8582)    - [关联PR #8592（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8592)    - `weihao18`：/assign [@HertzHan](https://gitcode.com/HertzHan)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - `HertzHan`：add label bug-report    - `cann-robot`：add label resolved
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 23分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用、文档链接和release说明等直接证据，导致证据链不完整。
  - 原文依据：
    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy
- **[#3726](https://gitcode.com/cann/ops-transformer/issues/3726) [Bug-Report|缺陷反馈]: flash_attn静态图模式下tiling data访问失败及flag误判** — 23分
  - 痛点原因：虽关联已合并PR，但无commit与release引用，且关闭评论仅为指派指令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8627（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8627)    - [关联PR #8629（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8629)    - `weihao18`：/assign [@PerrySkywalker](https://gitcode.com/PerrySkywalker)    - `PerrySkywalker`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***PerrySkywalker***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726
- **[#3822](https://gitcode.com/cann/ops-transformer/issues/3822) [Bug-Report|缺陷反馈]: SLIG算子维测日志格式有误** — 31分
  - 痛点原因：虽有已合并PR，但无关闭评论说明解决结论，且仍有未合并PR，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #8856（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8856)    - [关联PR #8923（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8923)    - `llwy0320`：add label bug-report    - `llwy0320`：assigned to @llwy0320
- **[#3818](https://gitcode.com/cann/ops-transformer/issues/3818) [Requirement|需求建议]: 新增算子需求：ScaledCosineAttentionScore** — 31分
  - 痛点原因：关联PR未合并且无文档与release引用，仅转移仓库并指派人员，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8892（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8892)    - [关联PR #8918（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8918)    - `yolic`：您好，感谢提出，当前issue已转移至transformer仓处理。    - `weihao18`：/assign [@wuxs68](https://gitcode.com/wuxs68)    - `cann-robot`：assigned to @wuxs68
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、文档链接及release引用等强证据支撑。
  - 原文依据：
    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 31分
  - 痛点原因：虽关联多个已合并PR，但缺少文档链接、release引用及关闭评论，导致证据链不完整。
  - 原文依据：
    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)    - [关联PR #4415（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/4415)    - [关联PR #5015（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/5015)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764
- **[#3750](https://gitcode.com/cann/ops-transformer/issues/3750) [Bug] KvRmsNormRopeCache: regbase 两个模板存在 cache 越界写、PA_BLK_NZ 写错页、NZ 整行不写等一组缺陷** — 31分
  - 痛点原因：关联的修复PR仍处于open未合并状态，且无关闭评论，缺乏问题已解决的实质性证据。
  - 原文依据：
    - [关联PR #8690（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8690)    - `qianzehong`：修复 PR：https://gitcode.com/cann/ops-transformer/merge_requests/8690 该 PR 同时修复上述两个缺陷（Norm 模式 cache 的 B/N 线性容量校验、recompute…    - `weihao18`：/assign [@qianzehong](https://gitcode.com/qianzehong)    - `cann-robot`：assigned to @qianzehong
- **[#3825](https://gitcode.com/cann/ops-transformer/issues/3825) [Documentation|文档反馈]: grouped_matmul_swiglu_quant_v2文档 N 轴对齐描述存在冲突** — 38分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺少commit引用与release版本说明等实质性解决证据。
  - 原文依据：
    - [关联PR #8874（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8874)    - `weihao18`：/assign [@NeverLCY](https://gitcode.com/NeverLCY)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3825    - `NeverLCY`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @NeverLCY
- **[#3817](https://gitcode.com/cann/ops-transformer/issues/3817) [Documentation|文档反馈]: flash_attn算子文档参数类型和约束描述修正** — 38分
  - 痛点原因：虽有关联PR已合并，但issue内缺乏commit和release引用，且关闭评论仅有assign指令无解决说明。
  - 原文依据：
    - [关联PR #8850（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8850)    - [关联PR #8861（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8861)    - [关联PR #8967（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8967)    - `haijie_699874`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3817    - `cann-robot`：add label resolved
- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 38分
  - 痛点原因：仅靠关联PR和机器人关闭评论，缺乏commit引用与release引用，且无人工对解决结果的详细说明，导致证据不足。
  - 原文依据：
    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li
- **[#3804](https://gitcode.com/cann/ops-transformer/issues/3804) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule aclnn接口SoC名称硬编码字符串匹配Ascend950** — 38分
  - 痛点原因：关联PR未合并且无commit引用，仅凭状态变更关闭issue，缺乏实质代码修复证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @haijie_699874
- **[#3800](https://gitcode.com/cann/ops-transformer/issues/3800) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 空输出判断使用AND而非OR，部分空输出时仍继续执行** — 38分
  - 痛点原因：关联PR未合并且无commit引用，仅靠状态变更关闭，缺乏实质代码修复证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 38分
  - 痛点原因：仅有机器人因关联PR合并自动关闭的记录，缺乏commit引用与release引用作为直接解决证据。
  - 原文依据：
    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3775](https://gitcode.com/cann/ops-transformer/issues/3775) [Documentation|文档反馈]: 更新文档对于combine算子的描述** — 38分
  - 痛点原因：虽有关联PR被合并，但无commit和release引用，且仅由机器人自动关闭，证据不够充分。
  - 原文依据：
    - [关联PR #8745（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8745)    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3775    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit和release引用，且仅由机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man
- **[#3735](https://gitcode.com/cann/ops-transformer/issues/3735) [Bug-Report|缺陷反馈]: EngramBarrier修改和资料修改** — 38分
  - 痛点原因：缺少commit引用与release引用，且关闭过程依赖机器人自动操作，缺乏人工解决说明，导致证据链不完整。
  - 原文依据：
    - [关联PR #8619（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8619)    - `liuyibin`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3735    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liuyibin
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与release版本引用，且由机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)    - [关联PR #8636（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8636)    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved
- **[#3796](https://gitcode.com/cann/ops-transformer/issues/3796) [Requirement|需求建议]: 开源 GroupedMatmul 转置融合 pass** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无关闭评论与文档链接等明确的解决证据。
  - 原文依据：
    - [关联PR #8546（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8546)    - `zhoushaolong`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `zhoushaolong`：add label requirement    - `cann-robot`：assigned to @zhoushaolong
- **[#3789](https://gitcode.com/cann/ops-transformer/issues/3789) [Roadmap] ops-transformer 2026Q3 roadmap** — 46分
  - 痛点原因：关闭时无评论说明，且缺乏关联PR与release引用等直接解决证据。

- **[#3773](https://gitcode.com/cann/ops-transformer/issues/3773) [Bug-Report|缺陷反馈]: MhcPre日志报错与资料不一致** — 46分
  - 痛点原因：虽有关联PR与文档链接，但缺少release引用，且无人工关闭评论说明解决情况，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #8537（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8537)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3773    - `liweijian16`：add label bug-report    - `cann-robot`：add label resolved    - `liweijian16`：assigned to @liweijian16
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 46分
  - 痛点原因：无关联 PR 和关闭评论，仅有指派与模板回复，缺乏问题已解决的实质证据。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3814](https://gitcode.com/cann/ops-transformer/issues/3814) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule op def 的 DataType/Format 参数与 aicore 配…** — 54分
  - 痛点原因：虽有关联PR和commit引用，但缺少文档链接与release版本引用，证据链不完整。
  - 原文依据：
    - [关联PR #8841（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8841)    - `huang-chuhong`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong
- **[#3805](https://gitcode.com/cann/ops-transformer/issues/3805) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule matmul tiling固定baseM/K/N=128，dk=128时无…** — 54分
  - 痛点原因：关联的PR仍处于open状态未合并，且无文档与release引用，缺乏代码合入的强证据。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @haijie_699874
- **[#3801](https://gitcode.com/cann/ops-transformer/issues/3801) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule infershape 误用维度常量DIM_0/DIM_1作为输出索引** — 54分
  - 痛点原因：关联PR #8802仍处于open状态未合并，且缺乏文档与release链接，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @haijie_699874
- **[#3774](https://gitcode.com/cann/ops-transformer/issues/3774) [Bug-Report|缺陷反馈]: flash_attn图模式跨进程static kernel残留导致aicore error** — 54分
  - 痛点原因：仅通过/close指令关闭，虽有commit引用和开放PR提示，但无已合并的关联PR或release说明证实问题已解决。
  - 原文依据：
    - `PerrySkywalker`：/assign    - `PerrySkywalker`：/close    - `cann-robot`：### Notice [@PerrySkywalker](https://gitcode.com/PerrySkywalker) , this issue is linked to an open PR. Please merge the…    - `PerrySkywalker`：/close    - `cann-robot`：### Notice [@PerrySkywalker](https://gitcode.com/PerrySkywalker) , this issue is linked to an open PR. Please merge the…    - `PerrySkywalker`：/close
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 54分
  - 痛点原因：缺少文档链接与release引用，仅靠PR合并及机器人关闭作为解决证据，强度不足。
  - 原文依据：
    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028
#### PP-04 部分Issue无响应且缺乏标签（I1 · 分配与首次响应）

- **[#3834](https://gitcode.com/cann/ops-transformer/issues/3834) [Requirement|需求建议]: GenPositionIdsFromMask算子AscendC实现** — 0分
  - 痛点原因：仅有机器人自动分配操作，始终未提供任何人工实质性技术回应。
  - 原文依据：
    - `wuxs68`：/assign    - `cann-robot`：assigned to @wuxs68    - [关联PR #8900（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8900)
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 0分
  - 痛点原因：负责人仅执行了分配和打标签操作，未对需求提供任何实质性解答或讨论。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 0分
  - 痛点原因：仅执行分配和加标签等机械操作，未对需求内容提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @libohao6    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3829](https://gitcode.com/cann/ops-transformer/issues/3829) [Requirement|需求建议]: [第三方依赖消减] 移除 2 项未使用的三方依赖** — 0分
  - 痛点原因：仅有机器人分配任务的机械响应，始终未提供针对需求内容的实质性人工回复。
  - 原文依据：
    - `weihao18`：/assign    - `cann-robot`：assigned to @weihao18
- **[#3828](https://gitcode.com/cann/ops-transformer/issues/3828) [Bug-Report|缺陷反馈]: MC2 matmulallreduce类算子，部分case性能不达标** — 0分
  - 痛点原因：仅有机器人分配和打标签，全程无人工实质回应即被自动关闭。
  - 原文依据：
    - `weihao18`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ouyf    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3828    - [关联PR #8695（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8695)
- **[#3827](https://gitcode.com/cann/ops-transformer/issues/3827) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试套件补充msprof性能采集、initial_state非连续用例及RD…** — 0分
  - 痛点原因：全程仅机器人指派及关联MR自动关闭，无任何人工实质性回应。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3827    - [关联PR #8815（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8815)
- **[#3826](https://gitcode.com/cann/ops-transformer/issues/3826) [Bug-Report|缺陷反馈]: BlockEpilogueSwigluMxQuant 的调用点以临时 Arguments 对象调用 Init，但类内保存…** — 0分
  - 痛点原因：仅进行了指派和加标签操作，全程无人工技术分析或实质回复。
  - 原文依据：
    - `weihao18`：/assign [@macech](https://gitcode.com/macech)    - `macech`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3826    - [关联PR #8777（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8777)
- **[#3825](https://gitcode.com/cann/ops-transformer/issues/3825) [Documentation|文档反馈]: grouped_matmul_swiglu_quant_v2文档 N 轴对齐描述存在冲突** — 0分
  - 痛点原因：仅指派人员和机器人打标签，全程无针对文档冲突问题的实质性人工解答。
  - 原文依据：
    - `weihao18`：/assign [@NeverLCY](https://gitcode.com/NeverLCY)    - `NeverLCY`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @NeverLCY    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3825    - [关联PR #8874（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8874)
- **[#3824](https://gitcode.com/cann/ops-transformer/issues/3824) [Documentation|文档反馈]: MoeInitRoutingV3 文档缺失quant_mode 14、15** — 0分
  - 痛点原因：全程仅通过打标签、指派和机器人自动关闭处理，未对用户反馈的文档缺失问题提供任何实质性回复。
  - 原文依据：
    - `wuxiyuan`：add label documentation    - `cann-robot`：add label resolved    - `wuxiyuan`：assigned to @wuxiyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3824    - [关联PR #8867（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8867)
- **[#3823](https://gitcode.com/cann/ops-transformer/issues/3823) [Documentation|文档反馈]: megamoe 资料需要补充A2、A3的example** — 0分
  - 痛点原因：维护者仅加标签并指派人员，虽有关联PR但全程未对用户进行任何文字回复，导致无实质回应。
  - 原文依据：
    - `ryan_li`：add label documentation    - `ryan_li`：assigned to @ryan_li    - [关联PR #8770（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8770)    - [关联PR #8771（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8771)
- **[#3822](https://gitcode.com/cann/ops-transformer/issues/3822) [Bug-Report|缺陷反馈]: SLIG算子维测日志格式有误** — 0分
  - 痛点原因：首次响应仅打标签和分配负责人，耗时超72小时，且全程无实质性技术回复。
  - 原文依据：
    - `llwy0320`：add label bug-report    - `llwy0320`：assigned to @llwy0320    - [关联PR #8856（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8856)    - [关联PR #8923（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8923)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 0分
  - 痛点原因：仅分配任务和加标签，无任何针对缺陷的技术解答，直接被机器人标记为resolved。
  - 原文依据：
    - `weihao18`：/assign @wangrui_    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 0分
  - 痛点原因：仅有指派和打标签等流程性操作，未对需求进行实质性的技术讨论或确认。
  - 原文依据：
    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)
- **[#3819](https://gitcode.com/cann/ops-transformer/issues/3819) [Requirement|需求建议]: dsv4 metadata功能泛化** — 0分
  - 痛点原因：仅完成分配和打标签等机械操作，未对需求内容进行实质性的技术讨论或确认。
  - 原文依据：
    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8829（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8829)
- **[#3817](https://gitcode.com/cann/ops-transformer/issues/3817) [Documentation|文档反馈]: flash_attn算子文档参数类型和约束描述修正** — 0分
  - 痛点原因：全程仅有机器人自动指派和关闭操作，无任何人工实质回应解答问题。
  - 原文依据：
    - `haijie_699874`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @haijie_699874    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3817    - [关联PR #8850（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8850)    - [关联PR #8861（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8861)
- **[#3816](https://gitcode.com/cann/ops-transformer/issues/3816) [Documentation|文档反馈]: flash_attn arch35 kernel __has_include 与 GET_TILING_DATA_…** — 0分
  - 痛点原因：仅机器人自动分配和关联关闭，全程无人工针对文档反馈内容进行实质性解答。
  - 原文依据：
    - `PerrySkywalker`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @PerrySkywalker    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3816    - [关联PR #8847（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8847)
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 0分
  - 痛点原因：仅执行分配和打标签操作，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3814](https://gitcode.com/cann/ops-transformer/issues/3814) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule op def 的 DataType/Format 参数与 aicore 配…** — 0分
  - 痛点原因：全程仅机器人自动分配与关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3814    - [关联PR #8841（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8841)
- **[#3813](https://gitcode.com/cann/ops-transformer/issues/3813) moe_ep_dispatch优化count计算与atomicadd使用** — 0分
  - 痛点原因：首次响应仅为分配任务和机器人加标签，后续直接被机器人关闭，全程无人工实质回应。
  - 原文依据：
    - `weihao18`：/assign [@z1017i](https://gitcode.com/z1017i)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @z1017i    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3813    - [关联PR #8820（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8820)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 0分
  - 痛点原因：仅分配任务和添加标签，全程无任何实质性技术解答或需求沟通，最终由机器人直接标记resolved。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 0分
  - 痛点原因：维护者仅添加标签后由机器人自动标记resolved，全程无人工实质回应。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3808](https://gitcode.com/cann/ops-transformer/issues/3808) [Bug-Report|缺陷反馈]: moe_ep_dispatch/moe_ep_dispatch_epilogue/moe_ep_combine拦截信息不…** — 0分
  - 痛点原因：仅有机器人加标签和指派人员的机械操作，始终未提供针对缺陷的实质性技术解答或反馈。
  - 原文依据：
    - `weihao18`：/assign [@junnyleo](https://gitcode.com/junnyleo)    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @junnyleo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3808    - `junnyleo`：changed custom state from 进行中 to 已完成
- **[#3807](https://gitcode.com/cann/ops-transformer/issues/3807) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule SYS_WORKSPACE_SIZE魔法数16MB硬编码无来源说明** — 0分
  - 痛点原因：维护者仅执行了指派、关闭及状态更改等系统操作，未提供任何实质性文本回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3806](https://gitcode.com/cann/ops-transformer/issues/3806) [Requirement|需求建议]: chunk_gated_delta_rule chunk_size硬编码为64，不随输入自适应** — 0分
  - 痛点原因：仅通过机器人分配和加标签后直接关闭，全程无针对需求的人工实质回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3805](https://gitcode.com/cann/ops-transformer/issues/3805) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule matmul tiling固定baseM/K/N=128，dk=128时无…** — 0分
  - 痛点原因：维护者仅指派任务并直接关闭issue，全程未对缺陷反馈提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3804](https://gitcode.com/cann/ops-transformer/issues/3804) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule aclnn接口SoC名称硬编码字符串匹配Ascend950** — 0分
  - 痛点原因：维护者仅分配任务后直接关闭并标记完成，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3803](https://gitcode.com/cann/ops-transformer/issues/3803) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 跨SyncAll读写finalState_可能存在GM可见性竞态** — 0分
  - 痛点原因：负责人仅指派并直接关闭issue，未提供任何实质性的技术回应或问题解答。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3802](https://gitcode.com/cann/ops-transformer/issues/3802) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule mask workspace常量不一致，MASK_NUM(4)与TASK_…** — 0分
  - 痛点原因：负责人仅执行了分配和关闭操作，未提供任何实质性的技术解答或沟通。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3801](https://gitcode.com/cann/ops-transformer/issues/3801) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule infershape 误用维度常量DIM_0/DIM_1作为输出索引** — 0分
  - 痛点原因：维护者仅分配任务并直接关闭issue，全程无任何针对缺陷的技术沟通与实质回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3800](https://gitcode.com/cann/ops-transformer/issues/3800) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule 空输出判断使用AND而非OR，部分空输出时仍继续执行** — 0分
  - 痛点原因：仅有机器人指派和打标签，被指派人未提供任何实质性技术回应便直接关闭了该问题。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3799](https://gitcode.com/cann/ops-transformer/issues/3799) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule GetPlatformInfo()空实现，InitCompileInfo错…** — 0分
  - 痛点原因：仅通过机器人指派和加标签，被指派人随后直接关闭issue，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@haijie_699874](https://gitcode.com/haijie_699874)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @haijie_699874    - `haijie_699874`：closed from codehub    - `haijie_699874`：changed custom state from 进行中 to 已完成    - [关联PR #8802（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8802)
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 0分
  - 痛点原因：全程无人工实质回应，仅机器人加标签、分配及随关联PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3796](https://gitcode.com/cann/ops-transformer/issues/3796) [Requirement|需求建议]: 开源 GroupedMatmul 转置融合 pass** — 0分
  - 痛点原因：仅进行了分配和打标签的流程性操作，未对需求内容提供任何实质性的技术讨论与确认。
  - 原文依据：
    - `zhoushaolong`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `zhoushaolong`：add label requirement    - `cann-robot`：assigned to @zhoushaolong    - [关联PR #8546（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8546)
- **[#3795](https://gitcode.com/cann/ops-transformer/issues/3795) [Documentation|文档反馈]: GroupedMatmulActivationQuant 算子文档存在 blocksize 错误、参数类型缺失及冗…** — 0分
  - 痛点原因：首次响应仅执行分配任务和添加标签操作，未对文档错误等实质问题进行任何解答或处理。
  - 原文依据：
    - `weihao18`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `zhoushaolong`：/assign [@zhoushaolong](https://gitcode.com/zhoushaolong)    - `cann-robot`：### Notice This issue is already assigned to ***zhoushaolong***. Please do not assign repeatedly.    - `zhoushaolong`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhoushaolong
- **[#3794](https://gitcode.com/cann/ops-transformer/issues/3794) [Question|问题咨询]: 950上FAG算子采用了未公开的接口。** — 0分
  - 痛点原因：首次响应仅为机器人指派负责人，后续始终未提供任何实质性的解答。
  - 原文依据：
    - `weihao18`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：assigned to @coder_linx
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 0分
  - 痛点原因：仅进行了分配和加标签操作，全程无任何针对需求内容的实质性解答。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3792](https://gitcode.com/cann/ops-transformer/issues/3792) [Requirement|需求建议]: chunk_gated_delta_rule 测试脚本支持静态图模式** — 0分
  - 痛点原因：仅由机器人分配并因关联MR合并而关闭，全程无人工实质回应。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3792    - [关联PR #8791（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8791)
- **[#3791](https://gitcode.com/cann/ops-transformer/issues/3791) [Documentation|文档反馈]: trans仓aclnn编译运行样例是FlashAttentionScore算子，但是示例结果叫“mean resu…** — 0分
  - 痛点原因：仅有分配负责人和加标签的机械操作，全程无任何实质性解答。
  - 原文依据：
    - `weihao18`：/assign [@yue-ma](https://gitcode.com/yue-ma)    - `cann-robot`：### Notice This issue can not be assigned to ***yue-ma***. Please try to assign to the repository members.    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `gitcode-chenjiao`：add label documentation    - `weihao18`：assigned to @huang-wei-chen    - `cann-robot`：assigned to @xiu_ling_wang and unassigned @huang-wei-chen
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅机器人自动加标签并关闭issue，全程无人工实质技术回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3789](https://gitcode.com/cann/ops-transformer/issues/3789) [Roadmap] ops-transformer 2026Q3 roadmap** — 0分
  - 痛点原因：该issue自始至终未收到任何首次响应与实质回应。

- **[#3788](https://gitcode.com/cann/ops-transformer/issues/3788) [Bug-Report|缺陷反馈]: 【GroupedMatmulSwigluQuantV2】MX WeightNz多Tensor改动导致MXA8W4多Ten…** — 0分
  - 痛点原因：仅有打标签和指派操作，关联PR未合并，始终缺乏针对缺陷的实质性技术回复。
  - 原文依据：
    - `zhangzhizhuo`：add label bug-report    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - [关联PR #8786（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8786)
- **[#3787](https://gitcode.com/cann/ops-transformer/issues/3787) [Bug-Report|缺陷反馈]: SMLA算子pytest缺少aclgraph调用** — 0分
  - 痛点原因：全程仅打标签和机器人自动关闭，无人工技术分析与解答，未提供任何实质回应。
  - 原文依据：
    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `SH_jingsong`：assigned to @SH_jingsong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3787    - [关联PR #8759（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8759)
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 0分
  - 痛点原因：仅通过机器人分配任务和关联PR，全程无人工实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)
- **[#3784](https://gitcode.com/cann/ops-transformer/issues/3784) [Requirement|需求建议]: all_gather_matmul、matmul_allto_all、allto_all_matmul算子在910b等…** — 0分
  - 痛点原因：全程仅停留在分配、加标签和关联MR等流程性操作，未对算子需求提供实质性技术解答。
  - 原文依据：
    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sangzhenguo    - `sangzhenguo`：Create issue mr links: **mc2部分算子关闭cce-auto-sync编译选项** #7473    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3784    - [关联PR #7473（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7473)
- **[#3783](https://gitcode.com/cann/ops-transformer/issues/3783) [Bug-Report|缺陷反馈]: chunk_gated_delta_rule测试框架chunk_size未透传及seqlen语义不一致** — 0分
  - 痛点原因：仅执行指派并由机器人自动关闭，全程无人工实质技术回应。
  - 原文依据：
    - `huang-chuhong`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3783    - [关联PR #8773（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8773)
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 0分
  - 痛点原因：首次响应仅分配人员和打标签，全程未提供任何实质性的技术回应或解答。
  - 原文依据：
    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3781](https://gitcode.com/cann/ops-transformer/issues/3781) [Requirement|需求建议]: Compressor pytest支持批跑性能及批跑读取case优化** — 0分
  - 痛点原因：仅进行了指派和加标签操作，甚至直接标记为已解决，但全程无任何实质性回应内容。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3781    - [关联PR #8756（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8756)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 0分
  - 痛点原因：首次响应仅为机器人自动分配和打标签，全程无人工实质回应即随关联MR合并被关闭。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3779](https://gitcode.com/cann/ops-transformer/issues/3779) [Bug-Report|缺陷反馈]: Mega_moe在DeepSeekV4模型侧精度问题，请修复** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人打标签并关联合并请求直接关闭，未对缺陷进行实质性解答。
  - 原文依据：
    - `lyt_claire`：add label bug-report    - `cann-robot`：add label resolved    - `lyt_claire`：assigned to @lyt_claire    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3779    - [关联PR #8375（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8375)
- **[#3778](https://gitcode.com/cann/ops-transformer/issues/3778) [Bug-Report|缺陷反馈]: moe_ep_combine.h存在编译问题** — 0分
  - 痛点原因：维护者仅分配任务和加标签，机器人直接标记resolved，全程无任何针对缺陷的实质性解答或排查反馈。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhong-zixin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3778    - [关联PR #8754（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8754)
- **[#3777](https://gitcode.com/cann/ops-transformer/issues/3777) [Bug-Report|缺陷反馈]: mc2/3rd下面部分cpp文件不参与编译** — 0分
  - 痛点原因：维护者仅打标签、分配负责人并关联PR，未对问题进行任何实质性的文字回应。
  - 原文依据：
    - `hblnb`：add label bug-report    - `hblnb`：assigned to @hblnb    - [关联PR #8239（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8239)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 0分
  - 痛点原因：仅加标签并由机器人随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3775](https://gitcode.com/cann/ops-transformer/issues/3775) [Documentation|文档反馈]: 更新文档对于combine算子的描述** — 0分
  - 痛点原因：仅进行了分配和打标签操作，无任何针对文档反馈内容的实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3775    - [关联PR #8745（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8745)
- **[#3774](https://gitcode.com/cann/ops-transformer/issues/3774) [Bug-Report|缺陷反馈]: flash_attn图模式跨进程static kernel残留导致aicore error** — 0分
  - 痛点原因：维护者仅使用指令分配和关闭问题，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `PerrySkywalker`：/assign    - `PerrySkywalker`：/close    - `cann-robot`：### Notice [@PerrySkywalker](https://gitcode.com/PerrySkywalker) , this issue is linked to an open PR. Please merge the…    - `PerrySkywalker`：/close    - `cann-robot`：### Notice [@PerrySkywalker](https://gitcode.com/PerrySkywalker) , this issue is linked to an open PR. Please merge the…    - `PerrySkywalker`：/close
- **[#3773](https://gitcode.com/cann/ops-transformer/issues/3773) [Bug-Report|缺陷反馈]: MhcPre日志报错与资料不一致** — 0分
  - 痛点原因：全程无任何实质性回应，仅通过打标签、分配及关联合并请求便直接关闭了问题。
  - 原文依据：
    - `liweijian16`：add label bug-report    - `cann-robot`：add label resolved    - `liweijian16`：assigned to @liweijian16    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3773    - [关联PR #8537（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8537)
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人打标签并随关联 MR 合并直接关闭。
  - 原文依据：
    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 0分
  - 痛点原因：仅快速完成人员指派和加标签，未对需求内容进行任何实质性的技术讨论或解答。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 0分
  - 痛点原因：维护者仅添加标签且由机器人自动分配，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @WangShuying5    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 0分
  - 痛点原因：仅由机器人分配任务并随MR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 0分
  - 痛点原因：仅分配了处理人并由机器人关联合并请求关闭，全程无任何人工实质回应。
  - 原文依据：
    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 0分
  - 痛点原因：仅由机器人执行指派和关闭操作，全程无人类开发者提供实质性技术回复。
  - 原文依据：
    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 0分
  - 痛点原因：仅进行了打标签和分配操作，全程无人工技术实质回应，最终被机器人因关联MR合并直接关闭。
  - 原文依据：
    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 0分
  - 痛点原因：首次响应耗时超162小时且全程无人工实质回应，仅由机器人指派并随PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 0分
  - 痛点原因：仅执行了分配和打标签操作，机器人直接标记为已解决，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3762](https://gitcode.com/cann/ops-transformer/issues/3762) moe_init_routing_v3 clean code** — 0分
  - 痛点原因：仅由机器人快速分配任务，全程无人工实质回应，最终被机器人关联合并请求直接关闭。
  - 原文依据：
    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Huang-Peng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3762    - [关联PR #8583（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8583)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 0分
  - 痛点原因：仅机器人分配和关闭，全程无人工实质回应。
  - 原文依据：
    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3760](https://gitcode.com/cann/ops-transformer/issues/3760) moe_init_routing_quant_v2 自定义 CHECK_NULL 宏错误码不规范** — 0分
  - 痛点原因：维护者仅通过打标签、指派和合并PR处理问题，全程未留下任何实质性文字回应。
  - 原文依据：
    - `weihao18`：/assign [@Huang-Peng](https://gitcode.com/Huang-Peng)    - `Huang-Peng`：add label bug    - `cann-robot`：assigned to @Huang-Peng    - [关联PR #8673（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8673)
- **[#3759](https://gitcode.com/cann/ops-transformer/issues/3759) cleancode: 删除 CheckEpTpRecvTensorDim 函数内连续空行** — 0分
  - 痛点原因：仅机器人自动指派并随关联MR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `weihao18`：/assign [@Gan12](https://gitcode.com/Gan12)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Gan12    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3759    - [关联PR #8685（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8685)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 0分
  - 痛点原因：全程仅有机器人自动分配和打标签，无任何人工实质性回应，最终被机器人关联关闭。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：仅有指派操作和机器人回复，缺乏针对缺陷的实质技术回应，导致得分为零。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3756](https://gitcode.com/cann/ops-transformer/issues/3756) feat(mc2): 添加 atcoss 通信 barrier 模板实现** — 0分
  - 痛点原因：仅执行指派和关闭操作，关联PR未合并，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@luoxinhui666](https://gitcode.com/luoxinhui666)    - `cann-robot`：assigned to @luoxinhui666    - `luoxinhui666`：closed from codehub    - [关联PR #8625（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8625)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无针对需求内容的实质性回复，直接被机器人标记为resolved。
  - 原文依据：
    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3753](https://gitcode.com/cann/ops-transformer/issues/3753) [Requirement|需求建议]: chunk_gated_delta_rule 测试框架重构与 RDV 测试模式** — 0分
  - 痛点原因：仅有分配指令和机器人自动回复，全程无任何实质性的技术讨论或回应。
  - 原文依据：
    - `huang-chuhong`：/assign    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `cann-robot`：### Notice This issue is already assigned to ***huang-chuhong***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-chuhong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3753
- **[#3752](https://gitcode.com/cann/ops-transformer/issues/3752) [Bug-Report|缺陷反馈]: case54：The address for scalar to access the internal buffer …** — 0分
  - 痛点原因：仅有指派任务和添加标签等流程性操作，全程无任何实质性的技术回应或解答。
  - 原文依据：
    - `weihao18`：/assign [@st0rm60rn](https://gitcode.com/st0rm60rn)    - `st0rm60rn`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @st0rm60rn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3752    - [关联PR #8689（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8689)
- **[#3751](https://gitcode.com/cann/ops-transformer/issues/3751) [Requirement|需求建议]: InplacePartialRotaryMulGrad 算子缺少golden.py 文件** — 0分
  - 痛点原因：全程仅有加标签、分配及机器人自动关闭等机械操作，始终未提供任何实质性技术回应。
  - 原文依据：
    - `alfengyuan`：add label requirement    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3751    - `alfengyuan`：changed custom state from 进行中 to 已完成    - [关联PR #8696（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8696)
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：虽有快速指派，但被指派人始终未提供任何实质性的技术解答或处理进展。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 0分
  - 痛点原因：仅执行了分配和加标签操作，全程无针对需求内容的实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人执行指派、加标签及关闭操作。
  - 原文依据：
    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 0分
  - 痛点原因：仅通过机器人分配任务和打标签，无任何针对需求内容的实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @l00858142    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3745](https://gitcode.com/cann/ops-transformer/issues/3745) [Bug-Report|缺陷反馈]: SLIKG算子存在同步卡死问题** — 0分
  - 痛点原因：首次响应仅打标签耗时近17小时，后续直接由机器人关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `llwy0320`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3745    - [关联PR #8675（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8675)
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅有指派操作，始终未对缺陷提供实质性解答或处理。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3743](https://gitcode.com/cann/ops-transformer/issues/3743) [Bug-Report|缺陷反馈]: dense_lightning_indexer_softmax_lse最大序列没有增加相关校验** — 0分
  - 痛点原因：维护者仅添加标签，机器人自动标记解决，全程无任何实质性的技术回应或问题分析。
  - 原文依据：
    - `weihao18`：/assign [@shilulu](https://gitcode.com/shilulu)    - `shilulu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @shilulu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3743    - [关联PR #8667（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8667)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 0分
  - 痛点原因：仅进行了指派和加标签等流程性操作，未提供任何针对需求的实质回应内容。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3741](https://gitcode.com/cann/ops-transformer/issues/3741) [Bug-Report|缺陷反馈]: moe_init_routing_quant_v2算子，非950平台手动同步迁移** — 0分
  - 痛点原因：仅添加标签并指派给自己，未提供任何实质性的文字回应。
  - 原文依据：
    - `kdy18482276080`：add label bug-report    - `kdy18482276080`：assigned to @kdy18482276080    - [关联PR #8656（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8656)
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 0分
  - 痛点原因：维护者仅尝试关闭并加标签，未对缺陷进行实质性分析或解答。
  - 原文依据：
    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `weihao18`：closed from codehub
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：维护者仅发送关闭指令并由机器人自动关闭该测试 issue，全程未提供任何实质性解答。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：虽然0.42小时内有响应，但仅为分配任务，未对问题提供任何实质性技术解答。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3736](https://gitcode.com/cann/ops-transformer/issues/3736) [Bug-Report|缺陷反馈]: 整改tensor api 后处理修改成正确的aiv风格的命名空间** — 0分
  - 痛点原因：仅分配负责人和加标签，机器人直接标记resolved，全程无任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3736    - [关联PR #8652（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8652)
- **[#3735](https://gitcode.com/cann/ops-transformer/issues/3735) [Bug-Report|缺陷反馈]: EngramBarrier修改和资料修改** — 0分
  - 痛点原因：全程仅机器人执行分配和关闭操作，无任何人工实质回应。
  - 原文依据：
    - `liuyibin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liuyibin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3735    - [关联PR #8619（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8619)
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 0分
  - 痛点原因：仅有指派和加标签等流程性操作，全程无针对需求内容的实质性人工回应。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3733](https://gitcode.com/cann/ops-transformer/issues/3733) [Bug-Report|缺陷反馈]: keycache和valuecache在nz数据格式下，输入数据类型不一致的校验拦截** — 0分
  - 痛点原因：仅执行了分配和打标签操作，未提供任何实质性的技术解答或问题确认。
  - 原文依据：
    - `BIGWHITETEETH`：/assign    - `BIGWHITETEETH`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @BIGWHITETEETH    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3733    - [关联PR #8626（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8626)
- **[#3732](https://gitcode.com/cann/ops-transformer/issues/3732) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 0分
  - 痛点原因：仅添加标签和指派，随后被机器人自动关闭，全程无针对文档缺失问题的实质性解答。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3732    - [关联PR #8637（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8637)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅快速分配了负责人，但始终无人提供任何实质性的技术解答或处理跟进。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 0分
  - 痛点原因：负责人仅添加标签并由机器人自动关闭，全程无任何实质性回应内容。
  - 原文依据：
    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fanzijian    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
- **[#3728](https://gitcode.com/cann/ops-transformer/issues/3728) [Bug-Report|缺陷反馈]:** — 0分
  - 痛点原因：仅执行了分配和打标签操作，机器人直接标记已解决，全程无任何实质性技术回复。
  - 原文依据：
    - `weihao18`：/assign [@HertzHan](https://gitcode.com/HertzHan)    - `HertzHan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @HertzHan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3728    - [关联PR #8582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8582)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，未对需求内容提供任何实质解答或技术讨论。
  - 原文依据：
    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3726](https://gitcode.com/cann/ops-transformer/issues/3726) [Bug-Report|缺陷反馈]: flash_attn静态图模式下tiling data访问失败及flag误判** — 0分
  - 痛点原因：首次响应仅为系统分配与打标签操作，全程无任何针对缺陷的人工技术性实质回应。
  - 原文依据：
    - `weihao18`：/assign [@PerrySkywalker](https://gitcode.com/PerrySkywalker)    - `PerrySkywalker`：/assign    - `cann-robot`：### Notice This issue is already assigned to ***PerrySkywalker***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @PerrySkywalker    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3726
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：仅进行了任务分配和模板化回复，未针对算子报错提供实质性的技术解答或排查建议。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | Maintainer；候选负责人 `weihao18` |
| 触发条件 | PR合并关闭Issue前 |
| 具体动作 | 要求填写解决方案摘要和验证结果 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 11.9，低分 109/109；OBJ_DECISION_TRANSPARENCY：均值 57.2，低分 43/109 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 11.9，低分 109/109 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 57.2，低分 43/109 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot Admin；候选负责人 `weihao18` |
| 触发条件 | Bot执行关闭命令时 |
| 具体动作 | 增加关闭前校验或人工确认步骤，排查误关闭逻辑 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 33.4，低分 72/109；OBJ_BOT_MISCLOSE_REVERSE：均值 94.9，低分 0/109 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 33.4，低分 72/109 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 94.9，低分 0/109 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | Bot分配后人类作者继续承接并提交MR，人机交接顺畅无停滞。 | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | Maintainer；候选负责人 `weihao18` |
| 触发条件 | Issue分配后48小时无技术回复 |
| 具体动作 | 触发提醒或升级给模块负责人 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 22.3，低分 106/109；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.6，低分 27/109 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 73.6，低分 27/109 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 22.3，低分 106/109 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 虽无传统讨论，但作者直接提交含完整实现与测试的MR，实质推进了进展。 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **79.5/100**，整体相对可控，但仍需关注：存在轻微痛点，部分需求Issue模板填写极简，背景与方案字段留空。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.4 | 内容专业详实，针对性强，无AI生成噪音或幻觉风险。 |
| `SUB_INPUT_QUALITY` 输入质量 | 68.6 | 需求描述清晰，包含背景、价值及详细设计方案，结构化程度高。 |

代表低分 Issue：[#3738](https://gitcode.com/cann/ops-transformer/issues/3738)
问题：test issue。

### I1 · 分配与首次响应

本阶段分数为 **62.3/100**，整体相对可控，但仍需关注：部分Issue无响应且缺乏标签。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 10.1 | 均值 10.1，低分 98/109 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 90.8 | 均值 90.8，低分 7/109 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 84.1 | weihao18明确assign给zzzyh22，bot确认分配，责任归属清晰。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 76.2 | 作者自行认领并提交关联MR，处理路径直接且正确，无错误分流。 |

代表低分 Issue：[#3777](https://gitcode.com/cann/ops-transformer/issues/3777)
问题：[Bug-Report|缺陷反馈]: mc2/3rd下面部分cpp文件不参与编译。

### I2 · 讨论与解决

本阶段分数为 **54.0/100**，本阶段需要改进，主要问题是：技术讨论停滞缺乏实质推进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 73.6 | 均值 73.6，低分 27/109 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 22.3 | 均值 22.3，低分 106/109 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 56.3 | 虽无传统讨论，但作者直接提交含完整实现与测试的MR，实质推进了进展。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 70.1 | 已提交完整实现MR但尚未合入，issue仍处于open状态，目标尚未最终达成。 |

代表低分 Issue：[#3794](https://gitcode.com/cann/ops-transformer/issues/3794)
问题：[Question|问题咨询]: 950上FAG算子采用了未公开的接口。。

### I3 · 总结与关闭

本阶段分数为 **46.9/100**，本阶段需要改进，主要问题是：关闭阶段沉淀严重不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 11.9 | 均值 11.9，低分 109/109 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 57.2 | 均值 57.2，低分 43/109 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 47.2 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 83.5 | issue仍处于open状态，不存在过早关闭风险。 |

代表低分 Issue：[#3745](https://gitcode.com/cann/ops-transformer/issues/3745)
问题：[Bug-Report|缺陷反馈]: SLIKG算子存在同步卡死问题。

### G · Bot/Agent 治理

本阶段分数为 **67.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 33.4 | 均值 33.4，低分 72/109 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.9 | 均值 94.9，低分 0/109 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 74.7 | Bot分配后人类作者继续承接并提交MR，人机交接顺畅无停滞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 70.6 | bot正确执行assign、MR合并后关闭及添加resolved标签，流程治理… |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 75.5 | Bot准确及时执行了权限内的分配动作，无错误阻断或误判。 |

代表低分 Issue：[#3738](https://gitcode.com/cann/ops-transformer/issues/3738)
问题：test issue。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 109 | 47.3 | 首期基线 | 79.5 | 62.3 | 54.0 | 46.9 | 67.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **12 位社区响应者**贡献 **91 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `weihao18` | 80 |
| `yolic` | 1 |
| `xiu_ling_wang` | 1 |
| `jiang-lirui` | 1 |
| `chenjunjian11` | 1 |

Top1 响应占比 **87.9%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.9/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-transformer/report_cann-ops-transformer_2026-07-13_to_2026-07-19.json`。
