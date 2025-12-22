import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image';
import LinkX from '@common/components/LinkX';
import Timer from './Timer';
import Experience from './Experience';

const CooperationCase = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const caseList = [
    {
      name: 'nju',
      url: '/images/academe/logo-nju@2x.png',
      title: t('academe:nju_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="mb-2 ml-4 list-disc">{t('academe:nju_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:nju_author2')}</li>
          <li className="ml-4 list-disc">
            {t('academe:nju_desc')}
            <LinkX
              href={
                '/blog/2023/12/06/compass-prediction-activity/compass-prediction-activity'
              }
            >
              <span className="text-[#002fa7]">{t('academe:nju_title')}</span>
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
      experience: <Experience open={open} setOpen={setOpen} />,
    },
    {
      name: 'pku1',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku1_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="mb-2  ml-4 list-disc">{t('academe:pku1_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:pku1_author2')}</li>
          <li className="mb-2  ml-4 list-disc">
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
      name: 'openeuler',
      url: '/images/academe/openeuler.svg',
      title: t('academe:openeuler_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="mb-2 ml-4 list-disc">
            {t('academe:openeuler_author')}
          </li>
          <li className="mb-2 ml-4 list-disc">
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
      experienceUrl: 'https://docs.openeuler.org/',
    },
    {
      name: 'pku2',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku2_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="mb-2 ml-4 list-disc">{t('academe:pku2_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:pku2_author2')}</li>
          <li className="mb-2 ml-4 list-disc">
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
          <li className="mb-2 ml-4 list-disc">{t('academe:nju2_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:nju2_author2')}</li>
          <li className="ml-4 list-disc">
            {t('academe:nju2_desc')}
            <LinkX
              href={
                '/blog/2023/12/06/an-Information-entropy/an-Information-entropy'
              }
            >
              <span className="text-[#002fa7]">{t('academe:nju2_title')}</span>
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
          <li className="mb-2 ml-4 list-disc">{t('academe:pku3_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:pku3_author2')}</li>

          <li className="mb-2 ml-4 list-disc">
            <div className="">{t('academe:pku3_desc1')}</div>
          </li>
          <li className="mb-2 ml-4 list-disc">
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
          <li className="mb-2 ml-4 list-disc">{t('academe:nju3_author')}</li>
          <li className="mb-2 ml-4 list-disc">{t('academe:nju3_author2')}</li>
          <li className="ml-4 list-disc">
            {t('academe:nju3_desc')}
            <LinkX
              href={
                '/blog/2023/12/06/entropy-based-measurement/entropy-based-measurement'
              }
            >
              <span className="text-[#002fa7]">{t('academe:nju3_title')}</span>
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
  ];

  const [active, setActive] = useState('nju');
  const activeCase = caseList.find((item) => item.name === active);

  const setActiveFun = (index) => {
    const next = caseList[index];
    setActive(next['name']);
  };
  return (
    <>
      <div className="mb-3 text-2xl font-medium">
        {t('academe:cooperation_case')}
      </div>
      <div className="flex">
        {caseList.map((item, index) => {
          return (
            <div
              key={item.name}
              onClick={() => {
                setActive(item.name);
              }}
              className={classnames(
                'relative flex h-[56px] w-[300px] cursor-pointer items-center justify-center border border-l-0 border-[#CFCFCF] bg-[#f7f7f7]',
                { '!border-l ': index === 0, '!bg-white': active === item.name }
              )}
            >
              <div className="max-w-[100px] overflow-hidden xl:w-[28px]">
                <div
                  className={classnames('w-[100px] ', {
                    'xl:pl-2': !item.name.includes('pku'),
                  })}
                >
                  <Image
                    src={item.url}
                    width={100}
                    height={32}
                    alt={item.title}
                    style={{
                      height: '32px',
                      width: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 w-full">
                {active === item.name && (
                  <Timer
                    setActiveFun={() => {
                      setActiveFun(
                        index === caseList.length - 1 ? 0 : index + 1
                      );
                    }}
                    stop={open}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-10  border border-t-0 border-[#CFCFCF] p-8 ">
        <div className="flex items-center md:flex-col">
          <div className="mb-4 w-[550px] pl-2 md:w-full">
            <div className="text-xl font-semibold">{activeCase.title}</div>
            <div className="mt-2 w-[550px] text-sm md:w-full">
              {activeCase.desc}
            </div>
            {activeCase.experienceUrl && (
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
    </>
  );
};

export default CooperationCase;
