import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import { osBoardState, loadFromStorage } from './state';
import { formatToNow } from '@common/utils/time';
import { METRIC_I18N_MAP } from './config/modelMetrics';
import Banner from './Banner';

const DashboardHome = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div className="bg-[#ffffff] pb-10">
      <Banner className="!mb-0" />
      <Center className="pt-10 md:px-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xl font-semibold">
            {t('os_board:home.title')}
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => {
                router.push('/os-board/dashboard/create');
              }}
            >
              {t('os_board:home.new_dashboard')}
            </Button>
          </div>
        </div>

        {snap.dashboards.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {t('common:no_data')}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:grid-cols-1 xl:grid-cols-2">
            {snap.dashboards.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  router.push(`/os-board/dashboard/${d.id}`);
                }}
                className="flex cursor-pointer flex-col gap-3 border bg-white p-5 hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)]"
              >
                {/* 标题和类型 */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="line-clamp-1 flex-1 break-all text-lg font-semibold"
                    title={d.name}
                  >
                    {d.name}
                  </div>
                  <div
                    className={`flex-shrink-0 rounded px-2 py-0.5 text-xs ${
                      d.type === 'community'
                        ? 'bg-[#FFF9F2] text-[#D98523]'
                        : 'bg-[#E6FFFB] text-[#13A8A8]'
                    }`}
                  >
                    {d.type === 'community'
                      ? t('os_board:dashboard.type.community')
                      : t('os_board:dashboard.type.project')}
                  </div>
                </div>

                {/* 指标列表 - 标签样式 */}
                <div className="line-clamp-1 h-7">
                  {d.config.metrics.length > 0 ? (
                    d.config.metrics.map((metricId) => {
                      const i18nKey = METRIC_I18N_MAP[metricId];
                      const displayName = i18nKey ? t(i18nKey) : metricId;
                      return (
                        <span
                          key={metricId}
                          className="mr-2 inline-block h-7 max-w-[140px] truncate rounded bg-slate-100 px-2 text-xs leading-7 text-[#585858]"
                          title={displayName}
                        >
                          {displayName}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-sm text-[#585858]">-</span>
                  )}
                </div>

                {/* 项目列表 - 标签样式 */}
                <div className="line-clamp-1 h-7">
                  {d.config.projects.length > 0 ? (
                    d.config.projects.map((project) => {
                      // 去掉 github: 前缀，只显示 org/repo
                      const displayName = project.replace(/^github:/, '');
                      return (
                        <span
                          key={project}
                          className="mr-2 inline-block h-7 max-w-[160px] truncate rounded bg-[#E8F4FF] px-2 text-xs leading-7 text-[#1677FF]"
                          title={project}
                        >
                          {displayName}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-sm text-[#585858]">-</span>
                  )}
                </div>

                {/* 创建时间 */}
                <div className="mt-2 flex items-center justify-between border-t pt-4 text-sm text-[#585858]">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/os-board/dashboard/${d.id}`);
                    }}
                  >
                    {t('os_board:home.open')}
                  </Button>
                  <time>{formatToNow(d.createdAt)}</time>
                </div>
              </div>
            ))}
          </div>
        )}
      </Center>
    </div>
  );
};

export default DashboardHome;
