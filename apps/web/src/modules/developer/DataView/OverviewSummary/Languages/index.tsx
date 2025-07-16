import React from 'react';
import { useTranslation } from 'next-i18next';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';
import Languages from './Languages';

interface LanguageData {
  language: string;
  contribution: number;
  ratio: number;
}

const Main = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useContributorApi<LanguageData[]>(
    '/api/v2/contributor_portrait/contributor_language',
    'contributor_language'
  );
  return (
    <BaseCard
      title={t('developer:contributor_language')}
      id="contributor_language"
      loading={isLoading}
      isEmpty={!data || data.length === 0}
      description=""
      className="h-[300px]"
      bodyClass="h-[240px]"
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
          />
        </>
      )}
    >
      {() => <Languages data={data} />}
    </BaseCard>
  );
};

export default Main;
