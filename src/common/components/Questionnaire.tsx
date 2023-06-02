import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Questionnaire = () => {
  const { i18n } = useTranslation();
  const [close, setClose] = useState(false);

  if (!close && i18n.language === 'zh') {
    return (
      <div className="fixed bottom-[100px] right-10 z-modal ">
        <Link href="https://wj.qq.com/s2/12430808/ef24/">
          <a target="_blank" className="h-[124px] w-[136px]">
            <Image
              src="/images/questionnaire/icon.png"
              width={124}
              height={136}
              alt={''}
            />
          </a>
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
          />
        </span>
      </div>
    );
  }
  return null;
};

export default Questionnaire;
