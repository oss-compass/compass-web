import React from 'react';
import { ModelPublicOverview } from '@oss-compass/graphql';
import ModelTitle from './ModelTitle';
import DataSetPanel from '../../components/DataSetPanel';

const ModelItem: React.FC<{
  model: ModelPublicOverview;
  fullWidth?: boolean;
}> = ({ fullWidth = false, model }) => {
  const { modelId, versionId, dataset } = model;

  return (
    <div className="flex-1">
      <ModelTitle model={model} />
      <DataSetPanel
        dataSet={dataset?.items}
        modelId={modelId}
        versionId={versionId}
        fullWidth={fullWidth}
      />
    </div>
  );
};

export default ModelItem;
