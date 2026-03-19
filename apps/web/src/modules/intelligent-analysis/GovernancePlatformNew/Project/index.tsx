import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRightOutlined,
  BankOutlined,
  LinkOutlined,
  LeftOutlined,
  MailOutlined,
  RightOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  List,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  TabsProps,
  Tag,
} from 'antd';
import PanoramaChart from '../../GovernancePlatform/Overview/Project/PanoramaChart';
import DeveloperRegionChart from '../../GovernancePlatform/Overview/Project/DeveloperRegionChart';
import RepoTable from '../../GovernancePlatform/Overview/Project/RepoTable';
import DetailPage from '../../GovernancePlatform/Overview/Project/DetailPage';
import OrganizationTable from '../../GovernancePlatform/Overview/Project/OrganizationTable';
import DeveloperTable from '../../GovernancePlatform/Overview/Project/DeveloperTable';
import {
  getProjectDisplayName,
  PROJECT_NAME_MAP,
} from '../../GovernancePlatform/Overview/utils';
import { PROJECTS_CONFIG } from '../../config/projects';
import { classifyOrganization } from '../../GovernancePlatform/Overview/Project/utils/orgClassifier';
import { getDisplayUserId } from '../../GovernancePlatform/Overview/Project/utils/getDisplayUserId';

interface MainProps {
  projectType: string;
}

interface DeveloperBoardRow {
  用户ID: string;
  所属组织?: string;
  邮箱?: string;
  总得分?: number;
  国家?: string;
  省?: string;
  市?: string;
  技术栈?: string | string[];
  排名?: number;
}

interface OrganizationBoardRow {
  用户ID: string;
  中文用户ID?: string;
  总得分?: number;
  国家?: string;
  技术栈?: string | string[];
  排名?: number;
}

interface BoardQueryResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface BoardTableModalState {
  title: string;
  type: 'organization' | 'developer';
  regions: string[];
  orgTypes?: string[];
  developerRole?: 'all' | 'individual' | 'org';
}

const compactMetaTagClassName =
  'max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap align-middle';
const compactTechTagClassName =
  'max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap align-middle';
const BOARD_PAGE_SIZE = 6;

const getProjectFamily = (projectType: string) => {
  const family = projectType.split('_')[0];
  return PROJECTS_CONFIG.filter((project) => project.slug.startsWith(family));
};

const getTabLabel = (rootSlug: string, targetSlug: string) => {
  if (targetSlug === rootSlug) {
    return '全部';
  }

  const displayName = getProjectDisplayName(targetSlug);
  const family = rootSlug.split('_')[0];

  return displayName
    .replace(new RegExp(`^${family}[\\s_-]*`, 'i'), '')
    .replace(/生态/gi, '')
    .replace(/^-+/, '')
    .trim();
};

const getTechStackName = (projectType: string) => {
  const displayName = getProjectDisplayName(projectType);
  const family = projectType.split('_')[0];

  if (projectType === family) {
    return family;
  }

  return (
    displayName
      .replace(/生态/gi, '')
      .replace(new RegExp(`^${family}[\\s_-]*`, 'i'), '')
      .trim() || family
  );
};

const compactChartStyles = `
  .governance-region-compact .ant-card-body {
    padding: 16px;
  }
  .governance-region-compact .flex.h-\\[484px\\] {
    height: 320px;
  }
  .governance-board-list .ant-list-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .governance-board-list .ant-list-item {
    padding: 0;
    border-block-end: none;
  }
`;

const normalizeUserId = (value: unknown) => {
  const raw = typeof value === 'string' ? value.trim() : '';
  return raw.replace(/^(github|gitcode|gitee|atomgit):/i, '');
};

const getPlatformFromUserId = (value: unknown) => {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (raw.startsWith('gitee:')) return 'gitee';
  if (raw.startsWith('gitcode:')) return 'atomgit';
  if (raw.startsWith('atomgit:')) return 'atomgit';
  return 'github';
};

