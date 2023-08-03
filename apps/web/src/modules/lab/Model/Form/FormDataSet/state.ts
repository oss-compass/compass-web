import { proxy, subscribe } from 'valtio';

export interface FormFiledState {
  selected: Record<string, string[]>;
  levelFirst: string;
  levelSecond: string;
}

export const formFiledState = proxy<FormFiledState>({
  selected: {},
  levelFirst: '',
  levelSecond: '',
});

export const LEVEL_SEPARATOR = '_$$$$_';

export const getKey = (levelFirst: string, levelSecond: string) => {
  return `${levelFirst}${LEVEL_SEPARATOR}${levelSecond}`;
};

export const actions = {
  onSelect: (label: string) => {
    const { levelFirst, levelSecond } = formFiledState;
    const key = getKey(levelFirst, levelSecond);

    if (formFiledState.selected[key]) {
      const old = formFiledState.selected[key];
      const index = old.findIndex((i) => i === label);
      // already exists cancel
      if (index > -1) {
        old.splice(index, 1);
        formFiledState.selected[key] = [...old];
      } else {
        formFiledState.selected[key] = [...old, label];
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
};

subscribe(formFiledState, () => {
  console.log(JSON.stringify(formFiledState, null, 2));
});
