import React from 'react';
import ModelTitle from './ModelTitle';
import AnalysePanel from './AnalysePanel';
import DataSetPanel from '@modules/lab/model/components/DataSetPanel';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';

const ModelItem: React.FC<{
  model: any;
  event$?: EventEmitter<string>;
  fullWidth?: boolean;
  simple?: boolean;
}> = ({ model, event$ = null, fullWidth = false, simple = false }) => {
  const { modelId, version, versionId, dataset } = model;

  return (
    <>
      <ModelTitle model={model} event$={event$} simple={simple} />
      <AnalysePanel model={model} />
      <DataSetPanel
        dataSet={dataset?.items}
        modelId={modelId}
        versionId={versionId}
        fullWidth={fullWidth}
      />
    </>
  );
};

export default ModelItem;
