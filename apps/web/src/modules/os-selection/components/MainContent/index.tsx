import React, { useState } from 'react';
// 移除 ScenarioCards 组件，因为我们将直接在这里渲染卡片作为 Tab
// import ScenarioCards from '../ScenarioCards';
import AssessmentSection from '../AssessmentSection';
import RecommendationSection from '../RecommendationSection';
import SimilarSoftwareSection from '../SimilarSoftwareSection';
import ReportsSection from '../ReportsSection'; // ReportsSection 暂时保留，但根据需求可能需要调整其位置或移除
import CompareModal from '../CompareModal';
import { useTranslation } from 'next-i18next'; // 引入 useTranslation
import { FaChartBar, FaLightbulb, FaProjectDiagram } from 'react-icons/fa'; // 引入图标

// 定义场景 Tab 的类型
type ScenarioTabType = 'assessment' | 'recommendation' | 'similar';

const MainContent = () => {
  const { t } = useTranslation(); // 使用 useTranslation

  // 使用 activeTab 状态管理当前选中的场景
  const [activeTab, setActiveTab] = useState<ScenarioTabType>('assessment'); // 默认选中评估场
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // 定义场景 Tab 的数据
  const scenarioTabs = [
    {
      id: 'assessment' as ScenarioTabType,
      title: '直接评估已知软件', // 使用 t 函数获取翻译文本
      desc: '输入GitHub/Gitee 地址，生成多维度评估报告',
      icon: <FaChartBar className="text-blue-500" size={40} />,
    },
    {
      id: 'recommendation' as ScenarioTabType,
      title: '通过功能描述推荐软件',
      desc: '用自然语言描述需求，获取 TOP10 候选列表',
      icon: <FaLightbulb className="text-blue-500" size={40} />,
      tagText: '功能推荐',
    },
    {
      id: 'similar' as ScenarioTabType,
      title: '查找相似功能软件',
      desc: '基于已有软件，寻找功能相似的替代方案',
      icon: <FaProjectDiagram className="text-blue-500" size={40} />,
      tagText: '功能推荐',
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
              <div className="absolute top-3.5 right-1 z-10 w-[100px] origin-center translate-x-[30%] -translate-y-[10%] rotate-45 transform overflow-hidden bg-gradient-to-br from-[#4A90E2] to-[#2ECC71] py-1 px-6 text-center text-xs font-bold text-white shadow-md">
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
              className={`${
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
                  // 计算三角形的位置，这里假设每个tab宽度相等
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
      {activeTab === 'assessment' && (
        <AssessmentSection
          onBack={() => setActiveTab('assessment')} // 返回按钮可以回到当前 Tab 或根据需要调整
        />
      )}
      {activeTab === 'recommendation' && (
        <RecommendationSection
          onBack={() => setActiveTab('recommendation')} // 返回按钮可以回到当前 Tab 或根据需要调整
        />
      )}
      {activeTab === 'similar' && (
        <SimilarSoftwareSection
          onBack={() => setActiveTab('similar')} // 返回按钮可以回到当前 Tab 或根据需要调整
        />
      )}

      {/* ReportsSection 和对比按钮/模态框保留，根据实际需求调整其显示逻辑 */}
      {/* ReportsSection 暂时不与 Tab 关联，如果需要，可以添加一个 Reports Tab */}
      {/* <ReportsSection onBack={() => handleSectionChange('landing')} /> */}

      {/* 对比模态框 */}
      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        selectedSoftware={selectedSoftware}
      />
    </div>
  );
};

export default MainContent;
