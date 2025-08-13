import React, { useState } from 'react';
import Svg1 from './assets/icon1.svg';
import Svg2 from './assets/icon2.svg';
import Svg3 from './assets/icon3.svg';
import Svg4 from './assets/icon4.svg';
import { Modal } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'next-i18next';
import CooperationCase from './CooperationCase';
import LinkX from '@common/components/LinkX';
import Experience from './Experience';

const Purpose = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [active, setActive] = useState('dataDecision');

  const items = [
    {
      key: 'dataDecision',
      title: t('home:data_decision'),
      desc: t('home:data_decision_desc'),
      icon: <Svg2 className="h-full w-full object-contain" />,
      case: [
        {
          name: 'bigscreen',
          url: '/images/academe/case/atom.svg',
          pngWidth: 170,
          pngHeight: 50,
          title: t('academe:atom_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:atom_desc')}</div>
              </li>
            </ul>
          ),
          content: (
            <img
              alt="png"
              className="h-full w-full"
              src={'/images/academe/case/软件所.png'}
            />
          ),
          experienceUrl: 'https://oss-compass-insight.openatom.cn/',
        },
      ],
    },
    {
      key: 'academicResearch',
      title: t('home:academic_research'),
      desc: t('home:academic_research_desc'),
      icon: <Svg3 className="h-full w-full object-contain" />,
      case: [
        {
          name: 'oss_selection',
          url: '/images/academe/logo-nju@2x.png',
          title: t('academe:oss_selection_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:oss_selection_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:oss_selection_author2')}
              </li>
              <li className="ml-4 list-disc">
                {t('academe:oss_selection_desc')}
              </li>
            </ul>
          ),
          content: (
            <img
              className="h-full w-full"
              alt="png"
              src={'/images/academe/case/os-select.png'}
            />
          ),
          experienceUrl: '/os-selection',
        },
        {
          name: 'nju',
          url: '/images/academe/logo-nju@2x.png',
          title: t('academe:nju_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">{t('academe:nju_author')}</li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju_author2')}
              </li>
              <li className="ml-4 list-disc">
                {t('academe:nju_desc')}
                <LinkX
                  href={
                    '/blog/2023/12/06/compass-prediction-activity/compass-prediction-activity'
                  }
                >
                  <span className="text-[#002fa7]">
                    {t('academe:nju_title')}
                  </span>
                </LinkX>
              </li>
            </ul>
          ),
          desc2: t('academe:nju_desc2'),
          content:
            i18n.language === 'en' ? (
              <img
                className="h-full w-full"
                alt="png"
                src={'/images/academe/case/nju_en.png'}
              />
            ) : (
              <img
                className="h-full w-full"
                alt="png"
                src={'/images/academe/case/nju.png'}
              />
            ),
          experience: (
            <Experience open={experienceOpen} setOpen={setExperienceOpen} />
          ),
        },
        {
          name: 'pku1',
          url: '/images/academe/logo-pku@2x.png',
          title: t('academe:pku1_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4  mb-2 list-disc">
                {t('academe:pku1_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku1_author2')}
              </li>
              <li className="ml-4  mb-2 list-disc">
                <div className="">{t('academe:pku1_desc1')}</div>
              </li>
              <li className="ml-4 list-disc">
                {t('academe:pku1_desc2')}
                <a
                  className="text-[#002fa7]"
                  href={'https://github.com/osslab-pku/gfi-bot'}
                >
                  https://github.com/osslab-pku/gfi-bot
                </a>
              </li>
            </ul>
          ),
          content:
            i18n.language === 'en' ? (
              <img
                className="h-full w-full"
                alt="png"
                src={'/images/academe/case/pku1_en.png'}
              />
            ) : (
              <img
                className="h-full w-full"
                alt="png"
                src={'/images/academe/case/pku1_zh.png'}
              />
            ),
        },
        {
          name: 'nju4',
          url: '/images/academe/logo-nju@2x.png',
          title: t('academe:nju4_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju4_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju4_author2')}
              </li>
              <li className="ml-4 list-disc">{t('academe:nju4_desc')}</li>
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
                src={'/images/academe/case/njdx.mp4'}
              ></video>
            </div>
          ),
          contactUrl: 'stly@nju.edu.cn',
          // experienceUrl: 'http://47.120.44.193/#/',
        },
        {
          name: 'pku2',
          url: '/images/academe/logo-pku@2x.png',
          title: t('academe:pku2_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku2_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku2_author2')}
              </li>
              {/* <div className="ml-8 flex list-disc">
                <Trans
                  i18nKey="pku2_author"
                  ns="academe"
                  components={{
                    br: <br />,
                  }}
                />
              </div>
              <div className="ml-8 mb-2 flex list-disc">
                <Trans
                  i18nKey="pku2_author2"
                  ns="academe"
                  components={{
                    br: <br />,
                  }}
                />
              </div> */}
              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:pku2_desc1')}</div>
              </li>
              <li className="ml-4 list-disc">
                {t('academe:pku2_desc2')}
                <a
                  className="text-[#002fa7]"
                  href={'https://github.com/hehao98/MigrationHelper'}
                >
                  https://github.com/hehao98/MigrationHelper
                </a>
              </li>
            </ul>
          ),
          content:
            i18n.language === 'en' ? (
              <img
                alt="png"
                className="h-full w-full"
                src={'/images/academe/case/pku2_en.png'}
              />
            ) : (
              <img
                alt="png"
                className="h-full w-full"
                src={'/images/academe/case/pku2_zh.png'}
              />
            ),
        },
        {
          name: 'nju2',
          url: '/images/academe/logo-nju@2x.png',
          title: t('academe:nju2_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju2_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju2_author2')}
              </li>
              <li className="ml-4 list-disc">
                {t('academe:nju2_desc')}
                <LinkX
                  href={
                    '/blog/2023/12/06/an-Information-entropy/an-Information-entropy'
                  }
                >
                  <span className="text-[#002fa7]">
                    {t('academe:nju2_title')}
                  </span>
                </LinkX>
              </li>
            </ul>
          ),
          content:
            i18n.language === 'en' ? (
              <img
                alt="png"
                className="h-[50%] w-full"
                src={'/images/academe/case/nju2.png'}
              />
            ) : (
              <img
                alt="png"
                className="h-[50%] w-full"
                src={'/images/academe/case/nju2.png'}
              />
            ),
        },
        {
          name: 'pku3',
          url: '/images/academe/logo-pku@2x.png',
          title: t('academe:pku3_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku3_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku3_author2')}
              </li>

              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:pku3_desc1')}</div>
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:pku3_desc2')}
                <a className="text-[#002fa7]" href={'https://licenserec.com'}>
                  https://licenserec.com
                </a>
              </li>
              <li className="ml-4 list-disc">
                {t('academe:pku3_desc3')}
                <a
                  className="text-[#002fa7]"
                  href={'https://github.com/osslab-pku/RecLicense'}
                >
                  https://github.com/osslab-pku/RecLicense
                </a>
              </li>
            </ul>
          ),
          content:
            i18n.language === 'en' ? (
              <img
                alt="png"
                className="h-full w-full"
                src={'/images/academe/case/pku3_en.png'}
              />
            ) : (
              <img
                alt="png"
                className="h-full w-full"
                src={'/images/academe/case/pku3_zh.png'}
              />
            ),
        },
        {
          name: 'nju3',
          url: '/images/academe/logo-nju@2x.png',
          title: t('academe:nju3_title'),
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju3_author')}
              </li>
              <li className="ml-4 mb-2 list-disc">
                {t('academe:nju3_author2')}
              </li>
              <li className="ml-4 list-disc">
                {t('academe:nju3_desc')}
                <LinkX
                  href={
                    '/blog/2023/12/06/entropy-based-measurement/entropy-based-measurement'
                  }
                >
                  <span className="text-[#002fa7]">
                    {t('academe:nju3_title')}
                  </span>
                </LinkX>
              </li>
            </ul>
          ),
          content:
            i18n.language === 'en' ? (
              <img
                alt="png"
                className="h-[65%] w-full"
                src={'/images/academe/case/nju3.png'}
              />
            ) : (
              <img
                alt="png"
                className="h-[65%] w-full"
                src={'/images/academe/case/nju3.png'}
              />
            ),
        },
      ],
    },
    {
      key: 'softwareSelection',
      title: t('home:software_selection'),
      desc: t('home:software_selection_desc'),
      icon: <Svg4 className="h-full w-full object-contain" />,
      case: [
        {
          name: 'ics',
          url: '/images/academe/case/软件所.jpg',
          title: t('academe:isc_title'),
          pngWidth: 120,
          pngHeight: 40,
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:ics_desc')}</div>
              </li>
            </ul>
          ),
          content: (
            <img
              alt="png"
              className="h-full w-full"
              src={'/images/academe/case/ics.png'}
            />
          ),
          experienceUrl: 'https://artifact.yuantu.ac.cn/',
        },
        {
          name: 'oh',
          url: '/images/academe/case/OpenHarmony_logo.png',
          title: t('academe:oh_title'),
          pngWidth: 170,
          pngHeight: 50,
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:oh_desc')}</div>
              </li>
            </ul>
          ),
          content: (
            <img
              alt="png"
              className="h-full w-full"
              src={'/images/academe/case/oh.png'}
            />
          ),
        },
      ],
    },
    {
      key: 'manage',
      title: t('home:open_source_manage'),
      desc: t('home:open_source_manage_desc'),
      icon: (
        <Svg1 className="h-full w-full" preserveAspectRatio="xMidYMid meet" />
      ),
      case: [
        {
          name: 'deep_insight',
          url: '/images/logos/compass-black.svg',
          title: t('academe:deep_insight_title'),
          pngWidth: 170,
          pngHeight: 50,
          desc: (
            <ul className="h-full w-full">
              <li className="ml-4 mb-2 list-disc">
                <div className="">{t('academe:deep_insight_desc')}</div>
              </li>
            </ul>
          ),
          content: (
            <img
              alt="png"
              className="h-full w-full"
              src={'/images/academe/case/compass-insight.png'}
            />
          ),
        },
      ],
    },
  ];
  const activeCase = items.find((item) => item.key === active).case;

  return (
    <>
      <section className="mx-auto grid w-[1200px] grid-cols-4 gap-x-6 pb-16 md:grid-cols-1 md:gap-y-6 lg:w-full lg:px-4">
        {items.map((i, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center rounded-lg border p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
            onClick={() => {
              setOpen(true);
              setActive(i.key);
            }}
          >
            <div className="h-[100px] w-[100px]">{i.icon}</div>
            <div className="mt-4 text-xl font-semibold">{i.title}</div>
            <div className="mt-4 text-base">{i.desc}</div>
          </div>
        ))}
      </section>
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="relative h-[560px] w-[1200px] border-2 border-black bg-white shadow outline-0">
            <div
              className="absolute top-10 right-10 cursor-pointer p-2 "
              onClick={() => {
                setOpen(false);
              }}
            >
              <GrClose />
            </div>

            <div className="overflow-auto px-10 pt-8 md:px-2">
              <CooperationCase caseList={activeCase} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Purpose;
