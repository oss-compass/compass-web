# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **39** 个 Issue
+ 其中外部 Issue **23** 个、内部 **16** 个；I1–I3 及 G 基于「外部且成熟」的 **23** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 3 / Closed 36**，关闭率 **92.3%**。
+ 总体体验分为 **54.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 51.0 | 关闭阶段沉淀严重缺失 |
| P1 | I2 · 讨论与解决 | 64.8 | 讨论深度不足且多issue停滞 |
| P2 | I1 · 分配与首次响应 | 73.2 | 分流阶段存在中等痛点，标签覆盖率不足且部分issue响应严重滞后 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置关闭模板，强制填写解决方案摘要、验证结果和后续反馈入口 |
| REC-02 | P1 | 自动提醒assignee更新进展或设置预期解决时间 |
| REC-03 | P1 | 增加close_reason与标签一致性校验，矛盾时阻断关闭并告警 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 39 |
| Open / Closed | 3 / 36 |
| 关闭率 | 92.3% |
| 类型构成 | 缺陷 24 / 需求 5 / 咨询 2 / 其他 8 |
| 总体体验分 | 54.5/100（D） |
| 首次响应时间 | 中位 2.3h；均值 16.4h |
| 关闭周期 | 中位 21.9h；均值 2.7天 |
| 7天响应率 | 89.7% |
| 评论数/Issue | 1.21 |
| 标签覆盖率 | 74.4% |
| 指派覆盖率 | 92.3% |
| 数据完整性 | 91.1/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 90.0 | 1/39（2.6%） | 相对可控 | `SUB_INPUT_QUALITY` 87.1 |
| I1 · 分配与首次响应 | 73.2 | 4/23（17.4%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 45.2 |
| I2 · 讨论与解决 | 64.8 | 5/23（21.7%） | P1 | `OBJ_SOLUTION_EVIDENCE` 49.5 |
| I3 · 总结与关闭 | 51.0 | 19/23（82.6%） | P0 | `OBJ_CLOSURE_REUSE` 19.6 |
| G · Bot/Agent 治理（参考） | 64.8 | 5/23（21.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 35.7 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段沉淀严重缺失 | OBJ_CLOSURE_REUSE：均值 19.6，低分 21/23；OBJ_DECISION_TRANSPARENCY：均值 70.0，低分 3/23 | 社区知识无法积累，同类问题重复出现，关闭可信度低 |
| PP-02 | P1 | I2 · 讨论与解决 | 讨论深度不足且多issue停滞 | OBJ_SOLUTION_EVIDENCE：均值 49.5，低分 13/23；OBJ_RESULT_FORMATION_TIMELINESS：均值 74.8，低分 3/23 | 问题悬而未决，用户长期等待无反馈，社区信任度下降 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot缺位与误关闭并存 | OBJ_BOT_GOVERNANCE：均值 35.7，低分 14/23；OBJ_BOT_MISCLOSE_REVERSE：均值 92.2，低分 0/23 | 自动化治理不一致，关闭可信度低，部分issue无自动化覆盖 |
| PP-04 | P2 | I1 · 分配与首次响应 | 标签覆盖率不足分流不完整 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 45.2，低分 13/23；OBJ_RESPONSE_SPEED：均值 91.3，低分 1/23 | issue分类检索困难，分流路径不明确，痛点issue无法被标签筛选 |
| PP-05 | P2 | I1 · 分配与首次响应 | 响应速度存在显著长尾 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 45.2，低分 13/23；OBJ_RESPONSE_SPEED：均值 91.3，低分 1/23 | 少数用户长时间等待，体验差异大 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段沉淀严重缺失（I3 · 总结与关闭）

