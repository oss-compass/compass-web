import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toDataURL } from 'qrcode';
import { BsFillFileImageFill } from 'react-icons/bs';
import { useBindWechatLinkMutation } from '@graphql/generated';
import client from '@graphql/client';
import { useInterval } from 'ahooks';
import { userInfoStore, userEvent } from '@modules/auth';

const ErrorHolder = () => (
  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
    <BsFillFileImageFill className="text-9xl" />
  </div>
);

const WechatCodeImage = () => {
  const [imgUrl, setImageUrl] = useState('');
  const { mutate, isLoading } = useBindWechatLinkMutation(client, {
    onSuccess: (res) => {
      const url = res?.bindWechatLink?.url || '';
      if (url) {
        toDataURL(url, { width: 500, margin: 0 }, function (error, dataUrl) {
          if (error) {
            console.error(error);
            return;
          }
          setImageUrl(dataUrl);
        });
      }
    },
  });

  useInterval(() => {
    if (imgUrl) {
      userInfoStore.event$?.emit(userEvent.REFRESH);
    }
  }, 1500);

  useEffect(() => {
    mutate({});
  }, [mutate]);

  const ShowImg = imgUrl ? (
    <Image src={imgUrl} layout="fill" alt="" />
  ) : (
    <ErrorHolder />
  );

  return (
    <>
      <div className="relative h-[250px] w-[250px] ">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-slate-200" />
        ) : (
          ShowImg
        )}
      </div>
    </>
  );
};

export default WechatCodeImage;
