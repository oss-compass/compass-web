import React from 'react';

interface ScenarioCardsProps {
  onSectionChange: (
    section: 'assessment' | 'recommendation' | 'similar' | 'reports'
  ) => void;
}

const ScenarioCards: React.FC<ScenarioCardsProps> = ({ onSectionChange }) => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* 场景 A 卡片 */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-2">
        <div className="mb-4 text-5xl text-blue-500">
          <i className="fas fa-chart-bar"></i>
        </div>
        <h3 className="mb-4 text-xl font-semibold">直接评估已知软件</h3>
        <p className="mb-6 text-gray-600">
          输入软件名称/GitHub 地址，生成多维度评估报告
        </p>
        <button
          onClick={() => onSectionChange('assessment')}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          开始评估
        </button>
      </div>

      {/* 场景 B 卡片 */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-2">
        <div className="absolute top-3 right-0 translate-x-6 -translate-y-2 rotate-45 transform bg-gradient-to-r from-blue-500 to-green-500 px-6 py-1 text-xs font-bold text-white">
          功能推荐
        </div>
        <div className="mb-4 text-5xl text-blue-500">
          <i className="fas fa-lightbulb"></i>
        </div>
        <h3 className="mb-4 text-xl font-semibold">通过功能推荐软件</h3>
        <p className="mb-6 text-gray-600">
          用自然语言描述需求，获取 TOP10 候选列表
        </p>
        <button
          onClick={() => onSectionChange('recommendation')}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          开始推荐
        </button>
      </div>

      {/* 场景 C 卡片 */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-2">
        <div className="absolute top-3 right-0 translate-x-6 -translate-y-2 rotate-45 transform bg-gradient-to-r from-blue-500 to-green-500 px-6 py-1 text-xs font-bold text-white">
          功能推荐
        </div>
        <div className="mb-4 text-5xl text-blue-500">
          <i className="fas fa-project-diagram"></i>
        </div>
        <h3 className="mb-4 text-xl font-semibold">查找相似功能软件</h3>
        <p className="mb-6 text-gray-600">
          基于已有软件，寻找功能相似的替代方案
        </p>
        <button
          onClick={() => onSectionChange('similar')}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          查找相似
        </button>
      </div>
    </div>
  );
};

export default ScenarioCards;
