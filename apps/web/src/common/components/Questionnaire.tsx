import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Questionnaire = () => {
  const { i18n } = useTranslation();
  const [close, setClose] = useState(false);

  if (!close && i18n.language === 'zh') {
    return (
      <div className="z-modal fixed bottom-[100px] right-10 ">
        <Link
          href="https://mp.weixin.qq.com/s?__biz=MzkxMDQzNjc2MQ==&mid=2247484166&idx=1&sn=8744720b2b60b5c353aa468fe91d85f0&chksm=c12a33f0f65dbae6a4dc38ec08ab9594545cd2ec3427ae32e4c4523e787ae787f3b270c91ec0&token=1781014651&lang=zh_CN#rd"
          target="_blank"
          className="h-[124px] w-[136px]"
        >
          <Image
            src="/images/questionnaire/icon.png"
            width={124}
            height={136}
            alt={''}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <span
          className="absolute top-0 right-0 cursor-pointer p-1"
          onClick={() => {
            setClose(true);
          }}
        >
          <Image
            src="/images/questionnaire/close@2x.png"
            width={22}
            height={22}
            alt={''}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </span>
      </div>
    );
  }
  return null;
};

export default Questionnaire;
