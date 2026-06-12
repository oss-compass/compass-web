import React from 'react';
import { Modal, Typography } from 'antd';
import type { ScoreTrendPoint } from './scoreTrend';
import { ScoreTrendChart } from './ScoreTrendChart';

const { Title } = Typography;

type ScoreTrendModalProps = {
  open: boolean;
  title: string;
  points: ScoreTrendPoint[];
  legendLabel?: string;
  axisTitle?: string;
  tooltipLabel?: string;
  valueType?: 'score' | 'percent';
  onClose: () => void;
};

const ScoreTrendModal: React.FC<ScoreTrendModalProps> = ({
  open,
  title,
  points,
  legendLabel = '综合体验评分',
  axisTitle = '综合体验评分',
  tooltipLabel = '周度评分',
  valueType = 'score',
  onClose,
}) => {
  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      width={860}
      destroyOnHidden
    >
      <div className="mb-3">
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
      </div>
      <ScoreTrendChart
        points={points}
        axisTitle={axisTitle}
        tooltipLabel={tooltipLabel}
        valueType={valueType}
      />
      <div className="oj-trend-legend">
        <span className="oj-trend-legend-item">
          <span
            className="oj-trend-line"
            style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
            }}
          />
          {legendLabel}
        </span>
      </div>
    </Modal>
  );
};

export default ScoreTrendModal;
