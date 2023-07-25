import React, { useState, useEffect } from 'react';
import { useCountDown } from 'ahooks';
import { isPast } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import {
  storageGetResendEmailTime,
  storageSaveResendEmailTime,
} from '@common/utils/storage';
import { useSendEmailVerifyMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const SendVerificationEmail = ({ email }: { email?: string }) => {
  const { t } = useTranslation();

  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setTargetDate(undefined);
    },
  });

  const sendEmail = useSendEmailVerifyMutation(client, {
    onSuccess: (res) => {
      if (res.sendEmailVerify?.status === 'true') {
        // save countdown in storage
        const t = Date.now() + 1000 * 60;
        storageSaveResendEmailTime(String(t));
        setTargetDate(t);
      } else {
        toast.error(() => <>{res.sendEmailVerify?.message}</>, {
          position: 'top-center',
        });
      }
    },
  });

  //  check if there is an expiration time in the storage.
  useEffect(() => {
    const nextSendTime = storageGetResendEmailTime();
    if (nextSendTime && !isPast(Number(nextSendTime))) {
      setTargetDate(Number(nextSendTime));
    }
  }, [email]);

  return (
    <div className="flex text-sm">
      {sendEmail.isLoading && (
        <CgSpinner className="mr-1 animate-spin text-xl" />
      )}
      {targetDate ? (
        <>
          <span>{t('setting:profile.email_sent')}</span>
          <div className="ml-1 text-primary opacity-60">
            {t('setting:profile.email_sent_later', {
              sec: Math.floor(countdown / 1000),
            })}
          </div>
        </>
      ) : (
        <>
          <span>{t('setting:profile.unverified_yet')}</span>
          <div
            className="ml-1 cursor-pointer text-primary"
            onClick={() => {
              sendEmail.mutate({});
            }}
          >
            {t('setting:profile.resend_verification_email')}
          </div>
        </>
      )}
    </div>
  );
};

export default SendVerificationEmail;
