import { Level } from '@modules/analyze/constant';
import { proxy } from 'valtio';
import { createContext } from 'react';

interface Store {
  label: string;
  level: Level;
}

export const verifiedLabels = proxy<{ labels: Store[] }>({
  labels: [],
});

export const VerifiedLabelsContext =
  createContext<typeof verifiedLabels>(verifiedLabels);

// devtools(verifiedLabels, { name: 'verifiedLabels', enabled: true });

export const setVerifiedLabels = (labels: Store[]) => {
  verifiedLabels.labels = labels;
};

export const resetVerifiedLabels = () => {
  verifiedLabels.labels = [];
};
