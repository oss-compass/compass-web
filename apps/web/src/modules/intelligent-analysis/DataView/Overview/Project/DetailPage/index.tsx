// autocorrect: false
import React, { useMemo } from 'react';
import { Divider } from 'antd';
import { useTranslation } from 'next-i18next';
import ParticipantDetails from './ParticipantDetails';
import { useUserDetail } from '../hooks/useUserDetail';
import { DeveloperData } from '../../types';
import { EcosystemScore } from './types';
import {
  generateEcosystemTableData,
  generateParticipantTableData,
} from './utils/dataGenerators';

// 导入子组件
import BreadcrumbNav from './BreadcrumbNav';
import BasicInfoCard from './BasicInfoCard';
import EcosystemOverview from './EcosystemOverview';
import EcosystemCharts from './EcosystemCharts';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface DetailPageProps {
  data: DeveloperData;
  onBack: () => void;
  projectType?: string;
}

const DetailPage: React.FC<DetailPageProps> = ({
  data,
  onBack,
  projectType = 'Flutter',
}) => {
  const { i18n } = useTranslation('intelligent_analysis');

  // 使用 hook 获取用户详情数据
  const { detailData, ecoChartsData, loading, error } = useUserDetail(
    projectType,
    data.用户ID
  );

  // 生成生态得分概览表格数据
  const ecosystemTableData = useMemo(
    () => generateEcosystemTableData(detailData, i18n.language),
    [detailData, i18n.language]
  );

  // 生成统一的参与详情表格数据
  const participantTableData = useMemo(
    () => generateParticipantTableData(detailData, data.用户ID),
    [detailData, data.用户ID]
  );

  // 如果正在加载，显示加载状态
  if (loading) {
    return <LoadingState />;
  }

  // 如果加载失败，显示错误信息
  if (error) {
    return (
      <ErrorState
        error={error}
        projectType={projectType}
        userId={data.用户ID}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 面包屑导航 */}
          <BreadcrumbNav
            projectType={projectType}
            userId={data.用户ID}
            onBack={onBack}
          />

          {/* 基本信息卡片 */}
          <BasicInfoCard data={data} totalScore={detailData?.基本信息.总得分} />

          <Divider />

          {/* 生态得分概览 */}
          <EcosystemOverview data={ecosystemTableData} />

          {/* 生态详细图表分析 */}
          <EcosystemCharts data={ecoChartsData} />

          {/* 人员参与详情表格 */}
          <ParticipantDetails
            ecosystem={projectType}
            organizationId={data.用户ID}
          />
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
