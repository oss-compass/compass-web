# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **12** 个 Issue
+ **Open 4 / Closed 8**，关闭率 **66.7%**。
+ 总体体验分为 **46.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 39.9 | 关闭质量全面低下，缺乏解决证据与复用 |
| P0 | I2 · 讨论与解决 | 53.7 | Issue讨论近乎为零，PR驱动替代交流 |
| P0 | I1 · 分配与首次响应 | 57.4 | Triage标签缺失与实质性响应缺位 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置自动标签Bot，根据标题前缀和模板内容自动打标 |
| REC-02 | P0 | 在Issue中补充技术方案说明和排查方向，引导讨论 |
| REC-03 | P0 | 执行关闭检查清单：解决方案摘要、验证证据、复用标签 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 12 |
| Open / Closed | 4 / 8 |
| 关闭率 | 66.7% |
| 类型构成 | 缺陷 4 / 需求 7 / 其他 1 |
| 总体体验分 | 46.6/100（D） |
| 首次响应时间 | 中位 6.6h；均值 15.0h |
| 关闭周期 | 中位 22.3h；均值 1.3天 |
| 7天响应率 | 91.7% |
| 评论数/Issue | 0.17 |
| 标签覆盖率 | 83.3% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 87.1/100 |
| 置信度 | 中 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 91.5 | 0/12（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 89.2 |
| I1 · 分配与首次响应 | 57.4 | 9/12（75.0%） | P0 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 8.3 |
| I2 · 讨论与解决 | 53.7 | 4/12（33.3%） | P0 | `OBJ_SOLUTION_EVIDENCE` 28.8 |
| I3 · 总结与关闭 | 39.9 | 12/12（100.0%） | P0 | `OBJ_CLOSURE_REUSE` 9.6 |
| G · Bot/Agent 治理（参考） | 65.8 | 2/12（16.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 36.7 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I1 · 分配与首次响应 | Triage标签缺失与实质性响应缺位 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 8.3，低分 11/12；OBJ_RESPONSE_SPEED：均值 73.3，低分 1/12 | 未分类Issue难以路由追踪，无实质性响应导致贡献者等待且方向不明 |
| PP-02 | P0 | I2 · 讨论与解决 | Issue讨论近乎为零，PR驱动替代交流 | OBJ_SOLUTION_EVIDENCE：均值 28.8，低分 12/12；OBJ_RESULT_FORMATION_TIMELINESS：均值 65.0，低分 4/12 | 技术决策过程不可追溯，社区无法参与讨论，知识沉淀在PR而非Issue中 |
| PP-03 | P0 | I3 · 总结与关闭 | 关闭质量全面低下，缺乏解决证据与复用 | OBJ_CLOSURE_REUSE：均值 9.6，低分 12/12；OBJ_DECISION_TRANSPARENCY：均值 33.8，低分 11/12 | 关闭的Issue无法作为知识库复用，同类问题重复提交风险高，社区知识沉淀缺失 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot自动化治理缺位，25% Issue无介入 | OBJ_BOT_GOVERNANCE：均值 36.7，低分 7/12；OBJ_BOT_MISCLOSE_REVERSE：均值 95.0，低分 0/12 | 部分Issue缺乏自动化分流和关闭验证，治理一致性不足 |

### 4.1 低分 Issue 明细

#### PP-01 Triage标签缺失与实质性响应缺位（I1 · 分配与首次响应）

