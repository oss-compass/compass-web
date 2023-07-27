import React from 'react';
import { useTranslation } from 'next-i18next';
import { Title } from '@modules/about/components';
import { Grid } from '@modules/about/components/Grid';
import MemberCard from '@modules/about/components/MemberCard';

const data = [
  {
    avatar: '/images/about/汪亮2@2x.png',
    name: '汪亮',
    intro: '南京大学计算机科学与技术系副教授',
  },
  {
    avatar: '/images/about/王晔晖2@2x.png',
    name: '王晔晖',
    intro: '华为 2012 实验室 开源管理中心',
  },
  {
    avatar: '/images/about/张盛翔2@2x.png',
    name: '张盛翔',
    intro: 'Gitee 开源社区产品负责人',
  },
];

const TechnicalCommittee = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title id="technical-committee">{t('about:technical_committee')}</Title>

      <Grid className=" bg-[#fafafa] py-10 px-16">
        {data.map((item) => {
          return <MemberCard key={item.name} {...item} />;
        })}
      </Grid>
    </div>
  );
};

export default TechnicalCommittee;
