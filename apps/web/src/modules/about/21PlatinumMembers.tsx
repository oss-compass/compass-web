import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Grid } from '@modules/about/components';

const PlatinumMembers = () => {
  const { t } = useTranslation();
  const data = [
    {
      name: '工信安全',
      logo: '/images/about/工信安全@2x.png',
      width: 148,
      height: 28,
    },
    {
      name: 'OSCHINA',
      logo: '/images/about/OSCHINA@2x.png',
      width: 141,
      height: 40,
    },
    {
      name: '南大',
      logo: '/images/about/南大@2x.png',
      width: 113,
      height: 35,
    },
    {
      name: '华为',
      logo: '/images/about/华为@2x.png',
      width: 146,
      height: 32,
    },
    {
      name: '北大',
      logo: '/images/about/北大@2x.png',
      width: 130,
      height: 36,
    },
    {
      name: 'OpenI',
      logo: '/images/about/OpenI@2x.png',
      width: 121,
      height: 48,
    },
    {
      name: 'baidu',
      logo: '/images/about/baidu@2x.png',
      width: 112,
      height: 38,
    },
    {
      name: 'tencent',
      logo: '/images/about/tencent@2x.png',
      width: 164,
      height: 46,
    },
  ];
  return (
    <>
      <div className="mb-6 font-medium">{t('about:platinum_members')}</div>
      <Grid className="mb-10 grid-cols-4 bg-[#fafafa] py-10 px-16">
        {data.map((item) => {
          return (
            <div key={item.name} className="flex items-center justify-center">
              <Image
                src={item.logo}
                width={item.width}
                height={item.height}
                alt={item.name}
              />
            </div>
          );
        })}
      </Grid>
    </>
  );
};

export default PlatinumMembers;
