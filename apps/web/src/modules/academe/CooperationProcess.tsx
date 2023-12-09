import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const CooperationProcess = () => {
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
  const processList = [
    {
      name: 'submit',
      title: t('academe:submit_application'),
      url: '/images/academe/logo-nju@2x.png',
      desc: submit,
    },
    {
      name: 'affirm',
      title: t('academe:affirm'),
      url: '/images/academe/logo-pku@2x.png',
      desc: t('academe:affirm_desc'),
    },
    {
      name: 'research',
      title: t('academe:conduct_joint_research'),
      url: '/images/academe/openeuler.svg',
      desc: t('academe:conduct_joint_research_desc'),
    },
    {
      name: 'verify',
      title: t('academe:experiment_verify'),
      url: '/images/academe/logo-pku@2x.png',
      desc: t('academe:verify_desc'),
    },
    {
      name: 'release',
      title: t('academe:release_results'),
      url: '/images/academe/logo-pku@2x.png',
      desc: release,
    },
  ];
  const [active, setActive] = useState('submit');
  const activeProcess = processList.find((item) => item.name === active);
  return (
    <>
      <div className="mb-3 text-2xl font-medium">
        {t('academe:cooperation_process')}
      </div>
      <div className="mb-10 flex h-[345px] items-center border border-[#CFCFCF]">
        <div className="h-full w-[268px] overflow-hidden border-r border-[#CFCFCF] p-8">
          {processList.map((item, index) => {
            return (
              <div key={item.name}>
                <div
                  onClick={() => {
                    setActive(item.name);
                  }}
                  className={classnames(
                    'flex h-[40px] w-full cursor-pointer items-center justify-center rounded-full border border-dashed border-[#82BA41] bg-[#ecfbdc] text-sm font-semibold text-[#4A711C]',
                    {
                      '!bg-[#3EB93E] text-[#FFFFFF]': active === item.name,
                    }
                  )}
                >
                  {item.title}
                </div>
                {index !== processList.length - 1 && (
                  <div className="flex w-full flex-col items-center text-[#82ba41]">
                    <div className="h-3 w-[1px] bg-[#82ba41]"></div>
                    <div className="relative inline-block h-2 w-[16px] overflow-hidden">
                      <div className="absolute left-[2px] h-2 w-2.5 origin-top-left -rotate-45 transform bg-[#82ba41]"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="relative flex h-full flex-1 flex-col bg-[#fafff4] px-24">
          <div className="mt-10 flex text-xl font-semibold">
            <Image
              src={'/images/academe/icon-step-1.svg'}
              width={22}
              height={28}
              alt={''}
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginRight: '8px',
              }}
            />
            {activeProcess.title}
          </div>
          <div className="z-10 mt-5 text-base">{activeProcess.desc}</div>
          <div className="absolute bottom-6 right-6">
            <Image
              src={'/images/academe/icon-steps.svg'}
              width={140}
              height={56}
              alt={''}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CooperationProcess;
