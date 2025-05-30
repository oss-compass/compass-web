import react, { useState } from 'react'; // 引入 useState
import { BiGitPullRequest, BiGitCommit } from 'react-icons/bi';
import { GoIssueOpened } from 'react-icons/go';
import useContributorInfo from '@modules/developer/hooks/useContributorInfo';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';
import { Select, Tooltip } from 'antd'; // 假设使用 Ant Design 的 Select 组件，请根据实际情况调整引入
import { GoQuestion } from 'react-icons/go';
import TooltipInfo from '@modules/developer/components/TooltipInfo';

// 定义接口返回数据类型
interface ContributionRankData {
  push_contribution: number;
  pull_request_contribution: number;
  issue_contribution: number;
  push_contribution_rank: string;
  pull_request_contribution_rank: string;
  issue_contribution_rank: string;
}

// 提取独立的卡片组件
interface ContributionCardProps {
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  title: string;
  value: number | string;
  rank: string;
  country: string;
  isLoading: boolean;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
  icon,
  bgColor,
  textColor,
  title,
  value,
  rank,
  country,
  isLoading,
}) => (
  <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 drop-shadow-sm">
    <div className="flex">
      <div
        className={`mr-4 flex h-12 w-12 items-center justify-center rounded-lg ${bgColor} ${textColor} text-[28px]`}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="text-xs text-gray-500">{title}</div>
        <div className="line-clamp-1 text-2xl">{isLoading ? '...' : value}</div>
      </div>
    </div>
    <div className="float-right text-sm text-gray-500">
      <div>
        Top{' '}
        <span className="text-xl font-bold text-[#ff2366]">
          {isLoading ? '...' : rank}
        </span>{' '}
        in {country}
      </div>
    </div>
  </div>
);

const RightPan = () => {
  const { contributorInfo } = useContributorInfo();
  // 新增 selectedYear 状态，并初始化为 2024
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const { data, error, isLoading } = useContributorApi<ContributionRankData>(
    '/api/v2/contributor_portrait/contribution_rank',
    'contribution_rank',
    {},
    selectedYear // 将 selectedYear 传递给 useContributorApi
  );

  const country = contributorInfo?.country || 'Worldwide';

  // 处理年份选择变化的函数
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="relative flex w-[400px] flex-shrink-0 flex-col gap-4">
      {/* 添加年份选择下拉框 */}
      <div className="absolute right-0 top-0 z-50 flex items-center justify-end gap-1">
        <Tooltip
          placement="top"
          title={
            <TooltipInfo
              tooltipKey="contribution_rank"
              showDetails={true}
              showDataSource={true}
            />
          }
        >
          <GoQuestion className="cursor-pointer" />
        </Tooltip>
        <Select
          defaultValue={selectedYear}
          style={{ width: 74 }}
          onChange={handleYearChange}
          variant="borderless"
          options={[
            // { value: 2022, label: '2022' },
            // { value: 2023, label: '2023' },
            { value: 2024, label: '2024' },
            { value: 2025, label: '2025' },
          ]}
        />
      </div>

      <ContributionCard
        icon={<BiGitCommit />}
        bgColor="bg-[#e0edff]"
        textColor="text-[#6da7ff]"
        title="Commits"
        value={data?.push_contribution || 0}
        rank={data?.push_contribution_rank || '0%'}
        country={country}
        isLoading={isLoading}
      />

      <ContributionCard
        icon={<BiGitPullRequest />}
        bgColor="bg-[#fffae5]"
        textColor="text-[#ffd950]"
        title="PRs"
        value={data?.pull_request_contribution || 0}
        rank={data?.pull_request_contribution_rank || '0%'}
        country={country}
        isLoading={isLoading}
      />

      <ContributionCard
        icon={<GoIssueOpened />}
        bgColor="bg-[#d8f5ea]"
        textColor="text-[#27c68b]"
        title="Issues"
        value={data?.issue_contribution || 0}
        rank={data?.issue_contribution_rank || '0%'}
        country={country}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RightPan;
