import React from 'react';
import { languagesList } from '@modules/os-selection/constant';

interface Software {
  packageId: string;
  name: string;
  target: string;
  label?: string;
  score: number;
}

const SoftwareCard = ({
  software,
  isSelected,
  onSelect,
  showSimilarity = false,
}) => {
  return (
    <div className="relative rounded border  bg-white p-4 shadow-sm">
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

      <h4 className="mb-2 pr-8 text-lg font-semibold">
        <a
          className="line-clamp-1 hover:underline"
          onClick={(e) => {
            window.open(software.label, '_blank');
            e.stopPropagation();
          }}
          title={software.name}
        >
          {software.name}
        </a>
      </h4>
      <div className="line-clamp-1 my-2 text-sm text-[#3e8eff] hover:underline">
        {software.label ? (
          <a
            onClick={() => window.open(software.label, '_blank')}
            title={software.label}
          >
            {software.label}
          </a>
        ) : (
          ''
        )}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block rounded bg-blue-50 px-2 py-1 text-sm text-blue-600">
          {languagesList.find((item) => item.id === software.target)?.name}
        </span>
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
      {software?.score && (
        <div className="text-sm text-gray-600">
          <p className="mb-3">{software.description}</p>
          <div className="flex justify-between">
            <span>功能匹配分数: {software?.score?.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareCard;
