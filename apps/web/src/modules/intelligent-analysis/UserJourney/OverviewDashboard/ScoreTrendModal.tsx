import React from 'react';
import { Modal, Typography } from 'antd';
import type { ScoreTrendPoint } from './scoreTrend';
import { ScoreTrendChart } from './ScoreTrendChart';

const { Title } = Typography;

type ScoreTrendModalProps = {
  open: boolean;
  title: string;
  points: ScoreTrendPoint[];
  onClose: () => void;
};

const ScoreTrendModal: React.FC<ScoreTrendModalProps> = ({
  open,
  title,
  points,
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
      <ScoreTrendChart points={points} />
      <div className="oj-trend-legend">
        <span className="oj-trend-legend-item">
          <span
            className="oj-trend-line"
            style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
            }}
          />
          综合体验评分
        </span>
      </div>
    </Modal>
  );
};

export default ScoreTrendModal;
