import React, { useState, useEffect } from 'react';
import { Card, Tabs, Spin, Alert } from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
} from '@ant-design/icons';

// 导入类型定义
import { ServerData, MirrorSourceData } from './types';

// 导入子组件
import ServerTable from './components/ServerTable';
import ServerDetailModal from './components/ServerDetailModal';
import ServerConfigModal from './components/ServerConfigModal';

// 导入API调用hook
import { useServerList } from '../../hooks';

// 导入数据转换工具
import { transformApiServerData } from './utils/dataTransform';

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gitee');
  const [modalVisible, setModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);

  // 固定的三个机构tab
  const fixedTabs = [
    { key: 'gitee', name: '开源中国', belongTo: '开源中国' },
    { key: 'cas', name: '中科院', belongTo: '中科院' },
    { key: 'pku', name: '北京大学', belongTo: '北大' },
    { key: 'nju', name: '南京大学', belongTo: '南大' },
  ];

  // 根据当前选中的tab获取对应机构的数据
  const getCurrentBelongTo = () => {
    switch (activeTab) {
      case 'gitee':
        return '开源中国';
      case 'cas':
        return '中科院';
      case 'pku':
        return '北大';
      case 'nju':
        return '南大';
      default:
        return '开源中国';
    }
  };

  // 只获取当前选中tab的数据
  const {
    data: currentData,
    isLoading: currentLoading,
    error: currentError,
  } = useServerList(getCurrentBelongTo());

  // 转换当前tab的服务器数据
  const currentServers = currentData
    ? currentData.map(transformApiServerData)
    : [];

  // 计算在线服务器数量
  const onlineServers = currentServers.filter(
    (server) => server.status === 'online'
  ).length;
  const totalServers = currentServers.length;

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

  // 创建固定的标签页项目
  const tabItems = fixedTabs.map((tab) => ({
    key: tab.key,
    label: (
      <div className="flex items-center gap-2">
        <span>{tab.name}</span>
      </div>
    ),
    children: (
      <div>
        {/* 服务器详细信息 */}
        <Card title={`${tab.name} 节点详情`}>
          {currentLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spin size="large" tip="正在加载服务器数据..." />
            </div>
          ) : currentError ? (
            <Alert
              message="数据加载失败"
              description={`无法获取服务器列表数据: ${currentError.message}`}
              type="error"
              showIcon
            />
          ) : currentServers.length === 0 ? (
            <Alert
              message="暂无数据"
              description="当前没有可用的服务器数据"
              type="info"
              showIcon
            />
          ) : (
            <ServerTable
              servers={currentServers}
              onShowModal={handleShowModal}
              onShowConfigModal={handleShowConfigModal}
            />
          )}
        </Card>
      </div>
    ),
  }));

  // 获取当前选中tab的名称
  const currentTabName =
    fixedTabs.find((tab) => tab.key === activeTab)?.name || '开源中国';

  return (
    <div className="p-6">
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
