import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Button } from '@oss-compass/ui';
import DashboardDatePicker from './DashboardDatePicker';
import ProjectList from './ProjectList';

interface DetailNavProps {
  dashboard: {
    name: string;
    updatedAt?: string;
    updated_at?: string;
    type?: 'repo' | 'community';
    dashboard_type?: 'repo' | 'community';
    config?: {
      type?: 'repo' | 'community';
      compareMode: boolean;
      projects: readonly string[];
      competitorProjects?: readonly string[];
    };
  };
  onEdit: () => void;
  onAlertManage: () => void;
  onUserManage: () => void;
  onDelete: () => void;
}

const DetailNav: React.FC<DetailNavProps> = ({
  dashboard,
  onEdit,
  onAlertManage,
  onUserManage,
  onDelete,
}) => {
  const { t } = useTranslation();

  // 兼容新旧数据结构
  const dashboardType =
    dashboard.config?.type ||
    dashboard.dashboard_type ||
    dashboard.type ||
    'repo';
  const updatedAt = dashboard.updatedAt || dashboard.updated_at || '';
  const projects = dashboard.config?.projects || [];
  const competitorProjects = dashboard.config?.competitorProjects || [];
  const compareMode = dashboard.config?.compareMode || false;

  // 格式化日期
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      return dateStr.slice(0, 10);
    } catch {
      return '-';
    }
  };

  return (
    <StickyNav className=">md:-top-[80px] md:-top-[48px]">
      <Header />
      <nav
        className={classnames(
          'flex h-[56px] flex-wrap items-center justify-between gap-3 border-b border-t bg-white px-6 py-2',
          'md:px-4'
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-semibold">
                {dashboard.name}
              </h1>
              <span className="flex-shrink-0 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                {dashboardType === 'repo'
                  ? t('os_board:dashboard.type.repo')
                  : t('os_board:dashboard.type.community')}
              </span>
            </div>
            <div className="ml-2 mt-0.5 flex items-center gap-3 text-xs text-gray-500">
              <span>
                {t('os_board:detail.updated_at')}: {formatDate(updatedAt)}
              </span>
            </div>
          </div>
          <div className="md:hidden lg:flex">
            <ProjectList
              projects={projects}
              competitorProjects={competitorProjects}
              compareMode={compareMode}
              compact
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          <DashboardDatePicker />
          <Button size="sm" onClick={onEdit}>
            {t('common:btn.edit')}
          </Button>
          <Button size="sm" onClick={onAlertManage}>
            {t('os_board:detail.alerts_manage')}
          </Button>
          <Button size="sm" intent="text" onClick={onUserManage}>
            {t('lab:user_management')}
          </Button>
          <Button size="sm" intent="text" onClick={onDelete}>
            {t('common:btn.delete')}
          </Button>
        </div>
      </nav>
    </StickyNav>
  );
};

export default DetailNav;
