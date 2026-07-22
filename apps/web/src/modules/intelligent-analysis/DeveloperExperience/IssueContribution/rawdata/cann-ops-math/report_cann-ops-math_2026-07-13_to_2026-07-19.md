# Issue 贡献体验周报 · cann/ops-math

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **39** 个 Issue
+ **Open 13 / Closed 26**，关闭率 **66.7%**。
+ 总体体验分为 **47.9/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 44.1 | 关闭缺乏解决证据与知识沉淀 |
| P0 | I2 · 讨论与解决 | 55.8 | 讨论停滞且assignee跟进不足 |
| P1 | I1 · 分配与首次响应 | 64.8 | 标签分类缺失且路由不完整 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 自动提醒assignee跟进或触发重新分配 |
| REC-02 | P0 | 强制填写关闭模板（解决摘要、根因说明、复用建议、后续反馈路径） |
| REC-03 | P1 | 自动添加类型标签（bug/requirement/documentation）和优先级标签 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 39 |
| Open / Closed | 13 / 26 |
| 关闭率 | 66.7% |
| 类型构成 | 缺陷 14 / 需求 10 / 其他 15 |
| 总体体验分 | 47.9/100（D） |
| 首次响应时间 | 中位 4.6h；均值 6.6h |
| 关闭周期 | 中位 5.6h；均值 15.3h |
| 7天响应率 | 100.0% |
| 评论数/Issue | 1.15 |
| 标签覆盖率 | 66.7% |
| 指派覆盖率 | 82.1% |
| 数据完整性 | 88.7/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 81.3 | 1/39（2.6%） | 相对可控 | `SUB_INPUT_QUALITY` 73.2 |
| I1 · 分配与首次响应 | 64.8 | 15/39（38.5%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 27.2 |
| I2 · 讨论与解决 | 55.8 | 16/39（41.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 33.9 |
| I3 · 总结与关闭 | 44.1 | 36/39（92.3%） | P0 | `OBJ_CLOSURE_REUSE` 10.4 |
| G · Bot/Agent 治理（参考） | 68.5 | 3/39（7.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 37.4 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 讨论停滞且assignee跟进不足 | OBJ_SOLUTION_EVIDENCE：均值 33.9，低分 36/39；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.8，低分 11/39 | 高质量技术反馈被搁置，用户目标未满足，社区贡献者参与积极性受损 |
| PP-02 | P0 | I3 · 总结与关闭 | 关闭缺乏解决证据与知识沉淀 | OBJ_CLOSURE_REUSE：均值 10.4，低分 37/39；OBJ_DECISION_TRANSPARENCY：均值 51.7，低分 21/39 | 知识无法沉淀复用，同类问题可能重复提交，社区经验流失且关闭可信度低 |
| PP-03 | P1 | I1 · 分配与首次响应 | 标签分类缺失且路由不完整 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 27.2，低分 28/39；OBJ_RESPONSE_SPEED：均值 88.7，低分 0/39 | 问题分类不清晰，难以按类型和优先级统计路由，影响批量处理效率 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot覆盖不足且存在误关闭风险 | OBJ_BOT_GOVERNANCE：均值 37.4，低分 22/39；OBJ_BOT_MISCLOSE_REVERSE：均值 95.4，低分 0/39 | 自动化治理覆盖面不足，部分issue缺乏自动分流和跟进提醒，误关闭导致问题遗漏 |
| PP-05 | P2 | I2 · 讨论与解决 | Open issue长期搁置无SLA约束 | OBJ_SOLUTION_EVIDENCE：均值 33.9，低分 36/39；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.8，低分 11/39 | 社区贡献者反馈被忽视，影响参与积极性，open issue持续积累增加维护负担 |

### 4.1 低分 Issue 明细

#### PP-01 讨论停滞且assignee跟进不足（I2 · 讨论与解决）

