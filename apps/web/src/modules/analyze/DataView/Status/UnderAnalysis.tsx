import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const UnderAnalysis = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col items-center justify-center md:px-4 md:py-20">
      <div className="mb-4">
        <Image
          src="/images/analyze/padding.gif"
          width={79}
          height={60}
          alt={'padding'}
        />
      </div>
      <p className="mb-2">
        {t('analyze:the_current_project_is_under_analysis_please_visit')}
      </p>
      <Link href={'/'} className="text-blue-600">
        {t('analyze:explore_other_projects')}
      </Link>
    </div>
  );
};

export default UnderAnalysis;
