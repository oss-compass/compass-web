import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import Chaoss from './assets/chaoss.svg';
import Grimoirelab from './assets/grimoirelab.svg';

const SpecialThank = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50">
      <Center className="flex items-center justify-between py-12 md:flex-col">
        <Link href="https://chaoss.community/" passHref>
          <a target="_blank" rel="noopener noreferrer" className="w-[250px]">
            <Chaoss />
          </a>
        </Link>
        <Link href="https://chaoss.github.io/grimoirelab/" passHref>
          <a target="_blank" rel="noopener noreferrer" className="w-[250px]">
            <Grimoirelab />
          </a>
        </Link>
        <div className="basis-[500px] px-4 md:basis-auto">
          <h2 className="mb-2 text-4xl font-bold">
            {t('home:a_special_thank_you')}
          </h2>
          <p className="font-medium text-gray-500">
            {t('home:oss_compass_follows_the_best_practices_and_specifi')}
          </p>
        </div>
      </Center>
    </div>
  );
};

export default SpecialThank;
