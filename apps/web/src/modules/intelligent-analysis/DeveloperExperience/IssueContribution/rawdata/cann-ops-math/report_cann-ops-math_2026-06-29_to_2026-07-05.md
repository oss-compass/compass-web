# Issue 贡献体验周报 · cann/ops-math

**周期：2026-06-29_to_2026-07-05**

> 本报告基于本周期内创建的 Issue 历史记录生成。体验判断来自模型对 Issue 线程的代读，不代表用户访谈或真实上手测试结果。

## 1. 执行摘要

+ 本周 `cann/ops-math` 共收到 **68** 个 Issue
+ 其中外部 Issue **24** 个、内部 **44** 个；I1–I3 及 G 基于「外部且成熟」的 **24** 个 Issue 统计（I0 创建阶段统计全部）。
+ **Open 16 / Closed 52**，关闭率 **76.5%**。
+ 总体体验分为 **47.4/100（D）**，本期作为首期基线。

当前主要短板集中在三个环节：

| 优先级 | 环节 | 分数 | 核心问题 |
| ------ | ---- | ----: | -------- |
| P0 | I3 · 总结与关闭 | 44.7 | 关闭缺乏解决证据与用户确认 |
| P0 | I2 · 讨论与解决 | 55.7 | 讨论停滞无跟进，长期搁置 |
| P1 | I1 · 分配与首次响应 | 64.7 | 标签与指派缺失，分流路径不明 |

本周建议 3 个 REC：

| REC-ID | 优先级 | 行动 |
| ------ | ------ | ---- |
| REC-01 | P0 | 在关闭评论中提供明确的解决证据或关闭理由，并等待用户至少3天确认 |
| REC-02 | P0 | 主动跟进评论，更新处理状态或请求补充信息 |
| REC-03 | P1 | 根据标题前缀自动添加类型标签，并根据关键词推荐assignee |

## 2. 本周关键数据

| 指标 | 结果 |
| ---- | ---- |
| Issue 总数 | 68 |
| Open / Closed | 16 / 52 |
| 关闭率 | 76.5% |
| 类型构成 | 缺陷 38 / 需求 12 / 其他 18 |
| 总体体验分 | 47.4/100（D） |
| 首次响应时间 | 中位 4.6h；均值 13.3h |
| 关闭周期 | 中位 16.1h；均值 2.8天 |
| 7天响应率 | 97.1% |
| 评论数/Issue | 0.91 |
| 标签覆盖率 | 76.5% |
| 指派覆盖率 | 70.6% |
| 数据完整性 | 89.2/100 |
| 置信度 | 高 |

## 3. 体验路径总览

| 阶段 | 分数 | 痛点 Issue | 判断 | 主要拖累指标 |
| ---- | ----: | ---------- | ---- | ------------ |
| I0 · 创建 | 77.5 | 4/68（5.9%） | 相对可控 | `SUB_INPUT_QUALITY` 64.8 |
| I1 · 分配与首次响应 | 64.7 | 10/24（41.7%） | 相对可控 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 53.3 |
| I2 · 讨论与解决 | 55.7 | 13/24（54.2%） | P0 | `OBJ_SOLUTION_EVIDENCE` 28.5 |
| I3 · 总结与关闭 | 44.7 | 21/24（87.5%） | P0 | `OBJ_CLOSURE_REUSE` 20.2 |
| G · Bot/Agent 治理（参考） | 62.5 | 10/24（41.7%） | 参考项 | `OBJ_BOT_GOVERNANCE` 31.7 |

## 4. 主要问题

| PP-ID | 优先级 | 阶段 | 问题 | 关键指标 | 影响 |
| ----- | ------ | ---- | ---- | -------- | ---- |
| PP-01 | P0 | I3 · 总结与关闭 | 关闭缺乏解决证据与用户确认 | OBJ_CLOSURE_REUSE：均值 20.2，低分 22/24；OBJ_DECISION_TRANSPARENCY：均值 51.9，低分 13/24 | 用户问题未真正解决，社区信任受损，知识无法沉淀复用 |
| PP-02 | P0 | I2 · 讨论与解决 | 讨论停滞无跟进，长期搁置 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 23/24；OBJ_RESULT_FORMATION_TIMELINESS：均值 85.0，低分 2/24 | 问题悬而未决，用户流失，社区活跃度与信任度下降 |
| PP-03 | P1 | I1 · 分配与首次响应 | 标签与指派缺失，分流路径不明 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 53.3，低分 10/24；OBJ_RESPONSE_SPEED：均值 80.0，低分 0/24 | 问题无法被正确路由到责任人，处理效率低下，问题遗漏 |
| PP-04 | P1 | G · Bot/Agent 治理 | Bot缺位率高，自动化覆盖不足 | OBJ_BOT_GOVERNANCE：均值 31.7，低分 17/24；OBJ_BOT_MISCLOSE_REVERSE：均值 94.2，低分 0/24 | 大量issue缺乏自动化标签、分流和跟进提醒，治理效率低，人工负担重 |
| PP-05 | P2 | I3 · 总结与关闭 | PR合并后Issue未关闭，闭环缺失 | OBJ_CLOSURE_REUSE：均值 20.2，低分 22/24；OBJ_DECISION_TRANSPARENCY：均值 51.9，低分 13/24 | issue列表堆积，状态不准确，影响社区对问题处理进度的感知 |

### 4.1 低分 Issue 明细

#### PP-01 关闭缺乏解决证据与用户确认（I3 · 总结与关闭）

