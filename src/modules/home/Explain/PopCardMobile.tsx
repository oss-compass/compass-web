import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import LinkX from '@common/components/LinkX';
import { PopContent } from './plantConfig';
import styles from './index.module.scss';

const PopCardMobile: React.FC<{
  className?: string;
  tag: string;
  popContent: PopContent;
}> = ({ tag, className, popContent }) => {
  const { t, i18n } = useTranslation();

  const tagMap = {
    productivity: t('analyze:topic.productivity'),
    robustness: t('analyze:topic.robustness'),
    nicheCreation: t('analyze:topic.niche_creation'),
  };

  return (
    <div
      className={classnames(
        styles.popCardBg,
        'w-full rounded p-2 transition-all',
        className
      )}
    >
      <span
        className={classnames(
          'mb-1 inline-block rounded px-1 text-xs text-white',
          {
            'bg-[#224595]': tag === 'productivity',
            'bg-[#DCA511]': tag === 'robustness',
            'bg-[#9E3CA9]': tag === 'nicheCreation',
          }
        )}
      >
        {(tagMap as any)[tag]}
      </span>
      <h2 className="text-sm text-white">{popContent.title}</h2>
      <p className="mb-4 break-words text-xs text-gray-400 line-clamp-4">
        {popContent.content}
      </p>
      <div className="flex justify-between">
        <LinkX href={popContent.hash}>
          <a className="cursor-pointer text-xs text-[#3A5BEF]">
            {t('common:know_more')}
          </a>
        </LinkX>
      </div>
    </div>
  );
};

export default PopCardMobile;
