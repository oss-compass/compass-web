import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button } from '@oss-compass/ui';

/**
 * 详情页 - 未找到状态
 */
const DetailNotFound: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9]">
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg border bg-white p-8 text-center">
          <div className="mb-2 text-6xl text-gray-300">404</div>
          <div className="mb-4 text-lg text-gray-500">
            {t('os_board:detail.not_found')}
          </div>
          <Button
            size="sm"
            onClick={() => {
              router.push('/os-board');
            }}
          >
            {t('common:btn.back')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailNotFound;
