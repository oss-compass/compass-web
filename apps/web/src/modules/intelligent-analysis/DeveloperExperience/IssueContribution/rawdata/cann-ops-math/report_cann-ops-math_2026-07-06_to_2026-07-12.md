# Issue 贡献体验周报 · cann/ops-math

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **75** 个 Issue
+ **Open 21 / Closed 54**，关闭率 **72.0%**。
+ 总体体验分为 **45.0/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 42.2 | 关闭Issue缺乏解决证据和复用价值 |
| P0 | I2 · 讨论与解决 | 54.4 | 大量Issue零评论无技术讨论 |
| P0 | I1 · 分配与首次响应 | 56.4 | Open Issue无标签无有效分流 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置自动标签bot，根据标题前缀自动打标签 |
| REC-02 | P0 | 在Issue中回复技术方案概要或下一步计划 |
| REC-03 | P0 | 要求关闭评论包含解决方案摘要和关联PR/commit链接 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 75 |
| Open / Closed | 21 / 54 |
| 关闭率 | 72.0% |
| 类型构成 | 缺陷 37 / 需求 26 / 咨询 2 / 其他 10 |
| 总体体验分 | 45.0/100（D） |
| 首次响应时间 | 中位 5.3h；均值 15.4h |
| 关闭周期 | 中位 7.3h；均值 1.1天 |
| 7天响应率 | 96.0% |
| 评论数/Issue | 1.37 |
| 标签覆盖率 | 73.3% |
| 指派覆盖率 | 70.7% |
| 数据完整性 | 87.4/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 77.8 | 9/75（12.0%） | 相对可控 | `SUB_INPUT_QUALITY` 66.3 |
| I1 · 分配与首次响应 | 56.4 | 43/75（57.3%） | 需改进 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 13.1 |
| I2 · 讨论与解决 | 54.4 | 32/75（42.7%） | P0 | `OBJ_SOLUTION_EVIDENCE` 28.4 |
| I3 · 总结与关闭 | 42.2 | 66/75（88.0%） | P0 | `OBJ_CLOSURE_REUSE` 7.9 |
| G · Bot/Agent 治理（参考） | 66.0 | 15/75（20.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 32.9 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I1 · 分配与首次响应 | Open Issue无标签无有效分流 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 13.1，低分 65/75；OBJ_RESPONSE_SPEED：均值 78.4，低分 11/75 | Issue无法有效分类和路由，处理优先级不明确，社区贡献者无法追踪 |
| PP-02 | P0 | I2 · 讨论与解决 | 大量Issue零评论无技术讨论 | OBJ_SOLUTION_EVIDENCE：均值 28.4，低分 69/75；OBJ_RESULT_FORMATION_TIMELINESS：均值 72.0，低分 20/75 | 需求停滞不前，无法形成可执行方案，社区参与积极性下降 |
| PP-03 | P0 | I3 · 总结与关闭 | 关闭Issue缺乏解决证据和复用价值 | OBJ_CLOSURE_REUSE：均值 7.9，低分 74/75；OBJ_DECISION_TRANSPARENCY：均值 48.7，低分 44/75 | 关闭的Issue无法为社区提供知识参考，同类问题可能重复提交 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot缺位率高，28%Issue无自动化治理 | OBJ_BOT_GOVERNANCE：均值 32.9，低分 51/75；OBJ_BOT_MISCLOSE_REVERSE：均值 94.4，低分 0/75 | Issue无法获得及时自动化分流和初步响应，增加维护者人工负担 |
| PP-05 | P1 | G · Bot/Agent 治理 | Bot重复分配失败形成噪音循环 | OBJ_BOT_GOVERNANCE：均值 32.9，低分 51/75；OBJ_BOT_MISCLOSE_REVERSE：均值 94.4，低分 0/75 | 评论噪音淹没实质讨论，流程卡住无法推进，降低Issue可读性 |
| PP-06 | P2 | I1 · 分配与首次响应 | Roadmap类Issue首次响应超72小时 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 13.1，低分 65/75；OBJ_RESPONSE_SPEED：均值 78.4，低分 11/75 | 需求类Issue响应严重滞后，影响社区参与积极性和需求推进效率 |

### 4.1 低分 Issue 明细

#### PP-01 Open Issue无标签无有效分流（I1 · 分配与首次响应）

