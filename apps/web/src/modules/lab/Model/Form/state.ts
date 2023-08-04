import { proxy, subscribe } from 'valtio';

export const formState = proxy<{
  name: string;
  dimension: number;
  isPublic: boolean;
  dataSet: {
    label: string;
    level: string;
    firstIdent: string;
    secondIdent: string;
  }[];
}>({
  name: '',
  dimension: 0,
  isPublic: false,
  dataSet: [],
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
  console.log(formState);
});
