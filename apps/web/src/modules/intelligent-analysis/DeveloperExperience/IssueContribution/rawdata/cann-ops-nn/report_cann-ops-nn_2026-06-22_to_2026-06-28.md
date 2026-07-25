# Issue 贡献体验周报 · cann/ops-nn

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-nn` 共收到 **177** 个 Issue
+ 其中外部 Issue **25** 个、内部 **152** 个；I1–I3 及 G 基于「外部且成熟」的 **25** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 21 / Closed 156**，关闭率 **88.1%**。
+ 总体体验分为 **42.6/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I2 · 讨论与解决 | 41.1 | 讨论推进严重不足，Issue长期停滞 |
| P1 | I3 · 总结与关闭 | 41.6 | 关闭沉淀质量差，解决证据不足 |
| P1 | I1 · 分配与首次响应 | 61.5 | 分流标签缺失与路由低效 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 主动发起技术讨论或方案评审，明确下一步行动 |
| REC-02 | P0 | 检查Issue类型标签，需求/讨论类Issue需人工确认后方可关闭 |
| REC-03 | P1 | 根据标题前缀和正文内容自动添加类型标签 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 177 |
| Open / Closed | 21 / 156 |
| 关闭率 | 88.1% |
| 类型构成 | 缺陷 85 / 需求 52 / 咨询 2 / 其他 38 |
| 总体体验分 | 42.6/100（D） |
| 首次响应时间 | 中位 0.2h；均值 16.0h |
| 关闭周期 | 中位 17.8h；均值 3.5天 |
| 7天响应率 | 94.9% |
| 评论数/Issue | 0.73 |
| 标签覆盖率 | 87.6% |
| 指派覆盖率 | 96.0% |
| 数据完整性 | 91.3/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.1 | 18/177（10.2%） | 相对可控 | `SUB_INPUT_QUALITY` 65.9 |
| I1 · 分配与首次响应 | 61.5 | 14/25（56.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 28.0 |
| I2 · 讨论与解决 | 41.1 | 19/25（76.0%） | P0 | `OBJ_SOLUTION_EVIDENCE` 25.5 |
| I3 · 总结与关闭 | 41.6 | 21/25（84.0%） | P1 | `OBJ_CLOSURE_REUSE` 11.8 |
| G · Bot/Agent 治理（参考） | 65.5 | 4/25（16.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 43.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 讨论推进严重不足，Issue长期停滞 | OBJ_SOLUTION_EVIDENCE：均值 25.5，低分 23/25；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.2，低分 13/25 | 用户需求无法推进，社区贡献者流失风险高 |
| PP-02 | P0 | G · Bot/Agent 治理 | Bot误关闭率近30%，有效Issue被错误关闭 | OBJ_BOT_GOVERNANCE：均值 43.0，低分 11/25；OBJ_BOT_MISCLOSE_REVERSE：均值 96.8，低分 0/25 | 有效需求被错误关闭，用户信任受损，问题积压 |
| PP-03 | P1 | I1 · 分配与首次响应 | 分流标签缺失与路由低效 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.0，低分 18/25；OBJ_RESPONSE_SPEED：均值 84.0，低分 2/25 | Issue无法被有效分类检索，处理效率低下 |
| PP-04 | P1 | I2 · 讨论与解决 | 需求类Issue长期无跟进 | OBJ_SOLUTION_EVIDENCE：均值 25.5，低分 23/25；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.2，低分 13/25 | 社区贡献者积极性受挫，需求积压无法消化 |
| PP-05 | P1 | I3 · 总结与关闭 | 关闭沉淀质量差，解决证据不足 | OBJ_CLOSURE_REUSE：均值 11.8，低分 24/25；OBJ_DECISION_TRANSPARENCY：均值 43.0，低分 18/25 | 关闭后无法追溯解决方案，社区知识沉淀不足 |
| PP-06 | P2 | I1 · 分配与首次响应 | 首次响应时间两极分化严重 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.0，低分 18/25；OBJ_RESPONSE_SPEED：均值 84.0，低分 2/25 | 部分用户等待极长时间才获得响应，体验差异大 |

### 4.1 低分 Issue 明细

#### PP-01 讨论推进严重不足，Issue长期停滞（I2 · 讨论与解决）

- **[#3609](https://gitcode.com/cann/ops-nn/issues/3609) [Requirement|需求建议]: aclnnfallback开源** — 0分
  - 痛点原因：仅关联已合并PR，但缺乏commit、文档链接、release引用及关闭评论等直接解决证据。
  - 原文依据：
    - [关联PR #6161（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6161)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@tianqiguang](https://gitcode.com/tianqiguang) 正在跟踪处理。    - `yangyang016`：感谢您的反馈，我们将在Q3支持该公共能力，并陆续开源各个算子对应的fallback能力    - `liubo75`：add label requirement    - `chenqi317`：assigned to @songkai111    - `chenqi317`：assigned to @yangyang016
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 0分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档链接、release引用及人工关闭评论，解决证据薄弱。
  - 原文依据：
    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)    - `qq_45721369`：closed from codehub    - `cann-robot`：add label resolved
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 0分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏commit引用、release说明、文档链接及人工关闭评论，证据链不完整导致零分。
  - 原文依据：
    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏commit、文档或release等直接可追溯的解决证据。
  - 原文依据：
    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - `cann-robot`：add label resolved
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 0分
  - 痛点原因：仅由机器人自动关闭，缺乏人工关闭评论、commit引用及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - `cann-robot`：add label resolved
- **[#3525](https://gitcode.com/cann/ops-nn/issues/3525) [Question|问题咨询]: 量化Matmul的MX量化模式为什么要求K一定要是偶数？** — 0分
  - 痛点原因：仅有文字讨论解释原因，缺乏关联PR、代码提交或官方文档等实质性证据支撑解决结论。
  - 原文依据：
    - `tangweiwei2`：这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。    - `Kiana1216`：>这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。 [@tangweiwei2](https://gitcode.com/tangweiwei2) 老师后半句真没听懂，能稍微详细介绍一下吗…    - `tangweiwei2`：根因在于： L0_mx中需要满足分型为最低维度是K方向上的2，在transA=True场景下没有指令将K=2单独拆出来， 因此前置量化算子输出就要满足Scale_K0=2，放置在最低维 数据流： X2Scale：GM->L1->L0_MX…    - `tangweiwei2`：核心是硬件上要求L0_MX的最低位K=2，因此在外部直接做好拆解，否则内部没有相关指令可以完成这个操作。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `tangweiwei2`：add label wait-feedback
- **[#3640](https://gitcode.com/cann/ops-nn/issues/3640) 【文档质量】torch_extension_develop_guide.md 把依赖清单标成 bash 代码块、且没有 pip install,照抄装不上依赖** — 15分
  - 痛点原因：无关联PR与commit引用，评论仅互相转派，未提供实质性修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：[@yolic](https://gitcode.com/yolic)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3639](https://gitcode.com/cann/ops-nn/issues/3639) 【文档质量】量化介绍.md 以 1bit 举例 MX 量化,但本仓 MX 接口文档只体现 FLOAT4/FLOAT8,易让人误以为支持 1bit** — 15分
  - 痛点原因：仅有接收反馈与指派记录，无关联PR、commit或release等实质性解决证据，且无最终解决说明。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3637](https://gitcode.com/cann/ops-nn/issues/3637) 【文档质量】op_api_list.md 索引表给部分接口的 A2/A3 列填「默认确定性实现」,但这些算子自己的支持表写的是不支持** — 15分
  - 痛点原因：仅有人工指派和口头回复，缺乏关联PR、代码提交及版本发布等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：已经安排人员正在修改    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3636](https://gitcode.com/cann/ops-nn/issues/3636) 【文档质量】QUICKSTART.md 同篇前后不一致:第一章用 ${soc_version} 占位,第二章重编译却写死 ascend910b** — 15分
  - 痛点原因：未关联 PR、commit 或 release 等实质性解决证据，仅有人工指派和跟进回复。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3635](https://gitcode.com/cann/ops-nn/issues/3635) 【文档质量】QUICKSTART.md「改 Add 为 Mul」示例片段用的签名/变量是旧版,与当前 add_example.h 不一致** — 15分
  - 痛点原因：仅有人工分配和跟踪回复，无关联PR、commit引用或修复确认等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3634](https://gitcode.com/cann/ops-nn/issues/3634) 【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致** — 15分
  - 痛点原因：仅指派人员并回复收到反馈，无关联PR、commit引用及关闭评论等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3633](https://gitcode.com/cann/ops-nn/issues/3633) 【文档质量】aicore_develop_guide.md 让参考 add_example/add_example_data 目录,该目录不存在** — 15分
  - 痛点原因：仅有人员分配和跟踪处理的回复，无关联PR、commit引用及release更新等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 23分
  - 痛点原因：关联的两个PR均被关闭且无commit引用，仅靠机器人命令关闭，缺乏实际修复的代码证据。
  - 原文依据：
    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)    - [关联PR #6546（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6546)    - `yolic`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `yolic`：add label bug-report
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 31分
  - 痛点原因：虽有合并的PR和commit引用，但缺乏文档链接、release引用及人工关闭评论，仅靠机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3514](https://gitcode.com/cann/ops-nn/issues/3514) [Requirement|需求建议]: 【社区任务】InplaceSigmoid算子开发交付（任务编号 05-19）** — 31分
  - 痛点原因：PR虽已合并，但缺少文档链接、release引用及关闭评论，导致最终解决证据不足。
  - 原文依据：
    - [关联PR #6438（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6438)    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt
- **[#3480](https://gitcode.com/cann/ops-nn/issues/3480) [Requirement|需求建议]: AscendAntiQuantV2算子AscendC实现** — 31分
  - 痛点原因：关联PR仍处于open状态未合并，无文档与release引用，仅停留在安排代码审核阶段，未形成闭环。
  - 原文依据：
    - [关联PR #6332（open）](https://gitcode.com/cann/ops-nn/merge_requests/6332)    - `fullt`：我们会安排进行代码审核    - `oscillated`：assigned to @fullt
- **[#3588](https://gitcode.com/cann/ops-nn/issues/3588) [Documentation|文档反馈]: MATMUL算子A3上支持fp32*bf16（Nz）以及fp32*fp32(nz)，但是aclnn接口aclnnM…** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit与release引用，关闭评论仅简述修改文档，未提供具体代码提交等强证据支撑。
  - 原文依据：
    - [关联PR #6618（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6618)    - [关联PR #6619（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6619)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `oscillated`：您好，已修改对应问题文档，本issue关闭。    - `oscillated`：closed from codehub    - `oscillated`：changed custom state from 进行中 to 已完成
- **[#3582](https://gitcode.com/cann/ops-nn/issues/3582) [Bug-Report|缺陷反馈]: 编译报错** — 38分
  - 痛点原因：仅提供排查建议和文档链接，无关联PR或commit等代码修复证据，未确认最终解决状态。
  - 原文依据：
    - `oscillated`：您好，请确认下是否是编译自定义算子包时--soc参数设置的不对，910C平台对应的--soc应为"ascend910_93"，截图里看到用的是"ascend910b"。    - `beckett_liu`：>您好，请确认下是否是编译自定义算子包时--soc参数设置的不对，910C平台对应的--soc应为"ascend910_93"，截图里看到用的是"ascend910b"。 [@oscillated](https://gitcode.com…    - `oscillated`：910b和910c的cann包有区别差异，可以尝试更换910c的CANN包后重新编译尝试。 ```shell source /path/to/cann/set_env.sh cd /path/to/ops-nn bash build.sh…    - `chenqi317`：请确认是按安装了 toolkit 包 参考https://gitcode.com/cann/ops-nn/blob/master/docs/zh/install/quick_install.md#%E6%96%B9%E5%BC%8F3%E…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `oscillated`：您好，当前issue问题周期已较长了，暂未收到您的回复，目前暂时关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3563](https://gitcode.com/cann/ops-nn/issues/3563) [Bug-Report|缺陷反馈]: 编译ops-nn8.5.0分支下experimental的intern_vl_add_rms_norm报错** — 38分
  - 痛点原因：用户自行清理编译环境解决问题，算子无缺陷，未关联修复PR或文档，缺乏实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，现有的ops-nn仓中，没有找到"intern_vl_add_rms_norm"这个算子，请问可以提供代码改动或相关编译报错的PR吗？    - `harrynospot`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/8bd1b3f8-ca70-4657-bda8-7091da05a883/image.png 'image.p…    - `oscillated`：请问确认是用的CANN 8.5.0版本的toolkit和ops包吗    - `harrynospot`：是的。我发现原因了，算子没有问题。是我之前编译另外一个算子没有成功，中间错误状态没有清除导致的。删除编译中间目录，重新编译没有问题。    - `harrynospot`：可以关闭此issue    - `oscillated`：好的，感谢您的反馈。
