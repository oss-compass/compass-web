import { useStatusContext } from '@modules/developer/context';

const useCompareItems = () => {
  const { verifiedItems } = useStatusContext();

  return { compareItems: verifiedItems };
};

export default useCompareItems;
