# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **40** 个 Issue
+ **Open 2 / Closed 38**，关闭率 **95.0%**。
+ 总体体验分为 **47.1/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 41.0 | 关闭阶段缺乏验证与沉淀 |
| P1 | I1 · 分配与首次响应 | 55.7 | 长尾响应与无响应并存 |
| P0 | I2 · 讨论与解决 | 60.4 | 讨论严重不足零评论多 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 要求提交验证结果或测试证据，说明覆盖范围和剩余计划 |
| REC-02 | P0 | 发起技术方案讨论或确认排查方向，至少一条实质评论 |
| REC-03 | P1 | 校验issue目标覆盖度，未完全满足时保持open并提示剩余项 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 40 |
| Open / Closed | 2 / 38 |
| 关闭率 | 95.0% |
| 类型构成 | 缺陷 12 / 需求 16 / 咨询 1 / 其他 11 |
| 总体体验分 | 47.1/100（D） |
| 首次响应时间 | 中位 2.2h；均值 17.4h |
| 关闭周期 | 中位 17.5h；均值 2.2天 |
| 7天响应率 | 82.5% |
| 评论数/Issue | 0.47 |
| 标签覆盖率 | 87.5% |
| 指派覆盖率 | 85.0% |
| 数据完整性 | 89.3/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 84.4 | 0/40（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 79.5 |
| I1 · 分配与首次响应 | 55.7 | 18/40（45.0%） | P1 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 11.5 |
| I2 · 讨论与解决 | 60.4 | 7/40（17.5%） | 相对可控 | `OBJ_SOLUTION_EVIDENCE` 22.3 |
| I3 · 总结与关闭 | 41.0 | 31/40（77.5%） | P0 | `OBJ_CLOSURE_REUSE` 11.2 |
| G · Bot/Agent 治理（参考） | 64.7 | 5/40（12.5%） | 参考项 | `OBJ_BOT_GOVERNANCE` 29.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏验证与沉淀 | OBJ_CLOSURE_REUSE：均值 11.2，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 43.9，低分 28/40 | 用户无法确认问题真正解决，知识无法沉淀复用 |
| PP-02 | P0 | I2 · 讨论与解决 | 讨论严重不足零评论多 | OBJ_SOLUTION_EVIDENCE：均值 22.3，低分 39/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 89.0，低分 3/40 | 技术决策缺乏讨论支撑，问题排查方向不明确 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot误关闭率高达27.5% | OBJ_BOT_GOVERNANCE：均值 29.0，低分 31/40；OBJ_BOT_MISCLOSE_REVERSE：均值 94.5，低分 0/40 | 未完成的需求被标记为已解决，用户信任受损 |
| PP-04 | P1 | I1 · 分配与首次响应 | 长尾响应与无响应并存 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 11.5，低分 35/40；OBJ_RESPONSE_SPEED：均值 73.5，低分 8/40 | 部分issue长期搁置，用户等待体验差 |
| PP-05 | P2 | I2 · 讨论与解决 | 开放issue停滞无推进 | OBJ_SOLUTION_EVIDENCE：均值 22.3，低分 39/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 89.0，低分 3/40 | 需求类issue长期停滞，资源投入方向不明确 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏验证与沉淀（I3 · 总结与关闭）

