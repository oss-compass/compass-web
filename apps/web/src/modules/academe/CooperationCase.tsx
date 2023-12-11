import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image';
import { Progress } from 'antd';
import Dialog, { Transition } from '@common/components/Dialog';
import Input from '@common/components/Input';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { isValidUrl } from '@common/utils/url';
import { toFixed } from '@common/utils';
import { AiOutlineLoading } from 'react-icons/ai';
import { TbPoint } from 'react-icons/tb';
import { gsap } from 'gsap';
import { useInViewport } from 'ahooks';

async function getData({ repo }) {
  return await axios.post(
    '/api/beta/predict',
    { repo },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
}

const Timer = ({
  time = 20,
  setActiveFun,
}: {
  time?: number;
  setActiveFun: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 101) {
          setActiveFun();
          return 0;
        } else {
          return prevProgress + 10 / time;
        }
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Progress
        className="p-0"
        percent={progress}
        size="small"
        showInfo={false}
        strokeColor={'#52c41a'}
        trailColor={'transparent'}
      />
    </div>
  );
};
const CooperationCase = () => {
  const { t, i18n } = useTranslation();
  const caseList = [
    {
      name: 'nju',
      url: '/images/academe/logo-nju@2x.png',
      title: t('academe:nju_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4 mb-2 list-disc">{t('academe:nju_author')}</li>
          <li className="ml-4 mb-2 list-disc">{t('academe:nju_author2')}</li>
          <li className="ml-4 list-disc">
            {t('academe:nju_desc')}
            <a
              className="text-[#002fa7]"
              href={
                'https://compass.gitee.com/zh/blog/2023/12/07/compass-prediction-activity/compass-prediction-activity'
              }
            >
              {t('academe:nju_title')}
            </a>
          </li>
        </ul>
      ),
      desc2: t('academe:nju_desc2'),
      content:
        i18n.language === 'en' ? (
          <img
            className="h-full w-full"
            src={'/images/academe/case/nju_en.png'}
          />
        ) : (
          <img className="h-full w-full" src={'/images/academe/case/nju.png'} />
        ),
      experience: true,
    },
    {
      name: 'pku1',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku1_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4  mb-2 list-disc">{t('academe:pku1_author')}</li>
          <li className="ml-4 mb-2 list-disc">{t('academe:pku1_author2')}</li>
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
            src={'/images/academe/case/pku1_en.png'}
          />
        ) : (
          <img
            className="h-full w-full"
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
      experience: true,
      experienceUrl: 'https://docs.openeuler.org/',
    },
    {
      name: 'pku2',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku2_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4 mb-2 list-disc">{t('academe:pku2_author')}</li>
          <li className="ml-4 mb-2 list-disc">{t('academe:pku2_author2')}</li>
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
            className="h-full w-full"
            src={'/images/academe/case/pku2_en.png'}
          />
        ) : (
          <img
            className="h-full w-full"
            src={'/images/academe/case/pku2_zh.png'}
          />
        ),
    },
    {
      name: 'pku3',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku3_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4 mb-2 list-disc">{t('academe:pku3_author')}</li>
          <li className="ml-4 mb-2 list-disc">{t('academe:pku3_author2')}</li>

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
            className="h-full w-full"
            src={'/images/academe/case/pku3_en.png'}
          />
        ) : (
          <img
            className="h-full w-full"
            src={'/images/academe/case/pku3_zh.png'}
          />
        ),
    },
  ];

  const [active, setActive] = useState('nju');
  const [open, setOpen] = useState(false);
  const activeCase = caseList.find((item) => item.name === active);

  const [repoUrl, setRepoUrl] = useState<string>('');
  const isUrlValid = isValidUrl(repoUrl);
  const [predict, setPredict] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);
  // useEffect(() => {
  //   inViewport &&
  //     gsap.fromTo(
  //       ref.current,
  //       {
  //         opacity: '0',
  //         // repeat: 2,
  //         duration: 2,
  //       },
  //       {
  //         opacity: '1',
  //         // repeat: 2,
  //         duration: 2,
  //       }
  //     );
  // }, [inViewport, active]);
  const calculate = () => {
    setErrorMsg('');
    setPredict(null);
    const variables = { repo: repoUrl };
    // @ts-ignore
    getData(variables)
      .then((res) => {
        if (res.status === 200 && res?.data?.prediction?.active) {
          setPredict(toFixed(res.data.prediction.active * 100, 1));
        } else {
          setErrorMsg(t('academe:failed_to_fetch_data'));
        }
      })
      .catch((err) => {
        setErrorMsg(
          err?.response?.data?.message || t('academe:failed_to_fetch_data')
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const dialogContent = (
    <>
      <div
        className="absolute right-10 top-8 cursor-pointer p-2"
        onClick={() => {
          setOpen(false);
        }}
      >
        <GrClose className="text-base" />
      </div>
      <div className="mb-10">
        <Image
          src={activeCase.url}
          width={100}
          height={56}
          alt={''}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="pl-2">
        <div className="mb-4 text-xl font-semibold">{activeCase.title}</div>
        <div className="flex md:flex-col">
          <div className="mr-6 min-w-[300px] flex-1 text-sm">
            <div>{activeCase.desc2}</div>
          </div>
          <div className="w-[430px] border-l pl-6 md:border-0">
            <div className="font-semibold">{t('academe:experience')}</div>
            <div className="mt-2">
              <Input
                className="w-full"
                placeholder={t('academe:type_address_of') as string}
                error={false}
                value={repoUrl}
                onChange={(e) => {
                  const url = e.target.value;
                  setRepoUrl(url);
                }}
              />
              {repoUrl && !isUrlValid ? (
                <p className="p-1 text-red-500">
                  {t('academe:please_enter_a_valid')}
                </p>
              ) : null}
              {errorMsg ? <p className="p-1 text-red-500">{errorMsg}</p> : null}
            </div>
            <div
              onClick={() => {
                setLoading(true);
                calculate();
              }}
              className="mt-4 flex h-8 w-20 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
            >
              {loading ? (
                <AiOutlineLoading className="t animate-spin" />
              ) : (
                t('academe:calculate')
              )}
            </div>

            {predict && (
              <>
                <div className="mt-2">{t('academe:result')}</div>
                <div>
                  <Progress percent={predict} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
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
              <Image
                src={item.url}
                width={100}
                height={56}
                alt={''}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <div className="absolute -bottom-2 w-full">
                {active === item.name && (
                  <Timer
                    setActiveFun={() => {
                      setActiveFun(
                        index === caseList.length - 1 ? 0 : index + 1
                      );
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-10  border border-t-0 border-[#CFCFCF] p-8 " ref={ref}>
        <div ref={ref} className="flex items-center md:flex-col">
          <div className="mb-4 w-[550px] pl-2 md:w-full">
            <div className="text-xl font-semibold">{activeCase.title}</div>
            <div className="mt-2 w-[550px] text-sm">{activeCase.desc}</div>
            {activeCase.experience && (
              <div
                onClick={() => {
                  if (activeCase.experienceUrl) {
                    window.open(activeCase.experienceUrl);
                  } else {
                    setOpen(true);
                  }
                }}
                className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
              >
                {t('academe:experience_immediately')}
              </div>
            )}
          </div>
          <div className="ml-16 h-[280px] flex-1 ">{activeCase.content}</div>
        </div>
      </div>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        classes={{
          paper: classnames(
            'border-2 border-black w-[640px] !max-w-[640px] !rounded-none !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogContent={dialogContent}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CooperationCase;
