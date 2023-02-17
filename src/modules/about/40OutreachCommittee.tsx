import React from 'react';
import Image from 'next/image';
import { Title } from '@modules/about/components';
import { Grid } from './components';
import MemberCard from '@modules/about/components/MemberCard';
import { useTranslation } from 'next-i18next';

const data = [
  {
    avatar: '/images/about/龚宇华@2x.png',
    name: '龚宇华',
    intro: '华为开源运营专家',
  },
  {
    avatar: '/images/about/李萌@2x.png',
    name: '李萌',
    intro: '开源中国社区负责人',
  },
  {
    avatar: '/images/about/林日华@2x.png',
    name: '林日华',
    intro: 'OSCHINA 社区内容负责人',
  },
  {
    avatar: '/images/about/吴萍@2x.png',
    name: '吴萍',
    intro: '华为开源管理中心',
  },
];

const OutreachCommittee = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title id={'outreach-committee'}>{t('about:outreach_committee')}</Title>

      <Grid className=" bg-[#fafafa] py-10 px-16">
        {data.map((item) => {
          return <MemberCard key={item.name} {...item} />;
        })}
      </Grid>
    </div>
  );
};

export default OutreachCommittee;
