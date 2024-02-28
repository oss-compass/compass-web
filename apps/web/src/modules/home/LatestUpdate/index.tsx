import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import jsonData from './UpdateData.json';
import LinkX from '@common/components/LinkX';
import { AiOutlineClose } from 'react-icons/ai';

const LatestUpdate = () => {
  const { t, i18n } = useTranslation();

  const { name, nameCn, url } = jsonData;
  const [showTip, setShowTip] = useState(true);
  return (
    showTip && (
      <div className="absolute z-50 mx-auto grid w-full pt-[40px] pb-6 md:hidden">
        <div className="absolute left-1/2 top-4 flex h-10 w-[1200px] -translate-x-1/2 transform items-center rounded-sm border border-[#26A526] bg-[#E6FFE6] px-4 text-[#26A526] lg:w-[767px] xl:w-[1023px]">
          <div className="flex flex-1">
            <div className="font-bold ">💪 {t('home:recently_update')}:</div>
            <div className="mx-2">{i18n.language === 'en' ? name : nameCn}</div>
            <LinkX href={url}>
              <span className="hover:underline ">{t('home:read_more')}</span>
            </LinkX>
          </div>
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => setShowTip(false)}
          />
        </div>
      </div>
    )
  );
};

export default LatestUpdate;
