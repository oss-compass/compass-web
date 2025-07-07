import React from 'react';
import { useTranslation } from 'next-i18next';
import useContributorInfo from '@modules/developer/hooks/useContributorInfo';
import ImageFallback from '@common/components/ImageFallback';
import classnames from 'classnames';

const Avatar = ({ url }) => {
  return (
    <div className="relative">
      <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-100">
        <ImageFallback
          src={url || '/images/default.png'}
          unoptimized
          width={32}
          height={32}
          style={{
            objectFit: 'cover',
          }}
          fallbackSrc={'/images/default.png'}
          alt="logo"
        />
      </div>
    </div>
  );
};
const LabelItems = () => {
  const { t } = useTranslation();
  const { contributorInfo } = useContributorInfo();

  return (
    <>
      <div className="relative flex h-6 flex-1 items-center overflow-hidden">
        <div
          key={contributorInfo.html_url}
          className={classnames('flex items-center')}
        >
          <Avatar url={contributorInfo.avatar_url} />
          <a
            className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline"
            href={contributorInfo.html_url}
            target="_blank"
            rel={'noreferrer'}
          >
            {contributorInfo.contributor}
          </a>
          <div className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
            {t('developer:developer')}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelItems;
