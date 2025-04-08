import type { getBuilderOptionFn } from '@modules/developer/options/useOptionBuilderFns';

export const getCompareStyleBuilder: getBuilderOptionFn<{
  indicators?: boolean;
}> =
  ({ indicators = false }) =>
  (pre, data) => {
    if (!data.isCompare) {
      pre.grid = { ...pre.grid, top: indicators ? 50 : 10 };
      pre.legend = { show: false };
    }
    return pre;
  };
