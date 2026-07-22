// Static metric definitions extracted from「Issue 体验指标体系 V2+」.
// Each entry keeps the metric meaning (指标含义) and the six-tier scoring
// rubric (算分算法). Keyed by the UPPER_SNAKE metric code used in the report
// JSON. Pure data module — no runtime/JSX logic lives here.

export type MetricRubricRow = { score: number; condition: string };

export type MetricDefinition = {
  meaning: string;
  rubric: MetricRubricRow[];
};

export const METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  SUB_INPUT_QUALITY: {
    meaning:
      '衡量用户提交的 Issue 内容是否完整、信息是否充分，是否具备被开发者有效处理的前提条件。检查是否包含复现步骤、环境信息、日志代码、预期与实际对比、结构化章节等关键要素。',
    rubric: [
      { score: 100, condition: '完整包含复现步骤+环境信息+日志代码+预期对比+结构化章节，5项全有' },
      { score: 80, condition: '含4项，仅缺1项次要信息（如缺日志但有复现步骤+环境+预期对比+结构化）' },
      { score: 60, condition: '含3项核心信息（复现步骤+环境+预期对比），但缺日志代码或结构化章节' },
      { score: 40, condition: '含2项（如仅有标题+简短描述），缺少复现步骤和环境信息' },
      { score: 20, condition: '仅有1句模糊描述，无法据内容判断问题' },
      { score: 0, condition: '正文为空或完全无关内容' },
    ],
  },
  SUB_AGENT_NOISE_RISK: {
    meaning:
      '衡量 Issue 内容是否为真实用户诉求，还是 AI 工具生成的低质量/幻觉内容。高分表示内容真实有效，低分表示疑似 AI 生成的虚假或无意义内容。',
    rubric: [
      { score: 100, condition: '内容真实具体，含明确的个人使用场景/版本号/报错信息，无AI幻觉迹象' },
      { score: 80, condition: '内容真实，但表述偏模板化；含具体技术细节，无明显幻觉' },
      { score: 60, condition: '内容部分真实，但存在AI辅助生成痕迹（格式过于工整、措辞通用化），无幻觉' },
      { score: 40, condition: '疑似AI生成，内容通用化，缺少具体场景，但技术方向大致正确' },
      { score: 20, condition: '明显AI生成，含幻觉信息（引用不存在的API/版本/功能），但部分内容有参考价值' },
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
      { score: 100, condition: '标签+归类+重定向全正确，Issue 进入最佳处理路径且有明确类型标签' },
      { score: 80, condition: '标签和归类正确，但缺少1个辅助标签（如缺优先级标签但有类型标签）' },
      { score: 60, condition: '有基本类型标签，但归类不够精确（如 bug 标为 question 但方向正确）' },
      { score: 40, condition: '有标签但标签错误或误导（如需求标为 bug），需人工纠正' },
      { score: 20, condition: '无标签无归类，但有 assignee 指派，路径模糊' },
      { score: 0, condition: '无标签、无归类、无指派、无重定向，Issue 完全未进入任何处理路径' },
    ],
  },
  SUB_OWNER_CLARITY: {
    meaning:
      '衡量 Issue 是否有明确的责任人（assignee）或认领者，用户能否知道“谁来负责这个问题”。不评价处理结果好坏，只评价责任是否清晰。',
    rubric: [
      { score: 100, condition: '明确 assignee + 候选负责人 + 下一步动作指定，责任完全清晰' },
      { score: 80, condition: '明确 assignee，有候选负责人，但未指定下一步动作' },
      { score: 60, condition: '有 assignee 但无候选负责人，或仅 bot 自动分配未经人工确认' },
      { score: 40, condition: '无 assignee，但评论中有人表示愿意跟进（口头认领）' },
      { score: 20, condition: '无 assignee，但 Issue 有标签归类，隐含团队责任' },
      { score: 0, condition: '无 assignee、无认领、无标签，完全无人负责' },
    ],
  },
  OBJ_SOLUTION_EVIDENCE: {
    meaning:
      '衡量 Issue 的解决过程是否有可验证的依据支撑，如关联 PR、commit、文档、release notes、结果说明、用户确认等。评价“有没有证据”，不评价解决快慢。',
    rubric: [
      { score: 100, condition: 'PR(35)+commit(20)+文档(10)+release(10)+结果说明(15)+用户确认(10)，满分' },
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
      { score: 100, condition: '讨论形成明确结论+下一步+排查方向+PR/方案，完整推进闭环' },
      { score: 80, condition: '讨论有明确下一步动作和排查方向，但尚未形成最终结论' },
      { score: 60, condition: '讨论有基本方向，形成1-2个可执行下一步，但推进不完全' },
      { score: 40, condition: '有讨论但停留在信息收集阶段，未形成可执行下一步' },
      { score: 20, condition: '仅有1-2条无关评论，无实质讨论内容' },
      { score: 0, condition: '无评论或评论纯为 +1/相同问题，零推进' },
    ],
  },
  SUB_USER_GOAL_RESULT: {
    meaning:
      '衡量用户提出的主要目标最终是否得到有效满足。不要求必须代码修复——修复、规避方案、正确答案、明确能力边界、合理拒绝、明确延期、有效转交均可获得中高分。',
    rubric: [
      { score: 100, condition: '用户主要目标完全满足（修复/合并PR + 用户确认解决）' },
      { score: 80, condition: '主要目标基本满足（PR已合并或给出有效规避方案），用户未表示不满' },
      { score: 60, condition: '部分目标满足（给出临时方案/正确答案/明确能力边界），用户可接受' },
      { score: 40, condition: '目标未满足但获得合理处置（明确拒绝/延期/转交其他仓库），有理由说明' },
      { score: 20, condition: '目标未满足且处置不充分（仅回复“已知”但无后续计划）' },
      { score: 0, condition: '目标完全未回应，用户仍被阻塞，成熟期后仍无结果' },
    ],
  },
  OBJ_DECISION_TRANSPARENCY: {
    meaning:
      '衡量关闭 Issue 时是否清楚说明了关闭原因，让用户能理解“为什么关”。检查是否有 close_reason、关闭评论、是否静默关闭、wontfix/dup 说明、关闭总结是否充分。',
    rubric: [
      { score: 100, condition: '有close_reason(30)+关闭评论(25)+非静默关闭(20)+wontfix/dup说明(15)+总结>100字(10)' },
      { score: 80, condition: '有close_reason+关闭评论+非静默关闭，缺wontfix/dup说明或总结' },
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
      { score: 100, condition: '方案文档化(30)+dup主链接(25)+关闭说明>50字(25)+关闭说明>100字(20)，满分' },
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
      { score: 100, condition: 'PR已合并/方案已落地后关闭，关闭时机完全合理，无任何过早迹象' },
      { score: 80, condition: '问题已解决但缺少用户确认即关闭，风险极低' },
      { score: 60, condition: '有初步处理但用户未明确确认解决就关闭，存在轻微风险' },
      { score: 40, condition: '处理不充分即关闭（如仅给建议未验证就关闭），有一定过早风险' },
      { score: 20, condition: '未实质处理就关闭（如仅打标签就关闭），过早风险较高' },
      { score: 0, condition: '创建后立即关闭/无任何处理就关闭，明显过早关闭' },
    ],
  },
  SUB_FOLLOWUP_PATH_COMPLETENESS: {
    meaning:
      '衡量关闭后是否告诉用户后续该怎么办，如重新开启条件、反馈入口、其他仓库/团队、后续版本、重新评估条件等。仅在关闭后仍可能需要反馈时评分。',
    rubric: [
      { score: 100, condition: '完整说明重新开启条件+反馈入口+其他仓库/团队+后续版本+重新评估条件' },
      { score: 80, condition: '说明3项以上后续路径（如重新开启条件+反馈入口+后续版本）' },
      { score: 60, condition: '说明2项后续路径（如重新开启条件+反馈入口），但缺少版本/仓库信息' },
      { score: 40, condition: '仅说明1项后续路径（如仅“如有问题可重新开启”），路径不完整' },
      { score: 20, condition: '关闭说明中隐含后续可能但未明确任何路径' },
      { score: 0, condition: '关闭后无任何后续路径说明，用户无法知道如何继续反馈' },
    ],
  },
  OBJ_BOT_GOVERNANCE: {
    meaning:
      '衡量 Bot/Agent 是否在 Issue 生命周期中做了有用的事，如 24h 内打标、追问信息、归并重复 Issue、关闭 stale Issue、触发人工跟进。无 Bot 介入时返回中性分 60。',
    rubric: [
      { score: 100, condition: '24h打标(20)+追问信息(15)+归并重复(20)+关闭stale(20)+人工跟进(25)，满分' },
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
      { score: 100, condition: 'Bot未关闭过Issue（无风险），或关闭后无任何异常' },
      { score: 80, condition: 'Bot关闭后有轻微异常但不影响处理（如添加产物）' },
      { score: 60, condition: 'Bot关闭后maintainer继续(30)' },
      { score: 40, condition: 'Bot关闭后被部分重开或maintainer继续' },
      { score: 20, condition: 'Bot关闭后被重开(50)' },
      { score: 0, condition: 'Bot关闭后被重开+maintainer继续+添加产物，风险分满分' },
    ],
  },
  SUB_BOT_HELPFULNESS: {
    meaning:
      '衡量 Bot/Agent 的介入是否整体上对问题处理有帮助，而不是只制造噪音或做表面动作。守门型/权限型提示如果避免了错误操作也算帮助。',
    rubric: [
      { score: 100, condition: 'Bot有效打标+追问信息+归并重复+触发人工跟进，全流程帮助' },
      { score: 80, condition: 'Bot完成3项有效动作（如打标+追问+分配），显著减少人工成本' },
      { score: 60, condition: 'Bot完成2项有效动作（如打标+分配），有一定帮助但未全覆盖' },
      { score: 40, condition: 'Bot仅完成1项动作（如仅打标），帮助有限' },
      { score: 20, condition: 'Bot有介入但为模板回复，未触发有效处理，仅做表面动作' },
      { score: 0, condition: '无Bot介入，或Bot制造噪音/误导/错误阻断' },
    ],
  },
  SUB_BOT_INTERVENTION_QUALITY: {
    meaning:
      '衡量 Bot 的具体动作（打标签、提醒、引导、关闭等）是否准确、及时、合适。正确的权限校验、规则执行、流程守卫应给中高分，只有错误阻断或误判才低分。',
    rubric: [
      { score: 100, condition: '标签+提醒+引导+关闭全准确，时机合适，无任何错误动作' },
      { score: 80, condition: '3项动作准确及时，1项次要动作不够理想（如标签延迟）' },
      { score: 60, condition: '2项动作准确（如标签+分配正确），但1项时机不佳或不够合适' },
      { score: 40, condition: '动作基本正确但有1项明显失误（如标签打错后纠正）' },
      { score: 20, condition: '动作多为模板化，准确率低，需要人工多次纠正' },
      { score: 0, condition: '动作错误/误导/错误阻断/误关闭，严重干扰处理流程' },
    ],
  },
  SUB_BOT_HANDOFF_QUALITY: {
    meaning:
      '衡量 Bot 动作后是否形成了良好的人类接手与推进。如果 Bot 介入后有人类继续承接，或 Issue 本身已有明确人工处理证据，不应低分。',
    rubric: [
      { score: 100, condition: 'Bot动作后人工立即接手，有明确 assignee + 后续推进，交接无缝' },
      { score: 80, condition: 'Bot动作后人工较快速接手（24h内），有 assignee，交接顺畅' },
      { score: 60, condition: 'Bot动作后人工接手但存在延迟（>24h），或 assignee 不够明确' },
      { score: 40, condition: 'Bot动作后有人类响应但仅口头跟进，无实质性处理动作' },
      { score: 20, condition: 'Bot动作后人工响应极其滞后（>7天），交接有明显停滞' },
      { score: 0, condition: 'Bot动作后无人接手，流程被卡住，完全无人类承接' },
    ],
  },
};

export const getMetricDefinition = (
  code: string
): MetricDefinition | undefined => METRIC_DEFINITIONS[code];
