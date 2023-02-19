import Header from '@common/components/Header';
import Banner from './Banner';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { AiOutlinePlusSquare, AiFillGithub } from 'react-icons/ai';
import Collections from './Collections';

const Explore = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <Banner content={t('common:header.explore')} />
        <div className="mx-auto w-[1280px] pb-20 pt-10 md:w-full">
          {/*<div className="flex justify-between py-7">*/}
          {/*  <div className="text-2xl">Collections</div>*/}
          {/*  <AiOutlinePlusSquare*/}
          {/*    className="cursor-pointer text-3xl text-gray-400"*/}
          {/*    onClick={() => {*/}
          {/*      window.location.href =*/}
          {/*        'https://github.com/oss-compass/compass-projects-information';*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</div>*/}
          <Collections />
        </div>
      </div>
    </>
  );
};

export default Explore;
