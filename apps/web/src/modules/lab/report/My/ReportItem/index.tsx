import React from 'react';
import ModelTitle from './ModelTitle';
import AnalysePanel from './AnalysePanel';
import DataSetPanel from '@modules/lab/model/components/DataSetPanel';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';

const ReportItem: React.FC<{
  model: any;
  event$?: EventEmitter<string>;
  fullWidth?: boolean;
  simple?: boolean;
}> = ({ model, event$ = null, fullWidth = false, simple = false }) => {
  const { modelId, reportId, versionId, datasetStatus } = model;

  return (
    <>
      <ModelTitle model={model} event$={event$} simple={simple} />
      <AnalysePanel model={model} />
      <DataSetPanel
        dataSet={datasetStatus?.items}
        modelId={modelId}
        versionId={versionId}
        fullWidth={fullWidth}
        reportId={reportId}
      />
    </>
  );
};

export default ReportItem;
