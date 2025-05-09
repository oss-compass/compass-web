import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { GoRepoPush } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
const MerticPage = () => {
  const { t } = useTranslation();
  const submit = (
    <>
      <p>{t('academe:submit_application_desc1')}</p>
      <p>{t('academe:submit_application_desc2')}</p>
      <ul className="my-2">
        <li className="ml-4 list-disc">
          {t('academe:submit_application_desc3')}
        </li>
        <li className="ml-4 list-disc">
          {t('academe:submit_application_desc4')}
        </li>
      </ul>
      <p>{t('academe:submit_application_desc7')}</p>
    </>
  );
  const release = (
    <>
      <p>{t('academe:release_desc1')} </p>
      <ul className="my-2">
        <li className="ml-4 list-disc">{t('academe:release_desc2')}</li>
        <li className="ml-4 list-disc">{t('academe:release_desc3')}</li>
      </ul>
    </>
  );
  const merticList = [
    {
      name: 'push',
      title: '贡献量',
      url: '/push',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="mt-[1px] text-xl" />,
    },
    {
      name: 'contributors',
      title: '开发者',
      url: '/contributor',
      desc: '开源开发者统计包括活跃开发者和新增开发者，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
    {
      name: 'repositories',
      title: '开源项目',
      url: '/push',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
    {
      name: 'license',
      title: 'License',
      url: '/push',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
    {
      name: 'language',
      title: '编程语言',
      url: '/push',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
    {
      name: 'topics',
      title: '技术领域',
      url: '/topics',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
    {
      name: 'OSS import and export',
      title: '开源进出口',
      url: '/push',
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="text-xl" />,
    },
  ];
  return (
    <>
      <div className="mb-8 text-2xl font-medium">指标</div>
      <div className="mx-auto grid w-[1200px] grid-cols-3 gap-6 pb-16 md:grid-cols-1 lg:w-full lg:grid-cols-2 lg:px-4">
        {merticList.map((item, index) => {
          return (
            <div
              key={item.name}
              className="flex cursor-pointer flex-col rounded border py-8 px-12 shadow hover:shadow-xl md:gap-4"
            >
              <div className="mt-2 flex items-center">
                {item.icon}
                <span className="ml-4 text-xl font-semibold">{item.title}</span>
              </div>
              <div className="line-clamp-3 mt-4 h-[72px] text-base leading-6 text-[#7b7c86]">
                {item.desc}
              </div>
              <div className="mt-8 flex items-center gap-2 font-semibold text-[#5d5fef]">
                View <IoIosArrowForward className="mt-[1px]" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MerticPage;
