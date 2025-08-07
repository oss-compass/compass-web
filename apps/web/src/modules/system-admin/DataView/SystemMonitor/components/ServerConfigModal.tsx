import React from 'react';
import { Modal, Row, Col, Card, Tag, Progress } from 'antd';
import { ServerData } from '../types';
import {
  getRoleConfig,
  getStatusConfig,
  getBandwidthColor,
} from '../utils/uiUtils';

interface ServerConfigModalProps {
  visible: boolean;
  server: ServerData | null;
  onClose: () => void;
}

const ServerConfigModal: React.FC<ServerConfigModalProps> = ({
  visible,
  server,
  onClose,
}) => {
  if (!server) return null;

  return (
    <Modal
      title={`${server.name} 配置信息`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {/* 服务器基本信息 */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Card size="small" title="基本信息">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">服务器名称:</span>
                <span className="font-medium">{server.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">服务器作用:</span>
                <span>
                  {(() => {
                    const config = getRoleConfig(server.role);
                    return (
                      <Tag color={config.color} icon={config.icon}>
                        {config.text}
                      </Tag>
                    );
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">部署位置:</span>
                <span className="font-medium">{server.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">运行状态:</span>
                <span>
                  {(() => {
                    const config = getStatusConfig(server.status);
                    return (
                      <Tag color={config.color} icon={config.icon}>
                        {config.text}
                      </Tag>
                    );
                  })()}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="硬件配置">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">CPU:</span>
                <span className="ml-2 flex-1 text-right font-medium">
                  {server.config.cpu}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">内存:</span>
                <span className="font-medium">{server.config.memory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">存储:</span>
                <span className="ml-2 flex-1 text-right font-medium">
                  {server.config.disk}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">网络:</span>
                <span className="ml-2 flex-1 text-right font-medium">
                  {server.config.network}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="系统信息">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">操作系统:</span>
                <span className="ml-2 flex-1 text-right font-medium">
                  {server.config.os}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">架构:</span>
                <span className="font-medium">
                  {server.config.architecture}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 当前资源使用情况 */}
      <Card title="当前资源使用情况" size="small">
        <Row gutter={16}>
          <Col span={6}>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {server.cpu.toFixed(1)}%
              </div>
              <div className="text-gray-600">CPU使用率</div>
              <Progress
                percent={server.cpu}
                size="small"
                strokeColor={server.cpu > 80 ? '#f5222d' : '#1890ff'}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {server.memory.toFixed(1)}%
              </div>
              <div className="text-gray-600">内存使用率</div>
              <Progress
                percent={server.memory}
                size="small"
                strokeColor={server.memory > 80 ? '#f5222d' : '#52c41a'}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {server.disk.toFixed(1)}%
              </div>
              <div className="text-gray-600">磁盘使用率</div>
              <Progress
                percent={server.disk}
                size="small"
                strokeColor={server.disk > 80 ? '#f5222d' : '#faad14'}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="text-center">
              <div
                className="text-lg font-semibold"
                style={{
                  color: getBandwidthColor(server.bandwidth),
                }}
              >
                {server.bandwidth.toFixed(1)} Mbps
              </div>
              <div className="text-gray-600">网络带宽</div>
              <div className="mt-1 text-xs text-gray-500">
                磁盘IO: {server.diskIO.toFixed(1)} MB/s
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default ServerConfigModal;
