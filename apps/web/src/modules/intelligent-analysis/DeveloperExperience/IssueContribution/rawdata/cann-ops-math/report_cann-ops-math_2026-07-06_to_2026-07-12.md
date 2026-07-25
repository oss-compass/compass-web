# Issue 贡献体验周报 · cann/ops-math

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **75** 个 Issue
+ 其中外部 Issue **26** 个、内部 **49** 个；I1–I3 及 G 基于「外部且成熟」的 **26** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 21 / Closed 54**，关闭率 **72.0%**。
+ 总体体验分为 **44.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P1 | I3 · 总结与关闭 | 38.6 | 关闭阶段得分极低缺乏解决证据 |
| P0 | I2 · 讨论与解决 | 55.5 | 多个Issue零评论无技术讨论 |
| P0 | I1 · 分配与首次响应 | 56.3 | 开放Issue普遍无标签无分流 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置Bot根据标题前缀和正文关键词自动添加标签并指派到对应模块owner |
| REC-02 | P0 | Bot自动发送提醒要求assignee回复初步评估或排期 |
| REC-03 | P1 | 配置关闭模板，要求填写根因分析、解决方案、影响范围和复现条件 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 75 |
| Open / Closed | 21 / 54 |
| 关闭率 | 72.0% |
| 类型构成 | 缺陷 37 / 需求 26 / 咨询 2 / 其他 10 |
| 总体体验分 | 44.5/100（D） |
| 首次响应时间 | 中位 5.3h；均值 15.4h |
| 关闭周期 | 中位 7.3h；均值 1.1天 |
| 7天响应率 | 96.0% |
| 评论数/Issue | 1.37 |
| 标签覆盖率 | 73.3% |
| 指派覆盖率 | 72.0% |
| 数据完整性 | 87.5/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 77.6 | 6/75（8.0%） | 相对可控 | `SUB_INPUT_QUALITY` 65.3 |
| I1 · 分配与首次响应 | 56.3 | 16/26（61.5%） | 需改进 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 26.2 |
| I2 · 讨论与解决 | 55.5 | 14/26（53.8%） | P0 | `OBJ_SOLUTION_EVIDENCE` 23.1 |
| I3 · 总结与关闭 | 38.6 | 23/26（88.5%） | P1 | `OBJ_CLOSURE_REUSE` 8.5 |
| G · Bot/Agent 治理（参考） | 61.3 | 14/26（53.8%） | 参考项 | `OBJ_BOT_GOVERNANCE` 26.7 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I1 · 分配与首次响应 | 开放Issue普遍无标签无分流 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 26.2，低分 19/26；OBJ_RESPONSE_SPEED：均值 78.5，低分 2/26 | 问题路由混乱导致响应延迟和人力浪费，开放Issue长期无人承接 |
| PP-02 | P0 | I2 · 讨论与解决 | 多个Issue零评论无技术讨论 | OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 24/26；OBJ_RESULT_FORMATION_TIMELINESS：均值 83.8，低分 4/26 | 问题确认后无推进路径，开放Issue长期停滞，贡献者无法获得反馈 |
| PP-03 | P1 | I3 · 总结与关闭 | 关闭阶段得分极低缺乏解决证据 | OBJ_CLOSURE_REUSE：均值 8.5，低分 26/26；OBJ_DECISION_TRANSPARENCY：均值 43.8，低分 18/26 | 社区无法从已关闭Issue中获取解决知识，类似问题无法复用经验 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot缺位与重复噪音并存 | OBJ_BOT_GOVERNANCE：均值 26.7，低分 21/26；OBJ_BOT_MISCLOSE_REVERSE：均值 90.8，低分 0/26 | 缺位导致分流和标签失效，噪音导致有效信息被淹没，贡献者体验下降 |
| PP-05 | P2 | I1 · 分配与首次响应 | Roadmap类Issue响应缓慢无推进 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 26.2，低分 19/26；OBJ_RESPONSE_SPEED：均值 78.5，低分 2/26 | 内部需求长期搁置，资源规划不透明，贡献者无法了解排期和进展 |