const getUserHomepageUrl = (value: unknown) => {
  const raw = typeof value === 'string' ? value.trim() : '';
  const lower = raw.toLowerCase();
  if (lower.startsWith('github:')) {
    const username = raw.slice('github:'.length).trim();
    return username ? `https://github.com/${username}` : '';
  }
  if (lower.startsWith('gitcode:')) {
    const username = raw.slice('gitcode:'.length).trim();
    return username ? `https://gitcode.com/${username}` : '';
  }
  if (lower.startsWith('atomgit:')) {
    const username = raw.slice('atomgit:'.length).trim();
    return username ? `https://atomgit.com/${username}` : '';
  }
  if (lower.startsWith('gitee:')) {
    const username = raw.slice('gitee:'.length).trim();
    return username ? `https://gitee.com/${username}` : '';
  }
  return '';
};

const getAffiliatedOrg = (org: unknown) => {
  const text = typeof org === 'string' ? org.trim() : '';
  return text && text !== '未知' ? text : '';
};

const getCountryText = (value: unknown) => {
  const country = typeof value === 'string' ? value.trim() : '';
  return country || '-';
};

const getScore = (value: unknown) => {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getTechStacks = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    const text = value.trim();
    return text ? [text] : [];
  }

  return [];
};

const getRegionOptions = (regions: unknown) => {
  const normalized = Array.isArray(regions)
    ? regions
        .map((region) => (typeof region === 'string' ? region.trim() : ''))
        .filter(Boolean)
    : [];

  return Array.from(new Set(['中国', ...normalized])).map((region) => ({
    label: region,
    value: region,
  }));
};

const CompactTechStackRow: React.FC<{
  techStacks: string[];
}> = ({ techStacks }) => {
  const visibleTechStacks = techStacks.slice(0, 6);
  const hiddenCount = techStacks.length - visibleTechStacks.length;

  return (
    <div className="mt-2 flex h-7 items-center gap-2 overflow-hidden">
      {visibleTechStacks.length > 0 ? (
        visibleTechStacks.map((techStack) => (
          <Tag key={techStack} color="blue" className={compactTechTagClassName}>
            {techStack}
          </Tag>
        ))
      ) : (
        <Tag className={compactTechTagClassName}>暂无技术栈</Tag>
      )}
      {hiddenCount > 0 ? <Tag>+{hiddenCount}</Tag> : null}
    </div>
  );
};

const DeveloperContactTag: React.FC<{
  contact: string;
  contactType: 'email' | 'website' | 'empty';
}> = ({ contact, contactType }) => {
  if (contactType === 'empty') {
    return null;
  }

  const isWebsite = contactType === 'website';
  const icon = isWebsite ? <LinkOutlined /> : <MailOutlined />;

  return (
    <span className="inline-flex min-w-0 items-center gap-1 text-xs text-gray-500">
      <span className="flex-shrink-0">{icon}</span>
      <a
        href={isWebsite ? contact : `mailto:${contact}`}
        target={isWebsite ? '_blank' : undefined}
        rel={isWebsite ? 'noopener noreferrer' : undefined}
        className="inline-block max-w-[240px] truncate align-middle text-gray-500 hover:text-blue-600 hover:underline"
      >
        {contact}
      </a>
    </span>
  );
};

const toOrganizationDetailRecord = (organization: OrganizationBoardRow) => ({
  用户ID: organization.用户ID,
  中文用户ID: organization.中文用户ID,
  所属组织: '',
  邮箱: '',
  总得分: getScore(organization.总得分),
  国家: getCountryText(organization.国家),
  省: '',
  市: '',
  用户类型: '组织',
  组织类型: classifyOrganization(getDisplayUserId(organization)),
  技术栈: organization.技术栈,
  排名: typeof organization.排名 === 'number' ? organization.排名 : 0,
});

const toDeveloperDetailRecord = (developer: DeveloperBoardRow) => ({
  用户ID: developer.用户ID,
  中文用户ID: '',
  所属组织: getAffiliatedOrg(developer.所属组织),
  邮箱: developer.邮箱 || '',
  总得分: getScore(developer.总得分),
  国家: getCountryText(developer.国家),
  省: typeof developer.省 === 'string' ? developer.省 : '',
  市: typeof developer.市 === 'string' ? developer.市 : '',
  用户类型: '开发者',
  技术栈: developer.技术栈,
  排名: typeof developer.排名 === 'number' ? developer.排名 : 0,
});

