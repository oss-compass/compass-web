import React from 'react';
import Link from 'next/link';
import { Button, Modal, Table, Tag, Typography } from 'antd';
import { getIssuePriorityLabel } from '../../../IssueContribution/components/IssueOverview/IssuePriorityTag';
import type { CiCommonIssue, CiCommonIssueSnapshot } from '../../overviewApi';
import type { CiReportHref } from './CiIssueTable';
import CiOverviewFilter from './CiOverviewFilter';
import { OverviewSectionPlaceholder } from '../../../../UserJourney/OverviewDashboard/OverviewLoadingState';

type Observation = { day: string; issue: CiCommonIssue };
type IssueRepository = CiCommonIssue['repositories'][number];

const priorityColor = { P0: 'red', P1: 'orange', P2: 'blue' };

const IssueEvidence: React.FC<{ cards: IssueRepository['cards'] }> = ({
  cards,
}) => {
  const entries = cards.filter(({ step, cause }) => step || cause);
  if (!entries.length) return <>—</>;

  const content = entries.map(({ step, cause }, index) => (
    <React.Fragment key={index}>
      {index > 0 && '\n'}
      {step && <span className="font-medium">{step}</span>}
      {step && cause && '\n'}
      {cause && <span>{cause}</span>}
    </React.Fragment>
  ));

  return (
    <Typography.Paragraph
      className="!mb-0 whitespace-pre-wrap break-words !leading-6 !text-inherit"
      ellipsis={{
        rows: 3,
        tooltip: {
          title: (
            <div className="max-h-[50vh] overflow-y-auto whitespace-pre-wrap break-words">
              {content}
            </div>
          ),
          overlayStyle: { maxWidth: 'min(640px, calc(100vw - 32px))' },
        },
      }}
    >
      {content}
    </Typography.Paragraph>
  );
};

const groupCommonIssues = (snapshots: CiCommonIssueSnapshot[]) => {
  const groups = new Map<string, Observation[]>();
  for (const { day, issues } of snapshots) {
    for (const issue of issues) {
      // 导出数据在组标识末尾追加观测日，同组跨日沿用前缀。
      const suffix = `:${day}`;
      const key = issue.id.endsWith(suffix)
        ? issue.id.slice(0, -suffix.length)
        : issue.id;
      const observation = { day, issue };
      const existing = groups.get(key);
      if (existing) existing.push(observation);
      else groups.set(key, [observation]);
    }
  }

  return Array.from(groups, ([key, observations]) => {
    observations.sort((a, b) => b.day.localeCompare(a.day));
    const latest = observations[0].issue;
    const priority = observations.reduce(
      (highest, { issue }) =>
        issue.priority < highest ? issue.priority : highest,
      latest.priority
    );
    const repositories = new Set(
      observations.flatMap(({ issue }) =>
        issue.repositories.map((repo) => repo.name)
      )
    );
    return { key, observations, latest, priority, repositories };
  }).sort(
    (a, b) =>
      a.priority.localeCompare(b.priority) ||
      b.repositories.size - a.repositories.size ||
      b.latest.runs - a.latest.runs
  );
};

