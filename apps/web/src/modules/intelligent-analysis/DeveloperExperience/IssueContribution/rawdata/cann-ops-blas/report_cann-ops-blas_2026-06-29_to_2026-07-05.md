# Issue 贡献体验周报 · cann/ops-blas

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-blas` 共收到 **39** 个 Issue
+ **Open 3 / Closed 36**，关闭率 **92.3%**。
+ 总体体验分为 **52.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 48.0 | 关闭阶段缺乏解决证据与知识沉淀 |
| P1 | I1 · 分配与首次响应 | 64.3 | 分流阶段标签缺失与路由不完整 |
| P1 | I2 · 讨论与解决 | 65.9 | 开放Issue讨论停滞长期无进展 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置关闭模板，强制要求填写修复PR链接、验证结果和后续反馈路径 |
| REC-02 | P1 | 配置自动标签bot，基于标题前缀[Bug-Report]/[Documentation]/[Requirement]等自动添加对应标签 |
| REC-03 | P1 | 配置自动提醒通知assignee更新进展或说明阻塞原因 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 39 |
| Open / Closed | 3 / 36 |
| 关闭率 | 92.3% |
| 类型构成 | 缺陷 24 / 需求 5 / 咨询 2 / 其他 8 |
| 总体体验分 | 52.5/100（D） |
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
| I0 · 创建 | 90.1 | 1/39（2.6%） | 相对可控 | `SUB_INPUT_QUALITY` 87.0 |
| I1 · 分配与首次响应 | 64.3 | 14/39（35.9%） | P1 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 29.2 |
| I2 · 讨论与解决 | 65.9 | 8/39（20.5%） | 相对可控 | `OBJ_SOLUTION_EVIDENCE` 41.6 |
| I3 · 总结与关闭 | 48.0 | 27/39（69.2%） | P0 | `OBJ_CLOSURE_REUSE` 18.8 |
| G · Bot/Agent 治理（参考） | 65.1 | 5/39（12.8%） | 参考项 | `OBJ_BOT_GOVERNANCE` 34.4 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏解决证据与知识沉淀 | OBJ_CLOSURE_REUSE：均值 18.8，低分 37/39；OBJ_DECISION_TRANSPARENCY：均值 57.3，低分 16/39 | 已解决问题无法被社区复用检索，同类问题可能重复提交，社区知识积累断裂 |
| PP-02 | P1 | I1 · 分配与首次响应 | 分流阶段标签缺失与路由不完整 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 29.2，低分 28/39；OBJ_RESPONSE_SPEED：均值 78.5，低分 5/39 | 未分类Issue难以统计追踪和自动化路由，增加人工分流负担，影响问题管理效率 |
| PP-03 | P1 | I2 · 讨论与解决 | 开放Issue讨论停滞长期无进展 | OBJ_SOLUTION_EVIDENCE：均值 41.6，低分 28/39；OBJ_RESULT_FORMATION_TIMELINESS：均值 84.1，低分 3/39 | 用户问题长时间悬而未决，社区信任度下降，有效反馈可能流失 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot误关闭风险覆盖率高 | OBJ_BOT_GOVERNANCE：均值 34.4，低分 25/39；OBJ_BOT_MISCLOSE_REVERSE：均值 92.8，低分 0/39 | 用户未确认满意即被关闭，可能遗漏后续问题，关闭元数据不一致影响追踪 |
| PP-05 | P2 | G · Bot/Agent 治理 | 非关闭阶段Bot功能全面缺位 | OBJ_BOT_GOVERNANCE：均值 34.4，低分 25/39；OBJ_BOT_MISCLOSE_REVERSE：均值 92.8，低分 0/39 | 分流和讨论效率完全依赖人工，缺少自动化辅助导致响应不均衡和跟进遗漏 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段缺乏解决证据与知识沉淀（I3 · 总结与关闭）

- **[#274](https://gitcode.com/cann/ops-blas/issues/274) [Bug-Report|缺陷反馈]: 使用最新仓代码，本地编译失败** — 0分
  - 痛点原因：关闭时仅口头建议手动安装lapack，未沉淀为文档化方案，缺乏对其他用户的复用参考价值。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：看报错日志是lapack没有安装，建议手动安装下。    - `qq_36563168`：<a href="https://gitcode.com/user-attachments/files/8916851/36096592c7594553b308dfd13a6d4fc2.log" target="_blank">36096…    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：关闭时未留下任何说明文字且未提供主链接，导致后续无法复用其方案文档成果。

- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 0分
  - 痛点原因：关闭说明仅17字且无方案文档化，仅因关联MR合并而关闭，未沉淀任何可复用的解决方案或排查经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze
- **[#262](https://gitcode.com/cann/ops-blas/issues/262) [Question|问题咨询]: aclblasCaxpy`、`aclblasCdotu`、`aclblasCdotc`、`aclblasCcopy`、`ac…** — 0分
  - 痛点原因：仅以17字系统状态机械关闭，无方案文档化沉淀，未提供最终解决方案，对其他用户无复用价值。
  - 原文依据：
    - `zhanghua145`：closed from codehub    - `zhanghua145`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：补充一个扫描结论：`cann_ops_blas.h` 当前有 6 个接口签名使用了 C++ 类型，涉及 6 个算子实现文件： | C++ 接口 | C++ 类型 | 实现位置 | |----------|---------|-------…    - [关联PR #261（merged）](https://gitcode.com/cann/ops-blas/merge_requests/261)    - [关联PR #263（closed）](https://gitcode.com/cann/ops-blas/merge_requests/263)
- **[#261](https://gitcode.com/cann/ops-blas/issues/261) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-07-02, CANN 9.1.0)** — 0分
  - 痛点原因：关闭说明为空，未沉淀方案文档或复用链接，仅从代码库直接关闭，毫无复用价值。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#260](https://gitcode.com/cann/ops-blas/issues/260) [Requirement|需求建议]: 新增 aclblasLtMatmulAlgo 初始化与配置属性读写接口** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无方案文档沉淀且关闭说明为0字，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue260    - `cann-robot`：add label resolved    - [关联PR #248（merged）](https://gitcode.com/cann/ops-blas/merge_requests/248)
- **[#259](https://gitcode.com/cann/ops-blas/issues/259) [Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失** — 0分
  - 痛点原因：关闭说明为空且无方案文档，仅由机器人自动关闭，未沉淀任何问题原因与解决方案供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue259    - `cann-robot`：add label resolved    - [关联PR #245（merged）](https://gitcode.com/cann/ops-blas/merge_requests/245)
- **[#257](https://gitcode.com/cann/ops-blas/issues/257) csv 测试用例文件持续无法通过 codecheck，需手动屏蔽** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，无人工关闭说明且未沉淀方案文档，导致解决经验无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue257    - `cann-robot`：add label resolved    - [关联PR #242（merged）](https://gitcode.com/cann/ops-blas/merge_requests/242)
- **[#255](https://gitcode.com/cann/ops-blas/issues/255) [Requirement|需求建议]: 新增 arch35 平台 aclblasSrot 接口（BLAS SROT 平面旋转）** — 0分
  - 痛点原因：关闭时无任何文字说明与方案文档沉淀，仅由机器人随MR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue255    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - [关联PR #233（merged）](https://gitcode.com/cann/ops-blas/merge_requests/233)
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 0分
  - 痛点原因：仅机器人关联MR自动关闭，无人工根因分析与解决方案沉淀，无法供后续类似问题参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @eternityk    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#253](https://gitcode.com/cann/ops-blas/issues/253) [Requirement|需求建议]: 新增 aclblasSnrm2Ex 算子 arch35 接口** — 0分
  - 痛点原因：仅由机器人因PR合并自动关闭，无人工关闭说明、无方案文档沉淀且未关联重复issue，无法为后续提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue253    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - [关联PR #231（merged）](https://gitcode.com/cann/ops-blas/merge_requests/231)
- **[#246](https://gitcode.com/cann/ops-blas/issues/246) [Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug** — 0分
  - 痛点原因：关闭时无任何说明文字，未沉淀修复方案或最终结论，无法为后续类似问题提供参考。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 0分
  - 痛点原因：关闭时无任何文字说明，未总结修复方案与经验，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 0分
  - 痛点原因：关闭说明过短且无方案文档化，未沉淀有效修改方案供其他用户复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @m0_61099165
- **[#242](https://gitcode.com/cann/ops-blas/issues/242) Feat: 新增面向arch35的aclblasAxpyEx接口** — 0分
  - 痛点原因：仅靠机器人随PR合并自动关闭，无方案文档、dup主链接及任何人工关闭说明，未沉淀可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue242    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - [关联PR #223（merged）](https://gitcode.com/cann/ops-blas/merge_requests/223)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 0分
  - 痛点原因：仅由机器人自动关闭且说明仅12字，无方案文档化与重复主链接，人工回复无实质解决方案，缺乏参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 0分
  - 痛点原因：关闭说明仅12字且为机器人自动关联MR，无方案文档化沉淀，无dup主链接，未留下任何可复用的技术信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将尽快解决    - `yang-di52`：assigned to @yang-di52    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 0分
  - 痛点原因：仅靠机器人自动关闭且说明极简，无方案文档沉淀，人工回复缺乏具体技术细节，无法供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 30分
  - 痛点原因：关闭说明仅16字且无主链接，虽有维护者指引现有示例位置，但未沉淀最终代码修改记录，缺乏可复用的闭环信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#268](https://gitcode.com/cann/ops-blas/issues/268) [Bug-Report|缺陷反馈]: 十个算子README示例代码存在内存泄漏问题** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因MR合并自动关闭，未沉淀内存泄漏修复方案供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue268    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - [关联PR #249（merged）](https://gitcode.com/cann/ops-blas/merge_requests/249)
- **[#266](https://gitcode.com/cann/ops-blas/issues/266) [Readme-QA] tpmv README 产品支持情况标注错误** — 30分
  - 痛点原因：关闭说明为0字，仅由系统关联PR自动关闭，未沉淀任何供后续复用的有效信息。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `zhanghua145`：assigned to @zhanghua145    - [关联PR #251（merged）](https://gitcode.com/cann/ops-blas/merge_requests/251)    - [关联PR #252（closed）](https://gitcode.com/cann/ops-blas/merge_requests/252)
- **[#264](https://gitcode.com/cann/ops-blas/issues/264) [Readme-QA] ascend950 aclblasStpmv_legacy 调用示例编译失败 (2026-07-02)** — 30分
  - 痛点原因：关闭说明过简，仅指出文档需修改但未提供具体方案或最终更新链接，难以供他人复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：aclblasStpmv_legacy为A2A3调用的早期接口，文档应该修改。    - `wangzitao_leo`：![image.png](https://raw.gitcode.com/user-images/assets/8916851/9696a322-71b5-4d3c-816b-1ae7cf2ffdeb/image.png 'image.p…    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 30分
  - 痛点原因：关闭说明仅17字且由机器人随MR合并自动关闭，缺乏详细修复方案与复用指引，难以供其他用户参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 30分
  - 痛点原因：关闭说明仅16字且由系统自动关闭，未沉淀最终修复方案或后续追踪链接，缺乏可复用的解决信息。
  - 原文依据：
    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#256](https://gitcode.com/cann/ops-blas/issues/256) [Bug-Report|缺陷反馈]: 10个arch35算子README调用示例缺失或编译失败** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人关联PR自动关闭，未补充根因分析与解决方案总结，导致后续复用困难。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue256    - `cann-robot`：add label resolved    - [关联PR #238（merged）](https://gitcode.com/cann/ops-blas/merge_requests/238)
- **[#252](https://gitcode.com/cann/ops-blas/issues/252) [Requirement|需求建议]: 新增 Ex 变体算子代码模板** — 30分
  - 痛点原因：关闭说明仅9字且无主链接，未详细沉淀最终方案与代码模板位置等后续复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue252    - `cann-robot`：add label resolved    - `wangzitao_leo`：感谢反馈，已合入。    - `xutianze`：unassigned @xutianze    - `xutianze`：assigned to @xutianze    - `Twoliges`：assigned to @Twoliges and unassigned @xutianze
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 30分
  - 痛点原因：关闭说明仅17字且为机器人自动关联MR关闭，缺乏具体修复方案与文档更新链接，难以供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - `cann-robot`：add label resolved    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `justsheldon`：assigned to @justsheldon    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#244](https://gitcode.com/cann/ops-blas/issues/244) [Requirement|需求建议]: 阶段4新增 README 质量门控 — 调用示例自动审查与编译测试** — 30分
  - 痛点原因：关闭说明为0字，未沉淀解决经验，导致后续无法复用。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅3字，仅靠状态变更和加标签关闭，缺乏根因与解决方案的详细描述，难以供他人复用。
  - 原文依据：
    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：定位中    - `justsheldon`：assigned to @justsheldon
- **[#238](https://gitcode.com/cann/ops-blas/issues/238) [Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)** — 30分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，关闭说明为0字，未留存问题根因与解决方案供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue238    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @chensi79    - `wangzitao_leo`：unassigned @wangzitao_leo
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅3字且由机器人随MR合并自动关闭，未沉淀人工排查与解决方案，导致无法有效复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：定位中    - `Twoliges`：assigned to @Twoliges    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#236](https://gitcode.com/cann/ops-blas/issues/236) [Readme-QA] ascend950 aclblasSgemmGroupedBatched 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅 8 字，未沉淀根因与解决方案，缺乏供他人参考的复用信息。
  - 原文依据：
    - `Crrryyyy`：closed from codehub    - `Crrryyyy`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `Crrryyyy`：/assign    - `Crrryyyy`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：关闭说明仅13字且由机器人自动关联其他issue，维护者仅客套回复，缺乏具体修复细节供复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 30分
  - 痛点原因：仅由机器人因MR合并自动关闭，关闭说明仅3字，缺乏人工编写的根因分析与解决方案总结，无法供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：定位中    - `Twoliges`：assigned to @Twoliges    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#233](https://gitcode.com/cann/ops-blas/issues/233) [Documentation|文档反馈]: blas/gerc/README.md 函数原型错误，缺 handle 且误用 stream** — 30分
  - 痛点原因：关闭说明仅13字且未在系统关联重复issue主链接，导致无法有效复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `wangzitao_leo`：您好，该问题早先已通过 https://gitcode.com/cann/ops-blas/issues/67 跟踪，后续会尽快解决。    - `wangzitao_leo`：后续通过上述issue统一跟踪。
- **[#228](https://gitcode.com/cann/ops-blas/issues/228) [Bug-Report|缺陷反馈]: compile_and_run_example.md 示例代码 CHECK_FREE_RET 宏存在内存泄漏风险及文档内…** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关闭并关联PR，缺乏人工总结的解决方案供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue228    - `cann-robot`：add label resolved    - [关联PR #219（merged）](https://gitcode.com/cann/ops-blas/merge_requests/219)
- **[#232](https://gitcode.com/cann/ops-blas/issues/232) [Daily-QA|每日监测] ascend950 算子测试失败: isamin (2026-06-29)** — 45分
  - 痛点原因：关闭说明仅称误报并附图，无方案文档与复现链接，未沉淀根因分析，导致经验难以复用。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：误报，单点执行： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/322e2fa4-3387-4ddf-b5ef-4aead29032be/image.png…    - `wangzitao_leo`：assigned to @wangzitao_leo
#### PP-02 分流阶段标签缺失与路由不完整（I1 · 分配与首次响应）

- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 0分
  - 痛点原因：响应耗时超164小时且始终无实质回应，导致得分为零。

- **[#268](https://gitcode.com/cann/ops-blas/issues/268) [Bug-Report|缺陷反馈]: 十个算子README示例代码存在内存泄漏问题** — 0分
  - 痛点原因：全程仅有打标签和机器人自动关闭操作，无任何人工实质性回复。
  - 原文依据：
    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue268    - [关联PR #249（merged）](https://gitcode.com/cann/ops-blas/merge_requests/249)
- **[#266](https://gitcode.com/cann/ops-blas/issues/266) [Readme-QA] tpmv README 产品支持情况标注错误** — 0分
  - 痛点原因：虽有认领并最终关联PR关闭，但全程无任何实质性文字回应，仅靠状态流转处理。
  - 原文依据：
    - `zhanghua145`：assigned to @zhanghua145    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - [关联PR #251（merged）](https://gitcode.com/cann/ops-blas/merge_requests/251)    - [关联PR #252（closed）](https://gitcode.com/cann/ops-blas/merge_requests/252)
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 0分
  - 痛点原因：仅有客套确认与打标签指派，全程无实质性技术解答或排查进展回复。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#261](https://gitcode.com/cann/ops-blas/issues/261) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-07-02, CANN 9.1.0)** — 0分
  - 痛点原因：维护者仅执行加标签、指派和关闭等流程操作，全程未对问题提供任何实质性的文字回复。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
- **[#260](https://gitcode.com/cann/ops-blas/issues/260) [Requirement|需求建议]: 新增 aclblasLtMatmulAlgo 初始化与配置属性读写接口** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人关联合并PR并关闭，导致得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue260    - [关联PR #248（merged）](https://gitcode.com/cann/ops-blas/merge_requests/248)
- **[#259](https://gitcode.com/cann/ops-blas/issues/259) [Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失** — 0分
  - 痛点原因：仅机器人添加标签并随PR合并自动关闭，全程无任何人工或实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue259    - [关联PR #245（merged）](https://gitcode.com/cann/ops-blas/merge_requests/245)
- **[#257](https://gitcode.com/cann/ops-blas/issues/257) csv 测试用例文件持续无法通过 codecheck，需手动屏蔽** — 0分
  - 痛点原因：仅由机器人自动打标签并在关联PR合并后关闭，全程无人工实质技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue257    - [关联PR #242（merged）](https://gitcode.com/cann/ops-blas/merge_requests/242)
- **[#256](https://gitcode.com/cann/ops-blas/issues/256) [Bug-Report|缺陷反馈]: 10个arch35算子README调用示例缺失或编译失败** — 0分
  - 痛点原因：仅由机器人在关联PR合并后自动关闭，全程无任何实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue256    - [关联PR #238（merged）](https://gitcode.com/cann/ops-blas/merge_requests/238)
- **[#255](https://gitcode.com/cann/ops-blas/issues/255) [Requirement|需求建议]: 新增 arch35 平台 aclblasSrot 接口（BLAS SROT 平面旋转）** — 0分
  - 痛点原因：全程无人工实质回应，仅通过打标签、分配负责人及机器人关联合并请求直接关闭。
  - 原文依据：
    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue255    - [关联PR #233（merged）](https://gitcode.com/cann/ops-blas/merge_requests/233)
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 0分
  - 痛点原因：首次回复仅为客套话、打标签及分配任务，未针对编译出错问题提供任何实质性的技术解答。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#253](https://gitcode.com/cann/ops-blas/issues/253) [Requirement|需求建议]: 新增 aclblasSnrm2Ex 算子 arch35 接口** — 0分
  - 痛点原因：全程无任何实质回应，仅由机器人打标签并随关联PR合并直接关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue253    - [关联PR #231（merged）](https://gitcode.com/cann/ops-blas/merge_requests/231)
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 0分
  - 痛点原因：仅有初步确认回复，后续无针对文档接口缺失问题的实质性解答或修复说明即被关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#246](https://gitcode.com/cann/ops-blas/issues/246) [Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug** — 0分
  - 痛点原因：首次回复仅包含客套话和指派操作，未提供任何实质性的技术解答或解决方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 0分
  - 痛点原因：仅进行了问题确认和指派人员，未提供实质性的技术解答或处理方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#244](https://gitcode.com/cann/ops-blas/issues/244) [Requirement|需求建议]: 阶段4新增 README 质量门控 — 调用示例自动审查与编译测试** — 0分
  - 痛点原因：全程无任何首次响应或实质回应，维护者直接关闭并标记为已完成。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#242](https://gitcode.com/cann/ops-blas/issues/242) Feat: 新增面向arch35的aclblasAxpyEx接口** — 0分
  - 痛点原因：全程仅有机器人分配和关闭操作，无任何人工实质回应即被关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue242    - [关联PR #223（merged）](https://gitcode.com/cann/ops-blas/merge_requests/223)
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：首次响应后仅进行了加标签和分配负责人等流程操作，始终未提供实质性技术解答。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#238](https://gitcode.com/cann/ops-blas/issues/238) [Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)** — 0分
  - 痛点原因：响应耗时近30小时，且全程仅有打标签和分配人员等机械操作，始终未提供任何实质性技术解答。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @chensi79    - `wangzitao_leo`：unassigned @wangzitao_leo    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：虽首次响应快，但后续仅停留在定位和加标签，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：官方首次仅回复客套话，后续用户多次反馈编译失败均未得到实质性技术解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 0分
  - 痛点原因：仅有定位中、加标签和分配任务等流程操作，始终未提供实质性技术解答。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 0分
  - 痛点原因：仅有客套性回复，用户多次反馈测试失败后仍无任何实质性技术解答或处理。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 0分
  - 痛点原因：回复仅停留在打标签、指派和客套话，缺乏针对算子测试失败的技术分析，无实质解答。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 0分
  - 痛点原因：首次回复仅为客套话，后续仅打标签和分配任务，始终未提供任何实质性的技术分析或解决方案。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#228](https://gitcode.com/cann/ops-blas/issues/228) [Bug-Report|缺陷反馈]: compile_and_run_example.md 示例代码 CHECK_FREE_RET 宏存在内存泄漏风险及文档内…** — 0分
  - 痛点原因：仅机器人自动打标签并因关联PR合并关闭issue，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue228    - [关联PR #219（merged）](https://gitcode.com/cann/ops-blas/merge_requests/219)
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 40分
  - 痛点原因：首次响应仅为无实质内容的确认，实质回应耗时长达214.46小时，导致时效严重滞后。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `wangzitao_leo`：assigned to @wangzitao_leo    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 40分
  - 痛点原因：首次响应仅确认问题，给出具体代码修改方案的实质回应耗时长达176小时，导致严重超时。
  - 原文依据：
    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @m0_61099165    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成
#### PP-03 开放Issue讨论停滞长期无进展（I2 · 讨论与解决）

- **[#259](https://gitcode.com/cann/ops-blas/issues/259) [Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失** — 0分
  - 痛点原因：虽有关联PR合并，但无人工关闭评论、commit引用及文档链接等明确解决证据，仅靠机器人自动关闭。
  - 原文依据：
    - [关联PR #245（merged）](https://gitcode.com/cann/ops-blas/merge_requests/245)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue259    - `cann-robot`：add label resolved
- **[#253](https://gitcode.com/cann/ops-blas/issues/253) [Requirement|需求建议]: 新增 aclblasSnrm2Ex 算子 arch35 接口** — 0分
  - 痛点原因：仅靠机器人因关联PR合并自动关闭，缺乏commit、文档、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #231（merged）](https://gitcode.com/cann/ops-blas/merge_requests/231)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue253    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng
- **[#273](https://gitcode.com/cann/ops-blas/issues/273) ops-blas Development Roadmap (2026 Q3)** — 15分
  - 痛点原因：仅提供文档链接，未关联 PR、commit 或 release，且无关闭评论，缺乏实质性解决证据。

- **[#268](https://gitcode.com/cann/ops-blas/issues/268) [Bug-Report|缺陷反馈]: 十个算子README示例代码存在内存泄漏问题** — 15分
  - 痛点原因：仅靠机器人自动关闭与打标签，缺乏人工确认评论、commit引用及release版本说明等强证据。
  - 原文依据：
    - [关联PR #249（merged）](https://gitcode.com/cann/ops-blas/merge_requests/249)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue268    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#266](https://gitcode.com/cann/ops-blas/issues/266) [Readme-QA] tpmv README 产品支持情况标注错误** — 15分
  - 痛点原因：虽有合并的PR，但无commit和release引用，且靠自定义状态和codehub关闭，证据链不完整。
  - 原文依据：
    - [关联PR #251（merged）](https://gitcode.com/cann/ops-blas/merge_requests/251)    - [关联PR #252（closed）](https://gitcode.com/cann/ops-blas/merge_requests/252)    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `zhanghua145`：assigned to @zhanghua145
- **[#246](https://gitcode.com/cann/ops-blas/issues/246) [Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug** — 15分
  - 痛点原因：仅停留在问题确认和人员分配阶段，缺乏关联PR、commit引用等实质性修复证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#245](https://gitcode.com/cann/ops-blas/issues/245) [Documentation|文档反馈]: swap算子host代码与readme声明接口无法对齐，存在参数类型不一致问题，违反文档与代码一致性规范** — 15分
  - 痛点原因：仅停留在问题确认和负责人分配阶段，无关联PR、commit引用及关闭评论等实质性解决证据。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：assigned to @demoauguste    - `wangzitao_leo`：assigned to @QK_25415
- **[#228](https://gitcode.com/cann/ops-blas/issues/228) [Bug-Report|缺陷反馈]: compile_and_run_example.md 示例代码 CHECK_FREE_RET 宏存在内存泄漏风险及文档内…** — 15分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工确认评论、commit引用及release说明等强证据。
  - 原文依据：
    - [关联PR #219（merged）](https://gitcode.com/cann/ops-blas/merge_requests/219)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue228    - `cann-robot`：add label resolved
- **[#274](https://gitcode.com/cann/ops-blas/issues/274) [Bug-Report|缺陷反馈]: 使用最新仓代码，本地编译失败** — 23分
  - 痛点原因：无关联PR或commit引用，仅凭口头建议手动安装依赖即关闭，缺乏代码级修复证据。
  - 原文依据：
    - `wangzitao_leo`：看报错日志是lapack没有安装，建议手动安装下。    - `qq_36563168`：<a href="https://gitcode.com/user-attachments/files/8916851/36096592c7594553b308dfd13a6d4fc2.log" target="_blank">36096…    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#243](https://gitcode.com/cann/ops-blas/issues/243) [Bug-Report|缺陷反馈]:blas Kernel 大量使用 GlobalTensor::GetValue/SetValue 逐元素访问 GM，性能受限** — 23分
  - 痛点原因：关联PR已关闭且无commit引用，仅口头说明修改验证，缺乏代码合并或彻底解决的客观证据。
  - 原文依据：
    - [关联PR #258（closed）](https://gitcode.com/cann/ops-blas/merge_requests/258)    - `wangzitao_leo`：您好感谢反馈，问题确认中。    - `m0_61099165`：感谢反馈。我们针对 `blas/tbmv/arch35/stbmv_simd_fastpath_kernel.cpp:63` 的 `xGlobal.GetValue(col)` 按 Issue 建议方案进行了修改验证（`TQue` 双 b…    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 23分
  - 痛点原因：缺乏commit、文档和release引用，且仅由机器人关联其他issue的MR合并来关闭，无针对本issue的直接修复证据。
  - 原文依据：
    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)    - [关联PR #292（open）](https://gitcode.com/cann/ops-blas/merge_requests/292)    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#261](https://gitcode.com/cann/ops-blas/issues/261) [Daily-QA|P0-编译失败] ascend950 编译失败 (2026-07-02, CANN 9.1.0)** — 31分
  - 痛点原因：无关联PR、文档链接及关闭评论，仅通过系统操作关闭，缺乏具体的修复说明与证据。
  - 原文依据：
    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#260](https://gitcode.com/cann/ops-blas/issues/260) [Requirement|需求建议]: 新增 aclblasLtMatmulAlgo 初始化与配置属性读写接口** — 31分
  - 痛点原因：仅靠机器人自动关闭并标记，缺乏人工关闭评论、文档链接与release引用等实质性证据。
  - 原文依据：
    - [关联PR #248（merged）](https://gitcode.com/cann/ops-blas/merge_requests/248)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue260    - `cann-robot`：add label resolved
- **[#257](https://gitcode.com/cann/ops-blas/issues/257) csv 测试用例文件持续无法通过 codecheck，需手动屏蔽** — 31分
  - 痛点原因：仅依赖机器人自动关闭和打标签，缺乏人工关闭评论、文档链接及release引用等强解决证据。
  - 原文依据：
    - [关联PR #242（merged）](https://gitcode.com/cann/ops-blas/merge_requests/242)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue257    - `cann-robot`：add label resolved
- **[#256](https://gitcode.com/cann/ops-blas/issues/256) [Bug-Report|缺陷反馈]: 10个arch35算子README调用示例缺失或编译失败** — 31分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏具体commit引用与人工确认解决的评论，导致证据不足。
  - 原文依据：
    - [关联PR #238（merged）](https://gitcode.com/cann/ops-blas/merge_requests/238)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue256    - `cann-robot`：add label resolved
- **[#255](https://gitcode.com/cann/ops-blas/issues/255) [Requirement|需求建议]: 新增 arch35 平台 aclblasSrot 接口（BLAS SROT 平面旋转）** — 31分
  - 痛点原因：仅靠机器人自动关闭，无人工关闭评论总结，且缺乏文档链接与release引用等实质性证据。
  - 原文依据：
    - [关联PR #233（merged）](https://gitcode.com/cann/ops-blas/merge_requests/233)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue255    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79
- **[#244](https://gitcode.com/cann/ops-blas/issues/244) [Requirement|需求建议]: 阶段4新增 README 质量门控 — 调用示例自动审查与编译测试** — 31分
  - 痛点原因：关闭时无关联 PR、无 commit 引用且无说明评论，仅凭外部系统状态变更标记完成，缺乏实质解决证据。
  - 原文依据：
    - `Twoliges`：closed from codehub    - `Twoliges`：changed custom state from 进行中 to 已完成
- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 38分
  - 痛点原因：虽有合并PR删除空目录，但缺commit与release引用，仅以评论指引用户看readme，未实质补充示例，证据链弱。
  - 原文依据：
    - [关联PR #255（merged）](https://gitcode.com/cann/ops-blas/merge_requests/255)    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275    - `cann-robot`：add label resolved
- **[#258](https://gitcode.com/cann/ops-blas/issues/258) [Question|问题咨询]: MXFP4 leading dimension 语义与主流标准兼容性** — 38分
  - 痛点原因：无关联PR和commit引用，仅有文档链接，确认需后续修改但无实际代码修复证据即被关闭。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题正在确认中。    - `wangzitao_leo`：初步确认结论： 1. 确认blasLt/mamtul代码中MXFP4 A/B 操作数不使用 ld（由 m/n/k 驱动 ND layout），README 文档语义与代码实现不一致，需要后续修改。 2. matrix_transform …    - `Bug_Factory_w`：closed from codehub    - `Bug_Factory_w`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#252](https://gitcode.com/cann/ops-blas/issues/252) [Requirement|需求建议]: 新增 Ex 变体算子代码模板** — 38分
  - 痛点原因：虽有关联PR和关闭评论，但缺少commit引用与release版本记录，导致解决证据不够充分。
  - 原文依据：
    - [关联PR #237（merged）](https://gitcode.com/cann/ops-blas/merge_requests/237)    - `wangzitao_leo`：感谢反馈，已合入。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue252    - `cann-robot`：add label resolved    - `xutianze`：unassigned @xutianze    - `xutianze`：assigned to @xutianze
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与release引用，且人工回复未提供具体修复提交链接，导致解决证据不足。
  - 原文依据：
    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon
- **[#242](https://gitcode.com/cann/ops-blas/issues/242) Feat: 新增面向arch35的aclblasAxpyEx接口** — 46分
  - 痛点原因：虽有合并的PR，但仅由机器人自动关闭，缺乏人工确认解决的关闭评论与文档链接佐证，导致证据不足。
  - 原文依据：
    - [关联PR #223（merged）](https://gitcode.com/cann/ops-blas/merge_requests/223)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue242    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze
- **[#238](https://gitcode.com/cann/ops-blas/issues/238) [Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)** — 46分
  - 痛点原因：仅由机器人自动关闭且无人工关闭评论，缺乏release引用作为最终修复证据，导致解决证据不足。
  - 原文依据：
    - [关联PR #239（merged）](https://gitcode.com/cann/ops-blas/merge_requests/239)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue238    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @chensi79
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 54分
  - 痛点原因：虽有PR和commit引用，但无release和文档链接，且由机器人自动关闭，缺乏人工修复验证说明。
  - 原文依据：
    - [关联PR #253（merged）](https://gitcode.com/cann/ops-blas/merge_requests/253)    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue263,issue265    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#262](https://gitcode.com/cann/ops-blas/issues/262) [Question|问题咨询]: aclblasCaxpy`、`aclblasCdotu`、`aclblasCdotc`、`aclblasCcopy`、`ac…** — 54分
  - 痛点原因：缺乏文档链接与release引用，且关闭评论仅停留在问题确认修复中，未提供最终修复版本的明确证据。
  - 原文依据：
    - [关联PR #261（merged）](https://gitcode.com/cann/ops-blas/merge_requests/261)    - [关联PR #263（closed）](https://gitcode.com/cann/ops-blas/merge_requests/263)    - [关联PR #264（merged）](https://gitcode.com/cann/ops-blas/merge_requests/264)    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `zhanghua145`：补充一个扫描结论：`cann_ops_blas.h` 当前有 6 个接口签名使用了 C++ 类型，涉及 6 个算子实现文件： | C++ 接口 | C++ 类型 | 实现位置 | |----------|---------|-------…    - `zhanghua145`：closed from codehub
- **[#232](https://gitcode.com/cann/ops-blas/issues/232) [Daily-QA|每日监测] ascend950 算子测试失败: isamin (2026-06-29)** — 54分
  - 痛点原因：无关联PR且无文档release引用，仅靠评论截图说明误报，缺乏可追溯的修复或验证证据。
  - 原文依据：
    - `wangzitao_leo`：误报，单点执行： ![image.png](https://raw.gitcode.com/user-images/assets/8916851/322e2fa4-3387-4ddf-b5ef-4aead29032be/image.png…    - `wangzitao_leo`：closed from codehub    - `wangzitao_leo`：changed custom state from 进行中 to 已完成    - `wangzitao_leo`：add label bug-report    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 54分
  - 痛点原因：虽有合并的PR和commit，但后续评论显示测试再次失败，且无文档与release链接佐证彻底解决。
  - 原文依据：
    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)    - [关联PR #287（open）](https://gitcode.com/cann/ops-blas/merge_requests/287)    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 54分
  - 痛点原因：虽有合并的PR和commit，但仅由机器人因关联MR合并自动关闭，缺乏人工修复说明及文档链接等佐证。
  - 原文依据：
    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)    - `yang-di52`：感谢反馈，我们将尽快解决    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
#### PP-04 Bot误关闭风险覆盖率高（G · Bot/Agent 治理）

- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 20分
  - 痛点原因：Bot仅机械打标关闭且无任何评论说明，未有效辅助用户诉求解决与沟通。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275
- **[#268](https://gitcode.com/cann/ops-blas/issues/268) [Bug-Report|缺陷反馈]: 十个算子README示例代码存在内存泄漏问题** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，全程零评论，未公开说明关闭原因或同步状态，治理过程不透明且缺乏用户引导。
  - 原文依据：
    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue268    - [关联PR #249（merged）](https://gitcode.com/cann/ops-blas/merge_requests/249)
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 20分
  - 痛点原因：Bot在人工确认问题修复中时错误打上resolved标签并关闭issue，且无任何有效评论交互。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论交互，且在问题确认修复中时直接标记resolved，治理无效。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#260](https://gitcode.com/cann/ops-blas/issues/260) [Requirement|需求建议]: 新增 aclblasLtMatmulAlgo 初始化与配置属性读写接口** — 20分
  - 痛点原因：Bot仅默默执行打标与关闭操作，全程无任何评论说明，缺乏对用户的反馈与互动，导致治理透明度低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue260    - [关联PR #248（merged）](https://gitcode.com/cann/ops-blas/merge_requests/248)
- **[#259](https://gitcode.com/cann/ops-blas/issues/259) [Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未发布任何评论说明关闭原因及关联PR，导致治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue259    - [关联PR #245（merged）](https://gitcode.com/cann/ops-blas/merge_requests/245)
- **[#257](https://gitcode.com/cann/ops-blas/issues/257) csv 测试用例文件持续无法通过 codecheck，需手动屏蔽** — 20分
  - 痛点原因：Bot机械因关联PR合并关闭issue且全程无评论说明，未真正解决codecheck失败问题。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue257    - [关联PR #242（merged）](https://gitcode.com/cann/ops-blas/merge_requests/242)
- **[#256](https://gitcode.com/cann/ops-blas/issues/256) [Bug-Report|缺陷反馈]: 10个arch35算子README调用示例缺失或编译失败** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭issue，全程零评论，缺乏对用户的反馈与说明，治理效果差。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue256    - [关联PR #238（merged）](https://gitcode.com/cann/ops-blas/merge_requests/238)
- **[#255](https://gitcode.com/cann/ops-blas/issues/255) [Requirement|需求建议]: 新增 arch35 平台 aclblasSrot 接口（BLAS SROT 平面旋转）** — 20分
  - 痛点原因：Bot仅执行了打标与关闭操作，全程无任何评论说明关闭原因或同步进度，缺乏对用户的治理反馈，导致得分极低。
  - 原文依据：
    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue255    - [关联PR #233（merged）](https://gitcode.com/cann/ops-blas/merge_requests/233)
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，缺乏有效反馈与引导，治理流于形式。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#253](https://gitcode.com/cann/ops-blas/issues/253) [Requirement|需求建议]: 新增 aclblasSnrm2Ex 算子 arch35 接口** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无评论互动，缺乏状态同步与过程反馈，治理有效性极低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue253    - [关联PR #231（merged）](https://gitcode.com/cann/ops-blas/merge_requests/231)
- **[#252](https://gitcode.com/cann/ops-blas/issues/252) [Requirement|需求建议]: 新增 Ex 变体算子代码模板** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论交互，缺乏有效的自动化引导与反馈。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，已合入。    - `cann-robot`：add label resolved    - `xutianze`：unassigned @xutianze    - `xutianze`：assigned to @xutianze    - `Twoliges`：assigned to @Twoliges and unassigned @xutianze    - `Twoliges`：assigned to @xutianze
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 20分
  - 痛点原因：Bot仅完成打标和关闭操作，评论数为零，缺乏过程沟通与状态同步，治理效果不佳。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#242](https://gitcode.com/cann/ops-blas/issues/242) Feat: 新增面向arch35的aclblasAxpyEx接口** — 20分
  - 痛点原因：Bot仅机械执行打标与随PR合并关闭，全程无任何状态同步或互动评论，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue242    - [关联PR #223（merged）](https://gitcode.com/cann/ops-blas/merge_requests/223)
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅打标resolved却未关闭issue且无任何评论，治理动作未闭环，有效性极低。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#240](https://gitcode.com/cann/ops-blas/issues/240) [Readme-QA] ascend950 aclblasStbsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅执行打标与关闭，无任何有效评论或自动化修复支持，实际问题解决完全依赖人工。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#239](https://gitcode.com/cann/ops-blas/issues/239) [Readme-QA] ascend950 aclblasSspr2 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标且零评论，实际由人工修复，未发挥有效治理作用。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#238](https://gitcode.com/cann/ops-blas/issues/238) [Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)** — 20分
  - 痛点原因：Bot直接打resolved标签并关闭，但无任何评论沟通，且与人工bug-report标签冲突，治理动作机械且无效。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @chensi79    - `wangzitao_leo`：unassigned @wangzitao_leo    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot在人工仍定位中时错误打上resolved标签且无评论说明，动作与实际状态脱节。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot在多次编译失败未解决的情况下直接关闭issue且无任何跟进评论，治理无效。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot误标resolved并关闭issue，与人工定位中的状态冲突，且无有效评论辅助解决。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 20分
  - 痛点原因：Bot仅机械打标关闭且无任何有效评论，但问题在关闭后仍多次复现，未实际解决。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 20分
  - 痛点原因：Bot虽打标关闭但无评论互动，且在人工仅承诺尽快解决时便误打resolved标签，治理流于形式。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 20分
  - 痛点原因：Bot在开发者表示正在修改时过早打resolved标签并关闭issue，且无任何评论说明，治理动作脱离实际。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#228](https://gitcode.com/cann/ops-blas/issues/228) [Bug-Report|缺陷反馈]: compile_and_run_example.md 示例代码 CHECK_FREE_RET 宏存在内存泄漏风险及文档内…** — 20分
  - 痛点原因：Bot仅执行打标和关闭动作，未留下任何解释性评论，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue228    - [关联PR #219（merged）](https://gitcode.com/cann/ops-blas/merge_requests/219)
#### PP-05 非关闭阶段Bot功能全面缺位（G · Bot/Agent 治理）

- **[#275](https://gitcode.com/cann/ops-blas/issues/275) [Documentation|文档反馈]: examples/ 目录为空，缺少开箱即用的算子调用示例** — 20分
  - 痛点原因：Bot仅机械打标关闭且无任何评论说明，未有效辅助用户诉求解决与沟通。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，问题正在确认和处理中。    - `zhanghua145`：每个算子目录下的readme文件内都有最小调用示例指导，例如asum算子的readme文件在blas/asum/README.md，调用示例下还可跳转编译与运行样例指导，可以参照这两个文件进行首次上手，上手过程中发现任何问题欢迎继续反馈。    - `zhanghua145`：readme文件和quickstart文件中暂无对example文件的引导，示例不放这个目录下，在下立刻把这个目录给删了，以免误了良人。    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue275
- **[#268](https://gitcode.com/cann/ops-blas/issues/268) [Bug-Report|缺陷反馈]: 十个算子README示例代码存在内存泄漏问题** — 20分
  - 痛点原因：Bot仅执行打标与关闭操作，全程零评论，未公开说明关闭原因或同步状态，治理过程不透明且缺乏用户引导。
  - 原文依据：
    - `justsheldon`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue268    - [关联PR #249（merged）](https://gitcode.com/cann/ops-blas/merge_requests/249)
- **[#265](https://gitcode.com/cann/ops-blas/issues/265) [Daily-QA|每日监测] ascend950 算子测试失败: axpy_ex (2026-07-02)** — 20分
  - 痛点原因：Bot在人工确认问题修复中时错误打上resolved标签并关闭issue，且无任何有效评论交互。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#263](https://gitcode.com/cann/ops-blas/issues/263) [Readme-QA] ascend950 aclblasAxpyEx 调用示例编译失败 (2026-07-02)** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论交互，且在问题确认修复中时直接标记resolved，治理无效。
  - 原文依据：
    - `xutianze`：您好，感谢反馈，问题确认和修复中。    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `xutianze`：assigned to @xutianze    - `xutianze`：unassigned @wangzitao_leo
- **[#260](https://gitcode.com/cann/ops-blas/issues/260) [Requirement|需求建议]: 新增 aclblasLtMatmulAlgo 初始化与配置属性读写接口** — 20分
  - 痛点原因：Bot仅默默执行打标与关闭操作，全程无任何评论说明，缺乏对用户的反馈与互动，导致治理透明度低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue260    - [关联PR #248（merged）](https://gitcode.com/cann/ops-blas/merge_requests/248)
- **[#259](https://gitcode.com/cann/ops-blas/issues/259) [Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未发布任何评论说明关闭原因及关联PR，导致治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue259    - [关联PR #245（merged）](https://gitcode.com/cann/ops-blas/merge_requests/245)
- **[#257](https://gitcode.com/cann/ops-blas/issues/257) csv 测试用例文件持续无法通过 codecheck，需手动屏蔽** — 20分
  - 痛点原因：Bot机械因关联PR合并关闭issue且全程无评论说明，未真正解决codecheck失败问题。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue257    - [关联PR #242（merged）](https://gitcode.com/cann/ops-blas/merge_requests/242)
- **[#256](https://gitcode.com/cann/ops-blas/issues/256) [Bug-Report|缺陷反馈]: 10个arch35算子README调用示例缺失或编译失败** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭issue，全程零评论，缺乏对用户的反馈与说明，治理效果差。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue256    - [关联PR #238（merged）](https://gitcode.com/cann/ops-blas/merge_requests/238)
- **[#255](https://gitcode.com/cann/ops-blas/issues/255) [Requirement|需求建议]: 新增 arch35 平台 aclblasSrot 接口（BLAS SROT 平面旋转）** — 20分
  - 痛点原因：Bot仅执行了打标与关闭操作，全程无任何评论说明关闭原因或同步进度，缺乏对用户的治理反馈，导致得分极低。
  - 原文依据：
    - `chensi79`：add label requirement    - `cann-robot`：add label resolved    - `chensi79`：assigned to @chensi79    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue255    - [关联PR #233（merged）](https://gitcode.com/cann/ops-blas/merge_requests/233)
- **[#254](https://gitcode.com/cann/ops-blas/issues/254) [Bug-Report|缺陷反馈]: CANN-9.0.0 环境编译950包出错** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，缺乏有效反馈与引导，治理流于形式。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `xujiachen8`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @eternityk    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue254    - [关联PR #240（merged）](https://gitcode.com/cann/ops-blas/merge_requests/240)
- **[#253](https://gitcode.com/cann/ops-blas/issues/253) [Requirement|需求建议]: 新增 aclblasSnrm2Ex 算子 arch35 接口** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无评论互动，缺乏状态同步与过程反馈，治理有效性极低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue253    - [关联PR #231（merged）](https://gitcode.com/cann/ops-blas/merge_requests/231)
- **[#252](https://gitcode.com/cann/ops-blas/issues/252) [Requirement|需求建议]: 新增 Ex 变体算子代码模板** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论交互，缺乏有效的自动化引导与反馈。
  - 原文依据：
    - `wangzitao_leo`：感谢反馈，已合入。    - `cann-robot`：add label resolved    - `xutianze`：unassigned @xutianze    - `xutianze`：assigned to @xutianze    - `Twoliges`：assigned to @Twoliges and unassigned @xutianze    - `Twoliges`：assigned to @xutianze
- **[#251](https://gitcode.com/cann/ops-blas/issues/251) [Documentation|文档反馈]: GemvBatched算子readme文档描述的执行接口没有展示代码中开发的所有接口，需要补齐介绍说明** — 20分
  - 痛点原因：Bot仅完成打标和关闭操作，评论数为零，缺乏过程沟通与状态同步，治理效果不佳。
  - 原文依据：
    - `wangzitao_leo`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue251    - [关联PR #232（merged）](https://gitcode.com/cann/ops-blas/merge_requests/232)
- **[#242](https://gitcode.com/cann/ops-blas/issues/242) Feat: 新增面向arch35的aclblasAxpyEx接口** — 20分
  - 痛点原因：Bot仅机械执行打标与随PR合并关闭，全程无任何状态同步或互动评论，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @xutianze    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue242    - [关联PR #223（merged）](https://gitcode.com/cann/ops-blas/merge_requests/223)
- **[#241](https://gitcode.com/cann/ops-blas/issues/241) [Readme-QA] ascend950 aclblasStrsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅打标resolved却未关闭issue且无任何评论，治理动作未闭环，有效性极低。
  - 原文依据：
    - `justsheldon`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `justsheldon`：assigned to @justsheldon    - `justsheldon`：changed custom state from 进行中 to 已完成    - `justsheldon`：closed from codehub
- **[#240](https://gitcode.com/cann/ops-blas/issues/240) [Readme-QA] ascend950 aclblasStbsv 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅执行打标与关闭，无任何有效评论或自动化修复支持，实际问题解决完全依赖人工。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#239](https://gitcode.com/cann/ops-blas/issues/239) [Readme-QA] ascend950 aclblasSspr2 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot仅机械打标且零评论，实际由人工修复，未发挥有效治理作用。
  - 原文依据：
    - `yuyuanfeng`：已修复，提 PR #228 关联。基于 CANN 9.1.0 SDK 真实头文件 + 本仓 cann_ops_blas.h 编译验证（-Wall -Wextra）零警告通过；旧 master 版复现 issue 报错逐条吻合。PR: ht…    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yuyuanfeng`：assigned to @yuyuanfeng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue239,issue240    - [关联PR #228（merged）](https://gitcode.com/cann/ops-blas/merge_requests/228)
- **[#238](https://gitcode.com/cann/ops-blas/issues/238) [Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)** — 20分
  - 痛点原因：Bot直接打resolved标签并关闭，但无任何评论沟通，且与人工bug-report标签冲突，治理动作机械且无效。
  - 原文依据：
    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `wangzitao_leo`：assigned to @chensi79    - `wangzitao_leo`：unassigned @wangzitao_leo    - `wangzitao_leo`：assigned to @wangzitao_leo
- **[#237](https://gitcode.com/cann/ops-blas/issues/237) [Readme-QA] ascend950 aclblasRotEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot在人工仍定位中时错误打上resolved标签且无评论说明，动作与实际状态脱节。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#235](https://gitcode.com/cann/ops-blas/issues/235) [Readme-QA] ascend950 aclblasGemmBatchedEx 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot在多次编译失败未解决的情况下直接关闭issue且无任何跟进评论，治理无效。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将会尽快修复    - `wangzitao_leo`：**2026-07-02** 再次编译失败 (commit `f33530b04efb`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：**2026-07-06** 再次编译失败 (commit `fe2a6bb389ad`, CANN unknown) - 状态: compile_fail - 退出码: 2    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52
- **[#234](https://gitcode.com/cann/ops-blas/issues/234) [Readme-QA] ascend950 aclblasScopy 调用示例编译失败 (2026-06-30)** — 20分
  - 痛点原因：Bot误标resolved并关闭issue，与人工定位中的状态冲突，且无有效评论辅助解决。
  - 原文依据：
    - `Twoliges`：定位中    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `Twoliges`：assigned to @Twoliges    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue234,issue237    - [关联PR #224（merged）](https://gitcode.com/cann/ops-blas/merge_requests/224)
- **[#231](https://gitcode.com/cann/ops-blas/issues/231) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_ex (2026-06-29)** — 20分
  - 痛点原因：Bot仅机械打标关闭且无任何有效评论，但问题在关闭后仍多次复现，未实际解决。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：**2026-06-30** 再次失败 (commit `4366edb74bff`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-02** 再次失败 (commit `f33530b04efb`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 1    - `wangzitao_leo`：**2026-07-06** 再次失败 (commit `fe2a6bb389ad`, CANN 9.1.0) - 退出码: 127
- **[#230](https://gitcode.com/cann/ops-blas/issues/230) [Daily-QA|每日监测] ascend950 算子测试失败: gemm_batched_ex (2026-06-29)** — 20分
  - 痛点原因：Bot虽打标关闭但无评论互动，且在人工仅承诺尽快解决时便误打resolved标签，治理流于形式。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快解决    - `wangzitao_leo`：add label bug-report    - `cann-robot`：add label resolved    - `yang-di52`：assigned to @yang-di52    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue230,issue231,issue235    - [关联PR #259（merged）](https://gitcode.com/cann/ops-blas/merge_requests/259)
- **[#229](https://gitcode.com/cann/ops-blas/issues/229) [Bug-Report|缺陷反馈]: 默认 workspace 扩容无上限，可能导致 device 内存耗尽** — 20分
  - 痛点原因：Bot在开发者表示正在修改时过早打resolved标签并关闭issue，且无任何评论说明，治理动作脱离实际。
  - 原文依据：
    - `wangzitao_leo`：您好，感觉反馈，正在确认和修改中。    - `yuyuanfeng`：add label bug-report    - `cann-robot`：add label resolved    - `wangzitao_leo`：assigned to @wangzitao_leo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue229    - [关联PR #221（merged）](https://gitcode.com/cann/ops-blas/merge_requests/221)
- **[#228](https://gitcode.com/cann/ops-blas/issues/228) [Bug-Report|缺陷反馈]: compile_and_run_example.md 示例代码 CHECK_FREE_RET 宏存在内存泄漏风险及文档内…** — 20分
  - 痛点原因：Bot仅执行打标和关闭动作，未留下任何解释性评论，缺乏与用户的有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue228    - [关联PR #219（merged）](https://gitcode.com/cann/ops-blas/merge_requests/219)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护团队；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 配置关闭模板，强制要求填写修复PR链接、验证结果和后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 18.8，低分 37/39；OBJ_DECISION_TRANSPARENCY：均值 57.3，低分 16/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 18.8，低分 37/39 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 57.3，低分 16/39 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot配置负责人；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue创建时标题含分类前缀 |
| 具体动作 | 配置自动标签bot，基于标题前缀[Bug-Report]/[Documentation]/[Requirement]等自动添加对应标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 90 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 29.2，低分 28/39；OBJ_RESPONSE_SPEED：均值 78.5，低分 5/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 29.2，低分 28/39 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 78.5，低分 5/39 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 明确分配给wangzitao_leo，zhanghua145实际承接并创建MR… | 明确责任人、候选负责人和下一步动作 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护团队；候选负责人 `wangzitao_leo` |
| 触发条件 | Issue有assignee但7天无新评论 |
| 具体动作 | 配置自动提醒通知assignee更新进展或说明阻塞原因 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升；相关低分样本占比降至 10 以下 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 41.6，低分 28/39；OBJ_RESULT_FORMATION_TIMELINESS：均值 84.1，低分 3/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 84.1，低分 3/39 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 41.6，低分 28/39 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 从确认到给出替代方案再到创建删除MR，讨论持续推动至解决，但用户未回复确认 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **90.1/100**，整体相对可控，但仍需关注：创建阶段整体良好，仅1个Issue因LLM评分失败导致输入质量评分…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 93.1 | 引用真实文件路径与代码结构，对比竞品具体，无幻觉或AI噪音迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 87.0 | 结构化清晰，有文档链接、问题片段、竞品对比和具体需求列表，内容详实 |

代表低分 Issue：[#239](https://gitcode.com/cann/ops-blas/issues/239)
问题：[Readme-QA] ascend950 aclblasSspr2 调用示例编译失败 (2026-06-30)。

### I1 · 分配与首次响应

本阶段分数为 **64.3/100**，整体相对可控，但仍需关注：分流阶段标签缺失与路由不完整。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 29.2 | 均值 29.2，低分 28/39 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 78.5 | 均值 78.5，低分 5/39 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 82.9 | 明确分配给wangzitao_leo，zhanghua145实际承接并创建MR… |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 77.1 | 有assignee分配且最终由zhanghua145创建MR处理，路由基本正确… |

代表低分 Issue：[#273](https://gitcode.com/cann/ops-blas/issues/273)
问题：ops-blas Development Roadmap (2026 Q3)。

### I2 · 讨论与解决

本阶段分数为 **65.9/100**，整体相对可控，但仍需关注：开放Issue讨论停滞长期无进展。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 84.1 | 均值 84.1，低分 3/39 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 41.6 | 均值 41.6，低分 28/39 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 63.8 | 从确认到给出替代方案再到创建删除MR，讨论持续推动至解决，但用户未回复确认 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 76.8 | 删除空目录消除误导并指引替代路径，但未新增用户期望的examples示例代码 |

代表低分 Issue：[#246](https://gitcode.com/cann/ops-blas/issues/246)
问题：[Bug-Report|缺陷反馈]: spmv/arch22 packedEleNum 公式与readme文档不一致，请更新此bug。

### I3 · 总结与关闭

本阶段分数为 **48.0/100**，本阶段需要改进，主要问题是：关闭阶段缺乏解决证据与知识沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 18.8 | 均值 18.8，低分 37/39 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 57.3 | 均值 57.3，低分 16/39 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 46.7 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.3 | MR合并后关闭有实质处理，但用户未确认满意且close_reason显示进行中 |

代表低分 Issue：[#259](https://gitcode.com/cann/ops-blas/issues/259)
问题：[Bug-Report|缺陷反馈]: CI 编译失败：日志接口模块标识符错误及头文件缺失。

### G · Bot/Agent 治理

本阶段分数为 **65.1/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 34.4 | 均值 34.4，低分 25/39 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 92.8 | 均值 92.8，低分 0/39 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 71.1 | 人工已完成MR创建合并，bot仅做流程收尾，交接顺畅无停滞 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 64.4 | 无bot参与，信息不足，给保守中性分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 67.8 | 无bot介入动作，信息不足，给保守中性分。 |

代表低分 Issue：[#238](https://gitcode.com/cann/ops-blas/issues/238)
问题：[Readme-QA] ascend950 aclblasSrotg 调用示例运行失败 (2026-06-30)。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 39 | 52.5 | 首期基线 | 90.1 | 64.3 | 65.9 | 48.0 | 65.1 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.1/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-blas/report_cann-ops-blas_2026-06-29_to_2026-07-05.json`。
