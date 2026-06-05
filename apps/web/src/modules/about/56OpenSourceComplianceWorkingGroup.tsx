import React from 'react';
import { useTranslation } from 'next-i18next';
import { Grid, Title } from '@modules/about/components';
import MemberCard from '@modules/about/components/MemberCard';

const data = [
  {
    avatar: '/images/about/开源合规-郑子彬.png',
    name: '郑子彬',
    intro: '中山大学软件工程学院院长 教授',
  },

  {
    avatar: '/images/about/开源合规-吴炜滨.jpeg',
    name: '吴炜滨',
    intro: '中山大学软件工程学院 副教授',
  },
  {
    avatar: '/images/about/开源合规-周鑫.jpeg',
    name: '周鑫',
    intro: '南京大学 软件学院 副研究员',
  },
  {
    avatar: '/images/about/开源合规-李自.jpeg',
    name: '李自',
    intro: '华为 2012实验室 开源管理中心',
  },
  {
    avatar: '/images/about/开源合规-闫宣辰.jpg',
    name: '闫宣辰',
    intro: '华为 2012实验室 开源管理中心',
  },
  {
    avatar: '/images/about/开源合规-刘瑜轩.jpg',
    name: '刘瑜轩',
    intro: '华为 2012实验室 开源管理中心',
  },
];

const OpenSourceComplianceWorkingGroup = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-20">
      <Title>{t('about:open_source_compliance_working_group')}</Title>

      <Grid className="bg-[#fafafa] px-16 py-10">
        {data.map((item) => {
          return <MemberCard key={item.name} {...item} />;
        })}
      </Grid>
    </div>
  );
};

export default OpenSourceComplianceWorkingGroup;
