import { useRouter } from 'next/router';

const useContributorName = () => {
  const router = useRouter();
  const slugs = router.query.slugs;
  const platform = router.query.platform;

  const contributorName = Array.isArray(slugs) ? slugs[0] : slugs;
  const contributorPlatform = Array.isArray(platform) ? platform[0] : platform;

  return {
    contributorName: contributorName || '',
    contributorPlatform: contributorPlatform || 'github',
  };
};

export default useContributorName;
