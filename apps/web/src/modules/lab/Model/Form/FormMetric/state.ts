import { proxy, subscribe } from 'valtio';

export interface MetricItem {
  defaultThreshold: number;
  defaultWeight: number;
  metricId: number;
  ident: string;
  threshold: number;
  weight: number;
  category: string;
}

export interface FormFiledState {
  selected: Record<string, MetricItem[]>;
  activeCategory: string;
}

export const formFiledState = proxy<FormFiledState>({
  selected: {},
  activeCategory: '',
});

export const getKey = (levelFirst: string, levelSecond: string) => {
  return `${levelFirst}`;
};

export const actions = {
  onSelect: (item: MetricItem) => {
    const { category, ident } = item;
    if (!formFiledState.selected[category]) {
      formFiledState.selected[category] = [item];
      return;
    }

    const old = formFiledState.selected[category];
    const index = old.findIndex((i) => i.ident === ident);
    // already exists cancel
    if (index > -1) {
      old.splice(index, 1);
      formFiledState.selected[category] = [...old];
    } else {
      formFiledState.selected[category] = [...old, item];
    }
  },
  onBackFill: (item: MetricItem) => {
    const { category } = item;
    if (!formFiledState.selected[category]) {
      formFiledState.selected[category] = [item];
      return;
    }
    const old = formFiledState.selected[category];
    formFiledState.selected[category] = [...old, item];
  },
};

subscribe(formFiledState, () => {
  console.log(JSON.stringify(formFiledState, null, 2));
});