- **[#3638](https://gitcode.com/cann/ops-nn/issues/3638) 【文档质量】编译与运行样例.md 贴的运行结果数值,与它让读者用的那份 Addmm 示例实算结果对不上** — 46分
  - 痛点原因：缺乏关联 PR 与 release 引用，仅有人员分配记录，无明确修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3513](https://gitcode.com/cann/ops-nn/issues/3513) [Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）** — 46分
  - 痛点原因：关联PR仍为open未合并，且缺失文档链接与关闭评论，未提供最终解决的闭环证据。
  - 原文依据：
    - [关联PR #6429（open）](https://gitcode.com/cann/ops-nn/merge_requests/6429)    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt
- **[#3610](https://gitcode.com/cann/ops-nn/issues/3610) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 54分
  - 痛点原因：缺少关联PR与commit引用，仅通过对话解释及超时机制关闭，缺乏代码层面的实际解决证据。
  - 原文依据：
    - `oscillated`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `chenqi317`：最初版本 使用json配置。不方便开发者使用。 后在ops-nn 仓逐步整改为 {ops}/{ops_kernel}/CMakelist.txt 中。 编译框架识别到CMakelist.tx 存在会优先读取该配置，若没有配置才会读取jso…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `zjun0`：了解，感谢回复。 /close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
#### PP-02 Bot误关闭率近30%，有效Issue被错误关闭（G · Bot/Agent 治理）

- **[#3468](https://gitcode.com/cann/ops-nn/issues/3468) [Requirement|需求建议]: V版本算子缺少迁移与废弃指引** — 15分
  - 痛点原因：Bot未对需求建议打标分类，机械索要无关信息并自动关闭，中断了人工引导至sig例会的有效讨论。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：感谢您的反馈，当前对于算子已有基础的文档说明进行承载，对算子进行废弃处理通常会在sig例会进行评审，对于您的建议非常欢迎到sig例会进行讨论。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：您好，由于该 Issue 已有一段时间没有更新，我们先将其关闭。如果您后续有新的进展或诉求，欢迎随时重新开启此 Issue 或提交新的 Issue，我们会继续为您跟进。    - `east_yang`：add label wait-feedback    - `oscillated`：assigned to @east_yang
- **[#3629](https://gitcode.com/cann/ops-nn/issues/3629) 文档"查看源码"链接目录名拼写错误，导致链接失效（aclnnLogSoftmaxBackward / aclnnPreluBackward）** — 20分
  - 痛点原因：Bot仅机械打标且依赖PR合并被动关闭，全程无有效评论，缺乏主动治理与状态同步，治理流于形式。
  - 原文依据：
    - `tangweiwei2`：已收到，已经提交PR处理中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - [关联PR #6676（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6676)
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程零评论，未向用户提供任何有效互动与反馈，治理流于形式。
  - 原文依据：
    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)
- **[#3588](https://gitcode.com/cann/ops-nn/issues/3588) [Documentation|文档反馈]: MATMUL算子A3上支持fp32*bf16（Nz）以及fp32*fp32(nz)，但是aclnn接口aclnnM…** — 20分
  - 痛点原因：人工已明确要求关闭，但Bot未执行关闭动作且无任何评论互动，仅完成打标，治理失效。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `oscillated`：您好，已修改对应问题文档，本issue关闭。    - `pppipipipi`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `oscillated`：assigned to @chaotang233
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 20分
  - 痛点原因：Bot仅完成打标，未在关联PR合并后自动关闭issue或进行评论互动，治理动作不完整。
  - 原文依据：
    - `cann-robot`：add label resolved    - `qq_45721369`：closed from codehub    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭操作，全程无评论互动，缺乏有效沟通与治理引导。
  - 原文依据：
    - `yolic`：/close    - `yolic`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)
- **[#3563](https://gitcode.com/cann/ops-nn/issues/3563) [Bug-Report|缺陷反馈]: 编译ops-nn8.5.0分支下experimental的intern_vl_add_rms_norm报错** — 20分
  - 痛点原因：Bot仅完成打标，未参与评论互动，且在用户自行解决问题后未能自动关闭issue，缺乏有效治理动作。
  - 原文依据：
    - `oscillated`：您好，现有的ops-nn仓中，没有找到"intern_vl_add_rms_norm"这个算子，请问可以提供代码改动或相关编译报错的PR吗？    - `harrynospot`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/8bd1b3f8-ca70-4657-bda8-7091da05a883/image.png 'image.p…    - `oscillated`：请问确认是用的CANN 8.5.0版本的toolkit和ops包吗    - `harrynospot`：是的。我发现原因了，算子没有问题。是我之前编译另外一个算子没有成功，中间错误状态没有清除导致的。删除编译中间目录，重新编译没有问题。    - `harrynospot`：可以关闭此issue    - `oscillated`：好的，感谢您的反馈。
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，未留下任何有效评论与用户沟通，导致治理过程缺乏透明度。
  - 原文依据：
    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，未向用户解释操作原因，缺乏透明沟通导致治理无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，评论数为零，未向用户解释状态变更原因，缺乏有效互动。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)
- **[#3525](https://gitcode.com/cann/ops-nn/issues/3525) [Question|问题咨询]: 量化Matmul的MX量化模式为什么要求K一定要是偶数？** — 40分
  - 痛点原因：Bot未执行打标与关闭操作，且未提供自动化解答，完全依赖人工回复，治理动作缺失。
  - 原文依据：
    - `tangweiwei2`：这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。    - `Kiana1216`：>这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。 [@tangweiwei2](https://gitcode.com/tangweiwei2) 老师后半句真没听懂，能稍微详细介绍一下吗…    - `tangweiwei2`：根因在于： L0_mx中需要满足分型为最低维度是K方向上的2，在transA=True场景下没有指令将K=2单独拆出来， 因此前置量化算子输出就要满足Scale_K0=2，放置在最低维 数据流： X2Scale：GM->L1->L0_MX…    - `tangweiwei2`：核心是硬件上要求L0_MX的最低位K=2，因此在外部直接做好拆解，否则内部没有相关指令可以完成这个操作。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `tangweiwei2`：add label wait-feedback
#### PP-03 分流标签缺失与路由低效（I1 · 分配与首次响应）

- **[#3640](https://gitcode.com/cann/ops-nn/issues/3640) 【文档质量】torch_extension_develop_guide.md 把依赖清单标成 bash 代码块、且没有 pip install,照抄装不上依赖** — 0分
  - 痛点原因：2.3小时内的回复仅为互相@和任务指派，未提供针对文档依赖问题的任何实质性解答或处理方案。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：[@yolic](https://gitcode.com/yolic)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3639](https://gitcode.com/cann/ops-nn/issues/3639) 【文档质量】量化介绍.md 以 1bit 举例 MX 量化,但本仓 MX 接口文档只体现 FLOAT4/FLOAT8,易让人误以为支持 1bit** — 0分
  - 痛点原因：仅有模板化回复和指派操作，未对文档问题提供任何实质性解答或处理方案。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3638](https://gitcode.com/cann/ops-nn/issues/3638) 【文档质量】编译与运行样例.md 贴的运行结果数值,与它让读者用的那份 Addmm 示例实算结果对不上** — 0分
  - 痛点原因：仅给出模板化确认与人员指派流转，始终未对文档数值问题提供任何实质性解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3636](https://gitcode.com/cann/ops-nn/issues/3636) 【文档质量】QUICKSTART.md 同篇前后不一致:第一章用 ${soc_version} 占位,第二章重编译却写死 ascend910b** — 0分
  - 痛点原因：首次响应仅为打招呼和互相指派，始终未对文档不一致问题提供任何实质性解答或处理。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3635](https://gitcode.com/cann/ops-nn/issues/3635) 【文档质量】QUICKSTART.md「改 Add 为 Mul」示例片段用的签名/变量是旧版,与当前 add_example.h 不一致** — 0分
  - 痛点原因：仅停留在问题接收与指派流转，始终无人针对文档不一致问题提供实质性解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3634](https://gitcode.com/cann/ops-nn/issues/3634) 【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致** — 0分
  - 痛点原因：仅有客套回复与内部指派流转，始终未针对文档路径问题提供任何实质性技术解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3633](https://gitcode.com/cann/ops-nn/issues/3633) 【文档质量】aicore_develop_guide.md 让参考 add_example/add_example_data 目录,该目录不存在** — 0分
  - 痛点原因：仅有模板化回复与互相指派，始终未提供任何实质性解答或处理。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 0分
  - 痛点原因：仅机器人打标签并自动关联PR关闭，全程无人工对算子缺陷进行实质分析或回复。
  - 原文依据：
    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 0分
  - 痛点原因：首次响应耗时19小时且仅由机器人加标签，随后直接被关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `qq_45721369`：closed from codehub    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 0分
  - 痛点原因：维护者仅打标签并直接关闭issue，未提供任何实质性解答。
  - 原文依据：
    - `yolic`：/close    - `yolic`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 0分
  - 痛点原因：全程仅机器人加标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人在关联PR合并后自动关闭，未提供任何实质性解答。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并关闭，缺乏人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)
- **[#3514](https://gitcode.com/cann/ops-nn/issues/3514) [Requirement|需求建议]: 【社区任务】InplaceSigmoid算子开发交付（任务编号 05-19）** — 0分
  - 痛点原因：首次响应耗时超326小时且仅有流程性分配，无实质技术回应，严重超时。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6438（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6438)
- **[#3513](https://gitcode.com/cann/ops-nn/issues/3513) [Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）** — 0分
  - 痛点原因：响应耗时328小时且仅停留在分配与安排审核，全程无任何实质技术反馈。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6429（open）](https://gitcode.com/cann/ops-nn/merge_requests/6429)
- **[#3480](https://gitcode.com/cann/ops-nn/issues/3480) [Requirement|需求建议]: AscendAntiQuantV2算子AscendC实现** — 0分
  - 痛点原因：响应耗时近48小时，且仅指派人员并安排代码审核，缺乏针对需求的具体技术评估与实质解答。
  - 原文依据：
    - `fullt`：我们会安排进行代码审核    - `oscillated`：assigned to @fullt    - [关联PR #6332（open）](https://gitcode.com/cann/ops-nn/merge_requests/6332)
- **[#3609](https://gitcode.com/cann/ops-nn/issues/3609) [Requirement|需求建议]: aclnnfallback开源** — 20分
  - 痛点原因：虽快速确认收到问题，但给出实质性解答与规划耗时近400小时，严重滞后导致得分低。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@tianqiguang](https://gitcode.com/tianqiguang) 正在跟踪处理。    - `yangyang016`：感谢您的反馈，我们将在Q3支持该公共能力，并陆续开源各个算子对应的fallback能力    - `liubo75`：add label requirement    - `chenqi317`：assigned to @songkai111    - `chenqi317`：assigned to @yangyang016    - [关联PR #6161（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6161)
- **[#3468](https://gitcode.com/cann/ops-nn/issues/3468) [Requirement|需求建议]: V版本算子缺少迁移与废弃指引** — 40分
  - 痛点原因：首次响应虽快，但实质回应耗时超200小时，用户等待过久才获有效解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：感谢您的反馈，当前对于算子已有基础的文档说明进行承载，对算子进行废弃处理通常会在sig例会进行评审，对于您的建议非常欢迎到sig例会进行讨论。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：您好，由于该 Issue 已有一段时间没有更新，我们先将其关闭。如果您后续有新的进展或诉求，欢迎随时重新开启此 Issue 或提交新的 Issue，我们会继续为您跟进。    - `east_yang`：add label wait-feedback    - `oscillated`：assigned to @east_yang
#### PP-04 需求类Issue长期无跟进（I2 · 讨论与解决）

- **[#3609](https://gitcode.com/cann/ops-nn/issues/3609) [Requirement|需求建议]: aclnnfallback开源** — 0分
  - 痛点原因：仅关联已合并PR，但缺乏commit、文档链接、release引用及关闭评论等直接解决证据。
  - 原文依据：
    - [关联PR #6161（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6161)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@tianqiguang](https://gitcode.com/tianqiguang) 正在跟踪处理。    - `yangyang016`：感谢您的反馈，我们将在Q3支持该公共能力，并陆续开源各个算子对应的fallback能力    - `liubo75`：add label requirement    - `chenqi317`：assigned to @songkai111    - `chenqi317`：assigned to @yangyang016
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 0分
  - 痛点原因：虽有关联PR被合并，但无commit引用、文档链接、release引用及人工关闭评论，解决证据薄弱。
  - 原文依据：
    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)    - `qq_45721369`：closed from codehub    - `cann-robot`：add label resolved
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 0分
  - 痛点原因：仅有关联PR和机器人自动关闭，缺乏commit引用、release说明、文档链接及人工关闭评论，证据链不完整导致零分。
  - 原文依据：
    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，缺乏commit、文档或release等直接可追溯的解决证据。
  - 原文依据：
    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - `cann-robot`：add label resolved
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 0分
  - 痛点原因：仅由机器人自动关闭，缺乏人工关闭评论、commit引用及release链接等实质性解决证据。
  - 原文依据：
    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - `cann-robot`：add label resolved
- **[#3525](https://gitcode.com/cann/ops-nn/issues/3525) [Question|问题咨询]: 量化Matmul的MX量化模式为什么要求K一定要是偶数？** — 0分
  - 痛点原因：仅有文字讨论解释原因，缺乏关联PR、代码提交或官方文档等实质性证据支撑解决结论。
  - 原文依据：
    - `tangweiwei2`：这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。    - `Kiana1216`：>这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。 [@tangweiwei2](https://gitcode.com/tangweiwei2) 老师后半句真没听懂，能稍微详细介绍一下吗…    - `tangweiwei2`：根因在于： L0_mx中需要满足分型为最低维度是K方向上的2，在transA=True场景下没有指令将K=2单独拆出来， 因此前置量化算子输出就要满足Scale_K0=2，放置在最低维 数据流： X2Scale：GM->L1->L0_MX…    - `tangweiwei2`：核心是硬件上要求L0_MX的最低位K=2，因此在外部直接做好拆解，否则内部没有相关指令可以完成这个操作。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `tangweiwei2`：add label wait-feedback
- **[#3640](https://gitcode.com/cann/ops-nn/issues/3640) 【文档质量】torch_extension_develop_guide.md 把依赖清单标成 bash 代码块、且没有 pip install,照抄装不上依赖** — 15分
  - 痛点原因：无关联PR与commit引用，评论仅互相转派，未提供实质性修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：[@yolic](https://gitcode.com/yolic)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3639](https://gitcode.com/cann/ops-nn/issues/3639) 【文档质量】量化介绍.md 以 1bit 举例 MX 量化,但本仓 MX 接口文档只体现 FLOAT4/FLOAT8,易让人误以为支持 1bit** — 15分
  - 痛点原因：仅有接收反馈与指派记录，无关联PR、commit或release等实质性解决证据，且无最终解决说明。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3637](https://gitcode.com/cann/ops-nn/issues/3637) 【文档质量】op_api_list.md 索引表给部分接口的 A2/A3 列填「默认确定性实现」,但这些算子自己的支持表写的是不支持** — 15分
  - 痛点原因：仅有人工指派和口头回复，缺乏关联PR、代码提交及版本发布等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：已经安排人员正在修改    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3636](https://gitcode.com/cann/ops-nn/issues/3636) 【文档质量】QUICKSTART.md 同篇前后不一致:第一章用 ${soc_version} 占位,第二章重编译却写死 ascend910b** — 15分
  - 痛点原因：未关联 PR、commit 或 release 等实质性解决证据，仅有人工指派和跟进回复。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3635](https://gitcode.com/cann/ops-nn/issues/3635) 【文档质量】QUICKSTART.md「改 Add 为 Mul」示例片段用的签名/变量是旧版,与当前 add_example.h 不一致** — 15分
  - 痛点原因：仅有人工分配和跟踪回复，无关联PR、commit引用或修复确认等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3634](https://gitcode.com/cann/ops-nn/issues/3634) 【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致** — 15分
  - 痛点原因：仅指派人员并回复收到反馈，无关联PR、commit引用及关闭评论等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3633](https://gitcode.com/cann/ops-nn/issues/3633) 【文档质量】aicore_develop_guide.md 让参考 add_example/add_example_data 目录,该目录不存在** — 15分
  - 痛点原因：仅有人员分配和跟踪处理的回复，无关联PR、commit引用及release更新等实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 23分
  - 痛点原因：关联的两个PR均被关闭且无commit引用，仅靠机器人命令关闭，缺乏实际修复的代码证据。
  - 原文依据：
    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)    - [关联PR #6546（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6546)    - `yolic`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `yolic`：add label bug-report
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 31分
  - 痛点原因：虽有合并的PR和commit引用，但缺乏文档链接、release引用及人工关闭评论，仅靠机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3514](https://gitcode.com/cann/ops-nn/issues/3514) [Requirement|需求建议]: 【社区任务】InplaceSigmoid算子开发交付（任务编号 05-19）** — 31分
  - 痛点原因：PR虽已合并，但缺少文档链接、release引用及关闭评论，导致最终解决证据不足。
  - 原文依据：
    - [关联PR #6438（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6438)    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt
- **[#3480](https://gitcode.com/cann/ops-nn/issues/3480) [Requirement|需求建议]: AscendAntiQuantV2算子AscendC实现** — 31分
  - 痛点原因：关联PR仍处于open状态未合并，无文档与release引用，仅停留在安排代码审核阶段，未形成闭环。
  - 原文依据：
    - [关联PR #6332（open）](https://gitcode.com/cann/ops-nn/merge_requests/6332)    - `fullt`：我们会安排进行代码审核    - `oscillated`：assigned to @fullt
- **[#3588](https://gitcode.com/cann/ops-nn/issues/3588) [Documentation|文档反馈]: MATMUL算子A3上支持fp32*bf16（Nz）以及fp32*fp32(nz)，但是aclnn接口aclnnM…** — 38分
  - 痛点原因：虽关联已合并PR，但缺乏commit与release引用，关闭评论仅简述修改文档，未提供具体代码提交等强证据支撑。
  - 原文依据：
    - [关联PR #6618（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6618)    - [关联PR #6619（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6619)    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。    - `oscillated`：您好，已修改对应问题文档，本issue关闭。    - `oscillated`：closed from codehub    - `oscillated`：changed custom state from 进行中 to 已完成
- **[#3582](https://gitcode.com/cann/ops-nn/issues/3582) [Bug-Report|缺陷反馈]: 编译报错** — 38分
  - 痛点原因：仅提供排查建议和文档链接，无关联PR或commit等代码修复证据，未确认最终解决状态。
  - 原文依据：
    - `oscillated`：您好，请确认下是否是编译自定义算子包时--soc参数设置的不对，910C平台对应的--soc应为"ascend910_93"，截图里看到用的是"ascend910b"。    - `beckett_liu`：>您好，请确认下是否是编译自定义算子包时--soc参数设置的不对，910C平台对应的--soc应为"ascend910_93"，截图里看到用的是"ascend910b"。 [@oscillated](https://gitcode.com…    - `oscillated`：910b和910c的cann包有区别差异，可以尝试更换910c的CANN包后重新编译尝试。 ```shell source /path/to/cann/set_env.sh cd /path/to/ops-nn bash build.sh…    - `chenqi317`：请确认是按安装了 toolkit 包 参考https://gitcode.com/cann/ops-nn/blob/master/docs/zh/install/quick_install.md#%E6%96%B9%E5%BC%8F3%E…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `oscillated`：您好，当前issue问题周期已较长了，暂未收到您的回复，目前暂时关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
- **[#3563](https://gitcode.com/cann/ops-nn/issues/3563) [Bug-Report|缺陷反馈]: 编译ops-nn8.5.0分支下experimental的intern_vl_add_rms_norm报错** — 38分
  - 痛点原因：用户自行清理编译环境解决问题，算子无缺陷，未关联修复PR或文档，缺乏实质性解决证据。
  - 原文依据：
    - `oscillated`：您好，现有的ops-nn仓中，没有找到"intern_vl_add_rms_norm"这个算子，请问可以提供代码改动或相关编译报错的PR吗？    - `harrynospot`：![image.png](https://raw.gitcode.com/user-images/assets/7665709/8bd1b3f8-ca70-4657-bda8-7091da05a883/image.png 'image.p…    - `oscillated`：请问确认是用的CANN 8.5.0版本的toolkit和ops包吗    - `harrynospot`：是的。我发现原因了，算子没有问题。是我之前编译另外一个算子没有成功，中间错误状态没有清除导致的。删除编译中间目录，重新编译没有问题。    - `harrynospot`：可以关闭此issue    - `oscillated`：好的，感谢您的反馈。
- **[#3638](https://gitcode.com/cann/ops-nn/issues/3638) 【文档质量】编译与运行样例.md 贴的运行结果数值,与它让读者用的那份 Addmm 示例实算结果对不上** — 46分
  - 痛点原因：缺乏关联 PR 与 release 引用，仅有人员分配记录，无明确修复证据。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3513](https://gitcode.com/cann/ops-nn/issues/3513) [Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）** — 46分
  - 痛点原因：关联PR仍为open未合并，且缺失文档链接与关闭评论，未提供最终解决的闭环证据。
  - 原文依据：
    - [关联PR #6429（open）](https://gitcode.com/cann/ops-nn/merge_requests/6429)    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt
- **[#3610](https://gitcode.com/cann/ops-nn/issues/3610) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 54分
  - 痛点原因：缺少关联PR与commit引用，仅通过对话解释及超时机制关闭，缺乏代码层面的实际解决证据。
  - 原文依据：
    - `oscillated`：收到需求建议，欢迎您参加 ops-nn sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-nn    - `chenqi317`：最初版本 使用json配置。不方便开发者使用。 后在ops-nn 仓逐步整改为 {ops}/{ops_kernel}/CMakelist.txt 中。 编译框架识别到CMakelist.tx 存在会优先读取该配置，若没有配置才会读取jso…    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `zjun0`：了解，感谢回复。 /close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
#### PP-05 关闭沉淀质量差，解决证据不足（I3 · 总结与关闭）

- **[#3640](https://gitcode.com/cann/ops-nn/issues/3640) 【文档质量】torch_extension_develop_guide.md 把依赖清单标成 bash 代码块、且没有 pip install,照抄装不上依赖** — 0分
  - 痛点原因：关闭时无任何解决方案或总结说明，全程仅互相转派，无法为后续用户提供参考。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：[@yolic](https://gitcode.com/yolic)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3639](https://gitcode.com/cann/ops-nn/issues/3639) 【文档质量】量化介绍.md 以 1bit 举例 MX 量化,但本仓 MX 接口文档只体现 FLOAT4/FLOAT8,易让人误以为支持 1bit** — 0分
  - 痛点原因：关闭时未留下任何说明文字，仅停留在接收和指派阶段，未在 issue 内沉淀解决过程与方案总结，无法供后续参考。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3638](https://gitcode.com/cann/ops-nn/issues/3638) 【文档质量】编译与运行样例.md 贴的运行结果数值,与它让读者用的那份 Addmm 示例实算结果对不上** — 0分
  - 痛点原因：关闭时未留下任何文字说明或解决结论，导致其他用户无法复用该问题的解决经验。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3637](https://gitcode.com/cann/ops-nn/issues/3637) 【文档质量】op_api_list.md 索引表给部分接口的 A2/A3 列填「默认确定性实现」,但这些算子自己的支持表写的是不支持** — 0分
  - 痛点原因：关闭说明为0字，仅记录了人员指派与进度流转，未留下任何可复用的解决方案或结论。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：已经安排人员正在修改    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3636](https://gitcode.com/cann/ops-nn/issues/3636) 【文档质量】QUICKSTART.md 同篇前后不一致:第一章用 ${soc_version} 占位,第二章重编译却写死 ascend910b** — 0分
  - 痛点原因：关闭时未留下任何说明文字或最终解决结论，导致其他用户无法获取并复用解决方案。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3635](https://gitcode.com/cann/ops-nn/issues/3635) 【文档质量】QUICKSTART.md「改 Add 为 Mul」示例片段用的签名/变量是旧版,与当前 add_example.h 不一致** — 0分
  - 痛点原因：关闭时无任何文字说明，未提供解决方案或重复链接等复用信息。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3634](https://gitcode.com/cann/ops-nn/issues/3634) 【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致** — 0分
  - 痛点原因：关闭时未留下任何说明文字，仅有人员分配与流转记录，缺乏问题解决结论或修复方案，导致无复用参考价值。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3633](https://gitcode.com/cann/ops-nn/issues/3633) 【文档质量】aicore_develop_guide.md 让参考 add_example/add_example_data 目录,该目录不存在** — 0分
  - 痛点原因：关闭时无任何说明文字与重复主链接，仅指派人员跟踪，未留下可复用的解决信息。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3609](https://gitcode.com/cann/ops-nn/issues/3609) [Requirement|需求建议]: aclnnfallback开源** — 0分
  - 痛点原因：关闭说明为空，无方案文档与代码链接，仅口头承诺排期，未沉淀任何可复用信息。
  - 原文依据：
    - `liubo75`：add label requirement    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@tianqiguang](https://gitcode.com/tianqiguang) 正在跟踪处理。    - `yangyang016`：感谢您的反馈，我们将在Q3支持该公共能力，并陆续开源各个算子对应的fallback能力    - `chenqi317`：assigned to @songkai111    - `chenqi317`：assigned to @yangyang016    - [关联PR #6161（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6161)
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 0分
  - 痛点原因：仅由机器人自动关联PR关闭，无人工关闭说明且未做方案文档化，导致解决经验无法被复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 0分
  - 痛点原因：关闭时无任何文字说明与方案总结，仅由机器人自动关闭并关联PR，未留下供他人复用的参考信息。
  - 原文依据：
    - `qq_45721369`：closed from codehub    - `cann-robot`：add label resolved    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 0分
  - 痛点原因：关闭说明仅6字且无方案文档化沉淀，仅由机器人自动关闭，毫无后续复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `yolic`：add label bug-report    - `cann-robot`：add label Accepted    - `yolic`：/close    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 0分
  - 痛点原因：仅靠机器人关联PR自动关闭，关闭说明0字且无方案文档，缺乏人工总结导致无法供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人随PR合并自动关闭，未沉淀任何可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - `cann-robot`：add label resolved    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅由机器人自动关闭关联PR，未沉淀任何复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - `cann-robot`：add label resolved    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)
- **[#3525](https://gitcode.com/cann/ops-nn/issues/3525) [Question|问题咨询]: 量化Matmul的MX量化模式为什么要求K一定要是偶数？** — 0分
  - 痛点原因：讨论虽有技术细节，但关闭时无总结说明且未文档化，导致后续无法直接复用。
  - 原文依据：
    - `tangweiwei2`：add label wait-feedback    - `tangweiwei2`：这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。    - `Kiana1216`：>这个是因为MMAD指令要求K方向是64对齐，而且L0_mx中需要满足分型为最低维度是K方向上的2。 [@tangweiwei2](https://gitcode.com/tangweiwei2) 老师后半句真没听懂，能稍微详细介绍一下吗…    - `tangweiwei2`：根因在于： L0_mx中需要满足分型为最低维度是K方向上的2，在transA=True场景下没有指令将K=2单独拆出来， 因此前置量化算子输出就要满足Scale_K0=2，放置在最低维 数据流： X2Scale：GM->L1->L0_MX…    - `tangweiwei2`：核心是硬件上要求L0_MX的最低位K=2，因此在外部直接做好拆解，否则内部没有相关指令可以完成这个操作。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。
- **[#3514](https://gitcode.com/cann/ops-nn/issues/3514) [Requirement|需求建议]: 【社区任务】InplaceSigmoid算子开发交付（任务编号 05-19）** — 0分
  - 痛点原因：关闭时无任何文字说明且未沉淀方案文档，仅留指派与提示看PR意见，无复用价值。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6438（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6438)
- **[#3513](https://gitcode.com/cann/ops-nn/issues/3513) [Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）** — 0分
  - 痛点原因：关闭时无任何文字说明，未沉淀方案文档与相关链接，且关联PR仍处于open状态，无法提供复用参考。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6429（open）](https://gitcode.com/cann/ops-nn/merge_requests/6429)
- **[#3480](https://gitcode.com/cann/ops-nn/issues/3480) [Requirement|需求建议]: AscendAntiQuantV2算子AscendC实现** — 0分
  - 痛点原因：关闭说明为空，无方案文档与复用链接，仅分配负责人且关联PR仍处于open状态，无有效沉淀。
  - 原文依据：
    - `fullt`：我们会安排进行代码审核    - `oscillated`：assigned to @fullt    - [关联PR #6332（open）](https://gitcode.com/cann/ops-nn/merge_requests/6332)
- **[#3563](https://gitcode.com/cann/ops-nn/issues/3563) [Bug-Report|缺陷反馈]: 编译ops-nn8.5.0分支下experimental的intern_vl_add_rms_norm报错** — 25分
  - 痛点原因：无方案文档和重复链接，关闭说明仅70字，且由系统自动关闭，未沉淀有效复用信息。
  - 原文依据：
    - `oscillated`：closed from codehub    - `oscillated`：changed custom state from 进行中 to 已完成    - `oscillated`：add label wait-feedback    - `cann-robot`：delete label wait-feedback    - `cann-robot`：add label Accepted    - `oscillated`：您好，现有的ops-nn仓中，没有找到"intern_vl_add_rms_norm"这个算子，请问可以提供代码改动或相关编译报错的PR吗？
- **[#3629](https://gitcode.com/cann/ops-nn/issues/3629) 文档"查看源码"链接目录名拼写错误，导致链接失效（aclnnLogSoftmaxBackward / aclnnPreluBackward）** — 30分
  - 痛点原因：关闭说明仅14字且为机器人话术，缺乏问题原因与解决方案的详细记录，未提供主链接，难以供他人复用。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3629    - `cann-robot`：add label resolved    - `tangweiwei2`：已收到，已经提交PR处理中。    - [关联PR #6676（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6676)
- **[#3588](https://gitcode.com/cann/ops-nn/issues/3588) [Documentation|文档反馈]: MATMUL算子A3上支持fp32*bf16（Nz）以及fp32*fp32(nz)，但是aclnn接口aclnnM…** — 55分
  - 痛点原因：关闭说明仅73字且无重复链接，由系统自动关闭，缺乏对已有方案文档的明确指引与总结，复用性不足。
  - 原文依据：
    - `oscillated`：closed from codehub    - `oscillated`：changed custom state from 进行中 to 已完成    - `pppipipipi`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@chaotang233](https://gitcode.com/chaotang233) 正在跟踪处理。
- **[#3582](https://gitcode.com/cann/ops-nn/issues/3582) [Bug-Report|缺陷反馈]: 编译报错** — 55分
  - 痛点原因：状态与标签多次反复变动导致关闭过程混乱，且关闭说明仅84字较简略，沉淀的复用信息不足。
  - 原文依据：
    - `oscillated`：closed from codehub    - `oscillated`：changed custom state from 进行中 to 已完成    - `oscillated`：add label wait-feedback    - `cann-robot`：delete label wait-feedback    - `oscillated`：add label wait-feedback    - `cann-robot`：add label Accepted
- **[#3468](https://gitcode.com/cann/ops-nn/issues/3468) [Requirement|需求建议]: V版本算子缺少迁移与废弃指引** — 55分
  - 痛点原因：关闭说明仅引导至例会讨论，未沉淀具体的算子迁移废弃方案或文档链接，导致后续复用价值不足。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `east_yang`：add label wait-feedback    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：感谢您的反馈，当前对于算子已有基础的文档说明进行承载，对算子进行废弃处理通常会在sig例会进行评审，对于您的建议非常欢迎到sig例会进行讨论。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：您好，由于该 Issue 已有一段时间没有更新，我们先将其关闭。如果您后续有新的进展或诉求，欢迎随时重新开启此 Issue 或提交新的 Issue，我们会继续为您跟进。
#### PP-06 首次响应时间两极分化严重（I1 · 分配与首次响应）

- **[#3640](https://gitcode.com/cann/ops-nn/issues/3640) 【文档质量】torch_extension_develop_guide.md 把依赖清单标成 bash 代码块、且没有 pip install,照抄装不上依赖** — 0分
  - 痛点原因：2.3小时内的回复仅为互相@和任务指派，未提供针对文档依赖问题的任何实质性解答或处理方案。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `caiwenwen`：[@yolic](https://gitcode.com/yolic)    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3639](https://gitcode.com/cann/ops-nn/issues/3639) 【文档质量】量化介绍.md 以 1bit 举例 MX 量化,但本仓 MX 接口文档只体现 FLOAT4/FLOAT8,易让人误以为支持 1bit** — 0分
  - 痛点原因：仅有模板化回复和指派操作，未对文档问题提供任何实质性解答或处理方案。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3638](https://gitcode.com/cann/ops-nn/issues/3638) 【文档质量】编译与运行样例.md 贴的运行结果数值,与它让读者用的那份 Addmm 示例实算结果对不上** — 0分
  - 痛点原因：仅给出模板化确认与人员指派流转，始终未对文档数值问题提供任何实质性解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3636](https://gitcode.com/cann/ops-nn/issues/3636) 【文档质量】QUICKSTART.md 同篇前后不一致:第一章用 ${soc_version} 占位,第二章重编译却写死 ascend910b** — 0分
  - 痛点原因：首次响应仅为打招呼和互相指派，始终未对文档不一致问题提供任何实质性解答或处理。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen
- **[#3635](https://gitcode.com/cann/ops-nn/issues/3635) 【文档质量】QUICKSTART.md「改 Add 为 Mul」示例片段用的签名/变量是旧版,与当前 add_example.h 不一致** — 0分
  - 痛点原因：仅停留在问题接收与指派流转，始终无人针对文档不一致问题提供实质性解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3634](https://gitcode.com/cann/ops-nn/issues/3634) 【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致** — 0分
  - 痛点原因：仅有客套回复与内部指派流转，始终未针对文档路径问题提供任何实质性技术解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3633](https://gitcode.com/cann/ops-nn/issues/3633) 【文档质量】aicore_develop_guide.md 让参考 add_example/add_example_data 目录,该目录不存在** — 0分
  - 痛点原因：仅有模板化回复与互相指派，始终未提供任何实质性解答或处理。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@caiwenwen](https://gitcode.com/caiwenwen) 正在跟踪处理。    - `yolic`：您好，感谢反馈，问题已收到，当前 [@yang-di52](https://gitcode.com/yang-di52) 正在跟踪处理。    - `oscillated`：assigned to @caiwenwen    - `caiwenwen`：assigned to @yolic    - `caiwenwen`：unassigned @caiwenwen    - `yolic`：assigned to @yang-di52
- **[#3589](https://gitcode.com/cann/ops-nn/issues/3589) [Bug-Report|缺陷反馈]: SoftplusV2算子精度问题** — 0分
  - 痛点原因：仅机器人打标签并自动关联PR关闭，全程无人工对算子缺陷进行实质分析或回复。
  - 原文依据：
    - `andong_hw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3589    - [关联PR #6575（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6575)
- **[#3573](https://gitcode.com/cann/ops-nn/issues/3573) [Bug-Report|缺陷反馈]: fast_kernel_launch出现nlohmann_json找不到的错误** — 0分
  - 痛点原因：首次响应耗时19小时且仅由机器人加标签，随后直接被关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `qq_45721369`：closed from codehub    - [关联PR #6573（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6573)
- **[#3569](https://gitcode.com/cann/ops-nn/issues/3569) [Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径** — 0分
  - 痛点原因：维护者仅打标签并直接关闭issue，未提供任何实质性解答。
  - 原文依据：
    - `yolic`：/close    - `yolic`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - [关联PR #6539（closed）](https://gitcode.com/cann/ops-nn/merge_requests/6539)
- **[#3537](https://gitcode.com/cann/ops-nn/issues/3537) [Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug** — 0分
  - 痛点原因：全程仅机器人加标签并随关联PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `HuangKun8682`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3537    - [关联PR #6340（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6340)    - [关联PR #6349（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6349)
- **[#3531](https://gitcode.com/cann/ops-nn/issues/3531) [Bug-Report|缺陷反馈]: threshold_grad_v2_d修改ut** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人在关联PR合并后自动关闭，未提供任何实质性解答。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3531    - [关联PR #6469（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6469)
- **[#3529](https://gitcode.com/cann/ops-nn/issues/3529) [Bug-Report|缺陷反馈]: 【convtranspose】cleancode，初始化指针修改** — 0分
  - 痛点原因：全程仅机器人自动打标签并随关联PR合并关闭，缺乏人工实质性技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3529    - [关联PR #6470（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6470)
- **[#3514](https://gitcode.com/cann/ops-nn/issues/3514) [Requirement|需求建议]: 【社区任务】InplaceSigmoid算子开发交付（任务编号 05-19）** — 0分
  - 痛点原因：首次响应耗时超326小时且仅有流程性分配，无实质技术回应，严重超时。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6438（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6438)
- **[#3513](https://gitcode.com/cann/ops-nn/issues/3513) [Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）** — 0分
  - 痛点原因：响应耗时328小时且仅停留在分配与安排审核，全程无任何实质技术反馈。
  - 原文依据：
    - `fullt`：已安排审核，请关注PR检视意见    - `oscillated`：assigned to @fullt    - [关联PR #6429（open）](https://gitcode.com/cann/ops-nn/merge_requests/6429)
- **[#3480](https://gitcode.com/cann/ops-nn/issues/3480) [Requirement|需求建议]: AscendAntiQuantV2算子AscendC实现** — 0分
  - 痛点原因：响应耗时近48小时，且仅指派人员并安排代码审核，缺乏针对需求的具体技术评估与实质解答。
  - 原文依据：
    - `fullt`：我们会安排进行代码审核    - `oscillated`：assigned to @fullt    - [关联PR #6332（open）](https://gitcode.com/cann/ops-nn/merge_requests/6332)
- **[#3609](https://gitcode.com/cann/ops-nn/issues/3609) [Requirement|需求建议]: aclnnfallback开源** — 20分
  - 痛点原因：虽快速确认收到问题，但给出实质性解答与规划耗时近400小时，严重滞后导致得分低。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@tianqiguang](https://gitcode.com/tianqiguang) 正在跟踪处理。    - `yangyang016`：感谢您的反馈，我们将在Q3支持该公共能力，并陆续开源各个算子对应的fallback能力    - `liubo75`：add label requirement    - `chenqi317`：assigned to @songkai111    - `chenqi317`：assigned to @yangyang016    - [关联PR #6161（merged）](https://gitcode.com/cann/ops-nn/merge_requests/6161)
- **[#3468](https://gitcode.com/cann/ops-nn/issues/3468) [Requirement|需求建议]: V版本算子缺少迁移与废弃指引** — 40分
  - 痛点原因：首次响应虽快，但实质回应耗时超200小时，用户等待过久才获有效解答。
  - 原文依据：
    - `oscillated`：您好，感谢反馈，问题已收到，当前 [@east_yang](https://gitcode.com/east_yang) 正在跟踪处理。    - `east_yang`：感谢您的反馈，当前对于算子已有基础的文档说明进行承载，对算子进行废弃处理通常会在sig例会进行评审，对于您的建议非常欢迎到sig例会进行讨论。    - `cann-robot`：您好，为了更准确地定位和解决问题，我们需要您提供上述提到的相关信息。如果 14 天内没有进一步更新，我们将暂时关闭此 Issue。感谢您的理解与配合。    - `cann-robot`：您好，由于该 Issue 已有一段时间没有更新，我们先将其关闭。如果您后续有新的进展或诉求，欢迎随时重新开启此 Issue 或提交新的 Issue，我们会继续为您跟进。    - `east_yang`：add label wait-feedback    - `oscillated`：assigned to @east_yang

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `oscillated` |
| 触发条件 | Issue分配后7天内无实质讨论 |
| 具体动作 | 主动发起技术讨论或方案评审，明确下一步行动 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 60 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 25.5，低分 23/25；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.2，低分 13/25 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 47.2，低分 13/25 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 25.5，低分 23/25 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 评论仅为确认收到和转交，无技术讨论或下一步行动方案。 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 提升 Bot 治理覆盖

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | Bot/Agent 治理 |
| 承接方 | Bot维护者；候选负责人 `oscillated` |
| 触发条件 | bot执行stale关闭前 |
| 具体动作 | 检查Issue类型标签，需求/讨论类Issue需人工确认后方可关闭 |
| 目标 | `OBJ_BOT_GOVERNANCE` 和 `OBJ_BOT_MISCLOSE_REVERSE` 提升至 5 以上 |
| 相关证据 | OBJ_BOT_GOVERNANCE：均值 43.0，低分 11/25；OBJ_BOT_MISCLOSE_REVERSE：均值 96.8，低分 0/25 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 均值 43.0，低分 11/25 | 提升自动标签、分流、提醒和关闭校验覆盖 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 均值 96.8，低分 0/25 | 减少 Bot 误关、错关和状态矛盾 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 无bot参与，人工转交链存在但与bot无关，给中性分。 | 改善 Bot 到人工处理的交接质量 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot维护者；候选负责人 `oscillated` |
| 触发条件 | Issue创建时 |
| 具体动作 | 根据标题前缀和正文内容自动添加类型标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 95 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.0，低分 18/25；OBJ_RESPONSE_SPEED：均值 84.0，低分 2/25 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 28.0，低分 18/25 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 84.0，低分 2/25 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 最终有明确assignee@yang-di52，但经历三次转交，过程不够清晰。 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.1/100**，整体相对可控，但仍需关注：输入质量整体尚可，但10.2%的Issue存在模板填写不完整、客观…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.3 | 内部贡献者提交，内容真实明确，无AI幻觉或噪音迹象 |
| `SUB_INPUT_QUALITY` 输入质量 | 65.9 | LLM评分失败或缺失 |

代表低分 Issue：[#3533](https://gitcode.com/cann/ops-nn/issues/3533)
问题：[Bug-Report|缺陷反馈]: FlatQuant存在clean code检测问题。

### I1 · 分配与首次响应
本阶段分数为 **61.5/100**，整体相对可控，但仍需关注：分流标签缺失与路由低效。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 28.0 | 均值 28.0，低分 18/25 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 84.0 | 均值 84.0，低分 2/25 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 70.8 | 最终有明确assignee@yang-di52，但经历三次转交，过程不够清晰。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 68.9 | 无标签分类，经多次转交才到达处理人，路由效率偏低但最终有归属。 |

代表低分 Issue：[#3513](https://gitcode.com/cann/ops-nn/issues/3513)
问题：[Requirement|需求建议]: 【社区任务】Median算子开发交付（任务编号 04-9）。

### I2 · 讨论与解决
本阶段分数为 **41.1/100**，本阶段需要改进，主要问题是：讨论推进严重不足，Issue长期停滞。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 47.2 | 均值 47.2，低分 13/25 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 25.5 | 均值 25.5，低分 23/25 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 46.0 | 评论仅为确认收到和转交，无技术讨论或下一步行动方案。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 50.4 | 文档修复目标未实现，issue仍open，无PR链接或修复证据。 |

代表低分 Issue：[#3634](https://gitcode.com/cann/ops-nn/issues/3634)
问题：【文档质量】compile.md 的 set_env.bash 路径缺 _nn 后缀,与打包命名及同篇后文不一致。

### I3 · 总结与关闭
本阶段分数为 **41.6/100**，本阶段需要改进，主要问题是：关闭沉淀质量差，解决证据不足。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 11.8 | 均值 11.8，低分 24/25 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 43.0 | 均值 43.0，低分 18/25 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 44.6 | issue尚未关闭，无需评估关闭后反馈路径，给中性分。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 81.0 | issue仍处于open状态，不存在过早关闭风险 |

代表低分 Issue：[#3537](https://gitcode.com/cann/ops-nn/issues/3537)
问题：[Bug-Report|缺陷反馈]: addmmWeightNz接口16in32out场景下运行报错无法找到matmulv2二进制实现的bug。

### G · Bot/Agent 治理
本阶段分数为 **65.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 43.0 | 均值 43.0，低分 11/25 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 96.8 | 均值 96.8，低分 0/25 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 62.0 | 无bot参与，人工转交链存在但与bot无关，给中性分。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 56.3 | 无bot介入记录，无法评估帮助性，给保守中性分。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 59.1 | 无bot动作可观察，无法评估介入质量，给保守中性分。 |

代表低分 Issue：[#3569](https://gitcode.com/cann/ops-nn/issues/3569)
问题：[Bug-Report|缺陷反馈]: classify rule需要补充部分测试文件路径。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 177 | 42.6 | 首期基线 | 78.1 | 61.5 | 41.1 | 41.6 | 65.5 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **9 位社区响应者**贡献 **48 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `oscillated` | 20 |
| `tangweiwei2` | 8 |
| `chenqi317` | 7 |
| `yolic` | 5 |
| `fullt` | 3 |

Top1 响应占比 **41.7%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：91.3/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-nn/report_cann-ops-nn_2026-06-22_to_2026-06-28.json`。
