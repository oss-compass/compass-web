# Issue 贡献体验周报 · cann/ops-transformer

**周期：2026-07-13_to_2026-07-19**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-transformer` 共收到 **109** 个 Issue
+ 其中外部 Issue **20** 个、内部 **89** 个；I1–I3 及 G 基于「外部且成熟」的 **14** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 27 / Closed 82**，关闭率 **75.2%**。
+ 总体体验分为 **42.2/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I2 · 讨论与解决 | 36.8 | Bot分配后人工跟进完全断裂 |
| P0 | I3 · 总结与关闭 | 41.6 | 分配后人工跟进完全断裂 |
| P1 | I1 · 分配与首次响应 | 64.4 | Bot分配后人工接续断裂 |

本周建议 14 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 配置自动提醒Bot向assignee发送跟进通知 |
| REC-02 | P0 | 自动@assignee提醒跟进并设置72小时超时升级标记 |
| REC-03 | P0 | Bot自动发送讨论引导模板，提示assignee提供初步分析或排查计划 |
| REC-04 | P1 | 强制要求填写关闭总结模板（根因/修复方案/复用建议） |
| REC-05 | P1 | 配置Bot自动添加类型标签（bug/feature/discussion等） |
| REC-06 | P1 | 建立标准审批流程模板，指定审批责任人，设定审批时限（如7个工作日） |
| REC-07 | P1 | 自动@用户确认解决方案有效性，并提示7天后无回复将自动关闭 |
| REC-08 | P1 | 在Issue模板中为环境信息、复现步骤、日志章节添加必填校验（如GitHub Forms YAML格式或Bot预检查），阻止空必填项提交 |
| REC-09 | P1 | Bot自动@assignee提醒并启动48小时SLA倒计时 |
| REC-10 | P2 | 自动添加governance标签并路由至专属审批看板 |
| REC-11 | P2 | 配置Bot或平台规则，对正文少于20字符或仅含无意义词汇的Issue拒绝创建并提示用户补充有效内容 |
| REC-12 | P2 | Bot根据标题前缀（[Bug-Report]→bug、[Question]→question、[Documentation]→documentation）自动添加对应标签 |
| REC-13 | P2 | Bot自动添加bug标签和对应模块标签 |
| REC-14 | P2 | Bot自动评论要求assignee在48小时内提供初步技术评估（复现确认/排查方向/预计修复时间） |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 109 |
| Open / Closed | 27 / 82 |
| 关闭率 | 75.2% |
| 类型构成 | 缺陷 53 / 需求 29 / 咨询 2 / 其他 25 |
| 总体体验分 | 42.2/100（D） |
| 首次响应时间 | 中位 0.1h；均值 7.4h |
| 关闭周期 | 中位 4.4h；均值 1.2天 |
| 7天响应率 | 97.2% |
| 评论数/Issue | 1.17 |
| 标签覆盖率 | 78.0% |
| 指派覆盖率 | 96.3% |
| 数据完整性 | 92.1/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 78.9 | 11/109（10.1%） | 相对可控 | `SUB_INPUT_QUALITY` 66.9 |
| I1 · 分配与首次响应 | 64.4 | 5/14（35.7%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 28.6 |
| I2 · 讨论与解决 | 36.8 | 10/14（71.4%） | P0 | `OBJ_SOLUTION_EVIDENCE` 13.7 |
| I3 · 总结与关闭 | 41.6 | 12/14（85.7%） | P0 | `OBJ_CLOSURE_REUSE` 5.7 |
| G · Bot/Agent 治理（参考） | 69.5 | 1/14（7.1%） | 参考项 | `OBJ_BOT_GOVERNANCE` 42.1 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 分配后人工跟进完全断裂 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 | Bug报告长期无人处理，用户目标未达成，社区响应效率严重下降 |
| PP-02 | P0 | I2 · 讨论与解决 | Bot分配后人工跟进完全断裂 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 | 用户目标完全未满足，4个样本sub-user-goal-result≤10，社区信任受损。 |
| PP-03 | P0 | I2 · 讨论与解决 | 实质性技术讨论完全缺失 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 | 问题无法从分流阶段推进到解决阶段，阶段客观均分仅30.4。 |
| PP-04 | P1 | I3 · 总结与关闭 | 解决方案证据与闭环复用全缺失 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 | 同类问题无法复用经验，社区知识库无沉淀，后续贡献者无法从历史Issue中学习 |
| PP-05 | P1 | I3 · 总结与关闭 | Issue全程无标签分类与决策透明度 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 | 无法按类型/优先级/模块筛选和统计Issue，关闭决策过程不透明，社区治理缺乏数据支撑 |
| PP-06 | P1 | I2 · 讨论与解决 | 治理审批流程无责任人无结论 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 | 治理流程停滞，申请者目标未达成，社区贡献者激励受阻。 |
| PP-07 | P1 | I2 · 讨论与解决 | 解决方案提供后讨论未闭环 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 | 解决方案验证缺失，issue无法正常关闭，资源持续占用。 |
| PP-08 | P1 | I0 · 创建 | 模板必填章节大面积留空 | SUB_INPUT_QUALITY：LLM评分失败或缺失 | 下游维护者缺乏复现所需关键上下文，导致assign后8天无技术跟进 |
| PP-09 | P1 | I1 · 分配与首次响应 | Bot分配后人工接续断裂 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 | 4个Bug报告停滞8天无进展，用户目标完全未满足，社区响应可信度下降 |
| PP-10 | P2 | I3 · 总结与关闭 | 晋升申请流程与Bug流程混杂无分流 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 | 治理类Issue占用Bug处理通道资源，晋升申请无明确审批SLA和决策路径 |
| PP-11 | P2 | I0 · 创建 | 测试噪音Issue未在创建时拦截 | SUB_INPUT_QUALITY：LLM评分失败或缺失 | 污染Issue追踪器，浪费维护者注意力资源，拉低创建阶段平均分 |
| PP-12 | P2 | I0 · 创建 | 创建时缺少标签自动分类 | SUB_INPUT_QUALITY：LLM评分失败或缺失 | 创建阶段路由信息不完整，影响分流效率与自动化过滤效果 |
| PP-13 | P2 | I1 · 分配与首次响应 | 分流仅分配无标签分类 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 | Issue无法按类型/优先级/模块筛选，后续排期与统计缺乏分类基础 |
| PP-14 | P2 | I1 · 分配与首次响应 | 首次实质性响应完全缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 | 用户提交Bug后得不到任何技术层面的首次反馈，体验差且问题无法推进 |

### 4.1 低分 Issue 明细

#### PP-01 分配后人工跟进完全断裂（I3 · 总结与关闭）

- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，未留下可复用的解决经验。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭时无任何文字说明且缺乏方案文档与重复链接，未留下可复用的解决经验。
  - 原文依据：
    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与链接，仅记录投票结果，无法为后续提供参考。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与重复链接，仅记录了指派操作，无任何复用价值。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 0分
  - 痛点原因：关闭说明字数为零，未留下任何总结性文字供后续用户参考复用。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅完成指派，关闭说明为0字，无方案文档化及重复链接，无法供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：关闭时无任何说明文字，缺乏方案文档与相关链接，仅有指派记录，无法提供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：无方案文档化与重复链接，关闭说明仅6字，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `PerrySkywalker`：/close
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：关闭说明仅为简短系统提示且无方案文档化，未记录具体解决方案，无法供社区复用。
  - 原文依据：
    - `zhuxueling`：closed from codehub    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接记录，仅分配了处理人，未沉淀可复用信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅分配负责人，未留下任何可复用的解决信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：关闭说明为空且未提供重复问题主链接，导致无法复用解决经验。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 25分
  - 痛点原因：关闭说明仅53字且无方案文档化与重复链接，仅靠系统操作关闭，未沉淀可复用的解决方案。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 55分
  - 痛点原因：仅由机器人关联 MR 自动关闭且关闭说明仅 69 字，缺乏对最终解决方案的详细沉淀，复用信息有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `weihao18`：assigned to @weihao18    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
#### PP-02 Bot分配后人工跟进完全断裂（I2 · 讨论与解决）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅有关联PR合并，缺乏commit引用、文档链接及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：仅有多人+1投票，完全缺乏PR、commit、文档及release等实质性解决证据。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关联PR未合并且无commit、文档及release引用，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8813（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8813)    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 引用、文档链接及关闭评论等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅进行了负责人指派，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 或关闭评论等任何实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 15分
  - 痛点原因：缺乏关联PR、commit引用及关闭评论等实质性修复证据，仅停留在口头回复与临时方案。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 23分
  - 痛点原因：虽有关联PR和根因说明，但缺commit、文档、release等直接修复证据，关闭说明过于简略，证据链不完整。
  - 原文依据：
    - [关联PR #8852（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8852)    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且非作者关闭被机器人拦截，修复证据不足。
  - 原文依据：
    - [关联PR #8653（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8653)    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 23分
  - 痛点原因：缺乏关联PR、commit引用及文档链接等实质性解决证据，仅凭机器人指令关闭。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，且仅由系统自动关闭，缺乏明确的修复说明。
  - 原文依据：
    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `zhuxueling`：closed from codehub    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 38分
  - 痛点原因：缺少commit引用，且机器人关闭时仅关联其他issue而非直接提供代码提交证据。
  - 原文依据：
    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 46分
  - 痛点原因：无关联修复PR且无关闭评论说明，仅停留在分配负责人和模板回复阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-03 实质性技术讨论完全缺失（I2 · 讨论与解决）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅有关联PR合并，缺乏commit引用、文档链接及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：仅有多人+1投票，完全缺乏PR、commit、文档及release等实质性解决证据。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关联PR未合并且无commit、文档及release引用，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8813（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8813)    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 引用、文档链接及关闭评论等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅进行了负责人指派，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 或关闭评论等任何实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 15分
  - 痛点原因：缺乏关联PR、commit引用及关闭评论等实质性修复证据，仅停留在口头回复与临时方案。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 23分
  - 痛点原因：虽有关联PR和根因说明，但缺commit、文档、release等直接修复证据，关闭说明过于简略，证据链不完整。
  - 原文依据：
    - [关联PR #8852（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8852)    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且非作者关闭被机器人拦截，修复证据不足。
  - 原文依据：
    - [关联PR #8653（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8653)    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 23分
  - 痛点原因：缺乏关联PR、commit引用及文档链接等实质性解决证据，仅凭机器人指令关闭。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，且仅由系统自动关闭，缺乏明确的修复说明。
  - 原文依据：
    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `zhuxueling`：closed from codehub    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 38分
  - 痛点原因：缺少commit引用，且机器人关闭时仅关联其他issue而非直接提供代码提交证据。
  - 原文依据：
    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 46分
  - 痛点原因：无关联修复PR且无关闭评论说明，仅停留在分配负责人和模板回复阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-04 解决方案证据与闭环复用全缺失（I3 · 总结与关闭）

- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，未留下可复用的解决经验。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭时无任何文字说明且缺乏方案文档与重复链接，未留下可复用的解决经验。
  - 原文依据：
    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与链接，仅记录投票结果，无法为后续提供参考。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与重复链接，仅记录了指派操作，无任何复用价值。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 0分
  - 痛点原因：关闭说明字数为零，未留下任何总结性文字供后续用户参考复用。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅完成指派，关闭说明为0字，无方案文档化及重复链接，无法供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：关闭时无任何说明文字，缺乏方案文档与相关链接，仅有指派记录，无法提供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：无方案文档化与重复链接，关闭说明仅6字，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `PerrySkywalker`：/close
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：关闭说明仅为简短系统提示且无方案文档化，未记录具体解决方案，无法供社区复用。
  - 原文依据：
    - `zhuxueling`：closed from codehub    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接记录，仅分配了处理人，未沉淀可复用信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅分配负责人，未留下任何可复用的解决信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：关闭说明为空且未提供重复问题主链接，导致无法复用解决经验。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 25分
  - 痛点原因：关闭说明仅53字且无方案文档化与重复链接，仅靠系统操作关闭，未沉淀可复用的解决方案。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 55分
  - 痛点原因：仅由机器人关联 MR 自动关闭且关闭说明仅 69 字，缺乏对最终解决方案的详细沉淀，复用信息有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `weihao18`：assigned to @weihao18    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
#### PP-05 Issue全程无标签分类与决策透明度（I3 · 总结与关闭）

- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，未留下可复用的解决经验。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭时无任何文字说明且缺乏方案文档与重复链接，未留下可复用的解决经验。
  - 原文依据：
    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与链接，仅记录投票结果，无法为后续提供参考。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与重复链接，仅记录了指派操作，无任何复用价值。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 0分
  - 痛点原因：关闭说明字数为零，未留下任何总结性文字供后续用户参考复用。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅完成指派，关闭说明为0字，无方案文档化及重复链接，无法供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：关闭时无任何说明文字，缺乏方案文档与相关链接，仅有指派记录，无法提供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：无方案文档化与重复链接，关闭说明仅6字，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `PerrySkywalker`：/close
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：关闭说明仅为简短系统提示且无方案文档化，未记录具体解决方案，无法供社区复用。
  - 原文依据：
    - `zhuxueling`：closed from codehub    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接记录，仅分配了处理人，未沉淀可复用信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅分配负责人，未留下任何可复用的解决信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：关闭说明为空且未提供重复问题主链接，导致无法复用解决经验。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 25分
  - 痛点原因：关闭说明仅53字且无方案文档化与重复链接，仅靠系统操作关闭，未沉淀可复用的解决方案。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 55分
  - 痛点原因：仅由机器人关联 MR 自动关闭且关闭说明仅 69 字，缺乏对最终解决方案的详细沉淀，复用信息有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `weihao18`：assigned to @weihao18    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
#### PP-06 治理审批流程无责任人无结论（I2 · 讨论与解决）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅有关联PR合并，缺乏commit引用、文档链接及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：仅有多人+1投票，完全缺乏PR、commit、文档及release等实质性解决证据。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关联PR未合并且无commit、文档及release引用，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8813（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8813)    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 引用、文档链接及关闭评论等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅进行了负责人指派，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 或关闭评论等任何实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 15分
  - 痛点原因：缺乏关联PR、commit引用及关闭评论等实质性修复证据，仅停留在口头回复与临时方案。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 23分
  - 痛点原因：虽有关联PR和根因说明，但缺commit、文档、release等直接修复证据，关闭说明过于简略，证据链不完整。
  - 原文依据：
    - [关联PR #8852（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8852)    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且非作者关闭被机器人拦截，修复证据不足。
  - 原文依据：
    - [关联PR #8653（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8653)    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 23分
  - 痛点原因：缺乏关联PR、commit引用及文档链接等实质性解决证据，仅凭机器人指令关闭。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，且仅由系统自动关闭，缺乏明确的修复说明。
  - 原文依据：
    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `zhuxueling`：closed from codehub    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 38分
  - 痛点原因：缺少commit引用，且机器人关闭时仅关联其他issue而非直接提供代码提交证据。
  - 原文依据：
    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 46分
  - 痛点原因：无关联修复PR且无关闭评论说明，仅停留在分配负责人和模板回复阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-07 解决方案提供后讨论未闭环（I2 · 讨论与解决）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅有关联PR合并，缺乏commit引用、文档链接及关闭评论等实质性解决证据。
  - 原文依据：
    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：仅有多人+1投票，完全缺乏PR、commit、文档及release等实质性解决证据。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关联PR未合并且无commit、文档及release引用，也无关闭评论，缺乏实质解决证据。
  - 原文依据：
    - [关联PR #8813（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8813)    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 引用、文档链接及关闭评论等任何实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：仅进行了负责人指派，未关联任何 PR、commit 或文档等实质性解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅分配了负责人，无关联 PR、commit 或关闭评论等任何实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅分配了负责人，缺乏关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 15分
  - 痛点原因：缺乏关联PR、commit引用及关闭评论等实质性修复证据，仅停留在口头回复与临时方案。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 23分
  - 痛点原因：虽有关联PR和根因说明，但缺commit、文档、release等直接修复证据，关闭说明过于简略，证据链不完整。
  - 原文依据：
    - [关联PR #8852（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8852)    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 23分
  - 痛点原因：虽有合并PR，但无commit、文档及release引用，且非作者关闭被机器人拦截，修复证据不足。
  - 原文依据：
    - [关联PR #8653（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8653)    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 23分
  - 痛点原因：缺乏关联PR、commit引用及文档链接等实质性解决证据，仅凭机器人指令关闭。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 23分
  - 痛点原因：虽有关联PR，但无commit、文档及release引用，且仅由系统自动关闭，缺乏明确的修复说明。
  - 原文依据：
    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `zhuxueling`：closed from codehub    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 38分
  - 痛点原因：缺少commit引用，且机器人关闭时仅关联其他issue而非直接提供代码提交证据。
  - 原文依据：
    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：assigned to @weihao18
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 46分
  - 痛点原因：无关联修复PR且无关闭评论说明，仅停留在分配负责人和模板回复阶段，缺乏实质解决证据。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-08 模板必填章节大面积留空（I0 · 创建）

- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 0分
  - 痛点原因：仅有任务分配和标签操作，缺乏具体的反馈内容、背景说明等有效信息。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 0分
  - 痛点原因：仅包含指派和标签操作，完全缺乏缺陷描述、复现步骤及环境信息等必要内容。
  - 原文依据：
    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @WangShuying5    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 5分
  - 痛点原因：正文仅'test'四字符，无复现步骤、环境信息或结构化内容
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 25分
  - 痛点原因：模板章节存在但仅背景填一行，价值与设计均空白，信息量极低。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 25分
  - 痛点原因：正文仅10字重复标题，无任何细节说明，虽为内部任务但信息过于简略。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 25分
  - 痛点原因：模板结构存在但所有字段填入同一句话，无实质复现步骤或日志
  - 原文依据：
    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 25分
  - 痛点原因：正文仅一句话，无具体文件列表或问题描述，但属内部任务型issue
  - 原文依据：
    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 25分
  - 痛点原因：正文仅重复标题，无任何技术细节或修改说明，信息量极低。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 25分
  - 痛点原因：模板章节存在但内容极简，仅重复标题，价值说明与设计方案均空白
  - 原文依据：
    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 30分
  - 痛点原因：模板章节存在但背景仅一句话，价值与设计部分均为空，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 30分
  - 痛点原因：需求模板仅填背景，价值与设计章节均空白，信息不完整。
  - 原文依据：
    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 30分
  - 痛点原因：需求模板仅填背景一句话，价值与设计均空白，内容过于简陋。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 35分
  - 痛点原因：模板有结构化章节但仅背景一行，设计与价值章节均空
  - 原文依据：
    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @libohao6    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 35分
  - 痛点原因：正文仅一句话，无具体文件清单或格式问题细节，信息量不足。
  - 原文依据：
    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 35分
  - 痛点原因：有模板结构和环境信息，但复现步骤与日志均填'暂无'，关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 35分
  - 痛点原因：有模板结构但背景仅一句，Benefit/Design均空，无复现步骤或环境信息。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @l00858142    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 40分
  - 痛点原因：简述了问题与涉及算子，但缺少复现步骤、环境信息、日志及结构化章节
  - 原文依据：
    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 40分
  - 痛点原因：使用模板但多数章节为空，仅提供背景信息，无设计或价值说明
  - 原文依据：
    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 40分
  - 痛点原因：有结构化模板但Benefit和Design章节为空，背景仅一句话，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 45分
  - 痛点原因：模板结构存在但内容极简，背景仅一行，价值与设计均空白
  - 原文依据：
    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 45分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景仅一句话，信息不充分
  - 原文依据：
    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 45分
  - 痛点原因：模板结构存在但Benefit和Design等关键字段未填写，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 45分
  - 痛点原因：模板章节存在但内容极简，背景仅一句话，价值与设计部分为空。
  - 原文依据：
    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 45分
  - 痛点原因：模板有结构化章节但Benefit和Design为空，背景仅一句话，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 50分
  - 痛点原因：模板填写但重现步骤和日志均为NA，问题描述过于简短
  - 原文依据：
    - `weihao18`：/assign @wangrui_    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 55分
  - 痛点原因：模板章节存在但内容极简，仅一句话描述需求，无设计细节。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 55分
  - 痛点原因：模板字段齐全但多数填'无'，核心描述含版本与规避方案，信息量有限。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 55分
  - 痛点原因：模板背景已填但价值/作用和设计方案两关键章节为空，需求描述不完整。
  - 原文依据：
    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 55分
  - 痛点原因：有结构化模板和背景描述，但Benefit和Design章节为空，需求细节不足。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 55分
  - 痛点原因：模板章节齐全但Benefit和Design部分为空，背景信息简短，作为需求issue信息偏少。
  - 原文依据：
    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 55分
  - 痛点原因：模板填写但环境与重现步骤填'无'，有截图和精确行号但关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 55分
  - 痛点原因：正文简短说明任务目标，但无结构化章节、环境或复现信息，作为任务型issue勉强够用。
  - 原文依据：
    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 55分
  - 痛点原因：提供了文档链接和问题片段，但Existing Issues部分为空，未描述具体问题。
  - 原文依据：
    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fanzijian    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 58分
  - 痛点原因：使用了模板且有文档链接和截图，但问题描述部分未填写实际内容。
  - 原文依据：
    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 58分
  - 痛点原因：问题描述含代码片段且定位精确，但环境、复现步骤、日志等必填模板均为空。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
#### PP-09 Bot分配后人工接续断裂（I1 · 分配与首次响应）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅机器人打标签且人工直接关闭，全程无任何技术分析与解答，导致无实质回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：仅有反复的指派操作和机器人通知，始终无人提供实质性的技术解答或问题排查。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅有分配负责人的指令操作，未对缺陷问题提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：被指派人仅完成分配，始终未对该精度错误缺陷提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 0分
  - 痛点原因：被指派人仅尝试关闭issue且被机器人拦截，全程未对缺陷提供任何实质性解答或处理说明。
  - 原文依据：
    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `weihao18`：closed from codehub
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：维护者仅发送关闭指令便直接关闭了该 issue，全程未提供任何实质性解答。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：首次响应仅为人员指派与流转，未提供任何针对缺陷的技术确认或排查等实质内容。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅通过机器人分配了负责人，未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅有3.8小时内的指派操作，被指派人始终未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：仅有任务分配和模板回复，未针对算子报错提供实质性技术解答。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-10 晋升申请流程与Bug流程混杂无分流（I3 · 总结与关闭）

- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 0分
  - 痛点原因：关闭说明仅7字且无方案文档化记录，未留下可复用的解决经验。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `weihao18`：/assign
- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：关闭时无任何文字说明且缺乏方案文档与重复链接，未留下可复用的解决经验。
  - 原文依据：
    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3772](https://gitcode.com/cann/ops-transformer/issues/3772) 个人晋升Committer申请** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与链接，仅记录投票结果，无法为后续提供参考。
  - 原文依据：
    - `libohao6`：+1    - `macech`：+1    - `yangzeheng`：+1    - `wang-minbo`：+1    - `captainmiaow`：+1    - `chenjunjian11`：+1
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与重复链接，仅记录了指派操作，无任何复用价值。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3754](https://gitcode.com/cann/ops-transformer/issues/3754) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example 编译时找不到头文件** — 0分
  - 痛点原因：关闭说明字数为零，未留下任何总结性文字供后续用户参考复用。
  - 原文依据：
    - `weihao18`：感谢反馈，我们将尽快修复找不到头文件的问题    - `weihao18`：麻烦尝试一下加lib，是否还存在报错 ``` #include "lib/matmul_intf.h" ``` lib/matmul_intf.h 的真实位置是 tikcpp/tikcfw/lib/matmul_intf.h（其中 tik…    - `weihao18`：assigned to @weihao18
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅完成指派，关闭说明为0字，无方案文档化及重复链接，无法供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：关闭时无任何说明文字，缺乏方案文档与相关链接，仅有指派记录，无法提供后续参考。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：无方案文档化与重复链接，关闭说明仅6字，未留下任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `PerrySkywalker`：/close
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：关闭说明仅为简短系统提示且无方案文档化，未记录具体解决方案，无法供社区复用。
  - 原文依据：
    - `zhuxueling`：closed from codehub    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：关闭说明为空，无方案文档与重复链接记录，仅分配了处理人，未沉淀可复用信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：关闭说明为0字且无方案文档化，仅分配负责人，未留下任何可复用的解决信息。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：关闭说明为空且未提供重复问题主链接，导致无法复用解决经验。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 25分
  - 痛点原因：关闭说明仅53字且无方案文档化与重复链接，仅靠系统操作关闭，未沉淀可复用的解决方案。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …
