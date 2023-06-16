import { proxy } from 'valtio';
import { Level } from '../constant';
import { StatusVerifyQuery } from '@graphql/generated';

type Item = Pick<
  StatusVerifyQuery['analysisStatusVerify'],
  'label' | 'status' | 'shortCode'
>;

export type VerifiedLabelItem = {
  [K in keyof Item]-?: NonNullable<Item[K]>;
} & { level: Level };

export const verifiedLabels = proxy<{ values: VerifiedLabelItem[] | [] }>({
  values: [],
});

export const setVerifiedLabels = (labels: VerifiedLabelItem[]) => {
  verifiedLabels.values = labels;
};

export const resetVerifiedLabels = () => {
  verifiedLabels.values = [];
};
