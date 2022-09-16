import React, { useState } from 'react';
import Analyze from '@modules/analyze';
import {
  DatePickerContext,
  DEFAULT_DATEPICKER_VALUE,
  CompareItemsValue,
  CompareItemsContext,
  DEFAULT_COMPARE_ITEMS_VALUE,
} from '@modules/analyze/context';

const AnalyzePage = () => {
  const [compareItems, setCompareItems] = useState<CompareItemsValue>(
    DEFAULT_COMPARE_ITEMS_VALUE
  );
  const [datePicker, setDatePicker] = useState(DEFAULT_DATEPICKER_VALUE);

  return (
    <CompareItemsContext.Provider
      value={{ value: compareItems, update: setCompareItems }}
    >
      <DatePickerContext.Provider
        value={{ value: datePicker, update: setDatePicker }}
      >
        <Analyze />
      </DatePickerContext.Provider>
    </CompareItemsContext.Provider>
  );
};

export default AnalyzePage;
