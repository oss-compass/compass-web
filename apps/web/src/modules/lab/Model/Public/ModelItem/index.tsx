import React from 'react';
import { ModelPublicOverview } from '@oss-compass/graphql';
import ModelTitle from './ModelTitle';
import ModelDataSet from './ModelDataSet';

const ModelItem: React.FC<{ model: ModelPublicOverview }> = ({ model }) => {
  const { modelId, modelName, dataset } = model;
  return (
    <div className="flex-1">
      <ModelTitle model={model} />
      <ModelDataSet model={model} />
    </div>
  );
};

export default ModelItem;
