# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-07-06_to_2026-07-12**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **18** 个 Issue
+ 其中外部 Issue **6** 个、内部 **12** 个；I1–I3 及 G 基于「外部且成熟」的 **6** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 2 / Closed 16**，关闭率 **88.9%**。
+ 总体体验分为 **52.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 53.7 | 过早关闭与关闭原因失真 |
| P0 | I2 · 讨论与解决 | 56.9 | Open issue讨论停滞无推进 |
| P2 | I0 · 创建 | 77.8 | 部分issue模板填写质量低，必填字段内容重复无实质复现信息 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 主动介入推动讨论或标记needs-info并设定回复期限 |
| REC-02 | P0 | 校验issue验收清单完成度，未完成则标记partial-resolved并保留open |
| REC-03 | P1 | 校验close_reason与issue状态语义一致性，矛盾时阻断或要求人工确认 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 18 |
| Open / Closed | 2 / 16 |
| 关闭率 | 88.9% |
| 类型构成 | 缺陷 10 / 需求 2 / 咨询 4 / 其他 2 |
| 总体体验分 | 52.5/100（D） |
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
| I0 · 创建 | 77.8 | 2/18（11.1%） | 相对可控 | `SUB_INPUT_QUALITY` 65.3 |
| I1 · 分配与首次响应 | 79.2 | 1/6（16.7%） | 相对可控 | `SUB_ROUTING_CORRECTNESS` 63.3 |
| I2 · 讨论与解决 | 56.9 | 3/6（50.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 35.9 |
| I3 · 总结与关闭 | 53.7 | 4/6（66.7%） | P0 | `OBJ_CLOSURE_REUSE` 32.5 |
| G · Bot/Agent 治理（参考） | 66.2 | 1/6（16.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 46.7 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | Open issue讨论停滞无推进 | OBJ_SOLUTION_EVIDENCE：均值 35.9，低分 4/6；OBJ_RESULT_FORMATION_TIMELINESS：均值 76.7，低分 1/6 | 问题长期未解决，贡献者流失风险增加 |
| PP-02 | P0 | I3 · 总结与关闭 | 过早关闭与关闭原因失真 | OBJ_CLOSURE_REUSE：均值 32.5，低分 5/6；OBJ_DECISION_TRANSPARENCY：均值 67.5，低分 2/6 | 问题未真正解决，社区信任受损，后续维护成本增加 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot误关闭率偏高关闭原因矛盾 | OBJ_BOT_GOVERNANCE：均值 46.7，低分 2/6；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/6 | 已关闭issue可能未真正解决，增加重开和追溯成本 |
| PP-04 | P1 | G · Bot/Agent 治理 | Open issue bot缺位无标签 | OBJ_BOT_GOVERNANCE：均值 46.7，低分 2/6；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/6 | open issue缺乏自动化分流，处理延迟且无追踪机制 |
| PP-06 | P1 | I3 · 总结与关闭 | 关闭后无后续路径说明 | OBJ_CLOSURE_REUSE：均值 32.5，低分 5/6；OBJ_DECISION_TRANSPARENCY：均值 67.5，低分 2/6 | 用户无法确认问题是否真正解决，缺乏反馈闭环 |
| PP-05 | P2 | I1 · 分配与首次响应 | Issue创建模板填写质量低 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 83.3，低分 1/6；OBJ_RESPONSE_SPEED：均值 90.0，低分 0/6 | 维护者难以快速理解和复现问题，增加沟通成本 |

### 4.1 低分 Issue 明细

#### PP-01 Open issue讨论停滞无推进（I2 · 讨论与解决）

- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 0分
  - 痛点原因：未关联任何 PR、commit 或文档链接，讨论仅涉及代码逻辑解释与任务分配，缺乏实际修复或解决的证据。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai
- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 15分
  - 痛点原因：无关联PR、提交记录及关闭评论，仅停留在初步沟通与指派阶段，未提供实质性解决证据。
  - 原文依据：
    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？    - `liu-wei`：assigned to @renruhai
- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 23分
  - 痛点原因：仅靠评论回复并关闭，无关联PR、代码提交或文档链接等实质性解决证据。
  - 原文依据：
    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。    - `TreamTik`：closed from codehub
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 23分
  - 痛点原因：关联PR仅修复局部路径未解决抽通用helper的核心诉求，缺乏commit等直接证据，仅凭机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - `cann-robot`：add label resolved
#### PP-02 过早关闭与关闭原因失真（I3 · 总结与关闭）

- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 0分
  - 痛点原因：关闭时无任何文字说明且未关联重复链接，缺乏解决过程记录，无复用价值。
  - 原文依据：
    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？    - `liu-wei`：assigned to @renruhai
- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 0分
  - 痛点原因：关闭说明为0字，且无方案文档与相关链接，未留下可复用的解决过程与结论。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 30分
  - 痛点原因：关闭说明仅30字且仅提及关联MR合并，未沉淀约束关系修复细节，无dup主链接，缺乏供他人复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - `cann-robot`：add label resolved    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `liu-wei`：assigned to @renruhai    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 45分
  - 痛点原因：仅提供文字解答未沉淀为方案文档，无主链接关联，且由系统自动关闭，难以供他人复用。
  - 原文依据：
    - `TreamTik`：closed from codehub    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 45分
  - 痛点原因：关联PR仅做单点修复，未按标题抽出通用helper消除硬编码风险，且无方案文档沉淀，复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
#### PP-03 Bot误关闭率偏高关闭原因矛盾（G · Bot/Agent 治理）

- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭，无任何有效评论或深度交互，治理行为过于简单。
  - 原文依据：
    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @renruhai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，评论数为零，未对人工提出的硬编码风险作任何回应或后续治理。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
#### PP-04 Open issue bot缺位无标签（G · Bot/Agent 治理）

- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭，无任何有效评论或深度交互，治理行为过于简单。
  - 原文依据：
    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `cann-robot`：add label resolved    - `liu-wei`：assigned to @renruhai    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，评论数为零，未对人工提出的硬编码风险作任何回应或后续治理。
  - 原文依据：
    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
#### PP-06 关闭后无后续路径说明（I3 · 总结与关闭）

- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 0分
  - 痛点原因：关闭时无任何文字说明且未关联重复链接，缺乏解决过程记录，无复用价值。
  - 原文依据：
    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？    - `liu-wei`：assigned to @renruhai
- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 0分
  - 痛点原因：关闭说明为0字，且无方案文档与相关链接，未留下可复用的解决过程与结论。
  - 原文依据：
    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai
