import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { Popover, Table } from 'antd';
import type { TableProps } from 'antd';
import { getScoreTone } from '../presentation';
import type {
  IssueReportStage,
  IssueScoreRow,
  IssueScoreRowStageDetail,
} from '../types';
import HintIcon from './HintIcon';

type IssueScoreOverviewProps = {
  stages: IssueReportStage[];
  issueScoreRows?: IssueScoreRow[];
};

/** 解析 pain_stages（形如「I2、I3」）为阶段 id 列表，过滤「—」占位符 */
const splitPainStages = (painStages: string) =>
  painStages
    .split(/[、,，\s]+/)
    .filter((stageId) => stageId && stageId !== '—');

/**
 * 报告数据中得分可能是字符串（如无效样本的「无效」、未评估的「—」），
 * 统一转成安全数值，无法解析时返回 NaN。
 */
const parseScore = (value: number | string): number => {
  const score = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(score) ? score : NaN;
};

/** 排序比较：无效样本（NaN）固定排在末尾 */
const compareScore = (a: number, b: number) => {
  if (!Number.isFinite(a) && !Number.isFinite(b)) return 0;
  if (!Number.isFinite(a)) return 1;
  if (!Number.isFinite(b)) return -1;
  return a - b;
};

/** 文本占位符：旧版报告无该字段或数据为「—」时统一显示 */
const dash = (value?: string) => (value && value !== '—' ? value : '—');

/** 类型小标签配色（v4：缺陷/文档/需求/咨询/任务） */
const TYPE_TAG_CLASS: Record<string, string> = {
  缺陷: 'bg-rose-50 text-rose-600',
  文档: 'bg-blue-50 text-blue-600',
  需求: 'bg-purple-50 text-purple-600',
  咨询: 'bg-cyan-50 text-cyan-600',
  任务: 'bg-amber-50 text-amber-600',
};

/** 范围小标签配色（v4：内部/外部/无效） */
const SCOPE_TAG_CLASS: Record<string, string> = {
  内部: 'bg-slate-100 text-slate-600',
  外部: 'bg-emerald-50 text-emerald-600',
  无效: 'bg-slate-100 text-slate-400',
};

/**
 * 阶段单元格 hover 内容：该 Issue 在此阶段的各指标得分与评分原因，
 * 一次悬停即可看到全部指标明细，无需嵌套交互。
 */
