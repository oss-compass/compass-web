import React, { useState } from 'react';
import Analyze from '@modules/analyze';
import {
  TimePickerContext,
  DEFAULT_TIMEPICKER_VALUE,
  CompareUrlsValue,
  CompareUrlsContext,
  DEFAULT_COMPARE_URLS_VALUE,
} from '@modules/analyze/context';

const AnalyzePage = () => {
  const [compareUrls, setCompareUrls] = useState<CompareUrlsValue>(
    DEFAULT_COMPARE_URLS_VALUE
  );
  const [timePicker, setTimePicker] = useState(DEFAULT_TIMEPICKER_VALUE);

  return (
    <CompareUrlsContext.Provider
      value={{ value: compareUrls, update: setCompareUrls }}
    >
      <TimePickerContext.Provider
        value={{ value: timePicker, update: setTimePicker }}
      >
        <Analyze />
      </TimePickerContext.Provider>
    </CompareUrlsContext.Provider>
  );
};

export default AnalyzePage;
