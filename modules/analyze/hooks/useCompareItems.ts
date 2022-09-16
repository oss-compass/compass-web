import { useMemo } from 'react';
import uniq from 'lodash/uniq';
import { getPathname } from '@common/utils/url';
import { useRouter } from 'next/router';
import { Level } from '@modules/analyze/constant';

function formatToArray(value: string | string[]) {
  if (typeof value === 'string') {
    return [value];
  }
  return Array.isArray(value) ? uniq(value) : [];
}

const useCompareItems = () => {
  const router = useRouter();
  const repos = useMemo(() => {
    const values = router.query.repo;
    return formatToArray(values!);
  }, [router.query.repo]);

  const projects = useMemo(() => {
    const values = router.query.project;
    return formatToArray(values!);
  }, [router.query.project]);

  const items = useMemo(() => {
    return [
      ...projects.map((project) => ({
        label: project,
        name: project,
        level: Level.PROJECT,
      })),
      ...repos.map((repo) => ({
        label: repo,
        name: getPathname(repo),
        level: Level.REPO,
      })),
    ];
  }, [repos, projects]);

  return {
    repos,
    projects,
    compareItems: items,
  };
};

export default useCompareItems;
