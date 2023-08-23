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

  const modelId = model?.modelId;
  const versionId = model?.versionId;
  const firstRepo = first(model?.dataset?.items);

  return (
    <Link
      className="flex shrink-0 cursor-pointer items-center md:hidden"
      href={`/lab/model/${modelId}/version/${versionId}/analyze/${firstRepo.shortCode}`}
    >
      <TbMessage2 className="text-steel" />
      <span className="ml-1 text-xs">{t('lab:discuss')}</span>
    </Link>
  );
};

export default Discuss;
