import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import { formatToNow } from '@common/utils/time';
import Banner from './Banner';
import { useDashboardList } from './api/dashboard';

const DashboardHome = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // API 调用：获取看板列表
  const [page, setPage] = useState(1);
  const [perPage] = useState(9);

  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useDashboardList({
    page,
    per_page: perPage,
  });

  // 使用 API 数据
  const dashboards = dashboardData?.items || [];
  const totalPages = dashboardData?.total_pages || 1;
  const totalCount = dashboardData?.total_count || 0;

  // 解析 repo_urls（后端返回的是字符串化的 JSON）
  const parseRepoUrls = (urls: string | string[]): string[] => {
    if (Array.isArray(urls)) return urls;
    try {
      return JSON.parse(urls);
    } catch {
      return [];
    }
  };

  // 获取看板类型（兼容新旧数据结构）
  const getDashboardType = (dashboard: any): 'community' | 'repo' => {
    return dashboard.dashboard_type || dashboard.type || 'repo';
  };

  // 获取创建时间（兼容新旧数据结构）
  const getCreatedAt = (dashboard: any): string => {
    return dashboard.created_at || dashboard.createdAt || '';
  };

  // 获取指标列表
  const getMetrics = (dashboard: any) => {
    // 新数据结构：dashboard_metrics
    if (dashboard.dashboard_metrics && dashboard.dashboard_metrics.length > 0) {
      return dashboard.dashboard_metrics
        .filter((m: any) => !m.hidden)
        .sort((a: any, b: any) => a.sort - b.sort)
        .slice(0, 3); // 只显示前3个
    }
    // 旧数据结构：config.metrics
    if (dashboard.config?.metrics) {
      return dashboard.config.metrics.slice(0, 3).map((id: string) => ({
        dashboard_metric_info_ident: id,
        dashboard_model_info_ident: 'model_999',
      }));
    }
    return [];
  };

  // 获取项目列表
  const getProjects = (dashboard: any): string[] => {
    // 新数据结构：repo_urls
    if (dashboard.repo_urls) {
      return parseRepoUrls(dashboard.repo_urls);
    }
    // 旧数据结构：config.projects
    if (dashboard.config?.projects) {
      return dashboard.config.projects;
    }
    return [];
  };

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

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            {t('common:loading')}
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-red-500">
            {t('common:error')}: {(error as Error)?.message || '加载失败'}
          </div>
        ) : dashboards.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {t('common:no_data')}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:grid-cols-1 xl:grid-cols-2">
            {dashboards.map((d) => (
              <div
                key={d.identifier}
                onClick={() => {
                  router.push(`/os-board/dashboard/${d.identifier}`);
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
                      getDashboardType(d) === 'community'
                        ? 'bg-[#FFF9F2] text-[#D98523]'
                        : 'bg-[#E6FFFB] text-[#13A8A8]'
                    }`}
                  >
                    {getDashboardType(d) === 'community'
                      ? t('os_board:dashboard.type.community')
                      : t('os_board:dashboard.type.repo')}
                  </div>
                </div>

                {/* 指标列表 - 标签样式 */}
                <div className="line-clamp-1 h-7">
                  {(() => {
                    const metrics = getMetrics(d);
                    return metrics.length > 0 ? (
                      metrics.map((metric: any) => {
                        const metricIdent = metric.dashboard_metric_info_ident;
                        const modelIdent = metric.dashboard_model_info_ident;
                        const i18nKey = `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`;
                        const displayName =
                          (t(i18nKey, {
                            defaultValue: metricIdent,
                          }) as string) || metricIdent;
                        return (
                          <span
                            key={metric.id || metricIdent}
                            className="mr-2 inline-block h-7 max-w-[140px] truncate rounded bg-slate-100 px-2 text-xs leading-7 text-[#585858]"
                            title={displayName}
                          >
                            {displayName}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-[#585858]">-</span>
                    );
                  })()}
                </div>

                {/* 项目列表 - 标签样式 */}
                <div className="line-clamp-1 h-7">
                  {(() => {
                    const projects = getProjects(d);
                    return projects.length > 0 ? (
                      projects.slice(0, 3).map((project) => {
                        // 处理不同格式的项目 URL
                        let displayName = project;
                        if (project.startsWith('http')) {
                          // https://github.com/rails/rails -> rails/rails
                          const match = project.match(
                            /github\.com\/([^/]+\/[^/]+)/
                          );
                          displayName = match ? match[1] : project;
                        } else {
                          // 去掉 github: 前缀
                          displayName = project.replace(/^github:/, '');
                        }
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
                    );
                  })()}
                </div>

                {/* 创建时间 */}
                <div className="mt-2 flex items-center justify-between border-t pt-4 text-sm text-[#585858]">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/os-board/dashboard/${d.identifier}`);
                    }}
                  >
                    {t('os_board:home.open')}
                  </Button>
                  <time>{formatToNow(getCreatedAt(d))}</time>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页器 - 超过 9 个项目时显示 */}
        {!isLoading && !isError && totalCount > 9 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              size="sm"
              intent="text"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              上一页
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`h-8 w-8 text-sm ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border hover:bg-gray-50'
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              size="sm"
              intent="text"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              下一页
            </Button>

            <span className="ml-4 text-sm text-gray-600">
              共 {totalCount} 个看板
            </span>
          </div>
        )}
      </Center>
    </div>
  );
};

export default DashboardHome;