- **[#2142](https://gitcode.com/cann/ops-math/issues/2142) [Bug-Report|缺陷反馈]: [Bug-Report|缺陷反馈]: build.sh中ASCEND_OPP_PATH环境变量未定义但被引用，导致编译头…** — 0分
  - 痛点原因：关闭时无任何说明文字，仅口头建议设置环境变量，未将解决方案文档化，无法供他人复用。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。建议使用 'source ${install_path}/cann/set_env.sh' ，一键设置所有环境变量，可以避免上述问题及更多的环境变量未加载问题。
- **[#2141](https://gitcode.com/cann/ops-math/issues/2141) [Bug-Report|缺陷反馈]: 编译opbase_util_objs时缺少pkg_include路径，提示头文件找不到** — 0分
  - 痛点原因：关闭时未留下任何解决方案说明、文档或复用链接，无法供后续用户参考。
  - 原文依据：
    - `chensi79`：您好，请问该错误是否必现？请提供详细的cann环境版本、操作步骤，便于我们进一步定位分析
- **[#2136](https://gitcode.com/cann/ops-math/issues/2136) Fmod算子是否有计划支持bfloat16数据类型？** — 0分
  - 痛点原因：关闭说明为0字且未提供重复issue链接，未沉淀最终结论，导致其他用户无法直接复用。
  - 原文依据：
    - `chenqi317`：在ascend910b 上支持BF16 若您自行开发Fmod 算子 ，建议：将输入的 BF16 提升精度为 FP32 进行中间计算，最后再将 FP32 结果降级回 BF16 输出。 若需要库上算子支持BF16 。请@zhou-qilong…    - `yolic`：您好，感谢提出，Fmod算子属于ops-math仓算子，issue已转移至math仓进行处理。    - `zhou-qilong`：fmod是指floor_mod吗，这个是支持bfloat16的。详细见：https://gitcode.com/cann/ops-math/blob/master/math/floor_mod/README.md
- **[#2134](https://gitcode.com/cann/ops-math/issues/2134) [Requirement|需求建议]: 增加FresnelSin算子的AscendC实现** — 0分
  - 痛点原因：仅由机器人自动关联PR关闭，无人工关闭说明与方案文档沉淀，导致其他用户无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2134    - `cann-robot`：add label resolved    - [关联PR #3644（merged）](https://gitcode.com/cann/ops-math/merge_requests/3644)
- **[#2128](https://gitcode.com/cann/ops-math/issues/2128) [Documentation|文档反馈]: aclnn的确定性计算在aclnn*.md中已呈现；算子的README中不再重复呈现** — 0分
  - 痛点原因：关闭时未留下任何文字说明，仅指派责任人，缺乏处理过程与结果记录，导致其他用户无法参考。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `songkai111`：assigned to @sunchun
- **[#2125](https://gitcode.com/cann/ops-math/issues/2125) [Requirement|需求建议]:** — 0分
  - 痛点原因：因信息量少被关闭，关闭说明仅7字且无方案文档与重复链接，未留下任何可复用经验。
  - 原文依据：
    - `songkai111`：closed from codehub    - `qq_41784998`：我觉的有点问题    - `songkai111`：当前issue信息量较少，请明确问题或者需求后，重新提出issue
- **[#2120](https://gitcode.com/cann/ops-math/issues/2120) [Bug-Report|缺陷反馈]: 修复算子transpose的部分用例性能劣化** — 0分
  - 痛点原因：仅由机器人关联MR合并自动关闭，无人工关闭说明、方案文档沉淀及重复链接，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2120    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - [关联PR #3705（merged）](https://gitcode.com/cann/ops-math/merge_requests/3705)
- **[#2093](https://gitcode.com/cann/ops-math/issues/2093) [Bug-Report|缺陷反馈]: aclnnLogAddExp2 950芯片私有数据格式未拦截** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与主链接，仅靠机器人随PR合并自动关闭，缺乏可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2093    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3653（merged）](https://gitcode.com/cann/ops-math/merge_requests/3653)    - [关联PR #3654（merged）](https://gitcode.com/cann/ops-math/merge_requests/3654)
- **[#2089](https://gitcode.com/cann/ops-math/issues/2089) [Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误** — 0分
  - 痛点原因：仅由机器人关联PR自动关闭，无方案文档化记录且关闭说明为0字，未沉淀任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2089    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3628（merged）](https://gitcode.com/cann/ops-math/merge_requests/3628)    - [关联PR #3643（merged）](https://gitcode.com/cann/ops-math/merge_requests/3643)
- **[#2084](https://gitcode.com/cann/ops-math/issues/2084) [Bug-Report|缺陷反馈]: LogAddExp 950实现小值域精度问题及数据格式拦截** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人因关联PR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2084    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3611（merged）](https://gitcode.com/cann/ops-math/merge_requests/3611)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-math/merge_requests/3631)
- **[#2081](https://gitcode.com/cann/ops-math/issues/2081) 算子原型库有46个算子同时注册math/nn/cv/transformer和legacy仓，geir使用子仓编译报错，请解决** — 0分
  - 痛点原因：未输出方案文档，未关联重复issue，且关闭说明仅7字，未沉淀解决经验供后续复用。
  - 原文依据：
    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：已删除重复原型
- **[#2077](https://gitcode.com/cann/ops-math/issues/2077) trilu算子资料修改** — 0分
  - 痛点原因：关闭说明为空且无方案文档与主链接，仅靠机器人自动关联PR关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2077    - `cann-robot`：add label resolved    - [关联PR #3557（merged）](https://gitcode.com/cann/ops-math/merge_requests/3557)
- **[#2098](https://gitcode.com/cann/ops-math/issues/2098) [Bug-Report|缺陷反馈]: CMake 报 "binary directory already used" 错误** — 25分
  - 痛点原因：维护者仅指出主线无此问题并让用户自查，未提供根因分析与解决方案，无文档化沉淀，对后续复用无参考价值。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `songkai111`：你好，当前主线代码中，experimental/CMakeLists.txt中，并没有反馈的add_subdirectory(math)，请审查一下本地代码是否有问题？
- **[#2143](https://gitcode.com/cann/ops-math/issues/2143) [Bug-Report|缺陷反馈]: install_deps.sh 在 Ubuntu 18.04 安装 CMake 时管道命令被 run_command 吞…** — 30分
  - 痛点原因：关闭说明仅17字且为机器人自动回复，未人工总结问题原因与修复方案，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2143    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，问题确认和修复中。    - [关联PR #3865（merged）](https://gitcode.com/cann/ops-math/merge_requests/3865)
- **[#2129](https://gitcode.com/cann/ops-math/issues/2129) [Documentation|文档反馈]: aclTensor类型的参数，shape不应该是不涉及** — 30分
  - 痛点原因：关闭说明仅15字且为系统提示，未将算子默认支持1-8维的结论沉淀其中，缺乏对其他用户的参考价值。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `songkai111`：您好，正在查找该算子责任人处理    - `sunchun`：您好，这种标注不是不涉及，是算子默认支持1-8维。    - `songkai111`：assigned to @sunchun
- **[#2127](https://gitcode.com/cann/ops-math/issues/2127) [Documentation|文档反馈]: 这三项应该是满足任一就报错吧，建议修改为三条表述，用item list样式** — 30分
  - 痛点原因：关闭说明仅14字过于简略，且未提供dup主链接，导致问题解决过程和方案缺乏有效沉淀与复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：你好，正在查找算子责任人处理    - `sunchun`：您好，算子是针对self的数据类型进行检验的，放在这一条是为了，指针对数据类型的检验进行的报错。    - `songkai111`：assigned to @sunchun
- **[#2126](https://gitcode.com/cann/ops-math/issues/2126) [Documentation|文档反馈]: 字体大小不一致，是否正常显示；加粗格式不一致** — 30分
  - 痛点原因：关闭说明仅12字且为系统自动操作，未交代问题最终解决结论或文档去向，无法提供有效复用参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：你好，正在查找责任人处理    - `sunchun`：您好，这个是正常显示的，这是非问题，文档的固定格式就是这样的。    - `songkai111`：assigned to @sunchun
- **[#2117](https://gitcode.com/cann/ops-math/issues/2117) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档9.1.0** — 30分
  - 痛点原因：机器人自动关联PR关闭且关闭说明为0字，未沉淀任何复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2117    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3707（merged）](https://gitcode.com/cann/ops-math/merge_requests/3707)
- **[#2116](https://gitcode.com/cann/ops-math/issues/2116) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因关联MR合并自动关闭，无dup主链接，缺乏人工总结的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2116    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3704（merged）](https://gitcode.com/cann/ops-math/merge_requests/3704)
- **[#2078](https://gitcode.com/cann/ops-math/issues/2078) [Documentation|文档反馈]: aclnnComplex资料问题修改** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人因关联PR合并自动关闭，缺乏人工总结与经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2078    - `m0_55003149`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3613（merged）](https://gitcode.com/cann/ops-math/merge_requests/3613)    - [关联PR #3615（merged）](https://gitcode.com/cann/ops-math/merge_requests/3615)
- **[#2121](https://gitcode.com/cann/ops-math/issues/2121) [Bug-Report|缺陷反馈]: 使用atc将deimv2模型转换为om模型时精度大幅度下降** — 45分
  - 痛点原因：关闭说明仅指引用户去其他仓库咨询，未提供实际解决方案与排查过程，无文档沉淀，无法供后续参考。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `chensi79`：你好，math仓为算子仓，模型相关问题请于 https://gitcode.com/cann/cann-recipes-train 或者 https://gitcode.com/cann/cann-recipes-infer 咨询
- **[#2145](https://gitcode.com/cann/ops-math/issues/2145) [Documentation|文档反馈]：优化主页【学习教程】中【进阶教程】超链接的指向路径** — 55分
  - 痛点原因：虽方案已文档化，但关闭说明仅84字且无主链接，未清晰沉淀最终解决路径供后续参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `chensi79`：您好，请问您的导流预期是跳转到哪里，能否给个参考设计案例？ 目前math仓的设计为：根目录/README 为仓库软件和文档总的入口，docs/readme是文档的总入口    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。
#### PP-02 讨论停滞无跟进，长期搁置（I2 · 讨论与解决）

- **[#2077](https://gitcode.com/cann/ops-math/issues/2077) trilu算子资料修改** — 0分
  - 痛点原因：虽有关联PR，但无commit引用、文档链接及人工关闭评论，仅靠机器人自动关闭，缺乏实质性解决证据。
  - 原文依据：
    - [关联PR #3557（merged）](https://gitcode.com/cann/ops-math/merge_requests/3557)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2077    - `cann-robot`：add label resolved
- **[#2142](https://gitcode.com/cann/ops-math/issues/2142) [Bug-Report|缺陷反馈]: [Bug-Report|缺陷反馈]: build.sh中ASCEND_OPP_PATH环境变量未定义但被引用，导致编译头…** — 15分
  - 痛点原因：仅给出建议命令，无关联PR、代码提交或文档链接等实质性修复证据。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。建议使用 'source ${install_path}/cann/set_env.sh' ，一键设置所有环境变量，可以避免上述问题及更多的环境变量未加载问题。
- **[#2141](https://gitcode.com/cann/ops-math/issues/2141) [Bug-Report|缺陷反馈]: 编译opbase_util_objs时缺少pkg_include路径，提示头文件找不到** — 15分
  - 痛点原因：仅有release引用，无关联PR与commit引用，且维护者仍在索要复现步骤，缺乏问题已解决的证据。
  - 原文依据：
    - `chensi79`：您好，请问该错误是否必现？请提供详细的cann环境版本、操作步骤，便于我们进一步定位分析
- **[#2136](https://gitcode.com/cann/ops-math/issues/2136) Fmod算子是否有计划支持bfloat16数据类型？** — 15分
  - 痛点原因：仅通过评论澄清算子并提供文档链接，无关联PR、commit等代码层面的实质性解决证据。
  - 原文依据：
    - `chenqi317`：在ascend910b 上支持BF16 若您自行开发Fmod 算子 ，建议：将输入的 BF16 提升精度为 FP32 进行中间计算，最后再将 FP32 结果降级回 BF16 输出。 若需要库上算子支持BF16 。请@zhou-qilong…    - `yolic`：您好，感谢提出，Fmod算子属于ops-math仓算子，issue已转移至math仓进行处理。    - `zhou-qilong`：fmod是指floor_mod吗，这个是支持bfloat16的。详细见：https://gitcode.com/cann/ops-math/blob/master/math/floor_mod/README.md
- **[#2128](https://gitcode.com/cann/ops-math/issues/2128) [Documentation|文档反馈]: aclnn的确定性计算在aclnn*.md中已呈现；算子的README中不再重复呈现** — 15分
  - 痛点原因：仅分配了责任人，无关联PR、commit引用及关闭评论等实际解决证据。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `songkai111`：assigned to @sunchun
- **[#2120](https://gitcode.com/cann/ops-math/issues/2120) [Bug-Report|缺陷反馈]: 修复算子transpose的部分用例性能劣化** — 15分
  - 痛点原因：仅靠机器人自动关联PR并关闭，缺乏commit引用、文档链接及人工关闭说明等关键解决证据。
  - 原文依据：
    - [关联PR #3705（merged）](https://gitcode.com/cann/ops-math/merge_requests/3705)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2120    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted
- **[#2117](https://gitcode.com/cann/ops-math/issues/2117) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档9.1.0** — 15分
  - 痛点原因：仅靠机器人自动关闭和打标签，缺乏commit引用、release引用及人工确认的实质性解决说明。
  - 原文依据：
    - [关联PR #3707（merged）](https://gitcode.com/cann/ops-math/merge_requests/3707)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2117    - `h1234515`：add label documentation    - `cann-robot`：add label resolved
- **[#2116](https://gitcode.com/cann/ops-math/issues/2116) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档** — 15分
  - 痛点原因：虽有合并的关联PR，但无commit引用、release引用及人工关闭评论，仅靠机器人自动关闭，证据链不完整。
  - 原文依据：
    - [关联PR #3704（merged）](https://gitcode.com/cann/ops-math/merge_requests/3704)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2116    - `h1234515`：add label documentation    - `cann-robot`：add label resolved
- **[#2093](https://gitcode.com/cann/ops-math/issues/2093) [Bug-Report|缺陷反馈]: aclnnLogAddExp2 950芯片私有数据格式未拦截** — 15分
  - 痛点原因：虽有合并的关联PR，但无commit引用与文档链接，且仅由机器人自动关闭，缺乏人工解决说明。
  - 原文依据：
    - [关联PR #3653（merged）](https://gitcode.com/cann/ops-math/merge_requests/3653)    - [关联PR #3654（merged）](https://gitcode.com/cann/ops-math/merge_requests/3654)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2093    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved
- **[#2089](https://gitcode.com/cann/ops-math/issues/2089) [Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误** — 15分
  - 痛点原因：虽有合并的关联PR，但缺乏commit引用与文档链接，且关闭评论仅为机器人自动回复，无人工解决说明。
  - 原文依据：
    - [关联PR #3628（merged）](https://gitcode.com/cann/ops-math/merge_requests/3628)    - [关联PR #3643（merged）](https://gitcode.com/cann/ops-math/merge_requests/3643)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2089    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved
- **[#2084](https://gitcode.com/cann/ops-math/issues/2084) [Bug-Report|缺陷反馈]: LogAddExp 950实现小值域精度问题及数据格式拦截** — 15分
  - 痛点原因：虽有合并的PR，但仅由机器人自动关闭，缺乏commit引用、文档链接及人工关闭评论。
  - 原文依据：
    - [关联PR #3611（merged）](https://gitcode.com/cann/ops-math/merge_requests/3611)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-math/merge_requests/3631)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2084    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved
- **[#2125](https://gitcode.com/cann/ops-math/issues/2125) [Requirement|需求建议]:** — 23分
  - 痛点原因：缺乏关联PR、代码提交及文档等实质解决证据，仅因信息不足被直接关闭。
  - 原文依据：
    - `qq_41784998`：我觉的有点问题    - `songkai111`：当前issue信息量较少，请明确问题或者需求后，重新提出issue    - `songkai111`：closed from codehub
- **[#2121](https://gitcode.com/cann/ops-math/issues/2121) [Bug-Report|缺陷反馈]: 使用atc将deimv2模型转换为om模型时精度大幅度下降** — 23分
  - 痛点原因：仅因提交错仓被引导转移并关闭，未提供任何关联PR、代码提交或文档等实际修复证据。
  - 原文依据：
    - `chensi79`：你好，math仓为算子仓，模型相关问题请于 https://gitcode.com/cann/cann-recipes-train 或者 https://gitcode.com/cann/cann-recipes-infer 咨询    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2098](https://gitcode.com/cann/ops-math/issues/2098) [Bug-Report|缺陷反馈]: CMake 报 "binary directory already used" 错误** — 23分
  - 痛点原因：无关联PR或commit等修复证据，仅凭简单回复和状态变更关闭，缺乏实质性解决证明。
  - 原文依据：
    - `songkai111`：你好，当前主线代码中，experimental/CMakeLists.txt中，并没有反馈的add_subdirectory(math)，请审查一下本地代码是否有问题？    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成
- **[#2134](https://gitcode.com/cann/ops-math/issues/2134) [Requirement|需求建议]: 增加FresnelSin算子的AscendC实现** — 31分
  - 痛点原因：仅靠机器人自动关闭并打标签，缺乏人工解决评论、文档链接和release引用等实质性证据。
  - 原文依据：
    - [关联PR #3644（merged）](https://gitcode.com/cann/ops-math/merge_requests/3644)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2134    - `cann-robot`：add label resolved
- **[#2145](https://gitcode.com/cann/ops-math/issues/2145) [Documentation|文档反馈]：优化主页【学习教程】中【进阶教程】超链接的指向路径** — 38分
  - 痛点原因：无关联PR或commit引用，维护者因信息不足直接关闭并标记完成，缺乏实际解决证据。
  - 原文依据：
    - `chensi79`：您好，请问您的导流预期是跳转到哪里，能否给个参考设计案例？ 目前math仓的设计为：根目录/README 为仓库软件和文档总的入口，docs/readme是文档的总入口    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2129](https://gitcode.com/cann/ops-math/issues/2129) [Documentation|文档反馈]: aclTensor类型的参数，shape不应该是不涉及** — 38分
  - 痛点原因：未关联PR或commit等实质性修改证据，仅通过评论解释后直接关闭。
  - 原文依据：
    - `songkai111`：您好，正在查找该算子责任人处理    - `sunchun`：您好，这种标注不是不涉及，是算子默认支持1-8维。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `songkai111`：assigned to @sunchun
- **[#2127](https://gitcode.com/cann/ops-math/issues/2127) [Documentation|文档反馈]: 这三项应该是满足任一就报错吧，建议修改为三条表述，用item list样式** — 38分
  - 痛点原因：缺乏PR和commit等代码修改证据，仅凭口头解释和状态流转关闭，无法证明问题已实际解决。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `sunchun`：您好，算子是针对self的数据类型进行检验的，放在这一条是为了，指针对数据类型的检验进行的报错。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @sunchun
- **[#2126](https://gitcode.com/cann/ops-math/issues/2126) [Documentation|文档反馈]: 字体大小不一致，是否正常显示；加粗格式不一致** — 38分
  - 痛点原因：仅口头说明非问题并关闭，无关联PR、commit或release等实质性变更证据支撑。
  - 原文依据：
    - `songkai111`：你好，正在查找责任人处理    - `sunchun`：您好，这个是正常显示的，这是非问题，文档的固定格式就是这样的。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @sunchun
- **[#2081](https://gitcode.com/cann/ops-math/issues/2081) 算子原型库有46个算子同时注册math/nn/cv/transformer和legacy仓，geir使用子仓编译报错，请解决** — 38分
  - 痛点原因：缺乏关联PR和commit引用，仅凭人工评论和状态变更关闭，无代码级可追溯证据。
  - 原文依据：
    - `songkai111`：已删除重复原型    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2078](https://gitcode.com/cann/ops-math/issues/2078) [Documentation|文档反馈]: aclnnComplex资料问题修改** — 46分
  - 痛点原因：虽有合并PR，但缺少release引用证明修复发布，且无人工关闭评论说明解决情况，仅靠机器人自动关闭导致证据偏弱。
  - 原文依据：
    - [关联PR #3613（merged）](https://gitcode.com/cann/ops-math/merge_requests/3613)    - [关联PR #3615（merged）](https://gitcode.com/cann/ops-math/merge_requests/3615)    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2078    - `m0_55003149`：add label documentation    - `cann-robot`：add label resolved
- **[#2144](https://gitcode.com/cann/ops-math/issues/2144) [Bug-Report|缺陷反馈]:hans_encode kernel编译报错** — 54分
  - 痛点原因：无关联PR与commit引用，仅提供文档链接，且因缺乏定位信息被直接关闭，未给出实际解决报错的代码修复证据。
  - 原文依据：
    - `chensi79`：您好，请问您的cann包版本是什么？建议参考教程 https://gitcode.com/cann/ops-math/blob/master/docs/zh/install/quick_install.md 检查安装环境    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
- **[#2139](https://gitcode.com/cann/ops-math/issues/2139) [Bug-Report|缺陷反馈]: ops-math 仓库示例入口和运行说明不够集中，影响新开发者快速复现样例** — 54分
  - 痛点原因：仅口头说明已解决便关闭，缺乏关联PR和commit引用等代码层面的直接修复证据。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。math仓根目录的README中有一篇快速入门的指导文档，![image.png](https://raw.gitcode.com/user-images/assets/7649531/cd1e2839-471a-428a…    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted
#### PP-03 标签与指派缺失，分流路径不明（I1 · 分配与首次响应）

- **[#2134](https://gitcode.com/cann/ops-math/issues/2134) [Requirement|需求建议]: 增加FresnelSin算子的AscendC实现** — 0分
  - 痛点原因：全程无人工实质回应，仅由机器人自动响应并在关联PR合并后直接关闭。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2134    - [关联PR #3644（merged）](https://gitcode.com/cann/ops-math/merge_requests/3644)
- **[#2128](https://gitcode.com/cann/ops-math/issues/2128) [Documentation|文档反馈]: aclnn的确定性计算在aclnn*.md中已呈现；算子的README中不再重复呈现** — 0分
  - 痛点原因：首次响应仅流转和指派责任人，未针对文档反馈提供任何实质性解答或处理方案，导致实质回应缺失。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `songkai111`：assigned to @sunchun
- **[#2120](https://gitcode.com/cann/ops-math/issues/2120) [Bug-Report|缺陷反馈]: 修复算子transpose的部分用例性能劣化** — 0分
  - 痛点原因：全程仅机器人自动打标签和关闭，人工仅修改状态，无任何实质性的技术回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2120    - `jzj007`：changed custom state from 进行中 to 已完成    - [关联PR #3705（merged）](https://gitcode.com/cann/ops-math/merge_requests/3705)
- **[#2117](https://gitcode.com/cann/ops-math/issues/2117) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档9.1.0** — 0分
  - 痛点原因：首次响应仅添加标签，全程无人工实质回应，最终由机器人在关联PR合并后自动关闭。
  - 原文依据：
    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2117    - [关联PR #3707（merged）](https://gitcode.com/cann/ops-math/merge_requests/3707)
- **[#2116](https://gitcode.com/cann/ops-math/issues/2116) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档** — 0分
  - 痛点原因：全程仅机器人打标签并在关联PR合并后自动关闭，无任何人工实质性回应。
  - 原文依据：
    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2116    - [关联PR #3704（merged）](https://gitcode.com/cann/ops-math/merge_requests/3704)
- **[#2093](https://gitcode.com/cann/ops-math/issues/2093) [Bug-Report|缺陷反馈]: aclnnLogAddExp2 950芯片私有数据格式未拦截** — 0分
  - 痛点原因：全程仅机器人加标签并随PR合并自动关闭，无任何人工实质回应。
  - 原文依据：
    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2093    - [关联PR #3653（merged）](https://gitcode.com/cann/ops-math/merge_requests/3653)    - [关联PR #3654（merged）](https://gitcode.com/cann/ops-math/merge_requests/3654)
- **[#2089](https://gitcode.com/cann/ops-math/issues/2089) [Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误** — 0分
  - 痛点原因：仅打标签后由机器人随PR合并自动关闭，全程无人工实质回应。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2089    - [关联PR #3628（merged）](https://gitcode.com/cann/ops-math/merge_requests/3628)    - [关联PR #3643（merged）](https://gitcode.com/cann/ops-math/merge_requests/3643)
- **[#2084](https://gitcode.com/cann/ops-math/issues/2084) [Bug-Report|缺陷反馈]: LogAddExp 950实现小值域精度问题及数据格式拦截** — 0分
  - 痛点原因：首次响应仅加标签，全程无人工实质性技术回应，直接由机器人关联PR关闭。
  - 原文依据：
    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2084    - [关联PR #3611（merged）](https://gitcode.com/cann/ops-math/merge_requests/3611)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-math/merge_requests/3631)
- **[#2078](https://gitcode.com/cann/ops-math/issues/2078) [Documentation|文档反馈]: aclnnComplex资料问题修改** — 0分
  - 痛点原因：仅添加标签并由机器人关联PR合并关闭，全程无人工实质回应内容。
  - 原文依据：
    - `m0_55003149`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2078    - [关联PR #3613（merged）](https://gitcode.com/cann/ops-math/merge_requests/3613)    - [关联PR #3615（merged）](https://gitcode.com/cann/ops-math/merge_requests/3615)
- **[#2077](https://gitcode.com/cann/ops-math/issues/2077) trilu算子资料修改** — 0分
  - 痛点原因：仅有机器人快速响应并随关联PR合并关闭，全程无人工实质回应。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2077    - [关联PR #3557（merged）](https://gitcode.com/cann/ops-math/merge_requests/3557)
#### PP-04 Bot缺位率高，自动化覆盖不足（G · Bot/Agent 治理）

- **[#2145](https://gitcode.com/cann/ops-math/issues/2145) [Documentation|文档反馈]：优化主页【学习教程】中【进阶教程】超链接的指向路径** — 20分
  - 痛点原因：Bot仅完成打标，未提供自动回复与关闭等治理动作，未能辅助人工进行有效交互。
  - 原文依据：
    - `chensi79`：您好，请问您的导流预期是跳转到哪里，能否给个参考设计案例？ 目前math仓的设计为：根目录/README 为仓库软件和文档总的入口，docs/readme是文档的总入口    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2144](https://gitcode.com/cann/ops-math/issues/2144) [Bug-Report|缺陷反馈]:hans_encode kernel编译报错** — 20分
  - 痛点原因：Bot仅完成打标，无自动评论与关闭操作，实际沟通和关闭均依赖人工，未发挥实质治理作用。
  - 原文依据：
    - `chensi79`：您好，请问您的cann包版本是什么？建议参考教程 https://gitcode.com/cann/ops-math/blob/master/docs/zh/install/quick_install.md 检查安装环境    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2143](https://gitcode.com/cann/ops-math/issues/2143) [Bug-Report|缺陷反馈]: install_deps.sh 在 Ubuntu 18.04 安装 CMake 时管道命令被 run_command 吞…** — 20分
  - 痛点原因：Bot关闭时关联了错误的合并请求（提及issue2143而非实际PR#3865），且无任何有效评论，治理行为不准确。
  - 原文依据：
    - `chensi79`：您好，感谢反馈，问题确认和修复中。    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2143    - [关联PR #3865（merged）](https://gitcode.com/cann/ops-math/merge_requests/3865)
- **[#2139](https://gitcode.com/cann/ops-math/issues/2139) [Bug-Report|缺陷反馈]: ops-math 仓库示例入口和运行说明不够集中，影响新开发者快速复现样例** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭或评论回复，治理介入停留在浅层，缺乏深度自动化能力。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。math仓根目录的README中有一篇快速入门的指导文档，![image.png](https://raw.gitcode.com/user-images/assets/7649531/cd1e2839-471a-428a…    - `sunchun`：您好，当前问题已经解决，我们计划关闭此ISSUE，后续您如果还有疑问，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。    - `cann-robot`：add label Accepted    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2134](https://gitcode.com/cann/ops-math/issues/2134) [Requirement|需求建议]: 增加FresnelSin算子的AscendC实现** — 20分
  - 痛点原因：Bot关闭时关联了错误的issue号且未发表任何评论说明，导致治理过程不透明且无效。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2134    - [关联PR #3644（merged）](https://gitcode.com/cann/ops-math/merge_requests/3644)
- **[#2127](https://gitcode.com/cann/ops-math/issues/2127) [Documentation|文档反馈]: 这三项应该是满足任一就报错吧，建议修改为三条表述，用item list样式** — 20分
  - 痛点原因：Bot仅执行打标操作，未进行评论互动或关闭issue，治理动作单一，缺乏实际推进作用。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `sunchun`：您好，算子是针对self的数据类型进行检验的，放在这一条是为了，指针对数据类型的检验进行的报错。    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @sunchun    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2126](https://gitcode.com/cann/ops-math/issues/2126) [Documentation|文档反馈]: 字体大小不一致，是否正常显示；加粗格式不一致** — 20分
  - 痛点原因：Bot仅执行打标，在人工判定为非问题后未自动关闭issue，缺乏后续自动化治理动作，未形成闭环。
  - 原文依据：
    - `songkai111`：你好，正在查找责任人处理    - `sunchun`：您好，这个是正常显示的，这是非问题，文档的固定格式就是这样的。    - `cann-robot`：add label Accepted    - `songkai111`：assigned to @sunchun    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成
- **[#2121](https://gitcode.com/cann/ops-math/issues/2121) [Bug-Report|缺陷反馈]: 使用atc将deimv2模型转换为om模型时精度大幅度下降** — 20分
  - 痛点原因：Bot仅完成打标，未提供自动引导或关闭，问题流转与跨仓引导完全依赖人工，自动化治理作用极低。
  - 原文依据：
    - `chensi79`：你好，math仓为算子仓，模型相关问题请于 https://gitcode.com/cann/cann-recipes-train 或者 https://gitcode.com/cann/cann-recipes-infer 咨询    - `cann-robot`：add label Accepted    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成
- **[#2120](https://gitcode.com/cann/ops-math/issues/2120) [Bug-Report|缺陷反馈]: 修复算子transpose的部分用例性能劣化** — 20分
  - 痛点原因：Bot仅机械执行打标和关联关闭，全程无说明性评论与用户互动，治理过程缺乏透明度。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2120    - `jzj007`：changed custom state from 进行中 to 已完成    - [关联PR #3705（merged）](https://gitcode.com/cann/ops-math/merge_requests/3705)
- **[#2117](https://gitcode.com/cann/ops-math/issues/2117) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档9.1.0** — 20分
  - 痛点原因：Bot仅机械打标与关闭，无任何有效评论互动，且关闭原因提及的关联信息与实际PR不符。
  - 原文依据：
    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2117    - [关联PR #3707（merged）](https://gitcode.com/cann/ops-math/merge_requests/3707)
- **[#2116](https://gitcode.com/cann/ops-math/issues/2116) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档** — 20分
  - 痛点原因：Bot仅机械执行打标与自动关闭，无任何评论互动，缺乏人工确认环节，治理流于形式。
  - 原文依据：
    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2116    - [关联PR #3704（merged）](https://gitcode.com/cann/ops-math/merge_requests/3704)
- **[#2093](https://gitcode.com/cann/ops-math/issues/2093) [Bug-Report|缺陷反馈]: aclnnLogAddExp2 950芯片私有数据格式未拦截** — 20分
  - 痛点原因：Bot仅机械打标并随PR合并关闭，全程无任何评论说明，治理过程缺乏透明度与用户反馈。
  - 原文依据：
    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2093    - [关联PR #3653（merged）](https://gitcode.com/cann/ops-math/merge_requests/3653)    - [关联PR #3654（merged）](https://gitcode.com/cann/ops-math/merge_requests/3654)
- **[#2089](https://gitcode.com/cann/ops-math/issues/2089) [Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误** — 20分
  - 痛点原因：Bot仅机械执行打标与关闭，全程无任何评论与用户互动，导致治理过程不透明。
  - 原文依据：
    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2089    - [关联PR #3628（merged）](https://gitcode.com/cann/ops-math/merge_requests/3628)    - [关联PR #3643（merged）](https://gitcode.com/cann/ops-math/merge_requests/3643)
- **[#2084](https://gitcode.com/cann/ops-math/issues/2084) [Bug-Report|缺陷反馈]: LogAddExp 950实现小值域精度问题及数据格式拦截** — 20分
  - 痛点原因：Bot仅执行机械打标与关闭，评论数为零，缺乏与用户的有效沟通及状态同步说明，治理效果不佳。
  - 原文依据：
    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2084    - [关联PR #3611（merged）](https://gitcode.com/cann/ops-math/merge_requests/3611)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-math/merge_requests/3631)
- **[#2081](https://gitcode.com/cann/ops-math/issues/2081) 算子原型库有46个算子同时注册math/nn/cv/transformer和legacy仓，geir使用子仓编译报错，请解决** — 20分
  - 痛点原因：Bot仅完成打标，未执行自动关闭与评论互动，治理动作单一且缺乏闭环。
  - 原文依据：
    - `songkai111`：已删除重复原型    - `cann-robot`：add label Accepted    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成
- **[#2078](https://gitcode.com/cann/ops-math/issues/2078) [Documentation|文档反馈]: aclnnComplex资料问题修改** — 20分
  - 痛点原因：Bot仅机械打标和关闭，全程无评论互动，缺乏对用户的状态同步与进度反馈。
  - 原文依据：
    - `m0_55003149`：add label documentation    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2078    - [关联PR #3613（merged）](https://gitcode.com/cann/ops-math/merge_requests/3613)    - [关联PR #3615（merged）](https://gitcode.com/cann/ops-math/merge_requests/3615)
- **[#2077](https://gitcode.com/cann/ops-math/issues/2077) trilu算子资料修改** — 20分
  - 痛点原因：Bot仅机械执行打标与随PR合并关闭，全程无任何评论互动，缺乏治理透明度与有效沟通。
  - 原文依据：
    - `cann-robot`：add label resolved    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2077    - [关联PR #3557（merged）](https://gitcode.com/cann/ops-math/merge_requests/3557)
#### PP-05 PR合并后Issue未关闭，闭环缺失（I3 · 总结与关闭）

- **[#2142](https://gitcode.com/cann/ops-math/issues/2142) [Bug-Report|缺陷反馈]: [Bug-Report|缺陷反馈]: build.sh中ASCEND_OPP_PATH环境变量未定义但被引用，导致编译头…** — 0分
  - 痛点原因：关闭时无任何说明文字，仅口头建议设置环境变量，未将解决方案文档化，无法供他人复用。
  - 原文依据：
    - `chensi79`：您好，感谢反馈。建议使用 'source ${install_path}/cann/set_env.sh' ，一键设置所有环境变量，可以避免上述问题及更多的环境变量未加载问题。
- **[#2141](https://gitcode.com/cann/ops-math/issues/2141) [Bug-Report|缺陷反馈]: 编译opbase_util_objs时缺少pkg_include路径，提示头文件找不到** — 0分
  - 痛点原因：关闭时未留下任何解决方案说明、文档或复用链接，无法供后续用户参考。
  - 原文依据：
    - `chensi79`：您好，请问该错误是否必现？请提供详细的cann环境版本、操作步骤，便于我们进一步定位分析
- **[#2136](https://gitcode.com/cann/ops-math/issues/2136) Fmod算子是否有计划支持bfloat16数据类型？** — 0分
  - 痛点原因：关闭说明为0字且未提供重复issue链接，未沉淀最终结论，导致其他用户无法直接复用。
  - 原文依据：
    - `chenqi317`：在ascend910b 上支持BF16 若您自行开发Fmod 算子 ，建议：将输入的 BF16 提升精度为 FP32 进行中间计算，最后再将 FP32 结果降级回 BF16 输出。 若需要库上算子支持BF16 。请@zhou-qilong…    - `yolic`：您好，感谢提出，Fmod算子属于ops-math仓算子，issue已转移至math仓进行处理。    - `zhou-qilong`：fmod是指floor_mod吗，这个是支持bfloat16的。详细见：https://gitcode.com/cann/ops-math/blob/master/math/floor_mod/README.md
- **[#2134](https://gitcode.com/cann/ops-math/issues/2134) [Requirement|需求建议]: 增加FresnelSin算子的AscendC实现** — 0分
  - 痛点原因：仅由机器人自动关联PR关闭，无人工关闭说明与方案文档沉淀，导致其他用户无法复用解决经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2134    - `cann-robot`：add label resolved    - [关联PR #3644（merged）](https://gitcode.com/cann/ops-math/merge_requests/3644)
- **[#2128](https://gitcode.com/cann/ops-math/issues/2128) [Documentation|文档反馈]: aclnn的确定性计算在aclnn*.md中已呈现；算子的README中不再重复呈现** — 0分
  - 痛点原因：关闭时未留下任何文字说明，仅指派责任人，缺乏处理过程与结果记录，导致其他用户无法参考。
  - 原文依据：
    - `songkai111`：你好，正在查找算子责任人处理    - `songkai111`：assigned to @sunchun
- **[#2125](https://gitcode.com/cann/ops-math/issues/2125) [Requirement|需求建议]:** — 0分
  - 痛点原因：因信息量少被关闭，关闭说明仅7字且无方案文档与重复链接，未留下任何可复用经验。
  - 原文依据：
    - `songkai111`：closed from codehub    - `qq_41784998`：我觉的有点问题    - `songkai111`：当前issue信息量较少，请明确问题或者需求后，重新提出issue
- **[#2120](https://gitcode.com/cann/ops-math/issues/2120) [Bug-Report|缺陷反馈]: 修复算子transpose的部分用例性能劣化** — 0分
  - 痛点原因：仅由机器人关联MR合并自动关闭，无人工关闭说明、方案文档沉淀及重复链接，无法为后续类似问题提供参考。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2120    - `jzj007`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label resolved    - `cann-robot`：add label Accepted    - [关联PR #3705（merged）](https://gitcode.com/cann/ops-math/merge_requests/3705)
- **[#2093](https://gitcode.com/cann/ops-math/issues/2093) [Bug-Report|缺陷反馈]: aclnnLogAddExp2 950芯片私有数据格式未拦截** — 0分
  - 痛点原因：关闭说明为0字且无方案文档与主链接，仅靠机器人随PR合并自动关闭，缺乏可复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2093    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3653（merged）](https://gitcode.com/cann/ops-math/merge_requests/3653)    - [关联PR #3654（merged）](https://gitcode.com/cann/ops-math/merge_requests/3654)
- **[#2089](https://gitcode.com/cann/ops-math/issues/2089) [Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误** — 0分
  - 痛点原因：仅由机器人关联PR自动关闭，无方案文档化记录且关闭说明为0字，未沉淀任何复用参考信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2089    - `sakuraqqz`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3628（merged）](https://gitcode.com/cann/ops-math/merge_requests/3628)    - [关联PR #3643（merged）](https://gitcode.com/cann/ops-math/merge_requests/3643)
- **[#2084](https://gitcode.com/cann/ops-math/issues/2084) [Bug-Report|缺陷反馈]: LogAddExp 950实现小值域精度问题及数据格式拦截** — 0分
  - 痛点原因：关闭说明为0字且无方案文档沉淀，仅由机器人因关联PR合并自动关闭，缺乏复用参考价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2084    - `gcw_SUaZx3UQ`：add label bug-report    - `cann-robot`：add label resolved    - [关联PR #3611（merged）](https://gitcode.com/cann/ops-math/merge_requests/3611)    - [关联PR #3631（merged）](https://gitcode.com/cann/ops-math/merge_requests/3631)
- **[#2081](https://gitcode.com/cann/ops-math/issues/2081) 算子原型库有46个算子同时注册math/nn/cv/transformer和legacy仓，geir使用子仓编译报错，请解决** — 0分
  - 痛点原因：未输出方案文档，未关联重复issue，且关闭说明仅7字，未沉淀解决经验供后续复用。
  - 原文依据：
    - `songkai111`：closed from codehub    - `songkai111`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：已删除重复原型
- **[#2077](https://gitcode.com/cann/ops-math/issues/2077) trilu算子资料修改** — 0分
  - 痛点原因：关闭说明为空且无方案文档与主链接，仅靠机器人自动关联PR关闭，未沉淀任何可复用信息。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2077    - `cann-robot`：add label resolved    - [关联PR #3557（merged）](https://gitcode.com/cann/ops-math/merge_requests/3557)
- **[#2098](https://gitcode.com/cann/ops-math/issues/2098) [Bug-Report|缺陷反馈]: CMake 报 "binary directory already used" 错误** — 25分
  - 痛点原因：维护者仅指出主线无此问题并让用户自查，未提供根因分析与解决方案，无文档化沉淀，对后续复用无参考价值。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `songkai111`：你好，当前主线代码中，experimental/CMakeLists.txt中，并没有反馈的add_subdirectory(math)，请审查一下本地代码是否有问题？
- **[#2143](https://gitcode.com/cann/ops-math/issues/2143) [Bug-Report|缺陷反馈]: install_deps.sh 在 Ubuntu 18.04 安装 CMake 时管道命令被 run_command 吞…** — 30分
  - 痛点原因：关闭说明仅17字且为机器人自动回复，未人工总结问题原因与修复方案，缺乏复用价值。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2143    - `cann-robot`：add label resolved    - `chensi79`：您好，感谢反馈，问题确认和修复中。    - [关联PR #3865（merged）](https://gitcode.com/cann/ops-math/merge_requests/3865)
- **[#2129](https://gitcode.com/cann/ops-math/issues/2129) [Documentation|文档反馈]: aclTensor类型的参数，shape不应该是不涉及** — 30分
  - 痛点原因：关闭说明仅15字且为系统提示，未将算子默认支持1-8维的结论沉淀其中，缺乏对其他用户的参考价值。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `songkai111`：您好，正在查找该算子责任人处理    - `sunchun`：您好，这种标注不是不涉及，是算子默认支持1-8维。    - `songkai111`：assigned to @sunchun
- **[#2127](https://gitcode.com/cann/ops-math/issues/2127) [Documentation|文档反馈]: 这三项应该是满足任一就报错吧，建议修改为三条表述，用item list样式** — 30分
  - 痛点原因：关闭说明仅14字过于简略，且未提供dup主链接，导致问题解决过程和方案缺乏有效沉淀与复用。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：你好，正在查找算子责任人处理    - `sunchun`：您好，算子是针对self的数据类型进行检验的，放在这一条是为了，指针对数据类型的检验进行的报错。    - `songkai111`：assigned to @sunchun
- **[#2126](https://gitcode.com/cann/ops-math/issues/2126) [Documentation|文档反馈]: 字体大小不一致，是否正常显示；加粗格式不一致** — 30分
  - 痛点原因：关闭说明仅12字且为系统自动操作，未交代问题最终解决结论或文档去向，无法提供有效复用参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `songkai111`：你好，正在查找责任人处理    - `sunchun`：您好，这个是正常显示的，这是非问题，文档的固定格式就是这样的。    - `songkai111`：assigned to @sunchun
- **[#2117](https://gitcode.com/cann/ops-math/issues/2117) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档9.1.0** — 30分
  - 痛点原因：机器人自动关联PR关闭且关闭说明为0字，未沉淀任何复用经验。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2117    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3707（merged）](https://gitcode.com/cann/ops-math/merge_requests/3707)
- **[#2116](https://gitcode.com/cann/ops-math/issues/2116) [Documentation|文档反馈]: 修复xlog1py算子aclnn接口文档** — 30分
  - 痛点原因：关闭说明为0字，仅由机器人因关联MR合并自动关闭，无dup主链接，缺乏人工总结的解决方案。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2116    - `h1234515`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3704（merged）](https://gitcode.com/cann/ops-math/merge_requests/3704)
- **[#2078](https://gitcode.com/cann/ops-math/issues/2078) [Documentation|文档反馈]: aclnnComplex资料问题修改** — 30分
  - 痛点原因：关闭说明为0字，仅靠机器人因关联PR合并自动关闭，缺乏人工总结与经验沉淀。
  - 原文依据：
    - `cann-robot`：closed from codehub, Due to close relation issue when mr merged: issue2078    - `m0_55003149`：add label documentation    - `cann-robot`：add label resolved    - [关联PR #3613（merged）](https://gitcode.com/cann/ops-math/merge_requests/3613)    - [关联PR #3615（merged）](https://gitcode.com/cann/ops-math/merge_requests/3615)
- **[#2121](https://gitcode.com/cann/ops-math/issues/2121) [Bug-Report|缺陷反馈]: 使用atc将deimv2模型转换为om模型时精度大幅度下降** — 45分
  - 痛点原因：关闭说明仅指引用户去其他仓库咨询，未提供实际解决方案与排查过程，无文档沉淀，无法供后续参考。
  - 原文依据：
    - `chensi79`：closed from codehub    - `chensi79`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `chensi79`：你好，math仓为算子仓，模型相关问题请于 https://gitcode.com/cann/cann-recipes-train 或者 https://gitcode.com/cann/cann-recipes-infer 咨询
- **[#2145](https://gitcode.com/cann/ops-math/issues/2145) [Documentation|文档反馈]：优化主页【学习教程】中【进阶教程】超链接的指向路径** — 55分
  - 痛点原因：虽方案已文档化，但关闭说明仅84字且无主链接，未清晰沉淀最终解决路径供后续参考。
  - 原文依据：
    - `sunchun`：closed from codehub    - `sunchun`：changed custom state from 进行中 to 已完成    - `cann-robot`：add label Accepted    - `chensi79`：您好，请问您的导流预期是跳转到哪里，能否给个参考设计案例？ 目前math仓的设计为：根目录/README 为仓库软件和文档总的入口，docs/readme是文档的总入口    - `sunchun`：您好，由于您提的问题无法提供进一步定位的信息，我们计划关闭此ISSUE，后续您如果能够提供更多的信息，欢迎您重新给我们提ISSUE，我们会继续提供问题支撑。

## 5. 本周行动清单

### REC-01 · 规范关闭原因和关闭摘要

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-01 |
| 影响环节 | 总结与关闭 |
| 承接方 | 维护者；候选负责人 `chensi79` |
| 触发条件 | issue准备关闭时 |
| 具体动作 | 在关闭评论中提供明确的解决证据或关闭理由，并等待用户至少3天确认 |
| 目标 | `OBJ_CLOSURE_REUSE` 和 `OBJ_DECISION_TRANSPARENCY` 提升至 60 以上 |
| 相关证据 | OBJ_CLOSURE_REUSE：均值 20.2，低分 22/24；OBJ_DECISION_TRANSPARENCY：均值 51.9，低分 13/24 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 均值 20.2，低分 22/24 | 关闭时沉淀解决方案文档、FAQ和规避方案 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 均值 51.9，低分 13/24 | 补齐关闭原因、关闭评论和结构化总结 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 | 关闭时明确说明后续反馈路径和重新开启条件 |

### REC-02 · 补齐技术讨论并补充解决方案与验证结论

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P0 |
| 对应问题 | PP-02 |
| 影响环节 | 讨论与解决 |
| 承接方 | 维护者；候选负责人 `chensi79` |
| 触发条件 | issue无活动超过7天 |
| 具体动作 | 主动跟进评论，更新处理状态或请求补充信息 |
| 目标 | `OBJ_SOLUTION_EVIDENCE` 和 `OBJ_RESULT_FORMATION_TIMELINESS` 提升至 20 以上 |
| 相关证据 | OBJ_SOLUTION_EVIDENCE：均值 28.5，低分 23/24；OBJ_RESULT_FORMATION_TIMELINESS：均值 85.0，低分 2/24 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 均值 85.0，低分 2/24 | 加快形成明确结果的速度 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 均值 28.5，低分 23/24 | 补充修改内容、关联变更和影响范围 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 维护者询问导流预期后用户未回复，讨论停滞，未形成下一步。 | 明确下一步动作、阶段结论和推进记录 |

### REC-03 · 提升分流响应

| 字段 | 内容 |
| ---- | ---- |
| 优先级 | P1 |
| 对应问题 | PP-03 |
| 影响环节 | 分配与首次响应 |
| 承接方 | Bot；候选负责人 `chensi79` |
| 触发条件 | issue创建后24小时内 |
| 具体动作 | 根据标题前缀自动添加类型标签，并根据关键词推荐assignee |
| 目标 | `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 和 `OBJ_RESPONSE_SPEED` 提升至 95 以上 |
| 相关证据 | OBJ_FIRST_SUBSTANTIVE_RESPONSE：均值 53.3，低分 10/24；OBJ_RESPONSE_SPEED：均值 80.0，低分 0/24 |

**对应给分点**

| 指标 | 当前问题 | 预期改善 |
| ---- | -------- | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 均值 53.3，低分 10/24 | 缩短首次实质回应时间，不只是'有人回复'而是'有实质内容' |
| `OBJ_RESPONSE_SPEED` 响应速度 | 均值 80.0，低分 0/24 | 缩短首次响应时间，提高 7 天响应率 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 无assignee，虽有chensi79和sunchun参与，但责任归属不明确。 | 明确责任人、候选负责人和下一步动作 |


## 6. 各阶段简析

### I0 · 创建
本阶段分数为 **77.5/100**，整体相对可控，但仍需关注：痛点较轻，主要问题是少量issue提交空模板或信息不完整，整体创建…。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `SUB_AGENT_NOISE_RISK` AI噪音风险 | 90.3 | 内容为真实用户反馈，问题描述具体且有实际意义，无AI噪音迹象。 |
| `SUB_INPUT_QUALITY` 输入质量 | 64.8 | 提供了文档链接、问题片段和结构化描述，但缺少复现步骤和环境信息。 |

代表低分 Issue：[#2125](https://gitcode.com/cann/ops-math/issues/2125)
问题：[Requirement|需求建议]:。

### I1 · 分配与首次响应
本阶段分数为 **64.7/100**，整体相对可控，但仍需关注：标签与指派缺失，分流路径不明。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_FIRST_SUBSTANTIVE_RESPONSE` 首次实质回应时效 | 53.3 | 均值 53.3，低分 10/24 |
| `OBJ_RESPONSE_SPEED` 响应速度 | 80.0 | 均值 80.0，低分 0/24 |
| `SUB_OWNER_CLARITY` 责任归属清晰度 | 57.0 | 无assignee，虽有chensi79和sunchun参与，但责任归属不明确。 |
| `SUB_ROUTING_CORRECTNESS` 分流正确性 | 66.7 | bot添加Accepted标签但时机在关闭后，处理路径略显混乱。 |

代表低分 Issue：[#2134](https://gitcode.com/cann/ops-math/issues/2134)
问题：[Requirement|需求建议]: 增加FresnelSin算子的AscendC实现。

### I2 · 讨论与解决
本阶段分数为 **55.7/100**，本阶段需要改进，主要问题是：讨论停滞无跟进，长期搁置。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_RESULT_FORMATION_TIMELINESS` 形成结果时效 | 85.0 | 均值 85.0，低分 2/24 |
| `OBJ_SOLUTION_EVIDENCE` 解决证据强度 | 28.5 | 均值 28.5，低分 23/24 |
| `SUB_DISCUSSION_PROGRESSION` 讨论推进性 | 48.0 | 维护者询问导流预期后用户未回复，讨论停滞，未形成下一步。 |
| `SUB_USER_GOAL_RESULT` 用户目标处理结果 | 60.5 | 用户已提供清晰问题描述，却被以信息不足关闭，目标未满足。 |

代表低分 Issue：[#2141](https://gitcode.com/cann/ops-math/issues/2141)
问题：[Bug-Report|缺陷反馈]: 编译opbase_util_objs时缺少pkg_include路径，提示头文件找不到。

### I3 · 总结与关闭
本阶段分数为 **44.7/100**，本阶段需要改进，主要问题是：关闭缺乏解决证据与用户确认。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_CLOSURE_REUSE` 关闭复用价值 | 20.2 | 均值 20.2，低分 22/24 |
| `OBJ_DECISION_TRANSPARENCY` 决策透明度 | 51.9 | 均值 51.9，低分 13/24 |
| `SUB_FOLLOWUP_PATH_COMPLETENESS` 后续路径完整性 | 43.5 | 关闭时未说明后续反馈路径或重新开启条件，信息不足。 |
| `SUB_PREMATURE_CLOSE_RISK_REVERSE` 过早关闭风险反向分 | 71.8 | 用户提供了足够定位信息，关闭理由称信息不足，存在过早关闭风险。 |

代表低分 Issue：[#2089](https://gitcode.com/cann/ops-math/issues/2089)
问题：[Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误。

### G · Bot/Agent 治理
本阶段分数为 **62.5/100**，仅作参考，不计入总分。当前主要看 Bot 覆盖、流程留痕和人机交接是否稳定。

| 指标 | 得分 | 给分原因 |
| ---- | ----: | -------- |
| `OBJ_BOT_GOVERNANCE` Bot治理有效性 | 31.7 | 均值 31.7，低分 17/24 |
| `OBJ_BOT_MISCLOSE_REVERSE` Bot误关闭风险反向分 | 94.2 | 均值 94.2，低分 0/24 |
| `SUB_BOT_HANDOFF_QUALITY` 人机交接质量 | 62.8 | 人工处理已存在且bot未阻碍，但bot动作在关闭后未形成有效交接。 |
| `SUB_BOT_HELPFULNESS` 自动化帮助度 | 60.2 | bot添加Accepted标签为中性治理动作，但未对问题处理提供实质帮助。 |
| `SUB_BOT_INTERVENTION_QUALITY` 介入动作质量 | 63.0 | 标签添加动作本身准确，但时机在issue关闭之后，不够合适。 |

代表低分 Issue：[#2089](https://gitcode.com/cann/ops-math/issues/2089)
问题：[Bug-Report|缺陷反馈]: reduce_log_sum 算子资料错误。


## 7. 趋势

| 周期 | Issue 数 | 总体体验分 | 变化 | I0 | I1 | I2 | I3 | G |
| ---- | --------: | ----------: | ---- | ----: | ----: | ----: | ----: | ----: |
| 2026-06-29_to_2026-07-05 | 68 | 47.4 | 首期基线 | 77.5 | 64.7 | 55.7 | 44.7 | 62.5 |

本期作为首期基线，后续周报会基于同一口径展示趋势变化。

## 8. 社区响应者

本周期共有 **6 位社区响应者**贡献 **41 次评论响应**。

| 响应者 | 评论数 |
| ------ | ------: |
| `chensi79` | 24 |
| `sunchun` | 7 |
| `songkai111` | 7 |
| `zhou-qilong` | 1 |
| `yolic` | 1 |

Top1 响应占比 **58.5%**。以上人员仅作为行动承接候选，不代表责任归属已经确认。

## 9. 数据说明

- 数据范围：2026-06-29_to_2026-07-05 创建的 Issue，按创建时间归入本期。
- 统计范围：I0 创建阶段统计全部 Issue；I1–I3 及 Bot/Agent 治理仅统计「外部且成熟」的 Issue（创建人∉责任人，且已关闭或创建满 7 天）。未成熟或内部 Issue 只计入创建阶段。
- 数据性质：回溯统计，不是真实用户体验测试。
- 文本判断：来自模型代读 Issue 线程。
- 分数口径：总体体验分采用当前报告口径计算；无样本阶段不计分并按剩余阶段权重归一化；Bot/Agent 治理仅作参考，不计入总分。
- 数据完整性：89.2/100，整体置信度 高。
- 平台限制：GitCode API 不返回 author_association 与关联 PR，维护者识别与关联 PR 率不可信，已从对比剔除；无 closed_by / closed 事件，自关闭无法判定。
- 数据文件：`/home/shengbao/Cogito/issue_experience_agent/outputs/report/cann-ops-math/report_cann-ops-math_2026-06-29_to_2026-07-05.json`。
