import React, { useState, useEffect } from 'react';
import SoftwareCard from '../SoftwareCard';
import client from '@common/gqlClient';
import { useThirdTxtSearchQuery } from '@oss-compass/graphql';
import { Empty, Spin, Alert } from 'antd';
import { languagesList } from '@modules/os-selection/constant';
import GenReport from '../GenReport';

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
  const [selectedSoftware, setSelectedSoftware] = useState<any[]>([]);

  // 移除 enabled: Boolean(description)，改为手动触发
  const { data, isFetching, refetch } = useThirdTxtSearchQuery(
    client,
    {
      query_txt: description,
      query_keywords: [],
      target_ecosystem_list: selectedLanguages,
      top_n: 10,
    },
    { enabled: false } // 将 enabled 设置为 false，阻止自动触发
  );
  useEffect(() => {
    console.log('data', data);
    const newData: any = data;
    if (newData?.thirdTxt) {
      setRecommendations(
        newData.thirdTxt?.items!.map((item) => {
          const parts = item?.packageId.split('@@@@$$@@@@');
          const name = parts[0]; // "canvas"
          const target = parts[1]; // "npm"
          return {
            name,
            target,
            ...item,
          };
        })
      );
    }
  }, [data]);

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };
  const handleSoftwareSelect = (software: any) => {
    setSelectedSoftware((prev) => {
      if (prev.find((i) => i.packageId === software.packageId)) {
        return prev.filter((i) => i.packageId !== software.packageId);
      } else {
        return [...prev, software];
      }
    });
  };
  const handleGetRecommendations = () => {
    setErrorMessage(''); // 每次点击时清空之前的错误信息
    setSelectedSoftware([]);
    if (!description.trim()) {
      setErrorMessage('请输入您的需求描述。');
      return;
    }
    if (selectedLanguages.length === 0) {
      setErrorMessage('请至少选择一个推荐库来源。');
      return;
    }
    // 这里可以添加实际的推荐逻辑
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
                isSelected={selectedSoftware.find(
                  (i) => i.packageId === software.packageId
                )}
                onSelect={(selected) => handleSoftwareSelect(software)}
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none  border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder="描述你的需求... (例: 处理Microsoft Word文档的JS库)"
        />
        {/* <Alert
          message="推荐算法设计与研发： 南京大学计算机学院 / 计算机软件研究所 / 前沿交叉中心 汪亮 副教授及团队"
          showIcon
        /> */}
        {/* 编程语言选择器 */}
        <div className="my-6 flex flex-wrap gap-2">
          <span className="mt-1 text-sm">选择推荐库来源(可多选):</span>
          {languagesList.map((language) => (
            <button
              key={language.id}
              onClick={() => handleLanguageToggle(language.id)}
              className={`rounded-full border px-4 py-1 text-sm transition-all ${
                selectedLanguages.includes(language.id)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={handleGetRecommendations}
            className="bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            获取推荐
          </button>
          <div className="">
            <Alert
              message="推荐算法设计与研发： 南京大学计算机学院 / 计算机软件研究所 / 前沿交叉中心 汪亮 副教授及团队"
              showIcon
            />
          </div>
        </div>
      </div>

      {/* 推荐结果 */}
      {content}
    </div>
  );
};

export default RecommendationSection;
