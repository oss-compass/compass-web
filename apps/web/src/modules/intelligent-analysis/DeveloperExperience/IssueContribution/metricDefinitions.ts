// Static metric definitions extracted from「Issue 体验指标体系 V2+」.
// Each entry keeps the metric meaning (指标含义) and the six-tier scoring
// rubric (算分算法). Keyed by the UPPER_SNAKE metric code used in the report
// JSON. Pure data module — no runtime/JSX logic lives here.

export type MetricRubricRow = { score: number; condition: string };

export type MetricDefinition = {
  meaning: string;
  rubric: MetricRubricRow[];
  note?: string;
};

const LEGACY_METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  SUB_INPUT_QUALITY: {
    meaning:
      '衡量用户提交的 Issue 内容是否完整、信息是否充分，是否具备被开发者有效处理的前提条件。检查是否包含复现步骤、环境信息、日志代码、预期与实际对比、结构化章节等关键要素。',
    rubric: [
      {
        score: 100,
        condition:
          '完整包含复现步骤+环境信息+日志代码+预期对比+结构化章节，5项全有',
      },
      {
        score: 80,
        condition:
          '含4项，仅缺1项次要信息（如缺日志但有复现步骤+环境+预期对比+结构化）',
      },
      {
        score: 60,
        condition:
          '含3项核心信息（复现步骤+环境+预期对比），但缺日志代码或结构化章节',
      },
      {
        score: 40,
        condition: '含2项（如仅有标题+简短描述），缺少复现步骤和环境信息',
      },
      { score: 20, condition: '仅有1句模糊描述，无法据内容判断问题' },
      { score: 0, condition: '正文为空或完全无关内容' },
    ],
  },
  SUB_AGENT_NOISE_RISK: {
    meaning:
      '衡量 Issue 内容是否为真实用户诉求，还是 AI 工具生成的低质量/幻觉内容。高分表示内容真实有效，低分表示疑似 AI 生成的虚假或无意义内容。',
    rubric: [
      {
        score: 100,
        condition:
          '内容真实具体，含明确的个人使用场景/版本号/报错信息，无AI幻觉迹象',
      },
      {
        score: 80,
        condition: '内容真实，但表述偏模板化；含具体技术细节，无明显幻觉',
      },
      {
        score: 60,
        condition:
          '内容部分真实，但存在AI辅助生成痕迹（格式过于工整、措辞通用化），无幻觉',
      },
      {
        score: 40,
        condition: '疑似AI生成，内容通用化，缺少具体场景，但技术方向大致正确',
      },
      {
        score: 20,
        condition:
          '明显AI生成，含幻觉信息（引用不存在的API/版本/功能），但部分内容有参考价值',
      },
      { score: 0, condition: '纯AI生成噪音，内容虚假、无实际意义、与仓库无关' },
    ],
  },
  OBJ_RESPONSE_SPEED: {
    meaning:
      '衡量社区在 Issue 创建后多久给出首次回复，反映“有没有人管”。只看首条非作者评论距创建的时间差，不评估回复内容质量。',
    rubric: [
      { score: 100, condition: '首条非作者评论 ≤2h' },
      { score: 80, condition: '≤24h' },
      { score: 60, condition: '≤72h' },
      { score: 40, condition: '≤7d' },
      { score: 20, condition: '≤14d' },
      { score: 0, condition: '>14d 或无评论' },
    ],
  },
  OBJ_FIRST_SUBSTANTIVE_RESPONSE: {
    meaning:
      '衡量社区多久给出“有实质内容”的回复（如排查方向、技术分析、方案建议），而非简单的“收到”或“+1”。由 LLM 识别哪条评论是实质回应，再由程序计算时间差。',
    rubric: [
      { score: 100, condition: '首次实质回应 ≤48h' },
      { score: 80, condition: '≤4d' },
      { score: 60, condition: '≤7d' },
      { score: 40, condition: '≤14d' },
      { score: 20, condition: '≤30d' },
      { score: 0, condition: '>30d 或无实质回应' },
    ],
  },
  SUB_ROUTING_CORRECTNESS: {
    meaning:
      '衡量 Issue 是否被正确打标签、归类和重定向，是否进入了正确的处理路径（如 bug 进 bug 流程、需求进需求流程）。评价分流“方向对不对”，不评价后续处理快慢。',
    rubric: [
      {
        score: 100,
        condition:
          '标签+归类+重定向全正确，Issue 进入最佳处理路径且有明确类型标签',
      },
      {
        score: 80,
        condition:
          '标签和归类正确，但缺少1个辅助标签（如缺优先级标签但有类型标签）',
      },
      {
        score: 60,
        condition:
          '有基本类型标签，但归类不够精确（如 bug 标为 question 但方向正确）',
      },
      {
        score: 40,
        condition: '有标签但标签错误或误导（如需求标为 bug），需人工纠正',
      },
      { score: 20, condition: '无标签无归类，但有 assignee 指派，路径模糊' },
      {
        score: 0,
        condition:
          '无标签、无归类、无指派、无重定向，Issue 完全未进入任何处理路径',
      },
    ],
  },
  SUB_OWNER_CLARITY: {
    meaning:
      '衡量 Issue 是否有明确的责任人（assignee）或认领者，用户能否知道“谁来负责这个问题”。不评价处理结果好坏，只评价责任是否清晰。',
    rubric: [
      {
        score: 100,
        condition: '明确 assignee + 候选负责人 + 下一步动作指定，责任完全清晰',
      },
      {
        score: 80,
        condition: '明确 assignee，有候选负责人，但未指定下一步动作',
      },
      {
        score: 60,
        condition: '有 assignee 但无候选负责人，或仅 bot 自动分配未经人工确认',
      },
      {
        score: 40,
        condition: '无 assignee，但评论中有人表示愿意跟进（口头认领）',
      },
      {
        score: 20,
        condition: '无 assignee，但 Issue 有标签归类，隐含团队责任',
      },
      { score: 0, condition: '无 assignee、无认领、无标签，完全无人负责' },
    ],
  },
  OBJ_SOLUTION_EVIDENCE: {
    meaning:
      '衡量 Issue 的解决过程是否有可验证的依据支撑，如关联 PR、commit、文档、release notes、结果说明、用户确认等。评价“有没有证据”，不评价解决快慢。',
    rubric: [
      {
        score: 100,
        condition:
          'PR(35)+commit(20)+文档(10)+release(10)+结果说明(15)+用户确认(10)，满分',
      },
      { score: 80, condition: '有PR+commit+结果说明，缺文档/release/用户确认' },
      { score: 60, condition: '有PR+结果说明，缺commit/文档/release/用户确认' },
      { score: 40, condition: '有commit或文档+结果说明，无PR' },
      { score: 20, condition: '仅有结果说明，无PR/commit/文档' },
      { score: 0, condition: '无任何证据' },
    ],
  },
  OBJ_RESULT_FORMATION_TIMELINESS: {
    meaning:
      '衡量从 Issue 创建到形成明确结果（关闭/PR合并/结论性评论/用户确认）需要多长时间。由 LLM 识别何时形成结果，再由程序计算时间差。',
    rubric: [
      { score: 100, condition: '形成结果 ≤3d' },
      { score: 80, condition: '≤7d' },
      { score: 60, condition: '≤14d' },
      { score: 40, condition: '≤30d' },
      { score: 20, condition: '≤60d' },
      { score: 0, condition: '>60d 或未形成结果' },
    ],
  },
  SUB_DISCUSSION_PROGRESSION: {
    meaning:
      '衡量讨论是否推动了问题前进，是否形成了下一步动作、结论或排查方向。区分“有效讨论”和“空转/灌水”，不评价最终是否解决。',
    rubric: [
      {
        score: 100,
        condition: '讨论形成明确结论+下一步+排查方向+PR/方案，完整推进闭环',
      },
      {
        score: 80,
        condition: '讨论有明确下一步动作和排查方向，但尚未形成最终结论',
      },
      {
        score: 60,
        condition: '讨论有基本方向，形成1-2个可执行下一步，但推进不完全',
      },
      {
        score: 40,
        condition: '有讨论但停留在信息收集阶段，未形成可执行下一步',
      },
      { score: 20, condition: '仅有1-2条无关评论，无实质讨论内容' },
      { score: 0, condition: '无评论或评论纯为 +1/相同问题，零推进' },
    ],
  },
  SUB_USER_GOAL_RESULT: {
    meaning:
      '衡量用户提出的主要目标最终是否得到有效满足。不要求必须代码修复——修复、规避方案、正确答案、明确能力边界、合理拒绝、明确延期、有效转交均可获得中高分。',
    rubric: [
      {
        score: 100,
        condition: '用户主要目标完全满足（修复/合并PR + 用户确认解决）',
      },
      {
        score: 80,
        condition:
          '主要目标基本满足（PR已合并或给出有效规避方案），用户未表示不满',
      },
      {
        score: 60,
        condition:
          '部分目标满足（给出临时方案/正确答案/明确能力边界），用户可接受',
      },
      {
        score: 40,
        condition:
          '目标未满足但获得合理处置（明确拒绝/延期/转交其他仓库），有理由说明',
      },
      {
        score: 20,
        condition: '目标未满足且处置不充分（仅回复“已知”但无后续计划）',
      },
      { score: 0, condition: '目标完全未回应，用户仍被阻塞，成熟期后仍无结果' },
    ],
  },
  OBJ_DECISION_TRANSPARENCY: {
    meaning:
      '衡量关闭 Issue 时是否清楚说明了关闭原因，让用户能理解“为什么关”。检查是否有 close_reason、关闭评论、是否静默关闭、wontfix/dup 说明、关闭总结是否充分。',
    rubric: [
      {
        score: 100,
        condition:
          '有close_reason(30)+关闭评论(25)+非静默关闭(20)+wontfix/dup说明(15)+总结>100字(10)',
      },
      {
        score: 80,
        condition:
          '有close_reason+关闭评论+非静默关闭，缺wontfix/dup说明或总结',
      },
      { score: 60, condition: '有close_reason+关闭评论，但为静默关闭' },
      { score: 40, condition: '有close_reason，但无关闭评论和总结' },
      { score: 20, condition: '仅有close_reason，无其他说明' },
      { score: 0, condition: '无close_reason、无关闭评论、静默关闭' },
    ],
  },
  OBJ_CLOSURE_REUSE: {
    meaning:
      '衡量关闭后是否留下了可复用的知识或资产，如方案文档化、重复 Issue 的主链接、详细的关闭说明。评价“留了什么”，不评价关闭原因本身。',
    rubric: [
      {
        score: 100,
        condition:
          '方案文档化(30)+dup主链接(25)+关闭说明>50字(25)+关闭说明>100字(20)，满分',
      },
      { score: 80, condition: '有方案文档化+dup主链接，但关闭说明不足' },
      { score: 60, condition: '有方案文档化或dup主链接之一，关闭说明>50字' },
      { score: 40, condition: '无方案文档化/dup主链接，但关闭说明>100字' },
      { score: 20, condition: '关闭说明>50字但无文档化' },
      { score: 0, condition: '无任何可复用内容' },
    ],
  },
  SUB_PREMATURE_CLOSE_RISK_REVERSE: {
    meaning:
      '衡量 Issue 是否在未充分处理的情况下就被关闭。高分表示关闭时机合理、无过早风险；低分表示存在明显过早关闭迹象。反向分逻辑：高分=无风险。',
    rubric: [
      {
        score: 100,
        condition:
          'PR已合并/方案已落地后关闭，关闭时机完全合理，无任何过早迹象',
      },
      { score: 80, condition: '问题已解决但缺少用户确认即关闭，风险极低' },
      {
        score: 60,
        condition: '有初步处理但用户未明确确认解决就关闭，存在轻微风险',
      },
      {
        score: 40,
        condition: '处理不充分即关闭（如仅给建议未验证就关闭），有一定过早风险',
      },
      {
        score: 20,
        condition: '未实质处理就关闭（如仅打标签就关闭），过早风险较高',
      },
      { score: 0, condition: '创建后立即关闭/无任何处理就关闭，明显过早关闭' },
    ],
  },
  SUB_FOLLOWUP_PATH_COMPLETENESS: {
    meaning:
      '衡量关闭后是否告诉用户后续该怎么办，如重新开启条件、反馈入口、其他仓库/团队、后续版本、重新评估条件等。仅在关闭后仍可能需要反馈时评分。',
    rubric: [
      {
        score: 100,
        condition:
          '完整说明重新开启条件+反馈入口+其他仓库/团队+后续版本+重新评估条件',
      },
      {
        score: 80,
        condition: '说明3项以上后续路径（如重新开启条件+反馈入口+后续版本）',
      },
      {
        score: 60,
        condition:
          '说明2项后续路径（如重新开启条件+反馈入口），但缺少版本/仓库信息',
      },
      {
        score: 40,
        condition: '仅说明1项后续路径（如仅“如有问题可重新开启”），路径不完整',
      },
      { score: 20, condition: '关闭说明中隐含后续可能但未明确任何路径' },
      {
        score: 0,
        condition: '关闭后无任何后续路径说明，用户无法知道如何继续反馈',
      },
    ],
  },
  OBJ_BOT_GOVERNANCE: {
    meaning:
      '衡量 Bot/Agent 是否在 Issue 生命周期中做了有用的事，如 24h 内打标、追问信息、归并重复 Issue、关闭 stale Issue、触发人工跟进。无 Bot 介入时返回中性分 60。',
    rubric: [
      {
        score: 100,
        condition:
          '24h打标(20)+追问信息(15)+归并重复(20)+关闭stale(20)+人工跟进(25)，满分',
      },
      { score: 80, condition: '完成4项有效动作，缺1项' },
      { score: 60, condition: '完成3项有效动作，或无Bot介入（中性分）' },
      { score: 40, condition: '完成2项有效动作' },
      { score: 20, condition: '仅完成1项动作' },
      { score: 0, condition: 'Bot有介入但全部无效或制造噪音' },
    ],
  },
  OBJ_BOT_MISCLOSE_REVERSE: {
    meaning:
      '衡量 Bot 是否错误关闭了 Issue。风险分 = Bot 关闭后被重开 + maintainer 继续 + 添加产物；反向分 = 100 − 风险分。Bot 未关闭过 Issue 时返回 100（无风险）。',
    rubric: [
      {
        score: 100,
        condition: 'Bot未关闭过Issue（无风险），或关闭后无任何异常',
      },
      { score: 80, condition: 'Bot关闭后有轻微异常但不影响处理（如添加产物）' },
      { score: 60, condition: 'Bot关闭后maintainer继续(30)' },
      { score: 40, condition: 'Bot关闭后被部分重开或maintainer继续' },
      { score: 20, condition: 'Bot关闭后被重开(50)' },
      {
        score: 0,
        condition: 'Bot关闭后被重开+maintainer继续+添加产物，风险分满分',
      },
    ],
  },
  SUB_BOT_HELPFULNESS: {
    meaning:
      '衡量 Bot/Agent 的介入是否整体上对问题处理有帮助，而不是只制造噪音或做表面动作。守门型/权限型提示如果避免了错误操作也算帮助。',
    rubric: [
      {
        score: 100,
        condition: 'Bot有效打标+追问信息+归并重复+触发人工跟进，全流程帮助',
      },
      {
        score: 80,
        condition: 'Bot完成3项有效动作（如打标+追问+分配），显著减少人工成本',
      },
      {
        score: 60,
        condition: 'Bot完成2项有效动作（如打标+分配），有一定帮助但未全覆盖',
      },
      { score: 40, condition: 'Bot仅完成1项动作（如仅打标），帮助有限' },
      {
        score: 20,
        condition: 'Bot有介入但为模板回复，未触发有效处理，仅做表面动作',
      },
      { score: 0, condition: '无Bot介入，或Bot制造噪音/误导/错误阻断' },
    ],
  },
  SUB_BOT_INTERVENTION_QUALITY: {
    meaning:
      '衡量 Bot 的具体动作（打标签、提醒、引导、关闭等）是否准确、及时、合适。正确的权限校验、规则执行、流程守卫应给中高分，只有错误阻断或误判才低分。',
    rubric: [
      {
        score: 100,
        condition: '标签+提醒+引导+关闭全准确，时机合适，无任何错误动作',
      },
      {
        score: 80,
        condition: '3项动作准确及时，1项次要动作不够理想（如标签延迟）',
      },
      {
        score: 60,
        condition: '2项动作准确（如标签+分配正确），但1项时机不佳或不够合适',
      },
      {
        score: 40,
        condition: '动作基本正确但有1项明显失误（如标签打错后纠正）',
      },
      { score: 20, condition: '动作多为模板化，准确率低，需要人工多次纠正' },
      {
        score: 0,
        condition: '动作错误/误导/错误阻断/误关闭，严重干扰处理流程',
      },
    ],
  },
  SUB_BOT_HANDOFF_QUALITY: {
    meaning:
      '衡量 Bot 动作后是否形成了良好的人类接手与推进。如果 Bot 介入后有人类继续承接，或 Issue 本身已有明确人工处理证据，不应低分。',
    rubric: [
      {
        score: 100,
        condition:
          'Bot动作后人工立即接手，有明确 assignee + 后续推进，交接无缝',
      },
      {
        score: 80,
        condition: 'Bot动作后人工较快速接手（24h内），有 assignee，交接顺畅',
      },
      {
        score: 60,
        condition: 'Bot动作后人工接手但存在延迟（>24h），或 assignee 不够明确',
      },
      {
        score: 40,
        condition: 'Bot动作后有人类响应但仅口头跟进，无实质性处理动作',
      },
      {
        score: 20,
        condition: 'Bot动作后人工响应极其滞后（>7天），交接有明显停滞',
      },
      { score: 0, condition: 'Bot动作后无人接手，流程被卡住，完全无人类承接' },
    ],
  },
};

