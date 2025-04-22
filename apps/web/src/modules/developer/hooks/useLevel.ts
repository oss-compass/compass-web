import { useMemo } from 'react';
import { useStatusContext } from '@modules/developer/context';
import { Level } from '@modules/developer/constant';

const useLevel = () => {
  const { verifiedItems } = useStatusContext();
  return useMemo(() => {
    if (verifiedItems.length > 0) {
      return verifiedItems[0].level;
    }
    return Level.REPO;
  }, [verifiedItems]);
};

export default useLevel;
