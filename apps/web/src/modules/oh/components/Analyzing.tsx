import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Analyzing = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col items-center justify-center md:px-4 md:py-20">
      <h1 className="mb-4 text-3xl font-bold text-gray-600">报告分析中</h1>

      {/* <Link href={'/'} className="text-blue-600">
        {t('analyze:explore_other_projects')}
      </Link> */}
    </div>
  );
};

export default Analyzing;
