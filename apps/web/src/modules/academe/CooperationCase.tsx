import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Progress } from 'antd';
import Dialog, { Transition } from '@common/components/Dialog';
import Input from '@common/components/Input';
import { GrClose } from 'react-icons/gr';

const p = () => {
  <Progress percent={100} size="small" />;
};
const CooperationProcess = () => {
  const { t, i18n } = useTranslation();
  const caseList = [
    {
      name: 'nju',
      url: '/images/academe/logo-nju@2x.png',
      title: t('academe:nju_title'),
      desc: t('academe:nju_desc'),
      content: (
        <img className="h-full w-full" src={'/images/academe/case/nju.png'} />
      ),
    },
    {
      name: 'pku1',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku1_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4 list-disc">{t('academe:pku1_desc1')}</li>
          <li className="ml-4 list-disc">{t('academe:pku1_desc2')}</li>
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
      desc: t('academe:openeuler_desc'),
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
    },
    {
      name: 'pku2',
      url: '/images/academe/logo-pku@2x.png',
      title: t('academe:pku2_title'),
      desc: (
        <ul className="h-full w-full">
          <li className="ml-4 list-disc">{t('academe:pku2_desc1')}</li>
          <li className="ml-4 list-disc">{t('academe:pku2_desc2')}</li>
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
          <li className="ml-4 list-disc">{t('academe:pku3_desc1')}</li>
          <li className="ml-4 list-disc">{t('academe:pku3_desc2')}</li>
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
  const [content, setContent] = useState('');

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
            <div>{activeCase.desc}</div>
            <div className="h-[180px] w-full p-2">{activeCase.content}</div>
          </div>
          <div className="w-[330px] border-l pl-6 md:border-0">
            <div className="font-semibold">效果体验</div>
            <div className="mt-4 mb-2 text-sm">请输入内容</div>
            <Input
              value={content}
              className={classnames(
                'daisy-input-bordered daisy-input h-10 w-full flex-1 border-2  px-4 text-base outline-none'
              )}
            />
            <div
              onClick={() => {}}
              className="mt-4 flex h-8 w-16 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
            >
              计算
            </div>
          </div>
        </div>
      </div>
    </>
  );

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
                'flex h-[56px] w-[300px] cursor-pointer items-center justify-center border border-l-0 border-[#CFCFCF] bg-[#f7f7f7]',
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
            </div>
          );
        })}
      </div>
      <div className="mb-10 flex items-center border border-t-0 border-[#CFCFCF] p-8">
        <div className="w-[424px] pl-2">
          <div className="text-xl font-semibold">{activeCase.title}</div>
          <div className="mt-2 w-[424px] text-sm">{activeCase.desc}</div>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
          >
            {t('academe:experience_immediately')}
          </div>
        </div>
        <div className="ml-16 h-[280px] flex-1 ">{activeCase.content}</div>
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

export default CooperationProcess;
