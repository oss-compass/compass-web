import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { AiOutlinePlusSquare, AiFillGithub } from 'react-icons/ai';

const testRepos = [
  {
    label: 'https://github.com/LAION-AI/Open-Assistant',
  },
  {
    label: 'https://github.com/acheong08/ChatGPT',
  },
  {
    label: 'https://github.com/sindresorhus/awesome',
  },
];

const CollectionCard = () => {
  return (
    <div className=" rounded-xl bg-white p-7">
      <div className="flex">
        <div className="">
          <div className="text-xl font-medium">Virtual Reality</div>
          <div className="mb-4 text-[#868690]">24 repositories</div>
          <div className="text-sm font-medium">Recently</div>
          <div className="mt-2">
            <div className="text-sm">Furion</div>
            <div className="text-sm">tensorboard</div>
            <div className="text-sm">Apache ShardingSphere</div>
            <div className="text-sm">ossinsight</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col pl-5">
          <div className="flex space-x-2">
            {['Keyword1', 'Keyword2', 'Keyword3', 'Keyword3'].map((k) => {
              return (
                <div
                  key={k}
                  className="rounded-md bg-[#F4F4F4] px-2 text-sm text-[#868690]"
                >
                  {k}
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 items-end space-x-6 ">
            {testRepos.map((repo) => {
              return (
                <div key={repo.label} className="h-32 w-full border p-6">
                  <p></p>
                  <p></p>
                  <div>
                    <div>
                      <AiFillGithub />
                    </div>
                    <div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end text-xs underline">
        More repositories
      </div>
    </div>
  );
};

const Explore = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <Banner content={t('common:header.explore')} />
        <div className="mx-auto w-[1280px]  pb-20 md:w-full">
          <div className="flex justify-between py-7">
            <div className="text-2xl">Collections</div>
            <AiOutlinePlusSquare className="text-3xl text-gray-400" />
          </div>
          <CollectionCard />
        </div>
      </div>
    </>
  );
};

export default Explore;
