import React from 'react';
import ComparePanoramaCard from './ComparePanoramaCard';
import CompareRecommendationsCard from './CompareRecommendationsCard';
import ComparisonTableCard, {
  ComparisonTableColumn,
  ComparisonTableRow,
} from './ComparisonTableCard';
import {
  OverviewMetric,
  ReportMetadataItem,
  UserJourneyProjectView,
} from '../types';

type CompareReportSummaryProps = {
  projects: UserJourneyProjectView[];
};

const getOverviewMetricLabel = (metric: OverviewMetric) =>
  `${metric.value}${metric.suffix ?? ''}`;

const getMetadataItem = (items: ReportMetadataItem[], key: string) =>
  items.find((item) => item.key === key);

const renderProjectName = (
  project: UserJourneyProjectView,
  linkVersion = false
) => (
  <div className="flex flex-col gap-1">
    <div className="text-sm font-semibold text-slate-900">
      {project.data.projectInfo.name}
    </div>
    {project.data.projectInfo.version ? (
      linkVersion && project.data.reportDetailUrl ? (
        <a
          href={project.data.reportDetailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-medium uppercase tracking-[0.08em] text-[#1677ff] hover:underline"
        >
          {project.data.projectInfo.version}
        </a>
      ) : (
        <div className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
          {project.data.projectInfo.version}
        </div>
      )
    ) : null}
    <div className="text-[11px] leading-5 text-slate-400">
      更新于：{project.data.reportUpdatedAt}
    </div>
  </div>
);

const CompareReportSummary: React.FC<CompareReportSummaryProps> = ({
  projects,
}) => {
  const baseProject = projects[0]?.data;

  if (!baseProject) {
    return null;
  }

  const metadataColumns: ComparisonTableColumn[] =
    baseProject.reportMetadata.map((item) => ({
      key: item.key,
      title: item.label,
    }));

  const metadataRows: ComparisonTableRow[] = projects.map((project) => ({
    key: `${project.queryKey}-metadata`,
    projectName: renderProjectName(project, true),
    cells: metadataColumns.reduce<ComparisonTableRow['cells']>(
      (cells, column) => {
        if (column.key === 'reportUpdatedAt') {
          cells[column.key] = {
            content: project.data.reportUpdatedAt,
          };

          return cells;
        }

        const item = getMetadataItem(project.data.reportMetadata, column.key);
        cells[column.key] = {
          content: item?.value ?? '-',
          className: item?.tone === 'mono' ? 'font-mono' : undefined,
        };

        return cells;
      },
      {}
    ),
  }));

  const overviewColumns: ComparisonTableColumn[] =
    baseProject.overviewMetrics.map((metric) => ({
      key: metric.key,
      title: metric.title,
    }));

  const overviewRows: ComparisonTableRow[] = projects.map((project) => ({
    key: `${project.queryKey}-overview`,
    projectName: renderProjectName(project),
    cells: overviewColumns.reduce<ComparisonTableRow['cells']>(
      (cells, column) => {
        const metric = project.data.overviewMetrics.find(
          (item) => item.key === column.key
        );

        cells[column.key] = {
          content: metric ? getOverviewMetricLabel(metric) : '-',
          className: 'font-semibold text-slate-900',
        };

        return cells;
      },
      {}
    ),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className=">lg:flex-row flex flex-col gap-4">
        <div className=">lg:min-w-0 >lg:flex-1 >lg:basis-0">
          <ComparisonTableCard
            title="报告元数据"
            columns={metadataColumns}
            rows={metadataRows}
          />
        </div>
        <div className=">lg:min-w-0 >lg:flex-1 >lg:basis-0">
          <ComparisonTableCard
            title="指标概览"
            columns={overviewColumns}
            rows={overviewRows}
          />
        </div>
      </div>
      <ComparePanoramaCard projects={projects} />
      <CompareRecommendationsCard projects={projects} />
    </div>
  );
};

export default CompareReportSummary;
