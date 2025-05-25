import React from 'react';

interface LandingPageProps {
  onSectionChange: (
    section: 'assessment' | 'recommendation' | 'similar'
  ) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSectionChange }) => {
  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <h1 className="mb-12 text-center text-4xl font-bold text-gray-800">
        开源软件选型引擎
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* 场景A卡片 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-md transition-transform hover:-translate-y-2">
          <div className="mb-4 text-5xl text-blue-500">
            <i className="fas fa-chart-bar"></i>
          </div>
          <h3 className="mb-4 text-xl font-semibold">直接评估已知软件</h3>
          <p className="mb-6 text-gray-600">
            输入软件名称/GitHub地址，生成多维度评估报告
          </p>
          <button
            onClick={() => onSectionChange('assessment')}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            开始评估
          </button>
        </div>

        {/* 场景B卡片 - 添加功能推荐角标 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-md transition-transform hover:-translate-y-2">
          <div className="absolute top-3 right-0 w-24 translate-x-8 -translate-y-2 rotate-45 transform bg-gradient-to-r from-blue-500 to-green-500 px-6 py-1 text-center text-xs font-bold text-white shadow-md">
            功能推荐
          </div>
          <div className="mb-4 text-5xl text-blue-500">
            <i className="fas fa-lightbulb"></i>
          </div>
          <h3 className="mb-4 text-xl font-semibold">通过功能推荐软件</h3>
          <p className="mb-6 text-gray-600">
            用自然语言描述需求，获取TOP10候选列表
          </p>
          <button
            onClick={() => onSectionChange('recommendation')}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            开始推荐
          </button>
        </div>

        {/* 场景C卡片 - 添加功能推荐角标 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-md transition-transform hover:-translate-y-2">
          <div className="absolute top-3 right-0 w-24 translate-x-8 -translate-y-2 rotate-45 transform bg-gradient-to-r from-blue-500 to-green-500 px-6 py-1 text-center text-xs font-bold text-white shadow-md">
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
    </div>
  );
};

export default LandingPage;
