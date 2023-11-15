import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import MyTab from '@common/components/Tab';
import MetricContributor from './MetricContributor';
import MetricIssue from './MetricIssue';
import MetricPr from './MetricPr';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import NavDatePicker from '@modules/analyze/components/NavBar/NavDatePicker';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';

const MetricDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const slugs = router.query.slugs;
  const { isLoading, verifiedItems } = useLabelStatus();
  const [tab, setTab] = useState('1');
  if (isLoading || verifiedItems.length > 1) {
    return null;
  }
  const { label, level } = verifiedItems[0];

  const tabOptions = [
    { label: t('analyze:metric_detail:contributors_persona'), value: '1' },
    { label: t('analyze:metric_detail:issues'), value: '2' },
    { label: t('analyze:metric_detail:pull_requests'), value: '3' },
  ];

  let source;
  switch (tab) {
    case '1': {
      source = <MetricContributor label={label} level={level} />;
      break;
    }
    case '2': {
      source = <MetricIssue label={label} level={level} />;
      break;
    }
    case '3': {
      source = <MetricPr label={label} level={level} />;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className="flex w-full flex-col bg-[#fafafa]">
      <div className="relative flex h-14 w-full flex-shrink-0 items-center bg-[#ffffff] px-6 shadow">
        <div className="flex text-lg font-medium">
          <AiOutlineLeftCircle
            onClick={() => {
              router.push('/analyze/' + slugs);
            }}
            className="mt-1 mr-4 cursor-pointer text-[#3f60ef]"
          />
          <span className="md:hidden">
            {t('analyze:metric_detail:project_deep_dive_insight')}
          </span>
        </div>
        <div className="absolute right-1/2 flex translate-x-1/2 justify-center">
          <MyTab options={tabOptions} value={tab} onChange={(v) => setTab(v)} />
        </div>
        <div className="absolute right-6">
          <NavDatePicker />
        </div>
      </div>
      <div className="relative m-4 min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none">
        {source}
      </div>
    </div>
  );
};

export default MetricDetailPage;

// const Loading = () => (
//   <div className="rounded border px-6 py-6 shadow">
//     <div className="flex flex-1 flex-col bg-white">
//       <div className="animate-pulse">
//         <div className="flex-1 space-y-4 ">
//           <div className="grid grid-cols-4 gap-4">
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//           </div>

//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//           </div>

//           <div className="grid grid-cols-4 gap-4">
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//           </div>

//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//           </div>
//           <div className="grid grid-cols-4 gap-4">
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 "></div>
//             <div className="col-span-1 h-4 rounded bg-slate-200"></div>
//           </div>

//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-1 h-4 rounded "></div>
//             <div className="col-span-2 h-4 rounded bg-slate-200"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
