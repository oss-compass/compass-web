import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import IconCompare from '@public/images/lab/compare.svg';

const RepoCompareBar: React.FC<{
  total: number;
  compareCount: number;
  compareMode: boolean;
  onCompareToggle: () => void;
  onCompareConfirm: () => void;
  onCompareCancel: () => void;
}> = ({
  total,
  compareCount,
  compareMode,
  onCompareToggle,
  onCompareConfirm,
  onCompareCancel,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 flex items-center text-sm font-medium">
      {/* <span className="line-clamp-1">
        {t('lab:projects_in_datasets', {
          length: total,
        })}
      </span> */}
      <div className="">
        {compareMode ? (
          <div className="flex text-xs">
            <div
              onClick={() => {
                onCompareCancel();
              }}
              className="ml-5 cursor-pointer border border-gray-500 px-2 py-1 text-center text-xs text-black "
            >
              {t('collection:cancel')}
            </div>
            <div
              className={classnames(
                'ml-5 cursor-pointer border-0 border-gray-500 bg-blue-600 px-2 py-1 text-center text-xs text-gray-50',
                { 'bg-gray-300': compareCount < 2 }
              )}
              onClick={() => {
                if (compareCount < 2) return;
                onCompareConfirm();
              }}
            >
              {t('collection:compare')}
            </div>
          </div>
        ) : (
          <div
            onClick={() => onCompareToggle()}
            className="w-36 flex-none cursor-pointer border border-gray-500 text-center text-xs font-semibold leading-6"
          >
            <div className="mr-2 inline-block align-text-bottom">
              <IconCompare />
            </div>
            {t('lab:pick_for_compare')}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCompareBar;
