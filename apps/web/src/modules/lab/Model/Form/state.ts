import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';
import { percentRound } from '@common/utils/number';

interface State {
  // model
  name: string;
  dimension: number;
  isPublic: boolean;
  isGeneral: boolean;

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
  dimension: 0,
  isPublic: false,
  isGeneral: false,

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
  onDimensionChange: (v: number) => {
    formState.dimension = v;
  },
  onDeleteDataSetItem: (levelSecond: string) => {
    formState.dataSet = formState.dataSet.filter(
      (i) => i.secondIdent !== levelSecond
    );
  },
  onDeleteMetricItem: (ident: string) => {
    const result = formState.metricSet.filter((i) => i.ident !== ident);
    const weights = result.map((i) => i.defaultWeight);
    const percentRoundWeights = percentRound(weights, 2);
    formState.metricSet = result.map((i, index) => {
      return { ...i, weight: percentRoundWeights[index] };
    });
  },
  resetForm: () => {
    const resetObj = cloneDeep(initialObj);
    Object.keys(resetObj).forEach((key) => {
      formState[key] = resetObj[key];
    });
  },
};

subscribe(formState, () => {
  console.log(JSON.stringify(formState, null, 2));
});
