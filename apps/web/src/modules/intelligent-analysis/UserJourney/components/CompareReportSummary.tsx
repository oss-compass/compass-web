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
  <div>
    <div className="text-sm font-semibold text-slate-900">
      {project.data.projectInfo.name}
    </div>
    {project.data.projectInfo.version ? (
      linkVersion && project.data.reportDetailUrl ? (
        <a
          href={project.data.reportDetailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs font-medium uppercase tracking-[0.08em] text-[#1677ff] hover:underline"
        >
          {`\u7248\u672c ${project.data.projectInfo.version}`}
        </a>
      ) : (
        <div className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
          {`\u7248\u672c ${project.data.projectInfo.version}`}
        </div>
      )
    ) : null}
  </div>
);

const CompareReportSummary: React.FC<CompareReportSummaryProps> = ({
  projects,
}) => {
  const baseProject = projects[0]?.data;

  if (!baseProject) {
    return null;
  }

  const metadataColumns: ComparisonTableColumn[] = [
    {
      key: 'reportUpdatedAt',
      title: '\u66f4\u65b0\u65f6\u95f4',
    },
    ...baseProject.reportMetadata.map((item) => ({
      key: item.key,
      title: item.label,
    })),
  ];

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
      <ComparisonTableCard
        title="报告元数据"
        columns={metadataColumns}
        rows={metadataRows}
      />
      <ComparisonTableCard
        title="指标概览"
        columns={overviewColumns}
        rows={overviewRows}
      />
      <ComparePanoramaCard projects={projects} />
      <CompareRecommendationsCard projects={projects} />
    </div>
  );
};

export default CompareReportSummary;
