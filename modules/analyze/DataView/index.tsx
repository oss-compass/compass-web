import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useConfigContext } from '@modules/analyze/context';
import { checkIsPadding } from '@modules/analyze/constant';
import CompareBar from '@modules/analyze/Misc/CompareBar';
import NoSsr from '@common/components/NoSsr';
import Charts from './Charts';

const Loading = () => (
  <div className="flex flex-1 flex-col">
    <div className="animate-pulse p-10">
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
  </div>
);

const Padding = () => (
  <div className="flex flex-1 flex-col items-center justify-center md:px-4 md:py-20">
    <div className="mb-4">
      <Image
        src="/images/analyze/padding.gif"
        width={79}
        height={60}
        alt={'padding'}
      />
    </div>
    <p className="mb-2">
      The current project is under analysis, please visit later.
    </p>
    <Link href={'/'}>
      <a className="text-blue-600">Explore other projects</a>
    </Link>
  </div>
);

const DataView = () => {
  const { loading, status } = useConfigContext();
  if (loading) {
    return <Loading />;
  }

  if (checkIsPadding(status)) {
    return <Padding />;
  }

  return (
    <NoSsr>
      <div className="mx-auto w-full flex-1 >2xl:w-[1200px]">
        <CompareBar />
        <Charts />
      </div>
    </NoSsr>
  );
};

export default DataView;
