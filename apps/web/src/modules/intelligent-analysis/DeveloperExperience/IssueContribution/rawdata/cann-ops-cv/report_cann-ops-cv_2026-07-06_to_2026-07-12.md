# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **18** 个 Issue
+ **Open 2 / Closed 16**，关闭率 **88.9%**。
+ 总体体验分为 **48.9/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 45.9 | 关闭沉淀质量严重不足，83% Issue不达标 |
| P1 | I2 · 讨论与解决 | 59.9 | 开放Issue停滞无推进，讨论深度不足 |
| P1 | I1 · 分配与首次响应 | 65.2 | Bug Report模板敷衍填写，创建质量低 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在PR模板中增加Issue目标达成确认项，要求勾选核心目标已完成 |
| REC-02 | P0 | 在自动关闭前增加Issue目标达成校验步骤，要求人工确认或关键词匹配 |
| REC-03 | P1 | Bot自动添加stale标签并@assignee要求更新状态 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 18 |
| Open / Closed | 2 / 16 |
| 关闭率 | 88.9% |
| 类型构成 | 缺陷 10 / 需求 2 / 咨询 4 / 其他 2 |
| 总体体验分 | 48.9/100（D） |
| 首次响应时间 | 中位 0.4h；均值 4.0h |
| 关闭周期 | 中位 14.6h；均值 2.0天 |
| 7天响应率 | 100.0% |
| 评论数/Issue | 1.17 |
| 标签覆盖率 | 77.8% |
| 指派覆盖率 | 88.9% |
| 数据完整性 | 91.0/100 |
| 置信度 | 中 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.0 | 3/18（16.7%） | 相对可控 | `SUB_INPUT_QUALITY` 67.9 |
| I1 · 分配与首次响应 | 65.2 | 3/18（16.7%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 22.2 |
| I2 · 讨论与解决 | 59.9 | 6/18（33.3%） | P1 | `OBJ_SOLUTION_EVIDENCE` 23.1 |
| I3 · 总结与关闭 | 45.9 | 15/18（83.3%） | P0 | `OBJ_CLOSURE_REUSE` 15.6 |
| G · Bot/Agent 治理（参考） | 64.3 | 3/18（16.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 28.9 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭沉淀质量严重不足，83% Issue不达标 | OBJ_CLOSURE_REUSE：均值 15.6，低分 17/18；OBJ_DECISION_TRANSPARENCY：均值 57.5，低分 8/18 | 社区无法从已关闭Issue中获取有效解决证据和复用知识，同类问题可能重复出现。 |
| PP-02 | P0 | G · Bot/Agent 治理 | Bot误关闭率27.8%，关闭逻辑缺乏目标校验 | OBJ_BOT_GOVERNANCE：均值 28.9，低分 14/18；OBJ_BOT_MISCLOSE_REVERSE：均值 94.4，低分 0/18 | 未完成的Issue被错误关闭并标记resolved，核心需求被搁置，社区信任受损。 |
| PP-03 | P1 | I2 · 讨论与解决 | 开放Issue停滞无推进，讨论深度不足 | OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 16/18；OBJ_RESULT_FORMATION_TIMELINESS：均值 90.0，低分 1/18 | 用户报告的问题长时间无结论，社区参与体验差，潜在Bug被搁置。 |
| PP-04 | P1 | I1 · 分配与首次响应 | Bug Report模板敷衍填写，创建质量低 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 22.2，低分 14/18；OBJ_RESPONSE_SPEED：均值 94.4，低分 0/18 | 模板失去筛选价值，外部贡献者无法从Issue中获取复现信息，社区知识库质量下降。 |
| PP-05 | P2 | G · Bot/Agent 治理 | Bot缺位率22.2%，部分Issue无自动化介入 | OBJ_BOT_GOVERNANCE：均值 28.9，低分 14/18；OBJ_BOT_MISCLOSE_REVERSE：均值 94.4，低分 0/18 | 无Bot介入的Issue缺少自动标签和路由，分流效率降低，Issue容易遗漏。 |

### 4.1 低分 Issue 明细

#### PP-01 关闭沉淀质量严重不足，83% Issue不达标（I3 · 总结与关闭）

