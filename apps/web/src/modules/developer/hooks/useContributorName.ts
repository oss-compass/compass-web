import { useRouter } from 'next/router';

const useContributorName = () => {
  const router = useRouter();
  const slugs = router.query.slugs!;
  return { contributorName: slugs };
};

export default useContributorName;
