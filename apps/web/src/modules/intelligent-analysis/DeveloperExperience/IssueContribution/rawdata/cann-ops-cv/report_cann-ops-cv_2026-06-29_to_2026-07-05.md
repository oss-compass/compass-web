# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **20** 个 Issue
+ **Open 2 / Closed 18**，关闭率 **90.0%**。
+ 总体体验分为 **49.9/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 48.7 | 关闭状态语义矛盾普遍存在 |
| P1 | I2 · 讨论与解决 | 59.6 | 路线图Issue缺乏讨论和响应 |
| P2 | I1 · 分配与首次响应 | 64.4 | 25% Issue 分流不当，标签缺失和分类错误导致处理路径偏差 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 增加 close_reason 与 resolved 标签一致性校验，矛盾时阻断关闭并提示人工确认 |
| REC-02 | P1 | 校验验收清单完成度，未完成时提示人工确认而非自动关闭 |
| REC-03 | P1 | 在关闭模板中增加后续反馈路径必填项，提供SIG会议入口和重新评估条件 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 20 |
| Open / Closed | 2 / 18 |
| 关闭率 | 90.0% |
| 类型构成 | 缺陷 7 / 需求 6 / 其他 7 |
| 总体体验分 | 49.9/100（D） |
| 首次响应时间 | 中位 1.6h；均值 16.5h |
| 关闭周期 | 中位 2.0天；均值 6.5天 |
| 7天响应率 | 95.0% |
| 评论数/Issue | 1.40 |
| 标签覆盖率 | 85.0% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 94.1/100 |
| 置信度 | 中 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 82.5 | 1/20（5.0%） | 相对可控 | `SUB_INPUT_QUALITY` 74.0 |
| I1 · 分配与首次响应 | 64.4 | 5/20（25.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 29.0 |
| I2 · 讨论与解决 | 59.6 | 5/20（25.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 32.3 |
| I3 · 总结与关闭 | 48.7 | 13/20（65.0%） | P0 | `OBJ_CLOSURE_REUSE` 15.5 |
| G · Bot/Agent 治理（参考） | 64.7 | 2/20（10.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 26.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭状态语义矛盾普遍存在 | OBJ_CLOSURE_REUSE：均值 15.5，低分 19/20；OBJ_DECISION_TRANSPARENCY：均值 67.0，低分 4/20 | 关闭状态不透明，难以追踪实际完成度，影响社区信任和后续维护 |
| PP-02 | P1 | G · Bot/Agent 治理 | Bot自动关闭缺乏验收校验 | OBJ_BOT_GOVERNANCE：均值 26.0，低分 17/20；OBJ_BOT_MISCLOSE_REVERSE：均值 98.0，低分 0/20 | 未完成工作被标记为已解决，后续工作无追踪入口 |
| PP-03 | P1 | I3 · 总结与关闭 | 关闭时缺乏后续反馈路径 | OBJ_CLOSURE_REUSE：均值 15.5，低分 19/20；OBJ_DECISION_TRANSPARENCY：均值 67.0，低分 4/20 | 用户失去后续反馈入口，问题复发时无重新开启路径 |
| PP-04 | P1 | I2 · 讨论与解决 | 路线图Issue缺乏讨论和响应 | OBJ_SOLUTION_EVIDENCE：均值 32.3，低分 19/20；OBJ_RESULT_FORMATION_TIMELINESS：均值 79.0，低分 5/20 | 社区无法参与路线图讨论，协作透明度低，贡献者无从下手 |
| PP-05 | P2 | I1 · 分配与首次响应 | 分流阶段标签缺失和分类不当 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 29.0，低分 14/20；OBJ_RESPONSE_SPEED：均值 80.0，低分 3/20 | 分流不准确导致处理路径偏差，影响响应效率和问题追踪 |
| PP-06 | P2 | I2 · 讨论与解决 | 范围缩减未充分讨论即关闭 | OBJ_SOLUTION_EVIDENCE：均值 32.3，低分 19/20；OBJ_RESULT_FORMATION_TIMELINESS：均值 79.0，低分 5/20 | 未完成范围被隐藏，问题可能遗留，缺乏透明度 |

### 4.1 低分 Issue 明细

#### PP-01 关闭状态语义矛盾普遍存在（I3 · 总结与关闭）

