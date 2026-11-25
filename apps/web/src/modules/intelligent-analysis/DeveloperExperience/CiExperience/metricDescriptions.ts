const platformFailure =
  '失败的流水线中，因平台、环境或工程问题导致失败的比例，如限流、证书异常、资源申请失败、镜像下载失败或 CI 脚本问题。';
const flakyFailure =
  '同一代码在相同环境下出现一红一绿的非确定性失败占比，为近似值。';
const longRunningCancellation =
  '已取消且运行时间达到或超过 1 小时的流水线数量。';
const staticCheckerFailure =
  '静态检查器自身崩溃或因超时被终止的比例，不包含检查误报。';
const onTimePipeline = '已结束的流水线中，总耗时不超过 30 分钟的比例。';
const onTimeDeviceValidation =
  '已结束的流水线中，PreSmoke 阶段耗时不超过 15 分钟的比例；并行 job 按最长耗时计算。';
const onTimeBuildAndUnitTests =
  '已结束的流水线中，编译阶段最长 job 与单测阶段最长 job 的耗时之和不超过 15 分钟的比例；不包含 API_Check 和 ST。';
const firstCodeFailure =
  '对代码原因失败的流水线，统计从运行开始到最早失败步骤结束的时间，取中位数。';
const firstGreen =
  '按 PR 统计从首次运行开始到最早一次成功结束的时间，取近 7 日数据的第 90 百分位。';
const notificationCoverage =
  '失败后 24 小时内，PR 被机器人添加 ci-pipeline-failed 标签的比例。';
const failureRecovery =
  '按 PR 统计从失败结束到下一次成功结束的时间，每个 PR 只计首次修复，取近 7 日数据的中位数；包含夜间和周末。';
const wastedMachineHours =
  '已取消和因平台原因失败的流水线所消耗的全部机时，占总机时的比例；不包含代码原因失败的机时。';
const repeatedMachineHours =
  '同一 PR、同一作者、同一头 commit 的流水线中，除首次运行外消耗的机时，占总机时的比例。';

const normalizeMetricLabel = (label: string) =>
  label.replace(/\s+/g, '').replace(/（/g, '(').replace(/）/g, ')');

// 日报以显示名称标识指标，历史日报仍使用部分旧名称。
const descriptions = new Map(
  Object.entries({
    平台原因失败占比: platformFailure,
    'Action 平台失败率': platformFailure,
    '疑似 Flaky 失败率': flakyFailure,
    'Flaky 率(近似)': flakyFailure,
    长时间运行后取消数: longRunningCancellation,
    流水线挂死数: longRunningCancellation,
    流水线挂死: longRunningCancellation,
    静态检查器异常率: staticCheckerFailure,
    静态检查有效率: `按 100% 减去静态检查器异常率计算。异常率指${staticCheckerFailure}`,
    '流水线 30 分钟内完成率': onTimePipeline,
    '整体流水线按时完成率(≤30 min)': onTimePipeline,
    '整体按时完成率 ≤30 min': onTimePipeline,
    '真机验证 15 分钟内完成率': onTimeDeviceValidation,
    '真机验证按时完成率(≤15 min)': onTimeDeviceValidation,
    '真机验证按时完成率 ≤15 min': onTimeDeviceValidation,
    '编译与单测 15 分钟内完成率': onTimeBuildAndUnitTests,
    '编译+单元测试按时完成率(≤15 min)': onTimeBuildAndUnitTests,
    '编译+UT 按时完成率 ≤15 min': onTimeBuildAndUnitTests,
    '代码失败首次报错时间（中位数）': firstCodeFailure,
    '首次失败耗时中位(代码失败口径)': firstCodeFailure,
    '首次失败耗时(代码口径)': firstCodeFailure,
    'PR 首次转绿时间（近 7 日 P90）': firstGreen,
    'PR 转绿时长 90 分位(滚动 7 日)': firstGreen,
    失败通知覆盖率: notificationCoverage,
    失败告知覆盖率: notificationCoverage,
    '失败修复时长（近 7 日中位数）': failureRecovery,
    '失败修复时长 中位(滚动 7 日)': failureRecovery,
    无效机时占比: wastedMachineHours,
    重复运行机时占比: repeatedMachineHours,
    重复执行机时占比: repeatedMachineHours,

    // 步骤详情还展示阶段观测值，部分观测值与入分指标的统计口径不同。
    '平台/待定失败数': '本阶段因平台原因或失败原因尚未判定的失败次数。',
    确认时延中位:
      '从发出流水线触发评论到机器人首次回复触发成功的时长，取当日中位数；仅统计 30 分钟内收到确认的评论。',
    无确认回帖率:
      '触发流水线的评论中，30 分钟内未收到机器人触发成功回帖的比例。',
    阶段耗时中位: '统计流水线在本阶段的耗时，取当日中位数。',
    浪费机时: '本阶段中，已取消或因平台原因失败的流水线消耗的机时。',
    '首次失败耗时中位(全体口径·当日)':
      '对当日所有失败流水线，统计从运行开始到最早失败步骤结束的时间，取中位数。',
    '失败未告知率(标签口径·24h 窗)':
      '失败后 24 小时内，PR 未被机器人添加 ci-pipeline-failed 标签的比例。',
    '重试再失败率(滚动 7 日)':
      '近 7 日内，同一 PR 中已有下一次完结运行的失败流水线里，下一次运行仍然失败的比例。',
    重复执行机时:
      '同一 PR、同一作者、同一头 commit 的流水线中，除首次运行外消耗的机时。',
  }).map(([label, description]) => [normalizeMetricLabel(label), description])
);

export const getCiMetricDescription = (label: string) =>
  descriptions.get(normalizeMetricLabel(label));
