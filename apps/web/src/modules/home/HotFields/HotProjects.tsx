import React from 'react';
import { useTranslation } from 'react-i18next';
import jsonData from '@public/data/collections.json';
import classnames from 'classnames';
import ProjectItem from './ProjectItem';
import { useBulkShortenedLabelQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const CustomTabPanel = (props: {
  value: string;
  label: string;
  ident: string;
}) => {
  const { value, label, ident } = props;
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
    <div hidden={value !== label}>
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
  const { t } = useTranslation();
  const [value, setValue] = React.useState('LLM');
  const data = {
    LLM: 'open-source-llms',
    'Computer Vision': 'computer-vision-face-recognition',
    NLP: 'nlp',
  };
  const list = Object.keys(data);
  return (
    <div>
      <div className="mb-6 text-2xl font-bold">{t('home:hot_projects')}</div>
      <div className="h-[318px] rounded border px-6 py-5 text-[#868690] shadow">
        <div className="mb-3 flex justify-evenly">
          {list.map((i, index) => {
            return (
              <div
                className={classnames(
                  'w-44 cursor-pointer border-b border-[#EBEFF4] pb-4 text-center font-bold',
                  {
                    'border-[#868690] text-black': value === i,
                  }
                )}
                key={i}
                onClick={() => {
                  setValue(i);
                }}
              >
                {i}
              </div>
            );
          })}
        </div>
        {list.map((i) => {
          return (
            <CustomTabPanel key={i} value={value} label={i} ident={data[i]} />
          );
        })}
      </div>
    </div>
  );
};

export default HotProjects;