- **[#596](https://gitcode.com/cann/ops-cv/issues/596) [Bug-Report|缺陷反馈]:** — 0分
  - 痛点原因：关闭时未留下任何文字说明，导致前期的方案讨论未能沉淀为可供后续参考的经验总结。
  - 原文依据：
    - `liu-wei`：您好，这个问题可以按“算子清单 + 开发流程 + 现有能力复用”三部分看： 1. 各算子库最新清单 各仓库的清单入口都在 `docs/zh/op_list.md`，aclnn 接口清单在 `docs/zh/op_api_list.md`：…    - `liu-wei`：您好，这个还有什么问题吗？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：assigned to @liu-wei
- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动回复，无方案文档化记录，未关联重复主issue链接，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 0分
  - 痛点原因：关闭说明仅简单确认问题，无具体修复方案文档与重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…
- **[#593](https://gitcode.com/cann/ops-cv/issues/593) [Bug-Report|缺陷反馈]: roiPoolingGradWithArgMax算子原子加操作缺少simt的命名空间** — 0分
  - 痛点原因：关闭说明仅14字且无方案文档与复现链接，缺乏根因分析与解决细节，导致无复用价值。
  - 原文依据：
    - `nunnons2`：closed from codehub    - `nunnons2`：changed custom state from 进行中 to 已完成    - `nunnons2`：add label bug-report    - `cann-robot`：add label Accepted    - `liu-wei`：问题已解决，issue关闭。    - `nunnons2`：assigned to @nunnons2
- **[#592](https://gitcode.com/cann/ops-cv/issues/592) [Requirement|需求建议]: upsample_linear1d算子需要补充proto和infer_shape** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档沉淀，未关联重复issue，未提供任何复用信息。
  - 原文依据：
    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `liu-wei`：提完issue后记得指派给自己。    - `liu-wei`：assigned to @rsj007    - [关联PR #1078（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1078)
- **[#591](https://gitcode.com/cann/ops-cv/issues/591) ops-cv Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及关联链接，仅记录指派操作，未沉淀任何可复用信息。
  - 原文依据：
    - `liu-wei`：assigned to @zhou-qilong    - `liu-wei`：assigned to @liu-wei
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 0分
  - 痛点原因：关闭说明仅20字且无方案文档与重复链接，未留下任何可复用的解决知识。
  - 原文依据：
    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `liu-wei`：assigned to @rsj007
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档沉淀与重复链接，关闭说明为系统模板，缺乏人工总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - `cann-robot`：add label resolved    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：assigned to @ugzhangyiyi    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联主链接，仅由机器人自动关闭，缺乏后续复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - `cann-robot`：add label resolved    - `SimonZzz`：/assign    - `cann-robot`：assigned to @SimonZzz    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 0分
  - 痛点原因：无人工关闭说明与方案文档化，仅由机器人自动关闭，导致无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联链接，未沉淀有效经验供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - `cann-robot`：add label resolved    - `yu_qinfei`：/assign    - `cann-robot`：assigned to @yu_qinfei    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 0分
  - 痛点原因：关闭说明仅20字且无方案文档，PR描述被指过于简单，未沉淀任何可供复用的技术细节与解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - `cann-robot`：add label resolved    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `liu-wei`：assigned to @rsj007    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅因关联MR合并而关闭，未留下可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)
- **[#587](https://gitcode.com/cann/ops-cv/issues/587) [Bug-Report|缺陷反馈]: image_projective_transform int32类型转换未处理float溢出/NaN，与x86行为不一致…** — 25分
  - 痛点原因：仅由机器人自动关联PR关闭且说明简短，缺乏方案文档化记录与复现主链接，导致其他用户难以复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue587    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `yourealize`：修复 PR：https://gitcode.com/cann/ops-cv/merge_requests/1068    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize
- **[#584](https://gitcode.com/cann/ops-cv/issues/584) [Follow-up] ops-cv --pkg-type=deb/rpm 包构建遗留问题清理** — 25分
  - 痛点原因：缺乏方案文档沉淀与重复issue关联，且关闭说明仅65字过于简略，无法供后续复用。
  - 原文依据：
    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1058 (feat(build): 支持 --pkg-type=deb/rpm 包构建) 检视遗留问题跟踪    - `liu-wei`：问题已修复，该issue关闭。
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 30分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，缺乏人工补充的解决方案细节，导致其他用户无法参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)
- **[#590](https://gitcode.com/cann/ops-cv/issues/590) ops-cv仓修复beta3 包编译线失败问题** — 45分
  - 痛点原因：关闭说明仅留机器人记录，无方案文档沉淀，且明确遗留10个同类cmake模块问题暂不修改，缺乏参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue590    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1071 (`修复beta3 包编译线失败问题`) 只补了 `FindOPBASE.cmake` 单点的 `NO_DEFAULT_PATH`。本 issue 跟踪剩余 10 个 Find*.cmake 模块（Find…    - `liu-wei`：先修改OPBSE的，其他的暂时不用修改。    - `liu-wei`：assigned to @liu-wei    - [关联PR #1071（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1071)
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 55分
  - 痛点原因：关闭说明仅由机器人触发并关联合并请求，缺乏具体文档修改方案沉淀，且无重复issue主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 55分
  - 痛点原因：关闭说明仅为机器人自动关联MR的模板话术，缺乏人工对最终修复方案的总结与主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
#### PP-02 Bot自动关闭缺乏验收校验（G · Bot/Agent 治理）

- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 20分
  - 痛点原因：Bot仅做后台打标与分配，无任何评论互动，且与人工操作冲突，治理流于形式。
  - 原文依据：
    - `yourealize`：/assign    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 20分
  - 痛点原因：Bot仅完成打标，无自动评论与自动关闭动作，后续沟通引导及关闭均依赖人工处理。
  - 原文依据：
    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @nunnons2    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#593](https://gitcode.com/cann/ops-cv/issues/593) [Bug-Report|缺陷反馈]: roiPoolingGradWithArgMax算子原子加操作缺少simt的命名空间** — 20分
  - 痛点原因：Bot仅执行打标，未在用户反馈问题解决后自动关闭issue，缺乏闭环治理。
  - 原文依据：
    - `liu-wei`：问题已解决，issue关闭。    - `nunnons2`：add label bug-report    - `cann-robot`：add label Accepted    - `nunnons2`：assigned to @nunnons2    - `nunnons2`：closed from codehub    - `nunnons2`：changed custom state from 进行中 to 已完成
- **[#590](https://gitcode.com/cann/ops-cv/issues/590) ops-cv仓修复beta3 包编译线失败问题** — 20分
  - 痛点原因：Bot在问题仅部分修复时直接打标resolved并关闭，且零评论，治理粗暴缺乏沟通。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1071 (`修复beta3 包编译线失败问题`) 只补了 `FindOPBASE.cmake` 单点的 `NO_DEFAULT_PATH`。本 issue 跟踪剩余 10 个 Find*.cmake 模块（Find…    - `liu-wei`：先修改OPBSE的，其他的暂时不用修改。    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue590    - [关联PR #1071（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1071)
- **[#589](https://gitcode.com/cann/ops-cv/issues/589) NPU_ARCH deprecation timeline更改** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，关联PR等信息均由人工发布，缺乏主动互动与引导。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1067 (fix(example): rename NPU_ARCH to NPU_SOC_VERSION and dynamically adapt Python version tag) 重命名 NPU_ARC…    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue589    - [关联PR #1067（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1067)    - [关联PR #1074（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1074)
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 20分
  - 痛点原因：Bot仅完成基础打标且无评论，未主动提醒补充描述或预警超时，治理动作被动，完全依赖人工介入。
  - 原文依据：
    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @rsj007    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成
- **[#587](https://gitcode.com/cann/ops-cv/issues/587) [Bug-Report|缺陷反馈]: image_projective_transform int32类型转换未处理float溢出/NaN，与x86行为不一致…** — 20分
  - 痛点原因：Bot仅自动打标resolved，全程零评论，缺乏对用户提交修复PR及分配指令的有效反馈与交互。
  - 原文依据：
    - `yourealize`：修复 PR：https://gitcode.com/cann/ops-cv/merge_requests/1068    - `yourealize`：/assign    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue587
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 20分
  - 痛点原因：Bot错误打标resolved并关闭issue，但实际文档问题未解决且刚分配责任人，治理动作与真实状态脱节。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 20分
  - 痛点原因：Bot仅机械打标和关闭，评论数为0，在用户催促及分配责任人时未提供有效回复与引导，缺乏实质性治理干预。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#584](https://gitcode.com/cann/ops-cv/issues/584) [Follow-up] ops-cv --pkg-type=deb/rpm 包构建遗留问题清理** — 20分
  - 痛点原因：Bot仅完成打标，未执行关闭issue和评论等核心动作，治理完全依赖人工。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1058 (feat(build): 支持 --pkg-type=deb/rpm 包构建) 检视遗留问题跟踪    - `liu-wei`：问题已修复，该issue关闭。    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 20分
  - 痛点原因：Bot仅机械执行指派、打标与关闭动作，全程无任何评论反馈与说明，治理缺乏有效沟通。
  - 原文依据：
    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ugzhangyiyi    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关联关闭，全程无评论互动，缺乏对用户的有效沟通与治理透明度。
  - 原文依据：
    - `SimonZzz`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimonZzz    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程无评论互动，缺乏对用户的有效反馈，治理过程不透明。
  - 原文依据：
    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 20分
  - 痛点原因：Bot虽完成了打标、分配与关闭操作，但全程无任何评论反馈，缺乏对用户指令的明确响应说明。
  - 原文依据：
    - `yu_qinfei`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 20分
  - 痛点原因：Bot仅机械打标并随MR合并关闭，全程零评论互动，缺乏对用户反馈的有效引导与回应。
  - 原文依据：
    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，未在要求补充描述等环节发挥有效的过程治理作用。
  - 原文依据：
    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @rsj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 20分
  - 痛点原因：Bot仅机械执行打标、指派与关闭操作，未发布任何评论提供反馈或引导，缺乏有效交互与透明度。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)
#### PP-03 关闭时缺乏后续反馈路径（I3 · 总结与关闭）

- **[#596](https://gitcode.com/cann/ops-cv/issues/596) [Bug-Report|缺陷反馈]:** — 0分
  - 痛点原因：关闭时未留下任何文字说明，导致前期的方案讨论未能沉淀为可供后续参考的经验总结。
  - 原文依据：
    - `liu-wei`：您好，这个问题可以按“算子清单 + 开发流程 + 现有能力复用”三部分看： 1. 各算子库最新清单 各仓库的清单入口都在 `docs/zh/op_list.md`，aclnn 接口清单在 `docs/zh/op_api_list.md`：…    - `liu-wei`：您好，这个还有什么问题吗？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：assigned to @liu-wei
- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动回复，无方案文档化记录，未关联重复主issue链接，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 0分
  - 痛点原因：关闭说明仅简单确认问题，无具体修复方案文档与重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…
- **[#593](https://gitcode.com/cann/ops-cv/issues/593) [Bug-Report|缺陷反馈]: roiPoolingGradWithArgMax算子原子加操作缺少simt的命名空间** — 0分
  - 痛点原因：关闭说明仅14字且无方案文档与复现链接，缺乏根因分析与解决细节，导致无复用价值。
  - 原文依据：
    - `nunnons2`：closed from codehub    - `nunnons2`：changed custom state from 进行中 to 已完成    - `nunnons2`：add label bug-report    - `cann-robot`：add label Accepted    - `liu-wei`：问题已解决，issue关闭。    - `nunnons2`：assigned to @nunnons2
- **[#592](https://gitcode.com/cann/ops-cv/issues/592) [Requirement|需求建议]: upsample_linear1d算子需要补充proto和infer_shape** — 0分
  - 痛点原因：关闭说明仅16字且无方案文档沉淀，未关联重复issue，未提供任何复用信息。
  - 原文依据：
    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `liu-wei`：提完issue后记得指派给自己。    - `liu-wei`：assigned to @rsj007    - [关联PR #1078（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1078)
- **[#591](https://gitcode.com/cann/ops-cv/issues/591) ops-cv Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及关联链接，仅记录指派操作，未沉淀任何可复用信息。
  - 原文依据：
    - `liu-wei`：assigned to @zhou-qilong    - `liu-wei`：assigned to @liu-wei
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 0分
  - 痛点原因：关闭说明仅20字且无方案文档与重复链接，未留下任何可复用的解决知识。
  - 原文依据：
    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `liu-wei`：assigned to @rsj007
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 0分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，无方案文档沉淀与重复链接，关闭说明为系统模板，缺乏人工总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - `cann-robot`：add label resolved    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：assigned to @ugzhangyiyi    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联主链接，仅由机器人自动关闭，缺乏后续复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - `cann-robot`：add label resolved    - `SimonZzz`：/assign    - `cann-robot`：assigned to @SimonZzz    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 0分
  - 痛点原因：无人工关闭说明与方案文档化，仅由机器人自动关闭，导致无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档与关联链接，未沉淀有效经验供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - `cann-robot`：add label resolved    - `yu_qinfei`：/assign    - `cann-robot`：assigned to @yu_qinfei    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 0分
  - 痛点原因：关闭说明仅20字且无方案文档，PR描述被指过于简单，未沉淀任何可供复用的技术细节与解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - `cann-robot`：add label resolved    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `liu-wei`：assigned to @rsj007    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化，仅因关联MR合并而关闭，未留下可复用的解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)
- **[#587](https://gitcode.com/cann/ops-cv/issues/587) [Bug-Report|缺陷反馈]: image_projective_transform int32类型转换未处理float溢出/NaN，与x86行为不一致…** — 25分
  - 痛点原因：仅由机器人自动关联PR关闭且说明简短，缺乏方案文档化记录与复现主链接，导致其他用户难以复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue587    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved    - `yourealize`：修复 PR：https://gitcode.com/cann/ops-cv/merge_requests/1068    - `yourealize`：/assign    - `cann-robot`：assigned to @yourealize
- **[#584](https://gitcode.com/cann/ops-cv/issues/584) [Follow-up] ops-cv --pkg-type=deb/rpm 包构建遗留问题清理** — 25分
  - 痛点原因：缺乏方案文档沉淀与重复issue关联，且关闭说明仅65字过于简略，无法供后续复用。
  - 原文依据：
    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1058 (feat(build): 支持 --pkg-type=deb/rpm 包构建) 检视遗留问题跟踪    - `liu-wei`：问题已修复，该issue关闭。
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 30分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，缺乏人工补充的解决方案细节，导致其他用户无法参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)
- **[#590](https://gitcode.com/cann/ops-cv/issues/590) ops-cv仓修复beta3 包编译线失败问题** — 45分
  - 痛点原因：关闭说明仅留机器人记录，无方案文档沉淀，且明确遗留10个同类cmake模块问题暂不修改，缺乏参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue590    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1071 (`修复beta3 包编译线失败问题`) 只补了 `FindOPBASE.cmake` 单点的 `NO_DEFAULT_PATH`。本 issue 跟踪剩余 10 个 Find*.cmake 模块（Find…    - `liu-wei`：先修改OPBSE的，其他的暂时不用修改。    - `liu-wei`：assigned to @liu-wei    - [关联PR #1071（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1071)
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 55分
  - 痛点原因：关闭说明仅由机器人触发并关联合并请求，缺乏具体文档修改方案沉淀，且无重复issue主链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 55分
  - 痛点原因：关闭说明仅为机器人自动关联MR的模板话术，缺乏人工对最终修复方案的总结与主链接，复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `nunnons2`：assigned to @FelixTang7    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
#### PP-04 路线图Issue缺乏讨论和响应（I2 · 讨论与解决）

- **[#591](https://gitcode.com/cann/ops-cv/issues/591) ops-cv Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅完成人员指派，无关联PR、commit、文档及release等任何实质解决证据。
  - 原文依据：
    - `liu-wei`：assigned to @zhou-qilong    - `liu-wei`：assigned to @liu-wei
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 0分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、commit引用及文档链接等实质性解决证据。
  - 原文依据：
    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 23分
  - 痛点原因：仅凭维护者口头回复便关闭并标记完成，缺乏PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted
- **[#593](https://gitcode.com/cann/ops-cv/issues/593) [Bug-Report|缺陷反馈]: roiPoolingGradWithArgMax算子原子加操作缺少simt的命名空间** — 23分
  - 痛点原因：仅靠关联PR作为修复证据，缺乏commit引用、文档及release记录，且部分关联PR已关闭。
  - 原文依据：
    - [关联PR #1083（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1083)    - [关联PR #1084（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1084)    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)    - `liu-wei`：问题已解决，issue关闭。    - `nunnons2`：closed from codehub
- **[#590](https://gitcode.com/cann/ops-cv/issues/590) ops-cv仓修复beta3 包编译线失败问题** — 23分
  - 痛点原因：关联PR仅修复11个问题模块中的1个，其余以"暂时不用修改"搁置后直接关闭，解决不充分且无验证证据。
  - 原文依据：
    - [关联PR #1071（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1071)    - `liu-wei`：🔗 关联来源：PR #1071 (`修复beta3 包编译线失败问题`) 只补了 `FindOPBASE.cmake` 单点的 `NO_DEFAULT_PATH`。本 issue 跟踪剩余 10 个 Find*.cmake 模块（Find…    - `liu-wei`：先修改OPBSE的，其他的暂时不用修改。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue590    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 23分
  - 痛点原因：关联PR未合并且无commit与文档引用，仅因避免超时仓促关闭，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #1066（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1066)    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#587](https://gitcode.com/cann/ops-cv/issues/587) [Bug-Report|缺陷反馈]: image_projective_transform int32类型转换未处理float溢出/NaN，与x86行为不一致…** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭作为依据，缺乏commit引用、文档链接及release说明等实质证据。
  - 原文依据：
    - [关联PR #1068（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1068)    - `yourealize`：修复 PR：https://gitcode.com/cann/ops-cv/merge_requests/1068    - `yourealize`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue587    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 23分
  - 痛点原因：虽关联PR已合并，但无commit、文档及release引用，且仅靠机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ugzhangyiyi
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 23分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit、文档及release等直接解决证据链接，证据链不完整。
  - 原文依据：
    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)    - `SimonZzz`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimonZzz
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 23分
  - 痛点原因：虽有关联PR，但缺少commit引用、文档链接和release引用，无法提供充分的解决过程证据。
  - 原文依据：
    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)    - [关联PR #81934（merged）](https://gitcode.com/cann/canndev/merge_requests/81934)    - `yu_qinfei`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - `cann-robot`：add label resolved
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 23分
  - 痛点原因：关联PR描述过于简单，且无commit、文档及release引用，仅靠机器人自动关闭，证据不充分。
  - 原文依据：
    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @rsj007
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release说明等实质性修复证据。
  - 原文依据：
    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 38分
  - 痛点原因：虽有关联PR合并，但无commit引用与release说明，仅由机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7
- **[#596](https://gitcode.com/cann/ops-cv/issues/596) [Bug-Report|缺陷反馈]:** — 46分
  - 痛点原因：仅以文档指引和口头确认关闭，无关联修复PR，缺乏实质性代码修复证据。
  - 原文依据：
    - `liu-wei`：您好，这个问题可以按“算子清单 + 开发流程 + 现有能力复用”三部分看： 1. 各算子库最新清单 各仓库的清单入口都在 `docs/zh/op_list.md`，aclnn 接口清单在 `docs/zh/op_api_list.md`：…    - `liu-wei`：您好，这个还有什么问题吗？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：assigned to @liu-wei
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 46分
  - 痛点原因：虽有合并PR，但由机器人自动关闭，缺乏人工关闭评论说明解决情况，且无release引用佐证。
  - 原文依据：
    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25
- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 54分
  - 痛点原因：虽有PR和commit引用，但缺少文档链接与release引用，且关闭评论仅为机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)    - `yourealize`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize
- **[#592](https://gitcode.com/cann/ops-cv/issues/592) [Requirement|需求建议]: upsample_linear1d算子需要补充proto和infer_shape** — 54分
  - 痛点原因：关联PR仅显示关闭，且缺乏文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #1078（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1078)    - `liu-wei`：提完issue后记得指派给自己。    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `liu-wei`：assigned to @rsj007
- **[#589](https://gitcode.com/cann/ops-cv/issues/589) NPU_ARCH deprecation timeline更改** — 54分
  - 痛点原因：虽关联多个已合并PR及文档，但缺少具体commit引用，代码级解决证据链不完整。
  - 原文依据：
    - [关联PR #1067（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1067)    - [关联PR #1074（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1074)    - [关联PR #1079（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1079)    - `liu-wei`：🔗 关联来源：PR #1067 (fix(example): rename NPU_ARCH to NPU_SOC_VERSION and dynamically adapt Python version tag) 重命名 NPU_ARC…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue589    - `cann-robot`：add label resolved
- **[#584](https://gitcode.com/cann/ops-cv/issues/584) [Follow-up] ops-cv --pkg-type=deb/rpm 包构建遗留问题清理** — 54分
  - 痛点原因：缺少文档链接与release引用，且关闭评论仅简单声明已修复，缺乏详细的修复说明或版本发布证据。
  - 原文依据：
    - [关联PR #1058（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1058)    - `liu-wei`：🔗 关联来源：PR #1058 (feat(build): 支持 --pkg-type=deb/rpm 包构建) 检视遗留问题跟踪    - `liu-wei`：问题已修复，该issue关闭。    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted
#### PP-05 分流阶段标签缺失和分类不当（I1 · 分配与首次响应）

- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 0分
  - 痛点原因：维护者仅执行分配和打标签等机械操作，未提供任何实质性技术回应。
  - 原文依据：
    - `yourealize`：/assign    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)
- **[#592](https://gitcode.com/cann/ops-cv/issues/592) [Requirement|需求建议]: upsample_linear1d算子需要补充proto和infer_shape** — 0分
  - 痛点原因：仅有流程性指派操作，无任何针对需求的技术讨论或解答即被关闭。
  - 原文依据：
    - `liu-wei`：提完issue后记得指派给自己。    - `liu-wei`：assigned to @rsj007    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - [关联PR #1078（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1078)
- **[#591](https://gitcode.com/cann/ops-cv/issues/591) ops-cv Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅有指派操作，始终无任何实质回应。
  - 原文依据：
    - `liu-wei`：assigned to @zhou-qilong    - `liu-wei`：assigned to @liu-wei
- **[#589](https://gitcode.com/cann/ops-cv/issues/589) NPU_ARCH deprecation timeline更改** — 0分
  - 痛点原因：维护者仅关联PR并打标签，未提供任何实质性解答便随PR合并直接关闭了issue。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1067 (fix(example): rename NPU_ARCH to NPU_SOC_VERSION and dynamically adapt Python version tag) 重命名 NPU_ARC…    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue589    - [关联PR #1067（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1067)    - [关联PR #1074（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1074)
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 0分
  - 痛点原因：现有回应仅为催促补充描述、加标签和指派人员等流程性操作，未对需求提供任何实质性解答。
  - 原文依据：
    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @rsj007    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 0分
  - 痛点原因：首次响应仅为模板式安抚，后续仅指派人员，始终未针对文档不一致问题提供实质性解答。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#585](https://gitcode.com/cann/ops-cv/issues/585) [Documentation|文档问题]: ThreeInterpolateBackward README 参数表缺少必选属性 m** — 0分
  - 痛点原因：首次响应耗时超40小时，且后续仅回复请耐心等待及分配责任人，始终未提供实质性的技术解答或文档修复。
  - 原文依据：
    - `liu-wei`：麻烦尽快修改：ThreeInterpolateBackward README 参数表缺少必选属性问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 0分
  - 痛点原因：首次响应仅为指派任务和机器人加标签，全程无针对需求内容的实质解答。
  - 原文依据：
    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ugzhangyiyi    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 0分
  - 痛点原因：全程仅机器人执行分配和关闭操作，无任何人工实质回应，直接随关联MR合并关闭。
  - 原文依据：
    - `SimonZzz`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimonZzz    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 0分
  - 痛点原因：首次响应超90小时且全程无人工实质回复，仅由机器人打标签并在关联PR合并后自动关闭。
  - 原文依据：
    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 0分
  - 痛点原因：仅机器人分配任务并随MR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `yu_qinfei`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 0分
  - 痛点原因：全程仅有加标签和分配人员等机械操作，无任何人工技术解答，最终被关联关闭。
  - 原文依据：
    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 0分
  - 痛点原因：首次响应仅要求补充PR描述，后续直接被机器人关闭，全程缺乏针对需求的技术实质回应。
  - 原文依据：
    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @rsj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 0分
  - 痛点原因：仅进行了任务分配和机器人自动关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)
#### PP-06 范围缩减未充分讨论即关闭（I2 · 讨论与解决）

- **[#591](https://gitcode.com/cann/ops-cv/issues/591) ops-cv Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：仅完成人员指派，无关联PR、commit、文档及release等任何实质解决证据。
  - 原文依据：
    - `liu-wei`：assigned to @zhou-qilong    - `liu-wei`：assigned to @liu-wei
- **[#581](https://gitcode.com/cann/ops-cv/issues/581) [Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题** — 0分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、commit引用及文档链接等实质性解决证据。
  - 原文依据：
    - [关联PR #1063（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1063)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue581    - `wanshilin`：add label bug-report    - `cann-robot`：add label resolved
- **[#594](https://gitcode.com/cann/ops-cv/issues/594) [Bug-Report|缺陷反馈]: roi_align / roi_align_grad / non_max_suppression_v6 的 kernel…** — 23分
  - 痛点原因：仅凭维护者口头回复便关闭并标记完成，缺乏PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `liu-wei`：看起来是有问题，我们会尽快安排算子团队补齐，感谢您的反馈。    - `nunnons2`：这些算子均未开源kernel，不需要kernel ut看护。见 [#535](https://gitcode.com/cann/ops-cv/issues/535) 如果您还有其他问题，可以参与SIG会议一起参与讨论。 sig会时间可参考…    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted
- **[#593](https://gitcode.com/cann/ops-cv/issues/593) [Bug-Report|缺陷反馈]: roiPoolingGradWithArgMax算子原子加操作缺少simt的命名空间** — 23分
  - 痛点原因：仅靠关联PR作为修复证据，缺乏commit引用、文档及release记录，且部分关联PR已关闭。
  - 原文依据：
    - [关联PR #1083（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1083)    - [关联PR #1084（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1084)    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)    - `liu-wei`：问题已解决，issue关闭。    - `nunnons2`：closed from codehub
- **[#590](https://gitcode.com/cann/ops-cv/issues/590) ops-cv仓修复beta3 包编译线失败问题** — 23分
  - 痛点原因：关联PR仅修复11个问题模块中的1个，其余以"暂时不用修改"搁置后直接关闭，解决不充分且无验证证据。
  - 原文依据：
    - [关联PR #1071（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1071)    - `liu-wei`：🔗 关联来源：PR #1071 (`修复beta3 包编译线失败问题`) 只补了 `FindOPBASE.cmake` 单点的 `NO_DEFAULT_PATH`。本 issue 跟踪剩余 10 个 Find*.cmake 模块（Find…    - `liu-wei`：先修改OPBSE的，其他的暂时不用修改。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue590    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @liu-wei
- **[#588](https://gitcode.com/cann/ops-cv/issues/588) [Requirement|需求建议]: upsample_linear1d缺少geir example** — 23分
  - 痛点原因：关联PR未合并且无commit与文档引用，仅因避免超时仓促关闭，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #1066（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1066)    - `liu-wei`：issue 描述太过简单了，麻烦扩充下。    - `liu-wei`：请尽快处理，避免issue超时。    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#587](https://gitcode.com/cann/ops-cv/issues/587) [Bug-Report|缺陷反馈]: image_projective_transform int32类型转换未处理float溢出/NaN，与x86行为不一致…** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭作为依据，缺乏commit引用、文档链接及release说明等实质证据。
  - 原文依据：
    - [关联PR #1068（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1068)    - `yourealize`：修复 PR：https://gitcode.com/cann/ops-cv/merge_requests/1068    - `yourealize`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue587    - `yourealize`：add label bug-report    - `cann-robot`：add label resolved
- **[#583](https://gitcode.com/cann/ops-cv/issues/583) [Requirement|需求建议]: 增加boundingboxencode算子A5支持** — 23分
  - 痛点原因：虽关联PR已合并，但无commit、文档及release引用，且仅靠机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1049（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1049)    - `liu-wei`：麻烦issue指派给自己，通过如下命令。 /assign zhangyiyi    - `ugzhangyiyi`：/assign [@ugzhangyiyi](https://gitcode.com/ugzhangyiyi)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue583    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ugzhangyiyi
- **[#582](https://gitcode.com/cann/ops-cv/issues/582) [Requirement|需求建议]: 950支持roi_align_grad** — 23分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏commit、文档及release等直接解决证据链接，证据链不完整。
  - 原文依据：
    - [关联PR #1030（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1030)    - `SimonZzz`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue582    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimonZzz
- **[#580](https://gitcode.com/cann/ops-cv/issues/580) 新增长尾算子AnchorResponseFlags** — 23分
  - 痛点原因：虽有关联PR，但缺少commit引用、文档链接和release引用，无法提供充分的解决过程证据。
  - 原文依据：
    - [关联PR #1053（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1053)    - [关联PR #1065（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1065)    - [关联PR #81934（merged）](https://gitcode.com/cann/canndev/merge_requests/81934)    - `yu_qinfei`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue580    - `cann-robot`：add label resolved
- **[#578](https://gitcode.com/cann/ops-cv/issues/578) [Requirement|需求建议]: 新增长尾算子upsample_linear1d** — 23分
  - 痛点原因：关联PR描述过于简单，且无commit、文档及release引用，仅靠机器人自动关闭，证据不充分。
  - 原文依据：
    - [关联PR #1040（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1040)    - `liu-wei`：PR Body描述的太过简单了，扩充下。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue578    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @rsj007
- **[#577](https://gitcode.com/cann/ops-cv/issues/577) [Bug-Report|缺陷反馈]: YUV4442YUV422算子空tensor场景处理有误** — 23分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及release说明等实质性修复证据。
  - 原文依据：
    - [关联PR #1061（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1061)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue577    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#586](https://gitcode.com/cann/ops-cv/issues/586) [Documentation|文档问题]: ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/gra…** — 38分
  - 痛点原因：虽有关联PR合并，但无commit引用与release说明，仅由机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #1140（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1140)    - `liu-wei`：麻烦尽快修改ThreeInterpolateBackward README 与 IR/aclnn 文档在 grad_x/grad_y 数据格式上不一致问题。    - `sunchun`：您好，当前issue已有责任人进行处理，请耐心等待。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue585,issue586    - `cann-robot`：add label resolved    - `nunnons2`：assigned to @FelixTang7
- **[#596](https://gitcode.com/cann/ops-cv/issues/596) [Bug-Report|缺陷反馈]:** — 46分
  - 痛点原因：仅以文档指引和口头确认关闭，无关联修复PR，缺乏实质性代码修复证据。
  - 原文依据：
    - `liu-wei`：您好，这个问题可以按“算子清单 + 开发流程 + 现有能力复用”三部分看： 1. 各算子库最新清单 各仓库的清单入口都在 `docs/zh/op_list.md`，aclnn 接口清单在 `docs/zh/op_api_list.md`：…    - `liu-wei`：您好，这个还有什么问题吗？    - `liu-wei`：您好，我们计划关闭这个 issue，如果您还有其他问题，可以随时提 issue 或者参与 SIG 会议一起参与讨论。 - SIG 会议时间：[meeting.osinfra.cn/cann](https://meeting.osinfra…    - `liu-wei`：assigned to @liu-wei
- **[#579](https://gitcode.com/cann/ops-cv/issues/579) [Bug-Report|缺陷反馈]: image/upsample_bicubic2d_grad 示例代码风格不一致与可读性问题** — 46分
  - 痛点原因：虽有合并PR，但由机器人自动关闭，缺乏人工关闭评论说明解决情况，且无release引用佐证。
  - 原文依据：
    - [关联PR #1064（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue579    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25
- **[#595](https://gitcode.com/cann/ops-cv/issues/595) image_projective_transform: 新增 input shape 校验逻辑** — 54分
  - 痛点原因：虽有PR和commit引用，但缺少文档链接与release引用，且关闭评论仅为机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1089（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1089)    - `yourealize`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue595    - `yourealize`：add label enhancement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yourealize
- **[#592](https://gitcode.com/cann/ops-cv/issues/592) [Requirement|需求建议]: upsample_linear1d算子需要补充proto和infer_shape** — 54分
  - 痛点原因：关联PR仅显示关闭，且缺乏文档链接与release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #1078（closed）](https://gitcode.com/cann/ops-cv/merge_requests/1078)    - `liu-wei`：提完issue后记得指派给自己。    - `rsj007`：closed from codehub    - `rsj007`：changed custom state from 进行中 to 已完成    - `liu-wei`：assigned to @rsj007
- **[#589](https://gitcode.com/cann/ops-cv/issues/589) NPU_ARCH deprecation timeline更改** — 54分
  - 痛点原因：虽关联多个已合并PR及文档，但缺少具体commit引用，代码级解决证据链不完整。
  - 原文依据：
    - [关联PR #1067（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1067)    - [关联PR #1074（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1074)    - [关联PR #1079（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1079)    - `liu-wei`：🔗 关联来源：PR #1067 (fix(example): rename NPU_ARCH to NPU_SOC_VERSION and dynamically adapt Python version tag) 重命名 NPU_ARC…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue589    - `cann-robot`：add label resolved
- **[#584](https://gitcode.com/cann/ops-cv/issues/584) [Follow-up] ops-cv --pkg-type=deb/rpm 包构建遗留问题清理** — 54分
  - 痛点原因：缺少文档链接与release引用，且关闭评论仅简单声明已修复，缺乏详细的修复说明或版本发布证据。
  - 原文依据：
    - [关联PR #1058（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1058)    - `liu-wei`：🔗 关联来源：PR #1058 (feat(build): 支持 --pkg-type=deb/rpm 包构建) 检视遗留问题跟踪    - `liu-wei`：问题已修复，该issue关闭。    - `liu-wei`：changed custom state from 进行中 to 已完成    - `liu-wei`：closed from codehub    - `cann-robot`：add label Accepted

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | Bot维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 增加 close_reason 与 resolved 标签一致性校验，矛盾时阻断关闭并提示人工确认 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 15.5，低分 19/20；OBJ_DECISION_TRANSPARENCY：均值 67.0，低分 4/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 15.5，低分 19/20 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 67.0，低分 4/20 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 提供了SIG会议时间、链接和讨论入口，后续反馈路径较完整 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `liu-wei` |
| 触发条件 | MR合并触发Issue关闭前 |
| 具体动作 | 校验验收清单完成度，未完成时提示人工确认而非自动关闭 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 26.0，低分 17/20；OBJ_BOT_MISCLOSE_REVERSE：均值 98.0，低分 0/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 26.0，低分 17/20 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 98.0，低分 0/20 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，人工直接处理质量高，给中性分 | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 在关闭模板中增加后续反馈路径必填项，提供SIG会议入口和重新评估条件 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 15.5，低分 19/20；OBJ_DECISION_TRANSPARENCY：均值 67.0，低分 4/20 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 15.5，低分 19/20 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 67.0，低分 4/20 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 提供了SIG会议时间、链接和讨论入口，后续反馈路径较完整 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **82.5/100**，整体相对可控，但仍需关注：模板填写不规范问题轻微存在，Issue 596 标题为空且内容重复…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.0 | 虽填写不规范，但为真实技术咨询，无AI幻觉或虚假信息 |
| `SUB_INPUT_QUALITY` 输入质量 | 74.0 | 模板字段全填但内容完全重复，非Bug Report，无真实环境/复现/日志信息 |

代表低分 Issue：[#596](https://gitcode.com/cann/ops-cv/issues/596)
问题：[Bug-Report|缺陷反馈]:。

### I1 · 分配与首次响应

本阶段分数为 **64.4/100**，整体相对可控，但仍需关注：25% Issue 分流不当，标签缺失和分类错误导致处理路径偏差。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 29.0 | 均值 29.0，低分 14/20 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 80.0 | 均值 80.0，低分 3/20 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 83.2 | 明确分配给liu-wei且积极跟进回复，责任归属清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 75.3 | 有分配并处理，但未加标签或重新分类为咨询类型 |

代表低分 Issue：[#591](https://gitcode.com/cann/ops-cv/issues/591)
问题：ops-cv Development Roadmap (2026 Q3)。

### I2 · 讨论与解决

本阶段分数为 **59.6/100**，本阶段需要改进，主要问题是：路线图Issue缺乏讨论和响应。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 79.0 | 均值 79.0，低分 5/20 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 32.3 | 均值 32.3，低分 19/20 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 56.7 | 详尽回复覆盖全部四个问题，有跟进询问和关闭计划 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 74.6 | 四个问题均获详细解答，含文档链接、能力分析和复用建议 |

代表低分 Issue：[#591](https://gitcode.com/cann/ops-cv/issues/591)
问题：ops-cv Development Roadmap (2026 Q3)。

### I3 · 总结与关闭

本阶段分数为 **48.7/100**，本阶段需要改进，主要问题是：关闭状态语义矛盾普遍存在。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 15.5 | 均值 15.5，低分 19/20 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 67.0 | 均值 67.0，低分 4/20 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 45.6 | 提供了SIG会议时间、链接和讨论入口，后续反馈路径较完整 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 74.1 | 充分回复后才计划关闭，且提供后续反馈路径，无过早关闭风险 |

代表低分 Issue：[#581](https://gitcode.com/cann/ops-cv/issues/581)
问题：[Bug-Report|缺陷反馈]: upsample_nearest2d_grad代码存在cleancode检测问题。

### G · Bot/Agent 治理

本阶段分数为 **64.7/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 26.0 | 均值 26.0，低分 17/20 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 98.0 | 均值 98.0，低分 0/20 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 72.1 | 无bot介入，人工直接处理质量高，给中性分 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 65.8 | 无bot介入，信息不足，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 69.2 | 无bot介入，信息不足，给中性分 |

代表低分 Issue：[#589](https://gitcode.com/cann/ops-cv/issues/589)
问题：NPU_ARCH deprecation timeline更改。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 20 | 49.9 | 首期基线 | 82.5 | 64.4 | 59.6 | 48.7 | 64.7 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **3 位社区响应者**贡献 **16 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `liu-wei` | 13 |
| `sunchun` | 2 |
| `nunnons2` | 1 |

Top1 响应占比 **81.2%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：94.1/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-06-29_to_2026-07-05.json`。
