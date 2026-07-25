# Issue 贡献体验周报 · cann/ops-math

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **39** 个 Issue
+ 其中外部 Issue **16** 个、内部 **23** 个；I1–I3 及 G 基于「外部且成熟」的 **13** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 12 / Closed 27**，关闭率 **69.2%**。
+ 总体体验分为 **49.0/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 43.6 | 关闭阶段解决证据严重缺失 |
| P1 | I2 · 讨论与解决 | 58.2 | 讨论推进停滞，初响后无跟进 |
| P1 | I1 · 分配与首次响应 | 67.5 | 标签分类覆盖不足，分流路径模糊 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中附上修复PR链接、根因说明和后续反馈路径 |
| REC-02 | P1 | 自动提醒指派人跟进或要求补充信息 |
| REC-03 | P1 | 根据标题前缀自动添加对应标签（bug-report/requirement/documentation等） |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 39 |
| Open / Closed | 12 / 27 |
| 关闭率 | 69.2% |
| 类型构成 | 缺陷 14 / 需求 10 / 其他 15 |
| 总体体验分 | 49.0/100（D） |
| 首次响应时间 | 中位 4.6h；均值 6.6h |
| 关闭周期 | 中位 6.0h；均值 18.1h |
| 7天响应率 | 100.0% |
| 评论数/Issue | 1.15 |
| 标签覆盖率 | 69.2% |
| 指派覆盖率 | 82.1% |
| 数据完整性 | 89.0/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 81.4 | 1/39（2.6%） | 相对可控 | `SUB_INPUT_QUALITY` 72.2 |
| I1 · 分配与首次响应 | 67.5 | 6/13（46.2%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 53.8 |
| I2 · 讨论与解决 | 58.2 | 6/13（46.2%） | P1 | `OBJ_SOLUTION_EVIDENCE` 32.0 |
| I3 · 总结与关闭 | 43.6 | 11/13（84.6%） | P0 | `OBJ_CLOSURE_REUSE` 16.2 |
| G · Bot/Agent 治理（参考） | 69.1 | 1/13（7.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 41.5 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭阶段解决证据严重缺失 | OBJ_CLOSURE_REUSE：均值 16.2，低分 11/13；OBJ_DECISION_TRANSPARENCY：均值 45.4，低分 9/13 | 已关闭Issue无法作为社区知识库，用户无法参考历史解决方案 |
| PP-02 | P1 | I2 · 讨论与解决 | 讨论推进停滞，初响后无跟进 | OBJ_SOLUTION_EVIDENCE：均值 32.0，低分 12/13；OBJ_RESULT_FORMATION_TIMELINESS：均值 84.6，低分 2/13 | 用户问题悬而未决，开放Issue长期积压，社区信任度下降 |
| PP-03 | P1 | I1 · 分配与首次响应 | 标签分类覆盖不足，分流路径模糊 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 53.8，低分 6/13；OBJ_RESPONSE_SPEED：均值 83.1，低分 0/13 | Issue检索和分类困难，影响社区用户查找相关问题 |
| PP-04 | P2 | G · Bot/Agent 治理 | Bot自动化覆盖不均，部分Issue缺位 | OBJ_BOT_GOVERNANCE：均值 41.5，低分 6/13；OBJ_BOT_MISCLOSE_REVERSE：均值 96.9，低分 0/13 | 部分Issue缺乏自动化分流和标签，增加人工负担 |

### 4.1 低分 Issue 明细

#### PP-01 关闭阶段解决证据严重缺失（I3 · 总结与关闭）

- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人自动关联PR关闭，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - `cann-robot`：add label resolved    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 0分
  - 痛点原因：关闭说明为空且仅由机器人自动关闭，未沉淀任何方案文档或复用指引，导致无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - `cann-robot`：add label resolved    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 0分
  - 痛点原因：关闭说明为0字且无方案文档，仅靠机器人随PR合并自动关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - `cann-robot`：add label resolved    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2235](https://gitcode.com/cann/ops-math/issues/2235) [Requirement|需求建议]: ops-math仓的编译体系不支持在无binary.json的情况下编译特殊命名格式的算子** — 0分
  - 痛点原因：关闭时无任何文字说明、方案文档或相关链接，未沉淀解决经验供后续复用。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `chensi79`：感谢反馈。math仓在没有配置binary.json的情况下，是根据目录名反推算子类型，破坏了 ULQ 这个缩写的大小写，最终导致自动生成的 binary.json 缺失。问题修复中，请耐心等待。    - `cann-robot`：assigned to @songkai111    - [关联PR #4091（open）](https://gitcode.com/cann/ops-math/merge_requests/4091)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 0分
  - 痛点原因：机器人自动关闭且关闭说明为空，无方案文档化记录，未沉淀任何可供复用的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)
- **[#2227](https://gitcode.com/cann/ops-math/issues/2227) [TTFHW] 构建命令中未提及 patch、ccache 等系统工具的前置依赖（构建第三方 abseil-cpp 需要 patch）** — 0分
  - 痛点原因：关闭说明仅泛泛表示已解决，未沉淀具体解决方案或文档，也未关联相关脚本说明，导致他人无法复用。
  - 原文依据：
    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub    - `chensi79`：您好，本仓 install_deps.sh已提供依赖安装指令    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2226](https://gitcode.com/cann/ops-math/issues/2226) [TTFHW] 未明确说明第三方依赖（json/makeself/eigen/protobuf/abseil-cpp/opbase/cann-cmake）的最…** — 0分
  - 痛点原因：关闭时未留下任何文字说明，仅指出了文档位置，导致关闭记录无法为后续用户提供参考。
  - 原文依据：
    - `chensi79`：您好，docs/zh/install/compile.md 中给出了离线场景下第三方开源软件列表    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2225](https://gitcode.com/cann/ops-math/issues/2225) [TTFHW] README 未提供 Dockerfile（推荐 CANN 预构建 Docker 镜像，但跳过技能规则的预构建镜像约束）** — 0分
  - 痛点原因：关闭说明为0字，未将解决方案沉淀为明确结论或标准文档，导致无复用价值。
  - 原文依据：
    - `chensi79`：感谢反馈，ops-math 仓库刻意不在仓库内维护 `Dockerfile`，按"拉取昇腾镜像仓库预构建镜像 + `docker run` 挂载昇腾设备"的方式部署。操作步骤见 https://gitcode.com/cann/ops-m…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2224](https://gitcode.com/cann/ops-math/issues/2224) [Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装** — 0分
  - 痛点原因：关闭时未留下任何文字说明，仅以未复现问题为由关闭，未沉淀有效解决方案供其他用户参考。
  - 原文依据：
    - `Joe66693`：add label documentation    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：您好，master分支最新代码编译安装并未复现您的问题，./build_out/cann-ops-math-*linux*.run可成功安装    - `chensi79`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/1426acf9-a2d5-4498-8dc0-342fdbaed3b0/image.png 'image.p…    - `cann-robot`：assigned to @chensi79
- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人随PR合并自动关闭，缺乏人工总结，导致问题解决方案无法被有效复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 30分
  - 痛点原因：关闭说明仅10字且未提供具体修复链接或方案，仅靠机器人关联其他issue，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `chensi79`：感谢反馈，问题修复中    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
#### PP-02 讨论推进停滞，初响后无跟进（I2 · 讨论与解决）

- **[#2235](https://gitcode.com/cann/ops-math/issues/2235) [Requirement|需求建议]: ops-math仓的编译体系不支持在无binary.json的情况下编译特殊命名格式的算子** — 0分
  - 痛点原因：关联PR未合并且无commit、release引用，仅维护者口头承诺修复中，缺乏已解决的闭环证据。
  - 原文依据：
    - [关联PR #4091（open）](https://gitcode.com/cann/ops-math/merge_requests/4091)    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `chensi79`：感谢反馈。math仓在没有配置binary.json的情况下，是根据目录名反推算子类型，破坏了 ULQ 这个缩写的大小写，最终导致自动生成的 binary.json 缺失。问题修复中，请耐心等待。    - `Coder_Nerd`：add label requirement    - `cann-robot`：assigned to @songkai111
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved
- **[#2225](https://gitcode.com/cann/ops-math/issues/2225) [TTFHW] README 未提供 Dockerfile（推荐 CANN 预构建 Docker 镜像，但跳过技能规则的预构建镜像约束）** — 15分
  - 痛点原因：仅靠评论和文档链接解释，缺乏关联PR、代码提交或正式发布等实质性解决证据。
  - 原文依据：
    - `chensi79`：感谢反馈，ops-math 仓库刻意不在仓库内维护 `Dockerfile`，按"拉取昇腾镜像仓库预构建镜像 + `docker run` 挂载昇腾设备"的方式部署。操作步骤见 https://gitcode.com/cann/ops-m…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2227](https://gitcode.com/cann/ops-math/issues/2227) [TTFHW] 构建命令中未提及 patch、ccache 等系统工具的前置依赖（构建第三方 abseil-cpp 需要 patch）** — 23分
  - 痛点原因：仅口头说明已解决并关闭，未关联PR、commit或文档链接等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，本仓 install_deps.sh已提供依赖安装指令    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭与关联PR，缺乏人工关闭评论、文档链接及版本引用等强佐证。
  - 原文依据：
    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - `cann-robot`：add label resolved
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏人工关闭评论、文档链接与release引用等强解决证据。
  - 原文依据：
    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - `cann-robot`：add label resolved
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 31分
  - 痛点原因：仅由机器人自动关闭并打标签，缺乏人工确认的关闭评论及文档链接等实质性证据。
  - 原文依据：
    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - `cann-robot`：add label resolved
- **[#2226](https://gitcode.com/cann/ops-math/issues/2226) [TTFHW] 未明确说明第三方依赖（json/makeself/eigen/protobuf/abseil-cpp/opbase/cann-cmake）的最…** — 31分
  - 痛点原因：未关联修复PR或commit引用，仅提供文档链接与指派操作，无法证明问题已实际解决。
  - 原文依据：
    - `chensi79`：您好，docs/zh/install/compile.md 中给出了离线场景下第三方开源软件列表    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 38分
  - 痛点原因：虽有关联PR，但无commit和release引用，仅靠机器人关联其他issue自动关闭，缺乏直接修复证据。
  - 原文依据：
    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)    - `chensi79`：感谢反馈，问题修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#2233](https://gitcode.com/cann/ops-math/issues/2233) 【文档缺陷】CANN离线安装文档未说明非交互式安装参数** — 38分
  - 痛点原因：仅口头声明已解决便关闭，缺乏关联PR、commit或文档更新等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，交互时请输入“y”接受EULA，才能继续安装 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/d82cb66c-4f4c-43ff-902c-e8881…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chensi79
- **[#2224](https://gitcode.com/cann/ops-math/issues/2224) [Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装** — 46分
  - 痛点原因：维护者仅贴图称未复现问题，无关联PR或关闭评论证明文档已实际修复。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：您好，master分支最新代码编译安装并未复现您的问题，./build_out/cann-ops-math-*linux*.run可成功安装    - `chensi79`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/1426acf9-a2d5-4498-8dc0-342fdbaed3b0/image.png 'image.p…    - `Joe66693`：add label documentation    - `cann-robot`：assigned to @chensi79
- **[#2228](https://gitcode.com/cann/ops-math/issues/2228) [TTFHW] CANN 工具链版本与 ops-math 仓库版本配套关系未在 README 中显式给出（master 分支对应 CANN 版本需自行查询 r…** — 54分
  - 痛点原因：关闭时无关联PR与commit引用，仅凭文档链接和口头确认，缺乏代码层面的实质性修改证据。
  - 原文依据：
    - `chensi79`：您好，README文档 **版本配套** 章节已给出CANN软件版本与ops-math 仓源码对应关系 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/ed8…    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
#### PP-03 标签分类覆盖不足，分流路径模糊（I1 · 分配与首次响应）

- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 0分
  - 痛点原因：仅机器人打标签并随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 0分
  - 痛点原因：全程仅由机器人加标签并随关联PR合并自动关闭，缺乏任何实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 0分
  - 痛点原因：全程仅机器人加标签并随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 0分
  - 痛点原因：首次响应仅回复感谢并加标签，全程无实质性技术解答，最终由机器人直接关闭。
  - 原文依据：
    - `chensi79`：感谢反馈，问题修复中    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 0分
  - 痛点原因：仅由机器人加标签并随关联PR合并自动关闭，全程无任何人工实质技术回应。
  - 原文依据：
    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)
#### PP-04 Bot自动化覆盖不均，部分Issue缺位（G · Bot/Agent 治理）

- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，未向用户提供任何进度反馈或沟通引导。
  - 原文依据：
    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程无评论说明状态变更原因，缺乏有效互动与过程透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何评论互动，治理流于形式。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，无任何评论说明与互动，治理动作单一且缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，无任何评论与用户互动，缺乏进度同步与有效沟通，治理效果差。
  - 原文依据：
    - `chensi79`：感谢反馈，问题修复中    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，无任何有效评论与用户互动，治理过程机械导致有效性不足。
  - 原文依据：
    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `chensi79` |
| 触发条件 | Issue关闭时 |
| 具体动作 | 在关闭评论中附上修复PR链接、根因说明和后续反馈路径 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 16.2，低分 11/13；OBJ_DECISION_TRANSPARENCY：均值 45.4，低分 9/13 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 16.2，低分 11/13 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 45.4，低分 9/13 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue首次回复后48小时无后续 |
| 具体动作 | 自动提醒指派人跟进或要求补充信息 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 32.0，低分 12/13；OBJ_RESULT_FORMATION_TIMELINESS：均值 84.6，低分 2/13 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 84.6，低分 2/13 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 32.0，低分 12/13 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 零评论，仅通过PR隐式推进，issue内无可见讨论 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot/自动化；候选负责人 `chensi79` |
| 触发条件 | Issue创建时 |
| 具体动作 | 根据标题前缀自动添加对应标签（bug-report/requirement/documentation等） |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 53.8，低分 6/13；OBJ_RESPONSE_SPEED：均值 83.1，低分 0/13 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 53.8，低分 6/13 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 83.1，低分 0/13 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无assignee，责任归属仅通过PR创建隐式体现 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **81.4/100**，整体相对可控，但仍需关注：痛点轻微，仅1个Issue正文质量差（重复标题无复现步骤），整体创…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.7 | 内容为内部贡献者基于代码库的具体技术分析，无幻觉或AI噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 72.2 | 结构化章节完整，含背景、设计方案、硬件支持与约束，字段齐全，属高质量需求描述。 |

代表低分 Issue：[#2254](https://gitcode.com/cann/ops-math/issues/2254)
问题：RandomNormalLike和RandomUniformLike onnx插件存在问题。

### I1 · 分配与首次响应
本阶段分数为 **67.5/100**，整体相对可控，但仍需关注：标签分类覆盖不足，分流路径模糊。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 53.8 | 均值 53.8，低分 6/13 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 83.1 | 均值 83.1，低分 0/13 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 62.8 | 无assignee，责任归属仅通过PR创建隐式体现 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 69.2 | 通过PR正确修复，但无显式分流或维护者标签动作 |

代表低分 Issue：[#2248](https://gitcode.com/cann/ops-math/issues/2248)
问题：【UT补充】补充bitwise_and算子op_api单元测试。

### I2 · 讨论与解决
本阶段分数为 **58.2/100**，本阶段需要改进，主要问题是：讨论推进停滞，初响后无跟进。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 84.6 | 均值 84.6，低分 2/13 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 32.0 | 均值 32.0，低分 12/13 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 50.8 | 零评论，仅通过PR隐式推进，issue内无可见讨论 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 65.6 | PR已合并，文档问题已修复，但无用户确认反馈 |

代表低分 Issue：[#2224](https://gitcode.com/cann/ops-math/issues/2224)
问题：[Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装。

### I3 · 总结与关闭
本阶段分数为 **43.6/100**，本阶段需要改进，主要问题是：关闭阶段解决证据严重缺失。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 16.2 | 均值 16.2，低分 11/13 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 45.4 | 均值 45.4，低分 9/13 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 46.2 | 关闭时未说明后续反馈路径或重新开启条件 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 79.5 | PR合并后关闭，非过早关闭，但close_reason与resolved不一致 |

代表低分 Issue：[#2234](https://gitcode.com/cann/ops-math/issues/2234)
问题：[Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR。

### G · Bot/Agent 治理
本阶段分数为 **69.1/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 41.5 | 均值 41.5，低分 6/13 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 96.9 | 均值 96.9，低分 0/13 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 67.2 | PR合并体现人工处理，但issue内无人工交互或承接痕迹 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 67.6 | bot正确关联MR合并并关闭issue，添加resolved标签，流程有效 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 71.2 | 动作准确及时，但close_reason显示进行中与resolved标签矛盾 |

代表低分 Issue：[#2258](https://gitcode.com/cann/ops-math/issues/2258)
问题：[Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 39 | 49.0 | 首期基线 | 81.4 | 67.5 | 58.2 | 43.6 | 69.1 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **5 位社区响应者**贡献 **30 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `chensi79` | 15 |
| `sunchun` | 12 |
| `songkai111` | 1 |
| `fullt` | 1 |
| `condfuse_3` | 1 |

Top1 响应占比 **50.0%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.0/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-07-13_to_2026-07-19.json`。
