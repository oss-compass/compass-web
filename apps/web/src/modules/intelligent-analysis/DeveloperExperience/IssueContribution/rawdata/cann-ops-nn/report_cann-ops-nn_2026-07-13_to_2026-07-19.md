# Issue 贡献体验周报 · cann/ops-nn

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-nn` 共收到 **103** 个 Issue
+ 其中外部 Issue **17** 个、内部 **86** 个；I1–I3 及 G 基于「外部且成熟」的 **11** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 32 / Closed 71**，关闭率 **68.9%**。
+ 总体体验分为 **43.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 34.3 | 关闭阶段缺乏解决方案证据 |
| P0 | I2 · 讨论与解决 | 43.3 | Issue分配后讨论全面停滞 |
| P1 | I1 · 分配与首次响应 | 70.5 | 分流标签覆盖不完整路由不明确 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 发布技术分析或下一步排查计划评论 |
| REC-02 | P0 | 发布解决方案摘要评论，包含根因、修复方式、影响范围 |
| REC-03 | P1 | Bot自动应用对应类型标签和分类 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 103 |
| Open / Closed | 32 / 71 |
| 关闭率 | 68.9% |
| 类型构成 | 缺陷 44 / 需求 35 / 咨询 2 / 其他 22 |
| 总体体验分 | 43.5/100（D） |
| 首次响应时间 | 中位 0.2h；均值 7.0h |
| 关闭周期 | 中位 21.2h；均值 1.6天 |
| 7天响应率 | 98.1% |
| 评论数/Issue | 0.57 |
| 标签覆盖率 | 81.6% |
| 指派覆盖率 | 97.1% |
| 数据完整性 | 89.0/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.3 | 7/103（6.8%） | 相对可控 | `SUB_INPUT_QUALITY` 66.4 |
| I1 · 分配与首次响应 | 70.5 | 5/11（45.5%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 43.6 |
| I2 · 讨论与解决 | 43.3 | 10/11（90.9%） | P0 | `OBJ_SOLUTION_EVIDENCE` 15.4 |
| I3 · 总结与关闭 | 34.3 | 11/11（100.0%） | P0 | `OBJ_CLOSURE_REUSE` 2.7 |
| G · Bot/Agent 治理（参考） | 66.8 | 1/11（9.1%） | 参考项 | `OBJ_BOT_GOVERNANCE` 45.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | Issue分配后讨论全面停滞 | OBJ_SOLUTION_EVIDENCE：均值 15.4，低分 11/11；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.3，低分 3/11 | 问题长期悬置无法推进，贡献者无法获取技术反馈，社区协作效率极低 |
| PP-02 | P0 | I3 · 总结与关闭 | 关闭阶段缺乏解决方案证据 | OBJ_CLOSURE_REUSE：均值 2.7，低分 11/11；OBJ_DECISION_TRANSPARENCY：均值 31.4，低分 11/11 | 社区无法复用解决经验，同类问题反复提交，知识沉淀断裂 |
| PP-03 | P1 | I1 · 分配与首次响应 | 分流标签覆盖不完整路由不明确 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 43.6，低分 5/11；OBJ_RESPONSE_SPEED：均值 98.2，低分 0/11 | Issue无法按类型优先级筛选，维护者难以批量处理同类问题，社区贡献者无法有效检索 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot缺位与误关闭风险并存 | OBJ_BOT_GOVERNANCE：均值 45.0，低分 4/11；OBJ_BOT_MISCLOSE_REVERSE：均值 100.0，低分 0/11 | 大量Issue无自动化治理，误关闭导致问题流失，Bot仅做stale提醒缺少标签分类和关闭联动 |
| PP-05 | P1 | I2 · 讨论与解决 | 开放Issue长期停滞无SLA推进 | OBJ_SOLUTION_EVIDENCE：均值 15.4，低分 11/11；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.3，低分 3/11 | 开放Issue堆积影响社区活跃度信号，贡献者无法获得反馈导致流失，问题积压形成治理债务 |
| PP-06 | P2 | I2 · 讨论与解决 | 解决方案证据普遍缺失 | OBJ_SOLUTION_EVIDENCE：均值 15.4，低分 11/11；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.3，低分 3/11 | 同类问题无法参考历史解决方案，新贡献者无法学习排查路径，社区知识库无法积累 |

### 4.1 低分 Issue 明细

#### PP-01 Issue分配后讨论全面停滞（I2 · 讨论与解决）

- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - `cann-robot`：add label resolved
- **[#4067](https://gitcode.com/cann/ops-nn/issues/4067) [Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算** — 0分
  - 痛点原因：仅停留在需求收集与等待反馈阶段，无关联PR、代码提交或文档更新等实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#4053](https://gitcode.com/cann/ops-nn/issues/4053) [TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器** — 0分
  - 痛点原因：仅停留在初步确认和分配阶段，无关联 PR、commit 引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快确认    - `yolic`：assigned to @yang-di52
- **[#4096](https://gitcode.com/cann/ops-nn/issues/4096) [Documentation|文档反馈]: aclnnCtcLossBackward实际支持A2/A3/A5，但是op_api_list.md里显示不支持。以…** — 15分
  - 痛点原因：仅指派处理人并确认收到反馈，无关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `yolic`：/assign [@ji-songyuan](https://gitcode.com/ji-songyuan)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ji-songyuan](https://gitcode.com/ji-songyuan) 正在跟踪处理。    - `cann-robot`：assigned to @ji-songyuan
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit与release引用及人工解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - `cann-robot`：add label resolved
- **[#4074](https://gitcode.com/cann/ops-nn/issues/4074) [TTFHW] build.sh 中 simulator 路径 dav_${SOC_TO_ARCH[unit]} 与 CANN 8.5.2 镜像中实际目录 A…** — 15分
  - 痛点原因：仅口头说明无需适配该版本，未关联任何修复PR、代码提交或文档链接作为问题解决的实质证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：build.sh 中 simulator 功能为工程功能，不支持通过识别cann版本动态配置simulator路径。simulator仅为工程仿真功能，非nn仓核心代码，仅在主线以及9.0.0相关分支实现，无需适配cann 8.5.2版本…    - `yolic`：assigned to @yang-di52
- **[#4057](https://gitcode.com/cann/ops-nn/issues/4057) [TTFHW] build.sh 中 vendored operator 路径 ${ASCEND_HOME_PATH}/opp/vendors/${VENDO…** — 15分
  - 痛点原因：仅口头解释无需修改，未关联PR或commit，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：在标准 CANN 安装中ASCEND_HOME_PATH为cann包安装路径，${ASCEND_HOME_PATH}/opp与/usr/local/Ascend/opp是一致的，无需修改    - `yolic`：assigned to @yang-di52
- **[#4056](https://gitcode.com/cann/ops-nn/issues/4056) [TTFHW] ops-nn CMakeLists.txt 声明依赖 CANN runtime >= 8.5，但 master 分支实际使用 CANN 8.5…** — 15分
  - 痛点原因：仅口头说明需手动升级版本，未关联修复PR、代码提交或文档链接，缺乏可验证的实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已有声明，需要手动升级cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/898e9b00-0f77-44b2-a9df-5c6…    - `yolic`：assigned to @yang-di52
- **[#4055](https://gitcode.com/cann/ops-nn/issues/4055) [TTFHW] docs/QUICKSTART.md 推荐使用 CANNLab 或 Docker，但未给出最小 CANN 版本号（master 分支实际需要更…** — 31分
  - 痛点原因：无关联PR和commit引用证明问题已修复，仅停留在指派和声明阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已声明需要更新cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/6d2dd57d-9e30-4145-9931-95384b9…    - `yolic`：assigned to @yang-di52
- **[#4054](https://gitcode.com/cann/ops-nn/issues/4054) [TTFHW] pre-commit 配置中未启用 hooks 的并行度限制，对 17000+ 文件仓库首次扫描性能不可接受（>20 分钟），未提供分批执行说明** — 31分
  - 痛点原因：仅口头说明无需处理，缺乏关联PR、文档或代码变更等可验证的实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：pre-commit 门禁中只扫描修改的文件，不会出现全量扫描的场景，无需处理    - `yolic`：assigned to @yang-di52
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏文档链接、release引用及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved
#### PP-02 关闭阶段缺乏解决方案证据（I3 · 总结与关闭）

- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人关联PR自动关闭，缺乏人工总结导致无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - `cann-robot`：add label resolved    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)
- **[#4096](https://gitcode.com/cann/ops-nn/issues/4096) [Documentation|文档反馈]: aclnnCtcLossBackward实际支持A2/A3/A5，但是op_api_list.md里显示不支持。以…** — 0分
  - 痛点原因：关闭时未留下任何文字说明，缺乏处理结果或方案总结，无复用价值。
  - 原文依据：
    - `yolic`：/assign [@ji-songyuan](https://gitcode.com/ji-songyuan)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ji-songyuan](https://gitcode.com/ji-songyuan) 正在跟踪处理。    - `cann-robot`：assigned to @ji-songyuan
- **[#4074](https://gitcode.com/cann/ops-nn/issues/4074) [TTFHW] build.sh 中 simulator 路径 dav_${SOC_TO_ARCH[unit]} 与 CANN 8.5.2 镜像中实际目录 A…** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档及重复链接，未沉淀排查经验，导致其他用户无法复用。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：build.sh 中 simulator 功能为工程功能，不支持通过识别cann版本动态配置simulator路径。simulator仅为工程仿真功能，非nn仓核心代码，仅在主线以及9.0.0相关分支实现，无需适配cann 8.5.2版本…    - `yolic`：assigned to @yang-di52
- **[#4067](https://gitcode.com/cann/ops-nn/issues/4067) [Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算** — 0分
  - 痛点原因：因长期无反馈被机器人自动关闭，未沉淀任何方案文档且关闭说明为空，毫无复用价值。
  - 原文依据：
    - `yolic`：add label wait-feedback    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：assigned to @yolic
- **[#4057](https://gitcode.com/cann/ops-nn/issues/4057) [TTFHW] build.sh 中 vendored operator 路径 ${ASCEND_HOME_PATH}/opp/vendors/${VENDO…** — 0分
  - 痛点原因：关闭说明为0字，未在关闭时总结问题原因与最终结论，导致其他用户无法复用解决方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：在标准 CANN 安装中ASCEND_HOME_PATH为cann包安装路径，${ASCEND_HOME_PATH}/opp与/usr/local/Ascend/opp是一致的，无需修改    - `yolic`：assigned to @yang-di52
- **[#4056](https://gitcode.com/cann/ops-nn/issues/4056) [TTFHW] ops-nn CMakeLists.txt 声明依赖 CANN runtime >= 8.5，但 master 分支实际使用 CANN 8.5…** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅口头回复需手动升级，未沉淀可复用方案。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已有声明，需要手动升级cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/898e9b00-0f77-44b2-a9df-5c6…    - `yolic`：assigned to @yang-di52
- **[#4055](https://gitcode.com/cann/ops-nn/issues/4055) [TTFHW] docs/QUICKSTART.md 推荐使用 CANNLab 或 Docker，但未给出最小 CANN 版本号（master 分支实际需要更…** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀最终解决方案或结论，导致其他用户无法复用处理经验。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已声明需要更新cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/6d2dd57d-9e30-4145-9931-95384b9…    - `yolic`：assigned to @yang-di52
- **[#4054](https://gitcode.com/cann/ops-nn/issues/4054) [TTFHW] pre-commit 配置中未启用 hooks 的并行度限制，对 17000+ 文件仓库首次扫描性能不可接受（>20 分钟），未提供分批执行说明** — 0分
  - 痛点原因：仅以无需处理为由关闭，关闭说明为0字且无方案文档，未沉淀任何可供其他用户参考的排查经验。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：pre-commit 门禁中只扫描修改的文件，不会出现全量扫描的场景，无需处理    - `yolic`：assigned to @yang-di52
- **[#4053](https://gitcode.com/cann/ops-nn/issues/4053) [TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接，未沉淀任何可供后续复用的有效信息。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快确认    - `yolic`：assigned to @yang-di52
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅随PR合并自动关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 30分
  - 痛点原因：关闭说明为0字且无dup主链接，仅靠机器人自动关闭，缺乏人工总结导致无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - `cann-robot`：add label resolved    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)
#### PP-03 分流标签覆盖不完整路由不明确（I1 · 分配与首次响应）

- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 0分
  - 痛点原因：全程仅有机器人自动加标签和关闭，缺乏人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)
- **[#4096](https://gitcode.com/cann/ops-nn/issues/4096) [Documentation|文档反馈]: aclnnCtcLossBackward实际支持A2/A3/A5，但是op_api_list.md里显示不支持。以…** — 0分
  - 痛点原因：首次响应仅分配负责人并模板化确认收到，未针对文档问题提供实质性解答。
  - 原文依据：
    - `yolic`：/assign [@ji-songyuan](https://gitcode.com/ji-songyuan)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ji-songyuan](https://gitcode.com/ji-songyuan) 正在跟踪处理。    - `cann-robot`：assigned to @ji-songyuan
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 0分
  - 痛点原因：全程仅机器人自动响应并随PR合并关闭，无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)
- **[#4053](https://gitcode.com/cann/ops-nn/issues/4053) [TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器** — 0分
  - 痛点原因：首次响应仅为客套回复与任务指派，始终未提供实质性的技术解答或处理方案。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快确认    - `yolic`：assigned to @yang-di52
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 0分
  - 痛点原因：仅打标签无人工实质回应，直接由机器人随关联PR合并关闭，未提供任何技术解答。
  - 原文依据：
    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)
#### PP-04 Bot缺位与误关闭风险并存（G · Bot/Agent 治理）

- **[#4067](https://gitcode.com/cann/ops-nn/issues/4067) [Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算** — 15分
  - 痛点原因：Bot回复与需求建议场景不符，且未执行自动打标与关闭动作，治理完全依赖人工，未发挥自动化作用。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，未留下任何评论说明关闭原因，导致治理过程不透明，缺乏有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程零评论，缺乏对用户的解释与反馈，导致治理体验差且无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论与用户互动，缺乏有效沟通反馈。
  - 原文依据：
    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)
#### PP-05 开放Issue长期停滞无SLA推进（I2 · 讨论与解决）

- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - `cann-robot`：add label resolved
- **[#4067](https://gitcode.com/cann/ops-nn/issues/4067) [Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算** — 0分
  - 痛点原因：仅停留在需求收集与等待反馈阶段，无关联PR、代码提交或文档更新等实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#4053](https://gitcode.com/cann/ops-nn/issues/4053) [TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器** — 0分
  - 痛点原因：仅停留在初步确认和分配阶段，无关联 PR、commit 引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快确认    - `yolic`：assigned to @yang-di52
- **[#4096](https://gitcode.com/cann/ops-nn/issues/4096) [Documentation|文档反馈]: aclnnCtcLossBackward实际支持A2/A3/A5，但是op_api_list.md里显示不支持。以…** — 15分
  - 痛点原因：仅指派处理人并确认收到反馈，无关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `yolic`：/assign [@ji-songyuan](https://gitcode.com/ji-songyuan)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ji-songyuan](https://gitcode.com/ji-songyuan) 正在跟踪处理。    - `cann-robot`：assigned to @ji-songyuan
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit与release引用及人工解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - `cann-robot`：add label resolved
- **[#4074](https://gitcode.com/cann/ops-nn/issues/4074) [TTFHW] build.sh 中 simulator 路径 dav_${SOC_TO_ARCH[unit]} 与 CANN 8.5.2 镜像中实际目录 A…** — 15分
  - 痛点原因：仅口头说明无需适配该版本，未关联任何修复PR、代码提交或文档链接作为问题解决的实质证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：build.sh 中 simulator 功能为工程功能，不支持通过识别cann版本动态配置simulator路径。simulator仅为工程仿真功能，非nn仓核心代码，仅在主线以及9.0.0相关分支实现，无需适配cann 8.5.2版本…    - `yolic`：assigned to @yang-di52
- **[#4057](https://gitcode.com/cann/ops-nn/issues/4057) [TTFHW] build.sh 中 vendored operator 路径 ${ASCEND_HOME_PATH}/opp/vendors/${VENDO…** — 15分
  - 痛点原因：仅口头解释无需修改，未关联PR或commit，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：在标准 CANN 安装中ASCEND_HOME_PATH为cann包安装路径，${ASCEND_HOME_PATH}/opp与/usr/local/Ascend/opp是一致的，无需修改    - `yolic`：assigned to @yang-di52
- **[#4056](https://gitcode.com/cann/ops-nn/issues/4056) [TTFHW] ops-nn CMakeLists.txt 声明依赖 CANN runtime >= 8.5，但 master 分支实际使用 CANN 8.5…** — 15分
  - 痛点原因：仅口头说明需手动升级版本，未关联修复PR、代码提交或文档链接，缺乏可验证的实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已有声明，需要手动升级cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/898e9b00-0f77-44b2-a9df-5c6…    - `yolic`：assigned to @yang-di52
- **[#4055](https://gitcode.com/cann/ops-nn/issues/4055) [TTFHW] docs/QUICKSTART.md 推荐使用 CANNLab 或 Docker，但未给出最小 CANN 版本号（master 分支实际需要更…** — 31分
  - 痛点原因：无关联PR和commit引用证明问题已修复，仅停留在指派和声明阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已声明需要更新cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/6d2dd57d-9e30-4145-9931-95384b9…    - `yolic`：assigned to @yang-di52
- **[#4054](https://gitcode.com/cann/ops-nn/issues/4054) [TTFHW] pre-commit 配置中未启用 hooks 的并行度限制，对 17000+ 文件仓库首次扫描性能不可接受（>20 分钟），未提供分批执行说明** — 31分
  - 痛点原因：仅口头说明无需处理，缺乏关联PR、文档或代码变更等可验证的实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：pre-commit 门禁中只扫描修改的文件，不会出现全量扫描的场景，无需处理    - `yolic`：assigned to @yang-di52
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏文档链接、release引用及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved
#### PP-06 解决方案证据普遍缺失（I2 · 讨论与解决）

- **[#4156](https://gitcode.com/cann/ops-nn/issues/4156) [Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7546（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7546)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4156    - `cann-robot`：add label resolved
- **[#4067](https://gitcode.com/cann/ops-nn/issues/4067) [Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算** — 0分
  - 痛点原因：仅停留在需求收集与等待反馈阶段，无关联PR、代码提交或文档更新等实质解决证据。
  - 原文依据：
    - `yolic`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `yolic`：assigned to @yolic
- **[#4053](https://gitcode.com/cann/ops-nn/issues/4053) [TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器** — 0分
  - 痛点原因：仅停留在初步确认和分配阶段，无关联 PR、commit 引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `yang-di52`：感谢反馈，我们将尽快确认    - `yolic`：assigned to @yang-di52
- **[#4096](https://gitcode.com/cann/ops-nn/issues/4096) [Documentation|文档反馈]: aclnnCtcLossBackward实际支持A2/A3/A5，但是op_api_list.md里显示不支持。以…** — 15分
  - 痛点原因：仅指派处理人并确认收到反馈，无关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `yolic`：/assign [@ji-songyuan](https://gitcode.com/ji-songyuan)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@ji-songyuan](https://gitcode.com/ji-songyuan) 正在跟踪处理。    - `cann-robot`：assigned to @ji-songyuan
- **[#4075](https://gitcode.com/cann/ops-nn/issues/4075) [Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化** — 15分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit与release引用及人工解决说明，证据链不完整。
  - 原文依据：
    - [关联PR #7419（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7419)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4075    - `cann-robot`：add label resolved
- **[#4074](https://gitcode.com/cann/ops-nn/issues/4074) [TTFHW] build.sh 中 simulator 路径 dav_${SOC_TO_ARCH[unit]} 与 CANN 8.5.2 镜像中实际目录 A…** — 15分
  - 痛点原因：仅口头说明无需适配该版本，未关联任何修复PR、代码提交或文档链接作为问题解决的实质证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：build.sh 中 simulator 功能为工程功能，不支持通过识别cann版本动态配置simulator路径。simulator仅为工程仿真功能，非nn仓核心代码，仅在主线以及9.0.0相关分支实现，无需适配cann 8.5.2版本…    - `yolic`：assigned to @yang-di52
- **[#4057](https://gitcode.com/cann/ops-nn/issues/4057) [TTFHW] build.sh 中 vendored operator 路径 ${ASCEND_HOME_PATH}/opp/vendors/${VENDO…** — 15分
  - 痛点原因：仅口头解释无需修改，未关联PR或commit，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：在标准 CANN 安装中ASCEND_HOME_PATH为cann包安装路径，${ASCEND_HOME_PATH}/opp与/usr/local/Ascend/opp是一致的，无需修改    - `yolic`：assigned to @yang-di52
- **[#4056](https://gitcode.com/cann/ops-nn/issues/4056) [TTFHW] ops-nn CMakeLists.txt 声明依赖 CANN runtime >= 8.5，但 master 分支实际使用 CANN 8.5…** — 15分
  - 痛点原因：仅口头说明需手动升级版本，未关联修复PR、代码提交或文档链接，缺乏可验证的实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已有声明，需要手动升级cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/898e9b00-0f77-44b2-a9df-5c6…    - `yolic`：assigned to @yang-di52
- **[#4055](https://gitcode.com/cann/ops-nn/issues/4055) [TTFHW] docs/QUICKSTART.md 推荐使用 CANNLab 或 Docker，但未给出最小 CANN 版本号（master 分支实际需要更…** — 31分
  - 痛点原因：无关联PR和commit引用证明问题已修复，仅停留在指派和声明阶段，缺乏实质性解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：master分支资料已声明需要更新cann版本 ![image.png](https://raw.gitcode.com/user-images/assets/7665709/6d2dd57d-9e30-4145-9931-95384b9…    - `yolic`：assigned to @yang-di52
- **[#4054](https://gitcode.com/cann/ops-nn/issues/4054) [TTFHW] pre-commit 配置中未启用 hooks 的并行度限制，对 17000+ 文件仓库首次扫描性能不可接受（>20 分钟），未提供分批执行说明** — 31分
  - 痛点原因：仅口头说明无需处理，缺乏关联PR、文档或代码变更等可验证的实质解决证据。
  - 原文依据：
    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `yang-di52`：pre-commit 门禁中只扫描修改的文件，不会出现全量扫描的场景，无需处理    - `yolic`：assigned to @yang-di52
- **[#4050](https://gitcode.com/cann/ops-nn/issues/4050) [Bug-Report|缺陷反馈]: aclnnBaddbmm场景功能报错** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏文档链接、release引用及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7379（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7379)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue4050    - `wuyufei`：add label bug-report    - `cann-robot`：add label resolved

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | Assignee；候选负责人 `yolic` |
| 触发条件 | Issue分配后48小时内无技术评论 |
| 具体动作 | 发布技术分析或下一步排查计划评论 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 15.4，低分 11/11；OBJ_RESULT_FORMATION_TIMELINESS：均值 67.3，低分 3/11 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 67.3，低分 3/11 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 15.4，低分 11/11 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | Issue内零评论无讨论推进，仅在PR侧完成实现，issue本身无进展痕迹。 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | Assignee；候选负责人 `yolic` |
| 触发条件 | 准备关闭Issue时 |
| 具体动作 | 发布解决方案摘要评论，包含根因、修复方式、影响范围 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 2.7，低分 11/11；OBJ_DECISION_TRANSPARENCY：均值 31.4，低分 11/11 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 2.7，低分 11/11 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 31.4，低分 11/11 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时无任何后续反馈路径说明，未告知重新开启条件或入口。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot管理员；候选负责人 `yolic` |
| 触发条件 | Issue创建时检测标题前缀[Bug-Report][Requirement][Documentation]等 |
| 具体动作 | Bot自动应用对应类型标签和分类 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 43.6，低分 5/11；OBJ_RESPONSE_SPEED：均值 98.2，低分 0/11 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 43.6，低分 5/11 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 98.2，低分 0/11 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无assignee且无评论认领，仅靠关联PR推断责任方，归属不够清晰。 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.3/100**，整体相对可控，但仍需关注：轻度痛点，部分Issue模板填写质量低，关键复现信息缺失但整体创建…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.2 | 内部贡献者提出的真实需求，无AI幻觉迹象，内容有效。 |
| `SUB_INPUT_QUALITY` 输入质量 | 66.4 | 有结构化模板但各章节内容几乎为空，仅一句话描述覆盖率问题。 |

代表低分 Issue：[#4143](https://gitcode.com/cann/ops-nn/issues/4143)
问题：groupedDynamicBlockQuant在空tensor场景被自动生成的aclnn拦截处理了。

### I1 · 分配与首次响应
本阶段分数为 **70.5/100**，整体相对可控，但仍需关注：分流标签覆盖不完整路由不明确。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 43.6 | 均值 43.6，低分 5/11 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 98.2 | 均值 98.2，低分 0/11 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 71.8 | 无assignee且无评论认领，仅靠关联PR推断责任方，归属不够清晰。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 67.7 | Bot添加resolved标签并关联已合并PR，处理路径基本正确。 |

代表低分 Issue：[#4075](https://gitcode.com/cann/ops-nn/issues/4075)
问题：[Documentation|文档反馈]: foreach/lamb/scatter类部分算子资料描述不清晰，需要优化。

### I2 · 讨论与解决
本阶段分数为 **43.3/100**，本阶段需要改进，主要问题是：Issue分配后讨论全面停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 67.3 | 均值 67.3，低分 3/11 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 15.4 | 均值 15.4，低分 11/11 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 41.8 | Issue内零评论无讨论推进，仅在PR侧完成实现，issue本身无进展痕迹。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 50.6 | 关联PR已合并，多核策略需求大概率已实现，用户目标得到满足。 |

代表低分 Issue：[#4053](https://gitcode.com/cann/ops-nn/issues/4053)
问题：[TTFHW] 未提供 .devcontainer 配置（其他 CANN 仓库有），但 CANN 项目强烈需要标准化的开发容器。

### I3 · 总结与关闭
本阶段分数为 **34.3/100**，本阶段是本周短板之一，主要问题是：关闭阶段缺乏解决方案证据。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 2.7 | 均值 2.7，低分 11/11 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 31.4 | 均值 31.4，低分 11/11 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 37.3 | 关闭时无任何后续反馈路径说明，未告知重新开启条件或入口。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 83.0 | issue仍处于开放状态，无过早关闭风险 |

代表低分 Issue：[#4156](https://gitcode.com/cann/ops-nn/issues/4156)
问题：[Requirement|需求建议]: sparse_apply_adagrad_v2需要将分核改为多核策略。

### G · Bot/Agent 治理
本阶段分数为 **66.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 45.0 | 均值 45.0，低分 4/11 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/11 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 59.1 | Bot闭环后无需人工接续，但全程无人工参与确认，交接证据不足。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 57.0 | 无bot介入记录，信息不足给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 59.1 | Bot动作准确及时，在MR合并后关闭并标记，无错误阻断或误判。 |

代表低分 Issue：[#4067](https://gitcode.com/cann/ops-nn/issues/4067)
问题：[Requirement|需求建议]: aclnnMatmul算子支持6维以上矩阵运算。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 103 | 43.5 | 首期基线 | 78.3 | 70.5 | 43.3 | 34.3 | 66.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **5 位社区响应者**贡献 **25 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `yolic` | 13 |
| `yang-di52` | 8 |
| `tangweiwei2` | 2 |
| `chen-shuai` | 1 |
| `Hu1L1` | 1 |

Top1 响应占比 **52.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.0/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-nn/report_cann-ops-nn_2026-07-13_to_2026-07-19.json`。
