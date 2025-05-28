import React, { useState, useEffect } from 'react';
import SoftwareCard from '../SoftwareCard';
import client from '@common/gqlClient';
import { Empty, Spin } from 'antd';
import GenReport from '../GenReport';
import { useSearchQuery } from '@oss-compass/graphql';
import { getPathname, getProvider } from '@common/utils';

interface RecommendationSectionProps {
  onBack: () => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  onBack,
}) => {
  const [description, setDescription] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // 新增状态用于存储错误信息
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);

  // 移除 enabled: Boolean(description)，改为手动触发
  const { data, isFetching, refetch } = useSearchQuery(
    client,
    {
      keyword: description,
      level: 'repo',
    },
    { enabled: false } // 将 enabled 设置为 false，阻止自动触发
  );

  const targetMap = {
    github: 'selected.github',
    gitee: 'selected.gitee',
  };
  useEffect(() => {
    console.log('data', data);
    if (data?.fuzzySearch.length > 0) {
      setRecommendations(
        data.fuzzySearch?.map((item) => {
          const name = getPathname(item.label); // "canvas"
          const target = targetMap[getProvider(item.label)]; // "npm"
          return {
            name,
            target,
            ...item,
          };
        })
      );
    }
  }, [data]);

  const handleSoftwareSelect = (softwareId: string) => {
    setSelectedSoftware((prev) => {
      if (prev.includes(softwareId)) {
        return prev.filter((id) => id !== softwareId);
      } else {
        return [...prev, softwareId];
      }
    });
  };
  const handleGetRecommendations = () => {
    setErrorMessage(''); // 每次点击时清空之前的错误信息
    setSelectedSoftware([]);
    if (!description.trim()) {
      setErrorMessage('请输入Git仓库URL。');
      return;
    }
    console.log('获取推荐:', { description, selectedLanguages });
    // 触发数据查询
    refetch(); // 在这里手动调用 refetch 触发查询
  };
  let content: any = '';
  if (isFetching) {
    content = (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
        {' '}
        <Spin size="large" />
      </div>
    );
  } else {
    if (recommendations.length === 0) {
      content = (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
          {' '}
          <Empty />
        </div>
      );
    } else {
      content = (
        <div className="min-h-[400px] rounded bg-white p-6 shadow-sm ">
          <div className="mb-4 border-b pb-4">
            <GenReport selectedSoftware={selectedSoftware} />
          </div>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((software) => (
              <SoftwareCard
                key={software.packageId}
                software={software}
                isSelected={selectedSoftware.includes(software.packageId)}
                onSelect={(selected) =>
                  handleSoftwareSelect(software.packageId)
                }
                showSimilarity={true}
              />
            ))}
          </div>
        </div>
      );
    }
  }
  return (
    <div className="mx-auto max-w-6xl py-4">
      <div className="mx-auto mb-8 rounded bg-white p-6 shadow-sm">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder="输入Git仓库URL (例: https://github.com/username/repo)"
        />

        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}

        <button
          onClick={handleGetRecommendations}
          className="mt-4 bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          获取推荐
        </button>
      </div>

      {/* 推荐结果 */}
      {content}
    </div>
  );
};

export default RecommendationSection;
