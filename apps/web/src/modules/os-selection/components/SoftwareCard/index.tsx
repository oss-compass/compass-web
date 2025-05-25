import React from 'react';

interface Software {
  id: string;
  name: string;
  description: string;
  license: string;
  stars: string;
  badges: string[];
  activity: string;
  lastUpdate: string;
  similarity?: number;
}

interface SoftwareCardProps {
  software: Software;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  showSimilarity?: boolean;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({
  software,
  isSelected,
  onSelect,
  showSimilarity = false,
}) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case '热门':
        return 'bg-orange-100 text-orange-600';
      case '趋势':
        return 'bg-green-100 text-green-600';
      case '稳定':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="relative rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-sm">
      {/* 勾选按钮 */}
      <button
        onClick={() => onSelect(!isSelected)}
        className={`absolute top-3 right-3 h-5 w-5 rounded border-2 transition-all ${
          isSelected
            ? 'border-blue-500 bg-blue-500'
            : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {isSelected && (
          <span className="flex h-full items-center justify-center text-xs text-white">
            ✓
          </span>
        )}
      </button>

      <h4 className="mb-4 pr-8 text-lg font-semibold">
        {software.name}{' '}
        <i className="fas fa-external-link-alt text-sm text-gray-400"></i>
      </h4>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block rounded bg-blue-50 px-2 py-1 text-sm text-blue-600">
          {software.license}
        </span>
        {software.badges.map((badge, index) => (
          <span
            key={index}
            className={`inline-block rounded px-2 py-1 text-sm ${getBadgeColor(
              badge
            )}`}
          >
            {badge}
          </span>
        ))}
        <span className="text-gray-600">
          <i className="fas fa-star text-yellow-400"></i> {software.stars}
        </span>
      </div>

      {showSimilarity && software.similarity && (
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-sm text-gray-600">
            <span>相似度</span>
            <span>{software.similarity}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              style={{ width: `${software.similarity}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p className="mb-3">{software.description}</p>
        <div className="flex justify-between">
          <span>活跃度: {software.activity}</span>
          <span>最后更新: {software.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
};

export default SoftwareCard;
