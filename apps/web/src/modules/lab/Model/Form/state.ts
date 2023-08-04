import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';

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
  onDimensionChange: (v: number) => {
    formState.dimension = v;
  },
  onDeleteDataSetItem: (levelSecond: string) => {
    formState.dataSet = formState.dataSet.filter(
      (i) => i.secondIdent !== levelSecond
    );
  },
  onDeleteMetricItem: (ident: string) => {
    formState.metricSet = formState.metricSet.filter((i) => i.ident !== ident);
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
