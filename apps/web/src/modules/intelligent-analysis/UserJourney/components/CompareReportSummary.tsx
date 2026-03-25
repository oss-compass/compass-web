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
      title: '更新时间',
    },
    ...baseProject.reportMetadata.map((item) => ({
      key: item.key,
      title: item.label,
    })),
  ];

  const metadataRows: ComparisonTableRow[] = projects.map((project) => ({
    key: `${project.queryKey}-metadata`,
    projectName: project.data.projectInfo.name,
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
    projectName: project.data.projectInfo.name,
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
