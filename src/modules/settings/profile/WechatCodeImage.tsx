import React, { useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { BsFillFileImageFill } from 'react-icons/bs';
import { useBindWechatLinkMutation } from '@graphql/generated';
import client from '@graphql/client';

const ErrorHolder = () => (
  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
    <BsFillFileImageFill className="text-9xl" />
  </div>
);

const WechatCodeImage = () => {
  const { mutate, isLoading, data } = useBindWechatLinkMutation(client);
  const url = data?.bindWechatLink?.url || '';

  useEffect(() => {
    mutate({});
  }, [mutate]);

  const ShowImg = url ? (
    <QRCodeCanvas value={url} className="h-full w-full" />
  ) : (
    <ErrorHolder />
  );

  return (
    <div className=" h-[250px] w-[250px] ">
      {isLoading ? (
        <div className="h-full w-full animate-pulse bg-slate-200" />
      ) : (
        ShowImg
      )}
    </div>
  );
};

export default WechatCodeImage;