// V4 指标定义来自《Issue体验指标体系(3).md》。保留上方旧版定义以兼容
// 历史报告；同名指标以 V4 口径为准。
const V4_METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  SUB_ISSUE_TYPE_CORRECTNESS: {
    meaning: '衡量 Issue 类型是否与实际内容匹配。',
    rubric: [
      { score: 100, condition: '类型判断正确' },
      { score: 80, condition: '仅子类边界略模糊' },
      { score: 60, condition: '类型存疑但不影响后续评分' },
      { score: 40, condition: '存在明显偏差，仍可归入相近类型' },
      { score: 20, condition: '类型误判并影响后续评分' },
      { score: 0, condition: '完全无法判断' },
    ],
  },
  SUB_INPUT_QUALITY: {
    meaning: '衡量这条 Issue 是否具备被处理的基本前提。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞：影响范围、触发条件、风险信息明确；缺陷：复现、环境、日志、预期/实际齐全；需求：场景、痛点、价值、预期效果清楚；文档：位置、错误点、建议修正明确；咨询：场景、目标、已尝试内容、疑问清楚；任务/里程碑：目标、范围、责任、节点清楚；审查：对象与意见逐条具体明确；其他：背景、目标、现象与上下文清楚',
      },
      {
        score: 80,
        condition:
          '漏洞：核心风险清楚，细节略有缺口；缺陷：缺 1 项次要信息但可直接排查；需求：诉求清楚，价值说明略弱；文档：位置和问题基本清楚；咨询：问题明确但缺 1 项背景；任务/里程碑：目标和责任较清楚，边界略模糊；审查：意见具体，定位基本清楚；其他：主要信息较清楚，少量边界缺口',
      },
      {
        score: 60,
        condition:
          '漏洞：可进入响应但需补关键信息；缺陷：缺部分信息，补 1 轮可继续；需求：能理解需求但边界不清；文档：能指出现象但定位不完整；咨询：场景较清楚但仍需少量澄清；任务/里程碑：可理解目标但信息不完整；审查：有意见但定位不完整；其他：核心诉求可理解，信息不完整',
      },
      {
        score: 40,
        condition:
          '漏洞：只有部分风险描述；缺陷：描述模糊需多轮澄清；需求：只有想法没有场景支撑；文档：仅说“文档有问题”；咨询：疑问笼统；任务/里程碑：只有标题或单句描述；审查：只有笼统意见；其他：只有简短描述，需多轮澄清',
      },
      {
        score: 20,
        condition:
          '漏洞/其他：线索零散；缺陷：仅零散线索；需求：诉求模糊；文档/审查：线索极少；咨询：表达混乱几乎不可回答；任务/里程碑：执行条件不清',
      },
      {
        score: 0,
        condition:
          '漏洞：基本不可判断；缺陷：无法开始；需求：无法识别真实需求；文档：无法定位；咨询：无法判断在问什么；任务/里程碑：无法执行；审查：无法理解审查意图；其他：无法判断在说什么',
      },
    ],
  },
  OBJ_RESPONSE_SPEED: {
    meaning: '衡量 Issue 创建后多久完成责任分配或明确认领。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞 ≤4h；缺陷 ≤1d；文档/咨询/审查 ≤2d；需求 ≤3d；任务/里程碑/其他 ≤5d',
      },
      {
        score: 80,
        condition:
          '漏洞 ≤1d；缺陷 ≤3d；文档/咨询/审查 ≤5d；需求 ≤7d；任务/里程碑/其他 ≤10d',
      },
      {
        score: 60,
        condition:
          '漏洞 ≤3d；缺陷 ≤7d；文档/咨询/审查 ≤10d；需求 ≤14d；任务/里程碑/其他 ≤20d',
      },
      {
        score: 40,
        condition:
          '漏洞 ≤7d；缺陷 ≤14d；文档/咨询/审查 ≤15d；需求/任务/里程碑/其他 ≤30d',
      },
      {
        score: 20,
        condition:
          '漏洞 ≤14d；缺陷/文档/咨询/审查 ≤30d；需求/任务/里程碑/其他 ≤45d',
      },
      {
        score: 0,
        condition:
          '超过对应 20 分档时限：漏洞 >14d；缺陷/文档/咨询/审查 >30d；需求/任务/里程碑/其他 >45d',
      },
    ],
    note: '无人承接或无人认领时，以已等待时长代入本类型阈值定档后乘 0.75。',
  },
  OBJ_FIRST_SUBSTANTIVE_RESPONSE_TIME: {
    meaning: '衡量 Issue 创建后多久出现有实质内容的回复。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞 ≤1d；缺陷 ≤2d；文档/咨询/审查 ≤3d；需求/任务/里程碑/其他 ≤7d',
      },
      {
        score: 80,
        condition:
          '漏洞 ≤2d；缺陷 ≤4d；文档/咨询/审查 ≤7d；需求/任务/里程碑/其他 ≤14d',
      },
      {
        score: 60,
        condition:
          '漏洞 ≤3d；缺陷 ≤7d；文档/咨询/审查 ≤14d；需求/任务/里程碑/其他 ≤30d',
      },
      {
        score: 40,
        condition:
          '漏洞 ≤7d；缺陷 ≤14d；文档/咨询/审查 ≤30d；需求/任务/里程碑/其他 ≤45d',
      },
      {
        score: 20,
        condition:
          '漏洞 ≤14d；缺陷 ≤30d；文档/咨询/审查 ≤45d；需求/任务/里程碑/其他 ≤60d',
      },
      {
        score: 0,
        condition:
          '超过对应 20 分档时限：漏洞 >14d；缺陷 >30d；文档/咨询/审查 >45d；需求/任务/里程碑/其他 >60d',
      },
    ],
    note: '无实质回应时，以已等待时长代入本类型阈值定档后乘 0.75。',
  },
  SUB_FIRST_RESPONSE_QUALITY: {
    meaning: '衡量首次回复对用户是否真正有用。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞：快速确认风险并说明处理窗口；缺陷：给排查方向、责任人和下一步；需求：准确复述诉求并说明评估路径；文档：明确位置并给修订计划；咨询：直接回答并给资料/示例；任务/里程碑：明确负责方、节点和下一步；审查：确认意见并给处置路径；其他：准确理解并给明确下一步',
      },
      {
        score: 80,
        condition:
          '漏洞：快速确认并给处置方向；缺陷：方向明确但缺一项关键信息；需求：理解基本正确，责任方较清楚；文档：确认问题并说明处理方式；咨询：给出正确路径或关键资料；任务/里程碑：责任与承接关系较清楚；审查：明确承接人或去向；其他：响应有效，路径较清楚',
      },
      {
        score: 60,
        condition:
          '漏洞：已确认进入处理但路径较粗；缺陷：有基本排查价值；需求：确认收到且有初步路径；文档：有效确认但计划不够清楚；咨询：基本有帮助但不完整；任务/里程碑：有人响应但后续路径一般；审查：确认收到并明确承接人；其他：已有基本帮助，完整性一般',
      },
      {
        score: 40,
        condition:
          '漏洞：仅确认收到；缺陷：仅认领或模板回复；需求：仅说“收到建议”；文档：仅机械确认；咨询：泛泛回复；任务/里程碑：只做状态确认；审查：提及具体意见但无承接信息；其他：仅状态确认但提及具体内容',
      },
      {
        score: 20,
        condition:
          '漏洞：仅模板安抚；缺陷：机械安抚无实质内容；需求：无评估路径；文档：无实际处理方向；咨询：答非所问或仅模板安抚；任务/里程碑：责任不清；审查/其他：纯通用模板或回复笼统',
      },
      { score: 0, condition: '所有类型：无回复' },
    ],
  },
  SUB_TRIAGE_OWNER_CLARITY: {
    meaning: '衡量 Issue 是否交给对的人，且用户是否知道谁负责。',
    rubric: [
      { score: 100, condition: '责任人正确、状态清楚、下一步明确' },
      { score: 80, condition: '责任人与承接关系较清楚' },
      { score: 60, condition: '有人负责，但边界一般' },
      { score: 40, condition: '只有口头跟进，责任不够清楚' },
      { score: 20, condition: '仅标签或模糊分流' },
      { score: 0, condition: '无人跟进' },
    ],
  },
  SUB_DISCUSSION_PROGRESSION: {
    meaning: '衡量讨论是否持续产生有效信息并推动问题前进。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞：有缓解方案、补丁路径、版本计划；缺陷：定位明确并出现规避方案、修复动作或 PR；需求：形成采纳/拒绝/延期的明确路径；文档：确认并进入修订；咨询：解释清楚且有资料/示例；任务/里程碑：状态持续推进、节点清楚；审查：逐条有结论并出现修复动作或 PR；其他：持续推进并形成明确路径',
      },
      {
        score: 80,
        condition:
          '漏洞：路径明确且持续同步；缺陷：方向清楚，推进证据较强；需求：边界、价值、取舍较清楚；文档：修订路径明确；咨询：基本答明白且可执行；任务/里程碑：进展稳定、承接清楚；审查：处置路径明确且持续推进；其他：推进证据较强',
      },
      {
        score: 60,
        condition:
          '漏洞：已有明确处理推进；缺陷：有明确排查方向和下一步；需求：边界逐步澄清；文档：准确理解并排期；咨询：大体答到点上；任务/里程碑：有更新、有承接；审查：已有明确回应与下一步；其他：有推进但力度一般',
      },
      {
        score: 40,
        condition:
          '漏洞：推进偏慢或说明不足；缺陷：有交流但推进弱；需求：只有零散讨论；文档：长期停留在确认层面；咨询：交流存在但未解决疑问；任务/里程碑：更新零散；审查：意见未逐条落实；其他：有交流但进展有限',
      },
      {
        score: 20,
        condition:
          '漏洞：路径不清；缺陷：反复问答无前进；需求/审查：长期无结论；文档：推进缓慢且无计划；咨询：多轮沟通仍不清楚；任务/里程碑：长期无说明；其他：长期无实质前进',
      },
      {
        score: 0,
        condition:
          '漏洞：基本失控；缺陷：长期空转；需求/文档/咨询/审查：无有效或实质推进；任务/里程碑/其他：完全停滞',
      },
    ],
  },
  OBJ_PROGRESSION_STALL_DEGREE: {
    meaning: '衡量 Issue 处理中是否存在长期无说明停滞，按最长无说明停滞计算。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞 ≤1d；缺陷/咨询 ≤3d；文档/审查 ≤7d；需求/任务/里程碑/其他 ≤14d',
      },
      {
        score: 80,
        condition:
          '漏洞 ≤3d；缺陷/咨询 ≤7d；文档/审查 ≤14d；需求 ≤21d；任务/里程碑/其他 ≤30d',
      },
      {
        score: 60,
        condition:
          '漏洞 ≤7d；缺陷/咨询 ≤14d；文档/审查 ≤21d；需求 ≤30d；任务/里程碑/其他 ≤45d',
      },
      {
        score: 40,
        condition:
          '漏洞 ≤14d；缺陷/文档/咨询/审查 ≤30d；需求 ≤45d；任务/里程碑/其他 ≤60d',
      },
      {
        score: 20,
        condition:
          '漏洞 ≤30d；缺陷/需求 ≤60d；文档/咨询/审查 ≤45d；任务/里程碑/其他 ≤90d',
      },
      {
        score: 0,
        condition:
          '超过对应 20 分档时限：漏洞 >30d；缺陷/需求 >60d；文档/咨询/审查 >45d；任务/里程碑/其他 >90d',
      },
    ],
    note: '按“球权”分段计时：等待用户回复、结果形成后的检视与自动关闭等待不计入停滞。漏洞在高风险期间失联、缺陷承诺多次落空时，不直接记 0。',
  },
  SUB_CLOSURE_DECISION_CORRECTNESS: {
    meaning: '衡量 Issue 关闭决策是否正确、关闭时机是否合理。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞：修复/缓解/公告明确后关闭；缺陷：修复或有可验证规避方案后关闭；需求：明确采纳/拒绝/延期及理由后关闭；文档：修正或明确纳入修订后关闭；咨询：给出正确答案/资料/示例后关闭；任务/里程碑：产出明确、承接清楚后关闭；审查：意见全部处置后关闭；其他：形成明确结果或结论后关闭',
      },
      {
        score: 80,
        condition:
          '漏洞：处置基本完成、证据较充分；缺陷：基本解决，证据略有缺口；需求：结论清楚，后续路径基本明确；文档：结论和修订路径清楚；咨询：主要问题已回答；任务/里程碑：基本完成且说明较清楚；审查：主要意见已处置；其他：结论基本成立、证据较充分',
      },
      {
        score: 60,
        condition:
          '漏洞：有处置结果但需补验证；缺陷：有结果但验证不充分；需求：有结论但路径不完整；文档：有结论但资产未完全落地；咨询：基本答复完成但完整性一般；任务/里程碑：可判断基本完成；审查：处置结论不完整；其他：有结论但完整性一般',
      },
      {
        score: 40,
        condition:
          '漏洞/缺陷/审查：处理或处置不充分即关闭；需求：讨论不充分就关闭；文档：只有口头承诺就关闭；咨询：未真正答明白就关闭；任务/里程碑：关闭理由偏弱；其他：依据偏弱即关闭',
      },
      {
        score: 20,
        condition:
          '漏洞：仅口头说明就关闭；缺陷：仅打标签/简单答复就关闭；需求：仅做表态就关闭；文档：结论很弱；咨询：仅给模糊方向就关闭；任务/里程碑：无产出闭环；审查：无结论关闭；其他：结论不足就关闭',
      },
      {
        score: 0,
        condition:
          '漏洞/审查/其他：明显或严重误关；缺陷：明显误关；需求/文档：无结论关闭；咨询：未答复即关闭；任务/里程碑：随意关闭',
      },
    ],
  },
  SUB_CLOSURE_REUSE_VALUE: {
    meaning: '衡量 Issue 关闭后是否留下可复用知识和后续路径。',
    rubric: [
      {
        score: 100,
        condition:
          '漏洞：补丁、公告、缓解措施、版本信息齐全；缺陷：PR、commit、版本、规避方案齐全；需求：决策记录、roadmap、替代方案齐全；文档：文档 PR、更新链接、修订说明齐全；咨询：FAQ、文档、示例、资料链接齐全；任务/里程碑：产出、里程碑记录、承接事项齐全；审查：修复 PR、逐条结论、验证说明齐全；其他：链接、提交、方案、说明等资产齐全',
      },
      {
        score: 80,
        condition:
          '漏洞：有较完整安全处置资产；缺陷：PR/版本/说明较完整；需求：有较完整决策资产；文档：有更新资产；咨询：有正确资料和示例；任务/里程碑：产出与承接信息较完整；审查：有较完整处置记录；其他：有较完整处理记录',
      },
      {
        score: 60,
        condition:
          '漏洞：保留部分处置信息；缺陷：保留部分修复资产；需求：保留部分决策说明；文档：有部分修订说明；咨询：有部分可复用答案；任务/里程碑：保留部分归档资产；审查：保留部分处置说明；其他：保留部分可复用内容',
      },
      {
        score: 40,
        condition:
          '漏洞：仅原则性说明；缺陷：仅较长说明；需求/审查/其他：仅简短结论；文档：仅文字说明；咨询：只有简短说明；任务/里程碑：仅结论性说明',
      },
      {
        score: 20,
        condition: '仅保留少量备注、说明或线索，未形成可直接复用的知识资产',
      },
      { score: 0, condition: '所有类型：无可复用内容' },
    ],
  },
  OBJ_CLOSURE_TIMELINESS: {
    meaning: '衡量 Issue 达到关闭条件后是否被及时关闭。',
    rubric: [
      { score: 100, condition: '结果就绪后的关闭延迟 ≤1d' },
      { score: 80, condition: '结果就绪后的关闭延迟 ≤3d' },
      {
        score: 60,
        condition: '结果就绪后的关闭延迟 ≤7d；就绪时点无法判定时也按本档',
      },
      { score: 40, condition: '结果就绪后的关闭延迟 ≤14d' },
      { score: 20, condition: '结果就绪后的关闭延迟 ≤30d' },
      { score: 0, condition: '结果就绪后的关闭延迟 >30d' },
    ],
    note: '未关闭的 Issue 本指标不适用，不进入分母。',
  },
};

