import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import Coutact from './Coutact';

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
        <Coutact />
      </div>
    </>
  );
};

export default SubmitApplication;
