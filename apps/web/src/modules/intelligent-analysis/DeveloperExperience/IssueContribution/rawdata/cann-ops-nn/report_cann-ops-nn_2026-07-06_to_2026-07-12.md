# Issue 贡献体验周报 · cann/ops-nn

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-nn` 共收到 **188** 个 Issue
+ 其中外部 Issue **43** 个、内部 **145** 个；I1–I3 及 G 基于「外部且成熟」的 **43** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 50 / Closed 138**，关闭率 **73.4%**。
+ 总体体验分为 **41.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 37.7 | Issue响应后停滞无进展 |
| P0 | I2 · 讨论与解决 | 41.2 | 讨论停滞于模板确认无实质推进 |
| P1 | I1 · 分配与首次响应 | 59.1 | 首次响应模板化无实质内容 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 要求assignee提供初步技术判断或排查计划 |
| REC-02 | P0 | 自动触发进度催办通知，要求assignee更新状态或提供排查进展 |
| REC-03 | P0 | 强制填写解决方案摘要模板，包含根因分析、修复commit引用和复用建议 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 188 |
| Open / Closed | 50 / 138 |
| 关闭率 | 73.4% |
| 类型构成 | 缺陷 95 / 需求 48 / 咨询 2 / 其他 43 |
| 总体体验分 | 41.5/100（D） |
| 首次响应时间 | 中位 0.5h；均值 11.6h |
| 关闭周期 | 中位 17.3h；均值 2.3天 |
| 7天响应率 | 91.5% |
| 评论数/Issue | 0.71 |
| 标签覆盖率 | 82.4% |
| 指派覆盖率 | 92.0% |
| 数据完整性 | 89.3/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.8 | 12/188（6.4%） | 相对可控 | `SUB_INPUT_QUALITY` 68.7 |
| I1 · 分配与首次响应 | 59.1 | 16/43（37.2%） | 需改进 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 39.1 |
| I2 · 讨论与解决 | 41.2 | 29/43（67.4%） | P0 | `OBJ_SOLUTION_EVIDENCE` 22.4 |
| I3 · 总结与关闭 | 37.7 | 34/43（79.1%） | P0 | `OBJ_CLOSURE_REUSE` 7.8 |
| G · Bot/Agent 治理（参考） | 63.4 | 17/43（39.5%） | 参考项 | `OBJ_BOT_GOVERNANCE` 36.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 讨论停滞于模板确认无实质推进 | OBJ_SOLUTION_EVIDENCE：均值 22.4，低分 39/43；OBJ_RESULT_FORMATION_TIMELINESS：均值 54.9，低分 17/43 | 用户问题悬而未决，社区协作效率极低，高质量Issue长期停滞。 |
| PP-02 | P0 | I3 · 总结与关闭 | Issue响应后停滞无进展 | OBJ_CLOSURE_REUSE：均值 7.8，低分 43/43；OBJ_DECISION_TRANSPARENCY：均值 37.3，低分 36/43 | 用户投入的技术分析被搁置，问题悬而未决，社区资源浪费在无效跟踪上。 |
| PP-03 | P0 | I3 · 总结与关闭 | 缺乏解决方案证据与知识沉淀 | OBJ_CLOSURE_REUSE：均值 7.8，低分 43/43；OBJ_DECISION_TRANSPARENCY：均值 37.3，低分 36/43 | 同类问题无法复用已有经验，社区知识库空白，新贡献者无法从历史Issue中学习。 |
| PP-04 | P0 | G · Bot/Agent 治理 | Bot误关闭率高达19.7% | OBJ_BOT_GOVERNANCE：均值 36.0，低分 25/43；OBJ_BOT_MISCLOSE_REVERSE：均值 97.7，低分 0/43 | 大量Issue可能被错误关闭，用户问题悬而未决，社区信任度下降。 |
| PP-05 | P1 | I2 · 讨论与解决 | 解决方案证据与结果形成完全缺失 | OBJ_SOLUTION_EVIDENCE：均值 22.4，低分 39/43；OBJ_RESULT_FORMATION_TIMELINESS：均值 54.9，低分 17/43 | 讨论无法转化为可复用的知识资产，用户无法获得明确结论，Issue价值流失。 |
| PP-06 | P1 | I3 · 总结与关闭 | 决策透明度不足状态不透明 | OBJ_CLOSURE_REUSE：均值 7.8，低分 43/43；OBJ_DECISION_TRANSPARENCY：均值 37.3，低分 36/43 | 用户对社区处理意愿和能力产生疑虑，重复提交同类问题增加维护负担。 |
| PP-07 | P1 | I1 · 分配与首次响应 | 首次响应模板化无实质内容 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 39.1，低分 27/43；OBJ_RESPONSE_SPEED：均值 72.1，低分 7/43 | 用户深度技术贡献被忽视，问题停滞无进展，13天无后续活动 |
| PP-08 | P1 | G · Bot/Agent 治理 | Bot治理缺位率25% | OBJ_BOT_GOVERNANCE：均值 36.0，低分 25/43；OBJ_BOT_MISCLOSE_REVERSE：均值 97.7，低分 0/43 | 部分Issue缺乏自动化分流和标签管理，响应延迟且治理覆盖存在盲区。 |
| PP-09 | P2 | I2 · 讨论与解决 | 高质量技术贡献未获跟进与回应 | OBJ_SOLUTION_EVIDENCE：均值 22.4，低分 39/43；OBJ_RESULT_FORMATION_TIMELINESS：均值 54.9，低分 17/43 | 挫伤高质量贡献者积极性，社区技术深度讨论氛围无法形成。 |
| PP-10 | P2 | I1 · 分配与首次响应 | 部分技术Issue标签缺失分流不完整 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 39.1，低分 27/43；OBJ_RESPONSE_SPEED：均值 72.1，低分 7/43 | 技术Issue可能未到达正确维护者，影响后续处理效率 |
| PP-11 | P2 | I1 · 分配与首次响应 | 响应时间分布严重不均 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 39.1，低分 27/43；OBJ_RESPONSE_SPEED：均值 72.1，低分 7/43 | 约半数Issue获秒级响应(疑似bot/模板)，另一半等待超10小时，体验不一致 |
| PP-12 | P2 | G · Bot/Agent 治理 | Bot介入模板化无实质帮助 | OBJ_BOT_GOVERNANCE：均值 36.0，低分 25/43；OBJ_BOT_MISCLOSE_REVERSE：均值 97.7，低分 0/43 | Bot介入未促进问题解决，仅增加信息噪音，降低用户对自动化治理的信任。 |

### 4.1 低分 Issue 明细

#### PP-01 讨论停滞于模板确认无实质推进（I2 · 讨论与解决）

- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭并打标签，缺乏commit、文档及release等实质性证据，且无人工关闭评论说明。
  - 原文依据：
    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：关闭时未关联PR、commit或文档链接，也无关闭评论说明，仅由codehub直接关闭，缺乏解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：缺乏关联 PR、commit 引用及文档链接等任何可追溯的解决证据，仅由外部系统直接关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：仅由外部平台关闭，未关联 PR、提交记录或文档链接，无任何可追溯的解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：未关联任何PR、commit或文档链接，且关闭时无评论说明，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：仅被直接关闭，无关联PR、commit引用及文档链接等任何解决证据。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭时未关联任何PR、提交记录或文档链接等实质性解决证据，仅由平台直接关闭。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：仅回复已收到并指派负责人，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：未关联任何 PR、commit 或文档链接等解决证据，仅停留在需求评审与指派阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等具体修复说明。
  - 原文依据：
    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论，且缺乏commit或文档等实质性解决证据。
  - 原文依据：
    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved
- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 15分
  - 痛点原因：仅指派负责人并标记跟踪，无关联PR、commit引用及关闭说明，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭系统提示关闭，未关联PR或commit引用，缺乏实质性解决证据，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：缺乏关联PR、commit引用及有效评论等实质性解决证据，仅由系统自动关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭评论从codehub关闭，未关联任何PR、commit或release作为实质性解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在引导参加例会评审和等待反馈阶段，无实际解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在需求收集与等待反馈阶段，未进入实质性开发解决流程。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：该需求仅处于收集与等待反馈阶段，无关联PR、代码提交及版本发布等实质性产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：无关联PR、commit及release引用等实质解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：无关联 PR、commit 及 release 引用，仅停留在需求收集与等待反馈阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：缺乏关联 PR、代码提交及版本发布等实质性解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit和release引用及人工关闭说明，证据链不完整。
  - 原文依据：
    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 15分
  - 痛点原因：关联PR仍为open状态且无commit引用，仅停留在分配跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等实质性证据。
  - 原文依据：
    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #7406（open）](https://gitcode.com/cann/ops-nn/merge_requests/7406)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 23分
  - 痛点原因：仅口头回复并关闭评论，无关联PR、commit或文档等客观修复证据即标记完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 23分
  - 痛点原因：维护者以非本仓职责为由引导提问后直接关闭，未提供任何代码、文档或PR等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 31分
  - 痛点原因：虽有PR合并，但仅由机器人自动关闭，缺乏人工关闭评论及文档链接等解决说明。
  - 原文依据：
    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 31分
  - 痛点原因：关联PR未合并且仅停留在分配评审阶段，缺乏文档、release引用及关闭评论等最终解决证据。
  - 原文依据：
    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 31分
  - 痛点原因：缺乏关联PR和关闭评论等闭环证据，仅停留在分析指派阶段，未提供明确的修复落地证明。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 31分
  - 痛点原因：无关联PR与commit引用，仅提供参考链接且处于等待反馈状态，缺乏实际解决证据。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在需求评审与等待反馈阶段，未提供实质性解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit引用和文档链接，仅靠机器人自动关闭和加标签，无人工确认解决的详细说明。
  - 原文依据：
    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 38分
  - 痛点原因：虽有合并的PR，但无commit和release引用，且评论仅停留在跟踪处理阶段，缺乏最终解决确认，证据链不完整。
  - 原文依据：
    - [关联PR #7185（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7185)    - [关联PR #7191（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7191)    - [关联PR #7193（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7193)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：closed from codehub
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和文档链接等直接解决证据，证据链不够完整。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 38分
  - 痛点原因：缺乏关联PR与commit引用，仅口头说明关闭，未提供实际修复证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 46分
  - 痛点原因：缺乏关联PR与release引用，仅停留在引导例会评审与等待反馈阶段，未进入实质解决。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 46分
  - 痛点原因：关联PR仍为open状态未合并，且无关闭评论与release引用，缺乏有效解决证据。
  - 原文依据：
    - [关联PR #7158（open）](https://gitcode.com/cann/ops-nn/merge_requests/7158)    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 46分
  - 痛点原因：仅口头解释并给出文档链接，未关联修复PR或release引用，且处于等待反馈状态，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
#### PP-02 Issue响应后停滞无进展（I3 · 总结与关闭）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀最终解决方案或资料链接，导致无法被他人复用。
  - 原文依据：
    - `weixin_51153241`：add label question    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无人工关闭说明与方案文档，未留存可复用的排查解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅由机器人自动关闭，无人工关闭说明和方案文档，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：无任何关闭说明、方案文档及复用链接，直接从codehub关闭，无法为后续提供参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：关闭时未提供方案文档、重复主链接及任何关闭说明，仅简单标记关闭，无法为后续提供参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：关闭说明为空，未提供方案文档与重复链接，导致关闭后毫无复用参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：直接从 codehub 关闭，无关闭说明、方案文档及复用链接，导致无任何复用价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：关闭时无文字说明、方案文档及链接沉淀，未留下任何可供后续参考的经验信息。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：关闭时未提供任何方案文档、重复链接及文字说明，仅简单标注来源，毫无复用参考价值。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅留系统关闭语，未提供任何可复用信息。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：关闭时无任何文字说明，缺乏方案文档化与重复链接，未留下可复用信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，分析结论未沉淀为可复用知识，对后续类似问题毫无参考价值。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 0分
  - 痛点原因：关闭说明为0字，未提供任何后续参考或复用指引，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 0分
  - 痛点原因：因用户超时未回复被机器人自动关闭，无人工关闭说明，未明确已有算子能否替代该需求。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 0分
  - 痛点原因：因超时无更新被机器人自动关闭且关闭说明为0字，未沉淀任何需求结论或后续方案链接。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅引导参会并指派处理人，未留下任何可复用的解决过程。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 0分
  - 痛点原因：关闭说明为0字且无重复issue主链接，虽有方案文档但未沉淀有效信息供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 0分
  - 痛点原因：因超时被机器人自动关闭，无人工关闭说明且未关联重复issue链接，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 0分
  - 痛点原因：因14天无更新被机器人自动关闭，关闭说明为0字，未提供实质性原因或后续处理方案，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字，未留下最终评审结果或处理结论，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 0分
  - 痛点原因：仅因超时由机器人自动关闭且关闭说明为零字，未提供后续复用链接或方案文档指引，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 0分
  - 痛点原因：关闭说明为空，仅因超时无反馈被自动关闭，未交代需求最终处理结果或去向，无法供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，关闭说明为0字，且无方案文档与复用链接，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：关闭时无任何文字说明，仅分配人员而无处理结果记录，导致无法复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3910](https://gitcode.com/cann/ops-nn/issues/3910) [Requirement|需求建议]: 【社区任务】MaxUnpool2d算子开发交付（任务编号 04-14）** — 0分
  - 痛点原因：关闭时未留下任何说明文字，且关联PR仍处于open状态，未沉淀有效结论供后续参考。
  - 原文依据：
    - `yolic`：您好，已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `fullt`：已安排审核，请关注PR检视意见    - `yolic`：assigned to @fullt    - [关联PR #7155（open）](https://gitcode.com/cann/ops-nn/merge_requests/7155)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：关闭说明为0字，未记录问题解决过程与方案，导致关闭后无任何经验复用价值。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 0分
  - 痛点原因：关闭说明为0字，未对解答内容进行总结沉淀，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @Chen_HaoWen
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：仅靠机器人因关联MR合并自动关闭，无方案文档化且关闭说明仅7字，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3898    - `harrynospot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与复用链接，未留存任何根因或解决经验供后续参考。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人因关联PR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 0分
  - 痛点原因：关闭时未留下任何说明文字，导致问题解决过程缺失，复用价值极低。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 0分
  - 痛点原因：最终由机器人因超时自动关闭且关闭说明为0字，未沉淀有效解决方案供后续复用。
  - 原文依据：
    - `east_yang`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @east_yang
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 25分
  - 痛点原因：关闭时缺乏方案文档沉淀与重复链接，且关闭说明简略，未提供可供复用的解决方案。
  - 原文依据：
    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 25分
  - 痛点原因：仅由机器人自动关闭并关联MR，缺乏人工总结的方案文档与复用指引，未沉淀有效经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 25分
  - 痛点原因：仅回复正在跟踪处理便关闭，未沉淀实际解答或方案文档，无法供他人复用。
  - 原文依据：
    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yolic`：assigned to @yang-di52
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭时无任何文字说明，仅由系统自动关闭，未留下供社区复用的参考信息。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由代码库自动关闭，无法提供复用参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无重复主链接，未留存关闭原因与复用信息，导致复用价值低。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 30分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明文字，导致其他用户无法了解解决过程与结论。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随关联PR合并自动关闭，缺乏人工总结，导致后续无法获取有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 55分
  - 痛点原因：关闭说明仅69字且仅表示问题已收到，未提供最终解决方案或复用指引。
  - 原文依据：
    - `yolic`：closed from codehub    - `yolic`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：assigned to @zhengyuhao3
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 55分
  - 痛点原因：关闭时仅变更状态并留下通用跟踪回复，未补充具体解决细节或文档更新链接，导致后续复用参考价值不足。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。
#### PP-03 缺乏解决方案证据与知识沉淀（I3 · 总结与关闭）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀最终解决方案或资料链接，导致无法被他人复用。
  - 原文依据：
    - `weixin_51153241`：add label question    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无人工关闭说明与方案文档，未留存可复用的排查解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅由机器人自动关闭，无人工关闭说明和方案文档，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：无任何关闭说明、方案文档及复用链接，直接从codehub关闭，无法为后续提供参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：关闭时未提供方案文档、重复主链接及任何关闭说明，仅简单标记关闭，无法为后续提供参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：关闭说明为空，未提供方案文档与重复链接，导致关闭后毫无复用参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：直接从 codehub 关闭，无关闭说明、方案文档及复用链接，导致无任何复用价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：关闭时无文字说明、方案文档及链接沉淀，未留下任何可供后续参考的经验信息。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：关闭时未提供任何方案文档、重复链接及文字说明，仅简单标注来源，毫无复用参考价值。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅留系统关闭语，未提供任何可复用信息。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：关闭时无任何文字说明，缺乏方案文档化与重复链接，未留下可复用信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，分析结论未沉淀为可复用知识，对后续类似问题毫无参考价值。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 0分
  - 痛点原因：关闭说明为0字，未提供任何后续参考或复用指引，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 0分
  - 痛点原因：因用户超时未回复被机器人自动关闭，无人工关闭说明，未明确已有算子能否替代该需求。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 0分
  - 痛点原因：因超时无更新被机器人自动关闭且关闭说明为0字，未沉淀任何需求结论或后续方案链接。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅引导参会并指派处理人，未留下任何可复用的解决过程。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 0分
  - 痛点原因：关闭说明为0字且无重复issue主链接，虽有方案文档但未沉淀有效信息供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 0分
  - 痛点原因：因超时被机器人自动关闭，无人工关闭说明且未关联重复issue链接，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 0分
  - 痛点原因：因14天无更新被机器人自动关闭，关闭说明为0字，未提供实质性原因或后续处理方案，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字，未留下最终评审结果或处理结论，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 0分
  - 痛点原因：仅因超时由机器人自动关闭且关闭说明为零字，未提供后续复用链接或方案文档指引，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 0分
  - 痛点原因：关闭说明为空，仅因超时无反馈被自动关闭，未交代需求最终处理结果或去向，无法供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，关闭说明为0字，且无方案文档与复用链接，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：关闭时无任何文字说明，仅分配人员而无处理结果记录，导致无法复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3910](https://gitcode.com/cann/ops-nn/issues/3910) [Requirement|需求建议]: 【社区任务】MaxUnpool2d算子开发交付（任务编号 04-14）** — 0分
  - 痛点原因：关闭时未留下任何说明文字，且关联PR仍处于open状态，未沉淀有效结论供后续参考。
  - 原文依据：
    - `yolic`：您好，已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `fullt`：已安排审核，请关注PR检视意见    - `yolic`：assigned to @fullt    - [关联PR #7155（open）](https://gitcode.com/cann/ops-nn/merge_requests/7155)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：关闭说明为0字，未记录问题解决过程与方案，导致关闭后无任何经验复用价值。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 0分
  - 痛点原因：关闭说明为0字，未对解答内容进行总结沉淀，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @Chen_HaoWen
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：仅靠机器人因关联MR合并自动关闭，无方案文档化且关闭说明仅7字，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3898    - `harrynospot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与复用链接，未留存任何根因或解决经验供后续参考。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人因关联PR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 0分
  - 痛点原因：关闭时未留下任何说明文字，导致问题解决过程缺失，复用价值极低。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 0分
  - 痛点原因：最终由机器人因超时自动关闭且关闭说明为0字，未沉淀有效解决方案供后续复用。
  - 原文依据：
    - `east_yang`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @east_yang
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 25分
  - 痛点原因：关闭时缺乏方案文档沉淀与重复链接，且关闭说明简略，未提供可供复用的解决方案。
  - 原文依据：
    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 25分
  - 痛点原因：仅由机器人自动关闭并关联MR，缺乏人工总结的方案文档与复用指引，未沉淀有效经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 25分
  - 痛点原因：仅回复正在跟踪处理便关闭，未沉淀实际解答或方案文档，无法供他人复用。
  - 原文依据：
    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yolic`：assigned to @yang-di52
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭时无任何文字说明，仅由系统自动关闭，未留下供社区复用的参考信息。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由代码库自动关闭，无法提供复用参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无重复主链接，未留存关闭原因与复用信息，导致复用价值低。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 30分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明文字，导致其他用户无法了解解决过程与结论。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随关联PR合并自动关闭，缺乏人工总结，导致后续无法获取有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 55分
  - 痛点原因：关闭说明仅69字且仅表示问题已收到，未提供最终解决方案或复用指引。
  - 原文依据：
    - `yolic`：closed from codehub    - `yolic`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：assigned to @zhengyuhao3
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 55分
  - 痛点原因：关闭时仅变更状态并留下通用跟踪回复，未补充具体解决细节或文档更新链接，导致后续复用参考价值不足。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。
#### PP-04 Bot误关闭率高达19.7%（G · Bot/Agent 治理）

- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：Bot仅发一条催更评论，未执行自动打标和关闭等核心治理动作，自动化治理作用极其有限。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 15分
  - 痛点原因：Bot未执行自动打标与关闭操作，打标及状态流转均依赖人工介入，自动化治理失效。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：Bot仅发出超时关闭警告却未实际执行，且未自动打标，标签全靠人工添加，缺乏实质性自动治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：Bot仅发送一条催收评论，未执行自动打标或关闭等有效治理动作，打标仍依赖人工完成。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 15分
  - 痛点原因：Bot仅发送14天关闭警告但未实际执行关闭，且未进行自动打标，导致治理动作未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：Bot仅机械回复模板索要信息，未执行自动打标或自动关闭等实质性治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：Bot仅发一条催补信息模板，未执行打标或关闭等实际治理动作，标签均由人工添加。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：Bot仅发送一条模板评论，未执行自动打标与超期关闭动作，治理流于形式。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 15分
  - 痛点原因：Bot仅发出单次模板回复，未实际执行自动打标与超时关闭动作，治理流程未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 15分
  - 痛点原因：Bot未能正确执行指派指令，拒绝非成员后又错误指派给该非成员，执行逻辑混乱。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 15分
  - 痛点原因：机器人未执行有效打标与关闭，且在维护者已解答后仍盲目发送模板催促用户提供信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 15分
  - 痛点原因：Bot仅发评论催促反馈，未执行自动打标或关闭等有效治理动作，且人工手动打标，治理失效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `east_yang`：add label wait-feedback    - `yolic`：assigned to @east_yang
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 20分
  - 痛点原因：Bot仅机械打标并在关联PR合并后自动关闭，全程无任何评论说明，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 20分
  - 痛点原因：Bot虽自动打标并关闭了issue，但全程零评论，未向用户说明处理原因，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动且未执行关闭操作，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @sunchun    - `sunchun`：unassigned @sunchun
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 20分
  - 痛点原因：Bot仅机械打标并因MR合并自动关闭，无任何评论交互，缺乏有效沟通与实质性治理。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，未向用户解释操作原因，缺乏互动与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论互动，缺乏对用户的有效反馈与治理引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 20分
  - 痛点原因：Bot仅完成基础打标，无任何评论互动，且未实现自动关闭，缺乏闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 20分
  - 痛点原因：Bot仅静默执行打标与关闭操作，全程无任何评论互动，缺乏状态变更说明导致治理过程不透明。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭操作，未发表任何评论解释关闭原因或同步状态，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未执行自动关闭，核心治理动作依赖人工完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liu-wei    - `liu-wei`：closed from codehub
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 20分
  - 痛点原因：Bot仅机械打标，在人工判定问题不归属本仓后未自动关闭或流转，导致治理流程未闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 35分
  - 痛点原因：Bot仅机械拦截非成员指派并报错，未能自动路由给仓库维护者跟进，导致issue停滞或被关闭。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 35分
  - 痛点原因：Bot仅打标并提示指派失败，未有效推动指派解决或关闭issue，治理动作单一且无效。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
#### PP-05 解决方案证据与结果形成完全缺失（I2 · 讨论与解决）

- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭并打标签，缺乏commit、文档及release等实质性证据，且无人工关闭评论说明。
  - 原文依据：
    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：关闭时未关联PR、commit或文档链接，也无关闭评论说明，仅由codehub直接关闭，缺乏解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：缺乏关联 PR、commit 引用及文档链接等任何可追溯的解决证据，仅由外部系统直接关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：仅由外部平台关闭，未关联 PR、提交记录或文档链接，无任何可追溯的解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：未关联任何PR、commit或文档链接，且关闭时无评论说明，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：仅被直接关闭，无关联PR、commit引用及文档链接等任何解决证据。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭时未关联任何PR、提交记录或文档链接等实质性解决证据，仅由平台直接关闭。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：仅回复已收到并指派负责人，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：未关联任何 PR、commit 或文档链接等解决证据，仅停留在需求评审与指派阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等具体修复说明。
  - 原文依据：
    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论，且缺乏commit或文档等实质性解决证据。
  - 原文依据：
    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved
- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 15分
  - 痛点原因：仅指派负责人并标记跟踪，无关联PR、commit引用及关闭说明，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭系统提示关闭，未关联PR或commit引用，缺乏实质性解决证据，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：缺乏关联PR、commit引用及有效评论等实质性解决证据，仅由系统自动关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭评论从codehub关闭，未关联任何PR、commit或release作为实质性解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在引导参加例会评审和等待反馈阶段，无实际解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在需求收集与等待反馈阶段，未进入实质性开发解决流程。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：该需求仅处于收集与等待反馈阶段，无关联PR、代码提交及版本发布等实质性产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：无关联PR、commit及release引用等实质解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：无关联 PR、commit 及 release 引用，仅停留在需求收集与等待反馈阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：缺乏关联 PR、代码提交及版本发布等实质性解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit和release引用及人工关闭说明，证据链不完整。
  - 原文依据：
    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 15分
  - 痛点原因：关联PR仍为open状态且无commit引用，仅停留在分配跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等实质性证据。
  - 原文依据：
    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #7406（open）](https://gitcode.com/cann/ops-nn/merge_requests/7406)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 23分
  - 痛点原因：仅口头回复并关闭评论，无关联PR、commit或文档等客观修复证据即标记完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 23分
  - 痛点原因：维护者以非本仓职责为由引导提问后直接关闭，未提供任何代码、文档或PR等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 31分
  - 痛点原因：虽有PR合并，但仅由机器人自动关闭，缺乏人工关闭评论及文档链接等解决说明。
  - 原文依据：
    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 31分
  - 痛点原因：关联PR未合并且仅停留在分配评审阶段，缺乏文档、release引用及关闭评论等最终解决证据。
  - 原文依据：
    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 31分
  - 痛点原因：缺乏关联PR和关闭评论等闭环证据，仅停留在分析指派阶段，未提供明确的修复落地证明。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 31分
  - 痛点原因：无关联PR与commit引用，仅提供参考链接且处于等待反馈状态，缺乏实际解决证据。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在需求评审与等待反馈阶段，未提供实质性解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit引用和文档链接，仅靠机器人自动关闭和加标签，无人工确认解决的详细说明。
  - 原文依据：
    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 38分
  - 痛点原因：虽有合并的PR，但无commit和release引用，且评论仅停留在跟踪处理阶段，缺乏最终解决确认，证据链不完整。
  - 原文依据：
    - [关联PR #7185（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7185)    - [关联PR #7191（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7191)    - [关联PR #7193（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7193)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：closed from codehub
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和文档链接等直接解决证据，证据链不够完整。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 38分
  - 痛点原因：缺乏关联PR与commit引用，仅口头说明关闭，未提供实际修复证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 46分
  - 痛点原因：缺乏关联PR与release引用，仅停留在引导例会评审与等待反馈阶段，未进入实质解决。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 46分
  - 痛点原因：关联PR仍为open状态未合并，且无关闭评论与release引用，缺乏有效解决证据。
  - 原文依据：
    - [关联PR #7158（open）](https://gitcode.com/cann/ops-nn/merge_requests/7158)    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 46分
  - 痛点原因：仅口头解释并给出文档链接，未关联修复PR或release引用，且处于等待反馈状态，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
#### PP-06 决策透明度不足状态不透明（I3 · 总结与关闭）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀最终解决方案或资料链接，导致无法被他人复用。
  - 原文依据：
    - `weixin_51153241`：add label question    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，无人工关闭说明与方案文档，未留存可复用的排查解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅由机器人自动关闭，无人工关闭说明和方案文档，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：无任何关闭说明、方案文档及复用链接，直接从codehub关闭，无法为后续提供参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：关闭时未提供方案文档、重复主链接及任何关闭说明，仅简单标记关闭，无法为后续提供参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：关闭说明为空，未提供方案文档与重复链接，导致关闭后毫无复用参考价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：直接从 codehub 关闭，无关闭说明、方案文档及复用链接，导致无任何复用价值。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：关闭时无文字说明、方案文档及链接沉淀，未留下任何可供后续参考的经验信息。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：关闭时未提供任何方案文档、重复链接及文字说明，仅简单标注来源，毫无复用参考价值。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅留系统关闭语，未提供任何可复用信息。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：关闭时无任何文字说明，缺乏方案文档化与重复链接，未留下可复用信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，分析结论未沉淀为可复用知识，对后续类似问题毫无参考价值。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 0分
  - 痛点原因：关闭说明为0字，未提供任何后续参考或复用指引，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 0分
  - 痛点原因：因用户超时未回复被机器人自动关闭，无人工关闭说明，未明确已有算子能否替代该需求。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 0分
  - 痛点原因：因超时无更新被机器人自动关闭且关闭说明为0字，未沉淀任何需求结论或后续方案链接。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅引导参会并指派处理人，未留下任何可复用的解决过程。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 0分
  - 痛点原因：关闭说明为0字且无重复issue主链接，虽有方案文档但未沉淀有效信息供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 0分
  - 痛点原因：因超时被机器人自动关闭，无人工关闭说明且未关联重复issue链接，导致无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 0分
  - 痛点原因：因14天无更新被机器人自动关闭，关闭说明为0字，未提供实质性原因或后续处理方案，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字，未留下最终评审结果或处理结论，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 0分
  - 痛点原因：仅因超时由机器人自动关闭且关闭说明为零字，未提供后续复用链接或方案文档指引，无复用价值。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 0分
  - 痛点原因：关闭说明为空，仅因超时无反馈被自动关闭，未交代需求最终处理结果或去向，无法供后续参考。
  - 原文依据：
    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，关闭说明为0字，且无方案文档与复用链接，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：关闭时无任何文字说明，仅分配人员而无处理结果记录，导致无法复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3910](https://gitcode.com/cann/ops-nn/issues/3910) [Requirement|需求建议]: 【社区任务】MaxUnpool2d算子开发交付（任务编号 04-14）** — 0分
  - 痛点原因：关闭时未留下任何说明文字，且关联PR仍处于open状态，未沉淀有效结论供后续参考。
  - 原文依据：
    - `yolic`：您好，已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `fullt`：已安排审核，请关注PR检视意见    - `yolic`：assigned to @fullt    - [关联PR #7155（open）](https://gitcode.com/cann/ops-nn/merge_requests/7155)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：关闭说明为0字，未记录问题解决过程与方案，导致关闭后无任何经验复用价值。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 0分
  - 痛点原因：关闭说明为0字，未对解答内容进行总结沉淀，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @Chen_HaoWen
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：关闭时无任何说明文字，且关联PR仍处于open状态，未沉淀有效信息供后续复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：仅靠机器人因关联MR合并自动关闭，无方案文档化且关闭说明仅7字，缺乏可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3898    - `harrynospot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与复用链接，未留存任何根因或解决经验供后续参考。
  - 原文依据：
    - `chenxingyu18`：closed from codehub    - `harrynospot`：changed custom state from 已解决 to 已完成    - `cann-robot`：add label Accepted    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人因关联PR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 0分
  - 痛点原因：关闭时未留下任何说明文字，导致问题解决过程缺失，复用价值极低。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 0分
  - 痛点原因：最终由机器人因超时自动关闭且关闭说明为0字，未沉淀有效解决方案供后续复用。
  - 原文依据：
    - `east_yang`：add label wait-feedback    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @east_yang
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 25分
  - 痛点原因：关闭时缺乏方案文档沉淀与重复链接，且关闭说明简略，未提供可供复用的解决方案。
  - 原文依据：
    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 25分
  - 痛点原因：仅由机器人自动关闭并关联MR，缺乏人工总结的方案文档与复用指引，未沉淀有效经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 25分
  - 痛点原因：仅回复正在跟踪处理便关闭，未沉淀实际解答或方案文档，无法供他人复用。
  - 原文依据：
    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yolic`：assigned to @yang-di52
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭时无任何文字说明，仅由系统自动关闭，未留下供社区复用的参考信息。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由代码库自动关闭，无法提供复用参考。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 30分
  - 痛点原因：关闭说明为0字且无重复主链接，未留存关闭原因与复用信息，导致复用价值低。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 30分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明文字，导致其他用户无法了解解决过程与结论。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随关联PR合并自动关闭，缺乏人工总结，导致后续无法获取有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 55分
  - 痛点原因：关闭说明仅69字且仅表示问题已收到，未提供最终解决方案或复用指引。
  - 原文依据：
    - `yolic`：closed from codehub    - `yolic`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：assigned to @zhengyuhao3
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 55分
  - 痛点原因：关闭时仅变更状态并留下通用跟踪回复，未补充具体解决细节或文档更新链接，导致后续复用参考价值不足。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。
#### PP-07 首次响应模板化无实质内容（I1 · 分配与首次响应）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：仅停留在问题流转和打标签，耗时超21小时且始终未提供任何实质解答。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人自动打标并随关联PR合并直接关闭，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何响应与实质解答，用户反馈未获处理。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：该 issue 未经任何人工响应与实质回复，直接被从 codehub 关闭，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 未获任何回复即被直接关闭，导致无实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该issue被直接关闭，全程无任何响应与实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接从 codehub 关闭，全程无任何首次响应与实质回应，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：仅完成人员分配并关联PR，未对需求提供任何实质性的技术评估或反馈。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：该 issue 被 codehub 直接关闭，全程未提供任何实质回应内容。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：该测试issue被直接关闭，全程无任何实质性回应内容，故得分为零。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：首次响应仅停留在确认和指派，始终未提供针对该Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：首次响应仅停留在让用户参会申报、打标签和分配负责人，未对需求进行实质性技术评估。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人关联PR合并并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 0分
  - 痛点原因：仅有确认收到、分配负责人和打标签等流程性回复，未提供任何针对Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：仅有快速接收和指派等机械操作，始终未对需求内容提供实质性技术回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：仅有机器人分配任务的无效流转，始终无人对文档错误问题进行实质性解答或处理。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：仅回复已收到并指派人员，未对拼写错误问题给出任何实质性回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：全程仅有指派命令和机器人报错，未产生任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：维护者仅进行了无效的分配操作，始终未对该缺陷提供任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 0分
  - 痛点原因：仅通过打标签和机器人自动关闭处理，全程缺乏人工对反馈内容的实质性解答。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅由机器人自动打标签并关联PR关闭，全程无人工或实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 40分
  - 痛点原因：首次响应虽快但仅为流程性回复，真正修正文档的实质回应耗时长达237小时，远超合格时效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 40分
  - 痛点原因：首次响应仅表示收到，实质回应耗时超10天且最终以无法解答为由推诿至其他社区，未提供有效解答。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
#### PP-08 Bot治理缺位率25%（G · Bot/Agent 治理）

- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：Bot仅发一条催更评论，未执行自动打标和关闭等核心治理动作，自动化治理作用极其有限。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 15分
  - 痛点原因：Bot未执行自动打标与关闭操作，打标及状态流转均依赖人工介入，自动化治理失效。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：Bot仅发出超时关闭警告却未实际执行，且未自动打标，标签全靠人工添加，缺乏实质性自动治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：Bot仅发送一条催收评论，未执行自动打标或关闭等有效治理动作，打标仍依赖人工完成。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 15分
  - 痛点原因：Bot仅发送14天关闭警告但未实际执行关闭，且未进行自动打标，导致治理动作未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：Bot仅机械回复模板索要信息，未执行自动打标或自动关闭等实质性治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：Bot仅发一条催补信息模板，未执行打标或关闭等实际治理动作，标签均由人工添加。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：Bot仅发送一条模板评论，未执行自动打标与超期关闭动作，治理流于形式。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 15分
  - 痛点原因：Bot仅发出单次模板回复，未实际执行自动打标与超时关闭动作，治理流程未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 15分
  - 痛点原因：Bot未能正确执行指派指令，拒绝非成员后又错误指派给该非成员，执行逻辑混乱。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 15分
  - 痛点原因：机器人未执行有效打标与关闭，且在维护者已解答后仍盲目发送模板催促用户提供信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 15分
  - 痛点原因：Bot仅发评论催促反馈，未执行自动打标或关闭等有效治理动作，且人工手动打标，治理失效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `east_yang`：add label wait-feedback    - `yolic`：assigned to @east_yang
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 20分
  - 痛点原因：Bot仅机械打标并在关联PR合并后自动关闭，全程无任何评论说明，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 20分
  - 痛点原因：Bot虽自动打标并关闭了issue，但全程零评论，未向用户说明处理原因，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动且未执行关闭操作，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @sunchun    - `sunchun`：unassigned @sunchun
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 20分
  - 痛点原因：Bot仅机械打标并因MR合并自动关闭，无任何评论交互，缺乏有效沟通与实质性治理。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，未向用户解释操作原因，缺乏互动与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论互动，缺乏对用户的有效反馈与治理引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 20分
  - 痛点原因：Bot仅完成基础打标，无任何评论互动，且未实现自动关闭，缺乏闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 20分
  - 痛点原因：Bot仅静默执行打标与关闭操作，全程无任何评论互动，缺乏状态变更说明导致治理过程不透明。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭操作，未发表任何评论解释关闭原因或同步状态，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未执行自动关闭，核心治理动作依赖人工完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liu-wei    - `liu-wei`：closed from codehub
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 20分
  - 痛点原因：Bot仅机械打标，在人工判定问题不归属本仓后未自动关闭或流转，导致治理流程未闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 35分
  - 痛点原因：Bot仅机械拦截非成员指派并报错，未能自动路由给仓库维护者跟进，导致issue停滞或被关闭。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 35分
  - 痛点原因：Bot仅打标并提示指派失败，未有效推动指派解决或关闭issue，治理动作单一且无效。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
#### PP-09 高质量技术贡献未获跟进与回应（I2 · 讨论与解决）

- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭并打标签，缺乏commit、文档及release等实质性证据，且无人工关闭评论说明。
  - 原文依据：
    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - `cann-robot`：add label resolved
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：关闭时未关联PR、commit或文档链接，也无关闭评论说明，仅由codehub直接关闭，缺乏解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：缺乏关联 PR、commit 引用及文档链接等任何可追溯的解决证据，仅由外部系统直接关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：仅由外部平台关闭，未关联 PR、提交记录或文档链接，无任何可追溯的解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：未关联任何PR、commit或文档链接，且关闭时无评论说明，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：仅被直接关闭，无关联PR、commit引用及文档链接等任何解决证据。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：关闭时未关联任何PR、提交记录或文档链接等实质性解决证据，仅由平台直接关闭。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：仅回复已收到并指派负责人，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：未关联任何 PR、commit 或文档链接等解决证据，仅停留在需求评审与指派阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等具体修复说明。
  - 原文依据：
    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - `cann-robot`：add label resolved
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论，且缺乏commit或文档等实质性解决证据。
  - 原文依据：
    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - `cann-robot`：add label resolved
- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 15分
  - 痛点原因：仅指派负责人并标记跟踪，无关联PR、commit引用及关闭说明，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭系统提示关闭，未关联PR或commit引用，缺乏实质性解决证据，无法证明问题已解决。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：缺乏关联PR、commit引用及有效评论等实质性解决证据，仅由系统自动关闭。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 15分
  - 痛点原因：仅凭评论从codehub关闭，未关联任何PR、commit或release作为实质性解决证据。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在引导参加例会评审和等待反馈阶段，无实际解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：无关联PR与commit引用，仅停留在需求收集与等待反馈阶段，未进入实质性开发解决流程。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：该需求仅处于收集与等待反馈阶段，无关联PR、代码提交及版本发布等实质性产出。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：无关联PR、commit及release引用等实质解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：无关联 PR、commit 及 release 引用，仅停留在需求收集与等待反馈阶段，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：缺乏关联 PR、代码提交及版本发布等实质性解决证据，仅停留在需求收集与等待反馈阶段。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit和release引用及人工关闭说明，证据链不完整。
  - 原文依据：
    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - `cann-robot`：add label resolved
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 15分
  - 痛点原因：关联PR仍为open状态且无commit引用，仅停留在分配跟踪阶段，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等实质性证据。
  - 原文依据：
    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - `Hana77`：add label documentation    - `cann-robot`：add label resolved
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #7406（open）](https://gitcode.com/cann/ops-nn/merge_requests/7406)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 23分
  - 痛点原因：仅口头回复并关闭评论，无关联PR、commit或文档等客观修复证据即标记完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `chenxingyu18`：changed custom state from 进行中 to 已完成    - `chenxingyu18`：closed from codehub    - `cann-robot`：add label Accepted
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 23分
  - 痛点原因：维护者以非本仓职责为由引导提问后直接关闭，未提供任何代码、文档或PR等实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 31分
  - 痛点原因：虽有PR合并，但仅由机器人自动关闭，缺乏人工关闭评论及文档链接等解决说明。
  - 原文依据：
    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - `cann-robot`：add label resolved
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 31分
  - 痛点原因：关联PR未合并且仅停留在分配评审阶段，缺乏文档、release引用及关闭评论等最终解决证据。
  - 原文依据：
    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt
- **[#3964](https://gitcode.com/cann/ops-nn/issues/3964) [Bug-Report] NLLLossGrad kernel （#3870 已修复版本）在 aicore_num > tiling 分区数时 SyncAll…** — 31分
  - 痛点原因：缺乏关联PR和关闭评论等闭环证据，仅停留在分析指派阶段，未提供明确的修复落地证明。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@xieshengwei1024](https://gitcode.com/xieshengwei1024) 正在跟踪处理。    - `huang-qiang`：# Issue #3964 分析说明：NLLLossGrad arch35 SyncAll 死锁问题核对 > 结论先行：**issue 中描述的死锁场景在当前代码中不成立**；#3858/#3870 一系列的真实修复方式与 issue 的…    - `yolic`：assigned to @xieshengwei1024    - `xieshengwei1024`：assigned to @huang-qiang    - `xieshengwei1024`：unassigned @xieshengwei1024
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 31分
  - 痛点原因：无关联PR与commit引用，仅提供参考链接且处于等待反馈状态，缺乏实际解决证据。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 31分
  - 痛点原因：无关联PR与commit引用，仅停留在需求评审与等待反馈阶段，未提供实质性解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit引用和文档链接，仅靠机器人自动关闭和加标签，无人工确认解决的详细说明。
  - 原文依据：
    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 38分
  - 痛点原因：虽有合并的PR，但无commit和release引用，且评论仅停留在跟踪处理阶段，缺乏最终解决确认，证据链不完整。
  - 原文依据：
    - [关联PR #7185（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7185)    - [关联PR #7191（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7191)    - [关联PR #7193（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7193)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `yolic`：closed from codehub
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和文档链接等直接解决证据，证据链不够完整。
  - 原文依据：
    - [关联PR #7360（closed）](https://gitcode.com/cann/ops-nn/merge_requests/7360)    - [关联PR #7385（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7385)    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 38分
  - 痛点原因：缺乏关联PR与commit引用，仅口头说明关闭，未提供实际修复证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 46分
  - 痛点原因：缺乏关联PR与release引用，仅停留在引导例会评审与等待反馈阶段，未进入实质解决。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 46分
  - 痛点原因：关联PR仍为open状态未合并，且无关闭评论与release引用，缺乏有效解决证据。
  - 原文依据：
    - [关联PR #7158（open）](https://gitcode.com/cann/ops-nn/merge_requests/7158)    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 46分
  - 痛点原因：仅口头解释并给出文档链接，未关联修复PR或release引用，且处于等待反馈状态，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
#### PP-10 部分技术Issue标签缺失分流不完整（I1 · 分配与首次响应）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：仅停留在问题流转和打标签，耗时超21小时且始终未提供任何实质解答。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人自动打标并随关联PR合并直接关闭，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何响应与实质解答，用户反馈未获处理。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：该 issue 未经任何人工响应与实质回复，直接被从 codehub 关闭，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 未获任何回复即被直接关闭，导致无实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该issue被直接关闭，全程无任何响应与实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接从 codehub 关闭，全程无任何首次响应与实质回应，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：仅完成人员分配并关联PR，未对需求提供任何实质性的技术评估或反馈。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：该 issue 被 codehub 直接关闭，全程未提供任何实质回应内容。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：该测试issue被直接关闭，全程无任何实质性回应内容，故得分为零。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：首次响应仅停留在确认和指派，始终未提供针对该Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：首次响应仅停留在让用户参会申报、打标签和分配负责人，未对需求进行实质性技术评估。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人关联PR合并并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 0分
  - 痛点原因：仅有确认收到、分配负责人和打标签等流程性回复，未提供任何针对Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：仅有快速接收和指派等机械操作，始终未对需求内容提供实质性技术回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：仅有机器人分配任务的无效流转，始终无人对文档错误问题进行实质性解答或处理。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：仅回复已收到并指派人员，未对拼写错误问题给出任何实质性回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：全程仅有指派命令和机器人报错，未产生任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：维护者仅进行了无效的分配操作，始终未对该缺陷提供任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 0分
  - 痛点原因：仅通过打标签和机器人自动关闭处理，全程缺乏人工对反馈内容的实质性解答。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅由机器人自动打标签并关联PR关闭，全程无人工或实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 40分
  - 痛点原因：首次响应虽快但仅为流程性回复，真正修正文档的实质回应耗时长达237小时，远超合格时效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 40分
  - 痛点原因：首次响应仅表示收到，实质回应耗时超10天且最终以无法解答为由推诿至其他社区，未提供有效解答。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
#### PP-11 响应时间分布严重不均（I1 · 分配与首次响应）

- **[#4041](https://gitcode.com/cann/ops-nn/issues/4041) [Question|问题咨询]: 代码上库最新规范资料** — 0分
  - 痛点原因：仅停留在问题流转和打标签，耗时超21小时且始终未提供任何实质解答。
  - 原文依据：
    - `yolic`：你好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `weixin_51153241`：add label question    - `yolic`：assigned to @caiwenwen
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人自动打标并随关联PR合并直接关闭，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#4014](https://gitcode.com/cann/ops-nn/issues/4014) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何响应与实质解答，用户反馈未获处理。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4012](https://gitcode.com/cann/ops-nn/issues/4012) test** — 0分
  - 痛点原因：该 issue 未经任何人工响应与实质回复，直接被从 codehub 关闭，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4011](https://gitcode.com/cann/ops-nn/issues/4011) test** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4010](https://gitcode.com/cann/ops-nn/issues/4010) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 未获任何回复即被直接关闭，导致无实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4009](https://gitcode.com/cann/ops-nn/issues/4009) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接关闭，全程无任何首次响应或实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4008](https://gitcode.com/cann/ops-nn/issues/4008) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该issue被直接关闭，全程无任何响应与实质回应。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4007](https://gitcode.com/cann/ops-nn/issues/4007) [Documentation|文档反馈]: add_rms_norm_dynamic_quant 算子文档 scale1Out/scale2Out 非连续Te…** — 0分
  - 痛点原因：该 issue 被直接从 codehub 关闭，全程无任何首次响应与实质回应，导致得分为零。
  - 原文依据：
    - `raoliang_sac`：closed from codehub
- **[#4005](https://gitcode.com/cann/ops-nn/issues/4005) [Requirement|需求建议]: 【社区任务】MaxUnpool3d算子开发交付** — 0分
  - 痛点原因：仅完成人员分配并关联PR，未对需求提供任何实质性的技术评估或反馈。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `yolic`：assigned to @fullt    - [关联PR #7330（open）](https://gitcode.com/cann/ops-nn/merge_requests/7330)
- **[#4004](https://gitcode.com/cann/ops-nn/issues/4004) test-ignore** — 0分
  - 痛点原因：该 issue 被 codehub 直接关闭，全程未提供任何实质回应内容。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#4003](https://gitcode.com/cann/ops-nn/issues/4003) test-pls-ignore-123** — 0分
  - 痛点原因：该测试issue被直接关闭，全程无任何实质性回应内容，故得分为零。
  - 原文依据：
    - `chenqi317`：closed from codehub
- **[#3965](https://gitcode.com/cann/ops-nn/issues/3965) [Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…** — 0分
  - 痛点原因：首次响应仅停留在确认和指派，始终未提供针对该Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `yolic`：assigned to @Coder_Nerd
- **[#3959](https://gitcode.com/cann/ops-nn/issues/3959) [Requirement|需求建议]: 新增 one_hot 独热编码算子** — 0分
  - 痛点原因：首次响应仅停留在让用户参会申报、打标签和分配负责人，未对需求进行实质性技术评估。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `jiangzeyu-2026`：add label requirement    - `yolic`：assigned to @yolic
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 0分
  - 痛点原因：仅由机器人关联PR合并并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 0分
  - 痛点原因：仅有确认收到、分配负责人和打标签等流程性回复，未提供任何针对Bug的技术分析或解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3916](https://gitcode.com/cann/ops-nn/issues/3916) [Requirement|需求建议]: 卷积小case模板需要支持输入输出NHWC/NCHW混用的情况** — 0分
  - 痛点原因：仅有快速接收和指派等机械操作，始终未对需求内容提供实质性技术回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ray-shaw](https://gitcode.com/ray-shaw) 正在跟踪处理。    - `yolic`：assigned to @z1456419654    - `yolic`：assigned to @ray-shaw    - `yolic`：unassigned @z1456419654    - [关联PR #6567（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6567)    - [关联PR #7298（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7298)
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 0分
  - 痛点原因：仅有机器人分配任务的无效流转，始终无人对文档错误问题进行实质性解答或处理。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3901](https://gitcode.com/cann/ops-nn/issues/3901) [Documentation|文档反馈]: cache_runinfo.cpp 常量名MAX_TILING_DADA_SIZE拼写错误** — 0分
  - 痛点原因：仅回复已收到并指派人员，未对拼写错误问题给出任何实质性回应。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liliyan](https://gitcode.com/liliyan) 正在跟踪处理。    - `yolic`：assigned to @liliyan    - [关联PR #7133（open）](https://gitcode.com/cann/ops-nn/merge_requests/7133)
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 0分
  - 痛点原因：全程仅有指派命令和机器人报错，未产生任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 0分
  - 痛点原因：维护者仅进行了无效的分配操作，始终未对该缺陷提供任何实质性的技术回应。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 0分
  - 痛点原因：仅通过打标签和机器人自动关闭处理，全程缺乏人工对反馈内容的实质性解答。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 0分
  - 痛点原因：仅由机器人自动打标签并关联PR关闭，全程无人工或实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3884](https://gitcode.com/cann/ops-nn/issues/3884) [Documentation|文档反馈]: aclnnDynamicDualLevelMxQuant、aclnnSwigluGroupQuant、aclnnE…** — 40分
  - 痛点原因：首次响应虽快但仅为流程性回复，真正修正文档的实质回应耗时长达237小时，远超合格时效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `east_yang`：SwigluGroupQuant资料已修正 https://gitcode.com/cann/ops-nn/blob/master/activation/swiglu_group_quant/docs/aclnnSwigluGroupQu…    - `yolic`：assigned to @sunchun    - `yolic`：assigned to @east_yang    - `yolic`：assigned to @jiaoyiming    - `sunchun`：unassigned @sunchun
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 40分
  - 痛点原因：首次响应仅表示收到，实质回应耗时超10天且最终以无法解答为由推诿至其他社区，未提供有效解答。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
#### PP-12 Bot介入模板化无实质帮助（G · Bot/Agent 治理）

- **[#3962](https://gitcode.com/cann/ops-nn/issues/3962) [Requirement|需求建议]: 新增 randperm 随机排列算子** — 15分
  - 痛点原因：Bot仅发一条催更评论，未执行自动打标和关闭等核心治理动作，自动化治理作用极其有限。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3961](https://gitcode.com/cann/ops-nn/issues/3961) [Requirement|需求建议]: 新增 nn.functional.linear 全连接前向算子（不含权重变换）** — 15分
  - 痛点原因：Bot未执行自动打标与关闭操作，打标及状态流转均依赖人工介入，自动化治理失效。
  - 原文依据：
    - `yolic`：您好，仓库已有addmm算子，可以参考 https://gitcode.com/cann/ops-nn/blob/e711e0c7bc9ef633785627ef90307a16f77b1764/matmul/mat_mul_v3/doc…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3960](https://gitcode.com/cann/ops-nn/issues/3960) [Requirement|需求建议]: 新增 argwhere 多维度非零元素定位算子** — 15分
  - 痛点原因：Bot仅发出超时关闭警告却未实际执行，且未自动打标，标签全靠人工添加，缺乏实质性自动治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3958](https://gitcode.com/cann/ops-nn/issues/3958) [Requirement|需求建议]: 新增 sort 算子（全局/指定维度排序）** — 15分
  - 痛点原因：Bot仅发送一条催收评论，未执行自动打标或关闭等有效治理动作，打标仍依赖人工完成。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：delete label wait-feedback    - `yolic`：add label wait-feedback
- **[#3957](https://gitcode.com/cann/ops-nn/issues/3957) [Requirement|需求建议]: 新增 plain unique 算子（全局去重，非 consecutive/非 dim）** — 15分
  - 痛点原因：Bot仅发送14天关闭警告但未实际执行关闭，且未进行自动打标，导致治理动作未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3956](https://gitcode.com/cann/ops-nn/issues/3956) [Requirement|需求建议]: 新增 topk 算子（仅 value 不排序场景）** — 15分
  - 痛点原因：Bot仅机械回复模板索要信息，未执行自动打标或自动关闭等实质性治理动作。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3955](https://gitcode.com/cann/ops-nn/issues/3955) [Requirement|需求建议]: 新增 searchsorted 二分检索算子** — 15分
  - 痛点原因：Bot仅发一条催补信息模板，未执行打标或关闭等实际治理动作，标签均由人工添加。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3954](https://gitcode.com/cann/ops-nn/issues/3954) [Requirement|需求建议]: 新增 masked_fill 掩码填充算子** — 15分
  - 痛点原因：Bot仅发送一条模板评论，未执行自动打标与超期关闭动作，治理流于形式。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3953](https://gitcode.com/cann/ops-nn/issues/3953) [Requirement|需求建议]: 新增 cumsum/cumprod 累积扫描算子** — 15分
  - 痛点原因：Bot仅发出单次模板回复，未实际执行自动打标与超时关闭动作，治理流程未闭环。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `jiangzeyu-2026`：add label requirement    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#3909](https://gitcode.com/cann/ops-nn/issues/3909) [Documentation|文档反馈]: adaptiva_max_pool3d_infershape.cpp 文件名错误** — 15分
  - 痛点原因：Bot未能正确执行指派指令，拒绝非成员后又错误指派给该非成员，执行逻辑混乱。
  - 原文依据：
    - `yolic`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：### Notice This issue can not be assigned to ***chenxingyu18***. Please try to assign to the repository members.    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：assigned to @chenxingyu18    - `cann-robot`：assigned to @sunny_112 and unassigned @chenxingyu18    - `cann-robot`：assigned to @chenxingyu18 and unassigned @sunny_112
- **[#3908](https://gitcode.com/cann/ops-nn/issues/3908) [Documentation|文档反馈]: 这个设计文档说，支持8维Shape，请问这个算子支持的Reduce轴是几？，公式哪里体现了Reduce第几根轴了？** — 15分
  - 痛点原因：机器人未执行有效打标与关闭，且在维护者已解答后仍盲目发送模板催促用户提供信息。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@Chen_HaoWen](https://gitcode.com/Chen_HaoWen) 正在跟踪处理。    - `Chen_HaoWen`：您好，norm轴与gamma的shape一致哈 这点可以看下rstdout的介绍：shape与入参`x`的shape前几维保持一致，前几维指`x`的维度减去`gamma`的维度，表示不需要norm的维度。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @Chen_HaoWen
- **[#3874](https://gitcode.com/cann/ops-nn/issues/3874) [Documentation|文档反馈]: Relu 算子产品支持范围与代码配置范围不一致，请确认文档或配置是否需要同步** — 15分
  - 痛点原因：Bot仅发评论催促反馈，未执行自动打标或关闭等有效治理动作，且人工手动打标，治理失效。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：您好，目前仓内的A5算子全新开发均采用asc实现，而A2/A3上部分算子还存在tbe的实现，当前算子正在逐步切换到asc实现，非常欢迎开发者参与社区，贡献asc实现。 A2/A3的tbe算子我们也发布了社区任务，欢迎开发者参与。 http…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `east_yang`：add label wait-feedback    - `yolic`：assigned to @east_yang
- **[#4020](https://gitcode.com/cann/ops-nn/issues/4020) 【fix】修复precommit的oat空告警失败问题** — 20分
  - 痛点原因：Bot仅机械打标并在关联PR合并后自动关闭，全程无任何评论说明，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4020    - [关联PR #7370（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7370)
- **[#4016](https://gitcode.com/cann/ops-nn/issues/4016) [Bug-Report|缺陷反馈]: sparse_apply_adagrad_v2的golden需要与tf对比** — 20分
  - 痛点原因：Bot虽自动打标并关闭了issue，但全程零评论，未向用户说明处理原因，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4016    - [关联PR #7331（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7331)
- **[#3966](https://gitcode.com/cann/ops-nn/issues/3966) [Bug-Report] scatter_elements_v2 中 mode==1 时 if (includeSelf) 判断 countLocal，但 i…** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动且未执行关闭操作，缺乏实质性自动化治理动作。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@sunchun](https://gitcode.com/sunchun) 正在跟踪处理。    - `chenxingyu18`：你好，kernel是和tiling配合使用的，不会误传    - `chenxingyu18`：您好，当前问题已回复，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @sunchun    - `sunchun`：unassigned @sunchun
- **[#3963](https://gitcode.com/cann/ops-nn/issues/3963) 【需求】【社区任务】LogSoftmaxGrad算子贡献** — 20分
  - 痛点原因：Bot仅机械打标并因MR合并自动关闭，无任何评论交互，缺乏有效沟通与实质性治理。
  - 原文依据：
    - `yolic`：已接受到需求建议，请 [@fullt](https://gitcode.com/fullt) 安排评审。    - `cann-robot`：add label resolved    - `yolic`：assigned to @fullt    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3963    - [关联PR #1983（merged）](https://gitcode.com/cann/ops-nn/merge_requests/1983)
- **[#3935](https://gitcode.com/cann/ops-nn/issues/3935) [Documentation|文档反馈]: SwigluGroupQuantGrad文档groupIndex aclnn接口说明与实际不一致，clamplim…** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，未向用户解释操作原因，缺乏互动与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3935    - [关联PR #7195（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7195)
- **[#3931](https://gitcode.com/cann/ops-nn/issues/3931) [Bug-Report|缺陷反馈]: IndexPutWithSortV2算子SIMD/SIMT模板计算逻辑修复** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论互动，缺乏对用户的有效反馈与治理引导。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3931    - [关联PR #7039（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7039)    - [关联PR #7250（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7250)
- **[#3918](https://gitcode.com/cann/ops-nn/issues/3918) [Bug-Report|缺陷反馈]: 共性问题，aclnn接口的参数表格右边超出了目录导航栏，体验不好** — 20分
  - 痛点原因：Bot仅完成基础打标，无任何评论互动，且未实现自动关闭，缺乏闭环治理。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@huzhipeng](https://gitcode.com/huzhipeng) 正在跟踪处理。    - `yuhao_`：/assign    - `cann-robot`：add label Accepted    - `yolic`：assigned to @zhengyuhao3    - `yolic`：unassigned @zhengyuhao3    - `cann-robot`：assigned to @yuhao_
- **[#3896](https://gitcode.com/cann/ops-nn/issues/3896) [Documentation|文档反馈]: aclnnSoftplusBackward.md、README.md、op_api_list.md、op_list…** — 20分
  - 痛点原因：Bot仅静默执行打标与关闭操作，全程无任何评论互动，缺乏状态变更说明导致治理过程不透明。
  - 原文依据：
    - `Hana77`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3896    - [关联PR #7113（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7113)
- **[#3885](https://gitcode.com/cann/ops-nn/issues/3885) [Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭操作，未发表任何评论解释关闭原因或同步状态，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3885    - [关联PR #7094（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7094)
- **[#3883](https://gitcode.com/cann/ops-nn/issues/3883) [Documentation|文档反馈]: 大小驼峰命名** — 20分
  - 痛点原因：Bot仅完成打标，无评论互动且未执行自动关闭，核心治理动作依赖人工完成。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@liu-wei](https://gitcode.com/liu-wei) 正在跟踪处理。    - `liu-wei`：kCalls 位于 namespace aicpu 作用域内，属于全局变量，应加 g_ 前缀并使用小驼峰命名（如 g_calls） 这个规则是从哪里来的？如果保持现状会有什么问题吗？    - `liu-wei`：这个issue我们打算关闭了，如果还有问题麻烦重新提PR，我们会持续提供支撑。    - `cann-robot`：add label Accepted    - `yolic`：assigned to @liu-wei    - `liu-wei`：closed from codehub
- **[#3854](https://gitcode.com/cann/ops-nn/issues/3854) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 20分
  - 痛点原因：Bot仅机械打标，在人工判定问题不归属本仓后未自动关闭或流转，导致治理流程未闭环。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：[@easel](https://gitcode.com/easel) 您好，nn仓仅提供神经网络计算能力的高阶算子，无法回答您cann机制的问题。您可以前往社区进行提问， https://gitcode.com/cann/communi…    - `cann-robot`：add label Accepted    - `yolic`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
- **[#3898](https://gitcode.com/cann/ops-nn/issues/3898) [Bug-Report|缺陷反馈]: MaxPool3D内置算子示例测试（图模式）报错** — 35分
  - 痛点原因：Bot仅机械拦截非成员指派并报错，未能自动路由给仓库维护者跟进，导致issue停滞或被关闭。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label resolved
- **[#3897](https://gitcode.com/cann/ops-nn/issues/3897) [Bug-Report|缺陷反馈]: test_max_pool_3d.cpp引用的experiment_ops.h不存在** — 35分
  - 痛点原因：Bot仅打标并提示指派失败，未有效推动指派解决或关闭issue，治理动作单一且无效。
  - 原文依据：
    - `chenxingyu18`：/assign    - `chenxingyu18`：/assign [@sunny_112](https://gitcode.com/sunny_112)    - `cann-robot`：### Notice This issue can not be assigned to ***sunny_112***. Please try to assign to the repository members.    - `Apricityh`：/assign    - `Apricityh`：/assign [@chenxingyu18](https://gitcode.com/chenxingyu18)    - `cann-robot`：add label Accepted

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | SIG Maintainer；候选负责人 `yolic` |
| 触发条件 | Issue分配assignee后48小时无第二条评论 |
| 具体动作 | 要求assignee提供初步技术判断或排查计划 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 60 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 22.4，低分 39/43；OBJ_RESULT_FORMATION_TIMELINESS：均值 54.9，低分 17/43 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 54.9，低分 17/43 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 22.4，低分 39/43 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 零评论零讨论，无任何排查方向或下一步动作形成。 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者/SIG负责人；候选负责人 `yolic` |
| 触发条件 | Issue分配后7天无新评论 |
| 具体动作 | 自动触发进度催办通知，要求assignee更新状态或提供排查进展 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 7.8，低分 43/43；OBJ_DECISION_TRANSPARENCY：均值 37.3，低分 36/43 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 7.8，低分 43/43 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 37.3，低分 36/43 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `yolic` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 强制填写解决方案摘要模板，包含根因分析、修复commit引用和复用建议 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 7.8，低分 43/43；OBJ_DECISION_TRANSPARENCY：均值 37.3，低分 36/43 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 7.8，低分 43/43 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 37.3，低分 36/43 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.8/100**，整体相对可控，但仍需关注：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 88.9 | PR声明AI辅助编写，但内容真实、技术细节详实且有硬件实测数据，非噪音。 |
| `SUB_INPUT_QUALITY` 输入质量 | 68.7 | LLM评分失败或缺失 |

代表低分 Issue：[#4003](https://gitcode.com/cann/ops-nn/issues/4003)
问题：test-pls-ignore-123。

### I1 · 分配与首次响应
本阶段分数为 **59.1/100**，本阶段需要改进，主要问题是：首次响应模板化无实质内容。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 39.1 | 均值 39.1，低分 27/43 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 72.1 | 均值 72.1，低分 7/43 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 64.6 | yolic明确回复并分配给caiwenwen跟踪，责任归属清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 64.1 | 标记question标签并分配跟踪人员，分流路径基本合理 |

代表低分 Issue：[#4004](https://gitcode.com/cann/ops-nn/issues/4004)
问题：test-ignore。

### I2 · 讨论与解决
本阶段分数为 **41.2/100**，本阶段需要改进，主要问题是：讨论停滞于模板确认无实质推进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 54.9 | 均值 54.9，低分 17/43 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 22.4 | 均值 22.4，低分 39/43 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 42.5 | 零评论零讨论，无任何排查方向或下一步动作形成。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 47.7 | 问题已收到并分配，但用户咨询的文档和方案均未给出解答 |

代表低分 Issue：[#3965](https://gitcode.com/cann/ops-nn/issues/3965)
问题：[Bug-Report] celuV2 alpha 很大时的精度问题本质是 float16 下 log1p(x) 在 x>65504 时溢出 inf 而非 e…。

### I3 · 总结与关闭
本阶段分数为 **37.7/100**，本阶段是本周短板之一，主要问题是：Issue响应后停滞无进展。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 7.8 | 均值 7.8，低分 43/43 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 37.3 | 均值 37.3，低分 36/43 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.7 | 关闭时未说明后续反馈路径或重新开启条件 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 77.2 | Issue仍处于开放状态，无过早关闭迹象 |

代表低分 Issue：[#3885](https://gitcode.com/cann/ops-nn/issues/3885)
问题：[Bug-Report|缺陷反馈]: swiglu_group_quant quant mode==2 out y origin在输入为fp32精度问题。

### G · Bot/Agent 治理
本阶段分数为 **63.4/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 36.0 | 均值 36.0，低分 25/43 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 97.7 | 均值 97.7，低分 0/43 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 62.1 | 无bot介入，人工交接由yolic完成但与bot无关，给中性分 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 55.5 | 无bot介入记录，信息不足，给中性保守分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 58.1 | 无bot动作可评估，信息不足给中性分 |

代表低分 Issue：[#3954](https://gitcode.com/cann/ops-nn/issues/3954)
问题：[Requirement|需求建议]: 新增 masked_fill 掩码填充算子。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 188 | 41.5 | 首期基线 | 78.8 | 59.1 | 41.2 | 37.7 | 63.4 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **13 位社区响应者**贡献 **51 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `yolic` | 27 |
| `chenxingyu18` | 7 |
| `Apricityh` | 4 |
| `east_yang` | 2 |
| `liu-wei` | 2 |

Top1 响应占比 **52.9%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-nn/report_cann-ops-nn_2026-07-06_to_2026-07-12.json`。
