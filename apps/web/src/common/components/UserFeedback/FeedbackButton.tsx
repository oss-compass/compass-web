import React, { useState } from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface FeedbackButtonProps {
  onClick: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  onClick,
  onClose,
  isVisible,
}) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transform">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute -left-1 -top-1 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-gray-400 text-white shadow-sm transition-colors hover:bg-gray-500"
        title={t('common:btn.close')}
      >
        <MdClose className="text-xs" />
      </button>

      {/* 主反馈按钮 */}
      <div className="relative">
        <div
          className="flex h-8 w-9 cursor-pointer items-center justify-center rounded-l-full border border-gray-200 bg-white pl-0.5 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg"
          onClick={onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <BiMessageAltDetail className="text-lg text-gray-500" />
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="z-60 absolute right-12 top-1/2 -translate-y-1/2 transform">
            <div className="whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white shadow-lg">
              反馈您的问题和建议
              {/* 箭头 */}
              <div className="absolute left-full top-1/2 h-0 w-0 -translate-y-1/2 transform border-b-2 border-l-4 border-t-2 border-b-transparent border-l-gray-800 border-t-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackButton;
