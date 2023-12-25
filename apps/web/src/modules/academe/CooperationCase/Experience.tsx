import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import Dialog, { Transition } from '@common/components/Dialog';
import classnames from 'classnames';
import Input from '@common/components/Input';
import { GrClose } from 'react-icons/gr';
import { isValidUrl } from '@common/utils/url';
import { AiOutlineLoading } from 'react-icons/ai';
import { toFixed } from '@common/utils';
import Image from 'next/image';
import { Progress } from 'antd';

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

const Experience = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (i) => void;
}) => {
  const { t, i18n } = useTranslation();

  const activeCase = {
    name: 'nju',
    url: '/images/academe/logo-nju@2x.png',
    title: t('academe:nju_title'),
    desc2: t('academe:nju_desc2'),
  };
  const [repoUrl, setRepoUrl] = useState<string>('');
  const isUrlValid = isValidUrl(repoUrl);
  const [predict, setPredict] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="mt-4 flex h-8 w-48 cursor-pointer items-center justify-center bg-[#000000] px-3 text-sm text-white hover:bg-black/90"
      >
        {t('academe:experience_immediately')}
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

export default Experience;
