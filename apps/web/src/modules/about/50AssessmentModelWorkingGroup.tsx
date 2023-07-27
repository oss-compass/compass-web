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
    avatar: '/images/about/单晨琪@2x.png',
    name: '单晨琪',
    intro: '开源工程师、LF CHAOSS Maintainer',
  },
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
    avatar: '/images/about/钟君@2x.png',
    name: '钟君',
    intro: 'CHAOSS Metrics Model Working Group Maintainer',
  },
  {
    avatar: '/images/about/张盛翔2@2x.png',
    name: '张盛翔',
    intro: '开源社区产品负责人',
  },
];

const AssessmentModelWorkingGroup = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-20">
      <Title>{t('about:assessment_model_working_group')}</Title>

      <Grid className="bg-[#fafafa] py-10 px-16">
        {data.map((item) => {
          return <MemberCard key={item.name} {...item} />;
        })}
      </Grid>
    </div>
  );
};

export default AssessmentModelWorkingGroup;