- **[#274](https://gitcode.com/cann/ops-blas/issues/274) [Bug-Report|缺陷反馈]: 使用最新仓代码，本地编译失败** — 0分
  - 痛点原因：关闭说明仅口头建议安装lapack，未做方案文档化且无重复issue链接，内容过于简短，难以供他人复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：看报错日志是lapack没有安装，建议手动安装下。    - `qq_36563168`：<a href="https://gitcode.com/user-attachments/files/8916851/36096592c7594553b308dfd13a6d4fc2.log" target="_blank">36096…    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时未留下任何说明文字，未交代关闭原因与最终结论，导致后续无法复用。

- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 0分
  - 痛点原因：关闭说明仅17字且由机器人机械关闭，仅引用关联issue，无方案文档与修复细节，未沉淀可复用知识。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze
- **[#262](https://gitcode.com/cann/ops-blas/issues/262) [Question|问题咨询]: aclblasCaxpy`、`aclblasCdotu`、`aclblasCdotc`、`aclblasCcopy`、`ac…** — 0分
  - 痛点原因：关闭说明仅17字且无方案文档化，未沉淀最终解决细节，导致经验无法供社区复用。
  - 原文依据：
    - `zhanghua145`：closed from codehub    - `zhanghua145`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：补充一个扫描结论：`cann_ops_blas.h` 当前有 6 个接口签名使用了 C++ 类型，涉及 6 个算子实现文件： | C++ 接口 | C++ 类型 | 实现位置 | |----------|---------|-------…    - [关联PR #261（merged）](https://gitcode.com/cann/ops-blas/merge_requests/261)    - [关联PR #263（closed）](https://gitcode.com/cann/ops-blas/merge_requests/263)
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 0分
  - 痛点原因：关闭说明仅为机器人关联MR的自动回复，无具体修复方案与文档记录，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @eternityk    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#246](https://gitcode.com/cann/ops-blas/issues/246) [Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug** — 0分
  - 痛点原因：关闭说明为0字，仅停留在问题确认与指派阶段，未留下任何可供复用的修复记录或方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 0分
  - 痛点原因：关闭说明为0字，仅停留在指派阶段，未提供任何修复方案或结论总结，导致经验无法复用。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 0分
  - 痛点原因：关闭说明仅13字且无方案文档化沉淀，未总结最终修改方案，导致解决经验无法供社区复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @m0_61099165
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 0分
  - 痛点原因：机器人自动关闭且仅关联其他issue，无方案文档化记录，关闭说明仅12字，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 0分
  - 痛点原因：机器人自动关闭且无人工方案总结，无方案文档化与重复问题关联，关闭说明极简，无法供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将尽快解决    - `yang-di52`：assigned to @yang-di52    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 0分
  - 痛点原因：机器人自动关闭且关闭说明仅17字，无方案文档化与重复链接，缺乏问题解决细节，无法供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 30分
  - 痛点原因：关闭说明仅16字且无主链接，虽有文档指引，但缺乏最终解决方案总结，其他用户难以参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 30分
  - 痛点原因：关闭说明仅为17字的机器人自动合并提示，未提供主链接，缺乏人工总结的解决方案供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 30分
  - 痛点原因：关闭说明仅16字过于简略，虽有初步确认结论但未提供后续修改的具体方案与复用指引，难以参考。
  - 原文依据：
    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 30分
  - 痛点原因：关闭说明仅17字且仅提及MR合并关联，未补充具体修复方案或文档更新链接，难以供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `justsheldon`：assigned to @justsheldon    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅3字且无重复问题主链接，虽有方案文档但缺乏具体解决细节，导致无法提供有效参考。
  - 原文依据：
    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：定位中    - `justsheldon`：assigned to @justsheldon
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅3字且由机器人自动关联关闭，缺乏问题解决过程与复用价值说明。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：定位中    - `Twoliges`：assigned to @Twoliges    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#236](https://gitcode.com/cann/ops-blas/issues/236) [Readme-QA] ascend950 aclblasSgemmGroupedBatched 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅8字过于简略，缺乏具体解决方案或复用指引，导致其他用户无法从中获取有效信息。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `Crrryyyy`：/assign    - `Crrryyyy`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅13字且为机器人机械话术，人工回复仅承诺尽快修复，无具体解决方案与根因说明，缺乏参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅3字且无主链接，仅靠机器人关联MR自动关闭，缺乏供社区直接复用的有效信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：定位中    - `Twoliges`：assigned to @Twoliges    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#233](https://gitcode.com/cann/ops-blas/issues/233) [Documentation|文档反馈]: blas/gerc/README.md 函数原型错误，缺 handle 且误用 stream** — 30分
  - 痛点原因：关闭说明仅13字且未提供重复issue的主链接，缺乏可复用的解决方案信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：您好，该问题早先已通过 https://gitcode.com/cann/ops-blas/issues/67 跟踪，后续会尽快解决。    - `wangzitao_leo`：后续通过上述issue统一跟踪。
#### PP-02 讨论深度不足且多issue停滞（I2 · 讨论与解决）

- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 15分
  - 痛点原因：关闭时未关联PR、commit或release引用，且无关闭评论，缺乏实质解决证据。

- **[#246](https://gitcode.com/cann/ops-blas/issues/246) [Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug** — 15分
  - 痛点原因：仅口头确认并指派人员，未关联PR或提交commit等实质性修复证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 15分
  - 痛点原因：仅有确认问题和分配负责人的评论，未提供关联PR、commit或release引用等实质性修复证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#274](https://gitcode.com/cann/ops-blas/issues/274) [Bug-Report|缺陷反馈]: 使用最新仓代码，本地编译失败** — 23分
  - 痛点原因：仅凭评论建议手动安装并更改状态关闭，无关联PR、commit或release等代码级修复证据。
  - 原文依据：
    - `wangzitao_leo`：看报错日志是lapack没有安装，建议手动安装下。    - `qq_36563168`：<a href="https://gitcode.com/user-attachments/files/8916851/36096592c7594553b308dfd13a6d4fc2.log" target="_blank">36096…    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 23分
  - 痛点原因：仅有关联PR与用户验证，缺乏commit、release或文档等官方强证据支撑，且关闭评论过于简单。
  - 原文依据：
    - [关联PR #258（closed）](https://gitcode.com/cann/ops-blas/merge_requests/258)    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 23分
  - 痛点原因：缺乏代码提交、文档及版本说明等直接修复证据，关联PR未全部合并，且关闭评论指向其他issue，证据链不完整。
  - 原文依据：
    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)    - [关联PR #292（open）](https://gitcode.com/cann/ops-blas/merge_requests/292)    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 38分
  - 痛点原因：仅有关联PR与文档链接，缺乏commit引用与release引用等实质性代码或版本发布证据来佐证解决状态。
  - 原文依据：
    - [关联PR #255（merged）](https://gitcode.com/cann/ops-blas/merge_requests/255)    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275    - `cann-robot`：add label resolved
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 38分
  - 痛点原因：无关联 PR 与 commit 引用，仅凭文字确认结论即关闭，缺乏实质性代码修复证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 38分
  - 痛点原因：缺乏commit引用和release引用，关闭依赖机器人自动回复，未提供人工修复说明或具体代码提交证据。
  - 原文依据：
    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 54分
  - 痛点原因：虽有PR和commit引用，但无文档与release链接，且由机器人关联其他issue间接关闭，缺乏人工明确的解决说明。
  - 原文依据：
    - [关联PR #253（merged）](https://gitcode.com/cann/ops-blas/merge_requests/253)    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#262](https://gitcode.com/cann/ops-blas/issues/262) [Question|问题咨询]: aclblasCaxpy`、`aclblasCdotu`、`aclblasCdotc`、`aclblasCcopy`、`ac…** — 54分
  - 痛点原因：虽有关联PR和commit引用，但缺少文档链接与release版本引用，导致解决证据链不完整。
  - 原文依据：
    - [关联PR #261（merged）](https://gitcode.com/cann/ops-blas/merge_requests/261)    - [关联PR #263（closed）](https://gitcode.com/cann/ops-blas/merge_requests/263)    - [关联PR #264（merged）](https://gitcode.com/cann/ops-blas/merge_requests/264)    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：补充一个扫描结论：`cann_ops_blas.h` 当前有 6 个接口签名使用了 C++ 类型，涉及 6 个算子实现文件： | C++ 接口 | C++ 类型 | 实现位置 | |----------|---------|-------…    - `zhanghua145`：closed from codehub
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 54分
  - 痛点原因：虽有关联PR已合并，但后续仍出现再次失败记录，缺乏最终验证通过的解决证据。
  - 原文依据：
    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)    - [关联PR #287（merged）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 54分
  - 痛点原因：缺乏文档链接与release引用，且关闭评论仅说明关联MR合并，未明确本issue的具体修复验证证据。
  - 原文依据：
    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)    - `yang-di52`：感谢反馈，我们将尽快解决    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
#### PP-03 Bot缺位与误关闭并存（G · Bot/Agent 治理）

- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 20分
  - 痛点原因：Bot仅机械打标与关闭，未发布任何评论进行引导说明，缺乏实质性治理交互。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 20分
  - 痛点原因：Bot在问题仍在修复中时错误打上resolved标签并关闭，且无任何评论交互。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 20分
  - 痛点原因：Bot仅机械打标且过早标记resolved，与人工修复中状态脱节，且无任何有效评论互动。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 20分
  - 痛点原因：Bot仅执行打标和关闭操作，无任何有效评论，未参与问题确认与修复跟进。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 20分
  - 痛点原因：Bot仅机械打标并随MR合并自动关闭，未产生任何实质性评论与用户互动。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标resolved，与人工定位中状态矛盾，且无评论跟进与自动关闭，治理流于形式。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#240](https://gitcode.com/cann/ops-blas/issues/240) [Readme-QA] ascend950 aclblasStbsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标且零评论，未关联PR或同步修复进展，缺乏实质性引导与互动。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#239](https://gitcode.com/cann/ops-blas/issues/239) [Readme-QA] ascend950 aclblasSspr2 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标和关闭，评论数为零，缺乏有效交互与进度同步，治理流于形式。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，无任何评论互动，缺乏实质性沟通与有效治理。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅完成打标，对后续多次编译失败零评论零干预，未发挥自动化治理作用。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标与关闭，评论数为零缺乏有效交互，且在人工仍定位中时误打resolved，治理流于形式。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 20分
  - 痛点原因：Bot仅机械打标关闭，对用户多次反馈的测试再次失败无任何跟进评论，未发挥实际治理作用。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 20分
  - 痛点原因：Bot过早打标resolved并关闭，与人工承诺尽快解决的状态冲突，且无任何有效交互评论。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论回复，缺乏自动引导与实质性治理互动。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
#### PP-04 标签覆盖率不足分流不完整（I1 · 分配与首次响应）

- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：首次响应耗时超 164 小时，且至今未给出任何实质性回应内容。

- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 0分
  - 痛点原因：仅有初步客套回复及打标签分配操作，全程无实质性技术解答。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 0分
  - 痛点原因：仅有问候、打标签和分配人员等流程化操作，始终未提供针对编译报错的具体技术排查或解答。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 0分
  - 痛点原因：仅快速确认并指派人员，始终未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：虽有快速响应，但后续仅进行加标签、指派等流程操作，始终未提供实质性技术解答。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：首次响应后仅有定位中、打标签和分配操作，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：官方仅给出套话式首次响应，后续用户多次反馈编译失败均未获任何实质性技术解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：仅有定位中、加标签和分配等流程性操作，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 0分
  - 痛点原因：仅有客套性回复，后续问题反复出现，始终缺乏实质性技术解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 0分
  - 痛点原因：仅进行了客套回复、加标签和指派等流程性操作，始终未提供任何实质性的技术解答或排查进展。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 0分
  - 痛点原因：维护者仅回复模板套话并打标签指派，全程未提供任何技术分析或解决方案，最终被机器人直接关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 40分
  - 痛点原因：首次响应仅客套确认，给出代码与文档不一致的实质结论耗时超214小时，严重滞后。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 40分
  - 痛点原因：首次响应仅确认问题，时隔176小时才提供具体代码修改方案，实质解决等待时间过长。
  - 原文依据：
    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @m0_61099165    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
#### PP-05 响应速度存在显著长尾（I1 · 分配与首次响应）

- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：首次响应耗时超 164 小时，且至今未给出任何实质性回应内容。

- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 0分
  - 痛点原因：仅有初步客套回复及打标签分配操作，全程无实质性技术解答。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 0分
  - 痛点原因：仅有问候、打标签和分配人员等流程化操作，始终未提供针对编译报错的具体技术排查或解答。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 0分
  - 痛点原因：仅快速确认并指派人员，始终未提供实质性的技术解答或修复方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：虽有快速响应，但后续仅进行加标签、指派等流程操作，始终未提供实质性技术解答。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：首次响应后仅有定位中、打标签和分配操作，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：官方仅给出套话式首次响应，后续用户多次反馈编译失败均未获任何实质性技术解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：仅有定位中、加标签和分配等流程性操作，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 0分
  - 痛点原因：仅有客套性回复，后续问题反复出现，始终缺乏实质性技术解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 0分
  - 痛点原因：仅进行了客套回复、加标签和指派等流程性操作，始终未提供任何实质性的技术解答或排查进展。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 0分
  - 痛点原因：维护者仅回复模板套话并打标签指派，全程未提供任何技术分析或解决方案，最终被机器人直接关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 40分
  - 痛点原因：首次响应仅客套确认，给出代码与文档不一致的实质结论耗时超214小时，严重滞后。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 40分
  - 痛点原因：首次响应仅确认问题，时隔176小时才提供具体代码修改方案，实质解决等待时间过长。
  - 原文依据：
    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @m0_61099165    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 配置关闭模板，强制填写解决方案摘要、验证结果和后续反馈入口 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 70 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 19.6，低分 21/23；OBJ_DECISION_TRANSPARENCY：均值 70.0，低分 3/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 19.6，低分 21/23 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 70.0，低分 3/23 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭后未说明重新开启条件或后续反馈路径，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue确认后7天无新评论 |
| 具体动作 | 自动提醒assignee更新进展或设置预期解决时间 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 75 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 49.5，低分 13/23；OBJ_RESULT_FORMATION_TIMELINESS：均值 74.8，低分 3/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 74.8，低分 3/23 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 49.5，低分 13/23 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 从确认到给出替代方案并删除空目录，有推进但未新增示例 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | 平台/Bot维护者；候选负责人 `wangzitao_leo` |
| 触发条件 | Bot执行关闭动作时 |
| 具体动作 | 增加close_reason与标签一致性校验，矛盾时阻断关闭并告警 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升；相关低分样本降至 10 以下 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 35.7，低分 14/23；OBJ_BOT_MISCLOSE_REVERSE：均值 92.2，低分 0/23 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 35.7，低分 14/23 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 92.2，低分 0/23 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 人工完成MR处理后bot执行关闭，交接顺畅，流程未卡住 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **90.0/100**，整体相对可控，但仍需关注：创建阶段整体良好，仅1个issue因无标签且LLM评分失败被标记为…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.0 | 内容具体真实，引用实际文件路径和代码，无明显AI幻觉或噪音 |
| `SUB_INPUT_QUALITY` 输入质量 | 87.1 | 包含完整环境信息、复现步骤、预期结果和详细日志，结构化章节齐全。 |

代表低分 Issue：[#233](https://gitcode.com/cann/ops-blas/issues/233)
问题：[Documentation|文档反馈]: blas/gerc/README.md 函数原型错误，缺 handle 且误用 stream。

### I1 · 分配与首次响应
本阶段分数为 **73.2/100**，整体相对可控，但仍需关注：分流阶段存在中等痛点，标签覆盖率不足且部分issue响应严重滞后。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 45.2 | 均值 45.2，低分 13/23 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 91.3 | 均值 91.3，低分 1/23 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 84.0 | 明确分配给wangzitao_leo，zhanghua145实际承接并创建MR |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 77.4 | 及时分配给维护者，文档类问题路由到正确处理人员 |

代表低分 Issue：[#273](https://gitcode.com/cann/ops-blas/issues/273)
问题：ops-blas Development Roadmap (2026 Q3)。

### I2 · 讨论与解决
本阶段分数为 **64.8/100**，整体相对可控，但仍需关注：讨论深度不足且多issue停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 74.8 | 均值 74.8，低分 3/23 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 49.5 | 均值 49.5，低分 13/23 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 64.8 | 从确认到给出替代方案并删除空目录，有推进但未新增示例 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 72.7 | 指引了现有示例位置并删除空目录，但用户核心诉求新增示例未实现 |

代表低分 Issue：[#246](https://gitcode.com/cann/ops-blas/issues/246)
问题：[Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug。

### I3 · 总结与关闭
本阶段分数为 **51.0/100**，本阶段需要改进，主要问题是：关闭阶段沉淀严重缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 19.6 | 均值 19.6，低分 21/23 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 70.0 | 均值 70.0，低分 3/23 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 42.7 | 关闭后未说明重新开启条件或后续反馈路径，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 78.0 | MR合并后关闭，但用户未确认且关闭原因标注为进行中，有矛盾 |

代表低分 Issue：[#246](https://gitcode.com/cann/ops-blas/issues/246)
问题：[Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug。

### G · Bot/Agent 治理
本阶段分数为 **64.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 35.7 | 均值 35.7，低分 14/23 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 92.2 | 均值 92.2，低分 0/23 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 71.3 | 人工完成MR处理后bot执行关闭，交接顺畅，流程未卡住 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 63.1 | 无bot介入，信息不足，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 65.8 | 关闭和标签动作准确及时，基于MR合并触发，无错误阻断 |

代表低分 Issue：[#229](https://gitcode.com/cann/ops-blas/issues/229)
问题：[Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 39 | 54.5 | 首期基线 | 90.0 | 73.2 | 64.8 | 51.0 | 64.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **9 位社区响应者**贡献 **32 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `wangzitao_leo` | 15 |
| `zhanghua145` | 3 |
| `Crrryyyy` | 3 |
| `yang-di52` | 3 |
| `xutianze` | 2 |

Top1 响应占比 **46.9%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.1/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-06-29_to_2026-07-05.json`。
