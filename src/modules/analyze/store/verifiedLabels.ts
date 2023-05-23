import { proxy } from 'valtio';
import { Level } from '../constant';

type Label = { label: string; level: Level };

export const verifiedLabels = proxy<{ values: Label[] | [] }>({
  values: [],
});

// devtools(verifiedLabels, { name: 'verifiedLabels', enabled: true });

export const setVerifiedLabels = (labels: Label[]) => {
  verifiedLabels.values = labels;
};

export const resetVerifiedLabels = () => {
  verifiedLabels.values = [];
};