const CiCommonIssueProgress: React.FC<{
  snapshots: CiCommonIssueSnapshot[];
  reportHref: CiReportHref;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  legacyContent?: React.ReactNode;
}> = ({ snapshots, reportHref, loading, error, onRetry, legacyContent }) => {
  const groups = React.useMemo(() => groupCommonIssues(snapshots), [snapshots]);
  const [detail, setDetail] = React.useState<{
    groupKey: string;
    day: string;
  }>();
  const detailGroup = groups.find((group) => group.key === detail?.groupKey);
  const observation =
    detailGroup?.observations.find(({ day }) => day === detail?.day) ??
    detailGroup?.observations[0];
  const issue = observation?.issue;
  const title = detailGroup?.latest.name;
  const extraSegments = issue?.segments.filter(
    (segment) => !title?.includes(segment)
  );
  const cause = issue?.cause?.trim();
  const summary =
    cause &&
    !issue?.repositories.some((repo) =>
      repo.cards.some((card) => card.cause?.trim() === cause)
    )
      ? cause
      : null;
  const repositories = new Set(
    groups.flatMap((group) => Array.from(group.repositories))
  );

  return (
    <section
      className="absolute inset-0 flex flex-col overflow-y-auto"
      aria-label="共性问题总览"
    >
      {loading ? (
        <OverviewSectionPlaceholder embedded label="共性问题加载中" />
      ) : error ? (
        <p role="alert" className="py-4 text-sm text-slate-500">
          共性问题加载失败
          <Button type="link" onClick={onRetry}>
            重试
          </Button>
        </p>
      ) : groups.length > 0 ? (
        <>
          <p className="mb-3 flex shrink-0 flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--overview-slate)]">
            <span>
              <strong className="text-[var(--overview-text)]">
                {groups.length}
              </strong>{' '}
              组共性问题
            </span>
            <span>涉及 {repositories.size} 个仓库</span>
          </p>
          <ul className="m-0 grid shrink-0 grow list-none grid-cols-1 gap-2 p-0">
            {groups.map(
              ({ key, latest, priority, repositories, observations }) => (
                <li
                  key={key}
                  className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,20rem)] content-center items-center gap-x-5 gap-y-1.5 rounded-lg border border-slate-200 bg-slate-50/40 px-4 py-2.5 md:px-3 lg:grid-cols-1"
                >
                  <div className="flex min-w-0 items-start gap-2">
                    <Tag
                      className="!mr-0 shrink-0"
                      color={priorityColor[priority]}
                    >
                      {getIssuePriorityLabel(priority)}
                    </Tag>
                    <div className="min-w-0">
                      <button
                        type="button"
                        className="block max-w-full break-words rounded-lg text-left text-sm font-semibold leading-6 text-[var(--overview-blue)] hover:underline focus-visible:outline-blue-600"
                        onClick={() =>
                          setDetail({ groupKey: key, day: observations[0].day })
                        }
                      >
                        {latest.name}
                      </button>
                      {latest.responsibility && (
                        <p className="mt-0.5 break-words text-xs leading-5 text-[var(--overview-slate)]">
                          责任归类 · {latest.responsibility}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="flex min-w-0 flex-wrap justify-end gap-x-3 gap-y-1 break-words text-xs leading-5 text-[var(--overview-slate)] lg:justify-start">
                    <span>涉及 {repositories.size} 仓</span>
                    <span>出现 {observations.length} 天</span>
                  </p>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        legacyContent ?? (
          <p className="py-4 text-sm text-slate-500">暂无共性问题</p>
        )
      )}

      <Modal
        open={Boolean(issue)}
        title={
          <span className="block break-words pr-8 text-lg font-semibold leading-7 text-[var(--overview-text)]">
            {title}
          </span>
        }
        footer={null}
        centered
        width="min(1000px, calc(100vw - 24px))"
        styles={{ content: { borderRadius: 20 } }}
        onCancel={() => setDetail(undefined)}
      >
        {observation && issue && detailGroup && (
          <div className="pt-2 text-sm text-slate-700">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Tag className="!mr-0" color={priorityColor[issue.priority]}>
                  {issue.priority}
                </Tag>
                {issue.responsibility && (
                  <span className="text-[var(--overview-slate)]">
                    责任归类{' '}
                    <span className="ml-1 text-[var(--overview-text)]">
                      {issue.responsibility}
                    </span>
                  </span>
                )}
                {extraSegments?.join('、')}
              </div>
              {detailGroup.observations.length > 1 ? (
                <CiOverviewFilter
                  label="观测日期"
                  aria-label="观测日期"
                  className="w-36"
                  value={observation.day}
                  options={detailGroup.observations.map(({ day }) => ({
                    value: day,
                    label: day,
                  }))}
                  onChange={(day) =>
                    setDetail({ groupKey: detailGroup.key, day })
                  }
                />
              ) : (
                <span className="text-[var(--overview-slate)]">
                  观测日期 {observation.day}
                </span>
              )}
            </div>

            <div className="max-h-[min(68vh,42rem)] overflow-y-auto">
              {summary && (
                <p className="mb-3 break-words leading-6">{summary}</p>
              )}
              <Table<IssueRepository>
                className="overview-ant-table"
                rowKey="name"
                size="small"
                tableLayout="fixed"
                dataSource={issue.repositories}
                pagination={false}
                scroll={{ x: 720 }}
                locale={{ emptyText: '暂无仓库明细' }}
                columns={[
                  {
                    title: '仓库',
                    dataIndex: 'name',
                    width: 132,
                    align: 'left',
                    render: (name: string) => (
                      <span className="break-words font-medium">{name}</span>
                    ),
                  },
                  {
                    title: '执行次数',
                    dataIndex: 'runs',
                    width: 80,
                    align: 'right',
                  },
                  {
                    title: 'PR 数',
                    dataIndex: 'prs',
                    width: 64,
                    align: 'right',
                  },
                  {
                    title: '步骤及原因',
                    key: 'evidence',
                    align: 'left',
                    render: (_value, repo) => (
                      <IssueEvidence cards={repo.cards} />
                    ),
                  },
                  {
                    title: '报告',
                    key: 'report',
                    width: 88,
                    render: (_value, repo) =>
                      repo.reportRepo ? (
                        <Link
                          href={reportHref(repo.reportRepo, observation.day)}
                          className="overview-table-link"
                        >
                          查看报告
                        </Link>
                      ) : (
                        '—'
                      ),
                  },
                ]}
                summary={() => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} align="left">
                      观测汇总 · {issue.repositories.length} 仓
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      {issue.runs}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">
                      {issue.prs}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} colSpan={2} />
                  </Table.Summary.Row>
                )}
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CiCommonIssueProgress;