const BoardPagination: React.FC<{
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
}> = ({ page, total, pageSize, loading, onPrev, onNext }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
      <Space size={12}>
        <Button
          size="small"
          shape="circle"
          icon={<LeftOutlined />}
          aria-label="上一页"
          onClick={onPrev}
          disabled={page <= 1 || loading}
        />
        <Button
          size="small"
          shape="circle"
          icon={<RightOutlined />}
          aria-label="下一页"
          onClick={onNext}
          disabled={page >= totalPages || loading || total === 0}
        />
      </Space>
    </div>
  );
};

const OrganizationListCard: React.FC<{
  title: string;
  orgType: '高校及研究机构' | '商业公司';
  color: 'blue' | 'green';
  projectType: string;
  countryFilter: string;
  onMore: (payload: {
    orgType: '高校及研究机构' | '商业公司';
    country: string;
    title: string;
  }) => void;
  onScoreClick: (record: any) => void;
}> = ({
  title,
  orgType,
  color,
  projectType,
  countryFilter,
  onMore,
  onScoreClick,
}) => {
  const dataset = PROJECT_NAME_MAP[projectType] || projectType;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [countryFilter, orgType, projectType]);

  const { data, isFetching } = useQuery({
    queryKey: [
      'intelligent-analysis',
      'organizations',
      'board',
      dataset,
      orgType,
      countryFilter,
      page,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('pageSize', String(BOARD_PAGE_SIZE));
      params.set('sort', 'score_desc');
      params.set('orgTypes', orgType);
      params.set('regions', countryFilter);

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/organizations?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch organizations: ${response.status}`);
      }
      const json = await response.json();
      return {
        items: Array.isArray(json?.items)
          ? (json.items as OrganizationBoardRow[])
          : [],
        total: Number(json?.total) || 0,
        page: Number(json?.page) || page,
        pageSize: Number(json?.pageSize) || BOARD_PAGE_SIZE,
      } as BoardQueryResult<OrganizationBoardRow>;
    },
    staleTime: 1000 * 60 * 5,
  });

  const rows = data?.items || [];
  const total = data?.total || 0;
  const pageSize = data?.pageSize || BOARD_PAGE_SIZE;

  return (
    <Card
      title={title}
      loading={isFetching}
      className="h-full w-full"
      extra={
        <Button
          type="link"
          onClick={() => onMore({ orgType, country: countryFilter, title })}
        >
          查看更多 <ArrowRightOutlined />
        </Button>
      }
    >
      <>
        <List
          split={false}
          className="governance-board-list"
          dataSource={rows}
          locale={{ emptyText: '暂无数据' }}
          renderItem={(organization, index) => {
            const displayName = getDisplayUserId(organization as any);
            const score = getScore(organization.总得分);
            const country = getCountryText(organization.国家);
            const techStacks = getTechStacks(organization.技术栈);
            const category = classifyOrganization(displayName);
            const detailRecord = toOrganizationDetailRecord(organization);

            return (
              <List.Item>
                <div className="h-[102px] w-full overflow-hidden rounded-xl border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#fafcff_100%)] px-4 py-3 shadow-sm">
                  <div className="flex h-full items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                        {typeof organization.排名 === 'number'
                          ? organization.排名
                          : index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                          <div className="max-w-[220px] truncate text-base font-semibold text-gray-900">
                            {displayName}
                          </div>
                          <Tag className={compactMetaTagClassName}>
                            {country}
                          </Tag>
                          <Tag
                            color={color}
                            className={compactMetaTagClassName}
                          >
                            {category}
                          </Tag>
                        </div>

                        <CompactTechStackRow techStacks={techStacks} />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex-shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-right transition-colors hover:bg-blue-100"
                      onClick={() => onScoreClick(detailRecord)}
                    >
                      <div className="text-xs text-blue-500">得分</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {score.toFixed(2)}
                      </div>
                    </button>
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
        <BoardPagination
          page={page}
          total={total}
          pageSize={pageSize}
          loading={isFetching}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
        />
      </>
    </Card>
  );
};

const DeveloperListCard: React.FC<{
  title: string;
  role: 'org' | 'individual';
  projectType: string;
  countryFilter: string;
  onMore: (payload: {
    role: 'org' | 'individual';
    country: string;
    title: string;
  }) => void;
  onScoreClick: (record: any) => void;
}> = ({ title, role, projectType, countryFilter, onMore, onScoreClick }) => {
  const dataset = PROJECT_NAME_MAP[projectType] || projectType;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [countryFilter, projectType, role]);

  const { data, isFetching } = useQuery({
    queryKey: [
      'intelligent-analysis',
      'developers',
      'board',
      dataset,
      role,
      countryFilter,
      page,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('pageSize', String(BOARD_PAGE_SIZE));
      params.set('sort', 'score_desc');
      params.set('role', role);
      params.set('regions', countryFilter);

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/developers?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch developers: ${response.status}`);
      }
      const json = await response.json();
      return {
        items: Array.isArray(json?.items)
          ? (json.items as DeveloperBoardRow[])
          : [],
        total: Number(json?.total) || 0,
        page: Number(json?.page) || page,
        pageSize: Number(json?.pageSize) || BOARD_PAGE_SIZE,
      } as BoardQueryResult<DeveloperBoardRow>;
    },
    staleTime: 1000 * 60 * 5,
  });

  const rows = data?.items || [];
  const total = data?.total || 0;
  const pageSize = data?.pageSize || BOARD_PAGE_SIZE;

  return (
    <Card
      title={title}
      loading={isFetching}
      className="h-full w-full"
      extra={
        <Button
          type="link"
          onClick={() => onMore({ role, country: countryFilter, title })}
        >
          查看更多 <ArrowRightOutlined />
        </Button>
      }
    >
      <>
        <List
          split={false}
          className="governance-board-list"
          dataSource={rows}
          locale={{ emptyText: '暂无数据' }}
          renderItem={(developer, index) => {
            const normalizedUserId = normalizeUserId(developer.用户ID);
            const platform = getPlatformFromUserId(developer.用户ID);
            const country = getCountryText(developer.国家);
            const organization = getAffiliatedOrg(developer.所属组织);
            const score = getScore(developer.总得分);
            const techStacks = getTechStacks(developer.技术栈);
            const detailRecord = toDeveloperDetailRecord(developer);
            const rawContact =
              typeof developer.邮箱 === 'string' ? developer.邮箱.trim() : '';
            const homepageUrl = getUserHomepageUrl(developer.用户ID);
            const contactType =
              rawContact && rawContact !== '未知'
                ? 'email'
                : homepageUrl
                ? 'website'
                : 'empty';
            const contactText =
              contactType === 'email'
                ? rawContact
                : contactType === 'website'
                ? homepageUrl
                : '';

            return (
              <List.Item>
                <div className="h-[102px] w-full overflow-hidden rounded-xl border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#fafcff_100%)] px-4 py-3 shadow-sm">
                  <div className="flex h-full items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                        {typeof developer.排名 === 'number'
                          ? developer.排名
                          : index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                          <a
                            href={`/developer/${platform}/${encodeURIComponent(
                              normalizedUserId
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[220px] truncate text-base font-semibold text-blue-600 hover:underline"
                          >
                            {normalizedUserId}
                          </a>
                          <Tag className={compactMetaTagClassName}>
                            {country}
                          </Tag>
                          {organization ? (
                            <Tag className={compactMetaTagClassName}>
                              {organization}
                            </Tag>
                          ) : null}
                          <DeveloperContactTag
                            contact={contactText}
                            contactType={contactType}
                          />
                        </div>

                        <CompactTechStackRow techStacks={techStacks} />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex-shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-right transition-colors hover:bg-blue-100"
                      onClick={() => onScoreClick(detailRecord)}
                    >
                      <div className="text-xs text-blue-500">得分</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {score.toFixed(2)}
                      </div>
                    </button>
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
        <BoardPagination
          page={page}
          total={total}
          pageSize={pageSize}
          loading={isFetching}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
        />
      </>
    </Card>
  );
};

const GovernanceTabPanel: React.FC<{
  projectType: string;
}> = ({ projectType }) => {
  const dataset = PROJECT_NAME_MAP[projectType] || projectType;
  const techStackName = getTechStackName(projectType);
  const [organizationCountry, setOrganizationCountry] = useState('中国');
  const [developerCountry, setDeveloperCountry] = useState('中国');
  const [tableModal, setTableModal] = useState<BoardTableModalState | null>(
    null
  );
  const [selectedDetailUser, setSelectedDetailUser] = useState<any | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { data: organizationRegions } = useQuery({
    queryKey: ['intelligent-analysis', 'organizations', 'regions', dataset],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('pageSize', '1');

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/organizations?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch organization regions: ${response.status}`
        );
      }
      const json = await response.json();
      return getRegionOptions(json?.availableRegions);
    },
    staleTime: 1000 * 60 * 5,
  });
  const { data: developerRegions } = useQuery({
    queryKey: ['intelligent-analysis', 'developers', 'regions', dataset],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('pageSize', '1');

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/developers?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch developer regions: ${response.status}`
        );
      }
      const json = await response.json();
      return getRegionOptions(json?.availableRegions);
    },
    staleTime: 1000 * 60 * 5,
  });
  const organizationRegionOptions = organizationRegions || getRegionOptions([]);
  const developerRegionOptions = developerRegions || getRegionOptions([]);

  const handleViewDetail = (record: any) => {
    setSelectedDetailUser(record);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetailUser(null);
  };

  const handleOpenOrganizationTable = ({
    orgType,
    country,
    title,
  }: {
    orgType: '高校及研究机构' | '商业公司';
    country: string;
    title: string;
  }) => {
    setTableModal({
      title: `${techStackName} - ${title}`,
      type: 'organization',
      regions: country ? [country] : [],
      orgTypes: [orgType],
    });
  };

  const handleOpenDeveloperTable = ({
    role,
    country,
    title,
  }: {
    role: 'org' | 'individual';
    country: string;
    title: string;
  }) => {
    setTableModal({
      title: `${techStackName} - ${title}`,
      type: 'developer',
      regions: country ? [country] : [],
      developerRole: role,
    });
  };

  const handleCloseTableModal = () => {
    setTableModal(null);
  };

  const handleTableRegionChange = (regions: string[]) => {
    setTableModal((current) => (current ? { ...current, regions } : current));
  };

  return (
    <>
      <div className="mb-4 mt-2 text-xl font-semibold text-gray-900">
        {techStackName} - 组织、开发者国家/地区分布
      </div>
      <div className="governance-region-compact mb-6">
        <DeveloperRegionChart
          projectType={projectType}
          showTitle={false}
          loading={false}
          selectedRegions={[]}
        />
      </div>

      <div className="mb-4 mt-2 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <BankOutlined />
          <span>{techStackName} - 重点发展组织</span>
        </div>
        <Space size={8}>
          <span className="text-sm text-gray-500">国家筛选</span>
          <Select
            value={organizationCountry}
            options={organizationRegionOptions}
            onChange={setOrganizationCountry}
            className="min-w-[160px]"
          />
        </Space>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} xl={12} className="flex">
          <OrganizationListCard
            title="高校 / 科研机构"
            orgType="高校及研究机构"
            color="blue"
            projectType={projectType}
            countryFilter={organizationCountry}
            onMore={handleOpenOrganizationTable}
            onScoreClick={handleViewDetail}
          />
        </Col>

        <Col xs={24} xl={12} className="flex">
          <OrganizationListCard
            title="企业"
            orgType="商业公司"
            color="green"
            projectType={projectType}
            countryFilter={organizationCountry}
            onMore={handleOpenOrganizationTable}
            onScoreClick={handleViewDetail}
          />
        </Col>
      </Row>

      <div className="mb-4 mt-2 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <TeamOutlined />
          <span>{techStackName} - 潜在开发者</span>
        </div>
        <Space size={8}>
          <span className="text-sm text-gray-500">国家筛选</span>
          <Select
            value={developerCountry}
            options={developerRegionOptions}
            onChange={setDeveloperCountry}
            className="min-w-[160px]"
          />
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12} className="flex">
          <DeveloperListCard
            title="组织开发者"
            role="org"
            projectType={projectType}
            countryFilter={developerCountry}
            onMore={handleOpenDeveloperTable}
            onScoreClick={handleViewDetail}
          />
        </Col>

        <Col xs={24} xl={12} className="flex">
          <DeveloperListCard
            title="个人开发者"
            role="individual"
            projectType={projectType}
            countryFilter={developerCountry}
            onMore={handleOpenDeveloperTable}
            onScoreClick={handleViewDetail}
          />
        </Col>
      </Row>
      <div className="mb-6 mt-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <span>{techStackName} - 仓库贡献排名</span>
      </div>
      <RepoTable projectType={projectType} shwoTitle={false} />

      <Modal
        title={tableModal?.title}
        open={!!tableModal}
        onCancel={handleCloseTableModal}
        width="92%"
        style={{ top: 20 }}
        footer={null}
        destroyOnClose
        bodyStyle={{
          maxHeight: 'calc(100vh - 140px)',
          overflow: 'auto',
          padding: 24,
        }}
      >
        {tableModal?.type === 'organization' ? (
          <OrganizationTable
            projectType={projectType}
            data={[]}
            loading={false}
            onViewDetail={handleViewDetail}
            selectedRegions={tableModal.regions}
            onRegionFilterChange={handleTableRegionChange}
            initialOrgTypes={tableModal.orgTypes}
            showTitle={false}
          />
        ) : null}
        {tableModal?.type === 'developer' ? (
          <DeveloperTable
            projectType={projectType}
            data={[]}
            loading={false}
            onViewDetail={handleViewDetail}
            selectedRegions={tableModal.regions}
            onRegionFilterChange={handleTableRegionChange}
            initialDevRole={tableModal.developerRole}
            showTitle={false}
          />
        ) : null}
      </Modal>

      <Modal
        title={
          selectedDetailUser
            ? `${getDisplayUserId(selectedDetailUser)} 详情`
            : '详情'
        }
        open={showDetailModal}
        onCancel={handleCloseDetail}
        width="90%"
        style={{ top: 20 }}
        footer={null}
        destroyOnClose
        bodyStyle={{
          padding: 0,
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'auto',
        }}
      >
        {selectedDetailUser ? (
          <DetailPage
            data={selectedDetailUser}
            onBack={handleCloseDetail}
            projectType={projectType}
            isModal={true}
          />
        ) : null}
      </Modal>
    </>
  );
};

const GovernancePlatformNewProject: React.FC<MainProps> = ({ projectType }) => {
  const router = useRouter();
  const familyProjects = useMemo(
    () => getProjectFamily(projectType),
    [projectType]
  );
  const familyPrefix = projectType.split('_')[0];
  const familyRootProject =
    familyProjects.find((project) => project.slug === familyPrefix)?.slug ||
    familyProjects[0]?.slug ||
    projectType;
  const selectedProjectType =
    familyProjects.find((project) => project.slug === projectType)?.slug ||
    familyRootProject;
  const selectedProjectName = getProjectDisplayName(selectedProjectType);

  const tabs: TabsProps['items'] = [
    {
      key: familyRootProject,
      label: '全部',
      children: <GovernanceTabPanel projectType={familyRootProject} />,
    },
    ...familyProjects.map((project) => ({
      key: project.slug,
      label: getTabLabel(familyRootProject, project.slug),
      children: <GovernanceTabPanel projectType={project.slug} />,
    })),
  ].filter(
    (item, index, array) =>
      array.findIndex((x) => x?.key === item?.key) === index
  );

  return (
    <div className="mx-auto w-[90vw] px-4 py-8 sm:px-6 lg:px-8">
      <style>{compactChartStyles}</style>

      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedProjectName}
        </h1>
        {/* <Button
          onClick={() =>
            router.push(
              `/intelligent-analysis/governance-platform/${selectedProjectType}`
            )
          }
        >
          查看明细
        </Button> */}
      </div>

      <div className="mb-6">
        <PanoramaChart
          activeSlug={selectedProjectType}
          loading={false}
          routeBasePath="/intelligent-analysis/governance-platform-new"
          rootSlug={familyRootProject}
        />
      </div>

      <div className="mb-6">
        <Tabs
          activeKey={selectedProjectType}
          items={tabs}
          destroyInactiveTabPane
          onChange={(key) =>
            router.push(`/intelligent-analysis/governance-platform-new/${key}`)
          }
        />
      </div>
    </div>
  );
};

export default GovernancePlatformNewProject;
