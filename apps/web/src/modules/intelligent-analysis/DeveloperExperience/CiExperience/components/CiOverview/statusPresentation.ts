import { OVERVIEW_STATUS_COLORS } from '../../../../UserJourney/OverviewDashboard/theme';
import type { TrackingStatus } from '../PainTracking/model';

/** 总览统一展示名称，保留后端状态值用于统计和筛选。 */
export const CI_OVERVIEW_STATUS_META: Record<
  TrackingStatus,
  { label: string; color: string; fill: string; valueClassName: string }
> = {
  pending: {
    label: '待处理',
    color: 'gold',
    fill: OVERVIEW_STATUS_COLORS.pending.solidBg,
    valueClassName: 'ov-value-pending',
  },
  confirmed: {
    label: '进行中',
    color: 'blue',
    fill: OVERVIEW_STATUS_COLORS.inProgress.solidBg,
    valueClassName: 'ov-value-blue',
  },
  fixed: {
    label: '已闭环',
    color: 'green',
    fill: OVERVIEW_STATUS_COLORS.resolved.solidBg,
    valueClassName: 'ov-value-green',
  },
  invalid: {
    label: '非有效问题',
    color: 'default',
    fill: '#cbd5e1',
    valueClassName: '',
  },
};
