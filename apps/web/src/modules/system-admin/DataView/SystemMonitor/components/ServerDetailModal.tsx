import React, { useState } from 'react';
import { Modal, Row, Col, Card, Statistic } from 'antd';
import { ServerData, DateRangeType } from '../types';
import { getBandwidthColor } from '../utils/uiUtils';
import MonitorDatePicker from './MonitorDatePicker';
import TrendChart from './TrendChart';

interface ServerDetailModalProps {
  visible: boolean;
  server: ServerData | null;
  onClose: () => void;
}

const ServerDetailModal: React.FC<ServerDetailModalProps> = ({
  visible,
  server,
  onClose,
}) => {
  const [dateRange, setDateRange] = useState<DateRangeType>('30d');

  if (!server) return null;

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <span>{server.name} 详细监控</span>
          <MonitorDatePicker value={dateRange} onChange={setDateRange} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      {/* 服务器基本信息 */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="CPU使用率"
              value={server.cpu}
              precision={1}
              suffix="%"
              valueStyle={{
                color: server.cpu > 80 ? '#f5222d' : '#3f8600',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="内存使用率"
              value={server.memory}
              precision={1}
              suffix="%"
              valueStyle={{
                color: server.memory > 80 ? '#f5222d' : '#3f8600',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="磁盘使用率"
              value={server.disk}
              precision={1}
              suffix="%"
              valueStyle={{
                color: server.disk > 80 ? '#f5222d' : '#3f8600',
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="网络带宽"
              value={server.bandwidth}
              precision={1}
              suffix="Mbps"
              valueStyle={{
                color: getBandwidthColor(server.bandwidth),
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 趋势图表 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <TrendChart
            id={`modal-cpu-chart-${server.key}`}
            data={server.cpuTrend}
            title="CPU使用率趋势"
            color="#1890ff"
            unit="%"
            dateRange={dateRange}
          />
        </Col>
        <Col xs={24} lg={12}>
          <TrendChart
            id={`modal-memory-chart-${server.key}`}
            data={server.memoryTrend}
            title="内存使用率趋势"
            color="#52c41a"
            unit="%"
            dateRange={dateRange}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} lg={12}>
          <TrendChart
            id={`modal-diskio-chart-${server.key}`}
            data={server.diskIOTrend}
            title="磁盘IO趋势"
            color="#faad14"
            unit="MB/s"
            dateRange={dateRange}
          />
        </Col>
        <Col xs={24} lg={12}>
          <TrendChart
            id={`modal-bandwidth-chart-${server.key}`}
            data={server.bandwidthTrend}
            title="网络带宽趋势"
            color="#722ed1"
            unit="Mbps"
            dateRange={dateRange}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ServerDetailModal;
