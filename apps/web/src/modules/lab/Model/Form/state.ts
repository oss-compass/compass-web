import { proxy, subscribe } from 'valtio';

export const formState = proxy<{
  name: string;
  dimension: number;
  isPublic: boolean;
  isGeneral: boolean;
  dataSet: {
    label: string;
    level: string;
    firstIdent: string;
    secondIdent: string;
  }[];
  metricSet: {
    id: number;
    ident: string;
    threshold: number;
    weight: number;
    versionId?: number;
  }[];
  algorithm: string;
}>({
  name: '',
  dimension: 0,
  isPublic: false,
  isGeneral: false,
  dataSet: [],
  metricSet: [],
  algorithm: 'default',
});

export const actions = {
  onNameChange: (v: string) => {
    formState.name = v;
  },
  onDimensionChange: (v: number) => {
    formState.dimension = v;
  },
  onIsPublicChange: (v: boolean) => {
    formState.isPublic = v;
  },
};

subscribe(formState, () => {
  console.log(JSON.stringify(formState, null, 2));
});
