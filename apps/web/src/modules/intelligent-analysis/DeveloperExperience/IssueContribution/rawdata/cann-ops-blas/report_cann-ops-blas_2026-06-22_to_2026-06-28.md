# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **40** 个 Issue
+ 其中外部 Issue **14** 个、内部 **26** 个；I1–I3 及 G 基于「外部且成熟」的 **14** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 1 / Closed 39**，关闭率 **97.5%**。
+ 总体体验分为 **47.2/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 42.7 | 关闭阶段得分仅42.7分 |
| P1 | I1 · 分配与首次响应 | 55.4 | 无响应率达15%且Bot缺位 |
| P1 | I2 · 讨论与解决 | 59.4 | 平均评论数仅0.475条 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | Bot关闭前校验issue原始需求是否完全覆盖，部分完成时保持open并创建子issue跟踪剩余项 |
| REC-02 | P0 | 执行关闭检查清单：验证close_reason与实际一致、补充解决方案摘要、说明后续反馈路径 |
| REC-03 | P1 | 要求维护者至少提供一条含排查方向或方案建议的实质性回复 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 40 |
| Open / Closed | 1 / 39 |
| 关闭率 | 97.5% |
| 类型构成 | 缺陷 12 / 需求 16 / 咨询 1 / 其他 11 |
| 总体体验分 | 47.2/100（D） |
| 首次响应时间 | 中位 2.2h；均值 17.4h |
| 关闭周期 | 中位 18.0h；均值 2.9天 |
| 7天响应率 | 82.5% |
| 评论数/Issue | 0.47 |
| 标签覆盖率 | 87.5% |
| 指派覆盖率 | 85.0% |
| 数据完整性 | 89.5/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 84.8 | 0/40（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 79.1 |
| I1 · 分配与首次响应 | 55.4 | 3/14（21.4%） | P1 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 32.9 |
| I2 · 讨论与解决 | 59.4 | 2/14（14.3%） | 需改进 | `OBJ_SOLUTION_EVIDENCE` 24.7 |
| I3 · 总结与关闭 | 42.7 | 9/14（64.3%） | P0 | `OBJ_CLOSURE_REUSE` 6.4 |
| G · Bot/Agent 治理（参考） | 63.8 | 4/14（28.6%） | 参考项 | `OBJ_BOT_GOVERNANCE` 34.3 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | G · Bot/Agent 治理 | Bot误关闭率高达27.5% | OBJ_BOT_GOVERNANCE：均值 34.3，低分 9/14；OBJ_BOT_MISCLOSE_REVERSE：均值 92.9，低分 0/14 | 用户目标未完全满足但issue已关闭，剩余问题无跟踪路径，社区信任受损 |
| PP-02 | P0 | I3 · 总结与关闭 | 关闭阶段得分仅42.7分 | OBJ_CLOSURE_REUSE：均值 6.4，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 60.0，低分 5/14 | 用户无法判断问题是否真正解决，后续反馈无入口，社区知识资产流失 |
| PP-03 | P1 | I2 · 讨论与解决 | 平均评论数仅0.475条 | OBJ_SOLUTION_EVIDENCE：均值 24.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 94.3，低分 0/14 | 问题根因未充分讨论，解决方案可能不完善，社区知识无讨论沉淀 |
| PP-04 | P1 | I1 · 分配与首次响应 | 无响应率达15%且Bot缺位 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 32.9，低分 9/14；OBJ_RESPONSE_SPEED：均值 67.1，低分 4/14 | 部分用户需求被完全忽视，社区参与感差，需求池积压 |
| PP-05 | P1 | I1 · 分配与首次响应 | Triage阶段得分仅55.4分 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 32.9，低分 9/14；OBJ_RESPONSE_SPEED：均值 67.1，低分 4/14 | 问题路由不清晰，责任归属不明，处理效率降低 |

### 4.1 低分 Issue 明细

#### PP-01 Bot误关闭率高达27.5%（G · Bot/Agent 治理）

- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，未留下任何评论与用户互动，缺乏有效沟通与状态解释。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，未发挥实质治理作用。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `zhanghua145`：add label documentation    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 20分
  - 痛点原因：Bot在开发者仅回复修复中时便机械打标resolved并关闭，全程无任何有效评论互动，治理失效。
  - 原文依据：
    - `justsheldon`：修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程无评论互动，缺乏有效沟通说明。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 20分
  - 痛点原因：Bot在人工仍在讨论并定位问题原因时错误关闭了issue，且无任何评论说明，治理失效。
  - 原文依据：
    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…    - `wangzitao_leo`：stream 是你用 aclrtCreateStream 创建的，通过 aclblasSetStream 绑定到 handle 上。库只借用这个 stream，不拥有它。 实现里 aclblasDestroy 只会： 1. 同步 stre…    - `2302_77046878`：add label bug-report    - `cann-robot`：add label resolved
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 20分
  - 痛点原因：Bot仅完成打标，在开发者修改完毕后未自动关闭Issue或进行评论，缺乏有效闭环。
  - 原文依据：
    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 20分
  - 痛点原因：Bot仅执行打标与关闭，无任何评论互动，缺乏自动回复或指派等实质性自动化治理动作。
  - 原文依据：
    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 20分
  - 痛点原因：Bot仅完成打标，无任何评论互动，且最终由人工关闭，未发挥实质治理作用。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `zhanghua145`：closed from codehub    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，无任何评论互动，缺乏与用户的有效沟通。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
#### PP-02 关闭阶段得分仅42.7分（I3 · 总结与关闭）

- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 0分
  - 痛点原因：无方案文档化且未关联主链接，关闭说明仅9字，仅由机器人随合并自动关闭，未留存可供复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，确认中。    - `eternityk`：assigned to @eternityk    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 0分
  - 痛点原因：关闭说明仅3字且无方案文档化，仅由机器人因关联MR合并自动关闭，缺乏可复用的修复细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：修复中    - `wangzitao_leo`：assigned to @justsheldon    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人因关联PR合并自动关闭，缺乏可复用的经验总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接，仅机械变更状态与打标签，未留存任何可复用经验。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：关闭说明为空，无方案文档化及关联链接，仅靠系统操作直接关闭，无法提供任何复用参考。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档或重复链接，仅由工具自动关闭并打标签，缺乏复用信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：仅由系统自动关闭并改状态，无方案文档、重复链接及关闭说明，未留存任何可复用信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 0分
  - 痛点原因：无方案文档和重复主链接，关闭说明仅13字且由机器人自动关闭，缺乏人工总结，复用价值极低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue203    - `2302_77046878`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 0分
  - 痛点原因：关闭说明仅9字，无方案文档化及重复链接，未留存有效解决方案供社区复用。
  - 原文依据：
    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `wangzitao_leo`：assigned to @yang-di52
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 0分
  - 痛点原因：关闭说明仅11字且无方案文档化沉淀与dup主链接，未留存有效信息供后续复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，正在确认中。    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