- **[#2221](https://gitcode.com/cann/ops-math/issues/2221) [Requirement|需求建议]: 迁移 CaseCondition AICPU 算子到 ops-math conversion** — 0分
  - 痛点原因：仅有机器人自动指派和关联PR，全程无人工对需求进行实质性回应。
  - 原文依据：
    - `zhaowenrui666`：/assign [@zhaowenrui666](https://gitcode.com/zhaowenrui666) 关联 PR：https://gitcode.com/cann/ops-math/merge_requests/3703    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaowenrui666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2221    - [关联PR #3703（merged）](https://gitcode.com/cann/ops-math/merge_requests/3703)
- **[#2220](https://gitcode.com/cann/ops-math/issues/2220) [Requirement|需求建议]: CANNBot项目AdvanceStep算子新增支持A5** — 0分
  - 痛点原因：耗时超45小时仅完成人员指派，全程未提供任何实质性技术解答或处理进展。
  - 原文依据：
    - `songkai111`：assigned to @Almost_CANN
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 0分
  - 痛点原因：维护者仅打标签分配负责人，机器人直接关联其他issue关闭，全程无人工实质回应。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)
- **[#2218](https://gitcode.com/cann/ops-math/issues/2218) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: Sqrt arch35 tiling UT 文件头注释仍…** — 0分
  - 痛点原因：虽已指派负责人并关联PR，但超过31小时后仍无任何实质回应。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3998（open）](https://gitcode.com/cann/ops-math/merge_requests/3998)
- **[#2217](https://gitcode.com/cann/ops-math/issues/2217) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CoalesceSparse graph proto 输出名拼…** — 0分
  - 痛点原因：仅完成人员指派与关联PR，超过32小时仍无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3997（open）](https://gitcode.com/cann/ops-math/merge_requests/3997)    - [关联PR #4028（open）](https://gitcode.com/cann/ops-math/merge_requests/4028)
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 0分
  - 痛点原因：全程仅有机器人执行分配和关闭操作，无任何人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kangjiaming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 0分
  - 痛点原因：仅打标签和分配人员，后由机器人自动关闭，全程无人工实质回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 0分
  - 痛点原因：仅快速分配处理人，全程无人工实质回应，最终由机器人关联MR合并后直接关闭。
  - 原文依据：
    - `m0_46386992`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @m0_46386992    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 0分
  - 痛点原因：仅打标签和分配后由机器人关联MR自动关闭，全程无人工实质回应。
  - 原文依据：
    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：全程无人工实质技术回应，仅由机器人因关联PR合并自动关闭，导致实质回应缺失。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2211](https://gitcode.com/cann/ops-math/issues/2211) [Requirement|需求建议]: [Roadmap] genop 算子生成工具能力扩展，完善交付件** — 0分
  - 痛点原因：仅指派负责人耗时超72小时，且后续无任何实质回应。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2210](https://gitcode.com/cann/ops-math/issues/2210) [Requirement|需求建议]: [Roadmap] aclnnfallback开源** — 0分
  - 痛点原因：仅指派了负责人，超过72小时仍无任何实质性解答或反馈。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2209](https://gitcode.com/cann/ops-math/issues/2209) [Requirement|需求建议]: [Roadmap] matmul类算子开发系列教程** — 0分
  - 痛点原因：首次响应超72小时且仅包含分配操作，始终未对需求提供任何实质性解答。
  - 原文依据：
    - `songkai111`：assigned to @songkai111    - `songkai111`：assigned to @zhou-qilong    - `songkai111`：unassigned @songkai111
- **[#2208](https://gitcode.com/cann/ops-math/issues/2208) [Requirement|需求建议]: [Roadmap] 算子支持batch一致性** — 0分
  - 痛点原因：首次响应仅分配负责人且耗时超72小时，全程无任何实质性回复。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2207](https://gitcode.com/cann/ops-math/issues/2207) [Requirement|需求建议]: [Roadmap] 算子使用增强日志上报接口** — 0分
  - 痛点原因：首次响应超72小时且仅有分配人员操作，全程无任何实质性回复内容。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2206](https://gitcode.com/cann/ops-math/issues/2206) [Requirement|需求建议]: [Roadmap] 使用tensorapi优化cube相关算子** — 0分
  - 痛点原因：首次响应耗时超72小时且仅有指派操作，缺乏实质性技术或方案解答。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2204](https://gitcode.com/cann/ops-math/issues/2204) Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：首次响应耗时超117小时且仅有指派操作，始终无任何实质性内容回应。
  - 原文依据：
    - `sunchun`：/assign [@zhou-qilong](https://gitcode.com/zhou-qilong)    - `cann-robot`：assigned to @zhou-qilong
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 0分
  - 痛点原因：仅打标签和分配，后由机器人关联MR自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 0分
  - 痛点原因：维护者仅认领并打标签，未对需求提供任何技术讨论或实质解答即被关闭。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 0分
  - 痛点原因：仅由机器人自动打标签并关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：仅有通用感谢回复和机器人指派失败通知，全程无任何实质性技术解答或处理进展，导致得分为0。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：首次回复仅为模板套话，后续直接由机器人关闭并关联PR，全程缺乏人工实质性技术回应。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2196](https://gitcode.com/cann/ops-math/issues/2196) [Bug-Report|缺陷反馈] [CANN SUMMER CAMPS 2026][NPU]:Sqrt graph proto 的 TensorType 初…** — 0分
  - 痛点原因：仅有7.1小时的首次响应及机器人指派，全程无实质性技术解答。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3966（closed）](https://gitcode.com/cann/ops-math/merge_requests/3966)    - [关联PR #3974（open）](https://gitcode.com/cann/ops-math/merge_requests/3974)
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 0分
  - 痛点原因：仅执行了分派和打标签操作，且被机器人直接标记为已解决，全程无人工对缺陷内容进行实质性解答。
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 0分
  - 痛点原因：仅有认领和加标签等机械操作，全程无任何实质性技术回应。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)
- **[#2193](https://gitcode.com/cann/ops-math/issues/2193) [Bug-Report|缺陷反馈]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：耗时15.7小时仅完成打标签和分配负责人，全程无任何实质性解答或处理意见。
  - 原文依据：
    - `Hana77`：add label bug-report    - `chensi79`：assigned to @Hana77
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人添加标签并在关联PR合并后直接关闭，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：仅有机器人自动响应并随关联PR合并关闭，全程无任何实质性技术回应解答缺陷。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 0分
  - 痛点原因：全程无人工实质回复，仅由机器人加标签并在关联PR合并后自动关闭。
  - 原文依据：
    - `doufloat`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)
- **[#2187](https://gitcode.com/cann/ops-math/issues/2187) [Requirement|需求建议]: 新增 TopK、CalcBucketsLimitAndOffset、CompareAndBitPack 三个 AICP…** — 0分
  - 痛点原因：全程仅有机器人自动分配和关联关闭操作，无任何人工针对需求内容的实质性回复。
  - 原文依据：
    - `sujunwei3`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sujunwei3    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2187    - [关联PR #3724（merged）](https://gitcode.com/cann/ops-math/merge_requests/3724)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：全程无人工实质技术回应，仅由机器人打标签并在关联PR合并后直接关闭，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 0分
  - 痛点原因：全程仅有机器人分配及取消分配操作，缺乏人工对需求内容的实质性回复。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：该 issue 被直接从 codehub 关闭，全程未提供任何首次响应与实质回应。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2180](https://gitcode.com/cann/ops-math/issues/2180) [Requirement|需求建议]: AsStrided算子AscendC实现贡献** — 0分
  - 痛点原因：仅有机器人分配记录，维护者始终未对该需求进行任何实质性的文字回复或反馈。
  - 原文依据：
    - `Mars_Cheng_cys`：/assign [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @Mars_Cheng_cys    - [关联PR #3915（closed）](https://gitcode.com/cann/ops-math/merge_requests/3915)    - [关联PR #3916（merged）](https://gitcode.com/cann/ops-math/merge_requests/3916)
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：仅机器人自动打标签并随PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：仅机器人自动打标签并关闭，虽有关联PR合并记录，但全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 0分
  - 痛点原因：维护者仅执行分配和打标签操作，随后被机器人直接标记为已解决，全程无任何针对缺陷的实质性技术回应。
  - 原文依据：
    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：首次响应仅打标签，全程无人工实质回应，最终被机器人关联PR自动关闭。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 0分
  - 痛点原因：首次响应仅分配任务，后续由机器人自动关闭，全程无实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @biabu111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)
- **[#2174](https://gitcode.com/cann/ops-math/issues/2174) [Requirement|需求建议]: 随机数算子兼容A2\A3** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，全程未对需求内容进行实质性回复。
  - 原文依据：
    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `sikaiwei`：add label requirement    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2174
- **[#2173](https://gitcode.com/cann/ops-math/issues/2173) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：全程仅由机器人自动分配和关联关闭，无任何人工实质回应。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2173    - [关联PR #3882（merged）](https://gitcode.com/cann/ops-math/merge_requests/3882)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：维护者仅添加标签并从 codehub 关闭了 issue，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `sunchun`：closed from codehub
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 0分
  - 痛点原因：全程仅有机器人打标签和人员分配操作，未提供任何实质性的技术或业务沟通回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 0分
  - 痛点原因：维护者仅执行指派和加标签操作，未针对该缺陷提供任何技术排查或解答，导致无实质回应。
  - 原文依据：
    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yefeicoding
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 0分
  - 痛点原因：全程仅打标签和机器人关闭，无任何人工实质技术回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：全程仅由机器人加标签并关联PR关闭，维护者未提供任何人工实质回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2165](https://gitcode.com/cann/ops-math/issues/2165) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：全程仅机器人自动分配与关闭，开发者仅用assign命令，无任何人工实质回应。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2165    - [关联PR #3674（merged）](https://gitcode.com/cann/ops-math/merge_requests/3674)
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 0分
  - 痛点原因：全程仅打标签和分配，无任何实质性文字回应，最终由机器人关联合并请求直接关闭。
  - 原文依据：
    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 0分
  - 痛点原因：仅机器人自动分配和打标签，无任何人工技术回应，且在关联MR合并后直接关闭，全程无实质沟通。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gh_M    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)
- **[#2162](https://gitcode.com/cann/ops-math/issues/2162) [Bug-Report|缺陷反馈]: Normal算子超大shape用例在超32K场景，npu由于升精度到fp32，会提前切分逻辑，导致与竞品比精度失败** — 0分
  - 痛点原因：仅有机器人指派和关联PR操作，未对用户反馈的精度缺陷提供任何实质性文字回复。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：assigned to @gh_M    - [关联PR #3857（merged）](https://gitcode.com/cann/ops-math/merge_requests/3857)    - [关联PR #3868（closed）](https://gitcode.com/cann/ops-math/merge_requests/3868)    - [关联PR #3950（closed）](https://gitcode.com/cann/ops-math/merge_requests/3950)    - [关联PR #4005（merged）](https://gitcode.com/cann/ops-math/merge_requests/4005)
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 0分
  - 痛点原因：维护者仅执行分配和打标签操作，机器人自动标记已解决，全程无任何实质性技术回应。
  - 原文依据：
    - `sunhao_hw`：/assign    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunhao_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 0分
  - 痛点原因：首次响应仅执行了 assign 操作，11.24 小时内无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 0分
  - 痛点原因：仅机器人自动分配和关联MR关闭，全程无人工实质性回应。
  - 原文依据：
    - `xufeng12121`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xufeng12121    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)
- **[#2157](https://gitcode.com/cann/ops-math/issues/2157) [Requirement|需求建议]: SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：仅触发机器人自动分配，始终未提供任何实质性的人工内容回应。
  - 原文依据：
    - `OVO1234`：/assign [@OVO1234](https://gitcode.com/OVO1234)    - `cann-robot`：assigned to @OVO1234
- **[#2156](https://gitcode.com/cann/ops-math/issues/2156) [Requirement|需求建议]: InplaceRsqrt 新增整型数据类型支持** — 0分
  - 痛点原因：仅有指派任务的机械响应，全程无任何实质性的技术解答或方案沟通。
  - 原文依据：
    - `chensi79`：/assign [@Nice_try](https://gitcode.com/Nice_try)    - `cann-robot`：assigned to @Nice_try    - [关联PR #3845（closed）](https://gitcode.com/cann/ops-math/merge_requests/3845)    - [关联PR #3863（merged）](https://gitcode.com/cann/ops-math/merge_requests/3863)
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 0分
  - 痛点原因：仅进行了认领和打标签操作，随后被机器人标记解决，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 0分
  - 痛点原因：全程无人工实质回应，仅机器人执行分配与关联关闭操作。
  - 原文依据：
    - `chengzhi1120`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chengzhi1120    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)
- **[#2153](https://gitcode.com/cann/ops-math/issues/2153) [Requirement|需求建议]: optimize histogram_v2 SIMT key117 performance** — 0分
  - 痛点原因：仅有分配人员和加标签的流程操作，全程未提供任何技术分析或需求确认的实质回复。
  - 原文依据：
    - `chensi79`：/assign [@wangxun21](https://gitcode.com/wangxun21)    - `wangxun21`：add label requirement    - `cann-robot`：assigned to @wangxun21    - [关联PR #3836（open）](https://gitcode.com/cann/ops-math/merge_requests/3836)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 0分
  - 痛点原因：首次响应仅为流程性客套，后续直接由机器人关闭，全程未提供任何实质性技术解答。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 0分
  - 痛点原因：首次响应仅分配任务和加标签，无任何实质性技术解答，且被机器人误加resolved标签。
  - 原文依据：
    - `chensi79`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：仅机器人自动加标签并随PR合并关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：首次响应仅打标签，随后机器人直接关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 0分
  - 痛点原因：首次响应仅指派和加标签，随后被机器人直接标记resolved，全程无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)
- **[#2146](https://gitcode.com/cann/ops-math/issues/2146) [Bug-Report|缺陷反馈]: ViewCopy 算子 SIMD kernel 中 copyDstStride 类型下溢导致 DDR 地址越界** — 0分
  - 痛点原因：维护者仅添加标签并指派任务，随后直接合并关联PR关闭issue，全程无任何实质性文字回应。
  - 原文依据：
    - `StoneChan_`：add label bug-report    - `StoneChan_`：assigned to @StoneChan_    - `StoneChan_`：closed from codehub    - [关联PR #3803（merged）](https://gitcode.com/cann/ops-math/merge_requests/3803)    - [关联PR #3814（merged）](https://gitcode.com/cann/ops-math/merge_requests/3814)    - [关联PR #3828（closed）](https://gitcode.com/cann/ops-math/merge_requests/3828)
#### PP-02 大量Issue零评论无技术讨论（I2 · 讨论与解决）

- **[#2220](https://gitcode.com/cann/ops-math/issues/2220) [Requirement|需求建议]: CANNBot项目AdvanceStep算子新增支持A5** — 0分
  - 痛点原因：仅分配了负责人，未关联PR、commit、文档或release等任何解决证据。
  - 原文依据：
    - `songkai111`：assigned to @Almost_CANN
- **[#2210](https://gitcode.com/cann/ops-math/issues/2210) [Requirement|需求建议]: [Roadmap] aclnnfallback开源** — 0分
  - 痛点原因：仅指派了负责人，未关联任何代码提交、文档或发布记录，缺乏实质性解决证据。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2208](https://gitcode.com/cann/ops-math/issues/2208) [Requirement|需求建议]: [Roadmap] 算子支持batch一致性** — 0分
  - 痛点原因：仅分配了负责人，未关联PR、commit、文档或release，也无关闭评论，完全缺乏解决证据。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2207](https://gitcode.com/cann/ops-math/issues/2207) [Requirement|需求建议]: [Roadmap] 算子使用增强日志上报接口** — 0分
  - 痛点原因：仅指派了负责人，未关联 PR、commit、文档或 release 等任何解决证据。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2206](https://gitcode.com/cann/ops-math/issues/2206) [Requirement|需求建议]: [Roadmap] 使用tensorapi优化cube相关算子** — 0分
  - 痛点原因：仅指派了负责人，未关联任何PR、提交记录、文档或发布说明等实质性解决证据。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2204](https://gitcode.com/cann/ops-math/issues/2204) Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅执行了负责人指派操作，未关联任何PR、代码提交、文档或发布记录等实质性解决证据。
  - 原文依据：
    - `sunchun`：/assign [@zhou-qilong](https://gitcode.com/zhou-qilong)    - `cann-robot`：assigned to @zhou-qilong
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：仅靠机器人关闭且无commit、文档或release等直接证据，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：虽有两个已合并的关联PR，但缺乏commit引用、文档链接和release引用等直接证据，且关闭时无人工确认评论，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - `cann-robot`：add label resolved
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：无任何关联PR、commit或文档等可追溯证据，仅凭外部代码库直接关闭，完全无法证明该问题的解决过程。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：仅由机器人关联PR自动关闭，缺乏commit、文档或release等实质性解决证据及人工关闭评论说明。
  - 原文依据：
    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - `cann-robot`：add label resolved
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - `cann-robot`：add label resolved
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：虽有合并的关联PR和机器人自动关闭，但缺乏人工关闭评论、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：仅由平台直接关闭并添加标签，未关联PR、commit或文档链接，也无评论说明解决过程。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：add label bug-report
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：虽有关联合并PR，但无commit引用、文档及release链接，且关闭时无评论说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved
- **[#2218](https://gitcode.com/cann/ops-math/issues/2218) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: Sqrt arch35 tiling UT 文件头注释仍…** — 15分
  - 痛点原因：关联PR仍处于open状态，无commit引用及关闭评论，仅分配了负责人，缺乏实际解决证据。
  - 原文依据：
    - [关联PR #3998（open）](https://gitcode.com/cann/ops-math/merge_requests/3998)    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain
- **[#2217](https://gitcode.com/cann/ops-math/issues/2217) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CoalesceSparse graph proto 输出名拼…** — 15分
  - 痛点原因：关联PR均处于open未合并，且无commit引用与关闭评论，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #3997（open）](https://gitcode.com/cann/ops-math/merge_requests/3997)    - [关联PR #4028（open）](https://gitcode.com/cann/ops-math/merge_requests/4028)    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 15分
  - 痛点原因：仅因关联issue的MR合并被机器人自动关闭，缺乏本issue直接的commit引用与release说明，证据链薄弱。
  - 原文依据：
    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 15分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及人工关闭说明，解决证据链不完整。
  - 原文依据：
    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue
- **[#2211](https://gitcode.com/cann/ops-math/issues/2211) [Requirement|需求建议]: [Roadmap] genop 算子生成工具能力扩展，完善交付件** — 15分
  - 痛点原因：仅有一条指派操作，无关联 PR、commit、release 及关闭评论等实质解决证据，无法证明问题已真正解决。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 15分
  - 痛点原因：仅靠机器人因关联issue合并自动关闭并打标签，缺乏commit引用和文档链接等直接修复证据。
  - 原文依据：
    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 15分
  - 痛点原因：关联PR未合并且无commit引用，官方仅口头回复已安排修复，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #3996（open）](https://gitcode.com/cann/ops-math/merge_requests/3996)    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2193](https://gitcode.com/cann/ops-math/issues/2193) [Bug-Report|缺陷反馈]: 算子原型迁移至所属仓** — 15分
  - 痛点原因：缺少关联PR、commit引用和关闭评论等实质性解决证据，仅进行了打标签和指派操作。
  - 原文依据：
    - `Hana77`：add label bug-report    - `chensi79`：assigned to @Hana77
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 15分
  - 痛点原因：仅靠机器人自动关闭，无人工关闭评论说明解决过程，且缺乏commit引用与文档链接佐证，解决证据链不完整。
  - 原文依据：
    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - `cann-robot`：add label resolved
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit引用、文档链接及人工关闭评论等直接解决证据。
  - 原文依据：
    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - `cann-robot`：add label resolved
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 15分
  - 痛点原因：仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭说明等直接解决证据。
  - 原文依据：
    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - `doufloat`：add label documentation    - `cann-robot`：add label resolved
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 15分
  - 痛点原因：虽有多个已合并PR，但无commit和release引用，仅靠机器人自动关联关闭且缺乏人工关闭评论，导致证据不足。
  - 原文依据：
    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#2167](https://gitcode.com/cann/ops-math/issues/2167) [Documentation|文档反馈]: coalesce_sparse算子介绍文档内容矛盾，没有aclnn API、Torch API，但正文提到了，如何…** — 15分
  - 痛点原因：仅口头安排修复并分配任务，未关联任何 PR、commit 或 release 等实质性解决证据。
  - 原文依据：
    - `chensi79`：你好，看代码应该是aclnn调用，已安排相关人员修复中    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：assigned to @nunnons2
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 15分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏commit引用、文档链接及人工解决说明，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun
- **[#2205](https://gitcode.com/cann/ops-math/issues/2205) [Requirement|需求建议]: [Roadmap] 支持自定义torch接口生成** — 23分
  - 痛点原因：仅以暂不需要为由关闭并标记完成，未提供任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `zhou-qilong`：ops-math仓暂时不需要提供这个能力    - `zhou-qilong`：closed from codehub    - `zhou-qilong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @zhou-qilong
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 23分
  - 痛点原因：仅有关联PR和机器人关闭评论，缺乏commit引用、文档链接及release引用等直接证明解决的强证据。
  - 原文依据：
    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 23分
  - 痛点原因：虽关联已合并PR并由机器人关闭，但无commit、文档及release等实质修复证据，人工回复亦无最终验证结论。
  - 原文依据：
    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - `cann-robot`：add label resolved
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 23分
  - 痛点原因：仅依赖关联PR和机器人自动关闭，缺乏commit引用、文档链接及release说明等直接修复证据。
  - 原文依据：
    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)    - [关联PR #3959（merged）](https://gitcode.com/cann/ops-math/merge_requests/3959)    - `ConanHuang`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 23分
  - 痛点原因：虽有合并的PR，但无commit、文档及release等直接解决证据，且关闭评论缺乏最终确认。
  - 原文依据：
    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)    - [关联PR #3932（merged）](https://gitcode.com/cann/ops-math/merge_requests/3932)    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - `cann-robot`：add label resolved
- **[#2174](https://gitcode.com/cann/ops-math/issues/2174) [Requirement|需求建议]: 随机数算子兼容A2\A3** — 23分
  - 痛点原因：虽关联多个已合并PR，但无commit、文档及release引用，且关闭评论仅为指派指令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #3734（merged）](https://gitcode.com/cann/ops-math/merge_requests/3734)    - [关联PR #3891（merged）](https://gitcode.com/cann/ops-math/merge_requests/3891)    - [关联PR #4025（merged）](https://gitcode.com/cann/ops-math/merge_requests/4025)    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2174
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 23分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)    - `chengzhi1120`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chengzhi1120
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 23分
  - 痛点原因：仅有关联PR合并与机器人自动关闭说明，缺乏commit引用、文档链接及release说明，证据链不完整。
  - 原文依据：
    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)    - `chensi79`：/assign @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 31分
  - 痛点原因：虽有合并的PR，但仅由机器人自动关闭，缺乏人工解决说明、文档链接及release引用等强证据。
  - 原文依据：
    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - `cann-robot`：add label resolved
- **[#2209](https://gitcode.com/cann/ops-math/issues/2209) [Requirement|需求建议]: [Roadmap] matmul类算子开发系列教程** — 31分
  - 痛点原因：无关联PR与commit引用，仅存在人员指派变动，缺乏代码层面的实质性解决证据。
  - 原文依据：
    - `songkai111`：assigned to @songkai111    - `songkai111`：assigned to @zhou-qilong    - `songkai111`：unassigned @songkai111
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 31分
  - 痛点原因：虽有PR合并，但仅靠机器人自动关闭，缺乏人工关闭评论、文档链接及release引用等解决验证证据。
  - 原文依据：
    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 31分
  - 痛点原因：缺乏关联PR、文档及关闭评论等解决证据，仅引导去外部PR提意见，未形成解决闭环。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2184](https://gitcode.com/cann/ops-math/issues/2184) [Bug-Report] TensorMove 在输入非连续张量时未能利用 vector 的 burst copy 特性，回退到逐元素搬运** — 31分
  - 痛点原因：缺少关联PR与release引用，且无关闭评论，仅口头确认问题并解释代码逻辑，未提供明确的修复或版本证据。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。问题确认、修复中    - `chensi79`：您好，看代码实现，他是先使用AutoContiguous()函数将非连续tensor都转为连续tensor之后再处理的，没有所谓的“连续检测”逻辑 ![image.png](https://raw.gitcode.com/user-ima…
- **[#2180](https://gitcode.com/cann/ops-math/issues/2180) [Requirement|需求建议]: AsStrided算子AscendC实现贡献** — 31分
  - 痛点原因：虽有合并的关联PR和commit引用，但缺少文档链接、release引用及关闭评论，导致证据链不完整。
  - 原文依据：
    - [关联PR #3915（closed）](https://gitcode.com/cann/ops-math/merge_requests/3915)    - [关联PR #3916（merged）](https://gitcode.com/cann/ops-math/merge_requests/3916)    - `Mars_Cheng_cys`：/assign [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @Mars_Cheng_cys
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 31分
  - 痛点原因：仅靠机器人自动关联PR并打标签关闭，缺乏人工关闭评论总结，无文档和release等强证据支撑。
  - 原文依据：
    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - `cann-robot`：add label resolved
- **[#2146](https://gitcode.com/cann/ops-math/issues/2146) [Bug-Report|缺陷反馈]: ViewCopy 算子 SIMD kernel 中 copyDstStride 类型下溢导致 DDR 地址越界** — 31分
  - 痛点原因：虽有关联PR，但无人工确认解决的评论及测试验证证据，仅由系统自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #3803（merged）](https://gitcode.com/cann/ops-math/merge_requests/3803)    - [关联PR #3814（merged）](https://gitcode.com/cann/ops-math/merge_requests/3814)    - [关联PR #3828（closed）](https://gitcode.com/cann/ops-math/merge_requests/3828)    - `StoneChan_`：closed from codehub    - `StoneChan_`：add label bug-report    - `StoneChan_`：assigned to @StoneChan_
- **[#2221](https://gitcode.com/cann/ops-math/issues/2221) [Requirement|需求建议]: 迁移 CaseCondition AICPU 算子到 ops-math conversion** — 38分
  - 痛点原因：虽有合并PR，但无commit引用和release引用，关闭仅靠机器人自动触发，缺乏人工验证证据。
  - 原文依据：
    - [关联PR #3703（merged）](https://gitcode.com/cann/ops-math/merge_requests/3703)    - `zhaowenrui666`：/assign [@zhaowenrui666](https://gitcode.com/zhaowenrui666) 关联 PR：https://gitcode.com/cann/ops-math/merge_requests/3703    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2221    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaowenrui666
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 38分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺少commit引用和文档链接等具体解决证据。
  - 原文依据：
    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - `m0_46386992`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @m0_46386992
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，人工回复仅泛称已安排修复，缺乏具体代码提交或版本发布证据。
  - 原文依据：
    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - `cann-robot`：add label resolved
- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 38分
  - 痛点原因：关联PR#3976仍open，且无commit和release引用，修复闭环证据不足。
  - 原文依据：
    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `chensi79`：assigned to @magicjason0007
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 38分
  - 痛点原因：仅由机器人自动关闭并关联PR，缺乏直接的commit引用与文档链接，解决证据不够充分。
  - 原文依据：
    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 38分
  - 痛点原因：因空issue被直接关闭，无关联PR或commit等代码修复证据，缺乏实质性解决支撑。
  - 原文依据：
    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与文档链接，且仅靠机器人自动关闭，缺乏人工解决说明与验证证据。
  - 原文依据：
    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)    - [关联PR #3944（merged）](https://gitcode.com/cann/ops-math/merge_requests/3944)    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 38分
  - 痛点原因：仅靠关联PR和机器人关闭说明，缺乏commit引用与文档链接等直接修复证据，证据链不完整。
  - 原文依据：
    - [关联PR #3899（merged）](https://gitcode.com/cann/ops-math/merge_requests/3899)    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 38分
  - 痛点原因：虽关联已合并PR，但无commit引用和文档链接，关闭评论仅为分配指令，未提供实质性解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #3869（merged）](https://gitcode.com/cann/ops-math/merge_requests/3869)    - [关联PR #3877（merged）](https://gitcode.com/cann/ops-math/merge_requests/3877)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2169
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与文档链接，且关闭证据主要依赖机器人自动操作，缺乏直接解决细节。
  - 原文依据：
    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)    - `gh_M`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gh_M
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit引用，且由机器人因关联issue合并被动关闭，缺乏直接修复证据。
  - 原文依据：
    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)    - [关联PR #3871（merged）](https://gitcode.com/cann/ops-math/merge_requests/3871)    - `sunhao_hw`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 38分
  - 痛点原因：仅因关联PR合并连带关闭，缺乏直接修复该问题的commit引用与文档链接，导致证据链不完整。
  - 原文依据：
    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)    - `xufeng12121`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xufeng12121
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 38分
  - 痛点原因：虽有关联PR，但无commit和release引用，且关闭评论仅说明因关联issue合并而关闭，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏具体commit引用，且关闭评论仅为机器人模板回复，无人工修复说明。
  - 原文依据：
    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 46分
  - 痛点原因：虽有关联合并PR，但缺少关闭评论和文档链接，导致解决证据不充分。
  - 原文依据：
    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming
- **[#2196](https://gitcode.com/cann/ops-math/issues/2196) [Bug-Report|缺陷反馈] [CANN SUMMER CAMPS 2026][NPU]:Sqrt graph proto 的 TensorType 初…** — 46分
  - 痛点原因：关联PR仍处于open状态且无关闭评论，缺少release引用，解决闭环证据不足。
  - 原文依据：
    - [关联PR #3966（closed）](https://gitcode.com/cann/ops-math/merge_requests/3966)    - [关联PR #3974（open）](https://gitcode.com/cann/ops-math/merge_requests/3974)    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 46分
  - 痛点原因：仅由机器人自动关闭并打标签，缺乏人工关闭评论说明解决过程，且无文档链接佐证落地效果。
  - 原文依据：
    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128
- **[#2162](https://gitcode.com/cann/ops-math/issues/2162) [Bug-Report|缺陷反馈]: Normal算子超大shape用例在超32K场景，npu由于升精度到fp32，会提前切分逻辑，导致与竞品比精度失败** — 46分
  - 痛点原因：存在两个被关闭的关联PR且无文档链接佐证最终修复方案，导致证据链不够完整。
  - 原文依据：
    - [关联PR #3857（merged）](https://gitcode.com/cann/ops-math/merge_requests/3857)    - [关联PR #3868（closed）](https://gitcode.com/cann/ops-math/merge_requests/3868)    - [关联PR #3950（closed）](https://gitcode.com/cann/ops-math/merge_requests/3950)    - [关联PR #4005（merged）](https://gitcode.com/cann/ops-math/merge_requests/4005)    - `gh_M`：/assign    - `cann-robot`：assigned to @gh_M
- **[#2157](https://gitcode.com/cann/ops-math/issues/2157) [Requirement|需求建议]: SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 46分
  - 痛点原因：仅有任务分配记录，未关联PR且无关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - `OVO1234`：/assign [@OVO1234](https://gitcode.com/OVO1234)    - `cann-robot`：assigned to @OVO1234
- **[#2156](https://gitcode.com/cann/ops-math/issues/2156) [Requirement|需求建议]: InplaceRsqrt 新增整型数据类型支持** — 46分
  - 痛点原因：虽有合并的PR，但缺少关闭评论说明与文档链接，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #3845（closed）](https://gitcode.com/cann/ops-math/merge_requests/3845)    - [关联PR #3863（merged）](https://gitcode.com/cann/ops-math/merge_requests/3863)    - `chensi79`：/assign [@Nice_try](https://gitcode.com/Nice_try)    - `cann-robot`：assigned to @Nice_try
- **[#2153](https://gitcode.com/cann/ops-math/issues/2153) [Requirement|需求建议]: optimize histogram_v2 SIMT key117 performance** — 46分
  - 痛点原因：关联PR仍为open未合并，且无release引用和关闭评论，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #3836（open）](https://gitcode.com/cann/ops-math/merge_requests/3836)    - `chensi79`：/assign [@wangxun21](https://gitcode.com/wangxun21)    - `wangxun21`：add label requirement    - `cann-robot`：assigned to @wangxun21
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 46分
  - 痛点原因：缺乏人工关闭评论说明修复细节，仅由机器人因PR合并自动关闭，导致说明不够充分。
  - 原文依据：
    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 54分
  - 痛点原因：虽有合并的PR和关闭评论，但缺少文档链接与release引用，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kangjiaming
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 54分
  - 痛点原因：缺少文档链接与release引用，仅靠PR和commit引用不足以构成完整的证据链。
  - 原文依据：
    - [关联PR #3851（merged）](https://gitcode.com/cann/ops-math/merge_requests/3851)    - [关联PR #3852（merged）](https://gitcode.com/cann/ops-math/merge_requests/3852)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 54分
  - 痛点原因：虽有合并的PR和commit引用，但缺少文档链接与release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)    - `ConanHuang`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang
#### PP-03 关闭Issue缺乏解决证据和复用价值（I3 · 总结与关闭）

- **[#2220](https://gitcode.com/cann/ops-math/issues/2220) [Requirement|需求建议]: CANNBot项目AdvanceStep算子新增支持A5** — 0分
  - 痛点原因：关闭说明为空且无方案文档与复用链接，仅指派负责人即关闭，未留下任何可复用信息。
  - 原文依据：
    - `songkai111`：assigned to @Almost_CANN
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 0分
  - 痛点原因：仅由机器人随MR合并自动关闭，无方案文档化记录、无dup主链接且关闭说明为空，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)
- **[#2218](https://gitcode.com/cann/ops-math/issues/2218) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: Sqrt arch35 tiling UT 文件头注释仍…** — 0分
  - 痛点原因：关闭说明为0字且无重复主链接，未沉淀任何解决方案或关联信息，无法提供后续参考。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3998（open）](https://gitcode.com/cann/ops-math/merge_requests/3998)
- **[#2217](https://gitcode.com/cann/ops-math/issues/2217) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CoalesceSparse graph proto 输出名拼…** — 0分
  - 痛点原因：关闭时无任何文字说明，且关联的两个PR仍处于open状态，导致无法复用解决方案。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3997（open）](https://gitcode.com/cann/ops-math/merge_requests/3997)    - [关联PR #4028（open）](https://gitcode.com/cann/ops-math/merge_requests/4028)
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 0分
  - 痛点原因：仅由机器人随MR合并自动关闭，无方案文档、无重复链接且关闭说明仅7字，未留存可供复用的信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `cann-robot`：add label resolved    - `m0_46386992`：/assign    - `cann-robot`：assigned to @m0_46386992    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 0分
  - 痛点原因：仅靠机器人关联MR自动关闭，无人工关闭说明、方案文档沉淀及重复链接，导致解决经验无法被后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：机器人随PR合并自动关闭，关闭说明为0字且无方案文档，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - `cann-robot`：add label resolved    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2211](https://gitcode.com/cann/ops-math/issues/2211) [Requirement|需求建议]: [Roadmap] genop 算子生成工具能力扩展，完善交付件** — 0分
  - 痛点原因：关闭时无任何说明文字，仅做了指派操作，未提供方案结论或复用信息，无法供后续参考。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2210](https://gitcode.com/cann/ops-math/issues/2210) [Requirement|需求建议]: [Roadmap] aclnnfallback开源** — 0分
  - 痛点原因：仅分配处理人后关闭，无任何关闭说明、方案文档及重复链接，无法为后续类似问题提供参考。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2209](https://gitcode.com/cann/ops-math/issues/2209) [Requirement|需求建议]: [Roadmap] matmul类算子开发系列教程** — 0分
  - 痛点原因：关闭时未留下任何说明文字，导致后续无法直接复用或参考该需求。
  - 原文依据：
    - `songkai111`：assigned to @songkai111    - `songkai111`：assigned to @zhou-qilong    - `songkai111`：unassigned @songkai111
- **[#2208](https://gitcode.com/cann/ops-math/issues/2208) [Requirement|需求建议]: [Roadmap] 算子支持batch一致性** — 0分
  - 痛点原因：关闭时未留下任何文字说明，也无方案文档与重复链接，未沉淀任何可复用经验。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2207](https://gitcode.com/cann/ops-math/issues/2207) [Requirement|需求建议]: [Roadmap] 算子使用增强日志上报接口** — 0分
  - 痛点原因：仅指派负责人即关闭，无方案文档、重复链接及关闭说明，未沉淀任何可复用信息。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2206](https://gitcode.com/cann/ops-math/issues/2206) [Requirement|需求建议]: [Roadmap] 使用tensorapi优化cube相关算子** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档且无相关链接，导致后续无法复用。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2205](https://gitcode.com/cann/ops-math/issues/2205) [Requirement|需求建议]: [Roadmap] 支持自定义torch接口生成** — 0分
  - 痛点原因：关闭说明仅20字且无方案文档，仅以暂时不需要为由关闭，未沉淀任何可供后续复用的决策细节或替代方案。
  - 原文依据：
    - `zhou-qilong`：closed from codehub    - `zhou-qilong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `zhou-qilong`：ops-math仓暂时不需要提供这个能力    - `songkai111`：assigned to @zhou-qilong
- **[#2204](https://gitcode.com/cann/ops-math/issues/2204) Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时仅指派负责人，未留下任何关闭说明、方案文档或复用链接，无法提供参考。
  - 原文依据：
    - `sunchun`：/assign [@zhou-qilong](https://gitcode.com/zhou-qilong)    - `cann-robot`：assigned to @zhou-qilong
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 0分
  - 痛点原因：仅由机器人关联MR合并自动关闭，关闭说明为0字，无方案文档化与dup链接，缺乏问题总结导致无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无方案文档、复用链接及关闭说明，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：关闭时无任何文字说明，未总结修复方案，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：无方案文档化且关闭说明仅15字，仅靠机器人关联PR关闭，未沉淀问题原因与修复细节供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - `cann-robot`：add label resolved    - `chensi79`：你好，感谢反馈，问题验证修复中    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2196](https://gitcode.com/cann/ops-math/issues/2196) [Bug-Report|缺陷反馈] [CANN SUMMER CAMPS 2026][NPU]:Sqrt graph proto 的 TensorType 初…** — 0分
  - 痛点原因：关闭时无任何文字说明且无重复链接，仅指派处理人并关联PR，未沉淀解决方案供他人复用。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3966（closed）](https://gitcode.com/cann/ops-math/merge_requests/3966)    - [关联PR #3974（open）](https://gitcode.com/cann/ops-math/merge_requests/3974)
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化与复用链接，仅靠机器人关联合并，未沉淀可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 0分
  - 痛点原因：缺乏方案文档化与重复主链接，仅由机器人自动关联其他issue关闭，未沉淀任何可复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved    - `ConanHuang`：/assign    - `cann-robot`：assigned to @ConanHuang    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)
- **[#2193](https://gitcode.com/cann/ops-math/issues/2193) [Bug-Report|缺陷反馈]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：关闭时无任何说明、方案文档与重复链接，仅指派负责人和加标签，未留存可复用经验。
  - 原文依据：
    - `Hana77`：add label bug-report    - `chensi79`：assigned to @Hana77
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人随关联PR合并自动关闭，缺乏人工总结与复用沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：机器人随PR合并自动关闭，无任何关闭说明与方案文档，未沉淀可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - `cann-robot`：add label resolved    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为空，无方案文档沉淀，导致其他用户无法复用修复经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - `cann-robot`：add label resolved    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：关闭说明为0字，仅靠机器人因MR合并自动关闭并关联PR，未沉淀问题原因与解决方案，无复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - `cann-robot`：add label resolved    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2185](https://gitcode.com/cann/ops-math/issues/2185) [Bug-Report] ViewCopy 算子在 View 的 base tensor 被 inplace resize/realloc 后返回的 stor…** — 0分
  - 痛点原因：关闭说明为0字且未提供方案文档或重复链接，导致后续用户无法从中获取有效参考。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。还未正式合入的代码可以直接去对应Pull Request下提检视意见跟踪处理
- **[#2184](https://gitcode.com/cann/ops-math/issues/2184) [Bug-Report] TensorMove 在输入非连续张量时未能利用 vector 的 burst copy 特性，回退到逐元素搬运** — 0分
  - 痛点原因：关闭说明为空且未将修复方案文档化，仅简单回复修复中与代码逻辑，未沉淀可复用经验。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。问题确认、修复中    - `chensi79`：您好，看代码实现，他是先使用AutoContiguous()函数将非连续tensor都转为连续tensor之后再处理的，没有所谓的“连续检测”逻辑 ![image.png](https://raw.gitcode.com/user-ima…
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：关闭说明为空且无方案文档与主链接，仅机械显示从codehub关闭，无法提供任何复用参考。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2180](https://gitcode.com/cann/ops-math/issues/2180) [Requirement|需求建议]: AsStrided算子AscendC实现贡献** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档与复用链接，虽有PR合并但缺乏文字总结，无法为后续提供参考。
  - 原文依据：
    - `Mars_Cheng_cys`：/assign [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @Mars_Cheng_cys    - [关联PR #3915（closed）](https://gitcode.com/cann/ops-math/merge_requests/3915)    - [关联PR #3916（merged）](https://gitcode.com/cann/ops-math/merge_requests/3916)
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：机器人自动关闭且关闭说明为空，无方案文档沉淀与主链接，未留下任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - `cann-robot`：add label resolved    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人关联PR自动关闭，未沉淀任何可供复用的解决方案信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - `cann-robot`：add label resolved    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：机器人自动关闭且无任何文字说明，未沉淀方案文档，导致解决经验无法被后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 0分
  - 痛点原因：关闭说明仅49字且仅提及因关联MR合并而关闭，缺乏方案文档沉淀，导致其他用户无法参考具体解决过程。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - `cann-robot`：add label resolved    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：assigned to @biabu111    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)
- **[#2174](https://gitcode.com/cann/ops-math/issues/2174) [Requirement|需求建议]: 随机数算子兼容A2\A3** — 0分
  - 痛点原因：关闭说明仅提及因MR合并关闭，缺乏方案文档与关联主链接，未沉淀有效信息供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2174    - `sikaiwei`：add label requirement    - `cann-robot`：add label resolved    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `sikaiwei`：assigned to @sikaiwei
- **[#2173](https://gitcode.com/cann/ops-math/issues/2173) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅由机器人因关联合并请求自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2173    - `cann-robot`：add label resolved    - `wuchengming123`：/assign    - `cann-robot`：assigned to @wuchengming123    - [关联PR #3882（merged）](https://gitcode.com/cann/ops-math/merge_requests/3882)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅从代码库直接关闭，未留下任何可供复用的解决经验。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：add label bug-report
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与重复链接沉淀，仅由机器人因关联MR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)
- **[#2167](https://gitcode.com/cann/ops-math/issues/2167) [Documentation|文档反馈]: coalesce_sparse算子介绍文档内容矛盾，没有aclnn API、Torch API，但正文提到了，如何…** — 0分
  - 痛点原因：关闭时无任何说明文字，未总结最终修复方案或提供相关链接，导致其他用户无法参考。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `chensi79`：你好，看代码应该是aclnn调用，已安排相关人员修复中    - `sunchun`：/assign [@nunnons2](https://gitcode.com/nunnons2)    - `cann-robot`：assigned to @nunnons2
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：无方案文档且关闭说明为空，仅由机器人随关联PR合并自动关闭，未沉淀任何可供复用的解决方案信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2165](https://gitcode.com/cann/ops-math/issues/2165) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，仅因关联MR合并连带关闭，未留存可供复用的解决方案信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2165    - `cann-robot`：add label resolved    - `wuchengming123`：/assign    - `cann-robot`：assigned to @wuchengming123    - [关联PR #3674（merged）](https://gitcode.com/cann/ops-math/merge_requests/3674)
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 0分
  - 痛点原因：因关联MR合并被机器人自动关闭，关闭说明为0字且无方案文档，未留存解决经验供复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化与主链接，仅提及合并MR关闭关联issue，导致无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - `cann-robot`：add label resolved    - `gh_M`：/assign    - `cann-robot`：assigned to @gh_M    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)
- **[#2162](https://gitcode.com/cann/ops-math/issues/2162) [Bug-Report|缺陷反馈]: Normal算子超大shape用例在超32K场景，npu由于升精度到fp32，会提前切分逻辑，导致与竞品比精度失败** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅靠关联PR关闭，导致解决经验无法被复用。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：assigned to @gh_M    - [关联PR #3857（merged）](https://gitcode.com/cann/ops-math/merge_requests/3857)    - [关联PR #3868（closed）](https://gitcode.com/cann/ops-math/merge_requests/3868)    - [关联PR #3950（closed）](https://gitcode.com/cann/ops-math/merge_requests/3950)    - [关联PR #4005（merged）](https://gitcode.com/cann/ops-math/merge_requests/4005)
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，关闭说明仅7字，无方案文档化记录，未留存可供复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved    - `sunhao_hw`：/assign    - `cann-robot`：assigned to @sunhao_hw    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 0分
  - 痛点原因：机器人随 MR 合并自动关闭，关闭说明仅 7 字，无方案文档与复用链接，未沉淀任何可供复用的信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - `cann-robot`：add label resolved    - `xufeng12121`：/assign    - `cann-robot`：assigned to @xufeng12121    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)
- **[#2157](https://gitcode.com/cann/ops-math/issues/2157) [Requirement|需求建议]: SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：关闭说明为空且无方案文档与相关链接，未沉淀任何可复用的经验或信息。
  - 原文依据：
    - `OVO1234`：/assign [@OVO1234](https://gitcode.com/OVO1234)    - `cann-robot`：assigned to @OVO1234
- **[#2156](https://gitcode.com/cann/ops-math/issues/2156) [Requirement|需求建议]: InplaceRsqrt 新增整型数据类型支持** — 0分
  - 痛点原因：关闭说明为空且无方案文档，虽有合并PR但未补充文字总结，导致无经验沉淀供后续复用。
  - 原文依据：
    - `chensi79`：/assign [@Nice_try](https://gitcode.com/Nice_try)    - `cann-robot`：assigned to @Nice_try    - [关联PR #3845（closed）](https://gitcode.com/cann/ops-math/merge_requests/3845)    - [关联PR #3863（merged）](https://gitcode.com/cann/ops-math/merge_requests/3863)
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档，仅由机器人因MR合并自动关闭，未留下任何可复用的优化方案或经验记录。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `ConanHuang`：/assign    - `cann-robot`：assigned to @ConanHuang    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 0分
  - 痛点原因：无方案文档与复用链接，关闭说明仅7字且由机器人自动关联关闭，未沉淀任何经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - `cann-robot`：add label resolved    - `chengzhi1120`：/assign    - `cann-robot`：assigned to @chengzhi1120    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)
- **[#2153](https://gitcode.com/cann/ops-math/issues/2153) [Requirement|需求建议]: optimize histogram_v2 SIMT key117 performance** — 0分
  - 痛点原因：关闭时无任何文字说明，且关联PR仍处于open状态，未留下可复用的结论信息。
  - 原文依据：
    - `wangxun21`：add label requirement    - `chensi79`：/assign [@wangxun21](https://gitcode.com/wangxun21)    - `cann-robot`：assigned to @wangxun21    - [关联PR #3836（open）](https://gitcode.com/cann/ops-math/merge_requests/3836)
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 0分
  - 痛点原因：关闭说明仅17字且为机器人自动关联，无方案文档化记录，导致其他用户无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：/assign @wangrui_    - `cann-robot`：assigned to @wangrui_    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：仅由机器人自动关联PR关闭，无任何关闭说明与方案文档沉淀，未留下可复用的排查经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - `cann-robot`：add label resolved    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：关联PR已合并但未补充方案文档或关闭说明，仅靠机器人自动关闭，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2146](https://gitcode.com/cann/ops-math/issues/2146) [Bug-Report|缺陷反馈]: ViewCopy 算子 SIMD kernel 中 copyDstStride 类型下溢导致 DDR 地址越界** — 0分
  - 痛点原因：关闭说明为空且无方案文档，未沉淀问题原因与解决思路，无法供同类问题参考复用。
  - 原文依据：
    - `StoneChan_`：closed from codehub    - `StoneChan_`：add label bug-report    - `StoneChan_`：assigned to @StoneChan_    - [关联PR #3803（merged）](https://gitcode.com/cann/ops-math/merge_requests/3803)    - [关联PR #3814（merged）](https://gitcode.com/cann/ops-math/merge_requests/3814)    - [关联PR #3828（closed）](https://gitcode.com/cann/ops-math/merge_requests/3828)
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 25分
  - 痛点原因：无方案文档和重复issue链接，关闭说明仅由机器人自动生成，缺乏人工沉淀的复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - `cann-robot`：add label resolved    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：assigned to @kangjiaming    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 25分
  - 痛点原因：关闭说明仅提及因关联MR合并而关闭，无方案文档与具体解决细节，无法供他人参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 25分
  - 痛点原因：关闭说明仅为机器人自动回复，无方案文档沉淀且未关联主链接，缺乏供后续参考的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2183    - `cann-robot`：add label resolved    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 25分
  - 痛点原因：因空issue被直接关闭，无方案文档化与重复链接，关闭说明仅告知无效，对后续无复用价值。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 25分
  - 痛点原因：未提供方案文档和重复主链接，仅由机器人随MR合并自动关闭，缺乏人工复用价值总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `cann-robot`：assigned to @xiu_ling_wang    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 25分
  - 痛点原因：关闭说明仅指出旧代码残留并关联MR，无方案文档沉淀与复现链接，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 25分
  - 痛点原因：仅因MR合并自动关闭，无方案文档化记录，未沉淀排查过程与修复方案，导致其他用户无法参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2169    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 25分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档化记录与重复issue主链接，关闭说明过简，难以供他人复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159    - `cann-robot`：add label resolved    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：assigned to @chenxingyu18
- **[#2150](https://gitcode.com/cann/ops-math/issues/2150) [Question|问题咨询]: 编译部署abs算子时，指定--soc=ascend910_93编译后安装报错** — 25分
  - 痛点原因：关闭说明仅提供添加--force的临时绕过方案，未沉淀文档或关联主链接，导致经验无法被社区复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：因为该算子，在910_93版本，没有tiling，因此自定义算子包安装会由于缺少tiling so而报错，需要添加--force    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 25分
  - 痛点原因：仅由机器人因合并请求自动关闭，无方案文档与重复主链接，关闭说明简略，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `cann-robot`：assigned to @zhanw_coding    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随MR合并自动关闭，未提供任何可复用的方案总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 30分
  - 痛点原因：关闭说明仅 17 字过于简略，且未提供关联主 issue 链接，导致其他用户难以复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)
- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 30分
  - 痛点原因：关闭说明仅15字且仅由机器人提示关联合并，未提供重复主issue链接，缺乏对修复方案和结论的总结，复用指引不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `chensi79`：assigned to @magicjason0007    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因关联PR合并自动关闭，未补充问题解决细节，导致其他用户无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - `doufloat`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)
- **[#2187](https://gitcode.com/cann/ops-math/issues/2187) [Requirement|需求建议]: 新增 TopK、CalcBucketsLimitAndOffset、CompareAndBitPack 三个 AICP…** — 30分
  - 痛点原因：关闭说明仅7字且无关联主issue链接，仅因MR合并自动关闭，未沉淀可追踪的方案细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2187    - `cann-robot`：add label resolved    - `sujunwei3`：/assign    - `cann-robot`：assigned to @sujunwei3    - [关联PR #3724（merged）](https://gitcode.com/cann/ops-math/merge_requests/3724)
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 30分
  - 痛点原因：关闭说明为0字且无重复issue主链接，仅靠机器人随PR合并自动关闭，缺乏人工复用引导。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 30分
  - 痛点原因：关闭说明仅13字且为机器人自动回复，缺乏具体修复方案总结与关联链接，导致其他用户无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，问题修复中    - `chensi79`：assigned to @chensi79    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2190](https://gitcode.com/cann/ops-math/issues/2190) [Requirement|需求建议]: 【社区任务】新增 experimental Gcd Ascend C 算子** — 55分
  - 痛点原因：关闭说明仅为系统自动生成的MR合并模板，缺乏人工经验沉淀，且未提供dup主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2190    - `Morikunn`：add label requirement    - `cann-robot`：add label resolved    - `Morikunn`：关联源码 MR：https://gitcode.com/cann/ops-math/merge_requests/3947    - `chensi79`：/assign [@Morikunn](https://gitcode.com/Morikunn)    - `cann-robot`：assigned to @Morikunn
#### PP-04 Bot缺位率高，28%Issue无自动化治理（G · Bot/Agent 治理）

- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 0分
  - 痛点原因：Bot仅执行自动关闭，未进行打标与评论引导，治理动作严重缺失导致得分为零。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `chensi79`：assigned to @magicjason0007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 15分
  - 痛点原因：Bot重复报错指派失败，且未进行自动打标或关闭等有效治理，仅产生大量无效评论。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2221](https://gitcode.com/cann/ops-math/issues/2221) [Requirement|需求建议]: 迁移 CaseCondition AICPU 算子到 ops-math conversion** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭操作，无任何引导性评论，缺乏有效互动导致治理流于形式。
  - 原文依据：
    - `zhaowenrui666`：/assign [@zhaowenrui666](https://gitcode.com/zhaowenrui666) 关联 PR：https://gitcode.com/cann/ops-math/merge_requests/3703    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaowenrui666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2221    - [关联PR #3703（merged）](https://gitcode.com/cann/ops-math/merge_requests/3703)
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，未向用户解释关联MR合并关闭的原因，缺乏有效沟通。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 20分
  - 痛点原因：Bot仅执行分配、打标和关闭等机械动作，评论数为零，缺乏与用户的有效互动反馈。
  - 原文依据：
    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kangjiaming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 20分
  - 痛点原因：Bot仅自动打标并在关联MR合并后关闭，全程无任何评论向用户解释关闭原因，缺乏透明度。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，未产生任何评论互动，缺乏有效沟通与人工确认。
  - 原文依据：
    - `m0_46386992`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @m0_46386992    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程零评论，未公开说明关闭原因，缺乏与用户的有效沟通。
  - 原文依据：
    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 20分
  - 痛点原因：Bot仅执行打标和关闭动作，未通过评论向用户解释关闭原因，治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2205](https://gitcode.com/cann/ops-math/issues/2205) [Requirement|需求建议]: [Roadmap] 支持自定义torch接口生成** — 20分
  - 痛点原因：Bot仅执行打标，无评论互动且未自动关闭，最终由人工手动处理，自动化治理介入极低。
  - 原文依据：
    - `zhou-qilong`：ops-math仓暂时不需要提供这个能力    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @zhou-qilong    - `zhou-qilong`：closed from codehub    - `zhou-qilong`：changed custom state from 进行中 to 已完成
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作且无任何评论，导致治理过程不透明，缺乏有效反馈。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 20分
  - 痛点原因：Bot仅机械执行打标与分配操作，未产生任何评论与用户沟通，治理过程缺乏透明度。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，评论数为零，缺乏有效沟通与治理反馈。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为0，未提供任何自动回复或进度同步，缺乏与用户的有效交互。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，但评论数为0，未与用户进行有效沟通或状态同步，治理闭环缺失。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，未发表任何评论说明原因或引导用户，缺乏有效沟通。
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 20分
  - 痛点原因：Bot将未解决的缺陷误打resolved标签并关闭，且无任何有效评论，属于机械且无效的误治理。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，无任何互动评论，治理流于形式。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 20分
  - 痛点原因：Bot仅机械打标并在PR合并后关闭，无任何解释性评论，缺乏有效交互与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2190](https://gitcode.com/cann/ops-math/issues/2190) [Requirement|需求建议]: 【社区任务】新增 experimental Gcd Ascend C 算子** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，未产生任何评论与用户互动，缺乏有效反馈导致治理效果不佳。
  - 原文依据：
    - `Morikunn`：关联源码 MR：https://gitcode.com/cann/ops-math/merge_requests/3947    - `chensi79`：/assign [@Morikunn](https://gitcode.com/Morikunn)    - `Morikunn`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Morikunn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2190
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，全程无任何评论与用户互动，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何评论与用户沟通，缺乏有效交互。
  - 原文依据：
    - `doufloat`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)
- **[#2187](https://gitcode.com/cann/ops-math/issues/2187) [Requirement|需求建议]: 新增 TopK、CalcBucketsLimitAndOffset、CompareAndBitPack 三个 AICP…** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭动作，全程无任何交互评论，缺乏对用户的解释与引导。
  - 原文依据：
    - `sujunwei3`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sujunwei3    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2187    - [关联PR #3724（merged）](https://gitcode.com/cann/ops-math/merge_requests/3724)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未通过评论说明关闭原因及关联PR，缺乏对用户的有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 20分
  - 痛点原因：Bot自动分配后遭人工取消且无评论说明，治理动作未闭环。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 20分
  - 痛点原因：Bot仅完成打标，未识别空issue并自动关闭或评论，实际治理动作完全依赖人工。
  - 原文依据：
    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无评论反馈，未对状态变更及关联PR合并提供任何说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未发布任何评论说明关闭原因及关联PR，缺乏对用户的有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 20分
  - 痛点原因：Bot仅执行机械的打标和指派操作，未产生任何评论，缺乏有效沟通与引导，治理过程流于形式。
  - 原文依据：
    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 20分
  - 痛点原因：Bot仅执行打标和自动关闭动作，全程无评论同步状态或说明原因，导致治理过程不透明且缺乏有效反馈。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 20分
  - 痛点原因：Bot仅机械执行打标与关联关闭，全程无任何评论互动，缺乏有效沟通导致治理失效。
  - 原文依据：
    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @biabu111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)
- **[#2173](https://gitcode.com/cann/ops-math/issues/2173) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 20分
  - 痛点原因：Bot仅执行打标与关闭等机械操作，评论数为0，缺乏有效互动与状态同步导致治理效果不佳。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2173    - [关联PR #3882（merged）](https://gitcode.com/cann/ops-math/merge_requests/3882)
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 20分
  - 痛点原因：Bot直接打标关闭但全程无评论沟通，人工反复指派与取消指派，缺乏有效交互与闭环验证。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 20分
  - 痛点原因：Bot在缺陷尚未修复时即过早打标resolved并关闭，且无任何有效评论，治理失效。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 20分
  - 痛点原因：Bot仅机械打标并在PR合并后自动关闭，全程无评论互动，缺乏状态同步与有效沟通，治理过程不透明。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 20分
  - 痛点原因：Bot仅机械打标并随关联PR合并自动关闭，全程零评论互动，缺乏进度同步与用户沟通，治理流于形式。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2165](https://gitcode.com/cann/ops-math/issues/2165) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未输出任何评论进行状态同步与交互说明，治理过程缺乏透明度。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2165    - [关联PR #3674（merged）](https://gitcode.com/cann/ops-math/merge_requests/3674)
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 20分
  - 痛点原因：Bot仅机械打标和关联关闭，无任何评论互动，缺乏对用户的有效反馈与引导。
  - 原文依据：
    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 20分
  - 痛点原因：Bot仅机械执行分配、打标和关闭操作，全程无任何评论与用户交互，缺乏进度同步与关闭说明，导致治理过程不透明。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gh_M    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 20分
  - 痛点原因：Bot未经验证便错误打上resolved标签，且无任何有效评论与用户互动，机械响应指令导致治理失效。
  - 原文依据：
    - `sunhao_hw`：/assign    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunhao_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 20分
  - 痛点原因：Bot仅机械执行打标和关联MR关闭，全程无评论互动，未体现有效的治理沟通与实质性介入。
  - 原文依据：
    - `xufeng12121`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xufeng12121    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 20分
  - 痛点原因：Bot仅静默执行打标和分配，无任何评论互动，缺乏有效反馈机制导致治理效果不佳。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭动作，全程无任何评论互动与状态说明，治理过程缺乏有效反馈。
  - 原文依据：
    - `chengzhi1120`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chengzhi1120    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为0，未提供自动回复或进度同步等有效治理动作。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何解释性评论或有效交互，治理流于形式。
  - 原文依据：
    - `chensi79`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)
- **[#2150](https://gitcode.com/cann/ops-math/issues/2150) [Question|问题咨询]: 编译部署abs算子时，指定--soc=ascend910_93编译后安装报错** — 20分
  - 痛点原因：Bot仅打标但未关闭或评论，实际关闭与解答均由人工完成，Bot未发挥治理作用。
  - 原文依据：
    - `songkai111`：因为该算子，在910_93版本，没有tiling，因此自定义算子包安装会由于缺少tiling so而报错，需要添加--force    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 20分
  - 痛点原因：Bot直接关闭issue却未留下任何解释性评论，导致用户无法获知关闭原因，缺乏沟通透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无任何评论互动，缺乏状态变更通知与修复进度提示，过程透明度低。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，无任何评论互动，缺乏状态同步与流程指引，治理效果流于形式。
  - 原文依据：
    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 35分
  - 痛点原因：Bot仅对重复分配指令做了简单提示，未有效拦截或处理重复操作，治理介入不足。
  - 原文依据：
    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yefeicoding
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 35分
  - 痛点原因：用户重复指派触发Bot机械拦截，且Bot直接为严重hang问题添加resolved标签，治理动作机械粗暴，缺乏有效协同。
  - 原文依据：
    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159
#### PP-05 Bot重复分配失败形成噪音循环（G · Bot/Agent 治理）

- **[#2197](https://gitcode.com/cann/ops-math/issues/2197) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: TensorEqual graph proto 存在 DT_I…** — 0分
  - 痛点原因：Bot仅执行自动关闭，未进行打标与评论引导，治理动作严重缺失导致得分为零。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题确认修复中    - `magicjason0007`：当前算子proto中关于IN16已经修复为INT16；double数据类型预期走aicpu，无问题    - `chensi79`：assigned to @magicjason0007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)    - [关联PR #3976（open）](https://gitcode.com/cann/ops-math/merge_requests/3976)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 15分
  - 痛点原因：Bot重复报错指派失败，且未进行自动打标或关闭等有效治理，仅产生大量无效评论。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2221](https://gitcode.com/cann/ops-math/issues/2221) [Requirement|需求建议]: 迁移 CaseCondition AICPU 算子到 ops-math conversion** — 20分
  - 痛点原因：Bot仅机械执行打标、指派和关闭操作，无任何引导性评论，缺乏有效互动导致治理流于形式。
  - 原文依据：
    - `zhaowenrui666`：/assign [@zhaowenrui666](https://gitcode.com/zhaowenrui666) 关联 PR：https://gitcode.com/cann/ops-math/merge_requests/3703    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaowenrui666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2221    - [关联PR #3703（merged）](https://gitcode.com/cann/ops-math/merge_requests/3703)
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，未向用户解释关联MR合并关闭的原因，缺乏有效沟通。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 20分
  - 痛点原因：Bot仅执行分配、打标和关闭等机械动作，评论数为零，缺乏与用户的有效互动反馈。
  - 原文依据：
    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kangjiaming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 20分
  - 痛点原因：Bot仅自动打标并在关联MR合并后关闭，全程无任何评论向用户解释关闭原因，缺乏透明度。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，未产生任何评论互动，缺乏有效沟通与人工确认。
  - 原文依据：
    - `m0_46386992`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @m0_46386992    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程零评论，未公开说明关闭原因，缺乏与用户的有效沟通。
  - 原文依据：
    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 20分
  - 痛点原因：Bot仅执行打标和关闭动作，未通过评论向用户解释关闭原因，治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2205](https://gitcode.com/cann/ops-math/issues/2205) [Requirement|需求建议]: [Roadmap] 支持自定义torch接口生成** — 20分
  - 痛点原因：Bot仅执行打标，无评论互动且未自动关闭，最终由人工手动处理，自动化治理介入极低。
  - 原文依据：
    - `zhou-qilong`：ops-math仓暂时不需要提供这个能力    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @zhou-qilong    - `zhou-qilong`：closed from codehub    - `zhou-qilong`：changed custom state from 进行中 to 已完成
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作且无任何评论，导致治理过程不透明，缺乏有效反馈。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 20分
  - 痛点原因：Bot仅机械执行打标与分配操作，未产生任何评论与用户沟通，治理过程缺乏透明度。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，评论数为零，缺乏有效沟通与治理反馈。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)
- **[#2200](https://gitcode.com/cann/ops-math/issues/2200) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 API include 路径存在双斜…** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为0，未提供任何自动回复或进度同步，缺乏与用户的有效交互。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2200    - [关联PR #3970（merged）](https://gitcode.com/cann/ops-math/merge_requests/3970)
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，但评论数为0，未与用户进行有效沟通或状态同步，治理闭环缺失。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，未发表任何评论说明原因或引导用户，缺乏有效沟通。
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 20分
  - 痛点原因：Bot将未解决的缺陷误打resolved标签并关闭，且无任何有效评论，属于机械且无效的误治理。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，无任何互动评论，治理流于形式。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 20分
  - 痛点原因：Bot仅机械打标并在PR合并后关闭，无任何解释性评论，缺乏有效交互与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2190](https://gitcode.com/cann/ops-math/issues/2190) [Requirement|需求建议]: 【社区任务】新增 experimental Gcd Ascend C 算子** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，未产生任何评论与用户互动，缺乏有效反馈导致治理效果不佳。
  - 原文依据：
    - `Morikunn`：关联源码 MR：https://gitcode.com/cann/ops-math/merge_requests/3947    - `chensi79`：/assign [@Morikunn](https://gitcode.com/Morikunn)    - `Morikunn`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Morikunn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2190
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，全程无任何评论与用户互动，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何评论与用户沟通，缺乏有效交互。
  - 原文依据：
    - `doufloat`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)
- **[#2187](https://gitcode.com/cann/ops-math/issues/2187) [Requirement|需求建议]: 新增 TopK、CalcBucketsLimitAndOffset、CompareAndBitPack 三个 AICP…** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭动作，全程无任何交互评论，缺乏对用户的解释与引导。
  - 原文依据：
    - `sujunwei3`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sujunwei3    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2187    - [关联PR #3724（merged）](https://gitcode.com/cann/ops-math/merge_requests/3724)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未通过评论说明关闭原因及关联PR，缺乏对用户的有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 20分
  - 痛点原因：Bot自动分配后遭人工取消且无评论说明，治理动作未闭环。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2181](https://gitcode.com/cann/ops-math/issues/2181) [Bug-Report|缺陷反馈]:** — 20分
  - 痛点原因：Bot仅完成打标，未识别空issue并自动关闭或评论，实际治理动作完全依赖人工。
  - 原文依据：
    - `sunchun`：您好，您提出的issue是一个空issue，我们计划关闭次issue，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无评论反馈，未对状态变更及关联PR合并提供任何说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未发布任何评论说明关闭原因及关联PR，缺乏对用户的有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 20分
  - 痛点原因：Bot仅执行机械的打标和指派操作，未产生任何评论，缺乏有效沟通与引导，治理过程流于形式。
  - 原文依据：
    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 20分
  - 痛点原因：Bot仅执行打标和自动关闭动作，全程无评论同步状态或说明原因，导致治理过程不透明且缺乏有效反馈。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 20分
  - 痛点原因：Bot仅机械执行打标与关联关闭，全程无任何评论互动，缺乏有效沟通导致治理失效。
  - 原文依据：
    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @biabu111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)
- **[#2173](https://gitcode.com/cann/ops-math/issues/2173) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 20分
  - 痛点原因：Bot仅执行打标与关闭等机械操作，评论数为0，缺乏有效互动与状态同步导致治理效果不佳。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2173    - [关联PR #3882（merged）](https://gitcode.com/cann/ops-math/merge_requests/3882)
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 20分
  - 痛点原因：Bot直接打标关闭但全程无评论沟通，人工反复指派与取消指派，缺乏有效交互与闭环验证。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)
- **[#2170](https://gitcode.com/cann/ops-math/issues/2170) [Bug-Report|缺陷反馈]: build.sh 中所有 --*_test 选项在帮助文本中列出但实际执行报 "Invalid option" 错误** — 20分
  - 痛点原因：Bot在缺陷尚未修复时即过早打标resolved并关闭，且无任何有效评论，治理失效。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。UT测试实际应该是 -u 系列，--ophost_test --opapi_test 等为旧版本残留代码，已安排相关人员修复    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `Joe66693`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2170
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 20分
  - 痛点原因：Bot仅机械打标并在PR合并后自动关闭，全程无评论互动，缺乏状态同步与有效沟通，治理过程不透明。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 20分
  - 痛点原因：Bot仅机械打标并随关联PR合并自动关闭，全程零评论互动，缺乏进度同步与用户沟通，治理流于形式。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2165](https://gitcode.com/cann/ops-math/issues/2165) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未输出任何评论进行状态同步与交互说明，治理过程缺乏透明度。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2165    - [关联PR #3674（merged）](https://gitcode.com/cann/ops-math/merge_requests/3674)
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 20分
  - 痛点原因：Bot仅机械打标和关联关闭，无任何评论互动，缺乏对用户的有效反馈与引导。
  - 原文依据：
    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 20分
  - 痛点原因：Bot仅机械执行分配、打标和关闭操作，全程无任何评论与用户交互，缺乏进度同步与关闭说明，导致治理过程不透明。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gh_M    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 20分
  - 痛点原因：Bot未经验证便错误打上resolved标签，且无任何有效评论与用户互动，机械响应指令导致治理失效。
  - 原文依据：
    - `sunhao_hw`：/assign    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunhao_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 20分
  - 痛点原因：Bot仅机械执行打标和关联MR关闭，全程无评论互动，未体现有效的治理沟通与实质性介入。
  - 原文依据：
    - `xufeng12121`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xufeng12121    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 20分
  - 痛点原因：Bot仅静默执行打标和分配，无任何评论互动，缺乏有效反馈机制导致治理效果不佳。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭动作，全程无任何评论互动与状态说明，治理过程缺乏有效反馈。
  - 原文依据：
    - `chengzhi1120`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chengzhi1120    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为0，未提供自动回复或进度同步等有效治理动作。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何解释性评论或有效交互，治理流于形式。
  - 原文依据：
    - `chensi79`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)
- **[#2150](https://gitcode.com/cann/ops-math/issues/2150) [Question|问题咨询]: 编译部署abs算子时，指定--soc=ascend910_93编译后安装报错** — 20分
  - 痛点原因：Bot仅打标但未关闭或评论，实际关闭与解答均由人工完成，Bot未发挥治理作用。
  - 原文依据：
    - `songkai111`：因为该算子，在910_93版本，没有tiling，因此自定义算子包安装会由于缺少tiling so而报错，需要添加--force    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 20分
  - 痛点原因：Bot直接关闭issue却未留下任何解释性评论，导致用户无法获知关闭原因，缺乏沟通透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，全程无任何评论互动，缺乏状态变更通知与修复进度提示，过程透明度低。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，无任何评论互动，缺乏状态同步与流程指引，治理效果流于形式。
  - 原文依据：
    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 35分
  - 痛点原因：Bot仅对重复分配指令做了简单提示，未有效拦截或处理重复操作，治理介入不足。
  - 原文依据：
    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yefeicoding
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 35分
  - 痛点原因：用户重复指派触发Bot机械拦截，且Bot直接为严重hang问题添加resolved标签，治理动作机械粗暴，缺乏有效协同。
  - 原文依据：
    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159
#### PP-06 Roadmap类Issue首次响应超72小时（I1 · 分配与首次响应）

- **[#2221](https://gitcode.com/cann/ops-math/issues/2221) [Requirement|需求建议]: 迁移 CaseCondition AICPU 算子到 ops-math conversion** — 0分
  - 痛点原因：仅有机器人自动指派和关联PR，全程无人工对需求进行实质性回应。
  - 原文依据：
    - `zhaowenrui666`：/assign [@zhaowenrui666](https://gitcode.com/zhaowenrui666) 关联 PR：https://gitcode.com/cann/ops-math/merge_requests/3703    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaowenrui666    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2221    - [关联PR #3703（merged）](https://gitcode.com/cann/ops-math/merge_requests/3703)
- **[#2220](https://gitcode.com/cann/ops-math/issues/2220) [Requirement|需求建议]: CANNBot项目AdvanceStep算子新增支持A5** — 0分
  - 痛点原因：耗时超45小时仅完成人员指派，全程未提供任何实质性技术解答或处理进展。
  - 原文依据：
    - `songkai111`：assigned to @Almost_CANN
- **[#2219](https://gitcode.com/cann/ops-math/issues/2219) [Bug-Report|缺陷反馈]: grouped_bias_add_grad算子存在精度问题** — 0分
  - 痛点原因：维护者仅打标签分配负责人，机器人直接关联其他issue关闭，全程无人工实质回应。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2219    - [关联PR #3983（merged）](https://gitcode.com/cann/ops-math/merge_requests/3983)    - [关联PR #4001（merged）](https://gitcode.com/cann/ops-math/merge_requests/4001)
- **[#2218](https://gitcode.com/cann/ops-math/issues/2218) [Documentation|文档反馈][CANN SUMMER CAMPS 2026][NPU]: Sqrt arch35 tiling UT 文件头注释仍…** — 0分
  - 痛点原因：虽已指派负责人并关联PR，但超过31小时后仍无任何实质回应。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3998（open）](https://gitcode.com/cann/ops-math/merge_requests/3998)
- **[#2217](https://gitcode.com/cann/ops-math/issues/2217) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CoalesceSparse graph proto 输出名拼…** — 0分
  - 痛点原因：仅完成人员指派与关联PR，超过32小时仍无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3997（open）](https://gitcode.com/cann/ops-math/merge_requests/3997)    - [关联PR #4028（open）](https://gitcode.com/cann/ops-math/merge_requests/4028)
- **[#2216](https://gitcode.com/cann/ops-math/issues/2216) [Requirement|需求建议]: 新增 besseli1e算子** — 0分
  - 痛点原因：全程仅有机器人执行分配和关闭操作，无任何人工实质回应。
  - 原文依据：
    - `chensi79`：/assign [@kangjiaming](https://gitcode.com/kangjiaming)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kangjiaming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2216    - [关联PR #3780（merged）](https://gitcode.com/cann/ops-math/merge_requests/3780)
- **[#2215](https://gitcode.com/cann/ops-math/issues/2215) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 0分
  - 痛点原因：仅打标签和分配人员，后由机器人自动关闭，全程无人工实质回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `gitcode-chenjiao`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2215    - [关联PR #3986（merged）](https://gitcode.com/cann/ops-math/merge_requests/3986)
- **[#2214](https://gitcode.com/cann/ops-math/issues/2214) [Bug-Report|缺陷反馈]: tensor_equal整型场景（非int8）下末端数据存在精度问题** — 0分
  - 痛点原因：仅快速分配处理人，全程无人工实质回应，最终由机器人关联MR合并后直接关闭。
  - 原文依据：
    - `m0_46386992`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @m0_46386992    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2197,issue2214    - [关联PR #3910（merged）](https://gitcode.com/cann/ops-math/merge_requests/3910)
- **[#2213](https://gitcode.com/cann/ops-math/issues/2213) [Bug-Report|缺陷反馈]: 随机数 coalesce场景精度问题** — 0分
  - 痛点原因：仅打标签和分配后由机器人关联MR自动关闭，全程无人工实质回应。
  - 原文依据：
    - `liangtongxue`：add label bug-report    - `cann-robot`：add label resolved    - `liangtongxue`：assigned to @liangtongxue    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2213    - [关联PR #3965（merged）](https://gitcode.com/cann/ops-math/merge_requests/3965)    - [关联PR #3980（merged）](https://gitcode.com/cann/ops-math/merge_requests/3980)
- **[#2212](https://gitcode.com/cann/ops-math/issues/2212) [Requirement|需求建议]: 新增expint算子** — 0分
  - 痛点原因：全程无人工实质技术回应，仅由机器人因关联PR合并自动关闭，导致实质回应缺失。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2212    - [关联PR #3864（merged）](https://gitcode.com/cann/ops-math/merge_requests/3864)
- **[#2211](https://gitcode.com/cann/ops-math/issues/2211) [Requirement|需求建议]: [Roadmap] genop 算子生成工具能力扩展，完善交付件** — 0分
  - 痛点原因：仅指派负责人耗时超72小时，且后续无任何实质回应。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2210](https://gitcode.com/cann/ops-math/issues/2210) [Requirement|需求建议]: [Roadmap] aclnnfallback开源** — 0分
  - 痛点原因：仅指派了负责人，超过72小时仍无任何实质性解答或反馈。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2209](https://gitcode.com/cann/ops-math/issues/2209) [Requirement|需求建议]: [Roadmap] matmul类算子开发系列教程** — 0分
  - 痛点原因：首次响应超72小时且仅包含分配操作，始终未对需求提供任何实质性解答。
  - 原文依据：
    - `songkai111`：assigned to @songkai111    - `songkai111`：assigned to @zhou-qilong    - `songkai111`：unassigned @songkai111
- **[#2208](https://gitcode.com/cann/ops-math/issues/2208) [Requirement|需求建议]: [Roadmap] 算子支持batch一致性** — 0分
  - 痛点原因：首次响应仅分配负责人且耗时超72小时，全程无任何实质性回复。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2207](https://gitcode.com/cann/ops-math/issues/2207) [Requirement|需求建议]: [Roadmap] 算子使用增强日志上报接口** — 0分
  - 痛点原因：首次响应超72小时且仅有分配人员操作，全程无任何实质性回复内容。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2206](https://gitcode.com/cann/ops-math/issues/2206) [Requirement|需求建议]: [Roadmap] 使用tensorapi优化cube相关算子** — 0分
  - 痛点原因：首次响应耗时超72小时且仅有指派操作，缺乏实质性技术或方案解答。
  - 原文依据：
    - `songkai111`：assigned to @zhou-qilong
- **[#2204](https://gitcode.com/cann/ops-math/issues/2204) Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：首次响应耗时超117小时且仅有指派操作，始终无任何实质性内容回应。
  - 原文依据：
    - `sunchun`：/assign [@zhou-qilong](https://gitcode.com/zhou-qilong)    - `cann-robot`：assigned to @zhou-qilong
- **[#2203](https://gitcode.com/cann/ops-math/issues/2203) [Bug-Report|缺陷反馈]: TopkV2算子处理超大尾轴数据是存在OOM问题** — 0分
  - 痛点原因：仅打标签和分配，后由机器人关联MR自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2203    - [关联PR #3960（merged）](https://gitcode.com/cann/ops-math/merge_requests/3960)    - [关联PR #3981（merged）](https://gitcode.com/cann/ops-math/merge_requests/3981)
- **[#2202](https://gitcode.com/cann/ops-math/issues/2202) [Requirement|需求建议]: 支持LeftShift算子TensorFlow框架插件** — 0分
  - 痛点原因：维护者仅认领并打标签，未对需求提供任何技术讨论或实质解答即被关闭。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2202    - [关联PR #3957（merged）](https://gitcode.com/cann/ops-math/merge_requests/3957)
- **[#2201](https://gitcode.com/cann/ops-math/issues/2201) [Bug-Report|缺陷反馈]: fusion pass兼容性问题修复** — 0分
  - 痛点原因：仅由机器人自动打标签并关联PR关闭，全程无人工实质回应。
  - 原文依据：
    - `pengyiming7`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2201    - [关联PR #3908（merged）](https://gitcode.com/cann/ops-math/merge_requests/3908)
- **[#2199](https://gitcode.com/cann/ops-math/issues/2199) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…** — 0分
  - 痛点原因：仅有通用感谢回复和机器人指派失败通知，全程无任何实质性技术解答或处理进展，导致得分为0。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，已安排相关人员修复    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***jia-jianyong***. Please try to assign to the repository members.
- **[#2198](https://gitcode.com/cann/ops-math/issues/2198) [Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: CircularPadGrad arch35 tiling 测…** — 0分
  - 痛点原因：首次回复仅为模板套话，后续直接由机器人关闭并关联PR，全程缺乏人工实质性技术回应。
  - 原文依据：
    - `chensi79`：你好，感谢反馈，问题验证修复中    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2198    - [关联PR #3982（merged）](https://gitcode.com/cann/ops-math/merge_requests/3982)
- **[#2196](https://gitcode.com/cann/ops-math/issues/2196) [Bug-Report|缺陷反馈] [CANN SUMMER CAMPS 2026][NPU]:Sqrt graph proto 的 TensorType 初…** — 0分
  - 痛点原因：仅有7.1小时的首次响应及机器人指派，全程无实质性技术解答。
  - 原文依据：
    - `chensi79`：/assign [@Quirkybrain](https://gitcode.com/Quirkybrain)    - `cann-robot`：assigned to @Quirkybrain    - [关联PR #3966（closed）](https://gitcode.com/cann/ops-math/merge_requests/3966)    - [关联PR #3974（open）](https://gitcode.com/cann/ops-math/merge_requests/3974)
- **[#2195](https://gitcode.com/cann/ops-math/issues/2195) [Bug-Report|缺陷反馈]: SparseBincount算子有tf接口，但golden使用拼接实现** — 0分
  - 痛点原因：仅执行了分派和打标签操作，且被机器人直接标记为已解决，全程无人工对缺陷内容进行实质性解答。
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2195    - [关联PR #3956（merged）](https://gitcode.com/cann/ops-math/merge_requests/3956)
- **[#2194](https://gitcode.com/cann/ops-math/issues/2194) [Bug-Report|缺陷反馈]: sort算子在输入排序轴超大情况下运行超时** — 0分
  - 痛点原因：仅有认领和加标签等机械操作，全程无任何实质性技术回应。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2194    - [关联PR #3946（merged）](https://gitcode.com/cann/ops-math/merge_requests/3946)
- **[#2193](https://gitcode.com/cann/ops-math/issues/2193) [Bug-Report|缺陷反馈]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：耗时15.7小时仅完成打标签和分配负责人，全程无任何实质性解答或处理意见。
  - 原文依据：
    - `Hana77`：add label bug-report    - `chensi79`：assigned to @Hana77
- **[#2192](https://gitcode.com/cann/ops-math/issues/2192) [Bug-Report|缺陷反馈]: 修复real_div支持逻辑** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `jiangjiawei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2192    - [关联PR #3880（merged）](https://gitcode.com/cann/ops-math/merge_requests/3880)    - [关联PR #3953（merged）](https://gitcode.com/cann/ops-math/merge_requests/3953)
- **[#2191](https://gitcode.com/cann/ops-math/issues/2191) [Bug-Report|缺陷反馈]:Sort类算子没有使用新版Err Msg** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人添加标签并在关联PR合并后直接关闭，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2191    - [关联PR #3943（merged）](https://gitcode.com/cann/ops-math/merge_requests/3943)
- **[#2189](https://gitcode.com/cann/ops-math/issues/2189) [Bug-Report|缺陷反馈]: 修改scale算子的broadcast逻辑，该算子有入参axis来控制broadcast起始对齐维度** — 0分
  - 痛点原因：仅有机器人自动响应并随关联PR合并关闭，全程无任何实质性技术回应解答缺陷。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2189    - [关联PR #3774（merged）](https://gitcode.com/cann/ops-math/merge_requests/3774)
- **[#2188](https://gitcode.com/cann/ops-math/issues/2188) [Documentation|文档反馈]: aclnnBitwiseAndTensorOut&aclnnInplaceBitwiseAndTensorOut.…** — 0分
  - 痛点原因：全程无人工实质回复，仅由机器人加标签并在关联PR合并后自动关闭。
  - 原文依据：
    - `doufloat`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2188    - [关联PR #3933（merged）](https://gitcode.com/cann/ops-math/merge_requests/3933)    - [关联PR #3936（merged）](https://gitcode.com/cann/ops-math/merge_requests/3936)
- **[#2187](https://gitcode.com/cann/ops-math/issues/2187) [Requirement|需求建议]: 新增 TopK、CalcBucketsLimitAndOffset、CompareAndBitPack 三个 AICP…** — 0分
  - 痛点原因：全程仅有机器人自动分配和关联关闭操作，无任何人工针对需求内容的实质性回复。
  - 原文依据：
    - `sujunwei3`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sujunwei3    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2187    - [关联PR #3724（merged）](https://gitcode.com/cann/ops-math/merge_requests/3724)
- **[#2186](https://gitcode.com/cann/ops-math/issues/2186) [Bug-Report|缺陷反馈]: stateless_drop_out_gen_mask在offset不提供时，offsetElemCount应当默认为0** — 0分
  - 痛点原因：全程无人工实质技术回应，仅由机器人打标签并在关联PR合并后直接关闭，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2186    - [关联PR #3875（merged）](https://gitcode.com/cann/ops-math/merge_requests/3875)    - [关联PR #3939（merged）](https://gitcode.com/cann/ops-math/merge_requests/3939)
- **[#2183](https://gitcode.com/cann/ops-math/issues/2183) [Requirement|需求建议]: ViewCopy算子AscendC实现贡献** — 0分
  - 痛点原因：全程仅有机器人分配及取消分配操作，缺乏人工对需求内容的实质性回复。
  - 原文依据：
    - `hehe7758511`：/assign [@hehe7758511](https://gitcode.com/hehe7758511)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511    - `chensi79`：assigned to @hehe7758511    - `chensi79`：unassigned @hehe7758511
- **[#2182](https://gitcode.com/cann/ops-math/issues/2182) feat(conversion): add experimental as_strided operator** — 0分
  - 痛点原因：该 issue 被直接从 codehub 关闭，全程未提供任何首次响应与实质回应。
  - 原文依据：
    - `Mars_Cheng_cys`：closed from codehub
- **[#2180](https://gitcode.com/cann/ops-math/issues/2180) [Requirement|需求建议]: AsStrided算子AscendC实现贡献** — 0分
  - 痛点原因：仅有机器人分配记录，维护者始终未对该需求进行任何实质性的文字回复或反馈。
  - 原文依据：
    - `Mars_Cheng_cys`：/assign [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @Mars_Cheng_cys    - [关联PR #3915（closed）](https://gitcode.com/cann/ops-math/merge_requests/3915)    - [关联PR #3916（merged）](https://gitcode.com/cann/ops-math/merge_requests/3916)
- **[#2179](https://gitcode.com/cann/ops-math/issues/2179) [Requirement|需求建议]: feeds_repeat cannbot兼容性交付** — 0分
  - 痛点原因：仅机器人自动打标签并随PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2179    - [关联PR #3906（merged）](https://gitcode.com/cann/ops-math/merge_requests/3906)
- **[#2178](https://gitcode.com/cann/ops-math/issues/2178) MaskedSelectV3存在Vector操作未同步的问题** — 0分
  - 痛点原因：仅机器人自动打标签并关闭，虽有关联PR合并记录，但全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2178    - [关联PR #3902（merged）](https://gitcode.com/cann/ops-math/merge_requests/3902)    - [关联PR #3904（merged）](https://gitcode.com/cann/ops-math/merge_requests/3904)
- **[#2177](https://gitcode.com/cann/ops-math/issues/2177) [Bug-Report|缺陷反馈]: polar存在精度问题** — 0分
  - 痛点原因：维护者仅执行分配和打标签操作，随后被机器人直接标记为已解决，全程无任何针对缺陷的实质性技术回应。
  - 原文依据：
    - `xiu_ling_wang`：/assign [@xiu_ling_wang](https://gitcode.com/xiu_ling_wang)    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiu_ling_wang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2177    - [关联PR #3901（merged）](https://gitcode.com/cann/ops-math/merge_requests/3901)
- **[#2176](https://gitcode.com/cann/ops-math/issues/2176) [Requirement|需求建议]: Cosh算子精度提升** — 0分
  - 痛点原因：首次响应仅打标签，全程无人工实质回应，最终被机器人关联PR自动关闭。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2176    - [关联PR #3765（merged）](https://gitcode.com/cann/ops-math/merge_requests/3765)
- **[#2175](https://gitcode.com/cann/ops-math/issues/2175) DropOutV3FusionPass等兼容性适配** — 0分
  - 痛点原因：首次响应仅分配任务，后续由机器人自动关闭，全程无实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@biabu111](https://gitcode.com/biabu111)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @biabu111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2175    - [关联PR #3770（merged）](https://gitcode.com/cann/ops-math/merge_requests/3770)    - [关联PR #3907（merged）](https://gitcode.com/cann/ops-math/merge_requests/3907)
- **[#2174](https://gitcode.com/cann/ops-math/issues/2174) [Requirement|需求建议]: 随机数算子兼容A2\A3** — 0分
  - 痛点原因：维护者仅分配任务和添加标签，全程未对需求内容进行实质性回复。
  - 原文依据：
    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `sikaiwei`：add label requirement    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2174
- **[#2173](https://gitcode.com/cann/ops-math/issues/2173) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：全程仅由机器人自动分配和关联关闭，无任何人工实质回应。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2173    - [关联PR #3882（merged）](https://gitcode.com/cann/ops-math/merge_requests/3882)
- **[#2172](https://gitcode.com/cann/ops-math/issues/2172) [Bug-Report|缺陷反馈]: aclnnTopKTopPSampleV2 精度问题解决** — 0分
  - 痛点原因：维护者仅添加标签并从 codehub 关闭了 issue，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `sunchun`：closed from codehub
- **[#2171](https://gitcode.com/cann/ops-math/issues/2171) [Requirement|需求建议]: TensorMove算子AscendC实现贡献** — 0分
  - 痛点原因：全程仅有机器人打标签和人员分配操作，未提供任何实质性的技术或业务沟通回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chensi79`：assigned to @qq_61939128    - `chensi79`：unassigned @qq_61939128    - `chensi79`：assigned to @qq_61939128    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2171    - [关联PR #3892（merged）](https://gitcode.com/cann/ops-math/merge_requests/3892)
- **[#2169](https://gitcode.com/cann/ops-math/issues/2169) [Bug-Report|缺陷反馈]: truancate_div在pytorch调用时产生coredump** — 0分
  - 痛点原因：维护者仅执行指派和加标签操作，未针对该缺陷提供任何技术排查或解答，导致无实质回应。
  - 原文依据：
    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `chensi79`：/assign [@yefeicoding](https://gitcode.com/yefeicoding)    - `cann-robot`：### Notice This issue is already assigned to ***yefeicoding***. Please do not assign repeatedly.    - `yefeicoding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yefeicoding
- **[#2168](https://gitcode.com/cann/ops-math/issues/2168) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改③有一些link失效** — 0分
  - 痛点原因：全程仅打标签和机器人关闭，无任何人工实质技术回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2168    - [关联PR #3874（merged）](https://gitcode.com/cann/ops-math/merge_requests/3874)    - [关联PR #3885（merged）](https://gitcode.com/cann/ops-math/merge_requests/3885)    - [关联PR #3914（merged）](https://gitcode.com/cann/ops-math/merge_requests/3914)
- **[#2166](https://gitcode.com/cann/ops-math/issues/2166) [Bug-Report|缺陷反馈]: aclnnAmpUpdateScale tiling增加校验** — 0分
  - 痛点原因：全程仅由机器人加标签并关联PR关闭，维护者未提供任何人工实质回应。
  - 原文依据：
    - `sunchun`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2166    - [关联PR #3824（merged）](https://gitcode.com/cann/ops-math/merge_requests/3824)    - [关联PR #3867（merged）](https://gitcode.com/cann/ops-math/merge_requests/3867)
- **[#2165](https://gitcode.com/cann/ops-math/issues/2165) [Bug-Report|缺陷反馈]: 非连续场景下concat算子部分模板偏移地址计算有误** — 0分
  - 痛点原因：全程仅机器人自动分配与关闭，开发者仅用assign命令，无任何人工实质回应。
  - 原文依据：
    - `wuchengming123`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wuchengming123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2165    - [关联PR #3674（merged）](https://gitcode.com/cann/ops-math/merge_requests/3674)
- **[#2164](https://gitcode.com/cann/ops-math/issues/2164) [Bug-Report|缺陷反馈]: 全核同步分支应该设置batchmode模式** — 0分
  - 痛点原因：全程仅打标签和分配，无任何实质性文字回应，最终由机器人关联合并请求直接关闭。
  - 原文依据：
    - `zhu-xun`：add label bug-report    - `cann-robot`：add label resolved    - `zhu-xun`：assigned to @zhu-xun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2164    - [关联PR #3799（merged）](https://gitcode.com/cann/ops-math/merge_requests/3799)
- **[#2163](https://gitcode.com/cann/ops-math/issues/2163) [Bug-Report|缺陷反馈]: StatelessTruncatedNormalV2算子当alg为0时，与1971表现不一致** — 0分
  - 痛点原因：仅机器人自动分配和打标签，无任何人工技术回应，且在关联MR合并后直接关闭，全程无实质沟通。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gh_M    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2163    - [关联PR #3840（merged）](https://gitcode.com/cann/ops-math/merge_requests/3840)
- **[#2162](https://gitcode.com/cann/ops-math/issues/2162) [Bug-Report|缺陷反馈]: Normal算子超大shape用例在超32K场景，npu由于升精度到fp32，会提前切分逻辑，导致与竞品比精度失败** — 0分
  - 痛点原因：仅有机器人指派和关联PR操作，未对用户反馈的精度缺陷提供任何实质性文字回复。
  - 原文依据：
    - `gh_M`：/assign    - `cann-robot`：assigned to @gh_M    - [关联PR #3857（merged）](https://gitcode.com/cann/ops-math/merge_requests/3857)    - [关联PR #3868（closed）](https://gitcode.com/cann/ops-math/merge_requests/3868)    - [关联PR #3950（closed）](https://gitcode.com/cann/ops-math/merge_requests/3950)    - [关联PR #4005（merged）](https://gitcode.com/cann/ops-math/merge_requests/4005)
- **[#2161](https://gitcode.com/cann/ops-math/issues/2161) [Bug-Report|缺陷反馈]: aclnnReplicationPad1dBackward在padding过大时会507035** — 0分
  - 痛点原因：维护者仅执行分配和打标签操作，机器人自动标记已解决，全程无任何实质性技术回应。
  - 原文依据：
    - `sunhao_hw`：/assign    - `sunhao_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunhao_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2161    - [关联PR #3834（merged）](https://gitcode.com/cann/ops-math/merge_requests/3834)
- **[#2159](https://gitcode.com/cann/ops-math/issues/2159) [sinkhorn] 流水冒险致大shape多核下kernel hang(error 507034)** — 0分
  - 痛点原因：首次响应仅执行了 assign 操作，11.24 小时内无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `chensi79`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue is already assigned to ***chenxingyu18***. Please do not assign repeatedly.    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2159
- **[#2158](https://gitcode.com/cann/ops-math/issues/2158) [Bug-Report|缺陷反馈]: 编译告警整改** — 0分
  - 痛点原因：仅机器人自动分配和关联MR关闭，全程无人工实质性回应。
  - 原文依据：
    - `xufeng12121`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xufeng12121    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2158    - [关联PR #3849（merged）](https://gitcode.com/cann/ops-math/merge_requests/3849)
- **[#2157](https://gitcode.com/cann/ops-math/issues/2157) [Requirement|需求建议]: SoftmaxCrossEntropyWithLogits算子AscendC实现贡献** — 0分
  - 痛点原因：仅触发机器人自动分配，始终未提供任何实质性的人工内容回应。
  - 原文依据：
    - `OVO1234`：/assign [@OVO1234](https://gitcode.com/OVO1234)    - `cann-robot`：assigned to @OVO1234
- **[#2156](https://gitcode.com/cann/ops-math/issues/2156) [Requirement|需求建议]: InplaceRsqrt 新增整型数据类型支持** — 0分
  - 痛点原因：仅有指派任务的机械响应，全程无任何实质性的技术解答或方案沟通。
  - 原文依据：
    - `chensi79`：/assign [@Nice_try](https://gitcode.com/Nice_try)    - `cann-robot`：assigned to @Nice_try    - [关联PR #3845（closed）](https://gitcode.com/cann/ops-math/merge_requests/3845)    - [关联PR #3863（merged）](https://gitcode.com/cann/ops-math/merge_requests/3863)
- **[#2155](https://gitcode.com/cann/ops-math/issues/2155) [Requirement|需求建议]: KthValue性能优化** — 0分
  - 痛点原因：仅进行了认领和打标签操作，随后被机器人标记解决，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `ConanHuang`：/assign    - `ConanHuang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ConanHuang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2155    - [关联PR #3804（merged）](https://gitcode.com/cann/ops-math/merge_requests/3804)
- **[#2154](https://gitcode.com/cann/ops-math/issues/2154) 整改view_copy超大函数，超大圈复杂度cleancode问题** — 0分
  - 痛点原因：全程无人工实质回应，仅机器人执行分配与关联关闭操作。
  - 原文依据：
    - `chengzhi1120`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chengzhi1120    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2154    - [关联PR #3838（merged）](https://gitcode.com/cann/ops-math/merge_requests/3838)
- **[#2153](https://gitcode.com/cann/ops-math/issues/2153) [Requirement|需求建议]: optimize histogram_v2 SIMT key117 performance** — 0分
  - 痛点原因：仅有分配人员和加标签的流程操作，全程未提供任何技术分析或需求确认的实质回复。
  - 原文依据：
    - `chensi79`：/assign [@wangxun21](https://gitcode.com/wangxun21)    - `wangxun21`：add label requirement    - `cann-robot`：assigned to @wangxun21    - [关联PR #3836（open）](https://gitcode.com/cann/ops-math/merge_requests/3836)
- **[#2152](https://gitcode.com/cann/ops-math/issues/2152) [Documentation|文档反馈]: aclnnStridedSliceAssignV2、aclnnSilentCheckV2函数原型和参数列表存在不一…** — 0分
  - 痛点原因：首次响应仅为流程性客套，后续直接由机器人关闭，全程未提供任何实质性技术解答。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题修复中    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2152    - [关联PR #3859（merged）](https://gitcode.com/cann/ops-math/merge_requests/3859)    - [关联PR #3884（merged）](https://gitcode.com/cann/ops-math/merge_requests/3884)
- **[#2151](https://gitcode.com/cann/ops-math/issues/2151) [Requirement|需求建议]: space_to_batch_nd ascend950实现** — 0分
  - 痛点原因：首次响应仅分配任务和加标签，无任何实质性技术解答，且被机器人误加resolved标签。
  - 原文依据：
    - `chensi79`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2151    - [关联PR #3402（merged）](https://gitcode.com/cann/ops-math/merge_requests/3402)
- **[#2149](https://gitcode.com/cann/ops-math/issues/2149) 修复pre-commit的oat检查无告警却失败问题** — 0分
  - 痛点原因：仅机器人自动加标签并随PR合并关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2149    - [关联PR #3826（merged）](https://gitcode.com/cann/ops-math/merge_requests/3826)
- **[#2148](https://gitcode.com/cann/ops-math/issues/2148) [Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期** — 0分
  - 痛点原因：首次响应仅打标签，随后机器人直接关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `xiu_ling_wang`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2148    - [关联PR #3816（merged）](https://gitcode.com/cann/ops-math/merge_requests/3816)    - [关联PR #3825（merged）](https://gitcode.com/cann/ops-math/merge_requests/3825)
- **[#2147](https://gitcode.com/cann/ops-math/issues/2147) [Bug-Report|缺陷反馈]: BatchToSpaceND 等算子代码格式与门禁要求不符** — 0分
  - 痛点原因：首次响应仅指派和加标签，随后被机器人直接标记resolved，全程无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@zhanw_coding](https://gitcode.com/zhanw_coding)    - `zhanw_coding`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhanw_coding    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2147    - [关联PR #3822（merged）](https://gitcode.com/cann/ops-math/merge_requests/3822)
- **[#2146](https://gitcode.com/cann/ops-math/issues/2146) [Bug-Report|缺陷反馈]: ViewCopy 算子 SIMD kernel 中 copyDstStride 类型下溢导致 DDR 地址越界** — 0分
  - 痛点原因：维护者仅添加标签并指派任务，随后直接合并关联PR关闭issue，全程无任何实质性文字回应。
  - 原文依据：
    - `StoneChan_`：add label bug-report    - `StoneChan_`：assigned to @StoneChan_    - `StoneChan_`：closed from codehub    - [关联PR #3803（merged）](https://gitcode.com/cann/ops-math/merge_requests/3803)    - [关联PR #3814（merged）](https://gitcode.com/cann/ops-math/merge_requests/3814)    - [关联PR #3828（closed）](https://gitcode.com/cann/ops-math/merge_requests/3828)

## 5. 本周行动清单

### REC-01 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue创建时 |
| 具体动作 | 配置自动标签bot，根据标题前缀自动打标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 90 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 13.1，低分 65/75；OBJ_RESPONSE_SPEED：均值 78.4，低分 11/75 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 13.1，低分 65/75 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 78.4，低分 11/75 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 作者自分配且PR assigner明确，责任归属清晰无歧义。 | 明确责任人、候选负责人和下一步动作 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | Assignee；候选负责人 `chensi79` |
| 触发条件 | Issue指派后48小时 |
| 具体动作 | 在Issue中回复技术方案概要或下一步计划 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；平均评论数提升至 2.5 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.4，低分 69/75；OBJ_RESULT_FORMATION_TIMELINESS：均值 72.0，低分 20/75 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 72.0，低分 20/75 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.4，低分 69/75 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 任务型issue无传统讨论，但PR创建、关联、合并流程推进清晰有效。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 要求关闭评论包含解决方案摘要和关联PR/commit链接 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 50 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 7.9，低分 74/75；OBJ_DECISION_TRANSPARENCY：均值 48.7，低分 44/75 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 7.9，低分 74/75 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 48.7，低分 44/75 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **77.8/100**，整体相对可控，但仍需关注：轻度痛点：存在空模板提交和信息不全的Issue，但整体创建质量尚可。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 89.4 | 内部贡献，内容真实有效，有明确设计方案和关联PR，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 66.3 | 结构化章节完整，含背景、设计方案、约束，关联PR，作为需求类issue信息充分。 |

代表低分 Issue：[#2181](https://gitcode.com/cann/ops-math/issues/2181)
问题：[Bug-Report|缺陷反馈]:。

### I1 · 分配与首次响应

本阶段分数为 **56.4/100**，本阶段需要改进，主要问题是：Open Issue无标签无有效分流。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 13.1 | 均值 13.1，低分 65/75 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 78.4 | 均值 78.4，低分 11/75 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 74.3 | 作者自分配且PR assigner明确，责任归属清晰无歧义。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 70.3 | 作者自分配后bot执行assign，PR创建并合并，issue进入正确处理路径。 |

代表低分 Issue：[#2208](https://gitcode.com/cann/ops-math/issues/2208)
问题：[Requirement|需求建议]: [Roadmap] 算子支持batch一致性。

### I2 · 讨论与解决

本阶段分数为 **54.4/100**，本阶段需要改进，主要问题是：大量Issue零评论无技术讨论。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 72.0 | 均值 72.0，低分 20/75 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 28.4 | 均值 28.4，低分 69/75 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 51.4 | 任务型issue无传统讨论，但PR创建、关联、合并流程推进清晰有效。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 69.8 | 迁移目标通过PR合并完全达成，resolved标签确认闭环。 |

代表低分 Issue：[#2220](https://gitcode.com/cann/ops-math/issues/2220)
问题：[Requirement|需求建议]: CANNBot项目AdvanceStep算子新增支持A5。

### I3 · 总结与关闭

本阶段分数为 **42.2/100**，本阶段需要改进，主要问题是：关闭Issue缺乏解决证据和复用价值。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 7.9 | 均值 7.9，低分 74/75 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 48.7 | 均值 48.7，低分 44/75 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.8 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 82.5 | issue仍处于open状态且close_reason为进行中，无过早关闭风险 |

代表低分 Issue：[#2148](https://gitcode.com/cann/ops-math/issues/2148)
问题：[Bug-Report|缺陷反馈]: A5 polar算子性能达不到预期。

### G · Bot/Agent 治理

本阶段分数为 **66.0/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 32.9 | 均值 32.9，低分 51/75 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.4 | 均值 94.4，低分 0/75 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 70.7 | bot assign后作者创建PR并推进至合并，人工与自动化衔接顺畅。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 66.7 | bot在MR合并时自动关闭issue并添加resolved标签，流程自动化有效 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 71.6 | 无bot介入，给中性分 |

代表低分 Issue：[#2199](https://gitcode.com/cann/ops-math/issues/2199)
问题：[Bug-Report|缺陷反馈][CANN SUMMER CAMPS 2026][NPU]: DropOutV3 图模式 p Tensor 缺少 [0,1]…。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 75 | 45.0 | 首期基线 | 77.8 | 56.4 | 54.4 | 42.2 | 66.0 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：87.4/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-07-06_to_2026-07-12.json`。
