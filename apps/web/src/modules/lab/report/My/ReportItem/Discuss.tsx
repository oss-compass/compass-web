import React, { useState } from 'react';
import Link from 'next/link';
import { first } from 'lodash';
import { useTranslation } from 'next-i18next';
import { TbMessage2 } from 'react-icons/tb';
import { MyModelVersion } from '@oss-compass/graphql';
import { getLabRange } from '@modules/lab/utils';

const Discuss = ({ model }: { model: MyModelVersion }) => {
  const { t } = useTranslation();
  const modelId = model?.modelId;
  const versionId = model?.versionId;
  const firstRepo = first(model?.datasetStatus?.items);
  return (
    <div className="flex gap-1">
      <Link
        className="hover:bg-smoke flex shrink-0 cursor-pointer items-center p-2 md:hidden"
        href={`/lab/model/${modelId}/version/${versionId}/analyze/${
          firstRepo?.shortCode
        }?range=${getLabRange(model.metrics)}`}
      >
        <TbMessage2 className="text-steel" />
        <span className="ml-1 text-xs">{t('lab:discuss')}</span>
      </Link>
    </div>
  );
};

export default Discuss;
