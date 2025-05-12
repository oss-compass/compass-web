import React from 'react';
import { useTranslation } from 'next-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import useMetrics from '@modules/os-situation/hooks/useMetrics';

const MerticPage = () => {
  const { t } = useTranslation();
  const merticsList = useMetrics();
  return (
    <>
      <div className="mb-8 text-2xl font-medium">指标</div>
      <div className="mx-auto grid w-[1200px] grid-cols-3 gap-6 pb-16 md:grid-cols-1 lg:w-full lg:grid-cols-2 lg:px-4">
        {merticsList.map((item, index) => {
          return (
            <div
              key={item.name}
              className="flex cursor-pointer flex-col rounded border py-8 px-12 shadow hover:shadow-xl md:gap-4"
              onClick={() => {
                window.location.href = '/os-situation/metrics' + item.url;
              }}
            >
              <div className="mt-2 flex items-center">
                {item.icon}
                <span className="ml-4 text-xl font-semibold">{item.title}</span>
              </div>
              <div className="line-clamp-3 mt-4 h-[72px] text-base leading-6 text-[#7b7c86]">
                {item.desc}
              </div>
              <div className="text-primary mt-8 flex items-center gap-2 font-semibold">
                View <IoIosArrowForward className="mt-[1px]" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MerticPage;
