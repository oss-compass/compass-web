import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { FiPrinter } from 'react-icons/fi';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';
import useExtractShortIds from '@modules/analyze/hooks/useExtractShortIds';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import { useStatusContext } from '@modules/analyze/context';
import { chartUserSettingState } from '@modules/analyze/store';
import { reportMessages } from './messages';
import type { ReportSelection } from './snapshot';

const ReportDialog = dynamic(() => import('./ReportDialog'), { ssr: false });

export default function ReportPrint() {
  const { i18n } = useTranslation();
  const { compareItems } = useCompareItems();
  const { shortIds } = useExtractShortIds();
  const { status, isLoading } = useStatusContext();
  const { timeStart, timeEnd } = useQueryDateRange();
  const topic = useQueryMetricType();
  const { isLoading: rangeLoading } = useVerifyDetailRangeQuery();
  const [selection, setSelection] = useState<ReportSelection | null>(null);
  const language = i18n.language === 'zh' ? 'zh' : 'en';
  const messages = reportMessages(i18n, language);
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 rounded border bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
        disabled={
          isLoading ||
          (topic === 'contributor' && rangeLoading) ||
          !Number.isFinite(timeStart?.getTime()) ||
          !Number.isFinite(timeEnd?.getTime()) ||
          timeStart > timeEnd ||
          status !== 'success' ||
          !compareItems.length ||
          shortIds.length !== compareItems.length
        }
        onClick={() =>
          setSelection({
            projects: compareItems.map(({ label, level, shortCode }) => ({
              label,
              level,
              shortCode,
            })),
            start: timeStart.toISOString(),
            end: timeEnd.toISOString(),
            dateLabel: `${format(timeStart, 'yyyy-MM-dd')} ~ ${format(
              timeEnd,
              'yyyy-MM-dd'
            )}`,
            language,
            topic: topic === 'contributor' ? 'contributor' : 'collaboration',
            repoType: chartUserSettingState.repoType,
            model: 'all',
          })
        }
      >
        <FiPrinter aria-hidden="true" />
        {messages.open}
      </button>
      {selection && (
        <ReportDialog
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  );
}
