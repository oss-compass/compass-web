// autocorrect: false
import React, { useState, useEffect } from 'react';
import { message, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import DetailPage from './DetailPage';
import DeveloperRegionChart from './DeveloperRegionChart';
import DeveloperTable from './DeveloperTable';
import OrganizationTable from './OrganizationTable';
import {
  fetchProjectData,
  getProjectDisplayName,
  processRawData,
} from '../utils';
import { DeveloperData } from '../types';

interface MainProps {
  projectType?: string;
}

const Main: React.FC<MainProps> = ({ projectType = 'flutter' }) => {
  const { t } = useTranslation('intelligent_analysis');
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<DeveloperData[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DeveloperData | null>(null);

  const category = getProjectDisplayName(projectType);

  // 移除用户类型选项

  // 加载项目数据
  const loadProjectData = async () => {
    setLoading(true);
    try {
      console.log(`Loading data for project: ${projectType}`);
      const rawData = await fetchProjectData(projectType);
      const processedData = processRawData(rawData, category);

      console.log(`Loaded ${processedData.length} items for ${category}`);
      setAllData(processedData);
    } catch (error) {
      console.error('Error loading project data:', error);
      message.error(t('project_detail.data_load_error'));
    } finally {
      setLoading(false);
    }
  };

  // 初始化和项目类型变化时加载数据
  useEffect(() => {
    loadProjectData();
  }, [projectType]);

  // 查看详情
  const handleViewDetail = (record: DeveloperData) => {
    setSelectedUser(record);
    setShowDetail(true);
  };

  // 返回列表
  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedUser(null);
  };

  // 获取开发者数据
  const getDeveloperData = () => {
    return allData.filter((item) => item.用户类型 === '开发者');
  };

  // 获取组织数据
  const getOrganizationData = () => {
    return allData.filter((item) => item.用户类型 === '组织');
  };

  // 移除原来的表格列定义

  return (
    <>
      {showDetail && selectedUser ? (
        <DetailPage
          data={selectedUser}
          onBack={handleBackToList}
          projectType={projectType}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="w-full">
              <Breadcrumb
                className="mb-4 text-base"
                items={[
                  {
                    href: '/intelligent-analysis/overview',
                    title: (
                      <span className="flex items-center">
                        <HomeOutlined />
                        <span className="ml-1">{t('overview')}</span>
                      </span>
                    ),
                  },
                  {
                    title: category,
                  },
                ]}
              />
              <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
            </div>
          </div>

          {/* 地图卡片组件 */}
          <DeveloperRegionChart data={allData} className="mb-6" />

          {/* 组织表格组件 */}
          <OrganizationTable
            data={getOrganizationData()}
            loading={loading}
            onViewDetail={handleViewDetail}
          />

          {/* 开发者表格组件 */}
          <DeveloperTable
            data={getDeveloperData()}
            loading={loading}
            onViewDetail={handleViewDetail}
          />
        </div>
      )}
    </>
  );
};

export default Main;