export const METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  ...LEGACY_METRIC_DEFINITIONS,
  ...V4_METRIC_DEFINITIONS,
};

export const getMetricDefinition = (
  code: string
): MetricDefinition | undefined => METRIC_DEFINITIONS[code];

// ─────────────────────────────────────────────────────────────
// 指标双轴分类：效率 / 质量（用于报告页关键指标卡片上的 tag）。
// 依据《Issue 体验指标体系》双轴定义：
// - 效率轴（4 项）回答“处理是否及时、节奏是否连贯”；
// - 质量轴（7 项）回答“处理是否正确、充分、可复用”。
// 报告数据中的指标 code 为 UPPER_SNAKE（如 OBJ_RESPONSE_SPEED），
// 同时兼容旧版（v1–v3）时效类指标，其余均归为质量类。
// ─────────────────────────────────────────────────────────────

export type MetricCategory = 'efficiency' | 'quality';

const EFFICIENCY_METRIC_CODES = new Set([
  // v4 效率类 4 项
  'OBJ_RESPONSE_SPEED', // 责任分配速度
  'OBJ_FIRST_SUBSTANTIVE_RESPONSE_TIME', // 首次实质回应时效
  'OBJ_PROGRESSION_STALL_DEGREE', // 讨论推进效率
  'OBJ_CLOSURE_TIMELINESS', // 推进关闭及时性
  // 旧版报告中的时效类指标，语义对应效率轴
  'OBJ_FIRST_SUBSTANTIVE_RESPONSE',
  'OBJ_RESULT_FORMATION_TIMELINESS',
]);

export const getMetricCategory = (code: string): MetricCategory =>
  EFFICIENCY_METRIC_CODES.has(code.toUpperCase()) ? 'efficiency' : 'quality';
