import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';

export interface FormFiledState {
  selected: Record<string, string[]>;
  levelFirst: string;
  levelSecond: string;
}

const initialObj = {
  selected: {},
  levelFirst: '',
  levelSecond: '',
};

export const formFiledState = proxy<FormFiledState>(initialObj);

export const LEVEL_SEPARATOR = '_$$$$_';

export const getKey = (levelFirst: string, levelSecond: string) => {
  return `${levelFirst}${LEVEL_SEPARATOR}${levelSecond}`;
};

export const actions = {
  onBackFill: (v: {
    label: string;
    levelFirst: string;
    levelSecond: string;
  }) => {
    const { label, levelFirst, levelSecond } = v;
    const key = getKey(levelFirst, levelSecond);

    if (formFiledState.selected[key]) {
      const old = formFiledState.selected[key];
      console.log(uniq([...old, label]));
      formFiledState.selected[key] = uniq([...old, label]);
    } else {
      formFiledState.selected[key] = [label];
    }
  },
  onSelect: (v: { label: string; levelFirst: string; levelSecond: string }) => {
    const { label, levelFirst, levelSecond } = v;
    const key = getKey(levelFirst, levelSecond);

    if (formFiledState.selected[key]) {
      const old = formFiledState.selected[key];
      const index = old.findIndex((i) => i === label);
      // already exists cancel
      if (index > -1) {
        old.splice(index, 1);
        formFiledState.selected[key] = [...old];
      } else {
        formFiledState.selected[key] = uniq([...old, label]);
      }
    } else {
      formFiledState.selected[key] = [label];
    }
  },
  changeLevelFirst: (v: string) => {
    formFiledState.levelFirst = v;
  },
  changeMenuLevel: (v: { levelFirst: string; levelSecond: string }) => {
    formFiledState.levelFirst = v.levelFirst;
    formFiledState.levelSecond = v.levelSecond;
  },
  resetFields: () => {
    const resetObj = cloneDeep(initialObj);
    Object.keys(resetObj).forEach((key) => {
      formFiledState[key] = resetObj[key];
    });
  },
};

subscribe(formFiledState, () => {
  console.log(JSON.stringify(formFiledState, null, 2));
});
