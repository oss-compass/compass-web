import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Title, Grid } from '@modules/about/components';

const SaaSWorkingGroup = () => {
  const { t } = useTranslation();
  const data = [
    {
      avatar: '/images/about/黄超群@2x.png',
      name: '黄超群',
      intro: 'Gitee 前端开发',
    },
    {
      avatar: '/images/about/赖兴友@2x.png',
      name: '赖兴友',
      intro: '开源前端开发',
    },
    {
      avatar: '/images/about/李升保@2x.png',
      name: '李升保',
      intro: '开源软件工程师',
    },
    {
      avatar: '/images/about/罗雅新1@2x.jpeg',
      name: '罗雅新',
      intro: 'Gitee MaNong',
    },
    { avatar: '/images/about/欧阳康@2x.png', name: '欧阳康', intro: 'OSC SRE' },
    {
      avatar: '/images/about/覃华添@2x.png',
      name: '覃华添',
      intro: 'Programmer',
    },
    {
      avatar: '/images/about/王晔晖2@2x.png',
      name: '王晔晖',
      intro: '华为 2012 实验室 开源管理中心',
    },
    {
      avatar: '/images/about/魏宏斌.jpeg',
      name: '魏宏斌',
      intro: 'Programmer',
    },
    {
      avatar: '/images/about/张盛翔2@2x.png',
      name: '张盛翔',
      intro: 'Gitee 开源社区产品负责人',
    },
    { avatar: '/images/about/钟峰@2x.png', name: '钟峰', intro: 'Designer' },
  ];

  return (
    <div>
      <Title>{t('about:saas_working_group')}</Title>

      <Grid className=" bg-[#fafafa] py-10 px-16">
        {data.map((item) => {
          return (
            <div className="flex" key={item.name}>
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={item.avatar}
                  width={48}
                  height={48}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-1 text-sm font-medium">{item.name}</div>
                <div className="text-xs">{item.intro}</div>
              </div>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default SaaSWorkingGroup;
