import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Card, Statistic, message } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import { ServerData, MetricTableRequest, MetricTableResponse } from '../types';
import { getBandwidthColor } from '../utils/uiUtils';
import CommonDateRangePicker from '@common/components/DateRangePicker';
import type { DateRangeType } from '@common/components/DateRangePicker';
import TrendChart, { TrendChartRef } from './TrendChart';
import { useServerMetricData } from '../../../hooks';

interface ServerDetailModalProps {
  visible: boolean;
  server: ServerData | null;
  onClose: () => void;
}

// 日期范围转换函数
const getDateRange = (range: DateRangeType) => {
  const now = new Date();
  const endTime = now.toISOString().slice(0, 19).replace('T', ' ');

  let startTime: string;
  switch (range) {
    case '7d':
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      break;
    case '30d':
      startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      break;
    case '90d':
      startTime = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      break;
    case '1y':
      startTime = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      break;
    default:
      startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
  }

  return { startTime, endTime };
};

// 数据转换函数
const transformMetricData = (data: MetricTableResponse[]) => {
  const cpuData = data.map((item) => ({
    time: item.created_at,
    value: item.cpu_percent,
  }));
  const memoryData = data.map((item) => ({
    time: item.created_at,
    value: item.memory_percent,
  }));
  const diskIOData = data.map((item) => ({
    time: item.created_at,
    value: item.disk_io_read + item.disk_io_write,
  }));
  const networkData = data.map((item) => ({
    time: item.created_at,
    value: item.net_io_recv + item.net_io_sent,
  }));

  return {
    cpuData,
    memoryData,
    diskIOData,
    networkData,
  };
};

// 自定义预设选项
const customPresetOptions = [
  { key: '7d' as DateRangeType, label: '最近7天' },
  { key: '30d' as DateRangeType, label: '最近30天' },
  { key: '90d' as DateRangeType, label: '最近90天' },
  { key: '1y' as DateRangeType, label: '最近1年' },
];

const ServerDetailModal: React.FC<ServerDetailModalProps> = ({
  visible,
  server,
  onClose,
}) => {
  const [dateRange, setDateRange] = useState<DateRangeType>('30d');

  const handleDateRangeChange = (
    range: DateRangeType,
    customDates?: { start: string; end: string }
  ) => {
    setDateRange(range);
    // 如果是自定义日期，可以在这里处理customDates
    if (range === 'custom' && customDates) {
      console.log('Custom date range:', customDates);
    }
  };

  // 构建API请求参数
  const { startTime, endTime } = getDateRange(dateRange);
  const metricParams: MetricTableRequest = {
    server_id: server?.name || '',
    begin_time: startTime,
    end_time: endTime,
  };

  // 使用hook获取监控数据
  const {
    data: rawMetricData,
    isLoading: loading,
    error,
  } = useServerMetricData(metricParams, visible && !!server);

  // 转换数据格式
  const metricData = rawMetricData ? transformMetricData(rawMetricData) : null;

  // 处理错误
  useEffect(() => {
    if (error) {
      message.error('获取监控数据失败');
      console.error('Error loading metric data:', error);
    }
  }, [error]);

  // TrendChart refs
  const cpuChartRef = useRef<TrendChartRef>(null);
  const memoryChartRef = useRef<TrendChartRef>(null);
  const diskIOChartRef = useRef<TrendChartRef>(null);
  const networkChartRef = useRef<TrendChartRef>(null);

  // 处理Modal关闭，清理图表实例
  const handleClose = () => {
    // 延迟清理图表实例，避免DOM操作冲突
    setTimeout(() => {
      try {
        cpuChartRef.current?.dispose();
        memoryChartRef.current?.dispose();
        diskIOChartRef.current?.dispose();
        networkChartRef.current?.dispose();
      } catch (error) {
        console.warn('Error disposing charts on modal close:', error);
      }
    }, 100);
    onClose();
  };

  if (!server) return null;

  return (
    <Modal
      title={
        <div className="flex items-center justify-between pr-6">
          <div className="flex items-center gap-2">
            <DatabaseOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
            <span className="text-lg font-semibold">
              {server.name} 详细监控
            </span>
          </div>
          <CommonDateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            presetOptions={customPresetOptions}
          />
        </div>
      }
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={1300}
      destroyOnClose
      className="server-detail-modal"
    >
      <div className="mb-0 p-6">
        {/* 趋势图表 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <TrendChart
              ref={cpuChartRef}
              data={metricData?.cpuData || []}
              title="CPU使用率趋势"
              color="#1890ff"
              unit="%"
              dateRange={dateRange}
              loading={loading}
            />
          </Col>
          <Col xs={24} lg={12}>
            <TrendChart
              ref={memoryChartRef}
              data={metricData?.memoryData || []}
              title="内存使用率趋势"
              color="#52c41a"
              unit="%"
              dateRange={dateRange}
              loading={loading}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} lg={12}>
            <TrendChart
              ref={diskIOChartRef}
              data={metricData?.diskIOData || []}
              title="磁盘IO趋势"
              color="#faad14"
              unit="MB/s"
              dateRange={dateRange}
              loading={loading}
            />
          </Col>
          <Col xs={24} lg={12}>
            <TrendChart
              ref={networkChartRef}
              data={metricData?.networkData || []}
              title="网络带宽趋势"
              color="#722ed1"
              unit="Mbps"
              dateRange={dateRange}
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ServerDetailModal;
