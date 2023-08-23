import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const NotSuccess = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center md:px-4 md:py-20">
      <div className="mb-4">
        <Image
          src="/images/analyze/padding.gif"
          width={79}
          height={60}
          alt={'padding'}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <p className="mb-10">
        {t(`lab:analysis_status.tips`)}
        {t(`lab:analysis_status.${status}`)}
      </p>
      <Link href={'/lab/my'} className="text-blue-600">
        {t('lab:back_my_lab')}
      </Link>
    </div>
  );
};

export default NotSuccess;
