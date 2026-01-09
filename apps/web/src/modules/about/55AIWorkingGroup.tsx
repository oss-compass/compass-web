import React from 'react';
import { useTranslation } from 'next-i18next';
import { Title, Grid } from '@modules/about/components';
import MemberCard from '@modules/about/components/MemberCard';

const data = [
  {
    avatar: '/images/about/齐国强@2x.png',
    name: '齐国强',
    intro: '华为 2012 实验室',
  },
  {
    avatar: '/images/about/朱家顺.jpg',
    name: '朱家顺',
    intro: '吉林大学计算机学院在读研究生',
  },
  {
    avatar: '/images/about/冉丰源.jpg',
    name: '冉丰源',
    intro: '北京大学计算机学院软件研究所在读博士研究生',
  },
  {
    avatar: '/images/about/代睿祺.jpg',
    name: '代睿祺',
    intro: '北京邮电大学网络空间安全学院在读研究生',
  },
  {
    avatar: '/images/about/王雷.jpg',
    name: '王雷',
    intro: '中国科学技术大学信息学院研究生',
  },
];

const AIWorkingGroup = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title>{t('about:ai_working_group')}</Title>

      <Grid className="bg-[#fafafa] px-16 py-10">
        {data.map((item) => {
          return <MemberCard key={item.name} {...item} />;
        })}
      </Grid>
    </div>
  );
};

export default AIWorkingGroup;
