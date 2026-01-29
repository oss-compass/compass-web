import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import StickyNav from '@common/components/Header/StickyNav';
import { Button } from '@oss-compass/ui';
import type { OsBoardTimeRangePreset } from '../types';
import DashboardDatePicker from './DashboardDatePicker';

interface DetailNavProps {
  dashboard: {
    name: string;
    updatedAt: string;
    config: {
      compareMode: boolean;
      projects: readonly string[];
      timeRange: {
        preset: string;
        start?: string;
        end?: string;
      };
    };
  };
  onEdit: () => void;
  onAlertManage: () => void;
  onUserManage: () => void;
  onDelete: () => void;
  onTimeRangeChange: (
    preset: OsBoardTimeRangePreset,
    start?: string,
    end?: string
  ) => void;
}

const DetailNav: React.FC<DetailNavProps> = ({
  dashboard,
  onEdit,
  onAlertManage,
  onUserManage,
  onDelete,
  onTimeRangeChange,
}) => {
  const { t } = useTranslation();

  return (
    <StickyNav className="top-0">
      <nav
        className={classnames(
          'flex min-h-[56px] flex-wrap items-center justify-between gap-3 border-b border-t bg-white px-6 py-2',
          'md:px-4'
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-semibold">
                {dashboard.name}
              </h1>
              {dashboard.config.compareMode && (
                <span className="flex-shrink-0 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                  {t('os_board:detail.mode.compare')}
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
              <span>
                {t('os_board:detail.updated_at')}:{' '}
                {dashboard.updatedAt.slice(0, 10)}
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 md:hidden lg:flex">
            {dashboard.config.projects.slice(0, 3).map((p) => (
              <span
                key={p}
                className="max-w-[160px] truncate rounded border bg-gray-50 px-2 py-0.5 text-xs"
              >
                {p}
              </span>
            ))}
            {dashboard.config.projects.length > 3 && (
              <span className="rounded border bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                +{dashboard.config.projects.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          <DashboardDatePicker
            preset={dashboard.config.timeRange.preset as OsBoardTimeRangePreset}
            start={dashboard.config.timeRange.start}
            end={dashboard.config.timeRange.end}
            onChange={onTimeRangeChange}
          />
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
