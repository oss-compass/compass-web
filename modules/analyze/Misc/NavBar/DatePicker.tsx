import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import qs from 'query-string';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { getTimeRangeTags } from '@modules/analyze/constant';

const rangeTags = getTimeRangeTags();

const DatePicker = () => {
  const route = useRouter();
  const { range } = useQueryDateRange();

  return (
    <div className="flex h-8 items-center rounded-3xl border md:hidden">
      {rangeTags.map((t) => {
        return (
          <div
            key={t}
            className={classnames(
              { 'bg-gray-200 ': range === t },
              'flex h-full cursor-pointer items-center rounded-3xl px-4 text-sm'
            )}
            onClick={() => {
              const result = qs.parse(window.location.search);
              result.range = t;
              route.replace(`/analyze?${qs.stringify(result)}`);
            }}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
};

export default DatePicker;
