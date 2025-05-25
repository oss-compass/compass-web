import React, { useState } from 'react';
import SoftwareCard from '../SoftwareCard';

interface AssessmentSectionProps {
  onBack: () => void;
  onSoftwareSelect: (softwareId: string, selected: boolean) => void;
  selectedSoftware: string[];
}

const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  onBack,
  onSoftwareSelect,
  selectedSoftware,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [softwareList, setSoftwareList] = useState([
    {
      id: 'shardingsphere',
      name: 'Apache ShardingSphere',
      description: '分布式数据库中间件生态',
      license: 'Apache-2.0',
      stars: '18k',
      badges: ['热门'],
      activity: '★★★★☆',
      lastUpdate: '3天前',
    },
    {
      id: 'seata',
      name: 'Seata',
      description: '分布式事务解决方案',
      license: 'Apache-2.0',
      stars: '24k',
      badges: ['趋势'],
      activity: '★★★★★',
      lastUpdate: '1天前',
    },
  ]);

  const handleAddSoftware = () => {
    if (inputValue.trim()) {
      // 这里可以添加实际的软件添加逻辑
      console.log('添加软件:', inputValue);
      setInputValue('');
    }
  };

  const handleImportCSV = () => {
    // 这里可以添加CSV导入逻辑
    console.log('导入CSV文件');
  };

  return (
    <div className="mx-auto max-w-6xl py-4 px-4">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-blue-500 hover:underline"
      >
        <i className="fas fa-arrow-left"></i> 返回首页
      </button>

      <div className="mx-auto mb-8 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder="输入软件名称或Git仓库URL (例: https://github.com/username/repo)"
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAddSoftware}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            添加软件
          </button>
          <button
            onClick={handleImportCSV}
            className="rounded-lg border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-50"
          >
            导入CSV文件
          </button>
        </div>
      </div>

      {/* 评估结果区域 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {softwareList.map((software) => (
          <SoftwareCard
            key={software.id}
            software={software}
            isSelected={selectedSoftware.includes(software.id)}
            onSelect={(selected) => onSoftwareSelect(software.id, selected)}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentSection;
