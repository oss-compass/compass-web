// autocorrect: false
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'next-i18next';
import DetailPage from './DetailPage';
import DeveloperRegionChart from './DeveloperRegionChart';
import PanoramaChart from './PanoramaChart';
import DeveloperTable from './DeveloperTable';
import OrganizationTable from './OrganizationTable';
import RepoTable from './RepoTable';
import { getProjectDisplayName } from '../utils';
import { DeveloperData } from '../types';
import { getDisplayUserId } from './utils/getDisplayUserId';

interface MainProps {
  projectType?: string;
}

const Main: React.FC<MainProps> = ({ projectType = 'flutter' }) => {
  const { t } = useTranslation('intelligent_analysis');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DeveloperData | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const category = getProjectDisplayName(projectType);

  // 移除用户类型选项

  // 查看详情
  const handleViewDetail = (record: DeveloperData) => {
    setSelectedUser(record);
    setShowDetailModal(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  // 处理地区筛选变化
  const handleRegionFilterChange = (regions: string[]) => {
    setSelectedRegions(regions);
  };

  // 移除原来的表格列定义

  return (
    <>
      <div className="mx-auto max-w-[90vw] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="w-full">
            {/* <Breadcrumb
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
            /> */}
            <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
          </div>
        </div>

        {/* 全景图与地图卡片组件 */}
        <div className="mb-6 flex w-full gap-6">
          <div className="w-1/2">
            <PanoramaChart activeSlug={projectType} loading={false} />
          </div>
          <div className="w-1/2">
            <DeveloperRegionChart
              projectType={projectType}
              loading={false}
              selectedRegions={selectedRegions}
              onRegionFilterChange={handleRegionFilterChange}
              className="h-full"
            />
          </div>
        </div>

        {/* 仓库表格组件 */}
        <RepoTable
          projectType={projectType}
          selectedRegions={selectedRegions}
        />

        {/* 组织表格组件 */}
        <OrganizationTable
          projectType={projectType}
          data={[]}
          loading={false}
          onViewDetail={handleViewDetail}
          selectedRegions={selectedRegions}
          onRegionFilterChange={handleRegionFilterChange}
        />

        {/* 开发者表格组件 */}
        <DeveloperTable
          projectType={projectType}
          data={[]}
          loading={false}
          onViewDetail={handleViewDetail}
          selectedRegions={selectedRegions}
          onRegionFilterChange={handleRegionFilterChange}
        />
      </div>

      {/* 详情弹窗 */}
      <Modal
        title={selectedUser ? `${getDisplayUserId(selectedUser)} 详情` : '详情'}
        open={showDetailModal}
        onCancel={handleCloseModal}
        width="90%"
        style={{ top: 20 }}
        footer={null}
        destroyOnClose
        bodyStyle={{
          padding: 0,
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'auto',
        }}
      >
        <DetailPage
          data={selectedUser}
          onBack={handleCloseModal}
          projectType={projectType}
          isModal={true}
        />
      </Modal>
    </>
  );
};

export default Main;
