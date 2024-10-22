import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';
import { percentRound } from '@common/utils/number';
import { isDev } from '@common/constant';
import { adjustmentArray } from './utils';

interface State {
  // model
  name: string;
  // dimension: number;
  isPublic: boolean;
  isScore: boolean;
  // version
  version: string;
  dataSet: {
    label: string;
    level: string;
    firstIdent: string;
    secondIdent: string;
  }[];
  metricSet: {
    defaultThreshold: number;
    defaultWeight: number;
    metricId: number;
    id: number;
    ident: string;
    category: string;
    threshold: number;
    weight: number;
    versionId?: number;
  }[];
  algorithm: string;
}

const initialObj = {
  name: '',
  // dimension: 0,
  isScore: true,
  isPublic: true,

  version: '',
  dataSet: [],
  metricSet: [],
  algorithm: 'default',
};

export const formState = proxy<State>(initialObj);

export const actions = {
  onNameChange: (v: string) => {
    formState.name = v;
  },
  onVersionNameChange: (v: string) => {
    formState.version = v;
  },
  onIsGeneralChange: (v: boolean) => {
    formState.isScore = v;
  },
  onDeleteDataSetItem: (levelSecond: string) => {
    formState.dataSet = formState.dataSet.filter(
      (i) => i.secondIdent !== levelSecond
    );
  },
  onDeleteMetricItem: (ident: string) => {
    const result = formState.metricSet.filter((i) => i.ident !== ident);
    const weights = new Array(result.length).fill(1);
    const percentRoundWeights = percentRound(weights, 2);
    formState.metricSet = result.map((i, index) => {
      return { ...i, weight: percentRoundWeights[index] };
    });
  },
  adjustMetricWeightHandle: (result: number, index: number) => {
    const weights = formState.metricSet.map((i) => i.weight);
    const newWeights = adjustmentArray(weights, index, result);
    newWeights.forEach((newVal, index) => {
      formState.metricSet[index].weight = newVal;
    });
  },
  adjustThresholdHandle: (result: number, index: number) => {
    formState.metricSet[index].threshold = result;
  },
  resetForm: () => {
    const resetObj = cloneDeep(initialObj);
    Object.keys(resetObj).forEach((key) => {
      formState[key] = resetObj[key];
    });
  },
};
//
// if (isDev) {
//   subscribe(formState, () => {
//     console.log(JSON.stringify(formState, null, 2));
//   });
// }
