import React from 'react';
import classnames from 'classnames';
import { AiOutlineArrowRight } from 'react-icons/ai';
import LinkX from '@common/components/LinkX';
import { PopContent } from './plantConfig';
import styles from './index.module.scss';
import { useTranslation } from 'next-i18next';

const PopCard: React.FC<{
  className?: string;
  popContent: PopContent;
  onNext: () => void;
}> = ({ className, popContent, onNext }) => {
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        styles.popCardBg,
        'absolute w-[304px] rounded p-4 transition-all',
        className
      )}
    >
      <h2 className="text-white">{popContent.title}</h2>
      <p className="mb-4 break-words text-xs text-gray-400 line-clamp-4">
        {popContent.content}
      </p>
      <div className="flex justify-between">
        <LinkX href={popContent.hash}>
          <a className="cursor-pointer text-xs text-[#3A5BEF]">
            {t('common:know_more')}
          </a>
        </LinkX>
        <div
          className="flex cursor-pointer items-center text-xs text-gray-400"
          onClick={() => {
            onNext();
          }}
        >
          {t('common:next')} <AiOutlineArrowRight className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default PopCard;
