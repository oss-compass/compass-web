import React from 'react';
import { Modal, Typography } from 'antd';
import { ScoreTrendChart } from '../../../../UserJourney/OverviewDashboard/ScoreTrendChart';
import type { ScoreTrendPoint } from '../../../../UserJourney/OverviewDashboard/scoreTrend';

const { Title } = Typography;

export type IssueTrendModalData = {
  title: string;
  subtitle?: string;
  unit?: string;
  height?: number;
  values: Array<number | null>;
  /** 与 values 对齐的 X 轴标签（已格式化短标签） */
  labels: string[];
};

type IssueTrendModalProps = {
  open: boolean;
  trend: IssueTrendModalData | null;
  onClose: () => void;
};

/**
 * Issue 总览统一趋势弹窗：与社区入门的综合体验评分弹窗共用图表。
 */
const IssueTrendModal: React.FC<IssueTrendModalProps> = ({
  open,
  trend,
  onClose,
}) => {
  const points = React.useMemo<ScoreTrendPoint[]>(
    () =>
      trend?.values.map((score, index) => ({
        key: `${index}-${trend.labels[index] ?? ''}`,
        date: trend.labels[index] ?? '',
        label: trend.labels[index] ?? '',
        score,
      })) ?? [],
    [trend]
  );
  const isPercent = trend?.unit === '%';
  const axisTitle = React.useMemo(() => {
    const title = trend?.title ?? '';
    if (title.includes('Issue')) return '涉及 Issue 数';
    if (title.includes('仓库')) return '仓库数';
    if (isPercent) return '百分比';
    return '综合体验评分';
  }, [isPercent, trend?.title]);

  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      width={860}
      destroyOnHidden
      styles={{ body: { padding: '20px 24px 16px' } }}
    >
      {trend ? (
        <>
          <div className="mb-3">
            <Title level={5} style={{ margin: 0 }}>
              {trend.title}
            </Title>
          </div>
          <ScoreTrendChart
            points={points}
            height={trend.height ?? 290}
            axisTitle={axisTitle}
            tooltipLabel={axisTitle}
            valueType={isPercent ? 'percent' : 'score'}
            integerScale
            fitContainerHeight
          />
          <div className="oj-trend-legend">
            <span className="oj-trend-legend-item">
              <span
                className="oj-trend-line"
                style={{
                  background:
                    'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
                }}
              />
              {axisTitle}
            </span>
          </div>
        </>
      ) : null}
    </Modal>
  );
};

export default IssueTrendModal;
