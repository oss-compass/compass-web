# Issue 贡献体验周报 · cann/ops-transformer

**周期：2026-06-22_to_2026-06-28**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-transformer` 共收到 **162** 个 Issue
+ 其中外部 Issue **40** 个、内部 **122** 个；I1–I3 及 G 基于「外部且成熟」的 **40** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 7 / Closed 155**，关闭率 **95.7%**。
+ 总体体验分为 **48.3/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 45.8 | 未解决即关闭，关闭理由失真 |
| P0 | I2 · 讨论与解决 | 56.4 | 要求补充后立即关闭未解决问题 |
| P0 | I1 · 分配与首次响应 | 68.2 | 要求补充信息后立即关闭 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 添加needs-info标签并保持open状态至少72小时，设置自动提醒而非直接关闭 |
| REC-02 | P0 | 添加needs-info标签并设置7天自动关闭计时器，而非立即关闭 |
| REC-03 | P0 | 将Issue标记为'awaiting-user-info'状态而非直接关闭，设置7天自动提醒 |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 162 |
| Open / Closed | 7 / 155 |
| 关闭率 | 95.7% |
| 类型构成 | 缺陷 57 / 需求 52 / 咨询 7 / 其他 46 |
| 总体体验分 | 48.3/100（D） |
| 首次响应时间 | 中位 1.4h；均值 14.5h |
| 关闭周期 | 中位 1.1天；均值 2.9天 |
| 7天响应率 | 97.5% |
| 评论数/Issue | 1.22 |
| 标签覆盖率 | 91.4% |
| 指派覆盖率 | 90.7% |
| 数据完整性 | 93.6/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 76.2 | 18/162（11.1%） | 相对可控 | `SUB_INPUT_QUALITY` 62.5 |
| I1 · 分配与首次响应 | 68.2 | 14/40（35.0%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 59.5 |
| I2 · 讨论与解决 | 56.4 | 23/40（57.5%） | P0 | `OBJ_SOLUTION_EVIDENCE` 27.5 |
| I3 · 总结与关闭 | 45.8 | 35/40（87.5%） | P0 | `OBJ_CLOSURE_REUSE` 18.5 |
| G · Bot/Agent 治理（参考） | 66.1 | 4/40（10.0%） | 参考项 | `OBJ_BOT_GOVERNANCE` 34.0 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I2 · 讨论与解决 | 要求补充后立即关闭未解决问题 | OBJ_SOLUTION_EVIDENCE：均值 27.5，低分 38/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 86.5，低分 2/40 | 用户文档问题悬而未决，关闭理由与实际矛盾，严重损害社区信任度和反馈意愿。 |
| PP-02 | P0 | I3 · 总结与关闭 | 未解决即关闭，关闭理由失真 | OBJ_CLOSURE_REUSE：均值 18.5，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 61.0，低分 13/40 | 用户问题被掩盖，重复提交率上升，社区信任度下降 |
| PP-03 | P0 | I1 · 分配与首次响应 | 要求补充信息后立即关闭 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 59.5，低分 16/40；OBJ_RESPONSE_SPEED：均值 78.0，低分 2/40 | 用户目标未达成，问题被无效关闭，严重损害用户体验和社区信任。 |
| PP-04 | P1 | I2 · 讨论与解决 | 开放Issue讨论停滞无实质推进 | OBJ_SOLUTION_EVIDENCE：均值 27.5，低分 38/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 86.5，低分 2/40 | 用户提交的申请或需求长期悬置，目标无法达成，社区活跃度与响应效率下降。 |
| PP-05 | P1 | I2 · 讨论与解决 | 讨论缺乏可验证的解决方案证据 | OBJ_SOLUTION_EVIDENCE：均值 27.5，低分 38/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 86.5，低分 2/40 | 关闭的Issue无法验证是否真正解决，知识无法复用，同类问题易重复出现。 |
| PP-06 | P1 | I3 · 总结与关闭 | 关闭无方案证据与知识沉淀 | OBJ_CLOSURE_REUSE：均值 18.5，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 61.0，低分 13/40 | 同类问题无法复用经验，社区知识库空洞，新贡献者无法自学 |
| PP-07 | P1 | I1 · 分配与首次响应 | 首次响应时延长尾严重 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 59.5，低分 16/40；OBJ_RESPONSE_SPEED：均值 78.0，低分 2/40 | 用户长时间等待无反馈，问题积压影响社区响应体验和满意度。 |
| PP-08 | P1 | I0 · 创建 | 文档反馈Issue批量模糊提交 | SUB_INPUT_QUALITY：有结构化章节和详细设计方案，但作为需求建议缺少环境与预期对比信息。 | 维护者无法定位问题，要求补充后直接关闭，用户目标未达成且浪费分流成本 |
| PP-09 | P2 | I2 · 讨论与解决 | Bot标签操作时机不当产生矛盾状态 | OBJ_SOLUTION_EVIDENCE：均值 27.5，低分 38/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 86.5，低分 2/40 | Issue状态元数据不一致，影响自动化流程准确性和社区成员对Issue状态的判断。 |
| PP-10 | P2 | I3 · 总结与关闭 | 开放Issue停滞无结论路径 | OBJ_CLOSURE_REUSE：均值 18.5，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 61.0，低分 13/40 | 用户等待无果，贡献者晋升等关键流程卡顿，社区活跃度受损 |
| PP-11 | P2 | I1 · 分配与首次响应 | 路由分类与责任归属缺失 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 59.5，低分 16/40；OBJ_RESPONSE_SPEED：均值 78.0，低分 2/40 | 处理路径不可追溯，责任无法明确到人，影响后续同类问题的分流效率。 |
| PP-12 | P2 | I0 · 创建 | 模板必填字段缺乏强制校验 | SUB_INPUT_QUALITY：有结构化章节和详细设计方案，但作为需求建议缺少环境与预期对比信息。 | 创建的Issue信息不完整，增加分流和处理成本，部分Issue因信息不足被过早关闭 |

### 4.1 低分 Issue 明细

#### PP-01 要求补充后立即关闭未解决问题（I2 · 讨论与解决）

- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅存在人员指派和+1投票，未提供任何关联PR、代码提交或文档链接等实质性产出证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭说明、文档更新或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭评论、commit引用及文档链接等明确解决证据。
  - 原文依据：
    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：仅由机器人关联PR并自动关闭，无commit引用、文档链接及release引用等实质性解决证据支撑。
  - 原文依据：
    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：仅靠机器人根据PR合并自动关闭，无commit引用、文档链接、release记录及人工总结评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：虽关联多个已合并PR，但issue内无commit、文档或release链接，也无关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：虽有关联PR被合并，但仅由机器人自动关闭并打标签，缺乏人类关闭评论及commit、文档等直接解决证据。
  - 原文依据：
    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 15分
  - 痛点原因：仅停留在讨论和例会邀请阶段，无关联PR、commit引用或release等实际代码层面的解决证据。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 23分
  - 痛点原因：缺乏已合并的commit、文档或release等实质性修复落地证据，仅有关联PR和口头承诺。
  - 原文依据：
    - [关联PR #8505（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8505)    - [关联PR #8506（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8506)    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `huang-wei-chen`：closed from codehub
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 23分
  - 痛点原因：未关联PR或代码提交，且讨论结论表明当前仓库无法解决需依赖其他组件，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …    - `wanker`：当前投片验证debug需要算子的.s汇编文件定界问题，从而找对应组件解决问题，但目前得到汇编文件的两个渠道全部失效：编译加dump cce不产生.s汇编文件；同时llvm-objdump也无法反汇编得到汇编指令 1. <span styl…    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 23分
  - 痛点原因：仅靠机器人因关联其他issue合并自动关闭，缺乏commit引用和文档链接等直接解决证据，证据链弱。
  - 原文依据：
    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 23分
  - 痛点原因：仅口头回复不支持且无替代方案，未提供任何PR、代码或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？    - `L_Euler`：310P MLA的替代方案，当前暂时没有。    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 23分
  - 痛点原因：仅通过评论口头解答后直接关闭，无关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…    - `fengqiuyue`：已咨询asc-devkit仓    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 23分
  - 痛点原因：关闭时仅口头说明更新代码后不复现，未关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 23分
  - 痛点原因：仅通过评论声称问题已解决并关闭，未提供关联PR、代码提交或文档链接等实质性证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 23分
  - 痛点原因：仅评论讨论了技术细节与性能影响，缺乏关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…    - `macech`：对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，我…    - `qq_40734045`：>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，…    - `macech`：>>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题…
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 23分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接等修复证据，仅凭评论称是客户问题便直接关闭。
  - 原文依据：
    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len    - `wxhhuawei`：问题已经解决，通过profling分析是客户问题    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 31分
  - 痛点原因：仅通过外部文档链接解答疑问，无关联PR和commit引用，缺乏代码层面的实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 31分
  - 痛点原因：虽有关联PR合并及机器人自动关闭，但缺乏人工关闭评论、文档链接与release引用等强证据支撑。
  - 原文依据：
    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 31分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工确认解决的评论、版本发布引用及文档说明等强证据。
  - 原文依据：
    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，关闭评论仅为机器人自动触发，缺乏人工解决说明与验证证据。
  - 原文依据：
    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 38分
  - 痛点原因：未系统关联修复PR或commit，仅靠评论提及链接并用命令关闭，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何修复PR或commit，且因未附具体问题被直接作为无效issue关闭，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：无关联PR与commit引用等实质修改证据，仅因信息不足被直接关闭并标记完成，无法证明已解决。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未补充具体问题被作为无效issue关闭，且无关联PR或commit引用，缺乏实际修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：未关联PR或commit，仅由维护者直接关闭并标记完成，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何PR或commit，缺乏代码层面的修复证据，且被直接关闭，未体现实质性的解决过程。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @shi-rui
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：关闭时未关联任何PR或commit，且在要求补充具体问题后直接关闭，缺乏实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未附具体问题被作为无效issue关闭，且无关联PR与commit引用，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit和release引用，关闭时仅口头确认修复，证据链不完整。
  - 原文依据：
    - [关联PR #8061（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8061)    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和release引用，仅靠机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #7789（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7789)    - [关联PR #7790（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7790)    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 38分
  - 痛点原因：缺少关联PR与commit引用等代码修复证据，仅凭文档说明并直接关闭，缺乏实质解决证明。
  - 原文依据：
    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @Bugslover
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 38分
  - 痛点原因：仅口头说明已适配上库并关闭，未关联PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 38分
  - 痛点原因：虽关联PR已合并，但无commit引用与release说明，且评论显示文档仍待同步更新，缺乏最终闭环证据。
  - 原文依据：
    - [关联PR #5241（merged）](https://gitcode.com/Ascend/op-plugin/merge_requests/5241)    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.    - `Le_666`：代码仓中v3资料已更新，待AscendC文档同步更新    - `huang-chuhong`：/assign [@Le_666](https://gitcode.com/Le_666)    - `Le_666`：closed from codehub
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 54分
  - 痛点原因：无关联PR等实质修复证据，仅停留在依赖缺失的讨论，且提问者最后仍索要算子示例未形成闭环。
  - 原文依据：
    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf    - `ni-zhihao`：有没有这个mega_moe算子的调用示例，这个算子也没有aclnn的调用示例，想找一个调用的脚本（aclnn或者python都可以）参考一下    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `ni-zhihao`：/close
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 54分
  - 痛点原因：无关联PR或文档等实质性修复证据，维护者仅建议自行排查便关闭了issue。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查    - `SH_jingsong`：您好，由于您提的问题已转，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
#### PP-02 未解决即关闭，关闭理由失真（I3 · 总结与关闭）

- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 0分
  - 痛点原因：关闭时未补充任何说明文字，缺乏最终结论，导致无法为后续类似问题提供复用价值。
  - 原文依据：
    - `zjun0`：add label requirement    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `cann-robot`：assigned to @hblnb
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 0分
  - 痛点原因：关闭说明为0字，未总结问题结论与解决方案，导致其他用户无法直接复用排查经验。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：关闭说明为空，无方案文档化与重复主链接，仅由机器人自动关闭并打标签，未留下任何可复用知识。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅包含人员分配与+1，无方案文档、无dup链接且关闭说明为空，未沉淀任何可复用信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭说明与方案文档，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：关闭说明为0字，无方案文档与dup主链接，仅由机器人自动关闭，未留下任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：关闭说明为0字，仅由机器人随PR合并自动关闭，未沉淀方案文档或复用链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明、方案文档及复用链接，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人随PR合并自动关闭，缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 0分
  - 痛点原因：维护者称无法复现并索要日志后，机器人直接关闭该 issue，未沉淀任何解决方案或排查结论，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 0分
  - 痛点原因：仅口头说明功能已上库，未提供代码链接或方案文档，导致其他用户无法追溯与复用。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `cann-robot`：assigned to @macech
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 0分
  - 痛点原因：关闭说明仅48字且无方案文档化，仅靠状态流转和打标签关闭，未沉淀可供复用的解答。
  - 原文依据：
    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 0分
  - 痛点原因：仅以更新代码后不复现为由关闭，未提供根因分析、有效解决方案及文档沉淀，导致后续遇到同类问题无法复用。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，无方案文档化，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 0分
  - 痛点原因：关闭说明仅21字，未沉淀具体解决方案或文档链接，无法供他人复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与dup主链接，仅靠机器人自动关闭，未留下任何可供复用的经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人自动关闭并关联PR，未沉淀任何可供后续复用的经验或链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人随PR合并自动关闭，未留下任何可复用的经验总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 0分
  - 痛点原因：关闭说明仅11字且无方案文档与复现链接，未留存任何排查过程或解决方案供后续复用。
  - 原文依据：
    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len
- **[#3358](https://gitcode.com/cann/ops-transformer/issues/3358) [Bug-Report|缺陷反馈]: 950PR torch_npu.npu_moe_finalize_routing()失败** — 25分
  - 痛点原因：问题未复现且仅以容器环境问题草草关闭，无具体排查过程与方案文档沉淀，导致他人无法参考复用。
  - 原文依据：
    - `yangchao888`：closed from codehub    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `guoqiuhao`：[@yangchao888](https://gitcode.com/yangchao888) 你好，根据你提供的shape数据未能复现错误。 根据提供的错误信息，能否先检查下算子二进制是否正确安装    - `yangchao888`：容器环境问题    - `cann-robot`：assigned to @guoqiuhao
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 25分
  - 痛点原因：关闭时无方案文档沉淀与重复链接，关闭说明简略且仅简单标记完成，导致后续无法复用。
  - 原文依据：
    - `huang-wei-chen`：closed from codehub    - `huang-wei-chen`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 25分
  - 痛点原因：关闭说明仅口头指路并提供简单参数，无方案文档与代码链接，缺乏可复用的实操细节。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub    - `wanker`：add label requirement    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 25分
  - 痛点原因：仅由机器人自动关闭且无方案文档与主链接，关闭说明简短，未沉淀有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 25分
  - 痛点原因：关闭说明仅留提问者关于不支持该功能的回复，无方案文档化与主链接关联，导致后续无法复用结论。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 25分
  - 痛点原因：关闭说明仅56字且无方案文档与主链接，仅记录状态流转，未沉淀解决方案或根因分析供他人复用。
  - 原文依据：
    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 30分
  - 痛点原因：关闭说明仅50字且仅以关联合并为由关闭，无具体解决方案与dup主链接，难以供他人复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：assigned to @duxinlei    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 30分
  - 痛点原因：关闭说明仅50字且多为机器人自动操作，缺乏人工对问题根因与解决方案的详细记录，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅29字且仅要求补充具体问题，未沉淀有效解决方案或关联重复链接，缺乏复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅要求补充信息并作为无效issue关闭，未提供实质性解决方案，缺乏后续参考意义。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：仅因未附具体问题被作无效关闭，关闭说明简短且未沉淀任何具体问题定位或解决方案，无法供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 30分
  - 痛点原因：关闭说明仅要求补充具体问题，未提供解决方案或修复链接，缺乏后续参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @shi-rui
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 30分
  - 痛点原因：关闭说明仅46字且无主链接，虽有方案文档化但缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 30分
  - 痛点原因：关闭说明仅48字且由机器人直接关闭，缺乏人工补充的根因分析与解决方案总结，难以供他人复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 30分
  - 痛点原因：关闭说明仅41字且仅靠加标签和状态流转关闭，未提供文档更新结果或链接，难以复用。
  - 原文依据：
    - `Le_666`：closed from codehub    - `Le_666`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 45分
  - 痛点原因：关闭时未沉淀方案文档，也未关联重复issue，缺乏可供其他用户复用的解答经验。
  - 原文依据：
    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 55分
  - 痛点原因：关闭说明仅52字且多为系统操作，缺乏对文档修复方案及复用信息的详细描述，导致复用价值不足。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @guoqiuhao
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：因未附具体问题被作无效issue关闭，关闭说明未记录具体错误或解决方案，缺乏复用参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：关闭说明仅54字且多为机械操作，无重复链接，指派成员失败被拦截，缺乏人工处理总结，难以供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 55分
  - 痛点原因：关闭说明仅56字且未提供修复提交或主issue链接，仅简单陈述已修复，缺乏根因分析与具体修复细节。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：assigned to @weihao18
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 55分
  - 痛点原因：关闭说明过短仅52字，仅记录状态变更与来源，缺乏详细解决方案与重复链接。
  - 原文依据：
    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `cann-robot`：assigned to @Bugslover
#### PP-03 要求补充信息后立即关闭（I1 · 分配与首次响应）

- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 0分
  - 痛点原因：维护者仅分配任务和打标签，未对文档公式问题进行任何实质性解答，最终由机器人随MR合并直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 0分
  - 痛点原因：首次响应超时，且后续仅有分配和加标签等机械操作，全程无任何实质性解答。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6    - `macech`：unassigned @macech
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：全程仅由机器人加标签并关闭，虽关联PR已合并但无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 0分
  - 痛点原因：仅存在分配失败与打标签的机械操作，全程无人工实质技术回应且被直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅机器人加标签并随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅有人工加标签及机器人因PR合并自动关闭，全程无任何人工实质性技术回应。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：因关联PR合入被机器人自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人打标签并随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随MR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：全程仅机器人自动打标签并随PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 20分
  - 痛点原因：首次响应仅为模板指派，实质性技术解答耗时长达415.73小时，严重超出时效要求。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 40分
  - 痛点原因：从首次响应到确认问题并给出处理方案耗时近295小时，导致回应严重滞后。
  - 原文依据：
    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @yu-xinjie62    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 40分
  - 痛点原因：经多次指派流转，维护者耗时约263小时才完成本地复现并给出问题根因，导致回应严重超时。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题    - `kknan`：原始脚本在hif8场景未传入scale，导致跑的不是目标场景。 已同步正确的hif8测试方式给相关同学。    - `kknan`：/close    - `cann-robot`：add label Accepted
#### PP-04 开放Issue讨论停滞无实质推进（I2 · 讨论与解决）

- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅存在人员指派和+1投票，未提供任何关联PR、代码提交或文档链接等实质性产出证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭说明、文档更新或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭评论、commit引用及文档链接等明确解决证据。
  - 原文依据：
    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：仅由机器人关联PR并自动关闭，无commit引用、文档链接及release引用等实质性解决证据支撑。
  - 原文依据：
    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：仅靠机器人根据PR合并自动关闭，无commit引用、文档链接、release记录及人工总结评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：虽关联多个已合并PR，但issue内无commit、文档或release链接，也无关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：虽有关联PR被合并，但仅由机器人自动关闭并打标签，缺乏人类关闭评论及commit、文档等直接解决证据。
  - 原文依据：
    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 15分
  - 痛点原因：仅停留在讨论和例会邀请阶段，无关联PR、commit引用或release等实际代码层面的解决证据。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 23分
  - 痛点原因：缺乏已合并的commit、文档或release等实质性修复落地证据，仅有关联PR和口头承诺。
  - 原文依据：
    - [关联PR #8505（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8505)    - [关联PR #8506（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8506)    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `huang-wei-chen`：closed from codehub
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 23分
  - 痛点原因：未关联PR或代码提交，且讨论结论表明当前仓库无法解决需依赖其他组件，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …    - `wanker`：当前投片验证debug需要算子的.s汇编文件定界问题，从而找对应组件解决问题，但目前得到汇编文件的两个渠道全部失效：编译加dump cce不产生.s汇编文件；同时llvm-objdump也无法反汇编得到汇编指令 1. <span styl…    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 23分
  - 痛点原因：仅靠机器人因关联其他issue合并自动关闭，缺乏commit引用和文档链接等直接解决证据，证据链弱。
  - 原文依据：
    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 23分
  - 痛点原因：仅口头回复不支持且无替代方案，未提供任何PR、代码或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？    - `L_Euler`：310P MLA的替代方案，当前暂时没有。    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 23分
  - 痛点原因：仅通过评论口头解答后直接关闭，无关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…    - `fengqiuyue`：已咨询asc-devkit仓    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 23分
  - 痛点原因：关闭时仅口头说明更新代码后不复现，未关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 23分
  - 痛点原因：仅通过评论声称问题已解决并关闭，未提供关联PR、代码提交或文档链接等实质性证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 23分
  - 痛点原因：仅评论讨论了技术细节与性能影响，缺乏关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…    - `macech`：对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，我…    - `qq_40734045`：>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，…    - `macech`：>>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题…
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 23分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接等修复证据，仅凭评论称是客户问题便直接关闭。
  - 原文依据：
    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len    - `wxhhuawei`：问题已经解决，通过profling分析是客户问题    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 31分
  - 痛点原因：仅通过外部文档链接解答疑问，无关联PR和commit引用，缺乏代码层面的实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 31分
  - 痛点原因：虽有关联PR合并及机器人自动关闭，但缺乏人工关闭评论、文档链接与release引用等强证据支撑。
  - 原文依据：
    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 31分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工确认解决的评论、版本发布引用及文档说明等强证据。
  - 原文依据：
    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，关闭评论仅为机器人自动触发，缺乏人工解决说明与验证证据。
  - 原文依据：
    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 38分
  - 痛点原因：未系统关联修复PR或commit，仅靠评论提及链接并用命令关闭，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何修复PR或commit，且因未附具体问题被直接作为无效issue关闭，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：无关联PR与commit引用等实质修改证据，仅因信息不足被直接关闭并标记完成，无法证明已解决。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未补充具体问题被作为无效issue关闭，且无关联PR或commit引用，缺乏实际修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：未关联PR或commit，仅由维护者直接关闭并标记完成，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何PR或commit，缺乏代码层面的修复证据，且被直接关闭，未体现实质性的解决过程。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @shi-rui
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：关闭时未关联任何PR或commit，且在要求补充具体问题后直接关闭，缺乏实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未附具体问题被作为无效issue关闭，且无关联PR与commit引用，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit和release引用，关闭时仅口头确认修复，证据链不完整。
  - 原文依据：
    - [关联PR #8061（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8061)    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和release引用，仅靠机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #7789（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7789)    - [关联PR #7790（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7790)    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 38分
  - 痛点原因：缺少关联PR与commit引用等代码修复证据，仅凭文档说明并直接关闭，缺乏实质解决证明。
  - 原文依据：
    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @Bugslover
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 38分
  - 痛点原因：仅口头说明已适配上库并关闭，未关联PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 38分
  - 痛点原因：虽关联PR已合并，但无commit引用与release说明，且评论显示文档仍待同步更新，缺乏最终闭环证据。
  - 原文依据：
    - [关联PR #5241（merged）](https://gitcode.com/Ascend/op-plugin/merge_requests/5241)    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.    - `Le_666`：代码仓中v3资料已更新，待AscendC文档同步更新    - `huang-chuhong`：/assign [@Le_666](https://gitcode.com/Le_666)    - `Le_666`：closed from codehub
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 54分
  - 痛点原因：无关联PR等实质修复证据，仅停留在依赖缺失的讨论，且提问者最后仍索要算子示例未形成闭环。
  - 原文依据：
    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf    - `ni-zhihao`：有没有这个mega_moe算子的调用示例，这个算子也没有aclnn的调用示例，想找一个调用的脚本（aclnn或者python都可以）参考一下    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `ni-zhihao`：/close
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 54分
  - 痛点原因：无关联PR或文档等实质性修复证据，维护者仅建议自行排查便关闭了issue。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查    - `SH_jingsong`：您好，由于您提的问题已转，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
#### PP-05 讨论缺乏可验证的解决方案证据（I2 · 讨论与解决）

- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅存在人员指派和+1投票，未提供任何关联PR、代码提交或文档链接等实质性产出证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭说明、文档更新或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭评论、commit引用及文档链接等明确解决证据。
  - 原文依据：
    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：仅由机器人关联PR并自动关闭，无commit引用、文档链接及release引用等实质性解决证据支撑。
  - 原文依据：
    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：仅靠机器人根据PR合并自动关闭，无commit引用、文档链接、release记录及人工总结评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：虽关联多个已合并PR，但issue内无commit、文档或release链接，也无关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：虽有关联PR被合并，但仅由机器人自动关闭并打标签，缺乏人类关闭评论及commit、文档等直接解决证据。
  - 原文依据：
    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 15分
  - 痛点原因：仅停留在讨论和例会邀请阶段，无关联PR、commit引用或release等实际代码层面的解决证据。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 23分
  - 痛点原因：缺乏已合并的commit、文档或release等实质性修复落地证据，仅有关联PR和口头承诺。
  - 原文依据：
    - [关联PR #8505（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8505)    - [关联PR #8506（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8506)    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `huang-wei-chen`：closed from codehub
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 23分
  - 痛点原因：未关联PR或代码提交，且讨论结论表明当前仓库无法解决需依赖其他组件，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …    - `wanker`：当前投片验证debug需要算子的.s汇编文件定界问题，从而找对应组件解决问题，但目前得到汇编文件的两个渠道全部失效：编译加dump cce不产生.s汇编文件；同时llvm-objdump也无法反汇编得到汇编指令 1. <span styl…    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 23分
  - 痛点原因：仅靠机器人因关联其他issue合并自动关闭，缺乏commit引用和文档链接等直接解决证据，证据链弱。
  - 原文依据：
    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 23分
  - 痛点原因：仅口头回复不支持且无替代方案，未提供任何PR、代码或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？    - `L_Euler`：310P MLA的替代方案，当前暂时没有。    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 23分
  - 痛点原因：仅通过评论口头解答后直接关闭，无关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…    - `fengqiuyue`：已咨询asc-devkit仓    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 23分
  - 痛点原因：关闭时仅口头说明更新代码后不复现，未关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 23分
  - 痛点原因：仅通过评论声称问题已解决并关闭，未提供关联PR、代码提交或文档链接等实质性证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 23分
  - 痛点原因：仅评论讨论了技术细节与性能影响，缺乏关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…    - `macech`：对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，我…    - `qq_40734045`：>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，…    - `macech`：>>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题…
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 23分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接等修复证据，仅凭评论称是客户问题便直接关闭。
  - 原文依据：
    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len    - `wxhhuawei`：问题已经解决，通过profling分析是客户问题    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 31分
  - 痛点原因：仅通过外部文档链接解答疑问，无关联PR和commit引用，缺乏代码层面的实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 31分
  - 痛点原因：虽有关联PR合并及机器人自动关闭，但缺乏人工关闭评论、文档链接与release引用等强证据支撑。
  - 原文依据：
    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 31分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工确认解决的评论、版本发布引用及文档说明等强证据。
  - 原文依据：
    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，关闭评论仅为机器人自动触发，缺乏人工解决说明与验证证据。
  - 原文依据：
    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 38分
  - 痛点原因：未系统关联修复PR或commit，仅靠评论提及链接并用命令关闭，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何修复PR或commit，且因未附具体问题被直接作为无效issue关闭，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：无关联PR与commit引用等实质修改证据，仅因信息不足被直接关闭并标记完成，无法证明已解决。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未补充具体问题被作为无效issue关闭，且无关联PR或commit引用，缺乏实际修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：未关联PR或commit，仅由维护者直接关闭并标记完成，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何PR或commit，缺乏代码层面的修复证据，且被直接关闭，未体现实质性的解决过程。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @shi-rui
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：关闭时未关联任何PR或commit，且在要求补充具体问题后直接关闭，缺乏实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未附具体问题被作为无效issue关闭，且无关联PR与commit引用，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit和release引用，关闭时仅口头确认修复，证据链不完整。
  - 原文依据：
    - [关联PR #8061（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8061)    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和release引用，仅靠机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #7789（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7789)    - [关联PR #7790（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7790)    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 38分
  - 痛点原因：缺少关联PR与commit引用等代码修复证据，仅凭文档说明并直接关闭，缺乏实质解决证明。
  - 原文依据：
    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @Bugslover
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 38分
  - 痛点原因：仅口头说明已适配上库并关闭，未关联PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 38分
  - 痛点原因：虽关联PR已合并，但无commit引用与release说明，且评论显示文档仍待同步更新，缺乏最终闭环证据。
  - 原文依据：
    - [关联PR #5241（merged）](https://gitcode.com/Ascend/op-plugin/merge_requests/5241)    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.    - `Le_666`：代码仓中v3资料已更新，待AscendC文档同步更新    - `huang-chuhong`：/assign [@Le_666](https://gitcode.com/Le_666)    - `Le_666`：closed from codehub
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 54分
  - 痛点原因：无关联PR等实质修复证据，仅停留在依赖缺失的讨论，且提问者最后仍索要算子示例未形成闭环。
  - 原文依据：
    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf    - `ni-zhihao`：有没有这个mega_moe算子的调用示例，这个算子也没有aclnn的调用示例，想找一个调用的脚本（aclnn或者python都可以）参考一下    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `ni-zhihao`：/close
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 54分
  - 痛点原因：无关联PR或文档等实质性修复证据，维护者仅建议自行排查便关闭了issue。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查    - `SH_jingsong`：您好，由于您提的问题已转，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
#### PP-06 关闭无方案证据与知识沉淀（I3 · 总结与关闭）

- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 0分
  - 痛点原因：关闭时未补充任何说明文字，缺乏最终结论，导致无法为后续类似问题提供复用价值。
  - 原文依据：
    - `zjun0`：add label requirement    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `cann-robot`：assigned to @hblnb
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 0分
  - 痛点原因：关闭说明为0字，未总结问题结论与解决方案，导致其他用户无法直接复用排查经验。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：关闭说明为空，无方案文档化与重复主链接，仅由机器人自动关闭并打标签，未留下任何可复用知识。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅包含人员分配与+1，无方案文档、无dup链接且关闭说明为空，未沉淀任何可复用信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭说明与方案文档，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：关闭说明为0字，无方案文档与dup主链接，仅由机器人自动关闭，未留下任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：关闭说明为0字，仅由机器人随PR合并自动关闭，未沉淀方案文档或复用链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明、方案文档及复用链接，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人随PR合并自动关闭，缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 0分
  - 痛点原因：维护者称无法复现并索要日志后，机器人直接关闭该 issue，未沉淀任何解决方案或排查结论，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 0分
  - 痛点原因：仅口头说明功能已上库，未提供代码链接或方案文档，导致其他用户无法追溯与复用。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `cann-robot`：assigned to @macech
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 0分
  - 痛点原因：关闭说明仅48字且无方案文档化，仅靠状态流转和打标签关闭，未沉淀可供复用的解答。
  - 原文依据：
    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 0分
  - 痛点原因：仅以更新代码后不复现为由关闭，未提供根因分析、有效解决方案及文档沉淀，导致后续遇到同类问题无法复用。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，无方案文档化，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 0分
  - 痛点原因：关闭说明仅21字，未沉淀具体解决方案或文档链接，无法供他人复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与dup主链接，仅靠机器人自动关闭，未留下任何可供复用的经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人自动关闭并关联PR，未沉淀任何可供后续复用的经验或链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人随PR合并自动关闭，未留下任何可复用的经验总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 0分
  - 痛点原因：关闭说明仅11字且无方案文档与复现链接，未留存任何排查过程或解决方案供后续复用。
  - 原文依据：
    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len
- **[#3358](https://gitcode.com/cann/ops-transformer/issues/3358) [Bug-Report|缺陷反馈]: 950PR torch_npu.npu_moe_finalize_routing()失败** — 25分
  - 痛点原因：问题未复现且仅以容器环境问题草草关闭，无具体排查过程与方案文档沉淀，导致他人无法参考复用。
  - 原文依据：
    - `yangchao888`：closed from codehub    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `guoqiuhao`：[@yangchao888](https://gitcode.com/yangchao888) 你好，根据你提供的shape数据未能复现错误。 根据提供的错误信息，能否先检查下算子二进制是否正确安装    - `yangchao888`：容器环境问题    - `cann-robot`：assigned to @guoqiuhao
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 25分
  - 痛点原因：关闭时无方案文档沉淀与重复链接，关闭说明简略且仅简单标记完成，导致后续无法复用。
  - 原文依据：
    - `huang-wei-chen`：closed from codehub    - `huang-wei-chen`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 25分
  - 痛点原因：关闭说明仅口头指路并提供简单参数，无方案文档与代码链接，缺乏可复用的实操细节。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub    - `wanker`：add label requirement    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 25分
  - 痛点原因：仅由机器人自动关闭且无方案文档与主链接，关闭说明简短，未沉淀有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 25分
  - 痛点原因：关闭说明仅留提问者关于不支持该功能的回复，无方案文档化与主链接关联，导致后续无法复用结论。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 25分
  - 痛点原因：关闭说明仅56字且无方案文档与主链接，仅记录状态流转，未沉淀解决方案或根因分析供他人复用。
  - 原文依据：
    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 30分
  - 痛点原因：关闭说明仅50字且仅以关联合并为由关闭，无具体解决方案与dup主链接，难以供他人复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：assigned to @duxinlei    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 30分
  - 痛点原因：关闭说明仅50字且多为机器人自动操作，缺乏人工对问题根因与解决方案的详细记录，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅29字且仅要求补充具体问题，未沉淀有效解决方案或关联重复链接，缺乏复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅要求补充信息并作为无效issue关闭，未提供实质性解决方案，缺乏后续参考意义。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：仅因未附具体问题被作无效关闭，关闭说明简短且未沉淀任何具体问题定位或解决方案，无法供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 30分
  - 痛点原因：关闭说明仅要求补充具体问题，未提供解决方案或修复链接，缺乏后续参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @shi-rui
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 30分
  - 痛点原因：关闭说明仅46字且无主链接，虽有方案文档化但缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 30分
  - 痛点原因：关闭说明仅48字且由机器人直接关闭，缺乏人工补充的根因分析与解决方案总结，难以供他人复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 30分
  - 痛点原因：关闭说明仅41字且仅靠加标签和状态流转关闭，未提供文档更新结果或链接，难以复用。
  - 原文依据：
    - `Le_666`：closed from codehub    - `Le_666`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 45分
  - 痛点原因：关闭时未沉淀方案文档，也未关联重复issue，缺乏可供其他用户复用的解答经验。
  - 原文依据：
    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 55分
  - 痛点原因：关闭说明仅52字且多为系统操作，缺乏对文档修复方案及复用信息的详细描述，导致复用价值不足。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @guoqiuhao
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：因未附具体问题被作无效issue关闭，关闭说明未记录具体错误或解决方案，缺乏复用参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：关闭说明仅54字且多为机械操作，无重复链接，指派成员失败被拦截，缺乏人工处理总结，难以供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 55分
  - 痛点原因：关闭说明仅56字且未提供修复提交或主issue链接，仅简单陈述已修复，缺乏根因分析与具体修复细节。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：assigned to @weihao18
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 55分
  - 痛点原因：关闭说明过短仅52字，仅记录状态变更与来源，缺乏详细解决方案与重复链接。
  - 原文依据：
    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `cann-robot`：assigned to @Bugslover
#### PP-07 首次响应时延长尾严重（I1 · 分配与首次响应）

- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 0分
  - 痛点原因：维护者仅分配任务和打标签，未对文档公式问题进行任何实质性解答，最终由机器人随MR合并直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 0分
  - 痛点原因：首次响应超时，且后续仅有分配和加标签等机械操作，全程无任何实质性解答。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6    - `macech`：unassigned @macech
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：全程仅由机器人加标签并关闭，虽关联PR已合并但无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 0分
  - 痛点原因：仅存在分配失败与打标签的机械操作，全程无人工实质技术回应且被直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅机器人加标签并随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅有人工加标签及机器人因PR合并自动关闭，全程无任何人工实质性技术回应。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：因关联PR合入被机器人自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人打标签并随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随MR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：全程仅机器人自动打标签并随PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 20分
  - 痛点原因：首次响应仅为模板指派，实质性技术解答耗时长达415.73小时，严重超出时效要求。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 40分
  - 痛点原因：从首次响应到确认问题并给出处理方案耗时近295小时，导致回应严重滞后。
  - 原文依据：
    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @yu-xinjie62    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 40分
  - 痛点原因：经多次指派流转，维护者耗时约263小时才完成本地复现并给出问题根因，导致回应严重超时。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题    - `kknan`：原始脚本在hif8场景未传入scale，导致跑的不是目标场景。 已同步正确的hif8测试方式给相关同学。    - `kknan`：/close    - `cann-robot`：add label Accepted
#### PP-08 文档反馈Issue批量模糊提交（I0 · 创建）

- **[#3366](https://gitcode.com/cann/ops-transformer/issues/3366) [Documentation|文档反馈]: Compressor主线资料更新** — 0分
  - 痛点原因：仅包含指派和标签操作，未提供任何具体的文档反馈内容或更新需求，信息严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `wangss21`：closed from codehub
- **[#3345](https://gitcode.com/cann/ops-transformer/issues/3345) mc2公共代码存在潜在的资源泄露问题，打开了文件未关闭** — 15分
  - 痛点原因：正文仅含截图链接，无文字描述、复现步骤、环境信息或结构化章节
  - 原文依据：
    - `cann-robot`：add label resolved    - `chuguowei`：assigned to @chuguowei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3345    - [关联PR #6915（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6915)
- **[#3320](https://gitcode.com/cann/ops-transformer/issues/3320) [Question|问题咨询]: 修复自定义算子包安装问题** — 15分
  - 痛点原因：正文仅一句话描述问题，无复现步骤、环境、日志或预期对比，信息严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @mutex_lock    - `mutex_lock`：changed custom state from 进行中 to 已完成    - `mutex_lock`：closed from codehub    - [关联PR #7541（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7541)
- **[#3293](https://gitcode.com/cann/ops-transformer/issues/3293) MhcPreSinkhorn bug修复、batch一致性支持** — 15分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、日志或结构化章节，信息极度不足。
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3293    - [关联PR #7441（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7441)
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 15分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、预期或结构化章节。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3368](https://gitcode.com/cann/ops-transformer/issues/3368) [Bug-Report|缺陷反馈]: CleanCode 重复代码 冗余代码清理** — 20分
  - 痛点原因：模板字段虽全但内容重复填充，无实质复现步骤或环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@gj18405655e4v](https://gitcode.com/gj18405655e4v)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @gj18405655e4v    - `gj18405655e4v`：closed from codehub    - `gj18405655e4v`：changed custom state from 进行中 to 已完成    - [关联PR #7646（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7646)
- **[#3337](https://gitcode.com/cann/ops-transformer/issues/3337) redundant code of FAG** — 20分
  - 痛点原因：正文仅6字，无复现步骤、环境、结构化章节，信息极不充分
  - 原文依据：
    - `huang-chuhong`：/assign [@DaiHuina1](https://gitcode.com/DaiHuina1)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @DaiHuina1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3337    - [关联PR #6641（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6641)
- **[#3258](https://gitcode.com/cann/ops-transformer/issues/3258) matmul_all_reduce算子编译时间优化** — 20分
  - 痛点原因：正文仅一句话，无复现步骤、环境、预期对比或结构化章节，信息极为简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chuguowei`：assigned to @chuguowei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3258    - [关联PR #7321（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7321)
- **[#3251](https://gitcode.com/cann/ops-transformer/issues/3251) flash_attention_score 部分文档和逻辑在9.1.0分支有问题修复** — 20分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、日志或结构化章节。
  - 原文依据：
    - `huang-chuhong`：/assign [@sky-zyh](https://gitcode.com/sky-zyh)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sky-zyh    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3251    - [关联PR #7352（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7352)
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 25分
  - 痛点原因：有模板和文档链接但问题描述极模糊，无具体错误示例、无复现步骤、无环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 25分
  - 痛点原因：有文档链接和模板章节，但无具体问题描述、复现步骤或预期对比。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 25分
  - 痛点原因：有文档链接但无具体问题描述，Existing Issues章节为空，信息严重不足
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @shi-rui    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3299](https://gitcode.com/cann/ops-transformer/issues/3299) 修复attention/common 一些vf重复代码** — 25分
  - 痛点原因：正文仅重复标题，无具体代码位置、重复范围或预期结果描述
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3299    - [关联PR #7468（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7468)    - [关联PR #7481（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7481)
- **[#3288](https://gitcode.com/cann/ops-transformer/issues/3288) [Requirement|需求建议]: 自定义算子包fusion pass不生效** — 25分
  - 痛点原因：模板存在但内容极简，无复现步骤、环境、日志或预期对比
  - 原文依据：
    - `huang-chuhong`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - `mutex_lock`：closed from codehub    - [关联PR #7385（open）](https://gitcode.com/cann/ops-transformer/merge_requests/7385)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 25分
  - 痛点原因：正文仅21字符与标题重复，无复现步骤、环境、结构化章节
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3254](https://gitcode.com/cann/ops-transformer/issues/3254) [Requirement|需求建议]: mqsmla & li_v2 & qli_v2 metadata 拦截和代码优化** — 25分
  - 痛点原因：模板填写但内容极少，背景仅重复标题，价值与设计部分均为空
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3254    - [关联PR #7346（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7346)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 25分
  - 痛点原因：正文仅重复标题17字，无任何细节、结构化章节或具体代码位置说明
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3343](https://gitcode.com/cann/ops-transformer/issues/3343) [Requirement|需求建议]: qliv2支持批跑** — 30分
  - 痛点原因：模板字段大量留空，背景仅一句话，缺少价值说明和设计方案
  - 原文依据：
    - `huang-chuhong`：/assign [@LZH_unofficial](https://gitcode.com/LZH_unofficial)    - `LZH_unofficial`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @LZH_unofficial    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3343    - [关联PR #7382（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7382)
- **[#3340](https://gitcode.com/cann/ops-transformer/issues/3340) [Requirement|需求建议]: 9.1.0分支删除qli_v2 metadata** — 30分
  - 痛点原因：模板章节存在但背景、价值、设计均为空，仅标题清晰，内容严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3340    - [关联PR #7488（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7488)
- **[#3339](https://gitcode.com/cann/ops-transformer/issues/3339) sfa重复代码修改** — 30分
  - 痛点原因：正文仅27字，无复现步骤、日志、预期对比或结构化章节，仅含基本描述与版本信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3339    - [关联PR #7582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7582)    - [关联PR #7584（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7584)
- **[#3283](https://gitcode.com/cann/ops-transformer/issues/3283) [Bug-Report|缺陷反馈]: mhc_pos_backward对输入n添加约束** — 30分
  - 痛点原因：所有必填字段填同一句标题文本，无真实复现步骤、环境细节或日志
  - 原文依据：
    - `huang-chuhong`：/assign [@fazhenyao123](https://gitcode.com/fazhenyao123)    - `fazhenyao123`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fazhenyao123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3283    - [关联PR #7093（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7093)
- **[#3234](https://gitcode.com/cann/ops-transformer/issues/3234) [Requirement|需求建议]: SMLAG算子torch接口与meta合并** — 30分
  - 痛点原因：模板章节存在但Benefit和Design均为空，背景仅重复标题，需求描述过于简陋。
  - 原文依据：
    - `hz36amy_00`：/assign    - `hz36amy_00`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hz36amy_00    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3234    - [关联PR #7231（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7231)
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有文档链接和结构化模板，但缺少具体问题描述，仅笼统说存在错误
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：add label Accepted    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有模板结构和文档链接，但未提供任何具体错误示例，问题描述过于笼统
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @macech    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有模板和文档链接，但无具体问题描述、复现步骤或环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @chaotang233    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有文档链接和问题分类但无具体错误描述，缺少复现步骤和预期对比
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：assigned to @monologue815    - `huang-chuhong`：assigned to @jiang-lirui    - `huang-chuhong`：assigned to @wangzhe123456789
- **[#3371](https://gitcode.com/cann/ops-transformer/issues/3371) [Documentation|文档反馈]: LI算子torch接口文档补充** — 35分
  - 痛点原因：模板字段全填同一句话，无复现步骤、环境信息或具体文档片段描述。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @guijianwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3371    - [关联PR #7699（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7699)    - [关联PR #7704（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7704)
- **[#3312](https://gitcode.com/cann/ops-transformer/issues/3312) [Requirement|需求建议]: 新增ascend950 causal_conv1d 算子** — 35分
  - 痛点原因：模板有结构化章节但Benefit和Design均为空，内容极简，仅背景一行。
  - 原文依据：
    - `huang-chuhong`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3312    - [关联PR #6870（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6870)
- **[#3309](https://gitcode.com/cann/ops-transformer/issues/3309) 修改vf重复代码** — 35分
  - 痛点原因：正文仅一句话描述重构意图，无具体文件路径、冗余变量清单或结构化章节。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3309    - [关联PR #7502（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7502)    - [关联PR #7513（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7513)
- **[#3301](https://gitcode.com/cann/ops-transformer/issues/3301) [Requirement|需求建议]: sliklg metadata算子 支持 A5；新增smlag metadata算子** — 35分
  - 痛点原因：模板章节存在但背景、价值、设计均为空，仅标题描述需求，内容过于简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3301    - [关联PR #7429（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7429)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 35分
  - 痛点原因：正文仅一句话与标题重复，无环境、步骤、结构化说明，信息量极低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3282](https://gitcode.com/cann/ops-transformer/issues/3282) [Requirement|需求建议]: log.cpp需要被编入 opapi.so** — 35分
  - 痛点原因：模板仅填背景，价值与设计章节均空，信息不完整。
  - 原文依据：
    - `Bugslover`：add label requirement    - `cann-robot`：add label resolved    - `Bugslover`：assigned to @Bugslover    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3282    - [关联PR #7414（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7414)
- **[#3242](https://gitcode.com/cann/ops-transformer/issues/3242) [Requirement|需求建议]: SLIKG算子torch接口与meta合并** — 35分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，仅一句话背景，信息不充分。
  - 原文依据：
    - `huang-chuhong`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3242    - [关联PR #7318（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7318)
- **[#3238](https://gitcode.com/cann/ops-transformer/issues/3238) [Requirement|需求建议]: err msg整改** — 35分
  - 痛点原因：模板有结构但内容极简，背景仅一句话，设计与价值部分空白
  - 原文依据：
    - `jerry_ming`：add label requirement    - `cann-robot`：add label resolved    - `jerry_ming`：assigned to @jerry_ming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3238    - [关联PR #7305（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7305)
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 40分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景信息仅一句话，不够充分。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3265](https://gitcode.com/cann/ops-transformer/issues/3265) [Requirement|需求建议]: A5 dispatch fullmeshv2 batch size 限制应放开到 512** — 40分
  - 痛点原因：模板章节存在但Benefit和Design为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhong-zixin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3265    - [关联PR #7244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7244)
- **[#3367](https://gitcode.com/cann/ops-transformer/issues/3367) [Requirement|需求建议]: 为MegaMoe新增ClampLimit功能** — 45分
  - 痛点原因：模板章节存在但Benefit和Design均为空，仅背景有一行描述
  - 原文依据：
    - `yangzeheng`：add label requirement    - `cann-robot`：add label resolved    - `yangzeheng`：assigned to @yangzeheng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3367    - [关联PR #6911（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6911)
- **[#3341](https://gitcode.com/cann/ops-transformer/issues/3341) qliv2 A5支持TND padding、returnValue、outputIdxOffset** — 45分
  - 痛点原因：模板有结构化章节但仅填写背景，价值与设计方案为空，信息不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3341    - [关联PR #7413（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7413)
- **[#3333](https://gitcode.com/cann/ops-transformer/issues/3333) ScatterPaKvCache aclnn文档描述需要修改** — 45分
  - 痛点原因：正文极简，仅指出文档有误未说明具体错误码或约束细节，缺乏结构化描述。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yu_qinfei`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3333    - [关联PR #7536（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7536)    - [关联PR #7613（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7613)
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 45分
  - 痛点原因：有结构化模板但Benefit和Design部分为空，内容极度简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3314](https://gitcode.com/cann/ops-transformer/issues/3314) [Bug-Report|缺陷反馈]: GMM A8W4 N非16对齐精度问题** — 45分
  - 痛点原因：模板字段齐全但内容极简，环境仅写A2 A3，日志填无，复现步骤仅一句话。
  - 原文依据：
    - `huang-chuhong`：/assign [@huang-jz](https://gitcode.com/huang-jz)    - `huang-jz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-jz    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3314    - [关联PR #7465（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7465)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 45分
  - 痛点原因：模板字段齐全但内容极简，复现步骤/预期/日志均填'无'，信息量不足。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3277](https://gitcode.com/cann/ops-transformer/issues/3277) [Bug-Report|缺陷反馈]: mlapo需要新增torch接口** — 45分
  - 痛点原因：有模板结构但复现步骤、预期结果、日志均填NA，实质内容不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@yolic](https://gitcode.com/yolic)    - `yolic`：/close    - `yolic`：add label bug-report    - `cann-robot`：assigned to @yolic    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3274](https://gitcode.com/cann/ops-transformer/issues/3274) [Requirement|需求建议]: 新增qli_v2 & li_v2 & mqsmla & smla metadata文档资料** — 45分
  - 痛点原因：模板结构存在但Benefit和Design章节留空，背景信息仅一句话，内容偏单薄。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3274    - [关联PR #7190（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7190)
- **[#3268](https://gitcode.com/cann/ops-transformer/issues/3268) [Bug-Report|缺陷反馈]: canndev仓依赖quant_lightning_indexer_v2_metadata导致编cann失败** — 45分
  - 痛点原因：模板字段齐全但内容高度重复，复现步骤仅一行版本号，实质信息不足。
  - 原文依据：
    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3268    - [关联PR #7391（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7391)
- **[#3246](https://gitcode.com/cann/ops-transformer/issues/3246) [Bug-Report|缺陷反馈]: GMMSwigluQuant 算子 mxfp4 weight nz error message整改** — 45分
  - 痛点原因：模板字段齐全但内容极简，无具体错误码、日志或详细复现步骤。
  - 原文依据：
    - `huang-chuhong`：/assign [@jayshu](https://gitcode.com/jayshu)    - `jayshu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jayshu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3246    - [关联PR #6858（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6858)
- **[#3243](https://gitcode.com/cann/ops-transformer/issues/3243) [Requirement|需求建议]: prolog及fia的op_api目录不加入ut覆盖率统计** — 45分
  - 痛点原因：模板已填充但内容极简，背景与价值部分重复标题，设计部分为空。
  - 原文依据：
    - `huang-chuhong`：/assign [@caizhengyang](https://gitcode.com/caizhengyang)    - `caizhengyang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caizhengyang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3243    - [关联PR #7239（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7239)
- **[#3237](https://gitcode.com/cann/ops-transformer/issues/3237) [Requirement|需求建议]: moe routing算子cleancode修改** — 45分
  - 痛点原因：模板字段完整但三段内容完全重复，缺乏实质设计细节。
  - 原文依据：
    - `tujun6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3237    - [关联PR #7306（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7306)
- **[#3315](https://gitcode.com/cann/ops-transformer/issues/3315) [Documentation|文档反馈]: aclnnGatherPaKvCache.md文档有误** — 50分
  - 痛点原因：提供了文档链接和模板结构，但问题描述仅'资料有误'过于简略，未说明具体错误。
  - 原文依据：
    - `zhuzemao`：add label documentation    - `cann-robot`：add label resolved    - `zhuzemao`：assigned to @zhuzemao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3315    - [关联PR #7528（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7528)    - [关联PR #7529（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7529)
- **[#3313](https://gitcode.com/cann/ops-transformer/issues/3313) [Requirement|需求建议]: mhc_post性能优化** — 50分
  - 痛点原因：模板有结构化章节但内容极少，背景仅一句话，设计与价值部分为空。
  - 原文依据：
    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `xuejinghui`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3313    - [关联PR #7495（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7495)
- **[#3266](https://gitcode.com/cann/ops-transformer/issues/3266) [Bug-Report|缺陷反馈]: 超大函数需要拆分** — 50分
  - 痛点原因：模板字段齐全但内容极简，环境写不需要、步骤写看代码、日志写无，实质信息不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhangh2417](https://gitcode.com/zhangh2417)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangh2417    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3266    - [关联PR #7380（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7380)    - [关联PR #7399（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7399)
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 50分
  - 痛点原因：有截图和基本描述，但缺少环境信息、复现步骤和预期对比。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：assigned to @huang-chuhong    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3241](https://gitcode.com/cann/ops-transformer/issues/3241) [Requirement|需求建议]: li/qli/liv2/qliv2 socVersion变更为通过NpuArch区分** — 50分
  - 痛点原因：有背景和结构化章节，但Benefit和Design部分为空模板，关键内容缺失。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：assigned to @wangyinchu1    - [关联PR #7264（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7264)    - [关联PR #7268（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7268)    - [关联PR #7348（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7348)
- **[#3364](https://gitcode.com/cann/ops-transformer/issues/3364) MhcPreSinkhorn SocVersion编译兼容性修改，bug修复** — 55分
  - 痛点原因：正文仅两句话描述修改意图，无复现步骤、日志或预期对比，但结构化字段较完整。
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3364    - [关联PR #7643（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7643)
- **[#3346](https://gitcode.com/cann/ops-transformer/issues/3346) 重复代码清理** — 55分
  - 痛点原因：正文为重复代码检测原始数据堆砌，无结构化章节或清理说明，但含核心文件与行号信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@leiqingji](https://gitcode.com/leiqingji)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @leiqingji    - `leiqingji`：closed from codehub    - `leiqingji`：changed custom state from 待办的 to 已完成    - `leiqingji`：changed custom state from 已完成 to 已确认
- **[#3292](https://gitcode.com/cann/ops-transformer/issues/3292) [Bug-Report|缺陷反馈]: mhc_post算子拦截补充** — 55分
  - 痛点原因：模板字段齐全但内容极简，描述仅'拦截补充'，复现步骤填'无'，依赖截图补充上下文。
  - 原文依据：
    - `huang-chuhong`：/assign [@Annyqw](https://gitcode.com/Annyqw)    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Annyqw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3292    - [关联PR #7378（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7378)
- **[#3284](https://gitcode.com/cann/ops-transformer/issues/3284) [Requirement|需求建议]: example新增了flash_attn调用，补充README文档** — 55分
  - 痛点原因：模板有结构但Benefit和Design章节为空，背景信息简短，内容不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `wangzhe123456789`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3284    - [关联PR #7401（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7401)
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 55分
  - 痛点原因：模板结构完整但内容偏薄，环境仅写A3，日志填NaN无实质信息
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3259](https://gitcode.com/cann/ops-transformer/issues/3259) [Requirement|需求建议]: GroupedMatmulActivationQuant算子新增torch-extension适配** — 55分
  - 痛点原因：有结构化章节但内容极简，Design为空，缺乏详细设计说明。
  - 原文依据：
    - `zhoushaolong`：/assgin    - `zhoushaolong`：add label requirement    - `zhoushaolong`：assigned to @zhoushaolong    - [关联PR #6998（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/6998)
- **[#3256](https://gitcode.com/cann/ops-transformer/issues/3256) [Requirement|需求建议]: 新增mqsmla & li_v2 & qli_v2 metadata算子的torch接口说明文档** — 55分
  - 痛点原因：模板有结构化章节但Benefit和Design部分留空，仅Background有内容，信息不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：/close    - `qq_32807861`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861
- **[#3236](https://gitcode.com/cann/ops-transformer/issues/3236) [Requirement|需求建议]: 商分删除已经合入主线的dsv4代码** — 55分
  - 痛点原因：有结构化模板但Benefit和Design章节为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `SH_jingsong`：add label requirement    - `cann-robot`：add label Accepted    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成    - [关联PR #7238（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7238)    - [关联PR #7245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7245)
- **[#3229](https://gitcode.com/cann/ops-transformer/issues/3229) [Requirement|需求建议]: [FIA]拦截fp8 per-block场景** — 55分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @zhaoDan0110    - `zhaoDan0110`：closed from codehub    - `zhaoDan0110`：changed custom state from 进行中 to 已完成
- **[#3306](https://gitcode.com/cann/ops-transformer/issues/3306) [Bug-Report|缺陷反馈]: IFA算子tilling下沉里，缺少cpp文件导致链接失败** — 58分
  - 痛点原因：模板章节齐全但复现步骤和日志截图为空，问题描述本身清晰
  - 原文依据：
    - `huang-chuhong`：/assign [@wangchao661](https://gitcode.com/wangchao661)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wangchao661    - `wangchao661`：closed from codehub    - `wangchao661`：changed custom state from 进行中 to 已完成    - [关联PR #7506（open）](https://gitcode.com/cann/ops-transformer/merge_requests/7506)
- **[#3233](https://gitcode.com/cann/ops-transformer/issues/3233) [Requirement|需求建议]: 新增QLI_V2算子中入参query和key支持hifp8的特性** — 58分
  - 痛点原因：模板章节齐全但Benefit和Design部分为空，背景描述清晰但缺乏设计方案
  - 原文依据：
    - `huang-chuhong`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3233    - [关联PR #7266（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7266)
#### PP-09 Bot标签操作时机不当产生矛盾状态（I2 · 讨论与解决）

- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅存在人员指派和+1投票，未提供任何关联PR、代码提交或文档链接等实质性产出证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭说明、文档更新或版本发布等实质性解决证据。
  - 原文依据：
    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，缺乏人工关闭评论、commit引用及文档链接等明确解决证据。
  - 原文依据：
    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：仅由机器人关联PR并自动关闭，无commit引用、文档链接及release引用等实质性解决证据支撑。
  - 原文依据：
    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：解决证据强度得分0，低于合格线 60
  - 原文依据：
    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：虽有合并的关联PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论等强证据。
  - 原文依据：
    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：仅靠机器人根据PR合并自动关闭，无commit引用、文档链接、release记录及人工总结评论，解决证据链不完整。
  - 原文依据：
    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：虽关联多个已合并PR，但issue内无commit、文档或release链接，也无关闭评论，缺乏直接解决证据。
  - 原文依据：
    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：虽有关联PR被合并，但仅由机器人自动关闭并打标签，缺乏人类关闭评论及commit、文档等直接解决证据。
  - 原文依据：
    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 15分
  - 痛点原因：仅停留在讨论和例会邀请阶段，无关联PR、commit引用或release等实际代码层面的解决证据。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 23分
  - 痛点原因：缺乏已合并的commit、文档或release等实质性修复落地证据，仅有关联PR和口头承诺。
  - 原文依据：
    - [关联PR #8505（open）](https://gitcode.com/cann/ops-transformer/merge_requests/8505)    - [关联PR #8506（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/8506)    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `huang-wei-chen`：closed from codehub
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 23分
  - 痛点原因：未关联PR或代码提交，且讨论结论表明当前仓库无法解决需依赖其他组件，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …    - `wanker`：当前投片验证debug需要算子的.s汇编文件定界问题，从而找对应组件解决问题，但目前得到汇编文件的两个渠道全部失效：编译加dump cce不产生.s汇编文件；同时llvm-objdump也无法反汇编得到汇编指令 1. <span styl…    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 23分
  - 痛点原因：仅靠机器人因关联其他issue合并自动关闭，缺乏commit引用和文档链接等直接解决证据，证据链弱。
  - 原文依据：
    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 23分
  - 痛点原因：仅口头回复不支持且无替代方案，未提供任何PR、代码或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？    - `L_Euler`：310P MLA的替代方案，当前暂时没有。    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 23分
  - 痛点原因：仅通过评论口头解答后直接关闭，无关联PR、commit引用或文档链接等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…    - `fengqiuyue`：已咨询asc-devkit仓    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 23分
  - 痛点原因：关闭时仅口头说明更新代码后不复现，未关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 23分
  - 痛点原因：仅通过评论声称问题已解决并关闭，未提供关联PR、代码提交或文档链接等实质性证据。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 23分
  - 痛点原因：仅评论讨论了技术细节与性能影响，缺乏关联PR、commit或文档等实质性解决证据。
  - 原文依据：
    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…    - `macech`：对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，我…    - `qq_40734045`：>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题，…    - `macech`：>>对于你说的三者并发，我们hbm上的带宽有上限，你同时并发的数据量过大确实会影响性能。小粒度的任务如果任务总量不大，对总体的影响理应不至于到严重的地步，但是如果频繁下发小粒度的任务，小粒度任务总量也很大的话就会有影响。进一步你询问的问题…
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 23分
  - 痛点原因：关闭时未关联任何PR、commit或文档链接等修复证据，仅凭评论称是客户问题便直接关闭。
  - 原文依据：
    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len    - `wxhhuawei`：问题已经解决，通过profling分析是客户问题    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 31分
  - 痛点原因：仅通过外部文档链接解答疑问，无关联PR和commit引用，缺乏代码层面的实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 31分
  - 痛点原因：虽有关联PR合并及机器人自动关闭，但缺乏人工关闭评论、文档链接与release引用等强证据支撑。
  - 原文依据：
    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 31分
  - 痛点原因：虽有合并的关联PR，但仅靠机器人自动关闭，缺乏人工确认解决的评论、版本发布引用及文档说明等强证据。
  - 原文依据：
    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 38分
  - 痛点原因：虽关联已合并PR，但无commit和release引用，关闭评论仅为机器人自动触发，缺乏人工解决说明与验证证据。
  - 原文依据：
    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 38分
  - 痛点原因：未系统关联修复PR或commit，仅靠评论提及链接并用命令关闭，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何修复PR或commit，且因未附具体问题被直接作为无效issue关闭，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：无关联PR与commit引用等实质修改证据，仅因信息不足被直接关闭并标记完成，无法证明已解决。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未补充具体问题被作为无效issue关闭，且无关联PR或commit引用，缺乏实际修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：未关联PR或commit，仅由维护者直接关闭并标记完成，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 38分
  - 痛点原因：未关联任何PR或commit，缺乏代码层面的修复证据，且被直接关闭，未体现实质性的解决过程。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @shi-rui
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：关闭时未关联任何PR或commit，且在要求补充具体问题后直接关闭，缺乏实质性修复证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 38分
  - 痛点原因：因未附具体问题被作为无效issue关闭，且无关联PR与commit引用，缺乏实质解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 38分
  - 痛点原因：虽有合并的PR，但缺乏commit和release引用，关闭时仅口头确认修复，证据链不完整。
  - 原文依据：
    - [关联PR #8061（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/8061)    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 38分
  - 痛点原因：虽有合并的关联PR，但缺少commit引用和release引用，仅靠机器人关联关闭，解决证据链不完整。
  - 原文依据：
    - [关联PR #7789（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7789)    - [关联PR #7790（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7790)    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 38分
  - 痛点原因：缺少关联PR与commit引用等代码修复证据，仅凭文档说明并直接关闭，缺乏实质解决证明。
  - 原文依据：
    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @Bugslover
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 38分
  - 痛点原因：仅口头说明已适配上库并关闭，未关联PR、commit或文档链接，缺乏实质性解决证据。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `cann-robot`：assigned to @macech
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 38分
  - 痛点原因：虽关联PR已合并，但无commit引用与release说明，且评论显示文档仍待同步更新，缺乏最终闭环证据。
  - 原文依据：
    - [关联PR #5241（merged）](https://gitcode.com/Ascend/op-plugin/merge_requests/5241)    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.    - `Le_666`：代码仓中v3资料已更新，待AscendC文档同步更新    - `huang-chuhong`：/assign [@Le_666](https://gitcode.com/Le_666)    - `Le_666`：closed from codehub
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 54分
  - 痛点原因：无关联PR等实质修复证据，仅停留在依赖缺失的讨论，且提问者最后仍索要算子示例未形成闭环。
  - 原文依据：
    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf    - `ni-zhihao`：有没有这个mega_moe算子的调用示例，这个算子也没有aclnn的调用示例，想找一个调用的脚本（aclnn或者python都可以）参考一下    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `ni-zhihao`：/close
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 54分
  - 痛点原因：无关联PR或文档等实质性修复证据，维护者仅建议自行排查便关闭了issue。
  - 原文依据：
    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查    - `SH_jingsong`：您好，由于您提的问题已转，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成
#### PP-10 开放Issue停滞无结论路径（I3 · 总结与关闭）

- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 0分
  - 痛点原因：关闭时未补充任何说明文字，缺乏最终结论，导致无法为后续类似问题提供复用价值。
  - 原文依据：
    - `zjun0`：add label requirement    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `cann-robot`：assigned to @hblnb
- **[#3348](https://gitcode.com/cann/ops-transformer/issues/3348) [Question|问题咨询]: 310P 上 SyncAll 相关问题咨询** — 0分
  - 痛点原因：关闭说明为0字，未总结问题结论与解决方案，导致其他用户无法直接复用排查经验。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `guijianwei`：问题一：为什么只需初始化一次？ 可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_api_…    - `shi-rui`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `see55`：>问题一：为什么只需初始化一次？ >可以参考https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/API/ascendcopapi/atlasascendc_ap…    - `guijianwei`：第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏    - `see55`：>第二个问题，加Pipe_all的同步，从代码看主要是为了保证初始化完成后才进行后续计算流水，从代码看没有什么问题。不知道您说的去掉是怎么修改的，卡住的用例可以发出来我确认下。谢谢🙏 [@guijianwei](https://gitco…
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：关闭说明为空，无方案文档化与重复主链接，仅由机器人自动关闭并打标签，未留下任何可复用知识。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - `cann-robot`：add label resolved    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3316](https://gitcode.com/cann/ops-transformer/issues/3316) 个人晋升Committer申请** — 0分
  - 痛点原因：仅包含人员分配与+1，无方案文档、无dup链接且关闭说明为空，未沉淀任何可复用信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `Allan_Yu`：+1    - `cann-robot`：assigned to @guijianwei    - `huang-chuhong`：assigned to @mabing1118 and unassigned @guijianwei    - `huang-chuhong`：assigned to @liudan12    - `huang-chuhong`：assigned to @monologue815
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅由机器人因关联PR合并自动关闭，无人工关闭说明与方案文档，无法提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：关闭说明为0字，无方案文档与dup主链接，仅由机器人自动关闭，未留下任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - `cann-robot`：add label resolved    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：关闭说明为0字，仅由机器人随PR合并自动关闭，未沉淀方案文档或复用链接，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - `cann-robot`：add label resolved    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅由机器人随PR合并自动关闭，无任何人工关闭说明、方案文档及复用链接，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人随PR合并自动关闭，缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - `cann-robot`：add label resolved    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3285](https://gitcode.com/cann/ops-transformer/issues/3285) [Bug-Report|缺陷反馈]: 编译torch_extension后import报错** — 0分
  - 痛点原因：维护者称无法复现并索要日志后，机器人直接关闭该 issue，未沉淀任何解决方案或排查结论，无复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，实测没有出现import失败问题，有更多日志吗    - `ni-zhihao`：我这边agent定位后发现是需要protobuf 这个依赖项，但是 requirements.txt中并没有写，你这边有安装这个protobuf吗 ![image.png](https://raw.gitcode.com/user-ima…    - `huang-chuhong`：ops-transformer最外层requirements.txt有要求protobuf
- **[#3278](https://gitcode.com/cann/ops-transformer/issues/3278) [Requirement|需求建议]: Mega MoE是否有支持A3超节点的计划？** — 0分
  - 痛点原因：仅口头说明功能已上库，未提供代码链接或方案文档，导致其他用户无法追溯与复用。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `macech`：你好，感谢关注，当前相关功能在a3上面已经适配完成开发上库了。    - `cann-robot`：assigned to @macech
- **[#3273](https://gitcode.com/cann/ops-transformer/issues/3273) [Question|问题咨询]: FusedInferAttentionScore对310p的支持** — 0分
  - 痛点原因：关闭说明仅48字且无方案文档化，仅靠状态流转和打标签关闭，未沉淀可供复用的解答。
  - 原文依据：
    - `L_Euler`：closed from codehub    - `L_Euler`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@L_Euler](https://gitcode.com/L_Euler)    - `L_Euler`：FusedInferAttentionScore算子后续暂无计划支持310P    - `yanminghui1`：>FusedInferAttentionScore算子后续暂无计划支持310P [@L_Euler](https://gitcode.com/L_Euler) 请问对于支持310p MLA有什么替代路径吗？只能用小算子组合？
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 0分
  - 痛点原因：仅以更新代码后不复现为由关闭，未提供根因分析、有效解决方案及文档沉淀，导致后续遇到同类问题无法复用。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：仅由机器人自动关闭且关闭说明为0字，无方案文档化，无法为后续类似问题提供复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - `cann-robot`：add label resolved    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 0分
  - 痛点原因：关闭说明仅21字，未沉淀具体解决方案或文档链接，无法供他人复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：assigned to @huang-chuhong
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为0字，无方案文档化与dup主链接，仅靠机器人自动关闭，未留下任何可供复用的经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - `cann-robot`：add label resolved    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：关闭说明为空且无方案文档化，仅由机器人自动关闭并关联PR，未沉淀任何可供后续复用的经验或链接。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - `cann-robot`：add label resolved    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：关闭说明为空且无方案文档沉淀，仅由机器人随PR合并自动关闭，未留下任何可复用的经验总结。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - `cann-robot`：add label resolved    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3226](https://gitcode.com/cann/ops-transformer/issues/3226) [Bug-Report|缺陷反馈]: MLA算子在910b3和A5之间性能差距非常大** — 0分
  - 痛点原因：关闭说明仅11字且无方案文档与复现链接，未留存任何排查过程或解决方案供后续复用。
  - 原文依据：
    - `wxhhuawei`：closed from codehub    - `wxhhuawei`：changed custom state from 进行中 to 已完成    - `wxhhuawei`：add label bug-report    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个需要确认一下    - `PerrySkywalker`：您好，本地没复现，需要提供actual seq len
- **[#3358](https://gitcode.com/cann/ops-transformer/issues/3358) [Bug-Report|缺陷反馈]: 950PR torch_npu.npu_moe_finalize_routing()失败** — 25分
  - 痛点原因：问题未复现且仅以容器环境问题草草关闭，无具体排查过程与方案文档沉淀，导致他人无法参考复用。
  - 原文依据：
    - `yangchao888`：closed from codehub    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `guoqiuhao`：[@yangchao888](https://gitcode.com/yangchao888) 你好，根据你提供的shape数据未能复现错误。 根据提供的错误信息，能否先检查下算子二进制是否正确安装    - `yangchao888`：容器环境问题    - `cann-robot`：assigned to @guoqiuhao
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 25分
  - 痛点原因：关闭时无方案文档沉淀与重复链接，关闭说明简略且仅简单标记完成，导致后续无法复用。
  - 原文依据：
    - `huang-wei-chen`：closed from codehub    - `huang-wei-chen`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。
- **[#3328](https://gitcode.com/cann/ops-transformer/issues/3328) [Requirement|需求建议]: 编译时加dumpcce，生成的kernel meta文件夹增加算子汇编文件** — 25分
  - 痛点原因：关闭说明仅口头指路并提供简单参数，无方案文档与代码链接，缺乏可复用的实操细节。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `wanker`：closed from codehub    - `wanker`：add label requirement    - `huang-chuhong`：需要调试的算子内CMakeLists中add_ops_compile_options函数增加--save-temp-files可以保存kernel_meta 底层编译行为请前往asc和编译器咨询    - `wanker`：知道保存kernel meta的方法，但现在kernel meta没有汇编文件。底层编译是可以产生汇编文件的。问题在于kernel meta里没有，只有.i和.o。transformer仓可以解决    - `huang-chuhong`：方式1 需要借助编译器反汇编 且反汇编工具不在cann包中，transformer仓无法实现 方式2 如果需要保存编译过程更多的文件，需要asc和编译器保存并且提供保存的编译选项给算子仓，transformer仓才能透传编译选项给asc …
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 25分
  - 痛点原因：仅由机器人自动关闭且无方案文档与主链接，关闭说明简短，未沉淀有效复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3232](https://gitcode.com/cann/ops-transformer/issues/3232) [Question|问题咨询]: hcomm库级通算融合开发** — 25分
  - 痛点原因：关闭说明仅留提问者关于不支持该功能的回复，无方案文档化与主链接关联，导致后续无法复用结论。
  - 原文依据：
    - `macech`：closed from codehub    - `macech`：changed custom state from 已确认 to 已完成    - `cann-robot`：add label Accepted    - `qq_40734045`：目前查看了runtime和driver库，尚不支持更细粒度的底层请求调度开发接口。目前也无法进行更底层细粒度的任务调度开发    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `qq_40734045`：补充一下aic 和aicpu的协同模式：在host launch两个任务，一个是aic的计算任务【host展开】，一个是aicpu的点对点收发任务【通信是aicpu展开】。aic与aicpu通过共享区域进行通信协同，由aicpu侧推进主导…
- **[#3224](https://gitcode.com/cann/ops-transformer/issues/3224) [Bug-Report|缺陷反馈]: 编译完自定义算子包后，执行网络报错** — 25分
  - 痛点原因：关闭说明仅56字且无方案文档与主链接，仅记录状态流转，未沉淀解决方案或根因分析供他人复用。
  - 原文依据：
    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@SH_jingsong](https://gitcode.com/SH_jingsong)    - `cann-robot`：### Notice This issue is already assigned to ***SH_jingsong***. Please do not assign repeatedly.    - `songjionghui`：您的问题已收到，目前看问题是算子包的编译导致的问题，建议先自行排查
- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 30分
  - 痛点原因：关闭说明仅50字且仅以关联合并为由关闭，无具体解决方案与dup主链接，难以供他人复用参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：assigned to @duxinlei    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3383](https://gitcode.com/cann/ops-transformer/issues/3383) [Documentation|文档反馈]: MhcSinkhorn的readme文档格式有误，导致显示问题** — 30分
  - 痛点原因：关闭说明仅50字且多为机器人自动操作，缺乏人工对问题根因与解决方案的详细记录，难以供后续复用。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `duxinlei`：见pr: https://gitcode.com/cann/ops-transformer/pull/7863    - `xdnjust`：/close
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅29字且仅要求补充具体问题，未沉淀有效解决方案或关联重复链接，缺乏复用参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：关闭说明仅要求补充信息并作为无效issue关闭，未提供实质性解决方案，缺乏后续参考意义。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @macech
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 30分
  - 痛点原因：仅因未附具体问题被作无效关闭，关闭说明简短且未沉淀任何具体问题定位或解决方案，无法供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 30分
  - 痛点原因：关闭说明仅要求补充具体问题，未提供解决方案或修复链接，缺乏后续参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @shi-rui
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 30分
  - 痛点原因：关闭说明仅46字且无主链接，虽有方案文档化但缺乏复用指引。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3365    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 30分
  - 痛点原因：关闭说明仅48字且由机器人直接关闭，缺乏人工补充的根因分析与解决方案总结，难以供他人复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题
- **[#3253](https://gitcode.com/cann/ops-transformer/issues/3253) [Documentation|文档反馈]: mla_prolog_v3 文档缺少支持的rotary类型的说明（half or interleave）** — 30分
  - 痛点原因：关闭说明仅41字且仅靠加标签和状态流转关闭，未提供文档更新结果或链接，难以复用。
  - 原文依据：
    - `Le_666`：closed from codehub    - `Le_666`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `huang-chuhong`：/assign [@ouyf](https://gitcode.com/ouyf)    - `cann-robot`：### Notice This issue can not be assigned to ***ouyf***. Please try to assign to the repository members.
- **[#3270](https://gitcode.com/cann/ops-transformer/issues/3270) [Question|问题咨询]: IMPL_OP_OPTILING.TilingParse是什么作用？什么场景下context_->GetPlatformIn…** — 45分
  - 痛点原因：关闭时未沉淀方案文档，也未关联重复issue，缺乏可供其他用户复用的解答经验。
  - 原文依据：
    - `fengqiuyue`：closed from codehub    - `fengqiuyue`：changed custom state from 进行中 to 已完成    - `fengqiuyue`：add label question    - `cann-robot`：add label Accepted    - `huang-chuhong`：你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 算子需要根据核数进行分核，会对此进行校验。 如果你需要了解更多GetPlatformInfo()相关…    - `fengqiuyue`：>你好，这个函数是获取PlatFormInfos指针。PlatformInfos类用于管理和查询硬件平台的相关信息，包括核数、内存带宽等。 >算子需要根据核数进行分核，会对此进行校验。 >如果你需要了解更多GetPlatformInfo(…
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 55分
  - 痛点原因：关闭说明仅52字且多为系统操作，缺乏对文档修复方案及复用信息的详细描述，导致复用价值不足。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @guoqiuhao
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：因未附具体问题被作无效issue关闭，关闭说明未记录具体错误或解决方案，缺乏复用参考价值。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @chaotang233
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 55分
  - 痛点原因：关闭说明仅54字且多为机械操作，无重复链接，指派成员失败被拦截，缺乏人工处理总结，难以供后续参考。
  - 原文依据：
    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：assigned to @monologue815
- **[#3373](https://gitcode.com/cann/ops-transformer/issues/3373) [Documentation|文档反馈]: SECURITY.md中存在无效链接** — 55分
  - 痛点原因：关闭说明仅56字且未提供修复提交或主issue链接，仅简单陈述已修复，缺乏根因分析与具体修复细节。
  - 原文依据：
    - `weihao18`：closed from codehub    - `weihao18`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `weihao18`：你好，SECURITY.md确认后会进行修复，mhc/mhc_pre_sinkhorn/README.md已修复    - `weihao18`：SECURITY.md 问题已修复，请确认，没问题将关闭该issue    - `weihao18`：assigned to @weihao18
- **[#3360](https://gitcode.com/cann/ops-transformer/issues/3360) [Bug-Report|缺陷反馈]: ProcessVec1UpdateGeneralImpl256GqaFullquantVF存在RoundMode出错** — 55分
  - 痛点原因：关闭说明过短仅52字，仅记录状态变更与来源，缺乏详细解决方案与重复链接。
  - 原文依据：
    - `Bugslover`：closed from codehub    - `Bugslover`：changed custom state from 进行中 to 已完成    - `huang-chuhong`：/assign [@Bugslover](https://gitcode.com/Bugslover)    - `Bugslover`：Thanks for submiiting an issue. We are getting into it, and will inform you when we have an update.    - `yangxh1203`：这是训练的GQA perblock全量化512切块的代码，只支持hifp8，在算子里会通过前序判断条件路由到该分支，T2数据类型只可能是hifloat8，只能设置为CAST_ROUND，参考文档（https://asc.gitcode.c…    - `cann-robot`：assigned to @Bugslover
#### PP-11 路由分类与责任归属缺失（I1 · 分配与首次响应）

- **[#3384](https://gitcode.com/cann/ops-transformer/issues/3384) [Bug-Report|缺陷反馈]: MhcPre和MhcPreSinkhorn的readme显示的公式相同，没有说明这两个算子的区别** — 0分
  - 痛点原因：维护者仅分配任务和打标签，未对文档公式问题进行任何实质性解答，最终由机器人随MR合并直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@duxinlei](https://gitcode.com/duxinlei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @duxinlei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3384    - [关联PR #7863（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7863)
- **[#3365](https://gitcode.com/cann/ops-transformer/issues/3365) [Documentation|文档反馈]: allto_allv_grouped_mat_mul算子aclnn文档中关于e * epWorldSize的范围限…** — 0分
  - 痛点原因：首次响应超时，且后续仅有分配和加标签等机械操作，全程无任何实质性解答。
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `zhu-mingzhe71`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @macech    - `macech`：assigned to @libohao6    - `macech`：unassigned @macech
- **[#3332](https://gitcode.com/cann/ops-transformer/issues/3332) [Bug-Report|缺陷反馈]: cleancode超大函数拆分** — 0分
  - 痛点原因：全程仅由机器人加标签并关闭，虽关联PR已合并但无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3332    - [关联PR #7486（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7486)
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 0分
  - 痛点原因：仅存在分配失败与打标签的机械操作，全程无人工实质技术回应且被直接关闭。
  - 原文依据：
    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 0分
  - 痛点原因：仅机器人加标签并随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 0分
  - 痛点原因：仅机器人打标签并随关联PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3295](https://gitcode.com/cann/ops-transformer/issues/3295) [Bug-Report|缺陷反馈]: cleancode告警清理 删除todo注释** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随关联PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3295    - [关联PR #7472（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7472)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 0分
  - 痛点原因：仅有人工加标签及机器人因PR合并自动关闭，全程无任何人工实质性技术回应。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 0分
  - 痛点原因：仅机器人打标签并在关联PR合并后关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3255](https://gitcode.com/cann/ops-transformer/issues/3255) [Bug-Report|缺陷反馈]: flash_attention_score tiling UT 在 ascend950 上期望数据不匹配导致失败** — 0分
  - 痛点原因：因关联PR合入被机器人自动关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3255    - [关联PR #7349（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7349)
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人打标签并随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 0分
  - 痛点原因：全程仅由机器人自动打标签并随MR合并关闭，缺乏人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3240](https://gitcode.com/cann/ops-transformer/issues/3240) [Bug-Report|缺陷反馈]: IFA全量化用例性能劣化** — 0分
  - 痛点原因：全程仅机器人自动打标签并随PR合并关闭，无任何人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3240    - [关联PR #7132（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7132)    - [关联PR #7294（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7294)
- **[#3356](https://gitcode.com/cann/ops-transformer/issues/3356) [Requirement|需求建议]: 950编译选项DENABLE_CV_COMM_VIA_SSBUF在算子仓库中的写法是否可以统一？** — 20分
  - 痛点原因：首次响应仅为模板指派，实质性技术解答耗时长达415.73小时，严重超出时效要求。
  - 原文依据：
    - `weihao18`：收到需求建议，欢迎您参加 ops-transformer sig 例会评审并申报相关议题，最近的例会议题申报及会议时间可见：https://etherpad-cann.meeting.osinfra.cn/p/sig-ops-transf…    - `weihao18`：/assign [@hblnb](https://gitcode.com/hblnb)    - `zjun0`：编译选项这些，是不是不同仓库，没法统一的？    - `hblnb`：>编译选项这些，是不是不同仓库，没法统一的？ [@zjun0](https://gitcode.com/zjun0) 如果是指CMakeList.txt里面的OPTIONS写法的话，应该可以统一，只需要在接收OPTIONS的函数里面做一次…    - `zjun0`：add label requirement    - `cann-robot`：assigned to @hblnb
- **[#3353](https://gitcode.com/cann/ops-transformer/issues/3353) [Bug-Report|缺陷反馈]: attention/flash_attention_score/op_api/aclnn_flash_attention…** — 40分
  - 痛点原因：从首次响应到确认问题并给出处理方案耗时近295小时，导致回应严重滞后。
  - 原文依据：
    - `huang-chuhong`：/assign [@yu-xinjie62](https://gitcode.com/yu-xinjie62)    - `huang-wei-chen`：感谢反馈，该问题已确认，我们将在近期合入代码修复该问题。    - `huang-wei-chen`：当前该问题不影响功能精度暂不修改，head_dim=128后续待功能验证充分后提供该特性。    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @yu-xinjie62    - `yu-xinjie62`：assigned to @huang-wei-chen
- **[#3311](https://gitcode.com/cann/ops-transformer/issues/3311) [Bug-Report|缺陷反馈]: hif8格式测试grouped_matmul算子耗时，host+kernels耗时慢于fp16格式，msprof op查…** — 40分
  - 痛点原因：经多次指派流转，维护者耗时约263小时才完成本地复现并给出问题根因，导致回应严重超时。
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `shi-rui`：/assign [@kknan](https://gitcode.com/kknan)    - `kknan`：问题已收到，正在本地尝试复现排查问题    - `kknan`：原始脚本在hif8场景未传入scale，导致跑的不是目标场景。 已同步正确的hif8测试方式给相关同学。    - `kknan`：/close    - `cann-robot`：add label Accepted
#### PP-12 模板必填字段缺乏强制校验（I0 · 创建）

- **[#3366](https://gitcode.com/cann/ops-transformer/issues/3366) [Documentation|文档反馈]: Compressor主线资料更新** — 0分
  - 痛点原因：仅包含指派和标签操作，未提供任何具体的文档反馈内容或更新需求，信息严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangss21](https://gitcode.com/wangss21)    - `wangss21`：add label documentation    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangss21    - `wangss21`：closed from codehub
- **[#3345](https://gitcode.com/cann/ops-transformer/issues/3345) mc2公共代码存在潜在的资源泄露问题，打开了文件未关闭** — 15分
  - 痛点原因：正文仅含截图链接，无文字描述、复现步骤、环境信息或结构化章节
  - 原文依据：
    - `cann-robot`：add label resolved    - `chuguowei`：assigned to @chuguowei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3345    - [关联PR #6915（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6915)
- **[#3320](https://gitcode.com/cann/ops-transformer/issues/3320) [Question|问题咨询]: 修复自定义算子包安装问题** — 15分
  - 痛点原因：正文仅一句话描述问题，无复现步骤、环境、日志或预期对比，信息严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @mutex_lock    - `mutex_lock`：changed custom state from 进行中 to 已完成    - `mutex_lock`：closed from codehub    - [关联PR #7541（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7541)
- **[#3293](https://gitcode.com/cann/ops-transformer/issues/3293) MhcPreSinkhorn bug修复、batch一致性支持** — 15分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、日志或结构化章节，信息极度不足。
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3293    - [关联PR #7441（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7441)
- **[#3250](https://gitcode.com/cann/ops-transformer/issues/3250) 修复sfa/qsfa的一些重复代码** — 15分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、预期或结构化章节。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3250    - [关联PR #7310（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7310)    - [关联PR #7311（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7311)
- **[#3368](https://gitcode.com/cann/ops-transformer/issues/3368) [Bug-Report|缺陷反馈]: CleanCode 重复代码 冗余代码清理** — 20分
  - 痛点原因：模板字段虽全但内容重复填充，无实质复现步骤或环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@gj18405655e4v](https://gitcode.com/gj18405655e4v)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @gj18405655e4v    - `gj18405655e4v`：closed from codehub    - `gj18405655e4v`：changed custom state from 进行中 to 已完成    - [关联PR #7646（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7646)
- **[#3337](https://gitcode.com/cann/ops-transformer/issues/3337) redundant code of FAG** — 20分
  - 痛点原因：正文仅6字，无复现步骤、环境、结构化章节，信息极不充分
  - 原文依据：
    - `huang-chuhong`：/assign [@DaiHuina1](https://gitcode.com/DaiHuina1)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @DaiHuina1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3337    - [关联PR #6641（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6641)
- **[#3258](https://gitcode.com/cann/ops-transformer/issues/3258) matmul_all_reduce算子编译时间优化** — 20分
  - 痛点原因：正文仅一句话，无复现步骤、环境、预期对比或结构化章节，信息极为简略。
  - 原文依据：
    - `cann-robot`：add label resolved    - `chuguowei`：assigned to @chuguowei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3258    - [关联PR #7321（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7321)
- **[#3251](https://gitcode.com/cann/ops-transformer/issues/3251) flash_attention_score 部分文档和逻辑在9.1.0分支有问题修复** — 20分
  - 痛点原因：正文仅重复标题，无复现步骤、环境、日志或结构化章节。
  - 原文依据：
    - `huang-chuhong`：/assign [@sky-zyh](https://gitcode.com/sky-zyh)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @sky-zyh    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3251    - [关联PR #7352（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7352)
- **[#3381](https://gitcode.com/cann/ops-transformer/issues/3381) [Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题** — 25分
  - 痛点原因：有模板和文档链接但问题描述极模糊，无具体错误示例、无复现步骤、无环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@guoqiuhao](https://gitcode.com/guoqiuhao)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @guoqiuhao    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3378](https://gitcode.com/cann/ops-transformer/issues/3378) [Documentation|文档反馈]: mamba目录下的markdown文档存在正确性问题** — 25分
  - 痛点原因：有文档链接和模板章节，但无具体问题描述、复现步骤或预期对比。
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3377](https://gitcode.com/cann/ops-transformer/issues/3377) [Documentation|文档反馈]: gmm目录下的文档存在代码错误、符号错误、命名不一致等问题** — 25分
  - 痛点原因：有文档链接但无具体问题描述，Existing Issues章节为空，信息严重不足
  - 原文依据：
    - `huang-chuhong`：/assign [@shi-rui](https://gitcode.com/shi-rui)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @shi-rui    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3299](https://gitcode.com/cann/ops-transformer/issues/3299) 修复attention/common 一些vf重复代码** — 25分
  - 痛点原因：正文仅重复标题，无具体代码位置、重复范围或预期结果描述
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3299    - [关联PR #7468（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7468)    - [关联PR #7481（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7481)
- **[#3288](https://gitcode.com/cann/ops-transformer/issues/3288) [Requirement|需求建议]: 自定义算子包fusion pass不生效** — 25分
  - 痛点原因：模板存在但内容极简，无复现步骤、环境、日志或预期对比
  - 原文依据：
    - `huang-chuhong`：/assign [@mutex_lock](https://gitcode.com/mutex_lock)    - `cann-robot`：assigned to @mutex_lock    - `mutex_lock`：closed from codehub    - [关联PR #7385（open）](https://gitcode.com/cann/ops-transformer/merge_requests/7385)
- **[#3287](https://gitcode.com/cann/ops-transformer/issues/3287) common vf代码重复代码提取公共函数** — 25分
  - 痛点原因：正文仅21字符与标题重复，无复现步骤、环境、结构化章节
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3287    - [关联PR #7424（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7424)    - [关联PR #7439（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7439)
- **[#3254](https://gitcode.com/cann/ops-transformer/issues/3254) [Requirement|需求建议]: mqsmla & li_v2 & qli_v2 metadata 拦截和代码优化** — 25分
  - 痛点原因：模板填写但内容极少，背景仅重复标题，价值与设计部分均为空
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3254    - [关联PR #7346（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7346)
- **[#3244](https://gitcode.com/cann/ops-transformer/issues/3244) 修复sfa/qsfa的一些重复代码** — 25分
  - 痛点原因：正文仅重复标题17字，无任何细节、结构化章节或具体代码位置说明
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3244    - [关联PR #7259（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7259)    - [关联PR #7272（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7272)    - [关联PR #7275（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7275)    - [关联PR #7282（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7282)
- **[#3343](https://gitcode.com/cann/ops-transformer/issues/3343) [Requirement|需求建议]: qliv2支持批跑** — 30分
  - 痛点原因：模板字段大量留空，背景仅一句话，缺少价值说明和设计方案
  - 原文依据：
    - `huang-chuhong`：/assign [@LZH_unofficial](https://gitcode.com/LZH_unofficial)    - `LZH_unofficial`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @LZH_unofficial    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3343    - [关联PR #7382（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7382)
- **[#3340](https://gitcode.com/cann/ops-transformer/issues/3340) [Requirement|需求建议]: 9.1.0分支删除qli_v2 metadata** — 30分
  - 痛点原因：模板章节存在但背景、价值、设计均为空，仅标题清晰，内容严重不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3340    - [关联PR #7488（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7488)
- **[#3339](https://gitcode.com/cann/ops-transformer/issues/3339) sfa重复代码修改** — 30分
  - 痛点原因：正文仅27字，无复现步骤、日志、预期对比或结构化章节，仅含基本描述与版本信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3339    - [关联PR #7582（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7582)    - [关联PR #7584（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7584)
- **[#3283](https://gitcode.com/cann/ops-transformer/issues/3283) [Bug-Report|缺陷反馈]: mhc_pos_backward对输入n添加约束** — 30分
  - 痛点原因：所有必填字段填同一句标题文本，无真实复现步骤、环境细节或日志
  - 原文依据：
    - `huang-chuhong`：/assign [@fazhenyao123](https://gitcode.com/fazhenyao123)    - `fazhenyao123`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @fazhenyao123    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3283    - [关联PR #7093（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7093)
- **[#3234](https://gitcode.com/cann/ops-transformer/issues/3234) [Requirement|需求建议]: SMLAG算子torch接口与meta合并** — 30分
  - 痛点原因：模板章节存在但Benefit和Design均为空，背景仅重复标题，需求描述过于简陋。
  - 原文依据：
    - `hz36amy_00`：/assign    - `hz36amy_00`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @hz36amy_00    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3234    - [关联PR #7231（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7231)
- **[#3380](https://gitcode.com/cann/ops-transformer/issues/3380) [Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有文档链接和结构化模板，但缺少具体问题描述，仅笼统说存在错误
  - 原文依据：
    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：add label Accepted    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3379](https://gitcode.com/cann/ops-transformer/issues/3379) [Documentation|文档反馈]: mc2目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有模板结构和文档链接，但未提供任何具体错误示例，问题描述过于笼统
  - 原文依据：
    - `huang-chuhong`：/assign [@macech](https://gitcode.com/macech)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @macech    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3376](https://gitcode.com/cann/ops-transformer/issues/3376) [Documentation|文档反馈]: FFN目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有模板和文档链接，但无具体问题描述、复现步骤或环境信息
  - 原文依据：
    - `huang-chuhong`：/assign [@chaotang233](https://gitcode.com/chaotang233)    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `cann-robot`：assigned to @chaotang233    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3375](https://gitcode.com/cann/ops-transformer/issues/3375) [Documentation|文档反馈]: attention目录下的markdown文档存在正确性问题** — 35分
  - 痛点原因：有文档链接和问题分类但无具体错误描述，缺少复现步骤和预期对比
  - 原文依据：
    - `huang-chuhong`：/assign [@coder_linx](https://gitcode.com/coder_linx)    - `cann-robot`：### Notice This issue can not be assigned to ***coder_linx***. Please try to assign to the repository members.    - `huang-chuhong`：你好，经过讨论需要附具体问题，否则会作为无效issue关闭    - `huang-chuhong`：assigned to @monologue815    - `huang-chuhong`：assigned to @jiang-lirui    - `huang-chuhong`：assigned to @wangzhe123456789
- **[#3371](https://gitcode.com/cann/ops-transformer/issues/3371) [Documentation|文档反馈]: LI算子torch接口文档补充** — 35分
  - 痛点原因：模板字段全填同一句话，无复现步骤、环境信息或具体文档片段描述。
  - 原文依据：
    - `huang-chuhong`：/assign [@guijianwei](https://gitcode.com/guijianwei)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @guijianwei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3371    - [关联PR #7699（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7699)    - [关联PR #7704（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7704)
- **[#3312](https://gitcode.com/cann/ops-transformer/issues/3312) [Requirement|需求建议]: 新增ascend950 causal_conv1d 算子** — 35分
  - 痛点原因：模板有结构化章节但Benefit和Design均为空，内容极简，仅背景一行。
  - 原文依据：
    - `huang-chuhong`：/assign @wangrui_    - `wangrui_`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangrui_    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3312    - [关联PR #6870（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6870)
- **[#3309](https://gitcode.com/cann/ops-transformer/issues/3309) 修改vf重复代码** — 35分
  - 痛点原因：正文仅一句话描述重构意图，无具体文件路径、冗余变量清单或结构化章节。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3309    - [关联PR #7502（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7502)    - [关联PR #7513（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7513)
- **[#3301](https://gitcode.com/cann/ops-transformer/issues/3301) [Requirement|需求建议]: sliklg metadata算子 支持 A5；新增smlag metadata算子** — 35分
  - 痛点原因：模板章节存在但背景、价值、设计均为空，仅标题描述需求，内容过于简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3301    - [关联PR #7429（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7429)
- **[#3296](https://gitcode.com/cann/ops-transformer/issues/3296) 补齐MoeInitRoutingV3的droppad非全载模板的ut** — 35分
  - 痛点原因：正文仅一句话与标题重复，无环境、步骤、结构化说明，信息量极低。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3296    - [关联PR #7471（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7471)
- **[#3282](https://gitcode.com/cann/ops-transformer/issues/3282) [Requirement|需求建议]: log.cpp需要被编入 opapi.so** — 35分
  - 痛点原因：模板仅填背景，价值与设计章节均空，信息不完整。
  - 原文依据：
    - `Bugslover`：add label requirement    - `cann-robot`：add label resolved    - `Bugslover`：assigned to @Bugslover    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3282    - [关联PR #7414（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7414)
- **[#3242](https://gitcode.com/cann/ops-transformer/issues/3242) [Requirement|需求建议]: SLIKG算子torch接口与meta合并** — 35分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，仅一句话背景，信息不充分。
  - 原文依据：
    - `huang-chuhong`：/assign [@xuanyuandy](https://gitcode.com/xuanyuandy)    - `xuanyuandy`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @xuanyuandy    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3242    - [关联PR #7318（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7318)
- **[#3238](https://gitcode.com/cann/ops-transformer/issues/3238) [Requirement|需求建议]: err msg整改** — 35分
  - 痛点原因：模板有结构但内容极简，背景仅一句话，设计与价值部分空白
  - 原文依据：
    - `jerry_ming`：add label requirement    - `cann-robot`：add label resolved    - `jerry_ming`：assigned to @jerry_ming    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3238    - [关联PR #7305（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7305)
- **[#3305](https://gitcode.com/cann/ops-transformer/issues/3305) [Requirement|需求建议]: QLIV2算子增加支持key0轴非连续输入** — 40分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景信息仅一句话，不够充分。
  - 原文依据：
    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3305    - [关联PR #7407（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7407)
- **[#3265](https://gitcode.com/cann/ops-transformer/issues/3265) [Requirement|需求建议]: A5 dispatch fullmeshv2 batch size 限制应放开到 512** — 40分
  - 痛点原因：模板章节存在但Benefit和Design为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhong-zixin](https://gitcode.com/zhong-zixin)    - `zhong-zixin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhong-zixin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3265    - [关联PR #7244（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7244)
- **[#3367](https://gitcode.com/cann/ops-transformer/issues/3367) [Requirement|需求建议]: 为MegaMoe新增ClampLimit功能** — 45分
  - 痛点原因：模板章节存在但Benefit和Design均为空，仅背景有一行描述
  - 原文依据：
    - `yangzeheng`：add label requirement    - `cann-robot`：add label resolved    - `yangzeheng`：assigned to @yangzeheng    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3367    - [关联PR #6911（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6911)
- **[#3341](https://gitcode.com/cann/ops-transformer/issues/3341) qliv2 A5支持TND padding、returnValue、outputIdxOffset** — 45分
  - 痛点原因：模板有结构化章节但仅填写背景，价值与设计方案为空，信息不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangyinchu1    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3341    - [关联PR #7413（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7413)
- **[#3333](https://gitcode.com/cann/ops-transformer/issues/3333) ScatterPaKvCache aclnn文档描述需要修改** — 45分
  - 痛点原因：正文极简，仅指出文档有误未说明具体错误码或约束细节，缺乏结构化描述。
  - 原文依据：
    - `cann-robot`：add label resolved    - `yu_qinfei`：assigned to @yu_qinfei    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3333    - [关联PR #7536（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7536)    - [关联PR #7613（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7613)
- **[#3318](https://gitcode.com/cann/ops-transformer/issues/3318) [Requirement|需求建议]: moe_init_routing_v3使用计数排序实现性能优化** — 45分
  - 痛点原因：有结构化模板但Benefit和Design部分为空，内容极度简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@shishengjie](https://gitcode.com/shishengjie)    - `cann-robot`：### Notice This issue can not be assigned to ***shishengjie***. Please try to assign to the repository members.    - `zerosaki_admin`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3318    - [关联PR #7428（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7428)
- **[#3314](https://gitcode.com/cann/ops-transformer/issues/3314) [Bug-Report|缺陷反馈]: GMM A8W4 N非16对齐精度问题** — 45分
  - 痛点原因：模板字段齐全但内容极简，环境仅写A2 A3，日志填无，复现步骤仅一句话。
  - 原文依据：
    - `huang-chuhong`：/assign [@huang-jz](https://gitcode.com/huang-jz)    - `huang-jz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @huang-jz    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3314    - [关联PR #7465（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7465)
- **[#3294](https://gitcode.com/cann/ops-transformer/issues/3294) [Bug-Report|缺陷反馈]: mhc_post算子资料约束补充** — 45分
  - 痛点原因：模板字段齐全但内容极简，复现步骤/预期/日志均填'无'，信息量不足。
  - 原文依据：
    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3294    - [关联PR #7454（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7454)
- **[#3277](https://gitcode.com/cann/ops-transformer/issues/3277) [Bug-Report|缺陷反馈]: mlapo需要新增torch接口** — 45分
  - 痛点原因：有模板结构但复现步骤、预期结果、日志均填NA，实质内容不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@yolic](https://gitcode.com/yolic)    - `yolic`：/close    - `yolic`：add label bug-report    - `cann-robot`：assigned to @yolic    - `cann-robot`：closed from codehub    - `cann-robot`：changed custom state from 进行中 to 已完成
- **[#3274](https://gitcode.com/cann/ops-transformer/issues/3274) [Requirement|需求建议]: 新增qli_v2 & li_v2 & mqsmla & smla metadata文档资料** — 45分
  - 痛点原因：模板结构存在但Benefit和Design章节留空，背景信息仅一句话，内容偏单薄。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3274    - [关联PR #7190（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7190)
- **[#3268](https://gitcode.com/cann/ops-transformer/issues/3268) [Bug-Report|缺陷反馈]: canndev仓依赖quant_lightning_indexer_v2_metadata导致编cann失败** — 45分
  - 痛点原因：模板字段齐全但内容高度重复，复现步骤仅一行版本号，实质信息不足。
  - 原文依据：
    - `SH_jingsong`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3268    - [关联PR #7391（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7391)
- **[#3246](https://gitcode.com/cann/ops-transformer/issues/3246) [Bug-Report|缺陷反馈]: GMMSwigluQuant 算子 mxfp4 weight nz error message整改** — 45分
  - 痛点原因：模板字段齐全但内容极简，无具体错误码、日志或详细复现步骤。
  - 原文依据：
    - `huang-chuhong`：/assign [@jayshu](https://gitcode.com/jayshu)    - `jayshu`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @jayshu    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3246    - [关联PR #6858（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/6858)
- **[#3243](https://gitcode.com/cann/ops-transformer/issues/3243) [Requirement|需求建议]: prolog及fia的op_api目录不加入ut覆盖率统计** — 45分
  - 痛点原因：模板已填充但内容极简，背景与价值部分重复标题，设计部分为空。
  - 原文依据：
    - `huang-chuhong`：/assign [@caizhengyang](https://gitcode.com/caizhengyang)    - `caizhengyang`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @caizhengyang    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3243    - [关联PR #7239（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7239)
- **[#3237](https://gitcode.com/cann/ops-transformer/issues/3237) [Requirement|需求建议]: moe routing算子cleancode修改** — 45分
  - 痛点原因：模板字段完整但三段内容完全重复，缺乏实质设计细节。
  - 原文依据：
    - `tujun6`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3237    - [关联PR #7306（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7306)
- **[#3315](https://gitcode.com/cann/ops-transformer/issues/3315) [Documentation|文档反馈]: aclnnGatherPaKvCache.md文档有误** — 50分
  - 痛点原因：提供了文档链接和模板结构，但问题描述仅'资料有误'过于简略，未说明具体错误。
  - 原文依据：
    - `zhuzemao`：add label documentation    - `cann-robot`：add label resolved    - `zhuzemao`：assigned to @zhuzemao    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3315    - [关联PR #7528（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7528)    - [关联PR #7529（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7529)
- **[#3313](https://gitcode.com/cann/ops-transformer/issues/3313) [Requirement|需求建议]: mhc_post性能优化** — 50分
  - 痛点原因：模板有结构化章节但内容极少，背景仅一句话，设计与价值部分为空。
  - 原文依据：
    - `xuejinghui`：add label requirement    - `cann-robot`：add label resolved    - `xuejinghui`：assigned to @xuejinghui    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3313    - [关联PR #7495（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7495)
- **[#3266](https://gitcode.com/cann/ops-transformer/issues/3266) [Bug-Report|缺陷反馈]: 超大函数需要拆分** — 50分
  - 痛点原因：模板字段齐全但内容极简，环境写不需要、步骤写看代码、日志写无，实质信息不足。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhangh2417](https://gitcode.com/zhangh2417)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zhangh2417    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3266    - [关联PR #7380（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7380)    - [关联PR #7399（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7399)
- **[#3252](https://gitcode.com/cann/ops-transformer/issues/3252) [Question|问题咨询]: A5上，FLashAttentionScore算子有一个独占流，是为什么？** — 50分
  - 痛点原因：有截图和基本描述，但缺少环境信息、复现步骤和预期对比。
  - 原文依据：
    - `huang-chuhong`：你好，这个和整网的脚本有关，算子本身不感知    - `huang-chuhong`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `huang-chuhong`：assigned to @huang-chuhong    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3241](https://gitcode.com/cann/ops-transformer/issues/3241) [Requirement|需求建议]: li/qli/liv2/qliv2 socVersion变更为通过NpuArch区分** — 50分
  - 痛点原因：有背景和结构化章节，但Benefit和Design部分为空模板，关键内容缺失。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangyinchu1](https://gitcode.com/wangyinchu1)    - `wangyinchu1`：add label requirement    - `cann-robot`：assigned to @wangyinchu1    - [关联PR #7264（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7264)    - [关联PR #7268（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7268)    - [关联PR #7348（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/7348)
- **[#3364](https://gitcode.com/cann/ops-transformer/issues/3364) MhcPreSinkhorn SocVersion编译兼容性修改，bug修复** — 55分
  - 痛点原因：正文仅两句话描述修改意图，无复现步骤、日志或预期对比，但结构化字段较完整。
  - 原文依据：
    - `taochangmin`：/assign    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @taochangmin    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3364    - [关联PR #7643（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7643)
- **[#3346](https://gitcode.com/cann/ops-transformer/issues/3346) 重复代码清理** — 55分
  - 痛点原因：正文为重复代码检测原始数据堆砌，无结构化章节或清理说明，但含核心文件与行号信息。
  - 原文依据：
    - `huang-chuhong`：/assign [@leiqingji](https://gitcode.com/leiqingji)    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @leiqingji    - `leiqingji`：closed from codehub    - `leiqingji`：changed custom state from 待办的 to 已完成    - `leiqingji`：changed custom state from 已完成 to 已确认
- **[#3292](https://gitcode.com/cann/ops-transformer/issues/3292) [Bug-Report|缺陷反馈]: mhc_post算子拦截补充** — 55分
  - 痛点原因：模板字段齐全但内容极简，描述仅'拦截补充'，复现步骤填'无'，依赖截图补充上下文。
  - 原文依据：
    - `huang-chuhong`：/assign [@Annyqw](https://gitcode.com/Annyqw)    - `Annyqw`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @Annyqw    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3292    - [关联PR #7378（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7378)
- **[#3284](https://gitcode.com/cann/ops-transformer/issues/3284) [Requirement|需求建议]: example新增了flash_attn调用，补充README文档** — 55分
  - 痛点原因：模板有结构但Benefit和Design章节为空，背景信息简短，内容不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@wangzhe123456789](https://gitcode.com/wangzhe123456789)    - `wangzhe123456789`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @wangzhe123456789    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3284    - [关联PR #7401（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7401)
- **[#3264](https://gitcode.com/cann/ops-transformer/issues/3264) [Bug-Report|缺陷反馈]: A3/A5 不兼容，报错ACL_FLOAT8_E8M0等不存在** — 55分
  - 痛点原因：模板结构完整但内容偏薄，环境仅写A3，日志填NaN无实质信息
  - 原文依据：
    - `huang-chuhong`：你好，有具体报错信息吗    - `iansheng`：更新代码后问题不复现，issue关闭    - `iansheng`：close    - `huang-chuhong`：closed from codehub    - `huang-chuhong`：changed custom state from 进行中 to 已完成
- **[#3259](https://gitcode.com/cann/ops-transformer/issues/3259) [Requirement|需求建议]: GroupedMatmulActivationQuant算子新增torch-extension适配** — 55分
  - 痛点原因：有结构化章节但内容极简，Design为空，缺乏详细设计说明。
  - 原文依据：
    - `zhoushaolong`：/assgin    - `zhoushaolong`：add label requirement    - `zhoushaolong`：assigned to @zhoushaolong    - [关联PR #6998（closed）](https://gitcode.com/cann/ops-transformer/merge_requests/6998)
- **[#3256](https://gitcode.com/cann/ops-transformer/issues/3256) [Requirement|需求建议]: 新增mqsmla & li_v2 & qli_v2 metadata算子的torch接口说明文档** — 55分
  - 痛点原因：模板有结构化章节但Benefit和Design部分留空，仅Background有内容，信息不完整。
  - 原文依据：
    - `huang-chuhong`：/assign [@qq_32807861](https://gitcode.com/qq_32807861)    - `qq_32807861`：/close    - `qq_32807861`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @qq_32807861
- **[#3236](https://gitcode.com/cann/ops-transformer/issues/3236) [Requirement|需求建议]: 商分删除已经合入主线的dsv4代码** — 55分
  - 痛点原因：有结构化模板但Benefit和Design章节为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `SH_jingsong`：add label requirement    - `cann-robot`：add label Accepted    - `SH_jingsong`：closed from codehub    - `SH_jingsong`：changed custom state from 进行中 to 已完成    - [关联PR #7238（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7238)    - [关联PR #7245（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7245)
- **[#3229](https://gitcode.com/cann/ops-transformer/issues/3229) [Requirement|需求建议]: [FIA]拦截fp8 per-block场景** — 55分
  - 痛点原因：模板章节存在但Benefit和Design部分为空，背景仅一句话，信息偏简略。
  - 原文依据：
    - `huang-chuhong`：/assign [@zhaoDan0110](https://gitcode.com/zhaoDan0110)    - `zhaoDan0110`：add label requirement    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @zhaoDan0110    - `zhaoDan0110`：closed from codehub    - `zhaoDan0110`：changed custom state from 进行中 to 已完成
- **[#3306](https://gitcode.com/cann/ops-transformer/issues/3306) [Bug-Report|缺陷反馈]: IFA算子tilling下沉里，缺少cpp文件导致链接失败** — 58分
  - 痛点原因：模板章节齐全但复现步骤和日志截图为空，问题描述本身清晰
  - 原文依据：
    - `huang-chuhong`：/assign [@wangchao661](https://gitcode.com/wangchao661)    - `cann-robot`：add label Accepted    - `cann-robot`：assigned to @wangchao661    - `wangchao661`：closed from codehub    - `wangchao661`：changed custom state from 进行中 to 已完成    - [关联PR #7506（open）](https://gitcode.com/cann/ops-transformer/merge_requests/7506)
- **[#3233](https://gitcode.com/cann/ops-transformer/issues/3233) [Requirement|需求建议]: 新增QLI_V2算子中入参query和key支持hifp8的特性** — 58分
  - 痛点原因：模板章节齐全但Benefit和Design部分为空，背景描述清晰但缺乏设计方案
  - 原文依据：
    - `huang-chuhong`：/assign [@zzzyh22](https://gitcode.com/zzzyh22)    - `zzzyh22`：add label requirement    - `cann-robot`：add label resolved    - `cann-robot`：assigned to @zzzyh22    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue3233    - [关联PR #7266（merged）](https://gitcode.com/cann/ops-transformer/merge_requests/7266)

## 5. 本周行动清单

### REC-01 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 讨论与解决 |
| 承接方 | 社区维护者；候选负责人 `huang-chuhong` |
| 触发条件 | Issue需要用户补充信息时 |
| 具体动作 | 添加needs-info标签并保持open状态至少72小时，设置自动提醒而非直接关闭 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 80 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 27.5，低分 38/40；OBJ_RESULT_FORMATION_TIMELINESS：均值 86.5，低分 2/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 86.5，低分 2/40 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 27.5，低分 38/40 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 仅有assign命令，无实质讨论，但通过PR创建到合并形成推进 | 明确下一步动作、阶段结论和推进记录 |

### REC-02 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 总结与关闭 |
| 承接方 | 社区维护者；候选负责人 `huang-chuhong` |
| 触发条件 | Issue信息不足需用户补充时 |
| 具体动作 | 添加needs-info标签并设置7天自动关闭计时器，而非立即关闭 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 18.5，低分 40/40；OBJ_DECISION_TRANSPARENCY：均值 61.0，低分 13/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 18.5，低分 40/40 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 61.0，低分 13/40 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | 社区维护者；候选负责人 `huang-chuhong` |
| 触发条件 | 维护者要求用户补充信息时 |
| 具体动作 | 将Issue标记为'awaiting-user-info'状态而非直接关闭，设置7天自动提醒 |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 60 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 59.5，低分 16/40；OBJ_RESPONSE_SPEED：均值 78.0，低分 2/40 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 59.5，低分 16/40 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 78.0，低分 2/40 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | huang-chuhong明确指派duxinlei，后者认领并创建修复PR | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **76.2/100**，整体相对可控，但仍需关注：文档反馈Issue批量模糊提交。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 89.9 | 内容为真实内部技术需求，含具体API和硬件细节，无AI幻觉迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 62.5 | 有结构化章节和详细设计方案，但作为需求建议缺少环境与预期对比信息。 |

代表低分 Issue：[#3381](https://gitcode.com/cann/ops-transformer/issues/3381)
问题：[Documentation|文档反馈]: moe目录下的文档存在代码错误、符号错误、命名不一致等问题。

### I1 · 分配与首次响应
本阶段分数为 **68.2/100**，整体相对可控，但仍需关注：要求补充信息后立即关闭。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 59.5 | 均值 59.5，低分 16/40 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 78.0 | 均值 78.0，低分 2/40 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 68.3 | huang-chuhong明确指派duxinlei，后者认领并创建修复PR |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 66.5 | 正确分配给duxinlei，其创建了文档修复PR，路由路径正确 |

代表低分 Issue：[#3250](https://gitcode.com/cann/ops-transformer/issues/3250)
问题：修复sfa/qsfa的一些重复代码。

### I2 · 讨论与解决
本阶段分数为 **56.4/100**，本阶段需要改进，主要问题是：要求补充后立即关闭未解决问题。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 86.5 | 均值 86.5，低分 2/40 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 27.5 | 均值 27.5，低分 38/40 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 51.3 | 仅有assign命令，无实质讨论，但通过PR创建到合并形成推进 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 59.9 | PR已合并修复两算子文档，用户目标基本满足，但无用户确认反馈 |

代表低分 Issue：[#3316](https://gitcode.com/cann/ops-transformer/issues/3316)
问题：个人晋升Committer申请。

### I3 · 总结与关闭
本阶段分数为 **45.8/100**，本阶段需要改进，主要问题是：未解决即关闭，关闭理由失真。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 18.5 | 均值 18.5，低分 40/40 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 61.0 | 均值 61.0，低分 13/40 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 40.5 | 关闭时未说明后续反馈路径或重新开启条件。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 69.1 | PR合并后由bot关闭，时机合理，无明显过早关闭风险 |

代表低分 Issue：[#3240](https://gitcode.com/cann/ops-transformer/issues/3240)
问题：[Bug-Report|缺陷反馈]: IFA全量化用例性能劣化。

### G · Bot/Agent 治理
本阶段分数为 **66.1/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 34.0 | 均值 34.0，低分 27/40 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 96.0 | 均值 96.0，低分 0/40 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 69.3 | bot处理分配后人工接续创建PR，MR合并后bot关闭，交接顺畅 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 64.4 | bot正确执行assign、MR合并关闭和加标签，流程治理有效 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 70.2 | bot动作准确合规：分配、关闭、加标签均无误判或错误阻断 |

代表低分 Issue：[#3380](https://gitcode.com/cann/ops-transformer/issues/3380)
问题：[Documentation|文档反馈]: mhc目录下的markdown文档存在正确性问题。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-22_to_2026-06-28 | 162 | 48.3 | 首期基线 | 76.2 | 68.2 | 56.4 | 45.8 | 66.1 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **18 位社区响应者**贡献 **133 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `huang-chuhong` | 104 |
| `weihao18` | 4 |
| `macech` | 4 |
| `kknan` | 3 |
| `huang-wei-chen` | 2 |

Top1 响应占比 **78.2%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-22_to_2026-06-28 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：93.6/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-transformer/report_cann-ops-transformer_2026-06-22_to_2026-06-28.json`。