### 4.1 低分 Issue 明细

#### PP-01 开放Issue普遍无标签无分流（I1 · 分配与首次响应）

- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：仅有套话回应及多次机器人分配失败提示，始终未提供任何实质技术解答。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：8.26小时初步回复仅为客套话，后续直接由机器人关联PR关闭，全程无人工实质技术解答。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：仅添加标签，随后由机器人随关联PR合并直接关闭，全程无人工实质回应。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：全程仅机器人自动打标签并随PR合并关闭，无人工对缺陷进行实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：仅机器人自动响应并关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：全程仅机器人加标签并随PR合并关闭，无任何人工确认或解答等实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 0分
  - 痛点原因：首次响应仅为引导去PR提意见的客套回复，缺乏对Bug本身的实质性分析与处理。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 0分
  - 痛点原因：仅有机器人自动分配和加标签，无任何人工实质性回应，且最终被取消分配。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：该 issue 未经任何讨论即被直接关闭，全程无首次响应和实质回应。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：仅机器人自动打标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：全程仅机器人加标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：仅添加标签后直接关闭，未对缺陷问题提供任何实质技术回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `sunchun`：closed from codehub
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 0分
  - 痛点原因：仅添加标签并由机器人关闭，全程无人工实质回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：首次响应仅添加标签，后续直接由机器人关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 0分
  - 痛点原因：首次响应仅客套表示修复中，未针对文档不一致问题提供实质性解答，后续直接被机器人关闭。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：仅由机器人自动打标签并在关联PR合并后关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：全程仅机器人打标签及随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
#### PP-02 多个Issue零评论无技术讨论（I2 · 讨论与解决）

- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit、文档和release等直接修复证据，且无人工关闭总结评论。
  - 原文依据：
    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：仅由机器人自动关闭并打标签，无commit引用、文档链接及人工关闭评论，缺乏可追溯的解决证据。
  - 原文依据：
    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - `cann-robot`：add label resolved
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：未关联任何 PR、commit 或文档链接，关闭评论也无实质说明，仅凭系统提示关闭，缺乏解决证据。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档链接、release引用及人工关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - `cann-robot`：add label resolved
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：仅靠机器人自动关闭和关联PR，无人工关闭评论、commit引用或文档链接等直接解决证据。
  - 原文依据：
    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - `cann-robot`：add label resolved
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit、文档及release引用，且无人工关闭评论说明解决情况。
  - 原文依据：
    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：仅通过系统操作关闭，未关联任何 PR、commit 或文档等实际解决证据。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：add label bug-report
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：虽有合并PR，但缺乏commit、文档及release等直接修复证据，仅由机器人自动关闭且无人工解决说明。
  - 原文依据：
    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 15分
  - 痛点原因：关联PR未合并且无代码提交与版本引用，官方仅回复安排修复且分配人员失败，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #3996（open）](https://gitcode.com/cann/ops-math/merge_requests/3996)    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit引用、文档链接及人工关闭评论说明，无法充分证明问题已解决。
  - 原文依据：
    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - `cann-robot`：add label resolved
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 15分
  - 痛点原因：虽有合并PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭，证据不足。
  - 原文依据：
    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - `cann-robot`：add label resolved
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 15分
  - 痛点原因：仅靠机器人自动关联PR关闭，缺乏commit引用、release引用及人工确认解决的强证据。
  - 原文依据：
    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#2167](https://gitcode.com/cann/ops-math/issues/2167) [Documentation|文档反馈]: coalesce_sparse算子介绍文档内容矛盾，没有aclnn API、Torch API，但正文提到了，如何…** — 15分
  - 痛点原因：仅口头安排人员修复，未关联PR或commit引用，缺乏实质性解决证据。
  - 原文依据：
    - `chensi79`：你好，看代码应该是aclnn调用，已安排相关人员修复中    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：assigned to @nunnons2
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 23分
  - 痛点原因：仅靠机器人关联PR自动关闭，人工回复停留在验证中，缺乏commit、文档及release等实质性修复证据支撑。
  - 原文依据：
    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - `cann-robot`：add label resolved
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 31分
  - 痛点原因：仅靠机器人自动关闭和合并PR作为解决依据，缺乏人工关闭评论、文档链接及release引用等强证据。
  - 原文依据：
    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - `cann-robot`：add label resolved
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 31分
  - 痛点原因：无关联PR与版本引用，维护者仅口头建议去PR提意见，未在当前issue留下实际修复证据。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2184](https://gitcode.com/cann/ops-math/issues/2184) [Bug-Report] TensorMove 在输入非连续张量时未能利用 vector 的 burst copy 特性，回退到逐元素搬运** — 31分
  - 痛点原因：无关联PR、版本发布及关闭评论等闭环证据，仅口头确认问题并解释代码逻辑。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。问题确认、修复中    - `chensi79`：您好，看代码实现，他是先使用AutoContiguous()函数将非连续tensor都转为连续tensor之后再处理的，没有所谓的“连续检测”逻辑 ![image.png](https://raw.gitcode.com/user-ima…
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 31分
  - 痛点原因：仅靠机器人自动关闭与关联PR，缺乏人工关闭评论、文档链接及release引用等强证据。
  - 原文依据：
    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - `cann-robot`：add label resolved
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit和release引用，人工回复仅称已安排修复，未提供实质代码或版本落地证据。
  - 原文依据：
    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - `cann-robot`：add label resolved
- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 38分
  - 痛点原因：虽有关联PR和修复评论，但缺失commit与release引用，且存在未合并PR，导致证据链不完整。
  - 原文依据：
    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `chensi79`：assigned to @magicjason0007
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 38分
  - 痛点原因：维护者以空issue为由直接关闭，无关联PR、commit或文档等实质性修复证据，解决过程缺乏代码支撑。
  - 原文依据：
    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 38分
  - 痛点原因：缺乏commit引用和文档链接，且开发者仅口头说明原因，未提供具体代码提交记录或文档佐证，导致证据不充分。
  - 原文依据：
    - [关联PR #3899（merged）](https://gitcode.com/cann/ops-math/merge_requests/3899)    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与release说明，且仅由机器人自动关闭，人工未补充明确解决证据。
  - 原文依据：
    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 46分
  - 痛点原因：虽有关联PR与commit，但缺乏文档链接，且由机器人自动关闭无人工关闭评论，导致证据不充分。
  - 原文依据：
    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
#### PP-03 关闭阶段得分极低缺乏解决证据（I3 · 总结与关闭）

- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：仅由机器人自动关闭并打标签，无方案文档沉淀且关闭说明为0字，未留下任何可供复用的信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - `cann-robot`：add label resolved    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：关闭时无任何文字说明，评论区仅有机器人指派失败提示和简单的已安排修复回复，缺乏可复用的解决方案。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：仅由机器人关联PR自动关闭，关闭说明仅15字且无方案文档化，无法为其他用户提供参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - `cann-robot`：add label resolved    - `chensi79`：你好，感谢反馈，问题验证修复中    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人随关联PR合并自动关闭，未沉淀任何解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人随关联PR合并自动关闭，未沉淀任何供社区复用的经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - `cann-robot`：add label resolved    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅由机器人因关联PR合并自动关闭，未沉淀任何可复用的解决思路。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - `cann-robot`：add label resolved    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：机器人自动关闭且关闭说明为0字，无方案文档化与dup主链接，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - `cann-robot`：add label resolved    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化与重复链接，仅简单引导去PR提意见，未沉淀任何可复用知识。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2184](https://gitcode.com/cann/ops-math/issues/2184) [Bug-Report] TensorMove 在输入非连续张量时未能利用 vector 的 burst copy 特性，回退到逐元素搬运** — 0分
  - 痛点原因：关闭时无任何说明，未提供方案文档或重复链接，仅简单回复代码实现，导致解决经验无法被复用。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。问题确认、修复中    - `chensi79`：您好，看代码实现，他是先使用AutoContiguous()函数将非连续tensor都转为连续tensor之后再处理的，没有所谓的“连续检测”逻辑 ![image.png](https://raw.gitcode.com/user-ima…
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：关闭时未留下任何文字说明、方案文档或关联链接，仅简单从 codehub 关闭，无复用信息。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：关闭说明为0字，仅靠机器人自动关闭并留下模板话术，无方案文档与关联链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - `cann-robot`：add label resolved    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅靠机器人随PR合并自动关闭，缺乏人工总结，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - `cann-robot`：add label resolved    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人随关联PR合并自动关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：关闭时无任何文字说明，且未提供方案文档与关联链接，导致解决过程无法被社区复用参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：add label bug-report
- **[#2167](https://gitcode.com/cann/ops-math/issues/2167) [Documentation|文档反馈]: coalesce_sparse算子介绍文档内容矛盾，没有aclnn API、Torch API，但正文提到了，如何…** — 0分
  - 痛点原因：关闭时未补充任何说明文字，缺乏最终修复结论，导致解决经验无法复用。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `chensi79`：你好，看代码应该是aclnn调用，已安排相关人员修复中    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `cann-robot`：assigned to @nunnons2
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人随关联PR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人因关联PR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - `cann-robot`：add label resolved    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，无任何关闭说明与方案文档沉淀，缺乏后续复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 25分
  - 痛点原因：关闭说明仅为机器人自动回复，缺乏方案文档化与相关链接，未沉淀有效解决方案供社区复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2183    - `cann-robot`：add label resolved    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 25分
  - 痛点原因：因判定为空issue直接关闭，关闭说明仅要求重新提交，未提供任何技术方案或文档沉淀以供复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 25分
  - 痛点原因：关闭说明仅简述旧代码残留及正确用法，无方案文档化与重复主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2150](https://gitcode.com/cann/ops-math/issues/2150) [Question|问题咨询]: 编译部署abs算子时，指定--soc=ascend910_93编译后安装报错** — 25分
  - 痛点原因：仅简述报错原因及加force的临时方案，未沉淀为方案文档，也无重复issue主链接，导致难以供他人复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：因为该算子，在910_93版本，没有tiling，因此自定义算子包安装会由于缺少tiling so而报错，需要添加--force    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 30分
  - 痛点原因：关闭说明仅17字且为机器人自动回复，人工未补充具体修复方案，导致复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)
- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 30分
  - 痛点原因：关闭说明仅15字且由机器人自动关闭，未提供dup主链接，未沉淀最终修复方案，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `chensi79`：assigned to @magicjason0007    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随PR合并自动关闭，未补充任何复用价值说明。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 30分
  - 痛点原因：仅由机器人自动关闭，关闭说明仅13字，缺乏问题修复方案或结果的详细说明，导致其他用户无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，问题修复中    - `chensi79`：assigned to @chensi79    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
#### PP-04 Bot缺位与重复噪音并存（G · Bot/Agent 治理）

- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 0分
  - 痛点原因：Bot仅执行了关闭操作，未进行打标和评论，缺乏自动分类、指派等主动治理行为。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `chensi79`：assigned to @magicjason0007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 15分
  - 痛点原因：Bot未执行打标与关闭操作，且重复发送分配人员失败的无效提示，产生大量无效评论刷屏。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程无任何评论与用户互动，治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，未向用户同步状态或解释关联PR，治理过程不透明。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 20分
  - 痛点原因：Bot关闭时关联的MR号与实际修复PR不一致，且无有效评论，治理动作错误。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 20分
  - 痛点原因：Bot仅机械打标与随PR合并关闭，无任何评论互动，缺乏有效反馈与状态同步说明。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并直接关闭，全程零评论，缺乏与用户的互动沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 20分
  - 痛点原因：Bot仅执行了打标和关闭动作，但全程无任何评论说明关闭原因或同步状态，缺乏用户引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 20分
  - 痛点原因：Bot关闭时误引无关的issue2186，未准确关联实际修复的已合并PR#3875与#3939，且无评论解释，动作错乱。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 20分
  - 痛点原因：Bot自动分配与打标后遭人工撤销分配，治理动作无效，且全程无有效评论。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 20分
  - 痛点原因：Bot仅完成打标，未对空issue进行自动评论或关闭，实际关闭与状态流转均依赖人工，治理效能低。
  - 原文依据：
    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，但全程无任何评论说明，缺乏状态变更的有效交互与反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 20分
  - 痛点原因：Bot仅机械打标并关闭，无任何解释性评论，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 20分
  - 痛点原因：Bot全程无评论，仅机械执行打标与关联PR合并后关闭，缺乏状态同步与有效反馈。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 20分
  - 痛点原因：Bot仅机械打标和关闭，无有效评论，实际解答与指派全靠人工，未发挥自动化治理作用。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为零，缺乏状态流转说明与有效交互。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，全程零评论，未向用户同步进度或说明关闭原因，缺乏有效沟通。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 20分
  - 痛点原因：Bot仅机械执行打标与关联关闭，无任何评论与用户互动，缺乏有效引导和反馈。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2150](https://gitcode.com/cann/ops-math/issues/2150) [Question|问题咨询]: 编译部署abs算子时，指定--soc=ascend910_93编译后安装报错** — 20分
  - 痛点原因：Bot仅完成打标，未提供解答评论或自动关闭，问题解决与关闭均依赖人工，治理效果极差。
  - 原文依据：
    - `songkai111`：因为该算子，在910_93版本，没有tiling，因此自定义算子包安装会由于缺少tiling so而报错，需要添加--force    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭issue，全程无评论与用户沟通，治理互动严重缺失。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 20分
  - 痛点原因：Bot仅机械打标与关闭，全程无评论互动，缺乏状态同步与解释说明。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
#### PP-05 Roadmap类Issue响应缓慢无推进（I1 · 分配与首次响应）

- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：仅有套话回应及多次机器人分配失败提示，始终未提供任何实质技术解答。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：8.26小时初步回复仅为客套话，后续直接由机器人关联PR关闭，全程无人工实质技术解答。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：仅添加标签，随后由机器人随关联PR合并直接关闭，全程无人工实质回应。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：全程仅机器人自动打标签并随PR合并关闭，无人工对缺陷进行实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：仅机器人自动响应并关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：全程仅机器人加标签并随PR合并关闭，无任何人工确认或解答等实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 0分
  - 痛点原因：首次响应仅为引导去PR提意见的客套回复，缺乏对Bug本身的实质性分析与处理。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 0分
  - 痛点原因：仅有机器人自动分配和加标签，无任何人工实质性回应，且最终被取消分配。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：该 issue 未经任何讨论即被直接关闭，全程无首次响应和实质回应。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：仅机器人自动打标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：全程仅机器人加标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：仅添加标签后直接关闭，未对缺陷问题提供任何实质技术回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `sunchun`：closed from codehub
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 0分
  - 痛点原因：仅添加标签并由机器人关闭，全程无人工实质回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：首次响应仅添加标签，后续直接由机器人关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 0分
  - 痛点原因：首次响应仅客套表示修复中，未针对文档不一致问题提供实质性解答，后续直接被机器人关闭。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：仅由机器人自动打标签并在关联PR合并后关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：全程仅机器人打标签及随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)

## 5. 本周行动清单

### REC-01 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue创建时 |
| 具体动作 | 配置Bot根据标题前缀和正文关键词自动添加标签并指派到对应模块owner |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升；相关低分样本降至 90 以下 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 26.2，低分 19/26；OBJ_RESPONSE_SPEED：均值 78.5，低分 2/26 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 26.2，低分 19/26 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 78.5，低分 2/26 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无正式assignee，但作者自行创建MR并推进，责任实际明确。 | 明确责任人、候选负责人和下一步动作 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | Assignee；候选负责人 `chensi79` |
| 触发条件 | Issue指派后48小时无评论 |
| 具体动作 | Bot自动发送提醒要求assignee回复初步评估或排期 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；相关低分样本降至 0 以下 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 24/26；OBJ_RESULT_FORMATION_TIMELINESS：均值 83.8，低分 4/26 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 83.8，低分 4/26 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 23.1，低分 24/26 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无评论讨论，但通过MR链接和代码提交形成明确推进，最终合并。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 配置关闭模板，要求填写根因分析、解决方案、影响范围和复现条件 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 8.5，低分 26/26；OBJ_DECISION_TRANSPARENCY：均值 43.8，低分 18/26 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 8.5，低分 26/26 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 43.8，低分 18/26 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **77.6/100**，整体相对可控，但仍需关注：轻度痛点，少量Issue提交空模板或字段缺失，但整体创建质量尚可。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 89.9 | 内容具体真实，为内部迁移任务，无AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 65.3 | 结构完整，含背景、设计方案、关联PR，必填项5/5全齐 |

代表低分 Issue：[#2181](https://gitcode.com/cann/ops-math/issues/2181)
问题：[Bug-Report|缺陷反馈]:。

### I1 · 分配与首次响应
本阶段分数为 **56.3/100**，本阶段需要改进，主要问题是：开放Issue普遍无标签无分流。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 26.2 | 均值 26.2，低分 19/26 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 78.5 | 均值 78.5，低分 2/26 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 57.2 | 无正式assignee，但作者自行创建MR并推进，责任实际明确。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 67.2 | 无明确分流标签，但作者自行创建MR并合并，处理路径基本正确。 |

代表低分 Issue：[#2148](https://gitcode.com/cann/ops-math/issues/2148)
问题：[Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期。

### I2 · 讨论与解决
本阶段分数为 **55.5/100**，本阶段需要改进，主要问题是：多个Issue零评论无技术讨论。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 83.8 | 均值 83.8，低分 4/26 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 23.1 | 均值 23.1，低分 24/26 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 49.6 | 无评论讨论，但通过MR链接和代码提交形成明确推进，最终合并。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 67.5 | 关联PR已合并，算子需求已实现，用户目标得到有效满足。 |

代表低分 Issue：[#2199](https://gitcode.com/cann/ops-math/issues/2199)
问题：[Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…。

### I3 · 总结与关闭
本阶段分数为 **38.6/100**，本阶段是本周短板之一，主要问题是：关闭阶段得分极低缺乏解决证据。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 8.5 | 均值 8.5，低分 26/26 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 43.8 | 均值 43.8，低分 18/26 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 38.8 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 75.5 | MR合并后由bot关闭，有实际代码合并证据，非过早关闭。 |

代表低分 Issue：[#2148](https://gitcode.com/cann/ops-math/issues/2148)
问题：[Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期。

### G · Bot/Agent 治理
本阶段分数为 **61.3/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 26.7 | 均值 26.7，低分 21/26 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 90.8 | 均值 90.8，低分 0/26 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 65.1 | bot在MR合并后关闭，issue已解决无需人工接续，流程顺畅。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 63.4 | bot正确执行MR合并后关闭和标签添加，流程治理有效。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 67.3 | 无bot动作可评估，信息不足给中性分。 |

代表低分 Issue：[#2148](https://gitcode.com/cann/ops-math/issues/2148)
问题：[Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 75 | 44.5 | 首期基线 | 77.6 | 56.3 | 55.5 | 38.6 | 61.3 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **4 位社区响应者**贡献 **50 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `chensi79` | 44 |
| `sunchun` | 4 |
| `magicjason0007` | 1 |
| `songkai111` | 1 |

Top1 响应占比 **88.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：87.5/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-07-06_to_2026-07-12.json`。
