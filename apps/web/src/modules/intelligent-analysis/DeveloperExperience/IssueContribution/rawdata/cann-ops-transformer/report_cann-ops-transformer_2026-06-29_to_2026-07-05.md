# Issue 贡献体验周报 · cann/ops-transformer

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-transformer` 共收到 **197** 个 Issue
+ 其中外部 Issue **70** 个、内部 **127** 个；I1–I3 及 G 基于「外部且成熟」的 **70** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 18 / Closed 179**，关闭率 **90.9%**。
+ 总体体验分为 **47.5/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P2 | I3 · 总结与关闭 | 46.4 | — |
| P0 | I2 · 讨论与解决 | 55.0 | 分配后无实质技术讨论 |
| P1 | I1 · 分配与首次响应 | 62.7 | 分配后责任人无实质响应 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 自动提醒被指派者并升级至备选负责人，同时在Issue中标注stale-discussion标签 |
| REC-02 | P1 | 在Issue中明确标注resolution-found标签并@用户确认，提供验证步骤和预期关闭时间 |
| REC-03 | P1 | 主动发布讨论状态总结评论，明确当前进展、待办项和责任人，推动下一轮交互 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 197 |
| Open / Closed | 18 / 179 |
| 关闭率 | 90.9% |
| 类型构成 | 缺陷 87 / 需求 67 / 咨询 4 / 其他 39 |
| 总体体验分 | 47.5/100（D） |
| 首次响应时间 | 中位 2.4h；均值 17.0h |
| 关闭周期 | 中位 1.1天；均值 3.7天 |
| 7天响应率 | 99.0% |
| 评论数/Issue | 1.11 |
| 标签覆盖率 | 91.4% |
| 指派覆盖率 | 88.8% |
| 数据完整性 | 92.8/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 79.4 | 14/197（7.1%） | 相对可控 | `SUB_INPUT_QUALITY` 67.9 |
| I1 · 分配与首次响应 | 62.7 | 37/70（52.9%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 35.7 |
| I2 · 讨论与解决 | 55.0 | 41/70（58.6%） | P0 | `OBJ_SOLUTION_EVIDENCE` 28.5 |
| I3 · 总结与关闭 | 46.4 | 51/70（72.9%） | 需改进 | `OBJ_CLOSURE_REUSE` 18.1 |
| G · Bot/Agent 治理（参考） | 66.2 | 12/70（17.1%） | 参考项 | `OBJ_BOT_GOVERNANCE` 30.9 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 分配后无实质技术讨论 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 | 用户问题长期搁置无推进，社区响应效率严重下降，贡献者信任受损 |
| PP-02 | P1 | I2 · 讨论与解决 | 解决方案长期未形成 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 | 已定位的问题无法闭环，重复问题无法参考已有方案，社区知识沉淀断裂 |
| PP-03 | P1 | I2 · 讨论与解决 | 讨论中途停滞无收束 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 | 已投入的讨论成本浪费，用户体验恶化，问题悬而未决 |
| PP-04 | P1 | I1 · 分配与首次响应 | 分配后责任人无实质响应 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 35.7，低分 45/70；OBJ_RESPONSE_SPEED：均值 76.3，低分 2/70 | 高质量Bug和文档反馈被搁置无跟进，严重损害社区信任和用户留存 |
| PP-05 | P1 | I1 · 分配与首次响应 | 标签与优先级分类普遍缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 35.7，低分 45/70；OBJ_RESPONSE_SPEED：均值 76.3，低分 2/70 | 无法基于标签自动化路由和优先级排序，高优先级问题可能被淹没在普通队列中 |
| PP-06 | P2 | I2 · 讨论与解决 | 多次重分配致责任不清 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 | 责任归属混乱导致跟进效率低下，讨论无法深入技术层面 |
| PP-07 | P2 | I1 · 分配与首次响应 | 多次重分配导致责任归属混乱 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 35.7，低分 45/70；OBJ_RESPONSE_SPEED：均值 76.3，低分 2/70 | 责任模糊导致跟进延迟，用户等待时间长，降低Issue处理效率 |

### 4.1 低分 Issue 明细

#### PP-01 分配后无实质技术讨论（I2 · 讨论与解决）

- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - `cann-robot`：add label resolved
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：虽关联PR已合并，但仅由机器人自动关闭，缺乏人工关闭评论、commit引用及文档链接等详实解决证据。
  - 原文依据：
    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - `cann-robot`：add label resolved
- **[#3523](https://gitcode.com/cann/ops-transformer/issues/3523) [Requirement|需求建议]: examples/mc2/all_gather_add用例只支持单机双卡通信，请补充A2以及A3跨机双卡通信的用例** — 0分
  - 痛点原因：仅停留在沟通规划阶段，无关联PR、commit引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 您好，感谢反馈，我们在分析处理中    - `liuboxi`：感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ 1、您提到的现有用例可用性差，是否可以展开说明您的关…    - `changdawei1`：>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >1、您提到的现有用例可用性差，是否可以展开说明您…    - `liuboxi`：>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>1、您提到的现有用例可用性差，是否可以展开说…    - `changdawei1`：>>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>>1、您提到的现有用例可用性差，是否可以展…
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - `cann-robot`：add label resolved
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅靠机器人关联合并PR自动关闭，缺乏commit、文档、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，导致证据链断裂。
  - 原文依据：
    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏代码提交、文档和版本发布等强证据，且仅由机器人自动关闭，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - `cann-robot`：add label resolved
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及关闭评论，仅靠机器人自动关闭，缺乏实质性解决佐证。
  - 原文依据：
    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭评论、commit引用及文档链接等实质修复证据。
  - 原文依据：
    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - `cann-robot`：add label resolved
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：虽有关联PR被合并，但缺乏直接的commit引用和明确的关闭评论说明，导致解决证据不足。
  - 原文依据：
    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved
- **[#3464](https://gitcode.com/cann/ops-transformer/issues/3464) [Bug-Report|缺陷反馈]: attention/mla_preprocess这个算子样例代码在A2芯片执行失败** — 0分
  - 痛点原因：仅停留在指派和催促信息阶段，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：[@majinglan](https://gitcode.com/majinglan) 当前attention/mla_preprocess/examples/test_aclnn_mla_preprocess.cpp用例中设置的devi…    - `HuangKun8682`：/assign [@HuangKun8682](https://gitcode.com/HuangKun8682)    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：虽有关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - `cann-robot`：add label resolved
- **[#3444](https://gitcode.com/cann/ops-transformer/issues/3444) [Requirement|需求建议]: ops-transformer/mc2/moe_distribute_dispatch_v2和moe_distribu…** — 0分
  - 痛点原因：未关联PR、commit、文档链接或release等实质性解决证据，且无关闭评论说明。
  - 原文依据：
    - `liudan12`：1、这算子当前不支持训练，但也在规划； 2、这算子应该已经支持A2 推理；    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，moe_distribute_dispatch_v2和moe_distribute_combine_v2均在A2上已支持，使用约束可以参考 https://gitcode.com/cann/ops-transformer/tree/…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3401](https://gitcode.com/cann/ops-transformer/issues/3401) [Requirement|需求建议]: 算子仓库编译soc_version编译易用性** — 0分
  - 痛点原因：仅停留在需求讨论与任务分配阶段，无关联PR、代码提交或文档等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，编译的环境不一定有npu卡，建议还是手动传入soc_version参数    - `wxhhuawei`：那能否自动识别，如果能在platform_ascendc::PlatformAscendC(context->GetPlatformInfo())识别到就自动编译。就是是否可以默认不传参，我们对接的客户是讯飞工程院。 这个工程院上面有很多…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及人工关闭评论等解决证据。
  - 原文依据：
    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 15分
  - 痛点原因：无关联PR、commit引用及文档链接等实质性解决证据，仅停留在会议评审阶段，未提供问题已解决的证明。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 15分
  - 痛点原因：虽有关联PR，但缺乏commit和release引用，且仅由机器人自动关闭无人工评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved
- **[#3489](https://gitcode.com/cann/ops-transformer/issues/3489) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译transformer包失败** — 15分
  - 痛点原因：仅停留在讨论层面，无关联PR、代码提交或文档链接证明缺陷已修复，且无关闭评论确认最终解决状态。
  - 原文依据：
    - `weihao18`：你好，可能是third_party/下的op-base版本太老，可以把third_party目录删掉，重新编译试试    - `vivi_is_coding`：third_party是每次编译的时候从网上现拉的    - `vivi_is_coding`：今天的报错日志：<a href="https://gitcode.com/user-attachments/files/7673863/fb1ee3ebb735436c9352c0e743993600.log" target="_blan…    - `weihao18`：你好，从最新的日志看，是宏未定义导致报错，'OP_LOGE_FOR_INVALID_ARGUMENT_WITH_REASON' was not declared in this scope ，请检查宏定义的位置是否包含进来 ``` fro…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/7197cdb306684ca2b69cde6d1a422747.log" target="_blank">7197c…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/2bb2dd2dd1ca42a7aacc171a460e5bb4.log" target="_blank">2bb2d…
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 15分
  - 痛点原因：虽有关联PR合并记录，但缺少commit引用、release引用及关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 15分
  - 痛点原因：仅关联合并的PR并由机器人自动关闭，缺乏commit引用、release引用及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论等实质性解决证据，仅有人员指派记录，无法证明问题已解决。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 15分
  - 痛点原因：关联的PR未合并，无commit和release引用，仅有正在处理的回复，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233
