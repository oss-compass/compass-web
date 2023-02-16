import React from 'react';
import { useTranslation } from 'next-i18next';
import { Title } from '@modules/about/components';
import PlatinumMembers from './21PlatinumMembers';
import CommunityMembers from './22CommunityMembers';
import Partners from './23Partners';

const Members = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title>{t('about:members')}</Title>
      <PlatinumMembers />
      <CommunityMembers />
      <Partners />
    </div>
  );
};

export default Members;
