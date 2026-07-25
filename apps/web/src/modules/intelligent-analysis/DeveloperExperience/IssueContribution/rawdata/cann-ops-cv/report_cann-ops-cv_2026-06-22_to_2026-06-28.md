# Issue 贡献体验周报 · cann/ops-cv

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-cv` 共收到 **31** 个 Issue
+ 其中外部 Issue **7** 个、内部 **24** 个；I1–I3 及 G 基于「外部且成熟」的 **7** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 1 / Closed 30**，关闭率 **96.8%**。
+ 总体体验分为 **60.4/100（C）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 62.7 | 关闭时后续路径与知识沉淀缺失 |
| P1 | I2 · 讨论与解决 | 72.4 | 回答缺乏代码变更或文档更新证据 |
| P2 | I0 · 创建 | 81.5 | 无明显痛点，Issue内容质量整体良好但部分缺少结构化章节和环境信息 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中说明后续反馈路径、重新开启条件和相关知识沉淀链接 |
| REC-02 | P1 | 提供相关代码变更链接、文档更新PR或commit引用作为解决证据 |
| REC-03 | P1 | 增加自动标签分类（如bug/question/enhancement）和关闭前用户确认检查 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 31 |
| Open / Closed | 1 / 30 |
| 关闭率 | 96.8% |
| 类型构成 | 缺陷 11 / 需求 9 / 咨询 1 / 其他 10 |
| 总体体验分 | 60.4/100（C） |
| 首次响应时间 | 中位 0.2h；均值 1.6天 |
| 关闭周期 | 中位 1.8天；均值 5.6天 |
| 7天响应率 | 90.3% |
| 评论数/Issue | 1.45 |
| 标签覆盖率 | 90.3% |
| 指派覆盖率 | 100.0% |
| 数据完整性 | 94.1/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 81.5 | 0/31（0.0%） | 相对可控 | `SUB_INPUT_QUALITY` 71.1 |
| I1 · 分配与首次响应 | 87.6 | 0/7（0.0%） | 相对可控 | `SUB_ROUTING_CORRECTNESS` 77.4 |
| I2 · 讨论与解决 | 72.4 | 0/7（0.0%） | P1 | `OBJ_SOLUTION_EVIDENCE` 47.3 |
| I3 · 总结与关闭 | 62.7 | 2/7（28.6%） | P0 | `OBJ_CLOSURE_REUSE` 44.3 |
| G · Bot/Agent 治理（参考） | 63.8 | 1/7（14.3%） | 参考项 | `OBJ_BOT_GOVERNANCE` 31.4 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭时后续路径与知识沉淀缺失 | OBJ_CLOSURE_REUSE：均值 44.3，低分 7/7；OBJ_DECISION_TRANSPARENCY：均值 80.0，低分 0/7 | 用户无法了解后续跟进方式，问题可能重复提交，知识无法沉淀 |
| PP-02 | P1 | I2 · 讨论与解决 | 回答缺乏代码变更或文档更新证据 | OBJ_SOLUTION_EVIDENCE：均值 47.3，低分 5/7；OBJ_RESULT_FORMATION_TIMELINESS：均值 94.3，低分 0/7 | 用户无法验证问题是否真正解决，知识无法追溯和复用 |
| PP-03 | P1 | G · Bot/Agent 治理 | Bot仅执行标签添加且部分Issue无Bot介入 | OBJ_BOT_GOVERNANCE：均值 31.4，低分 5/7；OBJ_BOT_MISCLOSE_REVERSE：均值 97.1，低分 0/7 | 分流自动化不足，标签分类依赖人工，治理效率低且一致性差 |
| PP-04 | P2 | I2 · 讨论与解决 | 讨论未形成用户确认的闭环结论 | OBJ_SOLUTION_EVIDENCE：均值 47.3，低分 5/7；OBJ_RESULT_FORMATION_TIMELINESS：均值 94.3，低分 0/7 | 问题可能未真正解决，用户满意度无法衡量，重复提问风险增加 |
| PP-05 | P2 | I1 · 分配与首次响应 | 开放Issue响应极慢，SLA分级缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 85.7，低分 1/7；OBJ_RESPONSE_SPEED：均值 97.1，低分 0/7 | 社区贡献者等待时间长，影响社区参与积极性和贡献留存 |

### 4.1 低分 Issue 明细

#### PP-01 关闭时后续路径与知识沉淀缺失（I3 · 总结与关闭）

- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 25分
  - 痛点原因：关闭说明仅为机器人自动关联MR的回复，缺乏人工方案沉淀与文档化记录，无复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：assigned to @cheng-ziyang2    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 30分
  - 痛点原因：关闭说明仅29字且无重复主链接，仅靠自动化工具关闭，未沉淀可复用的解决方案信息。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#571](https://gitcode.com/cann/ops-cv/issues/571) 数值精度 / shape 边界** — 45分
  - 痛点原因：未沉淀方案文档与复用链接，关闭说明仅解释底层精度限制，缺乏可复用的解决方案。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：1. 目前aicore精度最多支持到float运算，无法支持double类型。因此GridSample算子内部会出现您说的“grid值 × 图片边长 > 2^24(16777216) 时采样点精度下降(fp32 尾数限制)”问题。如果希望…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：assigned to @renruhai
- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 45分
  - 痛点原因：未将替代方案文档化沉淀，关闭说明简略且机械关闭，导致后续用户难以直接复用。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅73字且无主链接，仅靠评论指引文档，缺乏明确的复用指引。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 55分
  - 痛点原因：关闭说明仅92字且无主链接，关闭动作机械，未将算子未开源的技术解释结构化总结，导致复用价值偏低。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `renruhai`：assigned to @renruhai
- **[#548](https://gitcode.com/cann/ops-cv/issues/548) [Documentation|文档反馈]: quick-start进入项目源码失败** — 55分
  - 痛点原因：仅给出排查命令但未确认最终解决结果即关闭，缺乏完整闭环结论。
  - 原文依据：
    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `liu-wei`：您好，您这边是从ops-cv仓的页面cannlab进去的吗？ 能否在gitCode路径下使用如下命令看看是否有ops-cv目录存在： `find ./ -name ops-cv -type d`    - `liu-wei`：`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` 这里的`${gitCode_id}`是指带。 假如你的gitCode_id是shane，那这个命令就是： `cd /mnt/workspac…    - `liu-wei`：>`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` > >这里的`${gitCode_id}`是指带。 > >假如你的gitCode_id是shane，那这个命令就是： > >`cd /mn…
#### PP-02 回答缺乏代码变更或文档更新证据（I2 · 讨论与解决）

- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 23分
  - 痛点原因：仅口头建议替代方案，无PR、commit或文档等实质解决证据便直接关闭了该issue。
  - 原文依据：
    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：assigned to @renruhai
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：缺乏关联PR和代码提交记录，仅凭文档链接和口头确认即关闭，解决证据链薄弱。
  - 原文依据：
    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：缺乏关联PR与commit引用，仅凭口头承诺后续删除配置及直接关闭操作结单，无实质代码修改证据。
  - 原文依据：
    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：无关联PR或commit引用，仅凭口头解释与文档链接作为解决依据，且在询问后直接关闭，缺乏实质代码修复证据。
  - 原文依据：
    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 54分
  - 痛点原因：关闭评论仅为机器人自动触发，缺乏人工解决说明与测试验证证据，且无文档更新链接。
  - 原文依据：
    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2
#### PP-03 Bot仅执行标签添加且部分Issue无Bot介入（G · Bot/Agent 治理）

- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅完成打标与分配，缺乏自动回复与自动关闭等主动治理动作，未能有效分担人工负担。
  - 原文依据：
    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅执行了打标操作，未参与评论互动，也未自动关闭该议题，治理动作单一且缺乏实际协助效能。
  - 原文依据：
    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 20分
  - 痛点原因：Bot仅完成打标，未实现自动关闭且无评论互动，治理动作单一不完整。
  - 原文依据：
    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 20分
  - 痛点原因：Bot仅默默执行打标与指派操作，全程无任何评论反馈，缺乏有效互动与状态说明，治理过程不透明。
  - 原文依据：
    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)
- **[#548](https://gitcode.com/cann/ops-cv/issues/548) [Documentation|文档反馈]: quick-start进入项目源码失败** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动评论或关闭等后续治理动作，完全依赖人工处理。
  - 原文依据：
    - `liu-wei`：您好，您这边是从ops-cv仓的页面cannlab进去的吗？ 能否在gitCode路径下使用如下命令看看是否有ops-cv目录存在： `find ./ -name ops-cv -type d`    - `liu-wei`：`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` 这里的`${gitCode_id}`是指带。 假如你的gitCode_id是shane，那这个命令就是： `cd /mnt/workspac…    - `liu-wei`：>`cd /mnt/workspace/gitCode/${gitCode_id}/ops-cv` > >这里的`${gitCode_id}`是指带。 > >假如你的gitCode_id是shane，那这个命令就是： > >`cd /mn…    - `liu-wei`：您好，我们计划关闭这个issue，如果您还有其他问题，可以随时提issue或者参与SIG会议一起参与讨论。 sig会时间可参考https://meeting.osinfra.cn/cann/， 我们的sig组为sig-ops-basic，…    - `hanxiaolong`：最早是从ops-nn进入的，后续是从ops-cv进入的，目录还是ops-nn，感觉是个bug [@liu-wei](https://gitcode.com/liu-wei)    - `liu-wei`：>最早是从ops-nn进入的，后续是从ops-cv进入的，目录还是ops-nn，感觉是个bug >[@liu-wei](https://gitcode.com/liu-wei) [@hanxiaolong](https://gitcode…
#### PP-04 讨论未形成用户确认的闭环结论（I2 · 讨论与解决）

- **[#570](https://gitcode.com/cann/ops-cv/issues/570) 产品支持矩阵 vs 实际注册** — 23分
  - 痛点原因：仅口头建议替代方案，无PR、commit或文档等实质解决证据便直接关闭了该issue。
  - 原文依据：
    - `renruhai`：目前950芯片算子正在开发中，后续都会陆续支持950芯片。 现在使用双线性采样可以先使用resize_bilinear_v2，区别在于resize_bilinear_v2算子对标的是tf，upsample_bilinear2d对标的是to…    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `renruhai`：assigned to @renruhai
- **[#569](https://gitcode.com/cann/ops-cv/issues/569) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：缺乏关联PR和代码提交记录，仅凭文档链接和口头确认即关闭，解决证据链薄弱。
  - 原文依据：
    - `renruhai`：算子支持情况可以看算子的readme文档中“产品支持情况”章节，如果只标记了Ascend950，说明算子只支持了950芯片，不支持A2、A3调用。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#568](https://gitcode.com/cann/ops-cv/issues/568) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：缺乏关联PR与commit引用，仅凭口头承诺后续删除配置及直接关闭操作结单，无实质代码修改证据。
  - 原文依据：
    - `renruhai`：mc62芯片属于待删除的芯片名，后续代码中会删除对应配置。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#567](https://gitcode.com/cann/ops-cv/issues/567) 产品支持矩阵 vs 实际注册** — 38分
  - 痛点原因：无关联PR或commit引用，仅凭口头解释与文档链接作为解决依据，且在询问后直接关闭，缺乏实质代码修复证据。
  - 原文依据：
    - `renruhai`：aclnnResize.md配置的是aclnn支持芯片范围，这个aclnn在910B、310P芯片也支持正常调用，所以资料中对这几个芯片标了√，只是中间部分算子属于未开源的TBE算子。    - `renruhai`：您好，请问还有其他问题吗？没有的话，我们准备关闭此issue。    - `liu-wei`：closed from codehub    - `liu-wei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `renruhai`：assigned to @renruhai
