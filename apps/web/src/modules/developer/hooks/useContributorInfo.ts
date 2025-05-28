import { useStatusContext } from '@modules/developer/context';

const useContributorInfo = () => {
  const { verifiedItems, isLoading } = useStatusContext();

  return { contributorInfo: verifiedItems[0], isLoading };
};

export default useContributorInfo;