- **[#614](https://gitcode.com/cann/ops-cv/issues/614) 【文档缺陷】ExtractGlimpseV2 算子 README 缺少输出 shape 与 size 的约束关系及非负约束** — 30分
  - 痛点原因：关闭说明仅30字且仅提及关联MR合并，未沉淀约束关系修复细节，无dup主链接，缺乏供他人复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue614    - `cann-robot`：add label resolved    - `liu-wei`：您好，我看您这边已经提了PR，是打算自己直接修复了问题是吗？    - `liu-wei`：assigned to @renruhai    - [关联PR #1114（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1114)
- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 45分
  - 痛点原因：仅提供文字解答未沉淀为方案文档，无主链接关联，且由系统自动关闭，难以供他人复用。
  - 原文依据：
    - `TreamTik`：closed from codehub    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。
- **[#599](https://gitcode.com/cann/ops-cv/issues/599) [Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper** — 45分
  - 痛点原因：关联PR仅做单点修复，未按标题抽出通用helper消除硬编码风险，且无方案文档沉淀，复用价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue599    - `cann-robot`：add label resolved    - `liu-wei`：🔗 关联来源：PR #1086 修复 build_opp_kernel_static.py 的 `/ops_cv/` 路径残留，但**硬编码 repo 名 + 单点 replace** 留下同类 bug 风险（其他包、其他 build 脚…    - [关联PR #1086（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1086)
#### PP-05 Issue创建模板填写质量低（I1 · 分配与首次响应）

- **[#616](https://gitcode.com/cann/ops-cv/issues/616) [Question|问题咨询]: [GaussianBlur] 关于官方用例性能验收范围及 A100 对标方式的咨询** — 55分
  - 痛点原因：无标签无assignee，分流靠用户主动@人完成，缺乏系统化路由。
  - 原文依据：
    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)    - `TreamTik`：[@jxlang](https://gitcode.com/jxlang) [@condfuse_3](https://gitcode.com/condfuse_3) [@fullt](https://gitcode.com/fullt)…    - `renruhai`：您好， 1. 提供的用例都会参与性能验收，不要看任务书中档次。 2. 性能标准只看A100实测总耗时，950PR 达标时间 <= A100 实测时间 / 0.45。 3. 只统计设备侧执行时间即可。    - `TreamTik`：closed from codehub
- **[#610](https://gitcode.com/cann/ops-cv/issues/610) [Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash** — 55分
  - 痛点原因：无标签分类，仅指派负责人，分流路径不够明确。
  - 原文依据：
    - `liu-wei`：assigned to @renruhai    - `liu-wei`：您好，想问下issue里提到的： 看了一下 kernel 里的高斯核生成逻辑。 - 这个具体是指的哪个文件里的逻辑呢？
- **[#609](https://gitcode.com/cann/ops-cv/issues/609) [Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…** — 55分
  - 痛点原因：有人认领但无标签分类，未进入正式处理路径，仅靠评论驱动。
  - 原文依据：
    - `liu-wei`：assigned to @renruhai    - `cann-robot`：assigned to @gcw_mJtIrnnZ and unassigned @renruhai    - `gcw_mJtIrnnZ`：/assign    - `liu-wei`：您好，608对应的PR还没有合入，这边提的这个ISSUE的目的是什么呢？    - `gcw_mJtIrnnZ`：所述场景不会越界，simt_base中的ComputeLinearIndexAndWeight函数会对于index进行越界管理，index1 不是直接 index0+1 ，而是 min(index0+1, limit)，访问的是 inpu…

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | issue open超过7天无活动 |
| 具体动作 | 主动介入推动讨论或标记needs-info并设定回复期限 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 35.9，低分 4/6；OBJ_RESULT_FORMATION_TIMELINESS：均值 76.7，低分 1/6 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 76.7，低分 1/6 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 35.9，低分 4/6 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 回复逐条回答三个问题，形成明确结论，用户随后关闭标记已解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | MR合并触发issue关闭前 |
| 具体动作 | 校验issue验收清单完成度，未完成则标记partial-resolved并保留open |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 32.5，低分 5/6；OBJ_DECISION_TRANSPARENCY：均值 67.5，低分 2/6 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 32.5，低分 5/6 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 67.5，低分 2/6 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明后续反馈路径或重新开启条件，信息不足保守给分。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `liu-wei` |
| 触发条件 | bot执行关闭动作时 |
| 具体动作 | 校验close_reason与issue状态语义一致性，矛盾时阻断或要求人工确认 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 46.7，低分 2/6；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/6 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 46.7，低分 2/6 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 100.0，低分 0/6 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，人工处理本身顺畅但不存在交接场景。 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **77.8/100**，整体相对可控，但仍需关注：部分issue模板填写质量低，必填字段内容重复无实质复现信息。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.3 | 内容为真实技术咨询，含具体算子和性能指标细节，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 65.3 | 问题分点清晰、有环境信息和结构化章节，但无复现步骤或日志代码。 |

代表低分 Issue：[#613](https://gitcode.com/cann/ops-cv/issues/613)
问题：[Bug-Report|缺陷反馈]: GridSamplerGrad算子950确定性计算问题修复。

### I1 · 分配与首次响应
本阶段分数为 **79.2/100**，整体相对可控，但仍需关注：分流基本有效但部分issue缺乏人工分类标签管理。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 83.3 | 均值 83.3，低分 1/6 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 90.0 | 均值 90.0，低分 0/6 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 72.5 | 无明确assignee，责任归属仅靠用户@人触发，不够清晰。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 63.3 | 无标签无assignee，分流靠用户主动@人完成，缺乏系统化路由。 |

代表低分 Issue：[#599](https://gitcode.com/cann/ops-cv/issues/599)
问题：[Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper。

### I2 · 讨论与解决
本阶段分数为 **56.9/100**，本阶段需要改进，主要问题是：Open issue讨论停滞无推进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 76.7 | 均值 76.7，低分 1/6 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 35.9 | 均值 35.9，低分 4/6 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 59.5 | 回复逐条回答三个问题，形成明确结论，用户随后关闭标记已解决。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 56.3 | 三个咨询问题均获明确解答，用户自行关闭并标记已解决。 |

代表低分 Issue：[#610](https://gitcode.com/cann/ops-cv/issues/610)
问题：[Bug-Report] GaussianBlur 社区任务中的 sigma 参数没有做零值校验，sigma=0 时高斯权重计算除零 crash。

### I3 · 总结与关闭
本阶段分数为 **53.7/100**，本阶段需要改进，主要问题是：过早关闭与关闭原因失真。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 32.5 | 均值 32.5，低分 5/6 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 67.5 | 均值 67.5，低分 2/6 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 41.7 | 关闭后未说明后续反馈路径或重新开启条件，信息不足保守给分。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 76.7 | 有实质回复后用户自行关闭，关闭原因为已解决，无过早关闭迹象。 |

代表低分 Issue：[#609](https://gitcode.com/cann/ops-cv/issues/609)
问题：[Bug-Report] resize_upsample_trilinear 在 scale_factor < 1（降采样）时坐标映射溢出，A5inf 上输出…。

### G · Bot/Agent 治理
本阶段分数为 **66.2/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 46.7 | 均值 46.7，低分 2/6 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/6 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 55.8 | 无bot介入，人工处理本身顺畅但不存在交接场景。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 54.2 | 无bot介入，既无帮助也无噪音，中性评分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 56.7 | 无bot介入，不存在自动化动作，中性评分。 |

代表低分 Issue：[#599](https://gitcode.com/cann/ops-cv/issues/599)
问题：[Follow-up] build_opp_kernel_static.py 的 split/replace 硬编码模式需要抽通用 helper。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-06_to_2026-07-12 | 18 | 52.5 | 首期基线 | 77.8 | 79.2 | 56.9 | 53.7 | 66.2 |

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
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.0/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-07-06_to_2026-07-12.json`。
