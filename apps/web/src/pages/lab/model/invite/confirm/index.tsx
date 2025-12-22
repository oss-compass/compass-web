import React, { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Copyright from '@modules/auth/components/Copyright';
import LogoHeader from '@modules/auth/components/LogoHeader';
import AuthRequire from '@modules/auth/AuthRequire';
import { Button } from '@oss-compass/ui';
import Mail from '@public/images/login/mail.svg';
import getLocalesFile from '@common/utils/getLocalesFile';
import { GetServerSidePropsContext } from 'next';
import { useTranslation, Trans } from 'next-i18next';
import { toast } from 'react-hot-toast';
import CheckTerms from '@modules/lab/model/components/CheckTerms';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
}

const Content = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const acceptUrl = router.query.accept_url as string;
  const invitee = router.query.invitee as string;
  const modelName = router.query.model as string;

  const [select, setSelect] = useState(false);

  return (
    <>
      <div className="flex pl-[56px] pr-[44px] pt-[64px]">
        <div
          className={classNames(
            'bg-primary flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full'
          )}
        >
          <Mail />
        </div>
        <div className="pl-6">
          <h1 className="m-0 mb-2 text-xl font-semibold text-black sm:leading-8">
            {t('lab:joining_the_compass')}
          </h1>
          <div className="text-sm text-black">
            <>
              <Trans
                i18nKey={'you_are_here_because_you_have_been_invited' as any}
                ns="lab"
                values={{ invitee: invitee, modelName: modelName }}
                components={{
                  s: <span className="font-semibold" />,
                }}
              />
            </>
          </div>
          <CheckTerms
            select={select}
            setSelect={(e) => {
              setSelect(e);
            }}
          />
        </div>
      </div>
      <div className="mb-[56px] ml-[176px]">
        <Button
          size="lg"
          onClick={() => {
            if (select) {
              window.location.href = acceptUrl;
            } else {
              toast.error(t('lab:please_check_the_terms'));
            }
          }}
        >
          {t('lab:agree_to_join')}
        </Button>
      </div>
    </>
  );
};

const Confirm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div>
      <LogoHeader />
      <div className="flex justify-center">
        <div
          className={classNames(
            'mt-36 w-[740px] max-w-full border border-solid border-[#CFCFCF] bg-white text-base text-slate-700 shadow-sm',
            'md:mx-6 md:w-full md:px-6'
          )}
        >
          <AuthRequire redirectTo={router.asPath} className="p-6">
            <Content />
          </AuthRequire>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Confirm;
