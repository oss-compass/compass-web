import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col items-center justify-center md:px-4 md:py-20">
      {/* <h1 className="mb-4 text-3xl font-bold text-gray-600"></h1> */}
      {/* <div className="px-10 pt-8">
        <div className="animate-pulse bg-white p-10">
          <div className="flex-1 space-y-4 ">
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Loading;
