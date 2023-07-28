import React from 'react';
import classnames from 'classnames';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useSwitchRange from '@modules/analyze/components/NavBar/useSwitchRange';
import { rangeTags } from '@modules/analyze/constant';
import useI18RangeTag from './useI18RangeTag';

/**
 * @deprecated use NewDatePicker instead
 */
const DatePicker = () => {
  const { range } = useQueryDateRange();
  const { switchRange } = useSwitchRange();
  const i18RangeTag = useI18RangeTag();

  return (
    <div className="flex h-8 shrink-0 items-center rounded-3xl border md:hidden">
      {rangeTags.map((t) => {
        return (
          <div
            key={t}
            className={classnames(
              { 'text-primary bg-gray-100 font-bold': range === t },
              'flex h-full cursor-pointer items-center rounded-3xl px-4 text-sm'
            )}
            onClick={async () => {
              await switchRange(t);
            }}
          >
            {i18RangeTag[t]}
          </div>
        );
      })}
    </div>
  );
};

export default DatePicker;
