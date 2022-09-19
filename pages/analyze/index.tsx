import React, { useState } from 'react';
import Analyze from '@modules/analyze';
import {
  DatePickerContext,
  DEFAULT_DATEPICKER_VALUE,
  AnalyzeConfigCtx,
} from '@modules/analyze/context';
import { useStatusQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';

const AnalyzePage = () => {
  const [datePicker, setDatePicker] = useState(DEFAULT_DATEPICKER_VALUE);
  const { compareItems } = useCompareItems();

  const label = React.useMemo(() => {
    if (compareItems.length >= 1) {
      return compareItems[0].label;
    }
    return '';
  }, [compareItems]);

  const { data } = useStatusQuery(
    client,
    { label },
    { enabled: Boolean(label) }
  );

  const status = data?.analysisStatus || 'pending';

  return (
    <AnalyzeConfigCtx.Provider value={{ value: { status } }}>
      <DatePickerContext.Provider
        value={{ value: datePicker, update: setDatePicker }}
      >
        <Analyze />
      </DatePickerContext.Provider>
    </AnalyzeConfigCtx.Provider>
  );
};

export default AnalyzePage;
