import React from 'react';
import { MyModelVersion } from '@oss-compass/graphql';
import ModelTitle from './ModelTitle';
import AnalysePanel from './AnalysePanel';
import DataSetPanel from '@modules/lab/model/components/DataSetPanel';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';

const ModelItem: React.FC<{
  model: MyModelVersion;
  event$?: EventEmitter<string>;
  fullWidth?: boolean;
}> = ({ event$ = null, fullWidth = false, model }) => {
  const { modelId, version, versionId, dataset } = model;

  return (
    <>
      <ModelTitle model={model} event$={event$} />
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
