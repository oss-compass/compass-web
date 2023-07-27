import React from 'react';
import Image from 'next/image';
import { Grid } from '@modules/about/components';
import { useTranslation } from 'next-i18next';

const Partners = () => {
  const { t } = useTranslation();
  const data = [
    {
      name: 'CHAOSS',
      logo: '/images/about/CHAOSS@2x.png',
      width: 119,
      height: 24,
    },
    {
      name: '开源社',
      logo: '/images/about/开源社@2x.png',
      width: 95,
      height: 32,
    },
    {
      name: '开源雨林',
      logo: '/images/about/开源雨林@2x.png',
      width: 115,
      height: 32,
    },
  ];

  return (
    <>
      <div className="mb-6 font-medium">{t('about:partners')}</div>
      <Grid className="mb-10 bg-[#fafafa] py-10 px-16">
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

export default Partners;
