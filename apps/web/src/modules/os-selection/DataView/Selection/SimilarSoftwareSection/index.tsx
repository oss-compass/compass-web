import React, { useState, useEffect } from 'react';
import SoftwareCard from '../SoftwareCard';
import client from '@common/gqlClient';
import { useThirdTplSearchQuery } from '@oss-compass/graphql';
import { Empty, Spin, Alert } from 'antd';
import { useLanguagesList } from '@modules/os-selection/constant';
import GenReport from '../GenReport';
import { useTranslation } from 'next-i18next';

const SimilarSoftwareSection = () => {
  const languagesList = useLanguagesList();
  const { t } = useTranslation('os-selection');
  const [description, setDescription] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSrcEcosystem, setSelectedSrcEcosystem] = useState<string>('');
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<any[]>([]);

  const { data, isFetching, refetch } = useThirdTplSearchQuery(
    client,
    {
      src_package_name: description,
      src_ecosystem: selectedSrcEcosystem,
      target_ecosystem_list: selectedLanguages,
      top_n: 10,
    },
    { enabled: false }
  );
  useEffect(() => {
    if (data?.thirdTpl) {
      setRecommendations(
        data.thirdTpl?.items!.map((item) => {
          const parts = item?.packageId.split('@@@@$$@@@@');
          const name = parts[0];
          const target = parts[1];
          return {
            name,
            target,
            ...item,
          };
        })
      );
    }
  }, [data]);

  const handleSrcEcosystemToggle = (language: string) => {
    setSelectedSrcEcosystem(language);
  };
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
    setErrorMessage('');
    setSelectedSoftware([]);
    if (!description.trim()) {
      setErrorMessage(t('similar_section.name_error'));
      return;
    }
    if (!selectedSrcEcosystem) {
      setErrorMessage(t('similar_section.source_error'));
      return;
    }
    if (selectedLanguages.length === 0) {
      setErrorMessage(t('similar_section.target_error'));
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
                key={software.packageId}
                software={software}
                isSelected={selectedSoftware.find(
                  (i) => i.packageId === software.packageId
                )}
                onSelect={(selected) => handleSoftwareSelect(software)}
                showSimilarity={true}
                showVote={true}
                srcPackageName={description}
                srcEcosystem={selectedSrcEcosystem}
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
          className="w-full rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder={t('similar_section.input_placeholder')}
        />
        <div className="my-6 flex flex-wrap gap-2">
          <span className="mt-1 text-sm">
            {t('similar_section.source_label')}
          </span>
          {languagesList.map((language) => (
            <button
              key={language.id}
              onClick={() => handleSrcEcosystemToggle(language.id)}
              className={`rounded-full border px-4 py-1 text-sm transition-all ${
                selectedSrcEcosystem === language.id
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
        {/* 编程语言选择器 */}
        <div className="my-6 flex flex-wrap gap-2">
          <span className="mt-1 text-sm">
            {t('similar_section.target_label')}
          </span>
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
            {t('similar_section.button')}
          </button>
          <div className="">
            <Alert message={t('similar_section.alert')} showIcon />
          </div>
        </div>
      </div>

      {/* 推荐结果 */}
      {content}
    </div>
  );
};

export default SimilarSoftwareSection;
