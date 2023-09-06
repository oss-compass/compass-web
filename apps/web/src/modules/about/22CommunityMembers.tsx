import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Grid } from '@modules/about/components';
import MemberCard from '@modules/about/components/MemberCard';

const CommunityMembers = () => {
  const { t } = useTranslation();
  const data = [
    {
      avatar: '/images/about/秦一帆.jpg',
      name: '秦一帆',
      intro: '奇科厚德数据工程师，负责开源数据收集整理归档',
    },
    {
      avatar: '/images/about/邱睿桥.jpeg',
      name: '邱睿桥',
      intro: '北京大学计算机学院软件研究所在读博士研究生',
    },
    {
      avatar: '/images/about/桑百惠@2x.png',
      name: '桑百惠',
      intro:
        '南京大学计算机软件研究所博士研究生在读，主要研究方向为开源软件协作的行为识别',
    },
    {
      avatar: '/images/about/王雅薪@2x.png',
      name: '王雅薪',
      intro: '南京大学计算机系软件所在读研究生',
    },
    {
      avatar: '/images/about/吴向臣@2x.png',
      name: '吴向臣',
      intro: '河海大学信息学院模式识别与智能系统在读研究生',
    },
    {
      avatar: '/images/about/杨文昊.jpeg',
      name: '杨文昊',
      intro: '北京大学计算机学院软件研究所在读博士研究生',
    },
    {
      avatar: '/images/about/张洁芮@2x.png',
      name: '张洁芮',
      intro: '南京大学软件所交叉前沿中心 研究生',
    },
    {
      avatar: '/images/about/庄宇乾@2x.png',
      name: '庄宇乾',
      intro: '南京大学计算机系软件所在读博士研究生，研究方向为计算机软件与理论',
    },
  ];

  return (
    <>
      <div className="mb-6 font-medium">{t('about:community_members')}</div>
      <div className="mb-10 bg-[#fafafa] py-10 px-16 ">
        <div className="mb-4 text-xs font-medium">
          {t('about:organization_member')}
        </div>
        <div className="mb-8">
          <Image
            src={'/images/about/国家金融科技测评中心@2x.png'}
            width={201}
            height={40}
            alt={'国家金融科技测评中心'}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="mb-4 text-xs font-medium">
          {t('about:individual_members')}
        </div>
        <Grid className="">
          {data.map((item) => {
            return <MemberCard key={item.name} {...item} />;
          })}
        </Grid>
      </div>
    </>
  );
};

export default CommunityMembers;