- **[#3402](https://gitcode.com/cann/ops-transformer/issues/3402) [Requirement|需求建议]: 算子编译在不同的硬件设备能否统一** — 15分
  - 痛点原因：仅口头解释命名规范，无PR、commit或文档链接等实质解决证据，且未明确关闭结论。
  - 原文依据：
    - `weihao18`：你好，当前开源算子仓的soc_version是统一命名的    - `wang-minbo`：当前ascend910_93指的是A3版本；ascend910b指的是A2版本；ascend950指的是A5版本；当前所有命名已经统一规范；您使用的工具可能版本比较老没有更新。 有一个默认的命名规范，如ascend910_9382就是as…    - `wxhhuawei`：客户的疑问 1. A3为啥不是ascend930, 而A5是ascend950; 2. 以A3设备为例，编译时候为啥是910_9382 而不是910_93。就是我们一个算子工程哪里需要用910_93，哪里需要用910_9382 。 能否统…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3589](https://gitcode.com/cann/ops-transformer/issues/3589) RMSNorm 在 Ascend 910B3 上的性能对比与后端实现咨询** — 23分
  - 痛点原因：仅建议移步其他仓库咨询便直接关闭，无关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：您好，RmsNorm归属于nn仓，建议移步[https://gitcode.com/cann/ops-nn](https://gitcode.com/cann/ops-nn)咨询    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3575](https://gitcode.com/cann/ops-transformer/issues/3575) [Question|问题咨询]: 发展前景怎么样？** — 23分
  - 痛点原因：仅凭文字讨论即关闭问题，无关联PR、commit或文档链接等任何实质性代码证据支撑解决过程。
  - 原文依据：
    - `liudan12`：短期 3–5 年不会被完全彻底替代； 中长期会从「大一统唯一架构」退化成混合架构里的核心子模块 ； 极端长序列、端侧轻量化场景会被纯 SSM/RNN 类新架构抢占市场，但通用大模型、代码、强逻辑推理场景 Transformer 仍不可替代…    - `liudan12`：closed from codehub    - `liudan12`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `wang-minbo`：assigned to @liudan12
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 23分
  - 痛点原因：虽有关联PR已合并，但缺乏commit引用、文档链接和release记录，仅靠状态变更关闭，证据强度不足。
  - 原文依据：
    - [关联PR #8183（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8183)    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 23分
  - 痛点原因：无关联PR、commit及文档等实质性修复证据，仅停留在指派和口头回复，缺乏具体修复方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成
- **[#3431](https://gitcode.com/cann/ops-transformer/issues/3431) [Question|问题咨询]: 如何针对单算子编译内存检测包** — 23分
  - 痛点原因：仅凭评论给出命令即关闭问题，无关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，可以 bash build.sh --ops=xxx --oom 编译asan包    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @weihao18
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，仅由机器人因关联issue合并而关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__
- **[#3422](https://gitcode.com/cann/ops-transformer/issues/3422) [Bug-Report|缺陷反馈]: attention/swin_attention_score_quant算子有kernel实现但缺少kernel算子说明…** — 23分
  - 痛点原因：仅凭评论和状态变更关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `majinglan`：日落算子    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @L_Euler
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 23分
  - 痛点原因：仅由机器人关联PR合并自动关闭并打标签，缺乏人工对修复结果的说明，且无commit、文档或release等直接证据。
  - 原文依据：
    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 23分
  - 痛点原因：仅关联了合并PR，但关闭时无commit引用、文档链接及release引用等直接证据，仅凭简单评论关闭。
  - 原文依据：
    - [关联PR #8074（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8074)    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `ryan_li`：add label requirement
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、文档链接及release引用等强证据支撑。
  - 原文依据：
    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - `cann-robot`：add label resolved
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 31分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等解决说明。
  - 原文依据：
    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 31分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏人工关闭评论、文档及release引用等解决证据。
  - 原文依据：
    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 31分
  - 痛点原因：虽有合并的PR和commit，但缺乏文档链接、release引用及人工确认解决的关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 38分
  - 痛点原因：关闭时未关联 PR、commit 或 release 引用，缺乏直接的代码修复证据，仅靠系统自动关闭。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `zhuxueling`：closed from codehub    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 38分
  - 痛点原因：缺乏直接commit引用与release引用，且由机器人自动关闭并关联其他issue，证据链不完整。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3548](https://gitcode.com/cann/ops-transformer/issues/3548) [Documentation|文档反馈]: 表格明显超宽** — 38分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工验证说明。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3547](https://gitcode.com/cann/ops-transformer/issues/3547) [Documentation|文档反馈]: 缺少参数说明，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit和release引用，且仅靠机器人自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3546](https://gitcode.com/cann/ops-transformer/issues/3546) [Documentation|文档反馈]: 产品支持情况不全** — 38分
  - 痛点原因：缺少commit引用和release引用，仅靠机器人因PR合并自动关闭，缺乏具体的代码提交与版本发布证据。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭，缺乏人工明确确认及commit和release引用，证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3544](https://gitcode.com/cann/ops-transformer/issues/3544) [Bug-Report|缺陷反馈]: 950dt设备模型加载权重贼慢，1小时加载了2%，具体是aclrtMemcpy2dAsync函数模块卡住** — 38分
  - 痛点原因：该问题仅被迁移至其他仓库并关闭，未提供任何关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。    - `liudan12`：>你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。 [@weihao18](https://gitcode.com/weihao18) 该接口为runtime领域提供，建议到这里提issue 咨询：ht…    - `wang-minbo`：您好，已收到您的问题，我们已将您的问题迁移到runtime仓，issue如下 https://gitcode.com/cann/runtime/issues/693 我们将关闭此issue，请您在新的issue下跟踪此问题    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3522](https://gitcode.com/cann/ops-transformer/issues/3522) [Bug-Report|缺陷反馈]: /master/torch_extension/README.md缺少了pip install Ninja的部署依赖** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与release引用，仅靠口头确认和系统自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8115（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8115)    - `weihao18`：你好，问题反馈已收到，确实缺少依赖，近期会把依赖添加上去    - `weihao18`：修复已合入，请确认没问题后，将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit与release引用，且仅由机器人自动关闭，无人工确认修复的明确证据。
  - 原文依据：
    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 38分
  - 痛点原因：虽有合并PR，但缺少commit和release引用，关闭评论仅为指派命令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8070（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8070)    - [关联PR #8071（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8071)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465    - `cann-robot`：add label resolved
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 38分
  - 痛点原因：仅评论提及PR已合入，但系统未关联PR，也无commit和release引用，缺乏结构化解决证据。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `duxinlei`：closed from codehub    - `cann-robot`：assigned to @duxinlei
- **[#3436](https://gitcode.com/cann/ops-transformer/issues/3436) [Documentation|文档反馈]: aclnnAllGatherMatmulV2.md调用实列少A3的示例** — 38分
  - 痛点原因：缺乏commit引用与release版本引用，仅靠关联PR和机器人自动关闭，证据支撑不足。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@caiwenwen](https://gitcode.com/caiwenwen) 您好，感谢反馈，A2的示例也能在A3上也可以执行，我们会尽快更新下文档说明    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3430](https://gitcode.com/cann/ops-transformer/issues/3430) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/docs/zh/scatter_pa_kv_c…** — 38分
  - 痛点原因：仅口头说明文档整改后即关闭issue，未关联PR、commit或release等实质修复证据，解决过程缺乏可追溯性。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：你好，已收到该问题，sparse_flash_mla_grad文档正在整改中，修复后关闭该issue    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 38分
  - 痛点原因：仅靠机器人关联PR关闭，无commit和release引用，且维护者仅承诺整改，缺乏具体修复证据。
  - 原文依据：
    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong
- **[#3424](https://gitcode.com/cann/ops-transformer/issues/3424) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档未按照规范要求输出文档，可读性差** — 38分
  - 痛点原因：解决者仅在评论中提及PR链接，未正式关联PR或补充commit引用，缺乏实质性代码合入证据支撑。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已经合入了    - `duxinlei`：closed from codehub    - `duxinlei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @duxinlei
- **[#3386](https://gitcode.com/cann/ops-transformer/issues/3386) [Documentation|文档反馈]: mhc系列算子文档不清晰** — 38分
  - 痛点原因：无关联PR和commit引用等实质修复证据，仅提供现有文档链接后由非作者强行关闭，无法证明问题已解决。
  - 原文依据：
    - `xuejinghui`：experimental下非标准实现 MhcPost算子描述和实现目录：https://gitcode.com/cann/ops-transformer/blob/master/mhc/mhc_post/    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `liuzhuheng`：closed from codehub    - `xuejinghui`：assigned to @xuejinghui
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 46分
  - 痛点原因：无关联PR与release引用，且无关闭评论，仅停留在需求分配与计划评审阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 46分
  - 痛点原因：无关联 PR 与关闭评论，仅停留在指派负责人及数据类型讨论阶段，缺乏问题已解决的实质证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3568](https://gitcode.com/cann/ops-transformer/issues/3568) [Requirement|需求建议]: attention算子效率优化** — 46分
  - 痛点原因：缺乏关联PR与关闭评论等直接解决证据，且当前仅停留在要求补充需求信息阶段，未提供实际解决方案。
  - 原文依据：
    - `weihao18`：/assign [@jiang-lirui](https://gitcode.com/jiang-lirui)    - `jiang-lirui`：你好，请补充信息将问题描述清楚，以便我们评估需求价值，比如可以补充： 1、算子名称 2、硬件芯片版本，A2/A3、还是Ascend 950PR/Ascend 950DT 3、算子的具体shape信息 4、A800卡的性能 5、视频大模型具…    - `cann-robot`：assigned to @jiang-lirui
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 46分
  - 痛点原因：无关联PR与关闭评论，仅记录指派操作，缺乏实质解决过程与最终结论。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3443](https://gitcode.com/cann/ops-transformer/issues/3443) [Requirement|需求建议]: allto_allv_grouped_mat_mul需要支持A2** — 46分
  - 痛点原因：仅停留在分配负责人和补充需求阶段，无关联PR、release引用及解决关闭评论，缺乏最终解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，您的需求我们已收到。希望您可以补充使用场景（可以参考现有A3算子接口，https://gitcode.com/cann/ops-transformer/blob/master/mc2/grouped_mat_mul_allto_al…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3427](https://gitcode.com/cann/ops-transformer/issues/3427) [Documentation|文档反馈]: aclnnDenseLightningIndexerSoftmaxLse和aclnnDenseLightningI…** — 46分
  - 痛点原因：无关联PR、release引用及关闭评论，仅靠口头承诺修改，缺乏明确的解决闭环证据。
  - 原文依据：
    - `caiwenwen`：本人会进行修改    - `weihao18`：/assign [@caiwenwen](https://gitcode.com/caiwenwen)    - `caiwenwen`：[@weihao18](https://gitcode.com/weihao18)    - `caiwenwen`：请同步修改，master和9.10    - `cann-robot`：assigned to @caiwenwen    - `weihao18`：assigned to @yu-xinjie62
- **[#3580](https://gitcode.com/cann/ops-transformer/issues/3580) [Requirement|需求建议]: 建议为 experimental 自定义算子工程增加统一的精度回归与性能基准测试能力** — 54分
  - 痛点原因：仅凭口头建议并直接关闭标记为已完成，未关联PR或文档链接，缺乏实质性的代码落地证据。
  - 原文依据：
    - `weihao18`：您好，感谢您提供的需求建议，这个需要上sig会评审一下，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transformer    - `weihao18`：您好，ops-transformer本身不承载过多的测试能力，一般只有ut等测试项，精度与性能测试工具可以考虑使用开源的ATK，TTK等测试框架 https://gitcode.com/cann/ops-test-kit    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：add label feature    - `cann-robot`：add label Accepted
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 54分
  - 痛点原因：关联PR被关闭且无文档及release引用，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：closed from codehub    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock
- **[#3472](https://gitcode.com/cann/ops-transformer/issues/3472) [Bug-Report|缺陷反馈]: 使用cann社区包9.1.0-beta.3编译算子报错，出现undefined symbol** — 54分
  - 痛点原因：未定位根因且无PR和commit修复证据，仅建议更换尝鲜包便以已解答为由关闭，缺乏实质性解决证明。
  - 原文依据：
    - `weihao18`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：目前经过验证排查，可能是9.1.0-beta.3版本cann包问题，具体问题待进一步定位    - `SH_jingsong`：9.1.0-beta.3可能与主线代码存在一些兼容性问题，目前主线并未出现相关问题，9.1.0-beta.3社区包多个算子编译报错，经评估该问题应该和算子关系不大。如有主线编译需求可以尝试用【尝鲜包】： https://gitcode.c…    - `SH_jingsong`：您好，当前问题已解答，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 54分
  - 痛点原因：虽有合并的PR和commit引用，但缺少文档链接与release版本引用，且关闭评论仅为机器人自动关闭，证据链不够完整。
  - 原文依据：
    - [关联PR #8851（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8851)    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815
#### PP-02 解决方案长期未形成（I2 · 讨论与解决）

- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - `cann-robot`：add label resolved
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：虽关联PR已合并，但仅由机器人自动关闭，缺乏人工关闭评论、commit引用及文档链接等详实解决证据。
  - 原文依据：
    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - `cann-robot`：add label resolved
- **[#3523](https://gitcode.com/cann/ops-transformer/issues/3523) [Requirement|需求建议]: examples/mc2/all_gather_add用例只支持单机双卡通信，请补充A2以及A3跨机双卡通信的用例** — 0分
  - 痛点原因：仅停留在沟通规划阶段，无关联PR、commit引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 您好，感谢反馈，我们在分析处理中    - `liuboxi`：感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ 1、您提到的现有用例可用性差，是否可以展开说明您的关…    - `changdawei1`：>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >1、您提到的现有用例可用性差，是否可以展开说明您…    - `liuboxi`：>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>1、您提到的现有用例可用性差，是否可以展开说…    - `changdawei1`：>>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>>1、您提到的现有用例可用性差，是否可以展…
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - `cann-robot`：add label resolved
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅靠机器人关联合并PR自动关闭，缺乏commit、文档、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，导致证据链断裂。
  - 原文依据：
    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏代码提交、文档和版本发布等强证据，且仅由机器人自动关闭，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - `cann-robot`：add label resolved
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及关闭评论，仅靠机器人自动关闭，缺乏实质性解决佐证。
  - 原文依据：
    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭评论、commit引用及文档链接等实质修复证据。
  - 原文依据：
    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - `cann-robot`：add label resolved
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：虽有关联PR被合并，但缺乏直接的commit引用和明确的关闭评论说明，导致解决证据不足。
  - 原文依据：
    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved
- **[#3464](https://gitcode.com/cann/ops-transformer/issues/3464) [Bug-Report|缺陷反馈]: attention/mla_preprocess这个算子样例代码在A2芯片执行失败** — 0分
  - 痛点原因：仅停留在指派和催促信息阶段，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：[@majinglan](https://gitcode.com/majinglan) 当前attention/mla_preprocess/examples/test_aclnn_mla_preprocess.cpp用例中设置的devi…    - `HuangKun8682`：/assign [@HuangKun8682](https://gitcode.com/HuangKun8682)    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：虽有关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - `cann-robot`：add label resolved
- **[#3444](https://gitcode.com/cann/ops-transformer/issues/3444) [Requirement|需求建议]: ops-transformer/mc2/moe_distribute_dispatch_v2和moe_distribu…** — 0分
  - 痛点原因：未关联PR、commit、文档链接或release等实质性解决证据，且无关闭评论说明。
  - 原文依据：
    - `liudan12`：1、这算子当前不支持训练，但也在规划； 2、这算子应该已经支持A2 推理；    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，moe_distribute_dispatch_v2和moe_distribute_combine_v2均在A2上已支持，使用约束可以参考 https://gitcode.com/cann/ops-transformer/tree/…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3401](https://gitcode.com/cann/ops-transformer/issues/3401) [Requirement|需求建议]: 算子仓库编译soc_version编译易用性** — 0分
  - 痛点原因：仅停留在需求讨论与任务分配阶段，无关联PR、代码提交或文档等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，编译的环境不一定有npu卡，建议还是手动传入soc_version参数    - `wxhhuawei`：那能否自动识别，如果能在platform_ascendc::PlatformAscendC(context->GetPlatformInfo())识别到就自动编译。就是是否可以默认不传参，我们对接的客户是讯飞工程院。 这个工程院上面有很多…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及人工关闭评论等解决证据。
  - 原文依据：
    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 15分
  - 痛点原因：无关联PR、commit引用及文档链接等实质性解决证据，仅停留在会议评审阶段，未提供问题已解决的证明。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 15分
  - 痛点原因：虽有关联PR，但缺乏commit和release引用，且仅由机器人自动关闭无人工评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved
- **[#3489](https://gitcode.com/cann/ops-transformer/issues/3489) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译transformer包失败** — 15分
  - 痛点原因：仅停留在讨论层面，无关联PR、代码提交或文档链接证明缺陷已修复，且无关闭评论确认最终解决状态。
  - 原文依据：
    - `weihao18`：你好，可能是third_party/下的op-base版本太老，可以把third_party目录删掉，重新编译试试    - `vivi_is_coding`：third_party是每次编译的时候从网上现拉的    - `vivi_is_coding`：今天的报错日志：<a href="https://gitcode.com/user-attachments/files/7673863/fb1ee3ebb735436c9352c0e743993600.log" target="_blan…    - `weihao18`：你好，从最新的日志看，是宏未定义导致报错，'OP_LOGE_FOR_INVALID_ARGUMENT_WITH_REASON' was not declared in this scope ，请检查宏定义的位置是否包含进来 ``` fro…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/7197cdb306684ca2b69cde6d1a422747.log" target="_blank">7197c…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/2bb2dd2dd1ca42a7aacc171a460e5bb4.log" target="_blank">2bb2d…
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 15分
  - 痛点原因：虽有关联PR合并记录，但缺少commit引用、release引用及关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 15分
  - 痛点原因：仅关联合并的PR并由机器人自动关闭，缺乏commit引用、release引用及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论等实质性解决证据，仅有人员指派记录，无法证明问题已解决。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 15分
  - 痛点原因：关联的PR未合并，无commit和release引用，仅有正在处理的回复，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233
- **[#3402](https://gitcode.com/cann/ops-transformer/issues/3402) [Requirement|需求建议]: 算子编译在不同的硬件设备能否统一** — 15分
  - 痛点原因：仅口头解释命名规范，无PR、commit或文档链接等实质解决证据，且未明确关闭结论。
  - 原文依据：
    - `weihao18`：你好，当前开源算子仓的soc_version是统一命名的    - `wang-minbo`：当前ascend910_93指的是A3版本；ascend910b指的是A2版本；ascend950指的是A5版本；当前所有命名已经统一规范；您使用的工具可能版本比较老没有更新。 有一个默认的命名规范，如ascend910_9382就是as…    - `wxhhuawei`：客户的疑问 1. A3为啥不是ascend930, 而A5是ascend950; 2. 以A3设备为例，编译时候为啥是910_9382 而不是910_93。就是我们一个算子工程哪里需要用910_93，哪里需要用910_9382 。 能否统…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3589](https://gitcode.com/cann/ops-transformer/issues/3589) RMSNorm 在 Ascend 910B3 上的性能对比与后端实现咨询** — 23分
  - 痛点原因：仅建议移步其他仓库咨询便直接关闭，无关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：您好，RmsNorm归属于nn仓，建议移步[https://gitcode.com/cann/ops-nn](https://gitcode.com/cann/ops-nn)咨询    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3575](https://gitcode.com/cann/ops-transformer/issues/3575) [Question|问题咨询]: 发展前景怎么样？** — 23分
  - 痛点原因：仅凭文字讨论即关闭问题，无关联PR、commit或文档链接等任何实质性代码证据支撑解决过程。
  - 原文依据：
    - `liudan12`：短期 3–5 年不会被完全彻底替代； 中长期会从「大一统唯一架构」退化成混合架构里的核心子模块 ； 极端长序列、端侧轻量化场景会被纯 SSM/RNN 类新架构抢占市场，但通用大模型、代码、强逻辑推理场景 Transformer 仍不可替代…    - `liudan12`：closed from codehub    - `liudan12`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `wang-minbo`：assigned to @liudan12
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 23分
  - 痛点原因：虽有关联PR已合并，但缺乏commit引用、文档链接和release记录，仅靠状态变更关闭，证据强度不足。
  - 原文依据：
    - [关联PR #8183（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8183)    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 23分
  - 痛点原因：无关联PR、commit及文档等实质性修复证据，仅停留在指派和口头回复，缺乏具体修复方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成
- **[#3431](https://gitcode.com/cann/ops-transformer/issues/3431) [Question|问题咨询]: 如何针对单算子编译内存检测包** — 23分
  - 痛点原因：仅凭评论给出命令即关闭问题，无关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，可以 bash build.sh --ops=xxx --oom 编译asan包    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @weihao18
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，仅由机器人因关联issue合并而关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__
- **[#3422](https://gitcode.com/cann/ops-transformer/issues/3422) [Bug-Report|缺陷反馈]: attention/swin_attention_score_quant算子有kernel实现但缺少kernel算子说明…** — 23分
  - 痛点原因：仅凭评论和状态变更关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `majinglan`：日落算子    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @L_Euler
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 23分
  - 痛点原因：仅由机器人关联PR合并自动关闭并打标签，缺乏人工对修复结果的说明，且无commit、文档或release等直接证据。
  - 原文依据：
    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 23分
  - 痛点原因：仅关联了合并PR，但关闭时无commit引用、文档链接及release引用等直接证据，仅凭简单评论关闭。
  - 原文依据：
    - [关联PR #8074（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8074)    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `ryan_li`：add label requirement
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、文档链接及release引用等强证据支撑。
  - 原文依据：
    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - `cann-robot`：add label resolved
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 31分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等解决说明。
  - 原文依据：
    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 31分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏人工关闭评论、文档及release引用等解决证据。
  - 原文依据：
    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 31分
  - 痛点原因：虽有合并的PR和commit，但缺乏文档链接、release引用及人工确认解决的关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 38分
  - 痛点原因：关闭时未关联 PR、commit 或 release 引用，缺乏直接的代码修复证据，仅靠系统自动关闭。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `zhuxueling`：closed from codehub    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 38分
  - 痛点原因：缺乏直接commit引用与release引用，且由机器人自动关闭并关联其他issue，证据链不完整。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3548](https://gitcode.com/cann/ops-transformer/issues/3548) [Documentation|文档反馈]: 表格明显超宽** — 38分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工验证说明。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3547](https://gitcode.com/cann/ops-transformer/issues/3547) [Documentation|文档反馈]: 缺少参数说明，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit和release引用，且仅靠机器人自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3546](https://gitcode.com/cann/ops-transformer/issues/3546) [Documentation|文档反馈]: 产品支持情况不全** — 38分
  - 痛点原因：缺少commit引用和release引用，仅靠机器人因PR合并自动关闭，缺乏具体的代码提交与版本发布证据。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭，缺乏人工明确确认及commit和release引用，证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3544](https://gitcode.com/cann/ops-transformer/issues/3544) [Bug-Report|缺陷反馈]: 950dt设备模型加载权重贼慢，1小时加载了2%，具体是aclrtMemcpy2dAsync函数模块卡住** — 38分
  - 痛点原因：该问题仅被迁移至其他仓库并关闭，未提供任何关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。    - `liudan12`：>你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。 [@weihao18](https://gitcode.com/weihao18) 该接口为runtime领域提供，建议到这里提issue 咨询：ht…    - `wang-minbo`：您好，已收到您的问题，我们已将您的问题迁移到runtime仓，issue如下 https://gitcode.com/cann/runtime/issues/693 我们将关闭此issue，请您在新的issue下跟踪此问题    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3522](https://gitcode.com/cann/ops-transformer/issues/3522) [Bug-Report|缺陷反馈]: /master/torch_extension/README.md缺少了pip install Ninja的部署依赖** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与release引用，仅靠口头确认和系统自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8115（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8115)    - `weihao18`：你好，问题反馈已收到，确实缺少依赖，近期会把依赖添加上去    - `weihao18`：修复已合入，请确认没问题后，将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit与release引用，且仅由机器人自动关闭，无人工确认修复的明确证据。
  - 原文依据：
    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 38分
  - 痛点原因：虽有合并PR，但缺少commit和release引用，关闭评论仅为指派命令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8070（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8070)    - [关联PR #8071（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8071)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465    - `cann-robot`：add label resolved
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 38分
  - 痛点原因：仅评论提及PR已合入，但系统未关联PR，也无commit和release引用，缺乏结构化解决证据。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `duxinlei`：closed from codehub    - `cann-robot`：assigned to @duxinlei
- **[#3436](https://gitcode.com/cann/ops-transformer/issues/3436) [Documentation|文档反馈]: aclnnAllGatherMatmulV2.md调用实列少A3的示例** — 38分
  - 痛点原因：缺乏commit引用与release版本引用，仅靠关联PR和机器人自动关闭，证据支撑不足。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@caiwenwen](https://gitcode.com/caiwenwen) 您好，感谢反馈，A2的示例也能在A3上也可以执行，我们会尽快更新下文档说明    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3430](https://gitcode.com/cann/ops-transformer/issues/3430) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/docs/zh/scatter_pa_kv_c…** — 38分
  - 痛点原因：仅口头说明文档整改后即关闭issue，未关联PR、commit或release等实质修复证据，解决过程缺乏可追溯性。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：你好，已收到该问题，sparse_flash_mla_grad文档正在整改中，修复后关闭该issue    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 38分
  - 痛点原因：仅靠机器人关联PR关闭，无commit和release引用，且维护者仅承诺整改，缺乏具体修复证据。
  - 原文依据：
    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong
- **[#3424](https://gitcode.com/cann/ops-transformer/issues/3424) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档未按照规范要求输出文档，可读性差** — 38分
  - 痛点原因：解决者仅在评论中提及PR链接，未正式关联PR或补充commit引用，缺乏实质性代码合入证据支撑。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已经合入了    - `duxinlei`：closed from codehub    - `duxinlei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @duxinlei
- **[#3386](https://gitcode.com/cann/ops-transformer/issues/3386) [Documentation|文档反馈]: mhc系列算子文档不清晰** — 38分
  - 痛点原因：无关联PR和commit引用等实质修复证据，仅提供现有文档链接后由非作者强行关闭，无法证明问题已解决。
  - 原文依据：
    - `xuejinghui`：experimental下非标准实现 MhcPost算子描述和实现目录：https://gitcode.com/cann/ops-transformer/blob/master/mhc/mhc_post/    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `liuzhuheng`：closed from codehub    - `xuejinghui`：assigned to @xuejinghui
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 46分
  - 痛点原因：无关联PR与release引用，且无关闭评论，仅停留在需求分配与计划评审阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 46分
  - 痛点原因：无关联 PR 与关闭评论，仅停留在指派负责人及数据类型讨论阶段，缺乏问题已解决的实质证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3568](https://gitcode.com/cann/ops-transformer/issues/3568) [Requirement|需求建议]: attention算子效率优化** — 46分
  - 痛点原因：缺乏关联PR与关闭评论等直接解决证据，且当前仅停留在要求补充需求信息阶段，未提供实际解决方案。
  - 原文依据：
    - `weihao18`：/assign [@jiang-lirui](https://gitcode.com/jiang-lirui)    - `jiang-lirui`：你好，请补充信息将问题描述清楚，以便我们评估需求价值，比如可以补充： 1、算子名称 2、硬件芯片版本，A2/A3、还是Ascend 950PR/Ascend 950DT 3、算子的具体shape信息 4、A800卡的性能 5、视频大模型具…    - `cann-robot`：assigned to @jiang-lirui
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 46分
  - 痛点原因：无关联PR与关闭评论，仅记录指派操作，缺乏实质解决过程与最终结论。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3443](https://gitcode.com/cann/ops-transformer/issues/3443) [Requirement|需求建议]: allto_allv_grouped_mat_mul需要支持A2** — 46分
  - 痛点原因：仅停留在分配负责人和补充需求阶段，无关联PR、release引用及解决关闭评论，缺乏最终解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，您的需求我们已收到。希望您可以补充使用场景（可以参考现有A3算子接口，https://gitcode.com/cann/ops-transformer/blob/master/mc2/grouped_mat_mul_allto_al…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3427](https://gitcode.com/cann/ops-transformer/issues/3427) [Documentation|文档反馈]: aclnnDenseLightningIndexerSoftmaxLse和aclnnDenseLightningI…** — 46分
  - 痛点原因：无关联PR、release引用及关闭评论，仅靠口头承诺修改，缺乏明确的解决闭环证据。
  - 原文依据：
    - `caiwenwen`：本人会进行修改    - `weihao18`：/assign [@caiwenwen](https://gitcode.com/caiwenwen)    - `caiwenwen`：[@weihao18](https://gitcode.com/weihao18)    - `caiwenwen`：请同步修改，master和9.10    - `cann-robot`：assigned to @caiwenwen    - `weihao18`：assigned to @yu-xinjie62
- **[#3580](https://gitcode.com/cann/ops-transformer/issues/3580) [Requirement|需求建议]: 建议为 experimental 自定义算子工程增加统一的精度回归与性能基准测试能力** — 54分
  - 痛点原因：仅凭口头建议并直接关闭标记为已完成，未关联PR或文档链接，缺乏实质性的代码落地证据。
  - 原文依据：
    - `weihao18`：您好，感谢您提供的需求建议，这个需要上sig会评审一下，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transformer    - `weihao18`：您好，ops-transformer本身不承载过多的测试能力，一般只有ut等测试项，精度与性能测试工具可以考虑使用开源的ATK，TTK等测试框架 https://gitcode.com/cann/ops-test-kit    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：add label feature    - `cann-robot`：add label Accepted
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 54分
  - 痛点原因：关联PR被关闭且无文档及release引用，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：closed from codehub    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock
- **[#3472](https://gitcode.com/cann/ops-transformer/issues/3472) [Bug-Report|缺陷反馈]: 使用cann社区包9.1.0-beta.3编译算子报错，出现undefined symbol** — 54分
  - 痛点原因：未定位根因且无PR和commit修复证据，仅建议更换尝鲜包便以已解答为由关闭，缺乏实质性解决证明。
  - 原文依据：
    - `weihao18`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：目前经过验证排查，可能是9.1.0-beta.3版本cann包问题，具体问题待进一步定位    - `SH_jingsong`：9.1.0-beta.3可能与主线代码存在一些兼容性问题，目前主线并未出现相关问题，9.1.0-beta.3社区包多个算子编译报错，经评估该问题应该和算子关系不大。如有主线编译需求可以尝试用【尝鲜包】： https://gitcode.c…    - `SH_jingsong`：您好，当前问题已解答，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 54分
  - 痛点原因：虽有合并的PR和commit引用，但缺少文档链接与release版本引用，且关闭评论仅为机器人自动关闭，证据链不够完整。
  - 原文依据：
    - [关联PR #8851（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8851)    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815
#### PP-03 讨论中途停滞无收束（I2 · 讨论与解决）

- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - `cann-robot`：add label resolved
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：虽关联PR已合并，但仅由机器人自动关闭，缺乏人工关闭评论、commit引用及文档链接等详实解决证据。
  - 原文依据：
    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - `cann-robot`：add label resolved
- **[#3523](https://gitcode.com/cann/ops-transformer/issues/3523) [Requirement|需求建议]: examples/mc2/all_gather_add用例只支持单机双卡通信，请补充A2以及A3跨机双卡通信的用例** — 0分
  - 痛点原因：仅停留在沟通规划阶段，无关联PR、commit引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 您好，感谢反馈，我们在分析处理中    - `liuboxi`：感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ 1、您提到的现有用例可用性差，是否可以展开说明您的关…    - `changdawei1`：>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >1、您提到的现有用例可用性差，是否可以展开说明您…    - `liuboxi`：>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>1、您提到的现有用例可用性差，是否可以展开说…    - `changdawei1`：>>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>>1、您提到的现有用例可用性差，是否可以展…
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - `cann-robot`：add label resolved
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅靠机器人关联合并PR自动关闭，缺乏commit、文档、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，导致证据链断裂。
  - 原文依据：
    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏代码提交、文档和版本发布等强证据，且仅由机器人自动关闭，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - `cann-robot`：add label resolved
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及关闭评论，仅靠机器人自动关闭，缺乏实质性解决佐证。
  - 原文依据：
    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭评论、commit引用及文档链接等实质修复证据。
  - 原文依据：
    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - `cann-robot`：add label resolved
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：虽有关联PR被合并，但缺乏直接的commit引用和明确的关闭评论说明，导致解决证据不足。
  - 原文依据：
    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved
- **[#3464](https://gitcode.com/cann/ops-transformer/issues/3464) [Bug-Report|缺陷反馈]: attention/mla_preprocess这个算子样例代码在A2芯片执行失败** — 0分
  - 痛点原因：仅停留在指派和催促信息阶段，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：[@majinglan](https://gitcode.com/majinglan) 当前attention/mla_preprocess/examples/test_aclnn_mla_preprocess.cpp用例中设置的devi…    - `HuangKun8682`：/assign [@HuangKun8682](https://gitcode.com/HuangKun8682)    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：虽有关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - `cann-robot`：add label resolved
- **[#3444](https://gitcode.com/cann/ops-transformer/issues/3444) [Requirement|需求建议]: ops-transformer/mc2/moe_distribute_dispatch_v2和moe_distribu…** — 0分
  - 痛点原因：未关联PR、commit、文档链接或release等实质性解决证据，且无关闭评论说明。
  - 原文依据：
    - `liudan12`：1、这算子当前不支持训练，但也在规划； 2、这算子应该已经支持A2 推理；    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，moe_distribute_dispatch_v2和moe_distribute_combine_v2均在A2上已支持，使用约束可以参考 https://gitcode.com/cann/ops-transformer/tree/…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3401](https://gitcode.com/cann/ops-transformer/issues/3401) [Requirement|需求建议]: 算子仓库编译soc_version编译易用性** — 0分
  - 痛点原因：仅停留在需求讨论与任务分配阶段，无关联PR、代码提交或文档等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，编译的环境不一定有npu卡，建议还是手动传入soc_version参数    - `wxhhuawei`：那能否自动识别，如果能在platform_ascendc::PlatformAscendC(context->GetPlatformInfo())识别到就自动编译。就是是否可以默认不传参，我们对接的客户是讯飞工程院。 这个工程院上面有很多…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及人工关闭评论等解决证据。
  - 原文依据：
    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 15分
  - 痛点原因：无关联PR、commit引用及文档链接等实质性解决证据，仅停留在会议评审阶段，未提供问题已解决的证明。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 15分
  - 痛点原因：虽有关联PR，但缺乏commit和release引用，且仅由机器人自动关闭无人工评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved
- **[#3489](https://gitcode.com/cann/ops-transformer/issues/3489) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译transformer包失败** — 15分
  - 痛点原因：仅停留在讨论层面，无关联PR、代码提交或文档链接证明缺陷已修复，且无关闭评论确认最终解决状态。
  - 原文依据：
    - `weihao18`：你好，可能是third_party/下的op-base版本太老，可以把third_party目录删掉，重新编译试试    - `vivi_is_coding`：third_party是每次编译的时候从网上现拉的    - `vivi_is_coding`：今天的报错日志：<a href="https://gitcode.com/user-attachments/files/7673863/fb1ee3ebb735436c9352c0e743993600.log" target="_blan…    - `weihao18`：你好，从最新的日志看，是宏未定义导致报错，'OP_LOGE_FOR_INVALID_ARGUMENT_WITH_REASON' was not declared in this scope ，请检查宏定义的位置是否包含进来 ``` fro…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/7197cdb306684ca2b69cde6d1a422747.log" target="_blank">7197c…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/2bb2dd2dd1ca42a7aacc171a460e5bb4.log" target="_blank">2bb2d…
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 15分
  - 痛点原因：虽有关联PR合并记录，但缺少commit引用、release引用及关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 15分
  - 痛点原因：仅关联合并的PR并由机器人自动关闭，缺乏commit引用、release引用及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论等实质性解决证据，仅有人员指派记录，无法证明问题已解决。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 15分
  - 痛点原因：关联的PR未合并，无commit和release引用，仅有正在处理的回复，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233
- **[#3402](https://gitcode.com/cann/ops-transformer/issues/3402) [Requirement|需求建议]: 算子编译在不同的硬件设备能否统一** — 15分
  - 痛点原因：仅口头解释命名规范，无PR、commit或文档链接等实质解决证据，且未明确关闭结论。
  - 原文依据：
    - `weihao18`：你好，当前开源算子仓的soc_version是统一命名的    - `wang-minbo`：当前ascend910_93指的是A3版本；ascend910b指的是A2版本；ascend950指的是A5版本；当前所有命名已经统一规范；您使用的工具可能版本比较老没有更新。 有一个默认的命名规范，如ascend910_9382就是as…    - `wxhhuawei`：客户的疑问 1. A3为啥不是ascend930, 而A5是ascend950; 2. 以A3设备为例，编译时候为啥是910_9382 而不是910_93。就是我们一个算子工程哪里需要用910_93，哪里需要用910_9382 。 能否统…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3589](https://gitcode.com/cann/ops-transformer/issues/3589) RMSNorm 在 Ascend 910B3 上的性能对比与后端实现咨询** — 23分
  - 痛点原因：仅建议移步其他仓库咨询便直接关闭，无关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：您好，RmsNorm归属于nn仓，建议移步[https://gitcode.com/cann/ops-nn](https://gitcode.com/cann/ops-nn)咨询    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3575](https://gitcode.com/cann/ops-transformer/issues/3575) [Question|问题咨询]: 发展前景怎么样？** — 23分
  - 痛点原因：仅凭文字讨论即关闭问题，无关联PR、commit或文档链接等任何实质性代码证据支撑解决过程。
  - 原文依据：
    - `liudan12`：短期 3–5 年不会被完全彻底替代； 中长期会从「大一统唯一架构」退化成混合架构里的核心子模块 ； 极端长序列、端侧轻量化场景会被纯 SSM/RNN 类新架构抢占市场，但通用大模型、代码、强逻辑推理场景 Transformer 仍不可替代…    - `liudan12`：closed from codehub    - `liudan12`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `wang-minbo`：assigned to @liudan12
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 23分
  - 痛点原因：虽有关联PR已合并，但缺乏commit引用、文档链接和release记录，仅靠状态变更关闭，证据强度不足。
  - 原文依据：
    - [关联PR #8183（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8183)    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 23分
  - 痛点原因：无关联PR、commit及文档等实质性修复证据，仅停留在指派和口头回复，缺乏具体修复方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成
- **[#3431](https://gitcode.com/cann/ops-transformer/issues/3431) [Question|问题咨询]: 如何针对单算子编译内存检测包** — 23分
  - 痛点原因：仅凭评论给出命令即关闭问题，无关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，可以 bash build.sh --ops=xxx --oom 编译asan包    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @weihao18
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，仅由机器人因关联issue合并而关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__
- **[#3422](https://gitcode.com/cann/ops-transformer/issues/3422) [Bug-Report|缺陷反馈]: attention/swin_attention_score_quant算子有kernel实现但缺少kernel算子说明…** — 23分
  - 痛点原因：仅凭评论和状态变更关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `majinglan`：日落算子    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @L_Euler
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 23分
  - 痛点原因：仅由机器人关联PR合并自动关闭并打标签，缺乏人工对修复结果的说明，且无commit、文档或release等直接证据。
  - 原文依据：
    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 23分
  - 痛点原因：仅关联了合并PR，但关闭时无commit引用、文档链接及release引用等直接证据，仅凭简单评论关闭。
  - 原文依据：
    - [关联PR #8074（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8074)    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `ryan_li`：add label requirement
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、文档链接及release引用等强证据支撑。
  - 原文依据：
    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - `cann-robot`：add label resolved
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 31分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等解决说明。
  - 原文依据：
    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 31分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏人工关闭评论、文档及release引用等解决证据。
  - 原文依据：
    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 31分
  - 痛点原因：虽有合并的PR和commit，但缺乏文档链接、release引用及人工确认解决的关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 38分
  - 痛点原因：关闭时未关联 PR、commit 或 release 引用，缺乏直接的代码修复证据，仅靠系统自动关闭。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `zhuxueling`：closed from codehub    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 38分
  - 痛点原因：缺乏直接commit引用与release引用，且由机器人自动关闭并关联其他issue，证据链不完整。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3548](https://gitcode.com/cann/ops-transformer/issues/3548) [Documentation|文档反馈]: 表格明显超宽** — 38分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工验证说明。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3547](https://gitcode.com/cann/ops-transformer/issues/3547) [Documentation|文档反馈]: 缺少参数说明，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit和release引用，且仅靠机器人自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3546](https://gitcode.com/cann/ops-transformer/issues/3546) [Documentation|文档反馈]: 产品支持情况不全** — 38分
  - 痛点原因：缺少commit引用和release引用，仅靠机器人因PR合并自动关闭，缺乏具体的代码提交与版本发布证据。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭，缺乏人工明确确认及commit和release引用，证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3544](https://gitcode.com/cann/ops-transformer/issues/3544) [Bug-Report|缺陷反馈]: 950dt设备模型加载权重贼慢，1小时加载了2%，具体是aclrtMemcpy2dAsync函数模块卡住** — 38分
  - 痛点原因：该问题仅被迁移至其他仓库并关闭，未提供任何关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。    - `liudan12`：>你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。 [@weihao18](https://gitcode.com/weihao18) 该接口为runtime领域提供，建议到这里提issue 咨询：ht…    - `wang-minbo`：您好，已收到您的问题，我们已将您的问题迁移到runtime仓，issue如下 https://gitcode.com/cann/runtime/issues/693 我们将关闭此issue，请您在新的issue下跟踪此问题    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3522](https://gitcode.com/cann/ops-transformer/issues/3522) [Bug-Report|缺陷反馈]: /master/torch_extension/README.md缺少了pip install Ninja的部署依赖** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与release引用，仅靠口头确认和系统自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8115（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8115)    - `weihao18`：你好，问题反馈已收到，确实缺少依赖，近期会把依赖添加上去    - `weihao18`：修复已合入，请确认没问题后，将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit与release引用，且仅由机器人自动关闭，无人工确认修复的明确证据。
  - 原文依据：
    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 38分
  - 痛点原因：虽有合并PR，但缺少commit和release引用，关闭评论仅为指派命令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8070（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8070)    - [关联PR #8071（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8071)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465    - `cann-robot`：add label resolved
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 38分
  - 痛点原因：仅评论提及PR已合入，但系统未关联PR，也无commit和release引用，缺乏结构化解决证据。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `duxinlei`：closed from codehub    - `cann-robot`：assigned to @duxinlei
- **[#3436](https://gitcode.com/cann/ops-transformer/issues/3436) [Documentation|文档反馈]: aclnnAllGatherMatmulV2.md调用实列少A3的示例** — 38分
  - 痛点原因：缺乏commit引用与release版本引用，仅靠关联PR和机器人自动关闭，证据支撑不足。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@caiwenwen](https://gitcode.com/caiwenwen) 您好，感谢反馈，A2的示例也能在A3上也可以执行，我们会尽快更新下文档说明    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3430](https://gitcode.com/cann/ops-transformer/issues/3430) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/docs/zh/scatter_pa_kv_c…** — 38分
  - 痛点原因：仅口头说明文档整改后即关闭issue，未关联PR、commit或release等实质修复证据，解决过程缺乏可追溯性。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：你好，已收到该问题，sparse_flash_mla_grad文档正在整改中，修复后关闭该issue    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 38分
  - 痛点原因：仅靠机器人关联PR关闭，无commit和release引用，且维护者仅承诺整改，缺乏具体修复证据。
  - 原文依据：
    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong
- **[#3424](https://gitcode.com/cann/ops-transformer/issues/3424) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档未按照规范要求输出文档，可读性差** — 38分
  - 痛点原因：解决者仅在评论中提及PR链接，未正式关联PR或补充commit引用，缺乏实质性代码合入证据支撑。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已经合入了    - `duxinlei`：closed from codehub    - `duxinlei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @duxinlei
- **[#3386](https://gitcode.com/cann/ops-transformer/issues/3386) [Documentation|文档反馈]: mhc系列算子文档不清晰** — 38分
  - 痛点原因：无关联PR和commit引用等实质修复证据，仅提供现有文档链接后由非作者强行关闭，无法证明问题已解决。
  - 原文依据：
    - `xuejinghui`：experimental下非标准实现 MhcPost算子描述和实现目录：https://gitcode.com/cann/ops-transformer/blob/master/mhc/mhc_post/    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `liuzhuheng`：closed from codehub    - `xuejinghui`：assigned to @xuejinghui
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 46分
  - 痛点原因：无关联PR与release引用，且无关闭评论，仅停留在需求分配与计划评审阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 46分
  - 痛点原因：无关联 PR 与关闭评论，仅停留在指派负责人及数据类型讨论阶段，缺乏问题已解决的实质证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3568](https://gitcode.com/cann/ops-transformer/issues/3568) [Requirement|需求建议]: attention算子效率优化** — 46分
  - 痛点原因：缺乏关联PR与关闭评论等直接解决证据，且当前仅停留在要求补充需求信息阶段，未提供实际解决方案。
  - 原文依据：
    - `weihao18`：/assign [@jiang-lirui](https://gitcode.com/jiang-lirui)    - `jiang-lirui`：你好，请补充信息将问题描述清楚，以便我们评估需求价值，比如可以补充： 1、算子名称 2、硬件芯片版本，A2/A3、还是Ascend 950PR/Ascend 950DT 3、算子的具体shape信息 4、A800卡的性能 5、视频大模型具…    - `cann-robot`：assigned to @jiang-lirui
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 46分
  - 痛点原因：无关联PR与关闭评论，仅记录指派操作，缺乏实质解决过程与最终结论。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3443](https://gitcode.com/cann/ops-transformer/issues/3443) [Requirement|需求建议]: allto_allv_grouped_mat_mul需要支持A2** — 46分
  - 痛点原因：仅停留在分配负责人和补充需求阶段，无关联PR、release引用及解决关闭评论，缺乏最终解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，您的需求我们已收到。希望您可以补充使用场景（可以参考现有A3算子接口，https://gitcode.com/cann/ops-transformer/blob/master/mc2/grouped_mat_mul_allto_al…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3427](https://gitcode.com/cann/ops-transformer/issues/3427) [Documentation|文档反馈]: aclnnDenseLightningIndexerSoftmaxLse和aclnnDenseLightningI…** — 46分
  - 痛点原因：无关联PR、release引用及关闭评论，仅靠口头承诺修改，缺乏明确的解决闭环证据。
  - 原文依据：
    - `caiwenwen`：本人会进行修改    - `weihao18`：/assign [@caiwenwen](https://gitcode.com/caiwenwen)    - `caiwenwen`：[@weihao18](https://gitcode.com/weihao18)    - `caiwenwen`：请同步修改，master和9.10    - `cann-robot`：assigned to @caiwenwen    - `weihao18`：assigned to @yu-xinjie62
- **[#3580](https://gitcode.com/cann/ops-transformer/issues/3580) [Requirement|需求建议]: 建议为 experimental 自定义算子工程增加统一的精度回归与性能基准测试能力** — 54分
  - 痛点原因：仅凭口头建议并直接关闭标记为已完成，未关联PR或文档链接，缺乏实质性的代码落地证据。
  - 原文依据：
    - `weihao18`：您好，感谢您提供的需求建议，这个需要上sig会评审一下，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transformer    - `weihao18`：您好，ops-transformer本身不承载过多的测试能力，一般只有ut等测试项，精度与性能测试工具可以考虑使用开源的ATK，TTK等测试框架 https://gitcode.com/cann/ops-test-kit    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：add label feature    - `cann-robot`：add label Accepted
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 54分
  - 痛点原因：关联PR被关闭且无文档及release引用，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：closed from codehub    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock
- **[#3472](https://gitcode.com/cann/ops-transformer/issues/3472) [Bug-Report|缺陷反馈]: 使用cann社区包9.1.0-beta.3编译算子报错，出现undefined symbol** — 54分
  - 痛点原因：未定位根因且无PR和commit修复证据，仅建议更换尝鲜包便以已解答为由关闭，缺乏实质性解决证明。
  - 原文依据：
    - `weihao18`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：目前经过验证排查，可能是9.1.0-beta.3版本cann包问题，具体问题待进一步定位    - `SH_jingsong`：9.1.0-beta.3可能与主线代码存在一些兼容性问题，目前主线并未出现相关问题，9.1.0-beta.3社区包多个算子编译报错，经评估该问题应该和算子关系不大。如有主线编译需求可以尝试用【尝鲜包】： https://gitcode.c…    - `SH_jingsong`：您好，当前问题已解答，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 54分
  - 痛点原因：虽有合并的PR和commit引用，但缺少文档链接与release版本引用，且关闭评论仅为机器人自动关闭，证据链不够完整。
  - 原文依据：
    - [关联PR #8851（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8851)    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815
#### PP-04 分配后责任人无实质响应（I1 · 分配与首次响应）

- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 0分
  - 痛点原因：仅打标签分配负责人并安排会议评审，未针对需求提供实质性技术解答或处理意见。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 0分
  - 痛点原因：首次响应耗时近48小时，且仅停留在分配任务与流程告知，未对需求给出任何技术性实质解答。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后自动关闭，全程无任何人工实质回应或修复说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)
- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：仅有机器人加标签及关联PR合并后的自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 0分
  - 痛点原因：全程仅机器人打标签及关联PR自动关闭，无任何人工实质回应。
  - 原文依据：
    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)
- **[#3578](https://gitcode.com/cann/ops-transformer/issues/3578) [Bug-Report|缺陷反馈]: mega_moe A5 对topk的校验[1,16]，与资料内范围 6和8不一致，且使用场景存在未保护先使用，除零风险，…** — 0分
  - 痛点原因：全程仅有指派、加标签和关闭操作，未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8157（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8157)
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 0分
  - 痛点原因：仅添加标签并由机器人关联合并PR关闭，全程无人工实质技术回应。
  - 原文依据：
    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 0分
  - 痛点原因：被指派人直接关闭issue，仅有指派和加标签操作，全程无任何实质技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub
- **[#3571](https://gitcode.com/cann/ops-transformer/issues/3571) [Bug-Report|缺陷反馈]: A2 mega_moe tiling检查逻辑错误，存在除零风险，请系统梳理epWorldSize的资料、校验和计算逻辑** — 0分
  - 痛点原因：响应耗时超55小时，仅执行分配和打标签等机械操作，全程无任何实质回应内容。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3571    - [关联PR #8811（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8811)
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 0分
  - 痛点原因：仅分配任务和客套感谢，未针对废弃接口问题提供任何实质性技术解答或处理方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 0分
  - 痛点原因：仅简单回复收到修改中并直接关闭，未提供任何实质性的技术解答或处理反馈。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无任何针对缺陷的实质技术回应即被关闭。
  - 原文依据：
    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock    - `jiangxiuhan1`：closed from codehub    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 0分
  - 痛点原因：全程仅有指派和打标签等机械操作，无任何针对缺陷的实质性技术回应，仅靠机器人标记解决。
  - 原文依据：
    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18    - `wang-minbo`：closed from codehub
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：全程仅有机器人加标签及随PR合并自动关闭的操作，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅打标签及由机器人在关联PR合并后关闭，全程无人工实质性回应。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质性回应。
  - 原文依据：
    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：维护者仅加标签，后由机器人因关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：仅由机器人关联PR并关闭，全程无任何人工实质回应，故得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 0分
  - 痛点原因：官方仅承诺尽快核实修复，未提供实质性技术解答或具体处理方案，且首次响应超42小时。
  - 原文依据：
    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：全程仅机器人打标签及随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人自动打标签并随关联PR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：全程仅添加标签并由机器人关联PR合并直接关闭，无任何人工实质性文字回应。
  - 原文依据：
    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 0分
  - 痛点原因：仅添加标签并由机器人随PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 0分
  - 痛点原因：仅打标签无人工实质回应，关联PR合并后直接被机器人关闭。
  - 原文依据：
    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 0分
  - 痛点原因：仅有指派和机器人加标签等指令操作，全程无任何针对缺陷内容的实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chaotang233    - `cann-robot`：assigned to @HuangKun8682 and unassigned @chaotang233    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 0分
  - 痛点原因：维护者仅进行了人员分配与取消操作，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 0分
  - 痛点原因：仅进行了指派和取消指派操作，未对文档不一致问题提供任何实质解答或处理。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 0分
  - 痛点原因：全程仅打标签并由机器人关联PR合并关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 0分
  - 痛点原因：全程仅机器人添加标签并因PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 0分
  - 痛点原因：仅有初步接收回复和人员分配，未提供实质性技术解答或处理方案，且关联PR仍处于open状态。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 0分
  - 痛点原因：维护者仅进行了分配和打标签操作且首次分配失败，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 0分
  - 痛点原因：仅回复已收到并直接被机器人标记为resolved，全程无实质技术解答或修复方案。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 0分
  - 痛点原因：全程仅执行分配与机器人加标签操作，无任何人工实质性技术回应，最终随MR合并直接关闭。
  - 原文依据：
    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 20分
  - 痛点原因：首次响应仅分配任务，时隔近400小时才给出实质性技术回应，严重超时导致得分极低。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815    - `wangchao661`：assigned to @wangchao661    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462
- **[#3579](https://gitcode.com/cann/ops-transformer/issues/3579) [Bug-Report|缺陷反馈]: mega_moe A2 对topk的校验[1,32]，与资料内范围 6和8不一致** — 40分
  - 痛点原因：指派后耗时近292小时才给出修复PR的实质回复，响应严重迟缓导致得分偏低。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：您好，关联pr已经完成了资料和tiling校验的范围修改。    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `lyt_claire`：closed from codehub
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 40分
  - 痛点原因：指派操作因机器人限制受阻，导致处理延迟，历经329小时才由人工给出实质技术解答。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3517](https://gitcode.com/cann/ops-transformer/issues/3517) [Bug-Report|缺陷反馈]: Ascend950 FIA的MLA场景精度不通过** — 40分
  - 痛点原因：首次响应后历经多次人员指派，耗时195小时才给出实质性定位结论，响应间隔过长。
  - 原文依据：
    - `weihao18`：/assign [@tang-hao-hw-gitcode](https://gitcode.com/tang-hao-hw-gitcode)    - `huang-chuhong`：您好，经过定位，issue中提供的脚本存在问题，非算子精度问题 在Mla K_NOPE 512场景 key value复用，在计算golden 和调用算子时，key value应该传同一个tensor 脚本修改参考如下： # ---- C…    - `cann-robot`：assigned to @monologue815    - `cann-robot`：assigned to @tang-hao-hw-gitcode and unassigned @monologue815    - `weihao18`：assigned to @xtqh    - `weihao18`：unassigned @tang-hao-hw-gitcode
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 40分
  - 痛点原因：首次仅简单分配任务，时隔230.31小时才给出修复链接，实质回应耗时过长严重超标。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `cann-robot`：assigned to @duxinlei    - `duxinlei`：closed from codehub
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 40分
  - 痛点原因：早期回应仅为分配任务和客套话，缺乏实质技术排查，导致实质回应耗时超214小时。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 40分
  - 痛点原因：首次响应仅泛泛表态已收到，时隔189小时才给出修复PR合入的实质性反馈，耗时过长。
  - 原文依据：
    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `ryan_li`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3397](https://gitcode.com/cann/ops-transformer/issues/3397) [Bug-Report|缺陷反馈]: 910B2 grouped_matmul_finalize_routing算子开确定性之后性能劣化1倍** — 40分
  - 痛点原因：实质回应耗时近8天，且仅以无性能要求为由直接关闭，未有效解决性能劣化问题。
  - 原文依据：
    - `weihao18`：/assgin [@kknan](https://gitcode.com/kknan)    - `kknan`：与算子开发同学对齐，确定性需求交付的时候是纯功能，无性能要求。    - `kknan`：/close    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @kknan    - `yangchao888`：closed from codehub
#### PP-05 标签与优先级分类普遍缺失（I1 · 分配与首次响应）

- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 0分
  - 痛点原因：仅打标签分配负责人并安排会议评审，未针对需求提供实质性技术解答或处理意见。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 0分
  - 痛点原因：首次响应耗时近48小时，且仅停留在分配任务与流程告知，未对需求给出任何技术性实质解答。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后自动关闭，全程无任何人工实质回应或修复说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)
- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：仅有机器人加标签及关联PR合并后的自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 0分
  - 痛点原因：全程仅机器人打标签及关联PR自动关闭，无任何人工实质回应。
  - 原文依据：
    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)
- **[#3578](https://gitcode.com/cann/ops-transformer/issues/3578) [Bug-Report|缺陷反馈]: mega_moe A5 对topk的校验[1,16]，与资料内范围 6和8不一致，且使用场景存在未保护先使用，除零风险，…** — 0分
  - 痛点原因：全程仅有指派、加标签和关闭操作，未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8157（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8157)
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 0分
  - 痛点原因：仅添加标签并由机器人关联合并PR关闭，全程无人工实质技术回应。
  - 原文依据：
    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 0分
  - 痛点原因：被指派人直接关闭issue，仅有指派和加标签操作，全程无任何实质技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub
- **[#3571](https://gitcode.com/cann/ops-transformer/issues/3571) [Bug-Report|缺陷反馈]: A2 mega_moe tiling检查逻辑错误，存在除零风险，请系统梳理epWorldSize的资料、校验和计算逻辑** — 0分
  - 痛点原因：响应耗时超55小时，仅执行分配和打标签等机械操作，全程无任何实质回应内容。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3571    - [关联PR #8811（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8811)
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 0分
  - 痛点原因：仅分配任务和客套感谢，未针对废弃接口问题提供任何实质性技术解答或处理方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 0分
  - 痛点原因：仅简单回复收到修改中并直接关闭，未提供任何实质性的技术解答或处理反馈。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无任何针对缺陷的实质技术回应即被关闭。
  - 原文依据：
    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock    - `jiangxiuhan1`：closed from codehub    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 0分
  - 痛点原因：全程仅有指派和打标签等机械操作，无任何针对缺陷的实质性技术回应，仅靠机器人标记解决。
  - 原文依据：
    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18    - `wang-minbo`：closed from codehub
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：全程仅有机器人加标签及随PR合并自动关闭的操作，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅打标签及由机器人在关联PR合并后关闭，全程无人工实质性回应。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质性回应。
  - 原文依据：
    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：维护者仅加标签，后由机器人因关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：仅由机器人关联PR并关闭，全程无任何人工实质回应，故得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 0分
  - 痛点原因：官方仅承诺尽快核实修复，未提供实质性技术解答或具体处理方案，且首次响应超42小时。
  - 原文依据：
    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：全程仅机器人打标签及随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人自动打标签并随关联PR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：全程仅添加标签并由机器人关联PR合并直接关闭，无任何人工实质性文字回应。
  - 原文依据：
    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 0分
  - 痛点原因：仅添加标签并由机器人随PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 0分
  - 痛点原因：仅打标签无人工实质回应，关联PR合并后直接被机器人关闭。
  - 原文依据：
    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 0分
  - 痛点原因：仅有指派和机器人加标签等指令操作，全程无任何针对缺陷内容的实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chaotang233    - `cann-robot`：assigned to @HuangKun8682 and unassigned @chaotang233    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 0分
  - 痛点原因：维护者仅进行了人员分配与取消操作，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 0分
  - 痛点原因：仅进行了指派和取消指派操作，未对文档不一致问题提供任何实质解答或处理。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 0分
  - 痛点原因：全程仅打标签并由机器人关联PR合并关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 0分
  - 痛点原因：全程仅机器人添加标签并因PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 0分
  - 痛点原因：仅有初步接收回复和人员分配，未提供实质性技术解答或处理方案，且关联PR仍处于open状态。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 0分
  - 痛点原因：维护者仅进行了分配和打标签操作且首次分配失败，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 0分
  - 痛点原因：仅回复已收到并直接被机器人标记为resolved，全程无实质技术解答或修复方案。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 0分
  - 痛点原因：全程仅执行分配与机器人加标签操作，无任何人工实质性技术回应，最终随MR合并直接关闭。
  - 原文依据：
    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 20分
  - 痛点原因：首次响应仅分配任务，时隔近400小时才给出实质性技术回应，严重超时导致得分极低。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815    - `wangchao661`：assigned to @wangchao661    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462
- **[#3579](https://gitcode.com/cann/ops-transformer/issues/3579) [Bug-Report|缺陷反馈]: mega_moe A2 对topk的校验[1,32]，与资料内范围 6和8不一致** — 40分
  - 痛点原因：指派后耗时近292小时才给出修复PR的实质回复，响应严重迟缓导致得分偏低。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：您好，关联pr已经完成了资料和tiling校验的范围修改。    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `lyt_claire`：closed from codehub
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 40分
  - 痛点原因：指派操作因机器人限制受阻，导致处理延迟，历经329小时才由人工给出实质技术解答。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3517](https://gitcode.com/cann/ops-transformer/issues/3517) [Bug-Report|缺陷反馈]: Ascend950 FIA的MLA场景精度不通过** — 40分
  - 痛点原因：首次响应后历经多次人员指派，耗时195小时才给出实质性定位结论，响应间隔过长。
  - 原文依据：
    - `weihao18`：/assign [@tang-hao-hw-gitcode](https://gitcode.com/tang-hao-hw-gitcode)    - `huang-chuhong`：您好，经过定位，issue中提供的脚本存在问题，非算子精度问题 在Mla K_NOPE 512场景 key value复用，在计算golden 和调用算子时，key value应该传同一个tensor 脚本修改参考如下： # ---- C…    - `cann-robot`：assigned to @monologue815    - `cann-robot`：assigned to @tang-hao-hw-gitcode and unassigned @monologue815    - `weihao18`：assigned to @xtqh    - `weihao18`：unassigned @tang-hao-hw-gitcode
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 40分
  - 痛点原因：首次仅简单分配任务，时隔230.31小时才给出修复链接，实质回应耗时过长严重超标。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `cann-robot`：assigned to @duxinlei    - `duxinlei`：closed from codehub
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 40分
  - 痛点原因：早期回应仅为分配任务和客套话，缺乏实质技术排查，导致实质回应耗时超214小时。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 40分
  - 痛点原因：首次响应仅泛泛表态已收到，时隔189小时才给出修复PR合入的实质性反馈，耗时过长。
  - 原文依据：
    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `ryan_li`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3397](https://gitcode.com/cann/ops-transformer/issues/3397) [Bug-Report|缺陷反馈]: 910B2 grouped_matmul_finalize_routing算子开确定性之后性能劣化1倍** — 40分
  - 痛点原因：实质回应耗时近8天，且仅以无性能要求为由直接关闭，未有效解决性能劣化问题。
  - 原文依据：
    - `weihao18`：/assgin [@kknan](https://gitcode.com/kknan)    - `kknan`：与算子开发同学对齐，确定性需求交付的时候是纯功能，无性能要求。    - `kknan`：/close    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @kknan    - `yangchao888`：closed from codehub
#### PP-06 多次重分配致责任不清（I2 · 讨论与解决）

- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - `cann-robot`：add label resolved
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：虽关联PR已合并，但仅由机器人自动关闭，缺乏人工关闭评论、commit引用及文档链接等详实解决证据。
  - 原文依据：
    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - `cann-robot`：add label resolved
- **[#3523](https://gitcode.com/cann/ops-transformer/issues/3523) [Requirement|需求建议]: examples/mc2/all_gather_add用例只支持单机双卡通信，请补充A2以及A3跨机双卡通信的用例** — 0分
  - 痛点原因：仅停留在沟通规划阶段，无关联PR、commit引用、文档链接等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：@cdw 您好，感谢反馈，我们在分析处理中    - `liuboxi`：感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ 1、您提到的现有用例可用性差，是否可以展开说明您的关…    - `changdawei1`：>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >1、您提到的现有用例可用性差，是否可以展开说明您…    - `liuboxi`：>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>1、您提到的现有用例可用性差，是否可以展开说…    - `changdawei1`：>>>感谢您的反馈，您的建议非常有价值，我们也正在规划完善当前的样例，希望能够提升用户体验。还希望针对以下的疑惑能得到您的反馈和解答，以便于我们在下一次的完善中，能够提升您的体验。非常感谢！ >>>1、您提到的现有用例可用性差，是否可以展…
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - `cann-robot`：add label resolved
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅靠机器人关联合并PR自动关闭，缺乏commit、文档、release引用及人工关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用、release引用及人工关闭评论，导致证据链断裂。
  - 原文依据：
    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：仅靠机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等实质解决证据。
  - 原文依据：
    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：虽有关联PR合并，但缺乏代码提交、文档和版本发布等强证据，且仅由机器人自动关闭，无人工关闭评论说明。
  - 原文依据：
    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - `cann-robot`：add label resolved
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及关闭评论，仅靠机器人自动关闭，缺乏实质性解决佐证。
  - 原文依据：
    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭评论、commit引用及文档链接等实质修复证据。
  - 原文依据：
    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - `cann-robot`：add label resolved
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：虽有关联PR被合并，但缺乏直接的commit引用和明确的关闭评论说明，导致解决证据不足。
  - 原文依据：
    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved
- **[#3464](https://gitcode.com/cann/ops-transformer/issues/3464) [Bug-Report|缺陷反馈]: attention/mla_preprocess这个算子样例代码在A2芯片执行失败** — 0分
  - 痛点原因：仅停留在指派和催促信息阶段，未关联任何PR、commit或文档等实质性修复证据。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：[@majinglan](https://gitcode.com/majinglan) 当前attention/mla_preprocess/examples/test_aclnn_mla_preprocess.cpp用例中设置的devi…    - `HuangKun8682`：/assign [@HuangKun8682](https://gitcode.com/HuangKun8682)    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `yolic`：add label wait-feedback    - `cann-robot`：assigned to @chaotang233
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：虽有关联PR，但缺乏commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - `cann-robot`：add label resolved
- **[#3444](https://gitcode.com/cann/ops-transformer/issues/3444) [Requirement|需求建议]: ops-transformer/mc2/moe_distribute_dispatch_v2和moe_distribu…** — 0分
  - 痛点原因：未关联PR、commit、文档链接或release等实质性解决证据，且无关闭评论说明。
  - 原文依据：
    - `liudan12`：1、这算子当前不支持训练，但也在规划； 2、这算子应该已经支持A2 推理；    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，moe_distribute_dispatch_v2和moe_distribute_combine_v2均在A2上已支持，使用约束可以参考 https://gitcode.com/cann/ops-transformer/tree/…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3401](https://gitcode.com/cann/ops-transformer/issues/3401) [Requirement|需求建议]: 算子仓库编译soc_version编译易用性** — 0分
  - 痛点原因：仅停留在需求讨论与任务分配阶段，无关联PR、代码提交或文档等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，编译的环境不一定有npu卡，建议还是手动传入soc_version参数    - `wxhhuawei`：那能否自动识别，如果能在platform_ascendc::PlatformAscendC(context->GetPlatformInfo())识别到就自动编译。就是是否可以默认不传参，我们对接的客户是讯飞工程院。 这个工程院上面有很多…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：虽有合并的关联PR，但无commit引用、文档链接、release引用及人工关闭评论等解决证据。
  - 原文依据：
    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved
- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 15分
  - 痛点原因：无关联PR、commit引用及文档链接等实质性解决证据，仅停留在会议评审阶段，未提供问题已解决的证明。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 15分
  - 痛点原因：虽有关联PR，但缺乏commit和release引用，且仅由机器人自动关闭无人工评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved
- **[#3489](https://gitcode.com/cann/ops-transformer/issues/3489) [Bug-Report|缺陷反馈]: CANN 9.1.0.beta3社区版本910B设备编译transformer包失败** — 15分
  - 痛点原因：仅停留在讨论层面，无关联PR、代码提交或文档链接证明缺陷已修复，且无关闭评论确认最终解决状态。
  - 原文依据：
    - `weihao18`：你好，可能是third_party/下的op-base版本太老，可以把third_party目录删掉，重新编译试试    - `vivi_is_coding`：third_party是每次编译的时候从网上现拉的    - `vivi_is_coding`：今天的报错日志：<a href="https://gitcode.com/user-attachments/files/7673863/fb1ee3ebb735436c9352c0e743993600.log" target="_blan…    - `weihao18`：你好，从最新的日志看，是宏未定义导致报错，'OP_LOGE_FOR_INVALID_ARGUMENT_WITH_REASON' was not declared in this scope ，请检查宏定义的位置是否包含进来 ``` fro…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/7197cdb306684ca2b69cde6d1a422747.log" target="_blank">7197c…    - `vivi_is_coding`：<a href="https://gitcode.com/user-attachments/files/7673863/2bb2dd2dd1ca42a7aacc171a460e5bb4.log" target="_blank">2bb2d…
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 15分
  - 痛点原因：虽有关联PR合并记录，但缺少commit引用、release引用及关闭评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 15分
  - 痛点原因：仅关联合并的PR并由机器人自动关闭，缺乏commit引用、release引用及人工关闭评论，证据链不完整。
  - 原文依据：
    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 15分
  - 痛点原因：无关联PR、commit引用和关闭评论等实质性解决证据，仅有人员指派记录，无法证明问题已解决。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 15分
  - 痛点原因：关联的PR未合并，无commit和release引用，仅有正在处理的回复，缺乏问题已解决的实质证据。
  - 原文依据：
    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233
- **[#3402](https://gitcode.com/cann/ops-transformer/issues/3402) [Requirement|需求建议]: 算子编译在不同的硬件设备能否统一** — 15分
  - 痛点原因：仅口头解释命名规范，无PR、commit或文档链接等实质解决证据，且未明确关闭结论。
  - 原文依据：
    - `weihao18`：你好，当前开源算子仓的soc_version是统一命名的    - `wang-minbo`：当前ascend910_93指的是A3版本；ascend910b指的是A2版本；ascend950指的是A5版本；当前所有命名已经统一规范；您使用的工具可能版本比较老没有更新。 有一个默认的命名规范，如ascend910_9382就是as…    - `wxhhuawei`：客户的疑问 1. A3为啥不是ascend930, 而A5是ascend950; 2. 以A3设备为例，编译时候为啥是910_9382 而不是910_93。就是我们一个算子工程哪里需要用910_93，哪里需要用910_9382 。 能否统…    - `wxhhuawei`：add label requirement    - `wang-minbo`：assigned to @wang-minbo
- **[#3589](https://gitcode.com/cann/ops-transformer/issues/3589) RMSNorm 在 Ascend 910B3 上的性能对比与后端实现咨询** — 23分
  - 痛点原因：仅建议移步其他仓库咨询便直接关闭，无关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：您好，RmsNorm归属于nn仓，建议移步[https://gitcode.com/cann/ops-nn](https://gitcode.com/cann/ops-nn)咨询    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3575](https://gitcode.com/cann/ops-transformer/issues/3575) [Question|问题咨询]: 发展前景怎么样？** — 23分
  - 痛点原因：仅凭文字讨论即关闭问题，无关联PR、commit或文档链接等任何实质性代码证据支撑解决过程。
  - 原文依据：
    - `liudan12`：短期 3–5 年不会被完全彻底替代； 中长期会从「大一统唯一架构」退化成混合架构里的核心子模块 ； 极端长序列、端侧轻量化场景会被纯 SSM/RNN 类新架构抢占市场，但通用大模型、代码、强逻辑推理场景 Transformer 仍不可替代…    - `liudan12`：closed from codehub    - `liudan12`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `wang-minbo`：assigned to @liudan12
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 23分
  - 痛点原因：虽有关联PR已合并，但缺乏commit引用、文档链接和release记录，仅靠状态变更关闭，证据强度不足。
  - 原文依据：
    - [关联PR #8183（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8183)    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 23分
  - 痛点原因：无关联PR、commit及文档等实质性修复证据，仅停留在指派和口头回复，缺乏具体修复方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成
- **[#3431](https://gitcode.com/cann/ops-transformer/issues/3431) [Question|问题咨询]: 如何针对单算子编译内存检测包** — 23分
  - 痛点原因：仅凭评论给出命令即关闭问题，无关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，可以 bash build.sh --ops=xxx --oom 编译asan包    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @weihao18
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，仅由机器人因关联issue合并而关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__
- **[#3422](https://gitcode.com/cann/ops-transformer/issues/3422) [Bug-Report|缺陷反馈]: attention/swin_attention_score_quant算子有kernel实现但缺少kernel算子说明…** — 23分
  - 痛点原因：仅凭评论和状态变更关闭，未关联任何PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `majinglan`：日落算子    - `majinglan`：closed from codehub    - `majinglan`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @L_Euler
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 23分
  - 痛点原因：仅由机器人关联PR合并自动关闭并打标签，缺乏人工对修复结果的说明，且无commit、文档或release等直接证据。
  - 原文依据：
    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 23分
  - 痛点原因：仅关联了合并PR，但关闭时无commit引用、文档链接及release引用等直接证据，仅凭简单评论关闭。
  - 原文依据：
    - [关联PR #8074（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8074)    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `ryan_li`：add label requirement
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 31分
  - 痛点原因：虽有合并的PR，但仅靠机器人自动关闭，缺乏人工关闭评论、文档链接及release引用等强证据支撑。
  - 原文依据：
    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - `cann-robot`：add label resolved
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 31分
  - 痛点原因：仅由机器人因PR合并自动关闭，缺乏人工关闭评论、文档链接及release引用等解决说明。
  - 原文依据：
    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 31分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏人工关闭评论、文档及release引用等解决证据。
  - 原文依据：
    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 31分
  - 痛点原因：虽有合并的PR和commit，但缺乏文档链接、release引用及人工确认解决的关闭评论，仅靠机器人自动关闭导致证据不足。
  - 原文依据：
    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 38分
  - 痛点原因：关闭时未关联 PR、commit 或 release 引用，缺乏直接的代码修复证据，仅靠系统自动关闭。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `zhuxueling`：closed from codehub    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 38分
  - 痛点原因：缺乏直接commit引用与release引用，且由机器人自动关闭并关联其他issue，证据链不完整。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3548](https://gitcode.com/cann/ops-transformer/issues/3548) [Documentation|文档反馈]: 表格明显超宽** — 38分
  - 痛点原因：虽有合并的关联PR，但无commit和release引用，且关闭评论仅为机器人自动触发，缺乏人工验证说明。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3547](https://gitcode.com/cann/ops-transformer/issues/3547) [Documentation|文档反馈]: 缺少参数说明，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit和release引用，且仅靠机器人自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复pr上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3546](https://gitcode.com/cann/ops-transformer/issues/3546) [Documentation|文档反馈]: 产品支持情况不全** — 38分
  - 痛点原因：缺少commit引用和release引用，仅靠机器人因PR合并自动关闭，缺乏具体的代码提交与版本发布证据。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到问题，修复代码上库中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 38分
  - 痛点原因：虽有合并的关联PR，但由机器人自动关闭，缺乏人工明确确认及commit和release引用，证据链不完整。
  - 原文依据：
    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan
- **[#3544](https://gitcode.com/cann/ops-transformer/issues/3544) [Bug-Report|缺陷反馈]: 950dt设备模型加载权重贼慢，1小时加载了2%，具体是aclrtMemcpy2dAsync函数模块卡住** — 38分
  - 痛点原因：该问题仅被迁移至其他仓库并关闭，未提供任何关联PR、代码提交或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。    - `liudan12`：>你好，我们将尽快分析这个问题，并为您提供解决方案。如有任何进一步的信息，请随时补充。 [@weihao18](https://gitcode.com/weihao18) 该接口为runtime领域提供，建议到这里提issue 咨询：ht…    - `wang-minbo`：您好，已收到您的问题，我们已将您的问题迁移到runtime仓，issue如下 https://gitcode.com/cann/runtime/issues/693 我们将关闭此issue，请您在新的issue下跟踪此问题    - `wang-minbo`：closed from codehub    - `wang-minbo`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3522](https://gitcode.com/cann/ops-transformer/issues/3522) [Bug-Report|缺陷反馈]: /master/torch_extension/README.md缺少了pip install Ninja的部署依赖** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit引用与release引用，仅靠口头确认和系统自动关闭，修复证据链不完整。
  - 原文依据：
    - [关联PR #8115（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8115)    - `weihao18`：你好，问题反馈已收到，确实缺少依赖，近期会把依赖添加上去    - `weihao18`：修复已合入，请确认没问题后，将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 38分
  - 痛点原因：虽有合并PR，但缺乏commit与release引用，且仅由机器人自动关闭，无人工确认修复的明确证据。
  - 原文依据：
    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 38分
  - 痛点原因：虽有合并PR，但缺少commit和release引用，关闭评论仅为指派命令，缺乏实质性解决说明。
  - 原文依据：
    - [关联PR #8070（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8070)    - [关联PR #8071（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8071)    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465    - `cann-robot`：add label resolved
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 38分
  - 痛点原因：仅评论提及PR已合入，但系统未关联PR，也无commit和release引用，缺乏结构化解决证据。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `duxinlei`：closed from codehub    - `cann-robot`：assigned to @duxinlei
- **[#3436](https://gitcode.com/cann/ops-transformer/issues/3436) [Documentation|文档反馈]: aclnnAllGatherMatmulV2.md调用实列少A3的示例** — 38分
  - 痛点原因：缺乏commit引用与release版本引用，仅靠关联PR和机器人自动关闭，证据支撑不足。
  - 原文依据：
    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@caiwenwen](https://gitcode.com/caiwenwen) 您好，感谢反馈，A2的示例也能在A3上也可以执行，我们会尽快更新下文档说明    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow
- **[#3430](https://gitcode.com/cann/ops-transformer/issues/3430) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/docs/zh/scatter_pa_kv_c…** — 38分
  - 痛点原因：仅口头说明文档整改后即关闭issue，未关联PR、commit或release等实质修复证据，解决过程缺乏可追溯性。
  - 原文依据：
    - `weihao18`：/assign [@hz36amy_00](https://gitcode.com/hz36amy_00)    - `hz36amy_00`：你好，已收到该问题，sparse_flash_mla_grad文档正在整改中，修复后关闭该issue    - `hz36amy_00`：closed from codehub    - `hz36amy_00`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @hz36amy_00
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 38分
  - 痛点原因：仅靠机器人关联PR关闭，无commit和release引用，且维护者仅承诺整改，缺乏具体修复证据。
  - 原文依据：
    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong
- **[#3424](https://gitcode.com/cann/ops-transformer/issues/3424) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档未按照规范要求输出文档，可读性差** — 38分
  - 痛点原因：解决者仅在评论中提及PR链接，未正式关联PR或补充commit引用，缺乏实质性代码合入证据支撑。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已经合入了    - `duxinlei`：closed from codehub    - `duxinlei`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @duxinlei
- **[#3386](https://gitcode.com/cann/ops-transformer/issues/3386) [Documentation|文档反馈]: mhc系列算子文档不清晰** — 38分
  - 痛点原因：无关联PR和commit引用等实质修复证据，仅提供现有文档链接后由非作者强行关闭，无法证明问题已解决。
  - 原文依据：
    - `xuejinghui`：experimental下非标准实现 MhcPost算子描述和实现目录：https://gitcode.com/cann/ops-transformer/blob/master/mhc/mhc_post/    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `liuzhuheng`：closed from codehub    - `xuejinghui`：assigned to @xuejinghui
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 46分
  - 痛点原因：无关联PR与release引用，且无关闭评论，仅停留在需求分配与计划评审阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 46分
  - 痛点原因：无关联 PR 与关闭评论，仅停留在指派负责人及数据类型讨论阶段，缺乏问题已解决的实质证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3568](https://gitcode.com/cann/ops-transformer/issues/3568) [Requirement|需求建议]: attention算子效率优化** — 46分
  - 痛点原因：缺乏关联PR与关闭评论等直接解决证据，且当前仅停留在要求补充需求信息阶段，未提供实际解决方案。
  - 原文依据：
    - `weihao18`：/assign [@jiang-lirui](https://gitcode.com/jiang-lirui)    - `jiang-lirui`：你好，请补充信息将问题描述清楚，以便我们评估需求价值，比如可以补充： 1、算子名称 2、硬件芯片版本，A2/A3、还是Ascend 950PR/Ascend 950DT 3、算子的具体shape信息 4、A800卡的性能 5、视频大模型具…    - `cann-robot`：assigned to @jiang-lirui
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 46分
  - 痛点原因：无关联PR与关闭评论，仅记录指派操作，缺乏实质解决过程与最终结论。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3443](https://gitcode.com/cann/ops-transformer/issues/3443) [Requirement|需求建议]: allto_allv_grouped_mat_mul需要支持A2** — 46分
  - 痛点原因：仅停留在分配负责人和补充需求阶段，无关联PR、release引用及解决关闭评论，缺乏最终解决证据。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `SuperYuan`：您好，您的需求我们已收到。希望您可以补充使用场景（可以参考现有A3算子接口，https://gitcode.com/cann/ops-transformer/blob/master/mc2/grouped_mat_mul_allto_al…    - `wxhhuawei`：add label requirement    - `cann-robot`：assigned to @captainmiaow
- **[#3427](https://gitcode.com/cann/ops-transformer/issues/3427) [Documentation|文档反馈]: aclnnDenseLightningIndexerSoftmaxLse和aclnnDenseLightningI…** — 46分
  - 痛点原因：无关联PR、release引用及关闭评论，仅靠口头承诺修改，缺乏明确的解决闭环证据。
  - 原文依据：
    - `caiwenwen`：本人会进行修改    - `weihao18`：/assign [@caiwenwen](https://gitcode.com/caiwenwen)    - `caiwenwen`：[@weihao18](https://gitcode.com/weihao18)    - `caiwenwen`：请同步修改，master和9.10    - `cann-robot`：assigned to @caiwenwen    - `weihao18`：assigned to @yu-xinjie62
- **[#3580](https://gitcode.com/cann/ops-transformer/issues/3580) [Requirement|需求建议]: 建议为 experimental 自定义算子工程增加统一的精度回归与性能基准测试能力** — 54分
  - 痛点原因：仅凭口头建议并直接关闭标记为已完成，未关联PR或文档链接，缺乏实质性的代码落地证据。
  - 原文依据：
    - `weihao18`：您好，感谢您提供的需求建议，这个需要上sig会评审一下，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transformer    - `weihao18`：您好，ops-transformer本身不承载过多的测试能力，一般只有ut等测试项，精度与性能测试工具可以考虑使用开源的ATK，TTK等测试框架 https://gitcode.com/cann/ops-test-kit    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `weihao18`：add label feature    - `cann-robot`：add label Accepted
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 54分
  - 痛点原因：关联PR被关闭且无文档及release引用，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：closed from codehub    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock
- **[#3472](https://gitcode.com/cann/ops-transformer/issues/3472) [Bug-Report|缺陷反馈]: 使用cann社区包9.1.0-beta.3编译算子报错，出现undefined symbol** — 54分
  - 痛点原因：未定位根因且无PR和commit修复证据，仅建议更换尝鲜包便以已解答为由关闭，缺乏实质性解决证明。
  - 原文依据：
    - `weihao18`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：目前经过验证排查，可能是9.1.0-beta.3版本cann包问题，具体问题待进一步定位    - `SH_jingsong`：9.1.0-beta.3可能与主线代码存在一些兼容性问题，目前主线并未出现相关问题，9.1.0-beta.3社区包多个算子编译报错，经评估该问题应该和算子关系不大。如有主线编译需求可以尝试用【尝鲜包】： https://gitcode.c…    - `SH_jingsong`：您好，当前问题已解答，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 54分
  - 痛点原因：虽有合并的PR和commit引用，但缺少文档链接与release版本引用，且关闭评论仅为机器人自动关闭，证据链不够完整。
  - 原文依据：
    - [关联PR #8851（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8851)    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815
#### PP-07 多次重分配导致责任归属混乱（I1 · 分配与首次响应）

- **[#3588](https://gitcode.com/cann/ops-transformer/issues/3588) [Requirement|需求建议]: 建议 experimental 自定义算子编译支持可配置 SoC 版本** — 0分
  - 痛点原因：仅打标签分配负责人并安排会议评审，未针对需求提供实质性技术解答或处理意见。
  - 原文依据：
    - `wang-minbo`：已收到您的诉求，本周三会有一次transformer仓的sig会议，我们会在会议上评审    - `weihao18`：add label feature    - `weihao18`：assigned to @wang-minbo
- **[#3586](https://gitcode.com/cann/ops-transformer/issues/3586) [Requirement|需求建议]: 建议补充 ops-transformer 算子支持矩阵与快速检索索引** — 0分
  - 痛点原因：首次响应耗时近48小时，且仅停留在分配任务与流程告知，未对需求给出任何技术性实质解答。
  - 原文依据：
    - `weihao18`：/assign [@wang-minbo](https://gitcode.com/wang-minbo)    - `wang-minbo`：您好，已收到您的诉求，后天我们将在sig上评审该需求    - `weihao18`：add label feature    - `cann-robot`：assigned to @wang-minbo
- **[#3585](https://gitcode.com/cann/ops-transformer/issues/3585) [Bug-Report|缺陷反馈]: cleancode重复代码整改** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后自动关闭，全程无任何人工实质回应或修复说明。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3585    - [关联PR #8245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8245)    - [关联PR #8280（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8280)
- **[#3584](https://gitcode.com/cann/ops-transformer/issues/3584) slikg headNum=8精度修复** — 0分
  - 痛点原因：仅有机器人加标签及关联PR合并后的自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3584    - [关联PR #8241（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8241)    - [关联PR #8242（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8242)
- **[#3583](https://gitcode.com/cann/ops-transformer/issues/3583) [Documentation|文档反馈]: aclnnMhcPreSinkhorn 产品支持情况段落多余空行** — 0分
  - 痛点原因：全程仅机器人打标签及关联PR自动关闭，无任何人工实质回应。
  - 原文依据：
    - `weixin_44156099`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3583    - [关联PR #8243（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8243)    - [关联PR #8244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8244)
- **[#3578](https://gitcode.com/cann/ops-transformer/issues/3578) [Bug-Report|缺陷反馈]: mega_moe A5 对topk的校验[1,16]，与资料内范围 6和8不一致，且使用场景存在未保护先使用，除零风险，…** — 0分
  - 痛点原因：全程仅有指派、加标签和关闭操作，未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8157（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8157)
- **[#3577](https://gitcode.com/cann/ops-transformer/issues/3577) [Bug-Report|缺陷反馈]: mega_moe A5 CheckTensorDim中“The shape [dim0] of x, topkIds, …** — 0分
  - 痛点原因：仅添加标签并由机器人关联合并PR关闭，全程无人工实质技术回应。
  - 原文依据：
    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3577    - [关联PR #8240（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8240)
- **[#3572](https://gitcode.com/cann/ops-transformer/issues/3572) [Bug-Report|缺陷反馈]: mega_moe A5 对epWorldSize的校验[2,1024]，与资料内范围 [2, 768]不一致，请修改** — 0分
  - 痛点原因：被指派人直接关闭issue，仅有指派和加标签操作，全程无任何实质技术回应。
  - 原文依据：
    - `weihao18`：/assign [@zhuxueling](https://gitcode.com/zhuxueling)    - `liudan12`：add label bug-report    - `cann-robot`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub
- **[#3571](https://gitcode.com/cann/ops-transformer/issues/3571) [Bug-Report|缺陷反馈]: A2 mega_moe tiling检查逻辑错误，存在除零风险，请系统梳理epWorldSize的资料、校验和计算逻辑** — 0分
  - 痛点原因：响应耗时超55小时，仅执行分配和打标签等机械操作，全程无任何实质回应内容。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3571    - [关联PR #8811（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8811)
- **[#3549](https://gitcode.com/cann/ops-transformer/issues/3549) [Bug-Report|缺陷反馈]: 算子代码代码中使用了废弃接口-OP_LOGE_WITH_INVALID_INPUT，建议修改为最新接口，详见邮件** — 0分
  - 痛点原因：仅分配任务和客套感谢，未针对废弃接口问题提供任何实质性技术解答或处理方案。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：[@LetsAiGo](https://gitcode.com/LetsAiGo) 感谢反馈    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @captainmiaow    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3436,issue3549    - [关联PR #8396（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8396)
- **[#3545](https://gitcode.com/cann/ops-transformer/issues/3545) [Documentation|文档反馈]: 红框中缺少*号，和函数原型保持一致** — 0分
  - 痛点原因：仅简单回复收到修改中并直接关闭，未提供任何实质性的技术解答或处理反馈。
  - 原文依据：
    - `weihao18`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：收到，开发人员修改中    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @kknan    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3545,issue3546,issue3547,issue3548    - [关联PR #8500（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8500)
- **[#3536](https://gitcode.com/cann/ops-transformer/issues/3536) [Requirement|需求建议]: 对moe算子的error日志进行可维测性改造** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3536    - [关联PR #6923（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6923)
- **[#3535](https://gitcode.com/cann/ops-transformer/issues/3535) [Bug-Report|缺陷反馈]: megaMoe ut有段错误** — 0分
  - 痛点原因：仅有指派和加标签等自动化操作，全程无任何针对缺陷的实质技术回应即被关闭。
  - 原文依据：
    - `mutex_lock`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `jiangxiuhan1`：add label bug-report    - `cann-robot`：assigned to @mutex_lock    - `jiangxiuhan1`：closed from codehub    - [关联PR #8146（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8146)
- **[#3518](https://gitcode.com/cann/ops-transformer/issues/3518) [Bug-Report|缺陷反馈]: torch_extension/cann_ops_transformer/ops/csrc/comm_context.c…** — 0分
  - 痛点原因：全程仅有指派和打标签等机械操作，无任何针对缺陷的实质性技术回应，仅靠机器人标记解决。
  - 原文依据：
    - `weihao18`：/assign [@weihao18](https://gitcode.com/weihao18)    - `liudan12`：add label bug-report    - `wang-minbo`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18    - `wang-minbo`：closed from codehub
- **[#3514](https://gitcode.com/cann/ops-transformer/issues/3514) A5 qli&li 超大函数过多，降低超大函数比例** — 0分
  - 痛点原因：全程仅有机器人加标签及随PR合并自动关闭的操作，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3514    - [关联PR #8065（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8065)    - [关联PR #8067（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8067)
- **[#3513](https://gitcode.com/cann/ops-transformer/issues/3513) [Requirement|需求建议]: sliklg metadata算子支持A5，新增smlag metadata算子** — 0分
  - 痛点原因：仅打标签及由机器人在关联PR合并后关闭，全程无人工实质性回应。
  - 原文依据：
    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3513    - [关联PR #7857（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7857)
- **[#3510](https://gitcode.com/cann/ops-transformer/issues/3510) [Bug-Report|缺陷反馈]: 不传入输入bin时，会报错退出，没有相应的拦截信息打印** — 0分
  - 痛点原因：仅机器人加标签并随关联PR合并自动关闭，全程无人工实质性回应。
  - 原文依据：
    - `fanzijian`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3510    - [关联PR #7390（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7390)    - [关联PR #8053（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8053)
- **[#3507](https://gitcode.com/cann/ops-transformer/issues/3507) [Requirement|需求建议]: LI文档更新** — 0分
  - 痛点原因：维护者仅加标签，后由机器人因关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3507    - [关联PR #8039（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8039)    - [关联PR #8040（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8040)
- **[#3506](https://gitcode.com/cann/ops-transformer/issues/3506) A3&A5 兼容性问题，A5不能继承A3 int8用例** — 0分
  - 痛点原因：仅由机器人关联PR并关闭，全程无任何人工实质回应，故得分为0。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3506    - [关联PR #8042（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8042)    - [关联PR #8043（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8043)
- **[#3504](https://gitcode.com/cann/ops-transformer/issues/3504) [Documentation|文档反馈]: torch_api_list.md信息与实际api信息不一致（9.1.0分支和master分支）** — 0分
  - 痛点原因：官方仅承诺尽快核实修复，未提供实质性技术解答或具体处理方案，且首次响应超42小时。
  - 原文依据：
    - `gitcode-chenjiao`：![2.png](https://raw.gitcode.com/user-images/assets/7673863/9435d0de-9999-4cff-97af-b330f41f377e/2.png '2.png') 正文里支持3款…    - `weihao18`：您好，您提到的metadata接口呈现规则不一致和确定性说明与API正文内容不一致的问题，我们将尽快核实并修复。    - `gitcode-chenjiao`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3504    - [关联PR #8138（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8138)
- **[#3502](https://gitcode.com/cann/ops-transformer/issues/3502) [Requirement|需求建议]: QLIV2需要新增支持N1为32的特性** — 0分
  - 痛点原因：全程仅机器人打标签及随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3502    - [关联PR #7963（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7963)
- **[#3498](https://gitcode.com/cann/ops-transformer/issues/3498) [Bug-Report|缺陷反馈]: CI编译阻塞** — 0分
  - 痛点原因：仅由机器人自动打标签并随关联PR合并关闭，全程无人工实质性回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3498    - [关联PR #8010（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8010)
- **[#3482](https://gitcode.com/cann/ops-transformer/issues/3482) [Bug-Report|缺陷反馈]: sfag算子aclnn中的aclrtStream前加了const修饰符，与之前自动生成的aclnn不一致** — 0分
  - 痛点原因：全程仅添加标签并由机器人关联PR合并直接关闭，无任何人工实质性文字回应。
  - 原文依据：
    - `huzhipeng`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3482    - [关联PR #7905（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7905)    - [关联PR #7955（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7955)
- **[#3479](https://gitcode.com/cann/ops-transformer/issues/3479) [Bug-Report|缺陷反馈]: allgathermatmulv2算子不支持格式的日志错误码不是EZ0018** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `w00951525`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3479    - [关联PR #7705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7705)
- **[#3474](https://gitcode.com/cann/ops-transformer/issues/3474) [Documentation|文档反馈]: MaskedCausalConv1d和MaskedCausalConv1dBackward文档资料与aclnn接口…** — 0分
  - 痛点原因：仅添加标签并由机器人随PR合并自动关闭，全程无任何人工实质回应。
  - 原文依据：
    - `qiumingli`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3474    - [关联PR #7899（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7899)    - [关联PR #8064（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8064)
- **[#3469](https://gitcode.com/cann/ops-transformer/issues/3469) [Documentation|文档反馈]: Modify the interface name of the aclnnDenseLightningIndex…** — 0分
  - 痛点原因：仅打标签无人工实质回应，关联PR合并后直接被机器人关闭。
  - 原文依据：
    - `zhouwenfang`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3469    - [关联PR #7936（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7936)    - [关联PR #7939（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7939)
- **[#3465](https://gitcode.com/cann/ops-transformer/issues/3465) [Bug-Report|缺陷反馈]: attention/mla_preprocess_v2/README.md这个kernel的说明文档缺少了示例代码调用说…** — 0分
  - 痛点原因：仅有指派和机器人加标签等指令操作，全程无任何针对缺陷内容的实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `HuangKun8682`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @chaotang233    - `cann-robot`：assigned to @HuangKun8682 and unassigned @chaotang233    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3465
- **[#3460](https://gitcode.com/cann/ops-transformer/issues/3460) [Bug-Report|缺陷反馈]: scatter_pa_kv_cache: legacy Tiling 缺少 strides/offsets 判空与长度校验** — 0分
  - 痛点原因：维护者仅进行了人员分配与取消操作，全程未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3457](https://gitcode.com/cann/ops-transformer/issues/3457) [Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致** — 0分
  - 痛点原因：仅进行了指派和取消指派操作，未对文档不一致问题提供任何实质解答或处理。
  - 原文依据：
    - `weihao18`：/assign [@wy519](https://gitcode.com/wy519)    - `cann-robot`：assigned to @wy519    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @wy519
- **[#3452](https://gitcode.com/cann/ops-transformer/issues/3452) [Bug-Report|缺陷反馈]: SparseFlashMla 可选 stride0 获取需要按 stride 数组读取** — 0分
  - 痛点原因：全程仅打标签并由机器人关联PR合并关闭，无任何人工实质性技术回应。
  - 原文依据：
    - `Wei_NaChuan`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3452    - [关联PR #7927（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7927)
- **[#3450](https://gitcode.com/cann/ops-transformer/issues/3450) [Bug-Report|缺陷反馈]: [FA]修改aclnnFlashAttentionScoreV4资料perblock场景** — 0分
  - 痛点原因：全程仅机器人添加标签并因PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `zhaoDan0110`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3450    - [关联PR #7930（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7930)    - [关联PR #7933（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7933)
- **[#3445](https://gitcode.com/cann/ops-transformer/issues/3445) [Bug-Report|缺陷反馈]: 资料和接口不一致问题修改** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3445    - [关联PR #7912（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7912)    - [关联PR #7913（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7913)
- **[#3429](https://gitcode.com/cann/ops-transformer/issues/3429) [Bug-Report|缺陷反馈]: ffn/swin_transformer_ln_qkv/README.md算子接口文档说明不支持用户直接调用，却提供了调…** — 0分
  - 痛点原因：仅有初步接收回复和人员分配，未提供实质性技术解答或处理方案，且关联PR仍处于open状态。
  - 原文依据：
    - `weihao18`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `yolic`：您好，感谢反馈，问题已收到，正在处理。    - `cann-robot`：assigned to @chaotang233    - [关联PR #9010（open）](https://gitcode.com/cann/ops-transformer/merge_requests/9010)
- **[#3428](https://gitcode.com/cann/ops-transformer/issues/3428) [Requirement|需求建议]: ChunkGatedDeltaRule需要支持tensor地址非连续管理方式，确保和vllm社区对qwen3.5/3.…** — 0分
  - 痛点原因：维护者仅进行了分配和打标签操作且首次分配失败，全程无任何针对需求的技术讨论或实质解答。
  - 原文依据：
    - `weihao18`：/assign @abaabc    - `cann-robot`：### Notice This issue can not be assigned to ***abaabc***. Please try to assign to the repository members.    - `cann-robot`：add label resolved    - `weihao18`：assigned to @zzy__    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3428    - [关联PR #8711（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8711)
- **[#3425](https://gitcode.com/cann/ops-transformer/issues/3425) [Bug-Report|缺陷反馈]: attention/lightning_indexer/tests/pytest/README.md文档中引用的Atte…** — 0分
  - 痛点原因：仅回复已收到并直接被机器人标记为resolved，全程无实质技术解答或修复方案。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `SH_jingsong`：已收到相关文档问题，后续会整改    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SH_jingsong    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3425    - [关联PR #7901（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7901)
- **[#3421](https://gitcode.com/cann/ops-transformer/issues/3421) [Bug-Report|缺陷反馈]: attention/scatter_pa_kv_cache_with_k_scaled算子有kernel实现但是缺少ke…** — 0分
  - 痛点原因：全程仅执行分配与机器人加标签操作，无任何人工实质性技术回应，最终随MR合并直接关闭。
  - 原文依据：
    - `weihao18`：/assign [@yu_qinfei](https://gitcode.com/yu_qinfei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3421    - [关联PR #7618（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7618)
- **[#3394](https://gitcode.com/cann/ops-transformer/issues/3394) [Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix** — 0分
  - 痛点原因：全程仅机器人打标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3394    - [关联PR #7742（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7742)
- **[#3462](https://gitcode.com/cann/ops-transformer/issues/3462) [Bug-Report|缺陷反馈]: gather_pa_kv_cache: legacy Host 侧 GetAttrPointer 返回值未判空（Infe…** — 20分
  - 痛点原因：首次响应仅分配任务，时隔近400小时才给出实质性技术回应，严重超时导致得分极低。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `wangchao661`：已核对代码，需要判空保护，正在修复合入中。    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @monologue815    - `wangchao661`：assigned to @wangchao661    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3462
- **[#3579](https://gitcode.com/cann/ops-transformer/issues/3579) [Bug-Report|缺陷反馈]: mega_moe A2 对topk的校验[1,32]，与资料内范围 6和8不一致** — 40分
  - 痛点原因：指派后耗时近292小时才给出修复PR的实质回复，响应严重迟缓导致得分偏低。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：您好，关联pr已经完成了资料和tiling校验的范围修改。    - `liudan12`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @lyt_claire    - `lyt_claire`：closed from codehub
- **[#3570](https://gitcode.com/cann/ops-transformer/issues/3570) [Documentation|文档反馈]: 建议统一补充 Attention 类算子 FLOAT16/BFLOAT16 输入构造与调用示例说明** — 40分
  - 痛点原因：指派操作因机器人限制受阻，导致处理延迟，历经329小时才由人工给出实质技术解答。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：### Notice Can only assign one assignee to the issue.    - `tangkaidi`：你好，感谢你的参与。 使用vector构造Host侧的输入数据HostData时使用的数据类型与aclDataType，其内存字节数需要保持一致。 常见的类型float与ACL_FLOAT，op::fp16_t与ACL_FLOAT16，二…    - `cann-robot`：assigned to @monologue815    - `tangkaidi`：assigned to @tangkaidi
- **[#3517](https://gitcode.com/cann/ops-transformer/issues/3517) [Bug-Report|缺陷反馈]: Ascend950 FIA的MLA场景精度不通过** — 40分
  - 痛点原因：首次响应后历经多次人员指派，耗时195小时才给出实质性定位结论，响应间隔过长。
  - 原文依据：
    - `weihao18`：/assign [@tang-hao-hw-gitcode](https://gitcode.com/tang-hao-hw-gitcode)    - `huang-chuhong`：您好，经过定位，issue中提供的脚本存在问题，非算子精度问题 在Mla K_NOPE 512场景 key value复用，在计算golden 和调用算子时，key value应该传同一个tensor 脚本修改参考如下： # ---- C…    - `cann-robot`：assigned to @monologue815    - `cann-robot`：assigned to @tang-hao-hw-gitcode and unassigned @monologue815    - `weihao18`：assigned to @xtqh    - `weihao18`：unassigned @tang-hao-hw-gitcode
- **[#3463](https://gitcode.com/cann/ops-transformer/issues/3463) [Bug-Report|缺陷反馈]: mhc/mhc_sinkhorn/README.md文档使用的资料格式与其他算子不一致** — 40分
  - 痛点原因：首次仅简单分配任务，时隔230.31小时才给出修复链接，实质回应耗时过长严重超标。
  - 原文依据：
    - `weihao18`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：https://gitcode.com/cann/ops-transformer/pull/7863 已合入    - `cann-robot`：assigned to @duxinlei    - `duxinlei`：closed from codehub
- **[#3449](https://gitcode.com/cann/ops-transformer/issues/3449) [Bug-Report|缺陷反馈]: mc2/matmul_reduce_scatter_v2算子样例代码在A2上执行失败** — 40分
  - 痛点原因：早期回应仅为分配任务和客套话，缺乏实质技术排查，导致实质回应耗时超214小时。
  - 原文依据：
    - `weihao18`：/assign [@captainmiaow](https://gitcode.com/captainmiaow)    - `captainmiaow`：收到反馈，感谢，我们将尽快修复    - `sangzhenguo`：/assign [@sangzhenguo](https://gitcode.com/sangzhenguo)    - `majinglan`：双卡能跑通    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @captainmiaow
- **[#3398](https://gitcode.com/cann/ops-transformer/issues/3398) [Requirement|需求建议]: 将torch extension的编译产物加入到gitignore文件中** — 40分
  - 痛点原因：首次响应仅泛泛表态已收到，时隔189小时才给出修复PR合入的实质性反馈，耗时过长。
  - 原文依据：
    - `weihao18`：你好，反馈的问题已收到，后续会进行优化    - `weihao18`：修复pr已合入，请确认没问题后将关闭issue    - `ryan_li`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3397](https://gitcode.com/cann/ops-transformer/issues/3397) [Bug-Report|缺陷反馈]: 910B2 grouped_matmul_finalize_routing算子开确定性之后性能劣化1倍** — 40分
  - 痛点原因：实质回应耗时近8天，且仅以无性能要求为由直接关闭，未有效解决性能劣化问题。
  - 原文依据：
    - `weihao18`：/assgin [@kknan](https://gitcode.com/kknan)    - `kknan`：与算子开发同学对齐，确定性需求交付的时候是纯功能，无性能要求。    - `kknan`：/close    - `cann-robot`：add label Accepted    - `weihao18`：assigned to @kknan    - `yangchao888`：closed from codehub

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后48小时内无技术回复 |
| 具体动作 | 自动提醒被指派者并升级至备选负责人，同时在Issue中标注stale-discussion标签 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 73.1，低分 14/70 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.5，低分 64/70 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅有重定向回复，无技术讨论推进或下一步排查方向 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | 根因已定位或方案已提出后7天内 |
| 具体动作 | 在Issue中明确标注resolution-found标签并@用户确认，提供验证步骤和预期关闭时间 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 73.1，低分 14/70 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.5，低分 64/70 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅有重定向回复，无技术讨论推进或下一步排查方向 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | 讨论进行中任一方7天未回复 |
| 具体动作 | 主动发布讨论状态总结评论，明确当前进展、待办项和责任人，推动下一轮交互 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 64/70；OBJ_RESULT_FORMATION_TIMELINESS：均值 73.1，低分 14/70 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 73.1，低分 14/70 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.5，低分 64/70 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅有重定向回复，无技术讨论推进或下一步排查方向 | 明确下一步动作、阶段结论和推进记录 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **79.4/100**，整体相对可控，但仍需关注：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.9 | 内容具体且技术性强，无明显AI生成或幻觉迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 67.9 | LLM评分失败或缺失 |

代表低分 Issue：[#3575](https://gitcode.com/cann/ops-transformer/issues/3575)
问题：[Question|问题咨询]: 发展前景怎么样？。

### I1 · 分配与首次响应
本阶段分数为 **62.7/100**，整体相对可控，但仍需关注：分配后责任人无实质响应。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 35.7 | 均值 35.7，低分 45/70 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 76.3 | 均值 76.3，低分 2/70 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 72.3 | 通过assign命令明确认领到hz36amy_00，责任归属清晰 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 73.0 | 正确标注requirement标签并分配负责人，分流路径合理 |

代表低分 Issue：[#3506](https://gitcode.com/cann/ops-transformer/issues/3506)
问题：A3&A5 兼容性问题，A5不能继承A3 int8用例。

### I2 · 讨论与解决
本阶段分数为 **55.0/100**，本阶段需要改进，主要问题是：分配后无实质技术讨论。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 73.1 | 均值 73.1，低分 14/70 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 28.5 | 均值 28.5，低分 64/70 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 54.8 | 仅有重定向回复，无技术讨论推进或下一步排查方向 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 67.8 | 用户咨询问题未获解答，仅被重定向至其他仓库 |

代表低分 Issue：[#3457](https://gitcode.com/cann/ops-transformer/issues/3457)
问题：[Documentation|文档反馈]: scatter_pa_kv_cache: README/aclnn 文档参数表与约束多处不一致。

### I3 · 总结与关闭
本阶段分数为 **46.4/100**，本阶段需要改进，主要问题是：—。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 18.1 | 均值 18.1，低分 68/70 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 53.3 | 均值 53.3，低分 35/70 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.7 | 关闭后未说明后续反馈路径或重新开启条件 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 81.0 | issue仍处于开放状态，不存在过早关闭风险 |

代表低分 Issue：[#3394](https://gitcode.com/cann/ops-transformer/issues/3394)
问题：[Requirement|需求建议]: 新增LIV2/QLIV2拦截 & golden bugfix。

### G · Bot/Agent 治理
本阶段分数为 **66.2/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 30.9 | 均值 30.9，低分 51/70 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 95.6 | 均值 95.6，低分 1/70 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 71.3 | Bot分配后人工及时承接并回复，交接顺畅无停滞 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 67.5 | Bot执行assign和label流程治理，帮助推进但未直接解决业务问题 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 73.3 | Bot准确执行assign和加标签，时机合适，无错误阻断 |

代表低分 Issue：[#3584](https://gitcode.com/cann/ops-transformer/issues/3584)
问题：slikg headNum=8精度修复。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 197 | 47.5 | 首期基线 | 79.4 | 62.7 | 55.0 | 46.4 | 66.2 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **21 位社区响应者**贡献 **151 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `weihao18` | 87 |
| `huang-chuhong` | 18 |
| `wang-minbo` | 6 |
| `kknan` | 6 |
| `captainmiaow` | 5 |

Top1 响应占比 **57.6%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：92.8/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-transformer/report_cann-ops-transformer_2026-06-29_to_2026-07-05.json`。