- **[#192](https://gitcode.com/cann/ops-blas/issues/192) [精度] ascend950 上 gemv_batched/stbmv/strsv 大尺寸矩阵精度超标** — 0分
  - 痛点原因：关闭说明仅17字且仅留跳转链接，无方案文档化，未总结问题原因与解决方案，毫无经验参考价值。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：已通过https://gitcode.com/cann/ops-blas/issues/213跟踪和修复。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 30分
  - 痛点原因：关闭复用价值得分30，低于合格线 60
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212    - `zhanghua145`：add label documentation    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `zhanghua145`：assigned to @wangzitao_leo
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 30分
  - 痛点原因：关闭说明仅19字且未提供关联主issue链接，虽有方案文档但缺乏追溯路径，难以被后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - `cann-robot`：add label resolved    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `zhanghua145`：assigned to @zhanghua145    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 30分
  - 痛点原因：关闭说明仅18字且无重复链接，仅靠系统指令关闭，未在评论区补充最终解决方案或文档指引。
  - 原文依据：
    - `zhanghua145`：closed from codehub    - `cann-robot`：add label resolved    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `zhanghua145`：assigned to @zhanghua145    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
#### PP-03 平均评论数仅0.475条（I2 · 讨论与解决）

- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit引用、文档链接、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：仅通过状态变更和加标签关闭，未关联任何PR、commit或文档链接，缺乏实质解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：关闭时未关联PR、commit或文档，也无关闭评论说明，仅靠状态变更和加标签关闭，无法证明问题已解决。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接，仅通过状态变更和系统操作关闭，无实质解决痕迹。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：仅通过 codehub 直接关闭并更改状态，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 23分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏commit、文档及release链接，且人工回复仅停留在确认中。
  - 原文依据：
    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk
- **[#192](https://gitcode.com/cann/ops-blas/issues/192) [精度] ascend950 上 gemv_batched/stbmv/strsv 大尺寸矩阵精度超标** — 23分
  - 痛点原因：仅凭口头说明和状态变更关闭，未关联PR、commit或文档链接等实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：已通过https://gitcode.com/cann/ops-blas/issues/213跟踪和修复。    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 38分
  - 痛点原因：虽有关联PR，但缺乏commit与release引用，且仅停留在文档补充，未体现完整编译执行验证过程。
  - 原文依据：
    - [关联PR #225（merged）](https://gitcode.com/cann/ops-blas/merge_requests/225)    - [关联PR #230（merged）](https://gitcode.com/cann/ops-blas/merge_requests/230)    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212    - `zhanghua145`：add label documentation
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与文档链接，且关闭评论仅为简单状态更新，证据链不够强。
  - 原文依据：
    - [关联PR #183（merged）](https://gitcode.com/cann/ops-blas/merge_requests/183)    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 38分
  - 痛点原因：缺少commit引用和release引用，仅靠关联PR与关闭评论支撑，解决证据链不够完整。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 38分
  - 痛点原因：缺乏commit与release引用，且关闭评论仅显示从codehub关闭，未提供具体的解决说明或修复细节。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `zhanghua145`：closed from codehub    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 38分
  - 痛点原因：关闭评论为机器人因关联issue合并自动关闭，缺乏直接修复该问题的commit引用与人工确认说明。
  - 原文依据：
    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - `cann-robot`：add label resolved
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 54分
  - 痛点原因：虽有关联PR与commit引用，但缺少文档链接和release引用，解决证据链不完整。
  - 原文依据：
    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)    - `justsheldon`：修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 54分
  - 痛点原因：维护者本地未能复现，最终由用户自行定位原因，缺乏官方明确的修复验证证据。
  - 原文依据：
    - [关联PR #220（merged）](https://gitcode.com/cann/ops-blas/merge_requests/220)    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…    - `wangzitao_leo`：stream 是你用 aclrtCreateStream 创建的，通过 aclblasSetStream 绑定到 handle 上。库只借用这个 stream，不拥有它。 实现里 aclblasDestroy 只会： 1. 同步 stre…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue203
#### PP-04 无响应率达15%且Bot缺位（I1 · 分配与首次响应）

- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 0分
  - 痛点原因：首次响应仅模板化确认，后续仅机器人分配与关闭，全程无任何实质性解答。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 0分
  - 痛点原因：仅回复修复中及打标签分配等流程操作，全程无实质性技术回应导致得分为零。
  - 原文依据：
    - `justsheldon`：修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅添加标签后由机器人关联PR合并直接关闭，全程无任何人工实质回应。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：全程仅单人进行加标签、改状态和关闭操作，无任何实质性沟通或回应内容。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：全程仅有加标签、改状态和关闭等流程性操作，缺乏任何人工实质回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：维护者仅进行了打标签、关闭和状态变更操作，全程未提供任何实质性的文字回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：该 issue 自始至终无任何人工实质回应，仅由提交者自行关闭并更改状态，未获得任何有效答复。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 0分
  - 痛点原因：仅用模板话术快速响应，后续直接由机器人加标签并关闭，缺乏对需求的实质性分析与解答。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `zhanghua145`：closed from codehub    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 0分
  - 痛点原因：仅初步回复正在确认，随后直接由机器人关闭并关联合并PR，全程无人工实质回应。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
#### PP-05 Triage阶段得分仅55.4分（I1 · 分配与首次响应）

- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 0分
  - 痛点原因：首次响应仅模板化确认，后续仅机器人分配与关闭，全程无任何实质性解答。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 0分
  - 痛点原因：仅回复修复中及打标签分配等流程操作，全程无实质性技术回应导致得分为零。
  - 原文依据：
    - `justsheldon`：修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅添加标签后由机器人关联PR合并直接关闭，全程无任何人工实质回应。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：全程仅单人进行加标签、改状态和关闭操作，无任何实质性沟通或回应内容。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：全程仅有加标签、改状态和关闭等流程性操作，缺乏任何人工实质回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：维护者仅进行了打标签、关闭和状态变更操作，全程未提供任何实质性的文字回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：该 issue 自始至终无任何人工实质回应，仅由提交者自行关闭并更改状态，未获得任何有效答复。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 0分
  - 痛点原因：仅用模板话术快速响应，后续直接由机器人加标签并关闭，缺乏对需求的实质性分析与解答。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `zhanghua145`：closed from codehub    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 0分
  - 痛点原因：仅初步回复正在确认，随后直接由机器人关闭并关联合并PR，全程无人工实质回应。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)

## 5. 本周行动清单

### REC-01 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | MR合并事件 |
| 具体动作 | Bot关闭前校验issue原始需求是否完全覆盖，部分完成时保持open并创建子issue跟踪剩余项 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 34.3，低分 9/14；OBJ_BOT_MISCLOSE_REVERSE：均值 92.9，低分 0/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 34.3，低分 9/14 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 92.9，低分 0/14 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 人工处理已完成至PR合并，bot仅做收尾关闭，交接顺畅 | 改善 Bot 到人工处理的交接质量 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 执行关闭检查清单：验证close_reason与实际一致、补充解决方案摘要、说明后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 6.4，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 60.0，低分 5/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 6.4，低分 14/14 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 60.0，低分 5/14 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 无明确后续反馈路径说明，但内部实现类issue需求已满足 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue收到首次响应后48h内 |
| 具体动作 | 要求维护者至少提供一条含排查方向或方案建议的实质性回复 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 24.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 94.3，低分 0/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 94.3，低分 0/14 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 24.7，低分 14/14 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅一条确认评论，讨论不充分但流程推进有效直至PR合并 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **84.8/100**，整体相对可控，但仍需关注：创建阶段表现良好，无显著痛点，issue正文结构化程度高。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.6 | 内容具体技术性强，含profiling实测数据与边界用例，无明显AI幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 79.1 | 结构化章节完整，设计方案含双kernel架构与测试计划，作为需求类issue质… |


### I1 · 分配与首次响应
本阶段分数为 **55.4/100**，本阶段需要改进，主要问题是：无响应率达15%且Bot缺位。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 32.9 | 均值 32.9，低分 9/14 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 67.1 | 均值 67.1，低分 4/14 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 63.4 | 有明确assignee认领，且关联PR由其推进至合并 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 63.8 | 正确分配给eternityk，通过PR合并关闭，路由路径合理 |

代表低分 Issue：[#209](https://gitcode.com/cann/ops-blas/issues/209)
问题：[Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败。

### I2 · 讨论与解决
本阶段分数为 **59.4/100**，本阶段需要改进，主要问题是：平均评论数仅0.475条。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 94.3 | 均值 94.3，低分 0/14 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 24.7 | 均值 24.7，低分 14/14 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 49.3 | 仅一条确认评论，讨论不充分但流程推进有效直至PR合并 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 69.1 | PR#197已合并，STRMM算子arch35实现需求得到有效满足 |

代表低分 Issue：[#209](https://gitcode.com/cann/ops-blas/issues/209)
问题：[Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败。

### I3 · 总结与关闭
本阶段分数为 **42.7/100**，本阶段需要改进，主要问题是：关闭阶段得分仅42.7分。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 6.4 | 均值 6.4，低分 14/14 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 60.0 | 均值 60.0，低分 5/14 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 42.1 | 无明确后续反馈路径说明，但内部实现类issue需求已满足 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 71.9 | MR合并后由bot自动关闭，属正常闭环流程，无过早关闭迹象 |

代表低分 Issue：[#209](https://gitcode.com/cann/ops-blas/issues/209)
问题：[Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败。

### G · Bot/Agent 治理
本阶段分数为 **63.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 34.3 | 均值 34.3，低分 9/14 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 92.9 | 均值 92.9，低分 0/14 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 65.1 | 人工处理已完成至PR合并，bot仅做收尾关闭，交接顺畅 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 61.8 | bot在MR合并后自动关闭并加resolved标签，有效完成生命周期管理 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 65.5 | 关闭时机准确（MR合并后），标签动作合规，无误操作 |

代表低分 Issue：[#212](https://gitcode.com/cann/ops-blas/issues/212)
问题：【文档】blas 算子 README 缺少调用示例（34个算子）。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 40 | 47.2 | 首期基线 | 84.8 | 55.4 | 59.4 | 42.7 | 63.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **4 位社区响应者**贡献 **17 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `wangzitao_leo` | 10 |
| `zhanghua145` | 4 |
| `yang-di52` | 2 |
| `justsheldon` | 1 |

Top1 响应占比 **58.8%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.5/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-06-22_to_2026-06-28.json`。
