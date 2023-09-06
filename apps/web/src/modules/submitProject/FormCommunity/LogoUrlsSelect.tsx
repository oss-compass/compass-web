import React, { useEffect } from 'react';
import cls from 'classnames';
import { BsCheckCircleFill } from 'react-icons/bs';
import ImageFallback from '@common/components/ImageFallback';

const LogoUrlsSelect = ({
  logoUrls,
  value,
  onChange,
}: {
  logoUrls: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  useEffect(() => {
    if (!value && logoUrls?.length > 0) {
      onChange(logoUrls[0]);
    }
  }, [logoUrls, onChange, value]);

  return (
    <div className="flex flex-wrap">
      {logoUrls.map((url) => {
        return (
          <div
            key={url}
            className={cls('relative mr-4 flex  cursor-pointer border-2', [
              value === url ? '!border-black' : 'border-silver',
            ])}
            onClick={() => {
              onChange(url);
            }}
          >
            <div className="relative h-[88px] w-[88px] overflow-hidden">
              <ImageFallback
                src={url || '/images/default.png'}
                unoptimized
                fill={true}
                fallbackSrc={'/images/default.png'}
                alt="logo"
              />
            </div>
            {value === url ? (
              <div className="absolute -right-1.5 -bottom-1.5 rounded-full bg-white p-0.5">
                <BsCheckCircleFill className={'text-xl text-green-500'} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default LogoUrlsSelect;