- **[#227](https://gitcode.com/cann/ops-blas/issues/227) [Requirement]: 新增 aclblasStbsv 算子（三角带状方程组求解，arch35）** — 0分
  - 痛点原因：关闭说明为空且无方案文档与复用链接，仅由机器人随MR合并自动关闭，未沉淀任何参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue227    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #218（merged）](https://gitcode.com/cann/ops-blas/merge_requests/218)
- **[#226](https://gitcode.com/cann/ops-blas/issues/226) Feat: 新增面向Ascend950(arch35)的aclblasRotEx接口** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及重复链接，仅由代码库直接关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#225](https://gitcode.com/cann/ops-blas/issues/225) 新增 aclblasSrotg 算子（面向 arch35，支持 Host/Device 双指针路径）** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无方案文档沉淀且关闭说明为空，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue225    - `cann-robot`：add label resolved    - [关联PR #200（merged）](https://gitcode.com/cann/ops-blas/merge_requests/200)
- **[#224](https://gitcode.com/cann/ops-blas/issues/224) [Requirement|需求建议]: 新增面向arch35的aclblasSmatinvBatched批量矩阵求逆接口** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人自动关闭，导致后续用户无法复用其解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - [关联PR #201（merged）](https://gitcode.com/cann/ops-blas/merge_requests/201)
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 0分
  - 痛点原因：机器人随MR合并自动关闭，无方案文档与关联链接，关闭说明仅9字，未沉淀可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，确认中。    - `eternityk`：assigned to @eternityk    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#221](https://gitcode.com/cann/ops-blas/issues/221) [Requirement|需求建议]: 消除 cmake/patches/ops-tensor 下的 ops-tensor 兼容性补丁** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人随关联PR合并自动关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue221    - `cann-robot`：add label resolved    - [关联PR #215（merged）](https://gitcode.com/cann/ops-blas/merge_requests/215)
- **[#220](https://gitcode.com/cann/ops-blas/issues/220) [Requirement|需求建议]: 新增 aclblasSspr2 算子 arch35 实现** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅靠机器人关联合并请求自动关闭，未留下任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue220    - `yuyuanfeng`：add label requirement    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #202（merged）](https://gitcode.com/cann/ops-blas/merge_requests/202)
- **[#213](https://gitcode.com/cann/ops-blas/issues/213) [Daily-QA|每日监测] ascend950 大面积测试失败: 8 个算子 (CANN 9.1.0, 2026-06-24)** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人关联MR合并自动关闭，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue213    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - [关联PR #210（merged）](https://gitcode.com/cann/ops-blas/merge_requests/210)    - [关联PR #214（merged）](https://gitcode.com/cann/ops-blas/merge_requests/214)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 0分
  - 痛点原因：仅由机器人因MR合并自动关闭，无方案文档与复现链接，关闭说明仅3字，缺乏排查与修复细节供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：修复中    - `wangzitao_leo`：assigned to @justsheldon    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人随PR合并自动关闭，未沉淀问题原因与解决方案，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅由工具自动关闭并加标签，缺乏后续参考价值。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：关闭时未留下任何文字说明、方案文档或重复链接，仅通过系统操作直接关闭，无法提供复用信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与重复链接，仅通过系统状态变更和打标签关闭，毫无复用价值。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，仅机械修改状态并从 codehub 关闭，未留存任何复用信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 0分
  - 痛点原因：关闭说明仅13字且为机器人自动关闭，无方案文档化记录与dup主链接，未沉淀可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue203    - `2302_77046878`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…
- **[#202](https://gitcode.com/cann/ops-blas/issues/202) Feat: 新增面向arch35的aclblasSrotg接口** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀方案文档或关联重复链接，未留下可复用信息。
  - 原文依据：
    - `wangzitao_leo`：assigned to @chensi79    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#201](https://gitcode.com/cann/ops-blas/issues/201) [Requirement|需求建议]: 修正4个算子的结构问题，按照sig例会要求改为异步架构** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人因MR合并自动关闭，未沉淀任何可供复用的经验或方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue201    - `zhaotiensn`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhaotiensn    - [关联PR #199（merged）](https://gitcode.com/cann/ops-blas/merge_requests/199)
- **[#198](https://gitcode.com/cann/ops-blas/issues/198) [Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀或重复链接，未留下任何可复用信息。
  - 原文依据：
    - `2302_77046878`：add label requirement    - `2302_77046878`：assigned to @2302_77046878
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 0分
  - 痛点原因：关闭说明仅9字，无方案文档化与重复链接，未留存可复用的解决信息。
  - 原文依据：
    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `wangzitao_leo`：assigned to @yang-di52
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 0分
  - 痛点原因：关闭说明仅11字且无方案文档与重复链接，仅由机器人自动关闭，未沉淀有效解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，正在确认中。    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
- **[#192](https://gitcode.com/cann/ops-blas/issues/192) [精度] ascend950 上 gemv_batched/stbmv/strsv 大尺寸矩阵精度超标** — 0分
  - 痛点原因：仅以转交新issue跟踪为由关闭，无方案文档化与根因说明，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：已通过https://gitcode.com/cann/ops-blas/issues/213跟踪和修复。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#191](https://gitcode.com/cann/ops-blas/issues/191) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSrotmg接口** — 0分
  - 痛点原因：因随MR合并被机器人自动关闭，无方案文档沉淀且关闭说明为空，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue191    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @LuckySun    - [关联PR #192（merged）](https://gitcode.com/cann/ops-blas/merge_requests/192)
- **[#190](https://gitcode.com/cann/ops-blas/issues/190) [Requirement|需求建议]: 为 arch35（Ascend 950）新增 aclblasSnrm2 接口** — 0分
  - 痛点原因：关闭说明仅为机器人模板话术，无方案文档沉淀及重复问题指引，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue190    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79    - [关联PR #181（merged）](https://gitcode.com/cann/ops-blas/merge_requests/181)
- **[#188](https://gitcode.com/cann/ops-blas/issues/188) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasGemmGroupedBatchedEx接口** — 0分
  - 痛点原因：关闭时无任何文字说明，缺乏方案文档与重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - [关联PR #189（merged）](https://gitcode.com/cann/ops-blas/merge_requests/189)
- **[#187](https://gitcode.com/cann/ops-blas/issues/187) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSgemmGroupedBatched接口** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人因PR合并自动关闭，无法供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue187    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - [关联PR #155（merged）](https://gitcode.com/cann/ops-blas/merge_requests/155)
- **[#222](https://gitcode.com/cann/ops-blas/issues/222) [Documentation|文档反馈]: README.md 技术专栏 Wiki 链接无效** — 30分
  - 痛点原因：关闭说明仅19字且未补充修复后的有效链接，无具体解决方案，难以供他人复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：assigned to @zhanghua145
- **[#219](https://gitcode.com/cann/ops-blas/issues/219) [Documentation|文档反馈]: api_list.md 缺少 helper 和 level1-3 接口的整体介绍** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因关联PR合并自动关闭，未沉淀任何供后续复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved    - [关联PR #217（merged）](https://gitcode.com/cann/ops-blas/merge_requests/217)
- **[#218](https://gitcode.com/cann/ops-blas/issues/218) [Documentation|文档反馈]: README.md Latest News 六月份动态未更新** — 30分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，缺乏问题解决总结与复用指引，无法为其他用户提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved    - [关联PR #212（merged）](https://gitcode.com/cann/ops-blas/merge_requests/212)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#217](https://gitcode.com/cann/ops-blas/issues/217) [Documentation|文档反馈]: 修复 README 编译运行样例链接失效及错误码 EZ9999** — 30分
  - 痛点原因：关闭时无任何文字说明，仅由机器人自动关联PR关闭，未沉淀解决方案供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue217    - `cann-robot`：add label resolved    - [关联PR #213（merged）](https://gitcode.com/cann/ops-blas/merge_requests/213)
- **[#215](https://gitcode.com/cann/ops-blas/issues/215) docs: 补充通用的编译与运行样例文档** — 30分
  - 痛点原因：机器人自动关闭且关闭说明为0字，未提供文档复用链接，缺乏供其他用户参考的解决方案信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue215    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - [关联PR #209（merged）](https://gitcode.com/cann/ops-blas/merge_requests/209)
- **[#214](https://gitcode.com/cann/ops-blas/issues/214) [Requirement|需求建议]: 固化 PR #194 README 统一模板到 Agent 工作流** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关联PR关闭，缺乏人工总结沉淀，导致后续无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - `cann-robot`：add label resolved    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 30分
  - 痛点原因：关闭说明仅13字，未提供关联MR或文档更新链接，也无重复issue主链接，导致后续用户无法复用解决信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212    - `zhanghua145`：add label documentation    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `zhanghua145`：assigned to @wangzitao_leo
- **[#211](https://gitcode.com/cann/ops-blas/issues/211) [Requirement|需求建议]: 修复工作流阶段3代码检视与性能验收的并行调度缺陷** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关闭关联PR，缺乏人工沉淀的解决方案与经验总结，难以供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue211    - `cann-robot`：add label resolved    - [关联PR #205（merged）](https://gitcode.com/cann/ops-blas/merge_requests/205)
- **[#200](https://gitcode.com/cann/ops-blas/issues/200) [Requirement|需求建议]: aclblasSgetrsBatched 批量线性方程组求解接口** — 30分
  - 痛点原因：关闭说明为0字且无重复链接，仅由机器人自动关闭，未沉淀供其他用户参考的明确信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue200    - `justsheldon`：add label requirement    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - [关联PR #193（merged）](https://gitcode.com/cann/ops-blas/merge_requests/193)
- **[#199](https://gitcode.com/cann/ops-blas/issues/199) [需求建议]: 更新 CONTRIBUTING.md 贡献流程与目录结构说明** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人随PR合并自动关闭并打标签，缺乏人工总结沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue199    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - [关联PR #196（merged）](https://gitcode.com/cann/ops-blas/merge_requests/196)
- **[#197](https://gitcode.com/cann/ops-blas/issues/197) [Requirement|需求建议]: 新增 aclblasIsamax/aclblasIsamin 算子 arch35 实现** — 30分
  - 痛点原因：关闭时未留下任何文字说明，仅关联 PR 并自动关闭，导致后续用户无法直接获取复用信息。
  - 原文依据：
    - `xutianze`：closed from codehub    - `xutianze`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - [关联PR #195（merged）](https://gitcode.com/cann/ops-blas/merge_requests/195)
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 30分
  - 痛点原因：关闭说明仅19字且由机器人自动关闭，虽有方案文档化，但未提供最终方案链接及复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - `cann-robot`：add label resolved    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `zhanghua145`：assigned to @zhanghua145    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 30分
  - 痛点原因：关闭说明仅18字且由系统自动关闭，缺乏最终方案总结与复用指引，未关联重复issue。
  - 原文依据：
    - `zhanghua145`：closed from codehub    - `cann-robot`：add label resolved    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `zhanghua145`：assigned to @zhanghua145    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#189](https://gitcode.com/cann/ops-blas/issues/189) [Bug-Report|缺陷反馈]: BLAS 单精度算子（arch35）CPU 标杆数据手动实现与标准 BLAS 参考存在差异，精度验证基准不可靠** — 30分
  - 痛点原因：关闭说明为空，仅靠机器人关联PR自动关闭，未沉淀问题原因与解决方案，难以供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue189    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - [关联PR #191（merged）](https://gitcode.com/cann/ops-blas/merge_requests/191)
- **[#186](https://gitcode.com/cann/ops-blas/issues/186) [Bug-Report|缺陷反馈]: BLAS 测试 golden 参考实现改用 OpenBLAS 标准接口并修复 host/kernel 缺陷** — 30分
  - 痛点原因：关闭说明仅17字且由机器人因MR合并自动关闭，缺乏人工对修复方案与经验的总结，无法提供有效参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue186    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：assigned to @justsheldon    - [关联PR #188（merged）](https://gitcode.com/cann/ops-blas/merge_requests/188)
#### PP-02 讨论严重不足零评论多（I2 · 讨论与解决）

- **[#227](https://gitcode.com/cann/ops-blas/issues/227) [Requirement]: 新增 aclblasStbsv 算子（三角带状方程组求解，arch35）** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无人工关闭说明、文档更新链接及版本发布引用。
  - 原文依据：
    - [关联PR #218（merged）](https://gitcode.com/cann/ops-blas/merge_requests/218)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue227    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#225](https://gitcode.com/cann/ops-blas/issues/225) 新增 aclblasSrotg 算子（面向 arch35，支持 Host/Device 双指针路径）** — 0分
  - 痛点原因：仅靠机器人自动关闭和加标签，缺乏commit引用、文档链接及人工确认评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #200（merged）](https://gitcode.com/cann/ops-blas/merge_requests/200)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue225    - `cann-robot`：add label resolved
- **[#224](https://gitcode.com/cann/ops-blas/issues/224) [Requirement|需求建议]: 新增面向arch35的aclblasSmatinvBatched批量矩阵求逆接口** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit引用、文档链接、release说明及人工关闭评论等实质性证据。
  - 原文依据：
    - [关联PR #201（merged）](https://gitcode.com/cann/ops-blas/merge_requests/201)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#220](https://gitcode.com/cann/ops-blas/issues/220) [Requirement|需求建议]: 新增 aclblasSspr2 算子 arch35 实现** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit、文档及release等强证据，且无人工关闭说明。
  - 原文依据：
    - [关联PR #202（merged）](https://gitcode.com/cann/ops-blas/merge_requests/202)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue220    - `yuyuanfeng`：add label requirement    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅由机器人关联PR关闭，缺乏commit引用、文档链接及人工确认说明等强证据支撑。
  - 原文依据：
    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：仅通过状态变更和添加标签关闭，未关联任何 PR、commit 或文档链接，无实质解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：仅通过系统操作关闭并修改状态，无关联PR、commit引用或文档链接等任何实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：仅通过状态变更和加标签关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：仅通过状态变更和外部工具关闭，无关联 PR、commit 或文档等任何实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#201](https://gitcode.com/cann/ops-blas/issues/201) [Requirement|需求建议]: 修正4个算子的结构问题，按照sig例会要求改为异步架构** — 0分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #199（merged）](https://gitcode.com/cann/ops-blas/merge_requests/199)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue201    - `zhaotiensn`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhaotiensn
- **[#221](https://gitcode.com/cann/ops-blas/issues/221) [Requirement|需求建议]: 消除 cmake/patches/ops-tensor 下的 ops-tensor 兼容性补丁** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏人工关闭评论、commit引用及文档链接，证据链不完整。
  - 原文依据：
    - [关联PR #215（merged）](https://gitcode.com/cann/ops-blas/merge_requests/215)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue221    - `cann-robot`：add label resolved
- **[#219](https://gitcode.com/cann/ops-blas/issues/219) [Documentation|文档反馈]: api_list.md 缺少 helper 和 level1-3 接口的整体介绍** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏人工关闭评论、commit引用及release引用等直接解决证据。
  - 原文依据：
    - [关联PR #217（merged）](https://gitcode.com/cann/ops-blas/merge_requests/217)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved
- **[#218](https://gitcode.com/cann/ops-blas/issues/218) [Documentation|文档反馈]: README.md Latest News 六月份动态未更新** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #212（merged）](https://gitcode.com/cann/ops-blas/merge_requests/212)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved
- **[#217](https://gitcode.com/cann/ops-blas/issues/217) [Documentation|文档反馈]: 修复 README 编译运行样例链接失效及错误码 EZ9999** — 15分
  - 痛点原因：仅靠机器人关联 PR 并关闭，缺乏 commit 引用、release 说明及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #213（merged）](https://gitcode.com/cann/ops-blas/merge_requests/213)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue217    - `cann-robot`：add label resolved
- **[#215](https://gitcode.com/cann/ops-blas/issues/215) docs: 补充通用的编译与运行样例文档** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #209（merged）](https://gitcode.com/cann/ops-blas/merge_requests/209)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue215    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#214](https://gitcode.com/cann/ops-blas/issues/214) [Requirement|需求建议]: 固化 PR #194 README 统一模板到 Agent 工作流** — 15分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，仅靠机器人自动关闭并打标签，缺乏人工确认解决的证据。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - `cann-robot`：add label resolved
- **[#211](https://gitcode.com/cann/ops-blas/issues/211) [Requirement|需求建议]: 修复工作流阶段3代码检视与性能验收的并行调度缺陷** — 15分
  - 痛点原因：仅靠机器人自动关联PR并关闭，无人工确认评论、commit引用及release引用等直接解决证据。
  - 原文依据：
    - [关联PR #205（merged）](https://gitcode.com/cann/ops-blas/merge_requests/205)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue211    - `cann-robot`：add label resolved
- **[#200](https://gitcode.com/cann/ops-blas/issues/200) [Requirement|需求建议]: aclblasSgetrsBatched 批量线性方程组求解接口** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #193（merged）](https://gitcode.com/cann/ops-blas/merge_requests/193)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue200    - `justsheldon`：add label requirement    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#199](https://gitcode.com/cann/ops-blas/issues/199) [需求建议]: 更新 CONTRIBUTING.md 贡献流程与目录结构说明** — 15分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、commit引用及release引用等强证据。
  - 原文依据：
    - [关联PR #196（merged）](https://gitcode.com/cann/ops-blas/merge_requests/196)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue199    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#198](https://gitcode.com/cann/ops-blas/issues/198) [Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现** — 15分
  - 痛点原因：仅添加需求标签并指派负责人，无关联PR、commit及文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `2302_77046878`：add label requirement    - `2302_77046878`：assigned to @2302_77046878
- **[#189](https://gitcode.com/cann/ops-blas/issues/189) [Bug-Report|缺陷反馈]: BLAS 单精度算子（arch35）CPU 标杆数据手动实现与标准 BLAS 参考存在差异，精度验证基准不可靠** — 15分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等具体修复说明，导致得分极低。
  - 原文依据：
    - [关联PR #191（merged）](https://gitcode.com/cann/ops-blas/merge_requests/191)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue189    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#188](https://gitcode.com/cann/ops-blas/issues/188) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasGemmGroupedBatchedEx接口** — 15分
  - 痛点原因：仅靠关联PR和机器人标记完成，缺乏人工关闭评论、文档链接及commit引用等关键验证信息。
  - 原文依据：
    - [关联PR #189（merged）](https://gitcode.com/cann/ops-blas/merge_requests/189)    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy
- **[#187](https://gitcode.com/cann/ops-blas/issues/187) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSgemmGroupedBatched接口** — 15分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论。
  - 原文依据：
    - [关联PR #155（merged）](https://gitcode.com/cann/ops-blas/merge_requests/155)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue187    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 23分
  - 痛点原因：人工仅回复确认中，后续靠机器人因PR合并自动关闭，缺乏文档或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk
- **[#192](https://gitcode.com/cann/ops-blas/issues/192) [精度] ascend950 上 gemv_batched/stbmv/strsv 大尺寸矩阵精度超标** — 23分
  - 痛点原因：本仓库内未关联PR或commit等直接修复证据，仅凭外部链接和状态变更关闭，导致证据严重不足。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：已通过https://gitcode.com/cann/ops-blas/issues/213跟踪和修复。    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#213](https://gitcode.com/cann/ops-blas/issues/213) [Daily-QA|每日监测] ascend950 大面积测试失败: 8 个算子 (CANN 9.1.0, 2026-06-24)** — 31分
  - 痛点原因：虽有合并的PR与commit，但关闭由机器人自动触发，缺乏人工确认的解决说明或测试验证证据，关闭评论为空。
  - 原文依据：
    - [关联PR #210（merged）](https://gitcode.com/cann/ops-blas/merge_requests/210)    - [关联PR #214（merged）](https://gitcode.com/cann/ops-blas/merge_requests/214)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue213    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#202](https://gitcode.com/cann/ops-blas/issues/202) Feat: 新增面向arch35的aclblasSrotg接口** — 31分
  - 痛点原因：关联PR处于open状态未合并，且无文档链接、release引用及关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `wangzitao_leo`：assigned to @chensi79
- **[#191](https://gitcode.com/cann/ops-blas/issues/191) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSrotmg接口** — 31分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺少人工关闭评论、文档链接与 release 引用来佐证解决结论。
  - 原文依据：
    - [关联PR #192（merged）](https://gitcode.com/cann/ops-blas/merge_requests/192)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue191    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @LuckySun
- **[#222](https://gitcode.com/cann/ops-blas/issues/222) [Documentation|文档反馈]: README.md 技术专栏 Wiki 链接无效** — 38分
  - 痛点原因：无关联PR与commit引用，仅凭状态变更为已完成即关闭，缺乏实质性代码修复证据。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中。    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `zhanghua145`：assigned to @zhanghua145
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 38分
  - 痛点原因：虽有关联PR合并，但无commit和release引用，且关闭评论显示问题仍在确认并提出新要求，证据链不完整。
  - 原文依据：
    - [关联PR #225（merged）](https://gitcode.com/cann/ops-blas/merge_requests/225)    - [关联PR #230（merged）](https://gitcode.com/cann/ops-blas/merge_requests/230)    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212    - `zhanghua145`：add label documentation
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用与文档链接，且仅凭简单评论关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #183（merged）](https://gitcode.com/cann/ops-blas/merge_requests/183)    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 38分
  - 痛点原因：缺乏直接commit引用与release版本说明，仅靠机器人自动关闭及关联PR，解决过程的实质性证据链不完整。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅为系统提示，缺乏具体解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `zhanghua145`：closed from codehub    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 38分
  - 痛点原因：虽有关联PR，但无commit引用和文档链接，且关闭评论仅为机器人自动回复，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - `cann-robot`：add label resolved
- **[#226](https://gitcode.com/cann/ops-blas/issues/226) Feat: 新增面向Ascend950(arch35)的aclblasRotEx接口** — 46分
  - 痛点原因：缺少关联PR、文档链接及关闭评论，仅凭状态变更和commit引用导致解决证据不够充分。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#197](https://gitcode.com/cann/ops-blas/issues/197) [Requirement|需求建议]: 新增 aclblasIsamax/aclblasIsamin 算子 arch35 实现** — 46分
  - 痛点原因：缺少关闭评论和release引用，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #195（merged）](https://gitcode.com/cann/ops-blas/merge_requests/195)    - `xutianze`：closed from codehub    - `xutianze`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 54分
  - 痛点原因：虽有关联PR与commit，但缺乏文档链接与release引用，且关闭评论仅为机器人自动触发，缺乏人工修复验证。
  - 原文依据：
    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)    - `justsheldon`：修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 54分
  - 痛点原因：维护者未能复现问题，最终由用户自行定位根因，缺乏官方明确的修复验证证据。
  - 原文依据：
    - [关联PR #220（merged）](https://gitcode.com/cann/ops-blas/merge_requests/220)    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…    - `wangzitao_leo`：stream 是你用 aclrtCreateStream 创建的，通过 aclblasSetStream 绑定到 handle 上。库只借用这个 stream，不拥有它。 实现里 aclblasDestroy 只会： 1. 同步 stre…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue203
- **[#190](https://gitcode.com/cann/ops-blas/issues/190) [Requirement|需求建议]: 为 arch35（Ascend 950）新增 aclblasSnrm2 接口** — 54分
  - 痛点原因：虽有关联PR与关闭评论，但缺少文档链接和release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #181（merged）](https://gitcode.com/cann/ops-blas/merge_requests/181)    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue190    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79
#### PP-03 Bot误关闭率高达27.5%（G · Bot/Agent 治理）

- **[#227](https://gitcode.com/cann/ops-blas/issues/227) [Requirement]: 新增 aclblasStbsv 算子（三角带状方程组求解，arch35）** — 20分
  - 痛点原因：Bot仅机械打标与关闭，全程无评论互动，缺乏过程治理与状态同步说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue227    - [关联PR #218（merged）](https://gitcode.com/cann/ops-blas/merge_requests/218)
- **[#225](https://gitcode.com/cann/ops-blas/issues/225) 新增 aclblasSrotg 算子（面向 arch35，支持 Host/Device 双指针路径）** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无任何评论向用户解释状态变更及关联PR情况，缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue225    - [关联PR #200（merged）](https://gitcode.com/cann/ops-blas/merge_requests/200)
- **[#224](https://gitcode.com/cann/ops-blas/issues/224) [Requirement|需求建议]: 新增面向arch35的aclblasSmatinvBatched批量矩阵求逆接口** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论互动与状态同步说明，治理过程生硬且缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - [关联PR #201（merged）](https://gitcode.com/cann/ops-blas/merge_requests/201)
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 20分
  - 痛点原因：Bot在人工仅确认中时便机械打标resolved并关闭，且无任何自动化评论与互动反馈。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#221](https://gitcode.com/cann/ops-blas/issues/221) [Requirement|需求建议]: 消除 cmake/patches/ops-tensor 下的 ops-tensor 兼容性补丁** — 20分
  - 痛点原因：Bot仅机械打标并随关联PR合并自动关闭，全程无评论与用户沟通，缺乏有效交互。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue221    - [关联PR #215（merged）](https://gitcode.com/cann/ops-blas/merge_requests/215)
- **[#220](https://gitcode.com/cann/ops-blas/issues/220) [Requirement|需求建议]: 新增 aclblasSspr2 算子 arch35 实现** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，未产生任何评论互动，缺乏有效沟通与状态说明。
  - 原文依据：
    - `yuyuanfeng`：add label requirement    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue220    - [关联PR #202（merged）](https://gitcode.com/cann/ops-blas/merge_requests/202)
- **[#219](https://gitcode.com/cann/ops-blas/issues/219) [Documentation|文档反馈]: api_list.md 缺少 helper 和 level1-3 接口的整体介绍** — 20分
  - 痛点原因：Bot仅自动打标并在PR合并后关闭，全程零评论，未向用户说明关闭原因，治理过程不透明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - [关联PR #217（merged）](https://gitcode.com/cann/ops-blas/merge_requests/217)
- **[#218](https://gitcode.com/cann/ops-blas/issues/218) [Documentation|文档反馈]: README.md Latest News 六月份动态未更新** — 20分
  - 痛点原因：Bot关闭时无评论说明，且在关联PR未完全合并时即误关，治理行为机械且缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - [关联PR #212（merged）](https://gitcode.com/cann/ops-blas/merge_requests/212)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#217](https://gitcode.com/cann/ops-blas/issues/217) [Documentation|文档反馈]: 修复 README 编译运行样例链接失效及错误码 EZ9999** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，未发布任何评论说明关闭原因及关联PR情况，治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue217    - [关联PR #213（merged）](https://gitcode.com/cann/ops-blas/merge_requests/213)
- **[#215](https://gitcode.com/cann/ops-blas/issues/215) docs: 补充通用的编译与运行样例文档** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，全程无评论说明状态变更原因，缺乏有效交互与透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue215    - [关联PR #209（merged）](https://gitcode.com/cann/ops-blas/merge_requests/209)
- **[#214](https://gitcode.com/cann/ops-blas/issues/214) [Requirement|需求建议]: 固化 PR #194 README 统一模板到 Agent 工作流** — 20分
  - 痛点原因：Bot自动关闭时引用的关联PR号与实际不符，且全程无评论交互，治理动作存在误判。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#213](https://gitcode.com/cann/ops-blas/issues/213) [Daily-QA|每日监测] ascend950 大面积测试失败: 8 个算子 (CANN 9.1.0, 2026-06-24)** — 20分
  - 痛点原因：严重测试失败问题仅因关联MR合并就被Bot自动打标resolved并关闭，且无任何评论说明，治理机械无效。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue213    - [关联PR #210（merged）](https://gitcode.com/cann/ops-blas/merge_requests/210)    - [关联PR #214（merged）](https://gitcode.com/cann/ops-blas/merge_requests/214)
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 20分
  - 痛点原因：Bot无任何有效评论互动，仅机械打标关闭，且在问题未实际解决时误标resolved。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `zhanghua145`：add label documentation    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212
- **[#211](https://gitcode.com/cann/ops-blas/issues/211) [Requirement|需求建议]: 修复工作流阶段3代码检视与性能验收的并行调度缺陷** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并自动关闭，评论数为零，缺乏关闭原因说明与用户互动，导致治理效果差。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue211    - [关联PR #205（merged）](https://gitcode.com/cann/ops-blas/merge_requests/205)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 20分
  - 痛点原因：Bot虽自动打标关闭，但在人工仅回复“修复中”时无任何评论互动且错误标记为resolved，治理流于形式。
  - 原文依据：
    - `justsheldon`：修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无评论互动，未向用户同步关闭原因及关联PR进度，缺乏透明度。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 20分
  - 痛点原因：Bot仅机械打标并关闭，无任何评论说明或引导，实际仍需人工深入排查，治理流于表面。
  - 原文依据：
    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…    - `wangzitao_leo`：stream 是你用 aclrtCreateStream 创建的，通过 aclblasSetStream 绑定到 handle 上。库只借用这个 stream，不拥有它。 实现里 aclblasDestroy 只会： 1. 同步 stre…    - `2302_77046878`：add label bug-report    - `cann-robot`：add label resolved
- **[#201](https://gitcode.com/cann/ops-blas/issues/201) [Requirement|需求建议]: 修正4个算子的结构问题，按照sig例会要求改为异步架构** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论说明，缺乏与用户的有效沟通，治理流于形式。
  - 原文依据：
    - `zhaotiensn`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhaotiensn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue201    - [关联PR #199（merged）](https://gitcode.com/cann/ops-blas/merge_requests/199)
- **[#200](https://gitcode.com/cann/ops-blas/issues/200) [Requirement|需求建议]: aclblasSgetrsBatched 批量线性方程组求解接口** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭，未产生任何评论与用户互动，缺乏有效沟通。
  - 原文依据：
    - `justsheldon`：add label requirement    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue200    - [关联PR #193（merged）](https://gitcode.com/cann/ops-blas/merge_requests/193)
- **[#199](https://gitcode.com/cann/ops-blas/issues/199) [需求建议]: 更新 CONTRIBUTING.md 贡献流程与目录结构说明** — 20分
  - 痛点原因：Bot仅机械执行打标与随PR合并自动关闭，全程零评论互动，缺乏状态变更说明与用户沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue199    - [关联PR #196（merged）](https://gitcode.com/cann/ops-blas/merge_requests/196)
- **[#197](https://gitcode.com/cann/ops-blas/issues/197) [Requirement|需求建议]: 新增 aclblasIsamax/aclblasIsamin 算子 arch35 实现** — 20分
  - 痛点原因：Bot仅完成打标，未自动关闭issue及评论关联PR，核心流程依赖人工操作导致得分低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `xutianze`：closed from codehub    - `xutianze`：changed custom state from 进行中 to 已完成    - [关联PR #195（merged）](https://gitcode.com/cann/ops-blas/merge_requests/195)
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 20分
  - 痛点原因：Bot仅执行打标动作，未关闭该issue且无任何评论互动，未能形成有效治理闭环。
  - 原文依据：
    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @yang-di52    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 20分
  - 痛点原因：Bot误打resolved标签并关闭，但人工仍在跟进处理，且Bot无评论互动，治理行为与实际状态脱节。
  - 原文依据：
    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 20分
  - 痛点原因：Bot仅执行打标，无有效评论且未参与关闭，治理动作单一未闭环。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `zhanghua145`：closed from codehub    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，未发表任何评论进行状态同步或解决说明，缺乏有效互动。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
- **[#191](https://gitcode.com/cann/ops-blas/issues/191) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSrotmg接口** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，缺乏自动分配及状态更新等有效评论互动，治理动作单一且深度不足。
  - 原文依据：
    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @LuckySun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue191    - [关联PR #192（merged）](https://gitcode.com/cann/ops-blas/merge_requests/192)
- **[#190](https://gitcode.com/cann/ops-blas/issues/190) [Requirement|需求建议]: 为 arch35（Ascend 950）新增 aclblasSnrm2 接口** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，无任何评论互动，且直接打上resolved标签，未发挥有效治理作用。
  - 原文依据：
    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue190    - [关联PR #181（merged）](https://gitcode.com/cann/ops-blas/merge_requests/181)
- **[#189](https://gitcode.com/cann/ops-blas/issues/189) [Bug-Report|缺陷反馈]: BLAS 单精度算子（arch35）CPU 标杆数据手动实现与标准 BLAS 参考存在差异，精度验证基准不可靠** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无任何评论说明原因或引导用户，治理过程不透明且缺乏互动。
  - 原文依据：
    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue189    - [关联PR #191（merged）](https://gitcode.com/cann/ops-blas/merge_requests/191)
- **[#188](https://gitcode.com/cann/ops-blas/issues/188) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasGemmGroupedBatchedEx接口** — 20分
  - 痛点原因：Bot仅执行打标，未自动关闭且无任何评论，核心治理动作仍依赖人工完成。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - [关联PR #189（merged）](https://gitcode.com/cann/ops-blas/merge_requests/189)
- **[#187](https://gitcode.com/cann/ops-blas/issues/187) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSgemmGroupedBatched接口** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何自动评论与用户互动，缺乏状态同步反馈，治理效果差。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue187    - [关联PR #155（merged）](https://gitcode.com/cann/ops-blas/merge_requests/155)
- **[#186](https://gitcode.com/cann/ops-blas/issues/186) [Bug-Report|缺陷反馈]: BLAS 测试 golden 参考实现改用 OpenBLAS 标准接口并修复 host/kernel 缺陷** — 20分
  - 痛点原因：Bot仅执行打标与关闭，无任何评论互动，未提供诊断信息或指引，未能有效辅助问题解决。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue186    - [关联PR #188（merged）](https://gitcode.com/cann/ops-blas/merge_requests/188)
#### PP-04 长尾响应与无响应并存（I1 · 分配与首次响应）

- **[#227](https://gitcode.com/cann/ops-blas/issues/227) [Requirement]: 新增 aclblasStbsv 算子（三角带状方程组求解，arch35）** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人分配任务并在关联PR合并后自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue227    - [关联PR #218（merged）](https://gitcode.com/cann/ops-blas/merge_requests/218)
- **[#226](https://gitcode.com/cann/ops-blas/issues/226) Feat: 新增面向Ascend950(arch35)的aclblasRotEx接口** — 0分
  - 痛点原因：维护者仅将状态改为已完成并关闭 issue，全程未提供任何实质回应。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#225](https://gitcode.com/cann/ops-blas/issues/225) 新增 aclblasSrotg 算子（面向 arch35，支持 Host/Device 双指针路径）** — 0分
  - 痛点原因：仅机器人自动打标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue225    - [关联PR #200（merged）](https://gitcode.com/cann/ops-blas/merge_requests/200)
- **[#224](https://gitcode.com/cann/ops-blas/issues/224) [Requirement|需求建议]: 新增面向arch35的aclblasSmatinvBatched批量矩阵求逆接口** — 0分
  - 痛点原因：全程仅有机器人加标签、分配人员及关闭操作，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - [关联PR #201（merged）](https://gitcode.com/cann/ops-blas/merge_requests/201)
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 0分
  - 痛点原因：首次响应仅确认收到，后续直接分配并由机器人关闭，全程无任何实质技术回应。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)
- **[#222](https://gitcode.com/cann/ops-blas/issues/222) [Documentation|文档反馈]: README.md 技术专栏 Wiki 链接无效** — 0分
  - 痛点原因：首次响应耗时近17小时且仅为套话，后续仅指派并直接关闭，全程无任何实质性技术解答。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：assigned to @zhanghua145    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#221](https://gitcode.com/cann/ops-blas/issues/221) [Requirement|需求建议]: 消除 cmake/patches/ops-tensor 下的 ops-tensor 兼容性补丁** — 0分
  - 痛点原因：仅由机器人自动打标签并随关联PR合并关闭，全程无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue221    - [关联PR #215（merged）](https://gitcode.com/cann/ops-blas/merge_requests/215)
- **[#220](https://gitcode.com/cann/ops-blas/issues/220) [Requirement|需求建议]: 新增 aclblasSspr2 算子 arch35 实现** — 0分
  - 痛点原因：仅有打标签和分配操作，全程无人工实质性技术回应，最终由机器人自动关闭。
  - 原文依据：
    - `yuyuanfeng`：add label requirement    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue220    - [关联PR #202（merged）](https://gitcode.com/cann/ops-blas/merge_requests/202)
- **[#219](https://gitcode.com/cann/ops-blas/issues/219) [Documentation|文档反馈]: api_list.md 缺少 helper 和 level1-3 接口的整体介绍** — 0分
  - 痛点原因：响应耗时近89小时且全程无人工实质回应，仅靠机器人关联PR合并自动关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - [关联PR #217（merged）](https://gitcode.com/cann/ops-blas/merge_requests/217)
- **[#218](https://gitcode.com/cann/ops-blas/issues/218) [Documentation|文档反馈]: README.md Latest News 六月份动态未更新** — 0分
  - 痛点原因：仅机器人打标签并关闭issue，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - [关联PR #212（merged）](https://gitcode.com/cann/ops-blas/merge_requests/212)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#217](https://gitcode.com/cann/ops-blas/issues/217) [Documentation|文档反馈]: 修复 README 编译运行样例链接失效及错误码 EZ9999** — 0分
  - 痛点原因：仅机器人自动响应，随后随关联PR合并直接关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue217    - [关联PR #213（merged）](https://gitcode.com/cann/ops-blas/merge_requests/213)
- **[#215](https://gitcode.com/cann/ops-blas/issues/215) docs: 补充通用的编译与运行样例文档** — 0分
  - 痛点原因：仅打标签和分配人员，全程无针对文档需求的实质性技术回应，直接由关联PR合并关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue215    - [关联PR #209（merged）](https://gitcode.com/cann/ops-blas/merge_requests/209)
- **[#214](https://gitcode.com/cann/ops-blas/issues/214) [Requirement|需求建议]: 固化 PR #194 README 统一模板到 Agent 工作流** — 0分
  - 痛点原因：仅由机器人自动打标并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#213](https://gitcode.com/cann/ops-blas/issues/213) [Daily-QA|每日监测] ascend950 大面积测试失败: 8 个算子 (CANN 9.1.0, 2026-06-24)** — 0分
  - 痛点原因：全程仅打标签和分配，最终由机器人关闭，无任何人工实质回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue213    - [关联PR #210（merged）](https://gitcode.com/cann/ops-blas/merge_requests/210)    - [关联PR #214（merged）](https://gitcode.com/cann/ops-blas/merge_requests/214)
- **[#211](https://gitcode.com/cann/ops-blas/issues/211) [Requirement|需求建议]: 修复工作流阶段3代码检视与性能验收的并行调度缺陷** — 0分
  - 痛点原因：仅机器人自动打标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue211    - [关联PR #205（merged）](https://gitcode.com/cann/ops-blas/merge_requests/205)
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 0分
  - 痛点原因：仅打标签、指派负责人及回复“修复中”，且被机器人直接标记已解决，全程无实质性技术回应。
  - 原文依据：
    - `justsheldon`：修复中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅添加标签后由机器人因关联PR合并直接关闭，全程无人工实质回应。
  - 原文依据：
    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：全程仅有加标签和改状态等自动化操作，未提供任何人工实质回复。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：维护者仅进行了加标签和状态流转等机械操作，未对P0级编译失败问题提供任何实质性技术回应。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：维护者仅进行了打标签、关闭和状态流转操作，全程无任何实质性文字回复。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：维护者直接关闭 issue 并标记完成，全程未提供任何文本回复，导致无实质回应。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#202](https://gitcode.com/cann/ops-blas/issues/202) Feat: 新增面向arch35的aclblasSrotg接口** — 0分
  - 痛点原因：仅有指派操作且关联PR仍处open状态，始终未对需求进行实质性讨论或确认。
  - 原文依据：
    - `wangzitao_leo`：assigned to @chensi79    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)
- **[#201](https://gitcode.com/cann/ops-blas/issues/201) [Requirement|需求建议]: 修正4个算子的结构问题，按照sig例会要求改为异步架构** — 0分
  - 痛点原因：全程仅有打标签、分配负责人及机器人自动关闭等机械操作，始终无人工实质性技术回应。
  - 原文依据：
    - `zhaotiensn`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhaotiensn    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue201    - [关联PR #199（merged）](https://gitcode.com/cann/ops-blas/merge_requests/199)
- **[#200](https://gitcode.com/cann/ops-blas/issues/200) [Requirement|需求建议]: aclblasSgetrsBatched 批量线性方程组求解接口** — 0分
  - 痛点原因：仅被打标签和分配人员，随后因关联MR合并被机器人直接关闭，全程无人工实质回应。
  - 原文依据：
    - `justsheldon`：add label requirement    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue200    - [关联PR #193（merged）](https://gitcode.com/cann/ops-blas/merge_requests/193)
- **[#199](https://gitcode.com/cann/ops-blas/issues/199) [需求建议]: 更新 CONTRIBUTING.md 贡献流程与目录结构说明** — 0分
  - 痛点原因：全程仅机器人加标签与分配负责人，无人工实质回应，直接随PR合并关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue199    - [关联PR #196（merged）](https://gitcode.com/cann/ops-blas/merge_requests/196)
- **[#198](https://gitcode.com/cann/ops-blas/issues/198) [Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现** — 0分
  - 痛点原因：仅进行了打标签和指派操作，全程无任何实质性的文字回复或解答。
  - 原文依据：
    - `2302_77046878`：add label requirement    - `2302_77046878`：assigned to @2302_77046878
- **[#197](https://gitcode.com/cann/ops-blas/issues/197) [Requirement|需求建议]: 新增 aclblasIsamax/aclblasIsamin 算子 arch35 实现** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人加标签并关闭，直接关联PR解决，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `xutianze`：closed from codehub    - `xutianze`：changed custom state from 进行中 to 已完成    - [关联PR #195（merged）](https://gitcode.com/cann/ops-blas/merge_requests/195)
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 0分
  - 痛点原因：仅用模板话术回复后直接加标签并关闭，全程无任何实质性技术解答。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145    - `zhanghua145`：closed from codehub    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 0分
  - 痛点原因：首次回复仅为正在确认中的模板话术，全程无人工实质性技术解答，直接由机器人关联PR关闭。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)
- **[#191](https://gitcode.com/cann/ops-blas/issues/191) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSrotmg接口** — 0分
  - 痛点原因：全程仅打标签和分配负责人，最终随代码合并直接关闭，始终未提供任何实质性文字回应。
  - 原文依据：
    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @LuckySun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue191    - [关联PR #192（merged）](https://gitcode.com/cann/ops-blas/merge_requests/192)
- **[#190](https://gitcode.com/cann/ops-blas/issues/190) [Requirement|需求建议]: 为 arch35（Ascend 950）新增 aclblasSnrm2 接口** — 0分
  - 痛点原因：维护者仅执行了指派和打标签操作，全程未对需求进行任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue190    - [关联PR #181（merged）](https://gitcode.com/cann/ops-blas/merge_requests/181)
- **[#189](https://gitcode.com/cann/ops-blas/issues/189) [Bug-Report|缺陷反馈]: BLAS 单精度算子（arch35）CPU 标杆数据手动实现与标准 BLAS 参考存在差异，精度验证基准不可靠** — 0分
  - 痛点原因：全程仅有机器人加标签、分配负责人及关联PR关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue189    - [关联PR #191（merged）](https://gitcode.com/cann/ops-blas/merge_requests/191)
- **[#188](https://gitcode.com/cann/ops-blas/issues/188) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasGemmGroupedBatchedEx接口** — 0分
  - 痛点原因：仅执行了分配和状态流转，全程无任何针对需求的实质性文字回应，直接关闭导致得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - [关联PR #189（merged）](https://gitcode.com/cann/ops-blas/merge_requests/189)
- **[#187](https://gitcode.com/cann/ops-blas/issues/187) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSgemmGroupedBatched接口** — 0分
  - 痛点原因：虽然1小时内分配了负责人，但全程无人工实质回应，直接由机器人关联PR合并关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue187    - [关联PR #155（merged）](https://gitcode.com/cann/ops-blas/merge_requests/155)
- **[#186](https://gitcode.com/cann/ops-blas/issues/186) [Bug-Report|缺陷反馈]: BLAS 测试 golden 参考实现改用 OpenBLAS 标准接口并修复 host/kernel 缺陷** — 0分
  - 痛点原因：首次响应仅为客套话，后续仅打标签和指派，始终未提供任何实质性技术排查或解决反馈。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue186    - [关联PR #188（merged）](https://gitcode.com/cann/ops-blas/merge_requests/188)
#### PP-05 开放issue停滞无推进（I2 · 讨论与解决）

- **[#227](https://gitcode.com/cann/ops-blas/issues/227) [Requirement]: 新增 aclblasStbsv 算子（三角带状方程组求解，arch35）** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无人工关闭说明、文档更新链接及版本发布引用。
  - 原文依据：
    - [关联PR #218（merged）](https://gitcode.com/cann/ops-blas/merge_requests/218)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue227    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#225](https://gitcode.com/cann/ops-blas/issues/225) 新增 aclblasSrotg 算子（面向 arch35，支持 Host/Device 双指针路径）** — 0分
  - 痛点原因：仅靠机器人自动关闭和加标签，缺乏commit引用、文档链接及人工确认评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #200（merged）](https://gitcode.com/cann/ops-blas/merge_requests/200)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue225    - `cann-robot`：add label resolved
- **[#224](https://gitcode.com/cann/ops-blas/issues/224) [Requirement|需求建议]: 新增面向arch35的aclblasSmatinvBatched批量矩阵求逆接口** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit引用、文档链接、release说明及人工关闭评论等实质性证据。
  - 原文依据：
    - [关联PR #201（merged）](https://gitcode.com/cann/ops-blas/merge_requests/201)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue224    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#220](https://gitcode.com/cann/ops-blas/issues/220) [Requirement|需求建议]: 新增 aclblasSspr2 算子 arch35 实现** — 0分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit、文档及release等强证据，且无人工关闭说明。
  - 原文依据：
    - [关联PR #202（merged）](https://gitcode.com/cann/ops-blas/merge_requests/202)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue220    - `yuyuanfeng`：add label requirement    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#209](https://gitcode.com/cann/ops-blas/issues/209) [Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败** — 0分
  - 痛点原因：仅由机器人关联PR关闭，缺乏commit引用、文档链接及人工确认说明等强证据支撑。
  - 原文依据：
    - [关联PR #204（merged）](https://gitcode.com/cann/ops-blas/merge_requests/204)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue209    - `yang-di52`：add label bug-report    - `cann-robot`：add label resolved
- **[#208](https://gitcode.com/cann/ops-blas/issues/208) [Daily-QA|test] label fix verify** — 0分
  - 痛点原因：仅通过状态变更和添加标签关闭，未关联任何 PR、commit 或文档链接，无实质解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#207](https://gitcode.com/cann/ops-blas/issues/207) [Daily-QA|P0-编译失败] test label fix** — 0分
  - 痛点原因：仅通过系统操作关闭并修改状态，无关联PR、commit引用或文档链接等任何实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#206](https://gitcode.com/cann/ops-blas/issues/206) [test] label bug-report** — 0分
  - 痛点原因：仅通过状态变更和加标签关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report
- **[#205](https://gitcode.com/cann/ops-blas/issues/205) [test] perm** — 0分
  - 痛点原因：仅通过状态变更和外部工具关闭，无关联 PR、commit 或文档等任何实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#201](https://gitcode.com/cann/ops-blas/issues/201) [Requirement|需求建议]: 修正4个算子的结构问题，按照sig例会要求改为异步架构** — 0分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、commit引用、文档及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #199（merged）](https://gitcode.com/cann/ops-blas/merge_requests/199)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue201    - `zhaotiensn`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhaotiensn
- **[#221](https://gitcode.com/cann/ops-blas/issues/221) [Requirement|需求建议]: 消除 cmake/patches/ops-tensor 下的 ops-tensor 兼容性补丁** — 15分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏人工关闭评论、commit引用及文档链接，证据链不完整。
  - 原文依据：
    - [关联PR #215（merged）](https://gitcode.com/cann/ops-blas/merge_requests/215)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue221    - `cann-robot`：add label resolved
- **[#219](https://gitcode.com/cann/ops-blas/issues/219) [Documentation|文档反馈]: api_list.md 缺少 helper 和 level1-3 接口的整体介绍** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏人工关闭评论、commit引用及release引用等直接解决证据。
  - 原文依据：
    - [关联PR #217（merged）](https://gitcode.com/cann/ops-blas/merge_requests/217)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue219    - `cann-robot`：add label resolved
- **[#218](https://gitcode.com/cann/ops-blas/issues/218) [Documentation|文档反馈]: README.md Latest News 六月份动态未更新** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #212（merged）](https://gitcode.com/cann/ops-blas/merge_requests/212)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue218    - `cann-robot`：add label resolved
- **[#217](https://gitcode.com/cann/ops-blas/issues/217) [Documentation|文档反馈]: 修复 README 编译运行样例链接失效及错误码 EZ9999** — 15分
  - 痛点原因：仅靠机器人关联 PR 并关闭，缺乏 commit 引用、release 说明及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #213（merged）](https://gitcode.com/cann/ops-blas/merge_requests/213)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue217    - `cann-robot`：add label resolved
- **[#215](https://gitcode.com/cann/ops-blas/issues/215) docs: 补充通用的编译与运行样例文档** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #209（merged）](https://gitcode.com/cann/ops-blas/merge_requests/209)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue215    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#214](https://gitcode.com/cann/ops-blas/issues/214) [Requirement|需求建议]: 固化 PR #194 README 统一模板到 Agent 工作流** — 15分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，仅靠机器人自动关闭并打标签，缺乏人工确认解决的证据。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue214    - `cann-robot`：add label resolved
- **[#211](https://gitcode.com/cann/ops-blas/issues/211) [Requirement|需求建议]: 修复工作流阶段3代码检视与性能验收的并行调度缺陷** — 15分
  - 痛点原因：仅靠机器人自动关联PR并关闭，无人工确认评论、commit引用及release引用等直接解决证据。
  - 原文依据：
    - [关联PR #205（merged）](https://gitcode.com/cann/ops-blas/merge_requests/205)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue211    - `cann-robot`：add label resolved
- **[#200](https://gitcode.com/cann/ops-blas/issues/200) [Requirement|需求建议]: aclblasSgetrsBatched 批量线性方程组求解接口** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #193（merged）](https://gitcode.com/cann/ops-blas/merge_requests/193)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue200    - `justsheldon`：add label requirement    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#199](https://gitcode.com/cann/ops-blas/issues/199) [需求建议]: 更新 CONTRIBUTING.md 贡献流程与目录结构说明** — 15分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、commit引用及release引用等强证据。
  - 原文依据：
    - [关联PR #196（merged）](https://gitcode.com/cann/ops-blas/merge_requests/196)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue199    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @zhanghua145
- **[#198](https://gitcode.com/cann/ops-blas/issues/198) [Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现** — 15分
  - 痛点原因：仅添加需求标签并指派负责人，无关联PR、commit及文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `2302_77046878`：add label requirement    - `2302_77046878`：assigned to @2302_77046878
- **[#189](https://gitcode.com/cann/ops-blas/issues/189) [Bug-Report|缺陷反馈]: BLAS 单精度算子（arch35）CPU 标杆数据手动实现与标准 BLAS 参考存在差异，精度验证基准不可靠** — 15分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、release引用及人工关闭评论等具体修复说明，导致得分极低。
  - 原文依据：
    - [关联PR #191（merged）](https://gitcode.com/cann/ops-blas/merge_requests/191)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue189    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#188](https://gitcode.com/cann/ops-blas/issues/188) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasGemmGroupedBatchedEx接口** — 15分
  - 痛点原因：仅靠关联PR和机器人标记完成，缺乏人工关闭评论、文档链接及commit引用等关键验证信息。
  - 原文依据：
    - [关联PR #189（merged）](https://gitcode.com/cann/ops-blas/merge_requests/189)    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy
- **[#187](https://gitcode.com/cann/ops-blas/issues/187) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSgemmGroupedBatched接口** — 15分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论。
  - 原文依据：
    - [关联PR #155（merged）](https://gitcode.com/cann/ops-blas/merge_requests/155)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue187    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @Crrryyyy
- **[#223](https://gitcode.com/cann/ops-blas/issues/223) [Requirement|需求建议]: 新增 STRMM (FP32) 算子 DAV_3510 架构实现** — 23分
  - 痛点原因：人工仅回复确认中，后续靠机器人因PR合并自动关闭，缺乏文档或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #197（merged）](https://gitcode.com/cann/ops-blas/merge_requests/197)    - `wangzitao_leo`：感谢反馈，确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue223    - `cann-robot`：add label resolved    - `eternityk`：assigned to @eternityk
- **[#192](https://gitcode.com/cann/ops-blas/issues/192) [精度] ascend950 上 gemv_batched/stbmv/strsv 大尺寸矩阵精度超标** — 23分
  - 痛点原因：本仓库内未关联PR或commit等直接修复证据，仅凭外部链接和状态变更关闭，导致证据严重不足。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，正在确认和修改中。    - `wangzitao_leo`：已通过https://gitcode.com/cann/ops-blas/issues/213跟踪和修复。    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#213](https://gitcode.com/cann/ops-blas/issues/213) [Daily-QA|每日监测] ascend950 大面积测试失败: 8 个算子 (CANN 9.1.0, 2026-06-24)** — 31分
  - 痛点原因：虽有合并的PR与commit，但关闭由机器人自动触发，缺乏人工确认的解决说明或测试验证证据，关闭评论为空。
  - 原文依据：
    - [关联PR #210（merged）](https://gitcode.com/cann/ops-blas/merge_requests/210)    - [关联PR #214（merged）](https://gitcode.com/cann/ops-blas/merge_requests/214)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue213    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#202](https://gitcode.com/cann/ops-blas/issues/202) Feat: 新增面向arch35的aclblasSrotg接口** — 31分
  - 痛点原因：关联PR处于open状态未合并，且无文档链接、release引用及关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `wangzitao_leo`：assigned to @chensi79
- **[#191](https://gitcode.com/cann/ops-blas/issues/191) [Requirement|需求建议]: Feat: 新增面向arch35的aclblasSrotmg接口** — 31分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺少人工关闭评论、文档链接与 release 引用来佐证解决结论。
  - 原文依据：
    - [关联PR #192（merged）](https://gitcode.com/cann/ops-blas/merge_requests/192)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue191    - `LuckySun`：add label requirement    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @LuckySun
- **[#222](https://gitcode.com/cann/ops-blas/issues/222) [Documentation|文档反馈]: README.md 技术专栏 Wiki 链接无效** — 38分
  - 痛点原因：无关联PR与commit引用，仅凭状态变更为已完成即关闭，缺乏实质性代码修复证据。
  - 原文依据：
    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中。    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `zhanghua145`：assigned to @zhanghua145
- **[#212](https://gitcode.com/cann/ops-blas/issues/212) 【文档】blas 算子 README 缺少调用示例（34个算子）** — 38分
  - 痛点原因：虽有关联PR合并，但无commit和release引用，且关闭评论显示问题仍在确认并提出新要求，证据链不完整。
  - 原文依据：
    - [关联PR #225（merged）](https://gitcode.com/cann/ops-blas/merge_requests/225)    - [关联PR #230（merged）](https://gitcode.com/cann/ops-blas/merge_requests/230)    - `wangzitao_leo`：感谢反馈，问题正在确认中。    - `wangzitao_leo`：不仅要补充调用示例，还需要提供对应的“具体编译和执行过程”，参考ops-nn仓的写法：https://gitcode.com/cann/ops-nn/blob/master/matmul/quant_batch_matmul_v3/doc…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue212    - `zhanghua145`：add label documentation
- **[#196](https://gitcode.com/cann/ops-blas/issues/196) [Bug-Report|缺陷反馈]: ascend950 编译 gemm_ex_alpha_beta_kernel 产生 10 条 kernel type 未…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用与文档链接，且仅凭简单评论关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #183（merged）](https://gitcode.com/cann/ops-blas/merge_requests/183)    - `yang-di52`：收到，我将尽快修改    - `yang-di52`：已修改完毕    - `yang-di52`：closed from codehub    - `yang-di52`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#195](https://gitcode.com/cann/ops-blas/issues/195) [需求建议]: 统一 blas 目录下各算子 README.md 文档模板** — 38分
  - 痛点原因：缺乏直接commit引用与release版本说明，仅靠机器人自动关闭及关联PR，解决过程的实质性证据链不完整。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：你好，您反馈的问题已收到，正在处理中。    - `zhanghua145`：## 模板方案 已在分支 `docs/issue-195-unify-readme-template` 创建统一模板文件 `docs/README_TEMPLATE.md`。 ### 模板章节结构 | 章节 | 说明 | |------|…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue28,issue195    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#194](https://gitcode.com/cann/ops-blas/issues/194) [Requirement|需求建议]: 统一 blas 目录结构，去掉多余的 op 层级** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，且关闭评论仅为系统提示，缺乏具体解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #208（merged）](https://gitcode.com/cann/ops-blas/merge_requests/208)    - `zhanghua145`：您好，您反馈的问题已收到，正在处理中    - `zhanghua145`：closed from codehub    - `cann-robot`：add label resolved    - `zhanghua145`：assigned to @zhanghua145
- **[#193](https://gitcode.com/cann/ops-blas/issues/193) [Bug-Report|缺陷反馈]: aclblasSgeqrfBatched 接口 info 参数实现不完整，与标准 BLAS 行为不一致** — 38分
  - 痛点原因：虽有关联PR，但无commit引用和文档链接，且关闭评论仅为机器人自动回复，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #211（merged）](https://gitcode.com/cann/ops-blas/merge_requests/211)    - `wangzitao_leo`：感谢反馈，正在确认中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue193    - `cann-robot`：add label resolved
- **[#226](https://gitcode.com/cann/ops-blas/issues/226) Feat: 新增面向Ascend950(arch35)的aclblasRotEx接口** — 46分
  - 痛点原因：缺少关联PR、文档链接及关闭评论，仅凭状态变更和commit引用导致解决证据不够充分。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#197](https://gitcode.com/cann/ops-blas/issues/197) [Requirement|需求建议]: 新增 aclblasIsamax/aclblasIsamin 算子 arch35 实现** — 46分
  - 痛点原因：缺少关闭评论和release引用，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #195（merged）](https://gitcode.com/cann/ops-blas/merge_requests/195)    - `xutianze`：closed from codehub    - `xutianze`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#210](https://gitcode.com/cann/ops-blas/issues/210) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-06-24, CANN 9.1.0)** — 54分
  - 痛点原因：虽有关联PR与commit，但缺乏文档链接与release引用，且关闭评论仅为机器人自动触发，缺乏人工修复验证。
  - 原文依据：
    - [关联PR #206（merged）](https://gitcode.com/cann/ops-blas/merge_requests/206)    - `justsheldon`：修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue210    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @justsheldon
- **[#203](https://gitcode.com/cann/ops-blas/issues/203) [Bug-Report|缺陷反馈]: 当前主分支18abb8d8下scopy算子在arch22架构下运行测试，验证失败** — 54分
  - 痛点原因：维护者未能复现问题，最终由用户自行定位根因，缺乏官方明确的修复验证证据。
  - 原文依据：
    - [关联PR #220（merged）](https://gitcode.com/cann/ops-blas/merge_requests/220)    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：本地未能复现： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/a345f0d5-e1ad-45d4-8c88-91318a793b64/image.png …    - `2302_77046878`：问题由先销毁stream后销毁handle导致，现在stream是由handle管理的，可以不用分开销毁，直接销毁handle即可 ![image.png](https://raw.gitcode.com/user-images/asse…    - `wangzitao_leo`：stream 是你用 aclrtCreateStream 创建的，通过 aclblasSetStream 绑定到 handle 上。库只借用这个 stream，不拥有它。 实现里 aclblasDestroy 只会： 1. 同步 stre…    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue203
- **[#190](https://gitcode.com/cann/ops-blas/issues/190) [Requirement|需求建议]: 为 arch35（Ascend 950）新增 aclblasSnrm2 接口** — 54分
  - 痛点原因：虽有关联PR与关闭评论，但缺少文档链接和release引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #181（merged）](https://gitcode.com/cann/ops-blas/merge_requests/181)    - `chensi79`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue190    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chensi79

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | 关闭前 |
| 具体动作 | 要求提交验证结果或测试证据，说明覆盖范围和剩余计划 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 11.2，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 43.9，低分 28/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 11.2，低分 40/40 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 43.9，低分 28/40 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明后续反馈路径或重新开启条件，信息不足 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | assignee；候选负责人 `wangzitao_leo` |
| 触发条件 | issue分配后48h内 |
| 具体动作 | 发起技术方案讨论或确认排查方向，至少一条实质评论 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 22.3，低分 39/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 89.0，低分 3/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 89.0，低分 3/40 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 22.3，低分 39/40 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 无评论讨论，但通过自认领、MR创建与合并形成明确推进。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | MR合并后bot关闭前 |
| 具体动作 | 校验issue目标覆盖度，未完全满足时保持open并提示剩余项 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 29.0，低分 31/40；OBJ_BOT_MISCLOSE_REVERSE：均值 94.5，低分 0/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 29.0，低分 31/40 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 94.5，低分 0/40 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | bot关闭后流程已完成，无需人工接续，未造成阻塞。 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **84.4/100**，整体相对可控，但仍需关注：创建阶段表现良好，无痛点issue，模板填写质量较高。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 89.2 | 内容为真实技术需求，设计细节具体且无幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 79.5 | 结构化章节完整，含背景、设计方案、测试计划，环境信息明确。 |


### I1 · 分配与首次响应

本阶段分数为 **55.7/100**，本阶段需要改进，主要问题是：长尾响应与无响应并存。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 11.5 | 均值 11.5，低分 35/40 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 73.5 | 均值 73.5，低分 8/40 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 78.0 | 作者自认领，责任归属清晰，后续MR由同一人完成。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 72.9 | 自认领并直接创建MR，流程顺畅但无维护者显式分流。 |

代表低分 Issue：[#198](https://gitcode.com/cann/ops-blas/issues/198)
问题：[Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现。

### I2 · 讨论与解决

本阶段分数为 **60.4/100**，整体相对可控，但仍需关注：讨论严重不足零评论多。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 89.0 | 均值 89.0，低分 3/40 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 22.3 | 均值 22.3，低分 39/40 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 56.8 | 无评论讨论，但通过自认领、MR创建与合并形成明确推进。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 78.4 | MR已合并，含29个测试用例且通过率100%，目标完全达成。 |

代表低分 Issue：[#198](https://gitcode.com/cann/ops-blas/issues/198)
问题：[Requirement|需求建议]: 新增基于arch22架构的SgemmStridedBatched算子实现。

### I3 · 总结与关闭

本阶段分数为 **41.0/100**，本阶段需要改进，主要问题是：关闭阶段缺乏验证与沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 11.2 | 均值 11.2，低分 40/40 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 43.9 | 均值 43.9，低分 28/40 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.4 | 关闭后未说明后续反馈路径或重新开启条件，信息不足 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.0 | MR合并后由bot关闭，有实际代码交付，非过早关闭。 |

代表低分 Issue：[#209](https://gitcode.com/cann/ops-blas/issues/209)
问题：[Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败。

### G · Bot/Agent 治理

本阶段分数为 **64.7/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 29.0 | 均值 29.0，低分 31/40 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.5 | 均值 94.5，低分 0/40 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 71.6 | bot关闭后流程已完成，无需人工接续，未造成阻塞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 66.4 | bot在MR合并时自动关闭issue并加resolved标签，流程闭环有效。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 69.9 | bot动作准确及时，MR合并触发关闭并标记resolved，无误操作。 |

代表低分 Issue：[#209](https://gitcode.com/cann/ops-blas/issues/209)
问题：[Bug-Report|缺陷反馈]: test代码不支持log接口，当test代码引用的头文件需要使用log接口使编译会失败。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 40 | 47.1 | 首期基线 | 84.4 | 55.7 | 60.4 | 41.0 | 64.7 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-06-22_to_2026-06-28.json`。
