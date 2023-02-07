import { useState, useEffect } from 'react';
import { snapshot, subscribe, useSnapshot } from 'valtio';
import { verifiedLabels } from '@modules/analyze/store';
import { getPathname } from '@common/utils';
import { Level } from '@modules/analyze/constant';

const useCompareItems = () => {
  const labels = useSnapshot(verifiedLabels);

  const items = labels.values.map(({ label, level }) => ({
    name: level === Level.REPO ? getPathname(label) : label,
    label,
    level,
  }));
  return { compareItems: items };
};

export default useCompareItems;
