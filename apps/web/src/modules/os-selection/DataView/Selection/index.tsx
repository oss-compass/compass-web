import React, { useState } from 'react';
import AssessmentSection from './AssessmentSection';
import RecommendationSection from './RecommendationSection';
import SimilarSoftwareSection from './SimilarSoftwareSection';
import { useTranslation } from 'next-i18next';
import { FaChartBar, FaLightbulb, FaProjectDiagram } from 'react-icons/fa';

// 定义场景 Tab 的类型
type ScenarioTabType = 'assessment' | 'recommendation' | 'similar';

const MainContent = () => {
  const { t } = useTranslation('os-selection');
  const [activeTab, setActiveTab] = useState<ScenarioTabType>('assessment');
  const scenarioTabs = [
    {
      id: 'assessment' as ScenarioTabType,
      title: t('main_content.assessment.title'),
      desc: t('main_content.assessment.desc'),
      icon: <FaChartBar className="text-blue-500" size={40} />,
    },
    {
      id: 'recommendation' as ScenarioTabType,
      title: t('main_content.recommendation.title'),
      desc: t('main_content.recommendation.desc'),
      icon: <FaLightbulb className="text-blue-500" size={40} />,
      tagText: t('main_content.recommendation.tag'),
    },
    {
      id: 'similar' as ScenarioTabType,
      title: t('main_content.similar.title'),
      desc: t('main_content.similar.desc'),
      icon: <FaProjectDiagram className="text-blue-500" size={40} />,
      tagText: t('main_content.similar.tag'),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl overflow-hidden py-6">
      {/* 场景 Tab 区域 */}
      <div className="relative mb-8 flex gap-4 md:flex-row">
        {scenarioTabs.map((tab) => (
          <div
            key={tab.id}
            className={`relative flex-1 cursor-pointer overflow-hidden rounded p-6 text-center shadow-lg transition-transform hover:-translate-y-1
              ${
                activeTab === tab.id
                  ? '!bg-[#518fff] text-white hover:-translate-y-0'
                  : 'bg-white text-gray-700 hover:shadow-xl '
              }
            `}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.tagText && (
              <div className="absolute top-[18px] right-1.5 z-10 w-[120px] origin-center translate-x-[30%] -translate-y-[10%] rotate-45 transform overflow-hidden bg-gradient-to-br from-[#4A90E2] to-[#2ECC71] py-1 px-6 text-center text-xs font-bold text-white shadow-md">
                {tab.tagText}
              </div>
            )}
            <div className="mb-4 flex justify-center">
              {React.cloneElement(tab.icon, {
                className:
                  activeTab === tab.id ? 'text-white' : 'text-blue-500',
              })}
            </div>
            <h3
              className={`mb-2 text-lg font-semibold ${
                activeTab === tab.id ? 'text-white' : 'text-gray-800'
              }`}
            >
              {tab.title}
            </h3>
            <p
              className={`$${
                activeTab === tab.id ? 'text-gray-200' : 'text-gray-600'
              } text-sm`}
            >
              {tab.desc}
            </p>
          </div>
        ))}
        {/* 三角形指示器 - 放在Tab外部 */}
        {scenarioTabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div
                key={`indicator-${tab.id}`}
                className="pointer-events-none absolute left-0 -bottom-2 flex w-full justify-center"
                style={{
                  left: `${
                    (100 / scenarioTabs.length) *
                      scenarioTabs.findIndex((t) => t.id === tab.id) +
                    100 / scenarioTabs.length / 2
                  }%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#518fff]"></div>
              </div>
            )
        )}
      </div>
      {/* 根据 activeTab 显示对应的内容区域 */}
      {activeTab === 'assessment' && <AssessmentSection />}
      {activeTab === 'recommendation' && <RecommendationSection />}
      {activeTab === 'similar' && <SimilarSoftwareSection />}
    </div>
  );
};

export default MainContent;
