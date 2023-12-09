import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';

const SubmitApplication = () => {
  const { t } = useTranslation();
  const bg = {
    backgroundImage: "url('/images/academe/bg-banner@2x.jpg')",
    backgroundSize: '100% 100%',
  };
  return (
    <>
      <div
        style={bg}
        className={classnames(
          'flex h-[224px] flex-col items-center justify-center border p-8'
        )}
      >
        <div className="mb-8 flex justify-center bg-gradient-to-r from-[#49B821] to-[#27AEAB] bg-clip-text text-center text-2xl font-semibold text-transparent">
          {t('academe:discuss_the_evolution')}
        </div>
        <div
          className="h-10 cursor-pointer bg-gradient-to-r from-[#72D74F] to-[#27AE65] px-4 text-center text-sm leading-10 text-[#fff]"
          onClick={() => {
            // router.push('/lab/model/create');
          }}
        >
          <a href="mailto:contact@oss-compass.org">
            {t('academe:submit_your_application_now')}
          </a>
        </div>
      </div>
    </>
  );
};

export default SubmitApplication;
