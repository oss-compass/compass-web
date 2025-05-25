import React, { useState } from 'react';
import SoftwareCard from '../SoftwareCard';

interface RecommendationSectionProps {
  onBack: () => void;
  onSoftwareSelect: (softwareId: string, selected: boolean) => void;
  selectedSoftware: string[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  onBack,
  onSoftwareSelect,
  selectedSoftware,
}) => {
  const [description, setDescription] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState([
    {
      id: 'shardingsphere-rec',
      name: 'Apache ShardingSphere',
      description: '分布式数据库中间件生态',
      license: 'Apache-2.0',
      stars: '18k',
      badges: ['热门'],
      activity: '★★★★☆',
      lastUpdate: '3天前',
      similarity: 95,
    },
  ]);

  const languages = [
    'Java',
    'Python',
    'C/C++',
    'JavaScript/TS',
    'Rust',
    'Go',
    'PHP',
    'Ruby',
    'Swift',
    'Kotlin',
  ];

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const handleGetRecommendations = () => {
    if (description.trim()) {
      // 这里可以添加实际的推荐逻辑
      console.log('获取推荐:', { description, selectedLanguages });
    }
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border-2 border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          placeholder="描述你的需求... (例: 需要支持分布式事务的Java数据库)"
        />

        {/* 编程语言选择器 */}
        <div className="my-4 flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageToggle(language)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                selectedLanguages.includes(language)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {language}
            </button>
          ))}
        </div>

        <button
          onClick={handleGetRecommendations}
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          获取推荐
        </button>
      </div>

      {/* 推荐结果 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((software) => (
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

export default RecommendationSection;
