import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
import { AiFillClockCircle, AiOutlineIssuesClose } from 'react-icons/ai';
import { BiChat } from 'react-icons/bi';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';

interface IssueTableProps {
  dashboardId: string;
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

interface IssueRecord {
  id: string;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  closedAt: string | null;
  timeToCloseDays: number | null;
  timeToFirstAttentionWithoutBot: number | null;
  numOfCommentsWithoutBot: number;
  labels: string[];
  userLogin: string;
  assigneeLogin: string | null;
}

// 确定性哈希函数
const hashSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const STATE_OPTIONS = [
  { value: 'open', label: 'analyze:metric_detail:open' },
  { value: 'closed', label: 'analyze:metric_detail:closed' },
  { value: 'progressing', label: 'analyze:metric_detail:progressing' },
];

const LABELS = [
  'bug',
  'enhancement',
  'documentation',
  'help wanted',
  'good first issue',
  'question',
];

const USERS = [
  'zhang_wei',
  'li_ming',
  'wang_fang',
  'chen_jie',
  'liu_yang',
  'huang_lei',
  'zhou_jun',
  'wu_xia',
  'dev_john',
  'code_master',
];

// 生成 mock Issue 数据
const generateMockIssues = (
  dashboardId: string,
  project: string
): IssueRecord[] => {
  const seed = hashSeed(`${dashboardId}-${project}-issues`);
  const count = 8 + (seed % 5);
  const issues: IssueRecord[] = [];

  const baseDate = new Date('2025-01-01');

  for (let i = 0; i < count; i++) {
    const stateSeed = (seed + i * 11) % STATE_OPTIONS.length;
    const state = STATE_OPTIONS[stateSeed].value;
    const userSeed = (seed + i * 13) % USERS.length;
    const assigneeSeed = (seed + i * 17) % USERS.length;
    const labelCount = (seed + i * 7) % 3;
    const labels: string[] = [];
    for (let j = 0; j < labelCount; j++) {
      labels.push(LABELS[(seed + i * 5 + j * 3) % LABELS.length]);
    }

    const createdDaysAgo = 30 + ((seed + i * 19) % 60);
    const createdAt = new Date(baseDate);
    createdAt.setDate(createdAt.getDate() - createdDaysAgo);

    const closedAt = state === 'closed' ? new Date(createdAt) : null;
    if (closedAt) {
      closedAt.setDate(closedAt.getDate() + 3 + ((seed + i * 23) % 10));
    }

    const timeToCloseDays = closedAt
      ? Math.round(
          (closedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      : null;

    issues.push({
      id: `${project}-issue-${i}`,
      title: `Issue #${1000 + i}: ${
        [
          'Fix bug in',
          'Add feature for',
          'Update docs about',
          'Improve performance of',
        ][i % 4]
      } ${project.split('/').pop()}`,
      url: `https://${
        project.includes('gitee')
          ? 'gitee.com'
          : project.includes('gitcode')
          ? 'gitcode.com'
          : 'github.com'
      }/${project.replace(/^(github:|https?:\/\/[^/]+\/)/, '')}/issues/${
        1000 + i
      }`,
      state,
      createdAt: createdAt.toISOString(),
      closedAt: closedAt?.toISOString() || null,
      timeToCloseDays,
      timeToFirstAttentionWithoutBot:
        state !== 'open' ? 0.5 + ((seed + i * 29) % 30) / 10 : null,
      numOfCommentsWithoutBot: (seed + i * 31) % 15,
      labels,
      userLogin: USERS[userSeed],
      assigneeLogin: state !== 'open' ? USERS[assigneeSeed] : null,
    });
  }

  return issues;
};

// 生成 mock 统计数据
const generateMockStats = (dashboardId: string, project: string) => {
  const seed = hashSeed(`${dashboardId}-${project}-issue-stats`);
  const issueCount = 20 + (seed % 50);
  const closedCount = Math.floor(issueCount * (0.5 + (seed % 40) / 100));
  const unresponsiveCount = seed % 8;
  const avgComments = 2 + (seed % 30) / 10;

  return {
    issueCount,
    issueCompletionRatio: closedCount / issueCount,
    issueCompletionCount: closedCount,
    issueUnresponsiveCount: unresponsiveCount,
    issueCommentFrequencyMean: avgComments,
  };
};

// 获取项目平台类型
const getProjectPlatform = (project: string) => {
  if (project.includes('gitee')) return 'gitee';
  if (project.includes('gitcode')) return 'gitcode';
  return 'github';
};

// 获取项目显示名称
const getProjectDisplayName = (project: string) => {
  return project.replace(
    /^(github:|https?:\/\/(github|gitee|gitcode)\.com\/)/,
    ''
  );
};

const IssueTable: React.FC<IssueTableProps> = ({
  dashboardId,
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );

  const tableData = useMemo(() => {
    if (!selectedProject) return [];
    return generateMockIssues(dashboardId, selectedProject);
  }, [dashboardId, selectedProject]);

  const statsData = useMemo(() => {
    if (!selectedProject) return null;
    return generateMockStats(dashboardId, selectedProject);
  }, [dashboardId, selectedProject]);

  // 项目 Tab 配置
  const tabItems = useMemo(() => {
    const mainItems = projects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
          </div>
        ),
      };
    });

    const competitorItems = competitorProjects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
            <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
              {t('os_board:detail.competitors')}
            </span>
          </div>
        ),
      };
    });

    return [...mainItems, ...competitorItems];
  }, [projects, competitorProjects, t]);

  const columns: ColumnsType<IssueRecord> = [
    {
      title: t('analyze:metric_detail:issue_title'),
      dataIndex: 'title',
      align: 'left',
      width: 200,
      fixed: 'left',
      render: (text: string, record) => (
        <a
          href={record.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: t('analyze:metric_detail:state'),
      dataIndex: 'state',
      align: 'left',
      width: 100,
      render: (val: string) => {
        const item = STATE_OPTIONS.find((s) => s.value === val);
        return item ? t(item.label) : val;
      },
    },
    {
      title: t('analyze:metric_detail:created_time'),
      dataIndex: 'createdAt',
      align: 'left',
      width: 120,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (time: string) => format(new Date(time), 'yyyy-MM-dd'),
    },
    {
      title: t('analyze:metric_detail:close_time'),
      dataIndex: 'closedAt',
      align: 'left',
      width: 120,
      render: (time: string | null) =>
        time ? format(new Date(time), 'yyyy-MM-dd') : '-',
    },
    {
      title: t('analyze:metric_detail:processing_time'),
      dataIndex: 'timeToCloseDays',
      align: 'left',
      width: 120,
      render: (val: number | null) =>
        val !== null ? `${val} ${t('analyze:unit_day')}` : '-',
    },
    {
      title: t('analyze:metric_detail:comments_count'),
      dataIndex: 'numOfCommentsWithoutBot',
      align: 'left',
      width: 100,
      sorter: (a, b) => a.numOfCommentsWithoutBot - b.numOfCommentsWithoutBot,
    },
    {
      title: t('analyze:metric_detail:tags'),
      dataIndex: 'labels',
      align: 'left',
      width: 150,
      render: (list: string[]) => list?.join(', ') || '-',
    },
    {
      title: t('analyze:metric_detail:creator'),
      dataIndex: 'userLogin',
      align: 'left',
      width: 120,
    },
    {
      title: t('analyze:metric_detail:assignee'),
      dataIndex: 'assigneeLogin',
      align: 'left',
      width: 120,
      render: (val: string | null) => val || '-',
    },
  ];

  const toFixed = (num: number, digits: number) => {
    return Number(num.toFixed(digits));
  };

  return (
    <BaseCard
      id="issue_table"
      title={String(t('os_board:detail.issue_table'))}
      bodyClass=""
    >
      {/* 项目切换 Tabs */}
      <Tabs
        activeKey={selectedProject}
        onChange={setSelectedProject}
        items={tabItems}
        className="mb-4 [&_.ant-tabs-nav]:mb-0"
      />

      {/* Issue 统计卡片 */}
      <div className="mb-4 grid grid-cols-4 gap-4 md:grid-cols-2">
        {/* 新建 Issue 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <GoIssueOpened />
            </div>
            <div className="line-clamp-1">{statsData?.issueCount || '-'}</div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('analyze:metric_detail:newly_created_issues')}
          </div>
        </div>

        {/* Issue 解决百分比 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiOutlineIssuesClose />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueCompletionRatio
                ? `${toFixed(statsData.issueCompletionRatio * 100, 1)}% (${
                    statsData.issueCompletionCount || 0
                  })`
                : '-'}
            </div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('analyze:metric_detail:issue_completion_rate')}
          </div>
        </div>

        {/* 未响应 Issue 数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <AiFillClockCircle />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueUnresponsiveCount ?? '-'}
            </div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('analyze:metric_detail:unanswered_issue_count')}
          </div>
        </div>

        {/* 平均评论数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <BiChat />
            </div>
            <div className="line-clamp-1">
              {statsData?.issueCommentFrequencyMean
                ? toFixed(statsData.issueCommentFrequencyMean, 2)
                : '-'}
            </div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('analyze:metric_detail:average_comments_count')}
          </div>
        </div>
      </div>

      <div className="h-[580px]">
        <MyTable
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => t('analyze:total_issues', { total }),
          }}
          scroll={{ x: 'max-content', y: 480 }}
        />
      </div>
    </BaseCard>
  );
};

export default IssueTable;
