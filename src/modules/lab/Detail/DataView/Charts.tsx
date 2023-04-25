import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import StarterProjectHealthIndex from './StarterProjectHealthIndex';
import ChartsDataProvider from '@modules/lab/context/ChartsDataProvider';

const Charts = () => {
  const { t } = useTranslation();

  return (
    <ChartsDataProvider>
      <div className="mb-4">
        <StarterProjectHealthIndex />
      </div>
    </ChartsDataProvider>
  );
};

export default Charts;
