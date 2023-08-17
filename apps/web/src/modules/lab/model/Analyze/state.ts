import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';

interface State {
  commentVersion: {
    id: number;
    version: string;
  };
}

const initialObj = {
  commentVersion: null,
};

export const pageState = proxy<State>(initialObj);

export const actions = {
  onCurrentVersionChange: (v: { id: number; version: string }) => {
    pageState.commentVersion = v;
  },
};