const StageCellContent: React.FC<{
  stageLabel: string;
  stageScore: string;
  metrics: IssueScoreRowStageDetail['metrics'];
}> = ({ stageLabel, stageScore, metrics }) => (
  <div className="max-h-[70vh] w-[340px] max-w-[86vw] overflow-y-auto overscroll-contain">
    <div className="text-[12px] font-semibold text-slate-900">
      {stageLabel} · {stageScore} 分
    </div>
    <ul className="mt-2 space-y-2">
      {metrics.map((metric) => {
        const metricScore = parseScore(metric.score);
        const metricTone = Number.isFinite(metricScore)
          ? getScoreTone(metricScore)
          : null;
        const hasReason = Boolean(metric.reason) && metric.reason !== '—';
        return (
          <li key={metric.code} className="flex items-start gap-2">
            <span
              className={`mt-0.5 inline-flex shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none ${
                metricTone
                  ? metricTone.badge
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              {metric.score}
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-medium leading-4 text-slate-700">
                {metric.name_cn}
              </div>
              {hasReason ? (
                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                  {metric.reason}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

/** 分数色块：与全报告评分徽章保持一致的视觉语言 */
const ScoreBadge: React.FC<{ scoreText: string; score: number }> = ({
  scoreText,
  score,
}) => {
  const tone = Number.isFinite(score) ? getScoreTone(score) : null;
  return (
    <span
      className={`inline-flex min-w-[44px] justify-center rounded-lg border px-2 py-1 text-[12px] font-bold tabular-nums leading-none ${
        tone
          ? tone.badge
          : 'border-dashed border-slate-200 bg-slate-50 text-slate-400'
      }`}
    >
      {scoreText}
    </span>
  );
};

/**
 * 全部 Issue 总览（报告级，置于执行摘要之前）：一行一条 Issue，
 * 按表头 Issue | 类型 | 范围 | 状态 | 创建时间 | 关闭时间 | 综合分 | I0…In
 * 展示全阶段得分矩阵，不随上方阶段切换变化。
 * 表格样式与排序/分页交互对齐 Issue 贡献总览页（antd Table 同款规范）；
 * 悬停阶段分可查看该阶段各指标得分与评分原因；
 * v4 报告展示类型/范围/时间列，旧版报告（v1–v3）对应列显示「—」。
 */
const IssueScoreOverview: React.FC<IssueScoreOverviewProps> = ({
  stages,
  issueScoreRows,
}) => {
  const rows = issueScoreRows ?? [];
  const visibleStages = stages.filter((stage) => !stage.is_lens);

  const getStageDetail = (row: IssueScoreRow, stageId: string) =>
    row.stage_details.find((detail) => detail.stage_id === stageId);

  const getStageScore = (row: IssueScoreRow, stageId: string) => {
    const detail = getStageDetail(row, stageId);
    return detail ? parseScore(detail.stage_score) : NaN;
  };

  if (!rows.length || !visibleStages.length) return null;

  const columns: TableProps<IssueScoreRow>['columns'] = [
    {
      title: 'Issue',
      dataIndex: 'title',
      width: 260,
      align: 'left',
      render: (_value, row) => {
        const painStages = splitPainStages(row.pain_stages);
        return (
          <div className="min-w-0">
            <span className="flex flex-wrap items-center gap-1.5">
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <LinkOutlined className="text-[11px]" />#{row.number}
              </a>
              {painStages.length ? (
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600">
                  痛点
                </span>
              ) : null}
            </span>
            <div className="mt-1 line-clamp-2 text-left leading-5 text-slate-600">
              {row.title}
            </div>
          </div>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'issue_type',
      width: 76,
      align: 'center',
      render: (value: string | undefined) => {
        const text = dash(value);
        if (text === '—') return <span className="text-slate-400">—</span>;
        return (
          <span
            className={`inline-flex rounded px-1.5 py-0.5 text-[11px] font-semibold ${
              TYPE_TAG_CLASS[text] ?? 'bg-slate-100 text-slate-600'
            }`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: '范围',
      dataIndex: 'scope',
      width: 76,
      align: 'center',
      render: (value: string | undefined) => {
        const text = dash(value);
        if (text === '—') return <span className="text-slate-400">—</span>;
        return (
          <span
            className={`inline-flex rounded px-1.5 py-0.5 text-[11px] font-semibold ${
              SCOPE_TAG_CLASS[text] ?? 'bg-slate-100 text-slate-600'
            }`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 84,
      align: 'center',
      render: (value: string) => (
        <span
          className={`inline-flex rounded px-1.5 py-0.5 text-[11px] font-semibold ${
            value === 'closed'
              ? 'bg-slate-100 text-slate-500'
              : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          {value === 'closed' ? '已关闭' : '开启中'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 110,
      align: 'center',
      sorter: (a, b) => (a.created_at ?? '').localeCompare(b.created_at ?? ''),
      render: (value: string | undefined) => (
        <span className="tabular-nums text-slate-600">{dash(value)}</span>
      ),
    },
    {
      title: '关闭时间',
      dataIndex: 'closed_at',
      width: 110,
      align: 'center',
      sorter: (a, b) => (a.closed_at ?? '').localeCompare(b.closed_at ?? ''),
      render: (value: string | undefined) => (
        <span className="tabular-nums text-slate-600">{dash(value)}</span>
      ),
    },
    {
      title: '综合分',
      dataIndex: 'overall',
      width: 96,
      align: 'center',
      // 默认低分优先，便于快速定位体验最差的样本
      defaultSortOrder: 'ascend',
      sorter: (a, b) =>
        compareScore(parseScore(a.overall), parseScore(b.overall)),
      render: (_value, row) => {
        const overallScore = parseScore(row.overall);
        const tone = Number.isFinite(overallScore)
          ? getScoreTone(overallScore)
          : null;
        return (
          <div>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                tone
                  ? tone.badge
                  : 'border-dashed border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              {row.overall}
            </span>
          </div>
        );
      },
    },
    ...visibleStages.map((stage) => ({
      title: (
        <span className="inline-flex flex-col items-center leading-tight">
          <span className="font-bold">{stage.id}</span>
          <span className="text-[10px] font-normal text-slate-400">
            {stage.name}
          </span>
        </span>
      ),
      key: `stage-${stage.id}`,
      width: 108,
      align: 'center' as const,
      sorter: (a: IssueScoreRow, b: IssueScoreRow) =>
        compareScore(getStageScore(a, stage.id), getStageScore(b, stage.id)),
      render: (_value: string, row: IssueScoreRow) => {
        const detail = getStageDetail(row, stage.id);
        if (!detail) {
          return <ScoreBadge scoreText="—" score={Number.NaN} />;
        }
        const cell = (
          <ScoreBadge
            scoreText={detail.stage_score}
            score={parseScore(detail.stage_score)}
          />
        );
        return detail.metrics.length ? (
          <Popover
            trigger="hover"
            placement="top"
            mouseEnterDelay={0.15}
            content={
              <StageCellContent
                stageLabel={`${stage.id} · ${stage.name}`}
                stageScore={detail.stage_score}
                metrics={detail.metrics}
              />
            }
          >
            {cell}
          </Popover>
        ) : (
          cell
        );
      },
    })),
  ];

  return (
    <section
      id="issue-score-overview"
      aria-labelledby="issue-score-overview-title"
      className="mt-6 border-t border-slate-100 pt-6"
    >
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <h2
          id="issue-score-overview-title"
          className="text-xl font-semibold text-slate-900"
        >
          全部 Issue 总览
        </h2>
        <HintIcon title="一行一条 Issue：类型、范围、状态、关键时间与各阶段得分一览，不随上方阶段切换变化；点击表头可按对应列排序（默认综合分低分优先）；悬停阶段分可查看该阶段各指标得分与评分原因。" />
        <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600">
          {rows.length} 个 Issue
        </span>
      </div>

      {/* 表格视觉规范与 Issue 贡献总览页 overview-ant-table 保持一致 */}
      <style jsx global>{`
        .issue-score-table {
          margin-top: 12px;
        }
        .issue-score-table .ant-table-container {
          border: 1px solid rgba(148, 163, 184, 0.35);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.9);
        }
        .issue-score-table .ant-table {
          background: transparent;
        }
        .issue-score-table .ant-table-thead > tr > th {
          background: rgba(241, 245, 249, 0.8);
          color: #475569;
          font-size: 12px;
          font-weight: 600;
          padding: 10px 12px;
          white-space: nowrap;
          text-align: center;
        }
        .issue-score-table .ant-table-tbody > tr > td {
          padding: 10px 12px;
          font-size: 13px;
          color: #0f172a;
          text-align: center;
        }
        .issue-score-table
          .ant-table-thead
          > tr
          > th.ant-table-column-align-left,
        .issue-score-table
          .ant-table-tbody
          > tr
          > td.ant-table-column-align-left {
          text-align: left;
        }
      `}</style>

      <Table<IssueScoreRow>
        className="issue-score-table"
        columns={columns}
        dataSource={rows}
        rowKey="number"
        size="middle"
        scroll={{ x: 1220 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => `共 ${total} 条`,
        }}
        locale={{ emptyText: '暂无 Issue 得分数据' }}
      />
    </section>
  );
};

export default IssueScoreOverview;
