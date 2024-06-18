import { proxy, subscribe } from 'valtio';
import cloneDeep from 'lodash/cloneDeep';

interface State {
  // model
  active: string;
  allProcesses: {
    index: number;
    name: string;
    id: string;
    state: string;
    color?: string;
    icon?: string;
  }[];
}

const initialObj = {
  active: '孵化选型申请',
  //   curProcesses: '',
  allProcesses: [
    {
      index: 0,
      name: '孵化选型申请',
      id: '孵化选型申请',
      state: 'proceeding',
      color: 'green',
      icon: null,
      //   textColor: '!text-[#333]',
      //   textColor: '!text-[#bfbfbf]',
    },
    {
      index: 1,
      name: '孵化选型评审',
      id: '孵化选型评审',
      state: 'wait',
      color: 'gray',
      icon: null,
    },
    {
      index: 2,
      name: '建仓门禁申请',
      id: '建仓门禁申请',
      state: 'wait',
      color: 'gray',
      icon: null,
    },
    {
      index: 3,
      name: '入库自动化处理',
      id: '入库自动化处理',
      state: 'wait',
      color: 'gray',
      icon: null,
    },
    {
      index: 4,
      name: '结束',
      id: '结束',
      state: 'wait',
      color: 'gray',
      icon: null,
    },
  ],
};
export const procseeState = proxy<State>(initialObj);
export const getProceedingState = () => {
  return procseeState.allProcesses.find((item) => item.state === 'proceeding');
};

export const procseeActions = {
  reset: () => {
    const resetObj = cloneDeep(initialObj);
    Object.keys(resetObj).forEach((key) => {
      procseeState[key] = resetObj[key];
    });
  },
  setActive: (v: string) => {
    console.log(v);
    procseeState.active = v;
  },
  setNextProcsee: (v: string) => {
    let index = procseeState.allProcesses.findIndex((item) => {
      return item.id === v;
    });
    let current = procseeState.allProcesses[index];
    let next = procseeState.allProcesses[index + 1];
    current.state = 'finish';
    // current.icon = '';
    next.state = 'proceeding';
    procseeState.active = next.id;
  },
};
export const pointColorMap = {
  active: 'blue',
  proceeding: 'red',
  finish: 'green',
  wait: 'gray',
  default: 'gray',
};
export const textColorMap = {
  active: '!text-[#1677ff]',
  proceeding: '!text-[#333]',
  finish: '!text-[#333]',
  wait: '!text-[#bfbfbf]',
  default: '!text-[#bfbfbf]',
};
