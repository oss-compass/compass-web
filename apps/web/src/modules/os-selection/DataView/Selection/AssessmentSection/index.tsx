import React, { useState, useEffect } from 'react';
import SoftwareCard from '../SoftwareCard';
import client from '@common/gqlClient';
import { Empty, Spin } from 'antd';
import GenReport from '../GenReport';
import { useSearchQuery } from '@oss-compass/graphql';
import { getPathname, getProvider } from '@common/utils';
import { useTranslation } from 'next-i18next';

const AssessmentSection = () => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<any[]>([]);

  const { data, isFetching, refetch } = useSearchQuery(
    client,
    {
      keyword: description,
      level: 'repo',
    },
    { enabled: false }
  );

  const targetMap = {
    github: 'selected.github',
    gitee: 'selected.gitee',
  };
  useEffect(() => {
    if (data?.fuzzySearch.length > 0) {
      setRecommendations(
        data.fuzzySearch?.map((item) => {
          const name = getPathname(item.label);
          const target = targetMap[getProvider(item.label)];
          return {
            name,
            target,
            ...item,
          };
        })
      );
    }
  }, [data]);

  const handleSoftwareSelect = (software: any) => {
    setSelectedSoftware((prev) => {
      if (prev.find((i) => i.label === software.label)) {
        return prev.filter((i) => i.label !== software.label);
      } else {
        return [...prev, software];
      }
    });
  };
  const handleGetRecommendations = () => {
    setErrorMessage('');
    setSelectedSoftware([]);
    if (!description.trim()) {
      setErrorMessage(t('os-selection:assessment_section.input_error'));
      return;
    }
    refetch();
  };
  let content: any = '';
  if (isFetching) {
    content = (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
        <Spin size="large" />
      </div>
    );
  } else {
    if (recommendations.length === 0) {
      content = (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded bg-white p-6 shadow-sm">
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
                key={software.label}
                software={software}
                isSelected={selectedSoftware.find(
                  (i) => i.label === software.label
                )}
                onSelect={() => handleSoftwareSelect(software)}
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
          placeholder={t('os-selection:assessment_section.input_placeholder')}
        />
        {errorMessage && (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
        <button
          onClick={handleGetRecommendations}
          className="mt-4 bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {t('os-selection:assessment_section.button')}
        </button>
      </div>
      {content}
    </div>
  );
};

export default AssessmentSection;
