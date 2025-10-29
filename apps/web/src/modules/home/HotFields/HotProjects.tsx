import React from 'react';
import { useTranslation } from 'react-i18next';
import jsonData from '@public/data/collections.json';
import classnames from 'classnames';
import ProjectItem from './ProjectItem';
import { useBulkShortenedLabelQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const CustomTabPanel = (props: { value: string; ident: string }) => {
  const { value, ident } = props;
  const { items } = jsonData[ident];
  const labels = items.map((i: string) => {
    return { label: i, level: 'repo' };
  });

  const { data, isLoading } = useBulkShortenedLabelQuery(client, {
    labels,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col bg-white pt-2">
        <div className="animate-pulse">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-1 rounded "></div>
              <div className="col-span-1 h-1 rounded "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div hidden={value !== ident}>
      <div className="grid h-[220px] flex-1 grid-cols-2 gap-1 overflow-y-auto pt-2">
        {data?.bulkShortenedLabel.map((i) => {
          return (
            <ProjectItem shortCode={i.shortCode} url={i.label} key={i.label} />
          );
        })}
      </div>
    </div>
  );
};

const HotProjects = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState('open-source-llms-tools');
  // const data = {
  //   LLM: 'open-source-llms',
  //   'Computer Vision': 'computer-vision-face-recognition',
  //   NLP: {
  //     ident: 'deep-learning-framework',
  //     name: 'Deep Learning Framework',
  //     name_cn: '深度学习框架',
  //   },
  // };

  const list = [
    // {
    //   ident: 'open-source-llms',
    //   name: 'Open Source LLMs',
    //   name_cn: '开源LLMs',
    // },
    {
      ident: 'open-source-llms-tools',
      name: 'Open Source LLMs Tools',
      name_cn: '开源LLMs工具',
    },
    {
      ident: 'deep-learning-framework',
      name: 'Deep Learning Framework',
      name_cn: '深度学习框架',
    },
  ];
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">{t('home:hot_projects')}</div>
      <div className="h-[318px] rounded border px-6 py-5 text-[#868690] shadow">
        <div className="mb-3 flex max-h-[50px] justify-evenly text-center">
          {list.map(({ ident, name, name_cn }) => {
            return (
              <div
                className={classnames(
                  'flex w-[50%] cursor-pointer items-center justify-center border-b border-[#EBEFF4] pb-4 font-bold',
                  {
                    'border-[#868690] text-black': value === ident,
                  }
                )}
                key={ident}
                onClick={() => {
                  setValue(ident);
                }}
              >
                {i18n.language === 'en' ? name : name_cn}
              </div>
            );
          })}
        </div>
        {list.map(({ ident }) => {
          return <CustomTabPanel key={ident} value={value} ident={ident} />;
        })}
      </div>
    </div>
  );
};

export default HotProjects;
