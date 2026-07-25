# Issue 贡献体验周报 · cann/ops-transformer

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-transformer` 共收到 **132** 个 Issue
+ 其中外部 Issue **27** 个、内部 **105** 个；I1–I3 及 G 基于「外部且成熟」的 **27** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 22 / Closed 110**，关闭率 **83.3%**。
+ 总体体验分为 **47.1/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 43.5 | Issue长期开放无关闭决策机制 |
| P0 | I2 · 讨论与解决 | 51.6 | 讨论停滞，初始响应后无推进 |
| P2 | I1 · 分配与首次响应 | 68.5 | — |

本周建议 9 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 增加关闭前置校验：检查Issue内是否有未合并PR、用户是否确认解决、是否存在未回答的追问，不满足条件时阻止自动关闭 |
| REC-02 | P0 | 自动触发状态检查，要求assignee给出明确处置决策（解决/延期/关闭/转交） |
| REC-03 | P0 | 自动提醒assignee发布技术评估或进展说明 |
| REC-04 | P1 | 配置Issue创建自动响应：根据标题前缀[Documentation|Requirement|Question]自动打标签、发送模板引导评论、执行初步assign |
| REC-05 | P1 | Bot自动在Issue下发送催办评论@assignee，提醒跟进或说明阻塞原因 |
| REC-06 | P1 | 强制填写关闭总结模板（解决方案、决策依据、复用建议），否则阻止关闭 |
| REC-07 | P1 | 发布技术评估评论，包含问题确认、初步方案或排期说明 |
| REC-08 | P2 | 自动升级至maintainer review，重新评估责任分配或触发协同处理 |
| REC-09 | P2 | 使用决策模板评论，包含决策类型、理由、后续条件和预期时间线 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 132 |
| Open / Closed | 22 / 110 |
| 关闭率 | 83.3% |
| 类型构成 | 缺陷 53 / 需求 37 / 咨询 3 / 其他 39 |
| 总体体验分 | 47.1/100（D） |
| 首次响应时间 | 中位 0.4h；均值 4.9h |
| 关闭周期 | 中位 15.9h；均值 2.4天 |
| 7天响应率 | 97.0% |
| 评论数/Issue | 1.05 |
| 标签覆盖率 | 86.4% |
| 指派覆盖率 | 92.4% |
| 数据完整性 | 92.3/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.4 | 10/132（7.6%） | 相对可控 | `SUB_INPUT_QUALITY` 66.3 |
| I1 · 分配与首次响应 | 68.5 | 9/27（33.3%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 48.1 |
| I2 · 讨论与解决 | 51.6 | 15/27（55.6%） | P0 | `OBJ_SOLUTION_EVIDENCE` 25.9 |
| I3 · 总结与关闭 | 43.5 | 22/27（81.5%） | P0 | `OBJ_CLOSURE_REUSE` 14.4 |
| G · Bot/Agent 治理（参考） | 64.0 | 7/27（25.9%） | 参考项 | `OBJ_BOT_GOVERNANCE` 32.2 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | G · Bot/Agent 治理 | Bot误关闭率高达28% | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 | 用户问题被过早关闭，剩余问题无跟踪，信任受损且问题遗留。 |
| PP-02 | P0 | I3 · 总结与关闭 | Issue长期开放无关闭决策机制 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 | 用户需求和技术问题长期悬置，社区资源浪费，贡献者信任度下降。 |
| PP-03 | P0 | I2 · 讨论与解决 | 讨论停滞，初始响应后无推进 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 | 问题长期悬置open状态，用户无法获得技术解答，社区活跃度与信任度下降。 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot缺位率高达16.67% | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 | Issue缺少自动分类和初步响应，人工负担加重，响应延迟风险增大。 |
| PP-05 | P1 | G · Bot/Agent 治理 | Bot治理动作单一，assign后无跟进 | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 | Issue分配后停滞12-15天无人推进，自动化仅停留在初始分流，治理价值有限。 |
| PP-06 | P1 | I3 · 总结与关闭 | 关闭阶段缺乏解决方案证据与决策透明度 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 | 问题解决过程不可追溯，知识无法复用，后续类似问题无法参考。 |
| PP-07 | P1 | I2 · 讨论与解决 | 解决方案证据缺失，讨论无产出 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 | 用户投入精力提交Issue后无法获得可操作的解决路径，问题反复出现。 |
| PP-08 | P2 | I3 · 总结与关闭 | 讨论停滞后无跟进升级机制 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 | 高质量Issue被搁置，贡献者等待无果后流失，问题积压。 |
| PP-09 | P2 | I2 · 讨论与解决 | 决策透明度低，后续路径不清晰 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 | 用户对Issue走向缺乏预期管理，重复追问或放弃参与，社区协作效率降低。 |

### 4.1 低分 Issue 明细

#### PP-01 Bot误关闭率高达28%（G · Bot/Agent 治理）

- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 0分
  - 痛点原因：Bot未打标且无评论，仅执行指派动作，自动化治理缺失导致得分为零。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow    - `kknan`：unassigned @kknan
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 15分
  - 痛点原因：Bot仅发送催促反馈的模板评论，未执行有效打标或自动关闭，且与人工解答上下文脱节，缺乏实质自动化治理效果。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：Bot仅提示指派失败，未执行打标或关闭等有效治理动作，未能协助解决指派问题。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 20分
  - 痛点原因：Bot仅执行机械打标与关联关闭，无任何评论互动与进度同步，缺乏有效治理引导。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 20分
  - 痛点原因：Bot仅机械打标与指派，无任何评论互动，缺乏实质治理动作，流于形式。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未产生任何评论与用户互动，缺乏有效反馈导致治理流于形式。
  - 原文依据：
    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 20分
  - 痛点原因：Bot在人工仅回复处理中时便机械打标resolved并关闭issue，且未留下任何说明性评论。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 20分
  - 痛点原因：Bot仅执行打标，未按人工意愿自动关闭且无评论互动，治理未闭环。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @huang-chuhong    - `huang-chuhong`：closed from codehub
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭与评论，实际关闭和状态变更均依赖人工，治理作用极低。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `cann-robot`：add label Accepted    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 20分
  - 痛点原因：Bot虽执行打标与关闭操作，但全程无评论说明原因，缺乏有效沟通，治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 20分
  - 痛点原因：Bot仅机械打标与关闭，零评论互动，未在用户认领和讨论中提供有效引导与实质治理。
  - 原文依据：
    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `liudan12`：assigned to @jy_du    - `liudan12`：unassigned @jy_du
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何解释性评论，缺乏与用户的交互，导致治理过程不透明。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 20分
  - 痛点原因：Bot关闭时关联的合并信息错误，指向issue3628而非实际合并的PR#8287，且无评论说明，导致治理动作无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 20分
  - 痛点原因：Bot关闭时关联依据与实际合并PR不符且全程无评论解释，导致治理动作不透明且无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 20分
  - 痛点原因：Bot仅机械打标并关闭，全程零评论，未向用户说明关闭原因及关联PR情况，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 20分
  - 痛点原因：Bot在问题仅被确认和指派、尚未修复时，错误添加了resolved标签，存在严重误打标。
  - 原文依据：
    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi    - `zhu-mingzhe71`：closed from codehub
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何有效评论引导，全程依赖人工沟通解决，未发挥实际作用。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 20分
  - 痛点原因：Bot仅完成打标，未自动指派、回复或关闭，全程依赖人工处理，未发挥实际治理作用。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
#### PP-02 Issue长期开放无关闭决策机制（I3 · 总结与关闭）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：关闭时无任何说明文字，也未提供方案文档或重复链接，未留下可供后续复用的有效信息。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字且未沉淀方案文档，无任何复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：assigned to @chaotang233
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅包含指派和询问算子路径的无效沟通。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 0分
  - 痛点原因：该测试issue仅由系统自动关闭，无方案文档与重复链接，关闭说明仅12字，毫无经验沉淀。
  - 原文依据：
    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：测试issue请及时关闭
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅分配任务与回复处理中，无任何可复用价值。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与关联链接，仅由系统自动关闭，毫无复用参考价值。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 0分
  - 痛点原因：关闭时无任何文字说明，且关联的PR仍处于未合并状态，缺乏可复用的解决总结。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无人工关闭说明、方案文档及重复链接，未留存任何参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，关闭说明为0字，且无方案文档与重复代码主链接，未留存任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人随PR合并自动关闭，未留存可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档或重复链接，导致该需求的处理经验无法被后续复用。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅靠机器人关联PR自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档化记录，仅由系统自动关闭，未沉淀有效解决方案供他人复用。
  - 原文依据：
    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀解决方案，导致无法为后续类似需求提供复用价值。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 0分
  - 痛点原因：仅引导用户去其他平台提工单，未提供任何解决方案、文档链接或有效关闭说明。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 25分
  - 痛点原因：关闭说明仅为机器人自动关联MR的模板回复，未沉淀中间结果溢出的具体修复方案与根本原因，无法供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 25分
  - 痛点原因：关闭时仅引导去其他仓库提issue，未沉淀具体解决方案，无法供后续用户参考复用。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 25分
  - 痛点原因：关闭说明仅60字且无方案文档化与复用链接，导致关闭后无法为类似问题提供有效参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 25分
  - 痛点原因：未沉淀文档化解决方案且无主链接关联，仅给出简短关闭说明，导致问题解答缺乏复用价值。
  - 原文依据：
    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因PR合并自动关闭，缺乏人工总结的复用信息且无重复issue链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 30分
  - 痛点原因：关闭时仅由机器人关联MR自动关闭，人工未补充任何文字说明，导致关闭说明为0字，缺乏复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由机器人随PR合并自动关闭，缺乏人工复用价值沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 30分
  - 痛点原因：关闭说明仅43字且无dup主链接，仅以关联issue合并为由关闭，缺乏完整上下文和复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow
- **[#3617](https://gitcode.com/cann/ops-transformer/issues/3617) [Documentation|文档反馈]:aclnnLightningIndexerGrad、aclnnNormRopeConcat、aclnnNormRop…** — 30分
  - 痛点原因：关闭说明仅提及关联 issue 而无具体方案链接，且未提供 dup 主链接，导致其他用户难以复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3617    - `cann-robot`：add label resolved    - `wang-minbo`：好的，我们attention、posembedding的专家马上来处理    - `fazhenyao123`：aclnnMoeTokenPermuteWithRoutingMapGrad.md资料修复已合入    - `cann-robot`：### Notice This issue can not be assigned to ***jiangjiawei***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***何宇航***. Please try to assign to the repository members.
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 30分
  - 痛点原因：关闭说明仅由机器人自动生成且字数极少，缺乏人工总结的解决方案与经验沉淀，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608    - `cann-robot`：add label resolved    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联合并请求生成，缺乏人工对具体解决方案的总结，且无重复issue主链接，参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 55分
  - 痛点原因：关闭说明仅58字且为机器人合并自动回复，缺乏人工对问题与方案的总结，且无主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3659    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：assigned to @jy_du
#### PP-03 讨论停滞，初始响应后无推进（I2 · 讨论与解决）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：无任何关联PR、代码提交或文档链接等解决证据，评论仅停留在要求补充细节与加标签，未体现实际解决过程。
  - 原文依据：
    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗    - `zzzyh22`：add label requirement
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：无关联PR、commit引用及关闭评论，仅有人工分配与询问路径的对话，未提供任何问题被解决的实质性证据。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：仅分配负责人并回复处理中，未关联任何PR、commit或文档链接等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：仅由codehub直接关闭，无关联PR、commit引用及关闭评论，未留下任何修复证据。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并关联PR，缺乏commit引用、文档链接及release引用等实质性证据，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭并打标签，缺乏人工总结评论及commit、文档等直接修复证据。
  - 原文依据：
    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：需求暂不做规划被搁置，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏人工关闭评论、commit引用及文档等明确证据。
  - 原文依据：
    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit与release引用，且仅靠机器人自动关闭，无人工解决说明评论。
  - 原文依据：
    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论、commit及release引用，解决证据偏弱。
  - 原文依据：
    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 23分
  - 痛点原因：仅通过评论和状态变更关闭测试 issue，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 23分
  - 痛点原因：虽有关联PR，但缺乏commit引用与文档链接，且关闭说明仅为机器人简略回复，修复证据链不完整。
  - 原文依据：
    - [关联PR #8824（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8824)    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 23分
  - 痛点原因：仅通过评论文字解答并关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 31分
  - 痛点原因：无关联 PR、文档及 release 等实质性修复证据，仅停留在技术讨论与等待反馈阶段，问题未解决。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并PR和机器人自动关闭记录，但缺乏人工确认评论、文档链接及release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 31分
  - 痛点原因：仅引导用户提工单并询问细节，未在issue内提供实质性解决方案，无关联PR或文档修复证据。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅称处理中，缺乏明确的修复发布证据。
  - 原文依据：
    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)    - [关联PR #8648（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8648)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 38分
  - 痛点原因：仅指路其他仓库后直接关闭，无PR、commit或文档等实质解决证据即标记完成。
  - 原文依据：
    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 38分
  - 痛点原因：关联的修复PR仍处于open状态未合并，且缺乏commit和release引用作为最终解决证据。
  - 原文依据：
    - [关联PR #8838（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8838)    - [关联PR #8840（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8840)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论中缺乏问题已修复的明确验证证据。
  - 原文依据：
    - [关联PR #8831（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8831)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 46分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭且无人工关闭评论与release引用，缺乏解决验证证据。
  - 原文依据：
    - [关联PR #8562（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8562)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 46分
  - 痛点原因：仅有指派记录，无关联PR、release说明及关闭评论，缺乏问题已解决的直接证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接、release引用及明确的修复验证结论，导致解决佐证不充分。
  - 原文依据：
    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)    - [关联PR #8864（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8864)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 54分
  - 痛点原因：未关联修复PR，仅凭文字解释问题不存在便直接关闭，缺乏实质修复证据。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
#### PP-04 Bot缺位率高达16.67%（G · Bot/Agent 治理）

- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 0分
  - 痛点原因：Bot未打标且无评论，仅执行指派动作，自动化治理缺失导致得分为零。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow    - `kknan`：unassigned @kknan
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 15分
  - 痛点原因：Bot仅发送催促反馈的模板评论，未执行有效打标或自动关闭，且与人工解答上下文脱节，缺乏实质自动化治理效果。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：Bot仅提示指派失败，未执行打标或关闭等有效治理动作，未能协助解决指派问题。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 20分
  - 痛点原因：Bot仅执行机械打标与关联关闭，无任何评论互动与进度同步，缺乏有效治理引导。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 20分
  - 痛点原因：Bot仅机械打标与指派，无任何评论互动，缺乏实质治理动作，流于形式。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未产生任何评论与用户互动，缺乏有效反馈导致治理流于形式。
  - 原文依据：
    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 20分
  - 痛点原因：Bot在人工仅回复处理中时便机械打标resolved并关闭issue，且未留下任何说明性评论。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 20分
  - 痛点原因：Bot仅执行打标，未按人工意愿自动关闭且无评论互动，治理未闭环。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @huang-chuhong    - `huang-chuhong`：closed from codehub
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭与评论，实际关闭和状态变更均依赖人工，治理作用极低。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `cann-robot`：add label Accepted    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 20分
  - 痛点原因：Bot虽执行打标与关闭操作，但全程无评论说明原因，缺乏有效沟通，治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 20分
  - 痛点原因：Bot仅机械打标与关闭，零评论互动，未在用户认领和讨论中提供有效引导与实质治理。
  - 原文依据：
    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `liudan12`：assigned to @jy_du    - `liudan12`：unassigned @jy_du
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何解释性评论，缺乏与用户的交互，导致治理过程不透明。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 20分
  - 痛点原因：Bot关闭时关联的合并信息错误，指向issue3628而非实际合并的PR#8287，且无评论说明，导致治理动作无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 20分
  - 痛点原因：Bot关闭时关联依据与实际合并PR不符且全程无评论解释，导致治理动作不透明且无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 20分
  - 痛点原因：Bot仅机械打标并关闭，全程零评论，未向用户说明关闭原因及关联PR情况，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 20分
  - 痛点原因：Bot在问题仅被确认和指派、尚未修复时，错误添加了resolved标签，存在严重误打标。
  - 原文依据：
    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi    - `zhu-mingzhe71`：closed from codehub
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何有效评论引导，全程依赖人工沟通解决，未发挥实际作用。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 20分
  - 痛点原因：Bot仅完成打标，未自动指派、回复或关闭，全程依赖人工处理，未发挥实际治理作用。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
#### PP-05 Bot治理动作单一，assign后无跟进（G · Bot/Agent 治理）

- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 0分
  - 痛点原因：Bot未打标且无评论，仅执行指派动作，自动化治理缺失导致得分为零。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow    - `kknan`：unassigned @kknan
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 15分
  - 痛点原因：Bot仅发送催促反馈的模板评论，未执行有效打标或自动关闭，且与人工解答上下文脱节，缺乏实质自动化治理效果。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：Bot仅提示指派失败，未执行打标或关闭等有效治理动作，未能协助解决指派问题。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 20分
  - 痛点原因：Bot仅执行机械打标与关联关闭，无任何评论互动与进度同步，缺乏有效治理引导。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 20分
  - 痛点原因：Bot仅机械打标与指派，无任何评论互动，缺乏实质治理动作，流于形式。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未产生任何评论与用户互动，缺乏有效反馈导致治理流于形式。
  - 原文依据：
    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 20分
  - 痛点原因：Bot在人工仅回复处理中时便机械打标resolved并关闭issue，且未留下任何说明性评论。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 20分
  - 痛点原因：Bot仅执行打标，未按人工意愿自动关闭且无评论互动，治理未闭环。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @huang-chuhong    - `huang-chuhong`：closed from codehub
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭与评论，实际关闭和状态变更均依赖人工，治理作用极低。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `cann-robot`：add label Accepted    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 20分
  - 痛点原因：Bot虽执行打标与关闭操作，但全程无评论说明原因，缺乏有效沟通，治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 20分
  - 痛点原因：Bot仅机械打标与关闭，零评论互动，未在用户认领和讨论中提供有效引导与实质治理。
  - 原文依据：
    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `liudan12`：assigned to @jy_du    - `liudan12`：unassigned @jy_du
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何解释性评论，缺乏与用户的交互，导致治理过程不透明。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 20分
  - 痛点原因：Bot关闭时关联的合并信息错误，指向issue3628而非实际合并的PR#8287，且无评论说明，导致治理动作无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 20分
  - 痛点原因：Bot关闭时关联依据与实际合并PR不符且全程无评论解释，导致治理动作不透明且无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 20分
  - 痛点原因：Bot仅机械打标并关闭，全程零评论，未向用户说明关闭原因及关联PR情况，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 20分
  - 痛点原因：Bot在问题仅被确认和指派、尚未修复时，错误添加了resolved标签，存在严重误打标。
  - 原文依据：
    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi    - `zhu-mingzhe71`：closed from codehub
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何有效评论引导，全程依赖人工沟通解决，未发挥实际作用。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 20分
  - 痛点原因：Bot仅完成打标，未自动指派、回复或关闭，全程依赖人工处理，未发挥实际治理作用。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
#### PP-06 关闭阶段缺乏解决方案证据与决策透明度（I3 · 总结与关闭）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：关闭时无任何说明文字，也未提供方案文档或重复链接，未留下可供后续复用的有效信息。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字且未沉淀方案文档，无任何复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：assigned to @chaotang233
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅包含指派和询问算子路径的无效沟通。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 0分
  - 痛点原因：该测试issue仅由系统自动关闭，无方案文档与重复链接，关闭说明仅12字，毫无经验沉淀。
  - 原文依据：
    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：测试issue请及时关闭
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅分配任务与回复处理中，无任何可复用价值。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与关联链接，仅由系统自动关闭，毫无复用参考价值。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 0分
  - 痛点原因：关闭时无任何文字说明，且关联的PR仍处于未合并状态，缺乏可复用的解决总结。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无人工关闭说明、方案文档及重复链接，未留存任何参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，关闭说明为0字，且无方案文档与重复代码主链接，未留存任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人随PR合并自动关闭，未留存可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档或重复链接，导致该需求的处理经验无法被后续复用。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅靠机器人关联PR自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档化记录，仅由系统自动关闭，未沉淀有效解决方案供他人复用。
  - 原文依据：
    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀解决方案，导致无法为后续类似需求提供复用价值。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 0分
  - 痛点原因：仅引导用户去其他平台提工单，未提供任何解决方案、文档链接或有效关闭说明。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 25分
  - 痛点原因：关闭说明仅为机器人自动关联MR的模板回复，未沉淀中间结果溢出的具体修复方案与根本原因，无法供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 25分
  - 痛点原因：关闭时仅引导去其他仓库提issue，未沉淀具体解决方案，无法供后续用户参考复用。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 25分
  - 痛点原因：关闭说明仅60字且无方案文档化与复用链接，导致关闭后无法为类似问题提供有效参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 25分
  - 痛点原因：未沉淀文档化解决方案且无主链接关联，仅给出简短关闭说明，导致问题解答缺乏复用价值。
  - 原文依据：
    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因PR合并自动关闭，缺乏人工总结的复用信息且无重复issue链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 30分
  - 痛点原因：关闭时仅由机器人关联MR自动关闭，人工未补充任何文字说明，导致关闭说明为0字，缺乏复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由机器人随PR合并自动关闭，缺乏人工复用价值沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 30分
  - 痛点原因：关闭说明仅43字且无dup主链接，仅以关联issue合并为由关闭，缺乏完整上下文和复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow
- **[#3617](https://gitcode.com/cann/ops-transformer/issues/3617) [Documentation|文档反馈]:aclnnLightningIndexerGrad、aclnnNormRopeConcat、aclnnNormRop…** — 30分
  - 痛点原因：关闭说明仅提及关联 issue 而无具体方案链接，且未提供 dup 主链接，导致其他用户难以复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3617    - `cann-robot`：add label resolved    - `wang-minbo`：好的，我们attention、posembedding的专家马上来处理    - `fazhenyao123`：aclnnMoeTokenPermuteWithRoutingMapGrad.md资料修复已合入    - `cann-robot`：### Notice This issue can not be assigned to ***jiangjiawei***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***何宇航***. Please try to assign to the repository members.
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 30分
  - 痛点原因：关闭说明仅由机器人自动生成且字数极少，缺乏人工总结的解决方案与经验沉淀，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608    - `cann-robot`：add label resolved    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联合并请求生成，缺乏人工对具体解决方案的总结，且无重复issue主链接，参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 55分
  - 痛点原因：关闭说明仅58字且为机器人合并自动回复，缺乏人工对问题与方案的总结，且无主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3659    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：assigned to @jy_du
#### PP-07 解决方案证据缺失，讨论无产出（I2 · 讨论与解决）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：无任何关联PR、代码提交或文档链接等解决证据，评论仅停留在要求补充细节与加标签，未体现实际解决过程。
  - 原文依据：
    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗    - `zzzyh22`：add label requirement
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：无关联PR、commit引用及关闭评论，仅有人工分配与询问路径的对话，未提供任何问题被解决的实质性证据。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：仅分配负责人并回复处理中，未关联任何PR、commit或文档链接等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：仅由codehub直接关闭，无关联PR、commit引用及关闭评论，未留下任何修复证据。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并关联PR，缺乏commit引用、文档链接及release引用等实质性证据，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭并打标签，缺乏人工总结评论及commit、文档等直接修复证据。
  - 原文依据：
    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：需求暂不做规划被搁置，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏人工关闭评论、commit引用及文档等明确证据。
  - 原文依据：
    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit与release引用，且仅靠机器人自动关闭，无人工解决说明评论。
  - 原文依据：
    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论、commit及release引用，解决证据偏弱。
  - 原文依据：
    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 23分
  - 痛点原因：仅通过评论和状态变更关闭测试 issue，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 23分
  - 痛点原因：虽有关联PR，但缺乏commit引用与文档链接，且关闭说明仅为机器人简略回复，修复证据链不完整。
  - 原文依据：
    - [关联PR #8824（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8824)    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 23分
  - 痛点原因：仅通过评论文字解答并关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 31分
  - 痛点原因：无关联 PR、文档及 release 等实质性修复证据，仅停留在技术讨论与等待反馈阶段，问题未解决。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并PR和机器人自动关闭记录，但缺乏人工确认评论、文档链接及release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 31分
  - 痛点原因：仅引导用户提工单并询问细节，未在issue内提供实质性解决方案，无关联PR或文档修复证据。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅称处理中，缺乏明确的修复发布证据。
  - 原文依据：
    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)    - [关联PR #8648（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8648)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 38分
  - 痛点原因：仅指路其他仓库后直接关闭，无PR、commit或文档等实质解决证据即标记完成。
  - 原文依据：
    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 38分
  - 痛点原因：关联的修复PR仍处于open状态未合并，且缺乏commit和release引用作为最终解决证据。
  - 原文依据：
    - [关联PR #8838（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8838)    - [关联PR #8840（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8840)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论中缺乏问题已修复的明确验证证据。
  - 原文依据：
    - [关联PR #8831（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8831)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 46分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭且无人工关闭评论与release引用，缺乏解决验证证据。
  - 原文依据：
    - [关联PR #8562（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8562)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 46分
  - 痛点原因：仅有指派记录，无关联PR、release说明及关闭评论，缺乏问题已解决的直接证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接、release引用及明确的修复验证结论，导致解决佐证不充分。
  - 原文依据：
    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)    - [关联PR #8864（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8864)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 54分
  - 痛点原因：未关联修复PR，仅凭文字解释问题不存在便直接关闭，缺乏实质修复证据。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
#### PP-08 讨论停滞后无跟进升级机制（I3 · 总结与关闭）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：关闭时无任何说明文字，也未提供方案文档或重复链接，未留下可供后续复用的有效信息。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 0分
  - 痛点原因：因超时无反馈被机器人自动关闭，关闭说明为0字且未沉淀方案文档，无任何复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：assigned to @chaotang233
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅包含指派和询问算子路径的无效沟通。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 0分
  - 痛点原因：该测试issue仅由系统自动关闭，无方案文档与重复链接，关闭说明仅12字，毫无经验沉淀。
  - 原文依据：
    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：测试issue请及时关闭
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：关闭说明为空且无方案文档化记录，仅分配任务与回复处理中，无任何可复用价值。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与关联链接，仅由系统自动关闭，毫无复用参考价值。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 0分
  - 痛点原因：关闭时无任何文字说明，且关联的PR仍处于未合并状态，缺乏可复用的解决总结。
  - 原文依据：
    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无人工关闭说明、方案文档及重复链接，未留存任何参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，关闭说明为0字，且无方案文档与重复代码主链接，未留存任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人随PR合并自动关闭，未留存可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档或重复链接，导致该需求的处理经验无法被后续复用。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅靠机器人关联PR自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档化记录，仅由系统自动关闭，未沉淀有效解决方案供他人复用。
  - 原文依据：
    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71    - `liuboxi`：unassigned @liuboxi
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀解决方案，导致无法为后续类似需求提供复用价值。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 0分
  - 痛点原因：仅引导用户去其他平台提工单，未提供任何解决方案、文档链接或有效关闭说明。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 25分
  - 痛点原因：关闭说明仅为机器人自动关联MR的模板回复，未沉淀中间结果溢出的具体修复方案与根本原因，无法供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 25分
  - 痛点原因：关闭时仅引导去其他仓库提issue，未沉淀具体解决方案，无法供后续用户参考复用。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 25分
  - 痛点原因：关闭说明仅60字且无方案文档化与复用链接，导致关闭后无法为类似问题提供有效参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 25分
  - 痛点原因：未沉淀文档化解决方案且无主链接关联，仅给出简短关闭说明，导致问题解答缺乏复用价值。
  - 原文依据：
    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因PR合并自动关闭，缺乏人工总结的复用信息且无重复issue链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 30分
  - 痛点原因：关闭时仅由机器人关联MR自动关闭，人工未补充任何文字说明，导致关闭说明为0字，缺乏复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `alfengyuan`：assigned to @alfengyuan
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 30分
  - 痛点原因：关闭说明为0字且无主链接，仅由机器人随PR合并自动关闭，缺乏人工复用价值沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 30分
  - 痛点原因：关闭说明仅43字且无dup主链接，仅以关联issue合并为由关闭，缺乏完整上下文和复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：assigned to @kknan    - `weihao18`：assigned to @captainmiaow
- **[#3617](https://gitcode.com/cann/ops-transformer/issues/3617) [Documentation|文档反馈]:aclnnLightningIndexerGrad、aclnnNormRopeConcat、aclnnNormRop…** — 30分
  - 痛点原因：关闭说明仅提及关联 issue 而无具体方案链接，且未提供 dup 主链接，导致其他用户难以复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3617    - `cann-robot`：add label resolved    - `wang-minbo`：好的，我们attention、posembedding的专家马上来处理    - `fazhenyao123`：aclnnMoeTokenPermuteWithRoutingMapGrad.md资料修复已合入    - `cann-robot`：### Notice This issue can not be assigned to ***jiangjiawei***. Please try to assign to the repository members.    - `cann-robot`：### Notice This issue can not be assigned to ***何宇航***. Please try to assign to the repository members.
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 30分
  - 痛点原因：关闭说明仅由机器人自动生成且字数极少，缺乏人工总结的解决方案与经验沉淀，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608    - `cann-robot`：add label resolved    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 55分
  - 痛点原因：关闭说明仅由机器人自动关联合并请求生成，缺乏人工对具体解决方案的总结，且无重复issue主链接，参考价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：assigned to @captainmiaow    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)
- **[#3659](https://gitcode.com/cann/ops-transformer/issues/3659) [Bug-Report|缺陷反馈]: mc2/mega_moe 算子编码风格存在一些问题，需要优化** — 55分
  - 痛点原因：关闭说明仅58字且为机器人合并自动回复，缺乏人工对问题与方案的总结，且无主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3659    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `jy_du`：[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我    - `liudan12`：>[@liudan12](https://gitcode.com/liudan12) 我感兴趣，可以assign给我 [@jy_du](https://gitcode.com/jy_du) 欢迎欢迎    - `liudan12`：assigned to @jy_du
#### PP-09 决策透明度低，后续路径不清晰（I2 · 讨论与解决）

- **[#3697](https://gitcode.com/cann/ops-transformer/issues/3697) [Requirement|需求建议]: QLIV2批跑pytest功能适配** — 0分
  - 痛点原因：无任何关联PR、代码提交或文档链接等解决证据，评论仅停留在要求补充细节与加标签，未体现实际解决过程。
  - 原文依据：
    - `weihao18`：你好，QLIV2批跑功能缺失，可以描述得更具体一些吗    - `zzzyh22`：add label requirement
- **[#3683](https://gitcode.com/cann/ops-transformer/issues/3683) dispatch 算子的 token 分配在 TP>1 + PP>1 时，micro batch 边界的 token 在不同 rank 上被分配到不同的专家** — 0分
  - 痛点原因：无关联PR、commit引用及关闭评论，仅有人工分配与询问路径的对话，未提供任何问题被解决的实质性证据。
  - 原文依据：
    - `weihao18`：/assign [@cpy_123456](https://gitcode.com/cpy_123456)    - `cpy_123456`：您好，方便提供下算子文件路径吗，dispatch有多个算子，便于我们找到相关专家处理    - `cann-robot`：assigned to @cpy_123456
- **[#3675](https://gitcode.com/cann/ops-transformer/issues/3675) [Bug-Report|缺陷反馈]: 变量定义 和 函数定义 不合理导致 代码编译过程产生告警，建议修改代码实现消除告警，详见问题单正文** — 0分
  - 痛点原因：仅分配负责人并回复处理中，未关联任何PR、commit或文档链接等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢您的反馈，处理中    - `cann-robot`：assigned to @captainmiaow
- **[#3664](https://gitcode.com/cann/ops-transformer/issues/3664) [Bug-Report|缺陷反馈]: FIA tiling写死核数，不兼容Ascend950** — 0分
  - 痛点原因：仅由codehub直接关闭，无关联PR、commit引用及关闭评论，未留下任何修复证据。
  - 原文依据：
    - `demoauguste`：closed from codehub
- **[#3629](https://gitcode.com/cann/ops-transformer/issues/3629) [Requirement|需求建议]: 修复smlag metadata在A2/A3被拦截的问题** — 0分
  - 痛点原因：仅靠机器人自动关闭并关联PR，缺乏commit引用、文档链接及release引用等实质性证据，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8342（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8342)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3625](https://gitcode.com/cann/ops-transformer/issues/3625) fix moe_ep_dispatch accuracy** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭并打标签，缺乏人工总结评论及commit、文档等直接修复证据。
  - 原文依据：
    - [关联PR #8336（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8336)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3625    - `cann-robot`：add label resolved
- **[#3624](https://gitcode.com/cann/ops-transformer/issues/3624) [Requirement|需求建议]: nsa_compress_attention_infer 算子需要支持310p系列** — 0分
  - 痛点原因：需求暂不做规划被搁置，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `monologue815`：你好，此前NSA在910B系列作为尝试，目前主流模型没有使用， 1. 当前在310P系列上暂不做规划； 2. 310P系列可以根据模型具体稀疏的算法来看具体算子的需求情况； 如果有相关稀疏的特殊需求，欢迎在SIG例会上讨论一下~    - `wang-minbo`：assigned to @xtqh    - `cann-robot`：assigned to @L_Euler and unassigned @xtqh
- **[#3620](https://gitcode.com/cann/ops-transformer/issues/3620) [Bug-Report|缺陷反馈]: MatmulAllReduce int8低比特通信时存在精度问题** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏人工关闭评论、commit引用及文档等明确证据。
  - 原文依据：
    - [关联PR #8285（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8285)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3620    - `cann-robot`：add label resolved
- **[#3716](https://gitcode.com/cann/ops-transformer/issues/3716) [Bug-Report|缺陷反馈]: mhc_post资料修改** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit与release引用，且仅靠机器人自动关闭，无人工解决说明评论。
  - 原文依据：
    - [关联PR #8602（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8602)    - [关联PR #8603（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8603)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3716    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3672](https://gitcode.com/cann/ops-transformer/issues/3672) 修改slig文档示例** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，无人工关闭评论、commit及release引用，解决证据偏弱。
  - 原文依据：
    - [关联PR #8461（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8461)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3672    - `cann-robot`：add label resolved
- **[#3656](https://gitcode.com/cann/ops-transformer/issues/3656) [Bug-Report|缺陷反馈]: mhc_pre_sinkhorn() takes from 6 to 8 positional arguments bu…** — 15分
  - 痛点原因：关联PR处于open状态未合并，无commit和release引用及关闭评论，缺乏解决闭环证据。
  - 原文依据：
    - [关联PR #8902（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8902)    - `weihao18`：/assign [@taochangmin](https://gitcode.com/taochangmin)    - `cann-robot`：### Notice This issue can not be assigned to ***taochangmin***. Please try to assign to the repository members.    - `weihao18`：assigned to @taochangmin
- **[#3676](https://gitcode.com/cann/ops-transformer/issues/3676) test issue mhc optional** — 23分
  - 痛点原因：仅通过评论和状态变更关闭测试 issue，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：测试issue请及时关闭    - `weixin_44156099`：closed from codehub    - `weixin_44156099`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3615](https://gitcode.com/cann/ops-transformer/issues/3615) [Bug-Report|缺陷反馈]: all_gather_matmul_aiv_mode_tiling.h 头文件中使用了uint32_t数据类型，但是没有…** — 23分
  - 痛点原因：虽有关联PR，但缺乏commit引用与文档链接，且关闭说明仅为机器人简略回复，修复证据链不完整。
  - 原文依据：
    - [关联PR #8824（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8824)    - `wang-minbo`：好的，确认是问题，我们会尽快修复    - `zhu-mingzhe71`：closed from codehub    - `cann-robot`：add label resolved    - `wang-minbo`：assigned to @liuboxi    - `liuboxi`：assigned to @zhu-mingzhe71
- **[#3593](https://gitcode.com/cann/ops-transformer/issues/3593) [Question|问题咨询]: all_gather_matmul和all_gather_matmul_v2的差别是什么，在A2和A3上是否有区别？** — 23分
  - 痛点原因：仅通过评论文字解答并关闭，未关联任何PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 感谢您的反馈，我们将尽快处理    - `zhu-mingzhe71`：您好，感谢您的关注，这三个问题的说明如下： 1、这两个算子的区别主要体现在两个方面： - 功能上：all_gather_matmul算子不支持量化后的低精度输入类型，而all_gather_matmul_v2支持a8w8与a4w4两种低精…    - `captainmiaow`：无后续问题，可以关闭该issue    - `captainmiaow`：closed from codehub    - `captainmiaow`：changed custom state from 进行中 to 已完成
- **[#3684](https://gitcode.com/cann/ops-transformer/issues/3684) MLA preprocess 算子在 prefix caching prefetch 场景下，prefill 阶段的 kv cache 区域在 decode …** — 31分
  - 痛点原因：无关联 PR、文档及 release 等实质性修复证据，仅停留在技术讨论与等待反馈阶段，问题未解决。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，算子写k cache用的是slotmapping，batch offset是读输入x做matmul的行偏移，与cache写位置无关。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3628](https://gitcode.com/cann/ops-transformer/issues/3628) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并PR和机器人自动关闭记录，但缺乏人工确认评论、文档链接及release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #8287（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8287)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3628    - `cann-robot`：add label resolved
- **[#3591](https://gitcode.com/cann/ops-transformer/issues/3591) [Question|问题咨询]: 边缘场景外置带卡服务拉起时，容器空载情况下host侧占用内存较多（是中心场景的几倍），请问这是cann的什么机制吗？** — 31分
  - 痛点原因：仅引导用户提工单并询问细节，未在issue内提供实质性解决方案，无关联PR或文档修复证据。
  - 原文依据：
    - `yu-xinjie62`：您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。    - `easel`：>您好，310P镜像相关问题建议您上昇腾社区https://www.hiascend.com/feedback/add?referrer=/zh提交工单，工单处理人将为您第一时间解决。 [@yu-xinjie62](https://git…    - `yu-xinjie62`：请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。    - `easel`：>请问能否确定到是哪个具体的.so？目前本仓库负责transformer类算子，如果有该类别算子内存异常占用情况我们进一步定位分析。如果是整个CANN的问题，建议您上昇腾社区提相应工单获得完整的分析与答复。 [@yu-xinjie62](…    - `yu-xinjie62`：您好，您这里占比比较多的.so分属不同的组件，包含了框架、算子等，涉及mindspore、ops-legacy、ops-nn、ops-transformer、compiler、ge等，建议您直接在昇腾社区上提工单。    - `wang-minbo`：assigned to @yu-xinjie62
- **[#3695](https://gitcode.com/cann/ops-transformer/issues/3695) [Documentation|文档反馈]: 文档算子数据类型描述问题：文档中的x1_scale/x2_scale数据类型描述与算子中的定义不一致，详见问题描述…** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅称处理中，缺乏明确的修复发布证据。
  - 原文依据：
    - [关联PR #8615（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8615)    - [关联PR #8648（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8648)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：感谢反馈，处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3695    - `cann-robot`：add label resolved
- **[#3693](https://gitcode.com/cann/ops-transformer/issues/3693) [Question|问题咨询]: matmul --不可用** — 38分
  - 痛点原因：仅指路其他仓库后直接关闭，无PR、commit或文档等实质解决证据即标记完成。
  - 原文依据：
    - `weihao18`：你好，runtime的错误建议到这里提issue 咨询：https://gitcode.com/cann/runtime    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3627](https://gitcode.com/cann/ops-transformer/issues/3627) [Documentation|文档反馈]: aclnnGroupedMatmulAddV2、aclnnGroupedMatmulFinalizeRouting…** — 38分
  - 痛点原因：关联的修复PR仍处于open状态未合并，且缺乏commit和release引用作为最终解决证据。
  - 原文依据：
    - [关联PR #8838（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8838)    - [关联PR #8840（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8840)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，已路由给相关责任人修复。    - `kknan`：https://gitcode.com/cann/ops-transformer/blob/master/gmm/grouped_matmul_add/docs/aclnnGroupedMatmulAddV2.md 已修复，剩余问题待上库    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3627
- **[#3608](https://gitcode.com/cann/ops-transformer/issues/3608) QuantGroupedMatmulInplaceAdd算子的参数说明长时间未更新** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论中缺乏问题已修复的明确验证证据。
  - 原文依据：
    - [关联PR #8831（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8831)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：第二个问题：是的，量化模式支持对应的已支持数据类型没问题。 第一个问题能麻烦再详细描述下吗    - `yunjuanya123`：这个链接https://gitcode.com/cann/ops-transformer/blob/master/gmm/quant_grouped_matmul_inplace_add/README.md里面的，参数说明一直没更新 ![…    - `kknan`：收到，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3608
- **[#3700](https://gitcode.com/cann/ops-transformer/issues/3700) [Bug-Report|缺陷反馈]: posembedding/inplace_partial_rotary_mul_grad/tests/ut/op_hos…** — 46分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭且无人工关闭评论与release引用，缺乏解决验证证据。
  - 原文依据：
    - [关联PR #8562（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8562)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3700    - `alfengyuan`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3600](https://gitcode.com/cann/ops-transformer/issues/3600) [Requirement|需求建议]: （A2/A3）FlashAttentionScore 算子在 D>128 情况下开启 L1 Reuse** — 46分
  - 痛点原因：仅有指派记录，无关联PR、release说明及关闭评论，缺乏问题已解决的直接证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3714](https://gitcode.com/cann/ops-transformer/issues/3714) [Bug-Report|缺陷反馈]: 超大shape时（MN 超过 uint32最大值时），算子计算结果出现精度异常问题，经代码检视发现存在中间结果溢出的情况…** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接、release引用及明确的修复验证结论，导致解决佐证不充分。
  - 原文依据：
    - [关联PR #8687（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8687)    - [关联PR #8864（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8864)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢您的反馈，修复处理中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3714    - `cann-robot`：add label resolved
- **[#3682](https://gitcode.com/cann/ops-transformer/issues/3682) FA TND 布局的 CombineSplitKVRes 在 batch 间 S1 长度不同时，lseOffset 的预填值覆盖了有效 batch 的 LSE…** — 54分
  - 痛点原因：未关联修复PR，仅凭文字解释问题不存在便直接关闭，缺乏实质修复证据。
  - 原文依据：
    - `weihao18`：/assign [@huang-chuhong](https://gitcode.com/huang-chuhong)    - `huang-chuhong`：感谢补充。经分析，#3682 描述的问题不存在，具体说明如下： ## 1. 不存在 lseOffset 重复覆盖问题 #3681 的修复中 `lseBatchOffset` 取累积有效 S1（`actualSeqQlenAddr[bIdx…    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted

## 5. 本周行动清单

### REC-01 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot治理维护者；候选负责人 `weihao18` |
| 触发条件 | Bot执行关闭操作前 |
| 具体动作 | 增加关闭前置校验：检查Issue内是否有未合并PR、用户是否确认解决、是否存在未回答的追问，不满足条件时阻止自动关闭 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 5 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 32.2，低分 18/27 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 91.1，低分 0/27 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | PR创建合并即人工处理证据，bot关闭后无需额外接手，流程闭环完整。 | 改善 Bot 到人工处理的交接质量 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | Maintainer团队；候选负责人 `weihao18` |
| 触发条件 | Issue无活动超过7天 |
| 具体动作 | 自动触发状态检查，要求assignee给出明确处置决策（解决/延期/关闭/转交） |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 14.4，低分 27/27 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 48.9，低分 16/27 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时无后续反馈路径说明，无评论引导，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者/SIG负责人；候选负责人 `weihao18` |
| 触发条件 | Issue assign后48小时无新评论 |
| 具体动作 | 自动提醒assignee发布技术评估或进展说明 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；平均评论数提升至 2 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 68.9，低分 8/27 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 25.9，低分 25/27 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无任何评论讨论，但两个PR创建并合并表明问题通过代码直接解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-04 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-04 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot治理维护者；候选负责人 `weihao18` |
| 触发条件 | 新Issue创建时 |
| 具体动作 | 配置Issue创建自动响应：根据标题前缀[Documentation|Requirement|Question]自动打标签、发送模板引导评论、执行初步assign |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 5 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 32.2，低分 18/27 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 91.1，低分 0/27 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | PR创建合并即人工处理证据，bot关闭后无需额外接手，流程闭环完整。 | 改善 Bot 到人工处理的交接质量 |

### REC-05 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-05 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot治理维护者；候选负责人 `weihao18` |
| 触发条件 | Issue assign后7天无新评论 |
| 具体动作 | Bot自动在Issue下发送催办评论@assignee，提醒跟进或说明阻塞原因 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 32.2，低分 18/27；OBJ_BOT_MISCLOSE_REVERSE：均值 91.1，低分 0/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 32.2，低分 18/27 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 91.1，低分 0/27 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | PR创建合并即人工处理证据，bot关闭后无需额外接手，流程闭环完整。 | 改善 Bot 到人工处理的交接质量 |

### REC-06 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-06 |
| 影响环节 | 总结与关闭 |
| 承接方 | Maintainer团队；候选负责人 `weihao18` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 强制填写关闭总结模板（解决方案、决策依据、复用建议），否则阻止关闭 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 14.4，低分 27/27 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 48.9，低分 16/27 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时无后续反馈路径说明，无评论引导，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-07 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-07 |
| 影响环节 | 讨论与解决 |
| 承接方 | assignee；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后72小时内 |
| 具体动作 | 发布技术评估评论，包含问题确认、初步方案或排期说明 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 40 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 68.9，低分 8/27 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 25.9，低分 25/27 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无任何评论讨论，但两个PR创建并合并表明问题通过代码直接解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-08 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-08 |
| 影响环节 | 总结与关闭 |
| 承接方 | Maintainer团队；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后7天无assignee技术回复 |
| 具体动作 | 自动升级至maintainer review，重新评估责任分配或触发协同处理 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 14.4，低分 27/27；OBJ_DECISION_TRANSPARENCY：均值 48.9，低分 16/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 14.4，低分 27/27 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 48.9，低分 16/27 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时无后续反馈路径说明，无评论引导，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-09 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-09 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `weihao18` |
| 触发条件 | 对Issue做出处置决策（延期/转交/需补充信息）时 |
| 具体动作 | 使用决策模板评论，包含决策类型、理由、后续条件和预期时间线 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 50 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 25.9，低分 25/27；OBJ_RESULT_FORMATION_TIMELINESS：均值 68.9，低分 8/27 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 68.9，低分 8/27 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 25.9，低分 25/27 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无任何评论讨论，但两个PR创建并合并表明问题通过代码直接解决。 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.4/100**，整体相对可控，但仍需关注：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.4 | 内部贡献者真实需求，无AI幻觉或虚假信息迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 66.3 | 模板字段大部分为空，仅填背景信息，缺少设计方案权益说明 |

代表低分 Issue：[#3680](https://gitcode.com/cann/ops-transformer/issues/3680)
问题：[Bug-Report|缺陷反馈]: Tiling重构检视意见。

### I1 · 分配与首次响应
本阶段分数为 **68.5/100**，整体相对可控，但仍需关注：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 48.1 | 均值 48.1，低分 14/27 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 85.9 | 均值 85.9，低分 1/27 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 68.9 | 无assignee，无维护者评论，责任归属仅能从PR链接间接推断。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 72.4 | 作者自加bug-report标签，后续有PR合并并触发bot关闭，路由路径正确。 |

代表低分 Issue：[#3672](https://gitcode.com/cann/ops-transformer/issues/3672)
问题：修改slig文档示例。

### I2 · 讨论与解决
本阶段分数为 **51.6/100**，本阶段需要改进，主要问题是：讨论停滞，初始响应后无推进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 68.9 | 均值 68.9，低分 8/27 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 25.9 | 均值 25.9，低分 25/27 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 53.2 | 无任何评论讨论，但两个PR创建并合并表明问题通过代码直接解决。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 62.9 | 用户要求readme修改，两个关联PR已合并，bot标记resolved，目标… |

代表低分 Issue：[#3697](https://gitcode.com/cann/ops-transformer/issues/3697)
问题：[Requirement|需求建议]: QLIV2批跑pytest功能适配。

### I3 · 总结与关闭
本阶段分数为 **43.5/100**，本阶段需要改进，主要问题是：Issue长期开放无关闭决策机制。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 14.4 | 均值 14.4，低分 27/27 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 48.9 | 均值 48.9，低分 16/27 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.0 | 关闭时无后续反馈路径说明，无评论引导，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.3 | 关闭由MR合并触发，有实际代码提交，非过早关闭。 |

代表低分 Issue：[#3628](https://gitcode.com/cann/ops-transformer/issues/3628)
问题：[Bug-Report|缺陷反馈]: cleancode重复代码整改。

### G · Bot/Agent 治理
本阶段分数为 **64.0/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 32.2 | 均值 32.2，低分 18/27 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 91.1 | 均值 91.1，低分 0/27 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 67.1 | PR创建合并即人工处理证据，bot关闭后无需额外接手，流程闭环完整。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 65.4 | 无bot介入记录，信息不足，给中性保守分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 69.7 | 无bot介入记录，信息不足，给中性保守分。 |

代表低分 Issue：[#3628](https://gitcode.com/cann/ops-transformer/issues/3628)
问题：[Bug-Report|缺陷反馈]: cleancode重复代码整改。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 132 | 47.1 | 首期基线 | 78.4 | 68.5 | 51.6 | 43.5 | 64.0 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **14 位社区响应者**贡献 **93 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `weihao18` | 67 |
| `captainmiaow` | 5 |
| `kknan` | 4 |
| `huang-chuhong` | 3 |
| `yu-xinjie62` | 3 |

Top1 响应占比 **72.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：92.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-transformer/report_cann-ops-transformer_2026-07-06_to_2026-07-12.json`。
