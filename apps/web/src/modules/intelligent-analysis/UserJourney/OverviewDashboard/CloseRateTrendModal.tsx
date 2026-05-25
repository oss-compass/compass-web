import React from 'react';
import { Modal, Typography } from 'antd';
import type { CloseRateTrendPoint } from './closeRateTrend';
import { CloseRateTrendChart } from './CloseRateTrendChart';

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
    </Modal>
  );
};

export default CloseRateTrendModal;
