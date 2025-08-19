import React from 'react';
import { Modal, Card, Divider } from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { ServerData } from '../types';

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
      title={
        <div className="flex items-center gap-2">
          <DatabaseOutlined style={{ color: '#3b82f6', fontSize: '18px' }} />
          <span className="text-lg font-semibold">{server.name} 硬件配置</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={780}
      destroyOnClose
      className="hardware-config-modal"
    >
      <div className="mb-0 p-6">
        <div className="space-y-6">
          {/* CPU配置 */}
          <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500 p-2">
                <DatabaseOutlined
                  style={{ color: 'white', fontSize: '18px' }}
                />
              </div>
              <span className="font-medium text-gray-700">CPU</span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-blue-700">
              {server.config.cpu}
            </span>
          </div>

          {/* 内存配置 */}
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500 p-2">
                <CloudServerOutlined
                  style={{ color: 'white', fontSize: '18px' }}
                />
              </div>
              <span className="font-medium text-gray-700">内存</span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-green-700">
              {server.config.memory}
            </span>
          </div>

          {/* 存储配置 */}
          <div className="flex items-center justify-between rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500 p-2">
                <HddOutlined style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <span className="font-medium text-gray-700">存储</span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-purple-700">
              {server.config.disk}
            </span>
          </div>

          {/* 网络配置 */}
          <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500 p-2">
                <WifiOutlined style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <span className="font-medium text-gray-700">网络</span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-orange-700">
              {server.config.network}
            </span>
          </div>

          {/* 操作系统配置 */}
          <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-gradient-to-r from-indigo-50 to-indigo-100 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500 p-2">
                <LaptopOutlined style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <span className="font-medium text-gray-700">操作系统</span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-indigo-700">
              {server.config.system_info} ({server.config.architecture})
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ServerConfigModal;
