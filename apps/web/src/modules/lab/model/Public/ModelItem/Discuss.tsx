import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { first } from 'lodash';
import { useTranslation } from 'next-i18next';
import { TbMessage2 } from 'react-icons/tb';
import { ModelPublicOverview } from '@oss-compass/graphql';

const Discuss = ({ model }: { model: ModelPublicOverview }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <a
      className="flex shrink-0 cursor-pointer items-center md:hidden"
      // href={`/lab/model/${modelId}/version/${versionId}/analyze/${firstRepo.shortCode}`}
    >
      <TbMessage2 className="text-steel" />
      <span className="ml-1 text-xs">{t('lab:discuss')}</span>
    </a>
  );
};

export default Discuss;