- **[#615](https://gitcode.com/cann/ops-cv/issues/615) [Bug-Report|缺陷反馈]: Upsample_bilinear2d_grad在边界场景(inf/nan)下精度有问题** — 0分
  - 痛点原因：关闭说明仅7字且由机器人自动关闭，无方案文档化，未沉淀任何可供其他用户参考的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue615    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #1110（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1110)
- **[#613](https://gitcode.com/cann/ops-cv/issues/613) [Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动回复，缺乏方案文档化记录与关联主链接，导致解决经验无法被他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue613    - `cann-robot`：add label resolved    - `qy3311888`：/assign    - `cann-robot`：assigned to @qy3311888    - [关联PR #1111（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1111)    - [关联PR #1112（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1112)
- **[#611](https://gitcode.com/cann/ops-cv/issues/611) [Requirement|需求建议]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅靠机器人随关联PR合并自动关闭，未沉淀任何复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue611    - `cann-robot`：add label resolved    - `renruhai`：assigned to @Hana77    - [关联PR #1105（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1105)    - [关联PR #1106（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1106)
- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 0分
  - 痛点原因：关闭说明为空，未记录最终修复方案或相关代码文件位置，无法为后续开发者提供排查经验复用。
  - 原文依据：
    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？    - `liu-wei`：assigned to @renruhai
- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 0分
  - 痛点原因：关闭时无任何说明文字，未记录代码已有越界机制的排查结论，导致后续无法复用解决经验。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai
- **[#608](https://gitcode.com/cann/ops-cv/issues/608) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5inf/-inf处理修复** — 0分
  - 痛点原因：关闭说明仅7字且由机器人机械关闭，无方案文档沉淀，未关联重复主issue链接，导致其他开发者无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue608    - `cann-robot`：add label resolved    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - [关联PR #1100（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1100)    - [关联PR #1101（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1101)
- **[#605](https://gitcode.com/cann/ops-cv/issues/605) [Bug-Report|缺陷反馈]: merge_proto.py 解析带注释或 guard 的 proto 时可能误吞内容** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明仅7字，无方案文档化沉淀，未留下任何可供复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue605    - `cann-robot`：add label resolved    - `liu-wei`：/assign    - `cann-robot`：assigned to @liu-wei    - [关联PR #1095（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1095)
- **[#604](https://gitcode.com/cann/ops-cv/issues/604) OP_DEF_PATTERN 中 #endif 条件匹配过严，guard 分支无法命中** — 0分
  - 痛点原因：仅由codehub直接关闭，关闭说明为0字，无方案文档化及重复链接，未留存任何可供复用的信息。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei
- **[#601](https://gitcode.com/cann/ops-cv/issues/601) [Bug-Report|缺陷反馈]: upsample_nearest_exact1d 缺少 originScales 参数导致 scale 计算不正确** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人随MR合并自动关闭，未留下任何可供复用的排查或解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue601    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - [关联PR #1094（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1094)    - [关联PR #1096（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1096)
- **[#598](https://gitcode.com/cann/ops-cv/issues/598) [Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错** — 0分
  - 痛点原因：关闭说明为空，仅由机器人自动关闭并关联合并请求，无方案文档和复用链接，无法为后续问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue598    - `nunnons2`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @nunnons2    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)
- **[#597](https://gitcode.com/cann/ops-cv/issues/597) [Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复** — 0分
  - 痛点原因：随关联MR合并自动关闭且关闭说明仅7字，未补充任何方案文档或排查过程，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue597    - `cann-robot`：add label resolved    - `qy3311888`：/assign    - `cann-robot`：assigned to @qy3311888    - [关联PR #1090（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1090)    - [关联PR #1091（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1091)
- **[#606](https://gitcode.com/cann/ops-cv/issues/606) [Requirement|需求建议]: ROIAlignGrad算子合并** — 25分
  - 痛点原因：仅因关联MR合并而关闭，未沉淀方案文档且无主链接，关闭说明简略，缺乏后续复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue606    - `cann-robot`：add label resolved    - `qq_64858158`：/assign [@qq_64858158](https://gitcode.com/qq_64858158)    - `fullt`：已安排审核    - `cann-robot`：assigned to @qq_64858158    - [关联PR #1099（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1099)
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 30分
  - 痛点原因：仅靠机器人关联MR自动关闭且说明简略，缺乏人工对修复方案与文档更新细节的总结沉淀，难以供后续参考复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - `cann-robot`：add label resolved    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `liu-wei`：assigned to @renruhai    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#612](https://gitcode.com/cann/ops-cv/issues/612) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人关联MR自动关闭，缺乏人工总结，导致后续无法复用解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue612    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `renruhai`：assigned to @gitcode-chenjiao    - [关联PR #1103（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1103)    - [关联PR #1115（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1115)
- **[#607](https://gitcode.com/cann/ops-cv/issues/607) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随MR合并自动关闭，缺乏对文档修改内容的总结与复用指引，无法为后续提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue607    - `gitee-duhuiping`：add label documentation    - `cann-robot`：add label resolved    - `gitee-duhuiping`：assigned to @gitee-duhuiping    - [关联PR #1097（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1097)    - [关联PR #1098（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1098)
- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 45分
  - 痛点原因：关闭说明仅为简单文字回复，未沉淀方案文档或提供可复用链接，复用价值低。
  - 原文依据：
    - `TreamTik`：closed from codehub    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 45分
  - 痛点原因：关联PR仅单点修复未落实通用helper，且无方案文档沉淀，后续同类问题复用参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
#### PP-02 Bot误关闭率27.8%，关闭逻辑缺乏目标校验（G · Bot/Agent 治理）

- **[#615](https://gitcode.com/cann/ops-cv/issues/615) [Bug-Report|缺陷反馈]: Upsample_bilinear2d_grad在边界场景(inf/nan)下精度有问题** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭操作，全程无任何评论与用户交互，治理过程缺乏透明度。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue615    - [关联PR #1110（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1110)
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何引导评论，且在人工沟通期间直接关闭，治理流于形式。
  - 原文依据：
    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @renruhai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#613](https://gitcode.com/cann/ops-cv/issues/613) [Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复** — 20分
  - 痛点原因：Bot仅被动执行分配与关闭指令，无任何主动治理评论，缺乏有效互动与深度治理。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue613    - [关联PR #1111（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1111)    - [关联PR #1112（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1112)
- **[#612](https://gitcode.com/cann/ops-cv/issues/612) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 20分
  - 痛点原因：Bot仅机械打标并在关联MR合并后自动关闭，全程无解释性评论，未与用户进行有效沟通。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `renruhai`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue612    - [关联PR #1103（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1103)    - [关联PR #1115（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1115)
- **[#611](https://gitcode.com/cann/ops-cv/issues/611) [Requirement|需求建议]: 算子原型迁移至所属仓** — 20分
  - 痛点原因：Bot关闭时引用了错误的关联issue号且未留任何解释评论，导致关闭行为不透明且缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `renruhai`：assigned to @Hana77    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue611    - [关联PR #1105（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1105)    - [关联PR #1106（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1106)
- **[#608](https://gitcode.com/cann/ops-cv/issues/608) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5inf/-inf处理修复** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程零评论，缺乏交互与状态说明。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue608    - [关联PR #1100（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1100)    - [关联PR #1101（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1101)
- **[#607](https://gitcode.com/cann/ops-cv/issues/607) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改** — 20分
  - 痛点原因：Bot仅机械打标和随MR合并自动关闭，无任何评论互动，缺乏对用户的有效反馈与治理引导。
  - 原文依据：
    - `gitee-duhuiping`：add label documentation    - `cann-robot`：add label resolved    - `gitee-duhuiping`：assigned to @gitee-duhuiping    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue607    - [关联PR #1097（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1097)    - [关联PR #1098（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1098)
- **[#606](https://gitcode.com/cann/ops-cv/issues/606) [Requirement|需求建议]: ROIAlignGrad算子合并** — 20分
  - 痛点原因：Bot仅被动执行打标与分配指令，评论数为0，缺乏有效交互与治理反馈。
  - 原文依据：
    - `qq_64858158`：/assign [@qq_64858158](https://gitcode.com/qq_64858158)    - `fullt`：已安排审核    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_64858158    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue606    - [关联PR #1099（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1099)
- **[#605](https://gitcode.com/cann/ops-cv/issues/605) [Bug-Report|缺陷反馈]: merge_proto.py 解析带注释或 guard 的 proto 时可能误吞内容** — 20分
  - 痛点原因：Bot仅凭关联MR合并便自动关闭缺陷反馈，缺乏有效验证与沟通，存在误关风险导致治理失效。
  - 原文依据：
    - `liu-wei`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue605    - [关联PR #1095（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1095)
- **[#604](https://gitcode.com/cann/ops-cv/issues/604) OP_DEF_PATTERN 中 #endif 条件匹配过严，guard 分支无法命中** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动与自动关闭，后续状态流转全靠人工，未发挥实际治理作用。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#601](https://gitcode.com/cann/ops-cv/issues/601) [Bug-Report|缺陷反馈]: upsample_nearest_exact1d 缺少 originScales 参数导致 scale 计算不正确** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，无任何评论互动，缺乏对用户的状态同步与治理引导。
  - 原文依据：
    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue601    - [关联PR #1094（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1094)    - [关联PR #1096（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1096)
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 20分
  - 痛点原因：Bot仅机械打标关闭，零评论回应开发者指出的硬编码风险，缺乏有效治理与跟进。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
- **[#598](https://gitcode.com/cann/ops-cv/issues/598) [Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错** — 20分
  - 痛点原因：Bot仅执行打标和关闭，无自动评论交互，治理动作单一且被动。
  - 原文依据：
    - `nunnons2`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @nunnons2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue598    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)
- **[#597](https://gitcode.com/cann/ops-cv/issues/597) [Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，无任何评论交互，缺乏实质性治理反馈。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue597    - [关联PR #1090（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1090)    - [关联PR #1091（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1091)
#### PP-03 开放Issue停滞无推进，讨论深度不足（I2 · 讨论与解决）

- **[#611](https://gitcode.com/cann/ops-cv/issues/611) [Requirement|需求建议]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：仅靠机器人自动关闭并关联PR，缺乏commit引用、文档链接和release引用等直接证据，且无人工关闭评论。
  - 原文依据：
    - [关联PR #1105（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1105)    - [关联PR #1106（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1106)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue611    - `cann-robot`：add label resolved    - `renruhai`：assigned to @Hana77
- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 0分
  - 痛点原因：未关联修复PR或提交记录，且讨论中开发者认为问题不存在，最终仅指派人员，无任何实质性解决证据。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai
- **[#604](https://gitcode.com/cann/ops-cv/issues/604) OP_DEF_PATTERN 中 #endif 条件匹配过严，guard 分支无法命中** — 0分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接等可验证证据，仅直接标记完成并关闭。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei
- **[#601](https://gitcode.com/cann/ops-cv/issues/601) [Bug-Report|缺陷反馈]: upsample_nearest_exact1d 缺少 originScales 参数导致 scale 计算不正确** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit、文档、release等直接解决证据，且无人工关闭评论说明。
  - 原文依据：
    - [关联PR #1094（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1094)    - [关联PR #1096（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1096)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue601    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25
- **[#598](https://gitcode.com/cann/ops-cv/issues/598) [Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接、release引用及人工关闭评论等直接解决证据。
  - 原文依据：
    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue598    - `nunnons2`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @nunnons2
- **[#612](https://gitcode.com/cann/ops-cv/issues/612) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 15分
  - 痛点原因：虽有合并的关联PR，但缺少commit和release引用，仅靠机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #1103（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1103)    - [关联PR #1115（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1115)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue612    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `renruhai`：assigned to @gitcode-chenjiao
- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 15分
  - 痛点原因：缺少关联 PR、commit 引用及关闭评论等代码修复与解决确认信息，仅停留在指派和提问阶段。
  - 原文依据：
    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？    - `liu-wei`：assigned to @renruhai
- **[#607](https://gitcode.com/cann/ops-cv/issues/607) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改** — 15分
  - 痛点原因：虽有关联PR合并，但缺失commit引用、release说明及关闭总结评论，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #1097（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1097)    - [关联PR #1098（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1098)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue607    - `gitee-duhuiping`：add label documentation    - `cann-robot`：add label resolved    - `gitee-duhuiping`：assigned to @gitee-duhuiping
- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 23分
  - 痛点原因：仅通过文字回复解答，无关联PR、commit或文档等实质解决证据，且由系统自动关闭。
  - 原文依据：
    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。    - `TreamTik`：closed from codehub
- **[#615](https://gitcode.com/cann/ops-cv/issues/615) [Bug-Report|缺陷反馈]: Upsample_bilinear2d_grad在边界场景(inf/nan)下精度有问题** — 23分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏commit引用、文档链接及release说明等具体修复证据，导致得分偏低。
  - 原文依据：
    - [关联PR #1110（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1110)    - `xuejinghui`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue615    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui
- **[#613](https://gitcode.com/cann/ops-cv/issues/613) [Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复** — 23分
  - 痛点原因：虽有合并的关联PR，但无commit、文档及release链接，且关闭评论仅为机器人自动回复，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #1111（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1111)    - [关联PR #1112（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1112)    - `qy3311888`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue613    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888
- **[#608](https://gitcode.com/cann/ops-cv/issues/608) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5inf/-inf处理修复** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，仅靠机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1100（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1100)    - [关联PR #1101（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1101)    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue608    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ
- **[#605](https://gitcode.com/cann/ops-cv/issues/605) [Bug-Report|缺陷反馈]: merge_proto.py 解析带注释或 guard 的 proto 时可能误吞内容** — 23分
  - 痛点原因：虽有关联PR和机器人自动关闭，但缺乏commit引用、文档链接及人工对解决方案的具体说明，导致证据不充分。
  - 原文依据：
    - [关联PR #1095（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1095)    - `liu-wei`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue605    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liu-wei
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 23分
  - 痛点原因：关联PR仅单点修复路径残留，未抽取通用helper解决硬编码根本问题，且无commit/文档/release等直接修复证据。
  - 原文依据：
    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - `cann-robot`：add label resolved
- **[#597](https://gitcode.com/cann/ops-cv/issues/597) [Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复** — 23分
  - 痛点原因：虽有关联PR合并，但无commit引用、文档及release说明，且关闭评论仅为机器人自动回复，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #1090（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1090)    - [关联PR #1091（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1091)    - `qy3311888`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue597    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888
- **[#606](https://gitcode.com/cann/ops-cv/issues/606) [Requirement|需求建议]: ROIAlignGrad算子合并** — 54分
  - 痛点原因：虽有关联PR和commit，但缺少文档链接与release引用，仅靠机器人随PR合并自动关闭，解决证据不足。
  - 原文依据：
    - [关联PR #1099（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1099)    - `qq_64858158`：/assign [@qq_64858158](https://gitcode.com/qq_64858158)    - `fullt`：已安排审核    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue606    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_64858158
#### PP-04 Bug Report模板敷衍填写，创建质量低（I1 · 分配与首次响应）

- **[#615](https://gitcode.com/cann/ops-cv/issues/615) [Bug-Report|缺陷反馈]: Upsample_bilinear2d_grad在边界场景(inf/nan)下精度有问题** — 0分
  - 痛点原因：仅进行了任务分配和机器人自动关闭，全程无人工实质性技术回应。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue615    - [关联PR #1110（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1110)
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 0分
  - 痛点原因：维护者仅询问提问者是否自行修复，全程未对文档缺陷本身提供任何实质解答或确认。
  - 原文依据：
    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @renruhai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#613](https://gitcode.com/cann/ops-cv/issues/613) [Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复** — 0分
  - 痛点原因：全程仅有机器人自动分配与关闭操作，无任何人工分析问题或提供解决方案的实质回应。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue613    - [关联PR #1111（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1111)    - [关联PR #1112（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1112)
- **[#612](https://gitcode.com/cann/ops-cv/issues/612) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 0分
  - 痛点原因：全程仅加标签并由机器人关联合并请求自动关闭，始终无人工实质回应。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `renruhai`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue612    - [关联PR #1103（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1103)    - [关联PR #1115（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1115)
- **[#611](https://gitcode.com/cann/ops-cv/issues/611) [Requirement|需求建议]: 算子原型迁移至所属仓** — 0分
  - 痛点原因：全程无人工实质回应，仅通过机器人指派和关联PR合并自动关闭，缺乏对需求的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `renruhai`：assigned to @Hana77    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue611    - [关联PR #1105（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1105)    - [关联PR #1106（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1106)
- **[#608](https://gitcode.com/cann/ops-cv/issues/608) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5inf/-inf处理修复** — 0分
  - 痛点原因：全程仅由机器人执行分配和关闭操作，无任何人工实质技术回应。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue608    - [关联PR #1100（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1100)    - [关联PR #1101（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1101)
- **[#607](https://gitcode.com/cann/ops-cv/issues/607) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改** — 0分
  - 痛点原因：维护者仅打标签并指派，未对反馈内容作任何实质回复，直接由机器人随MR合并关闭。
  - 原文依据：
    - `gitee-duhuiping`：add label documentation    - `cann-robot`：add label resolved    - `gitee-duhuiping`：assigned to @gitee-duhuiping    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue607    - [关联PR #1097（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1097)    - [关联PR #1098（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1098)
- **[#606](https://gitcode.com/cann/ops-cv/issues/606) [Requirement|需求建议]: ROIAlignGrad算子合并** — 0分
  - 痛点原因：仅有流程性认领与机器人操作，缺乏针对需求内容的实质性技术评估，且被直接关闭，导致无实质回应。
  - 原文依据：
    - `qq_64858158`：/assign [@qq_64858158](https://gitcode.com/qq_64858158)    - `fullt`：已安排审核    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_64858158    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue606    - [关联PR #1099（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1099)
- **[#605](https://gitcode.com/cann/ops-cv/issues/605) [Bug-Report|缺陷反馈]: merge_proto.py 解析带注释或 guard 的 proto 时可能误吞内容** — 0分
  - 痛点原因：维护者仅执行分配操作，未对缺陷做任何技术确认或回复，直接由机器人随关联MR合并关闭。
  - 原文依据：
    - `liu-wei`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue605    - [关联PR #1095（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1095)
- **[#604](https://gitcode.com/cann/ops-cv/issues/604) OP_DEF_PATTERN 中 #endif 条件匹配过严，guard 分支无法命中** — 0分
  - 痛点原因：仅进行了打标签、指派和关闭操作，全程无任何实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#601](https://gitcode.com/cann/ops-cv/issues/601) [Bug-Report|缺陷反馈]: upsample_nearest_exact1d 缺少 originScales 参数导致 scale 计算不正确** — 0分
  - 痛点原因：仅打标签和分配人员，机器人直接关闭，全程无实质性技术回应。
  - 原文依据：
    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue601    - [关联PR #1094（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1094)    - [关联PR #1096（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1096)
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 0分
  - 痛点原因：首次响应后仅由机器人打标签并关闭，全程无人工对硬编码风险等实质问题进行回应。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
- **[#598](https://gitcode.com/cann/ops-cv/issues/598) [Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错** — 0分
  - 痛点原因：仅有标签操作和分配，全程无任何实质性技术回应即被机器人关闭。
  - 原文依据：
    - `nunnons2`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @nunnons2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue598    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)
- **[#597](https://gitcode.com/cann/ops-cv/issues/597) [Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复** — 0分
  - 痛点原因：仅机器人分配和加标签后直接关闭，全程无任何人工实质回应。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue597    - [关联PR #1090（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1090)    - [关联PR #1091（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1091)
#### PP-05 Bot缺位率22.2%，部分Issue无自动化介入（G · Bot/Agent 治理）

- **[#615](https://gitcode.com/cann/ops-cv/issues/615) [Bug-Report|缺陷反馈]: Upsample_bilinear2d_grad在边界场景(inf/nan)下精度有问题** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭操作，全程无任何评论与用户交互，治理过程缺乏透明度。
  - 原文依据：
    - `xuejinghui`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue615    - [关联PR #1110（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1110)
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何引导评论，且在人工沟通期间直接关闭，治理流于形式。
  - 原文依据：
    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @renruhai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#613](https://gitcode.com/cann/ops-cv/issues/613) [Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复** — 20分
  - 痛点原因：Bot仅被动执行分配与关闭指令，无任何主动治理评论，缺乏有效互动与深度治理。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue613    - [关联PR #1111（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1111)    - [关联PR #1112（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1112)
- **[#612](https://gitcode.com/cann/ops-cv/issues/612) [Documentation|文档反馈]: gitcode aclnn md如何直接发布官网，缺少api索引文件，请补齐** — 20分
  - 痛点原因：Bot仅机械打标并在关联MR合并后自动关闭，全程无解释性评论，未与用户进行有效沟通。
  - 原文依据：
    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `renruhai`：assigned to @gitcode-chenjiao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue612    - [关联PR #1103（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1103)    - [关联PR #1115（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1115)
- **[#611](https://gitcode.com/cann/ops-cv/issues/611) [Requirement|需求建议]: 算子原型迁移至所属仓** — 20分
  - 痛点原因：Bot关闭时引用了错误的关联issue号且未留任何解释评论，导致关闭行为不透明且缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `renruhai`：assigned to @Hana77    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue611    - [关联PR #1105（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1105)    - [关联PR #1106（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1106)
- **[#608](https://gitcode.com/cann/ops-cv/issues/608) [Bug-Report|缺陷反馈]: resize_upsample_trilinear A5inf/-inf处理修复** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程零评论，缺乏交互与状态说明。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @gcw_mJtIrnnZ    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue608    - [关联PR #1100（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1100)    - [关联PR #1101（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1101)
- **[#607](https://gitcode.com/cann/ops-cv/issues/607) [Documentation|文档反馈]: 来源①torch_npu名称合一TorchNPU②《acl API》手册更名修改** — 20分
  - 痛点原因：Bot仅机械打标和随MR合并自动关闭，无任何评论互动，缺乏对用户的有效反馈与治理引导。
  - 原文依据：
    - `gitee-duhuiping`：add label documentation    - `cann-robot`：add label resolved    - `gitee-duhuiping`：assigned to @gitee-duhuiping    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue607    - [关联PR #1097（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1097)    - [关联PR #1098（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1098)
- **[#606](https://gitcode.com/cann/ops-cv/issues/606) [Requirement|需求建议]: ROIAlignGrad算子合并** — 20分
  - 痛点原因：Bot仅被动执行打标与分配指令，评论数为0，缺乏有效交互与治理反馈。
  - 原文依据：
    - `qq_64858158`：/assign [@qq_64858158](https://gitcode.com/qq_64858158)    - `fullt`：已安排审核    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_64858158    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue606    - [关联PR #1099（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1099)
- **[#605](https://gitcode.com/cann/ops-cv/issues/605) [Bug-Report|缺陷反馈]: merge_proto.py 解析带注释或 guard 的 proto 时可能误吞内容** — 20分
  - 痛点原因：Bot仅凭关联MR合并便自动关闭缺陷反馈，缺乏有效验证与沟通，存在误关风险导致治理失效。
  - 原文依据：
    - `liu-wei`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liu-wei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue605    - [关联PR #1095（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1095)
- **[#604](https://gitcode.com/cann/ops-cv/issues/604) OP_DEF_PATTERN 中 #endif 条件匹配过严，guard 分支无法命中** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动与自动关闭，后续状态流转全靠人工，未发挥实际治理作用。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `liu-wei`：assigned to @liu-wei    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#601](https://gitcode.com/cann/ops-cv/issues/601) [Bug-Report|缺陷反馈]: upsample_nearest_exact1d 缺少 originScales 参数导致 scale 计算不正确** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，无任何评论互动，缺乏对用户的状态同步与治理引导。
  - 原文依据：
    - `cuijie25`：add label bug-report    - `cann-robot`：add label resolved    - `cuijie25`：assigned to @cuijie25    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue601    - [关联PR #1094（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1094)    - [关联PR #1096（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1096)
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 20分
  - 痛点原因：Bot仅机械打标关闭，零评论回应开发者指出的硬编码风险，缺乏有效治理与跟进。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
- **[#598](https://gitcode.com/cann/ops-cv/issues/598) [Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错** — 20分
  - 痛点原因：Bot仅执行打标和关闭，无自动评论交互，治理动作单一且被动。
  - 原文依据：
    - `nunnons2`：add label bug-report    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @nunnons2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue598    - [关联PR #1085（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1085)    - [关联PR #1093（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1093)
- **[#597](https://gitcode.com/cann/ops-cv/issues/597) [Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复** — 20分
  - 痛点原因：Bot仅机械执行打标分配与关闭，无任何评论交互，缺乏实质性治理反馈。
  - 原文依据：
    - `qy3311888`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qy3311888    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue597    - [关联PR #1090（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1090)    - [关联PR #1091（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1091)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | MR合并前 |
| 具体动作 | 在PR模板中增加Issue目标达成确认项，要求勾选核心目标已完成 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 15.6，低分 17/18；OBJ_DECISION_TRANSPARENCY：均值 57.5，低分 8/18 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 15.6，低分 17/18 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 57.5，低分 8/18 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot配置维护者；候选负责人 `liu-wei` |
| 触发条件 | MR合并事件 |
| 具体动作 | 在自动关闭前增加Issue目标达成校验步骤，要求人工确认或关键词匹配 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 10 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 28.9，低分 14/18；OBJ_BOT_MISCLOSE_REVERSE：均值 94.4，低分 0/18 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 28.9，低分 14/18 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 94.4，低分 0/18 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，人工直接处理且闭环顺畅 | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | Bot配置维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue无活动超过7天 |
| 具体动作 | Bot自动添加stale标签并@assignee要求更新状态 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；相关低分样本降至 0 以下 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 23.1，低分 16/18；OBJ_RESULT_FORMATION_TIMELINESS：均值 90.0，低分 1/18 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 90.0，低分 1/18 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 23.1，低分 16/18 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 维护者逐条回答三问，形成明确结论，用户关闭 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **78.0/100**，整体相对可控，但仍需关注：存在轻度痛点，部分Bug Report模板字段敷衍填写，所有必填项…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 88.1 | 真实用户提问，内容专业具体，无AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 67.9 | 结构清晰，三问编号列出，含环境信息，但无复现步骤 |

代表低分 Issue：[#597](https://gitcode.com/cann/ops-cv/issues/597)
问题：[Bug-Report|缺陷反馈]: GridSampler2DGrad算子950开启确定性计算报错问题修复。

### I1 · 分配与首次响应

本阶段分数为 **65.2/100**，整体相对可控，但仍需关注：Bug Report模板敷衍填写，创建质量低。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 22.2 | 均值 22.2，低分 14/18 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 94.4 | 均值 94.4，低分 0/18 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 79.2 | 无assignee，责任归属不明确，仅靠@提及 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 72.1 | 无标签无正式分流，靠@机制触达维护者 |

代表低分 Issue：[#599](https://gitcode.com/cann/ops-cv/issues/599)
问题：[Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper。

### I2 · 讨论与解决

本阶段分数为 **59.9/100**，本阶段需要改进，主要问题是：开放Issue停滞无推进，讨论深度不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 90.0 | 均值 90.0，低分 1/18 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 23.1 | 均值 23.1，低分 16/18 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 56.6 | 维护者逐条回答三问，形成明确结论，用户关闭 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 73.4 | 三个问题均获明确回答，用户自行关闭标记已解决 |

代表低分 Issue：[#610](https://gitcode.com/cann/ops-cv/issues/610)
问题：[Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash。

### I3 · 总结与关闭

本阶段分数为 **45.9/100**，本阶段需要改进，主要问题是：关闭沉淀质量严重不足，83% Issue不达标。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 15.6 | 均值 15.6，低分 17/18 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 57.5 | 均值 57.5，低分 8/18 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 42.1 | 关闭后未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 77.8 | 用户获答后自行关闭，标记已解决，无过早关闭风险 |

代表低分 Issue：[#598](https://gitcode.com/cann/ops-cv/issues/598)
问题：[Bug-Report|缺陷反馈]: RoiPoolingGradWithArgMax执行ut时报错。

### G · Bot/Agent 治理

本阶段分数为 **64.3/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 28.9 | 均值 28.9，低分 14/18 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.4 | 均值 94.4，低分 0/18 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 70.3 | 无bot介入，人工直接处理且闭环顺畅 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 65.8 | 无bot介入，信息不足，给中性保守分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 69.2 | 无bot介入，信息不足，给中性保守分 |

代表低分 Issue：[#599](https://gitcode.com/cann/ops-cv/issues/599)
问题：[Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 18 | 48.9 | 首期基线 | 78.0 | 65.2 | 59.9 | 45.9 | 64.3 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **4 位社区响应者**贡献 **9 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `liu-wei` | 4 |
| `renruhai` | 2 |
| `gcw_mJtIrnnZ` | 2 |
| `fullt` | 1 |

Top1 响应占比 **44.4%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-06_to_2026-07-12 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.0/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-07-06_to_2026-07-12.json`。
