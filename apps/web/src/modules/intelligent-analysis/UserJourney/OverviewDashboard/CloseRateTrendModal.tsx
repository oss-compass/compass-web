import React from 'react';
import { Modal, Typography } from 'antd';
import type { CloseRateTrendPoint } from './closeRateTrend';
import { CloseRateTrendChart } from './CloseRateTrendChart';
import { OJ_TREND_SEVERITY_SEGMENTS } from './constants';

const { Title } = Typography;

type CloseRateTrendModalProps = {
  open: boolean;
  title: string;
  points: CloseRateTrendPoint[];
  onClose: () => void;
};

const CloseRateTrendModal: React.FC<CloseRateTrendModalProps> = ({
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
      destroyOnClose
    >
      <div className="mb-3">
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
      </div>
      <CloseRateTrendChart points={points} />
      <div className="oj-trend-legend">
        {OJ_TREND_SEVERITY_SEGMENTS.slice()
          .reverse()
          .map(({ key, label, markerColor }) => (
            <span className="oj-trend-legend-item" key={key}>
              <i className="oj-trend-dot" style={{ background: markerColor }} />
              {label}
            </span>
          ))}
        <span className="oj-trend-legend-item">
          <span className="oj-trend-line" />
          周度闭环率
        </span>
      </div>
    </Modal>
  );
};

export default CloseRateTrendModal;
