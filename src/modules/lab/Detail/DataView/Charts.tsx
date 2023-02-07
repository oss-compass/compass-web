import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import CollaborationDevelopmentIndex from '@modules/analyze/DataView/CollaborationDevelopmentIndex';
import ChartsDataProvider from '@modules/analyze/context/ChartsDataProvider';

const Charts = () => {
  const { t } = useTranslation();

  return (
    <ChartsDataProvider>
      <div className="mb-4">
        <CollaborationDevelopmentIndex />
      </div>
    </ChartsDataProvider>
  );
};

export default Charts;
