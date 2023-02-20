import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

const Banner: React.FC<{ content: string }> = ({ content }) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={classnames(
          'md:hidden',
          'relative h-40 overflow-hidden bg-[#2c5fea]',
          "bg-[url('/images/explore/bg-line.png')] bg-[length:89px_57px] bg-repeat"
        )}
      >
        <div
          className={classnames(
            'relative mx-auto w-[1280px] pt-12 text-5xl font-medium text-white',
            'xl:w-full xl:px-2'
          )}
        >
          {content}
          <div
            className={classnames(
              'absolute top-0 right-10 h-[160px] w-[169px]',
              "bg-[url('/images/explore/bg-graph.png')] bg-cover bg-no-repeat"
            )}
          ></div>
        </div>
      </div>
      <div className="h-11 w-full border-b bg-white px-4 font-medium leading-[44px] md:visible >md:hidden">
        {t('common:header.explore')}
      </div>
    </>
  );
};

export default Banner;
