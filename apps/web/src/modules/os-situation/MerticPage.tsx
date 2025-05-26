import React from 'react';
import { useTranslation } from 'next-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import useMetrics from '@modules/os-situation/hooks/useMetrics';
import Image from 'next/image';

const MerticPage = () => {
  const { t } = useTranslation();
  const merticsList = useMetrics();

  const card1 = merticsList[0];
  const card2 = merticsList[1];
  const card3 = merticsList[2];
  const card4 = merticsList[3];
  const card5 = merticsList[4];
  const card6 = merticsList[5];
  const card7 = merticsList[6];

  const normalStyle =
    'flex cursor-pointer flex-col rounded border p-8 shadow hover:shadow-xl md:gap-4';
  const normalTitleStyle = 'ml-4 text-xl font-semibold';
  const normalDescStyle =
    'line-clamp-3 mt-4 h-[72px] text-base leading-6 text-[#7b7c86]';
  const normalLinkStyle =
    'text-primary mt-8 flex items-center gap-2 font-semibold';

  const renderCard = (item: any, isProminent: boolean, src?: string) => {
    if (isProminent) {
      return (
        <div
          key={item.name}
          onClick={() => {
            window.location.href = '/os-situation/metrics' + item.url;
          }}
          className="flex cursor-pointer gap-8 rounded border shadow hover:shadow-xl md:gap-4"
        >
          <div className="flex flex-1 flex-col p-8">
            <div className="mt-2 flex items-center">
              {item.icon}
              <span className={normalTitleStyle}>{item.title}</span>
            </div>
            <div className={normalDescStyle}>{item.desc}</div>
            <div className={normalLinkStyle}>
              View <IoIosArrowForward className="mt-[1px]" />
            </div>
          </div>
          <div className="relative ml-12 flex flex-1 items-center justify-center">
            <Image src={src} unoptimized fill={true} alt="" />
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={item.name}
          className={normalStyle}
          onClick={() => {
            window.location.href = '/os-situation/metrics' + item.url;
          }}
        >
          <div className="mt-2 flex items-center">
            {item.icon}
            <span className={normalTitleStyle}>{item.title}</span>
          </div>
          <div className={normalDescStyle}>{item.desc}</div>
          <div className={normalLinkStyle}>
            View <IoIosArrowForward className="mt-[1px]" />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="mb-8 text-2xl font-medium">指标</div>
      <div className="mx-auto flex w-[1200px] flex-col gap-6 pb-16 lg:w-full lg:px-4">
        {/* First Row: Card 1 (Large) and Card 2 (Small) */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
          <div className="col-span-2 md:col-span-1">
            {renderCard(card1, true, '/images/os-situation/line.png')}
          </div>
          <div className="col-span-1 md:col-span-1">
            {renderCard(card3, false)}
          </div>
        </div>

        {/* Second Row: Card 3 (Large) and Card 4 (Small) */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
          <div className="col-span-2 md:col-span-1">
            {renderCard(card2, true, '/images/os-situation/bar.png')}
          </div>
          <div className="col-span-1 md:col-span-1">
            {renderCard(card4, false)}
          </div>
        </div>

        {/* Third Row: Card 5, 6, 7 (Small) */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1 lg:grid-cols-2">
          {renderCard(card5, false)}
          {renderCard(card6, false)}
          {renderCard(card7, false)}
        </div>
      </div>
    </>
  );
};

export default MerticPage;