- **[#320](https://gitcode.com/cann/ops-blas/issues/320) [Requirement|需求建议]: arch35 下 sasum/snrm2/srot/srotg/sscal/scalex 测试适配混合容差精度标准** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人打标签、分配并随关联MR合并自动关闭。
  - 原文依据：
    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue320    - [关联PR #294（merged）](https://gitcode.com/cann/ops-blas/merge_requests/294)
- **[#319](https://gitcode.com/cann/ops-blas/issues/319) [Bug-Report|缺陷反馈]: 多个算子 arch35 测试精度校验使用混合精度校验规则** — 0分
  - 痛点原因：仅执行指派和加标签操作，随后被机器人直接标记为resolved，全程无针对缺陷的技术分析或实质解答。
  - 原文依据：
    - `justsheldon`：/assign [@justsheldon](https://gitcode.com/justsheldon)    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue319    - [关联PR #285（merged）](https://gitcode.com/cann/ops-blas/merge_requests/285)
- **[#318](https://gitcode.com/cann/ops-blas/issues/318) [Bug]: sgeqrf_batched NPU kernel 执行失败 + 精度不符 LAPACK 标准** — 0分
  - 痛点原因：仅指派负责人并关联未合并PR，未提供任何实质性技术解答。
  - 原文依据：
    - `wangzitao_leo`：assigned to @xutianze    - [关联PR #291（open）](https://gitcode.com/cann/ops-blas/merge_requests/291)
- **[#317](https://gitcode.com/cann/ops-blas/issues/317) [Requirement|需求建议]: 精度验证文档/Skill 同步对齐 MIXED_TOLERANCE 测试框架** — 0分
  - 痛点原因：全程无任何实质性技术回应，仅靠机器人关联PR合并自动关闭issue，导致得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `xutianze`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue317    - [关联PR #290（merged）](https://gitcode.com/cann/ops-blas/merge_requests/290)
- **[#316](https://gitcode.com/cann/ops-blas/issues/316) [Requirement|需求建议]: saxpy、axpy_ex、sgemv 迁移至 MIXED_TOLERANCE 精度标准** — 0分
  - 痛点原因：全程仅由机器人分配标签和关联PR关闭，无任何针对需求的人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue316    - [关联PR #288（merged）](https://gitcode.com/cann/ops-blas/merge_requests/288)
- **[#315](https://gitcode.com/cann/ops-blas/issues/315) feat(frame): 适配7个算子使用MIXED_TOLERANCE混合容差精度验证** — 0分
  - 痛点原因：维护者仅打标签、分配负责人及关联PR，全程未对需求提供任何文字实质回复。
  - 原文依据：
    - `yuyuanfeng`：add label enhancement    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#312](https://gitcode.com/cann/ops-blas/issues/312) [Requirement|需求建议]: 对齐新生态算子开源精度标准，补全test实现** — 0分
  - 痛点原因：仅进行了加标签和分配负责人等流程操作，全程无任何实质性回复即被关闭。
  - 原文依据：
    - `Twoliges`：add label requirement    - `Twoliges`：assigned to @Twoliges    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - [关联PR #282（closed）](https://gitcode.com/cann/ops-blas/merge_requests/282)    - [关联PR #283（merged）](https://gitcode.com/cann/ops-blas/merge_requests/283)
- **[#311](https://gitcode.com/cann/ops-blas/issues/311) [Requirement|需求建议]: 新增面向 arch22 的 aclblasSsbmv 算子，实现单精度对称带状矩阵向量乘** — 0分
  - 痛点原因：分配负责人耗时27.71小时，且后续始终未提供任何实质性的技术回应。
  - 原文依据：
    - `wangzitao_leo`：assigned to @dilettante2polymath
- **[#310](https://gitcode.com/cann/ops-blas/issues/310) [Requirement|需求建议]: aclblasStrmm 接口参数不符合 BLAS 标准** — 0分
  - 痛点原因：仅由机器人关联 PR 并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue310    - [关联PR #272（merged）](https://gitcode.com/cann/ops-blas/merge_requests/272)
- **[#309](https://gitcode.com/cann/ops-blas/issues/309) [Bug] gemv_strided_batched 半精度路径 Cast 操作 UB buffer 越界风险** — 0分
  - 痛点原因：首次响应仅打标签和分配任务，全程无实质性技术回应，最终被机器人随MR合并直接关闭。
  - 原文依据：
    - `yuyuanfeng`：add label bug    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue309    - [关联PR #279（merged）](https://gitcode.com/cann/ops-blas/merge_requests/279)
- **[#308](https://gitcode.com/cann/ops-blas/issues/308) Feat: 新增面向ascend950的aclblasSgemmEx接口** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人在关联PR合并后自动关闭，故得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue308    - [关联PR #276（merged）](https://gitcode.com/cann/ops-blas/merge_requests/276)
#### PP-02 Issue讨论近乎为零，PR驱动替代交流（I2 · 讨论与解决）

- **[#311](https://gitcode.com/cann/ops-blas/issues/311) [Requirement|需求建议]: 新增面向 arch22 的 aclblasSsbmv 算子，实现单精度对称带状矩阵向量乘** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联 PR、提交记录、文档链接及关闭评论等实际解决证据。
  - 原文依据：
    - `wangzitao_leo`：assigned to @dilettante2polymath
- **[#316](https://gitcode.com/cann/ops-blas/issues/316) [Requirement|需求建议]: saxpy、axpy_ex、sgemv 迁移至 MIXED_TOLERANCE 精度标准** — 15分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏人工关闭评论、commit引用和release引用等实质性解决证据。
  - 原文依据：
    - [关联PR #288（merged）](https://gitcode.com/cann/ops-blas/merge_requests/288)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue316    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze
- **[#315](https://gitcode.com/cann/ops-blas/issues/315) feat(frame): 适配7个算子使用MIXED_TOLERANCE混合容差精度验证** — 15分
  - 痛点原因：关联PR仍处于open状态未合并，且无commit、release引用及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `yuyuanfeng`：add label enhancement    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#312](https://gitcode.com/cann/ops-blas/issues/312) [Requirement|需求建议]: 对齐新生态算子开源精度标准，补全test实现** — 15分
  - 痛点原因：仅靠状态变更关闭，无commit引用、文档链接及关闭评论说明，解决证据薄弱。
  - 原文依据：
    - [关联PR #282（closed）](https://gitcode.com/cann/ops-blas/merge_requests/282)    - [关联PR #283（merged）](https://gitcode.com/cann/ops-blas/merge_requests/283)    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `Twoliges`：add label requirement    - `Twoliges`：assigned to @Twoliges
- **[#319](https://gitcode.com/cann/ops-blas/issues/319) [Bug-Report|缺陷反馈]: 多个算子 arch35 测试精度校验使用混合精度校验规则** — 23分
  - 痛点原因：仅有合并的关联PR和机器人自动关闭评论，缺乏commit引用、文档及release链接，无人工对解决结果的实质性说明。
  - 原文依据：
    - [关联PR #285（merged）](https://gitcode.com/cann/ops-blas/merge_requests/285)    - `justsheldon`：/assign [@justsheldon](https://gitcode.com/justsheldon)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue319    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @justsheldon
- **[#320](https://gitcode.com/cann/ops-blas/issues/320) [Requirement|需求建议]: arch35 下 sasum/snrm2/srot/srotg/sscal/scalex 测试适配混合容差精度标准** — 31分
  - 痛点原因：虽有合并PR和commit，但缺乏人工关闭说明、测试验证或文档更新等强证据，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #294（merged）](https://gitcode.com/cann/ops-blas/merge_requests/294)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue320    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @chensi79
- **[#313](https://gitcode.com/cann/ops-blas/issues/313) [Bug-Report|缺陷反馈]: master 分支在 CANN-9.0.0 社区版编译 Ascend950 算子失败** — 31分
  - 痛点原因：缺失关联PR、release引用及关闭评论，仅停留在确认与指派阶段，无实质性解决结论。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#309](https://gitcode.com/cann/ops-blas/issues/309) [Bug] gemv_strided_batched 半精度路径 Cast 操作 UB buffer 越界风险** — 31分
  - 痛点原因：缺乏commit引用及人工关闭总结评论，仅靠机器人自动关闭与加标签，导致修复细节与解决证据单薄。
  - 原文依据：
    - [关联PR #279（merged）](https://gitcode.com/cann/ops-blas/merge_requests/279)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue309    - `yuyuanfeng`：add label bug    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#318](https://gitcode.com/cann/ops-blas/issues/318) [Bug]: sgeqrf_batched NPU kernel 执行失败 + 精度不符 LAPACK 标准** — 46分
  - 痛点原因：关联PR仍处于open状态未合并，且无关闭评论确认问题已解决，导致证据链不完整。
  - 原文依据：
    - [关联PR #291（open）](https://gitcode.com/cann/ops-blas/merge_requests/291)    - `wangzitao_leo`：assigned to @xutianze
- **[#317](https://gitcode.com/cann/ops-blas/issues/317) [Requirement|需求建议]: 精度验证文档/Skill 同步对齐 MIXED_TOLERANCE 测试框架** — 46分
  - 痛点原因：仅靠机器人自动关闭并加标签，缺乏人工确认解决的评论，且未关联release版本，证据偏弱。
  - 原文依据：
    - [关联PR #290（merged）](https://gitcode.com/cann/ops-blas/merge_requests/290)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue317    - `cann-robot`：add label resolved    - `xutianze`：assigned to @xutianze
- **[#310](https://gitcode.com/cann/ops-blas/issues/310) [Requirement|需求建议]: aclblasStrmm 接口参数不符合 BLAS 标准** — 46分
  - 痛点原因：缺乏关闭时的总结性评论和文档更新链接，仅依赖机器人自动关闭和打标签，解决证据不够充分。
  - 原文依据：
    - [关联PR #272（merged）](https://gitcode.com/cann/ops-blas/merge_requests/272)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue310    - `cann-robot`：add label resolved
- **[#308](https://gitcode.com/cann/ops-blas/issues/308) Feat: 新增面向ascend950的aclblasSgemmEx接口** — 46分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏人工关闭评论和明确的解决说明，导致证据强度不足。
  - 原文依据：
    - [关联PR #276（merged）](https://gitcode.com/cann/ops-blas/merge_requests/276)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue308    - `cann-robot`：add label resolved
#### PP-03 关闭质量全面低下，缺乏解决证据与复用（I3 · 总结与关闭）

- **[#320](https://gitcode.com/cann/ops-blas/issues/320) [Requirement|需求建议]: arch35 下 sasum/snrm2/srot/srotg/sscal/scalex 测试适配混合容差精度标准** — 0分
  - 痛点原因：机器人因MR合并自动关闭且关闭说明为空，未沉淀方案文档或关联重复链接，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue320    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @chensi79    - [关联PR #294（merged）](https://gitcode.com/cann/ops-blas/merge_requests/294)
- **[#318](https://gitcode.com/cann/ops-blas/issues/318) [Bug]: sgeqrf_batched NPU kernel 执行失败 + 精度不符 LAPACK 标准** — 0分
  - 痛点原因：关闭时无任何说明文字，未沉淀方案文档，且关联PR仍处于open状态，无法提供复用参考。
  - 原文依据：
    - `wangzitao_leo`：assigned to @xutianze    - [关联PR #291（open）](https://gitcode.com/cann/ops-blas/merge_requests/291)
- **[#315](https://gitcode.com/cann/ops-blas/issues/315) feat(frame): 适配7个算子使用MIXED_TOLERANCE混合容差精度验证** — 0分
  - 痛点原因：关闭说明为空且关联PR仍处于open状态，未沉淀任何可复用的结论信息。
  - 原文依据：
    - `yuyuanfeng`：add label enhancement    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#313](https://gitcode.com/cann/ops-blas/issues/313) [Bug-Report|缺陷反馈]: master 分支在 CANN-9.0.0 社区版编译 Ascend950 算子失败** — 0分
  - 痛点原因：关闭说明为空，无方案文档化记录与重复issue主链接，未留存任何可复用的解决经验。
  - 原文依据：
    - `xujiachen8`：add label bug-report    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @eternityk    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#312](https://gitcode.com/cann/ops-blas/issues/312) [Requirement|需求建议]: 对齐新生态算子开源精度标准，补全test实现** — 0分
  - 痛点原因：关闭时无任何文字说明，缺乏方案文档与复用链接，仅由系统自动关闭，未沉淀实现细节供后续参考。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `Twoliges`：add label requirement    - `Twoliges`：assigned to @Twoliges    - [关联PR #282（closed）](https://gitcode.com/cann/ops-blas/merge_requests/282)    - [关联PR #283（merged）](https://gitcode.com/cann/ops-blas/merge_requests/283)
- **[#311](https://gitcode.com/cann/ops-blas/issues/311) [Requirement|需求建议]: 新增面向 arch22 的 aclblasSsbmv 算子，实现单精度对称带状矩阵向量乘** — 0分
  - 痛点原因：关闭时零文字说明，未沉淀方案文档或关联重复链接，无法为后续类似需求提供参考。
  - 原文依据：
    - `wangzitao_leo`：assigned to @dilettante2polymath
- **[#310](https://gitcode.com/cann/ops-blas/issues/310) [Requirement|需求建议]: aclblasStrmm 接口参数不符合 BLAS 标准** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅靠机器人因关联PR合并自动关闭，未沉淀任何可供复用的经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue310    - `cann-robot`：add label resolved    - [关联PR #272（merged）](https://gitcode.com/cann/ops-blas/merge_requests/272)
- **[#308](https://gitcode.com/cann/ops-blas/issues/308) Feat: 新增面向ascend950的aclblasSgemmEx接口** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人因关联PR合并自动关闭，未留存任何可复用的上下文信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue308    - `cann-robot`：add label resolved    - [关联PR #276（merged）](https://gitcode.com/cann/ops-blas/merge_requests/276)
- **[#319](https://gitcode.com/cann/ops-blas/issues/319) [Bug-Report|缺陷反馈]: 多个算子 arch35 测试精度校验使用混合精度校验规则** — 25分
  - 痛点原因：关闭说明仅机械关联另一issue，无方案文档化沉淀，缺乏可复用的具体解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue319    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：/assign [@justsheldon](https://gitcode.com/justsheldon)    - `cann-robot`：assigned to @justsheldon    - [关联PR #285（merged）](https://gitcode.com/cann/ops-blas/merge_requests/285)
- **[#317](https://gitcode.com/cann/ops-blas/issues/317) [Requirement|需求建议]: 精度验证文档/Skill 同步对齐 MIXED_TOLERANCE 测试框架** — 30分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，缺乏人工总结与复用指导。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue317    - `cann-robot`：add label resolved    - `xutianze`：assigned to @xutianze    - [关联PR #290（merged）](https://gitcode.com/cann/ops-blas/merge_requests/290)
- **[#316](https://gitcode.com/cann/ops-blas/issues/316) [Requirement|需求建议]: saxpy、axpy_ex、sgemv 迁移至 MIXED_TOLERANCE 精度标准** — 30分
  - 痛点原因：关闭说明为0字且仅由机器人自动关闭，未补充重复issue主链接，导致后续无法复用上下文。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue316    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - [关联PR #288（merged）](https://gitcode.com/cann/ops-blas/merge_requests/288)
- **[#309](https://gitcode.com/cann/ops-blas/issues/309) [Bug] gemv_strided_batched 半精度路径 Cast 操作 UB buffer 越界风险** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因关联其他issue自动关闭，缺乏对解决方案及复用价值的文字总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue309    - `yuyuanfeng`：add label bug    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #279（merged）](https://gitcode.com/cann/ops-blas/merge_requests/279)
#### PP-04 Bot自动化治理缺位，25% Issue无介入（G · Bot/Agent 治理）

- **[#320](https://gitcode.com/cann/ops-blas/issues/320) [Requirement|需求建议]: arch35 下 sasum/snrm2/srot/srotg/sscal/scalex 测试适配混合容差精度标准** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论互动，缺乏有效沟通与状态同步。
  - 原文依据：
    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue320    - [关联PR #294（merged）](https://gitcode.com/cann/ops-blas/merge_requests/294)
- **[#319](https://gitcode.com/cann/ops-blas/issues/319) [Bug-Report|缺陷反馈]: 多个算子 arch35 测试精度校验使用混合精度校验规则** — 20分
  - 痛点原因：Bot仅机械执行指派与关闭操作，无任何评论说明，缺乏有效互动与自动化治理反馈机制。
  - 原文依据：
    - `justsheldon`：/assign [@justsheldon](https://gitcode.com/justsheldon)    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue319    - [关联PR #285（merged）](https://gitcode.com/cann/ops-blas/merge_requests/285)
- **[#317](https://gitcode.com/cann/ops-blas/issues/317) [Requirement|需求建议]: 精度验证文档/Skill 同步对齐 MIXED_TOLERANCE 测试框架** — 20分
  - 痛点原因：Bot执行打标和关闭时未留下任何评论，缺乏透明度，且关闭时关联的issue号与实际PR不符，导致治理无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `xutianze`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue317    - [关联PR #290（merged）](https://gitcode.com/cann/ops-blas/merge_requests/290)
- **[#316](https://gitcode.com/cann/ops-blas/issues/316) [Requirement|需求建议]: saxpy、axpy_ex、sgemv 迁移至 MIXED_TOLERANCE 精度标准** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为零，缺乏状态提示与有效互动，治理过程流于形式。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue316    - [关联PR #288（merged）](https://gitcode.com/cann/ops-blas/merge_requests/288)
- **[#310](https://gitcode.com/cann/ops-blas/issues/310) [Requirement|需求建议]: aclblasStrmm 接口参数不符合 BLAS 标准** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，未发表评论说明关闭原因及关联PR情况，缺乏有效沟通导致治理无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue310    - [关联PR #272（merged）](https://gitcode.com/cann/ops-blas/merge_requests/272)
- **[#309](https://gitcode.com/cann/ops-blas/issues/309) [Bug] gemv_strided_batched 半精度路径 Cast 操作 UB buffer 越界风险** — 20分
  - 痛点原因：Bot仅执行自动打标与随MR合并关闭操作，全程无任何评论互动与有效引导，治理行为机械且缺乏沟通。
  - 原文依据：
    - `yuyuanfeng`：add label bug    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue309    - [关联PR #279（merged）](https://gitcode.com/cann/ops-blas/merge_requests/279)
- **[#308](https://gitcode.com/cann/ops-blas/issues/308) Feat: 新增面向ascend950的aclblasSgemmEx接口** — 20分
  - 痛点原因：Bot仅静默打标与关闭，未通过评论向用户说明关闭原因及关联PR，缺乏透明度与有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue308    - [关联PR #276（merged）](https://gitcode.com/cann/ops-blas/merge_requests/276)

## 5. 本周行动清单

### REC-01 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue创建时 |
| 具体动作 | 配置自动标签Bot，根据标题前缀和模板内容自动打标 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 95 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 8.3，低分 11/12；OBJ_RESPONSE_SPEED：均值 73.3，低分 1/12 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 8.3，低分 11/12 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 73.3，低分 1/12 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 由维护者wangzitao_leo明确assign给chensi79，责任归属… | 明确责任人、候选负责人和下一步动作 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue assign后 |
| 具体动作 | 在Issue中补充技术方案说明和排查方向，引导讨论 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；平均评论数提升至 2 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.8，低分 12/12；OBJ_RESULT_FORMATION_TIMELINESS：均值 65.0，低分 4/12 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 65.0，低分 4/12 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.8，低分 12/12 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无评论讨论，但issue自带完整设计方案和关联PR，通过PR合并实现推进 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 执行关闭检查清单：解决方案摘要、验证证据、复用标签 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 50 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 9.6，低分 12/12；OBJ_DECISION_TRANSPARENCY：均值 33.8，低分 11/12 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 9.6，低分 12/12 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 33.8，低分 11/12 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 需求已通过PR合并完成，后续反馈需求低，但关闭时无明确总结或路径说明 | 关闭时明确说明后续反馈路径和重新开启条件 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **91.5/100**，整体相对可控，但仍需关注：无痛点，Issue创建质量良好，模板填写完整，结构化程度高。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.8 | 内容含具体commit哈希、PR链接和技术细节，为真实人工贡献，无AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 89.2 | 结构完整，含背景/来源/价值/设计四节，有代码片段、文件路径和关联PR，需求描… |


### I1 · 分配与首次响应

本阶段分数为 **57.4/100**，本阶段需要改进，主要问题是：Triage标签缺失与实质性响应缺位。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 8.3 | 均值 8.3，低分 11/12 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 73.3 | 均值 73.3，低分 1/12 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 85.7 | 由维护者wangzitao_leo明确assign给chensi79，责任归属… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 78.9 | 正确标注requirement标签，分派给作者本人处理，关联PR路径清晰 |

代表低分 Issue：[#315](https://gitcode.com/cann/ops-blas/issues/315)
问题：feat(frame): 适配7个算子使用MIXED_TOLERANCE混合容差精度验证。

### I2 · 讨论与解决

本阶段分数为 **53.7/100**，本阶段需要改进，主要问题是：Issue讨论近乎为零，PR驱动替代交流。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 65.0 | 均值 65.0，低分 4/12 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 28.8 | 均值 28.8，低分 12/12 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 55.8 | 无评论讨论，但issue自带完整设计方案和关联PR，通过PR合并实现推进 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 72.2 | 关联PR#294已合并，6个算子迁移需求已实现，用户目标得到满足 |

代表低分 Issue：[#311](https://gitcode.com/cann/ops-blas/issues/311)
问题：[Requirement|需求建议]: 新增面向 arch22 的 aclblasSsbmv 算子，实现单精度对称带状矩阵向量乘。

### I3 · 总结与关闭

本阶段分数为 **39.9/100**，本阶段是本周短板之一，主要问题是：关闭质量全面低下，缺乏解决证据与复用。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 9.6 | 均值 9.6，低分 12/12 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 33.8 | 均值 33.8，低分 11/12 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 47.9 | 需求已通过PR合并完成，后续反馈需求低，但关闭时无明确总结或路径说明 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 86.6 | PR合并后由bot关闭，有实际代码落地支撑；但close_reason为进行中… |

代表低分 Issue：[#320](https://gitcode.com/cann/ops-blas/issues/320)
问题：[Requirement|需求建议]: arch35 下 sasum/snrm2/srot/srotg/sscal/scalex 测试适配混合容差精度标准。

### G · Bot/Agent 治理

本阶段分数为 **65.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 36.7 | 均值 36.7，低分 7/12 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 95.0 | 均值 95.0，低分 0/12 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 66.4 | 人工assign和PR流程顺畅推进，bot仅在PR合并后收尾，未阻断人工流程 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 64.3 | bot在PR合并后自动关闭issue并添加resolved标签，流程治理有效 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 66.7 | bot动作准确及时，PR合并后关闭并标resolved，无错误阻断或误判 |

代表低分 Issue：[#316](https://gitcode.com/cann/ops-blas/issues/316)
问题：[Requirement|需求建议]: saxpy、axpy_ex、sgemv 迁移至 MIXED_TOLERANCE 精度标准。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 12 | 46.6 | 首期基线 | 91.5 | 57.4 | 53.7 | 39.9 | 65.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **1 位社区响应者**贡献 **1 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `wangzitao_leo` | 1 |

Top1 响应占比 **100.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：87.1/100，整体置信度 中。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-07-13_to_2026-07-19.json`。