- **[#2235](https://gitcode.com/cann/ops-math/issues/2235) [Requirement|需求建议]: ops-math仓的编译体系不支持在无binary.json的情况下编译特殊命名格式的算子** — 0分
  - 痛点原因：关联PR未合并，无commit、文档及release引用，仅口头表示修复中，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #4091（open）](https://gitcode.com/cann/ops-math/merge_requests/4091)    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `chensi79`：感谢反馈。math仓在没有配置binary.json的情况下，是根据目录名反推算子类型，破坏了 ULQ 这个缩写的大小写，最终导致自动生成的 binary.json 缺失。问题修复中，请耐心等待。    - `Coder_Nerd`：add label requirement    - `cann-robot`：assigned to @songkai111
- **[#2257](https://gitcode.com/cann/ops-math/issues/2257) [Bug-Report|缺陷反馈]: 使用build.sh --genop生成的算子默认无法编译成功** — 15分
  - 痛点原因：未关联任何修复PR或提交记录，也无关闭评论说明解决过程，缺乏实质性解决证据。
  - 原文依据：
    - `songkai111`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/e73a7c41-1d4f-47a7-af14-adacb2b17c69/image.png 'image.p…    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `mlh0101`：add label bug-report    - `cann-robot`：assigned to @songkai111
- **[#2252](https://gitcode.com/cann/ops-math/issues/2252) [Documentation|文档反馈]: feeds_repeat做了950兼容适配支持950** — 15分
  - 痛点原因：未关联 PR、commit 或 release 等实质性解决证据，仅停留在对话指派阶段，无法证明问题已实际解决。
  - 原文依据：
    - `chensi79`：您好，当前feeds_repeat不支持950 ，您是要贡献950适配代码吗？    - `Almost_CANN`：长尾算子做了950兼容性适配，需要刷新下文档。    - `chensi79`：assigned to @Almost_CANN
- **[#2240](https://gitcode.com/cann/ops-math/issues/2240) [Bug-Report|缺陷反馈]: math内存在重复aclnn头文件** — 15分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #4033（merged）](https://gitcode.com/cann/ops-math/merge_requests/4033)    - [关联PR #4102（merged）](https://gitcode.com/cann/ops-math/merge_requests/4102)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2240    - `yue-ma`：add label bug-report    - `cann-robot`：add label resolved    - `yue-ma`：assigned to @yue-ma
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 15分
  - 痛点原因：仅靠机器人自动关联PR关闭，缺乏commit引用、人工关闭评论及文档链接等具体解决证据。
  - 原文依据：
    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved
- **[#2232](https://gitcode.com/cann/ops-math/issues/2232) [Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算** — 15分
  - 痛点原因：虽关联多个已合并PR，但无commit引用、文档链接及关闭评论，证据链不完整且缺乏解决总结说明。
  - 原文依据：
    - [关联PR #7440（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7440)    - [关联PR #7451（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7451)    - [关联PR #7498（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7498)    - [关联PR #7499（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7499)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2232    - `liaohuming`：add label bug-report
- **[#2225](https://gitcode.com/cann/ops-math/issues/2225) [TTFHW] README 未提供 Dockerfile（推荐 CANN 预构建 Docker 镜像，但跳过技能规则的预构建镜像约束）** — 15分
  - 痛点原因：仅靠评论提供文档链接，无关联PR、代码提交或明确关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - `chensi79`：感谢反馈，ops-math 仓库刻意不在仓库内维护 `Dockerfile`，按"拉取昇腾镜像仓库预构建镜像 + `docker run` 挂载昇腾设备"的方式部署。操作步骤见 https://gitcode.com/cann/ops-m…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2223](https://gitcode.com/cann/ops-math/issues/2223) [Bug-Report|缺陷反馈]: DropOutV3输出mask对齐的padding部分没有清零是随机数，确定性二进制对比不过** — 15分
  - 痛点原因：关联的修复PR仍处于未合并的open状态，缺乏已修复的commit或release证据，仅完成了负责人分配。
  - 原文依据：
    - [关联PR #4017（open）](https://gitcode.com/cann/ops-math/merge_requests/4017)    - `chensi79`：/assign [@jia-jianyong](https://gitcode.com/jia-jianyong)    - `cann-robot`：assigned to @jia-jianyong
- **[#2254](https://gitcode.com/cann/ops-math/issues/2254) RandomNormalLike和RandomUniformLike onnx插件存在问题** — 23分
  - 痛点原因：虽有合并PR，但缺乏commit、文档及release引用，且关联多个未合并PR，导致证据强度不足。
  - 原文依据：
    - [关联PR #4123（closed）](https://gitcode.com/cann/ops-math/merge_requests/4123)    - [关联PR #4127（merged）](https://gitcode.com/cann/ops-math/merge_requests/4127)    - [关联PR #4129（closed）](https://gitcode.com/cann/ops-math/merge_requests/4129)    - `chensi79`：/assign [@wu-shuai2580](https://gitcode.com/wu-shuai2580)    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 待办的 to 已完成
- **[#2243](https://gitcode.com/cann/ops-math/issues/2243) [Requirement|需求建议]: math仓新增complex_abs支持david** — 23分
  - 痛点原因：仅靠机器人因关联issue的MR合并而自动关闭，缺乏commit引用、文档链接及release说明等直接解决证据。
  - 原文依据：
    - [关联PR #3866（merged）](https://gitcode.com/cann/ops-math/merge_requests/3866)    - `qq_52874943`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2243    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943
- **[#2241](https://gitcode.com/cann/ops-math/issues/2241) [Requirement|需求建议]: math仓新增abs_grad支持david** — 23分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工确认解决结果的说明、文档链接及commit引用，证据单薄。
  - 原文依据：
    - [关联PR #3848（merged）](https://gitcode.com/cann/ops-math/merge_requests/3848)    - `qq_52874943`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2241    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943
- **[#2238](https://gitcode.com/cann/ops-math/issues/2238) [Bug-Report|缺陷反馈]: WeightQuantPreprocess 的review意见修改** — 23分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit引用、文档及release链接等强解决证据支撑。
  - 原文依据：
    - [关联PR #4094（merged）](https://gitcode.com/cann/ops-math/merge_requests/4094)    - `renzetao`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2238    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao
- **[#2236](https://gitcode.com/cann/ops-math/issues/2236) [Requirement|需求建议]: aclnnAddN支持950** — 23分
  - 痛点原因：虽有合并的关联PR和机器人关闭评论，但缺少commit引用、文档链接和release引用等直接证据支撑。
  - 原文依据：
    - [关联PR #4013（merged）](https://gitcode.com/cann/ops-math/merge_requests/4013)    - `sunchun`：/assign [@ligen75](https://gitcode.com/ligen75)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2236    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ligen75
- **[#2227](https://gitcode.com/cann/ops-math/issues/2227) [TTFHW] 构建命令中未提及 patch、ccache 等系统工具的前置依赖（构建第三方 abseil-cpp 需要 patch）** — 23分
  - 痛点原因：仅凭口头声明解决即关闭，缺乏关联PR、commit或文档链接等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，本仓 install_deps.sh已提供依赖安装指令    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub
- **[#2260](https://gitcode.com/cann/ops-math/issues/2260) [Requirement|需求建议]: aclnnNormalTensorTensor A2/A3分支内存优化** — 31分
  - 痛点原因：关联PR仍处于open状态未合并，且无关闭评论与release引用，缺乏实质解决闭环证据。
  - 原文依据：
    - [关联PR #4137（open）](https://gitcode.com/cann/ops-math/merge_requests/4137)    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing
- **[#2259](https://gitcode.com/cann/ops-math/issues/2259) [Requirement|需求建议]: math 仓新增 InplaceTopKDistance 与 TopKPQDistanceV2 AICPU 算子** — 31分
  - 痛点原因：关联的 PR 仍处于 open 状态，且无关闭评论、文档及 release 引用，缺乏问题已解决的闭环证据。
  - 原文依据：
    - [关联PR #4133（open）](https://gitcode.com/cann/ops-math/merge_requests/4133)    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论和文档链接等明确的解决说明。
  - 原文依据：
    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - `cann-robot`：add label resolved
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、文档链接及release引用等强解决证据。
  - 原文依据：
    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - `cann-robot`：add label resolved
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工确认解决的评论及文档或版本引用等强证据。
  - 原文依据：
    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - `cann-robot`：add label resolved
- **[#2244](https://gitcode.com/cann/ops-math/issues/2244) [Bug-Report|缺陷反馈]: Topk的NonTranspose模板出现精度问题** — 31分
  - 痛点原因：虽有两个已合并PR，但无文档链接、无release引用、无关闭评论，仅靠机器人自动关闭，缺乏人工验证与解决说明。
  - 原文依据：
    - [关联PR #4093（merged）](https://gitcode.com/cann/ops-math/merge_requests/4093)    - [关联PR #4120（merged）](https://gitcode.com/cann/ops-math/merge_requests/4120)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2244    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei
- **[#2231](https://gitcode.com/cann/ops-math/issues/2231) [Requirement|需求建议] 将canndev仓TransData算子的AICPU kernel迁移到ops-math仓** — 31分
  - 痛点原因：关联的4个PR中仅1个被合并，其余3个仍为open状态，且缺乏关闭评论等最终解决证据。
  - 原文依据：
    - [关联PR #3777（open）](https://gitcode.com/cann/ops-math/merge_requests/3777)    - [关联PR #4113（merged）](https://gitcode.com/cann/ops-math/merge_requests/4113)    - [关联PR #4114（open）](https://gitcode.com/cann/ops-math/merge_requests/4114)    - [关联PR #4115（open）](https://gitcode.com/cann/ops-math/merge_requests/4115)    - `pan-tong`：/assign    - `pan-tong`：compile
- **[#2226](https://gitcode.com/cann/ops-math/issues/2226) [TTFHW] 未明确说明第三方依赖（json/makeself/eigen/protobuf/abseil-cpp/opbase/cann-cmake）的最…** — 31分
  - 痛点原因：无关联PR和commit引用等代码修复证据，且关闭时无明确解决评论，仅靠文档链接和指派无法证明问题已修复。
  - 原文依据：
    - `chensi79`：您好，docs/zh/install/compile.md 中给出了离线场景下第三方开源软件列表    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2256](https://gitcode.com/cann/ops-math/issues/2256) [Bug-Report|缺陷反馈]: einsum原型迁移至nn仓** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭评论仅为机器人自动关闭，缺乏人工对解决结果的详细说明。
  - 原文依据：
    - [关联PR #4128（merged）](https://gitcode.com/cann/ops-math/merge_requests/4128)    - `chensi79`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2256    - `Hana77`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 38分
  - 痛点原因：虽有关联PR被合并，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工对修复结果的明确验证。
  - 原文依据：
    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)    - `chensi79`：感谢反馈，问题修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#2242](https://gitcode.com/cann/ops-math/issues/2242) [Documentation|文档反馈]: 开源仓算子列表一致性问题** — 38分
  - 痛点原因：仅靠机器人因关联MR合并自动关闭，未直接关联PR或引用commit，缺乏代码解决证据。
  - 原文依据：
    - `sunchun`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2242    - `sunchun`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunchun
- **[#2237](https://gitcode.com/cann/ops-math/issues/2237) [Documentation|文档反馈]: aclnnNpuFormatCast文档更新additionalDtype参数是否可选说明** — 38分
  - 痛点原因：虽有合并的关联PR及机器人关闭说明，但缺少commit引用与release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #4029（merged）](https://gitcode.com/cann/ops-math/merge_requests/4029)    - `zhangquanxin`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2237    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangquanxin
- **[#2233](https://gitcode.com/cann/ops-math/issues/2233) 【文档缺陷】CANN离线安装文档未说明非交互式安装参数** — 38分
  - 痛点原因：关闭时仅口头声明已解决，未提供关联PR、commit或release等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，交互时请输入“y”接受EULA，才能继续安装 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/d82cb66c-4f4c-43ff-902c-e8881…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chensi79
- **[#2222](https://gitcode.com/cann/ops-math/issues/2222) [Bug-Report|缺陷反馈]: 兼容代码导致网络精度劣化，需要回退** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit和文档链接，且关闭评论仅为机器人自动回复，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #4016（merged）](https://gitcode.com/cann/ops-math/merge_requests/4016)    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2222    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved
- **[#2255](https://gitcode.com/cann/ops-math/issues/2255) [Bug-Report|缺陷反馈]: 【社区任务】KLDivV2 算子 experimental 分支编译失败：op_api 跨算子依赖问题** — 46分
  - 痛点原因：未关联修复PR且关闭时无总结评论，仅靠评论中的参考链接作为解决依据，未形成代码修复闭环。
  - 原文依据：
    - `fullt`：在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMake…    - `qq_64858158`：>在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 >可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMa…    - `fullt`：add label wait-feedback    - `cann-robot`：delete label wait-feedback    - `fullt`：assigned to @fullt
- **[#2245](https://gitcode.com/cann/ops-math/issues/2245) [Requirement|需求建议]: 【社区任务】[性能差异分析][Ascend 910B] SquaredDifference 的 BF16/INT64 …** — 46分
  - 痛点原因：缺乏关联PR，评论仅显示任务分配与初步讨论，无最终解决方案或关闭确认，解决证据不足。
  - 原文依据：
    - `sunchun`：/assign    - `condfuse_3`：tbe跑一下仿真，看一下bfloat16和int64 具体使用的是哪个指令 [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @sunchun
- **[#2229](https://gitcode.com/cann/ops-math/issues/2229) [Requirement|需求建议]: CoalesceSparse算子950实现性能优化** — 46分
  - 痛点原因：缺乏关联PR且关闭时无评论说明，仅靠指派和commit/release引用关闭，解决过程证据不足。
  - 原文依据：
    - `chensi79`：assigned to @Tower19
- **[#2224](https://gitcode.com/cann/ops-math/issues/2224) [Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装** — 46分
  - 痛点原因：维护者仅声称未复现问题，未提供关联PR或修复说明等实质解决证据，且无关闭评论确认最终结果。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：您好，master分支最新代码编译安装并未复现您的问题，./build_out/cann-ops-math-*linux*.run可成功安装    - `chensi79`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/1426acf9-a2d5-4498-8dc0-342fdbaed3b0/image.png 'image.p…    - `Joe66693`：add label documentation    - `cann-robot`：assigned to @chensi79
- **[#2251](https://gitcode.com/cann/ops-math/issues/2251) Dynamic_partition算子性能优化** — 54分
  - 痛点原因：虽有合并的PR和commit，但缺少文档链接与release引用，且关闭过程仅由机器人自动触发，缺乏人工总结。
  - 原文依据：
    - [关联PR #3894（merged）](https://gitcode.com/cann/ops-math/merge_requests/3894)    - `chensi79`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2251    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jzj007
- **[#2246](https://gitcode.com/cann/ops-math/issues/2246) [Documentation] QuickStart输出样例中具体随机数值与环境输出不一致** — 54分
  - 痛点原因：虽有关联PR和机器人关闭评论，但缺少直接的commit引用，导致解决依据强度不足。
  - 原文依据：
    - [关联PR #4103（merged）](https://gitcode.com/cann/ops-math/merge_requests/4103)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2246    - `songkai111`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111
- **[#2230](https://gitcode.com/cann/ops-math/issues/2230) [Requirement|需求建议]: 新增接口WeightQuantPreprocess** — 54分
  - 痛点原因：虽有合并的PR和机器人自动关闭，但缺乏文档链接与release引用，且无人工对解决结果的详细说明。
  - 原文依据：
    - [关联PR #3832（merged）](https://gitcode.com/cann/ops-math/merge_requests/3832)    - `sunchun`：/assign [@renzetao](https://gitcode.com/renzetao)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2230    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao
- **[#2228](https://gitcode.com/cann/ops-math/issues/2228) [TTFHW] CANN 工具链版本与 ops-math 仓库版本配套关系未在 README 中显式给出（master 分支对应 CANN 版本需自行查询 r…** — 54分
  - 痛点原因：仅靠评论指出文档已有说明便关闭问题，未提供关联PR或commit引用等代码级解决证据。
  - 原文依据：
    - `chensi79`：您好，README文档 **版本配套** 章节已给出CANN软件版本与ops-math 仓源码对应关系 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/ed8…    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
#### PP-02 关闭缺乏解决证据与知识沉淀（I3 · 总结与关闭）

- **[#2260](https://gitcode.com/cann/ops-math/issues/2260) [Requirement|需求建议]: aclnnNormalTensorTensor A2/A3分支内存优化** — 0分
  - 痛点原因：关闭说明为0字，无方案文档与主链接，且关联PR未合并，无复用价值。
  - 原文依据：
    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing    - [关联PR #4137（open）](https://gitcode.com/cann/ops-math/merge_requests/4137)
- **[#2259](https://gitcode.com/cann/ops-math/issues/2259) [Requirement|需求建议]: math 仓新增 InplaceTopKDistance 与 TopKPQDistanceV2 AICPU 算子** — 0分
  - 痛点原因：关闭说明为空且无方案文档与重复链接，关联PR仍处于open状态，未留存任何可复用经验。
  - 原文依据：
    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing    - [关联PR #4133（open）](https://gitcode.com/cann/ops-math/merge_requests/4133)
- **[#2257](https://gitcode.com/cann/ops-math/issues/2257) [Bug-Report|缺陷反馈]: 使用build.sh --genop生成的算子默认无法编译成功** — 0分
  - 痛点原因：关闭说明为空且无方案文档化与重复链接，导致该问题关闭后对其他用户毫无参考价值。
  - 原文依据：
    - `mlh0101`：add label bug-report    - `songkai111`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/e73a7c41-1d4f-47a7-af14-adacb2b17c69/image.png 'image.p…    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111
- **[#2256](https://gitcode.com/cann/ops-math/issues/2256) [Bug-Report|缺陷反馈]: einsum原型迁移至nn仓** — 0分
  - 痛点原因：无方案文档化与dup主链接，关闭说明仅为机器人自动生成的合并关联信息，缺乏人工总结的复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2256    - `Hana77`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：assigned to @Hana77    - [关联PR #4128（merged）](https://gitcode.com/cann/ops-math/merge_requests/4128)
- **[#2255](https://gitcode.com/cann/ops-math/issues/2255) [Bug-Report|缺陷反馈]: 【社区任务】KLDivV2 算子 experimental 分支编译失败：op_api 跨算子依赖问题** — 0分
  - 痛点原因：关闭时无任何文字说明与方案文档，仅靠评论中的临时链接，导致后续无法直接复用解决经验。
  - 原文依据：
    - `fullt`：add label wait-feedback    - `cann-robot`：delete label wait-feedback    - `fullt`：在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMake…    - `qq_64858158`：>在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 >可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMa…    - `fullt`：assigned to @fullt
- **[#2252](https://gitcode.com/cann/ops-math/issues/2252) [Documentation|文档反馈]: feeds_repeat做了950兼容适配支持950** — 0分
  - 痛点原因：关闭时未填写任何说明文字，未沉淀最终处理结论，导致其他用户无法了解并复用其解决方案。
  - 原文依据：
    - `chensi79`：您好，当前feeds_repeat不支持950 ，您是要贡献950适配代码吗？    - `Almost_CANN`：长尾算子做了950兼容性适配，需要刷新下文档。    - `chensi79`：assigned to @Almost_CANN
- **[#2251](https://gitcode.com/cann/ops-math/issues/2251) Dynamic_partition算子性能优化** — 0分
  - 痛点原因：缺乏方案文档与重复链接，关闭说明仅为机器人自动生成的简短关联信息，无任何可复用的技术细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2251    - `cann-robot`：add label resolved    - `chensi79`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：assigned to @jzj007    - [关联PR #3894（merged）](https://gitcode.com/cann/ops-math/merge_requests/3894)
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀方案文档与复用链接，仅由机器人随关联PR合并自动关闭，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - `cann-robot`：add label resolved    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无人工关闭说明且未沉淀方案文档，导致后续无法复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - `cann-robot`：add label resolved    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 0分
  - 痛点原因：关闭说明为零字且无方案文档沉淀，仅靠机器人自动关闭，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - `cann-robot`：add label resolved    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2245](https://gitcode.com/cann/ops-math/issues/2245) [Requirement|需求建议]: 【社区任务】[性能差异分析][Ascend 910B] SquaredDifference 的 BF16/INT64 …** — 0分
  - 痛点原因：关闭说明为空，未沉淀最终分析结论或解决方案，无法为后续类似任务提供参考。
  - 原文依据：
    - `sunchun`：/assign    - `condfuse_3`：tbe跑一下仿真，看一下bfloat16和int64 具体使用的是哪个指令 [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @sunchun
- **[#2244](https://gitcode.com/cann/ops-math/issues/2244) [Bug-Report|缺陷反馈]: Topk的NonTranspose模板出现精度问题** — 0分
  - 痛点原因：仅因关联MR合并被机器人自动关闭，无任何方案文档化记录和关闭说明，导致其他用户无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2244    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - [关联PR #4093（merged）](https://gitcode.com/cann/ops-math/merge_requests/4093)    - [关联PR #4120（merged）](https://gitcode.com/cann/ops-math/merge_requests/4120)
- **[#2243](https://gitcode.com/cann/ops-math/issues/2243) [Requirement|需求建议]: math仓新增complex_abs支持david** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动回复，无方案文档化记录与重复链接，无法为后续提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2243    - `cann-robot`：add label resolved    - `qq_52874943`：/assign    - `cann-robot`：assigned to @qq_52874943    - [关联PR #3866（merged）](https://gitcode.com/cann/ops-math/merge_requests/3866)
- **[#2241](https://gitcode.com/cann/ops-math/issues/2241) [Requirement|需求建议]: math仓新增abs_grad支持david** — 0分
  - 痛点原因：关闭说明仅7字且为机器人自动回复，无方案文档沉淀与重复issue关联，无法提供任何复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2241    - `cann-robot`：add label resolved    - `qq_52874943`：/assign    - `cann-robot`：assigned to @qq_52874943    - [关联PR #3848（merged）](https://gitcode.com/cann/ops-math/merge_requests/3848)
- **[#2240](https://gitcode.com/cann/ops-math/issues/2240) [Bug-Report|缺陷反馈]: math内存在重复aclnn头文件** — 0分
  - 痛点原因：关闭说明为空，仅由机器人因关联MR自动关闭，无方案文档与复用链接，未沉淀任何解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2240    - `yue-ma`：add label bug-report    - `cann-robot`：add label resolved    - `yue-ma`：assigned to @yue-ma    - [关联PR #4033（merged）](https://gitcode.com/cann/ops-math/merge_requests/4033)    - [关联PR #4102（merged）](https://gitcode.com/cann/ops-math/merge_requests/4102)
- **[#2238](https://gitcode.com/cann/ops-math/issues/2238) [Bug-Report|缺陷反馈]: WeightQuantPreprocess 的review意见修改** — 0分
  - 痛点原因：机器人因MR合并自动关闭，无方案文档与关联链接，关闭说明仅7字，未沉淀任何复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2238    - `cann-robot`：add label resolved    - `renzetao`：/assign    - `cann-robot`：assigned to @renzetao    - [关联PR #4094（merged）](https://gitcode.com/cann/ops-math/merge_requests/4094)
- **[#2236](https://gitcode.com/cann/ops-math/issues/2236) [Requirement|需求建议]: aclnnAddN支持950** — 0分
  - 痛点原因：关闭说明仅为机器人自动回复的合并提示，无方案文档沉淀，未留下可复用的解决细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2236    - `cann-robot`：add label resolved    - `sunchun`：/assign [@ligen75](https://gitcode.com/ligen75)    - `cann-robot`：assigned to @ligen75    - [关联PR #4013（merged）](https://gitcode.com/cann/ops-math/merge_requests/4013)
- **[#2235](https://gitcode.com/cann/ops-math/issues/2235) [Requirement|需求建议]: ops-math仓的编译体系不支持在无binary.json的情况下编译特殊命名格式的算子** — 0分
  - 痛点原因：关闭时无任何说明文字，未沉淀方案文档或关联主链接，导致解决经验无法复用。
  - 原文依据：
    - `Coder_Nerd`：add label requirement    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `chensi79`：感谢反馈。math仓在没有配置binary.json的情况下，是根据目录名反推算子类型，破坏了 ULQ 这个缩写的大小写，最终导致自动生成的 binary.json 缺失。问题修复中，请耐心等待。    - `cann-robot`：assigned to @songkai111    - [关联PR #4091（open）](https://gitcode.com/cann/ops-math/merge_requests/4091)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭说明及方案文档沉淀，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)
- **[#2232](https://gitcode.com/cann/ops-math/issues/2232) [Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅靠机器人关联合并请求关闭，缺乏问题原因与解决思路总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2232    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - [关联PR #7440（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7440)    - [关联PR #7451（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7451)
- **[#2231](https://gitcode.com/cann/ops-math/issues/2231) [Requirement|需求建议] 将canndev仓TransData算子的AICPU kernel迁移到ops-math仓** — 0分
  - 痛点原因：关闭时未留下任何文字说明，且无方案文档与重复链接，未沉淀任何可复用信息。
  - 原文依据：
    - `pan-tong`：/assign    - `pan-tong`：compile    - `cann-robot`：assigned to @pan-tong    - [关联PR #3777（open）](https://gitcode.com/cann/ops-math/merge_requests/3777)    - [关联PR #4113（merged）](https://gitcode.com/cann/ops-math/merge_requests/4113)    - [关联PR #4114（open）](https://gitcode.com/cann/ops-math/merge_requests/4114)
- **[#2230](https://gitcode.com/cann/ops-math/issues/2230) [Requirement|需求建议]: 新增接口WeightQuantPreprocess** — 0分
  - 痛点原因：缺乏方案文档与复用链接，关闭说明仅提及关联合并，未沉淀任何可复用的技术细节。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2230    - `cann-robot`：add label resolved    - `sunchun`：/assign [@renzetao](https://gitcode.com/renzetao)    - `cann-robot`：assigned to @renzetao    - [关联PR #3832（merged）](https://gitcode.com/cann/ops-math/merge_requests/3832)
- **[#2229](https://gitcode.com/cann/ops-math/issues/2229) [Requirement|需求建议]: CoalesceSparse算子950实现性能优化** — 0分
  - 痛点原因：关闭说明为零且无方案文档与重复链接，仅简单指派人员，未沉淀任何可复用的解决经验。
  - 原文依据：
    - `chensi79`：assigned to @Tower19
- **[#2227](https://gitcode.com/cann/ops-math/issues/2227) [TTFHW] 构建命令中未提及 patch、ccache 等系统工具的前置依赖（构建第三方 abseil-cpp 需要 patch）** — 0分
  - 痛点原因：关闭说明仅提及仓库有安装脚本，未文档化具体解决步骤或提供相关链接，无复用价值。
  - 原文依据：
    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub    - `chensi79`：您好，本仓 install_deps.sh已提供依赖安装指令    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#2226](https://gitcode.com/cann/ops-math/issues/2226) [TTFHW] 未明确说明第三方依赖（json/makeself/eigen/protobuf/abseil-cpp/opbase/cann-cmake）的最…** — 0分
  - 痛点原因：关闭时未留下任何说明文字，仅指派人员并指向文档，缺乏可供后续复用的结论信息。
  - 原文依据：
    - `chensi79`：您好，docs/zh/install/compile.md 中给出了离线场景下第三方开源软件列表    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2225](https://gitcode.com/cann/ops-math/issues/2225) [TTFHW] README 未提供 Dockerfile（推荐 CANN 预构建 Docker 镜像，但跳过技能规则的预构建镜像约束）** — 0分
  - 痛点原因：关闭说明为0字，维护者仅以外部链接回复，未在 issue 内沉淀闭环方案，导致无复用价值。
  - 原文依据：
    - `chensi79`：感谢反馈，ops-math 仓库刻意不在仓库内维护 `Dockerfile`，按"拉取昇腾镜像仓库预构建镜像 + `docker run` 挂载昇腾设备"的方式部署。操作步骤见 https://gitcode.com/cann/ops-m…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2224](https://gitcode.com/cann/ops-math/issues/2224) [Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装** — 0分
  - 痛点原因：关闭时无任何说明文字与复现链接，仅称未复现并贴图，未沉淀可复用信息。
  - 原文依据：
    - `Joe66693`：add label documentation    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：您好，master分支最新代码编译安装并未复现您的问题，./build_out/cann-ops-math-*linux*.run可成功安装    - `chensi79`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/1426acf9-a2d5-4498-8dc0-342fdbaed3b0/image.png 'image.p…    - `cann-robot`：assigned to @chensi79
- **[#2223](https://gitcode.com/cann/ops-math/issues/2223) [Bug-Report|缺陷反馈]: DropOutV3输出mask对齐的padding部分没有清零是随机数，确定性二进制对比不过** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，关联PR仍处于open状态，未留下任何可复用的解决经验。
  - 原文依据：
    - `chensi79`：/assign [@jia-jianyong](https://gitcode.com/jia-jianyong)    - `cann-robot`：assigned to @jia-jianyong    - [关联PR #4017（open）](https://gitcode.com/cann/ops-math/merge_requests/4017)
- **[#2222](https://gitcode.com/cann/ops-math/issues/2222) [Bug-Report|缺陷反馈]: 兼容代码导致网络精度劣化，需要回退** — 0分
  - 痛点原因：关闭说明仅为机器人关联合并请求的简短话术，无方案文档化与复现链接，缺乏根因分析，无法供后续参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2222    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `sikaiwei`：assigned to @sikaiwei
- **[#2254](https://gitcode.com/cann/ops-math/issues/2254) RandomNormalLike和RandomUniformLike onnx插件存在问题** — 25分
  - 痛点原因：关闭时仅含系统状态变更与简短说明，无方案文档化沉淀，未记录具体解决过程，导致无法供他人参考。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 待办的 to 已完成    - `cann-robot`：add label Accepted    - `chensi79`：/assign [@wu-shuai2580](https://gitcode.com/wu-shuai2580)    - `cann-robot`：assigned to @wu-shuai2580    - [关联PR #4123（closed）](https://gitcode.com/cann/ops-math/merge_requests/4123)
- **[#2253](https://gitcode.com/cann/ops-math/issues/2253) [Bug-Report|缺陷反馈]: aclnnRemainderScalarTensor 在 RegBase double 路径提前降精度** — 25分
  - 痛点原因：关闭说明仅提及因关联MR合并而关闭，无方案文档化记录且未链接主issue，导致解决经验无法被复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2253    - `zhang-song-rui`：add label bug-report    - `cann-robot`：add label resolved    - `chensi79`：/assign [@zhang-song-rui](https://gitcode.com/zhang-song-rui)    - `cann-robot`：assigned to @zhang-song-rui    - [关联PR #4018（merged）](https://gitcode.com/cann/ops-math/merge_requests/4018)
- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人自动关联PR关闭，未补充人工关闭原因与复用价值说明。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 30分
  - 痛点原因：关闭说明仅 10 字且为机器人自动回复，未提供重复 issue 主链接，缺乏具体修复方案与复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `chensi79`：感谢反馈，问题修复中    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
- **[#2242](https://gitcode.com/cann/ops-math/issues/2242) [Documentation|文档反馈]: 开源仓算子列表一致性问题** — 30分
  - 痛点原因：关闭说明仅8字且无关联主链接，未提供具体方案细节，导致复用信息不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2242    - `sunchun`：add label documentation    - `cann-robot`：add label resolved    - `sunchun`：/assign    - `cann-robot`：assigned to @sunchun
- **[#2239](https://gitcode.com/cann/ops-math/issues/2239) [Documentation|文档反馈]: SparseBincount 算子 README 约束说明不完善** — 30分
  - 痛点原因：仅由机器人因关联MR合并自动关闭，关闭说明仅7字，缺乏详细的问题解决过程与方案描述，难以供他人参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2239    - `xuejinghui`：add label documentation    - `cann-robot`：add label resolved    - `xuejinghui`：/assign    - `cann-robot`：assigned to @xuejinghui    - [关联PR #4092（merged）](https://gitcode.com/cann/ops-math/merge_requests/4092)
- **[#2237](https://gitcode.com/cann/ops-math/issues/2237) [Documentation|文档反馈]: aclnnNpuFormatCast文档更新additionalDtype参数是否可选说明** — 30分
  - 痛点原因：关闭说明仅7字且依赖MR合并自动关闭，缺乏问题解决过程与方案的详细记录，无重复issue关联，参考价值低。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2237    - `cann-robot`：add label resolved    - `zhangquanxin`：/assign    - `cann-robot`：assigned to @zhangquanxin    - [关联PR #4029（merged）](https://gitcode.com/cann/ops-math/merge_requests/4029)
- **[#2246](https://gitcode.com/cann/ops-math/issues/2246) [Documentation] QuickStart输出样例中具体随机数值与环境输出不一致** — 55分
  - 痛点原因：仅由机器人自动关联MR合并关闭，未提供具体解决方案链接或重复issue主链接，复用指引不足。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2246    - `songkai111`：add label documentation    - `cann-robot`：add label resolved    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：assigned to @songkai111    - [关联PR #4103（merged）](https://gitcode.com/cann/ops-math/merge_requests/4103)
#### PP-03 标签分类缺失且路由不完整（I1 · 分配与首次响应）

- **[#2260](https://gitcode.com/cann/ops-math/issues/2260) [Requirement|需求建议]: aclnnNormalTensorTensor A2/A3分支内存优化** — 0分
  - 痛点原因：仅完成指派和关联PR操作，未对需求内容提供任何实质性技术回应。
  - 原文依据：
    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing    - [关联PR #4137（open）](https://gitcode.com/cann/ops-math/merge_requests/4137)
- **[#2259](https://gitcode.com/cann/ops-math/issues/2259) [Requirement|需求建议]: math 仓新增 InplaceTopKDistance 与 TopKPQDistanceV2 AICPU 算子** — 0分
  - 痛点原因：仅有机器人分配和认领操作，未对需求进行实质性技术评估或回复。
  - 原文依据：
    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing    - [关联PR #4133（open）](https://gitcode.com/cann/ops-math/merge_requests/4133)
- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 0分
  - 痛点原因：全程仅打标签并由机器人关联PR关闭，无任何人工实质技术回应。
  - 原文依据：
    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2256](https://gitcode.com/cann/ops-math/issues/2256) [Bug-Report|缺陷反馈]: einsum原型迁移至nn仓** — 0分
  - 痛点原因：仅进行了指派和加标签操作，全程无任何实质性技术回应。
  - 原文依据：
    - `chensi79`：/assign [@Hana77](https://gitcode.com/Hana77)    - `Hana77`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2256    - [关联PR #4128（merged）](https://gitcode.com/cann/ops-math/merge_requests/4128)
- **[#2254](https://gitcode.com/cann/ops-math/issues/2254) RandomNormalLike和RandomUniformLike onnx插件存在问题** — 0分
  - 痛点原因：仅机器人指派和打标签，无任何人工实质回应即被关闭。
  - 原文依据：
    - `chensi79`：/assign [@wu-shuai2580](https://gitcode.com/wu-shuai2580)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wu-shuai2580    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 待办的 to 已完成    - [关联PR #4123（closed）](https://gitcode.com/cann/ops-math/merge_requests/4123)
- **[#2253](https://gitcode.com/cann/ops-math/issues/2253) [Bug-Report|缺陷反馈]: aclnnRemainderScalarTensor 在 RegBase double 路径提前降精度** — 0分
  - 痛点原因：被指派人仅添加标签，机器人直接关闭，全程未提供任何针对该缺陷的技术解答或处理说明。
  - 原文依据：
    - `chensi79`：/assign [@zhang-song-rui](https://gitcode.com/zhang-song-rui)    - `zhang-song-rui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhang-song-rui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2253    - [关联PR #4018（merged）](https://gitcode.com/cann/ops-math/merge_requests/4018)
- **[#2251](https://gitcode.com/cann/ops-math/issues/2251) Dynamic_partition算子性能优化** — 0分
  - 痛点原因：首次响应耗时超15小时，且全程无人工实质解答，仅由机器人分配并关联合并请求直接关闭。
  - 原文依据：
    - `chensi79`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jzj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2251    - [关联PR #3894（merged）](https://gitcode.com/cann/ops-math/merge_requests/3894)
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 0分
  - 痛点原因：机器人8.92小时后自动打标签并随关联PR合并关闭，全程无任何人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人首次响应并关联PR合并后自动关闭，导致得分为零。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 0分
  - 痛点原因：全程无人工或技术实质回应，仅由机器人关联PR合并后自动关闭，故得0分。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 0分
  - 痛点原因：首次响应仅说问题修复中，后续仅加标签并关联MR关闭，全程无实质性解答。
  - 原文依据：
    - `chensi79`：感谢反馈，问题修复中    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
- **[#2246](https://gitcode.com/cann/ops-math/issues/2246) [Documentation] QuickStart输出样例中具体随机数值与环境输出不一致** — 0分
  - 痛点原因：维护者仅执行了指派和加标签操作，未对问题提供任何实质性回应。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2246    - [关联PR #4103（merged）](https://gitcode.com/cann/ops-math/merge_requests/4103)
- **[#2244](https://gitcode.com/cann/ops-math/issues/2244) [Bug-Report|缺陷反馈]: Topk的NonTranspose模板出现精度问题** — 0分
  - 痛点原因：全程仅打标签和分配负责人，无任何实质性技术回应便由关联合并请求直接关闭。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2244    - [关联PR #4093（merged）](https://gitcode.com/cann/ops-math/merge_requests/4093)    - [关联PR #4120（merged）](https://gitcode.com/cann/ops-math/merge_requests/4120)
- **[#2243](https://gitcode.com/cann/ops-math/issues/2243) [Requirement|需求建议]: math仓新增complex_abs支持david** — 0分
  - 痛点原因：全程仅由机器人完成分配、加标签及关联MR自动关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `qq_52874943`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2243    - [关联PR #3866（merged）](https://gitcode.com/cann/ops-math/merge_requests/3866)
- **[#2242](https://gitcode.com/cann/ops-math/issues/2242) [Documentation|文档反馈]: 开源仓算子列表一致性问题** — 0分
  - 痛点原因：全程仅有分配和打标签操作，机器人直接标记已解决，缺乏针对文档问题的实质解答。
  - 原文依据：
    - `sunchun`：/assign    - `sunchun`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunchun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2242
- **[#2241](https://gitcode.com/cann/ops-math/issues/2241) [Requirement|需求建议]: math仓新增abs_grad支持david** — 0分
  - 痛点原因：仅机器人执行分配与关闭操作，全程无人工对需求进行实质性回应。
  - 原文依据：
    - `qq_52874943`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2241    - [关联PR #3848（merged）](https://gitcode.com/cann/ops-math/merge_requests/3848)
- **[#2240](https://gitcode.com/cann/ops-math/issues/2240) [Bug-Report|缺陷反馈]: math内存在重复aclnn头文件** — 0分
  - 痛点原因：全程仅有打标签和分配操作，无任何人工实质性技术回应，最终被机器人关联MR合并关闭。
  - 原文依据：
    - `yue-ma`：add label bug-report    - `cann-robot`：add label resolved    - `yue-ma`：assigned to @yue-ma    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2240    - [关联PR #4033（merged）](https://gitcode.com/cann/ops-math/merge_requests/4033)    - [关联PR #4102（merged）](https://gitcode.com/cann/ops-math/merge_requests/4102)
- **[#2239](https://gitcode.com/cann/ops-math/issues/2239) [Documentation|文档反馈]: SparseBincount 算子 README 约束说明不完善** — 0分
  - 痛点原因：仅执行分配和打标签操作，未对文档反馈提供任何实质性解答，且被机器人直接关闭。
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2239    - [关联PR #4092（merged）](https://gitcode.com/cann/ops-math/merge_requests/4092)
- **[#2238](https://gitcode.com/cann/ops-math/issues/2238) [Bug-Report|缺陷反馈]: WeightQuantPreprocess 的review意见修改** — 0分
  - 痛点原因：仅机器人分配和打标签，无人工实质回应即因关联MR合并被关闭。
  - 原文依据：
    - `renzetao`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2238    - [关联PR #4094（merged）](https://gitcode.com/cann/ops-math/merge_requests/4094)
- **[#2237](https://gitcode.com/cann/ops-math/issues/2237) [Documentation|文档反馈]: aclnnNpuFormatCast文档更新additionalDtype参数是否可选说明** — 0分
  - 痛点原因：仅通过机器人分配并随MR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `zhangquanxin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangquanxin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2237    - [关联PR #4029（merged）](https://gitcode.com/cann/ops-math/merge_requests/4029)
- **[#2236](https://gitcode.com/cann/ops-math/issues/2236) [Requirement|需求建议]: aclnnAddN支持950** — 0分
  - 痛点原因：全程仅由机器人自动分配并随MR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `sunchun`：/assign [@ligen75](https://gitcode.com/ligen75)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ligen75    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2236    - [关联PR #4013（merged）](https://gitcode.com/cann/ops-math/merge_requests/4013)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)
- **[#2232](https://gitcode.com/cann/ops-math/issues/2232) [Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算** — 0分
  - 痛点原因：全程仅打标签和机器人自动关闭，无任何人工实质性回应。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2232    - [关联PR #7440（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7440)    - [关联PR #7451（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7451)
- **[#2231](https://gitcode.com/cann/ops-math/issues/2231) [Requirement|需求建议] 将canndev仓TransData算子的AICPU kernel迁移到ops-math仓** — 0分
  - 痛点原因：仅有机器人分配与编译指令，缺乏人工对需求的实质性回应。
  - 原文依据：
    - `pan-tong`：/assign    - `pan-tong`：compile    - `cann-robot`：assigned to @pan-tong    - [关联PR #3777（open）](https://gitcode.com/cann/ops-math/merge_requests/3777)    - [关联PR #4113（merged）](https://gitcode.com/cann/ops-math/merge_requests/4113)    - [关联PR #4114（open）](https://gitcode.com/cann/ops-math/merge_requests/4114)
- **[#2230](https://gitcode.com/cann/ops-math/issues/2230) [Requirement|需求建议]: 新增接口WeightQuantPreprocess** — 0分
  - 痛点原因：首次响应仅分配负责人，全程无任何实质性技术回应，最终由机器人自动关闭。
  - 原文依据：
    - `sunchun`：/assign [@renzetao](https://gitcode.com/renzetao)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2230    - [关联PR #3832（merged）](https://gitcode.com/cann/ops-math/merge_requests/3832)
- **[#2229](https://gitcode.com/cann/ops-math/issues/2229) [Requirement|需求建议]: CoalesceSparse算子950实现性能优化** — 0分
  - 痛点原因：首次响应仅分配了任务，始终未提供任何实质性解答或反馈。
  - 原文依据：
    - `chensi79`：assigned to @Tower19
- **[#2223](https://gitcode.com/cann/ops-math/issues/2223) [Bug-Report|缺陷反馈]: DropOutV3输出mask对齐的padding部分没有清零是随机数，确定性二进制对比不过** — 0分
  - 痛点原因：首次响应仅为分配负责人，开发者未对该缺陷提供任何实质性文字回复。
  - 原文依据：
    - `chensi79`：/assign [@jia-jianyong](https://gitcode.com/jia-jianyong)    - `cann-robot`：assigned to @jia-jianyong    - [关联PR #4017（open）](https://gitcode.com/cann/ops-math/merge_requests/4017)
- **[#2222](https://gitcode.com/cann/ops-math/issues/2222) [Bug-Report|缺陷反馈]: 兼容代码导致网络精度劣化，需要回退** — 0分
  - 痛点原因：仅执行了分配和加标签操作，全程无人工实质性技术回应，直接被机器人标记为已解决。
  - 原文依据：
    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved    - `sikaiwei`：assigned to @sikaiwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2222
#### PP-04 Bot覆盖不足且存在误关闭风险（G · Bot/Agent 治理）

- **[#2258](https://gitcode.com/cann/ops-math/issues/2258) [Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，评论数为0，缺乏自动回复与状态同步等互动反馈，治理有效性差。
  - 原文依据：
    - `kevin_huang1234`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2258    - [关联PR #4136（merged）](https://gitcode.com/cann/ops-math/merge_requests/4136)
- **[#2256](https://gitcode.com/cann/ops-math/issues/2256) [Bug-Report|缺陷反馈]: einsum原型迁移至nn仓** — 20分
  - 痛点原因：Bot关闭issue时未留任何评论说明原因，全程零互动，仅机械打标指派导致治理效果差。
  - 原文依据：
    - `chensi79`：/assign [@Hana77](https://gitcode.com/Hana77)    - `Hana77`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2256    - [关联PR #4128（merged）](https://gitcode.com/cann/ops-math/merge_requests/4128)
- **[#2254](https://gitcode.com/cann/ops-math/issues/2254) RandomNormalLike和RandomUniformLike onnx插件存在问题** — 20分
  - 痛点原因：Bot仅完成打标与指派，无任何评论互动，且最终由人工手动关闭，未实现自动化闭环治理。
  - 原文依据：
    - `chensi79`：/assign [@wu-shuai2580](https://gitcode.com/wu-shuai2580)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wu-shuai2580    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 待办的 to 已完成    - [关联PR #4123（closed）](https://gitcode.com/cann/ops-math/merge_requests/4123)
- **[#2253](https://gitcode.com/cann/ops-math/issues/2253) [Bug-Report|缺陷反馈]: aclnnRemainderScalarTensor 在 RegBase double 路径提前降精度** — 20分
  - 痛点原因：Bot仅机械执行打标与指派，无任何评论交互，且与人工操作重叠，未发挥实际治理价值。
  - 原文依据：
    - `chensi79`：/assign [@zhang-song-rui](https://gitcode.com/zhang-song-rui)    - `zhang-song-rui`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhang-song-rui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2253    - [关联PR #4018（merged）](https://gitcode.com/cann/ops-math/merge_requests/4018)
- **[#2251](https://gitcode.com/cann/ops-math/issues/2251) Dynamic_partition算子性能优化** — 20分
  - 痛点原因：Bot仅执行打标与关闭动作，全程无评论交互，缺乏状态同步与说明，导致治理过程不透明且有效性不足。
  - 原文依据：
    - `chensi79`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jzj007    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2251    - [关联PR #3894（merged）](https://gitcode.com/cann/ops-math/merge_requests/3894)
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，无任何评论说明，缺乏与用户的交互，治理有效性低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭动作，全程无任何评论说明，导致治理过程缺乏透明度与有效反馈。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭动作，未产生任何有效评论或交互说明，缺乏实质性治理交互。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，缺乏对用户反馈的自动回复与有效互动引导。
  - 原文依据：
    - `chensi79`：感谢反馈，问题修复中    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)
- **[#2246](https://gitcode.com/cann/ops-math/issues/2246) [Documentation] QuickStart输出样例中具体随机数值与环境输出不一致** — 20分
  - 痛点原因：Bot仅机械执行打标与分配，评论数为零，缺乏与用户的实质互动和治理引导，未发挥有效作用。
  - 原文依据：
    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `songkai111`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2246    - [关联PR #4103（merged）](https://gitcode.com/cann/ops-math/merge_requests/4103)
- **[#2244](https://gitcode.com/cann/ops-math/issues/2244) [Bug-Report|缺陷反馈]: Topk的NonTranspose模板出现精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标和关闭操作，无任何有效评论与用户互动，治理缺乏透明度。
  - 原文依据：
    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2244    - [关联PR #4093（merged）](https://gitcode.com/cann/ops-math/merge_requests/4093)    - [关联PR #4120（merged）](https://gitcode.com/cann/ops-math/merge_requests/4120)
- **[#2243](https://gitcode.com/cann/ops-math/issues/2243) [Requirement|需求建议]: math仓新增complex_abs支持david** — 20分
  - 痛点原因：Bot仅机械执行分配、打标与关闭动作，未产生任何有效评论与用户互动，缺乏反馈机制。
  - 原文依据：
    - `qq_52874943`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2243    - [关联PR #3866（merged）](https://gitcode.com/cann/ops-math/merge_requests/3866)
- **[#2242](https://gitcode.com/cann/ops-math/issues/2242) [Documentation|文档反馈]: 开源仓算子列表一致性问题** — 20分
  - 痛点原因：Bot仅被动执行人工指令打标指派并静默关闭，全程零评论无状态反馈或引导，缺乏主动沟通与治理深度。
  - 原文依据：
    - `sunchun`：/assign    - `sunchun`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunchun    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2242
- **[#2241](https://gitcode.com/cann/ops-math/issues/2241) [Requirement|需求建议]: math仓新增abs_grad支持david** — 20分
  - 痛点原因：Bot仅静默执行打标与关闭，评论数为零，缺乏状态变更的公开反馈，治理过程缺乏透明度。
  - 原文依据：
    - `qq_52874943`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2241    - [关联PR #3848（merged）](https://gitcode.com/cann/ops-math/merge_requests/3848)
- **[#2240](https://gitcode.com/cann/ops-math/issues/2240) [Bug-Report|缺陷反馈]: math内存在重复aclnn头文件** — 20分
  - 痛点原因：Bot仅执行机械打标和随MR合并关闭，评论数为0，缺乏与用户的实质性互动和治理反馈。
  - 原文依据：
    - `yue-ma`：add label bug-report    - `cann-robot`：add label resolved    - `yue-ma`：assigned to @yue-ma    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2240    - [关联PR #4033（merged）](https://gitcode.com/cann/ops-math/merge_requests/4033)    - [关联PR #4102（merged）](https://gitcode.com/cann/ops-math/merge_requests/4102)
- **[#2239](https://gitcode.com/cann/ops-math/issues/2239) [Documentation|文档反馈]: SparseBincount 算子 README 约束说明不完善** — 20分
  - 痛点原因：Bot治理有效性得分20，低于合格线 60
  - 原文依据：
    - `xuejinghui`：/assign    - `xuejinghui`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2239    - [关联PR #4092（merged）](https://gitcode.com/cann/ops-math/merge_requests/4092)
- **[#2238](https://gitcode.com/cann/ops-math/issues/2238) [Bug-Report|缺陷反馈]: WeightQuantPreprocess 的review意见修改** — 20分
  - 痛点原因：Bot仅机械执行打标、分配和关闭，评论数为零，缺乏与用户的互动沟通，治理体验差。
  - 原文依据：
    - `renzetao`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2238    - [关联PR #4094（merged）](https://gitcode.com/cann/ops-math/merge_requests/4094)
- **[#2237](https://gitcode.com/cann/ops-math/issues/2237) [Documentation|文档反馈]: aclnnNpuFormatCast文档更新additionalDtype参数是否可选说明** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为0，缺乏与用户的互动反馈，治理动作单一。
  - 原文依据：
    - `zhangquanxin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangquanxin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2237    - [关联PR #4029（merged）](https://gitcode.com/cann/ops-math/merge_requests/4029)
- **[#2236](https://gitcode.com/cann/ops-math/issues/2236) [Requirement|需求建议]: aclnnAddN支持950** — 20分
  - 痛点原因：Bot仅机械执行打标、指派与关闭操作，全程无任何评论互动，缺乏透明度与有效沟通，导致治理效果差。
  - 原文依据：
    - `sunchun`：/assign [@ligen75](https://gitcode.com/ligen75)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ligen75    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2236    - [关联PR #4013（merged）](https://gitcode.com/cann/ops-math/merge_requests/4013)
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，评论数为零，未与用户进行任何有效交互及处理进展同步。
  - 原文依据：
    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)
- **[#2232](https://gitcode.com/cann/ops-math/issues/2232) [Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算** — 20分
  - 痛点原因：Bot仅机械打标并关闭issue，评论数为0，未提供任何关闭原因说明或用户引导。
  - 原文依据：
    - `liaohuming`：add label bug-report    - `cann-robot`：add label resolved    - `liaohuming`：assigned to @liaohuming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2232    - [关联PR #7440（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7440)    - [关联PR #7451（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7451)
- **[#2230](https://gitcode.com/cann/ops-math/issues/2230) [Requirement|需求建议]: 新增接口WeightQuantPreprocess** — 20分
  - 痛点原因：Bot治理有效性得分20，低于合格线 60
  - 原文依据：
    - `sunchun`：/assign [@renzetao](https://gitcode.com/renzetao)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2230    - [关联PR #3832（merged）](https://gitcode.com/cann/ops-math/merge_requests/3832)
#### PP-05 Open issue长期搁置无SLA约束（I2 · 讨论与解决）

- **[#2235](https://gitcode.com/cann/ops-math/issues/2235) [Requirement|需求建议]: ops-math仓的编译体系不支持在无binary.json的情况下编译特殊命名格式的算子** — 0分
  - 痛点原因：关联PR未合并，无commit、文档及release引用，仅口头表示修复中，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #4091（open）](https://gitcode.com/cann/ops-math/merge_requests/4091)    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `chensi79`：感谢反馈。math仓在没有配置binary.json的情况下，是根据目录名反推算子类型，破坏了 ULQ 这个缩写的大小写，最终导致自动生成的 binary.json 缺失。问题修复中，请耐心等待。    - `Coder_Nerd`：add label requirement    - `cann-robot`：assigned to @songkai111
- **[#2257](https://gitcode.com/cann/ops-math/issues/2257) [Bug-Report|缺陷反馈]: 使用build.sh --genop生成的算子默认无法编译成功** — 15分
  - 痛点原因：未关联任何修复PR或提交记录，也无关闭评论说明解决过程，缺乏实质性解决证据。
  - 原文依据：
    - `songkai111`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/e73a7c41-1d4f-47a7-af14-adacb2b17c69/image.png 'image.p…    - `sunchun`：/assign [@songkai111](https://gitcode.com/songkai111)    - `mlh0101`：add label bug-report    - `cann-robot`：assigned to @songkai111
- **[#2252](https://gitcode.com/cann/ops-math/issues/2252) [Documentation|文档反馈]: feeds_repeat做了950兼容适配支持950** — 15分
  - 痛点原因：未关联 PR、commit 或 release 等实质性解决证据，仅停留在对话指派阶段，无法证明问题已实际解决。
  - 原文依据：
    - `chensi79`：您好，当前feeds_repeat不支持950 ，您是要贡献950适配代码吗？    - `Almost_CANN`：长尾算子做了950兼容性适配，需要刷新下文档。    - `chensi79`：assigned to @Almost_CANN
- **[#2240](https://gitcode.com/cann/ops-math/issues/2240) [Bug-Report|缺陷反馈]: math内存在重复aclnn头文件** — 15分
  - 痛点原因：仅靠关联PR和机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #4033（merged）](https://gitcode.com/cann/ops-math/merge_requests/4033)    - [关联PR #4102（merged）](https://gitcode.com/cann/ops-math/merge_requests/4102)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2240    - `yue-ma`：add label bug-report    - `cann-robot`：add label resolved    - `yue-ma`：assigned to @yue-ma
- **[#2234](https://gitcode.com/cann/ops-math/issues/2234) [Bug-Report|缺陷反馈]: transpose算子5102架构021模板出现AIC ERROR** — 15分
  - 痛点原因：仅靠机器人自动关联PR关闭，缺乏commit引用、人工关闭评论及文档链接等具体解决证据。
  - 原文依据：
    - [关联PR #4019（merged）](https://gitcode.com/cann/ops-math/merge_requests/4019)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2234    - `focusforce`：add label bug-report    - `cann-robot`：add label resolved
- **[#2232](https://gitcode.com/cann/ops-math/issues/2232) [Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算** — 15分
  - 痛点原因：虽关联多个已合并PR，但无commit引用、文档链接及关闭评论，证据链不完整且缺乏解决总结说明。
  - 原文依据：
    - [关联PR #7440（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7440)    - [关联PR #7451（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7451)    - [关联PR #7498（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7498)    - [关联PR #7499（merged）](https://gitcode.com/cann/ops-nn/merge_requests/7499)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: cann/ops-math#issue2232    - `liaohuming`：add label bug-report
- **[#2225](https://gitcode.com/cann/ops-math/issues/2225) [TTFHW] README 未提供 Dockerfile（推荐 CANN 预构建 Docker 镜像，但跳过技能规则的预构建镜像约束）** — 15分
  - 痛点原因：仅靠评论提供文档链接，无关联PR、代码提交或明确关闭评论，缺乏实质性解决证据。
  - 原文依据：
    - `chensi79`：感谢反馈，ops-math 仓库刻意不在仓库内维护 `Dockerfile`，按"拉取昇腾镜像仓库预构建镜像 + `docker run` 挂载昇腾设备"的方式部署。操作步骤见 https://gitcode.com/cann/ops-m…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2223](https://gitcode.com/cann/ops-math/issues/2223) [Bug-Report|缺陷反馈]: DropOutV3输出mask对齐的padding部分没有清零是随机数，确定性二进制对比不过** — 15分
  - 痛点原因：关联的修复PR仍处于未合并的open状态，缺乏已修复的commit或release证据，仅完成了负责人分配。
  - 原文依据：
    - [关联PR #4017（open）](https://gitcode.com/cann/ops-math/merge_requests/4017)    - `chensi79`：/assign [@jia-jianyong](https://gitcode.com/jia-jianyong)    - `cann-robot`：assigned to @jia-jianyong
- **[#2254](https://gitcode.com/cann/ops-math/issues/2254) RandomNormalLike和RandomUniformLike onnx插件存在问题** — 23分
  - 痛点原因：虽有合并PR，但缺乏commit、文档及release引用，且关联多个未合并PR，导致证据强度不足。
  - 原文依据：
    - [关联PR #4123（closed）](https://gitcode.com/cann/ops-math/merge_requests/4123)    - [关联PR #4127（merged）](https://gitcode.com/cann/ops-math/merge_requests/4127)    - [关联PR #4129（closed）](https://gitcode.com/cann/ops-math/merge_requests/4129)    - `chensi79`：/assign [@wu-shuai2580](https://gitcode.com/wu-shuai2580)    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 待办的 to 已完成
- **[#2243](https://gitcode.com/cann/ops-math/issues/2243) [Requirement|需求建议]: math仓新增complex_abs支持david** — 23分
  - 痛点原因：仅靠机器人因关联issue的MR合并而自动关闭，缺乏commit引用、文档链接及release说明等直接解决证据。
  - 原文依据：
    - [关联PR #3866（merged）](https://gitcode.com/cann/ops-math/merge_requests/3866)    - `qq_52874943`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2243    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943
- **[#2241](https://gitcode.com/cann/ops-math/issues/2241) [Requirement|需求建议]: math仓新增abs_grad支持david** — 23分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工确认解决结果的说明、文档链接及commit引用，证据单薄。
  - 原文依据：
    - [关联PR #3848（merged）](https://gitcode.com/cann/ops-math/merge_requests/3848)    - `qq_52874943`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2241    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_52874943
- **[#2238](https://gitcode.com/cann/ops-math/issues/2238) [Bug-Report|缺陷反馈]: WeightQuantPreprocess 的review意见修改** — 23分
  - 痛点原因：仅靠机器人关联PR并自动关闭，缺乏commit引用、文档及release链接等强解决证据支撑。
  - 原文依据：
    - [关联PR #4094（merged）](https://gitcode.com/cann/ops-math/merge_requests/4094)    - `renzetao`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2238    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao
- **[#2236](https://gitcode.com/cann/ops-math/issues/2236) [Requirement|需求建议]: aclnnAddN支持950** — 23分
  - 痛点原因：虽有合并的关联PR和机器人关闭评论，但缺少commit引用、文档链接和release引用等直接证据支撑。
  - 原文依据：
    - [关联PR #4013（merged）](https://gitcode.com/cann/ops-math/merge_requests/4013)    - `sunchun`：/assign [@ligen75](https://gitcode.com/ligen75)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2236    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @ligen75
- **[#2227](https://gitcode.com/cann/ops-math/issues/2227) [TTFHW] 构建命令中未提及 patch、ccache 等系统工具的前置依赖（构建第三方 abseil-cpp 需要 patch）** — 23分
  - 痛点原因：仅凭口头声明解决即关闭，缺乏关联PR、commit或文档链接等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，本仓 install_deps.sh已提供依赖安装指令    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：changed custom state from 进行中 to 已完成    - `sunchun`：closed from codehub
- **[#2260](https://gitcode.com/cann/ops-math/issues/2260) [Requirement|需求建议]: aclnnNormalTensorTensor A2/A3分支内存优化** — 31分
  - 痛点原因：关联PR仍处于open状态未合并，且无关闭评论与release引用，缺乏实质解决闭环证据。
  - 原文依据：
    - [关联PR #4137（open）](https://gitcode.com/cann/ops-math/merge_requests/4137)    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing
- **[#2259](https://gitcode.com/cann/ops-math/issues/2259) [Requirement|需求建议]: math 仓新增 InplaceTopKDistance 与 TopKPQDistanceV2 AICPU 算子** — 31分
  - 痛点原因：关联的 PR 仍处于 open 状态，且无关闭评论、文档及 release 引用，缺乏问题已解决的闭环证据。
  - 原文依据：
    - [关联PR #4133（open）](https://gitcode.com/cann/ops-math/merge_requests/4133)    - `Ding_Jing`：/assign    - `cann-robot`：assigned to @Ding_Jing
- **[#2250](https://gitcode.com/cann/ops-math/issues/2250) 【UT补充】补充bitwise_xor算子op_api单元测试** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论和文档链接等明确的解决说明。
  - 原文依据：
    - [关联PR #4054（merged）](https://gitcode.com/cann/ops-math/merge_requests/4054)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2250    - `cann-robot`：add label resolved
- **[#2249](https://gitcode.com/cann/ops-math/issues/2249) 【UT补充】补充bitwise_or算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工关闭评论、文档链接及release引用等强解决证据。
  - 原文依据：
    - [关联PR #4053（merged）](https://gitcode.com/cann/ops-math/merge_requests/4053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2249    - `cann-robot`：add label resolved
- **[#2248](https://gitcode.com/cann/ops-math/issues/2248) 【UT补充】补充bitwise_and算子op_api单元测试** — 31分
  - 痛点原因：仅靠机器人自动关闭和关联PR，缺乏人工确认解决的评论及文档或版本引用等强证据。
  - 原文依据：
    - [关联PR #4052（merged）](https://gitcode.com/cann/ops-math/merge_requests/4052)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2248    - `cann-robot`：add label resolved
- **[#2244](https://gitcode.com/cann/ops-math/issues/2244) [Bug-Report|缺陷反馈]: Topk的NonTranspose模板出现精度问题** — 31分
  - 痛点原因：虽有两个已合并PR，但无文档链接、无release引用、无关闭评论，仅靠机器人自动关闭，缺乏人工验证与解决说明。
  - 原文依据：
    - [关联PR #4093（merged）](https://gitcode.com/cann/ops-math/merge_requests/4093)    - [关联PR #4120（merged）](https://gitcode.com/cann/ops-math/merge_requests/4120)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2244    - `caoyan_huawei`：add label bug-report    - `cann-robot`：add label resolved    - `caoyan_huawei`：assigned to @caoyan_huawei
- **[#2231](https://gitcode.com/cann/ops-math/issues/2231) [Requirement|需求建议] 将canndev仓TransData算子的AICPU kernel迁移到ops-math仓** — 31分
  - 痛点原因：关联的4个PR中仅1个被合并，其余3个仍为open状态，且缺乏关闭评论等最终解决证据。
  - 原文依据：
    - [关联PR #3777（open）](https://gitcode.com/cann/ops-math/merge_requests/3777)    - [关联PR #4113（merged）](https://gitcode.com/cann/ops-math/merge_requests/4113)    - [关联PR #4114（open）](https://gitcode.com/cann/ops-math/merge_requests/4114)    - [关联PR #4115（open）](https://gitcode.com/cann/ops-math/merge_requests/4115)    - `pan-tong`：/assign    - `pan-tong`：compile
- **[#2226](https://gitcode.com/cann/ops-math/issues/2226) [TTFHW] 未明确说明第三方依赖（json/makeself/eigen/protobuf/abseil-cpp/opbase/cann-cmake）的最…** — 31分
  - 痛点原因：无关联PR和commit引用等代码修复证据，且关闭时无明确解决评论，仅靠文档链接和指派无法证明问题已修复。
  - 原文依据：
    - `chensi79`：您好，docs/zh/install/compile.md 中给出了离线场景下第三方开源软件列表    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `cann-robot`：assigned to @chensi79
- **[#2256](https://gitcode.com/cann/ops-math/issues/2256) [Bug-Report|缺陷反馈]: einsum原型迁移至nn仓** — 38分
  - 痛点原因：缺少commit引用与文档链接，且关闭评论仅为机器人自动关闭，缺乏人工对解决结果的详细说明。
  - 原文依据：
    - [关联PR #4128（merged）](https://gitcode.com/cann/ops-math/merge_requests/4128)    - `chensi79`：/assign [@Hana77](https://gitcode.com/Hana77)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2256    - `Hana77`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Hana77
- **[#2247](https://gitcode.com/cann/ops-math/issues/2247) [Documentation|文档反馈]: math仓编译运行样例是Abs，但是示例结果叫“mean result”，给人歧义** — 38分
  - 痛点原因：虽有关联PR被合并，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工对修复结果的明确验证。
  - 原文依据：
    - [关联PR #4119（merged）](https://gitcode.com/cann/ops-math/merge_requests/4119)    - [关联PR #4121（merged）](https://gitcode.com/cann/ops-math/merge_requests/4121)    - `chensi79`：感谢反馈，问题修复中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2247    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#2242](https://gitcode.com/cann/ops-math/issues/2242) [Documentation|文档反馈]: 开源仓算子列表一致性问题** — 38分
  - 痛点原因：仅靠机器人因关联MR合并自动关闭，未直接关联PR或引用commit，缺乏代码解决证据。
  - 原文依据：
    - `sunchun`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2242    - `sunchun`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sunchun
- **[#2237](https://gitcode.com/cann/ops-math/issues/2237) [Documentation|文档反馈]: aclnnNpuFormatCast文档更新additionalDtype参数是否可选说明** — 38分
  - 痛点原因：虽有合并的关联PR及机器人关闭说明，但缺少commit引用与release引用，导致证据链不完整。
  - 原文依据：
    - [关联PR #4029（merged）](https://gitcode.com/cann/ops-math/merge_requests/4029)    - `zhangquanxin`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2237    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangquanxin
- **[#2233](https://gitcode.com/cann/ops-math/issues/2233) 【文档缺陷】CANN离线安装文档未说明非交互式安装参数** — 38分
  - 痛点原因：关闭时仅口头声明已解决，未提供关联PR、commit或release等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，交互时请输入“y”接受EULA，才能继续安装 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/d82cb66c-4f4c-43ff-902c-e8881…    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chensi79
- **[#2222](https://gitcode.com/cann/ops-math/issues/2222) [Bug-Report|缺陷反馈]: 兼容代码导致网络精度劣化，需要回退** — 38分
  - 痛点原因：虽有合并的关联PR，但缺乏commit和文档链接，且关闭评论仅为机器人自动回复，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #4016（merged）](https://gitcode.com/cann/ops-math/merge_requests/4016)    - `sikaiwei`：/assign [@sikaiwei](https://gitcode.com/sikaiwei)    - `cann-robot`：### Notice This issue is already assigned to ***sikaiwei***. Please do not assign repeatedly.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2222    - `sikaiwei`：add label bug-report    - `cann-robot`：add label resolved
- **[#2255](https://gitcode.com/cann/ops-math/issues/2255) [Bug-Report|缺陷反馈]: 【社区任务】KLDivV2 算子 experimental 分支编译失败：op_api 跨算子依赖问题** — 46分
  - 痛点原因：未关联修复PR且关闭时无总结评论，仅靠评论中的参考链接作为解决依据，未形成代码修复闭环。
  - 原文依据：
    - `fullt`：在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMake…    - `qq_64858158`：>在CMakeLists.txt文件中添加DEPENDENCIES 依赖算子目录实现 >可参考https://gitcode.com/cann/ops-math/blob/master/experimental/math/tile/CMa…    - `fullt`：add label wait-feedback    - `cann-robot`：delete label wait-feedback    - `fullt`：assigned to @fullt
- **[#2245](https://gitcode.com/cann/ops-math/issues/2245) [Requirement|需求建议]: 【社区任务】[性能差异分析][Ascend 910B] SquaredDifference 的 BF16/INT64 …** — 46分
  - 痛点原因：缺乏关联PR，评论仅显示任务分配与初步讨论，无最终解决方案或关闭确认，解决证据不足。
  - 原文依据：
    - `sunchun`：/assign    - `condfuse_3`：tbe跑一下仿真，看一下bfloat16和int64 具体使用的是哪个指令 [@Mars_Cheng_cys](https://gitcode.com/Mars_Cheng_cys)    - `cann-robot`：assigned to @sunchun
- **[#2229](https://gitcode.com/cann/ops-math/issues/2229) [Requirement|需求建议]: CoalesceSparse算子950实现性能优化** — 46分
  - 痛点原因：缺乏关联PR且关闭时无评论说明，仅靠指派和commit/release引用关闭，解决过程证据不足。
  - 原文依据：
    - `chensi79`：assigned to @Tower19
- **[#2224](https://gitcode.com/cann/ops-math/issues/2224) [Documentation|文档反馈]: QUICKSTART文档安装命令缺少必要的 --full 参数，导致按文档操作直接报错无法安装** — 46分
  - 痛点原因：维护者仅声称未复现问题，未提供关联PR或修复说明等实质解决证据，且无关闭评论确认最终结果。
  - 原文依据：
    - `sunchun`：/assign [@chensi79](https://gitcode.com/chensi79)    - `chensi79`：您好，master分支最新代码编译安装并未复现您的问题，./build_out/cann-ops-math-*linux*.run可成功安装    - `chensi79`：![image.png](https://raw.gitcode.com/user-images/assets/7649531/1426acf9-a2d5-4498-8dc0-342fdbaed3b0/image.png 'image.p…    - `Joe66693`：add label documentation    - `cann-robot`：assigned to @chensi79
- **[#2251](https://gitcode.com/cann/ops-math/issues/2251) Dynamic_partition算子性能优化** — 54分
  - 痛点原因：虽有合并的PR和commit，但缺少文档链接与release引用，且关闭过程仅由机器人自动触发，缺乏人工总结。
  - 原文依据：
    - [关联PR #3894（merged）](https://gitcode.com/cann/ops-math/merge_requests/3894)    - `chensi79`：/assign [@jzj007](https://gitcode.com/jzj007)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2251    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jzj007
- **[#2246](https://gitcode.com/cann/ops-math/issues/2246) [Documentation] QuickStart输出样例中具体随机数值与环境输出不一致** — 54分
  - 痛点原因：虽有关联PR和机器人关闭评论，但缺少直接的commit引用，导致解决依据强度不足。
  - 原文依据：
    - [关联PR #4103（merged）](https://gitcode.com/cann/ops-math/merge_requests/4103)    - `songkai111`：/assign [@songkai111](https://gitcode.com/songkai111)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2246    - `songkai111`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @songkai111
- **[#2230](https://gitcode.com/cann/ops-math/issues/2230) [Requirement|需求建议]: 新增接口WeightQuantPreprocess** — 54分
  - 痛点原因：虽有合并的PR和机器人自动关闭，但缺乏文档链接与release引用，且无人工对解决结果的详细说明。
  - 原文依据：
    - [关联PR #3832（merged）](https://gitcode.com/cann/ops-math/merge_requests/3832)    - `sunchun`：/assign [@renzetao](https://gitcode.com/renzetao)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2230    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @renzetao
- **[#2228](https://gitcode.com/cann/ops-math/issues/2228) [TTFHW] CANN 工具链版本与 ops-math 仓库版本配套关系未在 README 中显式给出（master 分支对应 CANN 版本需自行查询 r…** — 54分
  - 痛点原因：仅靠评论指出文档已有说明便关闭问题，未提供关联PR或commit引用等代码级解决证据。
  - 原文依据：
    - `chensi79`：您好，README文档 **版本配套** 章节已给出CANN软件版本与ops-math 仓源码对应关系 ![image.png](https://raw.gitcode.com/user-images/assets/7649531/ed8…    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue assign后48小时无新评论 |
| 具体动作 | 自动提醒assignee跟进或触发重新分配 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 70 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 33.9，低分 36/39；OBJ_RESULT_FORMATION_TIMELINESS：均值 70.8，低分 11/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 70.8，低分 11/39 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 33.9，低分 36/39 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 已关联PR进行代码实现，但issue内缺乏进一步讨论交流。 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `chensi79` |
| 触发条件 | Issue关闭前 |
| 具体动作 | 强制填写关闭模板（解决摘要、根因说明、复用建议、后续反馈路径） |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 65 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 10.4，低分 37/39；OBJ_DECISION_TRANSPARENCY：均值 51.7，低分 21/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 10.4，低分 37/39 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 51.7，低分 21/39 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | Issue未关闭，后续反馈路径信息不足，保守给中性分。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot/自动化工具；候选负责人 `chensi79` |
| 触发条件 | Issue创建时根据标题前缀和正文内容 |
| 具体动作 | 自动添加类型标签（bug/requirement/documentation）和优先级标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 90 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 27.2，低分 28/39；OBJ_RESPONSE_SPEED：均值 88.7，低分 0/39 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 27.2，低分 28/39 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 88.7，低分 0/39 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 有明确认领者Ding_Jing且关联了对应PR，责任归属清晰。 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建

本阶段分数为 **81.3/100**，整体相对可控，但仍需关注：轻微痛点，个别Issue输入质量过低（如#2254仅一句话描述），…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 89.5 | 内部贡献者提交的专业需求，内容详实无幻觉，非AI噪音。 |
| `SUB_INPUT_QUALITY` 输入质量 | 73.2 | 需求描述详尽，包含背景、价值、设计方案及约束，结构化程度高。 |

代表低分 Issue：[#2254](https://gitcode.com/cann/ops-math/issues/2254)
问题：RandomNormalLike和RandomUniformLike onnx插件存在问题。

### I1 · 分配与首次响应

本阶段分数为 **64.8/100**，整体相对可控，但仍需关注：标签分类缺失且路由不完整。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 27.2 | 均值 27.2，低分 28/39 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 88.7 | 均值 88.7，低分 0/39 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 77.3 | 有明确认领者Ding_Jing且关联了对应PR，责任归属清晰。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 72.8 | bot正确执行assign命令，将issue分配给提出者，分流路径合理。 |

代表低分 Issue：[#2258](https://gitcode.com/cann/ops-math/issues/2258)
问题：[Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明。

### I2 · 讨论与解决

本阶段分数为 **55.8/100**，本阶段需要改进，主要问题是：讨论停滞且assignee跟进不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 70.8 | 均值 70.8，低分 11/39 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 33.9 | 均值 33.9，低分 36/39 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 55.7 | 已关联PR进行代码实现，但issue内缺乏进一步讨论交流。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 66.2 | 已有PR跟进实现，但尚未合并，目标仍在推进中未最终达成。 |

代表低分 Issue：[#2257](https://gitcode.com/cann/ops-math/issues/2257)
问题：[Bug-Report|缺陷反馈]: 使用build.sh --genop生成的算子默认无法编译成功。

### I3 · 总结与关闭

本阶段分数为 **44.1/100**，本阶段需要改进，主要问题是：关闭缺乏解决证据与知识沉淀。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 10.4 | 均值 10.4，低分 37/39 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 51.7 | 均值 51.7，低分 21/39 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 46.0 | Issue未关闭，后续反馈路径信息不足，保守给中性分。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 81.3 | Issue仍处于open状态，不存在过早关闭风险。 |

代表低分 Issue：[#2232](https://gitcode.com/cann/ops-math/issues/2232)
问题：[Bug-Report|缺陷反馈]: A5走进inplace_add_with_sorted算子仅支持确定性计算。

### G · Bot/Agent 治理

本阶段分数为 **68.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 37.4 | 均值 37.4，低分 22/39 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 95.4 | 均值 95.4，低分 0/39 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 71.9 | bot分配后人工已关联PR继续推进，交接顺畅无停滞。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 69.1 | bot正确执行assign、MR合并关闭和resolved标签，有效推进流程 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 74.2 | bot准确执行assign命令，时机及时，动作合规无误导。 |

代表低分 Issue：[#2258](https://gitcode.com/cann/ops-math/issues/2258)
问题：[Bug-Report|缺陷反馈]: SparseReshape算子indices输入的值约束未加说明。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 39 | 47.9 | 首期基线 | 81.3 | 64.8 | 55.8 | 44.1 | 68.5 |

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
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：88.7/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-07-13_to_2026-07-19.json`。