- **[#555](https://gitcode.com/cann/ops-cv/issues/555) [Requirement|需求建议]: resize_linear tiling UT 代码 clang-format 格式化** — 54分
  - 痛点原因：关闭评论仅为机器人自动触发，缺乏人工解决说明与测试验证证据，且无文档更新链接。
  - 原文依据：
    - [关联PR #1032（merged）](https://gitcode.com/cann/ops-cv/merge_requests/1032)    - `chenfeng61`：/assign [@cheng-ziyang2](https://gitcode.com/cheng-ziyang2)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue555    - `chenfeng61`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cheng-ziyang2
#### PP-05 开放Issue响应极慢，SLA分级缺失（I1 · 分配与首次响应）


## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 在关闭评论中说明后续反馈路径、重新开启条件和相关知识沉淀链接 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 44.3，低分 7/7；OBJ_DECISION_TRANSPARENCY：均值 80.0，低分 0/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 44.3，低分 7/7 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 80.0，低分 0/7 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新评估条件，仅提及贡献意向 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `liu-wei` |
| 触发条件 | 回答技术问题时 |
| 具体动作 | 提供相关代码变更链接、文档更新PR或commit引用作为解决证据 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 47.3，低分 5/7；OBJ_RESULT_FORMATION_TIMELINESS：均值 94.3，低分 0/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 94.3，低分 0/7 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 47.3，低分 5/7 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 三个问题均获技术性解答，精度限制原因和回退机制说明明确 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot配置者；候选负责人 `liu-wei` |
| 触发条件 | Bot配置更新时 |
| 具体动作 | 增加自动标签分类（如bug/question/enhancement）和关闭前用户确认检查 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 31.4，低分 5/7；OBJ_BOT_MISCLOSE_REVERSE：均值 97.1，低分 0/7 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 31.4，低分 5/7 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 97.1，低分 0/7 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot介入，人工处理顺畅，给中性分 | 改善 Bot 到人工处理的交接质量 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **81.5/100**，整体相对可控，但仍需关注：无明显痛点，Issue内容质量整体良好但部分缺少结构化章节和环境信息。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 91.9 | 内容涉及具体文件路径与代码级细节，附真实PR，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 71.1 | 正文结构完整，含复现步骤、环境、预期、验证结果及修复PR，信息充分。 |


### I1 · 分配与首次响应
本阶段分数为 **87.6/100**，整体相对可控，但仍需关注：无明显痛点，响应迅速且责任归属清晰，但标签分类手段单一。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 85.7 | 均值 85.7，低分 1/7 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 97.1 | 均值 97.1，低分 0/7 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 86.4 | 由liu-wei明确分配给renruhai，责任归属清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 77.4 | 正确分配给renruhai并获技术解答，但无标签分类，分流手段单一 |


### I2 · 讨论与解决
本阶段分数为 **72.4/100**，整体相对可控，但仍需关注：回答缺乏代码变更或文档更新证据。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 94.3 | 均值 94.3，低分 0/7 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 47.3 | 均值 47.3，低分 5/7 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 72.7 | 三个问题均获技术性解答，精度限制原因和回退机制说明明确 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 76.9 | 精度退化和310p约束均获合理解释，用户未再追问，目标基本满足 |


### I3 · 总结与关闭
本阶段分数为 **62.7/100**，整体相对可控，但仍需关注：关闭时后续路径与知识沉淀缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 44.3 | 均值 44.3，低分 7/7 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 80.0 | 均值 80.0，低分 0/7 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 49.3 | 关闭时未明确说明后续反馈路径或重新评估条件，仅提及贡献意向 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 78.0 | 回复方先询问是否有其他问题再关闭，关闭流程合理 |

代表低分 Issue：[#568](https://gitcode.com/cann/ops-cv/issues/568)
问题：产品支持矩阵 vs 实际注册。

### G · Bot/Agent 治理
本阶段分数为 **63.8/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 31.4 | 均值 31.4，低分 5/7 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 97.1 | 均值 97.1，低分 0/7 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 67.9 | 无bot介入，人工处理顺畅，给中性分 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 59.7 | 无bot介入，信息不足，给中性分 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 63.3 | 无bot介入，信息不足，给中性分 |

代表低分 Issue：[#568](https://gitcode.com/cann/ops-cv/issues/568)
问题：产品支持矩阵 vs 实际注册。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 31 | 60.4 | 首期基线 | 81.5 | 87.6 | 72.4 | 62.7 | 63.8 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **2 位社区响应者**贡献 **25 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `liu-wei` | 15 |
| `renruhai` | 10 |

Top1 响应占比 **60.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：94.1/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-cv/report_cann-ops-cv_2026-06-22_to_2026-06-28.json`。
