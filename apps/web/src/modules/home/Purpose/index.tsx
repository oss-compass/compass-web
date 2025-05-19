import React, { useState } from 'react';
import Svg1 from './assets/icon1.svg';
import Svg2 from './assets/icon2.svg';
import Svg3 from './assets/icon3.svg';
import Svg4 from './assets/icon4.svg';
import { Modal } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { useTranslation, Trans } from 'next-i18next';
import LinkX from '@common/components/LinkX';

const Purpose = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('manage');

  const items = [
    {
      title: t('home:data_decision'),
      desc: t('home:data_decision_desc'),
      icon: <Svg2 className="h-full w-full object-contain" />,
    },
    {
      title: t('home:academic_research'),
      desc: t('home:academic_research_desc'),
      icon: <Svg3 className="h-full w-full object-contain" />,
    },
    {
      title: t('home:software_selection'),
      desc: t('home:software_selection_desc'),
      icon: <Svg4 className="h-full w-full object-contain" />,
    },
    {
      key: 'manage',
      title: t('home:open_source_manage'),
      desc: t('home:open_source_manage_desc'),
      icon: (
        <Svg1 className="h-full w-full" preserveAspectRatio="xMidYMid meet" />
      ),
      case: {
        name: 'openeuler',
        url: '/images/academe/openeuler.svg',
        title: t('academe:openeuler_title'),
        desc: (
          <ul className="h-full w-full">
            <li className="ml-4 mb-2 list-disc">
              {t('academe:openeuler_author')}
            </li>
            <li className="ml-4 mb-2 list-disc">
              <div className="">{t('academe:openeuler_desc1')}</div>
            </li>
            <li className="ml-4 list-disc">
              {t('academe:openeuler_desc2')}
              <a
                className="text-[#002fa7]"
                href={'https://gitee.com/openeuler/docs-accompany-reading'}
              >
                https://gitee.com/openeuler/docs-accompany-reading
              </a>
            </li>
          </ul>
        ),
        content: (
          <div className="flex h-full w-full justify-center">
            <video
              controls
              autoPlay={false}
              className="max-h-[100%]"
              // maxHeight={'100%'}
              // width={'100%'}
              src={'/images/academe/case/openeuler.mp4'}
            ></video>
          </div>
        ),
        experience: null,
        experienceUrl: 'https://docs.openeuler.org/',
      },
    },
  ];
  const activeCase = items.find((item) => item.key === active).case;

  return (
    <>
      <section className="mx-auto grid w-[1200px] grid-cols-4 gap-x-6 pb-16 md:grid-cols-1 md:gap-y-6 lg:w-full lg:px-4">
        {items.map((i, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center rounded-lg border p-8"
            onClick={() => {
              setOpen(true);
              // setActive(i.key);
            }}
          >
            <div className="h-[100px] w-[100px]">{i.icon}</div>
            <div className="mt-4 text-xl font-semibold">{i.title}</div>
            <div className="mt-4 text-base">{i.desc}</div>
          </div>
        ))}
      </section>
      {/* {open && (
        <section className="mx-auto grid w-[1200px]  pb-16 lg:w-full lg:px-4">
          <div className="mb-10  border border-[#CFCFCF] p-8 ">
            <div className="flex items-center md:flex-col">
              <div className="mb-4 w-[550px] pl-2 md:w-full">
                <div className="text-xl font-semibold">{activeCase.title}</div>
                <div className="mt-2 w-[550px] text-sm md:w-full">
                  {activeCase.desc}
                </div>
                {activeCase?.experienceUrl && (
                  <div
                    onClick={() => {
                      window.open(activeCase.experienceUrl);
                    }}
                    className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
                  >
                    {t('academe:experience_immediately')}
                  </div>
                )}
                {activeCase.experience && activeCase.experience}
              </div>
              <div className="ml-16 flex h-[280px] flex-1 items-center">
                {activeCase.content}
              </div>
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
    <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
      <div
        className="absolute top-10 right-10 cursor-pointer p-2 "
        onClick={() => {
          setOpen(false);
        }}
      >
        <GrClose />
      </div>

      <div className="px-10 pt-8 md:px-2"></div>
    </div>
  </Modal>
        </section>
      )} */}
    </>
  );
};

export default Purpose;
