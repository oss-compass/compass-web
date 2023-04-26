import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const CreateModel = () => {
  const { t, i18n } = useTranslation();
  const [hover, setHover] = useState(false);
  return (
    <div className="ml-10 h-[557px] w-[400px] bg-[#fafafa] md:ml-0 md:w-full">
      <div className="flex h-24 bg-[#f4f4f4] p-4">
        <div className="h-16 w-16 bg-[#f6f6f6] p-2">
          <img
            className="mr-2 inline-block align-text-top "
            src="/images/lab/create.png"
          />
        </div>
        <div className="w-[280px] pt-2 pl-4 text-xl font-medium">
          {t('lab:create_your_own_model_in_5_minutes')}
        </div>
      </div>
      <div className="h-[340px]  pt-4 pl-10">
        <div className="relative flex pt-6">
          <div className="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
          <div className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white">
            1
          </div>
          <div className="ml-4">
            <div className="-mt-1 text-base font-medium">
              {t('lab:select_dataset')}
            </div>
            <span className="text-xs">{t('lab:covering_datasets')}</span>
          </div>
        </div>
        <div className="relative flex pt-6">
          <div className="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
          <div className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white">
            2
          </div>
          <div className="ml-4 w-[300px]">
            <div className="-mt-1 text-base font-medium">
              {t('lab:select_metrics')}
            </div>
            <span className="text-xs">
              {t('lab:metrics_in_three_dimensions')}
            </span>
          </div>
        </div>
        <div className="relative flex pt-6">
          <div className="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
          <div className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white">
            3
          </div>
          <div className="ml-4">
            <div className="-mt-1 text-base font-medium">
              {t('lab:select_algorithm')}
            </div>
            <span className="text-xs">{t('lab:support_AHP')}</span>
          </div>
        </div>
        <div className="relative flex pt-6">
          <div className="absolute -top-[16px] left-[8px] h-10 w-0.5 bg-[#e5e5e5]"></div>
          <div className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white">
            4
          </div>
          <div className="ml-4">
            <div className="-mt-1 text-base font-medium">
              {t('lab:release_model')}
            </div>
            <span className="text-xs">{t('lab:expose_the_model')}</span>
          </div>
        </div>
      </div>
      <div
        className="mx-6 flex h-10 cursor-not-allowed items-center justify-center bg-[#000000] text-white hover:bg-[#d1d5db]"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {hover ? 'coming soon' : t('lab:create_a_model_now')}
      </div>
    </div>
  );
};

export default CreateModel;
