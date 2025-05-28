import React, { useState } from 'react';
import SoftwareCard from '../SoftwareCard';

interface SimilarSoftwareSectionProps {
  onBack: () => void;
  onSoftwareSelect: (softwareId: string, selected: boolean) => void;
  selectedSoftware: string[];
}

const SimilarSoftwareSection: React.FC<SimilarSoftwareSectionProps> = ({
  onBack,
  onSoftwareSelect,
  selectedSoftware,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [similarSoftware, setSimilarSoftware] = useState([
    {
      id: 'similar-1',
      name: 'Apache Kafka',
      description: '分布式流处理平台',
      license: 'Apache-2.0',
      stars: '25k',
      badges: ['热门', '趋势'],
      activity: '★★★★★',
      lastUpdate: '2天前',
      similarity: 88,
    },
    {
      id: 'similar-2',
      name: 'RabbitMQ',
      description: '消息队列中间件',
      license: 'MPL-2.0',
      stars: '11k',
      badges: ['稳定'],
      activity: '★★★★☆',
      lastUpdate: '1周前',
      similarity: 75,
    },
  ]);

  const handleFindSimilar = () => {
    if (inputValue.trim()) {
      // 这里可以添加实际的相似软件查找逻辑
      console.log('查找相似软件:', inputValue);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-4">
      <div className="mx-auto mb-8 rounded bg-white p-6 shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder="输入已知软件名称或GitHub地址"
        />
        <div className="mt-6">
          <button
            onClick={handleFindSimilar}
            className="bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            查找相似软件
          </button>
        </div>
      </div>

      {/* 相似软件结果 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {similarSoftware.map((software) => (
          <SoftwareCard
            key={software.id}
            software={software}
            isSelected={selectedSoftware.includes(software.id)}
            onSelect={(selected) => onSoftwareSelect(software.id, selected)}
            showSimilarity={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarSoftwareSection;
