import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Questionnaire = () => {
  const { i18n } = useTranslation();
  const [close, setClose] = useState(false);
  if (close) {
    return null;
  }
  if (i18n.language === 'zh') {
    return (
      <div className="z-modal fixed bottom-[100px] right-10 ">
        <Link
          href="https://www.youtube.com/watch?v=FNK3--dtR_4"
          target="_blank"
          className="h-[124px] w-[136px]"
        >
          <Image
            src="/images/questionnaire/OSSUMMIT@zh.png"
            width={124}
            height={144}
            alt={''}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <span
          className="absolute top-0 right-0 cursor-pointer"
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
  } else {
    return (
      <div className="z-modal fixed bottom-[100px] right-10 ">
        <Link
          href="https://www.youtube.com/watch?v=FNK3--dtR_4"
          target="_blank"
          className="h-[124px] w-[136px]"
        >
          <Image
            src="/images/questionnaire/OSSUMMIT@en.png"
            width={124}
            height={144}
            alt={''}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <span
          className="absolute top-0 right-0 cursor-pointer"
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
};

export default Questionnaire;
