import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Tabs, Tag } from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
} from '@ant-design/icons';

// 导入类型定义
import { ServerData } from './types';

// 导入子组件
import ServerTable from './components/ServerTable';
import ServerDetailModal from './components/ServerDetailModal';
import ServerConfigModal from './components/ServerConfigModal';

// 导入模拟数据
import { mockMirrorSources } from './data/mockData';

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gitee');
  const [modalVisible, setModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  // 获取当前选中的镜像源数据
  const currentSource =
    mockMirrorSources.find((source) => source.key === activeTab) ||
    mockMirrorSources[0];

  // 弹窗处理函数
  const handleShowModal = (server: ServerData) => {
    setSelectedServer(server);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedServer(null);
  };

  // 配置信息弹窗处理函数
  const handleShowConfigModal = (server: ServerData) => {
    setSelectedServer(server);
    setConfigModalVisible(true);
  };

  const handleCloseConfigModal = () => {
    setConfigModalVisible(false);
    setSelectedServer(null);
  };

  // 创建标签页项目
  const tabItems = mockMirrorSources.map((source) => ({
    key: source.key,
    label: (
      <div className="flex items-center gap-2">
        <span>{source.name}</span>
        <Tag
          color={
            source.onlineServers === source.totalServers ? 'green' : 'orange'
          }
        >
          {source.onlineServers}/{source.totalServers}
        </Tag>
      </div>
    ),
    children: (
      <div>
        {/* 服务器详细信息 */}
        <Card title={`${source.name} 计算节点详情`}>
          <ServerTable
            servers={source.servers}
            onShowModal={handleShowModal}
            onShowConfigModal={handleShowConfigModal}
          />
        </Card>
      </div>
    ),
  }));

  return (
    <div className="p-6">
      {/* 概览统计 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总服务器数"
              value={currentSource.totalServers}
              prefix={<CloudServerOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线服务器"
              value={currentSource.onlineServers}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线服务器"
              value={currentSource.totalServers - currentSource.onlineServers}
              prefix={<HddOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线率"
              value={
                (currentSource.onlineServers / currentSource.totalServers) * 100
              }
              precision={1}
              suffix="%"
              prefix={<WifiOutlined />}
              valueStyle={{
                color:
                  currentSource.onlineServers === currentSource.totalServers
                    ? '#3f8600'
                    : '#faad14',
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 标签页 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
      />

      {/* 服务器详情弹窗 */}
      <ServerDetailModal
        visible={modalVisible}
        server={selectedServer}
        onClose={handleCloseModal}
      />

      {/* 服务器配置信息弹窗 */}
      <ServerConfigModal
        visible={configModalVisible}
        server={selectedServer}
        onClose={handleCloseConfigModal}
      />
    </div>
  );
};

export default SystemMonitor;
