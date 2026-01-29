import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Center from '@common/components/Layout/Center';
import style from '@modules/lab/model/components/Banner/index.module.css';

const Banner = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div
      className={classnames(
        'relative mb-12 h-60 overflow-hidden bg-[#ffebbf]',
        style.headerBgLine,
        className
      )}
    >
      <div
        className={classnames(
          'absolute bottom-0 right-28 h-60 w-[376px] md:-right-[300px]',
          style.headerBgGraph
        )}
      />
      <Center className="relative pt-10 text-sm text-[#876E35] md:w-full md:px-2">
        <div className="text-2xl font-semibold text-[#6B5324]">
          {t('os_board:banner.title')}
        </div>
        <div className="mt-2 max-w-[600px] text-sm text-[#876E35]">
          {t('os_board:banner.description')}
        </div>
        {/* <div className="mt-6 flex gap-4">
          <div
            className="h-8 w-40 cursor-pointer bg-gradient-to-r from-[#F1B600] to-[#854700] text-center leading-8 text-[#fff]"
            onClick={() => {
              router.push('/os-board/dashboard/create');
            }}
          >
            {t('os_board:banner.create_dashboard')}
          </div>
        </div> */}
      </Center>
    </div>
  );
};

export default Banner;