- **[#3786](https://gitcode.com/cann/ops-transformer/issues/3786) [Documentation|文档反馈]: 单独编译aicpu算子报错** — 55分
  - 痛点原因：仅由机器人关联 MR 自动关闭且关闭说明仅 69 字，缺乏对最终解决方案的详细沉淀，复用信息有限。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3786    - `cann-robot`：add label resolved    - `weihao18`：感谢反馈，不加--aicpu_kernel编纯aicpu算子确实会报错，文档和build.sh帮助没有添加这个选项说明，我们会及时补充上去    - `weihao18`：assigned to @weihao18    - [关联PR #8855（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8855)
#### PP-11 测试噪音Issue未在创建时拦截（I0 · 创建）

- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 0分
  - 痛点原因：仅有任务分配和标签操作，缺乏具体的反馈内容、背景说明等有效信息。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 0分
  - 痛点原因：仅包含指派和标签操作，完全缺乏缺陷描述、复现步骤及环境信息等必要内容。
  - 原文依据：
    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @WangShuying5    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 5分
  - 痛点原因：正文仅'test'四字符，无复现步骤、环境信息或结构化内容
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 25分
  - 痛点原因：模板章节存在但仅背景填一行，价值与设计均空白，信息量极低。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 25分
  - 痛点原因：正文仅10字重复标题，无任何细节说明，虽为内部任务但信息过于简略。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 25分
  - 痛点原因：模板结构存在但所有字段填入同一句话，无实质复现步骤或日志
  - 原文依据：
    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 25分
  - 痛点原因：正文仅一句话，无具体文件列表或问题描述，但属内部任务型issue
  - 原文依据：
    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 25分
  - 痛点原因：正文仅重复标题，无任何技术细节或修改说明，信息量极低。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 25分
  - 痛点原因：模板章节存在但内容极简，仅重复标题，价值说明与设计方案均空白
  - 原文依据：
    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 30分
  - 痛点原因：模板章节存在但背景仅一句话，价值与设计部分均为空，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 30分
  - 痛点原因：需求模板仅填背景，价值与设计章节均空白，信息不完整。
  - 原文依据：
    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 30分
  - 痛点原因：需求模板仅填背景一句话，价值与设计均空白，内容过于简陋。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 35分
  - 痛点原因：模板有结构化章节但仅背景一行，设计与价值章节均空
  - 原文依据：
    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @libohao6    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 35分
  - 痛点原因：正文仅一句话，无具体文件清单或格式问题细节，信息量不足。
  - 原文依据：
    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 35分
  - 痛点原因：有模板结构和环境信息，但复现步骤与日志均填'暂无'，关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 35分
  - 痛点原因：有模板结构但背景仅一句，Benefit/Design均空，无复现步骤或环境信息。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @l00858142    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 40分
  - 痛点原因：简述了问题与涉及算子，但缺少复现步骤、环境信息、日志及结构化章节
  - 原文依据：
    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 40分
  - 痛点原因：使用模板但多数章节为空，仅提供背景信息，无设计或价值说明
  - 原文依据：
    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 40分
  - 痛点原因：有结构化模板但Benefit和Design章节为空，背景仅一句话，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 45分
  - 痛点原因：模板结构存在但内容极简，背景仅一行，价值与设计均空白
  - 原文依据：
    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 45分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景仅一句话，信息不充分
  - 原文依据：
    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 45分
  - 痛点原因：模板结构存在但Benefit和Design等关键字段未填写，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 45分
  - 痛点原因：模板章节存在但内容极简，背景仅一句话，价值与设计部分为空。
  - 原文依据：
    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 45分
  - 痛点原因：模板有结构化章节但Benefit和Design为空，背景仅一句话，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 50分
  - 痛点原因：模板填写但重现步骤和日志均为NA，问题描述过于简短
  - 原文依据：
    - `weihao18`：/assign @wangrui_    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 55分
  - 痛点原因：模板章节存在但内容极简，仅一句话描述需求，无设计细节。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 55分
  - 痛点原因：模板字段齐全但多数填'无'，核心描述含版本与规避方案，信息量有限。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 55分
  - 痛点原因：模板背景已填但价值/作用和设计方案两关键章节为空，需求描述不完整。
  - 原文依据：
    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 55分
  - 痛点原因：有结构化模板和背景描述，但Benefit和Design章节为空，需求细节不足。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 55分
  - 痛点原因：模板章节齐全但Benefit和Design部分为空，背景信息简短，作为需求issue信息偏少。
  - 原文依据：
    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 55分
  - 痛点原因：模板填写但环境与重现步骤填'无'，有截图和精确行号但关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 55分
  - 痛点原因：正文简短说明任务目标，但无结构化章节、环境或复现信息，作为任务型issue勉强够用。
  - 原文依据：
    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 55分
  - 痛点原因：提供了文档链接和问题片段，但Existing Issues部分为空，未描述具体问题。
  - 原文依据：
    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fanzijian    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 58分
  - 痛点原因：使用了模板且有文档链接和截图，但问题描述部分未填写实际内容。
  - 原文依据：
    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 58分
  - 痛点原因：问题描述含代码片段且定位精确，但环境、复现步骤、日志等必填模板均为空。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
#### PP-12 创建时缺少标签自动分类（I0 · 创建）

- **[#3811](https://gitcode.com/cann/ops-transformer/issues/3811) [Documentation|文档反馈]: Update dispatch expert buffer documentation** — 0分
  - 痛点原因：仅有任务分配和标签操作，缺乏具体的反馈内容、背景说明等有效信息。
  - 原文依据：
    - `weihao18`：/assign [@Yuyu-Li](https://gitcode.com/Yuyu-Li)    - `Yuyu-Li`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Yuyu-Li    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3811    - [关联PR #8832（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8832)
- **[#3769](https://gitcode.com/cann/ops-transformer/issues/3769) [Bug-Report|缺陷反馈]: all_gather_matmul_v2 & matmul_reduce_scatter_v2 exapmle 运行时需…** — 0分
  - 痛点原因：仅包含指派和标签操作，完全缺乏缺陷描述、复现步骤及环境信息等必要内容。
  - 原文依据：
    - `weihao18`：/assign [@WangShuying5](https://gitcode.com/WangShuying5)    - `WangShuying5`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @WangShuying5    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3769    - [关联PR #8713（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8713)
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 5分
  - 痛点原因：正文仅'test'四字符，无复现步骤、环境信息或结构化内容
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3793](https://gitcode.com/cann/ops-transformer/issues/3793) [Requirement|需求建议]: LIV2 pytest支持批跑** — 25分
  - 痛点原因：模板章节存在但仅背景填一行，价值与设计均空白，信息量极低。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3793    - [关联PR #8693（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8693)
- **[#3780](https://gitcode.com/cann/ops-transformer/issues/3780) 修改slig算子示例** — 25分
  - 痛点原因：正文仅10字重复标题，无任何细节说明，虽为内部任务但信息过于简略。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3780    - [关联PR #8755（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8755)
- **[#3771](https://gitcode.com/cann/ops-transformer/issues/3771) [Bug-Report|缺陷反馈]: FIA Tiling重构检视意见修改同步商分** — 25分
  - 痛点原因：模板结构存在但所有字段填入同一句话，无实质复现步骤或日志
  - 原文依据：
    - `cardiac_index`：add label bug-report    - `cann-robot`：add label resolved    - `cardiac_index`：assigned to @cardiac_index    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3771    - [关联PR #8651（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8651)
- **[#3764](https://gitcode.com/cann/ops-transformer/issues/3764) MC2算子文件precommit问题清理** — 25分
  - 痛点原因：正文仅一句话，无具体文件列表或问题描述，但属内部任务型issue
  - 原文依据：
    - `cann-robot`：add label resolved    - `hblnb`：assigned to @hblnb    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3764    - [关联PR #1511（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/1511)    - [关联PR #3261（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3261)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/3631)
- **[#3758](https://gitcode.com/cann/ops-transformer/issues/3758) 修改rope算子isTndLayout变量赋值** — 25分
  - 痛点原因：正文仅重复标题，无任何技术细节或修改说明，信息量极低。
  - 原文依据：
    - `weihao18`：/assign @cjz_    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @cjz_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3758    - [关联PR #8705（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8705)    - [关联PR #8793（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8793)
- **[#3727](https://gitcode.com/cann/ops-transformer/issues/3727) [Requirement|需求建议]: update slikg A2 topk limit** — 25分
  - 痛点原因：模板章节存在但内容极简，仅重复标题，价值说明与设计方案均空白
  - 原文依据：
    - `weihao18`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3727    - [关联PR #8628（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8628)
- **[#3833](https://gitcode.com/cann/ops-transformer/issues/3833) [Requirement|需求建议]: moe_ep_combine性能优化** — 30分
  - 痛点原因：模板章节存在但背景仅一句话，价值与设计部分均为空，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `cann-robot`：### Notice This issue is already assigned to ***l00858142***. Please do not assign repeatedly.    - `l00858142`：add label requirement    - `cann-robot`：assigned to @l00858142    - [关联PR #8895（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8895)
- **[#3748](https://gitcode.com/cann/ops-transformer/issues/3748) [Requirement|需求建议]: 修改matmulreducescatterv2的mxfp4量化的建议项问题** — 30分
  - 痛点原因：需求模板仅填背景，价值与设计章节均空白，信息不完整。
  - 原文依据：
    - `weihao18`：/assign [@Kiana1216](https://gitcode.com/Kiana1216)    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3748    - [关联PR #8634（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8634)
- **[#3734](https://gitcode.com/cann/ops-transformer/issues/3734) [Requirement|需求建议]: liv2 pytest批跑功能恢复** — 30分
  - 痛点原因：需求模板仅填背景一句话，价值与设计均空白，内容过于简陋。
  - 原文依据：
    - `weihao18`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3734    - [关联PR #8532（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8532)
- **[#3831](https://gitcode.com/cann/ops-transformer/issues/3831) [Requirement|需求建议]: AlltoAllvGmm/AlltoAllvQuantGmm性能优化：多专家合并通信+重排优化** — 35分
  - 痛点原因：模板有结构化章节但仅背景一行，设计与价值章节均空
  - 原文依据：
    - `weihao18`：/assign [@libohao6](https://gitcode.com/libohao6)    - `libohao6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @libohao6    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3831    - [关联PR #8751（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8751)
- **[#3797](https://gitcode.com/cann/ops-transformer/issues/3797) gmm 算子pre-commit清理** — 35分
  - 痛点原因：正文仅一句话，无具体文件清单或格式问题细节，信息量不足。
  - 原文依据：
    - `cann-robot`：add label resolved    - `zhangzhizhuo`：assigned to @zhangzhizhuo    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3797    - [关联PR #8808（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8808)    - [关联PR #8883（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8883)
- **[#3747](https://gitcode.com/cann/ops-transformer/issues/3747) [Bug-Report|缺陷反馈]: fix combine Dcci for performance** — 35分
  - 痛点原因：有模板结构和环境信息，但复现步骤与日志均填'暂无'，关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@liumingxuan9](https://gitcode.com/liumingxuan9)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @liumingxuan9    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3747    - [关联PR #8684（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8684)
- **[#3746](https://gitcode.com/cann/ops-transformer/issues/3746) [Requirement|需求建议]: dispatch epilogue 性能优化** — 35分
  - 痛点原因：有模板结构但背景仅一句，Benefit/Design均空，无复现步骤或环境信息。
  - 原文依据：
    - `weihao18`：/assign [@l00858142](https://gitcode.com/l00858142)    - `l00858142`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @l00858142    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3746    - [关联PR #8715（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8715)
- **[#3767](https://gitcode.com/cann/ops-transformer/issues/3767) mc2内存语义算子没有ccl buff限制** — 40分
  - 痛点原因：简述了问题与涉及算子，但缺少复现步骤、环境信息、日志及结构化章节
  - 原文依据：
    - `weihao18`：/assign [@SimpleBright_Man](https://gitcode.com/SimpleBright_Man)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @SimpleBright_Man    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3767    - [关联PR #8669（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8669)    - [关联PR #8719（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8719)
- **[#3765](https://gitcode.com/cann/ops-transformer/issues/3765) [Requirement|需求建议]: MatmulReduceScatterV2性能调优** — 40分
  - 痛点原因：使用模板但多数章节为空，仅提供背景信息，无设计或价值说明
  - 原文依据：
    - `Kiana1216`：add label requirement    - `cann-robot`：add label resolved    - `Kiana1216`：assigned to @Kiana1216    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3765    - [关联PR #8712（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8712)
- **[#3763](https://gitcode.com/cann/ops-transformer/issues/3763) [Requirement|需求建议]: QLIV2 UB可以复用降低内存消耗** — 40分
  - 痛点原因：有结构化模板但Benefit和Design章节为空，背景仅一句话，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3763    - [关联PR #8668（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8668)
- **[#3820](https://gitcode.com/cann/ops-transformer/issues/3820) [Requirement|需求建议]: mqsmla metadata support batch consistency** — 45分
  - 痛点原因：模板结构存在但内容极简，背景仅一行，价值与设计均空白
  - 原文依据：
    - `weihao18`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：assigned to @qq_32807861    - [关联PR #8737（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8737)
- **[#3815](https://gitcode.com/cann/ops-transformer/issues/3815) [Requirement|需求建议]: [FIA]主线拦截GQA FP8 perblock场景** — 45分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景仅一句话，信息不充分
  - 原文依据：
    - `weihao18`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhaoDan0110    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3815    - [关联PR #8848（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8848)
- **[#3785](https://gitcode.com/cann/ops-transformer/issues/3785) [Requirement|需求建议]: 完善mc2算子 fusion pass** — 45分
  - 痛点原因：模板结构存在但Benefit和Design等关键字段未填写，内容过于简略。
  - 原文依据：
    - `weihao18`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - [关联PR #8735（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8735)
- **[#3755](https://gitcode.com/cann/ops-transformer/issues/3755) [Requirement|需求建议]: BsaSelectBlockMask支持TND格式** — 45分
  - 痛点原因：模板章节存在但内容极简，背景仅一句话，价值与设计部分为空。
  - 原文依据：
    - `weihao18`：/assign [@qiansunchi159](https://gitcode.com/qiansunchi159)    - `qiansunchi159`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qiansunchi159    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3755    - [关联PR #8683（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8683)
- **[#3742](https://gitcode.com/cann/ops-transformer/issues/3742) [Requirement|需求建议]: QLIV2 pytest新增批跑功能** — 45分
  - 痛点原因：模板有结构化章节但Benefit和Design为空，背景仅一句话，信息不充分。
  - 原文依据：
    - `weihao18`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3742    - [关联PR #8589（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8589)
- **[#3821](https://gitcode.com/cann/ops-transformer/issues/3821) [Bug-Report|缺陷反馈]: Causal_Conv1d算子statelen > kernelwidth时，精度异常** — 50分
  - 痛点原因：模板填写但重现步骤和日志均为NA，问题描述过于简短
  - 原文依据：
    - `weihao18`：/assign @wangrui_    - `wangrui_`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3821    - [关联PR #8724（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8724)
- **[#3812](https://gitcode.com/cann/ops-transformer/issues/3812) [Requirement|需求建议]: Compressor新增UT** — 55分
  - 痛点原因：模板章节存在但内容极简，仅一句话描述需求，无设计细节。
  - 原文依据：
    - `weihao18`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3812    - [关联PR #8835（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8835)
- **[#3809](https://gitcode.com/cann/ops-transformer/issues/3809) [Bug-Report|缺陷反馈]: 编译custom报错** — 55分
  - 痛点原因：模板字段齐全但多数填'无'，核心描述含版本与规避方案，信息量有限。
  - 原文依据：
    - `weihao18`：/assign    - `weihao18`：opbase接口有变更，但是cmake/third_party/opbase.cmake里没更新tag id    - `gitcode_lijd`：add label bug-report    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @weihao18
- **[#3782](https://gitcode.com/cann/ops-transformer/issues/3782) [Requirement|需求建议]:** — 55分
  - 痛点原因：模板背景已填但价值/作用和设计方案两关键章节为空，需求描述不完整。
  - 原文依据：
    - `weihao18`：/assign [@xiongyifu](https://gitcode.com/xiongyifu)    - `xiongyifu`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xiongyifu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3782    - [关联PR #8722（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8722)
- **[#3770](https://gitcode.com/cann/ops-transformer/issues/3770) [Requirement|需求建议]: dispatch fullmeshV2 cumsum可用核数存在上限，且原有分配方式未考虑AllToAll与CumSu…** — 55分
  - 痛点原因：有结构化模板和背景描述，但Benefit和Design章节为空，需求细节不足。
  - 原文依据：
    - `weihao18`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：assigned to @zhong-zixin    - [关联PR #8120（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8120)    - [关联PR #8213（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8213)
- **[#3768](https://gitcode.com/cann/ops-transformer/issues/3768) [Requirement|需求建议]: ffn_worker_batching新增下一代支持** — 55分
  - 痛点原因：模板章节齐全但Benefit和Design部分为空，背景信息简短，作为需求issue信息偏少。
  - 原文依据：
    - `weihao18`：/assign [@zl_hw](https://gitcode.com/zl_hw)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zl_hw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3768    - [关联PR #8616（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8616)
- **[#3766](https://gitcode.com/cann/ops-transformer/issues/3766) [Bug-Report|缺陷反馈]: 文件中有多余空行** — 55分
  - 痛点原因：模板填写但环境与重现步骤填'无'，有截图和精确行号但关键信息缺失。
  - 原文依据：
    - `weihao18`：/assign [@jiangyixuan2](https://gitcode.com/jiangyixuan2)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jiangyixuan2    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3766    - [关联PR #8714（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8714)
- **[#3761](https://gitcode.com/cann/ops-transformer/issues/3761) sfa 资料补齐&修改example** — 55分
  - 痛点原因：正文简短说明任务目标，但无结构化章节、环境或复现信息，作为任务型issue勉强够用。
  - 原文依据：
    - `weihao18`：/assign [@qq_48757028](https://gitcode.com/qq_48757028)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_48757028    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3761    - [关联PR #8710（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8710)
- **[#3730](https://gitcode.com/cann/ops-transformer/issues/3730) [Documentation|文档反馈]: 全量化非连续场景不支持aclnn直调** — 55分
  - 痛点原因：提供了文档链接和问题片段，但Existing Issues部分为空，未描述具体问题。
  - 原文依据：
    - `weihao18`：/assign [@fanzijian](https://gitcode.com/fanzijian)    - `fanzijian`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fanzijian    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3730    - [关联PR #8635（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8635)
- **[#3776](https://gitcode.com/cann/ops-transformer/issues/3776) [Documentation|文档反馈]: 修复slig文档支持范围** — 58分
  - 痛点原因：使用了模板且有文档链接和截图，但问题描述部分未填写实际内容。
  - 原文依据：
    - `llwy0320`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3776    - [关联PR #8747（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8747)    - [关联PR #8749（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8749)
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 58分
  - 痛点原因：问题描述含代码片段且定位精确，但环境、复现步骤、日志等必填模板均为空。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
#### PP-13 分流仅分配无标签分类（I1 · 分配与首次响应）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅机器人打标签且人工直接关闭，全程无任何技术分析与解答，导致无实质回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：仅有反复的指派操作和机器人通知，始终无人提供实质性的技术解答或问题排查。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅有分配负责人的指令操作，未对缺陷问题提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：被指派人仅完成分配，始终未对该精度错误缺陷提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 0分
  - 痛点原因：被指派人仅尝试关闭issue且被机器人拦截，全程未对缺陷提供任何实质性解答或处理说明。
  - 原文依据：
    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `weihao18`：closed from codehub
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：维护者仅发送关闭指令便直接关闭了该 issue，全程未提供任何实质性解答。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：首次响应仅为人员指派与流转，未提供任何针对缺陷的技术确认或排查等实质内容。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅通过机器人分配了负责人，未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅有3.8小时内的指派操作，被指派人始终未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：仅有任务分配和模板回复，未针对算子报错提供实质性技术解答。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire
#### PP-14 首次实质性响应完全缺失（I1 · 分配与首次响应）

- **[#3790](https://gitcode.com/cann/ops-transformer/issues/3790) grouped_matmul_swiglu_quant_v2 MXFP4 dtype校验需按weight format区分ND/NZ** — 0分
  - 痛点原因：仅机器人打标签且人工直接关闭，全程无任何技术分析与解答，导致无实质回应。
  - 原文依据：
    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `jayshu`：changed custom state from 进行中 to 已完成    - `jayshu`：closed from codehub    - [关联PR #8787（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8787)
- **[#3757](https://gitcode.com/cann/ops-transformer/issues/3757) [Bug-Report|缺陷反馈]: examples/fast_kernel_launch_example FA test脚本执行失败** — 0分
  - 痛点原因：仅有反复的指派操作和机器人通知，始终无人提供实质性的技术解答或问题排查。
  - 原文依据：
    - `weihao18`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `cann-robot`：### Notice This issue is already assigned to ***L_Euler***. Please do not assign repeatedly.    - `cann-robot`：assigned to @monologue815    - `weihao18`：assigned to @L_Euler    - `weihao18`：unassigned @monologue815    - `L_Euler`：assigned to @wangwei_
- **[#3749](https://gitcode.com/cann/ops-transformer/issues/3749) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到add运算，导致精度错误** — 0分
  - 痛点原因：仅有分配负责人的指令操作，未对缺陷问题提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3744](https://gitcode.com/cann/ops-transformer/issues/3744) [Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误** — 0分
  - 痛点原因：被指派人仅完成分配，始终未对该精度错误缺陷提供任何实质性回复。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3739](https://gitcode.com/cann/ops-transformer/issues/3739) [Bug-Report|缺陷反馈]: torch_extension ops/__init__.py 缺少 mhc_post_backward 和 mhc_p…** — 0分
  - 痛点原因：被指派人仅尝试关闭issue且被机器人拦截，全程未对缺陷提供任何实质性解答或处理说明。
  - 原文依据：
    - `weihao18`：/assign [@xuejinghui](https://gitcode.com/xuejinghui)    - `xuejinghui`：/close    - `cann-robot`：### Notice [@xuejinghui](https://gitcode.com/xuejinghui) , you can't close an issue unless you are the author of it or …    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuejinghui    - `weihao18`：closed from codehub
- **[#3738](https://gitcode.com/cann/ops-transformer/issues/3738) test issue** — 0分
  - 痛点原因：维护者仅发送关闭指令便直接关闭了该 issue，全程未提供任何实质性解答。
  - 原文依据：
    - `PerrySkywalker`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3737](https://gitcode.com/cann/ops-transformer/issues/3737) [Bug-Report|缺陷反馈]: mega_moe 算子 JIT 编译未做延迟加载，导致 import 时就被触发** — 0分
  - 痛点原因：首次响应仅为人员指派与流转，未提供任何针对缺陷的技术确认或排查等实质内容。
  - 原文依据：
    - `haijie_699874`：执行flash attn算子时发现也会编译mega moe，请麻烦帮忙处理    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `cann-robot`：assigned to @lyt_claire    - `weihao18`：assigned to @zhuxueling    - `zhuxueling`：closed from codehub    - [关联PR #8894（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8894)
- **[#3731](https://gitcode.com/cann/ops-transformer/issues/3731) [Bug-Report|缺陷反馈]: block_sparse_attention，对pregTailN后无效位置取值最小值处理有问题** — 0分
  - 痛点原因：仅通过机器人分配了负责人，未提供任何实质性的技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3729](https://gitcode.com/cann/ops-transformer/issues/3729) [Bug-Report|缺陷反馈]: block_sparse_attention使用未赋值参数，会导致除0操作** — 0分
  - 痛点原因：仅有3.8小时内的指派操作，被指派人始终未提供任何实质性技术回应。
  - 原文依据：
    - `weihao18`：/assign [@monologue815](https://gitcode.com/monologue815)    - `cann-robot`：assigned to @monologue815
- **[#3725](https://gitcode.com/cann/ops-transformer/issues/3725) [Bug-Report|缺陷反馈]: megmoe算子 910b运行报错** — 0分
  - 痛点原因：仅有任务分配和模板回复，未针对算子报错提供实质性技术解答。
  - 原文依据：
    - `weihao18`：/assign [@lyt_claire](https://gitcode.com/lyt_claire)    - `lyt_claire`：>Thanks for sending an issue! Please fill in the following template to help quickly solve your problem. > >### Describe…    - `cann-robot`：assigned to @lyt_claire

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后48小时无assignee评论 |
| 具体动作 | 配置自动提醒Bot向assignee发送跟进通知 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 5.7，低分 14/14 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 46.1，低分 9/14 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，但修复已合并需求较低。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护团队；候选负责人 `weihao18` |
| 触发条件 | Bot assign后48小时无assignee回复 |
| 具体动作 | 自动@assignee提醒跟进并设置72小时超时升级标记 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 47.1，低分 7/14 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 13.7，低分 14/14 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | weihao18迅速定位根因并创建修复PR，讨论虽简短但直接推动至解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护团队；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后24小时无技术评论 |
| 具体动作 | Bot自动发送讨论引导模板，提示assignee提供初步分析或排查计划 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 47.1，低分 7/14 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 13.7，低分 14/14 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | weihao18迅速定位根因并创建修复PR，讨论虽简短但直接推动至解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-04 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-04 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | Issue准备关闭时 |
| 具体动作 | 强制要求填写关闭总结模板（根因/修复方案/复用建议） |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 50 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 5.7，低分 14/14 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 46.1，低分 9/14 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，但修复已合并需求较低。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-05 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-05 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | Issue创建时根据标题模板自动识别类型 |
| 具体动作 | 配置Bot自动添加类型标签（bug/feature/discussion等） |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 90 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 5.7，低分 14/14 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 46.1，低分 9/14 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，但修复已合并需求较低。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-06 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-06 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区PMC/维护团队；候选负责人 `weihao18` |
| 触发条件 | 收到晋升申请类issue |
| 具体动作 | 建立标准审批流程模板，指定审批责任人，设定审批时限（如7个工作日） |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 47.1，低分 7/14 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 13.7，低分 14/14 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | weihao18迅速定位根因并创建修复PR，讨论虽简短但直接推动至解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-07 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-07 |
| 影响环节 | 讨论与解决 |
| 承接方 | Bot/自动化流程；候选负责人 `weihao18` |
| 触发条件 | 维护者提供修复方案后72小时用户无回复 |
| 具体动作 | 自动@用户确认解决方案有效性，并提示7天后无回复将自动关闭 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 13.7，低分 14/14；OBJ_RESULT_FORMATION_TIMELINESS：均值 47.1，低分 7/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 47.1，低分 7/14 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 13.7，低分 14/14 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | weihao18迅速定位根因并创建修复PR，讨论虽简短但直接推动至解决。 | 明确下一步动作、阶段结论和推进记录 |

### REC-08 · 补齐 Issue 首帖信息

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-08 |
| 影响环节 | 创建 |
| 承接方 | 社区维护者/模板管理员；候选负责人 `weihao18` |
| 触发条件 | Issue创建提交时 |
| 具体动作 | 在Issue模板中为环境信息、复现步骤、日志章节添加必填校验（如GitHub Forms YAML格式或Bot预检查），阻止空必填项提交 |
| 目标 | 相关 OBJ 指标 提升至 80 以上 |
| 相关证据 | SUB_INPUT_QUALITY：LLM评分失败或缺失 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 内容为真实内部需求，无AI幻觉或虚假信息迹象。 | 减少AI生成的低质量和幻觉内容 |
| `SUB_INPUT_QUALITY` 输入质量 | LLM评分失败或缺失 | 补齐复现步骤、环境信息、日志代码和预期对比 |

### REC-09 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-09 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区治理负责人；候选负责人 `weihao18` |
| 触发条件 | Issue被assign后24小时内assignee无回复 |
| 具体动作 | Bot自动@assignee提醒并启动48小时SLA倒计时 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 60 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 28.6，低分 10/14 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 95.7，低分 0/14 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | weihao18通过/assign认领，bot完成分配，责任归属清晰且全程跟进。 | 明确责任人、候选负责人和下一步动作 |

### REC-10 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-10 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | 识别到治理类Issue（晋升/投票/提案） |
| 具体动作 | 自动添加governance标签并路由至专属审批看板 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 5.7，低分 14/14；OBJ_DECISION_TRANSPARENCY：均值 46.1，低分 9/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 5.7，低分 14/14 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 46.1，低分 9/14 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未明确说明后续反馈路径或重新开启条件，但修复已合并需求较低。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-11 · 补齐 Issue 首帖信息

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-11 |
| 影响环节 | 创建 |
| 承接方 | 社区维护者；候选负责人 `weihao18` |
| 触发条件 | Issue创建提交时 |
| 具体动作 | 配置Bot或平台规则，对正文少于20字符或仅含无意义词汇的Issue拒绝创建并提示用户补充有效内容 |
| 目标 | 相关 OBJ 指标 提升；相关低分样本降至 0 以下 |
| 相关证据 | SUB_INPUT_QUALITY：LLM评分失败或缺失 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 内容为真实内部需求，无AI幻觉或虚假信息迹象。 | 减少AI生成的低质量和幻觉内容 |
| `SUB_INPUT_QUALITY` 输入质量 | LLM评分失败或缺失 | 补齐复现步骤、环境信息、日志代码和预期对比 |

### REC-12 · 补齐 Issue 首帖信息

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-12 |
| 影响环节 | 创建 |
| 承接方 | Bot/自动化工具；候选负责人 `weihao18` |
| 触发条件 | Issue创建时检测到标题含分类前缀 |
| 具体动作 | Bot根据标题前缀（[Bug-Report]→bug、[Question]→question、[Documentation]→documentation）自动添加对应标签 |
| 目标 | 相关 OBJ 指标 提升至 95 以上 |
| 相关证据 | SUB_INPUT_QUALITY：LLM评分失败或缺失 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 内容为真实内部需求，无AI幻觉或虚假信息迹象。 | 减少AI生成的低质量和幻觉内容 |
| `SUB_INPUT_QUALITY` 输入质量 | LLM评分失败或缺失 | 补齐复现步骤、环境信息、日志代码和预期对比 |

### REC-13 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-13 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot配置负责人；候选负责人 `weihao18` |
| 触发条件 | Issue创建且标题匹配[Bug-Report]模式 |
| 具体动作 | Bot自动添加bug标签和对应模块标签 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 70 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 28.6，低分 10/14 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 95.7，低分 0/14 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | weihao18通过/assign认领，bot完成分配，责任归属清晰且全程跟进。 | 明确责任人、候选负责人和下一步动作 |

### REC-14 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P2 |
| 对应问题 | PP-14 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区治理负责人；候选负责人 `weihao18` |
| 触发条件 | Issue被assign时 |
| 具体动作 | Bot自动评论要求assignee在48小时内提供初步技术评估（复现确认/排查方向/预计修复时间） |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 60 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 28.6，低分 10/14；OBJ_RESPONSE_SPEED：均值 95.7，低分 0/14 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 28.6，低分 10/14 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 95.7，低分 0/14 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | weihao18通过/assign认领，bot完成分配，责任归属清晰且全程跟进。 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **78.9/100**，整体相对可控，但仍需关注：模板必填章节大面积留空。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.9 | 内容为真实内部需求，无AI幻觉或虚假信息迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 66.9 | LLM评分失败或缺失 |

代表低分 Issue：[#3738](https://gitcode.com/cann/ops-transformer/issues/3738)
问题：test issue。

### I1 · 分配与首次响应
本阶段分数为 **64.4/100**，整体相对可控，但仍需关注：Bot分配后人工接续断裂。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 28.6 | 均值 28.6，低分 10/14 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 95.7 | 均值 95.7，低分 0/14 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 72.4 | weihao18通过/assign认领，bot完成分配，责任归属清晰且全程跟进。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 63.0 | bot正确分配给weihao18，其定位根因并提交修复PR，分流路径正确。 |

代表低分 Issue：[#3738](https://gitcode.com/cann/ops-transformer/issues/3738)
问题：test issue。

### I2 · 讨论与解决
本阶段分数为 **36.8/100**，本阶段是本周短板之一，主要问题是：Bot分配后人工跟进完全断裂。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 47.1 | 均值 47.1，低分 7/14 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 13.7 | 均值 13.7，低分 14/14 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 44.1 | weihao18迅速定位根因并创建修复PR，讨论虽简短但直接推动至解决。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 48.8 | 编译报错问题通过合并修复PR得到解决，issue关闭为'已完成'。 |

代表低分 Issue：[#3744](https://gitcode.com/cann/ops-transformer/issues/3744)
问题：[Bug-Report|缺陷反馈]: block_sparse_attention中的尾数未参与到max运算，导致精度错误。

### I3 · 总结与关闭
本阶段分数为 **41.6/100**，本阶段需要改进，主要问题是：分配后人工跟进完全断裂。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 5.7 | 均值 5.7，低分 14/14 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 46.1 | 均值 46.1，低分 9/14 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 44.3 | 关闭时未明确说明后续反馈路径或重新开启条件，但修复已合并需求较低。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 86.3 | PR已合并后才关闭issue，并添加resolved和Accepted标签，无… |

代表低分 Issue：[#3772](https://gitcode.com/cann/ops-transformer/issues/3772)
问题：个人晋升Committer申请。

### G · Bot/Agent 治理
本阶段分数为 **69.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 42.1 | 均值 42.1，低分 6/14 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 100.0 | 均值 100.0，低分 0/14 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 62.0 | bot分配后weihao18完整承接，从定位到修复到关闭形成顺畅闭环。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 65.3 | bot执行assign和标签管理，帮助确立责任归属和流程状态，治理有效。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 72.4 | bot分配动作准确及时，标签添加合规，未误导或错误阻断流程。 |

代表低分 Issue：[#3738](https://gitcode.com/cann/ops-transformer/issues/3738)
问题：test issue。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-07-13_to_2026-07-19 | 109 | 42.2 | 首期基线 | 78.9 | 64.4 | 36.8 | 41.6 | 69.5 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **12 位社区响应者**贡献 **91 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `weihao18` | 80 |
| `yolic` | 1 |
| `xiu_ling_wang` | 1 |
| `jiang-lirui` | 1 |
| `chenjunjian11` | 1 |

Top1 响应占比 **87.9%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-07-13_to_2026-07-19 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：92.1/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-transformer/report_cann-ops-transformer_2026-07-13_to_2026-07-19.json`。
