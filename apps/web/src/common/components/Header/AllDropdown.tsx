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
      icon: <RiLineChartLine color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_insight_service'),
      description: t('common:header.opensource_insight_description'),
      linkItems: [
        {
          link: '/os-situation',
          linkText: t('common:header.product_home'),
        },
      ],
    },
    {
      icon: <AiOutlineSelect color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_selection_service'),
      description: t('common:header.opensource_selection_description'),
      linkItems: [
        {
          link: '/os-selection',
          linkText: t('common:header.product_home'),
        },
      ],
    },
    {
      icon: <IoPeopleSharp color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.developer_influence_service'),
      description: t('common:header.developer_influence_description'),
      linkItems: [
        { link: '/', linkText: t('common:header.home_input_experience') },
      ],
    },
    {
      icon: (
        <HiOutlineDocumentReport color="#ffd949" className="mr-2 text-4xl" />
      ),
      title: t('common:header.opensource_assessment_service'),
      description: t('common:header.opensource_assessment_description'),
      linkItems: [
        {
          link: '/',
          linkText: t('common:header.home_input_experience'),
        },
      ],
    },
    {
      icon: <GoMirror color="#ffd949" className="mr-2 text-4xl" />,
      title: t('common:header.opensource_research_service'),
      description: t('common:header.opensource_research_description'),
      linkItems: [
        {
          link: '/dataHub',
          linkText: t('common:header.product_home'),
        },
        {
          link: 'https://oss-compass.isrc.ac.cn/',
          linkText: t('common:header.mirror_site_of_iscas'),
          target: '_blank',
        },
        {
          link: 'https://oss-compass.osslab-pku.org/',
          linkText: t('common:header.mirror_site_of_pku'),
          target: '_blank',
        },
      ],
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
          <div className="mt-12 grid grid-cols-4 gap-8 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8">{service.icon}</div>
                <div className="cursor-pointer">
                  <div className="mb-3 text-base hover:text-[#597ef7]">
                    <Link href={service.linkItems[0].link}>
                      {service.title}
                    </Link>
                  </div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    {service.description}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-[#8ba5f9]">
                    {service.linkItems.map((linkItem) => (
                      <Link
                        key={linkItem.link}
                        href={linkItem.link}
                        target={linkItem.target}
                      >
                        <div>{linkItem.linkText}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDropdown;
