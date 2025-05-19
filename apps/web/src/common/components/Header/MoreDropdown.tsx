import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoPeopleSharp } from 'react-icons/io5';
import { RiLineChartLine } from 'react-icons/ri';
import { AiOutlineSelect } from 'react-icons/ai';
import { GoMirror } from 'react-icons/go';

const MoreDropdown = () => {
  const { t } = useTranslation();

  // 服务数组
  const services = [
    {
      icon: (
        <HiOutlineDocumentReport color="#ffd949" className="mr-2 text-4xl" />
      ),
      title: t('common:header.opensource_assessment_service'),
      description: t('common:header.opensource_assessment_description'),
      link: '/',
      linkText: t('common:header.home_input_experience'),
    },
    {
      icon: <IoPeopleSharp color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.developer_influence_service'),
      description: t('common:header.developer_influence_description'),
      link: '/',
      linkText: t('common:header.home_input_experience'),
    },
    {
      icon: <RiLineChartLine color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_insight_service'),
      description: t('common:header.opensource_insight_description'),
      link: '/os-situation',
      linkText: t('common:header.product_home'),
    },
    {
      icon: <AiOutlineSelect color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_selection_service'),
      description: t('common:header.opensource_selection_description'),
      link: '/os-situation',
      linkText: t('common:header.product_home'),
    },
    {
      icon: <GoMirror color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_research_service'),
      description: t('common:header.opensource_research_description'),
      link: '/dataHub',
      linkText: t('common:header.product_home'),
    },
  ];

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333] xl:mx-1 2xl:px-4">
        <a className={'font-medium text-white'}>
          {t('common:header.all_services')}
        </a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>
      <div className="z-dropdown invisible fixed top-[82px] left-0 max-h-[calc(100%-80px)] w-[100vw] bg-black/95 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
        <div className="mx-auto w-[1200px] pb-16 text-white md:w-full md:px-4 lg:w-full lg:px-10">
          <div className="my-6 text-[#c1c1c1]">
            {t('common:header.five_services')}
          </div>
          <div className="grid grid-cols-4 gap-8 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8">{service.icon}</div>
                <Link href={service.link}>
                  <div className="cursor-pointer">
                    <div className="mb-3 text-base hover:text-[#597ef7]">
                      {service.title}
                    </div>
                    <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                      {service.description}
                    </div>
                    <div className="text-[#8ba5f9]">{service.linkText}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDropdown;
