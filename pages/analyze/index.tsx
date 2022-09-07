import React, { useState } from 'react';
import Analyze from '@modules/analyze';
import {
  DatePickerContext,
  DEFAULT_DATEPICKER_VALUE,
  CompareUrlsValue,
  CompareUrlsContext,
  DEFAULT_COMPARE_URLS_VALUE,
} from '@modules/analyze/context';

const AnalyzePage = () => {
  const [compareUrls, setCompareUrls] = useState<CompareUrlsValue>(
    DEFAULT_COMPARE_URLS_VALUE
  );
  const [datePicker, setDatePicker] = useState(DEFAULT_DATEPICKER_VALUE);

  return (
    <CompareUrlsContext.Provider
      value={{ value: compareUrls, update: setCompareUrls }}
    >
      <DatePickerContext.Provider
        value={{ value: datePicker, update: setDatePicker }}
      >
        <Analyze />
      </DatePickerContext.Provider>
    </CompareUrlsContext.Provider>
  );
};

export default AnalyzePage;
